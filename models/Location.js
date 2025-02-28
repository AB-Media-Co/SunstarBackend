import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LocationSchema = new Schema(
  {
    name: { type: String, required: true },
    aboutus: {
      heading: { type: String },
      paragraph: { type: String }
    },
    image: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

LocationSchema.virtual('hotels', {
  ref: 'Hotel',          
  localField: '_id',     
  foreignField: 'cityLocation'
});

export default model('Location', LocationSchema);
