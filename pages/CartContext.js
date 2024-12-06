import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (itemToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item !== itemToRemove)
    );
  };

  const paymentMethods = {
    1: "GCash",
    2: "Credit/Debit Card",
    3: "Maya",
    4: "Cash on Delivery",
    5: "Cash", // For Pick-up
  };
  
  const completeOrder = (orderDetails) => {
  if (cart.length > 0) {
    const total = cart.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );

    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: cart, // Items in the cart
      total: parseFloat(total.toFixed(2)), // Ensure `total` is a valid number
      status: "Completed",
      orderType: orderDetails.orderType || "Delivery",
      deliveryAddress: orderDetails.deliveryAddress || "N/A",
      paymentMethod: orderDetails.paymentMethod || "N/A",
      notes: orderDetails.notes || "None",
    };
    setOrderHistory((prevHistory) => [newOrder, ...prevHistory]);
    clearCart();
  }
};

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, completeOrder, orderHistory }}>
      {children}
    </CartContext.Provider>

  );
};

export const useCart = () => {
  return useContext(CartContext);
};
