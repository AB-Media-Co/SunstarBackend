import express from 'express';
import {
  getAllProfiles,
  getProfile,
  loginAdmin,
  registerAdmin,
  updateProfile,
  deleteProfile,
  updateAnyProfile,
  deleteAnyProfile,
  changePassword,
  getSuperAdmins,
} from '../controllers/adminController.js';
import { protect, restrictToRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', protect, restrictToRole(['superadmin']), registerAdmin); // Only SuperAdmin can register
// router.post('/register', registerAdmin);  // Removed protect and restrictToRole for the first user creation

// Protected routes for individual profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);
router.post('/change-password', protect, changePassword);


// Admin-only routes for managing all profiles
router.get('/profiles', protect, restrictToRole(['superadmin', 'admin']), getAllProfiles);
router.get('/superadmins', protect, restrictToRole(['superadmin', 'admin']), getSuperAdmins);
router.put('/profiles/:id', protect, restrictToRole(['superadmin', 'admin']), updateAnyProfile);
router.delete('/profiles/:id', protect, restrictToRole(['superadmin', 'admin']), deleteAnyProfile);

export default router;