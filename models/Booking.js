// models/Booking.js
import mongoose from 'mongoose';

const RoomDetailsSchema = new mongoose.Schema({
  Ratetype_Id: { type: String, default: "" },
  Roomtype_Id: { type: String, default: "" },
  baserate: { type: String, default: "0" },
  Title: { type: String, default: "" },
});

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, default: "" },
  hotelcode: { type: String, default: "" },
  authcode: { type: String, default: "" },
  roomDetails: [RoomDetailsSchema]
}, {
  timestamps: true
});

export default mongoose.model('Booking', BookingSchema);
