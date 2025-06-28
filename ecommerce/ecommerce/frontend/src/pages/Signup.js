import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', form);
      alert("Signup successful!");
      navigate('/');
    } catch (err) {
      alert("Signup failed. " + (err.response?.data?.msg || "Try again."));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('./sign.jpg')" }}
    >
      <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-transparent text-center bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-500 mb-6">
          Create Account
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 mb-4 border rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-md font-medium hover:scale-105 transition-transform"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-100 drop-shadow">
          Already have an account?{' '}
          <a href="/" className="text-purple-200 font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;