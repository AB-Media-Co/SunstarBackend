import axios from 'axios';
import xml2js from 'xml2js';
import Room from '../models/Room.js';
import mongoose from 'mongoose';

const getToday = () => new Date().toISOString().split('T')[0];
const getTomorrow = () => new Date(Date.now() + 86400000).toISOString().split('T')[0];

export const getSyncedRooms = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query;
    if (!hotelCode || !authCode) {
      return res
        .status(400)
        .json({ error: 'hotelCode and authCode are required as query parameters' });
    }

    const finalFromDate = fromDate || getToday();
    const finalToDate = toDate || getTomorrow();

    const xmlPayload = `<?xml version="1.0" encoding="UTF-8"?>
<RES_Request>
  <Request_Type>Rate</Request_Type>
  <Authentication>
    <HotelCode>${hotelCode}</HotelCode>
    <AuthCode>${authCode}</AuthCode>
  </Authentication>
  <FromDate>${finalFromDate}</FromDate>
  <ToDate>${finalToDate}</ToDate>
</RES_Request>`;

    const ezeeResponse = await axios.post(
      'https://live.ipms247.com/pmsinterface/getdataAPI.php',
      xmlPayload,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedResult = await parser.parseStringPromise(ezeeResponse.data);
    let ezeeRooms = [];
    let restructuredApiData = [];

    if (
      parsedResult &&
      parsedResult.RES_Response &&
      parsedResult.RES_Response.RoomInfo &&
      parsedResult.RES_Response.RoomInfo.Source
    ) {
      let sources = parsedResult.RES_Response.RoomInfo.Source;
      if (!Array.isArray(sources)) sources = [sources];

      sources.forEach((source) => {
        if (source.RoomTypes && source.RoomTypes.RateType) {
          let rateTypes = source.RoomTypes.RateType;
          if (!Array.isArray(rateTypes)) rateTypes = [rateTypes];

          rateTypes.forEach((rate) => {
            const roomData = {
              RoomTypeID: rate.RoomTypeID,
              RateTypeID: rate.RateTypeID,
              RoomName: source.RoomTypes.RoomName || 'Default Room Name',
              FromDate: rate.FromDate,
              ToDate: rate.ToDate,
              discountRate: rate.RoomRate?.Base ? parseFloat(rate.RoomRate.Base) : undefined,
              extraAdult: rate.RoomRate?.ExtraAdult ? parseFloat(rate.RoomRate.ExtraAdult) : undefined,
              extraChild: rate.RoomRate?.ExtraChild ? parseFloat(rate.RoomRate.ExtraChild) : undefined,
              // HotelCode: hotelCode, // Ensure HotelCode is set
            };
            ezeeRooms.push(roomData);

            restructuredApiData.push({
              source: source.$.name,
              name: source.RoomTypes.RoomName || 'Default Room Name',
              roomType: { ...rate },
            });
          });
        }
      });
    }

    let upsertCount = 0;
    for (const ezeeRoom of ezeeRooms) {
      const updatedRoom = await Room.findOneAndUpdate(
        { RoomTypeID: ezeeRoom.RoomTypeID, RateTypeID: ezeeRoom.RateTypeID },
        { $set: { ...ezeeRoom } },
        { new: true, upsert: true }
      );

      upsertCount++;
    }

    // Log all rooms in the DB for debugging
    const allRooms = await Room.find({ HotelCode: hotelCode });

    // Updated date range query to find overlapping rooms
    const mergedRooms = await Room.find({
      FromDate: { $lte: finalToDate },
      ToDate: { $gte: finalFromDate },
      // HotelCode: hotelCode,
    });

    return res.json({
      message: 'Rooms synchronized successfully',
      upsertedRecords: upsertCount,
      rooms: mergedRooms,
      apiData: parsedResult,
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
      discountRate, // using discountRate as sent from the frontend
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

    // Perform the update
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { 
        new: true,           // Return the modified document
        runValidators: true, // Still keeping this to ensure schema constraints
        context: 'query'     // For proper validation context
      }
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
