const express = require('express');
const router = express.Router();
const Poem = require('../models/Poem');
const { protectAdmin } = require('../middleware/auth');

// @route   GET /api/poems
// @desc    Get all published poems (or all poems if admin)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'published' };
    const poems = await Poem.find(filter).sort({ createdAt: -1 });
    res.json(poems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/poems/:id
// @desc    Get poem by ID
router.get('/:id', async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });
    res.json(poem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/poems
// @desc    Create new poem (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, content, category, author, status } = req.body;
    const poem = new Poem({
      title,
      content,
      category: category || 'కవితలు',
      author: author || 'Geeta Vasanta Laxmi (వసంతం)',
      status: status || 'published',
    });
    const createdPoem = await poem.save();
    res.status(201).json(createdPoem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/poems/:id
// @desc    Update poem (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });

    poem.title = req.body.title || poem.title;
    poem.content = req.body.content || poem.content;
    poem.category = req.body.category || poem.category;
    poem.author = req.body.author || poem.author;
    poem.status = req.body.status || poem.status;

    const updatedPoem = await poem.save();
    res.json(updatedPoem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/poems/:id
// @desc    Delete poem (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.id);
    if (!poem) return res.status(404).json({ message: 'Poem not found' });
    await poem.deleteOne();
    res.json({ message: 'Poem removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
