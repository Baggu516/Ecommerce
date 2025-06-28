import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Please login");

    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
      setOrders(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-700">🧾 My Orders</h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-4 space-y-3"
            >
              <h2 className="text-xl font-bold text-purple-700">Order #{order._id.slice(-6)}</h2>
              <p className="text-sm text-gray-500">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Name: {order.name}</p>
              <p className="text-sm text-gray-500">Phone: {order.phone}</p>
              <p className="text-sm text-gray-500">Address: {order.address}</p>

              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="py-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                    <p className="text-sm text-gray-500">Product ID: {item.productId}</p>
                  </div>
                ))}
              </div>

              <p className="text-right font-bold text-green-600">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
