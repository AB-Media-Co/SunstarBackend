import axios from 'axios';
import RoomTypes from '../models/EzeeRoomsModel.js';
import Hotels from '../models/EzeeModel.js';

export const fetchAndSaveRooms = async (HotelCode, AuthCode) => {
    try {

        // Fetch RoomInfo data from the external API

        const { data } = await axios.post(
            'https://live.ipms247.com/pmsinterface/pms_connectivity.php',
            {
                RES_Request: {
                    Request_Type: 'RoomInfo',
                    NeedPhysicalRooms: 1,
                    Authentication: {
                        HotelCode,
                        AuthCode,
                    },
                },
            }
        );

        const roomTypes = data?.RoomInfo?.RoomTypes?.RoomType || [];
        const ratePlans = data?.RoomInfo?.RatePlans?.RatePlan || [];

        for (const roomType of roomTypes) {
            const associatedRatePlans = ratePlans.filter(
                (ratePlan) => ratePlan.RoomTypeID === roomType.ID
            );

            await RoomTypes.updateOne(
                { HotelCode, RoomTypeID: roomType.ID },
                {
                    $set: {
                        HotelCode,
                        RoomTypeID: roomType.ID,
                        Name: roomType.Name,
                        Rooms: roomType.Rooms,
                        RatePlans: associatedRatePlans,
                        updatedAt: new Date(),
                    },
                },
                { upsert: true } // Create a new record if not found
            );
        }

        const allRoomTypes = await RoomTypes.find({ HotelCode });

        return allRoomTypes; // Return the entire data as stored in MongoDB
    } catch (error) {
        console.error('Error syncing rooms:', error.message);
        throw new Error('Failed to sync rooms.');
    }
};

export const editOrAddRoomData = async (req, res) => {
    try {
        const { HotelCode, RoomTypeID, updateFields } = req.body;

        if (!HotelCode || !RoomTypeID || !updateFields) {
            return res.status(400).json({
                error: 'HotelCode, RoomTypeID, and updateFields are required.',
            });
        }

        // Find the room type
        let existingRoomType = await RoomTypes.findOne({
            HotelCode,
            RoomTypeID,
        });

        // If RoomType doesn't exist, create a new one
        if (!existingRoomType) {
            existingRoomType = new RoomTypes({
                HotelCode,
                RoomTypeID,
                Name: updateFields.Name || '',
                Description: updateFields.Description || '',
                Amenities: updateFields.Amenities || [],
                Images: updateFields.Images || [],
                Rooms: [],
                RatePlans: [],
                updatedAt: new Date(),
            });
        }

        // Update or add fields
        for (const [key, value] of Object.entries(updateFields)) {
            if (key === 'Rooms') {
                // Add or update specific rooms
                value.forEach((roomUpdate) => {
                    const roomIndex = existingRoomType.Rooms.findIndex(
                        (room) => room.RoomID === roomUpdate.RoomID
                    );
                    if (roomIndex > -1) {
                        // Update existing room
                        Object.assign(existingRoomType.Rooms[roomIndex], roomUpdate);
                    } else {
                        // Add new room
                        existingRoomType.Rooms.push(roomUpdate);
                    }
                });
            } else if (key === 'RatePlans') {
                // Add or update specific rate plans
                value.forEach((ratePlanUpdate) => {
                    const ratePlanIndex = existingRoomType.RatePlans.findIndex(
                        (ratePlan) => ratePlan.RatePlanID === ratePlanUpdate.RatePlanID
                    );
                    if (ratePlanIndex > -1) {
                        // Update existing rate plan
                        Object.assign(
                            existingRoomType.RatePlans[ratePlanIndex],
                            ratePlanUpdate
                        );
                    } else {
                        // Add new rate plan
                        existingRoomType.RatePlans.push(ratePlanUpdate);
                    }
                });
            } else {
                // Update top-level fields like Name, Description, etc.
                existingRoomType[key] = value;
            }
        }

        // Save the document
        await existingRoomType.save();

        res.status(200).json({
            message: 'Room Type data added or updated successfully.',
            data: existingRoomType,
        });
    } catch (error) {
        console.error('Error adding or updating Room Type data:', error.message);
        res.status(500).json({ error: 'Failed to add or update Room Type data.' });
    }
};

export const addRoom = async (req, res) => {
    try {
        const {
            HotelCode,
            RoomTypeID,
            RoomID,
            RoomName,
            RoomLeft,
            SoldOut,
            Description,
            Amenities,
            Images,
            RatePlans,
        } = req.body;

        // Validate required fields
        if (!HotelCode) {
            return res.status(400).json({
                error: 'HotelCode, RoomTypeID, RoomID, and RoomName are required.',
            });
        }

        // Check if the hotel exists
        const hotelExists = await Hotels.findOne({ HotelCode });

        if (!hotelExists) {
            return res.status(404).json({
                error: 'Invalid HotelCode. The hotel does not exist.',
            });
        }

        // Check if the room type exists
        let roomType = await RoomTypes.findOne({ HotelCode, RoomTypeID });

        // If room type does not exist, create it
        if (!roomType) {
            roomType = new RoomTypes({
                HotelCode,
                RoomTypeID,
                Name: '',
                Description: '',
                Amenities: [],
                Images: [],
                Rooms: [],
                RatePlans: [],
                updatedAt: new Date(),
            });
        }

        // Check if the room already exists
        const roomExists = roomType.Rooms.find((room) => room.RoomID === RoomID);

        if (roomExists) {
            return res.status(400).json({
                error: 'A room with the given RoomID already exists.',
            });
        }

        // Add the new room
        roomType.Rooms.push({
            RoomID,
            RoomName,
            RoomLeft: RoomLeft || 0,
            SoldOut: SoldOut || false,
        });

        // Update additional fields if provided
        if (Description) roomType.Description = Description;
        if (Amenities) roomType.Amenities = Amenities;
        if (Images) roomType.Images = Images;
        if (RatePlans) roomType.RatePlans = RatePlans;

        // Save the updated room type
        await roomType.save();

        res.status(200).json({
            message: 'Room added successfully.',
            data: roomType,
        });
    } catch (error) {
        console.error('Error adding room:', error.message);
        res.status(500).json({ error: 'Failed to add room.' });
    }
};
