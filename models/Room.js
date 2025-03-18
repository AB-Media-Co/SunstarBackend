import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  RoomTypeID: { type: String, required: true },
  RateTypeID: { type: String, required: true },
  RoomImage: [{ type: String }],
  HotelCode: { type: String },
  RoomName: { type: String, required: true },
  RoomDescription: { type: String },
  FromDate: { type: String },
  ToDate: { type: String },
  source: { type: String },
  Availability: { type: Number, required: true, default: 0 }, // Changed to Number
  AboutRoom: {
    description: { type: String },
    img: { type: String },
  },
  Amenities: [{
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
  }],
  defaultRate: { type: Number, min: 0 },
  discountRate: { type: Number, min: 0 },
  maxGuests: { type: Number, min: 1 }, // Ensure positive numbers
  squareFeet: { type: Number, min: 0 },
  show: { type: Boolean, default: false },
}, {
  indexes: [
    { key: { RoomTypeID: 1, RateTypeID: 1 }, unique: true }, // Enforced unique combination
    { key: { HotelCode: 1 } }, // Index for HotelCode if frequently queried
  ]
});


export default mongoose.model('Room', RoomSchema);