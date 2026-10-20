import { Link } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES, itemPath } from '../constants/routes.js';
import { FilterCriteria } from '../models/index.js';
import { categories, restaurants, menuItems, getRestaurantById } from '../data/index.js';
import formatCurrency from '../utils/formatCurrency.js';
import DishCard from '../components/DishCard.jsx';

const POPULAR_COUNT = 3;
const HERO_COUNT = 3;

// Top-rated dishes, used for the hero collage and the "Popular right now" row.
const topRated = new FilterCriteria({ sortBy: FilterCriteria.SORT.TOP_RATED }).apply(menuItems);
const heroDishes = topRated.slice(0, HERO_COUNT);
const popularDishes = topRated.slice(HERO_COUNT, HERO_COUNT + POPULAR_COUNT);

// Link to the menu with one filter already applied, e.g. /menu?category=c2
const menuPathFor = (changes) => {
  const params = new FilterCriteria(changes).toSearchParams().toString();
  return params ? `${ROUTES.MENU}?${params}` : ROUTES.MENU;
};

const primaryButton =
  'inline-block rounded-full bg-brand-orange px-8 py-3 font-bold border-2 border-brand-black shadow-[4px_4px_0_0_var(--color-brand-black)] transition hover:-translate-y-0.5 hover:bg-brand-yellow';

function SectionHeading({ children, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="font-display text-xl sm:text-2xl font-bold">{children}</h2>
      {action}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-14">
      <section className="grid items-center gap-10 pt-4 md:grid-cols-2 md:pt-10">
        <div className="flex flex-col items-start gap-5">
          <p className="rounded-full bg-brand-yellow px-4 py-1 text-xs font-bold uppercase tracking-wide">
            {UI_TEXT.brand.tagline}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <span className="block">{UI_TEXT.landing.headingLine1}</span>
            <span className="block text-brand-orange-dark">{UI_TEXT.landing.headingLine2}</span>
          </h1>
          <p className="max-w-md leading-relaxed">{UI_TEXT.landing.subheading}</p>
          <Link to={ROUTES.MENU} className={primaryButton}>
            {UI_TEXT.landing.cta}
          </Link>
        </div>

        {/* Collage of the three top-rated dishes; decorative, the same dishes are linked below. */}
        <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
          <div className="absolute inset-6 rounded-full bg-brand-orange" />
          {heroDishes.map((dish, index) => (
            <Link
              key={dish.id}
              to={itemPath(dish.id)}
              tabIndex={-1}
              className={`absolute w-1/2 overflow-hidden rounded-2xl border-2 border-brand-black bg-brand-white shadow-[4px_4px_0_0_var(--color-brand-black)] transition hover:z-10 hover:scale-105 ${
                ['left-0 top-4 -rotate-6', 'right-0 top-1/4 rotate-3', 'bottom-0 left-1/4 -rotate-2'][index]
              }`}
            >
              <img src={dish.images[0]} alt="" className="aspect-4/3 w-full object-cover bg-brand-grey" />
              <p className="flex justify-between gap-2 px-3 py-2 text-xs font-bold">
                <span className="truncate">{dish.name}</span>
                <span>{formatCurrency(dish.price)}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>{UI_TEXT.landing.categoriesHeading}</SectionHeading>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={menuPathFor({ categoryId: category.id })}
                className="flex h-full flex-col items-center gap-2 rounded-2xl border-2 border-brand-black p-4 text-center text-sm font-bold transition hover:-translate-y-0.5 hover:bg-brand-yellow"
              >
                <span className="text-3xl" aria-hidden="true">
                  {category.icon}
                </span>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading
          action={
            <Link to={ROUTES.MENU} className="shrink-0 text-sm font-bold underline hover:text-brand-orange-dark">
              {UI_TEXT.landing.seeAll}
            </Link>
          }
        >
          {UI_TEXT.landing.popularHeading}
        </SectionHeading>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDishes.map((item) => (
            <li key={item.id} className="flex">
              <DishCard item={item} restaurant={getRestaurantById(item.restaurantId)} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeading>{UI_TEXT.landing.restaurantsHeading}</SectionHeading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <Link
                to={menuPathFor({ restaurantId: restaurant.id })}
                className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-brand-black transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-brand-black)]"
              >
                <img src={restaurant.image} alt="" loading="lazy" className="aspect-2/1 w-full object-cover bg-brand-grey" />
                <div className="flex flex-1 flex-col gap-1 p-3 text-sm">
                  <h3 className="font-display font-bold">{restaurant.name}</h3>
                  <p>{UI_TEXT.landing.restaurantMeta(restaurant.cuisine, restaurant.rating)}</p>
                  <p className="mt-auto text-xs">
                    {UI_TEXT.cart.deliveryFee}: {formatCurrency(restaurant.deliveryFee)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center gap-4 rounded-2xl border-2 border-brand-black bg-brand-yellow px-6 py-10 text-center">
        <p className="font-display text-2xl font-bold sm:text-3xl">
          {UI_TEXT.landing.headingLine1} {UI_TEXT.landing.headingLine2}
        </p>
        <Link to={ROUTES.MENU} className={primaryButton}>
          {UI_TEXT.landing.cta}
        </Link>
      </section>
    </div>
  );
}
