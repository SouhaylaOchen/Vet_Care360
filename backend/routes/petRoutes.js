const express = require('express');
const router = express.Router();

const {
  getPetById,
  getPetsByOwner,
  createPet,
  updatePet,
  deletePet,
} = require('../controllers/petController');

router.get('/owner/:ownerId', getPetsByOwner);
router.get('/:petId', getPetById);
router.post('/', createPet);
router.put('/:petId', updatePet);
router.delete('/:petId', deletePet);

module.exports = router;