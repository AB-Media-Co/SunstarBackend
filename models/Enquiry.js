import mongoose from "mongoose";
const { Schema } = mongoose;

const enquirySchema = new Schema({
  page: { type: String, required: true },
  companyName: { type: String, required: false }, // Made optional for flexibility
  name: { type: String },
  email: { type: String, required: false }, // Made optional for flexibility
  address: String,
  decisionMaker: String,
  phone: String,
  enquiry: String,
  date: String,
  submittedAt: { type: Date, default: Date.now },
}, { 
  strict: false // Allow any additional fields not defined in schema
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

