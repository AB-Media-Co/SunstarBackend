import Testimonial from "../models/Testimonial.js";

export const bulkCreateTestimonials = async (req, res) => {
  try {
    const testimonials = req.body;
    if (!Array.isArray(testimonials) || testimonials.length === 0) {
      return res
        .status(400)
        .json({ message: 'Request body must be a non-empty array of testimonials.' });
    }
    // Each item should have: name, location, heading, description, page
    const inserted = await Testimonial.insertMany(testimonials);
    return res.status(201).json(inserted);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Error bulk creating testimonials.' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, location, heading, description, page } = req.body;
    const newTestimonial = new Testimonial({ name, location, heading, description, page });
    const saved = await newTestimonial.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating testimonial.' });
  }
};

// Read (with optional page filter)
export const getTestimonials = async (req, res) => {
  try {
    // page comes from ?page=YourPageName
    const { page } = req.query;
    const filter = page !== undefined ? { page } : {};
    const list = await Testimonial.find(filter)
      .sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching testimonials.' });
  }
};

// Update
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await Testimonial.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating testimonial.' });
  }
};

// Delete
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting testimonial.' });
  }
};
