// Every visible string in the app lives here. Components import UI_TEXT and never contain raw text.

export const UI_TEXT = {
  brand: {
    name: 'Fork & GO',
    tagline: 'Fast Delivery',
    logoAlt: 'Fork & GO logo',
  },

  nav: {
    searchPlaceholder: 'search',
    searchLabel: 'Search',
    cartLabel: 'Open cart',
    cartPageTitle: 'Food cart',
    checkoutPageTitle: 'Checkout',
    backToMenu: 'Back to menu',
  },

  landing: {
    headingLine1: 'Order Fresh Food',
    headingLine2: 'at Your Doorstep',
    cta: 'Order Now',
  },

  home: {
    heading: 'Welcome! What are you craving today?',
    allCategories: 'All',
    allRestaurants: 'All restaurants',
    restaurantLabel: 'Restaurant',
    sortLabel: 'Sort by',
    maxPriceLabel: 'Max price',
    clearFilters: 'Clear filters',
    resultsCount: (count) => `${count} ${count === 1 ? 'item' : 'items'} found`,
    noResultsTitle: 'No dishes match your search',
    noResultsBody: 'Try a different keyword or clear the filters.',
    fromRestaurant: 'from',
  },

  sortLabels: {
    default: 'Recommended',
    'price-asc': 'Price: low to high',
    'price-desc': 'Price: high to low',
    rating: 'Top rated',
    name: 'Name (A-Z)',
  },

  detail: {
    addToCart: 'Add to cart',
    addedToast: (name) => `${name} was added to your cart`,
    soldBy: 'Sold by',
    ratingLabel: (rating) => `${rating} out of 5 stars`,
    galleryAlt: (name, index) => `${name} photo ${index}`,
    notFoundTitle: 'Dish not found',
    notFoundBody: 'This dish is no longer on the menu.',
  },

  cart: {
    selectAll: 'Select all',
    remove: 'Remove',
    price: 'Price',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery fee',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    select: (name) => `Select ${name}`,
    total: (count) => `Total (${count} ${count === 1 ? 'Item' : 'Items'}):`,
    checkout: 'Check out',
    selectItemsHint: 'Select at least one item to check out.',
    emptyTitle: 'Your cart is empty',
    emptyBody: 'Add something tasty to get started.',
    browseMenu: 'Browse the menu',
  },

  checkout: {
    deliveryAddress: 'Delivery Address',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    fields: {
      fullName: 'Full name',
      phone: 'Phone number',
      address: 'Address',
    },
    errors: {
      fullName: 'Please enter your full name.',
      phone: 'Please enter a valid phone number.',
      address: 'Please enter your delivery address.',
    },
    foodOrders: 'Food Orders',
    price: 'Price',
    quantity: 'Quantity',
    subtotal: 'Subtotal',
    paymentMethod: 'Payment Method',
    change: 'change',
    merchandiseSubtotal: 'Merchandise Subtotal',
    shippingSubtotal: 'Shipping Subtotal',
    totalPayment: 'Total Payment:',
    placeOrder: 'Place order',
    nothingSelectedTitle: 'Nothing to check out yet',
    nothingSelectedBody: 'Select items in your cart first.',
    backToCart: 'Back to cart',
  },

  confirmation: {
    message: (orderId) =>
      `Good news! Your order #${orderId} is in! We'll notify you as soon as it's out for delivery`,
    nextOrder: 'For your next order:',
    notFoundTitle: 'Order not found',
    notFoundBody: 'We could not find that order. It may have been cleared when the page was refreshed.',
  },

  orderStatus: {
    placed: 'Order placed',
    preparing: 'Preparing your food',
    out_for_delivery: 'Out for delivery',
    delivered: 'Delivered',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for does not exist.',
    cta: 'Back to home',
  },
};

export default UI_TEXT;
