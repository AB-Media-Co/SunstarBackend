// controllers/packageController.js
import TravelPackage from '../models/Package.js';
import State from '../models/State.js';



export const getStatesWithPackagesSummary = async (req, res) => {
  try {
    const states = await State.find();
    const result = [];

    for (const state of states) {
      const packages = await TravelPackage.find({ stateId: state._id }).sort({ price: 1 });

      if (packages.length > 0) {
        result.push({
          _id: state._id,
          name: state.name,
          image: state.image,
          lowestPrice: packages[0].price
        });
      }
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Update State
export const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const { name, image } = req.body;
    const updated = await State.findByIdAndUpdate(id, { name, image }, { new: true });
    if (!updated) return res.status(404).json({ message: 'State not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete State
export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await State.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'State not found' });
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createPackage = async (req, res) => {
  try {
    const newPackage = new TravelPackage(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPackages = async (req, res) => {
  try {
    const packages = await TravelPackage.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPackagesByState = async (req, res) => {
  try {
    // Step 1: Get state name from params
    const stateName = req.params.state;

    // Step 2: Find the State document by name
    const stateDoc = await State.findOne({ name: stateName });
    if (!stateDoc) return res.status(404).json({ message: "State not found" });

    // Step 3: Find packages by stateId
    const packages = await TravelPackage.find({ stateId: stateDoc._id });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPackageById = async (req, res) => {
  try {
    const pkg = await TravelPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePackage = async (req, res) => {
  try {
    const updated = await TravelPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Package not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const deleted = await TravelPackage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopSellingPackages = async (req, res) => {
  try {
    const topPackages = await TravelPackage.find({ topSelling: true });
    res.status(200).json(topPackages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
