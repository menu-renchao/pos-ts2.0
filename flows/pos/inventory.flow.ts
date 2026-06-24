import type { InventoryPage } from '../../pages/pos/inventory.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { inventoryTrackedDish } from '../../test-data/pos/dishes.js';

export type UnsentInventoryEditResult = {
  readonly stockAfterInitialSave: string;
  readonly stockAfterAdd: string;
  readonly stockAfterReduce: string;
};

export type SentInventoryVoidResult = {
  readonly stockAfterSend: string;
  readonly stockAfterRestoreVoid: string;
  readonly stockAfterSecondSend: string;
  readonly stockAfterNoRestoreVoid: string;
};

export type DecimalInventoryResult = {
  readonly stockAfterDecimalSend: string;
  readonly stockAfterVoidRestore: string;
};

export class InventoryFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly inventoryPage: InventoryPage,
    private readonly recallPage: RecallPage,
  ) {}

  async saveAndEditUnsentInventoryOrder(homeUrl: string): Promise<UnsentInventoryEditResult> {
    await this.configureLimitedStock(homeUrl, 20);
    await this.orderInventoryItem(10);
    await this.orderDishesPage.saveOrder();
    const stockAfterInitialSave = await this.readStockFromFreshOrder();

    await this.editRecentOrder();
    await this.orderInventoryItem(5);
    await this.orderDishesPage.saveOrder();
    const stockAfterAdd = await this.readStockFromFreshOrder();

    await this.editRecentOrder();
    await this.orderDishesPage.reduceSelectedItemQuantity();
    await this.orderDishesPage.saveOrder();
    const stockAfterReduce = await this.readStockFromFreshOrder();

    return { stockAfterInitialSave, stockAfterAdd, stockAfterReduce };
  }

  async voidSentInventoryOrderWithRestoreOptions(homeUrl: string): Promise<SentInventoryVoidResult> {
    await this.configureLimitedStock(homeUrl, 20);
    await this.orderInventoryItem(10);
    await this.orderDishesPage.sendAllToKitchen();
    const stockAfterSend = await this.readStockFromFreshOrder();

    await this.voidRecentOrder(true);
    const stockAfterRestoreVoid = await this.readStockFromFreshOrder();

    await this.orderInventoryItem(5);
    await this.orderDishesPage.sendAllToKitchen();
    const stockAfterSecondSend = await this.readStockFromFreshOrder();

    await this.voidRecentOrder(false);
    const stockAfterNoRestoreVoid = await this.readStockFromFreshOrder();

    return { stockAfterSend, stockAfterRestoreVoid, stockAfterSecondSend, stockAfterNoRestoreVoid };
  }

  async orderDecimalQuantityAndVoid(homeUrl: string): Promise<DecimalInventoryResult> {
    await this.configureLimitedStock(homeUrl, 10);
    await this.orderInventoryItem(3.44);
    await this.orderDishesPage.sendAllToKitchen();
    const stockAfterDecimalSend = await this.readStockFromFreshOrder();

    await this.voidRecentOrder(true);
    const stockAfterVoidRestore = await this.readStockFromFreshOrder();

    return { stockAfterDecimalSend, stockAfterVoidRestore };
  }

  async readInsufficientStockAlert(homeUrl: string): Promise<string> {
    await this.configureLimitedStock(homeUrl, 2);
    await this.orderInventoryItem(3);
    return this.orderDishesPage.saveOrderAndReadAlert();
  }

  private async configureLimitedStock(homeUrl: string, quantity: number): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.openInventorySearch();
    await this.inventoryPage.openInventorySetting(inventoryTrackedDish.name);
    await this.inventoryPage.setLimitedStockQuantity(quantity);
    await this.inventoryPage.saveInventoryConfig();
    await this.inventoryPage.backToOrderPage();
  }

  private async orderInventoryItem(quantity: number): Promise<void> {
    await this.orderDishesPage.selectMenuGroup(inventoryTrackedDish.group);
    await this.orderDishesPage.selectMenuCategory(inventoryTrackedDish.category);
    await this.orderDishesPage.addMenuItem(inventoryTrackedDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(quantity);
  }

  private async readStockFromFreshOrder(): Promise<string> {
    await this.homePage.clickTogo();
    await this.openInventorySearch();
    const stock = await this.inventoryPage.readItemState(inventoryTrackedDish.name);
    await this.inventoryPage.backToOrderPage();
    return stock;
  }

  private async openInventorySearch(): Promise<void> {
    await this.orderDishesPage.openInventoryPage();
    await this.inventoryPage.searchInventory({
      channel: 'POS',
      type: 'All',
      itemName: inventoryTrackedDish.name,
    });
  }

  private async editRecentOrder(): Promise<void> {
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
  }

  private async voidRecentOrder(restoreInventory: boolean): Promise<void> {
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.voidOrder(restoreInventory);
  }
}
