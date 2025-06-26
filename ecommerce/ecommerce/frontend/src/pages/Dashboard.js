import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/pages/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content overlay */}
      <div className="relative z-10 bg-white/70 backdrop-blur-md min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-purple-700 mb-10">
          Welcome to Your Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
          <button
            onClick={() => navigate("/users")}
            className="p-6 bg-blue-500 hover:bg-blue-600 text-white text-xl rounded-xl shadow-lg transition"
          >
            👤 Users
          </button>
          <button
            onClick={() => navigate("/products")}
            className="p-6 bg-green-500 hover:bg-green-600 text-white text-xl rounded-xl shadow-lg transition"
          >
            🛍️ Products
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="p-6 bg-yellow-500 hover:bg-yellow-600 text-white text-xl rounded-xl shadow-lg transition"
          >
            📦 Orders
          </button>
          <button
            onClick={() => navigate("/admin-login")}
            className="p-6 bg-purple-500 hover:bg-purple-600 text-white text-xl rounded-xl shadow-lg transition"
          >
            🛠️ Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
