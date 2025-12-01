// models/Partner.js
import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true, trim: true }, // stored URL/path of uploaded image
    description: { type: String, required: true, trim: true, maxlength: 500 },
    category: {
      type: String,
      enum: ['Corporate', 'Travel Agent'],
      default: 'Corporate',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Partner', PartnerSchema);
