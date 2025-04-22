import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import express from 'express';

// Load environment variables from .env file
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();

// Create multer upload instances for different field names
// This helps handle both 'image' and 'images' field names
const uploadMultiple = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'image', maxCount: 10 }
]);

// Optimize image with reduced quality for faster processing
const optimizeImage = async (buffer) => {
  return sharp(buffer)
    .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 65, progressive: true })
    .toBuffer();
};

// Universal image upload handler that works with different field names
export const uploadImages = asyncHandler(async (req, res) => {
  uploadMultiple(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ success: false, message: err.message });
    }

    try {
      // Handle file uploads from either the 'images' or 'image' field
      const files = [];
      
      // Add files from 'images' field if it exists
      if (req.files && req.files.images) {
        files.push(...req.files.images);
      }
      
      // Add files from 'image' field if it exists
      if (req.files && req.files.image) {
        files.push(...req.files.image);
      }
      
      // Handle single file uploaded with wrong field name
      if (req.file) {
        files.push(req.file);
      }

      if (files.length === 0) {
        return res.status(400).json({ success: false, message: 'No images provided' });
      }

      console.log(`Processing ${files.length} files`);

      // Process images in smaller batches
      const batchSize = 3;
      const imageUrls = [];
      
      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        
        const batchPromises = batch.map(async (file) => {
          const optimizedBuffer = await optimizeImage(file.buffer);
          
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
              { 
                folder: 'hotel_images',
                resource_type: 'image',
                format: 'jpg',
                quality: 'auto:low',
              },
              (error, result) => {
                if (error) {
                  console.error('Cloudinary upload error:', error);
                  reject(error);
                } else {
                  resolve(result.secure_url);
                }
              }
            );
            uploadStream.end(optimizedBuffer);
          });
        });
        
        const batchUrls = await Promise.all(batchPromises);
        imageUrls.push(...batchUrls);
      }

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

