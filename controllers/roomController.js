import axios from 'axios';
import xml2js from 'xml2js';
import Room from '../models/Room.js';
import mongoose from 'mongoose';

const getToday = () => new Date().toISOString().split('T')[0];
const getTomorrow = () => new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const getSyncedRooms = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query;
    console.log(hotelCode, authCode, fromDate, toDate)
    if (!hotelCode || !authCode) {
      return res.status(400).json({ error: 'hotelCode and authCode are required as query parameters' });
    }

    const finalFromDate = fromDate || getToday();
    const finalToDate = toDate || getTomorrow();

    // -----------------------------
    // 1. Call the Rate API
    // -----------------------------
    const rateXmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <RES_Request>
      <Request_Type>Rate</Request_Type>
      <Authentication>
        <HotelCode>${hotelCode}</HotelCode>
        <AuthCode>${authCode}</AuthCode>
      </Authentication>
      <FromDate>${finalFromDate}</FromDate>
      <ToDate>${finalToDate}</ToDate>
    </RES_Request>`;

    const rateResponse = await axios.post(
      'https://live.ipms247.com/pmsinterface/getdataAPI.php',
      rateXmlPayload,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    console.log(rateResponse.data)

    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedRateResult = await parser.parseStringPromise(rateResponse.data);
    let rateRooms = [];

    if (
      parsedRateResult &&
      parsedRateResult.RES_Response &&
      parsedRateResult.RES_Response.RoomInfo &&
      parsedRateResult.RES_Response.RoomInfo.Source
    ) {
      let sources = parsedRateResult.RES_Response.RoomInfo.Source;
      if (!Array.isArray(sources)) sources = [sources];

      sources.forEach((source) => {
        if (source.RoomTypes && source.RoomTypes.RateType) {
          let rateTypes = source.RoomTypes.RateType;
          if (!Array.isArray(rateTypes)) rateTypes = [rateTypes];

          rateTypes.forEach((rate) => {
            rateRooms.push({
              RoomTypeID: rate.RoomTypeID,
              RateTypeID: rate.RateTypeID,
              FromDate: rate.FromDate,
              ToDate: rate.ToDate,
              discountRate: rate.RoomRate?.Base ? parseFloat(rate.RoomRate.Base) : undefined,
              extraAdult: rate.RoomRate?.ExtraAdult ? parseFloat(rate.RoomRate.ExtraAdult) : undefined,
              extraChild: rate.RoomRate?.ExtraChild ? parseFloat(rate.RoomRate.ExtraChild) : undefined,
            });
          });
        }
      });
    }

    // -----------------------------
    // 2. Call the Inventory API
    // -----------------------------
    const inventoryXmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
    <RES_Request>
      <Request_Type>Inventory</Request_Type>
      <Authentication>
        <HotelCode>${hotelCode}</HotelCode>
        <AuthCode>${authCode}</AuthCode>
      </Authentication>
      <FromDate>${finalFromDate}</FromDate>
      <ToDate>${finalToDate}</ToDate>
    </RES_Request>`;

    const inventoryResponse = await axios.post(
      'https://live.ipms247.com/pmsinterface/getdataAPI.php',
      inventoryXmlPayload,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    const parsedInventoryResult = await parser.parseStringPromise(inventoryResponse.data);
    const availabilityByRoomType = {};

    if (
      parsedInventoryResult &&
      parsedInventoryResult.RES_Response &&
      parsedInventoryResult.RES_Response.RoomInfo &&
      parsedInventoryResult.RES_Response.RoomInfo.Source
    ) {
      let sources = parsedInventoryResult.RES_Response.RoomInfo.Source;
      if (!Array.isArray(sources)) sources = [sources];

      sources.forEach((source) => {
        if (source.RoomTypes && source.RoomTypes.RoomType) {
          let roomTypes = source.RoomTypes.RoomType;
          if (!Array.isArray(roomTypes)) roomTypes = [roomTypes];

          roomTypes.forEach((room) => {
            const roomTypeID = room.RoomTypeID;
            const availability = parseInt(room.Availability);
            
            if (!availabilityByRoomType[roomTypeID] && availabilityByRoomType[roomTypeID] !== 0) {
              availabilityByRoomType[roomTypeID] = availability;
            } else {
              // Store the minimum availability for each room type
              availabilityByRoomType[roomTypeID] = Math.min(availabilityByRoomType[roomTypeID], availability);
            }
          });
        }
      });
    }

    // -----------------------------
    // 3. Find Lowest Rate for Each RoomTypeID
    // -----------------------------
    const lowestRateRooms = [];

    const groupedByRoomType = rateRooms.reduce((acc, room) => {
      if (!acc[room.RoomTypeID]) {
        acc[room.RoomTypeID] = [];
      }
      acc[room.RoomTypeID].push(room);
      return acc;
    }, {});

    // Loop through each group and find the lowest rate
    for (const roomTypeID of Object.keys(groupedByRoomType)) {
      const rooms = groupedByRoomType[roomTypeID];
      const lowestRateRoom = rooms.reduce((minRateRoom, currentRoom) => {
        if (minRateRoom.discountRate > currentRoom.discountRate) {
          return currentRoom;
        }
        return minRateRoom;
      });
      
      // Add the minimum availability to the room data
      lowestRateRoom.Availability = availabilityByRoomType[roomTypeID] !== undefined 
        ? parseInt(availabilityByRoomType[roomTypeID]) 
        : 0;
      
      // Fetch additional room details from database
      const roomDetails = await Room.findOne({ RoomTypeID: roomTypeID });
      
      // Merge room details with rate information, preserving existing data
      const enhancedRoom = {
        ...lowestRateRoom,
        RoomImage: roomDetails?.RoomImage || [],
        HotelCode: roomDetails?.HotelCode || hotelCode,
        RoomName: roomDetails?.RoomName,
        RoomDescription: roomDetails?.RoomDescription,
        AboutRoom: roomDetails?.AboutRoom || {},
        Amenities: roomDetails?.Amenities || [],
        maxGuests: roomDetails?.maxGuests,
        squareFeet: roomDetails?.squareFeet,
        show: roomDetails?.show ?? true,
        source: roomDetails?.source || 'API',
        FromDate: finalFromDate,
        ToDate: finalToDate,
        

      };
      console.log(enhancedRoom)

      lowestRateRooms.push(enhancedRoom);
    }

    // -----------------------------
    // 4. Upsert the Lowest Rate Data into the Database
    // -----------------------------
    let upsertCount = 0;
    const updatedRooms = [];
    for (const room of lowestRateRooms) {
      const updatedRoom = await Room.findOneAndUpdate(
        { RoomTypeID: room.RoomTypeID, RateTypeID: room.RateTypeID },
        { $set: { ...room } },
        { new: true, upsert: true }
      );
      upsertCount++;
      updatedRooms.push(updatedRoom);
    }

  

    return res.json({
      message: 'Rooms synchronized successfully with lowest rate and availability data',
      upsertedRecords: upsertCount,
      rooms: updatedRooms, // Use the full updated documents      rateApiData: parsedRateResult,
      inventoryApiData: parsedInventoryResult
    });
  } catch (error) {
    console.error('Error syncing rooms:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

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

