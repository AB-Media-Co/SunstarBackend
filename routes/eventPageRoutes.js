import express from 'express';
import {
  getEventPageByType,
  getAllEventPages,
  createEventPage,
  updateEventPage,
  updateEventPageSection,
  deleteEventPage,
  addEventCard,
  removeEventCard,
  addFeature,
  removeFeature,
  patchInnerHero, patchOverview, patchCelebrationTypesMeta,
  addCelebrationItem, updateCelebrationItem, deleteCelebrationItem

} from '../controllers/eventPageController.js';

const router = express.Router();

// Public routes
router.get('/', getAllEventPages);
router.get('/:pageType', getEventPageByType);

// Protected Admin routes
router.post('/', createEventPage);
router.put('/:pageType', updateEventPage);
router.patch('/:pageType/section/:sectionName', updateEventPageSection);
router.delete('/:pageType', deleteEventPage);


router.patch('/:pageType/inner-hero',  patchInnerHero);
router.patch('/:pageType/overview',  patchOverview);
router.patch('/:pageType/celebration-types',  patchCelebrationTypesMeta);

router.post('/:pageType/celebration-types/items',  addCelebrationItem);
router.put('/:pageType/celebration-types/items/:itemId',  updateCelebrationItem);
router.delete('/:pageType/celebration-types/items/:itemId',  deleteCelebrationItem);


// Event cards management
router.post('/:pageType/events', addEventCard);
router.delete('/:pageType/events/:cardIndex', removeEventCard);

// Features management
router.post('/:pageType/features', addFeature);
router.delete('/:pageType/features/:featureIndex', removeFeature);

export default router;
