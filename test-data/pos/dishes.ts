import type { DishSample, MenuGroupSample } from './domain-types.js';

export const inventoryTrackedDish: DishSample = {
  id: 'dish-beef-noodle',
  name: 'Beef Noodle',
  price: 12.5,
  category: 'Noodles',
  inventorySku: 'INV-BEEF-NOODLE',
  taxRate: 0.0825,
};

export const openFoodDish: DishSample = {
  id: 'dish-open-food',
  name: 'Open Food',
  price: 8,
  category: 'Open Items',
  taxRate: 0,
};

export const discountableDish: DishSample = {
  id: 'dish-discountable-burger',
  name: 'Discountable Burger',
  price: 10,
  category: 'Burgers',
  taxRate: 0.0825,
};

export const defaultMenuGroup: MenuGroupSample = {
  id: 'group-migration-menu',
  name: 'Migration Menu',
  dishes: [inventoryTrackedDish, openFoodDish, discountableDish],
};
