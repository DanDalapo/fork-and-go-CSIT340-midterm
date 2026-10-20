import { UI_TEXT } from '../constants/uiText.js';

const buttonClass =
  'size-8 rounded-full border-2 border-brand-black font-bold hover:bg-brand-yellow disabled:opacity-40 disabled:hover:bg-transparent';

// − 2 + stepper. The minus button is disabled at 1; use Remove to take an item out.
export default function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onDecrease} disabled={quantity <= 1} aria-label={UI_TEXT.cart.decrease} className={buttonClass}>
        −
      </button>
      <span className="w-6 text-center font-bold" aria-live="polite">
        {quantity}
      </span>
      <button type="button" onClick={onIncrease} aria-label={UI_TEXT.cart.increase} className={buttonClass}>
        +
      </button>
    </div>
  );
}
