import EventPage from '../models/EventPage.js';

/* -------------------------- PUBLIC READ -------------------------- */

export const getEventPageByType = async (req, res) => {
  try {
    const { pageType } = req.params;
    const eventPage = await EventPage.findOne({ pageType, isActive: true });
    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }
    res.status(200).json({ success: true, data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching event page', error: error.message });
  }
};

export const getAllEventPages = async (_req, res) => {
  try {
    const eventPages = await EventPage.find({ isActive: true });
    res.status(200).json({ success: true, total: eventPages.length, data: eventPages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching event pages', error: error.message });
  }
};

/* -------------------------- CREATE / UPDATE -------------------------- */

export const createEventPage = async (req, res) => {
  try {
    const {
      pageType,
      heroSection,
      heroDescription,
      ourEventsSection,
      celebrationsSection,
      mainEventSection,
      personalisedSection,
      introductionSection,
      meta,
      // NEW (optional on create)
      innerHero,
      overview,
      celebrationTypes
    } = req.body;

    if (!pageType) {
      return res.status(400).json({ success: false, message: 'pageType is required' });
    }

    const existingPage = await EventPage.findOne({ pageType });
    if (existingPage) {
      return res.status(400).json({ success: false, message: `Event page with pageType '${pageType}' already exists` });
    }

    const newEventPage = await EventPage.create({
      pageType,
      heroSection,
      heroDescription,
      ourEventsSection,
      celebrationsSection,
      mainEventSection,
      personalisedSection,
      introductionSection,
      meta,
      innerHero,
      overview,
      celebrationTypes
    });

    res.status(201).json({ success: true, message: 'Event page created successfully', data: newEventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating event page', error: error.message });
  }
};

export const updateEventPage = async (req, res) => {
  try {
    const { pageType } = req.params;
    const updates = req.body;

    if (updates.pageType && updates.pageType !== pageType) {
      return res.status(400).json({ success: false, message: 'Cannot change pageType' });
    }

    const eventPage = await EventPage.findOneAndUpdate(
      { pageType },
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }

    res.status(200).json({ success: true, message: 'Event page updated successfully', data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating event page', error: error.message });
  }
};

/* -------------------------- GENERIC SECTION PATCH -------------------------- */

export const updateEventPageSection = async (req, res) => {
  try {
    const { pageType, sectionName } = req.params;
    const sectionData = req.body;

    const allowedSections = [
      // landing
      'heroSection',
      'heroDescription',
      'ourEventsSection',
      'celebrationsSection',
      'mainEventSection',
      'personalisedSection',
      'introductionSection',
      'meta',
      // NEW inner pages
      'innerHero',
      'overview',
      'celebrationTypes'
    ];

    if (!allowedSections.includes(sectionName)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name. Allowed sections: ${allowedSections.join(', ')}`
      });
    }

    const eventPage = await EventPage.findOneAndUpdate(
      { pageType },
      { [sectionName]: sectionData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }

    res.status(200).json({
      success: true,
      message: `Section '${sectionName}' updated successfully`,
      data: eventPage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating event page section', error: error.message });
  }
};

/* -------------------------- DELETE PAGE -------------------------- */

export const deleteEventPage = async (req, res) => {
  try {
    const { pageType } = req.params;
    const eventPage = await EventPage.findOneAndDelete({ pageType });
    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }
    res.status(200).json({ success: true, message: 'Event page deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting event page', error: error.message });
  }
};

/* -------------------------- LANDING CARD/FEATURE HELPERS -------------------------- */

export const addEventCard = async (req, res) => {
  try {
    const { pageType } = req.params;
    const { title, description, image, link } = req.body;

    if (!title || !description || !image || !link) {
      return res.status(400).json({ success: false, message: 'title, description, image, and link are required' });
    }

    const eventPage = await EventPage.findOneAndUpdate(
      { pageType },
      { $push: { 'ourEventsSection.cards': { title, description, image, link } }, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }

    res.status(200).json({ success: true, message: 'Event card added successfully', data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding event card', error: error.message });
  }
};

export const removeEventCard = async (req, res) => {
  try {
    const { pageType, cardIndex } = req.params;
    const eventPage = await EventPage.findOne({ pageType });
    if (!eventPage) return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });

    const index = parseInt(cardIndex, 10);
    if (Number.isNaN(index) || index < 0 || index >= eventPage.ourEventsSection.cards.length) {
      return res.status(400).json({ success: false, message: 'Invalid card index' });
    }

    eventPage.ourEventsSection.cards.splice(index, 1);
    await eventPage.save();

    res.status(200).json({ success: true, message: 'Event card removed successfully', data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error removing event card', error: error.message });
  }
};

export const addFeature = async (req, res) => {
  try {
    const { pageType } = req.params;
    const { title, description, icon } = req.body;

    if (!title || !icon) {
      return res.status(400).json({ success: false, message: 'title and icon are required' });
    }

    const eventPage = await EventPage.findOneAndUpdate(
      { pageType },
      { $push: { 'celebrationsSection.features': { title, description: description || '', icon } }, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!eventPage) {
      return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });
    }

    res.status(200).json({ success: true, message: 'Feature added successfully', data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding feature', error: error.message });
  }
};

export const removeFeature = async (req, res) => {
  try {
    const { pageType, featureIndex } = req.params;
    const eventPage = await EventPage.findOne({ pageType });
    if (!eventPage) return res.status(404).json({ success: false, message: `Event page not found for pageType: ${pageType}` });

    const index = parseInt(featureIndex, 10);
    if (Number.isNaN(index) || index < 0 || index >= eventPage.celebrationsSection.features.length) {
      return res.status(400).json({ success: false, message: 'Invalid feature index' });
    }

    eventPage.celebrationsSection.features.splice(index, 1);
    await eventPage.save();

    res.status(200).json({ success: true, message: 'Feature removed successfully', data: eventPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error removing feature', error: error.message });
  }
};

/* -------------------------- NEW: INNER PAGES HELPERS -------------------------- */

// PATCH (merge): /api/event-pages/:pageType/inner-hero
export const patchInnerHero = async (req, res) => {
  try {
    const { pageType } = req.params;
    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });
    page.set('innerHero', { ...(page.innerHero?.toObject?.() || {}), ...req.body });
    await page.save();
    res.json({ success: true, data: page.innerHero });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// PATCH (merge): /api/event-pages/:pageType/overview
export const patchOverview = async (req, res) => {
  try {
    const { pageType } = req.params;
    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });
    page.set('overview', { ...(page.overview?.toObject?.() || {}), ...req.body });
    await page.save();
    res.json({ success: true, data: page.overview });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// PATCH meta only: /api/event-pages/:pageType/celebration-types
export const patchCelebrationTypesMeta = async (req, res) => {
  try {
    const { pageType } = req.params;
    const { heading, description } = req.body || {};
    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });
    if (heading !== undefined) page.celebrationTypes.heading = heading;
    if (description !== undefined) page.celebrationTypes.description = description;
    await page.save();
    res.json({ success: true, data: page.celebrationTypes });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// POST item: /api/event-pages/:pageType/celebration-types/items
export const addCelebrationItem = async (req, res) => {
  try {
    const { pageType } = req.params;
    const { image = '', title } = req.body || {};
    if (!title) return res.status(400).json({ success: false, message: 'title required' });

    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });

    page.celebrationTypes.items.push({ image, title });
    await page.save();
    res.status(201).json({ success: true, data: page.celebrationTypes.items.at(-1) });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// PUT item: /api/event-pages/:pageType/celebration-types/items/:itemId
export const updateCelebrationItem = async (req, res) => {
  try {
    const { pageType, itemId } = req.params;
    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });

    const item = page.celebrationTypes.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    item.set({ ...(item.toObject()), ...req.body });
    await page.save();
    res.json({ success: true, data: item });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// DELETE item: /api/event-pages/:pageType/celebration-types/items/:itemId
export const deleteCelebrationItem = async (req, res) => {
  try {
    const { pageType, itemId } = req.params;
    const page = await EventPage.findOne({ pageType });
    if (!page) return res.status(404).json({ success: false, message: 'Event page not found' });

    const item = page.celebrationTypes.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    item.deleteOne();
    await page.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
