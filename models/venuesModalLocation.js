import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
  {
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    area: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, default: 'India', trim: true },
    coordinates: {
      lat: { type: Number, min: -90, max: 90 },
      lng: { type: Number, min: -180, max: 180 }
    }
  },
  { _id: false }
);

const VenueLocationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    address: { type: AddressSchema, required: true },
    phone: { type: String, trim: true, match: [/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone format'] },
    email: { type: String, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
    mapUrl: { type: String, trim: true },
    website: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    slug: { type: String, unique: true, index: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

VenueLocationSchema.pre('validate', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

const VenueLocationModel = mongoose.model('VenueLocation', VenueLocationSchema);
export default VenueLocationModel;
