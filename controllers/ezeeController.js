// controllers/ezeeController.js
import axios from 'axios';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';




export const syncInventory = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/pmsinterface/pms_connectivity.php', {
      RES_Request: {
        Request_Type: 'FetchSingleBooking',
        BookingId: '216',
        Authentication: {
          HotelCode: hotelCode,
          AuthCode: authKey,
        },
      },
    });

    const ezeeData = response.data;

    let hotel = await Hotel.findOne({ hotelCode });

    if (!hotel) {
      hotel = new Hotel({
        name: ezeeData.name,
        description: ezeeData.description,
        location: ezeeData.location,
        amenities: ezeeData.amenities,
        rating: ezeeData.rating,
        images: ezeeData.images,
        price: ezeeData.price,
        discountedPrice: ezeeData.discountedPrice,
        soldOut: ezeeData.soldOut,
        testimonials: ezeeData.testimonials,
        hotelCode: hotelCode,
        authKey: authKey,
      });
      await hotel.save();
    } else {
      hotel.name = ezeeData.name;
      hotel.description = ezeeData.description;
      hotel.location = ezeeData.location;
      hotel.amenities = ezeeData.amenities;
      hotel.rating = ezeeData.rating;
      hotel.images = ezeeData.images;
      hotel.price = ezeeData.price;
      hotel.discountedPrice = ezeeData.discountedPrice;
      hotel.soldOut = ezeeData.soldOut;
      hotel.testimonials = ezeeData.testimonials;
      await hotel.save();
    }

    res.json({ message: 'Inventory synced successfully', hotel, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const pushBooking = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const bookingData = req.body;
    const response = await axios.post('https://live.ipms247.com/booking/reservation_api/listing.php', {
      request_type: 'InsertBooking',
      HotelCode: hotelCode,
      APIKey: authKey,
      BookingData: bookingData,
    });

    const ezeeData = response.data;

    res.json({ message: 'Booking pushed successfully', bookingData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const pushPaymentDetails = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const paymentData = req.body;
    const response = await axios.post('https://live.ipms247.com/index.php/page/service.kioskconnectivity', {
      RES_Request: {
        Request_Type: 'AddPayment',
        Authentication: {
          HotelCode: hotelCode,
          AuthCode: authKey,
        },
        Reservation: [paymentData],
      },
    });

    const ezeeData = response.data;

    res.json({ message: 'Payment details pushed successfully', paymentData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const syncRates = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/pmsinterface/getdataAPI.php', {
      RES_Request: {
        Request_Type: 'Rate',
        Authentication: {
          HotelCode: hotelCode,
          AuthCode: authKey,
        },
        FromDate: '2023-03-05',
        ToDate: '2023-03-18',
      },
    });

    const ezeeData = response.data;

    res.json({ message: 'Rates synced successfully', rates: ezeeData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const syncAddOnServices = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/booking/reservation_api/listing.php', {
      request_type: 'CalculateExtraCharge',
      HotelCode: hotelCode,
      APIKey: authKey,
      check_in_date: '2023-04-01',
      ExtraChargeId: '800000000000011',
      Total_ExtraItem: '1',
      check_out_date: '2023-04-02',
    });

    const ezeeData = response.data;

    res.json({ message: 'Add-on services synced successfully', services: ezeeData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const syncPaymentGateways = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/booking/reservation_api/listing.php', {
      request_type: 'ConfiguredPGList',
      HotelCode: hotelCode,
      APIKey: authKey,
      language: 'en',
    });

    const ezeeData = response.data;

    res.json({ message: 'Payment gateways synced successfully', gateways: ezeeData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyMobileNumber = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/booking/reservation_api/listing.php', {
      request_type: 'VerifyUser',
      username: 'TEST',
      password: '123',
      groupcode: '214',
      Hotel_Code: hotelCode,
    });

    const ezeeData = response.data;

    res.json({ message: 'Mobile number verified successfully', verificationData: ezeeData, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRoomDetails = async (req, res) => {
  try {
    const { hotelCode, authKey, roomCode } = req.params;
    const response = await axios.post('https://live.ipms247.com/pmsinterface/pms_connectivity.php', {
      RES_Request: {
        Request_Type: 'FetchSingleRoom',
        RoomCode: roomCode,
        Authentication: {
          HotelCode: hotelCode,
          AuthCode: authKey,
        },
      },
    });

    const ezeeData = response.data;

    let room = await Room.findOne({ roomCode });

    if (!room) {
      room = new Room({
        name: ezeeData.name,
        description: ezeeData.description,
        location: ezeeData.location,
        amenities: ezeeData.amenities,
        rating: ezeeData.rating,
        images: ezeeData.images,
        price: ezeeData.price,
        discountedPrice: ezeeData.discountedPrice,
        soldOut: ezeeData.soldOut,
        testimonials: ezeeData.testimonials,
        hotelCode: hotelCode,
        authKey: authKey,
        roomCode: roomCode,
      });
      await room.save();
    } else {
      room.name = ezeeData.name;
      room.description = ezeeData.description;
      room.location = ezeeData.location;
      room.amenities = ezeeData.amenities;
      room.rating = ezeeData.rating;
      room.images = ezeeData.images;
      room.price = ezeeData.price;
      room.discountedPrice = ezeeData.discountedPrice;
      room.soldOut = ezeeData.soldOut;
      room.testimonials = ezeeData.testimonials;
      await room.save();
    }

    res.json({ message: 'Room details synced successfully', room, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchRoomInformation = async (req, res) => {
  try {
    const { hotelCode, authKey } = req.params;
    const response = await axios.post('https://live.ipms247.com/pmsinterface/pms_connectivity.php', {
      RES_Request: {
        Request_Type: 'RoomInfo',
        NeedPhysicalRooms: 1,
        Authentication: {
          HotelCode: hotelCode,
          AuthCode: authKey,
        },
      },
    });

    const ezeeData = response.data;

    let rooms = [];
    if (ezeeData && ezeeData.rooms) {
      for (const roomData of ezeeData.rooms) {
        let room = await Room.findOne({ roomCode: roomData.roomCode });

        if (!room) {
          room = new Room({
            name: roomData.name,
            description: roomData.description,
            location: roomData.location,
            amenities: roomData.amenities,
            rating: roomData.rating,
            images: roomData.images,
            price: roomData.price,
            discountedPrice: roomData.discountedPrice,
            soldOut: roomData.soldOut,
            testimonials: roomData.testimonials,
            hotelCode: hotelCode,
            authKey: authKey,
            roomCode: roomData.roomCode,
          });
          await room.save();
        } else {
          room.name = roomData.name;
          room.description = roomData.description;
          room.location = roomData.location;
          room.amenities = roomData.amenities;
          room.rating = roomData.rating;
          room.images = roomData.images;
          room.price = roomData.price;
          room.discountedPrice = roomData.discountedPrice;
          room.soldOut = roomData.soldOut;
          room.testimonials = roomData.testimonials;
          await room.save();
        }
        rooms.push(room.toObject());
      }
    }

    res.json({ message: 'Room information synced successfully', rooms, ezeeResponse: ezeeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};