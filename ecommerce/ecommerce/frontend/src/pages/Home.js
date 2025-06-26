import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-purple-800">
        🛍️ Shop All Products
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div key={product.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:scale-105">
            <img
              src={product.image}
              alt={product.name}
              onError={e => { e.target.src = 'https://via.placeholder.com/400x400?text=No+Image' }}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-green-600 text-lg font-semibold">₹{product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating} / 5</p>
              <button
                className="mt-3 px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-xl w-full"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
