export default class FilterCriteria {
  static SORT = {
    DEFAULT: 'default',
    PRICE_LOW: 'price-asc',
    PRICE_HIGH: 'price-desc',
    TOP_RATED: 'rating',
    NAME: 'name',
  };

  constructor({
    searchText = '',
    categoryId = '',
    restaurantId = '',
    maxPrice = null,
    sortBy = FilterCriteria.SORT.DEFAULT,
  } = {}) {
    this.searchText = searchText;
    this.categoryId = categoryId;
    this.restaurantId = restaurantId;
    this.maxPrice = maxPrice;
    this.sortBy = sortBy;
  }

  reset() {
    this.searchText = '';
    this.categoryId = '';
    this.restaurantId = '';
    this.maxPrice = null;
    this.sortBy = FilterCriteria.SORT.DEFAULT;
  }

  // Returns a NEW instance, which is what React state needs: setFilter(filter.update({ categoryId }))
  update(changes) {
    return new FilterCriteria({ ...this, ...changes });
  }

  // True when anything differs from the defaults (used to show a "Clear filters" button).
  isActive() {
    return Boolean(
      this.searchText.trim() ||
        this.categoryId ||
        this.restaurantId ||
        this.maxPrice !== null ||
        this.sortBy !== FilterCriteria.SORT.DEFAULT
    );
  }

  apply(items) {
    const results = items.filter((item) => item.matches(this));
    const sorters = {
      [FilterCriteria.SORT.PRICE_LOW]: (a, b) => a.price - b.price,
      [FilterCriteria.SORT.PRICE_HIGH]: (a, b) => b.price - a.price,
      [FilterCriteria.SORT.TOP_RATED]: (a, b) => b.rating - a.rating,
      [FilterCriteria.SORT.NAME]: (a, b) => a.name.localeCompare(b.name),
    };
    const sorter = sorters[this.sortBy];
    return sorter ? results.sort(sorter) : results;
  }
}
