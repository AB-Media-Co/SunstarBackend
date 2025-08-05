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

    const emptyData = {
      id: null,
      isVerified: false,
      email: null,
      phone: null,
      firstName: null,
      lastName: null,
      role: null,
      loyalAgent: null,
      bookingDetails: [],
      totalBookings: 0, // count added
      dateOfBirth: null,
      gender: null,
      cityOfResidence: null,
      gstin: null
    };

    if (!email || email.trim() === '') {
      return res.json({
        success: true,
        data: emptyData
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: true,
        data: {
          ...emptyData,
          email // preserve the queried email
        }
      });
    }

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
        bookingDetails: user.bookingDetails,
        totalBookings: (user.bookingDetails || []).length, // total count
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        cityOfResidence: user.cityOfResidence || '',
        gstin: user.gstin || ''
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

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    let user = await User.findOne({ email });

    if (!user) {
      // Check if phone number already exists with another user
      if (phone && phone.trim() !== '') {
        const existingPhoneUser = await User.findOne({ phone });
        if (existingPhoneUser) {
          return res.status(400).json({ 
            success: false, 
            message: 'Phone number is already registered with another account' 
          });
        }
      }

      try {
        user = await User.create({
          email,
          phone: phone && phone.trim() !== '' ? phone : undefined, // Only set phone if provided
          firstName,
          lastName,
          role,
          loyalAgent,
          otp,
          otpExpires
        });
      } catch (createError) {
        // Handle duplicate key error specifically
        if (createError.code === 11000) {
          if (createError.keyPattern && createError.keyPattern.phone) {
            return res.status(400).json({ 
              success: false, 
              message: 'Phone number is already registered with another account' 
            });
          }
          if (createError.keyPattern && createError.keyPattern.email) {
            return res.status(400).json({ 
              success: false, 
              message: 'Email is already registered' 
            });
          }
          return res.status(400).json({ 
            success: false, 
            message: 'Account with this information already exists' 
          });
        }
        throw createError; // Re-throw if it's not a duplicate key error
      }
    } else {
      // User exists, just update OTP
      user.otp = otp;
      user.otpExpires = otpExpires;
      
      // Update other fields if provided (but be careful with phone)
      if (phone && phone.trim() !== '' && phone !== user.phone) {
        const existingPhoneUser = await User.findOne({ phone });
        if (existingPhoneUser && existingPhoneUser._id.toString() !== user._id.toString()) {
          return res.status(400).json({ 
            success: false, 
            message: 'Phone number is already registered with another account' 
          });
        }
        user.phone = phone;
      }
      
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (role) user.role = role;
      if (loyalAgent !== undefined) user.loyalAgent = loyalAgent;
      
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
    console.error('Error in sendOtp2:', err);
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


// Check if user is verified by email
export const checkEmailVerification = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email || email.trim() === '') {
      return res.json({ success: false, verified: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.json({ success: true, verified: true });
    } else {
      return res.json({ success: true, verified: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// ✅ Update User Profile (e.g., DOB, Gender, City, GST, etc.)
export const updateUserProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const updateFields = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required for update' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', user });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
