const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const log = require('../logging-middleware/log'); // 👈 Add logging middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Log every request (Optional)
app.use(async (req, res, next) => {
  await log("backend", "info", "request", `${req.method} ${req.url}`);
  next();
});

app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('🚀 Connected to MongoDB');
  log("backend", "info", "startup", `Server started on port ${PORT}`); // Optional log
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection failed:', err.message));
