const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { protectAdmin } = require('../middleware/auth');

// @route   GET /api/quotes
// @desc    Get published quotes
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'published' };
    const quotes = await Quote.find(filter).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/quotes
// @desc    Create quote (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, content, author, status } = req.body;
    const quote = new Quote({
      title,
      content,
      author: author || 'Geeta Vasanta Laxmi (వసంతం)',
      status: status || 'published',
    });
    const createdQuote = await quote.save();
    res.status(201).json(createdQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/quotes/:id
// @desc    Update quote (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    if (req.body.title !== undefined) quote.title = req.body.title;
    if (req.body.content !== undefined) quote.content = req.body.content;
    if (req.body.author !== undefined) quote.author = req.body.author;
    if (req.body.status !== undefined) quote.status = req.body.status;

    const updatedQuote = await quote.save();
    res.json(updatedQuote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/quotes/:id
// @desc    Delete quote (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    await quote.deleteOne();
    res.json({ message: 'Quote removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
