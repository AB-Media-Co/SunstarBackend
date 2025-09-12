// controllers/partner.controller.js
import Partner from '../models/PartnerSchema.js';

export const createPartner = async (req, res) => {
  try {
    const { imageUrl, description } = req.body; // you provide imageUrl
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl is required' });
    if (!description) return res.status(400).json({ message: 'description is required' });

    const partner = await Partner.create({ imageUrl, description });
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listPartners = async (_req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;
    const updates = {};
    if (typeof imageUrl === 'string' && imageUrl.trim()) updates.imageUrl = imageUrl.trim();
    if (typeof description === 'string' && description.trim()) updates.description = description.trim();

    const partner = await Partner.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json({ message: 'Partner deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
