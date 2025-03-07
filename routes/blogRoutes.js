import express from 'express';
import {
    createBlog,
    getAllBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogBySlug
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/')
    .post(createBlog)
    .get(getAllBlogs);

// ID-based routes for admin operations
router.route('/:id')
    .get(getBlog)
    .put(updateBlog)
    .delete(deleteBlog);

// Slug-based route for public access
router.route('/slug/:slug')
    .get(getBlogBySlug);

export default router;