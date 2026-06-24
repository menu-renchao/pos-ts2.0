import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { unitPriceDish } from '../../test-data/pos/dishes.js';

const posMenuProductLine = 'POS Menu';
const emenuProductLine = 'Emenu Menu';
const globalOptionGroupName = 'Global Option Group';

export type UnitPriceItemOrderResult = {
  unitPriceInputVisible: boolean;
  itemPrice: number;
};

export class AdminMenuFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
    private readonly orderDishesPage: OrderDishesPage,
  ) {}

  async copyPosGlobalOptionGroupToEmenuAndReadCount(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.clearProductItem(emenuProductLine, globalOptionGroupName);
    await this.adminPage.copyGroupToProductLine(posMenuProductLine, globalOptionGroupName, emenuProductLine);
    return this.adminPage.readGroupCategoryCount(emenuProductLine, globalOptionGroupName);
  }

  async orderUnitPriceItemAndReadPrice(homeUrl: string): Promise<UnitPriceItemOrderResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.configureUnitPriceItem(
      unitPriceDish.group ?? '',
      unitPriceDish.category,
      unitPriceDish.name,
      unitPriceDish.price,
    );
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(unitPriceDish.group ?? '');
    await this.orderDishesPage.selectMenuCategory(unitPriceDish.category);
    await this.orderDishesPage.addMenuItem(unitPriceDish.name);
    const unitPriceInputVisible = await this.orderDishesPage.isUnitPriceInputVisible();
    const itemPrice = await this.orderDishesPage.inputUnitPriceAndReadSelectedPrice(200);

    return { unitPriceInputVisible, itemPrice };
  }
}
