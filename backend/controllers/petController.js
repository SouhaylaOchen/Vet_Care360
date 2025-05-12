const Pet = require('../models/Pet');

// Get all pets for one owner
exports.getPetsByOwner = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.params.ownerId });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new pet
exports.createPet = async (req, res) => {
  try {
    const pet = new Pet(req.body);
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};