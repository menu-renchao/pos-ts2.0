import type { DishSample, OptionOrderSample } from '../domain-types.js';

export const liveGroupSwitchDish: DishSample = {
  id: 'dish-live-group-switch',
  name: 'Broccoli Garlic Sauce',
  price: 0,
  category: 'Vegetable and M',
  group: 'Chinese Food',
  taxRate: 0.0825,
};

export const liveCategorySwitchDish: DishSample = {
  id: 'dish-live-category-switch',
  name: 'Spi Thai Gn Curry Chk',
  price: 0,
  category: 'KDS',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const liveRequiredKdsDish: DishSample = {
  ...liveCategorySwitchDish,
  id: 'dish-live-required-kds',
};

export const livePosNameDisplayDish: DishSample = {
  id: 'dish-live-pos-name-test',
  name: 'Pos Name Test',
  price: 10,
  category: 'KDS',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const livePosNameDisplayValue = 'migration-pos-name';

export const liveDiscountableDish: DishSample = {
  ...liveGroupSwitchDish,
  id: 'dish-live-discountable',
};

export const liveCategoryOptionDish: OptionOrderSample = {
  id: 'dish-live-category-option',
  name: 'optionitem',
  price: 0,
  category: 'Chicken Lunch E',
  group: 'Lunch',
  optionNames: ['Pork'],
  taxRate: 0.1,
};

export const liveChineseCategoryDish: OptionOrderSample = {
  id: 'dish-live-chinese-category',
  name: '香辣泰式绿咖喱鸡',
  price: 0,
  category: '鸡肉类午餐',
  group: '',
  language: 'Chinese',
  taxRate: 0.0825,
};

export const liveCategorySubOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-category-sub-option',
  subOptionNames: ['Spicy'],
};

export const liveCategoryNoSubOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-category-no-sub-option',
};

export const liveNumberedNameConflictDish: DishSample = {
  id: 'dish-live-numbered-name-conflict',
  name: 'test',
  price: 0,
  category: 'Chicken Lunch E',
  group: 'Lunch',
  taxRate: 0.0825,
};

export const liveChineseInitialSearchDish = {
  id: 'dish-live-hn-normal-item1',
  name: 'hn_normal_item1',
  chineseName: '普通菜1',
  searchKeyword: 'ptc',
  price: 10,
  category: 'hn_cate',
  group: 'Lunch',
  taxRate: 0.0825,
} as const;

export const liveItemNoSubOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-item-no-sub-option',
};

export const liveItemOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-item-option',
  optionNames: ['Seafood'],
};

export const liveItemNoOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-item-no-option',
  optionNames: [],
};

export const liveItemSubOptionDish: OptionOrderSample = {
  ...liveCategoryOptionDish,
  id: 'dish-live-item-sub-option',
  subOptionNames: ['Spicy'],
};

export const liveComboNoOptionThenOptionDish = {
  comboName: 'QuickComboTest',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  noOptionSubItem: 'i1',
  optionDishName: 'c1',
  comboPrice: 0,
  optionDishPrice: 0,
} as const;

export const liveEditableComboDish = {
  name: 'EditPriceCombo',
  group: 'MansuperGroup',
  category: 'MansuperCat',
  initialSubtotalText: '$30.20',
  editedSubtotalText: '$40.20',
  editableSubItem: 'ITEM1',
  fixedSubItem: 'ITEM3',
  editPriceInput: '1200',
  sections: [
    { name: 'adjust can edit', items: [{ name: 'ITEM1', quantity: 2 }, { name: 'ITEM2', quantity: 2 }] },
    { name: 'fix can not edit', items: [{ name: 'ITEM3', quantity: 1 }] },
  ],
} as const;

export const liveComboMaxModifyDish = {
  name: 'combo_max',
  group: 'crm_group',
  category: 'crm_cat',
  initialSubItems: ['item', 'item_option'],
  initialSections: [
    { name: 'item', items: [{ name: 'item', quantity: 1 }, { name: 'item_option', quantity: 1 }] },
  ],
  replacementSubItems: ['item-1', 'item_option-1'],
  price: 20,
} as const;

export const liveOrderEditItemTaxExpected = {
  beforeEditTax: 1.6,
  afterEditTax: 2.2,
} as const;

export const liveChineseMenuGroups = {
  lunch: '午餐菜单',
  chinese: '中餐菜单',
} as const;

export const liveNoVoidItemStaff = {
  password: '99',
} as const;

export const liveBossStaff = {
  password: '11',
} as const;
