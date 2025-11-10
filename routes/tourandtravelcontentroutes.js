// src/routes/tourandtravelcontentroutes.js
import express from "express";
import {
  getTourAndTravelContent,
  upsertTourAndTravelContent,
  deleteTourAndTravelContent
} from "../controllers/tourandtravelcontentcontroller.js";

const router = express.Router();

// GET the full content (hero + advantages)
router.get("/", getTourAndTravelContent);

// POST/PUT to create or update the singleton content
router.put("/", upsertTourAndTravelContent);
router.post("/", upsertTourAndTravelContent);

// Optional: delete
router.delete("/", deleteTourAndTravelContent);

export default router;
