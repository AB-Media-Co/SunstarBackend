// /controllers/faqController.js
import FAQ from '../models/faqModel.js';




export const addMultipleFAQs = async (req, res) => {
    try {
      const faqs = req.body;
  
      // Ensure that each FAQ has the required fields
      const isValid = faqs.every(faq => faq.page && faq.question && faq.answer);
      if (!isValid) {
        return res.status(400).json({ message: "Each FAQ must have a page, question, and answer" });
      }
  
      const result = await FAQ.insertMany(faqs);
      res.status(201).json({ message: "Multiple FAQs added successfully", result });
    } catch (error) {
      res.status(500).json({ message: "Error adding multiple FAQs: " + error.message });
    }
  };

// Add a new FAQ
export const addFAQ = async (req, res) => {
  try {
    const { page, question, answer } = req.body;

    const newFAQ = new FAQ({
      page,
      question,
      answer,
    });

    await newFAQ.save();
    res.status(201).json({ message: 'FAQ added successfully', newFAQ });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFAQ = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });

    if (!updatedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ updated successfully', updatedFAQ });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get FAQs by page
export const getFAQsByPage = async (req, res) => {
  try {
    const { page } = req.params;

    const faqs = await FAQ.find({ page });

    if (faqs.length === 0) {
      return res.status(404).json({ message: 'No FAQs found for this page' });
    }

    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
