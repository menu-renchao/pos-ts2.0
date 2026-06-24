import { expect, test } from '../../fixtures/base-test.js';
import { AdminMenuFlow } from '../../flows/pos/admin-menu.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('stage1 admin menu migration', () => {
  test(
    'POS-31467 POS Global Option Group 应能复制到 Emenu Menu',
    {
      annotation: jiraIssue('POS-31467'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const categoryCount = await flow.copyPosGlobalOptionGroupToEmenuAndReadCount(environment.posHomeUrl);

      expect(categoryCount).toBeGreaterThan(0);
    },
  );

  test(
    'POS-33919 普通菜设置为称重菜后应按输入重量保持原单价计算',
    {
      annotation: jiraIssue('POS-33919'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const result = await flow.orderUnitPriceItemAndReadPrice(environment.posHomeUrl);

      expect(result.unitPriceInputVisible).toBe(true);
      expect(result.itemPrice).toBe(20);
    },
  );

  test('POS-34360 修改菜品中文名后多语言 POS Name 和 Kitchen Name 应同步', async ({ environment, page }) => {
    const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

    const names = await flow.modifyItemChineseNameAndReadLanguageNames(environment.posHomeUrl);

    expect(names.posName).toBe('普通菜1的中文菜名');
    expect(names.kitchenName).toBe('普通菜1的中文菜名');
  });

  test('POS-35406 Global Option 批量 Add Printer 后应保存打印机', async ({ environment, page }) => {
    const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

    const result = await flow.addPrintersToGlobalOptionAndReadPrinters(environment.posHomeUrl);

    expect(result.afterCashPrinter).toEqual(['Cash']);
    expect(result.afterRunnerPrinter).toEqual(['Cash', 'Runner']);
  });

  test('POS-36298 POS Menu 页面菜品总数应与 Menu API 一致', async ({ environment, menuClient, page }) => {
    const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page), menuClient);

    const count = await flow.readPosMenuItemCountFromPageAndApi(environment.posHomeUrl);

    expect(count.pageCount).toBe(count.apiCount);
    expect(count.pageCount).toBeGreaterThan(0);
  });

  test(
    'POS-42064 批量设置套餐模式后后台详情和点单页应识别 Quick Combo',
    {
      annotation: jiraIssue('POS-42064'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const result = await flow.batchEditQuickComboModeAndReadStates(environment.posHomeUrl);

      expect(result.afterDisableQuickCombo).toBe(false);
      expect(result.afterEnableQuickCombo).toBe(true);
      expect(result.orderPageQuickCombo).toBe(true);
    },
  );
});
