const ShortURL = require('../models/ShortURL');
const generateCode = require('../utils/codeGenerator');
const axios = require('axios');

const BASE_URL = 'http://localhost:8000'; 
const LOGGING_URL = 'http://20.244.56.144/evaluation-service/logs';

const log = async (stack, level, pkg, message) => {
  try {
    await axios.post(LOGGING_URL, {
      stack,
      level,
      package: pkg,
      message
    });
  } catch (err) {
    console.error('Log failed:', err.response?.data || err.message);
  }
};

// Create Short URL
exports.createShortURL = async (req, res) => {
  const { url, validity, shortcode } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    let code = shortcode || generateCode();
    let existing = await ShortURL.findOne({ shortcode: code });
    if (existing) return res.status(409).json({ error: 'Shortcode already taken' });

    const expiryDate = new Date(Date.now() + (validity || 30) * 60000);
    const newShort = await ShortURL.create({
      originalURL: url,
      shortcode: code,
      expiry: expiryDate
    });

    await log('backend', 'info', 'controller', `Short URL created: ${code}`);

    res.status(201).json({
      shortLink: `${BASE_URL}/${code}`,
      expiry: expiryDate.toISOString()
    });
  } catch (err) {
    await log('backend', 'error', 'controller', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get URL Stats
exports.getStats = async (req, res) => {
  const { code } = req.params;

  try {
    const doc = await ShortURL.findOne({ shortcode: code });
    if (!doc) return res.status(404).json({ error: 'Shortcode not found' });

    res.status(200).json({
      originalURL: doc.originalURL,
      createdAt: doc.createdAt,
      expiry: doc.expiry,
      totalClicks: doc.clicks.length,
      clicks: doc.clicks
    });
  } catch (err) {
    await log('backend', 'error', 'controller', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
