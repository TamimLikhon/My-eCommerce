"use client";
import { useEffect, useState, useContext } from "react";
import BrandFilter from "../../components/filter";
import Link from "next/link";
import { CartContext } from "../../components/CartContext"; // Import the CartContext
import { SquarePlus } from 'lucide-react';

export default function NeckbandPage() {
  const [neckbandData, setBandData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext); // Access cart context


  useEffect(() => {
    const fetchNeckbandData = async () => {
      try {
        const cachedData = sessionStorage.getItem("neckbandData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setBandData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
        } else {
          const response = await fetch("/api/NeckbanData");
          const data = await response.json();
          sessionStorage.setItem("neckbandData", JSON.stringify(data));
          setBandData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching Neckband data:", error);
        try {
          const response = await fetch("/api/NeckbanData");
          const data = await response.json();
          setBandData(data);
          setFilteredData(data);
        } catch (fetchError) {
          console.error("Error fetching from API:", fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNeckbandData();
  }, []);

  const handleFilter = (brand) => {
    if (brand) {
      setFilteredData(neckbandData.filter((item) => item.brand === brand));
    } else {
      setFilteredData(neckbandData);
    }
  };

  const clearCache = () => {
    sessionStorage.removeItem("neckbandData");
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Neckband Page</h1>
      <p className="text-gray-600 mb-8">Welcome to the Neckband Page.</p>
     
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
          <BrandFilter data={neckbandData} onFilter={handleFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                <div className="relative w-full h-70 mb-4">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                 <SquarePlus />
                </button>
                  <Link href={`/categories/Neckbands/${item.model}`} key={item.id}>
                    <img
                      src={item.image_path}
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>
                </div>
                <h2 className="text-xl text-mm mb-2">
                  {item.brand} {item.model}
                </h2>
                <p className="text-1.5rem font-bold mb-2 text-black">
                  {item.price_bdt}
                </p>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
