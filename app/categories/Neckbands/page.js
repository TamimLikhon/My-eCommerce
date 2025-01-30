"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../components/CartContext";
import BrandFilter from "../../components/filter";
import { ShoppingCart, Plus, Loader2, Headphones, GitCompareArrows } from "lucide-react";
import { useLoading } from '@/app/components/LoadingContext';
import Image from "next/image";

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
        const cachedData = localStorage.getItem("neckbandData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setBandData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/NeckbanData");
        const data = await response.json();
        localStorage.setItem("neckbandData", JSON.stringify(data));
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

  return(
    <div className="bg-gray-50 min-h-screen font-sans">
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Headphones className="h-10 w-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Neckbands</h1>
            <p className="text-sm text-gray-500">Premium Wireless Audio</p>
          </div>
        </div>
        <Link href="/cart">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({cartItems.length})</span>
          </button>
        </Link>
      </div>

      <BrandFilter data={neckbandData} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredData.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="relative">
              <Link href={`/categories/Neckbands/${item.model}`}>
                <div className="h-48 bg-transparent flex items-center justify-center">
                <Image
                    src={item.image_path}
                    alt={`${item.brand} ${item.model}`}
                    width={200}
                    height={100}
                    className="w-full h-full object-contain p-4 transform hover:scale-105 transition-transform"
                  />


                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(item)}
                className="absolute top-2 right-2 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3 text-center">
              <h2 className="text-base font-semibold text-gray-800 mb-1">
                {item.brand} {item.model}
              </h2>
              <p className="text-xl font-bold text-blue-600 mb-2">
                {item.price_bdt}
              </p>
              
              {item.features && (
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  {item.features.slice(0, 2).map((feature, index) => (
                    <p key={index} className="truncate">
                      {feature}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/compare">
          <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110">
            <GitCompareArrows className="w-6 h-6" />
          </div>
        </Link>
      </div>
    </div>
  </div>
  )
}

