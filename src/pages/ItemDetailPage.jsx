import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES } from '../constants/routes.js';
import { getMenuItemById, getRestaurantById } from '../data/index.js';
import { useCart } from '../context/useCart.js';
import EmptyState from '../components/EmptyState.jsx';

const TOAST_DURATION_MS = 2500;

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [toast, setToast] = useState(null);

  const item = getMenuItemById(id);
  const restaurant = item && getRestaurantById(item.restaurantId);

  // Hide the "added to cart" message after a moment. A new add restarts the timer.
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!item) {
    return (
      <EmptyState
        title={UI_TEXT.detail.notFoundTitle}
        body={UI_TEXT.detail.notFoundBody}
        linkTo={ROUTES.MENU}
        linkText={UI_TEXT.nav.backToMenu}
      />
    );
  }

  // Go back to the menu with its filters still applied; fall back to /menu when opened directly.
  const goBack = () => (location.key !== 'default' ? navigate(-1) : navigate(ROUTES.MENU));

  const handleAdd = () => {
    addItem(item, restaurant);
    setToast({ text: UI_TEXT.detail.addedToast(item.name) });
  };

  return (
    <div className="flex flex-col gap-6">
      <button type="button" onClick={goBack} className="self-start text-sm font-bold hover:text-brand-orange-dark">
        <span aria-hidden="true">← </span>
        {UI_TEXT.nav.backToMenu}
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <img
            src={item.images[activeImage]}
            alt={UI_TEXT.detail.galleryAlt(item.name, activeImage + 1)}
            className="aspect-4/3 w-full rounded-2xl border-2 border-brand-black object-cover bg-brand-grey"
          />
          <div className="grid grid-cols-4 gap-3">
            {item.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-pressed={index === activeImage}
                className={`overflow-hidden rounded-lg border-2 ${
                  index === activeImage ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-brand-black opacity-70 hover:opacity-100'
                }`}
              >
                <img src={image} alt={UI_TEXT.detail.galleryAlt(item.name, index + 1)} className="aspect-4/3 w-full object-cover bg-brand-grey" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-display text-2xl sm:text-3xl font-bold">{item.name}</h1>
          <p className="text-sm" aria-label={UI_TEXT.detail.ratingLabel(item.rating)}>
            <span className="text-brand-yellow" aria-hidden="true">
              {'★'.repeat(Math.round(item.rating))}
            </span>{' '}
            {item.rating}
          </p>
          <p className="text-2xl font-bold text-brand-orange-dark">{item.getFormattedPrice()}</p>
          <p className="leading-relaxed">{item.description}</p>
          {restaurant && (
            <p className="text-sm">
              {UI_TEXT.detail.soldBy} <span className="font-bold">{restaurant.name}</span>
            </p>
          )}
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 rounded-full bg-brand-orange px-8 py-3 font-bold hover:bg-brand-orange-dark hover:text-brand-white sm:self-start"
          >
            {UI_TEXT.detail.addToCart}
          </button>
        </div>
      </div>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-20 flex justify-center px-4">
        {toast && (
          <p className="rounded-full bg-brand-black px-5 py-3 text-sm text-brand-white shadow-lg">
            {toast.text}
          </p>
        )}
      </div>
    </div>
  );
}
