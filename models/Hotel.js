import mongoose from 'mongoose';

const LocationDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
}, { _id: false });

const ImageSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true },
  images: { type: [String], default: [] }
}, { _id: false });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true }
}, { _id: false });

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  aboutUs: {
    description: { type: String },
    img: { type: String }
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
    nightlife: [LocationDetailSchema]
  },
  amenities: {
    value: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
  },
  rating: { type: Number, min: 0, max: 5 },
  images: { type: [String], default: [] },
  imageSections: {
    sections: { type: [ImageSectionSchema], default: [] },
    carouselImages: { type: [String], default: [] }
  },
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  discountedPrice: { type: Number, min: [0, 'Discounted price must be a positive number'] },
  soldOut: { type: Boolean, default: false },
  testimonials: {
    type: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        location: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        heading: {
          type: String,
          required: true,
          trim: true,
        }
      }
    ],
    default: []
  },
  faqs: {
    type: [FAQSchema],
    default: []
  },
  hotelCode: { type: Number, required: true },
  authKey: { type: String, required: true },
});

export default mongoose.model('Hotel', HotelSchema);
