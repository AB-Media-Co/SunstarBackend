import mongoose from 'mongoose';

const ratePlanSchema = new mongoose.Schema({
    RatePlanID: { type: String, required: true },
    Name: { type: String, required: true },
    RateTypeID: { type: String },
    RateType: { type: String },
    Price: { type: Number },
    DiscountedPrice: { type: Number }, 
});

const roomTypeSchema = new mongoose.Schema({
    HotelCode: { type: String, required: true },
    RoomTypeID: { type: String, required: true },
    Name: { type: String, required: true },
    Description: { type: String }, 
    Amenities: { type: [String] }, 
    Images: { type: [String] }, 
    Rooms: [
        {
            RoomID: { type: String, required: true },
            RoomName: { type: String, required: true },
            RoomLeft: { type: Number }, 
            SoldOut: { type: Boolean, default: false }
        },
    ],
    RatePlans: [ratePlanSchema],
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('RoomTypes', roomTypeSchema);
