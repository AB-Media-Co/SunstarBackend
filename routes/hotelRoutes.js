import {
  addHotel,
  getHotelDetails,
  updateHotel,
  deleteHotel,
  getAllRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomDetails,
  getSingleRoom,
  getSingleHotel,
} from '../controllers/hotelController.js';
import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { uploadImages } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getHotelDetails);
router.get('/getAllRooms', getAllRooms);

router.get('/:id', getSingleHotel);
router.get('/rooms/:id', getSingleRoom);

router.post('/upload', uploadImages);
router.post('/add', protect, addHotel);
router.put('/:id', protect, updateHotel);
router.delete('/:id', protect, deleteHotel);

router.get('/rooms/:id', getRoomDetails);
router.post('/rooms/add', protect, addRoom);
router.put('/rooms/:id', protect, updateRoom);
router.delete('/rooms/:id', protect, deleteRoom);

export default router;
