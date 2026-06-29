import { test, expect } from '../../fixtures/base-test.js';
import { InventoryFlow } from '../../flows/pos/inventory.flow.js';
import { InventoryPage } from '../../pages/pos/inventory.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { jiraIssue, jiraIssues } from '../../utils/jira.js';

test.describe('POS 库存', () => {
  test.beforeEach(() => {
    test.setTimeout(90_000);
  });

  test('POS-43898 POS-43890 POS-43889 未送厨点菜加菜减菜应更新库存', {
    annotation: jiraIssues(['POS-43898', 'POS-43890', 'POS-43889']),
  }, async ({ environment, page }) => {
    const inventoryFlow = createInventoryFlow(page);

    const result = await inventoryFlow.saveAndEditUnsentInventoryOrder(environment.posHomeUrl);

    expect(result.stockAfterInitialSave).toBe('Stock: 10');
    expect(result.stockAfterAdd).toBe('Stock: 5');
    expect(result.stockAfterReduce).toBe('Stock: 6');
  });

  test('POS-43898 POS-43890 POS-43889 送厨后 Void 订单应按是否恢复库存更新库存', {
    annotation: jiraIssues(['POS-43898', 'POS-43890', 'POS-43889']),
  }, async ({ environment, page }) => {
    const inventoryFlow = createInventoryFlow(page);

    const result = await inventoryFlow.voidSentInventoryOrderWithRestoreOptions(environment.posHomeUrl);

    expect(result.stockAfterSend).toBe('Stock: 10');
    expect(result.stockAfterRestoreVoid).toBe('Stock: 20');
    expect(result.stockAfterSecondSend).toBe('Stock: 15');
    expect(result.stockAfterNoRestoreVoid).toBe('Stock: 15');
  });

  test('POS-43891 库存菜品小数数量送厨后应向下显示库存并在 Void 后恢复', {
    annotation: [jiraIssue('POS-43891')],
  }, async ({ environment, page }) => {
    const inventoryFlow = createInventoryFlow(page);

    const result = await inventoryFlow.orderDecimalQuantityAndVoid(environment.posHomeUrl);

    expect(result.stockAfterDecimalSend).toBe('Stock: 6');
    expect(result.stockAfterVoidRestore).toBe('Stock: 10');
  });

  test('POS-43892 超出库存点单保存时应提示剩余库存', {
    annotation: [jiraIssue('POS-43892')],
  }, async ({ environment, page }) => {
    const inventoryFlow = createInventoryFlow(page);

    const alertText = await inventoryFlow.readInsufficientStockAlert(environment.posHomeUrl);

    expect(alertText).toBe('Insufficient stock, please modify the order.\nsuperman item4: 2 remaining.');
  });
});

function createInventoryFlow(page: import('@playwright/test').Page): InventoryFlow {
  return new InventoryFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new InventoryPage(page),
    new RecallPage(page),
  );
}
