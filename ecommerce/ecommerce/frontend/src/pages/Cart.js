import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    const updated = cartData.map(item => ({ ...item, quantity: item.quantity || 1 }));
    setCartItems(updated);
  }, []);

  const removeFromCart = (productId) => {
    const updated = cartItems.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (id, qty) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: parseInt(qty) } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const placeOrder = async (e, product) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user._id) {
      alert("You must be logged in to place an order.");
      return;
    }

    const { name, phone, address, date } = formData;
    if (!name || !phone || !address || !date) {
      alert("Please fill out all fields including date.");
      return;
    }

    const orderPayload = {
      userId: user._id,
      name,
      phone,
      address,
      items: [{
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }],
      total: product.price * product.quantity,
      createdAt: new Date(date).toISOString()
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderPayload);
      setFormData({ name: '', phone: '', address: '', date: '' });
      setExpandedProductId(null);
      localStorage.removeItem('cart');
      navigate('/thank-you');
    } catch (err) {
      console.error('Order failed:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-8 text-white"
      style={{
        backgroundImage: `url('navya1.jpg')`
      }}
    >
      <div className="text-center mb-10 bg-black bg-opacity-50 p-4 rounded-xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg animate-bounce">🛒 Your Cart</h1>
        <p className="text-lg italic text-purple-200 mt-2">Choose quantity and delivery date to place an order.</p>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-100 bg-black bg-opacity-50 p-4 rounded-xl">Your cart is empty. Start shopping now!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-xl text-white border border-purple-300 transition hover:scale-105 duration-300">
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover rounded-2xl mb-3" />
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-green-300 font-semibold">₹{item.price}</p>
              <p className="text-yellow-300 text-sm">⭐ {item.rating} / 5</p>
              <div className="mt-3">
                <label className="text-sm text-white">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  className="w-full px-3 py-1 mt-1 text-black rounded-md bg-white"
                />
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setExpandedProductId(item._id)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl transition duration-200"
                >
                  Order This Product
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-xl transition duration-200"
                >
                  Remove
                </button>
              </div>

              {expandedProductId === item._id && (
                <form
                  onSubmit={(e) => placeOrder(e, item)}
                  className="mt-6 bg-white bg-opacity-20 p-4 rounded-xl space-y-3 text-black animate-fade-in"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-purple-200"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-lg border border-purple-200"
                  />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Delivery Address"
                    className="w-full px-4 py-2 rounded-lg border border-purple-200"
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg border border-purple-200"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl mt-2"
                  >
                    Submit Order
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
