import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  RoomTypeID: { type: String, required: true, unique: true },
  RateTypeID: { type: String, required: true, unique: true },
  RoomImage: [{ type: String }],
  HotelCode: { type: String },
  RoomName: { type: String, required: true },
  RoomDescription: { type: String },
  AboutRoom: {
    description: { type: String },
    img: { type: String },
  },
  Amenities: [{
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
  }],
  defaultRate: { type: Number },
  discountRate: { type: Number },
  maxGuests: { type: Number },
  squareFeet: { type: Number },
  available: { type: Boolean },
});

export default mongoose.model('Room', RoomSchema);
