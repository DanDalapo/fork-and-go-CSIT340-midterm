// One place for price formatting, so components never build "₱" strings by hand.
const formatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function formatCurrency(amount) {
  return formatter.format(amount);
}
