import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    receipt: { type: String, required: true },
    razorpayOrderId: { type: String },
    status: { type: String, default: "created" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
