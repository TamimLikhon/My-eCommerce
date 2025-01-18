"use client";
import { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((item) => {
    const price = Number(item.price_bdt);

    if (!item || isNaN(price)) {
      console.error("Invalid item or price:", item);
      return;
    }

    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(i => i.id === item.id);
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: (newCart[existingItemIndex].quantity || 1) + 1
        };
        return newCart;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((indexToRemove) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      addToCart,
      removeFromCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}
