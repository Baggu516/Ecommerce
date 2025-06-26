// src/pages/UsersPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/with-orders')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">👥 Users & Their Orders</h1>
      <div className="space-y-10">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.image || "https://i.ibb.co/vxH3RSr/user-avatar.png"}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-bold text-purple-700">{user.name}</h2>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>

            <table className="min-w-full text-left border border-purple-200 rounded-md overflow-hidden">
              <thead className="bg-purple-200 text-purple-900">
                <tr>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Rating</th>
                  <th className="py-2 px-4">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {user.orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="py-2 px-4">{order.product.name}</td>
                    <td className="py-2 px-4">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4">₹{order.product.price}</td>
                    <td className="py-2 px-4">⭐ {order.product.rating}</td>
                    <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
                {user.orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 px-4 text-center text-gray-500">No orders yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
