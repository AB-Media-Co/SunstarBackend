// controllers/loyaltyProgramController.js

import LoyaltyProgram from "../models/loyaltyProgram.js";

const PAGE_SLUG = 'loyalty-program';

export const getLoyalty = async (req, res) => {
  try {
    const page = await LoyaltyProgram.findOne({ slug: PAGE_SLUG }).lean();
    if (!page) return res.status(200).json(null); // frontend expects null if not present
    return res.json(page);
  } catch (err) {
    console.error('getLoyalty error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const upsertLoyalty = async (req, res) => {
  try {
    const payload = req.body || {};
    payload.slug = PAGE_SLUG; // enforce slug
    const page = await LoyaltyProgram.findOneAndUpdate(
      { slug: PAGE_SLUG },
      { $set: payload },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return res.json(page);
  } catch (err) {
    console.error('upsertLoyalty error', err);
    return res.status(500).json({ message: err.message });
  }
};

export const addTier = async (req, res) => {
  try {
    const tier = req.body;
    if (!tier || typeof tier.level === 'undefined') return res.status(400).json({ message: 'Invalid tier' });
    const page = await LoyaltyProgram.findOneAndUpdate(
      { slug: PAGE_SLUG },
      { $push: { tiers: tier } },
      { new: true, upsert: true }
    ).lean();
    return res.json(page);
  } catch (err) {
    console.error('addTier error', err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateTierByLevel = async (req, res) => {
  try {
    const level = Number(req.params.level);
    const updates = req.body || {};
    const pageDoc = await LoyaltyProgram.findOne({ slug: PAGE_SLUG });
    if (!pageDoc) return res.status(404).json({ message: 'Program not found' });

    const idx = pageDoc.tiers.findIndex(t => Number(t.level) === level);
    if (idx === -1) return res.status(404).json({ message: 'Tier not found' });

    pageDoc.tiers[idx] = { ...pageDoc.tiers[idx].toObject(), ...updates };
    await pageDoc.save();
    return res.json(pageDoc.toObject());
  } catch (err) {
    console.error('updateTierByLevel error', err);
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTierByLevel = async (req, res) => {
  try {
    const level = Number(req.params.level);
    const page = await LoyaltyProgram.findOneAndUpdate(
      { slug: PAGE_SLUG },
      { $pull: { tiers: { level } } },
      { new: true }
    ).lean();
    if (!page) return res.status(404).json({ message: 'Program not found' });
    return res.json(page);
  } catch (err) {
    console.error('deleteTierByLevel error', err);
    return res.status(500).json({ message: err.message });
  }
};

export const seedLoyalty = async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') return res.status(400).json({ message: 'Invalid seed payload' });
    data.slug = PAGE_SLUG;
    const page = await LoyaltyProgram.findOneAndUpdate(
      { slug: PAGE_SLUG },
      data,
      { upsert: true, new: true, runValidators: true }
    ).lean();
    return res.json(page);
  } catch (err) {
    console.error('seedLoyalty error', err);
    return res.status(500).json({ message: err.message });
  }
};
