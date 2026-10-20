import MenuItem from '../models/MenuItem.js';

// Four placeholder photos per dish for the detail-page gallery.
// To use real photos, replace gallery('...') with ['/images/dish-1.jpg', ...] files from /public/images.
const gallery = (label) =>
  [1, 2, 3, 4].map(
    (n) => `https://placehold.co/800x600/D9D9D9/000000?text=${encodeURIComponent(`${label} ${n}`)}`
  );

const menuItems = [
  // ---- Slice & Co. (Italian) ----
  new MenuItem({
    id: 'm01', restaurantId: 'r1', categoryId: 'c1',
    name: 'Margherita Pizza',
    description: 'Hand-stretched crust with San Marzano tomato sauce, fresh mozzarella and basil.',
    price: 299, rating: 4.7, images: gallery('Margherita Pizza'),
  }),
  new MenuItem({
    id: 'm02', restaurantId: 'r1', categoryId: 'c1',
    name: 'Pepperoni Pizza',
    description: 'Artisanal crust topped with crispy pepperoni, melted cheese and a drizzle of garlic olive oil.',
    price: 349, rating: 4.6, images: gallery('Pepperoni Pizza'),
  }),
  new MenuItem({
    id: 'm03', restaurantId: 'r1', categoryId: 'c1',
    name: 'Spaghetti Carbonara',
    description: 'Silky egg and pecorino sauce tossed with crispy bacon and cracked black pepper.',
    price: 259, rating: 4.5, images: gallery('Spaghetti Carbonara'),
  }),
  new MenuItem({
    id: 'm04', restaurantId: 'r1', categoryId: 'c6',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.',
    price: 159, rating: 4.8, images: gallery('Classic Tiramisu'),
  }),

  // ---- Burger Barn (American) ----
  new MenuItem({
    id: 'm05', restaurantId: 'r2', categoryId: 'c2',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, cheddar, pickles, onions and house sauce on a toasted potato bun.',
    price: 189, rating: 4.5, images: gallery('Classic Cheeseburger'),
  }),
  new MenuItem({
    id: 'm06', restaurantId: 'r2', categoryId: 'c2',
    name: 'Bacon BBQ Burger',
    description: 'Double patty with smoked bacon, crispy onion rings and tangy barbecue glaze.',
    price: 229, rating: 4.6, images: gallery('Bacon BBQ Burger'),
  }),
  new MenuItem({
    id: 'm07', restaurantId: 'r2', categoryId: 'c2',
    name: 'Crispy Chicken Sandwich',
    description: 'Buttermilk-fried chicken thigh, slaw and spicy mayo in a soft brioche bun.',
    price: 179, rating: 4.4, images: gallery('Crispy Chicken Sandwich'),
  }),
  new MenuItem({
    id: 'm08', restaurantId: 'r2', categoryId: 'c5',
    name: 'Loaded Cheese Fries',
    description: 'Golden fries smothered in cheese sauce, bacon bits and chopped scallions.',
    price: 129, rating: 4.3, images: gallery('Loaded Cheese Fries'),
  }),

  // ---- Sakura Bento (Japanese) ----
  new MenuItem({
    id: 'm09', restaurantId: 'r3', categoryId: 'c3',
    name: 'Salmon Sushi Set',
    description: 'Eight pieces of fresh salmon nigiri and maki served with pickled ginger and wasabi.',
    price: 399, rating: 4.9, images: gallery('Salmon Sushi Set'),
  }),
  new MenuItem({
    id: 'm10', restaurantId: 'r3', categoryId: 'c3',
    name: 'Chicken Katsu Bento',
    description: 'Panko-crusted chicken cutlet with steamed rice, tamagoyaki, salad and katsu sauce.',
    price: 249, rating: 4.7, images: gallery('Chicken Katsu Bento'),
  }),
  new MenuItem({
    id: 'm11', restaurantId: 'r3', categoryId: 'c4',
    name: 'Tonkotsu Ramen',
    description: 'Rich pork bone broth, chewy noodles, chashu pork, soft egg and nori.',
    price: 279, rating: 4.8, images: gallery('Tonkotsu Ramen'),
  }),
  new MenuItem({
    id: 'm12', restaurantId: 'r3', categoryId: 'c6',
    name: 'Matcha Mochi',
    description: 'Soft chewy rice cakes filled with sweet matcha cream, three pieces per box.',
    price: 119, rating: 4.6, images: gallery('Matcha Mochi'),
  }),

  // ---- Seoul Kitchen (Korean) ----
  new MenuItem({
    id: 'm13', restaurantId: 'r4', categoryId: 'c3',
    name: 'Beef Bibimbap',
    description: 'Warm rice topped with marinated beef, seasoned vegetables, fried egg and gochujang.',
    price: 259, rating: 4.7, images: gallery('Beef Bibimbap'),
  }),
  new MenuItem({
    id: 'm14', restaurantId: 'r4', categoryId: 'c5',
    name: 'Korean Fried Chicken',
    description: 'Twice-fried crispy wings glazed in sweet and spicy yangnyeom sauce.',
    price: 329, rating: 4.8, images: gallery('Korean Fried Chicken'),
  }),
  new MenuItem({
    id: 'm15', restaurantId: 'r4', categoryId: 'c4',
    name: 'Spicy Ramyeon',
    description: 'Fiery noodle soup with kimchi, egg, scallions and a slice of melted cheese.',
    price: 199, rating: 4.5, images: gallery('Spicy Ramyeon'),
  }),
  new MenuItem({
    id: 'm16', restaurantId: 'r4', categoryId: 'c6',
    name: 'Strawberry Bingsu',
    description: 'Fluffy shaved milk ice layered with fresh strawberries, condensed milk and rice cakes.',
    price: 179, rating: 4.6, images: gallery('Strawberry Bingsu'),
  }),

  // ---- Lola's Kusina (Filipino) ----
  new MenuItem({
    id: 'm17', restaurantId: 'r5', categoryId: 'c3',
    name: 'Chicken Adobo Rice Meal',
    description: 'Chicken simmered in soy, vinegar and garlic, served with garlic rice and a fried egg.',
    price: 169, rating: 4.7, images: gallery('Chicken Adobo Rice Meal'),
  }),
  new MenuItem({
    id: 'm18', restaurantId: 'r5', categoryId: 'c5',
    name: 'Sizzling Pork Sisig',
    description: 'Chopped grilled pork with onions, chili and calamansi, served sizzling with an egg on top.',
    price: 199, rating: 4.8, images: gallery('Sizzling Pork Sisig'),
  }),
  new MenuItem({
    id: 'm19', restaurantId: 'r5', categoryId: 'c4',
    name: 'Sinigang na Baboy',
    description: 'Tender pork ribs in a tangy tamarind broth with kangkong, radish and tomatoes.',
    price: 219, rating: 4.6, images: gallery('Sinigang na Baboy'),
  }),
  new MenuItem({
    id: 'm20', restaurantId: 'r5', categoryId: 'c6',
    name: 'Halo-Halo',
    description: 'Shaved ice with sweet beans, jellies, leche flan, ube ice cream and evaporated milk.',
    price: 99, rating: 4.9, images: gallery('Halo-Halo'),
  }),
];

export default menuItems;
