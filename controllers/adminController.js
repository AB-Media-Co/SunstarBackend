import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

// Utility function to generate a token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: { id: admin._id, name: admin.name, username: admin.username, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
};

// Register Admin
export const registerAdmin = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'editor', 'viewer').default('admin'),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    age: Joi.number().integer().min(18).max(100).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }

  try {
    const { name, email, phone, username, password, role, gender, age } = value;

    const existingUser = await Admin.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username, Email, or Phone already exists' });
    }

    const admin = new Admin({
      name,
      email,
      phone,
      username,
      password,
      role,
      gender,
      age,
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating admin', error: error.message });
  }
};




// Get Individual Profile
export const getProfile = async (req, res) => {
  try {
    // Fetch the user data excluding the password
    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: {
        id: admin?._id,
        name: admin?.name,
        email: admin?.email,
        phone: admin?.phone,
        username: admin.username,
        role: admin.role,
        gender: admin.gender,
        age: admin.age,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, password, gender, age } = req.body;

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (password) admin.password = await bcrypt.hash(password, 10); // Re-hash password
    if (gender) admin.gender = gender;
    if (age) admin.age = age;

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        gender: admin.gender,
        age: admin.age,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
  }
};





// Get All Profiles (Admin Only)
export const getAllProfiles = async (req, res) => {
  try {
    // Check if the requester has an admin role
    if (req.admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const admins = await Admin.find().select('-password');

    res.status(200).json({
      success: true,
      message: 'Profiles fetched successfully',
      data: admins.map((admin) => ({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        username: admin.username,
        role: admin.role,
        gender: admin.gender,
        age: admin.age,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profiles',
      error: error.message,
    });
  }
};


export const updateAnyProfile = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { id } = req.params;
    const { name, email, phone, password, gender, age } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (password) admin.password = await bcrypt.hash(password, 10); // Re-hash password
    if (gender) admin.gender = gender;
    if (age) admin.age = age;

    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        gender: admin.gender,
        age: admin.age,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};


export const deleteAnyProfile = async (req, res) => {
  try {
    if (req.admin.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const { id } = req.params;

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
  }
};


