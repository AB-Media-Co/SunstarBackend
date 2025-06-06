// models/JobPost.js
import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  salary: { type: String },
  location: { type: String },
  workingHours: { type: String },
  jobType: { type: String, enum: ["Full-Time", "Part-Time", "Internship", "Contract"], required: true },
  description: { type: String },
  experienceRequired: { type: Boolean, default: false },
  experienceDetails: {
    type: String,
    required: function () {
      return this.experienceRequired;
    },
  },
  shift: { type: String, enum: ["Day", "Night", "Rotational"], default: "Day" },
}, { timestamps: true });

const JobPost = mongoose.model("JobPost", jobPostSchema);
export default JobPost;
