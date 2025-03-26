import SeoMetaModel from "../models/SeoMetaModel.js";

// Create a new meta record
export const createMeta = async (req, res) => {
  try {
    const { page, metaTitle, metaDescription, metaKeywords } = req.body;
    const meta = new SeoMetaModel({
      page,
      metaTitle,
      metaDescription,
      metaKeywords
    });
    await meta.save();
    return res.status(201).json(meta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all meta records
export const getAllMeta = async (req, res) => {
  try {
    const metas = await SeoMetaModel.find();
    return res.json(metas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get meta record for a specific page (using page identifier)
export const getMetaByPage = async (req, res) => {
  try {
    const { page } = req.params;
    const meta = await SeoMetaModel.findOne({ page });
    if (!meta) {
      return res.status(404).json({ message: 'Meta info not found for the given page' });
    }
    return res.json(meta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update meta record (by document ID)
export const updateMeta = async (req, res) => {
  try {
    const { id } = req.params;
    const { metaTitle, metaDescription, metaKeywords } = req.body;

    const meta = await SeoMetaModel.findByIdAndUpdate(
      id,
      { metaTitle, metaDescription, metaKeywords },
      { new: true }
    );

    if (!meta) {
      return res.status(404).json({ message: 'Meta info not found' });
    }

    return res.json(meta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete meta record (by document ID)
export const deleteMeta = async (req, res) => {
  try {
    const { id } = req.params;
    const meta = await SeoMetaModel.findByIdAndDelete(id);

    if (!meta) {
      return res.status(404).json({ message: 'Meta info not found' });
    }

    return res.json({ message: 'Meta info deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
