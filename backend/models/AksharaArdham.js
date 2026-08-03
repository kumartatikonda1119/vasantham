const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  letter: { type: String },
  text: { type: String, required: true }
}, { _id: false });

const aksharaArdhamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  footerMessage: {
    type: String,
  },
  lines: [lineSchema],
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  },
}, { timestamps: true });

module.exports = mongoose.model('AksharaArdham', aksharaArdhamSchema);
