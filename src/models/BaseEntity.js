// Abstract parent: shared id + serialisation for the catalog and order classes.
export default class BaseEntity {
  constructor({ id }) {
    if (new.target === BaseEntity) {
      throw new TypeError('BaseEntity is abstract and cannot be instantiated directly.');
    }
    this.id = id;
  }

  toJSON() {
    return { ...this };
  }
}
