import { expect, test } from '../../fixtures/base-test.js';
import { AdminMenuFlow } from '../../flows/pos/admin-menu.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { jiraIssue, jiraIssues } from '../../utils/jira.js';

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

  test(
    'POS-44624 称重 Quick Combo 保存后 Recall 应保留主套餐菜名',
    {
      annotation: jiraIssue('POS-44624'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        undefined,
        new RecallPage(page),
      );

      const itemNames = await flow.orderWeightedQuickComboAndReadRecallItems(environment.posHomeUrl);

      expect(itemNames).toEqual(['weight combo']);
    },
  );

  test(
    'POS-42067 POS-42066 批量 Replace 菜品标签后详情页应展示所选标签',
    {
      annotation: jiraIssues(['POS-42067', 'POS-42066']),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const result = await flow.batchReplaceItemPropertiesAndReadDetail(environment.posHomeUrl);

      expect(new Set(result.itemProperties)).toEqual(new Set(result.selectedLabels));
      expect(result.allProperties).toEqual(
        expect.arrayContaining(['Gluten-free', 'Vege', 'Lactose-free']),
      );
    },
  );

  test(
    'POS-37827 菜品启用 Take Out Tax Free 后应确认提示并记录税务 Audit Log',
    {
      annotation: jiraIssue('POS-37827'),
    },
    async ({ environment, page, posDbClient }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const result = await flow.enableTakeOutTaxFreeAndReadOrderTaxAudit(environment.posHomeUrl, posDbClient);

      expect(result.confirmationMessage).toBe(
        'No tax will apply to the Item when take out.Are you sure you want to save?',
      );
      expect(result.orderTax).toBe(result.expectedTax);
      expect(result.auditLog).toMatchObject({
        operateType: 'Edit',
        operateItem: 'Edit Menu Item Tax',
        operateCategory: 'Tax',
        operatePath: 'Menu-Menu',
        displayName: 'Edit Menu Item Tax',
      });
      expect(result.auditLog.oldValue).toContain('take out orders taxes');
      expect(result.auditLog.newValue).toContain('take out orders tax free');
    },
  );

  test(
    'POS-37830 选择 CRM 会员后菜品应展示会员价',
    {
      annotation: jiraIssue('POS-37830'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page), new OrderDishesPage(page));

      const prices = await flow.orderBenefitPriceItemAndReadPrices(environment.posHomeUrl, new PosCrmPage(page));

      expect(prices.beforeMemberPrice).toBe(8);
      expect(prices.afterMemberPrice).toBe(6);
    },
  );
});
