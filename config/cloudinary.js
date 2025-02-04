import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import asyncHandler from 'express-async-handler';

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2;

// Multer setup for handling file uploads
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
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit per file
}).array('images', 5); // Accept up to 5 files

// Function to upload images to Cloudinary
export const uploadImages = asyncHandler(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: err.message });
    }


    try {
      const imageUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'hotel_images' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error.message);
              } else {
                console.log('Cloudinary upload result:', result);
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      const imageUrls = await Promise.all(imageUploadPromises);

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

