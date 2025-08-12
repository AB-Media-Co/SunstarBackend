import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    image: {
      // store URL. If you want file uploads, store public URL from S3/Cloudinary
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    pricePerPlate: {
      type: Number,
      required: [true, "Price per plate is required"],
      min: [0, "Price per plate must be >= 0"],
    },
    capacityMin: {
      type: Number,
      required: [true, "Minimum people/capacity is required"],
      min: [1, "Minimum capacity must be >= 1"],
    },
    capacityMax: {
      type: Number,
      required: [true, "Maximum people/capacity is required"],
      validate: {
        validator: function (v) {
          return v >= this.capacityMin;
        },
        message: "capacityMax must be >= capacityMin",
      },
    },
    // optional fields:
    location: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 1000 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

venueSchema.index({ name: "text", location: "text" });

const Venue = mongoose.model("Venue", venueSchema);
export default Venue;
