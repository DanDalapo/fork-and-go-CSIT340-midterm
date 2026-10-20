import { useState } from 'react';
import { UI_TEXT } from '../constants/uiText.js';
import { DeliveryInfo } from '../models/index.js';

const FIELDS = [
  { name: 'fullName', type: 'text', autoComplete: 'name' },
  { name: 'phone', type: 'tel', autoComplete: 'tel' },
  { name: 'address', type: 'text', autoComplete: 'street-address' },
];

// Shows the delivery details with an Edit button; Save only goes through when every field is valid.
export default function DeliveryAddress({ delivery, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(delivery);
  const [errors, setErrors] = useState({});

  const startEditing = () => {
    setDraft(delivery);
    setErrors({});
    setEditing(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = new DeliveryInfo(draft);
    const nextErrors = next.getErrors();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(next);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm leading-relaxed">
          <p className="font-bold">{delivery.fullName}</p>
          <p>{delivery.phone}</p>
          <p>{delivery.address}</p>
        </div>
        <button type="button" onClick={startEditing} className="text-sm font-bold underline hover:text-brand-orange-dark">
          {UI_TEXT.checkout.edit}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {FIELDS.map((field) => {
        const id = `delivery-${field.name}`;
        const hasError = Boolean(errors[field.name]);
        return (
          <div key={field.name} className="text-sm">
            <label htmlFor={id} className="mb-1 block font-bold">
              {UI_TEXT.checkout.fields[field.name]}
            </label>
            <input
              id={id}
              type={field.type}
              autoComplete={field.autoComplete}
              value={draft[field.name]}
              onChange={(event) => setDraft({ ...draft, [field.name]: event.target.value })}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : undefined}
              className={`w-full rounded-lg border-2 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-orange ${
                hasError ? 'border-brand-orange-dark' : 'border-brand-black'
              }`}
            />
            {hasError && (
              <p id={`${id}-error`} className="mt-1 text-brand-orange-dark">
                {UI_TEXT.checkout.errors[field.name]}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex gap-3">
        <button type="submit" className="rounded-full bg-brand-orange px-6 py-2 text-sm font-bold hover:bg-brand-orange-dark hover:text-brand-white">
          {UI_TEXT.checkout.save}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-full border-2 border-brand-black px-6 py-2 text-sm font-bold hover:bg-brand-yellow"
        >
          {UI_TEXT.checkout.cancel}
        </button>
      </div>
    </form>
  );
}
