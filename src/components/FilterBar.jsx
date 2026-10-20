import { UI_TEXT } from '../constants/uiText.js';
import FilterCriteria from '../models/FilterCriteria.js';
import formatCurrency from '../utils/formatCurrency.js';

const selectClass =
  'w-full rounded-lg border-2 border-brand-black bg-brand-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-orange';

// Restaurant, max price and sort dropdowns. Calls onChange with only the field that changed.
export default function FilterBar({ filter, restaurants, priceOptions, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <label className="text-sm">
        <span className="mb-1 block font-bold">{UI_TEXT.home.restaurantLabel}</span>
        <select
          value={filter.restaurantId}
          onChange={(event) => onChange({ restaurantId: event.target.value })}
          className={selectClass}
        >
          <option value="">{UI_TEXT.home.allRestaurants}</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-bold">{UI_TEXT.home.maxPriceLabel}</span>
        <select
          value={filter.maxPrice ?? ''}
          onChange={(event) => onChange({ maxPrice: event.target.value ? Number(event.target.value) : null })}
          className={selectClass}
        >
          <option value="">{UI_TEXT.home.anyPrice}</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {formatCurrency(price)}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block font-bold">{UI_TEXT.home.sortLabel}</span>
        <select
          value={filter.sortBy}
          onChange={(event) => onChange({ sortBy: event.target.value })}
          className={selectClass}
        >
          {Object.values(FilterCriteria.SORT).map((sort) => (
            <option key={sort} value={sort}>
              {UI_TEXT.sortLabels[sort]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
