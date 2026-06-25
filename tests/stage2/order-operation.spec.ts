import { expect, test } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { SettlementFlow } from '../../flows/pos/settlement.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
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

  test('POS-19377 按金额分单未付款时取消分单应成功且无提示', {
    annotation: [jiraIssue('POS-19377')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.unsplitUnpaidAmountSplitOrder(environment.posHomeUrl);

    expect(result.unsplitAlertText).toBe('');
    expect(result.splitOrderCountAfterUnsplit).toBe(0);
  });

  test('POS-19380 按金额分单半支付后取消分单应提示需先撤销付款', {
    annotation: [jiraIssue('POS-19380')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.preventUnsplitAmountSplitOrderAfterSemiPayment(environment.posHomeUrl);

    expect(result.unsplitAlertText).toBe(
      'The operation cannot be done due to partial payment! Please revoke the payment before preceeding.',
    );
  });

  test('POS-19383 平分分单修改子单小费后取消分单应合并小费', {
    annotation: [jiraIssue('POS-19383')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.unsplitEvenSplitOrderAfterEditingFirstSubOrderTip(environment.posHomeUrl);

    expect(result.combinedTipText).toBe('8.50');
  });

  test('POS-19386 座位分单减少子单菜品后应按小计重新分配小费', {
    annotation: [jiraIssue('POS-19386')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.reduceFirstSeatSplitSubOrderItemAndReadTips(environment.posHomeUrl);

    expect(result.firstSubOrderTipBeforeReduce).toBe('4.00');
    expect(result.firstSubOrderTipAfterReduce).toBe('3.00');
    expect(result.secondSubOrderTipAfterReduce).toBe('3.00');
  });

  test('POS-19389 座位分单子单折扣后应按小计重新分配小费', {
    annotation: [jiraIssue('POS-19389')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.discountFirstSeatSplitSubOrderItemAndReadTips(environment.posHomeUrl);

    expect(result.firstSubOrderTipBeforeDiscount).toBe('4.00');
    expect(result.firstSubOrderTipAfterDiscount).toBe('3.00');
    expect(result.secondSubOrderTipAfterDiscount).toBe('3.00');
  });

  test('POS-19517 平分信用卡和现金付款后退款记录应分别等于原付款负数', {
    annotation: [jiraIssue('POS-19517')],
  }, async ({ environment, page }) => {
    const settlementFlow = new SettlementFlow(
      new PosHomePage(page),
      new AdminPage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await settlementFlow.refundEvenPayCreditAndCashPaymentsAndReadRecords(environment.posHomeUrl);

    expect(result.firstRefundAmount).toBe(-result.firstPaymentAmount);
    expect(result.secondRefundAmount).toBe(-result.secondPaymentAmount);
  });

  test('POS-21845 按多个固定金额分单后母单总额不变且子单金额正确', {
    annotation: [jiraIssue('POS-21845')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitLargeOrderByMultipleAmountsAndReadTotals(environment.posHomeUrl);

    expect(result.parentTotalAfterSplit).toBe(result.parentTotalBeforeSplit);
    expect(result.firstSubOrderTotal).toBe(20);
    expect(result.secondSubOrderTotal).toBe(20);
  });

  test('POS-21855 Void 订单时应展示 7 个原因选项', {
    annotation: [jiraIssue('POS-21855')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const reasonCount = await orderEntryFlow.openVoidReasonsForSavedOrderAndReadCount(environment.posHomeUrl);

    expect(reasonCount).toBe(7);
  });

  test('POS-22813 分单子单清空加收后支付明细不应包含 Charge', {
    annotation: [jiraIssue('POS-22813')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.clearChargesOnPaidDragSplitSubOrdersAndReadDetails(environment.posHomeUrl);

    expect(result.firstSubOrderStatus).toBe('Paid');
    expect(result.firstSubOrderPriceDetail).not.toContain('Charge');
    expect(result.secondSubOrderStatus).toBe('Paid');
    expect(result.secondSubOrderPriceDetail).not.toContain('Charge');
    expect(result.thirdSubOrderStatus).toBe('Paid');
    expect(result.thirdSubOrderPriceDetail).not.toContain('Charge');
  });

  test('POS-23204 清空整单折扣后价格明细不应包含 Discount', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const priceDetail = await orderEntryFlow.clearWholeOrderDiscountAndReadPriceDetail(environment.posHomeUrl);

    expect(priceDetail).not.toContain('Discount');
  });

  test('POS-23204 清空第 3 个单菜折扣后该菜品不应包含 Discount', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const thirdItemText = await orderEntryFlow.clearThirdItemDiscountAndReadItemText(environment.posHomeUrl);

    expect(thirdItemText).not.toContain('Discount');
  });
});
