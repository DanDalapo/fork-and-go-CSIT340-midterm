import { useState } from 'react';
import { UI_TEXT } from '../constants/uiText.js';
import { PAYMENT_METHODS, getPaymentLabel } from '../constants/paymentMethods.js';

// Shows the chosen method with a "change" button that opens the radio list.
export default function PaymentMethodPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-bold">{getPaymentLabel(value)}</span>
        <button type="button" onClick={() => setOpen(true)} className="font-bold underline hover:text-brand-orange-dark">
          {UI_TEXT.checkout.change}
        </button>
      </div>
    );
  }

  return (
    <fieldset className="flex flex-col gap-2 text-sm">
      <legend className="sr-only">{UI_TEXT.checkout.paymentMethod}</legend>
      {PAYMENT_METHODS.map((method) => (
        <label
          key={method.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-brand-black px-3 py-2 has-checked:bg-brand-yellow"
        >
          <input
            type="radio"
            name="payment-method"
            value={method.id}
            checked={value === method.id}
            onChange={() => {
              onChange(method.id);
              setOpen(false);
            }}
            className="accent-brand-black"
          />
          {method.label}
        </label>
      ))}
    </fieldset>
  );
}
