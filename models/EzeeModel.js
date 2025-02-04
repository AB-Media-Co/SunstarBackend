import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    hotelunkid: { type: String, required: true },
    HotelCode: { type: String, required: true, unique: true },
    HotelName: { type: String },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    Zipcode: { type: String },
    Country: { type: String },
    Latitude: { type: String },
    Longitude: { type: String },
    // Additional fields for manual data
    HotelDescription: { type: String },
    Amenities: [{ type: String }],
    Rating: { type: Number, min: 0, max: 5 },
    Images: [{ type: String }],
    Price: { type: Number },
    DiscountedPrice: { type: Number },
    Testimonials: [{ name: String, description:String, rating: String }],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model('EzeeHotels', hotelSchema);
