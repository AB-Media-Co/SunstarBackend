import Venue from "../models/Venue.js";

/**
 * @desc   Create venue
 * @route  POST /api/venues
 * @access Public (secure later if needed)
 */
export const createVenue = (async (req, res) => {
  const {
    name,
    image,
    rating = 0,
    pricePerPlate,
    capacityMin,
    capacityMax,
    location,
    description,
    isActive = true,
  } = req.body;

  const venue = await Venue.create({
    name,
    image,
    rating,
    pricePerPlate,
    capacityMin,
    capacityMax,
    location,
    description,
    isActive,
  });

  res.status(201).json({ success: true, data: venue });
});

/**
 * @desc   Get all venues (with filters, pagination, sorting)
 * @route  GET /api/venues
 * @access Public
 * Query params:
 *  - page, limit
 *  - minPrice, maxPrice
 *  - minCapacity, maxCapacity
 *  - minRating
 *  - search (name/location text)
 *  - sort (e.g. "-pricePerPlate" or "rating")
 */
export const getVenues = (async (req, res) => {
  const {
    page = 1,
    limit = 10,
    minPrice,
    maxPrice,
    minCapacity,
    maxCapacity,
    minRating,
    search,
    sort,
    isActive,
  } = req.query;

  const filter = {};

  if (typeof isActive !== "undefined") {
    filter.isActive = isActive === "true";
  }

  if (minRating) filter.rating = { ...(filter.rating || {}), $gte: Number(minRating) };

  // price filter
  if (minPrice) filter.pricePerPlate = { ...(filter.pricePerPlate || {}), $gte: Number(minPrice) };
  if (maxPrice) filter.pricePerPlate = { ...(filter.pricePerPlate || {}), $lte: Number(maxPrice) };

  // capacity range: match venues whose [min,max] overlaps requested range
  // If user passes minCapacity/maxCapacity, we’ll ensure venue can host within that band.
  if (minCapacity) filter.capacityMax = { ...(filter.capacityMax || {}), $gte: Number(minCapacity) };
  if (maxCapacity) filter.capacityMin = { ...(filter.capacityMin || {}), $lte: Number(maxCapacity) };

  // text search on name/location
  let query = Venue.find(filter);
  if (search) {
    query = query.find({ $text: { $search: search } });
  }

  // sorting
  if (sort) {
    query = query.sort(sort); // e.g. "-pricePerPlate" or "rating"
  } else {
    query = query.sort("-createdAt");
  }

  const pageNum = Number(page);
  const limitNum = Math.min(Number(limit), 100);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    query.skip(skip).limit(limitNum),
    Venue.countDocuments(search ? { ...filter, $text: { $search: search } } : filter),
  ]);

  res.json({
    success: true,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    data: items,
  });
});

/**
 * @desc   Get single venue
 * @route  GET /api/venues/:id
 * @access Public
 */
export const getVenueById = (async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    return res.status(404).json({ success: false, message: "Venue not found" });
  }
  res.json({ success: true, data: venue });
});

/**
 * @desc   Update venue
 * @route  PUT /api/venues/:id
 * @access Public (secure later)
 */
export const updateVenue = (async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    return res.status(404).json({ success: false, message: "Venue not found" });
  }

  const updatable = [
    "name",
    "image",
    "rating",
    "pricePerPlate",
    "capacityMin",
    "capacityMax",
    "location",
    "description",
    "isActive",
  ];

  updatable.forEach((key) => {
    if (req.body[key] !== undefined) venue[key] = req.body[key];
  });

  await venue.save();
  res.json({ success: true, data: venue });
});

/**
 * @desc   Delete venue
 * @route  DELETE /api/venues/:id
 * @access Public (secure later)
 */
export const deleteVenue = (async (req, res) => {
  const venue = await Venue.findById(req.params.id);
  if (!venue) {
    return res.status(404).json({ success: false, message: "Venue not found" });
  }
  await venue.deleteOne();
  res.json({ success: true, message: "Venue deleted" });
});
