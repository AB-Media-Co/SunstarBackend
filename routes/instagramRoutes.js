import express from 'express';
import {fetchInstagramPosts} from '../controllers/instagramController.js'
const router = express.Router();

router.get('/posts', fetchInstagramPosts);

export default router;
