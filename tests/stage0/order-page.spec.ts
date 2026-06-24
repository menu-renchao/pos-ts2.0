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
  numberedNameConflictDish,
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

  test('切换 POS 和 EMENU 菜单模式后搜索应返回对应菜品', {
    annotation: [jiraIssue('POS-30762')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.switchMenuModesAndSearchItems(environment.posHomeUrl);

    expect(result.posSearchResult).toBe('Broccoli Garlic Sauce');
    expect(result.eMenuSearchResult).toBe('All you can eat item');
  });

  test('Modify Global Option 点击 Add 后右侧应继续展示 Modify 区域', {
    annotation: [jiraIssue('POS-31662')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.addGlobalOptionAndReadModifyArea(environment.posHomeUrl);

    expect(result.modifyAreaVisibleAfterAdd).toBe(true);
  });

  test('Modify Global Option 修改数量为 5 和 0 后右侧应继续展示 Modify 区域', {
    annotation: [jiraIssue('POS-31663')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.changeGlobalOptionCountsAndReadModifyArea(environment.posHomeUrl, [5, 0]);

    expect(result.modifyAreaVisibleAfterFirstCount).toBe(true);
    expect(result.modifyAreaVisibleAfterZeroCount).toBe(true);
    expect(result.optionCountAfterZero).toBe(0);
  });

  test('Modify Global Option 连续 Reduce 到 0 后右侧应继续展示 Modify 区域', {
    annotation: [jiraIssue('POS-31664')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.reduceGlobalOptionToZeroAndReadModifyArea(environment.posHomeUrl);

    expect(result.modifyAreaVisibleAfterInitialCount).toBe(true);
    expect(result.modifyAreaVisibleAfterReduce).toBe(true);
    expect(result.optionCountAfterReduce).toBe(0);
  });

  test('POS-31409 下单页和订单详情卡片应展示用户信息', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createDineInOrderWithGuestNameAndReadRecall(environment.posHomeUrl, 'guest31409');

    expect(result.nameOnRecallCard).toContain('guest31409');
    expect(result.nameInOrderEdit).toContain('guest31409');
  });

  test('POS-33447 POS-33456 Search Menu 关闭时隐藏搜索框并在开启后可搜索默认菜品', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.toggleSearchMenuAndSearchDefaultItem(environment.posHomeUrl);

    expect(result.searchClassWhenDisabled).toBe('iptgrp hide');
    expect(result.searchClassWhenEnabled).toBe('iptgrp');
    expect(result.searchResult).toBe('Broccoli Garlic Sauce');
  });

  test('POS-32905 点单菜品总数量累加为整数并在 Recall 保持', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.createOrderWithIntegerItemCountAndReadRecall(environment.posHomeUrl);

    expect(result.itemCountBeforeSave).toBe('4');
    expect(result.itemCountAfterRecall).toBe('4');
  });

  test('POS-33110 点单页添加超过订单 50% 的小费应提示并在 Recall 保留小费', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.addLargeTipBeforeSaveAndReadRecall(environment.posHomeUrl);

    expect(result.tipToast).toBe('The tip is more than 50% of the meal. Confirm to add?');
    expect(result.recallTip).toBe(result.expectedTip);
  });

  test('POS-33122 信用卡付款后添加超过订单 50% 的小费应提示并保留小费', async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.addLargeTipAfterCreditPaymentAndReadRecall(environment.posHomeUrl);

    expect(result.tipToast).toBe('The tip is more than 50% of the meal. Confirm to add?');
    expect(result.recallTip).toBe(result.expectedTip);
  });

  test('POS-34873 无 Void Printed Item 权限时删除 Hold 打印菜需经理密码且删除成功', {
    annotation: [jiraIssue('POS-34873')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.deleteHeldPrintedItemWithManagerPassword(environment.posHomeUrl);

    expect(result.permissionToast).toContain('You do not have permission to delete printed dish, please enter the password');
    expect(result.itemLineCountAfterDelete).toBe(1);
  });

  test('POS-35325 无 Void Printed Item 权限时减少 Delay 打印菜到 0 需经理密码且删除成功', {
    annotation: [jiraIssue('POS-35325')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.deleteDelayedPrintedItemWithManagerPassword(environment.posHomeUrl);

    expect(result.permissionToast).toContain('You do not have permission to delete printed dish, please enter the password');
    expect(result.itemLineCountAfterDelete).toBe(1);
  });

  test('POS-34895 不自动合并相同菜时连续点同一菜应展示三行', {
    annotation: [jiraIssue('POS-34895')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.createThreeSameItemsWithoutAutoCombine(environment.posHomeUrl);

    expect(result.itemLineCount).toBe(3);
  });

  test('POS-34903 自动合并相同状态菜时已送厨菜和新加菜应分两行', {
    annotation: [jiraIssue('POS-34903')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.addSameItemAfterKitchenWithSameStatusCombine(environment.posHomeUrl);

    expect(result.itemLineCount).toBe(2);
  });

  test('POS-34910 合并包含已送厨相同菜时应展示一行数量 2 和 In Kitchen 标记', {
    annotation: [jiraIssue('POS-34910')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.addSameItemAfterKitchenWithIncludeKitchenCombine(environment.posHomeUrl);

    expect(result.itemLineCount).toBe(1);
    expect(result.firstItemQuantity).toBe('2');
    expect(result.firstItemName).toContain('(1In Kitchen)');
    expect(result.firstItemColor).toContain('rgba(113, 9, 9, 1)');
  });

  test('POS-34842 关闭减菜自动跳转后当前菜减到 0 应停留原 Category', {
    annotation: [jiraIssue('POS-34842')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.reduceItemWithAutoRedirectDisabled(environment.posHomeUrl);

    expect(result.orderItemOptionListVisible).toBe(false);
    expect(result.originalCategoryItemStillVisible).toBe(true);
  });

  test('POS-33186 支持小数数量时 1.25 菜品连续 Reduce 两次后数量应归零', {
    annotation: [jiraIssue('POS-33186')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.reduceDecimalQuantityToZero(environment.posHomeUrl);

    expect(result.itemCountAfterReduce).toBe('0');
  });

  test('POS-33241 小数数量菜品拖拽分单后子单数量和金额应正确', {
    annotation: [jiraIssue('POS-33241')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.splitDecimalQuantityOrderByDrag(environment.posHomeUrl);

    expect(result.firstSubOrderDishQuantity).toContain('2.55');
    expect(result.firstSubOrderTotal).toBe(result.firstItemTotal);
  });

  test('POS-33244 小数数量订单合单后两个菜数量和总额应正确', {
    annotation: [jiraIssue('POS-33244')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.combineDecimalQuantityOrders(environment.posHomeUrl);

    expect(result.firstDishQuantity).toBe('2.55');
    expect(result.secondDishQuantity).toBe('2.55');
    expect(result.combinedTotal).toBeCloseTo(result.firstOrderTotal + result.secondOrderTotal, 2);
  });

  test('POS-33600 三个指定价格小数数量菜保存后 Recall 小计应为 64.24', {
    annotation: [jiraIssue('POS-33600')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const subtotal = await orderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal(environment.posHomeUrl, [
      { dish: 'groupSwitchDish', price: 6.5, quantity: 2.55 },
      { dish: 'categorySwitchDish', price: 5.5, quantity: 3.66 },
      { dish: 'categoryOptionDish', price: 7.5, quantity: 3.67 },
    ]);

    expect(subtotal).toBe(64.24);
  });

  test('POS-33600 两个指定价格小数数量菜保存后 Recall 小计应为 23.78', {
    annotation: [jiraIssue('POS-33600')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const subtotal = await orderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal(environment.posHomeUrl, [
      { dish: 'groupSwitchDish', price: 6.5, quantity: 1.5 },
      { dish: 'categorySwitchDish', price: 5.5, quantity: 2.55 },
    ]);

    expect(subtotal).toBe(23.78);
  });

  test('POS-33600 三个指定价格菜部分小数数量保存后 Recall 小计应为 44.27', {
    annotation: [jiraIssue('POS-33600')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const subtotal = await orderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal(environment.posHomeUrl, [
      { dish: 'groupSwitchDish', price: 6.5, quantity: 2.55 },
      { dish: 'categorySwitchDish', price: 5.5, quantity: 3.67 },
      { dish: 'categoryOptionDish', price: 7.5 },
    ]);

    expect(subtotal).toBe(44.27);
  });

  test('POS-35129 关闭小数数量后输入 2.55 应按 255 展示', {
    annotation: [jiraIssue('POS-35129')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.enterDecimalQuantityWhenDecimalCountDisabled(environment.posHomeUrl);

    expect(result.dishQuantity).toBe('255');
  });

  test('POS-35660 自动合并同菜时小数数量菜添加两个 Global Option 应拆行并保持总额', {
    annotation: [jiraIssue('POS-35660')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const result = await orderEntryFlow.addGlobalOptionsToDecimalCombinedItemAndReadTotals(environment.posHomeUrl);

    expect(result.firstDishQuantity).toBe('0.3');
    expect(result.secondDishQuantity).toBe('2');
    expect(result.secondDishPrice).toBeCloseTo(result.optionPrice * 2 + result.itemUnitPrice * 2, 2);
    expect(result.recallTotal).toBe(result.totalBeforeSave);
  });

  test('POS-22640 自定义 Delivery 订单保存后 Recall 打印应显示 Reprint 并生成三份输出', {
    annotation: [jiraIssue('POS-22640')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      undefined,
      new DeliveryPage(page),
    );

    const result = await orderEntryFlow.printCustomDeliveryOrderAndReadPrintState(environment.posHomeUrl);

    expect(result.reprintVisible).toBe(true);
    expect(result.printFileCount).toBe(3);
  });

  test('POS-36286 Delivery 填写客户信息进入点单页后点击 Exit 应回到首页', {
    annotation: [jiraIssue('POS-36286')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      undefined,
      new DeliveryPage(page),
    );

    const welcomeText = await orderEntryFlow.exitDeliveryOrderAndReadHomeWelcome(environment.posHomeUrl);

    expect(welcomeText).toContain('Welcome');
  });

  test('POS-36255 菜名和 Number 相同时点单搜索应只返回一个结果', {
    annotation: [jiraIssue('POS-36255')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.searchDishWithSameNameAndNumberAndReadResult(environment.posHomeUrl);

    expect(result.searchKeyword).toBe(numberedNameConflictDish.name);
    expect(result.searchResultText).toBe(numberedNameConflictDish.name);
    expect(result.searchResultCount).toBe(1);
  });
});
