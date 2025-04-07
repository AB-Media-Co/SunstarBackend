import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

// Helper function for error responses
const handleError = (res, statusCode, customMessage, error = null) => {
  if (process.env.NODE_ENV !== 'production' && error) {
    return res.status(statusCode).json({ success: false, message: customMessage, error: error.message });
  }
  return res.status(statusCode).json({ success: false, message: customMessage });
};

// Utility function to generate a JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

// Login Admin
export const loginAdmin = async (req, res) => {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error, value } = loginSchema.validate(req.body);
  if (error)
    return handleError(res, 400, error.details[0].message);

  const { username, password } = value;

  try {
    // Explicitly select password for comparison
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin || !(await admin.matchPassword(password))) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: { id: admin._id, name: admin.name, username: admin.username, role: admin.role },
    });
  } catch (error) {
    return handleError(res, 500, 'Error logging in', error);
  }
};

// Register Admin (SuperAdmin only)
export const registerAdmin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
      }),
    role: Joi.string()
      .valid('superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer')
      .default('admin'),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    age: Joi.number().integer().min(18).max(100).required(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error)
    return handleError(res, 400, error.details[0].message);

  try {
    const { email, phone, username, password, role, gender, age, allowedCities, allowedHotels } = value;

    // Check if a SuperAdmin already exists when registering a new SuperAdmin
    if (role === 'superadmin') {
      const superAdminExists = await Admin.findOne({ role: 'superadmin' });
      if (superAdminExists) {
        return handleError(res, 400, 'SuperAdmin already exists');
      }
    }

    // Check for duplicate username, email, or phone
    const existingUser = await Admin.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existingUser) {
      return handleError(res, 400, 'Username, Email, or Phone already exists');
    }

    const admin = new Admin({
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
    return handleError(res, 500, 'Error creating admin', error);
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id)
      .populate('allowedHotels', 'name')
      .lean();
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }
    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: admin,
    });
  } catch (error) {
    return handleError(res, 500, 'Error fetching profile', error);
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\d{10}$/).optional().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
      }),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    age: Joi.number().integer().min(18).max(100).optional(),
    role: Joi.string().valid('superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer').optional(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error)
    return handleError(res, 400, error.details[0].message);

  try {
    const { name, email, phone, password, gender, age, role, allowedCities, allowedHotels } = value;
    const admin = await Admin.findById(req.admin.id).select('+password');

    if (!admin) {
      return handleError(res, 404, 'User not found');
    }

    // Only SuperAdmin can modify role or permissions
    if (req.admin.role !== 'superadmin' && (role || allowedCities || allowedHotels)) {
      return handleError(res, 403, 'Only SuperAdmin can modify role or permissions');
    }

    // Prevent changing the only SuperAdmin's role
    if (role && admin.role === 'superadmin' && role !== 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return handleError(res, 403, 'Cannot change the only SuperAdmin\'s role');
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
    const adminObj = admin.toObject();
    delete adminObj.password;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: adminObj,
    });
  } catch (error) {
    return handleError(res, 500, 'Error updating profile', error);
  }
};

// Delete Profile
export const deleteProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }
    // Prevent deletion of the only SuperAdmin
    if (admin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return handleError(res, 403, 'Cannot delete the only SuperAdmin');
      }
    }
    await Admin.findByIdAndDelete(req.admin.id);
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    return handleError(res, 500, 'Error deleting profile', error);
  }
};

// Get All Profiles
export const getAllProfiles = async (req, res) => {
  try {
    const admins = await Admin.find()
      .populate('allowedHotels', 'name')
      .lean();
    res.status(200).json({
      success: true,
      message: 'Profiles fetched successfully',
      data: admins,
    });
  } catch (error) {
    return handleError(res, 500, 'Error fetching profiles', error);
  }
};

// Update Any Profile
export const updateAnyProfile = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\d{10}$/).optional().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
      .optional()
      .messages({
        'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
      }),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    age: Joi.number().integer().min(18).max(100).optional(),
    role: Joi.string().valid('superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer').optional(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error)
    return handleError(res, 400, error.details[0].message);

  try {
    const { id } = req.params;
    const { name, email, phone, password, gender, age, role, allowedCities, allowedHotels } = value;

    const targetAdmin = await Admin.findById(id).select('+password');
    if (!targetAdmin) {
      return handleError(res, 404, 'User not found');
    }

    // Prevent non-SuperAdmin from modifying SuperAdmin
    if (targetAdmin.role === 'superadmin' && req.admin.role !== 'superadmin') {
      return handleError(res, 403, 'Cannot modify SuperAdmin');
    }

    // Only SuperAdmin can modify role or permissions
    if (req.admin.role !== 'superadmin' && (role || allowedCities || allowedHotels)) {
      return handleError(res, 403, 'Only SuperAdmin can modify role or permissions');
    }

    // Prevent changing the only SuperAdmin's role
    if (role && targetAdmin.role === 'superadmin' && role !== 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return handleError(res, 403, 'Cannot change the only SuperAdmin\'s role');
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
    const adminObj = targetAdmin.toObject();
    delete adminObj.password;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: adminObj,
    });
  } catch (error) {
    return handleError(res, 500, 'Error updating profile', error);
  }
};

// Delete Any Profile
export const deleteAnyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const targetAdmin = await Admin.findById(id);
    if (!targetAdmin) {
      return handleError(res, 404, 'User not found');
    }
    // Prevent deletion of SuperAdmin by non-superadmin
    if (targetAdmin.role === 'superadmin' && req.admin.role !== 'superadmin') {
      return handleError(res, 403, 'Cannot delete SuperAdmin');
    }
    // Prevent deleting the only SuperAdmin
    if (targetAdmin.role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount === 1) {
        return handleError(res, 403, 'Cannot delete the only SuperAdmin');
      }
    }
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    return handleError(res, 500, 'Error deleting profile', error);
  }
};

// Change Password
export const changePassword = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().optional(), // Optional: superadmin can specify a user to update
    currentPassword: Joi.string().optional(),
    newPassword: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
      }),
  }).custom((value, helper) => {
    if (!value.userId && !value.currentPassword) {
      return helper.message('Current password is required when changing your own password');
    }
    return value;
  });

  const { error, value } = schema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  try {
    const { userId, currentPassword, newPassword } = value;

    // Case 1: Superadmin changes another user's password
    if (userId && req.admin.role === 'superadmin') {
      const targetAdmin = await Admin.findById(userId).select('+password');
      if (!targetAdmin) {
        return handleError(res, 404, 'User not found');
      }
      targetAdmin.password = await bcrypt.hash(newPassword, 10);
      await targetAdmin.save();
      return res.status(200).json({
        success: true,
        message: 'Password changed successfully for the user',
      });
    }

    // Case 2: User changes their own password
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }

    if (!(await admin.matchPassword(currentPassword))) {
      return handleError(res, 401, 'Current password is incorrect');
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return handleError(res, 500, 'Error changing password', error);
  }
};
