
// =============================
// routes/travelAgentRoutes.js (unified)
// =============================
import { Router } from 'express';
import {
  getTAPage,
  upsertTAPage,
  patchTAHero,
  getCards,
  addCard,
  addCardsBulk,
  updateCard,
  deleteCard,
} from '../controllers/travelAgentController.js';

const router = Router();

// Public
router.get('/', getTAPage);
router.get('/cards', getCards); // ?section=partner|howitworks

// Admin
router.put('/',  upsertTAPage);
router.patch('/hero',  patchTAHero);

// Unified cards
router.post('/cards',  addCard); // body: { section, title, description, icon? }
router.post('/cards/bulk',  addCardsBulk); // body: { section, cards: [...] }
router.put('/cards/:section/:cardId',  updateCard);
router.delete('/cards/:section/:cardId',  deleteCard);

export default router;

