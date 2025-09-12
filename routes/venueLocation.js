import { Router } from 'express';
import {
  createVenueLocation,
  getVenueLocations,
  getVenueLocationByIdOrSlug,
  updateVenueLocation,
  deleteVenueLocation
} from '../controllers/VenueLocationController.js';

const router = Router();

router.get('/', getVenueLocations);
router.get('/:idOrSlug', getVenueLocationByIdOrSlug);
router.post('/', createVenueLocation);
router.patch('/:idOrSlug', updateVenueLocation);
router.delete('/:idOrSlug', deleteVenueLocation);

export default router;
