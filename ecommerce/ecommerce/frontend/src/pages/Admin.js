import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      alert('Access denied. Admins only.');
      return navigate('/');
    }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users'),
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/orders'),
      ]);

      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error('Admin data load error:', error);
      alert('Error loading data. Check server connection.');
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(p => p._id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete product.');
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u._id === userId);
    return user ? user.name : '❓ Unknown User';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p._id === productId);
    return product ? product.name : '❓ Unknown Product';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">🛠 Admin Panel</h1>

      {/* Users Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">👥 All Users</h2>
        <ul className="space-y-1">
          {users.map(user => (
            <li key={user._id} className="border-b py-1">
              {user.name} ({user.email}) — <span className="text-sm italic">{user.role}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🛍️ All Products</h2>
        <ul className="space-y-2">
          {products.map(product => (
            <li key={product._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <strong>{product.name}</strong> — ₹{product.price} ⭐{product.rating}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">📦 All Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 italic">No orders placed yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map(order => (
              <li key={order._id} className="border-b py-1">
                🧑 {getUserName(order.userId)} → 🚗 {getProductName(order.productId)} on{' '}
                {new Date(order.createdAt || order.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
