import { test, expect } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { categorySwitchDish, chineseMenuGroups, groupSwitchDish } from '../../test-data/pos/dishes.js';

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
});
