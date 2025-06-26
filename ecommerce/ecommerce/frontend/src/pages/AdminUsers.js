import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders/admin/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users and Their Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td className="border p-2">{order.userId?.name || 'Unknown'}</td>
              <td className="border p-2">{order.userId?.email || 'Unknown'}</td>
              <td className="border p-2">{order.productId?.name || 'Unknown'}</td>
              <td className="border p-2">₹{order.productId?.price || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
