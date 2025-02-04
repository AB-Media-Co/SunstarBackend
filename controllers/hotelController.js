import mongoose from 'mongoose';
import { Hotel, Room } from '../models/Hotel.js';
import asyncHandler from 'express-async-handler';

// Add a new hotel
export const addHotel = asyncHandler(async (req, res) => {
  try {
    const { hotels: hotelsData } = req.body;

    if (!hotelsData || !Array.isArray(hotelsData) || hotelsData.length === 0) {
      return res.status(400).json({ success: false, message: 'hotelsData must be a non-empty array' });
    }

    const hotelsToSave = await Promise.all(
      hotelsData.map(async (hotelData) => {
        if (hotelData?.rooms && hotelData?.rooms.length > 0) {
          // Validate if rooms exist before linking
          const validRooms = await Room.find({ _id: { $in: hotelData.rooms } });
          if (validRooms.length !== hotelData.rooms.length) {
            throw new Error('Some room IDs are invalid');
          }
        }
        return hotelData;
      })
    );

    const savedHotels = await Hotel.insertMany(hotelsToSave);

    // Update room references if rooms are provided
    for (const hotel of savedHotels) {
      if (hotel?.rooms && hotel.rooms.length > 0) {
        await Room.updateMany(
          { _id: { $in: hotel.rooms } },
          { hotel: hotel._id }
        );
      }
    }

    res.status(201).json({ success: true, message: 'Hotels added successfully', hotels: savedHotels });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error adding hotels', error: error.message });
  }
});


// Get details of a single hotel along with its rooms
export const getHotelDetails = asyncHandler(async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('rooms');
    if (!hotels || hotels.length === 0) {
      return res.status(404).json({ success: false, message: 'No hotels found' });
    }
    res.status(200).json({
      success: true,
      message: 'All hotel details fetched successfully',
      hotels
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching hotels', error: error.message });
  }
});

// Update a specific hotel
export const updateHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    if (updatedData.rooms && updatedData.rooms.length > 0) {
      // Validate rooms before updating
      const validRooms = await Room.find({ _id: { $in: updatedData.rooms } });
      if (validRooms.length !== updatedData.rooms.length) {
        throw new Error('Some room IDs are invalid');
      }

      // Link rooms to the hotel
      await Room.updateMany({ _id: { $in: updatedData.rooms } }, { hotel: id });
    }

    const hotel = await Hotel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.status(200).json({ success: true, message: 'Hotel updated successfully', hotel });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating hotel', error: error.message });
  }
});


// Delete a specific hotel
export const deleteHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    await Room.deleteMany({ hotel: id });
    res.status(200).json({ success: true, message: 'Hotel and associated rooms deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting hotel', error: error.message });
  }
});




// Get all rooms
export const getAllRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find().populate('hotel', 'name location'); // Rooms ke saath hotel ka basic data bhi fetch karte hain
    res.status(200).json({ success: true, message: 'All rooms fetched successfully', rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching all rooms', error: error.message });
  }
});





export const addRoom = asyncHandler(async (req, res) => {
  console.log(req.body); // Debugging: Check incoming data
  const { hotelId, roomDetails } = req.body;

  try {
      if (!hotelId) {
          return res.status(400).json({ success: false, message: 'Hotel ID is required' });
      }

      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
          return res.status(404).json({ success: false, message: 'Hotel not found' });
      }

      // Validate roomDetails
      if (!roomDetails || !Array.isArray(roomDetails) || roomDetails.length === 0) {
          return res.status(400).json({ success: false, message: 'Room details are required' });
      }

      // Validate each room's required fields
      roomDetails.forEach((details, index) => {
          if (!details.roomType || !details.roomNumber || !details.description || details.roomLeft == null || !details.price) {
              throw new Error(`Room validation failed for index ${index}: Missing required fields.`);
          }
      });

      const roomsToAdd = roomDetails.map((details) => new Room({ ...details, hotel: hotelId }));
      console.log(roomsToAdd,'roomtoafff')
      const savedRooms = await Room.insertMany(roomsToAdd);

      hotel.rooms.push(...savedRooms.map(room => room._id));
      await hotel.save();

      res.status(201).json({ success: true, message: 'Rooms added successfully', rooms: savedRooms });
  } catch (error) {
      console.error(error.message); // Debugging: Log the error message
      res.status(400).json({ success: false, message: 'Error adding rooms', error: error.message });
  }
});




// Delete a room
export const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    await Hotel.findByIdAndUpdate(room.hotel, { $pull: { rooms: id } });
    res.status(200).json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting room', error: error.message });
  }
});

// Get room details
export const getRoomDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id).populate('hotel');
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({ success: true, message: 'Room details fetched successfully', room });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching room details', error: error.message });
  }
});


// Get details of a single hotel
export const getSingleHotel = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id).populate('rooms'); // Populate 'rooms' to get room details
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Hotel details fetched successfully',
      hotel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching hotel details', error: error.message });
  }
});



// Get details of a single room
export const getSingleRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id).populate('hotel'); // Populate 'hotel' to get hotel details if needed
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Room details fetched successfully',
      room
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching room details', error: error.message });
  }
});

export const updateRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // If hotelId is being updated, verify the new hotel exists
    if (updatedData.hotelId) {
      const hotel = await Hotel.findById(updatedData.hotelId);
      if (!hotel) {
        return res.status(404).json({ success: false, message: 'New hotel not found' });
      }
    }

    // Validate required fields if they are being updated
    if (Object.keys(updatedData).some(key => ['roomType', 'roomNumber', 'description', 'roomLeft', 'price'].includes(key))) {
      const room = await Room.findById(id);
      const newData = { ...room.toObject(), ...updatedData };
      
      if (!newData.roomType || !newData.roomNumber || !newData.description || newData.roomLeft == null || !newData.price) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).populate('hotel');

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    // If hotel is changed, update the room references in both old and new hotels
    if (updatedData.hotelId && updatedData.hotelId !== updatedRoom.hotel.toString()) {
      // Remove room from old hotel
      await Hotel.findByIdAndUpdate(updatedRoom.hotel, {
        $pull: { rooms: updatedRoom._id }
      });
      
      // Add room to new hotel
      await Hotel.findByIdAndUpdate(updatedData.hotelId, {
        $push: { rooms: updatedRoom._id }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      room: updatedRoom
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating room',
      error: error.message
    });
  }
});
