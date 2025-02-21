// models/Hotel.js
import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  aboutUs: {
    description: { type: String },
    img: { type: String }
  },
  checkOut: { type: String },
  checkIn: { type: String },
  location: { type: String, required: true },
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
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  discountedPrice: { type: Number, min: [0, 'Discounted price must be a positive number'] },
  soldOut: { type: Boolean, default: false },
  testimonials: {
  type: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 5 },
    }
  ],
  default: []
},
  hotelCode: { type: Number, required: true },
  authKey: { type: String, required: true },
});

export default mongoose.model('Hotel', HotelSchema);