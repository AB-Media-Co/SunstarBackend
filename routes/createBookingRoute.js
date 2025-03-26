// routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBookings, updateBooking } from '../controllers/createBookingController.js';

const router = express.Router();

router.post('/createBooking', createBooking);
router.get('/createBooking', getBookings);
router.put('/updateBooking/:bookingId', updateBooking);

export default router;
