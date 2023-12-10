import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  

  const [cart, setCart] = useState({
    buyer: { },
    items: [], // Initialize items as an empty array
    total: 0,
  });
  

  const addToCart = (item, quantity) => {
    const { id, title, price, stock } = item;

    // Check if the item is already in the cart
    const existingItem = cart.items.find((cartItem) => cartItem.id === id);

    // Calculate the available stock for the item in the cart
    const availableStock = existingItem ? stock - existingItem.quantity : stock;

    // Check if the requested quantity exceeds the available stock
    const quantityToAdd = Math.min(quantity, availableStock);

    if (quantityToAdd > 0) {
      if (existingItem) {
        // If the item exists, update its quantity
        const updatedCart = {
          ...cart,
          items: cart.items.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
              : cartItem
          ),
          total: cart.total + price * quantityToAdd,
        };
        setCart(updatedCart);
      } else {
        // If the item doesn't exist, add it to the cart
        const updatedCart = {
          ...cart,
          items: [...cart.items, { id, title, price, quantity: quantityToAdd }],
          total: cart.total + price * quantityToAdd,
        };
        setCart(updatedCart);
      }
    }
  };

  return (
    <ShopContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;