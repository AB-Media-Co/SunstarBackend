import OwnersStats from "../models/DealStats.js";

const ID = "global";
const VALID = ["approved", "rejected", "revived"];
const fieldMap = {
  approved: "approvedCount",
  rejected: "rejectedCount",
  revived:  "revivedCount",
};

// GET /api/dev-owners-stats
export const getOwnersStats = async (_req, res) => {
  try {
    const doc = await OwnersStats.findById(ID).lean();
    return res.json({
      ok: true,
      data: doc ?? { _id: ID, approvedCount: 0, rejectedCount: 0, revivedCount: 0 },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, message:"Server error" });
  }
};

// PATCH /api/dev-owners-stats
// body: { approvedCount?, rejectedCount?, revivedCount? }
export const updateOwnersStats = async (req, res) => {
  try {
    const allowed = ["approvedCount", "rejectedCount", "revivedCount"];
    const update = Object.fromEntries(
      Object.entries(req.body || {}).filter(
        ([k, v]) => allowed.includes(k) && Number.isFinite(v)
      )
    );
    const doc = await OwnersStats.findByIdAndUpdate(
      ID,
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ ok: true, data: doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, message:"Server error" });
  }
};

// POST /api/dev-owners-stats/track
// body: { status: "approved" | "rejected" | "revived" }
export const trackOwnersStatus = async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!VALID.includes(status)) {
      return res
        .status(400)
        .json({ ok:false, message:`Invalid status. Allowed: ${VALID.join(", ")}` });
    }
    const doc = await OwnersStats.findByIdAndUpdate(
      ID,
      { $inc: { [fieldMap[status]]: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ ok: true, data: doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, message:"Server error" });
  }
};

// (Optional) POST /api/dev-owners-stats/reset
export const resetOwnersStats = async (_req, res) => {
  try {
    const doc = await OwnersStats.findByIdAndUpdate(
      ID,
      { $set: { approvedCount: 0, rejectedCount: 0, revivedCount: 0 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ ok:true, data: doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok:false, message:"Server error" });
  }
};
