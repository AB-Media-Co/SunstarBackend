import express from 'express';
import {
  getAllEventPages,
  getEventPageBySlug,
  createEventPage,
  updateEventPageBySlug,
  updateEventPageSection,
  deleteEventPageBySlug,
  toggleEventPageStatus,
} from '../controllers/eventPageController.js';

const router = express.Router();

// Public routes (for frontend to fetch data)
router.get('/', getAllEventPages);
router.get('/:slug', getEventPageBySlug);


// Create new event page
router.post('/', /* protect, restrictToRole(['admin', 'superadmin']), */ createEventPage);

// Update entire event page
router.put('/:slug', /* protect, restrictToRole(['admin', 'superadmin']), */ updateEventPageBySlug);

// Update specific section of event page
router.patch('/:slug/section/:section', /* protect, restrictToRole(['admin', 'superadmin']), */ updateEventPageSection);

// Toggle active status
router.patch('/:slug/toggle-status', /* protect, restrictToRole(['admin', 'superadmin']), */ toggleEventPageStatus);

// Delete event page
router.delete('/:slug', /* protect, restrictToRole(['admin', 'superadmin']), */ deleteEventPageBySlug);

export default router;
