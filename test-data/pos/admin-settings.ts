export const adminSettings = {
  separateSameDishes: 'separateSameDishes',
  requireCustomerBeforePay: 'requireCustomerBeforePay',
  allowBatchUnpaidOrder: 'allowBatchUnpaidOrder',
  fastFoodMode: 'fastFoodMode',
  menuMode: 'menuMode',
  combineSameItem: 'combineSameItem',
  voidPrintedItemPermission: 'voidPrintedItemPermission',
} as const;

export type AdminSettingName = (typeof adminSettings)[keyof typeof adminSettings];
export type AdminSettingValue = boolean | string | number;

export const menuModes = {
  pos: 'POS',
  emenu: 'EMENU',
} as const;

export type MenuMode = (typeof menuModes)[keyof typeof menuModes];

export const combineSameItemModes = {
  dontCombine: 'dont-combine',
  autoSameStatus: 'auto-same-status',
  includeKitchen: 'include-kitchen',
} as const;

export type CombineSameItemMode = (typeof combineSameItemModes)[keyof typeof combineSameItemModes];
