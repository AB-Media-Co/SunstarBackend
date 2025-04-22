import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const getDayUseRooms = async (req, res) => {
  try {
    // Find hotels with dayUseRoom: true
    const hotels = await Hotel.find({ isDayUseRoom: true })
      .select('hotelCode name price discountedPrice rating authKey location.hotelAddress')
      .lean();
    console.log(hotels);

    if (!hotels.length) {
      return res.status(404).json({ 
        success: false,
        message: 'No hotels with day use rooms found.' 
      });
    }

    // Get hotelCodes of all day use hotels
    const hotelCodes = hotels.map(hotel => hotel.hotelCode.toString());

    // Find rooms for these hotels
    const rooms = await Room.find({
      HotelCode: { $in: hotelCodes },
      show: true,
      Availability: { $gt: 0 }
    }).select('RoomName RoomDescription RoomImage defaultRate discountRate maxGuests HotelCode Amenities').lean();

    // Organize rooms by hotel
    const result = hotels.map(hotel => ({
      hotel,
      rooms: rooms.filter(room => room.HotelCode === hotel.hotelCode.toString())
    }));

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching day use rooms:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error while fetching day use rooms.'
    });
  }
};