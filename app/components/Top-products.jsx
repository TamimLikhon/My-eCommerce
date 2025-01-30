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


  return(
    <div className="container mx-auto px-2 py-4 sm:py-6">
    <h1 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Top Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {products.map((product) => (
            <div key={product.id} className="border p-2 sm:p-3 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex justify-center items-center bg-transparent rounded-xl p-4">
                    <img
                        src={product.image_path}
                        alt={`${product.brand} ${product.model}`}
                        className="w-full h-32 object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h2 className="text-sm sm:text-base font-semibold mt-1">{product.model}</h2>
                <p className="text-gray-700 text-xs sm:text-sm">{product.price_bdt} ট</p>
            </div>
        ))}
    </div>
</div>
  )
}

export default TopProducts;
