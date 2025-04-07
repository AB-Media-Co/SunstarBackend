// routes/ezeeRoutes.js
import express from 'express';
import { addHotel, deleteHotel, editHotel, getAllHotels, getSingleHotel } from '../controllers/adminHotelController.js';
import { createRoom,    deleteRoomById,    getRoomById,  getSyncedRooms, updateRoom } from '../controllers/roomController.js';
import { getRoomAndHotelDetails } from '../controllers/getRoomAndHotelDetails.js';

const router = express.Router();

router.get('/allhotels', getAllHotels);
router.post('/add/hotel', addHotel);
router.get('/hotels/:hotelCode', getSingleHotel); 

router.put('/edit/hotel/:hotelCode', editHotel);
router.delete('/delete/hotel/:hotelCode', deleteHotel);





router.get('/syncedRooms', getSyncedRooms);
router.post('/rooms', createRoom);
router.get('/room/:id', getRoomById);
router.delete('/room/:id', deleteRoomById);
router.put('/rooms/:id', updateRoom);      



router.get('/details', getRoomAndHotelDetails);


export default router;