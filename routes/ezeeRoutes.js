// routes/ezeeRoutes.js
import express from 'express';
import { addHotel, deleteHotel, editHotel, getAllHotels, getSingleHotel } from '../controllers/adminHotelController.js';
import { createRoom,    deleteRoomById,    getRoomById,   getRoomList,   getSyncedRooms, updateRoom } from '../controllers/roomController.js';
import { getRoomAndHotelDetails } from '../controllers/getRoomAndHotelDetails.js';
import { getDayUseRooms, getMonthlyDayUseData, updateDayUseAvailability } from '../controllers/dayUseRoomController.js';

const router = express.Router();


router.get('/day-use-rooms', getDayUseRooms);
router.get('/monthly', getMonthlyDayUseData);
router.put('/update-availability', updateDayUseAvailability);


router.get('/allhotels', getAllHotels);
router.post('/add/hotel', addHotel);
router.get('/hotels/:hotelCode', getSingleHotel); 
router.put('/edit/hotel/:hotelCode', editHotel);
router.delete('/delete/hotel/:hotelCode', deleteHotel);


router.get('/syncedRooms', getSyncedRooms);
router.get('/room-list', getRoomList);
router.post('/rooms', createRoom);
router.get('/room/:id', getRoomById);
router.delete('/room/:id', deleteRoomById);
router.put('/rooms/:id', updateRoom);      



router.get('/details', getRoomAndHotelDetails);


export default router;