"use client";
import { useState, useEffect } from "react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        // Validate each item has required properties
        const validCart = parsedCart.filter(item => 
          item && 
          typeof item.id !== 'undefined' && 
          typeof item.price_bdt === 'number' &&
          !isNaN(item.price_bdt)
        );
        setCartItems(validCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart with validation
  const addToCart = (item) => {
    if (!item || typeof item.price_bdt !== 'number' || isNaN(item.price_bdt)) {
      console.error("Invalid item or price:", item);
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter((cartItem) => cartItem.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shoppingCart");
  };

  // Calculate total with validation
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price_bdt);
      const quantity = Number(item.quantity) || 1;
      if (isNaN(price) || isNaN(quantity)) return total;
      return total + (price * quantity);
    }, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
  };
};

export default ShoppingCart;