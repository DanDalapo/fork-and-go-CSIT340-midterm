// Demo only: no real payment is processed.
export const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'gcash', label: 'GCash' },
  { id: 'card', label: 'Credit / Debit Card' },
];

export const DEFAULT_PAYMENT_METHOD = 'cod';

export const getPaymentLabel = (id) =>
  PAYMENT_METHODS.find((method) => method.id === id)?.label ?? id;
