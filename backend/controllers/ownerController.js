const Owner = require('../models/Owner');

// Get all owners
exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get owner by ID
exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new owner
exports.createOwner = async (req, res) => {
  try {
    const newOwner = new Owner(req.body);
    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update owner
exports.updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOwner) return res.status(404).json({ message: 'Owner not found' });
    res.json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete owner
exports.deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner) return res.status(404).json({ message: 'Owner not found' });
    res.json({ message: 'Owner deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Pet = require('../models/Pet');
const Visit = require('../models/Visit');

// Get full owner data: owner + pets + visits
exports.getFullOwnerDetails = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    // Get pets
    const pets = await Pet.find({ owner: owner._id });

    // Get visits for each pet
    const petsWithVisits = await Promise.all(pets.map(async (pet) => {
      const visits = await Visit.find({ pet: pet._id });
      return {
        ...pet._doc,
        visits: visits
      };
    }));

    res.json({
      ...owner._doc,
      pets: petsWithVisits
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
