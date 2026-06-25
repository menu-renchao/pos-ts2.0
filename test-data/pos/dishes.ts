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

export const kioskInventoryDish = {
  id: 'dish-kiosk-item',
  name: 'kiosk_item',
  price: 10,
  category: 'Appetizers',
  group: 'Chinese Food',
  inventorySku: 'KIOSK-ITEM',
  taxRate: 0.0825,
} as const satisfies DishSample;

export const kioskLimitedStockDish = {
  id: 'dish-kiosk-crabmeat-salad',
  name: 'Crabmeat Salad',
  price: 10,
  category: 'Salads',
  group: 'Chinese Food',
  inventorySku: 'KIOSK-CRABMEAT-SALAD',
  taxRate: 0.0825,
} as const satisfies DishSample;

export const emenuLimitedStockDish = {
  id: 'dish-emenu-item5',
  name: 'Item5',
  price: 8,
  category: 'New Category',
  group: 'Emenu Menu',
  inventorySku: 'EMENU-ITEM5',
  taxRate: 0,
} as const satisfies DishSample;

export const splitDiscountDishes: readonly DishSample[] = [
  {
    id: 'dish-superman-item1',
    name: 'superman item1',
    price: 8,
    category: 'Chicken Lunch E',
    group: 'Lunch',
    taxRate: 0.0825,
  },
  {
    id: 'dish-superman-item2',
    name: 'superman item2',
    price: 9,
    category: 'Chicken Lunch E',
    group: 'Lunch',
    taxRate: 0.0825,
  },
  {
    id: 'dish-superman-item3',
    name: 'superman item3',
    price: 10,
    category: 'Chicken Lunch E',
    group: 'Lunch',
    taxRate: 0.0825,
  },
] as const;

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

export const chineseInitialSearchDish = {
  id: 'dish-hn-normal-item1',
  name: 'hn_normal_item1',
  chineseName: '普通菜1',
  searchKeyword: 'ptc',
  price: 10,
  category: 'hn_cate',
  group: 'Lunch',
  taxRate: 0.0825,
} as const;

export const requiredKdsDish: DishSample = {
  id: 'dish-required-kds-mongolian-chicken',
  name: 'Mongolian Chicken',
  price: 10,
  category: 'KDS',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const posNameDisplayDish: DishSample = {
  id: 'dish-pos-name-test',
  name: 'Pos Name Test',
  price: 10,
  category: 'KDS',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const posNameDisplayValue = 'migration-pos-name';

export const unitPriceDish: DishSample = {
  id: 'dish-migration-unit-price-item',
  name: 'migration-unit-price-item',
  price: 10,
  category: 'hn_cate',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const editableComboDish = {
  name: 'EditPriceCombo',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  initialSubtotalText: '$30.20',
  editedSubtotalText: '$40.20',
  editableSubItem: 'ITEM1',
  fixedSubItem: 'ITEM3',
  editPriceInput: '1200',
} as const;

export const comboMaxModifyDish = {
  name: 'combo_max',
  group: 'crm_group',
  category: 'crm_cat',
  initialSubItems: ['item', 'item_option'],
  replacementSubItems: ['item-1', 'item_option-1'],
  price: 20,
} as const;

export const comboNoOptionThenOptionDish = {
  comboName: 'ComboOptionTest',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  noOptionSubItem: 'combo-no-option-item',
  optionDishName: 'combo-option-item',
  comboPrice: 10,
  optionDishPrice: 10,
} as const;

export const quickComboBatchEditDish = {
  name: 'QuickComboTest',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  price: 15,
} as const;

export const batchPropertyMenuItems = {
  group: 'Lunch',
  category: 'Chicken Lunch E',
  names: ['superman item1', 'superman item2', 'superman item3'],
  detailItemName: 'superman item2',
} as const;

export const requiredMenuPropertyLabels = ['Gluten-free', 'Vege', 'Lactose-free'] as const;

export const takeOutTaxFreeDish: DishSample & { taxId: string } = {
  id: 'dish-takeout-tax-free',
  name: 'taxtest',
  price: 8,
  category: 'Chicken Lunch E',
  group: 'Lunch',
  taxId: 'tax-takeout-free',
  taxRate: 0.075,
};

export const benefitPriceDish: DishSample & { benefitPrice: number } = {
  id: 'dish-benefit-price',
  name: 'benefit',
  price: 8,
  benefitPrice: 6,
  category: 'Chicken Lunch E',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const weightQuickComboDish = {
  name: 'weight combo',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  subItemName: 'Vegetable Spring Roll',
  weight: 100,
  price: 12,
} as const;

export const defaultMenuGroup: MenuGroupSample = {
  id: 'group-migration-menu',
  name: 'Migration Menu',
  dishes: [
    ...splitDiscountDishes,
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
    chineseInitialSearchDish,
    requiredKdsDish,
    posNameDisplayDish,
    unitPriceDish,
    takeOutTaxFreeDish,
    benefitPriceDish,
    {
      id: 'dish-combo-max',
      name: comboMaxModifyDish.name,
      price: comboMaxModifyDish.price,
      category: comboMaxModifyDish.category,
      group: comboMaxModifyDish.group,
      taxRate: 0.0825,
    },
    {
      id: 'dish-combo-option-test',
      name: comboNoOptionThenOptionDish.comboName,
      price: comboNoOptionThenOptionDish.comboPrice,
      category: comboNoOptionThenOptionDish.category,
      group: comboNoOptionThenOptionDish.group,
      taxRate: 0.0825,
    },
    {
      id: 'dish-combo-option-item',
      name: comboNoOptionThenOptionDish.optionDishName,
      price: comboNoOptionThenOptionDish.optionDishPrice,
      category: comboNoOptionThenOptionDish.category,
      group: comboNoOptionThenOptionDish.group,
      taxRate: 0.0825,
    },
  ],
};
