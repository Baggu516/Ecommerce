import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const sampleProducts = [
    { _id: '1', name: 'Tesla Model X Miniature', price: 4999, rating: 4.5, image: '/car1.jpg' },
    { _id: '2', name: 'BMW M3 Die-Cast', price: 2599, rating: 4.8, image: '/car2.jpg' },
    { _id: '3', name: 'Lamborghini Aventador Toy', price: 6999, rating: 4.9, image: '/car3.jpg' },
    { _id: '4', name: 'Audi R8 Car Replica', price: 3499, rating: 4.7, image: '/car4.jpg' },
    { _id: '5', name: 'McLaren P1 Mini Car', price: 5599, rating: 4.6, image: '/car5.jpg' },
    { _id: '6', name: 'Ferrari LaFerrari Toy', price: 6399, rating: 4.8, image: '/car6.jpg' },
    { _id: '7', name: 'Porsche 911 Carrera Model', price: 3199, rating: 4.4, image: '/car7.jpg' },
    { _id: '8', name: 'Bugatti Chiron Replica', price: 7599, rating: 4.9, image: '/car8.jpg' },
    { _id: '9', name: 'Ford Mustang GT Toy', price: 2899, rating: 4.3, image: '/car9.jpg' },
    { _id: '10', name: 'Chevrolet Camaro Die-Cast', price: 2999, rating: 4.2, image: '/car10.jpg' },
    { _id: '11', name: 'Jaguar F-Type Model', price: 3799, rating: 4.6, image: '/car11.jpg' },
    { _id: '12', name: 'Aston Martin DB11 Toy', price: 6899, rating: 4.7, image: '/car12.jpg' },
    { _id: '13', name: 'Koenigsegg Agera Mini Car', price: 8999, rating: 4.9, image: '/car13.jpg' },
    { _id: '14', name: 'Pagani Huayra Model', price: 8399, rating: 4.8, image: '/car14.jpg' },
    { _id: '15', name: 'Mazda RX-7 Toy Car', price: 2699, rating: 4.3, image: '/car15.jpg' },
    { _id: '16', name: 'Nissan GT-R Miniature', price: 3499, rating: 4.5, image: '/car16.jpg' },
    { _id: '17', name: 'Dodge Challenger Model', price: 3299, rating: 4.4, image: '/car17.jpg' },
    { _id: '18', name: 'Honda NSX Replica', price: 3099, rating: 4.5, image: '/car18.jpg' },
    { _id: '19', name: 'Mini Cooper S Die-Cast', price: 1999, rating: 4.1, image: '/car19.jpg' },
    { _id: '20', name: 'Toyota Supra Toy Car', price: 3899, rating: 4.6, image: '/car20.jpg' }
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data.length ? res.data : sampleProducts);
      })
      .catch(() => setProducts(sampleProducts));

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      alert(`${product.name} is already in the cart!`);
      return;
    }
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length);
    alert(`${product.name} added to cart!`);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-black-200 p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-purple-900 tracking-tight mb-2 animate-pulse">
          Navya Car Products
        </h1>
        <p className="text-lg text-gray-700 font-medium italic mb-4">
          Miniature cars, maximum thrill – Add elegance to your shelf today!
        </p>
        <button
          onClick={goToCart}
          className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-6 py-2 rounded-xl text-lg shadow-lg transition-all duration-300"
        >
          View Cart ({cartCount})
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div key={product._id} className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col hover:scale-[1.02] transition-transform">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-green-600 text-lg font-semibold">₹{product.price}</p>
                <p className="text-yellow-500">{product.rating} / 5</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 bg-pink-500 hover:bg-pink-700 text-white rounded-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
