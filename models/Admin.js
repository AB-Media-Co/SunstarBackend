import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['superadmin', 'admin', 'manager', 'contentManager', 'cityManager', 'hotelManager', 'digitalMarketer'],
      default: 'admin',
    },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    age: { type: Number, required: true },
    allowedCities: [{ type: String }], // For City Managers
    allowedHotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }], // For Hotel Managers
    isSuperAdmin: { type: Boolean, default: false }, // Flag for single SuperAdmin
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;