"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import BrandFilter from "../../components/filter";
import ShoppingCart from "../../components/shoppingcart";
import Image from "next/image";
export default function MobilePage() {
  const [mobileData, setMobileData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = ShoppingCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data exists in session storage
        const cachedData = sessionStorage.getItem('mobileData');
        
        if (cachedData) {
          // If cached data exists, use it
          const parsedData = JSON.parse(cachedData);
          setMobileData(parsedData);
          setFilteredData(parsedData);
          setLoading(false);
        } else {
          // If no cached data, fetch from API
          const response = await fetch("/api/MobileData");
          const data = await response.json();
          
          // Store the fetched data in session storage
          sessionStorage.setItem('mobileData', JSON.stringify(data));
          
          setMobileData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error("Error fetching mobile data:", error);
        // If there's an error with session storage, attempt to fetch from API
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

  // Function to clear cache (useful for testing or when needed)
  const clearCache = () => {
    sessionStorage.removeItem('mobileData');
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mobile Page</h1>
      <p className="text-gray-600 mb-8">Welcome to the Mobile Page.</p>

      {/* Show Cart Summary */}
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

      {/* Mobile Products */}
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
                <Link href={`/categories/Mobile/${item.model}`} key={item.id}>
                  <div className="relative w-full h-70 mb-4">
                    <Image
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