import { createUniqueCustomer, defaultCustomer } from '../pos/customers.js';

export const defaultCrmMember = {
  ...defaultCustomer,
  memberId: 'member-migration-default',
  points: 100,
};

export function createUniqueCrmMember() {
  return {
    ...createUniqueCustomer('CrmMember'),
    memberId: `member-${Date.now().toString(36)}`,
    points: 0,
  };
}
