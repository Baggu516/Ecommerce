import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("⚠️ Please login to place an order.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("📞 Please enter a valid 10-digit phone number.");
      return;
    }

    // ✅ Format cart items
    const orderItems = cart.map(item => ({
      productId: item._id || item.productId || '', // Ensure productId exists
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const payload = {
      userId: user._id,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: orderItems,
      total
    };

    console.log("📦 Sending Order Payload:", payload);

    try {
      const response = await axios.post('http://localhost:5000/api/orders', payload, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (response.status === 201 || response.status === 200) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate('/thankyou');
      } else {
        alert("❌ Order failed. Try again later.");
      }
    } catch (error) {
      console.error("❌ Order Error:", error.response?.data || error.message);
      alert(`❌ Server error: ${error.response?.data?.message || 'Unable to place order.'}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* ✅ Order Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone (10 digits)"
            className="border p-2 w-full rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Address"
            className="border p-2 w-full rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Place Order
          </button>
        </form>

        {/* ✅ Order Summary */}
        <div className="bg-white p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">🛍 Order Summary</h2>
          {cart.map((item, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity} × ₹{item.price}
              </p>
            </div>
          ))}
          <hr className="my-2" />
          <p className="mt-4 font-bold text-right">Total: ₹{total}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
