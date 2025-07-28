// controllers/blogController2.js
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Blog2 from '../models/Blog2.js';


const allowedCategories = [
  "Hospitality",
  "First-Time Visitors",
  "Location & Access",
  "Hotel Features",
  "Travel Tips",
  "Nearby Tours",
  "Shopping",
  "Wellness",
  "Guest Stories",
  "Dining",
  "Tourism & Culture",
  "Day Trips",
  "Events & Festivities",
  "International Travel",
  "Local Life",
  "Behind the Scenes",
  "Luxury on Budget",
  "Sustainability",
  "Travel Essentials",
  "Scam Awareness"
];


// Get all blogs with pagination and filtering
export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const filter = {};
    
    // Status filter
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    } else if (!req.query.status) {
      filter.status = 'published'; // default if nothing passed
    }
    
    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Search filter
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    // Author filter
    if (req.query.author) {
      filter.author = new RegExp(req.query.author, 'i');
    }
    
    const blogs = await Blog2.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-comments'); // Don't include comments in list view
    
    const total = await Blog2.countDocuments(filter);
    
    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog2.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog2 not found'
      });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
};

// Create new blog
export const createBlog = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      title,
      content,
      author,
      tags = [],
      category = 'Hospitality',
      featuredImage,
      images,
      status = 'draft'
    } = req.body;

    // ✅ Validate category
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`
      });
    }

    const blogData = {
      title,
      content,
      author,
      tags,
      category,
      status
    };

    if (featuredImage) {
      blogData.featuredImage = featuredImage;
    }

    if (images) {
      blogData.images = images;
    }

    const blog = new Blog2(blogData);
    await blog.save();

    res.status(201).json({
      success: true,
      message: 'Blog2 created successfully',
      data: blog
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message
    });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const updateData = { ...req.body };

    // ✅ Validate category if present
    if (updateData.category && !allowedCategories.includes(updateData.category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Allowed categories are: ${allowedCategories.join(", ")}`
      });
    }

    // Set publishedAt if status is changed to published
    if (updateData.status === 'published') {
      const existingBlog = await Blog2.findById(id);
      if (existingBlog && existingBlog.status !== 'published') {
        updateData.publishedAt = new Date();
      }
    }

    const blog = await Blog2.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog2 not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog2 updated successfully',
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message
    });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog2.findByIdAndDelete(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog2 not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog2 deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message
    });
  }
};

// Like blog
export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    const blog = await Blog2.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog2 not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog2 liked successfully',
      data: { likes: blog.likes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error liking blog',
      error: error.message
    });
  }
};

// Add comment to blog
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID'
      });
    }
    
    if (!author || !content) {
      return res.status(400).json({
        success: false,
        message: 'Author and content are required'
      });
    }
    
    const blog = await Blog2.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            author,
            content,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog2 not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      data: blog.comments[blog.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

// Get blog statistics
export const getBlogStats = async (req, res) => {
  try {
    const stats = await Blog2.aggregate([
      {
        $group: {
          _id: null,
          totalBlogs: { $sum: 1 },
          publishedBlogs: {
            $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] }
          },
          draftBlogs: {
            $sum: { $cond: [{ $eq: ['$status', 'draft'] }, 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$likes' },
          avgViews: { $avg: '$views' },
          avgLikes: { $avg: '$likes' }
        }
      }
    ]);

    
    
    const categoryStats = await Blog2.aggregate([
      { $match: { status: 'published' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        overall: stats[0] || {},
        categories: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};