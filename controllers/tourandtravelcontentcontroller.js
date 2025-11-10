// src/controllers/tourandtravelcontentcontroller.js
import TourAndTravelContent from "../models/tourandtravelcontentmodal.js";

/**
 * Returns the single content document. If none exists returns 404.
 */
export async function getTourAndTravelContent(req, res) {
  try {
    const doc = await TourAndTravelContent.findOne().lean();
    if (!doc) return res.status(404).json({ message: "TourAndTravelContent not found" });
    return res.json(doc);
  } catch (err) {
    console.error("getTourAndTravelContent error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * Create or update the singleton content document.
 * Accepts body like:
 * {
 *   hero: { title: "...", desc: "..." },
 *   advantages: [
 *     { title: "...", desc: "...", types: [{title:"", desc:""}, ...] },
 *     ...
 *   ]
 * }
 *
 * If doc exists -> replace hero and advantages with provided values (upsert).
 */
export async function upsertTourAndTravelContent(req, res) {
  try {
    const payload = req.body;

    // basic validation
    if (!payload || !payload.hero || !payload.hero.title) {
      return res.status(400).json({ message: "hero.title is required" });
    }
    if (payload.advantages && !Array.isArray(payload.advantages)) {
      return res.status(400).json({ message: "advantages must be an array" });
    }

    // find existing
    let doc = await TourAndTravelContent.findOne();

    if (doc) {
      // Overwrite hero & advantages (simple replace). Could be made partial if desired.
      doc.hero = {
        title: payload.hero.title,
        desc: payload.hero.desc ?? ""
      };
      doc.advantages = Array.isArray(payload.advantages) ? payload.advantages.map(sec => ({
        title: sec.title,
        desc: sec.desc ?? "",
        types: Array.isArray(sec.types) ? sec.types.map(t => ({ title: t.title, desc: t.desc ?? "" })) : []
      })) : [];
      await doc.save();
      return res.json(doc);
    } else {
      // Create new
      const createPayload = {
        hero: {
          title: payload.hero.title,
          desc: payload.hero.desc ?? ""
        },
        advantages: Array.isArray(payload.advantages) ? payload.advantages.map(sec => ({
          title: sec.title,
          desc: sec.desc ?? "",
          types: Array.isArray(sec.types) ? sec.types.map(t => ({ title: t.title, desc: t.desc ?? "" })) : []
        })) : []
      };
      doc = await TourAndTravelContent.create(createPayload);
      return res.status(201).json(doc);
    }
  } catch (err) {
    console.error("upsertTourAndTravelContent error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * Optional: delete the singleton content document
 */
export async function deleteTourAndTravelContent(req, res) {
  try {
    const doc = await TourAndTravelContent.findOneAndDelete();
    if (!doc) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted", id: doc._id });
  } catch (err) {
    console.error("deleteTourAndTravelContent error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
