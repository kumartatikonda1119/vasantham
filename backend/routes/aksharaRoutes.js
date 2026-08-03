const express = require('express');
const router = express.Router();
const AksharaArdham = require('../models/AksharaArdham');
const { protectAdmin } = require('../middleware/auth');

// @route   GET /api/akshara
// @desc    Get published Akshara Ardham entries
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { status: 'published' };
    const items = await AksharaArdham.find(filter).sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/akshara
// @desc    Create Akshara Ardham entry (Admin)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title, description, footerMessage, lines, status } = req.body;
    const item = new AksharaArdham({
      title,
      description,
      footerMessage,
      lines,
      status: status || 'published',
    });
    const created = await item.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/akshara/:id
// @desc    Update Akshara Ardham entry (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const item = await AksharaArdham.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (req.body.title !== undefined) item.title = req.body.title;
    if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.footerMessage !== undefined) item.footerMessage = req.body.footerMessage;
    if (req.body.lines !== undefined) item.lines = req.body.lines;
    if (req.body.status !== undefined) item.status = req.body.status;

    const updated = await item.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/akshara/:id
// @desc    Delete Akshara Ardham entry (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const item = await AksharaArdham.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    await item.deleteOne();
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
