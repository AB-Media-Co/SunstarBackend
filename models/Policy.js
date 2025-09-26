import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  type: { type: String, enum: ['privacy-policy', 'terms-conditions'], required: true, unique: true },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Policy', policySchema);
