import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UI_TEXT } from '../constants/uiText.js';
import { ROUTES, orderPath } from '../constants/routes.js';
import { DEFAULT_PAYMENT_METHOD } from '../constants/paymentMethods.js';
import { defaultDeliveryInfo } from '../data/index.js';
import { useCart } from '../context/useCart.js';
import formatCurrency from '../utils/formatCurrency.js';
import EmptyState from '../components/EmptyState.jsx';
import DeliveryAddress from '../components/DeliveryAddress.jsx';
import OrderItemsList from '../components/OrderItemsList.jsx';
import PaymentMethodPicker from '../components/PaymentMethodPicker.jsx';
import TotalsList from '../components/TotalsList.jsx';

function Section({ title, children }) {
  return (
    <section className="rounded-2xl border-2 border-brand-black p-4">
      <h2 className="mb-3 font-display font-bold text-brand-orange-dark">{title}</h2>
      {children}
    </section>
  );
}

export default function CheckoutPage() {
  const { cart, placeOrder } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState(defaultDeliveryInfo);
  const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD);
  const [error, setError] = useState('');

  if (cart.getSelectedItems().length === 0) {
    return (
      <EmptyState
        title={UI_TEXT.checkout.nothingSelectedTitle}
        body={UI_TEXT.checkout.nothingSelectedBody}
        linkTo={ROUTES.CART}
        linkText={UI_TEXT.checkout.backToCart}
      />
    );
  }

  const handlePlaceOrder = () => {
    try {
      const order = placeOrder(delivery, paymentMethod);
      navigate(orderPath(order.id));
    } catch {
      setError(UI_TEXT.checkout.errors.orderFailed);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl sm:text-3xl font-bold">{UI_TEXT.nav.checkoutPageTitle}</h1>

      <Section title={UI_TEXT.checkout.deliveryAddress}>
        <DeliveryAddress delivery={delivery} onSave={setDelivery} />
      </Section>

      <Section title={UI_TEXT.checkout.foodOrders}>
        <OrderItemsList groups={cart.getGroupedByRestaurant(true)} />
      </Section>

      <Section title={UI_TEXT.checkout.paymentMethod}>
        <PaymentMethodPicker value={paymentMethod} onChange={setPaymentMethod} />
      </Section>

      <div className="flex flex-col gap-4 rounded-2xl border-2 border-brand-black p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="sm:w-80">
          <TotalsList
            rows={[
              { label: UI_TEXT.checkout.merchandiseSubtotal, value: formatCurrency(cart.getSubtotal()) },
              { label: UI_TEXT.checkout.shippingSubtotal, value: formatCurrency(cart.getDeliveryFee()) },
              { label: UI_TEXT.checkout.totalPayment, value: formatCurrency(cart.getTotal()), strong: true },
            ]}
          />
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="rounded-full bg-brand-orange px-8 py-3 font-bold hover:bg-brand-orange-dark hover:text-brand-white"
          >
            {UI_TEXT.checkout.placeOrder}
          </button>
          {error && (
            <p role="alert" className="text-sm text-brand-orange-dark">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
