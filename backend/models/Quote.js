const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
    required: true,
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

module.exports = mongoose.model('Quote', quoteSchema);
