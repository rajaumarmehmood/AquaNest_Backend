const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Local development
    'http://localhost:3001', // Alternative local port
    'https://aqua-nest-frontend-latest.vercel.app', // Production frontend
    'https://aquanest-frontend-git-main-rajaumarmehmood.vercel.app', // Vercel preview
    'https://aquanest-frontend-git-develop-rajaumarmehmood.vercel.app' // Vercel develop branch
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));
app.use(express.json());

// Basic root route
app.get('/', (req, res) => {
  res.send('AquaNest API is running');
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://i222617:o7J9tY8Oc3VJIp9r@cluster0.gzgvcne.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api', require('../routes/index.js'));

module.exports = app;
