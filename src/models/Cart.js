import CartItem from './CartItem.js';
import Order from './Order.js';
import { sumSubtotal, sumDeliveryFees } from '../utils/pricing.js';

export default class Cart {
  constructor(items = []) {
    this.items = items;
  }

  findItem(menuItemId) {
    return this.items.find((item) => item.menuItem.id === menuItemId);
  }

  addItem(menuItem, restaurant) {
    const existing = this.findItem(menuItem.id);
    if (existing) {
      existing.increase();
    } else {
      this.items.push(new CartItem({ menuItem, restaurant }));
    }
  }

  removeItem(menuItemId) {
    this.items = this.items.filter((item) => item.menuItem.id !== menuItemId);
  }

  updateQuantity(menuItemId, quantity) {
    const item = this.findItem(menuItemId);
    const amount = Math.floor(Number(quantity));
    if (!item || !Number.isFinite(amount)) return;
    if (amount <= 0) {
      this.removeItem(menuItemId);
    } else {
      item.quantity = amount;
    }
  }

  toggleAll(selected) {
    this.items.forEach((item) => {
      item.selected = selected;
    });
  }

  areAllSelected() {
    return this.items.length > 0 && this.items.every((item) => item.selected);
  }

  removeSelected() {
    this.items = this.items.filter((item) => !item.selected);
  }

  getSelectedItems() {
    return this.items.filter((item) => item.selected);
  }

  // Map of restaurantId -> { restaurant, items }, used to render one section per restaurant.
  getGroupedByRestaurant(onlySelected = false) {
    const source = onlySelected ? this.getSelectedItems() : this.items;
    const groups = new Map();
    source.forEach((item) => {
      if (!groups.has(item.restaurant.id)) {
        groups.set(item.restaurant.id, { restaurant: item.restaurant, items: [] });
      }
      groups.get(item.restaurant.id).items.push(item);
    });
    return groups;
  }

  // Total quantity of everything in the cart (navbar badge).
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Total quantity of the ticked items ("Total (2 Items)").
  getSelectedCount() {
    return this.getSelectedItems().reduce((count, item) => count + item.quantity, 0);
  }

  // Money totals only count selected items.
  getSubtotal() {
    return sumSubtotal(this.getSelectedItems());
  }

  getDeliveryFee() {
    return sumDeliveryFees(this.getSelectedItems());
  }

  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  // Turns the selected items into an Order and leaves the unselected ones in the cart.
  checkout(delivery, paymentMethod) {
    const selected = this.getSelectedItems();
    if (selected.length === 0) throw new Error('NO_ITEMS_SELECTED');
    if (!delivery || !delivery.isValid()) throw new Error('INVALID_DELIVERY');
    if (!paymentMethod) throw new Error('NO_PAYMENT_METHOD');

    const order = new Order({
      items: selected.map((item) => item.clone()),
      delivery,
      paymentMethod,
    });
    this.removeSelected();
    return order;
  }

  // React state needs a new object to re-render, so clone, mutate the clone, then set it.
  clone() {
    return new Cart(this.items.map((item) => item.clone()));
  }
}
