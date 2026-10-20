import { UI_TEXT } from '../constants/uiText.js';
import formatCurrency from '../utils/formatCurrency.js';

// Read-only list of items grouped by restaurant (checkout and order confirmation).
// `groups` is the Map from Cart/Order.getGroupedByRestaurant().
export default function OrderItemsList({ groups }) {
  return (
    <div className="flex flex-col gap-4">
      {[...groups.values()].map(({ restaurant, items }) => (
        <div key={restaurant.id}>
          <div className="flex justify-between gap-4 border-b-2 border-brand-black pb-1 text-sm">
            <h3 className="font-display font-bold">{restaurant.name}</h3>
            <span>
              {UI_TEXT.cart.deliveryFee}: {formatCurrency(restaurant.deliveryFee)}
            </span>
          </div>

          <div className="hidden grid-cols-[1fr_6rem_5rem_6rem] gap-2 pt-2 text-xs font-bold sm:grid">
            <span />
            <span className="text-right">{UI_TEXT.checkout.price}</span>
            <span className="text-center">{UI_TEXT.checkout.quantity}</span>
            <span className="text-right">{UI_TEXT.checkout.subtotal}</span>
          </div>

          <ul>
            {items.map((item) => (
              <li
                key={item.menuItem.id}
                className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1 py-2 text-sm sm:grid-cols-[1fr_6rem_5rem_6rem]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img src={item.menuItem.images[0]} alt="" className="size-12 shrink-0 rounded-lg object-cover bg-brand-grey" />
                  <span className="font-bold">{item.menuItem.name}</span>
                </div>
                <span className="text-right">
                  <span className="sm:hidden">{item.quantity} × </span>
                  {item.menuItem.getFormattedPrice()}
                </span>
                <span className="hidden text-center sm:block">{item.quantity}</span>
                <span className="col-span-2 text-right font-bold sm:col-span-1">{formatCurrency(item.getSubtotal())}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
