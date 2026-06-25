import { expect, test } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('stage2 order operation migration', () => {
  test('POS-19362 按座位分单支付子单 1 后 Void 子单 2 不应改变子单 1 小费', {
    annotation: [jiraIssue('POS-19362')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.voidSecondSeatSplitSubOrderAndReadTip(environment.posHomeUrl);

    expect(result.firstSubOrderTipBeforeVoid).toBe(5);
    expect(result.firstSubOrderTipAfterVoid).toBe(result.firstSubOrderTipBeforeVoid);
    expect(result.secondSubOrderStatusAfterVoid).toBe('Void');
  });

  test('POS-19365 按座位分单存在共享菜且子单 1 已支付时 Void 子单 2 应提示禁止', {
    annotation: [jiraIssue('POS-19365')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.preventVoidSeatSplitSubOrderWithSharedPaidItem(environment.posHomeUrl);

    expect(result.voidAlertText).toBe('The order has paid dishes and cannot be voided!');
  });

  test('POS-19368 按座位分单编辑子单 1 小费不应影响子单 2 小费', {
    annotation: [jiraIssue('POS-19368')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.modifyFirstSeatSplitSubOrderTipAndReadTips(environment.posHomeUrl);

    expect(result.firstSubOrderTipAfterEdit).toBe(6);
    expect(result.secondSubOrderTipAfterEdit).toBe(result.secondSubOrderTipBeforeEdit);
  });

  test('POS-19371 子单部分付款后取消分单应提示需先撤销付款', {
    annotation: [jiraIssue('POS-19371')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.preventUnsplitSeatSplitOrderAfterPartialPayment(environment.posHomeUrl);

    expect(result.unsplitAlertText).toBe(
      'The operation cannot be done due to partial payment! Please revoke the payment before preceeding.',
    );
  });

  test('POS-19374 按金额分单子单部分付款后取消分单应提示需先撤销付款', {
    annotation: [jiraIssue('POS-19374')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.preventUnsplitAmountSplitOrderAfterPartialPayment(environment.posHomeUrl);

    expect(result.unsplitAlertText).toBe(
      'The operation cannot be done due to partial payment! Please revoke the payment before preceeding.',
    );
  });
});
