// backend/models/Service.js
const mongoose = require('mongoose');

const FlavorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: String,
  img: String
});

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: String,
  desc: String,
  img: String,         // main image URL
  price: Number,       // fallback price if no flavors
  flavors: [FlavorSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
