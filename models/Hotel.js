import mongoose from 'mongoose';

// Sub-schemas
const LocationDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { _id: false });

const ImageSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true },
  images: { type: [String], default: [] },
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
}, { _id: false });

const AddToYourStaySchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  rate: {
    amount: { type: Number, required: true },
    period: {
      type: String,
      required: true,
      trim: true,
      enum: ['per night', 'per day', '']
    },
  },
});

const ContinentalPlanSchema = new mongoose.Schema({
  rate: {
    amount: { type: Number, required: true, min: [0, 'Rate must be a positive number'] },
    period: {
      type: String,
      required: true,
      trim: true,
      enum: ['per person', 'per breakfast'],
    },
  },
}, { _id: false });

// Define AmenitySchema
const AmenitySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
}, { _id: false });

const MetaSchema = new mongoose.Schema({
  title: { type: String, trim: true,default:"" },
  description: { type: String, trim: true,default:"" },
  
  keywords: { type: [String], default: [] },
  ogTitle: { type: String, trim: true,default:"" },
  ogDescription: { type: String, trim: true,default:"" },
  ogImage: { type: String, trim: true,default:"" },
  canonicalUrl: { type: String, trim: true,default:"" },
}, { _id: false });

const HotelSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  name: { type: String, required: true },
  meta: { type: MetaSchema, default: {} },
  description: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  aboutUs: {
    description: { type: String },
    img: { type: String },
  },
  checkOut: { type: String },
  checkIn: { type: String },
  location: {
    hotelAddress: { type: String, required: true },
    metro: [LocationDetailSchema],
    airport: [LocationDetailSchema],
    railwayStation: [LocationDetailSchema],
    attractions: [LocationDetailSchema],
    restaurants: [LocationDetailSchema],
    activities: [LocationDetailSchema],
    nightlife: [LocationDetailSchema],
  },
  cityLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  amenities: {
    type: [AmenitySchema],
    default: [],
  },
  rating: { type: Number, min: 0, max: 5 },
  images: { type: [String], default: [] },
  imageSections: {
    sections: { type: [ImageSectionSchema], default: [] },
    carouselImages: { type: [String], default: [] },
  },
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  discountedPrice: { type: Number, min: [0, 'Discounted price must be a positive number'] },
  soldOut: { type: Boolean, default: false },
  testimonials: {
    type: [
      {
        name: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        heading: { type: String, required: true, trim: true },
      },
    ],
    default: [],
  },
  faqs: { type: [FAQSchema], default: [] },
  hotelCode: { type: Number, required: true },
  authKey: { type: String, required: true },
  addToYourStay: { type: [AddToYourStaySchema] },
  continentalPlan: { type: ContinentalPlanSchema },
  payAtHotel: { type: String },
  isDayUseRoom: { type: Boolean, default: false },
});

export default mongoose.model('Hotel', HotelSchema);