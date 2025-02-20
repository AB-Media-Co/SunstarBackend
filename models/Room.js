// models/Room.js
import mongoose from 'mongoose';


const RoomSchema = new mongoose.Schema({
  RoomTypeID: { type: String, required: true, unique: true },
  RoomImage: [{ type: String }], 
  HotelCode: { type: String },
  RoomName: { type: String, required: true },
  RoomDescription: { type: String },

  Amenities: [{ type: String }],
  defaultRate: { type: Number },    
  discountRate: { type: Number }, 
});

export default mongoose.model('Room', RoomSchema);