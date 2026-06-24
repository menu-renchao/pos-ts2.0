import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosAuditLog, PosDbClient } from '../../clients/db/pos-db.client.js';
import type { MenuClient } from '../../clients/pos-api/menu.client.js';
import { crmSourceRewardMember } from '../../test-data/crm/members.js';
import {
  batchPropertyMenuItems,
  benefitPriceDish,
  chineseInitialSearchDish,
  quickComboBatchEditDish,
  requiredMenuPropertyLabels,
  takeOutTaxFreeDish,
  unitPriceDish,
  weightQuickComboDish,
} from '../../test-data/pos/dishes.js';

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

export type QuickComboModeResult = {
  afterDisableQuickCombo: boolean;
  afterEnableQuickCombo: boolean;
  orderPageQuickCombo: boolean;
};

export type BatchItemPropertyResult = {
  selectedLabels: string[];
  itemProperties: string[];
  allProperties: string[];
};

export type TakeOutTaxFreeAuditResult = {
  confirmationMessage: string;
  orderTax: number;
  expectedTax: number;
  auditLog: PosAuditLog;
};

export type BenefitPriceResult = {
  beforeMemberPrice: number;
  afterMemberPrice: number;
};

export class AdminMenuFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly menuClient?: MenuClient,
    private readonly recallPage?: RecallPage,
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

  async batchEditQuickComboModeAndReadStates(homeUrl: string): Promise<QuickComboModeResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();

    await this.adminPage.batchEditComboDisplayMode(
      quickComboBatchEditDish.group,
      quickComboBatchEditDish.category,
      quickComboBatchEditDish.name,
      false,
    );
    const afterDisableQuickCombo = await this.adminPage.readComboDetailQuickCombo(
      quickComboBatchEditDish.group,
      quickComboBatchEditDish.category,
      quickComboBatchEditDish.name,
    );

    await this.adminPage.batchEditComboDisplayMode(
      quickComboBatchEditDish.group,
      quickComboBatchEditDish.category,
      quickComboBatchEditDish.name,
      true,
    );
    const afterEnableQuickCombo = await this.adminPage.readComboDetailQuickCombo(
      quickComboBatchEditDish.group,
      quickComboBatchEditDish.category,
      quickComboBatchEditDish.name,
    );

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(quickComboBatchEditDish.group);
    await this.orderDishesPage.selectMenuCategory(quickComboBatchEditDish.category);
    await this.orderDishesPage.addMenuItem(quickComboBatchEditDish.name);
    const orderPageQuickCombo = await this.orderDishesPage.isCurrentQuickCombo();

    return {
      afterDisableQuickCombo,
      afterEnableQuickCombo,
      orderPageQuickCombo,
    };
  }

  async orderWeightedQuickComboAndReadRecallItems(homeUrl: string): Promise<string[]> {
    if (!this.recallPage) {
      throw new Error('RecallPage is required to verify weighted quick combo in Recall.');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(weightQuickComboDish.group);
    await this.orderDishesPage.selectMenuCategory(weightQuickComboDish.category);
    await this.orderDishesPage.addMenuItem(weightQuickComboDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const items = await this.recallPage.readAllOrderItems();

    return items.map((item) => item.name);
  }

  async batchReplaceItemPropertiesAndReadDetail(homeUrl: string): Promise<BatchItemPropertyResult> {
    const selectedLabels = [...requiredMenuPropertyLabels];

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.batchReplaceItemPropertyLabels(
      batchPropertyMenuItems.group,
      batchPropertyMenuItems.category,
      batchPropertyMenuItems.names,
      selectedLabels,
    );

    const detail = await this.adminPage.readItemPropertyDetail(
      batchPropertyMenuItems.group,
      batchPropertyMenuItems.category,
      batchPropertyMenuItems.detailItemName,
    );

    return {
      selectedLabels,
      itemProperties: detail.itemProperties,
      allProperties: detail.allProperties,
    };
  }

  async enableTakeOutTaxFreeAndReadOrderTaxAudit(
    homeUrl: string,
    posDbClient: PosDbClient,
  ): Promise<TakeOutTaxFreeAuditResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    const confirmationMessage = await this.adminPage.saveItemTakeOutTaxFree(
      takeOutTaxFreeDish.group ?? '',
      takeOutTaxFreeDish.category,
      takeOutTaxFreeDish.name,
      true,
    );
    await posDbClient.recordMenuItemTaxAudit(takeOutTaxFreeDish.name);

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(takeOutTaxFreeDish.group ?? '');
    await this.orderDishesPage.selectMenuCategory(takeOutTaxFreeDish.category);
    await this.orderDishesPage.addMenuItem(takeOutTaxFreeDish.name);

    const orderTax = await this.orderDishesPage.readTax();
    const taxRate = await posDbClient.readTaxRateById(takeOutTaxFreeDish.taxId);
    const auditLog = await posDbClient.readLatestAuditLog();

    return {
      confirmationMessage,
      orderTax,
      expectedTax: Number((takeOutTaxFreeDish.price * taxRate).toFixed(2)),
      auditLog,
    };
  }

  async orderBenefitPriceItemAndReadPrices(homeUrl: string, posCrmPage: PosCrmPage): Promise<BenefitPriceResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(benefitPriceDish.group ?? '');
    await this.orderDishesPage.selectMenuCategory(benefitPriceDish.category);
    await this.orderDishesPage.addMenuItem(benefitPriceDish.name);
    const beforeMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    await posCrmPage.openRedeem();
    await posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const afterMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    return {
      beforeMemberPrice,
      afterMemberPrice,
    };
  }

  async batchEditRegularAndMemberPriceThenReadOrderPrices(
    homeUrl: string,
    posCrmPage: PosCrmPage,
  ): Promise<BenefitPriceResult> {
    const editedPrice = 100;
    const editedMemberPrice = 89;

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.batchEditItemPrices(
      takeOutTaxFreeDish.group ?? '',
      takeOutTaxFreeDish.category,
      { [takeOutTaxFreeDish.name]: editedPrice },
      { [takeOutTaxFreeDish.name]: editedMemberPrice },
    );

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(takeOutTaxFreeDish.group ?? '');
    await this.orderDishesPage.selectMenuCategory(takeOutTaxFreeDish.category);
    await this.orderDishesPage.addMenuItem(takeOutTaxFreeDish.name);
    const beforeMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    await posCrmPage.openRedeem();
    await posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const afterMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    return {
      beforeMemberPrice,
      afterMemberPrice,
    };
  }

  async batchReduceBenefitMemberPriceThenReadOrderPrices(
    homeUrl: string,
    posCrmPage: PosCrmPage,
  ): Promise<BenefitPriceResult> {
    const editedMemberPrice = benefitPriceDish.benefitPrice - 1;

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.batchEditItemPrices(
      benefitPriceDish.group ?? '',
      benefitPriceDish.category,
      {},
      { [benefitPriceDish.name]: editedMemberPrice },
    );

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(benefitPriceDish.group ?? '');
    await this.orderDishesPage.selectMenuCategory(benefitPriceDish.category);
    await this.orderDishesPage.addMenuItem(benefitPriceDish.name);
    const beforeMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    await posCrmPage.openRedeem();
    await posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const afterMemberPrice = await this.orderDishesPage.readSelectedItemPrice();

    return {
      beforeMemberPrice,
      afterMemberPrice,
    };
  }
}
