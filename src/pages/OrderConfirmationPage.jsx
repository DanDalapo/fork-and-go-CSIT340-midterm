import { Link, useParams } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES } from '../constants/routes.js';
import { getPaymentLabel } from '../constants/paymentMethods.js';
import { menuItems, getRestaurantById } from '../data/index.js';
import { useCart } from '../context/useCart.js';
import formatCurrency from '../utils/formatCurrency.js';
import EmptyState from '../components/EmptyState.jsx';
import OrderItemsList from '../components/OrderItemsList.jsx';
import TotalsList from '../components/TotalsList.jsx';
import DishCard from '../components/DishCard.jsx';

const RECOMMENDATION_COUNT = 3;

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { getOrderById } = useCart();
  const order = getOrderById(id);

  // Orders live in memory only, so a page refresh clears them.
  if (!order) {
    return (
      <EmptyState
        title={UI_TEXT.confirmation.notFoundTitle}
        body={UI_TEXT.confirmation.notFoundBody}
        linkTo={ROUTES.MENU}
        linkText={UI_TEXT.nav.backToMenu}
      />
    );
  }

  // Suggest dishes like the first one ordered, skipping anything already in this order.
  const orderedIds = new Set(order.items.map((item) => item.menuItem.id));
  const recommended = order.items[0].menuItem.getRecommended(
    menuItems.filter((item) => !orderedIds.has(item.id)),
    RECOMMENDATION_COUNT
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border-2 border-brand-black bg-brand-yellow/30 p-6 text-center">
        <p className="mb-3 inline-block rounded-full bg-brand-black px-4 py-1 text-xs text-brand-white">
          {order.getStatusLabel()}
        </p>
        <h1 className="font-display text-xl sm:text-2xl font-bold leading-snug">{UI_TEXT.confirmation.message(order.id)}</h1>
      </section>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border-2 border-brand-black p-4">
          <h2 className="mb-3 font-display font-bold text-brand-orange-dark">{UI_TEXT.checkout.foodOrders}</h2>
          <OrderItemsList groups={order.getGroupedByRestaurant()} />
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border-2 border-brand-black p-4 text-sm leading-relaxed">
            <h2 className="mb-2 font-display font-bold text-brand-orange-dark">{UI_TEXT.checkout.deliveryAddress}</h2>
            <p className="font-bold">{order.delivery.fullName}</p>
            <p>{order.delivery.phone}</p>
            <p>{order.delivery.address}</p>
          </section>
          <section className="rounded-2xl border-2 border-brand-black p-4 text-sm">
            <h2 className="mb-2 font-display font-bold text-brand-orange-dark">{UI_TEXT.checkout.paymentMethod}</h2>
            <p className="mb-4 font-bold">{getPaymentLabel(order.paymentMethod)}</p>
            <TotalsList
              rows={[
                { label: UI_TEXT.checkout.merchandiseSubtotal, value: formatCurrency(order.getSubtotal()) },
                { label: UI_TEXT.checkout.shippingSubtotal, value: formatCurrency(order.getDeliveryFee()) },
                { label: UI_TEXT.checkout.totalPayment, value: formatCurrency(order.getTotal()), strong: true },
              ]}
            />
          </section>
        </div>
      </div>

      {recommended.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold">{UI_TEXT.confirmation.nextOrder}</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((item) => (
              <li key={item.id} className="flex">
                <DishCard item={item} restaurant={getRestaurantById(item.restaurantId)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        to={ROUTES.MENU}
        className="self-center rounded-full bg-brand-orange px-8 py-3 font-bold hover:bg-brand-orange-dark hover:text-brand-white"
      >
        {UI_TEXT.nav.backToMenu}
      </Link>
    </div>
  );
}
