import { Link } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES } from '../constants/routes.js';

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-orange sm:text-9xl" aria-hidden="true">
        {UI_TEXT.notFound.code}
      </p>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{UI_TEXT.notFound.title}</h1>
      <p>{UI_TEXT.notFound.body}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <Link
          to={ROUTES.LANDING}
          className="rounded-full bg-brand-orange px-6 py-2 font-bold hover:bg-brand-orange-dark hover:text-brand-white"
        >
          {UI_TEXT.notFound.cta}
        </Link>
        <Link to={ROUTES.MENU} className="rounded-full border-2 border-brand-black px-6 py-2 font-bold hover:bg-brand-yellow">
          {UI_TEXT.cart.browseMenu}
        </Link>
      </div>
    </section>
  );
}
