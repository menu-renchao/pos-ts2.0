import type { Page } from '@playwright/test';

import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmSplitOrderFlow } from '../../flows/crm/crm-split-order.flow.js';
import { test, expect } from '../../fixtures/base-test.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { SplitOrderPage } from '../../pages/pos/split-order.page.js';

test.describe('CRM 分单', () => {
  test('POS-29806 Redeem Item 拖动分单后两个子单赠菜价格应保持 0.00', async ({ environment, page }) => {
    const crmSplitOrderFlow = createCrmSplitOrderFlow(page);

    const result = await crmSplitOrderFlow.splitRedeemItemOrderByDragAndReadRedeemPrices(environment.posHomeUrl);

    expect(result.redeemItemPrices).toEqual([0, 0]);
  });

  test('POS-29806 无折扣会员订单两个子单全部支付后应增加 20 积分', async ({ environment, page }) => {
    const crmSplitOrderFlow = createCrmSplitOrderFlow(page);

    const result = await crmSplitOrderFlow.paySplitMemberSubordersAndReadPoints(environment.posHomeUrl);

    expect(result.pointsAfterAllSubordersPaid).toBe(result.pointsBeforePayment + result.earnedPoints);
  });

  test('POS-29820 Redeem Discount 拖动分单支付子单后应保持扣减 10 积分和会员名', async ({ environment, page }) => {
    const crmSplitOrderFlow = createCrmSplitOrderFlow(page);

    const result = await crmSplitOrderFlow.payDiscountedDragSplitSuborderAndReadMemberState(environment.posHomeUrl);

    expect(result.pointsAfterSuborderPayment).toBe(result.pointsBeforeDiscount - result.discountPointDeduction);
    expect(result.memberNameAfterSuborderPayment).toBe(result.memberNameBeforeSplit);
  });

  test('POS-29817 Redeem Discount 平均分单支付子单后应保持扣减 10 积分和会员名', async ({ environment, page }) => {
    const crmSplitOrderFlow = createCrmSplitOrderFlow(page);

    const result = await crmSplitOrderFlow.payDiscountedEvenSplitSuborderAndReadMemberState(environment.posHomeUrl);

    expect(result.pointsAfterSuborderPayment).toBe(result.pointsBeforeDiscount - result.discountPointDeduction);
    expect(result.memberNameAfterSuborderPayment).toBe(result.memberNameBeforeSplit);
  });
});

function createCrmSplitOrderFlow(page: Page): CrmSplitOrderFlow {
  return new CrmSplitOrderFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new SplitOrderPage(page),
    new StubCrmRewardClient(),
  );
}
