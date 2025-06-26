import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const usersRes = await axios.get('http://localhost:5000/api/users');
      const productsRes = await axios.get('http://localhost:5000/api/products');
      const ordersRes = await axios.get('http://localhost:5000/api/orders');

      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("Admin data load error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">🛠 Admin Panel</h1>

      {/* Users Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">👥 All Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="border-b py-1">{user.name} ({user.email}) - {user.role}</li>
          ))}
        </ul>
      </div>

      {/* Products Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">🛍️ All Products</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border-b py-1">{product.name} - ₹{product.price} ⭐{product.rating}</li>
          ))}
        </ul>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-4">📦 All Orders</h2>
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order._id} className="border-b py-1">
              User: {order.user?.name} → Product: {order.product?.name} on {new Date(order.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
