const express = require('express');
const router = express.Router();
const { getVisitsByPet, createVisit } = require('../controllers/visitController');

router.get('/pet/:petId', getVisitsByPet);
router.post('/', createVisit);

module.exports = router;