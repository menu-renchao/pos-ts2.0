export const staffSamples = {
  manager: { id: 'staff-manager', password: '11', permissions: ['all'] },
  noVoidItem: { id: 'staff-no-void', password: '22', permissions: ['order:create'] },
} as const;
