// backend/models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false },
  serviceName: String,
  flavorName: String,
  qty: { type: Number, default: 1 },
  price: Number
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: String,
  address: String,
  message: String,
  items: [OrderItemSchema],
  totalPrice: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
