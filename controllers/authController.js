// controllers/authController.js
import twilio from 'twilio';
import User from '../models/Verification.js'
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const serviceSid = process.env.TWILIO_SERVICE_SID;

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone number is required' });

  try {
    const verification = await client.verify.services(serviceSid)
      .verifications
      .create({ to: phone, channel: 'sms' });
    
    console.log("OTP Sent Response:", verification); // Add this for debugging

    res.json({ message: 'OTP sent successfully', status: verification.status });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ message: 'Phone number and OTP code are required' });
  }

  try {
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: phone, code });

    console.log("Verification Check Response:", verificationCheck); // Add this for debugging

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone });
      if (!user) {
        user = new User({ phone, isVerified: true });
      } else {
        user.isVerified = true;
      }
      await user.save();
      
      return res.json({ message: 'Phone number verified successfully', status: verificationCheck.status });
    } else {
      return res.status(400).json({ message: 'Invalid OTP', status: verificationCheck.status });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
