import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";

// Initialize Razorpay instance using keys from environment variables
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new Razorpay order and store it in the database
export const createOrder = async (req, res) => {
  const { amount } = req.body; // amount in paise (e.g., ₹100 = 10000 paise)
  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpayInstance.orders.create(options);

    // Save order details in the database
    const payment = await Payment.create({
      amount,
      currency: "INR",
      receipt: options.receipt,
      razorpayOrderId: order.id,
      status: order.status,
    });

    return res.status(201).json({ order, payment });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Verify the payment signature sent by Razorpay after payment completion
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    // Generate expected signature using order id and payment id
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update payment status in the database
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (payment) {
        payment.status = "paid";
        await payment.save();
        return res.json({ success: true, payment });
      } else {
        return res.status(404).json({ error: "Payment order not found" });
      }
    } else {
      return res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: error.message });
  }
};
