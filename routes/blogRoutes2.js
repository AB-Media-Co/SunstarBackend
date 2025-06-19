// routes/blogRoutes2.js
import express from 'express';
import { body } from 'express-validator';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addComment,
  getBlogStats
} from '../controllers/blogController2.js';

const router = express.Router();

// Validation middleware
const blogValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('author')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Author name must be at least 2 characters long'),
  body('category')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Category must be at least 2 characters long'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be draft, published, or archived'),
  body('featuredImage.url')
    .optional()
    .isURL()
    .withMessage('Featured image URL must be valid'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array'),
  body('images.*.url')
    .optional()
    .isURL()
    .withMessage('Image URL must be valid')
];


// GET /api/blogs - Get all blogs with filtering and pagination
router.get('/', getAllBlogs);

// GET /api/blogs/stats - Get blog statistics
router.get('/stats', getBlogStats);

// GET /api/blogs/:id - Get single blog by ID
router.get('/:id', getBlogById);

// POST /api/blogs - Create new blog
router.post('/', blogValidation, createBlog);

// PUT /api/blogs/:id - Update blog
router.put('/:id', blogValidation, updateBlog);

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', deleteBlog);

// POST /api/blogs/:id/like - Like a blog
router.post('/:id/like', likeBlog);

// POST /api/blogs/:id/comments - Add comment to blog
router.post('/:id/comments', [
  body('author')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Author name is required'),
  body('content')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Comment content is required')
], addComment);

export default router;