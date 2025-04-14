import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'], // E.164 validation
  },
  otp: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true,
  });

export default mongoose.model('User', UserSchema);
