import { Link } from 'react-router-dom';

// Centered message with an optional action: empty cart, dish/order not found, no search results, 404, etc.
// Pass linkTo + linkText for a link, or children for a custom action (like a button).
export default function EmptyState({ title, body, linkTo, linkText, children }) {
  return (
    <section className="py-16 text-center">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">{title}</h1>
      <p className="mt-3">{body}</p>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-block mt-6 rounded-full bg-brand-orange px-6 py-2 font-bold hover:bg-brand-orange-dark hover:text-brand-white"
        >
          {linkText}
        </Link>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
