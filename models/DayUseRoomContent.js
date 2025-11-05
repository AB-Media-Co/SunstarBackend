// models/DayUseRoomContent.js
import mongoose from 'mongoose';

const BenefitSchema = new mongoose.Schema(
  { title: { type: String, required: true, trim: true } },
  { timestamps: true }
);

const DayUseRoomContentSchema = new mongoose.Schema(
  {
    hero: { heading: { type: String, default: '' }, description: { type: String, default: '' } },
    descCard: { heading: { type: String, default: '' }, description: { type: String, default: '' } },
    benefits: { type: [BenefitSchema], default: [] },
    tandc: { points: { type: [String], default: [] } },
  },
  { timestamps: true }
);

export const DayUseRoomContent = mongoose.model(
  'DayUseRoomContent',
  DayUseRoomContentSchema
);
