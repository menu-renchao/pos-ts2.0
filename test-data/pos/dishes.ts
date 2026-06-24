import type { DishSample, MenuGroupSample, OptionOrderSample } from './domain-types.js';

export const inventoryTrackedDish: DishSample = {
  id: 'dish-superman-item4',
  name: 'superman item4',
  price: 8,
  category: 'Chicken Lunch E',
  group: 'Lunch',
  inventorySku: 'INV-SUPERMAN-ITEM4',
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

export const crmRedeemItemDish: DishSample = {
  id: 'dish-crm-redeem-item',
  name: 'CRM Redeem Item',
  price: 0,
  category: 'CRM Reward',
  group: 'Dinner Menu',
  taxRate: 0,
};

export const pricedGlobalOption = {
  name: 'Global Option Add',
  price: 1.5,
} as const;

export const categoryOptionDish: OptionOrderSample = {
  id: 'dish-category-option-pork',
  name: 'Category Option Pork',
  price: 9.5,
  category: 'Category Option',
  group: '',
  optionNames: ['Pork'],
  taxRate: 0.0825,
};

export const chineseCategoryDish: OptionOrderSample = {
  id: 'dish-chinese-category-mongolian-chicken',
  name: '蒙古鸡',
  price: 10.25,
  category: 'KDS鸡肉类午餐',
  group: '',
  language: 'Chinese',
  taxRate: 0.0825,
};

export const categorySubOptionDish: OptionOrderSample = {
  ...categoryOptionDish,
  id: 'dish-category-option-pork-spicy',
  subOptionNames: ['Spicy'],
};

export const categoryNoSubOptionDish: OptionOrderSample = {
  ...categoryOptionDish,
  id: 'dish-category-option-pork-no-suboption',
};

export const itemNoSubOptionDish: OptionOrderSample = {
  id: 'dish-item-option-pork-no-suboption',
  name: 'Item Option Pork',
  price: 12,
  category: 'Item Options',
  group: 'Dinner Menu',
  optionNames: ['Pork'],
  taxRate: 0.0825,
};

export const itemOptionDish: OptionOrderSample = {
  id: 'dish-item-option-seafood',
  name: 'Item Option Seafood',
  price: 12.75,
  category: 'Item Options',
  group: 'Dinner Menu',
  optionNames: ['Seafood'],
  taxRate: 0.0825,
};

export const itemNoOptionDish: OptionOrderSample = {
  ...itemOptionDish,
  id: 'dish-item-option-no-option',
  optionNames: [],
};

export const itemSubOptionDish: OptionOrderSample = {
  ...itemNoSubOptionDish,
  id: 'dish-item-option-pork-spicy',
  subOptionNames: ['Spicy'],
};

export const chineseMenuGroups = {
  lunch: '午餐菜单',
  chinese: '中餐菜单',
} as const;

export const menuModeSearchItems = {
  pos: 'Broccoli Garlic Sauce',
  emenu: 'All you can eat item',
} as const;

export const numberedNameConflictDish: DishSample = {
  id: 'dish-numbered-name-conflict-aa',
  name: 'AA',
  number: 'AA',
  price: 10,
  category: 'Chicken Lunch E',
  group: 'Dinner Menu',
  taxRate: 0.0825,
};

export const defaultMenuGroup: MenuGroupSample = {
  id: 'group-migration-menu',
  name: 'Migration Menu',
  dishes: [
    inventoryTrackedDish,
    openFoodDish,
    discountableDish,
    groupSwitchDish,
    categorySwitchDish,
    categoryOptionDish,
    chineseCategoryDish,
    itemNoSubOptionDish,
    itemOptionDish,
    numberedNameConflictDish,
  ],
};
