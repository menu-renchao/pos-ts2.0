export const staffSamples = {
  manager: { id: 'staff-manager', password: '11', permissions: ['all'] },
  noVoidItem: { id: 'staff-no-void', password: '22', permissions: ['order:create'] },
  noVoidPrintedItem: { id: 'staff-1', password: '123', permissions: ['order:create'] },
  noNote: { id: 'staff-1', password: '123', permissions: ['order:create'] },
} as const;

export const validEmployeePassword = staffSamples.manager.password;
export const invalidEmployeePassword = '9890';

export const staffDiscountRoleSamples = {
  server: { role: 'Server', password: '007', maxWholeOrderDiscountPercent: 20 },
  manager: { role: 'Manager', password: '006', maxWholeOrderDiscountPercent: 50 },
  boss: { role: 'Boss', password: '11', maxWholeOrderDiscountPercent: 100 },
} as const;

export const staffDiscountSamples = {
  openFoodName: 'item1',
  openFoodPrice: 10,
  excessiveWholeOrderDiscountPercent: 20.01,
  managerAuthorizedWholeOrderDiscountPercent: 30,
  bossAuthorizedWholeOrderDiscountPercent: 60,
  permissionExceededTip: 'The discount exceeds permission limit，please input password',
  failedLoginTip: 'Failed to login',
  noPermissionTip: 'No Permission!',
  itemDiscountFirstFoodName: 'item1',
  itemDiscountFirstFoodPrice: 4,
  itemDiscountSecondFoodName: 'item2',
  itemDiscountSecondFoodPrice: 6,
  managerAuthorizedItemDiscountPercent: 60,
  bossAuthorizedItemDiscountFirstFoodPrice: 6,
  bossAuthorizedItemDiscountSecondFoodPrice: 4,
  bossAuthorizedItemDiscountPercent: 85,
  multiDiscountFirstFoodPrice: 6,
  multiDiscountSecondFoodPrice: 4,
  multiDiscountWholeOrderPercent: 30,
  multiDiscountItemPercent: 10,
  multiItemDiscountAmount: 3,
  zeroServerMaximumDiscountPercent: 0,
  zeroServerWholeOrderDiscountPercent: 0.1,
  cumulativeWholeOrderDiscountPercent: 10,
  cumulativeItemDiscountPercent: 10,
  cumulativeSecondItemDiscountAmount: 2,
  recallDiscountOpenFoodName: 'item1',
  recallDiscountOpenFoodPrice: 10,
  recallExcessiveWholeOrderDiscountAmount: 3,
  recallBossAuthorizedWholeOrderDiscountRate: 0.6,
} as const;
