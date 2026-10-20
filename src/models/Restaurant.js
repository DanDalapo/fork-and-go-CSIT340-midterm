import BaseEntity from './BaseEntity.js';

export default class Restaurant extends BaseEntity {
  constructor({ id, name, cuisine, image, rating, deliveryFee }) {
    super({ id });
    this.name = name;
    this.cuisine = cuisine;
    this.image = image;
    this.rating = rating;
    this.deliveryFee = deliveryFee;
  }

  getMenu(items) {
    return items.filter((item) => item.restaurantId === this.id);
  }
}
