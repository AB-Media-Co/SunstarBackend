import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    discountPercent: { type: Number, required: true, min: 0 },
    offerCode: { type: String, trim: true },
    visibility: {
      type: String,
      enum: ['everyone', 'secret'],
      default: 'everyone'
    },
    applyToAllHotels: { type: Boolean, default: false },
    hotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
      },
    ],
    startDate: { type: Date },
    endDate: { type: Date },
    daysOfWeek: {
      type: [String],
      enum: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      default: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    },
    platform: {
      type: String,
      enum: ['mobileAndWeb', 'mobileOnly'],
      default: 'mobileAndWeb'
    },

  },
  { timestamps: true }
);

export default mongoose.model('Deal', dealSchema);


