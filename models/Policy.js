import mongoose from "mongoose";

const RevisionSchema = new mongoose.Schema(
  {
    bodyRaw: { type: String, required: true },
    bodyHtml: { type: String, required: true },
    bodyMarkdown: { type: String, required: true },
    note: { type: String }, // optional: "fixed typos", etc.
    editedBy: { type: String }, // optional user id/email
  },
  { _id: false, timestamps: { createdAt: "editedAt", updatedAt: false } }
);

const PolicySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["terms", "cancellation"],
      required: true,
      index: true,
      unique: true,
    },
    title: { type: String, required: true },
    bodyRaw: { type: String, required: true },
    bodyHtml: { type: String, required: true },
    bodyMarkdown: { type: String, required: true },
    revisions: { type: [RevisionSchema], default: [] }
  },
  { timestamps: true }
);

export const Policy = mongoose.model("Policy", PolicySchema);
