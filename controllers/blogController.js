import Blog from '../models/Blog.js';
import slugify from 'slugify';

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { title, description, image, keywords, category } = req.body;
        let slug = slugify(title, { lower: true, strict: true });
        
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            slug = `${slug}-${Date.now()}`; 
        }

        const blog = new Blog({
            title,
            description,
            image,
            slug,
            keywords,
            category
        });

        const savedBlog = await blog.save();
        
        res.status(201).json({
            success: true,
            data: savedBlog,
            message: 'Blog created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all blogs with optional filtering by keyword or category
export const getAllBlogs = async (req, res) => {
    try {
        const { keyword, category } = req.query;
        let query = {};

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { keywords: { $in: [keyword] } },
                { category: { $regex: keyword, $options: 'i' } }  // <-- Added category to keyword search
            ];
        }


        if (category) {
            query.category = category;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single blog by ID (for admin use)
export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update blog
export const updateBlog = async (req, res) => {
    try {
        const { title, description, image, keywords, category } = req.body;
        const updateData = { description, image };

        if (title) {
            let slug = slugify(title, { lower: true, strict: true });
            // Check for duplicate slug, excluding the current blog
            const existingBlog = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
            if (existingBlog) {
                slug = `${slug}-${Date.now()}`; // Append timestamp if slug exists for another blog
            }
            updateData.title = title;
            updateData.slug = slug;
        }

        // Update keywords and category if provided
        if (keywords) updateData.keywords = keywords;
        if (category) updateData.category = category;

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog,
            message: 'Blog updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single blog by slug (for public use)
export const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
