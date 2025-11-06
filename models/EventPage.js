import mongoose from 'mongoose';

// Schema for Hero Section
const HeroSectionSchema = new mongoose.Schema({
  heading: { type: String, trim: true, default: '' },
  subheading: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
}, { _id: false });

// Schema for Our Events Section (Parent page only)
const OurEventSchema = new mongoose.Schema({
  image: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
}, { _id: false });

// Schema for Celebrations Seamless Benefits
const CelebrationBenefitSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
}, { _id: false });

// Schema for Celebrations Seamless Section (Parent page only)
const CelebrationsSeamlessSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  benefits: [CelebrationBenefitSchema],
}, { _id: false });

// Schema for Celebration Types (Inside pages only)
const CelebrationTypeItemSchema = new mongoose.Schema({
  image: { type: String, trim: true, default: '' },
  title: { type: String, trim: true, default: '' },
}, { _id: false });

const CelebrationTypeSchema = new mongoose.Schema({
  heading: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  types: [CelebrationTypeItemSchema],
}, { _id: false });

// Main Event Page Schema
const EventPageSchema = new mongoose.Schema({
  // Page identifier and type
  pageSlug: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    enum: ['eventandconf', 'socialevent', 'corporateevent', 'weddingprewedding']
  },
  pageName: {
    type: String,
    trim: true,
    default: '',
  },
  pageType: {
    type: String,
    enum: ['parent', 'child'],
    default: 'parent',
  },
  
  // Common section for all pages
  heroSection: {
    type: HeroSectionSchema,
    default: () => ({}),
  },
  
  // Parent page only sections
  ourEvents: {
    type: [OurEventSchema],
    default: undefined, // Only for parent page
  },
  celebrationsSeamless: {
    type: CelebrationsSeamlessSchema,
    default: undefined, // Only for parent page
  },
  
  // Inside/Child pages only sections
  descriptionText: {
    type: String,
    trim: true,
    default: undefined, // Only for child pages
  },
  celebrationTypes: {
    type: CelebrationTypeSchema,
    default: undefined, // Only for child pages
  },
  
  // SEO Meta tags
  meta: {
    title: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    keywords: { type: [String], default: [] },
    ogImage: { type: String, trim: true, default: '' },
  },
  
  // Status
  active: { type: Boolean, default: true },
  
}, {
  timestamps: true,
});

// Validation middleware (commented out for flexible content management)
// EventPageSchema.pre('save', function(next) {
//   if (this.pageType === 'parent') {
//     // Parent page should not have child-only fields
//     this.descriptionText = undefined;
//     this.celebrationTypes = undefined;
//   } else if (this.pageType === 'child') {
//     // Child page should not have parent-only fields
//     this.ourEvents = undefined;
//     this.celebrationsSeamless = undefined;
//   }
//   next();
// });

export default mongoose.model('EventPage', EventPageSchema);
