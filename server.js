// app.js or index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
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
    origin: [
      'http://localhost:5173', 
      'https://live.ipms247.com',
      'https://sunstarhospitality.com/',
      'https://sunstarbackend.onrender.com'
    ],
  })
);

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



app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
