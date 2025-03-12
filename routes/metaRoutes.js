import { Router } from 'express';
import {
  createMeta,
  getAllMeta,
  getMetaByPage,
  updateMeta,
  deleteMeta
} from '../controllers/metaController.js';

const router = Router();

// Create a new meta entry
router.post('/', createMeta);

// Retrieve all meta entries
router.get('/', getAllMeta);

// Get meta info for a specific page
router.get('/page/:page', getMetaByPage);

// Update meta entry by ID
router.put('/:id', updateMeta);

// Delete meta entry by ID
router.delete('/:id', deleteMeta);

export default router;
