// models/Blog2.js
import mongoose from 'mongoose';

const MetaSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: "" },
  description: { type: String, trim: true, default: "" },
  keywords: { type: [String], default: [] },
  ogTitle: { type: String, trim: true, default: "" },
  ogDescription: { type: String, trim: true, default: "" },
  ogImage: { type: String, trim: true, default: "" },
  canonicalUrl: { type: String, trim: true, default: "" },
}, { _id: false });


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  meta: { type: MetaSchema, default: {} },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
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
    ],
    default: "Hospitality"
  },

  featuredImage: {
    url: String,
    alt: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    author: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better search performance
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ status: 1, publishedAt: -1 });

// Virtual for excerpt
blogSchema.virtual('excerpt').get(function () {
  return this.content.substring(0, 150) + '...';
});

// Pre-save middleware
blogSchema.pre('save', function (next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog2 = mongoose.model('Blog2', blogSchema);

export default Blog2;