"use client";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from localStorage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        setCartItems(savedCart);

        const total = 0;

        // Fetch the latest price for each cart item
        for (const item of savedCart) {
          const response = await fetch(`/api/AllData?model=${item.model}`);
          const data = await response.json();

          // Update total price with fetched price
          total += data.price_bdt * item.quantity;
        }

        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart item prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout Page</h1>
      <p className="text-gray-600 mb-8">Review your selected items below.</p>

      {loading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <>
              <div className="mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 shadow-md mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold">{item.brand} {item.model}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-lg">
                        Total: {item.price_bdt || "Fetching..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <h2 className="text-2xl font-bold">Total Price: {totalPrice} BDT</h2>
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-500">Your cart is empty.</p>
          )}
        </>
      )}
    </div>
  );
}
