// routes/websiteDataRoutes.js
import express from 'express';
import { 
  getWebsiteData, 
  deleteAmenity, 
  updateAmenity,
  addAmenities,
  updateShineSection,
  updateHeroSection,
  createOffering,
  updateValueSection,
  createTestimonial,
  gridImages,
  addCoorporateBooking,
  updateHomePageDescription,
  updateFaqs,
  addContactUsDetail
} from '../controllers/websiteDataController.js';

const router = express.Router();

router.get('/', getWebsiteData);

// amenities routes
router.post('/amenities', addAmenities);
router.put('/amenities/:amenityId', updateAmenity);
router.delete('/amenities/:amenityId', deleteAmenity);


// images
router.post('/images', gridImages);

// HeroSections
router.post('/heroSection', updateHeroSection);
router.post('/homePageDescription', updateHomePageDescription);


// Shine
router.post('/shine', updateShineSection);

// offering
router.post('/what-we-Offering', createOffering);

// /whysunstar

router.post('/whysunstarValue',updateValueSection)
router.post('/testimonial',createTestimonial)
router.post('/coorporate-Booking',addCoorporateBooking)
router.post('/updateFaqs',updateFaqs)
router.post('/contactUs',addContactUsDetail)





export default router;
