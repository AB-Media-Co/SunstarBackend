import Policy from '../models/Policy.js';

export const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne({ type: req.params.type });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch policy.' });
  }
};

import sanitizeHtml from "sanitize-html";
export const updatePolicy = async (req, res) => {
  try {
    const { content } = req.body;
    const safeContent = sanitizeHtml(content, { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) });
    const policy = await Policy.findOneAndUpdate(
      { type: req.params.type },
      { content: safeContent, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(policy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update policy.' });
  }
};
