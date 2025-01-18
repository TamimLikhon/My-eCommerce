"use client";
import React, { useContext, useMemo } from "react";
import { CartContext } from "../components/CartContext";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

// Sample data matching MongoDB structure
const sampleCartItems = [
  {
    _id: "6777b98f818eac69c4bd82c1",
    id: "jbl.t205bt",
    brand: "JBL",
    model: "JBLT205BTGRN",
    bluetooth: "v4.0",
    battery_capacity: "3.7v, 120 mAh",
    anc_status: "Noise isolation",
    driver_size: "12.5 mm",
    playtime: "6 Hours",
    price_bdt: "2800",
    image_path: "https://res.cloudinary.com/drpertfp7/image/upload/v1735927106/JBL-TUNE-175BT_zuvwcg.jpg",
    quantity: 1
  }
];

export default function CartPage() {
  const { cartItems = sampleCartItems, setCartItems } = useContext(CartContext);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price_bdt);
      const quantity = Number(item.quantity) || 1;
      if (isNaN(price) || isNaN(quantity)) return total;
      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = [...cartItems];
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
    setCartItems(updatedItems);
  };

  const removeItem = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            {cartItems.map((item, index) => {
              const itemTotal = Number(item.price_bdt) * (Number(item.quantity) || 1);
              return (
                <div
                  key={item._id}
                  className="p-6 border-b last:border-b-0 flex flex-col sm:flex-row gap-6"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.image_path}
                      alt={item.model}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.brand} {item.model}</h3>
                        <p className="text-sm text-gray-600">{item.bluetooth}</p>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <p>Battery: {item.battery_capacity}</p>
                      <p>Playtime: {item.playtime}</p>
                      <p>Driver Size: {item.driver_size}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {Number(item.price_bdt).toLocaleString()} BDT × {item.quantity || 1}
                        </p>
                        <p className="font-semibold">
                          {itemTotal.toLocaleString()} BDT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{calculateTotal.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {calculateTotal.toLocaleString()} BDT
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}