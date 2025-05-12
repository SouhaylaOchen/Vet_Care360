const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  telephone: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model('Owner', ownerSchema);