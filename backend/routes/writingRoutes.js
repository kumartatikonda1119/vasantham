const express = require('express');
const router = express.Router();
const Writing = require('../models/Writing');
const { protectAdmin } = require('../middleware/auth');

// @route   GET /api/writings
// @desc    Get all published writings (or all if admin)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'published' };
    const writings = await Writing.find(filter).sort({ createdAt: -1 });
    res.json(writings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/writings/:id
// @desc    Get writing by ID
router.get('/:id', async (req, res) => {
  try {
    const writing = await Writing.findById(req.params.id);
    if (!writing) return res.status(404).json({ message: 'Writing not found' });
    res.json(writing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/writings
// @desc    Create new writing (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, content, category, author, status } = req.body;
    const writing = new Writing({
      title,
      content,
      category: category || 'రచనలు',
      author: author || 'Geeta Vasanta Laxmi (వసంతం)',
      status: status || 'published',
    });
    const createdWriting = await writing.save();
    res.status(201).json(createdWriting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/writings/:id
// @desc    Update writing (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const writing = await Writing.findById(req.params.id);
    if (!writing) return res.status(404).json({ message: 'Writing not found' });

    writing.title = req.body.title || writing.title;
    writing.content = req.body.content || writing.content;
    writing.category = req.body.category || writing.category;
    writing.author = req.body.author || writing.author;
    writing.status = req.body.status || writing.status;

    const updatedWriting = await writing.save();
    res.json(updatedWriting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/writings/:id
// @desc    Delete writing (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const writing = await Writing.findById(req.params.id);
    if (!writing) return res.status(404).json({ message: 'Writing not found' });
    await writing.deleteOne();
    res.json({ message: 'Writing removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
