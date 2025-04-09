import React, { useState } from "react";
import { motion } from "framer-motion"; // 👈 Import Framer Motion

const CarSearch = ({ onFilterChange }) => {
  const [brand, setBrand] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      brand: brand.trim(),
      priceRange: {
        min: priceMin ? parseInt(priceMin) : 0,
        max: priceMax ? parseInt(priceMax) : Infinity,
      },
      fuel,
      seats: seats ? parseInt(seats) : "",
    };
    onFilterChange(filters);
  };

  const handleReset = () => {
    setBrand("");
    setPriceMin("");
    setPriceMax("");
    setFuel("");
    setSeats("");
    onFilterChange({});
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -30 }} // 👈 Animation Start
      animate={{ opacity: 1, y: 0 }}    // 👈 Animation End
      transition={{ duration: 0.5 }}     // 👈 Speed
      onSubmit={handleSearch}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Brand
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g. Maruti, Hyundai"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Min Price
          </label>
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            placeholder="e.g. 100000"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Max Price
          </label>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            placeholder="e.g. 800000"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Fuel Type
          </label>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">All</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Seating Capacity */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Seating Capacity
          </label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="e.g. 5"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 rounded focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          🔍 Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition w-full sm:w-auto"
        >
          ❌ Reset
        </button>
      </div>
    </motion.form>
  );
};

export default CarSearch;
