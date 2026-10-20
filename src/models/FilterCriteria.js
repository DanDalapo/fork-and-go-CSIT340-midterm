import { SEARCH_PARAM } from '../constants/routes.js';

export default class FilterCriteria {
  static SORT = {
    DEFAULT: 'default',
    PRICE_LOW: 'price-asc',
    PRICE_HIGH: 'price-desc',
    TOP_RATED: 'rating',
    NAME: 'name',
  };

  // URL query keys, so filters survive navigation (going back from a dish keeps them).
  static PARAMS = {
    searchText: SEARCH_PARAM,
    categoryId: 'category',
    restaurantId: 'restaurant',
    maxPrice: 'maxPrice',
    sortBy: 'sort',
  };

  // Builds criteria from the URL, ignoring values that don't make sense.
  static fromSearchParams(params) {
    const keys = FilterCriteria.PARAMS;
    const maxPrice = Number(params.get(keys.maxPrice));
    const sortBy = params.get(keys.sortBy);
    return new FilterCriteria({
      searchText: params.get(keys.searchText) ?? '',
      categoryId: params.get(keys.categoryId) ?? '',
      restaurantId: params.get(keys.restaurantId) ?? '',
      maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : null,
      sortBy: Object.values(FilterCriteria.SORT).includes(sortBy) ? sortBy : FilterCriteria.SORT.DEFAULT,
    });
  }

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

  // Only non-default values go in the URL, so a cleared filter gives a clean /menu.
  toSearchParams() {
    const keys = FilterCriteria.PARAMS;
    const params = new URLSearchParams();
    if (this.searchText.trim()) params.set(keys.searchText, this.searchText.trim());
    if (this.categoryId) params.set(keys.categoryId, this.categoryId);
    if (this.restaurantId) params.set(keys.restaurantId, this.restaurantId);
    if (this.maxPrice !== null) params.set(keys.maxPrice, String(this.maxPrice));
    if (this.sortBy !== FilterCriteria.SORT.DEFAULT) params.set(keys.sortBy, this.sortBy);
    return params;
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
