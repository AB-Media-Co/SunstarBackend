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
} from '../controllers/adminController.js';
import { protect, restrictToRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', protect, restrictToRole(['superadmin']), registerAdmin); // Only SuperAdmin can register

// Protected routes for individual profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);

// Admin-only routes for managing all profiles
router.get('/profiles', protect, restrictToRole(['superadmin', 'admin']), getAllProfiles);
router.put('/profiles/:id', protect, restrictToRole(['superadmin', 'admin']), updateAnyProfile);
router.delete('/profiles/:id', protect, restrictToRole(['superadmin', 'admin']), deleteAnyProfile);

export default router;