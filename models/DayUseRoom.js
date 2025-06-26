// models/DayUseRoom.js
import mongoose from 'mongoose';

const TimeSlotSchema = new mongoose.Schema({
  timeSlot: { type: String, required: true }, // e.g., "09:00 AM - 12:00 PM"
  rate: { type: Number, required: true },
  availability: { type: Number, default: 0 }
}, { _id: false });

const DayUseRoomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: String, required: true }, // format: YYYY-MM-DD
  slots: { type: [TimeSlotSchema], default: [] }
});

DayUseRoomSchema.index({ hotel: 1, room: 1, date: 1 }, { unique: true });

export default mongoose.model('DayUseRoom', DayUseRoomSchema);
