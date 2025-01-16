"use client";
import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price_bdt * item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
  };
};

export default ShoppingCart;
