import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      res.data.role === 'admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (err) {
      alert("Login failed. " + (err.response?.data?.msg || "Try again."));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('./img.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md shadow-xl rounded-2xl px-10 py-12 w-full max-w-md"
      >
        <h2 className="text-4xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-blue-500 mb-8">
          Welcome Back
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 mb-6 rounded-xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform"
        >
          Login
        </button>
        <p className="mt-6 text-center text-sm text-gray-100 drop-shadow">
          Don’t have an account?{' '}
          <a href="/signup" className="font-semibold text-purple-200 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;