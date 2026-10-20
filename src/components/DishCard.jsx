import { Link } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { itemPath } from '../constants/routes.js';

export default function DishCard({ item, restaurant }) {
  return (
    <Link
      to={itemPath(item.id)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border-2 border-brand-black bg-brand-white transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-brand-black)]"
    >
      <img
        src={item.images[0]}
        alt={UI_TEXT.detail.galleryAlt(item.name, 1)}
        loading="lazy"
        className="aspect-4/3 w-full object-cover bg-brand-grey"
      />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="font-display font-bold leading-snug group-hover:text-brand-orange-dark">{item.name}</h2>
        {restaurant && (
          <p className="text-xs">
            {UI_TEXT.home.fromRestaurant} {restaurant.name}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-bold">{item.getFormattedPrice()}</span>
          <span className="text-sm" aria-label={UI_TEXT.detail.ratingLabel(item.rating)}>
            <span className="text-brand-yellow" aria-hidden="true">★</span> {item.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
