import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ✅ media dir: <project-root>/public/media
const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
  
  // For production, assume HTTPS (you can also use environment variable)
  if (process.env.NODE_ENV === 'production') {
    return 'https';
  }
  
  // Fallback to request protocol
  return req.protocol;
};

// POST /api/media/upload  (form field: "image")
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, message: 'No file uploaded' });

  // Use helper function to get correct protocol
  const protocol = getProtocol(req);
  const publicUrl = `${protocol}://${req.get('host')}/media/${req.file.filename}`;
  
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
  const absPath = path.join(process.cwd(), 'public', relPath.replace('/media/', 'media/'));
  try {
    await fs.promises.unlink(absPath);
    return res.json({ ok: true, message: 'Deleted' });
  } catch {
    return res.status(404).json({ ok: false, message: 'File not found' });
  }
});

export default router;