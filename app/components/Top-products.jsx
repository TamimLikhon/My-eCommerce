'use client';
import React, { useEffect, useState } from 'react';
import { useLoading } from  './LoadingContext'

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setIsLoading} = useLoading();


  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);

      try {
        const response = await fetch('/api/AllData');
        const data = await response.json();
        
        const sortedProducts = data.sort((a, b) => b.price - a.price).slice(0, 8);
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setIsLoading]);


  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Top Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
                <div key={product.id} className="border p-3 sm:p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                        <img
                            src={product.image_path}
                            alt={product.model}
                            className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold mt-2">{product.model}</h2>
                    <p className="text-gray-700 text-sm sm:text-base">{product.price_bdt} ট</p>
                </div>
            ))}
        </div>
    </div>
);
}

export default TopProducts;
