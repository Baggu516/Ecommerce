const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// ============ Middleware ============
app.use(cors({
  origin: 'http://localhost:3000', // Limit to your frontend during dev
  credentials: true,
}));
app.use(express.json()); // Parses incoming JSON requests

// ============ MongoDB Connection ============
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1); // Exit process if DB fails to connect
});

// ============ Routes ============
app.use('/api/users', userRoutes);       // User management (profile, update)
app.use('/api/auth', authRoutes);        // Login/Signup
app.use('/api/products', productRoutes); // Product CRUD
app.use('/api/orders', orderRoutes);     // Order placement and listing

// Root route for test
app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// ============ Global Error Handler ============
app.use((err, req, res, next) => {
  console.error('❌ Uncaught Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// ============ Start Server ============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
