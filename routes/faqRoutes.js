// /routes/faqRoutes.js
import express from 'express';
import { addFAQ, updateFAQ, deleteFAQ, getFAQsByPage, addMultipleFAQs } from '../controllers/faqController.js';

const router = express.Router();

router.post('/add', addFAQ); 
router.post('/add-multiple', addMultipleFAQs); 
router.put('/update/:id', updateFAQ);
router.delete('/delete/:id', deleteFAQ);  
router.get('/:page', getFAQsByPage);  

export default router;
