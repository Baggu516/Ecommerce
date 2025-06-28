const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ Place a new order
router.post('/', async (req, res) => {
  try {
    const { userId, name, phone, address, items, total } = req.body;

    // ✅ Validate required fields
    if (!userId || !name || !phone || !address || !items || items.length === 0 || total === undefined) {
      return res.status(400).json({ message: 'Missing required fields in order.' });
    }

    // ✅ Debug log
    console.log('🛒 Incoming Order:', req.body);

    const newOrder = new Order({
      userId,
      name,
      phone,
      address,
      items,
      total
    });

    await newOrder.save();

    res.status(201).json({ message: '✅ Order placed successfully!' });
  } catch (error) {
    console.error('❌ Order placement failed:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
