// routes/partner.routes.js
import { Router } from 'express';
import {
  createPartner,
  listPartners,
  getPartner,
  updatePartner,
  deletePartner
} from '../controllers/partnerController.js';

const router = Router();

router.post('/', createPartner);      // body: { imageUrl, description }
router.get('/', listPartners);
router.get('/:id', getPartner);
router.patch('/:id', updatePartner);  // body: { imageUrl?, description? }
router.delete('/:id', deletePartner);

export default router;
