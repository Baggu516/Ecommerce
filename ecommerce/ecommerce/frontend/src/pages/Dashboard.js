import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const buttons = [
    { name: "Users", route: "/users" },
    { name: "Products", route: "/products" },
    { name: "Orders", route: "/orders" },
    { name: "Admin", route: "/admin-login" },
  ];

  const handleClick = (route, name) => {
    setActiveButton(name);
    navigate(route);
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center font-[Orbitron] overflow-hidden"
      style={{ backgroundImage: "url('/dash1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl text-white font-bold mb-12 animate-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Control Center
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
          {buttons.map(({ name, route }) => (
            <button
              key={name}
              onClick={() => handleClick(route, name)}
              className={`p-6 w-full text-xl font-semibold rounded-xl 
                backdrop-blur-xl border transition-all duration-300 transform 
                ${activeButton === name
                  ? "bg-gradient-to-r from-green-400 to-blue-500 text-white scale-105"
                  : "bg-white/10 text-white border-white/30 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;