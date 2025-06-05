import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-9xl font-extrabold text-white drop-shadow-lg">404</h1>
        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="text-gray-300 mt-2 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
