import mongoose from "mongoose";

const bookingDetailsSchema = new mongoose.Schema({
  HotelCode: { type: String },
  APIKey: { type: String },
  language: { type: String },
  ResNo: { type: String },
  SubNo: { type: String },
  BookingType: { type: String },
  language: { type: String }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);  // only 10 digit phone numbers allowed
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "travelAgent", "coorporateAgent"],
    default: "user"
  },

  loyalAgent: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },

  bookingDetails: [bookingDetailsSchema]

}, { timestamps: true });

export const getModel = (modelName, schema) => {
  return mongoose.models[modelName] || mongoose.model(modelName, schema);
}

export default getModel("User", userSchema);
