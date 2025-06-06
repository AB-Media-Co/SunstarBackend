import axios from 'axios';
import xml2js from 'xml2js';
import Room from '../models/Room.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs'

const getToday = () => new Date().toISOString().split('T')[0];
const getTomorrow = () => new Date(Date.now() + 86400000).toISOString().split('T')[0];


const processGroupedRoomData = (roomList) => {
  const grouped = {}

  for (const room of roomList) {
    const key = room.Roomtype_Name

    const availableRooms = Object.values(room.available_rooms || {}).map(Number)
    const exclusiveTaxes = Object.values(room.room_rates_info?.exclusive_tax || {}).map(Number)

    const minAvailable = availableRooms.length ? Math.min(...availableRooms) : 0
    const minExclusiveTax = exclusiveTaxes.length ? Math.min(...exclusiveTaxes) : 0

    if (!grouped[key]) {
      grouped[key] = {
        Roomtype_Name: room.Roomtype_Name,
        Room_Max_adult: room.Room_Max_adult,
        Room_Max_child: room.Room_Max_child,
        hotelcode: room.hotelcode,
        roomtypeunkid: room.roomtypeunkid,
        ratetypeunkid: room.ratetypeunkid,
        roomrateunkid: room.roomrateunkid,
        min_available_rooms: minAvailable,
        min_exclusive_tax: minExclusiveTax
      }
    } else {
      const current = grouped[key]
      if (minExclusiveTax < current.min_exclusive_tax || minAvailable < current.min_available_rooms) {
        grouped[key] = {
          Roomtype_Name: room.Roomtype_Name,
          Room_Max_adult: room.Room_Max_adult,
          Room_Max_child: room.Room_Max_child,
          hotelcode: room.hotelcode,
          roomtypeunkid: room.roomtypeunkid,
          ratetypeunkid: room.ratetypeunkid,
          roomrateunkid: room.roomrateunkid,
          min_available_rooms: minAvailable,
          min_exclusive_tax: minExclusiveTax
        }
      }
    }
  }

  return Object.values(grouped)
}





export const getRoomList = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query

    const numNights = toDate ? dayjs(toDate).diff(dayjs(fromDate), 'day') : 1

    const url = `https://live.ipms247.com/booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${hotelCode}&APIKey=${authCode}&check_in_date=${fromDate}&num_nights=${numNights}&number_adults=1&number_children=0&num_rooms=1&promotion_code=&property_configuration_info=0&showtax=0&show_only_available_rooms=0&language=en&roomtypeunkid=&packagefor=DESKTOP&promotionfor=DESKTOP`

    const response = await axios.get(url)
    const processedData = processGroupedRoomData(response.data)

    res.status(200).json({
      success: true,
      data: processedData,
    })
  } catch (error) {
    console.error('Error fetching room list:', error.message)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room list',
    })
  }
}


export const getSyncedRooms = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query

    if (!hotelCode || !authCode) {
      return res.status(400).json({ error: 'hotelCode and authCode are required as query parameters' })
    }

    const finalFromDate = fromDate || dayjs().format('YYYY-MM-DD')
    const finalToDate = toDate || dayjs().add(1, 'day').format('YYYY-MM-DD')
    const numNights = dayjs(finalToDate).diff(dayjs(finalFromDate), 'day') || 1

    // 1. Call IPMS247 JSON RoomList API
    const url = `https://live.ipms247.com/booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${hotelCode}&APIKey=${authCode}&check_in_date=${finalFromDate}&num_nights=${numNights}&number_adults=1&number_children=0&num_rooms=1&promotion_code=&property_configuration_info=0&showtax=0&show_only_available_rooms=0&language=en&roomtypeunkid=&packagefor=DESKTOP&promotionfor=DESKTOP`

    const response = await axios.get(url)
    const roomList = response.data

    // 2. Group rooms by Roomtype_Name and find min rate & availability
    const grouped = {}

    for (const room of roomList) {
      const key = room.Roomtype_Name

      const availableRooms = Object.values(room.available_rooms || {}).map(Number)
      const exclusiveTaxes = Object.values(room.room_rates_info?.exclusive_tax || {}).map(Number)

      const minAvailable = availableRooms.length ? Math.min(...availableRooms) : 0
      const minExclusiveTax = exclusiveTaxes.length ? Math.min(...exclusiveTaxes) : 0

      if (
        !grouped[key] ||
        minExclusiveTax < grouped[key].min_exclusive_tax ||
        minAvailable < grouped[key].min_available_rooms
      ) {
        grouped[key] = {
          Roomtype_Name: room.Roomtype_Name,
          Room_Max_adult: room.Room_Max_adult,
          Room_Max_child: room.Room_Max_child,
          hotelcode: room.hotelcode,
          roomtypeunkid: room.roomtypeunkid,
          ratetypeunkid: room.ratetypeunkid,
          roomrateunkid: room.roomrateunkid,
          min_available_rooms: minAvailable,
          min_exclusive_tax: minExclusiveTax
        }
      }
    }

    const lowestRateRooms = Object.values(grouped)

    // 3. Merge with MongoDB data & upsert
    let upsertCount = 0
    const updatedRooms = []

    for (const room of lowestRateRooms) {
      const roomDetails = await Room.findOne({ RoomTypeID: room.roomtypeunkid })

      const enhancedRoom = {
        RoomTypeID: room.roomtypeunkid,
        RateTypeID: room.ratetypeunkid,
        roomrateunkid: room.roomrateunkid,
        HotelCode: room.hotelcode,
        RoomName: room.Roomtype_Name,
        Availability: room.min_available_rooms,
        discountRate: room.min_exclusive_tax,
        maxGuests: parseInt(room.Room_Max_adult) || 1,

        RoomImage: roomDetails?.RoomImage || [],
        RoomDescription: roomDetails?.RoomDescription,
        AboutRoom: roomDetails?.AboutRoom || {},
        Amenities: roomDetails?.Amenities || [],
        squareFeet: roomDetails?.squareFeet,
        show: roomDetails?.show ?? true,
        source: roomDetails?.source || 'API',
        FromDate: finalFromDate,
        ToDate: finalToDate
      }

      const updatedRoom = await Room.findOneAndUpdate(
        {
          RoomTypeID: enhancedRoom.RoomTypeID,
          RateTypeID: enhancedRoom.RateTypeID,
          roomrateunkid: enhancedRoom.roomrateunkid
        },
        { $set: { ...enhancedRoom } },
        { new: true, upsert: true }
      )

      upsertCount++
      updatedRooms.push(updatedRoom)
    }

    // 4. Return response
    return res.json({
      message: 'Rooms synchronized successfully using JSON API',
      upsertedRecords: upsertCount,
      rooms: updatedRooms
    })
  } catch (error) {
    console.error('Error syncing rooms:', error)
    return res.status(500).json({ error: 'Internal Server Error', details: error.message })
  }
}




export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    return res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    return res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createRoom = async (req, res) => {
  try {
    let {
      RoomTypeID,
      RateTypeID,
      RoomImage,
      HotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,
      defaultRate,
      discountRate,
      Availability, // Added Availability field
      available,
      FromDate,
      ToDate,
      source,
      maxGuests,
      squareFeet,
      uniqueRoomIdentifier,
    } = req.body;

    // Validate required fields
    if (!RoomTypeID || !RateTypeID || !RoomName || !HotelCode) {
      return res.status(400).json({
        error: 'RoomTypeID, RateTypeID, RoomName, and HotelCode are required',
      });
    }

    // Set default dates if not provided
    const finalFromDate = FromDate || new Date().toISOString().split('T')[0];
    const finalToDate =
      ToDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];

    // Compute discount rate using the correct property
    const computedDiscountRate =
      discountRate !== undefined ? parseFloat(discountRate) : undefined;

    // Parse Availability as integer if provided
    const parsedAvailability =
      Availability !== undefined ? parseInt(Availability) : 0;

    // Generate unique identifier if not provided
    const generatedUniqueId =
      uniqueRoomIdentifier || `${HotelCode}-${RoomTypeID}-${RateTypeID}-${Date.now()}`;

    // Check for duplicate entry based on RoomTypeID and RateTypeID
    const existingRoom = await Room.findOne({ RoomTypeID, RateTypeID });
    if (existingRoom) {
      // Append a unique suffix (using current timestamp) to RoomTypeID to avoid duplication
      RoomTypeID = `${RoomTypeID}-${Date.now()}`;
    }

    // Create new room document with (potentially modified) RoomTypeID
    const newRoom = new Room({
      RoomTypeID,
      RateTypeID,
      RoomImage,
      HotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,
      defaultRate: defaultRate !== undefined ? parseFloat(defaultRate) : undefined,
      discountRate: computedDiscountRate,
      Availability: parsedAvailability, // Added Availability field
      FromDate: finalFromDate,
      ToDate: finalToDate,
      source,
      maxGuests,
      squareFeet,
      available,
      uniqueRoomIdentifier: generatedUniqueId,
    });

    await newRoom.save();
    return res.status(201).json({ room: newRoom });
  } catch (error) {
    console.error('Error creating room:', error);
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid room ID format',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }

    // Check if body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: 'No update data provided',
        details: 'Request body cannot be empty'
      });
    }

    // Convert numeric fields if they exist (optional, keeping this for data consistency)
    const updateData = { ...req.body };
    if (updateData.defaultRate !== undefined) {
      updateData.defaultRate = parseFloat(updateData.defaultRate);
    }
    if (updateData.discountRate !== undefined) {
      updateData.discountRate = parseFloat(updateData.discountRate);
    }
    // Parse Availability as integer if provided
    if (updateData.Availability !== undefined) {
      updateData.Availability = parseInt(updateData.Availability);
    }

    // Perform the update
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    );


    if (!updatedRoom) {
      return res.status(404).json({
        error: 'Room not found',
        details: `No room found with ID: ${id}`
      });
    }

    return res.status(200).json({
      message: 'Room updated successfully',
      room: updatedRoom
    });

  } catch (error) {
    console.error('Error updating room:', {
      error: error.message,
      stack: error.stack,
      id: req.params.id,
      updateData: req.body,
      timestamp: new Date().toISOString()
    });

    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.message
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid data format',
        details: error.message
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
};

