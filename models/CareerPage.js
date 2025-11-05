// ===== models/CareerPage.js (UPDATED) =====
import mongoose from 'mongoose';

const BenefitCardSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' }, // optional
  },
  { timestamps: true }
);

const SimpleCardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, trim: true, default: '' }, // optional
  },
  { timestamps: true }
);

const CareerPageSchema = new mongoose.Schema(
  {
    hero: {
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    benefits: {
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
      cards: { type: [BenefitCardSchema], default: [] },
    },
    joinTeam: {
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    readyToJoin: {
      heading: { type: String, default: '' },
      description: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    simpleCards: { type: [SimpleCardSchema], default: [] },
  },
  { timestamps: true }
);

export const CareerPage = mongoose.model('CareerPage', CareerPageSchema);


