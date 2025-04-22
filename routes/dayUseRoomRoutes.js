import express from 'express';
import { getDayUseRooms } from '../controllers/dayUseRoomController.js';

const router = express.Router();

// Route to get all day use rooms
router.get('/day-use-rooms', getDayUseRooms);

export default router;