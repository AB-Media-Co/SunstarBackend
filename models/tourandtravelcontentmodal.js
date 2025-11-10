// src/models/tourandtravelcontentmodal.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Advantage item schema
const AdvantageItemSchema = new Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, default: "" }
}, { _id: true });

// Main schema (single document storing hero + advantages)
const TourAndTravelContentSchema = new Schema({
  // Hero section
  hero: {
    title: { type: String, required: true, trim: true },
    desc: { type: String, default: "" }
  },

  // Advantages section (array of sections). Usually you'll have one advantages section,
  // but we allow multiple sections for flexibility.
  advantages: [{
    title: { type: String, required: true, trim: true },
    desc: { type: String, default: "" },
    // types: array of small items with title + desc
    types: { type: [AdvantageItemSchema], default: [] }
  }]
}, {
  timestamps: true
});

// We'll store as single-document collection; name the model accordingly
export default model("TourAndTravelContent", TourAndTravelContentSchema);
