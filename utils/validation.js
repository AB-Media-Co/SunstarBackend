import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// Utility function to handle errors
export const handleError = (res, statusCode, message, error = null) => {
  if (process.env.NODE_ENV !== 'production' && error) {
    return res.status(statusCode).json({ success: false, message, error: error.message });
  }
  return res.status(statusCode).json({ success: false, message });
};

// Utility function to hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Utility function to compare password with hashed password
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Utility function to generate JWT token
export const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// Check if SuperAdmin exists
export const isSuperAdminExists = async () => {
  return await Admin.findOne({ role: 'superadmin' });
};
