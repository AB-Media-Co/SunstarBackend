// ===== controllers/careerController.js (UPDATED) =====
import { CareerPage } from '../models/CareerPage.js';

const getOrCreate = async () => {
  let doc = await CareerPage.findOne();
  if (!doc) doc = await CareerPage.create({});
  return doc;
};

// Public
export const getPage = async (req, res) => {
  try { const doc = await getOrCreate(); res.json(doc); } catch (e) { res.status(500).json({ message: e.message }); }
};

// Upsert whole page
export const upsertPage = async (req, res) => {
  try {
    const payload = req.body || {};
    const doc = await getOrCreate();
    const allow = ['hero', 'benefits', 'joinTeam', 'readyToJoin', 'simpleCards'];
    for (const k of allow) if (payload[k] !== undefined) doc.set(k, payload[k]);
    await doc.save();
    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// Section patches
export const patchHero = async (req, res) => {
  try { const d = await getOrCreate(); const { heading, description } = req.body || {}; if (heading !== undefined) d.hero.heading = heading; if (description !== undefined) d.hero.description = description; await d.save(); res.json(d.hero); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const patchBenefitsMeta = async (req, res) => {
  try { const d = await getOrCreate(); const { heading, description } = req.body || {}; if (heading !== undefined) d.benefits.heading = heading; if (description !== undefined) d.benefits.description = description; await d.save(); res.json({ heading: d.benefits.heading, description: d.benefits.description }); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const patchJoinTeam = async (req, res) => {
  try { const d = await getOrCreate(); const { heading, description } = req.body || {}; if (heading !== undefined) d.joinTeam.heading = heading; if (description !== undefined) d.joinTeam.description = description; await d.save(); res.json(d.joinTeam); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const patchReadyToJoin = async (req, res) => {
  try { const d = await getOrCreate(); const { heading, description, email } = req.body || {}; if (heading !== undefined) d.readyToJoin.heading = heading; if (description !== undefined) d.readyToJoin.description = description; if (email !== undefined) d.readyToJoin.email = email; await d.save(); res.json(d.readyToJoin); } catch (e) { res.status(400).json({ message: e.message }); }
};

// Benefit cards CRUD + BULK
export const addBenefitCard = async (req, res) => {
  try {
    const { heading, description, icon } = req.body || {};
    if (!heading || !description) return res.status(400).json({ message: 'heading & description required' });
    const d = await getOrCreate();
    d.benefits.cards.push({ heading, description, ...(icon ? { icon } : {}) });
    await d.save();
    res.status(201).json(d.benefits.cards[d.benefits.cards.length - 1]);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

export const addBenefitCardsBulk = async (req, res) => {
  try {
    const { cards } = req.body || {};
    if (!Array.isArray(cards) || cards.length === 0) return res.status(400).json({ message: 'cards[] required' });
    const d = await getOrCreate();
    cards.forEach(c => { if (c?.heading && c?.description) d.benefits.cards.push({ heading: c.heading, description: c.description, ...(c.icon ? { icon: c.icon } : {}) }); });
    await d.save();
    res.json(d.benefits.cards);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

export const updateBenefitCard = async (req, res) => {
  try { const { cardId } = req.params; const { heading, description, icon } = req.body || {}; const d = await getOrCreate(); const card = d.benefits.cards.id(cardId); if (!card) return res.status(404).json({ message: 'Card not found' }); if (heading !== undefined) card.heading = heading; if (description !== undefined) card.description = description; if (icon !== undefined) card.icon = icon; await d.save(); res.json(card); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const deleteBenefitCard = async (req, res) => {
  try { const { cardId } = req.params; const d = await getOrCreate(); const card = d.benefits.cards.id(cardId); if (!card) return res.status(404).json({ message: 'Card not found' }); card.deleteOne(); await d.save(); res.json({ success: true }); } catch (e) { res.status(400).json({ message: e.message }); }
};

// Simple cards CRUD + BULK (title + description)
export const addSimpleCard = async (req, res) => {
  try { const { title, description, icon } = req.body || {}; if (!title || !description) return res.status(400).json({ message: 'title & description required' }); const d = await getOrCreate(); d.simpleCards.push({ title, description, ...(icon ? { icon } : {}) }); await d.save(); res.status(201).json(d.simpleCards[d.simpleCards.length - 1]); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const addSimpleCardsBulk = async (req, res) => {
  try { const { cards } = req.body || {}; if (!Array.isArray(cards) || cards.length === 0) return res.status(400).json({ message: 'cards[] required' }); const d = await getOrCreate(); cards.forEach(c => { if (c?.title && c?.description) d.simpleCards.push({ title: c.title, description: c.description, ...(c.icon ? { icon: c.icon } : {}) }); }); await d.save(); res.json(d.simpleCards); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const updateSimpleCard = async (req, res) => {
  try { const { cardId } = req.params; const { title, description, icon } = req.body || {}; const d = await getOrCreate(); const card = d.simpleCards.id(cardId); if (!card) return res.status(404).json({ message: 'Card not found' }); if (title !== undefined) card.title = title; if (description !== undefined) card.description = description; if (icon !== undefined) card.icon = icon; await d.save(); res.json(card); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const deleteSimpleCard = async (req, res) => {
  try { const { cardId } = req.params; const d = await getOrCreate(); const card = d.simpleCards.id(cardId); if (!card) return res.status(404).json({ message: 'Card not found' }); card.deleteOne(); await d.save(); res.json({ success: true }); } catch (e) { res.status(400).json({ message: e.message }); }
};


