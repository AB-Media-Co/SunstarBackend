// controllers/authController.js
import axios from 'axios';
import User from '../models/Verification.js';

const API_KEY = process.env.TWO_FACTOR_API_KEY; 

export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN/OTP1`;
    const response = await axios.get(url);

    if (response.data.Status === 'Success') {
      res.json({
        message: 'OTP sent successfully via SMS',
        sessionId: response.data.Details
      });
    } else {
      res.status(400).json({
        message: 'Failed to send OTP',
        details: response.data.Details
      });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};



// Then modify your verifyOtp function:
export const verifyOtp = async (req, res) => {
  const { sessionId, otp, phone } = req.body;
  if (!sessionId || !otp || !phone) {
    return res.status(400).json({ message: 'sessionId, phone number, and OTP code are required' });
  }

  try {
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
    const response = await axios.get(url);

    console.log("OTP Verification Response:", response.data);

    if (response.data.Details === 'OTP Matched') {
      let user = await User.findOne({ phone });
      
      if (!user) {
        user = new User({ 
          phone, 
          otp, 
          sessionId, 
          isVerified: true 
        });
      } else {
        user.otp = otp;
        user.sessionId = sessionId;
        user.isVerified = true;
      }
      
      await user.save();

      return res.json({
        message: 'Phone number verified successfully',
        status: response.data.Details
      });
    } else {
      return res.status(400).json({
        message: 'Invalid OTP',
        status: response.data.Details
      });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
