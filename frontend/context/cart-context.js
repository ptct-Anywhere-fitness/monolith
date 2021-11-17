import { createContext } from 'react';

// ==============================================

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  resetCart: () => {},
});
