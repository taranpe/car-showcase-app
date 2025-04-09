import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarSearch from "./components/CarSearch";
import CarList from "./components/CarList";
import CarDetail from "./components/CarDetail";
import Wishlist from "./components/Wishlist";
import "./index.css"; // Tailwind CSS

function MainPage() {
  const [filters, setFilters] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem("darkMode"));
    if (storedTheme) setDarkMode(storedTheme);
  }, []);

  // Save preference on toggle
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log("Filters:", updatedFilters);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="bg-blue-600 dark:bg-blue-800 text-white py-6 shadow-md">
          <div className="container mx-auto flex items-center justify-between px-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-wide">🚘 Car Finder</h1>
              <p className="text-sm mt-1 font-light opacity-90">Find your dream car easily and quickly</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold shadow hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Filter/Search */}
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
            <CarSearch onFilterChange={handleFilterChange} />
          </div>

          {/* Car List + Wishlist */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Available Cars</h2>
                <CarList filters={filters} />
              </div>
            </div>

            <div className="lg:w-1/4">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">❤️ Wishlist</h2>
                <Wishlist />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/car/:id" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
