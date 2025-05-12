const express = require('express');
const router = express.Router();
const { getPetsByOwner, createPet } = require('../controllers/petController');

router.get('/owner/:ownerId', getPetsByOwner);
router.post('/', createPet);
router.get('/:petId', getPetById);

module.exports = router;