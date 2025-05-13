// app.js or index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios'; // Import axios to make external requests
import adminRoutes from './routes/adminRoutes.js';
import hotelRoutes from './routes/ImageUpload.js';
import instagramRoutes from './routes/instagramRoutes.js';
import ezeeRoutes from './routes/ezeeRoutes.js';
import websiteDataRoutes from './routes/websiteDataRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import enquieryFormRoute from './routes/enquieryFormRoute.js';
import locationRoutes from './routes/locationRoutes.js';
import connectDB from './config/db.js';
import dealRoutes from './routes/dealRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import metaRoutes from './routes/metaRoutes.js';
import createBooking from './routes/createBookingRoute.js';
import dayUseRoomRoutes from './routes/dayUseRoomRoutes.js';
import faqRoutes from './routes/faqRoutes.js';


dotenv.config();

const app = express();

// app.use(cors({
//   origin :[
//     'http://localhost:5173',
//     'https://live.ipms247.com',
//     'https://sunstarhospitality.com',
//     'https://sunstarbackend.onrender.com'
//   ],
//   credentials: true
// }));




// app.use(cors({
//   origin: '*'
// }));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sunstarhospitality.com',
    'https://www.sunstarhospitality.com', // Explicitly allow www
    'https://live.ipms247.com',
    'https://sunstarbackend.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all needed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow required headers
  credentials: true // If using cookies/auth headers
}));

// Middleware
app.use(express.json());


app.set('etag', false);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the database
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'MongoError' || err.name === 'MongoServerError') {
    return res.status(500).json({
      message: 'Database Error',
      error: err.message
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message
  });
});


// Day Use Room Routes
app.use('/api', dayUseRoomRoutes);


app.post('/api/booking', async (req, res) => {
  const { roomData, hotelDetail } = req.body;

  // Validate required fields
  if (!hotelDetail?.hotelCode || !hotelDetail?.authKey) {
    return res.status(400).json({ message: 'Missing hotel details' });
  }

  // Validate essential booking data
  if (!roomData?.Room_Details || !roomData?.check_in_date || !roomData?.check_out_date || !roomData?.Email_Address) {
    return res.status(400).json({ message: 'Missing required booking information' });
  }

  try {
    const apiUrl = `https://live.ipms247.com/booking/reservation_api/listing.php`;
    const params = {
      request_type: 'InsertBooking',
      HotelCode: hotelDetail.hotelCode,
      APIKey: hotelDetail.authKey,
      BookingData: JSON.stringify(roomData)
    };

    // Make the API request to the external service using proper URL encoding
    const response = await axios.get(apiUrl, { params });

    // Handle eZee API error responses
    if (response.data && response.data.ReservationNo) {
      res.json(response.data);
    } else {
      // Handle error response from eZee API
      console.error('eZee API error:', response.data);
      res.status(400).json({
        message: 'Booking failed',
        error: response.data
      });
    }
  } catch (error) {
    console.error('Error making booking request:', error);

    // Return a more detailed error message
    res.status(500).json({
      message: 'Failed to make booking. Please try again.',
      error: error.response?.data || error.message
    });
  }
});


// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/images', hotelRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/ezee', ezeeRoutes);
app.use('/api/websiteData', websiteDataRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/enquiries', enquieryFormRoute);
app.use('/api/locations', locationRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/newBooking', createBooking);
app.use('/api/faqs', faqRoutes);


// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
