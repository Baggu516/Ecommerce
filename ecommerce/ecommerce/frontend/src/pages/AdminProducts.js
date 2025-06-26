import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">All Products</h2>
      <ul className="space-y-2">
        {products.map(product => (
          <li key={product._id} className="bg-white p-4 shadow rounded">
            <strong>{product.name}</strong> - ₹{product.price} - ⭐ {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
