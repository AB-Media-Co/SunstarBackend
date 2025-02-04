import mongoose from 'mongoose';

// Room schema
const roomSchema = new mongoose.Schema({
  roomType: { 
    type: String, 
    required: true, 
    enum: ['single', 'double', 'suite', 'deluxe'] 
  },
  hotel_code: { type: String, required: true }, // Changed to match the controller
  roomNumber: { type: String, required: true },
  description: { type: String, required: true },
  roomLeft: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  discountedPrice: { type: Number, min: [0, 'Discounted price must be a positive number'] },
  soldOut: { type: Boolean, default: false },
}, { timestamps: true });

// Hotel schema
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  amenities: { type: [String], default: [], required: true },
  rating: { type: Number, min: 0, max: 5 },
  images: { type: [String], default: [] },
  price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
  discountedPrice: { type: Number, min: [0, 'Discounted price must be a positive number'] },
  soldOut: { type: Boolean, default: false },
  testimonials: { 
    type: [{
      name: { type: String, required: true },
      description: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 5 },
    }], 
    default: [] 
  },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);
const Room = mongoose.model('Room', roomSchema);

export { Hotel, Room };