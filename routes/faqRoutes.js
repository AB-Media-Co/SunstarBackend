// /routes/faqRoutes.js
import express from 'express';
import { addFAQ, updateFAQ, deleteFAQ, getFAQsByPage, addMultipleFAQs } from '../controllers/faqController.js';

const router = express.Router();

router.post('/add', addFAQ);  // Add new FAQ
router.post('/add-multiple', addMultipleFAQs);  // Add new FAQ
router.put('/update/:id', updateFAQ);  // Update FAQ by ID
router.delete('/delete/:id', deleteFAQ);  // Delete FAQ by ID
router.get('/:page', getFAQsByPage);  // Get FAQs by page

export default router;
