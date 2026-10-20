import { Link, useNavigate } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES, itemPath } from '../constants/routes.js';
import { useCart } from '../context/useCart.js';
import formatCurrency from '../utils/formatCurrency.js';
import EmptyState from '../components/EmptyState.jsx';
import QuantityControl from '../components/QuantityControl.jsx';
import TotalsList from '../components/TotalsList.jsx';

export default function CartPage() {
  const { cart, increase, decrease, toggleItem, toggleAll, removeItem } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <EmptyState
        title={UI_TEXT.cart.emptyTitle}
        body={UI_TEXT.cart.emptyBody}
        linkTo={ROUTES.MENU}
        linkText={UI_TEXT.cart.browseMenu}
      />
    );
  }

  const groups = [...cart.getGroupedByRestaurant().values()];
  const selectedCount = cart.getSelectedCount();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">{UI_TEXT.nav.cartPageTitle}</h1>

      <label className="flex items-center gap-2 text-sm font-bold">
        <input
          type="checkbox"
          checked={cart.areAllSelected()}
          onChange={(event) => toggleAll(event.target.checked)}
          className="size-5 accent-brand-orange"
        />
        {UI_TEXT.cart.selectAll}
      </label>

      {groups.map(({ restaurant, items }) => (
        <section key={restaurant.id} className="rounded-2xl border-2 border-brand-black">
          <header className="flex flex-wrap justify-between gap-2 border-b-2 border-brand-black bg-brand-grey/40 px-4 py-2 rounded-t-2xl">
            <h2 className="font-display font-bold">{restaurant.name}</h2>
            <span className="text-sm">
              {UI_TEXT.cart.deliveryFee}: {formatCurrency(restaurant.deliveryFee)}
            </span>
          </header>

          <ul className="divide-y divide-brand-grey">
            {items.map((item) => (
              <li key={item.menuItem.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleItem(item.menuItem.id)}
                  aria-label={UI_TEXT.cart.select(item.menuItem.name)}
                  className="size-5 accent-brand-orange"
                />
                <img src={item.menuItem.images[0]} alt="" className="size-16 rounded-lg object-cover bg-brand-grey" />
                <div className="min-w-32 flex-1">
                  <Link to={itemPath(item.menuItem.id)} className="font-bold hover:text-brand-orange-dark">
                    {item.menuItem.name}
                  </Link>
                  <p className="text-sm">{item.menuItem.getFormattedPrice()}</p>
                </div>
                <div className="ml-auto flex items-center gap-4 sm:ml-0">
                  <QuantityControl
                    quantity={item.quantity}
                    onDecrease={() => decrease(item.menuItem.id)}
                    onIncrease={() => increase(item.menuItem.id)}
                  />
                  <span className="w-20 text-right font-bold">{formatCurrency(item.getSubtotal())}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.menuItem.id)}
                    className="text-sm underline hover:text-brand-orange-dark"
                  >
                    {UI_TEXT.cart.remove}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="sticky bottom-0 -mx-4 border-t-2 border-brand-black bg-brand-white px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="sm:w-80">
            <TotalsList
              rows={[
                { label: UI_TEXT.cart.subtotal, value: formatCurrency(cart.getSubtotal()) },
                { label: UI_TEXT.cart.deliveryFee, value: formatCurrency(cart.getDeliveryFee()) },
                { label: UI_TEXT.cart.total(selectedCount), value: formatCurrency(cart.getTotal()), strong: true },
              ]}
            />
          </div>
          <div className="flex flex-col items-stretch gap-1 sm:items-end">
            <button
              type="button"
              onClick={() => navigate(ROUTES.CHECKOUT)}
              disabled={selectedCount === 0}
              className="rounded-full bg-brand-orange px-8 py-3 font-bold hover:bg-brand-orange-dark hover:text-brand-white disabled:cursor-not-allowed disabled:bg-brand-grey disabled:text-brand-black"
            >
              {UI_TEXT.cart.checkout}
            </button>
            {selectedCount === 0 && <p className="text-xs">{UI_TEXT.cart.selectItemsHint}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
