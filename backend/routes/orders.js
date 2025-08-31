// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Service = require('../models/Service');
const mongoose = require('mongoose');

// POST /api/orders  - create a new order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, address, message, items, totalPrice } = req.body;

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    // Normalize items: try to attach service ObjectId if provided
    const processedItems = await Promise.all(items.map(async it => {
      // it.service can be serviceId or serviceName
      let serviceDoc = null;
      if (it.service && mongoose.Types.ObjectId.isValid(it.service)) {
        serviceDoc = await Service.findById(it.service);
      } else if (it.service) {
        serviceDoc = await Service.findOne({ name: it.service });
      }

      const price = (it.price != null)
        ? it.price
        : (it.flavorPrice != null ? it.flavorPrice
            : (serviceDoc && it.flavorName
               ? (serviceDoc.flavors.find(f => f.name === it.flavorName)?.price || serviceDoc.price || 0)
               : (serviceDoc?.price || 0)));

      return {
        service: serviceDoc ? serviceDoc._id : null,
        serviceName: serviceDoc ? serviceDoc.name : (it.serviceName || it.service || 'Unknown'),
        flavorName: it.flavorName || it.flavor || null,
        qty: it.qty || 1,
        price
      };
    }));

    const computedTotal = typeof totalPrice === 'number'
      ? totalPrice
      : processedItems.reduce((s, it) => s + (it.price * it.qty), 0);

    const order = new Order({
      customerName,
      customerEmail: customerEmail || '',
      address: address || '',
      message: message || '',
      items: processedItems,
      totalPrice: computedTotal
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Optional: GET /api/orders - list orders (admin / debugging)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
