import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecalledOrderItem, RecallPage } from '../../pages/pos/recall.page.js';
import type { DishSample } from '../../test-data/pos/domain-types.js';
import { languageOptions } from '../../test-data/pos/languages.js';

export class OrderEntryFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
  ) {}

  async createTogoOrderAndReadRecall(homeUrl: string, dish: DishSample): Promise<RecalledOrderItem[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readAllOrderItems();
  }

  async readChineseMenuGroups(homeUrl: string): Promise<string[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.switchLanguage(languageOptions.chinese);
    await this.homePage.clickTogo();
    return this.orderDishesPage.readMenuGroups();
  }
}
