// models/Package.js
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },  
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    nights: Number,
    days: Number,
  },
  price: Number,
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  description: {
    type: String,
  },
  itinerary: [
    {
      day: String,
      title: String,
      details: String,
    },
  ],
  topSelling: {
    type: Boolean,
    default: false,
  }
});

const TravelPackage = mongoose.model('TravelPackage', packageSchema);
export default TravelPackage;