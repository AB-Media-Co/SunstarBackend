import JobPost from "../models/JobPost.js";

// Create
export const createJobPost = async (req, res) => {
  try {
    const {
      jobTitle, salary, location, workingHours,
      jobType, description, experienceRequired,
      experienceDetails, shift,
    } = req.body;

    if (experienceRequired && !experienceDetails) {
      return res.status(400).json({ message: "Experience details are required." });
    }

    const newJob = await JobPost.create({
      jobTitle,
      salary,
      location,
      workingHours,
      jobType,
      description,
      experienceRequired,
      experienceDetails,
      shift,
    });

    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All
export const getAllJobPosts = async (req, res) => {
  try {
    const jobs = await JobPost.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One
export const getJobPostById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
export const updateJobPost = async (req, res) => {
  try {
    const {
      jobTitle, salary, location, workingHours,
      jobType, description, experienceRequired,
      experienceDetails, shift,
    } = req.body;

    if (experienceRequired && !experienceDetails) {
      return res.status(400).json({ message: "Experience details are required." });
    }

    const updatedJob = await JobPost.findByIdAndUpdate(
      req.params.id,
      {
        jobTitle,
        salary,
        location,
        workingHours,
        jobType,
        description,
        experienceRequired,
        experienceDetails,
        shift,
      },
      { new: true }
    );

    if (!updatedJob) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
export const deleteJobPost = async (req, res) => {
  try {
    const job = await JobPost.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
