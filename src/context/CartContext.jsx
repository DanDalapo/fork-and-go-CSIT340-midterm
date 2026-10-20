import { useCallback, useMemo, useState } from 'react';
import { Cart } from '../models/index.js';
import { CartContext } from './cartContext.js';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => new Cart());
  const [orders, setOrders] = useState([]);

  // Clone -> mutate the clone -> set it, so React sees a new object and re-renders.
  const update = useCallback((mutate) => {
    setCart((previous) => {
      const next = previous.clone();
      mutate(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      orders,
      addItem: (menuItem, restaurant) => update((c) => c.addItem(menuItem, restaurant)),
      removeItem: (menuItemId) => update((c) => c.removeItem(menuItemId)),
      updateQuantity: (menuItemId, quantity) => update((c) => c.updateQuantity(menuItemId, quantity)),
      increase: (menuItemId) => update((c) => c.findItem(menuItemId)?.increase()),
      decrease: (menuItemId) => update((c) => c.findItem(menuItemId)?.decrease()),
      toggleItem: (menuItemId) => update((c) => c.findItem(menuItemId)?.toggleSelected()),
      toggleAll: (selected) => update((c) => c.toggleAll(selected)),
      removeSelected: () => update((c) => c.removeSelected()),
      // Throws if nothing is selected, the delivery info is invalid, or no payment method is chosen.
      placeOrder: (delivery, paymentMethod) => {
        const next = cart.clone();
        const order = next.checkout(delivery, paymentMethod);
        setCart(next);
        setOrders((previous) => [...previous, order]);
        return order;
      },
      getOrderById: (id) => orders.find((order) => order.id === id),
      updateOrderStatus: (id, status) =>
        setOrders((previous) => previous.map((order) => (order.id === id ? order.withStatus(status) : order))),
    }),
    [cart, orders, update]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
