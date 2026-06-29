import { expect, test } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { SettlementFlow } from '../../flows/pos/settlement.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { DeliveryPage } from '../../pages/pos/delivery.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { ReportPage } from '../../pages/pos/report.page.js';
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

  test('POS-23322 部分支付添加小费后未付金额应扣除已付现金并最终 Paid', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.partiallyPayTaxExemptOrderAddTipAndReadStatus(environment.posHomeUrl);

    expect(result.unpaidAmountAfterTip).toBeCloseTo(result.originalTotal - 4, 2);
    expect(result.orderStatus).toBe('Paid');
  });

  test('POS-24394 添加 No 全局 Option 并复制订单后总额应保持不变', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.addNoPriceGlobalOptionCopyOrderAndReadTotals(environment.posHomeUrl);

    expect(result.totalAfterNoOption).toBe(result.totalBeforeNoOption);
    expect(result.totalAfterCopy).toBe(result.totalAfterNoOption);
    expect(result.recalledCopiedTotal).toBe(result.totalAfterNoOption);
  });

  test('POS-23671 两个免税菜品订单应用不计税加收后合单总额应相加', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.combineTwoTaxExemptOrdersWithNonTaxableChargeAndReadTotals(
      environment.posHomeUrl,
    );

    expect(result.combinedTotal).toBeCloseTo(result.firstOrderTotal + result.secondOrderTotal, 2);
  });

  test('POS-23672 两个免税菜品订单应用计税加收后合单总额应相加', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.combineTwoTaxExemptOrdersWithTaxableChargeAndReadTotals(
      environment.posHomeUrl,
    );

    expect(result.combinedTotal).toBeCloseTo(result.firstOrderTotal + result.secondOrderTotal, 2);
  });

  test('POS-25235 平分分单两个子单现金支付后子单 1 可追加现金小费', {
    annotation: [jiraIssue('POS-25235')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.addCashTipToFirstPaidEvenSplitSubOrder(environment.posHomeUrl);

    expect(result.firstSubOrderTipAfterCashTip).toBe('1.00');
    expect(result.secondSubOrderStatusAfterCashPay).toBe('Paid');
  });

  test('POS-27156 编辑订单时修改手动加收名称后重新选择应更新订单加收名称', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.renameManualFixedChargeThenReapplyInRecalledOrder(environment.posHomeUrl);

    expect(result.recalledChargeBeforeReapply).toEqual({ manu_test_fixed: '10.00' });
    expect(result.modifiedChargeSelectedInDialog).toBe(true);
    expect(result.recalledChargeAfterReapply).toEqual({ mod_test1: '10.00' });
  });

  test('POS-27157 编辑订单时修改手动固定加收为百分比后重新选择应按小计计算加收', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.convertManualFixedChargeToPercentThenReapplyInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.initialChargeBeforeSave).toEqual({ manu_test_fixed: '10.00' });
    expect(result.selectedChargesAfterRateTypeChange).toEqual({ manu_test_fixed: 'Add10%' });
    expect(result.recalledChargeAfterReapply.manu_test_fixed).toBe((result.recalledSubtotal * 0.1).toFixed(2));
  });

  test('POS-27158 编辑订单时修改手动百分比加收为固定金额后确认应更新加收金额', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.convertManualPercentChargeToFixedThenConfirmInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.initialChargeBeforeSave.manu_test_perc).toBe((result.initialSubtotal * 0.1).toFixed(2));
    expect(result.selectedChargesAfterRateTypeChange).toEqual({ manu_test_perc: 'Add $10.00' });
    expect(result.recalledChargeAfterConfirm).toEqual({ manu_test_perc: '10.00' });
  });

  test('POS-27159 编辑订单时修改手动固定加收金额后确认应更新加收金额', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.modifyManualFixedChargeAmountThenConfirmInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.initialChargeBeforeSave).toEqual({ manu_test_fixed: '10.00' });
    expect(result.selectedChargesAfterAmountChange).toEqual({ manu_test_fixed: 'Add $20.00' });
    expect(result.recalledChargeAfterConfirm).toEqual({ manu_test_fixed: '20.00' });
  });

  test('POS-27160 编辑订单时修改手动百分比加收值后确认应按新百分比重算', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.modifyManualPercentChargeValueThenConfirmInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.initialChargeBeforeSave.manu_test_perc).toBe((result.initialSubtotal * 0.1).toFixed(2));
    expect(result.selectedChargesAfterPercentChange).toEqual({ manu_test_perc: 'Add20%' });
    expect(result.recalledChargeAfterConfirm.manu_test_perc).toBe((result.recalledSubtotal * 0.2).toFixed(2));
  });

  test('POS-27163 编辑订单时修改手动固定加收计税后确认应增加税额', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.modifyManualFixedChargeTaxedThenConfirmInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.originTaxBeforeEdit).toBe(result.taxAfterEnteringEdit);
    expect(result.taxAfterConfirmCharge).toBeGreaterThan(result.taxAfterEnteringEdit);
  });

  test('POS-27164 编辑订单时修改手动加收订单类型满足当前 Dine In 应保留加收', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.keepManualFixedChargeWhenOrderTypeStillMatchesAfterEdit(
      environment.posHomeUrl,
    );

    expect(result.chargeBeforeConfirm).toEqual({ manu_test_fixed: '10.00' });
    expect(result.selectedChargesAfterOrderTypeChange.manu_test_fixed).toBeTruthy();
    expect(result.chargeAfterConfirm).toEqual({ manu_test_fixed: '10.00' });
  });

  test('POS-27165 编辑订单时修改手动加收订单类型不满足当前 Dine In 弹窗不应再选中但订单保留原加收', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.keepExistingManualFixedChargeWhenOrderTypeNoLongerMatchesAfterEdit(
      environment.posHomeUrl,
    );

    expect(result.chargeBeforeSave).toEqual({ manu_test_fixed: '10.00' });
    expect(result.selectedChargesAfterOrderTypeChange).not.toHaveProperty('manu_test_fixed');
    expect(result.chargeAfterConfirm).toEqual({ manu_test_fixed: '10.00' });
  });

  test('POS-27169 编辑订单时删除手动加收配置后应保留旧订单加收并在弹窗回显已选项', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.deleteAllManualChargesThenKeepLegacySelectionInRecalledOrder(
      environment.posHomeUrl,
    );

    expect(result.chargeBeforeConfirm).toEqual({ manu_test_fixed: '10.00' });
    expect(result.selectedChargesAfterDelete).toEqual({ manu_test_fixed: 'Add $10.00' });
    expect(result.chargeAfterConfirm).toEqual({ manu_test_fixed: '10.00' });
  });

  test('POS-27170 编辑订单时修改自动加收名称后应按新名称显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.renameAutoFixedChargeThenReadRecalledOrderCharge(environment.posHomeUrl);

    expect(result.recalledChargeAfterRename).toEqual({ auto_test1: '10.00' });
  });

  test('POS-27171 编辑订单时修改自动固定加收为百分比后应按小计计算加收', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.convertAutoFixedChargeToPercentThenReadRecalledOrderCharge(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterRateTypeChange.auto_test_fixed).toBe(
      (result.recalledSubtotal * 0.1).toFixed(2),
    );
  });

  test('POS-27172 编辑订单时修改自动百分比加收为固定金额后应显示 10.00', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.convertAutoPercentChargeToFixedThenReadRecalledOrderCharge(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterRateTypeChange).toEqual({ auto_test_percentage: '10.00' });
  });

  test('POS-27173 编辑订单时修改自动固定加收金额后应显示 20.00', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.modifyAutoFixedChargeAmountThenReadRecalledOrderCharge(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterAmountChange).toEqual({ auto_test_fixed: '20.00' });
  });

  test('POS-27174 编辑订单时修改自动百分比加收值后应按新百分比重算', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.modifyAutoPercentChargeValueThenReadRecalledOrderCharge(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterPercentChange.auto_test_percentage).toBe(
      (result.recalledSubtotal * 0.2).toFixed(2),
    );
  });

  test('POS-27176 编辑订单时修改自动加收适用类型不含当前 Dine In 后不应显示加收', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.removeAutoChargeWhenOrderTypeNoLongerMatchesAfterEdit(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterOrderTypeChange).toEqual({});
  });

  test('POS-27177 编辑订单时修改自动固定加收计税后税额应增加', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.increaseTaxWhenAutoFixedChargeBecomesTaxedAfterEdit(
      environment.posHomeUrl,
    );

    expect(result.taxAfterEnteringEdit).toBeGreaterThan(result.taxBeforeSave);
  });

  test('POS-27182 编辑订单时删除自动固定加收后不应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.removeDeletedAutoFixedChargeFromRecalledOrderEdit(
      environment.posHomeUrl,
    );

    expect(result.recalledChargeAfterDelete).toEqual({});
  });

  test('POS-27190 详情页送厨时修改自动固定加收后应保留原加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.sendKitchenFromRecallAfterModifyingAutoFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.recallChargeAfterSendKitchen).toEqual({
      auto_test_fixed: '10.00',
    });
  });

  test('POS-27191 编辑页送厨时修改手动固定加收后应保留原加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.sendKitchenFromEditAfterModifyingManualFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.recallChargeAfterEditSendKitchen).toEqual({
      manu_test_fixed: '10.00',
    });
  });

  test('POS-27192 编辑页送厨时修改自动固定加收后应使用新加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.saveEditAfterModifyingAutoFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.recallChargeAfterEditSave).toEqual({
      mod_test1: '20.00',
    });
  });

  test('POS-27229 详情页分单时修改自动固定加收后子单应保留旧加收分摊', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.splitRecallOrderAfterModifyingAutoFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.firstSubOrderCharge.auto_test_fixed).toContain('5.0');
  });

  test('POS-27242 编辑页分单时修改手动固定加收后子单应保留旧加收按小计分摊', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.splitEditOrderAfterModifyingManualFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.firstSubOrderCharge.manu_test_fixed).toBe(result.expectedFirstSubOrderCharge);
  });

  test('POS-27248 编辑页分单时修改自动固定加收后子单应使用新加收分摊', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.splitEditOrderAfterModifyingAutoFixedCharge(
      environment.posHomeUrl,
    );

    expect(result.firstSubOrderCharge.mod_test1).toBe('10.00');
  });

  test('POS-27257 复制订单时修改自动加收为百分比后复制单应使用新加收计算', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterModifyingAutoChargeToPercent(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge.mod_test1).toBe(result.expectedCopiedCharge);
  });

  test('POS-27258 复制订单时修改自动加收最小人数满足条件后应保留加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterModifyingAutoChargeMinGuest(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge.auto_test1).toBe('10.00');
  });

  test('POS-27259 复制订单时修改自动加收最小人数不满足条件后不应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterModifyingAutoChargeMinGuestMismatch(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge).toEqual({});
  });

  test('POS-27271 复制配送订单时修改自动加收最小里程不满足条件后不应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
      new DeliveryPage(page),
    );

    const result = await orderEntryFlow.copyDeliveryOrderAfterModifyingAutoChargeMinMileMismatch(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge).toEqual({});
  });

  test('POS-27286 复制订单时修改自动加收触发类型为手动后不应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterChangingAutoChargeTriggerToManual(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge).toEqual({});
  });

  test('POS-27287 复制订单时修改手动加收触发类型为自动后应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterChangingManualChargeTriggerToAuto(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge).toEqual({
      manu_test_fixed: '10.00',
    });
  });

  test('POS-27288 复制订单时修改手动加收为自动且最小金额不满足后不应显示加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.copyOrderAfterChangingManualChargeTriggerToAutoWithMinAmountMismatch(
      environment.posHomeUrl,
    );

    expect(result.copiedOrderCharge).toEqual({});
  });

  test('POS-27303 合单时修改和删除手动加收配置后应累加旧订单加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.combineOrdersAfterModifyingManualCharges(
      environment.posHomeUrl,
    );

    expect(result.combinedOrderChargeItems).toEqual({
      auto_test1: '10.00',
      auto_test2: '10.00',
    });
    expect(result.combinedOrderChargeTotal).toBe('20.00');
  });

  test('POS-27314 移菜到新单时修改自动加收后新单无加收且原单保留旧加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.moveFirstItemToNewOrderAfterModifyingAutoCharge(
      environment.posHomeUrl,
    );

    expect(result.movedOrderCharge).toEqual({});
    expect(result.originalOrderCharge).toEqual({
      auto_test1: '10.00',
    });
  });

  test('POS-27317 移菜到已有订单时目标单不继承手动加收且源单保留加收', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.moveFirstItemToExistingOrderWithManualCharge(
      environment.posHomeUrl,
    );

    expect(result.targetOrderSubtotalAfterMove).toBeCloseTo(
      result.targetOrderSubtotalBeforeMove + result.movedItemPrice,
      2,
    );
    expect(result.targetOrderCharge.manu_test_fixed).toBeUndefined();
    expect(result.sourceOrderCharge).toEqual({
      manu_test_fixed: '10.00',
    });
  });

  test('POS-27324 移单时修改自动加收后子单应保留旧加收快照', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.moveSubOrderAfterModifyingAutoCharge(environment.posHomeUrl);

    expect(result.subOrderChargeBeforeMove).toHaveProperty('auto_test_fixed');
    expect(result.movedOrderCharge).toEqual(result.subOrderChargeBeforeMove);
  });

  test('POS-27325 移单时删除自动加收后子单应保留旧加收快照', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.moveSubOrderAfterDeletingAutoCharge(environment.posHomeUrl);

    expect(result.subOrderChargeBeforeMove).toHaveProperty('auto_test_fixed');
    expect(result.movedOrderCharge).toEqual(result.subOrderChargeBeforeMove);
  });

  test('POS-30756 信用卡付款后追加小费并切换服务员后状态和金额应保持一致', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.addTipAfterCreditPaymentThenChangeServer(environment.posHomeUrl);

    expect(result.serverNameAfter).not.toBe(result.serverNameBefore);
    expect(result.statusAfterTip).toBe(result.statusAfterServerChange);
    expect(result.totalAfterTip).toBeCloseTo(result.paymentAmountAfterTip, 2);
    expect(result.totalAfterServerChange).toBeCloseTo(result.totalAfterTip, 2);
    expect(result.paymentAmountAfterServerChange).toBeCloseTo(result.paymentAmountAfterTip, 2);
  });

  test('POS-31301 Recall 清空单菜折扣后折扣行金额应恢复原菜价', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.clearRecalledItemDiscountsAndReadPrices(environment.posHomeUrl);

    expect(result.itemPriceAfterClear).toBeCloseTo(result.itemOriginalPrice, 2);
  });

  test('POS-31081 自动加收算小费时金额分单后报表 Fee Amount 应保持加收小费', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
      undefined,
      new ReportPage(page),
    );

    const result = await orderEntryFlow.createAutoChargeAsTipOrderSplitByAmountAndReadReportFees(
      environment.posHomeUrl,
    );

    expect(result.feeAfterOrder).toBeCloseTo(result.feeBefore + 10, 2);
    expect(result.feeAfterSplit).toBeCloseTo(result.feeAfterOrder, 2);
  });

  test('POS-30566 信用卡部分退款后 Report 首页 Unpaid 应保持不变', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      undefined,
      undefined,
      new ReportPage(page),
    );

    const result = await orderEntryFlow.refundCreditPaymentAndReadReportHomepageUnpaid(
      environment.posHomeUrl,
    );

    expect(result.unpaidAfterRefund).toBeCloseTo(result.unpaidBeforeRefund, 2);
  });

  test('POS-32002 合单重算加收关闭时含计税自动加收订单合并后应保留旧加收并重算税', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.combineTaxedAutoChargeOrderWithoutRecalculatingCharge(
      environment.posHomeUrl,
    );

    expect(result.combinedOrderChargeItems.auto_test_fixed).toBe('10.00');
    expect(result.combinedTax).toBeCloseTo(result.expectedCombinedTax, 2);
  });

  test('POS-32004 合单重算加收关闭时手动小费加收合并后应保留且 Report Fee 不变', async ({
    environment,
    page,
  }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
      undefined,
      new ReportPage(page),
    );

    const result = await orderEntryFlow.combineManualShareTipChargeOrderWithoutChangingReportFee(
      environment.posHomeUrl,
    );

    expect(result.combinedOrderChargeItems.manu_test_perc).toBe(result.chargeBeforeCombine);
    expect(result.combinedChargeTotal).toBe(result.chargeBeforeCombine);
    expect(result.feeAfterCombine).toBeCloseTo(result.feeBeforeCombine, 2);
  });
});
