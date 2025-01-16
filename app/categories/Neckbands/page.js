"use client";
import { useEffect, useState } from "react";
import BrandFilter from "../../components/filter";
import Link from "next/link";
import ShoppingCart from "@/app/components/shoppingcart";
import Image from "next/image";

export default function NeckbandPage() {
  const [neckbandata, setbandata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = ShoppingCart();

  useEffect(() => {
    const fetchNeckbandata = async () => {
      try {
        // Check if data exists in session storage
        const cachedData = sessionStorage.getItem('neckbandData');
        
        if (cachedData) {
          // If cached data exists, use it
          const parsedData = JSON.parse(cachedData);
          setbandata(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
        } else {
          // If no cached data, fetch from API
          const response = await fetch("/api/NeckbanData");
          const data = await response.json();
          
          // Store the fetched data in session storage
          sessionStorage.setItem('neckbandData', JSON.stringify(data));
          
          setbandata(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching Neckband data:", error);
        // If there's an error with session storage, attempt to fetch from API
        try {
          const response = await fetch("/api/NeckbanData");
          const data = await response.json();
          setbandata(data);
          setFilteredData(data);
        } catch (fetchError) {
          console.error("Error fetching from API:", fetchError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNeckbandata();
  }, []);

  const handleFilter = (brand) => {
    if (brand) {
      setFilteredData(neckbandata.filter((item) => item.brand === brand));
    } else {
      setFilteredData(neckbandata);
    }
  };

  // Function to clear cache if needed
  const clearCache = () => {
    sessionStorage.removeItem('neckbandData');
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Neckband Page</h1>
      <p className="text-gray-600 mb-8">Welcome to the Neckband Page.</p>

      <div className="cart-summary">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cart.cartItems && cart.cartItems.length > 0 ? (
          <div className="border rounded-lg p-4 shadow-md mb-6">
            {cart.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>{item.model} (x{item.quantity})</span>
                
                <button
                  onClick={() => cart.removeFromCart(item.id)}
                  className="text-red-500 font-bold ml-2"
                >
                  Remove
                </button>
                
              </div>
            ))}
            <button
              onClick={cart.clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Clear Cart
            </button>
            <Link href={"/checkout"}> Checkout </Link>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <BrandFilter data={neckbandata} onFilter={handleFilter} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-md">
                <div className="relative w-full h-70 mb-4">
                  <Link href={`/categories/Neckbands/${item.model}`} key={item.id}>
                    <Image
                      src={item.image_path}
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </Link>
                </div>
                <h2 className="text-xl text-mm mb-2">
                  {item.brand} {item.model}
                </h2>
                <p className="text-1.5rem font-bold mb-2 text-black">{item.price_bdt}</p>
                
                <button
                  onClick={() => cart.addToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Add to Cart
                </button>  
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}