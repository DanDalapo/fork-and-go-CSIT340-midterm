import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { FilterCriteria } from '../models/index.js';
import { categories, restaurants, menuItems, getRestaurantById } from '../data/index.js';
import WelcomeBanner from '../components/WelcomeBanner.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import FilterBar from '../components/FilterBar.jsx';
import DishCard from '../components/DishCard.jsx';
import EmptyState from '../components/EmptyState.jsx';

// Max price choices in steps of 50 between the cheapest and priciest dish (e.g. 100, 150 ... 350).
const PRICE_STEP = 50;
const prices = menuItems.map((item) => item.price);
const PRICE_OPTIONS = [];
for (
  let price = Math.ceil(Math.min(...prices) / PRICE_STEP) * PRICE_STEP;
  price < Math.max(...prices);
  price += PRICE_STEP
) {
  PRICE_OPTIONS.push(price);
}

export default function HomePage() {
  // The URL is the source of truth for filters (the navbar search writes ?q= too).
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = useMemo(() => FilterCriteria.fromSearchParams(searchParams), [searchParams]);
  const results = useMemo(() => filter.apply(menuItems), [filter]);

  const updateFilter = (changes) => setSearchParams(filter.update(changes).toSearchParams(), { replace: true });
  const clearFilters = () => setSearchParams(new URLSearchParams(), { replace: true });

  const clearButton = (
    <button
      type="button"
      onClick={clearFilters}
      className="rounded-full border-2 border-brand-black px-4 py-1.5 text-sm font-bold hover:bg-brand-yellow"
    >
      {UI_TEXT.home.clearFilters}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <WelcomeBanner filter={filter} />

      <CategoryChips
        categories={categories}
        selectedId={filter.categoryId}
        onSelect={(categoryId) => updateFilter({ categoryId })}
      />

      <FilterBar filter={filter} restaurants={restaurants} priceOptions={PRICE_OPTIONS} onChange={updateFilter} />

      <div className="flex min-h-9 items-center justify-between gap-4">
        <p className="text-sm" aria-live="polite">
          {UI_TEXT.home.resultsCount(results.length)}
        </p>
        {filter.isActive() && clearButton}
      </div>

      {results.length === 0 ? (
        <EmptyState title={UI_TEXT.home.noResultsTitle} body={UI_TEXT.home.noResultsBody}>
          {clearButton}
        </EmptyState>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <li key={item.id} className="flex">
              <DishCard item={item} restaurant={getRestaurantById(item.restaurantId)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
