// routes/testimonialRoutes.js

import express from 'express';
import {
    createTestimonial,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
    bulkCreateTestimonials
} from '../controllers/testimonialController.js';

const router = express.Router();

router.post('/', createTestimonial);
router.post('/bulk', bulkCreateTestimonials);   // ← new

router.get('/', getTestimonials);           // optional ?page=…
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;
