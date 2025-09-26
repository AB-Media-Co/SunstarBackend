import { Policy } from "../models/Policy.js";

import sanitizeHtml from "sanitize-html";


export const normalizeText = (text = "") => {
    let t = String(text)
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, "  ")
        .trim();

    // Limit consecutive blank lines to 2
    t = t.replace(/\n{3,}/g, "\n\n");

    // Trim spaces around each line
    t = t
        .split("\n")
        .map((line) => line.replace(/[ \u00A0]+/g, " ").trimEnd())
        .join("\n");

    return t;
};


export const toHtml = (normalizedText) => {
    const paragraphs = normalizedText
        .split(/\n{2,}/)
        .map((p) => p.replace(/\n/g, "<br />"));

    const rawHtml = paragraphs.map((p) => `<p>${p}</p>`).join("\n");

    const clean = sanitizeHtml(rawHtml, {
        allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
        allowedAttributes: { a: ["href", "title", "target", "rel"] },
        transformTags: {
            a: (tagName, attribs) => ({
                tagName: "a",
                attribs: {
                    ...attribs,
                    rel: "noopener noreferrer",
                    target: "_blank"
                }
            })
        }
    });

    return clean;
};

/**
 * Simple Markdown:
 * - Double newline stays paragraph break
 * - Single newline becomes two spaces + newline (hard line break in MD)
 */
export const toMarkdown = (normalizedText) => {
    return normalizedText
        .split("\n\n")
        .map((para) => para.replace(/\n/g, "  \n"))
        .join("\n\n");
};

/**
 * Full formatting pipeline
 */
export const formatPolicyBody = (raw) => {
    const normalized = normalizeText(raw);
    return {
        normalized,
        html: toHtml(normalized),
        markdown: toMarkdown(normalized),
    };
};


const allowedTypes = new Set(["terms", "cancellation"]);

const ensureType = (req) => {
    const { type } = req.params;
    if (!allowedTypes.has(type)) {
        const err = new Error("Invalid policy type. Use 'terms' or 'cancellation'.");
        err.status = 400;
        throw err;
    }
    return type;
};

export const getPolicy = async (req, res, next) => {
    try {
        const type = ensureType(req);
        const policy = await Policy.findOne({ type });
        if (!policy) return res.status(404).json({ message: "Not found" });
        res.json(policy);
    } catch (e) { next(e); }
};

export const getHistory = async (req, res, next) => {
    try {
        const type = ensureType(req);
        const policy = await Policy.findOne({ type }, { revisions: 1, updatedAt: 1, title: 1, _id: 0 });
        if (!policy) return res.status(404).json({ message: "Not found" });
        res.json(policy.revisions.sort((a, b) => b.editedAt - a.editedAt));
    } catch (e) { next(e); }
};

export const upsertPolicy = async (req, res, next) => {
    try {
        const type = ensureType(req);
        const { title, body, note, editedBy } = req.body ?? {};
        if (!body || typeof body !== "string") {
            return res.status(400).json({ message: "Body (string) is required" });
        }

        const { normalized, html, markdown } = formatPolicyBody(body);

        // Upsert
        const existing = await Policy.findOne({ type });
        if (!existing) {
            const created = await Policy.create({
                type,
                title: title || (type === "terms" ? "Terms & Conditions" : "Cancellation Policy"),
                bodyRaw: normalized,
                bodyHtml: html,
                bodyMarkdown: markdown,
                revisions: [{ bodyRaw: normalized, bodyHtml: html, bodyMarkdown: markdown, note, editedBy }],
            });
            return res.status(201).json(created);
        } else {
            existing.revisions.unshift({
                bodyRaw: normalized,
                bodyHtml: html,
                bodyMarkdown: markdown,
                note,
                editedBy
            });
            if (title) existing.title = title;
            existing.bodyRaw = normalized;
            existing.bodyHtml = html;
            existing.bodyMarkdown = markdown;
            await existing.save();
            return res.json(existing);
        }
    } catch (e) { next(e); }
};
