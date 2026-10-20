import BaseEntity from './BaseEntity.js';

export default class Category extends BaseEntity {
  constructor({ id, name, icon }) {
    super({ id });
    this.name = name;
    this.icon = icon;
  }
}
