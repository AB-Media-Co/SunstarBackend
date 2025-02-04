import nodemailer from 'nodemailer';
import axios from 'axios';

// Email Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'dev@abmediaco.com', // Replace with your Gmail or environment variable
    pass: process.env.EMAIL_PASS || 'ykzq otuc pqae uzsp', // Replace with your app password or environment variable
  },
});

/**
 * Sends email and SMS notifications to the user.
 * @param {string} email - Recipient's email address.
 * @param {string} phone - Recipient's phone number.
 * @param {string} message - Notification message content.
 * @param {string} [subject="Booking Notification"] - Email subject.
 */
export const sendNotifications = async (email, phone, message, subject = 'Booking Notification') => {
  try {
    // Send Email Notification
    const mailOptions = {
      from: process.env.EMAIL_USER || 'dev@abmediaco.com',
      to: email,
      subject,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (emailError) {
      console.error('Error sending email:', emailError.message);
    }

    // Send SMS Notification
    try {
      const response = await axios.post('https://textbelt.com/text', {
        phone,
        message,
        key: process.env.TEXTBELT_KEY || 'textbelt', // Use an environment variable for the API key
      });

      if (response.data.success) {
        console.log('SMS sent successfully!');
      } else {
        console.error('Error sending SMS:', response.data.error);
      }
    } catch (smsError) {
      console.error('Error sending SMS:', smsError.message);
    }
  } catch (generalError) {
    console.error('Error sending notifications:', generalError.message);
  }
};
