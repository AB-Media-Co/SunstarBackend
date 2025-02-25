import mongoose from "mongoose";
const { Schema } = mongoose;

const enquirySchema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  address: String,
  decisionMaker: String,
  phone: String,
  enquiry: String,
  submittedAt: { type: Date, default: Date.now },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;
