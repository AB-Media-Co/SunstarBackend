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

    // --- NEW FIELDS for Last Minute & Early Booker logic ---
    dealType: {
      type: String,
      enum: ['lastMinute', 'earlyBooker', 'standard'],
      default: 'standard'
    },
    bookingRestrictionUnit: {
      type: String,
      enum: ['days', 'hours', 'none'],
      default: 'none'
    },
    // e.g., “30 days or more”
    minAdvance: { type: Number, default: 0 },
    // e.g., “3 days or fewer”
    maxAdvance: { type: Number, default: 0 },
    // Limit the booking window to certain hours
    limitPromotionToHours: { type: Boolean, default: false },
    startHour: { type: Number, min: 0, max: 23, default: 0 },
    endHour: { type: Number, min: 0, max: 23, default: 23 },
  },
  { timestamps: true }
);

export default mongoose.model('Deal', dealSchema);
