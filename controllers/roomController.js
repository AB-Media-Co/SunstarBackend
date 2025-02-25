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


    // Call the ezee API
    const ezeeResponse = await axios.post(
      'https://live.ipms247.com/pmsinterface/getdataAPI.php',
      xmlPayload,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    // Parse the XML response
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
              BaseRate: rate.RoomRate?.Base,
              ExtraAdult: rate.RoomRate?.ExtraAdult,
              ExtraChild: rate.RoomRate?.ExtraChild,
            });
          });
        }
      });
    }

    const localRooms = await Room.find();
    const localRoomsMap = new Map();
    localRooms.forEach((room) => {
      localRoomsMap.set(room.RoomTypeID, room.toObject());
    });

    const mergedRoomsMap = new Map();

    ezeeRooms.forEach((ezeeRoom) => {
      if (localRoomsMap.has(ezeeRoom.RoomTypeID)) {
        mergedRoomsMap.set(
          ezeeRoom.RoomTypeID,
          { ...ezeeRoom, ...localRoomsMap.get(ezeeRoom.RoomTypeID) }
        );
      } else {
        mergedRoomsMap.set(ezeeRoom.RoomTypeID, ezeeRoom);
      }
    });

    localRooms.forEach((localRoom) => {
      if (!mergedRoomsMap.has(localRoom.RoomTypeID)) {
        mergedRoomsMap.set(localRoom.RoomTypeID, localRoom.toObject());
      }
    });

    const mergedRooms = Array.from(mergedRoomsMap.values());

    return res.json(mergedRooms);
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
      RoomImage,
      HotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,   
      maxGuests,
      squareFeet,
      discountRate, 
      defaultRate,
      available,
    } = req.body;
    console.log(req.body)

    if (!RoomTypeID || !RoomName) {
      return res.status(400).json({ error: 'RoomTypeID and RoomName are required' });
    }

    const { hotelCode, authCode, fromDate, toDate } = req.query;
    if (!hotelCode || !authCode) {
      return res.status(400).json({
        error: 'hotelCode and authCode are required as query parameters to fetch default rate',
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

    const ezeeResponse = await axios.post(
      'https://live.ipms247.com/pmsinterface/getdataAPI.php',
      xmlPayload,
      { headers: { 'Content-Type': 'application/xml' } }
    );


    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedResult = await parser.parseStringPromise(ezeeResponse.data);

    let defaultRateFromAPI;
    if (
      parsedResult &&
      parsedResult.RES_Response &&
      parsedResult.RES_Response.RoomInfo &&
      parsedResult.RES_Response.RoomInfo.Source
    ) {
      let sources = parsedResult.RES_Response.RoomInfo.Source;
      if (!Array.isArray(sources)) sources = [sources];

      for (const source of sources) {
        if (source.RoomTypes && source.RoomTypes.RateType) {
          let rateTypes = source.RoomTypes.RateType;
          if (!Array.isArray(rateTypes)) rateTypes = [rateTypes];

          for (const rate of rateTypes) {
            if (rate.RoomTypeID === RoomTypeID) {
              defaultRateFromAPI = parseFloat(rate.RoomRate?.Base) || 0;
              break;
            }
          }
        }
        if (defaultRateFromAPI !== undefined) break;
      }
    }

    if (defaultRateFromAPI === undefined) {
      defaultRateFromAPI = 0;
    }

    let room = await Room.findOne({ RoomTypeID });
    if (room) {
      room.RoomImage = RoomImage;
      room.HotelCode = HotelCode;
      room.RoomName = RoomName;
      room.RoomDescription = RoomDescription;
      room.Amenities = Amenities;
      room.AboutRoom = AboutRoom;
      room.discountRate = defaultRateFromAPI; 
      room.available = available;
      room.defaultRate = defaultRate !== undefined ? parseFloat(defaultRate) : room.defaultRate; 
      if (maxGuests !== undefined) room.maxGuests = maxGuests;
      if (squareFeet !== undefined) room.squareFeet = squareFeet;
      await room.save();
      return res.status(200).json(room);
    } else {
      const newRoom = new Room({
        RoomTypeID,
        RoomImage,
        HotelCode,
        RoomName,
        RoomDescription,
        Amenities,
        AboutRoom,
        defaultRate: defaultRate !== undefined ? parseFloat(defaultRate) : undefined,
        discountRate: defaultRateFromAPI, 
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
