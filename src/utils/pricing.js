// Shared by Cart and Order so both always calculate totals the same way.

export function sumSubtotal(items) {
  return items.reduce((total, item) => total + item.getSubtotal(), 0);
}

// One delivery fee per distinct restaurant (each restaurant delivers separately).
export function sumDeliveryFees(items) {
  const feeByRestaurant = new Map();
  items.forEach((item) => {
    feeByRestaurant.set(item.restaurant.id, item.restaurant.deliveryFee);
  });
  let total = 0;
  feeByRestaurant.forEach((fee) => {
    total += fee;
  });
  return total;
}
