import { test, expect } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { categorySwitchDish, chineseMenuGroups, groupSwitchDish } from '../../test-data/pos/dishes.js';
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
});
