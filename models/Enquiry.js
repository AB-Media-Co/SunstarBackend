import mongoose from "mongoose";
const { Schema } = mongoose;

const enquirySchema = new Schema({
  page: { type: String, required: true },
  companyName: { type: String, required: true },
  name: { type: String ,required: true },
  email: { type: String, required: true },
  address: String,
  decisionMaker: String,
  phone: String,
  enquiry: String,
  date: String,
  submittedAt: { type: Date, default: Date.now },
});


const BookingSchema = new mongoose.Schema({
  hotelCode: String,
  Hoteldata: String,
  checkIn: Date,
  checkOut: Date,
  roomName: String,
  option: String,
  price: Number,
  RoomTypeID: String,
  RateTypeID: String,
  userEmail: String,
  userPhone: String,
  submittedAt: Date,
});


export const Enquiry = mongoose.model("Enquiry", enquirySchema);
export const Bookings = mongoose.model("Allbookings", BookingSchema);

