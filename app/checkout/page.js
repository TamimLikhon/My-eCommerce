"use client";
import { useEffect, useState, useContext } from "react";
import { ShoppingBag, CreditCard } from "lucide-react";
import { CartContext } from "../components/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });

  // Calculate total price from cart items
  useEffect(() => {
    const calculateTotal = () => {
      try {
        setLoading(true);
        const total = cartItems.reduce((sum, item) => {
          // Convert price_bdt to number if it's a string
          const price = Number(item.price_bdt);
          const quantity = Number(item.quantity) || 1;
          
          // Check if price is valid number
          if (isNaN(price)) {
            console.error('Invalid price for item:', item);
            return sum;
          }
          
          return sum + (price * quantity);
        }, 0);

        setTotalPrice(total);
      } catch (error) {
        console.error("Error calculating total:", error);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    calculateTotal();
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const order = {
      ...formData,
      items: cartItems,
      totalAmount: totalPrice,
      orderDate: new Date().toISOString()
    };

    try {
      console.log("Submitting order:", order);
      // Add your order submission logic here
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customer Information Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-xl font-bold">Customer Information</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-black">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-black">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-black">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-black">
                Shipping Address
              </label>
              <input
                id="address"
                name="address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium text-black">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="postalCode" className="block text-sm font-medium text-black">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-black">
                Country
              </label>
              <input
                id="country"
                name="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <p className="text-lg">Loading...</p>
            </div>
          ) : (
            <>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <p className="font-medium">{item.brand} {item.model}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                      </div>
                      <p className="font-medium">
                        {Number(item.price_bdt).toLocaleString()} BDT
                      </p>
                    </div>
                  ))}
                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">Total:</p>
                      <p className="text-xl font-bold">{totalPrice.toLocaleString()} BDT</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-lg text-gray-500">Your cart is empty.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}