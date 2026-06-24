import type { Page } from '@playwright/test';

import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmOrderRedeemDiscountFlow } from '../../flows/crm/crm-order-redeem-discount.flow.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { test, expect } from '../../fixtures/base-test.js';

test.describe('CRM 订单 Redeem Discount', () => {
  test('POS-29552 Redeem 10% Off 应按订单小计计算 Reward Discount', async ({ environment, page }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const result = await crmRedeemDiscountFlow.applyPercentageDiscountAndReadRecallReward(
      environment.posHomeUrl,
      '10% Off',
    );

    expect(result.reward).toBe(-Number((result.subtotal * 0.1).toFixed(2)));
  });

  test('POS-29547 当前会员积分符合多条规则时 Redeem Discount 应展示 10% Off 和 20% Off', async ({
    environment,
    page,
  }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const discountOptions = await crmRedeemDiscountFlow.readAvailablePercentageDiscountsForHighPointMember(
      environment.posHomeUrl,
    );

    expect(discountOptions).toEqual(expect.arrayContaining(['10% Off', '20% Off']));
  });

  test('POS-29554 Redeem 30% Off 超过最大折扣时 Reward Discount 应限制为 -1.00', async ({
    environment,
    page,
  }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const result = await crmRedeemDiscountFlow.applyMaxCappedPercentageDiscountAndReadRecallReward(environment.posHomeUrl);

    expect(result.reward).toBe(-1);
  });

  test('POS-29561 Redeem 10% Off 后减少菜品到 0 应重算 Reward Discount 为 -0.00', async ({
    environment,
    page,
  }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const result = await crmRedeemDiscountFlow.applyDiscountThenReduceItemsToZeroAndReadReward(environment.posHomeUrl);

    expect(result.rewardBeforeReduce).toBe(-Number((result.subtotalBeforeReduce * 0.1).toFixed(2)));
    expect(result.rewardAfterReduceText).toBe('-0.00');
  });

  test('POS-29608 Redeem Fixed Amount 应先扣减积分并在支付后回补到原始积分', async ({ environment, page }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const result = await crmRedeemDiscountFlow.redeemFixedAmountPayAndReadPointBalance(environment.posHomeUrl);

    expect(result.pointsAfterRedeem).toBe(result.pointsBeforeRedeem - 10);
    expect(result.pointsAfterPayment).toBe(result.pointsBeforeRedeem);
    expect(result.adminPointsAfterPayment).toBe(result.pointsAfterPayment);
  });

  test('POS-29578 Redeem 10% Off 应先扣减积分并在支付后回补到原始积分', async ({ environment, page }) => {
    const crmRedeemDiscountFlow = createCrmOrderRedeemDiscountFlow(page);

    const result = await crmRedeemDiscountFlow.redeemPercentageDiscountPayAndReadPointBalance(environment.posHomeUrl);

    expect(result.pointsAfterRedeem).toBe(result.pointsBeforeRedeem - 10);
    expect(result.pointsAfterPayment).toBe(result.pointsBeforeRedeem);
    expect(result.adminPointsAfterPayment).toBe(result.pointsAfterPayment);
  });
});

function createCrmOrderRedeemDiscountFlow(page: Page): CrmOrderRedeemDiscountFlow {
  return new CrmOrderRedeemDiscountFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new StubCrmRewardClient(),
  );
}
