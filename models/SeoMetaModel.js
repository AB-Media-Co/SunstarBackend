// models/meta.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MetaSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true // Each page identifier should be unique
    },
    metaTitle: {
      type: String,
      required: true
    },
    metaDescription: {
      type: String,
      required: true
    },
    metaKeywords: {
      type: [String], // An array of strings for keywords
      default: []
    }
  },
  { timestamps: true }
);

export default model('Meta', MetaSchema);
