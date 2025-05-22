import express from 'express';
import {
  createPackage,
  getAllPackages,
  getPackagesByState,
  getPackageById,
  updatePackage,
  deletePackage,
  getTopSellingPackages,
  getStatesWithPackagesSummary,
  deleteState,
  updateState,
} from '../controllers/packageController.js';

import State from '../models/State.js'; // Add this line

const router = express.Router();


// Create a new state
router.post('/states', async (req, res) => {
  try {
    const { name, image } = req.body;
    const state = new State({ name, image });
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all states
router.get('/states', async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a state
router.put('/states/:id', updateState);

// Delete a state
router.delete('/states/:id', deleteState);

// Get summary of states (image + lowest price)
router.get('/states/summary', getStatesWithPackagesSummary);


// ------- PACKAGE ROUTES -------- //

router.post('/packages', createPackage);
router.get('/packages', getAllPackages);
router.get('/packages/top-selling', getTopSellingPackages);
router.get('/packages/state/:state', getPackagesByState);
router.get('/packages/:id', getPackageById);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

export default router;
