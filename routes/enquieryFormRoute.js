import express from "express";
import { submitEnquiry, submitHotelData } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", submitEnquiry);
router.post("/hotelData", submitHotelData);

export default router;
