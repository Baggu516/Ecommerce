import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.length === 0 ? <p>No items in cart.</p> :
        <>
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 mb-3 flex justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
              <button className="text-red-500" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2 className="text-xl mt-4">Total: ₹{total}</h2>
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </>
      }
    </div>
  );
};

export default Cart;
