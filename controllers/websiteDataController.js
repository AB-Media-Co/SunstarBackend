
import WebsiteData from "../models/WebsiteData.js";

const getOrCreateWebsiteData = async () => {
  let websiteData = await WebsiteData.findOne();
  if (!websiteData) {
    websiteData = new WebsiteData({ amenities: [] });
    await websiteData.save();
  }
  return websiteData;
};

export const getWebsiteData = async (req, res, next) => {
  try {
    const websiteData = await getOrCreateWebsiteData();
    if (!websiteData) {
      return res.status(404).json({ message: 'Website data not found' });
    }
    res.json(websiteData);
  } catch (err) {
    if (err.name === 'MongooseError' || err.name === 'MongoError') {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Database connection error', error: err.message });
    }
    next(err);
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



export const gridImages = async (req, res) => {
  try {
    const { massonaryGrid, path } = req.body;
    const websiteData = await getOrCreateWebsiteData();

    // Decide which key to use
    const gridPath = path && ["travelAgent", "career"].includes(path)
      ? path
      : "default";

    // Ensure the object exists
    if (!websiteData.grid) websiteData.grid = {};
    if (!websiteData.grid[gridPath]) websiteData.grid[gridPath] = {};

    // Update images if provided
    if (
      massonaryGrid &&
      Array.isArray(massonaryGrid.images) &&
      massonaryGrid.images.length > 0
    ) {
      websiteData.grid[gridPath].images = massonaryGrid.images;
    }

    // Update content if provided
    if (
      massonaryGrid &&
      Array.isArray(massonaryGrid.content) &&
      massonaryGrid.content.length > 0
    ) {
      websiteData.grid[gridPath].content = massonaryGrid.content;
    }

    await websiteData.save();
    res.status(201).json({
      success: true,
      path: gridPath,
      data: websiteData.grid[gridPath],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const updateShineSection = async (req, res) => {
  try {
    const { heading, description, features } = req.body;

    if (!heading || !description) {
      return res.status(400).json({ error: 'Heading and description are required.' });
    }

    // Flexible - allow any number of features, allow empty fields
    const processedFeatures = Array.isArray(features) ? features.map(feature => ({
      title: feature.title || '',
      description: feature.description || '',
      image: feature.image || ''
    })) : [];

    let websiteData = await WebsiteData.findOne();
    if (!websiteData) {
      websiteData = new WebsiteData();
    }

    websiteData.shineSection = { heading, description, features: processedFeatures };
    await websiteData.save();

    res.status(200).json({
      success: true,
      message: 'Shine Section updated successfully',
      data: websiteData.shineSection
    });
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
    const { heading, valueData ,heroSectionDescription} = req.body;

    if (!heading || !Array.isArray(valueData)) {
      return res.status(400).json({ error: 'Heading and valueData array are required.' });
    }

    const websiteData = await getOrCreateWebsiteData();

    websiteData.WhySunstar = {
      WhySunstarValue: {
        heading,
        valueData,
        heroSectionDescription
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




export const saveHomePartners = async (req, res) => {
  try {
    const { heading, subheading, layout, logos } = req.body || {};
    const websiteData = await getOrCreateWebsiteData();

    // ensure section object exists
    if (!websiteData.HomePartners) {
      websiteData.HomePartners = { logos: [] };
    }

    // update meta only if provided
    if (heading !== undefined) websiteData.HomePartners.heading = heading;
    if (subheading !== undefined) websiteData.HomePartners.subheading = subheading;
    if (layout !== undefined) websiteData.HomePartners.layout = layout;

    // replace logos only if provided (supports add/update/delete in one go)
    if (logos !== undefined) {
      if (!Array.isArray(logos)) {
        return res.status(400).json({ error: 'logos must be an array' });
      }

      const sanitized = logos
        .filter((l) => l && typeof l.src === 'string' && l.src.trim())
        .map((l) => ({
          src: String(l.src).trim(),
          ...(l.alt !== undefined ? { alt: String(l.alt) } : {}),
          ...(l.link !== undefined ? { link: String(l.link) } : {}),
        }));

      websiteData.HomePartners.logos = sanitized; // full replace (add/update/delete)
    }

    await websiteData.save();
    return res.status(200).json({
      success: true,
      message: 'Home partners saved successfully',
      data: websiteData.HomePartners,
    });
  } catch (err) {
    console.error('saveHomePartners error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};



export const addCoorporateBooking = async (req, res) => {
  try {
    const {
      CoorporateBookingHeadContent,
      CoorporateBookingDescription,
      BusinessPlatformSection = [],
      BenefitsSection = []        // <-- NEW
    } = req.body;

    // ensure arrays
    const businessPlatforms = Array.isArray(BusinessPlatformSection) ? BusinessPlatformSection : [];
    const benefits = Array.isArray(BenefitsSection) ? BenefitsSection : [];

    let websiteData = await WebsiteData.findOne();

    const newPayload = {
      CoorporateBookingHeadContent,
      CoorporateBookingDescription,
      BusinessPlatformSection: businessPlatforms,
      BenefitsSection: benefits, // <-- NEW
    };

    if (!websiteData) {
      websiteData = new WebsiteData({ CoorporateBooking: newPayload });
    } else {
      websiteData.CoorporateBooking = newPayload; 
    }

    await websiteData.save();

    res.status(200).json({
      success: true,
      message: 'Corporate Booking data added/updated successfully',
      data: websiteData.CoorporateBooking,
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


export const addContactUsDetail = async (req, res) => {
  try {
    const { phoneNumber, emailId, OtherEnquieirs } = req.body;

    let websiteData = await WebsiteData.findOne();

    if (!websiteData) {
      websiteData = new WebsiteData({
        ContactUsDetail: { phoneNumber, emailId, OtherEnquieirs }
      });
    } else {
      websiteData.ContactUsDetail = { phoneNumber, emailId, OtherEnquieirs };
    }

    await websiteData.save();

    res.status(200).json({
      success: true,
      message: 'Contact Detail updated successfully',
      data: websiteData.ContactUsDetail
    });
  } catch (error) {
    console.error('Error updating Contact Detail:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// --- WHAT MAKES US SHINE ---
// expects home page data in body: { heading: string, description: string, items: [{ image, heading, description }, ...3] }

export const upsertWhatMakesUsShine = async (req, res) => {
  try {
    const { heading, description, items } = req.body || {};

    // basic validation - relaxed to allow empty fields
    if (!heading?.trim() || !description?.trim() || !Array.isArray(items) || items.length !== 3) {
      return res.status(400).json({ error: 'heading, description, and exactly 3 items[] are required.' });
    }

    // Allow empty fields - just ensure each item exists and has the properties
    const processedItems = items.map(it => ({
      image: it?.image?.trim() || '',
      heading: it?.heading?.trim() || '',
      description: it?.description?.trim() || ''
    }));

    const websiteData = await getOrCreateWebsiteData();
    websiteData.whatMakesUsShine = { 
      heading: heading.trim(), 
      description: description.trim(), 
      items: processedItems 
    };
    await websiteData.save();

    return res.status(200).json({
      success: true,
      message: 'WhatMakesUsShine saved successfully',
      data: websiteData.whatMakesUsShine,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get the whole section
export const getWhatMakesUsShine = async (_req, res) => {
  try {
    const websiteData = await getOrCreateWebsiteData();
    return res.status(200).json(websiteData.whatMakesUsShine || null);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Replace only items (must be exactly 3). Useful when heading/description same rehte hain.
export const replaceWhatMakesUsShineItems = async (req, res) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length !== 3) {
      return res.status(400).json({ error: 'Exactly 3 items[] are required.' });
    }
    const invalid = items.some(it =>
      !it?.image?.trim() || !it?.heading?.trim() || !it?.description?.trim()
    );
    if (invalid) {
      return res.status(400).json({ error: 'Each item must include image, heading, and description.' });
    }

    const websiteData = await getOrCreateWebsiteData();
    if (!websiteData.whatMakesUsShine?.heading || !websiteData.whatMakesUsShine?.description) {
      return res.status(400).json({ error: 'Section not initialized. Use upsertWhatMakesUsShine first.' });
    }

    websiteData.whatMakesUsShine.items = items;
    await websiteData.save();

    return res.status(200).json({
      success: true,
      message: 'Items replaced successfully',
      data: websiteData.whatMakesUsShine,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a single item by index (0,1,2) — keeps the "exactly 3" rule intact
export const updateWhatMakesUsShineItem = async (req, res) => {
  try {
    console.log(req.body)
    const idx = Number(req.params.index);
    const patch = req.body || {};

    if (![0, 1, 2].includes(idx)) {
      return res.status(400).json({ error: 'index must be 0, 1, or 2.' });
    }

    const websiteData = await getOrCreateWebsiteData();
    const section = websiteData.whatMakesUsShine;

    if (!section || !Array.isArray(section.items) || section.items.length !== 3) {
      return res.status(400).json({ error: 'Section not initialized or invalid. Use upsertWhatMakesUsShine first.' });
    }

    // apply partial updates but keep required fields non-empty
    const target = section.items[idx] || {};
    const updated = {
      image: (patch.image ?? target.image)?.trim?.() || target.image,
      heading: (patch.heading ?? target.heading)?.trim?.() || target.heading,
      description: (patch.description ?? target.description)?.trim?.() || target.description,
    };

    if (!updated.image || !updated.heading || !updated.description) {
      return res.status(400).json({ error: 'image, heading, description must remain non-empty.' });
    }

    section.items[idx] = updated;
    await websiteData.save();

    return res.status(200).json({
      success: true,
      message: `Item ${idx} updated successfully`,
      data: section.items[idx],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
