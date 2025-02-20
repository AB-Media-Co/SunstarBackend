import express from 'express';
import { uploadImages } from '../config/cloudinary.js';

const router = express.Router();


router.post('/upload', uploadImages);


export default router;
