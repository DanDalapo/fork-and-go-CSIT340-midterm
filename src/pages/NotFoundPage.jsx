import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES } from '../constants/routes.js';
import EmptyState from '../components/EmptyState.jsx';

export default function NotFoundPage() {
  return (
    <EmptyState
      title={UI_TEXT.notFound.title}
      body={UI_TEXT.notFound.body}
      linkTo={ROUTES.LANDING}
      linkText={UI_TEXT.notFound.cta}
    />
  );
}
