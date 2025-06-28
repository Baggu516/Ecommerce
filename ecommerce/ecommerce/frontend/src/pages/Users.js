import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/with-orders')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to load users:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">All Users & Their Orders</h1>

      <div className="space-y-6">
        {users.map(user => (
          <div key={user._id} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-xl font-bold text-blue-700">{user.name} ({user.email})</h2>
            <p className="text-sm text-gray-500 mb-2">Role: {user.role || 'customer'}</p>

            {user.orders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {user.orders.map(order => (
                  <div key={order._id} className="border p-3 rounded-xl bg-gray-50">
                    {order.product?.image && (
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-full h-40 object-cover rounded"
                      />
                    )}
                    <p className="mt-2 font-semibold">{order.product?.name || 'Deleted Product'}</p>
                    <p className="text-sm text-green-700">₹{order.product?.price}</p>
                    <p className="text-sm text-yellow-500">Rating: {order.product?.rating}</p>
                    <p className="text-sm">Qty: {order.quantity}</p>
                    <p className="text-xs text-gray-500">Address: {order.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ordered on: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic mt-2">No orders placed.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
