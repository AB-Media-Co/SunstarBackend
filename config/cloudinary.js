import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import compression from 'compression';

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2;

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 10 }, // 20MB limit per file
}).array('images', 10); // Accept up to 10 files
export const uploadImages = asyncHandler(async (req, res) => {
  compression()(req, res, () => {});
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      const imageUploadPromises = req.files.map(async (file) => {
        // Optimize image before upload
        const optimizedBuffer = await sharp(file.buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true })
          .toBuffer();

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { 
              folder: 'hotel_images',
              resource_type: 'auto',
              format: 'jpg',
              quality: 'auto:good',
              fetch_format: 'auto',
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error.message);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(optimizedBuffer);
        });
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Set cache headers
      res.set({
        'Cache-Control': 'public, max-age=31536000',
        'Expires': new Date(Date.now() + 31536000000).toUTCString()
      });

      res.status(201).json({
        success: true,
        message: 'Images uploaded successfully',
        imageUrls,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading images',
        error: error.message,
      });
    }
  });
});
