// /models/faqModel.js
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  page: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const FAQ = mongoose.model('FAQ', faqSchema);

export default FAQ;
