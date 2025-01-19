"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../components/CartContext";
import BrandFilter from "../../components/filter";
import { ShoppingCart, Plus, Loader2, Headphones } from "lucide-react";
import { useLoading } from '@/app/components/LoadingContext';

export default function NeckbandPage() {
  const [neckbandData, setBandData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);
  const {setIsLoading} = useLoading();

  useEffect(() => {
    const fetchNeckbandData = async () => {
      setIsLoading(true);

      try {
        const cachedData = sessionStorage.getItem("neckbandData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setBandData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/NeckbanData");
        const data = await response.json();
        sessionStorage.setItem("neckbandData", JSON.stringify(data));
        setBandData(data);
        setFilteredData(data);
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
        setIsLoading(false);

      }
    };

    fetchNeckbandData();
  }, [setIsLoading]);

  const handleFilter = (brand) => {
    setFilteredData(brand ? neckbandData.filter((item) => item.brand === brand) : neckbandData);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Headphones className="h-8 w-8 text-gray-700" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Neckbands</h1>
            <p className="text-gray-600 mt-1">Discover premium wireless audio comfort</p>
          </div>
        </div>
        <Link href="/cart">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({cartItems.length})</span>
          </button>
        </Link>
      </div>

      <BrandFilter data={neckbandData} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <Link href={`/categories/Neckbands/${item.model}`}>
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={item.image_path}
                    alt={`${item.brand} ${item.model}`}
                    className="w-full h-64 object-contain transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(item)}
                className="absolute top-4 right-4 p-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.brand} {item.model}
              </h2>
              <p className="text-2xl font-bold text-green-600 mb-3">
                {item.price_bdt}
              </p>
              
              {item.features && (
                <div className="mt-2 space-y-1">
                  {item.features.slice(0, 2).map((feature, index) => (
                    <p key={index} className="text-gray-600 text-sm">
                      • {feature}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

