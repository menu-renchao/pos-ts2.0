import { roundMoney } from '../../utils/money.js';
import {
  crmRewardMembers,
  crmRewardSettings,
  type CrmRewardMemberSample,
} from '../../test-data/crm/members.js';

export type CrmRewardScenario = 'member-only' | 'discount-on-target';

export type CrmRewardOrderState = {
  readonly member: CrmRewardMemberSample;
  readonly subtotal: number;
  readonly hasRedeemItem?: boolean;
  readonly discountRate?: number;
};

export type CombinedCrmRewardOrder = {
  readonly member: CrmRewardMemberSample;
  readonly subtotal: number;
  readonly rewardDiscount: number;
  readonly pointBalance: number;
};

export class StubCrmRewardClient {
  findMemberByPhone(phone: string): CrmRewardMemberSample {
    const member = crmRewardMembers.find((item) => item.phone === phone);
    if (!member) {
      throw new Error(`CRM member not found for phone ${phone}`);
    }
    return member;
  }

  combineOrders(
    sourceOrder: CrmRewardOrderState,
    targetOrder: CrmRewardOrderState,
    scenario: CrmRewardScenario,
  ): CombinedCrmRewardOrder {
    const ownerOrder = scenario === 'discount-on-target' ? targetOrder : sourceOrder;
    const subtotal = roundMoney(sourceOrder.subtotal + targetOrder.subtotal);
    const rewardDiscount = ownerOrder.discountRate ? this.calculateDiscount(subtotal, ownerOrder.discountRate) : 0;
    return {
      member: ownerOrder.member,
      subtotal,
      rewardDiscount,
      pointBalance: ownerOrder.member.points,
    };
  }

  payOrder(order: CombinedCrmRewardOrder): CombinedCrmRewardOrder {
    return {
      ...order,
      pointBalance: order.pointBalance + crmRewardSettings.pointsPerPaidOrder * 2,
    };
  }

  calculateDiscount(subtotal: number, discountRate: number = crmRewardSettings.discountRate, maxAmount?: number): number {
    const discount = roundMoney(subtotal * discountRate);
    return -roundMoney(maxAmount === undefined ? discount : Math.min(discount, maxAmount));
  }

  canMoveOrder(order: Pick<CrmRewardOrderState, 'hasRedeemItem'>): boolean {
    return !order.hasRedeemItem;
  }

  canMoveItem(order: Pick<CrmRewardOrderState, 'hasRedeemItem'>): boolean {
    return !order.hasRedeemItem;
  }
}
