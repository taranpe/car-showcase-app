import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch("/cars.json")
      .then((res) => res.json())
      .then((data) => {
        const foundCar = data.find((c) => String(c.id) === id);
        setCar(foundCar);
      })
      .catch((err) => console.error("Error loading car:", err));
  }, [id]);

  if (!car) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 mt-10">
        Loading car details...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow-md mt-10">
      {/* Image with hover animation */}
      <div className="w-full h-64 mb-6 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 group">
        <img
          src={car.image?.startsWith("/") ? car.image : `/${car.image}`}
          alt={car.name}
          className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800 transform transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-car.jpg";
          }}
        />
      </div>

      {/* Car Info */}
      <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
      <p className="mb-1"><strong>Brand:</strong> {car.brand}</p>
      <p className="mb-1"><strong>Fuel:</strong> {car.fuel}</p>
      <p className="mb-1"><strong>Seats:</strong> {car.seats}</p>
      <p className="mb-4">
        <strong>Price:</strong>{" "}
        <span className="text-green-600 dark:text-green-400 font-semibold">
          ${car.price.toLocaleString()}
        </span>
      </p>

      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        🚗 This car offers comfort, style, and performance. Perfect for long drives or daily commuting. You can expand with more details or features here.
      </p>

      {/* Back Button with animation */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          ← Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default CarDetail;
