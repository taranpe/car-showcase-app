import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react"; // Optional: modern icon

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // Remove car from wishlist
  const removeFromWishlist = (carId) => {
    const updated = wishlist.filter((car) => car.id !== carId);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">❤️ My Wishlist</h2> */}

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-sm">No cars in your wishlist yet.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((car) => (
            <li
              key={car.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {/* Placeholder or image */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                  {car.name[0]}
                </div>

                {/* Car details */}
                <div>
                  <p className="font-medium text-gray-800">{car.name}</p>
                  <p className="text-sm text-gray-500">{car.brand}</p>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromWishlist(car.id)}
                className="text-red-500 hover:text-red-600 transition"
                title="Remove"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
