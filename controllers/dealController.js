import Deal from '../models/dealModel.js';
import { Types } from 'mongoose';

/**
 * Utility function to check if a deal is eligible for the given
 * booking date (now) and a future check-in date.
 */
function isDealEligible(deal, bookingDate, checkInDate) {
  // 1. If the deal has start/end dates, ensure the booking is within that range
  if (deal.startDate && bookingDate < deal.startDate) return false;
  if (deal.endDate && bookingDate > deal.endDate) return false;

  // 2. Calculate how far in the future the check-in date is, compared to booking date
  const diffInMs = checkInDate - bookingDate;
  if (diffInMs < 0) {
    // checkInDate is in the past (invalid)
    return false;
  }

  // Convert the difference to days/hours if needed
  let diffValue = 0;
  if (deal.bookingRestrictionUnit === 'days') {
    diffValue = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  } else if (deal.bookingRestrictionUnit === 'hours') {
    diffValue = Math.ceil(diffInMs / (1000 * 60 * 60));
  }

  // 3. If we limit booking to certain hours, check the booking hour
  if (deal.limitPromotionToHours) {
    const bookingHour = bookingDate.getHours();
    if (bookingHour < deal.startHour || bookingHour > deal.endHour) {
      return false;
    }
  }

  // 4. Check last-minute or early-booker logic
  switch (deal.dealType) {
    case 'lastMinute':
      // Must be <= maxAdvance (in days/hours)
      if (deal.maxAdvance > 0 && diffValue > deal.maxAdvance) {
        return false;
      }
      break;

    case 'earlyBooker':
      // Must be >= minAdvance (in days/hours)
      if (deal.minAdvance > 0 && diffValue < deal.minAdvance) {
        return false;
      }
      break;

    case 'standard':
    default:
      // No special restriction
      break;
  }

  // 5. Check days of week
  if (deal.daysOfWeek && deal.daysOfWeek.length < 7) {
    const dayMap = {
      'Su': 0, 'Mo': 1, 'Tu': 2, 'We': 3, 'Th': 4, 'Fr': 5, 'Sa': 6
    };
    const checkInDay = checkInDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const allowedDays = deal.daysOfWeek.map(d => dayMap[d]);
    
    if (!allowedDays.includes(checkInDay)) {
      return false;
    }
  }

  // 6. Check platform restrictions
  if (deal.platform === 'mobileOnly' && req.headers['user-agent'] && 
      !req.headers['user-agent'].toLowerCase().includes('mobile')) {
    return false;
  }

  return true;
}

/**
 * Create a new deal
 */
export const createDeal = async (req, res) => {
  try {
    // Set appropriate default values based on dealType
    if (req.body.dealType === 'lastMinute') {
      // For Last Minute deals, we care about maxAdvance
      req.body.minAdvance = 0;
      req.body.bookingRestrictionUnit = req.body.bookingRestrictionUnit || 'days';
    } else if (req.body.dealType === 'earlyBooker') {
      // For Early Booker deals, we care about minAdvance
      req.body.maxAdvance = 0;
      req.body.bookingRestrictionUnit = req.body.bookingRestrictionUnit || 'days';
    }

    const deal = await Deal.create(req.body);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all deals
 */
export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().populate('hotels', 'name');
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a single deal by ID
 */
export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate('hotels', 'name');
    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update a deal
 */
export const updateDeal = async (req, res) => {
  try {
    // Set appropriate default values based on dealType
    if (req.body.dealType === 'lastMinute') {
      // For Last Minute deals, we care about maxAdvance
      req.body.minAdvance = 0;
      req.body.bookingRestrictionUnit = req.body.bookingRestrictionUnit || 'days';
    } else if (req.body.dealType === 'earlyBooker') {
      // For Early Booker deals, we care about minAdvance
      req.body.maxAdvance = 0;
      req.body.bookingRestrictionUnit = req.body.bookingRestrictionUnit || 'days';
    }

    const deal = await Deal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('hotels', 'name');

    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a deal
 */
export const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all offer codes for a specific hotel
 */
export const getOfferCodesForHotel = async (req, res) => {
  try {
    const { hotelId } = req.body;
    if (!hotelId) {
      return res.status(400).json({ error: 'Hotel id is required' });
    }

    // Return only the fields we need for the front-end
    const deals = await Deal.find(
      {
        $or: [{ applyToAllHotels: true }, { hotels: hotelId }]
      },
      'offerCode discountPercent description'
    );
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Calculate a discounted rate for a given hotel and base rate.
 * If an offerCode is provided, we validate that code. Otherwise, we
 * pick the best eligible deal (max discount).
 */
export const getDiscountedRate = async (req, res) => {
  try {
    const { hotelId, rate, offerCode, checkInDate, platform } = req.body;

    // We require a checkInDate to apply last-minute/early-booker logic
    if (!hotelId || rate === undefined || !checkInDate) {
      return res
        .status(400)
        .json({ error: 'Hotel id, rate, and checkInDate are required' });
    }

    const checkInDateObj = new Date(checkInDate);
    // Optionally, you can accept a custom bookingDate from the client
    const bookingDate = new Date();
    const userPlatform = platform || 'web'; // Default to web if not specified

    let applicableDeal = null;

    // 1. If an offerCode is provided, attempt to find that specific deal
    if (offerCode) {
      applicableDeal = await Deal.findOne({
        offerCode,
        $or: [{ applyToAllHotels: true }, { hotels: hotelId }]
      });

      if (!applicableDeal) {
        return res
          .status(400)
          .json({ error: 'Invalid offer code for this hotel' });
      }

      // Check if the deal is active
      if (applicableDeal.startDate && bookingDate < applicableDeal.startDate) {
        return res
          .status(400)
          .json({ error: 'Offer code is not active yet' });
      }
      if (applicableDeal.endDate && bookingDate > applicableDeal.endDate) {
        return res
          .status(400)
          .json({ error: 'Offer code has expired' });
      }

      // Check if the deal is platform-restricted
      if (applicableDeal.platform === 'mobileOnly' && userPlatform !== 'mobile') {
        return res
          .status(400)
          .json({ error: 'Offer code is only valid on mobile devices' });
      }

      // Check if the deal is eligible for last-minute/early-booker logic
      const requestWithUserAgent = { ...req, headers: { ...req.headers } };
      if (!isDealEligible(applicableDeal, bookingDate, checkInDateObj, requestWithUserAgent)) {
        // Determine the exact reason for ineligibility
        let errorMessage = 'Offer code is not eligible based on date restrictions';
        
        if (applicableDeal.dealType === 'lastMinute' && 
            applicableDeal.maxAdvance > 0 && 
            getDaysDifference(bookingDate, checkInDateObj) > applicableDeal.maxAdvance) {
          errorMessage = `This last-minute offer is only valid for bookings ${applicableDeal.maxAdvance} ${applicableDeal.bookingRestrictionUnit} or fewer before check-in`;
        } else if (applicableDeal.dealType === 'earlyBooker' && 
                   applicableDeal.minAdvance > 0 && 
                   getDaysDifference(bookingDate, checkInDateObj) < applicableDeal.minAdvance) {
          errorMessage = `This early-booker offer is only valid for bookings ${applicableDeal.minAdvance} ${applicableDeal.bookingRestrictionUnit} or more before check-in`;
        } else if (applicableDeal.limitPromotionToHours) {
          const bookingHour = bookingDate.getHours();
          errorMessage = `This offer is only valid for bookings between ${applicableDeal.startHour}:00 and ${applicableDeal.endHour}:00`;
        }
        
        return res.status(400).json({ error: errorMessage });
      }
    }

    // 2. If no valid offerCode, find the best eligible deal among all
    if (!applicableDeal) {
      const deals = await Deal.find({
        $or: [{ applyToAllHotels: true }, { hotels: hotelId }],
        // Only include deals visible to everyone if no offer code was provided
        visibility: 'everyone',
        // Match platform restrictions
        $or: [
          { platform: 'mobileAndWeb' },
          { platform: 'mobileOnly', ...(userPlatform === 'mobile' ? {} : { _id: null }) }
        ]
      });

      // Filter deals by eligibility
      const requestWithUserAgent = { ...req, headers: { ...req.headers } };
      const eligibleDeals = deals.filter((d) =>
        isDealEligible(d, bookingDate, checkInDateObj, requestWithUserAgent)
      );

      // If no eligible deals, return the base rate
      if (eligibleDeals.length === 0) {
        return res.json({
          baseRate: rate,
          discountedRate: rate,
          discountPercent: 0,
          offerCode: null,
          dealName: null
        });
      }

      // Choose the deal with the highest discountPercent
      applicableDeal = eligibleDeals.reduce((prev, current) =>
        prev.discountPercent > current.discountPercent ? prev : current
      );
    }

    // 3. Calculate the final discounted rate
    const discountPercent = applicableDeal.discountPercent;
    const discountedRate = rate - (rate * discountPercent) / 100;

    return res.json({
      baseRate: rate,
      discountedRate,
      discountPercent,
      offerCode: applicableDeal.offerCode,
      dealName: applicableDeal.name
    });
  } catch (error) {
    console.error('Error in getDiscountedRate:', error);
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get days difference between two dates
function getDaysDifference(startDate, endDate) {
  const diffInMs = endDate - startDate;
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}