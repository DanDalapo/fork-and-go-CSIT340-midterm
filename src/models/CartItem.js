export default class CartItem {
  constructor({ menuItem, restaurant, quantity = 1, selected = false }) {
    this.menuItem = menuItem;
    this.restaurant = restaurant;
    this.quantity = quantity;
    this.selected = selected;
  }

  increase() {
    this.quantity += 1;
  }

  decrease() {
    if (this.quantity > 1) this.quantity -= 1;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  getSubtotal() {
    return this.menuItem.price * this.quantity;
  }

  clone() {
    return new CartItem({ ...this });
  }
}
