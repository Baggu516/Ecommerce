import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);


  const sampleProducts = [
    {
      _id: '1',
      name: 'Tesla Model X Miniature',
      price: 4999,
      rating: 4.5,
      image: '/car1.jpg'
    },
    {
      _id: '2',
      name: 'BMW M3 Die-Cast',
      price: 2599,
      rating: 4.8,
      image: '/car2.jpg'
    },
    {
      _id: '3',
      name: 'Lamborghini Aventador Toy',
      price: 6999,
      rating: 4.9,
      image: '/car3.jpg'
    },
    {
      _id: '4',
      name: 'Audi R8 Car Replica',
      price: 3499,
      rating: 4.7,
      image: '/car4.jpg'
    }
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data.length ? res.data : sampleProducts);
      })
      .catch(() => setProducts(sampleProducts)); // fallback to sample data
  }, []);

  const orderProduct = async productId => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert('Please login');

    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user._id,
        productId
      });
      alert('Order placed!');
    } catch {
      alert('Order failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-black-200 p-6">
      <h1 className="text-7xl font-bold text-center mb-10 text-black-700">
        Navya Car Products
      </h1>
 <img
                src={sampleProducts[0].image}
                alt={"ss"}
                className="w-full h-64 object-cover"
              />
      {products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <div key={product._id} className="bg-white shadow-xl rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-green-600 text-lg font-semibold">₹{product.price}</p>
                <p className="text-yellow-500">{product.rating} / 5</p>
                <button
                  onClick={() => orderProduct(product._id)}
                  className="mt-3 px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-xl w-full"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </div>
  );
};

export default Products;