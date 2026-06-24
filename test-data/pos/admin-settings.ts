export const adminSettings = {
  separateSameDishes: 'separateSameDishes',
  requireCustomerBeforePay: 'requireCustomerBeforePay',
  allowBatchUnpaidOrder: 'allowBatchUnpaidOrder',
  fastFoodMode: 'fastFoodMode',
} as const;

export type AdminSettingName = (typeof adminSettings)[keyof typeof adminSettings];
export type AdminSettingValue = boolean | string | number;
