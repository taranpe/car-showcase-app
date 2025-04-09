import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CarList = ({ filters = {} }) => {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const carsPerPage = 10;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/cars.json");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // EME: Filtering logic based on user-selected filters
  const filteredCars = cars.filter((car) => {
    const { brand, fuel, seats, priceRange } = filters;
    const min = priceRange?.min ?? 0;
    const max = priceRange?.max ?? Infinity;

    return (
      (!brand || car.brand.toLowerCase().includes(brand.toLowerCase())) &&
      (!fuel || car.fuel.toLowerCase() === fuel.toLowerCase()) &&
      (!seats || car.seats === Number(seats)) &&
      car.price >= min &&
      car.price <= max
    );
  });

  // EME: Pagination logic
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const start = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(start, start + carsPerPage);

  // EME: Add to wishlist using localStorage
  const addToWishlist = (car) => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isExists = saved.find((item) => item.id === car.id);
    if (!isExists) {
      const updated = [...saved, car];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
      alert(`${car.name} added to wishlist!`);
    } else {
      alert(`${car.name} is already in wishlist.`);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* EME: Render paginated car list */}
      {paginatedCars.map((car) => (
        <div
          key={car.id}
          className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row items-center md:items-start"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full md:w-52 h-36 object-cover rounded mb-4 md:mb-0 md:mr-6 bg-gray-50 dark:bg-gray-800"
          />

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{car.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">
              {car.brand} | {car.fuel} | {car.seats} seats
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
              ${car.price.toLocaleString()}
            </p>

            <div className="flex gap-3 flex-wrap">
              {/* EME: Add to wishlist */}
              <button
                onClick={() => addToWishlist(car)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                ❤️ Wishlist
              </button>

              {/* EME: Navigate to car details page */}
              <button
                onClick={() => navigate(`/car/${car.id}`)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* EME: Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
