import type { MenuClient } from '../../clients/pos-api/menu.client.js';
import type { KioskHomePage } from '../../pages/kiosk/home.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { InventoryPage } from '../../pages/pos/inventory.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { kioskLimitedStockDish } from '../../test-data/pos/dishes.js';
import { step } from '../../utils/step.js';

export type ProductLineInventoryResult = {
  configuredQuantity: number;
  productLine: 'KIOSK';
  requestedQuantity: number;
  soldOutPopupVisible: boolean;
};

export class ProductLineInventoryFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly inventoryPage: InventoryPage,
    private readonly kioskHomePage: KioskHomePage,
  ) {}

  async verifyProductLineInventory(
    posHomeUrl: string,
    menuClient: MenuClient,
    productLine: 'KIOSK',
  ): Promise<ProductLineInventoryResult> {
    return step('Kiosk 产线限量库存第 3 次加菜提示库存不足', async () => {
      const configuredQuantity = 2;
      const requestedQuantity = 3;

      await menuClient.setProductLineInventoryLimit(productLine, kioskLimitedStockDish.name, configuredQuantity);
      const limit = await menuClient.readProductLineInventoryLimit(productLine, kioskLimitedStockDish.name);
      if (limit?.quantity !== configuredQuantity) {
        throw new Error(`Missing ${productLine} inventory limit for ${kioskLimitedStockDish.name}`);
      }

      await this.homePage.open(posHomeUrl);
      await this.homePage.clickDineIn();
      await this.orderDishesPage.openInventoryPage();
      await this.inventoryPage.searchInventory({
        channel: productLine,
        type: 'Item',
        itemName: kioskLimitedStockDish.name,
      });
      await this.inventoryPage.openInventorySetting(kioskLimitedStockDish.name);
      await this.inventoryPage.setLimitedStockQuantity(configuredQuantity);
      await this.inventoryPage.saveInventoryConfig();

      await this.kioskHomePage.createCommonItem(kioskLimitedStockDish.name, kioskLimitedStockDish.price, {
        category: kioskLimitedStockDish.category,
        group: kioskLimitedStockDish.group,
        inventorySku: kioskLimitedStockDish.inventorySku,
      });
      await this.kioskHomePage.openFromPosHomeUrl(posHomeUrl);
      await this.kioskHomePage.selectLicense();
      await this.kioskHomePage.chooseToGoOrderType();
      await this.kioskHomePage.addItem(
        kioskLimitedStockDish.group,
        kioskLimitedStockDish.category,
        kioskLimitedStockDish.name,
        requestedQuantity,
      );
      await this.kioskHomePage.viewOrder();
      await this.kioskHomePage.checkout();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.cashPayment();

      return {
        configuredQuantity,
        productLine,
        requestedQuantity,
        soldOutPopupVisible: await this.kioskHomePage.isSoldOutPopupVisible(),
      };
    });
  }
}
