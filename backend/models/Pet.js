const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date },
  type: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);