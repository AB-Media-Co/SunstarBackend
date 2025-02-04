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
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);
    
router.get('/profiles', protect, getAllProfiles);
router.put('/profiles/:id', protect, updateAnyProfile);
router.delete('/profiles/:id', protect, deleteAnyProfile);

export default router;
