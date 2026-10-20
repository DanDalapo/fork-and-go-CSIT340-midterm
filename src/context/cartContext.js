import { createContext } from 'react';

// Shared by CartProvider (writes it) and useCart (reads it).
export const CartContext = createContext(null);
