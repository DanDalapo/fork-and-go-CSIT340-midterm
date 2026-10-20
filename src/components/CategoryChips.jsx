import { UI_TEXT } from '../constants/uiText.js';

// Row of category toggle buttons; '' means "All". Scrolls sideways on small screens.
export default function CategoryChips({ categories, selectedId, onSelect }) {
  const chips = [{ id: '', name: UI_TEXT.home.allCategories, icon: '' }, ...categories];

  return (
    <div role="group" aria-label={UI_TEXT.home.categoriesLabel} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {chips.map((category) => {
        const active = category.id === selectedId;
        return (
          <button
            key={category.id || 'all'}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(category.id)}
            className={`shrink-0 rounded-full border-2 border-brand-black px-4 py-1.5 text-sm transition ${
              active ? 'bg-brand-black text-brand-white' : 'bg-brand-white hover:bg-brand-yellow'
            }`}
          >
            {category.icon && <span aria-hidden="true" className="mr-1">{category.icon}</span>}
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
