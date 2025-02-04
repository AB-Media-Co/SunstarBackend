// Import required modules
import axios from 'axios';
import express from 'express';


const router = express.Router();

// API Route to fetch room availability
router.post('/room-availability', async (req, res) => {
    const { from_date, to_date, hotel_code, api_key } = req.body;

    // Validation for input data
    if (!from_date || !to_date || !hotel_code || !api_key) {
        return res.status(400).json({ error: 'from_date, to_date, hotel_code, and api_key are required' });
    }

    // Request payload for IPMS API
    const ipmsPayload = {
        RES_Request: {
            Request_Type: "RoomAvailability",
            Authentication: {
                HotelCode: hotel_code, // Received from the request body
                AuthCode: api_key // Received from the request body
            },
            RoomData: {
                from_date,
                to_date
            }
        }
    };

    try {
        const response = await axios.post(
            'https://live.ipms247.com/index.php/page/service.kioskconnectivity',
            ipmsPayload,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching data from IPMS API:', error);

        // Handle errors
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

export default router;
