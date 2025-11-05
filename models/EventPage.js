import mongoose from 'mongoose';

// --- Reusable subdocs ---
const EventCardSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  link:  { type: String, required: true, trim: true }
}, { _id: true });

const FeatureSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  icon: { type: String, required: true, trim: true }
}, { _id: true });

// NEW: items for celebration types (image + title only)
const SimpleItemSchema = new mongoose.Schema({
  image: { type: String, default: '', trim: true },
  title: { type: String, required: true, trim: true }
}, { _id: true });

const EventPageSchema = new mongoose.Schema({
  // Page identifier
  pageType: {
    type: String,
    enum: ['event_and_conference', 'corporate_events', 'social_events', 'wedding_events'],
    required: true,
    unique: true
  },

  // Landing-only hero (keep optional to avoid validation headaches)
  heroSection: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '' },
    ctaText: { type: String, default: 'Book Your Event Now' },
    ctaLink: { type: String, default: '#contact' }
  },

  // Landing-only text below hero
  heroDescription: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' }
  },

  // Landing: Our Events grid (3 cards)
  ourEventsSection: {
    title: { type: String, default: 'Our Events' },
    cards: { type: [EventCardSchema], default: [] }
  },

  // Landing: Seamless section (features grid)
  celebrationsSection: {
    title: { type: String, default: 'Making Your Celebrations Seamless' },
    description: { type: String, default: '' },
    features: { type: [FeatureSchema], default: [] }
  },

  // ---------- NEW: Inner Event Pages (corporate/social/wedding) ----------

  // A) Inner hero (heading + description [+ optional image])
  innerHero: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  },

  // B) Overview (below-hero block with a small title + paragraph)
  overview: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' }
  },

  // C) Celebration Types grid: section heading/desc + items(image,title)
  celebrationTypes: {
    heading: { type: String, default: '' },
    description: { type: String, default: '' },
    items: { type: [SimpleItemSchema], default: [] }
  },

  // (legacy fields – keep if already used elsewhere)
  mainEventSection: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  },
  personalisedSection: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  },
  introductionSection: {
    content: { type: String, default: '' }
  },

  meta: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: [{ type: String }]
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('EventPage', EventPageSchema);
