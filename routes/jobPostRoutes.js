import express from "express";
import {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
  updateJobPost,
  deleteJobPost,
} from "../controllers/jobPostController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/create",protect, createJobPost);
router.get("/", getAllJobPosts);
router.get("/:id", getJobPostById);
router.put("/:id",protect, updateJobPost);
router.delete("/:id",protect, deleteJobPost);

export default router;
