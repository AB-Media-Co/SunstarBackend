import express from 'express';
import { uploadImages } from '../config/cloudinary.js';

const router = express.Router();
// Route for single image upload
router.post('/upload-single', uploadImages);

// Route for multiple image upload
router.post('/upload', uploadImages);

export default router;
