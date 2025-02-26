import Location from '../models/Location.js';

export const createLocation = async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate('hotels');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('hotels');
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('hotels');
    if (!updatedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id);
    if (!deletedLocation) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
