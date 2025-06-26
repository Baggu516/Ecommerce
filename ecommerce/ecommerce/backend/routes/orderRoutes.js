// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ PLACE AN ORDER
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ GET ORDERS BY USER ID
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await Order.find({ userId }).populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
});

router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('productId', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
