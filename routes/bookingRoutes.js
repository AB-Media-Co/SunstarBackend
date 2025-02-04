import express from 'express';
import { createBooking, cancelBooking, editBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/book', createBooking);
router.put('/edit-booking', editBooking);
router.post('/cancel-booking', cancelBooking);

export default router;
