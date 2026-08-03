const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const poemRoutes = require('./routes/poemRoutes');
const writingRoutes = require('./routes/writingRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const aksharaRoutes = require('./routes/aksharaRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://vasantham.onrender.com',
  'https://vasanthambackend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/writings', writingRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/akshara', aksharaRoutes);

// Root test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Vasantham Telugu Literary Platform API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Vasantham Backend Server running on port ${PORT}`);
});
