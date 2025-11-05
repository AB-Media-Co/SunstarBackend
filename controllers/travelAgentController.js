
// =============================
// controllers/travelAgentController.js (unified cards)
// =============================
import { TravelAgentPage } from '../models/TravelAgentPage.js';

const SECTION_KEYS = {
  partner: 'partnerWithUs',
  partners: 'partnerWithUs',
  'partner-with-us': 'partnerWithUs',
  howitworks: 'howItWorks',
  'how-it-works': 'howItWorks',
};

const resolveSection = (raw) => {
  const key = String(raw || '').toLowerCase();
  const mapped = SECTION_KEYS[key];
  if (!mapped) throw new Error('Invalid section. Use "partner" or "howitworks".');
  return mapped;
};

const getOrCreate = async () => {
  let doc = await TravelAgentPage.findOne();
  if (!doc) doc = await TravelAgentPage.create({});
  return doc;
};

// Public
export const getTAPage = async (_req, res) => {
  try { const doc = await getOrCreate(); res.json(doc); } catch (e) { res.status(500).json({ message: e.message }); }
};

// Admin bulk upsert
export const upsertTAPage = async (req, res) => {
  try { const doc = await getOrCreate(); const allow = ['hero', 'partnerWithUs', 'howItWorks']; for (const k of allow) if (req.body?.[k] !== undefined) doc.set(k, req.body[k]); await doc.save(); res.json(doc); } catch (e) { res.status(400).json({ message: e.message }); }
};

export const patchTAHero = async (req, res) => {
  try { const d = await getOrCreate(); const { heading, description } = req.body || {}; if (heading!==undefined) d.hero.heading = heading; if (description!==undefined) d.hero.description = description; await d.save(); res.json(d.hero); } catch (e) { res.status(400).json({ message: e.message }); }
};

// ===== Unified Cards =====
// GET list by section (optional public)
export const getCards = async (req, res) => {
  try { const section = resolveSection(req.query.section); const d = await getOrCreate(); res.json(d[section].cards); } catch (e) { res.status(400).json({ message: e.message }); }
};

// Add ONE card (admin)
export const addCard = async (req, res) => {
  try {
    const section = resolveSection(req.body?.section);
    const { title, description, icon } = req.body || {};
    if (!title || !description) return res.status(400).json({ message: 'title & description required' });
    const d = await getOrCreate();
    d[section].cards.push({ title, description, ...(icon ? { icon } : {}) });
    await d.save();
    res.status(201).json(d[section].cards.at(-1));
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// Add MANY cards (admin)
export const addCardsBulk = async (req, res) => {
  try {
    const section = resolveSection(req.body?.section);
    const { cards } = req.body || {};
    if (!Array.isArray(cards) || cards.length === 0) return res.status(400).json({ message: 'cards[] required' });
    const d = await getOrCreate();
    cards.forEach((c) => { if (c?.title && c?.description) d[section].cards.push({ title: c.title, description: c.description, ...(c.icon ? { icon: c.icon } : {}) }); });
    await d.save();
    res.json(d[section].cards);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// Update ONE card (admin)
export const updateCard = async (req, res) => {
  try {
    const section = resolveSection(req.params.section);
    const { cardId } = req.params;
    const { title, description, icon } = req.body || {};
    const d = await getOrCreate();
    const card = d[section].cards.id(cardId);
    if (!card) return res.status(404).json({ message: 'Card not found' });
    if (title !== undefined) card.title = title;
    if (description !== undefined) card.description = description;
    if (icon !== undefined) card.icon = icon;
    await d.save();
    res.json(card);
  } catch (e) { res.status(400).json({ message: e.message }); }
};

// Delete ONE card (admin)
export const deleteCard = async (req, res) => {
  try {
    const section = resolveSection(req.params.section);
    const { cardId } = req.params;
    const d = await getOrCreate();
    const card = d[section].cards.id(cardId);
    if (!card) return res.status(404).json({ message: 'Card not found' });
    card.deleteOne();
    await d.save();
    res.json({ success: true });
  } catch (e) { res.status(400).json({ message: e.message }); }
};

