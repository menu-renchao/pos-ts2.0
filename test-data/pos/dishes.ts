import type { DishSample, MenuGroupSample } from './domain-types.js';

export const inventoryTrackedDish: DishSample = {
  id: 'dish-beef-noodle',
  name: 'Beef Noodle',
  price: 12.5,
  category: 'Noodles',
  group: 'Migration Menu',
  inventorySku: 'INV-BEEF-NOODLE',
  taxRate: 0.0825,
};

export const openFoodDish: DishSample = {
  id: 'dish-open-food',
  name: 'Open Food',
  price: 8,
  category: 'Open Items',
  group: 'Open Items',
  taxRate: 0,
};

export const discountableDish: DishSample = {
  id: 'dish-discountable-burger',
  name: 'Discountable Burger',
  price: 10,
  category: 'Burgers',
  group: 'Dinner Menu',
  taxRate: 0.0825,
};

export const groupSwitchDish: DishSample = {
  id: 'dish-group-switch',
  name: 'Group Switch Beef',
  price: 11.25,
  category: 'Lunch Entree',
  group: 'Lunch Menu',
  taxRate: 0.0825,
};

export const categorySwitchDish: DishSample = {
  id: 'dish-category-switch',
  name: 'Category Switch Fish',
  price: 13.5,
  category: 'Seafood',
  group: 'Dinner Menu',
  taxRate: 0.0825,
};

export const chineseMenuGroups = {
  lunch: '午餐菜单',
  chinese: '中餐菜单',
} as const;

export const defaultMenuGroup: MenuGroupSample = {
  id: 'group-migration-menu',
  name: 'Migration Menu',
  dishes: [inventoryTrackedDish, openFoodDish, discountableDish, groupSwitchDish, categorySwitchDish],
};
