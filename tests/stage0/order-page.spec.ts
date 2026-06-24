import { test, expect } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { DeliveryPage } from '../../pages/pos/delivery.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import {
  categoryNoSubOptionDish,
  categoryOptionDish,
  categorySubOptionDish,
  categorySwitchDish,
  chineseCategoryDish,
  chineseMenuGroups,
  groupSwitchDish,
  itemNoOptionDish,
  itemNoSubOptionDish,
  itemOptionDish,
  itemSubOptionDish,
} from '../../test-data/pos/dishes.js';
import { validEmployeePassword } from '../../test-data/pos/permissions.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('POS 点单页面', () => {
  test('切换菜单组点单后 Recall 应展示同一菜品和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const recalledItems = await orderEntryFlow.createTogoOrderAndReadRecall(environment.posHomeUrl, groupSwitchDish);

    expect(recalledItems).toHaveLength(1);
    expect(recalledItems[0]?.name).toBe(groupSwitchDish.name);
    expect(recalledItems[0]?.price).toBe(groupSwitchDish.price);
  });

  test('中文模式点单页应展示中文菜单组', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const menuGroups = await orderEntryFlow.readChineseMenuGroups(environment.posHomeUrl);

    expect(menuGroups).toContain(chineseMenuGroups.lunch);
    expect(menuGroups).toContain(chineseMenuGroups.chinese);
  });

  test('切换菜单类别点单后 Recall 应展示同一菜品和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const recalledItems = await orderEntryFlow.createTogoOrderAndReadRecall(environment.posHomeUrl, categorySwitchDish);

    expect(recalledItems).toHaveLength(1);
    expect(recalledItems[0]?.name).toBe(categorySwitchDish.name);
    expect(recalledItems[0]?.price).toBe(categorySwitchDish.price);
  });

  test('送厨后编辑加菜应正确更新订单税额', {
    annotation: [jiraIssue('POS-30543')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const taxResult = await orderEntryFlow.addItemAfterSendKitchenAndReadTaxes(environment.posHomeUrl);

    expect(taxResult.beforeEditTax).toBe(1.2);
    expect(taxResult.afterEditTax).toBe(1.8);
  });

  test('点支付前客户姓名和电话必填时应持续展示客户信息弹框直到填写完整', {
    annotation: [jiraIssue('POS-42889')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.requireCustomerInfoBeforePayment(environment.posHomeUrl);

    expect(result.popupVisibleBeforeInput).toBe(true);
    expect(result.popupVisibleAfterEmptySubmit).toBe(true);
    expect(result.popupVisibleAfterValidSubmit).toBe(false);
  });

  test('无删菜权限用户输入正确密码后可完成删菜并在 Recall 展示 Voided', {
    annotation: [jiraIssue('POS-39750')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const itemState = await orderEntryFlow.voidItemWithManagerPassword(environment.posHomeUrl, validEmployeePassword);

    expect(itemState).toContain('Voided');
  });

  test('菜品改价时可选择单菜折扣', {
    annotation: [jiraIssue('POS-42886')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const priceResult = await orderEntryFlow.applyItemDiscountAndReadPrice(environment.posHomeUrl, 0.1);

    expect(priceResult.discountedPrice).toBe(priceResult.originalPrice * 0.9);
  });

  test('Modify 添加备注后保存订单应在菜品备注中展示名称和价格', {
    annotation: [jiraIssue('POS-42888')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const note = await orderEntryFlow.addModifyNoteAndReadRecallOption(environment.posHomeUrl);

    expect(note.name).toBe('This is a test note');
    expect(note.price).toBe(1.23);
  });

  test('点单加小费平分订单后合并子单应恢复完整小费金额', {
    annotation: [jiraIssue('POS-39762')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitTipEvenlyAndCombine(environment.posHomeUrl);

    expect(result.firstSubOrderTip).toBe(1);
    expect(result.combinedTip).toBe(2);
  });

  test('Open Food 不选择税时可现金付款并在 Recall 展示 Paid', {
    annotation: [jiraIssue('POS-42011')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const status = await orderEntryFlow.payOpenFoodWithoutTax(environment.posHomeUrl);

    expect(status).toBe('Paid');
  });

  test('连续创建两个无姓名 Pickup 订单后修改前一单客名不影响后一单', {
    annotation: [jiraIssue('POS-42943')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.editPreviousPickupGuestNameWithoutAffectingLatest(environment.posHomeUrl);

    expect(result.latestOrderCustomerName).toBeNull();
    expect(result.previousOrderCustomerName).toBe('(ren)');
  });

  test('选择类级 Option 后保存订单应在 Recall 保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, categoryOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('中文类菜品保存订单后应在 Recall 保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, chineseCategoryDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('选择类级 Option 和二级 Option 后保存订单应在 Recall 保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, categorySubOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('只选择类级 Option 未选二级 Option 时 Recall 应保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, categoryNoSubOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('菜品带二级 Option 但只选择一级 Option 时 Recall 应保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, itemNoSubOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('选择菜品级 Option 后保存订单应在 Recall 保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, itemOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('菜品级 Option 未选择时 Recall 应保留基础菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, itemNoOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('选择菜品级 Option 和二级 Option 后 Recall 应保留菜名和价格', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOptionOrderAndReadRecall(environment.posHomeUrl, itemSubOptionDish);

    expect(result.recalledItems).toHaveLength(1);
    expect(result.recalledItems[0]?.name).toBe(result.orderedItem.name);
    expect(result.recalledItems[0]?.price).toBe(result.orderedItem.price);
  });

  test('Recall 平分订单为两份时子单数量和金额应正确', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitOrderEvenlyAndReadSummary(environment.posHomeUrl, 2);

    expect(result.splitOrderCount).toBe(2);
    expect(result.splitOrderPrices).toEqual([result.originalTotal / 2, result.originalTotal / 2]);
  });

  test('Recall 按菜分单时每个子单金额应等于对应菜品金额', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitOrderByItemAndReadSummary(environment.posHomeUrl);

    expect(result.splitOrderCount).toBe(2);
    expect(result.splitOrderPrices).toEqual(result.splitItemPrices);
  });

  test('Dine In 按座位分单时每个子单金额应等于对应菜品金额', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitDineInOrderBySeatAndReadSummary(environment.posHomeUrl);

    expect(result.splitOrderCount).toBe(2);
    expect(result.splitOrderPrices).toEqual(result.splitItemPrices);
  });

  test('Recall 按金额自定义分单时子单金额应等于输入金额', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitOrderByAmountAndReadSummary(environment.posHomeUrl, [2, 8.6]);

    expect(result.splitOrderCount).toBe(2);
    expect(result.splitOrderPrices).toEqual([2, 8.6]);
  });

  test('Recall 取消已平分订单后订单总额应恢复原值', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.cancelEvenSplitAndReadTotals(environment.posHomeUrl, 2);

    expect(result.splitOrderCountBeforeCancel).toBe(2);
    expect(result.totalAfterCancel).toBe(result.originalTotal);
  });

  test('Dine In 按菜平分时每个子单金额应等于对应菜品金额', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitDineInOrderByItemAndReadSummary(environment.posHomeUrl);

    expect(result.splitOrderCount).toBe(2);
    expect(result.splitOrderPrices).toEqual(result.splitItemPrices);
  });

  test('拖拽分单支付第一个子单后应保留子单状态和母单背景色', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.splitOrderByDragPayFirstSubOrderAndReadStatuses(environment.posHomeUrl);

    expect(result.firstSubOrderStatus).toBe('Paid');
    expect(result.secondSubOrderStatus).toBe('New Order');
    expect(result.parentOrderBackground).toBe('rgba(33, 150, 243, 1)');
  });

  test('Open Food 多语言键盘输入中文后应生成中文菜名', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const itemName = await orderEntryFlow.createChineseOpenFoodWithMultiLanguageKeyboard(environment.posHomeUrl);

    expect(itemName).toBe('中文');
  });

  test('特殊价格菜设置 50% 单菜折扣后 Recall 小计应为 2.92', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const subtotal = await orderEntryFlow.applySpecialPriceHalfDiscountAndReadRecallSubtotal(environment.posHomeUrl);

    expect(subtotal).toBe(2.92);
  });

  test('Delivery 点单后 Info 应展示预输入客户信息', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      undefined,
      new DeliveryPage(page),
    );

    const info = await orderEntryFlow.createDeliveryOrderAndReadInfo(environment.posHomeUrl);

    expect(info).toEqual(['(012)345-67890', 'pos-test', 'menusifu-test', '55', 'New York', 'NY', '10016', '我的备注']);
  });

  test('Combo 子菜连续减少 Option 后数量应减少 3', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.reduceComboOptionsAndReadCounts(environment.posHomeUrl);

    expect(result.afterCount).toBe(result.beforeCount - 3);
  });
});
