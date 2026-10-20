import BaseEntity from './BaseEntity.js';
import { UI_TEXT } from '../constants/uiText.js';
import { sumSubtotal, sumDeliveryFees } from '../utils/pricing.js';

export default class Order extends BaseEntity {
  static STATUS = {
    PLACED: 'placed',
    PREPARING: 'preparing',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
  };

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
}
