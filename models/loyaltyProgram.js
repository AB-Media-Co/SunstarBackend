// models/loyaltyProgram.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const TierSchema = new Schema({
  level: { type: Number, required: true },
  name: { type: String, required: true },
  requirement_text: { type: String, default: '' },
  benefit_text: { type: String, default: '' },
  unlock_after_nights: { type: Number, default: 0 },
  style: { type: Schema.Types.Mixed, default: {} }
}, { _id: false });

const HowItWorksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' }
}, { _id: false });

const LoyalGuestSchema = new Schema({
  heading: { type: String, default: '' },
  description: { type: String, default: '' }
}, { _id: false });

const LoyaltyProgramSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  hero_cta: {
    text: { type: String, default: '' },
    link: { type: String, default: '' }
  },
  loyal_guest: { type: LoyalGuestSchema, default: () => ({}) },
  tiers: { type: [TierSchema], default: [] },
  how_it_works: { type: [HowItWorksSchema], default: [] },
  sidebar_widget: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: true });

const LoyaltyProgram = mongoose.models?.LoyaltyProgram || mongoose.model('LoyaltyProgram', LoyaltyProgramSchema);
export default LoyaltyProgram;
