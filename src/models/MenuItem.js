import BaseEntity from './BaseEntity.js';
import formatCurrency from '../utils/formatCurrency.js';

export default class MenuItem extends BaseEntity {
  constructor({ id, restaurantId, categoryId, name, description, price, images, rating }) {
    super({ id });
    this.restaurantId = restaurantId;
    this.categoryId = categoryId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.rating = rating;
  }

  getFormattedPrice() {
    return formatCurrency(this.price);
  }

  // Same-category dishes first, then everything else, each group sorted by rating.
  getRecommended(allItems, limit = 4) {
    const byRating = (a, b) => b.rating - a.rating;
    const others = allItems.filter((item) => item.id !== this.id);
    const sameCategory = others.filter((item) => item.categoryId === this.categoryId).sort(byRating);
    const rest = others.filter((item) => item.categoryId !== this.categoryId).sort(byRating);
    return [...sameCategory, ...rest].slice(0, limit);
  }

  // Does this item pass the given FilterCriteria? (sorting is handled by FilterCriteria.apply)
  matches(filter) {
    const text = filter.searchText.trim().toLowerCase();
    if (text && !`${this.name} ${this.description}`.toLowerCase().includes(text)) return false;
    if (filter.categoryId && this.categoryId !== filter.categoryId) return false;
    if (filter.restaurantId && this.restaurantId !== filter.restaurantId) return false;
    if (filter.maxPrice !== null && this.price > filter.maxPrice) return false;
    return true;
  }
}
