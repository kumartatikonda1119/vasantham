const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protectAdmin } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET || 'vasantham_secret_key_2026',
        { expiresIn: '7d' }
      );

      res.json({
        _id: admin._id,
        username: admin.username,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Verify current admin token
router.get('/me', protectAdmin, async (req, res) => {
  res.json(req.admin);
});

module.exports = router;
