import { expect, test } from '../../fixtures/base-test.js';
import { ProductLineInventoryFlow } from '../../flows/pos/product-line-inventory.flow.js';
import { KioskHomePage } from '../../pages/kiosk/home.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { InventoryPage } from '../../pages/pos/inventory.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';

test.describe('stage2 product-line inventory migration', () => {
  test('POS-43892 Kiosk 产线限量库存第 3 次加菜应提示库存不足', {
    annotation: { type: 'issue', description: 'POS-43892' },
  }, async ({ environment, menuClient, page }) => {
    const flow = new ProductLineInventoryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new InventoryPage(page),
      new KioskHomePage(page),
    );

    const result = await flow.verifyProductLineInventory(environment.posHomeUrl, menuClient, 'KIOSK');

    expect(result.productLine).toBe('KIOSK');
    expect(result.configuredQuantity).toBe(2);
    expect(result.requestedQuantity).toBe(3);
    expect(result.soldOutPopupVisible).toBe(true);
  });
});
