// models/Testimonial.js
import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  page: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
});


const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial ;


