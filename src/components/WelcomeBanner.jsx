import { useState } from 'react';
import { UI_TEXT } from '../constants/uiText.js';
import { defaultDeliveryInfo, getCategoryById, getRestaurantById } from '../data/index.js';
import getTimeOfDay from '../utils/timeOfDay.js';

// Picks the line under the greeting: the current search/filter wins, otherwise the random prompt.
function getPrompt(filter, randomPrompt) {
  const search = filter.searchText.trim();
  if (search) return UI_TEXT.home.searchPrompt(search);

  const category = filter.categoryId && getCategoryById(filter.categoryId);
  if (category) return UI_TEXT.home.categoryPrompt(category.icon, category.name);

  const restaurant = filter.restaurantId && getRestaurantById(filter.restaurantId);
  if (restaurant) return UI_TEXT.home.restaurantPrompt(restaurant.name);

  return randomPrompt;
}

// "Good evening, John! 🌆" plus a line that reacts to what the customer is browsing.
export default function WelcomeBanner({ filter }) {
  // Chosen once per visit, so the greeting stays put while filters change.
  const [{ timeOfDay, randomPrompt }] = useState(() => ({
    timeOfDay: getTimeOfDay(),
    randomPrompt: UI_TEXT.home.prompts[Math.floor(Math.random() * UI_TEXT.home.prompts.length)],
  }));
  const prompt = getPrompt(filter, randomPrompt);

  return (
    <section className="rounded-2xl border-2 border-brand-black bg-brand-orange px-5 py-6 shadow-[4px_4px_0_0_var(--color-brand-black)] sm:px-8">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">
        {UI_TEXT.home.greetings[timeOfDay](defaultDeliveryInfo.getFirstName())}
      </h1>
      {/* key restarts the fade each time the prompt text changes. */}
      <p key={prompt} aria-live="polite" className="mt-2 motion-safe:animate-fade-in sm:text-lg">
        {prompt}
      </p>
    </section>
  );
}
