import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { PASSWORD_REGEX, PHONE_REGEX, ROLE_ENUM } from '../constants/validationConstants.js';

// Define the admin schema
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true, match: PHONE_REGEX },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ROLE_ENUM,
      default: 'admin',
    },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    age: { type: Number, required: true },
    allowedCities: [{ type: String }],
    allowedHotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],
  },
  { timestamps: true }
);

// Hide sensitive fields when converting to JSON
adminSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Pre-save hook to hash password
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed Password:', this.password); // 👈 Add this line

    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare entered password with hashed password
adminSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};



const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

//