import venuesModalLocation from '../models/venuesModalLocation.js';

function buildFilter(q) {
  const filter = {};
  if (q?.search) {
    filter.$or = [
      { name: { $regex: q.search, $options: 'i' } },
      { 'address.city': { $regex: q.search, $options: 'i' } },
      { 'address.area': { $regex: q.search, $options: 'i' } }
    ];
  }
  if (q?.active !== undefined) filter.isActive = q.active === 'true';
  return filter;
}

export const createVenueLocation = async (req, res, next) => {
  try {
    const location = await venuesModalLocation.create(req.body);
    res.status(201).json(location);
  } catch (err) { next(err); }
};

export const getVenueLocations = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '20', 10), 1), 100);
    const filter = buildFilter(req.query);

    const [items, total] = await Promise.all([
      venuesModalLocation.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      venuesModalLocation.countDocuments(filter)
    ]);

    res.json({ items, page, limit, total, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

export const getVenueLocationByIdOrSlug = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const query = /^[0-9a-fA-F]{24}$/.test(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
    const location = await venuesModalLocation.findOne(query);
    if (!location) return res.status(404).json({ message: 'Venue location not found' });
    res.json(location);
  } catch (err) { next(err); }
};

export const updateVenueLocation = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    console.log(req.params)
    const query = /^[0-9a-fA-F]{24}$/.test(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
    const location = await venuesModalLocation.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
    if (!location) return res.status(404).json({ message: 'Venue location not found' });
    res.json(location);
  } catch (err) { next(err); }
};

export const deleteVenueLocation = async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const query = /^[0-9a-fA-F]{24}$/.test(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
    const location = await venuesModalLocation.findOneAndDelete(query);
    if (!location) return res.status(404).json({ message: 'Venue location not found' });
    res.json({ message: 'Venue location deleted' });
  } catch (err) { next(err); }
};
