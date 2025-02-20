
import WebsiteData from "../models/WebsiteData.js";
import { v4 as uuidv4 } from 'uuid';

const getOrCreateWebsiteData = async () => {
  let websiteData = await WebsiteData.findOne();
  if (!websiteData) {
    websiteData = new WebsiteData({ amenities: [] });
    await websiteData.save();
  }
  return websiteData;
};

export const getWebsiteData = async (req, res) => {
  try {
    const websiteData = await getOrCreateWebsiteData();
    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Amenities

export const addAmenities = async (req, res) => {
  try {
    const amenitiesToAdd = req.body.amenities;
    if (!Array.isArray(amenitiesToAdd) || amenitiesToAdd.length === 0) {
      return res.status(400).json({ error: 'Amenities array is required.' });
    }
    const websiteData = await getOrCreateWebsiteData();
    amenitiesToAdd.forEach(({ value, label }) => {
      if (value && label) {
        websiteData.amenities.push({ value, label });
      }
    });
    await websiteData.save();
    res.status(201).json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAmenity = async (req, res) => {
  try {
    const { value, label } = req.body;
    if (!value || !label) {
      return res.status(400).json({ error: 'Value and label are required.' });
    }
    const websiteData = await getOrCreateWebsiteData();
    const amenity = websiteData.amenities.id(req.params.amenityId);
    if (!amenity) {
      return res.status(404).json({ error: 'Amenity not found.' });
    }
    amenity.value = value;
    amenity.label = label;
    await websiteData.save();
    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAmenity = async (req, res) => {
  try {
    const websiteData = await getOrCreateWebsiteData();
    const amenity = websiteData.amenities.id(req.params.amenityId);
    if (!amenity) {
      return res.status(404).json({ error: 'Amenity not found.' });
    }
    amenity.remove();
    await websiteData.save();
    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Location

export const addLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    const websiteData = await getOrCreateWebsiteData();
    websiteData.locations.push({ name });
    await websiteData.save();
    res.status(201).json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    const websiteData = await getOrCreateWebsiteData();
    const location = websiteData.locations.id(req.params.locationId);
    if (!location) {
      return res.status(404).json({ error: 'Location not found.' });
    }
    location.name = name;
    await websiteData.save();
    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const websiteData = await getOrCreateWebsiteData();

    const updatedWebsiteData = await WebsiteData.findOneAndUpdate(
      { 'locations._id': locationId },
      { $pull: { locations: { _id: locationId } } },
      { new: true }
    );

    if (!updatedWebsiteData) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    res.json(updatedWebsiteData);
  } catch (err) {
    console.error('Error deleting location:', err);
    res.status(500).json({ error: err.message });
  }
};



export const gridImages = async (req, res) => {
  try {
    const { massonaryGrid } = req.body;
    const websiteData = await getOrCreateWebsiteData();

    // Ensure grid exists (if not, create an empty object)
    if (!websiteData.grid) {
      websiteData.grid = {};
    }

    // Update the images if provided
    if (
      massonaryGrid &&
      Array.isArray(massonaryGrid.images) &&
      massonaryGrid.images.length > 0
    ) {
      websiteData.grid.images = massonaryGrid.images;
    }

    // Update the content if provided
    if (
      massonaryGrid &&
      Array.isArray(massonaryGrid.content) &&
      massonaryGrid.content.length > 0
    ) {
      websiteData.grid.content = massonaryGrid.content;
    }

    await websiteData.save();
    res.status(201).json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateShineSection = async (req, res) => {
  try {
    const { heading, description, features } = req.body;

    if (!heading || !description || !Array.isArray(features) || features.length === 0) {
      return res.status(400).json({ error: 'Heading, description, and features are required.' });
    }

    const invalidFeatures = features.some(feature => !feature.title || !feature.description || !feature.image);
    if (invalidFeatures) {
      return res.status(400).json({ error: 'Each feature must have a name, description, and image.' });
    }

    const websiteData = await WebsiteData.findOne();
    if (!websiteData) {
      return res.status(404).json({ error: 'Website data not found.' });
    }

    websiteData.shineSection = { heading, description, features };
    await websiteData.save();

    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const updateHeroSection = async (req, res) => {
  try {
    const { heroSection } = req.body;

    const websiteData = await WebsiteData.findOne();
    if (!websiteData) {
      return res.status(404).json({ message: 'Website data not found' });
    }

    websiteData.heroSection = heroSection;

    await websiteData.save();
    res.json(websiteData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateHomePageDescription = async (req, res) => {
  try {
    const { homePageDescription } = req.body;

    const websiteData = await WebsiteData.findOne();
    if (!websiteData) {
      return res.status(404).json({ message: 'Website data not found' });
    }

    websiteData.homePageDescription = homePageDescription;

    await websiteData.save();
    res.json(websiteData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createOffering = async (req, res) => {
  try {
    let { whatWeOffers } = req.body;

    if (
      !whatWeOffers ||
      typeof whatWeOffers !== 'object' ||
      !Array.isArray(whatWeOffers.offers)
    ) {
      return res.status(400).json({
        message: 'whatWeOffers must be an object containing an offers array.',
      });
    }

    const seen = new Set();
    whatWeOffers.offers = whatWeOffers.offers.map(offering => {
      return {
        ...offering,
      };
    });

    const websiteData = await WebsiteData.findOne();
    if (!websiteData) {
      return res.status(404).json({ message: 'Website data not found.' });
    }

    websiteData.whatWeOffers = whatWeOffers;
    const savedOffering = await websiteData.save();
    res.status(201).json(savedOffering);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const updateValueSection = async (req, res) => {
  try {
    const { heading, valueData } = req.body;

    if (!heading || !Array.isArray(valueData)) {
      return res.status(400).json({ error: 'Heading and valueData array are required.' });
    }

    const websiteData = await getOrCreateWebsiteData();

    websiteData.WhySunstar = {
      WhySunstarValue: {
        heading,
        valueData,
      },
    };

    await websiteData.save();
    res.json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const createTestimonial = async (req, res) => {
  try {
    const { TestimonialData } = req.body;
    const websiteData = await WebsiteData.findOne();

    // Override the current whatWeOffers array with the new data
    websiteData.Testimonials = TestimonialData;
    const saveTestimonial = await websiteData.save();

    res.status(201).json(saveTestimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const addCoorporateBooking = async (req, res) => {
  try {
    const { CoorporateBookingHeadContent, CoorporateBookingDescription } = req.body;

    let websiteData = await WebsiteData.findOne();

    if (!websiteData) {
      websiteData = new WebsiteData({
        CoorporateBooking: { CoorporateBookingHeadContent, CoorporateBookingDescription }
      });
    } else {
      websiteData.CoorporateBooking = { CoorporateBookingHeadContent, CoorporateBookingDescription };
    }

    await websiteData.save();

    res.status(200).json({
      success: true,
      message: 'Corporate Booking data added/updated successfully',
      data: websiteData.CoorporateBooking
    });
  } catch (error) {
    console.error('Error updating Corporate Booking:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFaqs = async (req, res) => {
  try {
    const { faqs } = req.body;
    // Validate that faqs is a non-empty array and each faq has a question and answer
    if (
      !Array.isArray(faqs) ||
      faqs.length === 0 ||
      faqs.some(faq => !faq.question || !faq.answer)
    ) {
      return res.status(400).json({
        error: "faqs must be a non-empty array and each item must have a question and an answer.",
      });
    }

    const websiteData = await getOrCreateWebsiteData();
    // Overwrite the existing FAQs with the new data from the frontend
    websiteData.faqs = faqs;

    await websiteData.save();
    res.status(200).json(websiteData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};