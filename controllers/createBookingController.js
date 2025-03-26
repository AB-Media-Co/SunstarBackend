// controllers/bookingController.js
import Booking from '../models/Booking.js';

export const updateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const updateData = req.body;

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully', booking: savedBooking });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
