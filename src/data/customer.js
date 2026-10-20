import DeliveryInfo from '../models/DeliveryInfo.js';

// Pre-filled delivery details (matches the checkout wireframe). The user can edit them at checkout.
const defaultDeliveryInfo = new DeliveryInfo({
  fullName: 'John Doe',
  phone: '(+00) 123 156 4352',
  address: '123 Playground Street',
});

export default defaultDeliveryInfo;
