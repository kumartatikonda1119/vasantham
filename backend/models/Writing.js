const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    default: 'రచనలు',
  },
  author: {
    type: String,
    default: 'Geeta Vasanta Laxmi (వసంతం)',
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
  },
}, { timestamps: true });

module.exports = mongoose.model('Writing', writingSchema);
