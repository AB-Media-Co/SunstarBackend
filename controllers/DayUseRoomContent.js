// controllers/dayUseController.js
import { DayUseRoomContent } from '../models/DayUseRoomContent.js';

const getOrCreate = async () => {
  let doc = await DayUseRoomContent.findOne();
  if (!doc) doc = await DayUseRoomContent.create({});
  return doc;
};

// Public
export const getPage = async (_req, res) => {
  try {
    const doc = await getOrCreate();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Bulk upsert (admin)
export const upsertPage = async (req, res) => {
  try {
    const allow = ['hero', 'descCard', 'benefits', 'tandc'];
    const doc = await getOrCreate();
    for (const k of allow) if (req.body?.[k] !== undefined) doc.set(k, req.body[k]);
    await doc.save();
    res.json(doc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* ---------- Section patches ---------- */
export const patchHero = async (req, res) => {
  try {
    const { heading, description } = req.body || {};
    const doc = await getOrCreate();
    if (heading !== undefined) doc.hero.heading = heading;
    if (description !== undefined) doc.hero.description = description;
    await doc.save();
    res.json(doc.hero);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const patchDescCard = async (req, res) => {
  try {
    const { heading, description } = req.body || {};
    const doc = await getOrCreate();
    if (heading !== undefined) doc.descCard.heading = heading;
    if (description !== undefined) doc.descCard.description = description;
    await doc.save();
    res.json(doc.descCard);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const setTermsPoints = async (req, res) => {
  try {
    const { points } = req.body || {};
    if (!Array.isArray(points))
      return res.status(400).json({ message: 'points must be an array of strings' });
    const doc = await getOrCreate();
    doc.tandc.points = points.map((p) => String(p));
    await doc.save();
    res.json(doc.tandc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* ---------- Benefits CRUD ---------- */
export const addBenefit = async (req, res) => {
  try {
    const { title } = req.body || {};
    if (!title) return res.status(400).json({ message: 'title required' });
    const doc = await getOrCreate();
    doc.benefits.push({ title });
    await doc.save();
    res.status(201).json(doc.benefits.at(-1));
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateBenefit = async (req, res) => {
  try {
    const { benefitId } = req.params;
    const { title } = req.body || {};
    const doc = await getOrCreate();
    const b = doc.benefits.id(benefitId);
    if (!b) return res.status(404).json({ message: 'Benefit not found' });
    if (title !== undefined) b.title = title;
    await doc.save();
    res.json(b);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteBenefit = async (req, res) => {
  try {
    const { benefitId } = req.params;
    const doc = await getOrCreate();
    const b = doc.benefits.id(benefitId);
    if (!b) return res.status(404).json({ message: 'Benefit not found' });
    b.deleteOne();
    await doc.save();
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
