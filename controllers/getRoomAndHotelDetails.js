// controllers/detailsController.js
import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const getRoomAndHotelDetails = async (req, res) => {
  try {
    const { roomId, hotelCode } = req.query;
    console.log(roomId, hotelCode);
    
    if (!roomId || !hotelCode) {
      return res.status(400).json({ message: 'roomId and hotelCode are required.' });
    }
    
    const room = await Room.findById(roomId)
      .select('RoomName RoomTypeID RateTypeID roomrateunkid discountRate maxGuests baseAdultOccupancy maxAdultOccupancy extraAdultRate extraChildRate RoomImage')
      .lean();
      
    const hotel = await Hotel.findOne({ hotelCode: Number(hotelCode) })
      .select('aboutUs addToYourStay authKey checkIn checkOut continentalPlan cityLocation name payAtHotel price rating hotelCode')
      .populate('cityLocation') // Populating only the 'name' field of cityLocation
      .lean();

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }

    return res.status(200).json({ room, hotel });
  } catch (error) {
    console.error('Error fetching room and hotel details:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
