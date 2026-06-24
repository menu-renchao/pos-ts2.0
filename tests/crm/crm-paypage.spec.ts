import type { Page } from '@playwright/test';

import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmPayPageFlow } from '../../flows/crm/crm-paypage.flow.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { test, expect } from '../../fixtures/base-test.js';

test.describe('CRM 支付页 Redeem', () => {
  test('POS-29638 支付页兑换 10% Off 后应按折后金额重算未付金额', async ({ environment, page }) => {
    const crmPayPageFlow = createCrmPayPageFlow(page);

    const result = await crmPayPageFlow.applyPayPageDiscountAndReadUnpaidAmount(environment.posHomeUrl);
    const discount = Number((result.subtotal * 0.1).toFixed(2));
    const discountedSubtotal = result.subtotal - discount;
    const expectedUnpaidAmount = discountedSubtotal + discountedSubtotal * result.taxRate;

    expect(result.unpaidAmount).toBeCloseTo(expectedUnpaidAmount, 2);
  });

  test('POS-29668 支付页 Switch Member 后兑换 10% Off 应只扣减新会员积分', async ({ environment, page }) => {
    const crmPayPageFlow = createCrmPayPageFlow(page);

    const result = await crmPayPageFlow.switchMemberApplyPayPageDiscountAndReadPoints(environment.posHomeUrl);

    expect(result.sourcePointsAfterSave).toBe(result.sourcePointsBeforeSwitch);
    expect(result.targetPointsAfterSave).toBe(result.targetPointsBeforeDiscount - 10);
  });

  test('POS-29703 支付页 Redeem Item 现金支付后会员积分应回到原始值', async ({ environment, page }) => {
    const crmPayPageFlow = createCrmPayPageFlow(page);

    const result = await crmPayPageFlow.payRedeemItemOrderByCashAndReadPoints(environment.posHomeUrl);

    expect(result.pointsAfterPayment).toBe(result.pointsBeforeRedeem);
    expect(result.adminPointsAfterPayment).toBe(result.pointsAfterPayment);
  });

  test('POS-29769 支付页 Redeem Item 分步支付完成后会员积分应回到原始值', async ({ environment, page }) => {
    const crmPayPageFlow = createCrmPayPageFlow(page);

    const result = await crmPayPageFlow.payRedeemItemOrderBySemiPayAndReadPoints(environment.posHomeUrl);

    expect(result.adminPointsAfterPayment).toBe(result.pointsBeforeRedeem);
  });

  test('POS-29786 支付页 Redeem Discount 部分支付退出后会员积分应保持已扣减状态', async ({ environment, page }) => {
    const crmPayPageFlow = createCrmPayPageFlow(page);

    const result = await crmPayPageFlow.semiPayRedeemDiscountAndReadPoints(environment.posHomeUrl);

    expect(result.adminPointsAfterPartialPayment).toBe(result.pointsBeforeRedeem - 10);
  });
});

function createCrmPayPageFlow(page: Page): CrmPayPageFlow {
  return new CrmPayPageFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new StubCrmRewardClient(),
  );
}
