import express from 'express';
import { getPolicy, updatePolicy } from '../controllers/policyController.js';

const router = express.Router();

router.get('/:type', getPolicy);
router.put('/:type', updatePolicy);

export default router;
