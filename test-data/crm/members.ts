import { createUniqueCustomer, defaultCustomer } from '../pos/customers.js';

export const defaultCrmMember = {
  ...defaultCustomer,
  memberId: 'member-migration-default',
  points: 100,
};

export type CrmRewardMemberSample = typeof defaultCrmMember & {
  readonly displayName: string;
};

export const crmSourceRewardMember: CrmRewardMemberSample = {
  ...defaultCrmMember,
  memberId: 'member-pos-29853-source',
  phone: '(64)673-37557',
  firstName: 'CRM',
  lastName: 'Member A',
  displayName: 'CRM Member A',
  points: 100,
};

export const crmTargetRewardMember: CrmRewardMemberSample = {
  ...defaultCrmMember,
  memberId: 'member-pos-29853-target',
  phone: '(92)923-69168',
  firstName: 'CRM',
  lastName: 'Member B',
  displayName: 'CRM Member B',
  points: 80,
};

export const crmRewardMembers: readonly CrmRewardMemberSample[] = [
  crmSourceRewardMember,
  crmTargetRewardMember,
] as const;

export const crmRewardSettings = {
  discountName: '10% Off',
  discountRate: 0.1,
  pointsPerPaidOrder: 10,
} as const;

export function createUniqueCrmMember() {
  return {
    ...createUniqueCustomer('CrmMember'),
    memberId: `member-${Date.now().toString(36)}`,
    points: 0,
  };
}
