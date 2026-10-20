import Restaurant from '../models/Restaurant.js';

// Placeholder banners in the brand colors. Swap for real photos in /public/images when you have them.
const banner = (label) =>
  `https://placehold.co/800x400/FF8132/000000?text=${encodeURIComponent(label)}`;

const restaurants = [
  new Restaurant({
    id: 'r1',
    name: 'Slice & Co.',
    cuisine: 'Italian',
    image: banner('Slice & Co.'),
    rating: 4.7,
    deliveryFee: 25,
  }),
  new Restaurant({
    id: 'r2',
    name: 'Burger Barn',
    cuisine: 'American',
    image: banner('Burger Barn'),
    rating: 4.5,
    deliveryFee: 30,
  }),
  new Restaurant({
    id: 'r3',
    name: 'Sakura Bento',
    cuisine: 'Japanese',
    image: banner('Sakura Bento'),
    rating: 4.8,
    deliveryFee: 35,
  }),
  new Restaurant({
    id: 'r4',
    name: 'Seoul Kitchen',
    cuisine: 'Korean',
    image: banner('Seoul Kitchen'),
    rating: 4.6,
    deliveryFee: 30,
  }),
  new Restaurant({
    id: 'r5',
    name: "Lola's Kusina",
    cuisine: 'Filipino',
    image: banner("Lola's Kusina"),
    rating: 4.7,
    deliveryFee: 20,
  }),
];

export default restaurants;
