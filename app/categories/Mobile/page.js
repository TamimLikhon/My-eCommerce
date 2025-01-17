"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import BrandFilter from "../../components/filter";
import { CartContext } from "../../components/CartContext";
import { SquarePlus } from 'lucide-react';

export default function MobilePage() {
  const [mobileData, setMobileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext); // Access cart context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem("mobileData");

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setMobileData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
        } else {
          const response = await fetch("/api/MobileData");
          const data = await response.json();

          sessionStorage.setItem("mobileData", JSON.stringify(data));
          setMobileData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching mobile data:", error);

        try {
          const response = await fetch("/api/MobileData");
          const data = await response.json();
          setMobileData(data);
          setFilteredData(data);
        } catch (fetchError) {
          console.error("Error fetching from API:", fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (brand) => {
    if (brand) {
      setFilteredData(mobileData.filter((item) => item.brand === brand));
    } else {
      setFilteredData(mobileData);
    }
  };

  const clearCache = () => {
    sessionStorage.removeItem("mobileData");
    window.location.reload();
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mobile Page</h1>
      <p className="text-gray-600 mb-8">Welcome to the Mobile Page.</p>

      <div className="flex justify-end mb-6">
        <Link href="/cart">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            View Cart ({cartItems.length})
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <BrandFilter data={mobileData} onFilter={handleFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                               <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                 <SquarePlus />
                </button>
                <Link href={`/categories/Mobile/${item.model}`} key={item.id}>
                  <div className="relative w-full h-70 mb-4">
                    <img
                      src={item.image_path}
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </Link>
                <h2 className="text-xl text-mm mb-2">{item.model}</h2>
                <p className="text-1.5rem font-bold mb-2 text-black">
                  {item.price_bdt}
                </p>
                <div>
                  <p className="text-ms text-black font-bold">
                    Memory: {item.memory?.[0] || "N/A"}
                  </p>
                  <p className="text-ms text-black font-bold">
                    Display: {item.display_size || "N/A"}
                  </p>
                </div>
 
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
