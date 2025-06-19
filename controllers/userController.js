// controllers/userController.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Setup email transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// ✅ Get full user info by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    // If email missing or empty
    if (!email || email.trim() === '') {
      return res.json({
        success: true,
        data: {
          id: null,
          isVerified: false,
          email: null,
          phone: null,
          firstName: null,
          lastName: null,
          role: null,
          loyalAgent: null,
          bookingDetails: []
        }
      });
    }

    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.json({
        success: true,
        data: {
          id: null,
          isVerified: false,
          email: email,
          phone: null,
          firstName: null,
          lastName: null,
          role: null,
          loyalAgent: null,
          bookingDetails: []
        }
      });
    }

    // If user found
    res.json({
      success: true,
      data: {
        id: user._id,
        isVerified: user.isVerified,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        loyalAgent: user.loyalAgent,
        bookingDetails: user.bookingDetails
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




// Send OTP to email
export const sendOtp2 = async (req, res) => {
  try {
    const { email, phone, firstName, lastName, role, loyalAgent } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ success: false, message: 'Email and phone are required' });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        phone,
        firstName,
        lastName,
        role,
        loyalAgent,
        otp,
        otpExpires
      });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    // ✅ Beautiful HTML Email
    const mailOptions = {
      from: 'Sunstar Hospitality <webmaster@sunstarhospitality.com>',
      to: email,
      subject: 'Your One-Time Password (OTP)',
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <div style="background-color: #f5a623; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Sunstar Hospitality</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi ${firstName || 'User'},</p>
            <p style="font-size: 16px;">Your One-Time Password (OTP) for logging in is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="display: inline-block; background-color: #f5a623; color: #fff; font-size: 36px; font-weight: bold; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px;">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #555;">This OTP is valid for 10 minutes. Please do not share this code with anyone for security reasons.</p>
            <p style="font-size: 14px; color: #555;">By logging in or signing up, you agree with our <a href="#" style="color: #f5a623;">Terms and Conditions</a> and <a href="#" style="color: #f5a623;">Privacy Policy</a>.</p>
            <p style="margin-top: 40px; font-size: 16px;">Safe travels,<br><strong>Team Sunstar</strong></p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 13px; color: #777;">
            Need help? Call us at +91 99999 99999 or email at webmaster@sunstarhospitality.com
          </div>
        </div>
        `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'OTP sent successfully' });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Verify OTP
export const verifyOtp2 = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true, message: 'OTP verified successfully', user });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add Booking Details (Multiple)
export const addBookingDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookingData = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.bookingDetails.push(bookingData);
    await user.save();

    res.json({ success: true, message: 'Booking added successfully', user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
