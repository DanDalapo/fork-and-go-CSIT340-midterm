import categories from './categories.js';
import restaurants from './restaurants.js';
import menuItems from './menuItems.js';
import defaultDeliveryInfo from './customer.js';

export { categories, restaurants, menuItems, defaultDeliveryInfo };

export const getCategoryById = (id) => categories.find((category) => category.id === id);
export const getRestaurantById = (id) => restaurants.find((restaurant) => restaurant.id === id);
export const getMenuItemById = (id) => menuItems.find((item) => item.id === id);
