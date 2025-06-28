const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// ✅ SIGNUP: POST /api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const newUser = new User({ name, email, password, role: 'user' });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
});

// ✅ LOGIN: POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  res.json(user);
});

// ✅ GET all users with their orders
// routes/userRoutes.js

// ✅ GET all users with their orders (SAFE version)
// router.get('/with-orders', async (req, res) => {
//   try {
//     const users = await User.find();

//     const usersWithOrders = await Promise.all(users.map(async (user) => {
//       const orders = await Order.find({ userId: user._id }).populate('productId');

//       return {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         image: user.image || "", // optional field for profile image
//         orders: orders.map(order => {
//           const product = order.productId;
//           return {
//             _id: order._id,
//             date: order.date,
//             product: product ? {
//               name: product.name,
//               image: product.image,
//               price: product.price,
//               rating: product.rating
//             } : {
//               name: 'Product deleted',
//               image: '',
//               price: 0,
//               rating: 0
//             }
//           };
//         })
//       };
//     }));

//     res.json(usersWithOrders);
//   } catch (err) {
//     console.error("Error in /with-orders:", err);
//     res.status(500).json({ message: 'Failed to fetch users with orders', error: err.message });
//   }
// });
router.get('/with-orders', async (req, res) => {
  try {
    const lstOfUser = await User.find({});

    const result = await Promise.all(
      lstOfUser.map(async (item) => {
        const orders = await Order.find({ userId: item?._id });

        // Flatten all products from multiple orders, assuming each order has an 'items' array
        const products = orders.flatMap(order => order.items);

        return {
          userName: item?.name,
          email:item?.email,
          role:item?.role,
          products: products
        };
      })
    );

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
