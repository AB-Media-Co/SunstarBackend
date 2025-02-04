import axios from 'axios';
import EzeeHotels from '../models/EzeeModel.js'; // Correct path to your model file

export const fetchAndSaveHotels = async (HotelCode, APIKey) => {
    try {
        // External API call
        const response = await axios.get(
            'https://live.ipms247.com/booking/reservation_api/listing.php',
            {
                params: {
                    request_type: 'HotelList',
                    HotelCode,
                    APIKey,
                    language: 'en',
                },
            }
        );

        if (!response.data) {
            throw new Error('API response is invalid or empty.');
        }

        const {
            Hotel_Code,
            Hotel_Name,
            City,
            State,
            Zipcode,
            Country,
            Address,
            Latitude,
            Longitude,
        } = response.data;

        // Upsert data into MongoDB
        const savedHotel = await EzeeHotels.findOneAndUpdate(
            { HotelCode: Hotel_Code }, // Match by unique HotelCode
            {
                HotelCode: Hotel_Code,
                HotelName: Hotel_Name,
                Address,
                City,
                State,
                Zipcode,
                Country,
                Latitude,
                Longitude,
            },
            { upsert: true, new: true } // Create or update
        );

        console.log('Hotel synced successfully.');
        return savedHotel;
    } catch (error) {
        console.error('Error fetching and saving hotel:', error.message);
        throw new Error('Failed to fetch and save hotel.');
    }
};

// Sync and Fetch Function
export const syncAndFetchHotels = async (req, res) => {
    try {
        const { HotelCode, APIKey } = req.query;

        if (!HotelCode || !APIKey) {
            return res.status(400).json({ success: false, error: 'HotelCode and APIKey are required.' });
        }

        // Fetch and sync data from API
        await fetchAndSaveHotels(HotelCode, APIKey);

        // Fetch saved hotel including manual fields
        const savedHotel = await EzeeHotels.findOne({ HotelCode });

        if (!savedHotel) {
            return res.status(404).json({ success: false, error: 'Hotel not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Hotel synced and fetched successfully.',
            data: savedHotel,
        });
    } catch (error) {
        console.error('Error syncing and fetching hotel:', error.message);
        res.status(500).json({ success: false, error: 'Failed to sync and fetch hotel.' });
    }
};



// Add new fields to a hotel document
export const addHotelFields = async (req, res) => {
    try {
        const { HotelCode, newFields } = req.body; // Extract HotelCode and newFields from request body

        // Validate request data
        if (!HotelCode || typeof HotelCode !== 'string') {
            return res.status(400).json({ error: 'Valid HotelCode is required.' });
        }
        if (!newFields || typeof newFields !== 'object') {
            return res.status(400).json({ error: 'newFields must be a valid object.' });
        }

        // Add new fields to the document
        const updatedHotel = await EzeeHotels.updateOne(
            { HotelCode },
            { $set: newFields }
        );

        if (updatedHotel.matchedCount === 0) {
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        res.status(200).json({
            message: 'New fields added successfully.',
            updatedFields: newFields,
        });
    } catch (error) {
        console.error('Error adding new fields:', error.message);
        res.status(500).json({ error: 'Failed to add new fields.', details: error.message });
    }
};

// Edit existing fields of a hotel document
export const editHotelFields = async (req, res) => {
    try {
        const { HotelCode, updateFields } = req.body;

        // Validate request data
        if (!HotelCode || typeof HotelCode !== 'string') {
            return res.status(400).json({ error: 'Valid HotelCode is required.' });
        }
        if (!updateFields || typeof updateFields !== 'object') {
            return res.status(400).json({ error: 'updateFields must be a valid object.' });
        }

        // Perform the update operation
        const updatedHotel = await EzeeHotels.updateOne(
            { HotelCode },
            { $set: updateFields }
        );

        // Check if the update affected any document
        if (updatedHotel.matchedCount === 0) {
            return res.status(404).json({ error: 'Hotel not found.' });
        }

        res.status(200).json({
            message: 'Hotel fields updated successfully.',
            updatedFields: updateFields,
        });
    } catch (error) {
        console.error('Error updating hotel fields:', error.message);
        res.status(500).json({ error: 'Failed to update hotel fields.', details: error.message });
    }
};
