import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
    aboutus: {
      heading: { type: String },
      paragraph: { type: String }
    },
    image: { type: String },
    hotels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
      }
    ]
  },
  { timestamps: true }
);

export default model('Location', LocationSchema);
