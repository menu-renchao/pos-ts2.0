import { test, expect } from '../../fixtures/base-test.js';
import type { Page } from '@playwright/test';
import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmOrderTransferFlow } from '../../flows/crm/crm-order-transfer.flow.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { SplitOrderPage } from '../../pages/pos/split-order.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('CRM 合单移单移菜', () => {
  test('Redeem 合单无赠菜折扣时应保留订单 A 会员并在支付后增加 20 积分', {
    annotation: [jiraIssue('POS-29853')],
  }, async ({ environment, page }) => {
    const crmOrderTransferFlow = createCrmOrderTransferFlow(page);

    const result = await crmOrderTransferFlow.combineOrdersWithRewards(environment.posHomeUrl, 'member-only');

    expect(result.combinedPointBalance).toBe(result.sourcePointBalance);
    expect(result.combinedMemberName).toBe(result.sourceMemberName);
    expect(result.paidPointBalance).toBe(result.combinedPointBalance + 20);
    expect(result.paidMemberName).toBe(result.combinedMemberName);
  });

  test('Redeem 合单订单 B 有百分比折扣时应按合并后小计重新计算 Reward Discount', {
    annotation: [jiraIssue('POS-29862')],
  }, async ({ environment, page }) => {
    const crmOrderTransferFlow = createCrmOrderTransferFlow(page);

    const result = await crmOrderTransferFlow.combineOrdersWithRewards(environment.posHomeUrl, 'discount-on-target');

    expect(result.combinedPointBalance).toBe(result.targetPointBalance);
    expect(result.combinedMemberName).toBe(result.targetMemberName);
    expect(result.paidPointBalance).toBe(result.combinedPointBalance + 20);
    expect(result.paidMemberName).toBe(result.combinedMemberName);
    expect(result.rewardDiscount).toBe(-Number((result.subtotal * 0.1).toFixed(2)));
  });

  test('Redeem 赠菜订单平均分单后子单不应提供移单按钮', {
    annotation: [jiraIssue('POS-29869')],
  }, async ({ environment, page }) => {
    const crmOrderTransferFlow = createCrmOrderTransferFlow(page);

    const result = await crmOrderTransferFlow.splitRedeemItemOrderAndReadMoveOrderAvailability(environment.posHomeUrl);

    expect(result.moveOrderVisible).toBe(false);
  });

  test('Redeem 赠菜订单保存后 Recall 不应提供移菜按钮', {
    annotation: [jiraIssue('POS-29868')],
  }, async ({ environment, page }) => {
    const crmOrderTransferFlow = createCrmOrderTransferFlow(page);

    const result = await crmOrderTransferFlow.saveRedeemItemOrderAndReadMoveItemAvailability(environment.posHomeUrl);

    expect(result.moveItemVisible).toBe(false);
  });

  test('Recall 支付关联会员订单时兑换百分比折扣应按订单小计重新计算', {
    annotation: [jiraIssue('POS-29910')],
  }, async ({ environment, page }) => {
    const crmOrderTransferFlow = createCrmOrderTransferFlow(page);

    const result = await crmOrderTransferFlow.payRecalledOrderWithRedeemDiscount(environment.posHomeUrl);

    expect(result.rewardDiscount).toBe(-Number((result.subtotal * 0.1).toFixed(2)));
  });
});

function createCrmOrderTransferFlow(page: Page): CrmOrderTransferFlow {
  return new CrmOrderTransferFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new SplitOrderPage(page),
    new StubCrmRewardClient(),
  );
}
