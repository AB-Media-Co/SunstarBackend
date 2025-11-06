import EventPage from '../models/EventPage.js';

// Get all event pages
export const getAllEventPages = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = active !== undefined ? { active: active === 'true' } : {};
    
    const pages = await EventPage.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages,
    });
  } catch (error) {
    console.error('Error fetching event pages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event pages',
      error: error.message,
    });
  }
};

// Get single event page by slug
export const getEventPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const page = await EventPage.findOne({ pageSlug: slug.toLowerCase() });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Event page with slug '${slug}' not found`,
      });
    }
    
    res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Error fetching event page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event page',
      error: error.message,
    });
  }
};

// Create new event page
export const createEventPage = async (req, res) => {
  try {
    const eventPageData = req.body;
    
    // Check if page with same slug already exists
    const existingPage = await EventPage.findOne({ pageSlug: eventPageData.pageSlug?.toLowerCase() });
    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: `Event page with slug '${eventPageData.pageSlug}' already exists`,
      });
    }
    
    const newPage = new EventPage(eventPageData);
    const savedPage = await newPage.save();
    
    res.status(201).json({
      success: true,
      message: 'Event page created successfully',
      data: savedPage,
    });
  } catch (error) {
    console.error('Error creating event page:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create event page',
      error: error.message,
    });
  }
};

// Update event page by slug
export const updateEventPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const updateData = req.body;
    
    // Don't allow changing pageSlug through update
    delete updateData.pageSlug;
    
    const updatedPage = await EventPage.findOneAndUpdate(
      { pageSlug: slug.toLowerCase() },
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!updatedPage) {
      return res.status(404).json({
        success: false,
        message: `Event page with slug '${slug}' not found`,
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event page updated successfully',
      data: updatedPage,
    });
  } catch (error) {
    console.error('Error updating event page:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update event page',
      error: error.message,
    });
  }
};

// Update specific section of event page
export const updateEventPageSection = async (req, res) => {
  try {
    const { slug, section } = req.params;
    let sectionData = req.body;
    
    const page = await EventPage.findOne({ pageSlug: slug.toLowerCase() });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Event page with slug '${slug}' not found`,
      });
    }
    
    // Validate section name
    const validSections = ['heroSection', 'ourEvents', 'celebrationsSeamless', 'descriptionText', 'celebrationTypes', 'meta'];
    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section name. Valid sections: ${validSections.join(', ')}`,
      });
    }
    
    // Check if section is valid for page type
    if (page.pageType === 'parent' && ['descriptionText', 'celebrationTypes'].includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Section '${section}' is not valid for parent pages`,
      });
    }
    
    if (page.pageType === 'child' && ['ourEvents', 'celebrationsSeamless'].includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Section '${section}' is not valid for child pages`,
      });
    }
    
    // Handle descriptionText as a simple string field
    if (section === 'descriptionText') {
      // If sectionData is an object with a value property, extract it
      if (typeof sectionData === 'object' && sectionData !== null && 'value' in sectionData) {
        page[section] = sectionData.value;
      } else if (typeof sectionData === 'string') {
        page[section] = sectionData;
      } else {
        page[section] = sectionData;
      }
    } else {
      page[section] = sectionData;
    }
    
    const updatedPage = await page.save();
    
    res.status(200).json({
      success: true,
      message: `Section '${section}' updated successfully`,
      data: updatedPage,
    });
  } catch (error) {
    console.error('Error updating section:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update section',
      error: error.message,
    });
  }
};

// Delete event page by slug
export const deleteEventPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const deletedPage = await EventPage.findOneAndDelete({ pageSlug: slug.toLowerCase() });
    
    if (!deletedPage) {
      return res.status(404).json({
        success: false,
        message: `Event page with slug '${slug}' not found`,
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event page deleted successfully',
      data: deletedPage,
    });
  } catch (error) {
    console.error('Error deleting event page:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete event page',
      error: error.message,
    });
  }
};

// Toggle active status
export const toggleEventPageStatus = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const page = await EventPage.findOne({ pageSlug: slug.toLowerCase() });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: `Event page with slug '${slug}' not found`,
      });
    }
    
    page.active = !page.active;
    const updatedPage = await page.save();
    
    res.status(200).json({
      success: true,
      message: `Event page ${updatedPage.active ? 'activated' : 'deactivated'} successfully`,
      data: updatedPage,
    });
  } catch (error) {
    console.error('Error toggling page status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle page status',
      error: error.message,
    });
  }
};
