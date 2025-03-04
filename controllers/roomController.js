import axios from 'axios';
import xml2js from 'xml2js';
import Room from '../models/Room.js';

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
            ezeeRooms.push({
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

    let upsertCount = 0;
    for (const ezeeRoom of ezeeRooms) {
      await Room.findOneAndUpdate(
        { RoomTypeID: ezeeRoom.RoomTypeID, RateTypeID: ezeeRoom.RateTypeID },
        { $set: { ...ezeeRoom } },
        { new: true, upsert: true }
      );
      upsertCount++;
    }

    // Return all rooms from the database after synchronization
    const mergedRooms = await Room.find({
      FromDate: { $gte: finalFromDate },
      ToDate: { $lte: finalToDate },
    });
    return res.json({
      message: 'Rooms synchronized successfully',
      upsertedRecords: upsertCount,
      rooms: mergedRooms,
    });
  } catch (error) {
    console.error('Error syncing rooms:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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


export const createOrUpdateRoom = async (req, res) => {
  try {
    const {
      RoomTypeID,
      RateTypeID,
      RoomImage,
      HotelCode: roomHotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,
      maxGuests,
      squareFeet,
      defaultRate,
      available,
    } = req.body;

    console.log('Request Body:', req.body);

    // Ensure both RoomTypeID and RateTypeID are provided
    if (!RoomTypeID || !RateTypeID || !RoomName) {
      return res
        .status(400)
        .json({ error: 'RoomTypeID, RateTypeID, and RoomName are required' });
    }

    // Extract query parameters to fetch default rate from eZee API
    const { hotelCode, authCode, fromDate, toDate } = req.query;
    if (!hotelCode || !authCode) {
      return res.status(400).json({
        error:
          'hotelCode and authCode are required as query parameters to fetch default rate',
      });
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

    let defaultRateFromAPI = 0;
    try {
      const ezeeResponse = await axios.post(
        'https://live.ipms247.com/pmsinterface/getdataAPI.php',
        xmlPayload,
        { headers: { 'Content-Type': 'application/xml' } }
      );
      const parser = new xml2js.Parser({ explicitArray: false });
      const parsedResult = await parser.parseStringPromise(ezeeResponse.data);

      if (parsedResult?.RES_Response?.RoomInfo?.Source) {
        let sources = parsedResult.RES_Response.RoomInfo.Source;
        if (!Array.isArray(sources)) sources = [sources];

        // Loop through sources and rate types to match both RoomTypeID and RateTypeID
        outerLoop:
        for (const source of sources) {
          if (source.RoomTypes?.RateType) {
            let rateTypes = source.RoomTypes.RateType;
            if (!Array.isArray(rateTypes)) rateTypes = [rateTypes];
            for (const rate of rateTypes) {
              if (rate.RoomTypeID === RoomTypeID && rate.RateTypeID === RateTypeID) {
                defaultRateFromAPI = parseFloat(rate.RoomRate?.Base) || 0;
                break outerLoop;
              }
            }
          }
        }
      }
    } catch (apiError) {
      console.error('Error fetching default rate from API:', apiError.message);
      defaultRateFromAPI = 0;
    }

    // Use the fetched default rate as the discountRate
    const computedDiscountRate = defaultRateFromAPI;

    // Check if the room already exists by both RoomTypeID and RateTypeID
    let room = await Room.findOne({ RoomTypeID, RateTypeID });
    if (room) {
      // Update the existing room with provided values (preserving local fields if not overwritten)
      room.RoomImage = RoomImage || room.RoomImage;
      room.HotelCode = roomHotelCode || room.HotelCode;
      room.RoomName = RoomName;
      room.RoomDescription = RoomDescription || room.RoomDescription;
      room.Amenities = Amenities || room.Amenities;
      room.AboutRoom = AboutRoom || room.AboutRoom;
      room.discountRate = computedDiscountRate;
      room.available = available !== undefined ? available : room.available;
      room.defaultRate = defaultRate !== undefined ? parseFloat(defaultRate) : room.defaultRate;
      if (maxGuests !== undefined) room.maxGuests = maxGuests;
      if (squareFeet !== undefined) room.squareFeet = squareFeet;
      await room.save();
      return res.status(200).json(room);
    } else {
      // Create a new room document
      const newRoom = new Room({
        RoomTypeID,
        RateTypeID,
        RoomImage,
        HotelCode: roomHotelCode,
        RoomName,
        RoomDescription,
        Amenities,
        AboutRoom,
        defaultRate: defaultRate !== undefined ? parseFloat(defaultRate) : undefined,
        discountRate: computedDiscountRate,
        maxGuests,
        squareFeet,
        available,
      });
      await newRoom.save();
      return res.status(201).json(newRoom);
    }
  } catch (error) {
    console.error('Error creating/updating room:', error);
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
