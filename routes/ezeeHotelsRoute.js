import express from 'express';
import {addHotelFields, editHotelFields, syncAndFetchHotels} from '../controllers/ezeeHotelController.js';
import {addRoom, editOrAddRoomData, fetchAndSaveRooms} from '../controllers/ezeeRoomController.js';

const router = express.Router();

// for hotels
router.get('/sync-fetch', syncAndFetchHotels);
router.put('/edit-fields', editHotelFields);
router.post('/add-fields', addHotelFields)


// for rooms 
router.get('/sync-rooms', async (req, res) => {
    try {
        const { HotelCode, AuthCode } = req.query;

        if (!HotelCode || !AuthCode) {
            return res.status(400).json({ error: 'HotelCode and AuthCode are required.' });
        }

        // Sync rooms and get all updated data
        const allRoomTypes = await fetchAndSaveRooms(HotelCode, AuthCode);

        res.status(200).json({
            message: 'Rooms synced successfully.',
            data: allRoomTypes,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to sync rooms.' });
    }
});
router.post('/addrooms', addRoom);
router.put('/add-or-edit-room-type', editOrAddRoomData);

export default router;
