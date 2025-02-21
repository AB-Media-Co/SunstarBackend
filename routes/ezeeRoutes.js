// routes/ezeeRoutes.js
import express from 'express';
import {
  syncInventory,
  pushBooking,
  pushPaymentDetails,
  syncRates,
  syncAddOnServices,
  syncPaymentGateways,
  verifyMobileNumber,
  fetchRoomDetails,
  fetchRoomInformation,
} from '../controllers/ezeeController.js';
import { addHotel, deleteHotel, editHotel, getAllHotels, getSingleHotel } from '../controllers/adminHotelController.js';
import { createOrUpdateRoom,  getRoomById,  getSyncedRooms } from '../controllers/roomController.js';

const router = express.Router();

router.get('/allhotels', getAllHotels);
router.post('/add/hotel', addHotel);
router.get('/hotels/:hotelCode', getSingleHotel); 

router.put('/edit/hotel/:hotelCode', editHotel);
router.delete('/delete/hotel/:hotelCode', deleteHotel);


router.post('/sync/inventory/:hotelCode/:authKey', syncInventory);
router.post('/push/booking/:hotelCode/:authKey', pushBooking);
router.post('/push/payment/:hotelCode/:authKey', pushPaymentDetails);
router.post('/sync/rates/:hotelCode/:authKey', syncRates);
router.post('/sync/addons/:hotelCode/:authKey', syncAddOnServices);
router.post('/sync/paymentgateways/:hotelCode/:authKey', syncPaymentGateways);
router.post('/verify/mobile/:hotelCode/:authKey', verifyMobileNumber);
router.post('/fetch/room/:hotelCode/:authKey/:roomCode', fetchRoomDetails);
router.post('/fetch/roominfo/:hotelCode/:authKey', fetchRoomInformation);


router.get('/syncedRooms', getSyncedRooms);
router.post('/rooms', createOrUpdateRoom);
router.get('/room/:id', getRoomById);




export default router;