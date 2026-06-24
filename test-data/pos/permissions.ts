export const staffSamples = {
  manager: { id: 'staff-manager', password: '11', permissions: ['all'] },
  noVoidItem: { id: 'staff-no-void', password: '22', permissions: ['order:create'] },
  noVoidPrintedItem: { id: 'staff-1', password: '123', permissions: ['order:create'] },
  noNote: { id: 'staff-1', password: '123', permissions: ['order:create'] },
} as const;

export const validEmployeePassword = staffSamples.manager.password;
export const invalidEmployeePassword = '9890';
