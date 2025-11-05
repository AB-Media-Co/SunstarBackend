// =============================
// models/TravelAgentPage.js (same as before)
// =============================
import mongoose from 'mongoose';

const CardBase = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

const TravelAgentPageSchema = new mongoose.Schema(
  {
    hero: { heading: { type: String, default: '' }, description: { type: String, default: '' } },
    partnerWithUs: { heading: { type: String, default: '' }, description: { type: String, default: '' }, cards: { type: [CardBase], default: [] } },
    howItWorks: { heading: { type: String, default: '' }, description: { type: String, default: '' }, cards: { type: [CardBase], default: [] } },
  },
  { timestamps: true }
);

export const TravelAgentPage = mongoose.model('TravelAgentPage', TravelAgentPageSchema);

