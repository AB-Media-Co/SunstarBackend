import Deal from '../models/dealModel.js';


export const createDeal = async (req, res) => {
  try {
    const deal = await Deal.create(req.body);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().populate('hotels', 'name');
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate('hotels', 'name');
    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDeal = async (req, res) => {
  try {
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

export const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json({ message: 'Deal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOfferCodesForHotel = async (req, res) => {
  try {
    const { hotelId } = req.body;
    if (!hotelId) {
      return res.status(400).json({ error: 'Hotel id is required' });
    }
    const deals = await Deal.find({
      $or: [{ applyToAllHotels: true }, { hotels: hotelId }]
    }, 'offerCode discountPercent description');
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDiscountedRate = async (req, res) => {
  try {
    const { hotelId, rate, offerCode } = req.body;
    if (!hotelId || rate === undefined) {
      return res.status(400).json({ error: 'Hotel id and rate are required' });
    }

    const currentDate = new Date();
    let applicableDeal;

    if (offerCode) {
      applicableDeal = await Deal.findOne({
        offerCode: offerCode,
        $or: [{ applyToAllHotels: true }, { hotels: hotelId }]
      });
      if (!applicableDeal) {
        return res.status(400).json({ error: 'Invalid offer code for this hotel' });
      }
      if (applicableDeal.startDate && currentDate < applicableDeal.startDate) {
        return res.status(400).json({ error: 'Offer code is not active yet' });
      }
      if (applicableDeal.endDate && currentDate > applicableDeal.endDate) {
        return res.status(400).json({ error: 'Offer code has expired' });
      }
    }

    if (!applicableDeal) {
      const deals = await Deal.find({
        $or: [{ applyToAllHotels: true }, { hotels: hotelId }]
      });
      if (deals.length === 0) {
        return res.json({ baseRate: rate, discountedRate: rate, discountPercent: 0, offerCode: null });
      }
      applicableDeal = deals.reduce((prev, current) =>
        prev.discountPercent > current.discountPercent ? prev : current
      );
    }

    const discountPercent = applicableDeal.discountPercent;
    const discountedRate = rate - (rate * discountPercent / 100);
    res.json({ baseRate: rate, discountedRate, discountPercent, offerCode: applicableDeal.offerCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
