import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome Admin</h1>
      <div className="space-x-4">
        <button className="bg-green-600 text-white px-6 py-2 rounded" onClick={() => navigate('/admin/users')}>All Users</button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={() => navigate('/admin/products')}>All Products</button>
        <button className="bg-purple-600 text-white px-6 py-2 rounded" onClick={() => navigate('/admin/orders')}>All Orders</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
