const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  location: String
});

const shortURLSchema = new mongoose.Schema({
  originalURL: { type: String, required: true },
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date },
  clicks: [clickSchema]
});

module.exports = mongoose.model('ShortURL', shortURLSchema);
