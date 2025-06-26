// routes/userRoutes.js

import express from 'express';
import { sendOtp2, verifyOtp2, addBookingDetails, getUserByEmail, checkEmailVerification, updateUserProfile } from '../controllers/userController.js';
import { cancelBookingController } from '../controllers/pushBookingController.js';

const router = express.Router();
router.get('/get-user', getUserByEmail);
router.get('/check-verification', checkEmailVerification);


router.post('/send-otp', sendOtp2);
router.post('/verify-otp', verifyOtp2);
router.post('/add-booking/:userId', addBookingDetails);

router.post("/cancelBooking", cancelBookingController);
router.put('/update-profile', updateUserProfile);


export default router;
