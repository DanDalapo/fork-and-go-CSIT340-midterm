import Category from '../models/Category.js';

const categories = [
  new Category({ id: 'c1', name: 'Pizza & Pasta', icon: '🍕' }),
  new Category({ id: 'c2', name: 'Burgers', icon: '🍔' }),
  new Category({ id: 'c3', name: 'Rice Bowls', icon: '🍚' }),
  new Category({ id: 'c4', name: 'Noodles & Soups', icon: '🍜' }),
  new Category({ id: 'c5', name: 'Fried & Grilled', icon: '🍗' }),
  new Category({ id: 'c6', name: 'Desserts', icon: '🍨' }),
];

export default categories;
