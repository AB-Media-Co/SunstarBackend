import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create media directory inside build folder (consistent with app.js)
const BUILD_DIR = path.join(__dirname, '..', 'build');
const MEDIA_DIR = path.join(BUILD_DIR, 'public', 'media');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Always ensure directory exists before upload
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
    cb(null, MEDIA_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9_-]/gi, '_');
    cb(null, `${Date.now()}_${Math.round(Math.random() * 1e9)}_${base}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(png|jpe?g|webp|gif|svg\+xml)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Helper function to detect proper protocol
const getProtocol = (req) => {
  // Check for forwarded protocol headers (common in deployment)
  if (req.headers['x-forwarded-proto']) {
    return req.headers['x-forwarded-proto'];
  }
  
  // Check for Heroku, Vercel, Netlify headers
  if (req.headers['x-forwarded-ssl'] === 'on') {
    return 'https';
  }
  
  // Check if connection is secure
  if (req.secure || req.connection.encrypted) {
    return 'https';
  }
  
  // For production, assume HTTPS
  if (process.env.NODE_ENV === 'production') {
    return 'https';
  }
  
  // Fallback to request protocol
  return req.protocol;
};

// POST /api/media/upload (form field: "image")
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, message: 'No file uploaded' });

  // Use helper function to get correct protocol
  const protocol = getProtocol(req);
  const publicUrl = `${protocol}://${req.get('host')}/media/${req.file.filename}`;
  
  console.log('File uploaded:', {
    filename: req.file.filename,
    path: req.file.path,
    url: publicUrl
  });
  
  return res.json({
    ok: true,
    url: publicUrl,               // frontend use this
    path: `/media/${req.file.filename}` // relative path (for delete)
  });
});

// DELETE /api/media   body: { "path": "/media/xxxx.png" }
router.delete('/', async (req, res) => {
  const relPath = req.body?.path;
  if (!relPath || !relPath.startsWith('/media/')) {
    return res.status(400).json({ ok: false, message: 'Invalid path' });
  }
  
  // Build absolute path to file in build/public/media
  const filename = relPath.replace('/media/', '');
  const absPath = path.join(MEDIA_DIR, filename);
  
  console.log('Attempting to delete file:', absPath);
  
  try {
    await fs.promises.unlink(absPath);
    console.log('File deleted successfully:', absPath);
    return res.json({ ok: true, message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(404).json({ ok: false, message: 'File not found' });
  }
});

// Optional: GET endpoint to list uploaded files (for debugging)
router.get('/list', (req, res) => {
  try {
    const files = fs.readdirSync(MEDIA_DIR);
    const fileList = files.map(file => ({
      filename: file,
      url: `${getProtocol(req)}://${req.get('host')}/media/${file}`,
      path: `/media/${file}`
    }));
    
    res.json({
      ok: true,
      files: fileList,
      directory: MEDIA_DIR
    });
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ ok: false, message: 'Could not list files' });
  }
});

export default router;