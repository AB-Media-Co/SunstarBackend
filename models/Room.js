import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  RoomTypeID: { type: String, required: true },
  RateTypeID: { type: String, required: true },
  roomrateunkid: { type: String, required: true },
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
  baseAdultOccupancy: { type: Number, default: 2 }, // From eZee: base_adult_occupancy
  maxAdultOccupancy: { type: Number, default: 3 }, // From eZee: max_adult_occupancy
  extraAdultRate: { type: Number, min: 0, default: 0 }, // From eZee: extra_adult_rates_info.rack_rate
  extraChildRate: { type: Number, min: 0, default: 0 }, // From eZee: extra_child_rates_info.rack_rate
  squareFeet: { type: Number, min: 0 },
  show: { type: Boolean, default: false },
}, {
  indexes: [
    { key: { RoomTypeID: 1, RateTypeID: 1 }, unique: true }, // Enforced unique combination
    { key: { HotelCode: 1 } }, // Index for HotelCode if frequently queried
  ]
});


export default mongoose.model('Room', RoomSchema);