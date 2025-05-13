import bcrypt from 'bcryptjs';
import Joi from 'joi';
import { handleError, generateToken, isSuperAdminExists, hashPassword, comparePassword } from '../utils/validation.js';
import { ROLE_ENUM, PHONE_REGEX, PASSWORD_REGEX } from '../constants/validationConstants.js';
import Admin from '../models/Admin.js';

// for createing user first time

export const registerAdmin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(PHONE_REGEX).required().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).pattern(PASSWORD_REGEX).required().messages({
      'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
    }),
    role: Joi.string().valid(...ROLE_ENUM).default('admin'),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    age: Joi.number().integer().min(18).max(100).required(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  try {
    const { email, phone, username, password, role, gender, age, allowedCities, allowedHotels } = value;

    // Temporarily comment out superadmin count validation
    // Allow creating as many superadmins as needed
    /*
    if (role === 'superadmin') {
      const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
      if (superAdminCount >= 3) {
        return handleError(res, 400, 'Only 3 superadmins are allowed');
      }
    }
    */

    // Check for duplicate username, email, or phone
    const existingUser = await Admin.findOne({ $or: [{ username }, { email }, { phone }] });
    if (existingUser) {
      return handleError(res, 400, 'Username, Email, or Phone already exists');
    }

    // Create a new admin (superadmin or regular admin)
    const admin = new Admin({
      email,
      phone,
      username,
      password, // Hash password before saving
      role,  // This will allow you to set the role to 'superadmin'
      gender,
      age,
      allowedCities: allowedCities || [],
      allowedHotels: allowedHotels || [],
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    return handleError(res, 500, 'Error creating admin', error);
  }
}


// Login Admin


// export const registerAdmin = async (req, res) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(50).required(),
//     email: Joi.string().email().required(),
//     phone: Joi.string().pattern(PHONE_REGEX).required().messages({
//       'string.pattern.base': 'Phone number must be 10 digits.',
//     }),
//     username: Joi.string().min(3).max(20).required(),
//     password: Joi.string().min(6).pattern(PASSWORD_REGEX).required().messages({
//       'string.pattern.base': 'Password must be at least 6 characters and include at least one letter and one number.',
//     }),
//     role: Joi.string().valid(...ROLE_ENUM).default('admin'),
//     gender: Joi.string().valid('male', 'female', 'other').required(),
//     age: Joi.number().integer().min(18).max(100).required(),
//     allowedCities: Joi.array().items(Joi.string()).optional(),
//     allowedHotels: Joi.array().items(Joi.string()).optional(),
//   });

//   const { error, value } = schema.validate(req.body);
//   if (error) return handleError(res, 400, error.details[0].message);

//   try {
//     const { name, email, phone, username, password, role, gender, age, allowedCities, allowedHotels } = value;

//     if (role === 'superadmin') {
//       const superAdminCount = await Admin.countDocuments({ role: 'superadmin' });
//       if (superAdminCount >= 3) return handleError(res, 400, 'Only 3 superadmins are allowed');
//     }

//     const existingUser = await Admin.findOne({ $or: [{ username }, { email }, { phone }] });
//     if (existingUser) return handleError(res, 400, 'Username, Email, or Phone already exists');

//     const admin = new Admin({
//       name,
//       email,
//       phone,
//       username,
//       password, // Let pre-save hook hash this
//       role,
//       gender,
//       age,
//       allowedCities: allowedCities || [],
//       allowedHotels: allowedHotels || [],
//     });

//     await admin.save(); // Will auto-hash the password using pre-save hook

//     res.status(201).json({
//       success: true,
//       message: 'Admin created successfully',
//       data: { id: admin._id, email: admin.email, role: admin.role },
//     });
//   } catch (error) {
//     return handleError(res, 500, 'Error creating admin', error);
//   }
// };



export const loginAdmin = async (req, res) => {
  const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = loginSchema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  const { username, password } = value;

  try {
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) return handleError(res, 401, 'Invalid credentials - Admin not found');

    // const isPasswordMatch = await admin.matchPassword(password);

const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) return handleError(res, 401, 'Invalid credentials - Password mismatch');

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


// Change Password
export const changePassword = async (req, res) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(PASSWORD_REGEX).required().messages({
      'string.pattern.base': 'New password must include at least one letter and one number.',
    }),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  const { currentPassword, newPassword } = value;

  try {
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) return handleError(res, 404, 'User not found');

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) return handleError(res, 401, 'Current password is incorrect');

    admin.password = newPassword; // This will get hashed by pre-save hook
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    return handleError(res, 500, 'Error changing password', err);
  }
};






// Delete Any Profile (Admin/SuperAdmin)
export const deleteAnyProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const targetAdmin = await Admin.findById(id);
    if (!targetAdmin) {
      return handleError(res, 404, 'User not found');
    }
    // Prevent non-SuperAdmin from deleting SuperAdmin
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


// Delete Profile (Logged-in user can delete their own profile)
export const deleteProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }
    // Delete the profile
    await Admin.findByIdAndDelete(req.admin.id);
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    return handleError(res, 500, 'Error deleting profile', error);
  }
};



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



// Get Profile (For the logged-in user)
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



export const getSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await Admin.find({ role: 'superadmin' })
      .select('name email username role')
      .limit(3);

    res.status(200).json({
      success: true,
      message: 'Super admins fetched successfully',
      data: superAdmins,
    });
  } catch (error) {
    return handleError(res, 500, 'Error fetching super admins', error);
  }
};

// Update Any Profile (Admin/SuperAdmin)
export const updateAnyProfile = async (req, res) => {
  const { id } = req.params; // Get the id of the profile to update
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\d{10}$/).optional().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    password: Joi.string().min(6).optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    age: Joi.number().integer().min(18).max(100).optional(),
    role: Joi.string().valid('superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer').optional(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  try {
    // Find the admin by id
    const admin = await Admin.findById(id).select('+password');
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }

    // Prevent non-SuperAdmin from modifying SuperAdmin profile
    if (admin.role === 'superadmin' && req.admin.role !== 'superadmin') {
      return handleError(res, 403, 'Cannot modify SuperAdmin profile');
    }

    // Update the profile with provided data
    const { name, email, phone, password, gender, age, role, allowedCities, allowedHotels } = value;

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (password) admin.password = await hashPassword(password); // Hash new password if updated
    if (gender) admin.gender = gender;
    if (age) admin.age = age;
    if (role) admin.role = role;
    if (allowedCities) admin.allowedCities = allowedCities;
    if (allowedHotels) admin.allowedHotels = allowedHotels;

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


// Update Profile (For the logged-in user)
export const updateProfile = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\d{10}$/).optional().messages({
      'string.pattern.base': 'Phone number must be 10 digits.',
    }),
    password: Joi.string().min(6).optional(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    age: Joi.number().integer().min(18).max(100).optional(),
    allowedCities: Joi.array().items(Joi.string()).optional(),
    allowedHotels: Joi.array().items(Joi.string()).optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) return handleError(res, 400, error.details[0].message);

  try {
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) {
      return handleError(res, 404, 'User not found');
    }

    // Update profile fields if provided
    const { username, email, phone, password, gender, age, allowedCities, allowedHotels } = value;

    if (username) admin.username = username;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (password) admin.password = await hashPassword(password); // Hash password if updated
    if (gender) admin.gender = gender;
    if (age) admin.age = age;
    if (allowedCities) admin.allowedCities = allowedCities;
    if (allowedHotels) admin.allowedHotels = allowedHotels;

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
