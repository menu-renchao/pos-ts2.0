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
} as const;
