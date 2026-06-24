export const adminSettings = {
  separateSameDishes: 'separateSameDishes',
  requireCustomerBeforePay: 'requireCustomerBeforePay',
  allowBatchUnpaidOrder: 'allowBatchUnpaidOrder',
  fastFoodMode: 'fastFoodMode',
  menuMode: 'menuMode',
} as const;

export type AdminSettingName = (typeof adminSettings)[keyof typeof adminSettings];
export type AdminSettingValue = boolean | string | number;

export const menuModes = {
  pos: 'POS',
  emenu: 'EMENU',
} as const;

export type MenuMode = (typeof menuModes)[keyof typeof menuModes];
