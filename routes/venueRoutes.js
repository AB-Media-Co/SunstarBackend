import express from "express";
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
} from "../controllers/venueController.js";

const router = express.Router();

router.route("/")
  .get(getVenues)
  .post(createVenue);

router.route("/:id")
  .get(getVenueById)
  .put(updateVenue)
  .delete(deleteVenue);

export default router;
