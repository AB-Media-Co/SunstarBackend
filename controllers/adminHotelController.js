import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

const convertToAMPM = (timeStr) => {
  if (!timeStr) return timeStr;
  if (timeStr.toUpperCase().includes('AM') || timeStr.toUpperCase().includes('PM')) {
    return timeStr;
  }
  
  const [hourStr, minuteStr] = timeStr.split(':');
  let hour = Number(hourStr);
  const minute = minuteStr;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
};

export const getSingleHotel = async (req, res) => {
  try {
    let { hotelCode } = req.params;
    const numericHotelCode = Number(hotelCode);

    const hotel = await Hotel.findOne({ hotelCode: numericHotelCode }).populate('cityLocation');
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const hotelObj = hotel.toObject();
    if (hotelObj.checkIn) {
      hotelObj.checkIn = convertToAMPM(hotelObj.checkIn);
    }
    if (hotelObj.checkOut) {
      hotelObj.checkOut = convertToAMPM(hotelObj.checkOut);
    }

      
    const rooms = await Room.find({ HotelCode: hotelCode.toString() });
    res.json({
      message: 'Hotel fetched successfully',
      hotel: { ...hotelObj, rooms },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('cityLocation');
    const modifiedHotels = hotels.map(hotel => {
      const h = hotel.toObject();
      if (h.checkIn) {
        h.checkIn = convertToAMPM(h.checkIn);
      }
      if (h.checkOut) {
        h.checkOut = convertToAMPM(h.checkOut);
      }
      return h;
    });
    res.json({ message: 'Hotels fetched successfully', hotels: modifiedHotels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addHotel = async (req, res) => {
  console.log(req.body)
  try {

    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json({ message: 'Hotel added successfully', hotel: savedHotel });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

export const editHotel = async (req, res) => {
  let { hotelCode } = req.params;
  hotelCode = Number(hotelCode);
  // Exclude hotelCode and authKey from update fields
  const { hotelCode: bodyHotelCode, authKey, ...updateFields } = req.body;

  try {
    const existingHotel = await Hotel.findOne({ hotelCode });
    if (!existingHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // If the location is being updated, ensure that it follows the new structure as described above.
    const updatedHotel = await Hotel.findOneAndUpdate(
      { hotelCode },
      updateFields,
      { new: true }
    ).populate('cityLocation');
    if (!updatedHotel) {
      return res.status(404).json({ error: 'Hotel not found after update' });
    }
    res.json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (error) {
    console.error("Error in editHotel:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const { hotelCode } = req.params;
    const deletedHotel = await Hotel.findOneAndDelete({ hotelCode });
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json({ message: 'Hotel deleted successfully', hotel: deletedHotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
