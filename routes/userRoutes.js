// routes/userRoutes.js

import express from 'express';
import { sendOtp2, verifyOtp2, addBookingDetails, getUserByEmail } from '../controllers/userController.js';
import { cancelBookingController } from '../controllers/pushBookingController.js';

const router = express.Router();
router.get('/get-user', getUserByEmail);
router.post('/send-otp', sendOtp2);
router.post('/verify-otp', verifyOtp2);
router.post('/add-booking/:userId', addBookingDetails);

router.post("/cancelBooking", cancelBookingController);


export default router;
