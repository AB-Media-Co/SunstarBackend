import express from "express";
import { getUserHotelBookings, submitEnquiry, submitHotelData } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", submitEnquiry);
router.post("/hotelData", submitHotelData);
router.get("/hotel-booking", getUserHotelBookings);


export default router;
