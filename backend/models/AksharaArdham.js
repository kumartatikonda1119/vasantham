const mongoose = require('mongoose');

const aksharaArdhamSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: true,
    trim: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  },
}, { timestamps: true });

module.exports = mongoose.model('AksharaArdham', aksharaArdhamSchema);
