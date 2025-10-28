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
router.get('/loyalty', getLoyalty);

// Upsert full page
router.put('/loyalty', upsertLoyalty);

// Tier CRUD
router.post('/loyalty/tiers', addTier);
router.put('/loyalty/tiers/:level', updateTierByLevel);
router.delete('/loyalty/tiers/:level', deleteTierByLevel);

// Seed (dev)
router.post('/seed/loyalty', seedLoyalty);

export default router;
