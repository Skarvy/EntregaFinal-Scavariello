import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  // Estado inicial del carrito
  const [cart, setCart] = useState({
    buyer: {},
    items: [], // Inicializa items como un array vacío
    total: 0,
  });

  // Función para agregar un ítem al carrito
  const addToCart = (item, quantity) => {
    const { id, title, price, stock, image } = item;

    // Verificar si el ítem ya está en el carrito
    const existingItem = cart.items.find((cartItem) => cartItem.id === id);

    // Calcular el stock disponible para el ítem en el carrito
    const availableStock = existingItem ? stock - existingItem.quantity : stock;

    // Verificar si la cantidad solicitada supera el stock disponible
    const quantityToAdd = Math.min(quantity, availableStock);

    if (quantityToAdd > 0) {
      if (existingItem) {
        // Si el ítem existe, actualizar su cantidad
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
        // Si el ítem no existe, agregarlo al carrito
        const updatedCart = {
          ...cart,
          items: [...cart.items, { id, image, title, price, quantity: quantityToAdd }],
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
