import mongoose from "mongoose";

// single, fixed-id document (no scopeId)
const OwnersStatsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "global" }, // fixed key
    approvedCount: { type: Number, default: 0, min: 0 },
    rejectedCount: { type: Number, default: 0, min: 0 },
    revivedCount:  { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("OwnersStats", OwnersStatsSchema);
