"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import BrandFilter from "../../components/filter";
import { CartContext } from "../../components/CartContext";
import { SquarePlus } from 'lucide-react';

export default function LaptopPage() {
  const [LaptopData, setLaptopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext); // Access cart context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = sessionStorage.getItem("LaptopData");

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setLaptopData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
        } else {
          const response = await fetch("/api/LaptopData");
          const data = await response.json();

          sessionStorage.setItem("LaptopData", JSON.stringify(data));
          setLaptopData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching laptop data:", error);

        try {
          const response = await fetch("/api/LaptopData");
          const data = await response.json();
          setLaptopData(data);
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
      setFilteredData(LaptopData.filter((item) => item.brand === brand));
    } else {
      setFilteredData(LaptopData);
    }
  };

  const clearCache = () => {
    sessionStorage.removeItem("LaptopData");
    window.location.reload();
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Smart Phones</h1>
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
          <BrandFilter data={LaptopData} onFilter={handleFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                               <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                 <SquarePlus />
                </button>
                <Link href={`/categories/Laptop/${item.model}`} key={item.id}>
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
                {/* <div>
                  <p className="text-ms text-black font-bold">
                    Memory: {item.memory?.[0] || "N/A"}
                  </p>
                  <p className="text-ms text-black font-bold">
                    Display: {item.display_size || "N/A"}
                  </p>
                </div> */}
 
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
