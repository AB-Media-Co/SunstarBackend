// app.js or index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import ezeeHotelRoutes from './routes/ezeeHotelsRoute.js';
import instagramRoutes from './routes/instagramRoutes.js'; // Import the Instagram routes
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
})();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://live.ipms247.com/'],
  })
);

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/images', hotelRoutes);
app.use('/api/ezeehotels', ezeeHotelRoutes);
app.use('/api/instagram', instagramRoutes); // Use the Instagram routes


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route to serve index.html (for client-side routing support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
