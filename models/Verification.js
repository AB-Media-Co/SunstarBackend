import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
  phone: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model('User', UserSchema);
