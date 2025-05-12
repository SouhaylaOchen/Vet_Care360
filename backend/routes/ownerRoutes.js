const express = require('express');
const router = express.Router();
const {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner
} = require('../controllers/ownerController');
const { getFullOwnerDetails } = require('../controllers/ownerController');
// /api/owners
router.get('/', getOwners);
router.get('/:id', getOwnerById);
router.post('/', createOwner);
router.put('/:id', updateOwner);
router.delete('/:id', deleteOwner);
// Get full details of one owner including pets and visits
router.get('/:id/full', getFullOwnerDetails);
module.exports = router;