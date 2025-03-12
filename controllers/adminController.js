import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

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

// Register Admin (SuperAdmin only)
export const registerAdmin = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string()
      .valid('superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer')
      .default('admin'),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    age: Joi.number().integer().min(18).max(100).required(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  try {
    const { name, email, phone, username, password, role, gender, age, allowedCities, allowedHotels } = value;

    // Check for existing SuperAdmin if registering a SuperAdmin
    if (role === 'superadmin') {
      const superAdminExists = await Admin.findOne({ role: 'superadmin' });
      if (superAdminExists) {
        return res.status(400).json({ success: false, message: 'SuperAdmin already exists' });
      }
    }

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
      allowedCities: allowedCities || [],
      allowedHotels: allowedHotels || [],
      isSuperAdmin: role === 'superadmin',
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
    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        username: admin.username,
        role: admin.role,
        gender: admin.gender,
        age: admin.age,
        allowedCities: admin.allowedCities,
        allowedHotels: admin.allowedHotels,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile', error: error.message });
  }
};

// Update Individual Profile (with role update for SuperAdmin)
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, password, gender, age, role, allowedCities, allowedHotels } = req.body;

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Only SuperAdmin can modify role or permissions
    if (req.admin.role !== 'superadmin' && (role || allowedCities || allowedHotels)) {
      return res.status(403).json({ success: false, message: 'Only SuperAdmin can modify role or permissions' });
    }

    // Prevent changing the only SuperAdmin's role
    if (role && admin.role === 'superadmin' && role !== 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return res.status(403).json({ success: false, message: 'Cannot change the only SuperAdmin\'s role' });
      }
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (password) admin.password = await bcrypt.hash(password, 10);
    if (gender) admin.gender = gender;
    if (age) admin.age = age;
    if (role && req.admin.role === 'superadmin') {
      admin.role = role;
      admin.isSuperAdmin = role === 'superadmin';
    }
    if (allowedCities && req.admin.role === 'superadmin') admin.allowedCities = allowedCities;
    if (allowedHotels && req.admin.role === 'superadmin') admin.allowedHotels = allowedHotels;

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
        role: admin.role,
        allowedCities: admin.allowedCities,
        allowedHotels: admin.allowedHotels,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};

// Delete Individual Profile
export const deleteProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent SuperAdmin from being deleted by themselves if they're the only one
    if (admin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return res.status(403).json({ success: false, message: 'Cannot delete the only SuperAdmin' });
      }
    }

    await Admin.findByIdAndDelete(req.admin.id);

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
  }
};

// Get All Profiles (SuperAdmin/Admin only)
export const getAllProfiles = async (req, res) => {
  try {
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
        allowedCities: admin.allowedCities,
        allowedHotels: admin.allowedHotels,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profiles', error: error.message });
  }
};

// Update Any Profile (SuperAdmin/Admin only, with role update)
export const updateAnyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, gender, age, role, allowedCities, allowedHotels } = req.body;

    const targetAdmin = await Admin.findById(id);

    if (!targetAdmin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent Admin from modifying SuperAdmin
    if (targetAdmin.role === 'superadmin' && req.admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Cannot modify SuperAdmin' });
    }

    // Only SuperAdmin can modify role or permissions
    if (req.admin.role !== 'superadmin' && (role || allowedCities || allowedHotels)) {
      return res.status(403).json({ success: false, message: 'Only SuperAdmin can modify role or permissions' });
    }

    // Prevent changing the only SuperAdmin's role
    if (role && targetAdmin.role === 'superadmin' && role !== 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return res.status(403).json({ success: false, message: 'Cannot change the only SuperAdmin\'s role' });
      }
    }

    if (name) targetAdmin.name = name;
    if (email) targetAdmin.email = email;
    if (phone) targetAdmin.phone = phone;
    if (password) targetAdmin.password = await bcrypt.hash(password, 10);
    if (gender) targetAdmin.gender = gender;
    if (age) targetAdmin.age = age;
    if (role && req.admin.role === 'superadmin') {
      targetAdmin.role = role;
      targetAdmin.isSuperAdmin = role === 'superadmin';
    }
    if (allowedCities && req.admin.role === 'superadmin') targetAdmin.allowedCities = allowedCities;
    if (allowedHotels && req.admin.role === 'superadmin') targetAdmin.allowedHotels = allowedHotels;

    await targetAdmin.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: targetAdmin._id,
        name: targetAdmin.name,
        email: targetAdmin.email,
        phone: targetAdmin.phone,
        gender: targetAdmin.gender,
        age: targetAdmin.age,
        role: targetAdmin.role,
        allowedCities: targetAdmin.allowedCities,
        allowedHotels: targetAdmin.allowedHotels,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
  }
};

// Delete Any Profile (SuperAdmin/Admin only)
export const deleteAnyProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const targetAdmin = await Admin.findById(id);

    if (!targetAdmin) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Prevent Admin from deleting SuperAdmin
    if (targetAdmin.role === 'superadmin' && req.admin.role !== 'superadmin') {
      return res.status(403).json({ success: false, message: 'Cannot delete SuperAdmin' });
    }

    // Prevent deleting the only SuperAdmin
    if (targetAdmin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return res.status(403).json({ success: false, message: 'Cannot delete the only SuperAdmin' });
      }
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting profile', error: error.message });
  }
};