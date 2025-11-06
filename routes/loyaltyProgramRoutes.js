// routes/loyaltyProgramRoutes.js
import express from 'express';
import {
  getLoyalty,
  upsertLoyalty,
  addTier,
  updateTierByLevel,
  deleteTierByLevel,
  seedLoyalty
} from '../controllers/loyaltyProgramController.js';

const router = express.Router();

// Public read
router.get('/', getLoyalty);

// Upsert full page
router.put('/', upsertLoyalty);

// Tier CRUD
router.post('/tiers', addTier);
router.put('/tiers/:level', updateTierByLevel);
router.delete('/tiers/:level', deleteTierByLevel);

// Seed (dev)
router.post('/seed/loyalty', seedLoyalty);

export default router;
