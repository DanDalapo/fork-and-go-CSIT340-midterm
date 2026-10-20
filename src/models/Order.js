import BaseEntity from './BaseEntity.js';
import { UI_TEXT } from '../constants/uiText.js';
import { sumSubtotal, sumDeliveryFees } from '../utils/pricing.js';
import groupByRestaurant from '../utils/groupByRestaurant.js';

export default class Order extends BaseEntity {
  static STATUS = {
    PLACED: 'placed',
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
  };

  // The order a delivery moves through (drives the progress tracker).
  static STATUS_FLOW = [
    Order.STATUS.PLACED,
    Order.STATUS.PREPARING,
    Order.STATUS.OUT_FOR_DELIVERY,
    Order.STATUS.DELIVERED,
  ];

  // Delivery estimate: kitchen time plus travel per restaurant, shown as a 15-minute window.
  static PREP_MINUTES = 20;
  static MINUTES_PER_RESTAURANT = 10;
  static ETA_WINDOW_MINUTES = 15;

  // Five-digit order number, like the "#12345" in the wireframe.
  static generateId() {
    return String(Math.floor(10000 + Math.random() * 90000));
  }

  constructor({
    id = Order.generateId(),
    items,
    delivery,
    paymentMethod,
    status = Order.STATUS.PLACED,
    placedAt = new Date(),
  }) {
    super({ id });
    this.items = items; // snapshot of CartItems taken at checkout
    this.delivery = delivery;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.placedAt = placedAt;
  }

  getGroupedByRestaurant() {
    return groupByRestaurant(this.items);
  }

  getSubtotal() {
    return sumSubtotal(this.items);
  }

  getDeliveryFee() {
    return sumDeliveryFees(this.items);
  }

  getTotal() {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  getStatusLabel() {
    return UI_TEXT.orderStatus[this.status] ?? this.status;
  }

  getStatusStep() {
    return Order.STATUS_FLOW.indexOf(this.status);
  }

  getNextStatus() {
    return Order.STATUS_FLOW[this.getStatusStep() + 1] ?? null;
  }

  // Returns a NEW Order (React state needs a new object to re-render).
  withStatus(status) {
    return new Order({ ...this, status });
  }

  getRestaurantNames() {
    return [...this.getGroupedByRestaurant().values()].map((group) => group.restaurant.name);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // { from, to } Dates for the delivery window.
  getEstimatedArrival() {
    const minutes = Order.PREP_MINUTES + Order.MINUTES_PER_RESTAURANT * this.getRestaurantNames().length;
    const from = new Date(this.placedAt.getTime() + minutes * 60_000);
    const to = new Date(from.getTime() + Order.ETA_WINDOW_MINUTES * 60_000);
    return { from, to };
  }
}
