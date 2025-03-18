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

dotenv.config();
const app = express();
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

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5173', 
      'https://live.ipms247.com',
      'https://sunstarhospitality.com/',
      'https://sunstarbackend.onrender.com'
    ],
  })
);

// Booking Proxy Route
app.post('/api/booking', async (req, res) => {
  const { roomData, hotelDetail } = req.body; // Extract data from the request body

  // Define the API URL for the external booking service
  const apiUrl = `https://live.ipms247.com/booking/reservation_api/listing.php?request_type=InsertBooking&HotelCode=${hotelDetail?.hotelCode}&APIKey=${hotelDetail?.authKey}&BookingData=${encodeURIComponent(JSON.stringify(roomData))}`;

  try {
    // Make the API request to the external service
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send the external API response to the frontend
  } catch (error) {
    console.error('Error making booking request:', error);
    res.status(500).json({ message: 'Failed to make booking. Please try again.' });
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
