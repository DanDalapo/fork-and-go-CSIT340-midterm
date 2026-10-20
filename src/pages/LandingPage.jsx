import { Link } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES } from '../constants/routes.js';

// Placeholder: full landing design comes in a later step.
export default function LandingPage() {
  return (
    <section className="py-12 text-center">
      <h1 className="font-display text-3xl sm:text-5xl font-bold">
        <span className="block">{UI_TEXT.landing.headingLine1}</span>
        <span className="block text-brand-orange-dark">{UI_TEXT.landing.headingLine2}</span>
      </h1>
      <Link
        to={ROUTES.MENU}
        className="inline-block mt-8 rounded-full bg-brand-orange px-8 py-3 font-bold hover:bg-brand-orange-dark hover:text-brand-white"
      >
        {UI_TEXT.landing.cta}
      </Link>
    </section>
  );
}
