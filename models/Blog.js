// models/Blog.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    keywords: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: [
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
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

blogSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

export default mongoose.model('Blog', blogSchema);
