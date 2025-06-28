const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { userId, name, phone, address, items, total } = req.body;

    console.log('🟡 Incoming Order Payload:', req.body); // Helpful for debugging

    // Validate required fields with custom messages
    if (!userId) return res.status(400).json({ error: 'User ID is required' });
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });
    if (!address) return res.status(400).json({ error: 'Address is required' });
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total must be greater than 0' });
    }

    // Create and save the order
    const order = new Order({
      userId,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      total
    });

    await order.save();

    console.log('✅ Order Saved:', order._id);
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('❌ Order save error:', err.message);
    res.status(500).json({ error: 'Server error while placing order' });
  }
});

module.exports = router;
