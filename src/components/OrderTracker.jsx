import { UI_TEXT } from '../constants/uiText.js';
import { Order } from '../models/index.js';

// Four-step progress bar: placed -> preparing -> out for delivery -> delivered.
export default function OrderTracker({ order }) {
  const current = order.getStatusStep();
  const progress = (current / (Order.STATUS_FLOW.length - 1)) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        {/* Track runs between the centers of the first and last circles. */}
        <div className="absolute left-[12.5%] right-[12.5%] top-5 h-1 rounded-full bg-brand-grey" aria-hidden="true">
          <div
            className="h-full rounded-full bg-brand-orange-dark transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ol aria-label={UI_TEXT.confirmation.trackerLabel} className="relative grid grid-cols-4">
          {Order.STATUS_FLOW.map((status, index) => {
            const done = index <= current;
            return (
              <li
                key={status}
                aria-current={index === current ? 'step' : undefined}
                className="flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-full border-2 border-brand-black text-lg transition-colors duration-500 ${
                    done ? 'bg-brand-yellow' : 'bg-brand-white grayscale'
                  } ${index === current ? 'motion-safe:animate-bounce' : ''}`}
                  aria-hidden="true"
                >
                  {UI_TEXT.orderStatusIcons[status]}
                </span>
                <span className={`text-xs leading-tight sm:text-sm ${done ? 'font-bold' : 'opacity-60'}`}>
                  {UI_TEXT.orderStatus[status]}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <p key={order.status} aria-live="polite" className="text-center text-sm motion-safe:animate-fade-in">
        {UI_TEXT.orderStatusDetails[order.status]}
      </p>
    </div>
  );
}
