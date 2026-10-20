export const ROUTES = {
  LANDING: '/',
  MENU: '/menu',
  ITEM: '/menu/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER: '/orders/:id',
  NOT_FOUND: '*',
};

// Path builders, so components never concatenate URLs by hand.
export const itemPath = (id) => `/menu/${id}`;
export const orderPath = (id) => `/orders/${id}`;
