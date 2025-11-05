// ===== routes/careerRoutes.js (UPDATED) =====
import { Router } from 'express';import {
  getPage,
  upsertPage,
  patchHero,
  patchBenefitsMeta,
  patchJoinTeam,
  patchReadyToJoin,
  addBenefitCard,
  addBenefitCardsBulk,
  updateBenefitCard,
  deleteBenefitCard,
  addSimpleCard,
  addSimpleCardsBulk,
  updateSimpleCard,
  deleteSimpleCard,
} from '../controllers/careerController.js';

const router = Router();

router.get('/', getPage);
router.put('/',  upsertPage);

router.patch('/hero',  patchHero);
router.patch('/benefits/meta',  patchBenefitsMeta);
router.patch('/join-team',  patchJoinTeam);
router.patch('/ready-to-join',  patchReadyToJoin);

router.post('/benefit-cards',  addBenefitCard);
router.post('/benefit-cards/bulk',  addBenefitCardsBulk);
router.put('/benefit-cards/:cardId',  updateBenefitCard);
router.delete('/benefit-cards/:cardId',  deleteBenefitCard);

router.post('/simple-cards',  addSimpleCard);
router.post('/simple-cards/bulk',  addSimpleCardsBulk);
router.put('/simple-cards/:cardId',  updateSimpleCard);
router.delete('/simple-cards/:cardId',  deleteSimpleCard);

export default router;