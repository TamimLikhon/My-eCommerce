"use client";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price_bdt * (item.quantity || 1), 0);
  };

  const removeItem = (indexToRemove) => {
    const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={index} className="border-b p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.model}</h3>
                  <p className="text-gray-600">Price: {item.price_bdt} BDT</p>
                  <p className="text-gray-600">Quantity: {item.quantity || 1}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {item.price_bdt * (item.quantity || 1)} BDT
                  </span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{calculateTotal()} BDT</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{calculateTotal()} BDT</span>
              </div>
              <Link 
                href="/checkout"
                className="block w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}