// routes/instagramRoutes.js
import express from 'express';
import { getInstagramPosts, proxyImage } from '../controllers/instagramController.js';

const router = express.Router();

// Route to fetch Instagram posts
router.get('/posts', getInstagramPosts);

// Route to proxy images
router.get('/proxy-image', proxyImage);

export default router;
