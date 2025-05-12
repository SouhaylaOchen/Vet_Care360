const Visit = require('../models/Visit');

// Get visits for one pet
exports.getVisitsByPet = async (req, res) => {
  try {
    const visits = await Visit.find({ pet: req.params.petId });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new visit
exports.createVisit = async (req, res) => {
  try {
    const visit = new Visit(req.body);
    const savedVisit = await visit.save();
    res.status(201).json(savedVisit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};