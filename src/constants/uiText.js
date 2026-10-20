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
    subheading: 'Dishes from your favorite local restaurants, all in one cart and delivered hot.',
    categoriesHeading: 'Browse by category',
    popularHeading: 'Popular right now',
    restaurantsHeading: 'Our restaurants',
    seeAll: 'See all dishes',
    restaurantMeta: (cuisine, rating) => `${cuisine} · ★ ${rating}`,
  },

  home: {
    // Greeting changes with the time of day (see utils/timeOfDay.js).
    greetings: {
      morning: (name) => `Good morning, ${name}! ☀️`,
      afternoon: (name) => `Good afternoon, ${name}! 🌤️`,
      evening: (name) => `Good evening, ${name}! 🌆`,
      night: (name) => `Late-night cravings, ${name}? 🌙`,
    },
    // The line under the greeting reacts to the current search/filter; one of `prompts` shows otherwise.
    prompts: [
      'What are you craving today?',
      "Hungry? Let's fix that.",
      'Something cheesy or something sweet?',
      'Your next favorite dish is one click away.',
    ],
    searchPrompt: (text) => `Looking for "${text}"? Here's what we found.`,
    categoryPrompt: (icon, name) => `Craving ${icon} ${name}? Great choice.`,
    restaurantPrompt: (name) => `Fresh from the kitchen at ${name}.`,
    categoriesLabel: 'Categories',
    allCategories: 'All',
    allRestaurants: 'All restaurants',
    restaurantLabel: 'Restaurant',
    sortLabel: 'Sort by',
    maxPriceLabel: 'Max price',
    anyPrice: 'Any price',
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
      orderFailed: 'We could not place your order. Please check your details and try again.',
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
    thanks: (name) => `Thank you, ${name}! 🎉`,
    message: (orderId) =>
      `Good news! Your order #${orderId} is in! We'll notify you as soon as it's out for delivery`,
    summary: (count, restaurantList) =>
      `${count} ${count === 1 ? 'dish' : 'dishes'} from ${restaurantList}, coming right up.`,
    eta: (from, to) => `Estimated arrival: ${from} – ${to}`,
    trackerLabel: 'Order progress',
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

  orderStatusIcons: {
    placed: '🧾',
    preparing: '👩‍🍳',
    out_for_delivery: '🛵',
    delivered: '🏠',
  },

  orderStatusDetails: {
    placed: 'The restaurant has received your order.',
    preparing: 'The kitchen is cooking your food right now.',
    out_for_delivery: 'Your rider is on the way. Get your appetite ready!',
    delivered: 'Enjoy your meal!',
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    body: 'The page you are looking for does not exist.',
    cta: 'Back to home',
  },
};

export default UI_TEXT;
