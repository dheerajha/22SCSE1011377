const log = require('../../logging-middleware/log'); // adjust path as needed
const express = require('express');
const router = express.Router();
const { createShortURL, getStats } = require('../controllers/urlController');

router.post('/shorturls', async (req, res) => {
  const { url, shortcode, validity } = req.body;

  try {
    if (!url || !shortcode) {
      await log("backend", "warn", "urlRoutes", "Missing URL or shortcode");
      return res.status(400).json({ error: "URL and shortcode required" });
    }

    const exists = await Url.findOne({ shortcode });
    if (exists) {
      await log("backend", "error", "urlRoutes", "Shortcode already exists");
      return res.status(409).json({ error: "Shortcode already taken" });
    }

    const newUrl = new Url({ originalUrl: url, shortcode, expiresIn: validity });
    await newUrl.save();

    await log("backend", "info", "urlRoutes", `Shortened URL created for ${url}`);
    res.status(201).json(newUrl);
  } catch (err) {
    await log("backend", "error", "urlRoutes", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/shorturls/:code', getStats);

module.exports = router;
