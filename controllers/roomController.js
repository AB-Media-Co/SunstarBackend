// controllers/room.controller.js
import axios from 'axios';
import Room from '../models/Room.js';
import mongoose from 'mongoose';
import dayjs from 'dayjs';

/**
 * Small helpers focused on perf without changing behavior
 */
const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const minFromObjValues = (obj) => {
  if (!obj || typeof obj !== 'object') return 0;
  let m = Infinity;
  let found = false;
  for (const k in obj) {
    const n = num(obj[k]);
    if (Number.isFinite(n)) {
      found = true;
      if (n < m) m = n;
    }
  }
  return found ? m : 0;
};

const processGroupedRoomData = (roomList) => {
  const grouped = Object.create(null);

  for (let i = 0; i < roomList.length; i++) {
    const room = roomList[i];
    const key = room.Roomtype_Name;

    const minAvailable = minFromObjValues(room.available_rooms);
    const minExclusiveTax = minFromObjValues(room.room_rates_info?.exclusive_tax);

    const next = {
      Roomtype_Name: room.Roomtype_Name,
      Room_Max_adult: room.Room_Max_adult,
      Room_Max_child: room.Room_Max_child,
      hotelcode: room.hotelcode,
      roomtypeunkid: room.roomtypeunkid,
      ratetypeunkid: room.ratetypeunkid,
      roomrateunkid: room.roomrateunkid,
      min_available_rooms: minAvailable,
      min_exclusive_tax: minExclusiveTax,
    };

    const cur = grouped[key];
    if (!cur || minExclusiveTax < cur.min_exclusive_tax || minAvailable < cur.min_available_rooms) {
      grouped[key] = next;
    }
  }

  return Object.values(grouped);
};

export const getRoomList = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query;

    const numNights = toDate ? dayjs(toDate).diff(dayjs(fromDate), 'day') : 1;

    const url = `https://live.ipms247.com/booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${hotelCode}&APIKey=${authCode}&check_in_date=${fromDate}&num_nights=${numNights}&number_adults=1&number_children=0&num_rooms=1&promotion_code=&property_configuration_info=0&showtax=0&show_only_available_rooms=0&language=en&roomtypeunkid=&packagefor=DESKTOP&promotionfor=DESKTOP`;

    // Tighten network behavior (defaults preserve identical output)
    const response = await axios.get(url, { timeout: 15000, decompress: true });
    const processedData = processGroupedRoomData(response.data);

    res.status(200).json({
      success: true,
      data: processedData,
    });
  } catch (error) {
    console.error('Error fetching room list:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room list',
    });
  }
};

export const getSyncedRooms = async (req, res) => {
  try {
    const { hotelCode, authCode, fromDate, toDate } = req.query;

    if (!hotelCode || !authCode) {
      return res
        .status(400)
        .json({ error: 'hotelCode and authCode are required as query parameters' });
    }

    const finalFromDate = fromDate || dayjs().format('YYYY-MM-DD');
    const finalToDate = toDate || dayjs().add(1, 'day').format('YYYY-MM-DD');
    const numNights = dayjs(finalToDate).diff(dayjs(finalFromDate), 'day') || 1;

    // 1) Call IPMS247 RoomList API
    const url = `https://live.ipms247.com/booking/reservation_api/listing.php?request_type=RoomList&HotelCode=${hotelCode}&APIKey=${authCode}&check_in_date=${finalFromDate}&num_nights=${numNights}&number_adults=1&number_children=0&num_rooms=1&promotion_code=&property_configuration_info=0&showtax=0&show_only_available_rooms=0&language=en&roomtypeunkid=&packagefor=DESKTOP&promotionfor=DESKTOP`;

    const response = await axios.get(url, { timeout: 20000, decompress: true });
    const roomList = response.data;

    // 2) Group rooms by Roomtype_Name and find min rate & availability
    const grouped = Object.create(null);
    for (let i = 0; i < roomList.length; i++) {
      const room = roomList[i];
      const key = room.Roomtype_Name;

      const minAvailable = minFromObjValues(room.available_rooms);
      const minExclusiveTax = minFromObjValues(room.room_rates_info?.exclusive_tax);

      const candidate = {
        Roomtype_Name: room.Roomtype_Name,
        Room_Max_adult: room.Room_Max_adult,
        Room_Max_child: room.Room_Max_child,
        hotelcode: room.hotelcode,
        roomtypeunkid: room.roomtypeunkid,
        ratetypeunkid: room.ratetypeunkid,
        roomrateunkid: room.roomrateunkid,
        min_available_rooms: minAvailable,
        min_exclusive_tax: minExclusiveTax,
      };

      const cur = grouped[key];
      if (!cur || minExclusiveTax < cur.min_exclusive_tax || minAvailable < cur.min_available_rooms) {
        grouped[key] = candidate;
      }
    }

    const lowestRateRooms = Object.values(grouped);

    // 3) Merge with MongoDB data & upsert (batch, index-friendly, no N+1)
    // Build list of RoomTypeIDs we need enrichment for
    const idsToFetch = Array.from(new Set(lowestRateRooms.map((r) => r.roomtypeunkid)));

    // Only fetch the fields we actually use (projection) and keep perf with lean()
    const existingRooms = await Room.find(
      { RoomTypeID: { $in: idsToFetch } },
      {
        RoomTypeID: 1,
        RoomImage: 1,
        RoomDescription: 1,
        AboutRoom: 1,
        Amenities: 1,
        squareFeet: 1,
        show: 1,
        source: 1,
      }
    ).lean();

    const byTypeId = new Map(existingRooms.map((doc) => [String(doc.RoomTypeID), doc]));

    // Prepare bulk upserts
    const ops = [];
    const identifiers = []; // keep order to preserve response order exactly as before
    for (let i = 0; i < lowestRateRooms.length; i++) {
      const room = lowestRateRooms[i];

      const roomDetails = byTypeId.get(String(room.roomtypeunkid));
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
        ToDate: finalToDate,
      };

      const filter = {
        RoomTypeID: enhancedRoom.RoomTypeID,
        RateTypeID: enhancedRoom.RateTypeID,
        roomrateunkid: enhancedRoom.roomrateunkid,
      };

      ops.push({
        updateOne: {
          filter,
          update: { $set: { ...enhancedRoom, roomrateunkid: enhancedRoom.roomrateunkid } },
          upsert: true,
        },
      });

      identifiers.push(filter);
    }

    let upsertCount = 0;
    if (ops.length) {
      const bulkRes = await Room.bulkWrite(ops, { ordered: false });
      // Count upserts (both inserted and upserted updates)
      // insertedCount is for pure inserts; upsertedCount captures newly created via upsert
      upsertCount = (bulkRes?.upsertedCount || 0) + (bulkRes?.insertedCount || 0);
      // Note: updated existing docs are not counted toward upsertCount, consistent with "upsertedRecords"
      // in previous logic where it incremented per item. To preserve identical numeric semantics, we will
      // follow previous behavior and count every attempted upsert, not only newly created ones.
      // So:
      upsertCount = identifiers.length;
    }

    // Re-read updated documents to return the same output shape as before (same order)
    // We cannot query with a single equality, so we use $or over our ordered identifier list.
    const updatedDocs = await Room.find({ $or: identifiers });

    // Map to re-establish the original order
    const keyOf = (d) => `${d.RoomTypeID}|${d.RateTypeID}|${d.roomrateunkid}`;
    const mapByKey = new Map(updatedDocs.map((d) => [keyOf(d), d]));
    const orderedRooms = identifiers.map((f) => mapByKey.get(`${f.RoomTypeID}|${f.RateTypeID}|${f.roomrateunkid}`));

    // 4) Return response (identical contract)
    return res.json({
      message: 'Rooms synchronized successfully using JSON API',
      upsertedRecords: upsertCount,
      rooms: orderedRooms,
    });
  } catch (error) {
    console.error('Error syncing rooms:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    // Using lean() improves latency and memory without changing serialized JSON
    const room = await Room.findById(id).lean();
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
      roomrateunkid,
      RoomImage,
      HotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,
      defaultRate,
      discountRate,
      Availability,
      available,
      FromDate,
      ToDate,
      source,
      maxGuests,
      squareFeet,
      uniqueRoomIdentifier,
    } = req.body;

    if (!RoomTypeID || !RateTypeID || !RoomName || !HotelCode) {
      return res
        .status(400)
        .json({ error: 'RoomTypeID, RateTypeID, RoomName, and HotelCode are required' });
    }

    const finalFromDate = FromDate || new Date().toISOString().split('T')[0];
    const finalToDate =
      ToDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];

    const computedDiscountRate = discountRate !== undefined ? parseFloat(discountRate) : undefined;
    const parsedAvailability = Availability !== undefined ? parseInt(Availability) : 0;

    const generatedUniqueId =
      uniqueRoomIdentifier || `${HotelCode}-${RoomTypeID}-${RateTypeID}-${Date.now()}`;

    // Only need to know if one exists; use projection + lean() to cut overhead
    const existingRoom = await Room.findOne({ RoomTypeID, RateTypeID }, { _id: 1 }).lean();
    if (existingRoom) {
      RoomTypeID = `${RoomTypeID}-${Date.now()}`;
    }

    const newRoom = new Room({
      RoomTypeID,
      RateTypeID,
      roomrateunkid,
      RoomImage,
      HotelCode,
      RoomName,
      RoomDescription,
      Amenities,
      AboutRoom,
      defaultRate: defaultRate !== undefined ? parseFloat(defaultRate) : undefined,
      discountRate: computedDiscountRate,
      Availability: parsedAvailability,
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid room ID format',
        details: 'ID must be a valid MongoDB ObjectId',
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error: 'No update data provided',
        details: 'Request body cannot be empty',
      });
    }

    const updateData = { ...req.body };
    if (updateData.defaultRate !== undefined) updateData.defaultRate = parseFloat(updateData.defaultRate);
    if (updateData.discountRate !== undefined) updateData.discountRate = parseFloat(updateData.discountRate);
    if (updateData.Availability !== undefined) updateData.Availability = parseInt(updateData.Availability);

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        error: 'Room not found',
        details: `No room found with ID: ${id}`,
      });
    }

    return res.status(200).json({
      message: 'Room updated successfully',
      room: updatedRoom,
    });
  } catch (error) {
    console.error('Error updating room:', {
      error: error.message,
      stack: error.stack,
      id: req.params.id,
      updateData: req.body,
      timestamp: new Date().toISOString(),
    });

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.message,
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid data format',
        details: error.message,
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
};
