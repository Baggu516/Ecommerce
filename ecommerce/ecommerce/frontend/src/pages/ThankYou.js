// ThankYou.js
import React from 'react';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 via-yellow-200 to-pink-300 text-center p-6">
      <h1 className="text-5xl font-extrabold text-purple-800 mb-4"> Thank You!</h1>
      <p className="text-xl text-gray-700 mb-6">Your order has been placed successfully.</p>
      <p className="text-lg text-gray-600">We appreciate your purchase. Visit us again!</p>
    </div>
  );
};

export default ThankYou;
