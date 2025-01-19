"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../components/CartContext";
import BrandFilter from "../../components/filter";
import { ShoppingCart, Plus, Loader2, Laptop } from "lucide-react";
import { useLoading } from '@/app/components/LoadingContext';

export default function LaptopPage() {
  const [LaptopData, setLaptopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useContext(CartContext);
  const {setIsLoading} = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cachedData = sessionStorage.getItem("LaptopData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setLaptopData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
          return;
        }

        const response = await fetch("/api/LaptopData");
        const data = await response.json();
        sessionStorage.setItem("LaptopData", JSON.stringify(data));
        setLaptopData(data);
        setFilteredData(data);
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);

  const handleFilter = (brand) => {
    setFilteredData(brand ? LaptopData.filter((item) => item.brand === brand) : LaptopData);
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
          <Laptop className="h-8 w-8 text-gray-700" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Laptops</h1>
            <p className="text-gray-600 mt-1">Discover powerful computing solutions</p>
          </div>
        </div>
        <Link href="/cart">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({cartItems.length})</span>
          </button>
        </Link>
      </div>

      <BrandFilter data={LaptopData} onFilter={handleFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <Link href={`/categories/Laptop/${item.model}`}>
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
              
              {item.processor && (
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>• Processor: {item.processor}</p>
                  {item.ram && <p>• RAM: {item.ram}</p>}
                  {item.storage && <p>• Storage: {item.storage}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}