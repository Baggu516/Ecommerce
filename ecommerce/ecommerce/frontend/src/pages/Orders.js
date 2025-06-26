import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return alert("Please login");

      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">📦 My Orders</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white rounded-xl shadow-xl overflow-hidden">
            <img src={order.product?.image} alt={order.product?.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{order.product?.name}</h2>
              <p className="text-green-600 font-semibold">₹{order.product?.price}</p>
              <p className="text-yellow-500">⭐ {order.product?.rating}</p>
              <p className="text-sm text-gray-600 mt-2">Ordered on: {new Date(order.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
