import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders/admin/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  const grouped = orders.reduce((acc, order) => {
  if (!order.productId || !order.userId) return acc; // ✅ skip bad data

  const { productId, userId } = order;

  if (!acc[productId._id]) {
    acc[productId._id] = { name: productId.name, users: [] };
  }

  acc[productId._id].users.push({
    name: userId.name || 'No Name',
    email: userId.email || 'No Email'
  });

  return acc;
}, {});


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Product-wise Order Summary</h2>
      {Object.values(grouped).map((product, i) => (
        <div key={i} className="mb-6 bg-white p-4 rounded shadow">
          <p className="font-semibold">{product.name} — Ordered by {product.users.length} user(s)</p>
          <ul className="mt-2 pl-4 list-disc">
            {product.users.map((user, idx) => (
              <li key={idx}>{user.name} ({user.email})</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
