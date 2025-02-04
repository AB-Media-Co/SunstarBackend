import Booking from "../models/bookingModel.js";
import { sendNotifications } from "../utils/notification.js";

// Create Booking
export const createBooking = async (req, res) => {
  const { firstName, lastName, email, phone, roomType, addons, checkInDate, checkOutDate, price, discount } = req.body;

  try {
    // Save the booking to the database
    const newBooking = await Booking.create({
      firstName,
      lastName,
      email,
      phone,
      roomType,
      addons,
      checkInDate,
      checkOutDate,
      price,
      discount,
    });

    // Calculate final price after discount
    const finalPrice = price - discount;

    // Prepare the notification message
    const message = `
      Dear ${firstName},

      We are pleased to confirm your booking.

      Booking Details:
      - Room Type: ${roomType}
      - Check-In Date: ${new Date(checkInDate).toLocaleDateString()}
      - Check-Out Date: ${new Date(checkOutDate).toLocaleDateString()}
      - Price: Rs${price.toFixed(2)}
      - Discount: Rs${discount.toFixed(2)}
      - Final Price: Rs${finalPrice.toFixed(2)}
      - Additional Services: ${addons.length > 0 ? addons.join(", ") : "None"}

      An invoice is attached to this email for your reference.

      Thank you for choosing our service. If you have any questions or need further assistance, feel free to contact us.

      Best regards,
      Team SunStar
    `;

    const invoice = `
      Invoice for Booking
      -------------------
      Name: ${firstName} ${lastName}
      Room Type: ${roomType}
      Check-In: ${new Date(checkInDate).toLocaleDateString()}
      Check-Out: ${new Date(checkOutDate).toLocaleDateString()}
      Price: $${price.toFixed(2)}
      Discount: $${discount.toFixed(2)}
      Final Price: $${finalPrice.toFixed(2)}
      -------------------
    `;

    await sendNotifications(email, phone, message, invoice);

    res.status(201).json({
      message: "Booking created and notifications sent successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: "Error creating booking", error });
  }
};




// Cancel Booking
export const cancelBooking = async (req, res) => {
    const { bookingId, email, phone } = req.body;
    try {
        const booking = await Booking.findByIdAndDelete(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        await sendNotifications(email, phone, `Your booking for ${booking.roomType} has been cancelled.`);
        res.status(200).json({ message: 'Booking cancelled successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling booking', error });
    }
};

// Edit Booking
export const editBooking = async (req, res) => {
    const { bookingId, updatedDetails } = req.body;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedDetails, { new: true });
        if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};
