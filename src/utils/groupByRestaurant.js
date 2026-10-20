// Map of restaurantId -> { restaurant, items }, used to render one section per restaurant.
// Shared by Cart and Order so both group items the same way.
export default function groupByRestaurant(items) {
  const groups = new Map();
  items.forEach((item) => {
    if (!groups.has(item.restaurant.id)) {
      groups.set(item.restaurant.id, { restaurant: item.restaurant, items: [] });
    }
    groups.get(item.restaurant.id).items.push(item);
  });
  return groups;
}
