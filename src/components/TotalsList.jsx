// Label / amount rows, e.g. Subtotal, Delivery fee, Total. The row marked `strong` is the grand total.
export default function TotalsList({ rows }) {
  return (
    <dl className="flex flex-col gap-2 text-sm">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`flex justify-between gap-4 ${row.strong ? 'border-t-2 border-brand-black pt-2 text-base font-bold' : ''}`}
        >
          <dt>{row.label}</dt>
          <dd className={row.strong ? 'text-brand-orange-dark' : ''}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
