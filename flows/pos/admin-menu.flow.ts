import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { MenuClient } from '../../clients/pos-api/menu.client.js';
import { chineseInitialSearchDish, unitPriceDish } from '../../test-data/pos/dishes.js';

const posMenuProductLine = 'POS Menu';
const emenuProductLine = 'Emenu Menu';
const globalOptionGroupName = 'Global Option Group';

export type UnitPriceItemOrderResult = {
  unitPriceInputVisible: boolean;
  itemPrice: number;
};

export type SaleItemLanguageNames = {
  posName: string;
  kitchenName: string;
};

export type GlobalOptionPrinterResult = {
  afterCashPrinter: string[];
  afterRunnerPrinter: string[];
};

export type MenuItemCountComparison = {
  pageCount: number;
  apiCount: number;
};

export class AdminMenuFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly menuClient?: MenuClient,
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

  async modifyItemChineseNameAndReadLanguageNames(homeUrl: string): Promise<SaleItemLanguageNames> {
    const chineseName = '普通菜1的中文菜名';

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setItemChineseName(
      chineseInitialSearchDish.group,
      chineseInitialSearchDish.category,
      chineseInitialSearchDish.name,
      chineseName,
    );

    return this.adminPage.searchSaleItemLanguageAndReadNames(chineseName);
  }

  async addPrintersToGlobalOptionAndReadPrinters(homeUrl: string): Promise<GlobalOptionPrinterResult> {
    const group = 'Global Option Group';
    const category = 'Sauce';
    const optionName = 'global option add printer test';
    const optionPrice = 10;

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.enterGlobalOptionCategory(group, category);

    try {
      const createdOptionName = await this.adminPage.createGlobalOption(optionName, optionPrice);

      await this.adminPage.selectGlobalOption(createdOptionName);
      await this.adminPage.addPrinterToSelectedGlobalOption('Cash');
      const afterCashPrinter = await this.adminPage.readGlobalOptionPrinters(createdOptionName);

      await this.adminPage.selectGlobalOption(createdOptionName);
      await this.adminPage.addPrinterToSelectedGlobalOption('Runner');
      const afterRunnerPrinter = await this.adminPage.readGlobalOptionPrinters(createdOptionName);

      return { afterCashPrinter, afterRunnerPrinter };
    } finally {
      await this.homePage.open(homeUrl);
      await this.homePage.clickAdmin();
      await this.adminPage.enterGlobalOptionCategory(group, category);
      await this.adminPage.deleteGlobalOption(optionName);
    }
  }

  async readPosMenuItemCountFromPageAndApi(homeUrl: string): Promise<MenuItemCountComparison> {
    if (!this.menuClient) {
      throw new Error('MenuClient is required to compare POS Menu item count with API data.');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();

    const pageCount = await this.adminPage.readMenuItemCount('POS');
    const menuInfo = await this.menuClient.getAllMenuGroupInfo();
    const posMenu = menuInfo.menus.find((menu) => menu.productLine === 'POS');

    if (!posMenu) {
      throw new Error('POS menu is missing from MenuClient.getAllMenuGroupInfo().');
    }

    return {
      pageCount,
      apiCount: posMenu.menuItemCount,
    };
  }
}
