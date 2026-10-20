import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES, SEARCH_PARAM } from '../constants/routes.js';
import { useCart } from '../context/useCart.js';

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get(SEARCH_PARAM) ?? '';
  const itemCount = cart.getItemCount();

  // On the menu page, keep the other filters; from anywhere else, start a fresh search.
  const handleSearch = (event) => {
    event.preventDefault();
    const text = new FormData(event.currentTarget).get(SEARCH_PARAM).trim();
    const params = new URLSearchParams(pathname === ROUTES.MENU ? searchParams : undefined);
    if (text) params.set(SEARCH_PARAM, text);
    else params.delete(SEARCH_PARAM);
    navigate({ pathname: ROUTES.MENU, search: params.toString() });
  };

  return (
    <header className="bg-brand-orange">
      <nav className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to={ROUTES.LANDING} className="shrink-0 leading-tight">
          <span className="block font-display font-bold text-lg sm:text-xl">{UI_TEXT.brand.name}</span>
          <span className="block text-xs">{UI_TEXT.brand.tagline}</span>
        </Link>

        <form role="search" onSubmit={handleSearch} className="flex-1 max-w-md ml-auto">
          <label htmlFor="navbar-search" className="sr-only">
            {UI_TEXT.nav.searchLabel}
          </label>
          {/* key resets the field when the URL search changes (e.g. after "Clear filters"). */}
          <input
            key={currentSearch}
            id="navbar-search"
            name={SEARCH_PARAM}
            type="search"
            defaultValue={currentSearch}
            placeholder={UI_TEXT.nav.searchPlaceholder}
            className="w-full rounded-full bg-brand-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-black"
          />
        </form>

        <Link
          to={ROUTES.CART}
          aria-label={UI_TEXT.nav.cartLabel}
          className="relative shrink-0 p-2 rounded-full hover:bg-brand-orange-dark/20"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-brand-yellow text-xs font-bold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
