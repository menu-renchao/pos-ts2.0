import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecalledItemOption, RecalledOrderItem, RecallPage } from '../../pages/pos/recall.page.js';
import type { DishSample } from '../../test-data/pos/domain-types.js';
import { discountableDish, groupSwitchDish, categorySwitchDish } from '../../test-data/pos/dishes.js';
import { languageOptions } from '../../test-data/pos/languages.js';

export type OrderTaxEditResult = {
  beforeEditTax: number;
  afterEditTax: number;
};

export type CustomerInfoRequirementResult = {
  popupVisibleBeforeInput: boolean;
  popupVisibleAfterEmptySubmit: boolean;
  popupVisibleAfterValidSubmit: boolean;
};

export type ItemDiscountResult = {
  originalPrice: number;
  discountedPrice: number;
};

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

  async addItemAfterSendKitchenAndReadTaxes(homeUrl: string): Promise<OrderTaxEditResult> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    const beforeEditTax = await this.orderDishesPage.readTax();
    await this.orderDishesPage.sendAllToKitchen();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const afterEditTax = await this.orderDishesPage.readTax();
    await this.orderDishesPage.saveOrder();
    return { beforeEditTax, afterEditTax };
  }

  async requireCustomerInfoBeforePayment(homeUrl: string): Promise<CustomerInfoRequirementResult> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.clickSettle();
    const popupVisibleBeforeInput = await this.orderDishesPage.isCustomerInfoPopupVisible();
    await this.orderDishesPage.submitCustomerInfo();
    const popupVisibleAfterEmptySubmit = await this.orderDishesPage.isCustomerInfoPopupVisible();
    await this.orderDishesPage.submitCustomerInfo('Test Customer', '1234567890');
    const popupVisibleAfterValidSubmit = await this.orderDishesPage.isCustomerInfoPopupVisible();
    return { popupVisibleBeforeInput, popupVisibleAfterEmptySubmit, popupVisibleAfterValidSubmit };
  }

  async voidItemWithManagerPassword(homeUrl: string, managerPassword: string): Promise<string> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.sendAllToKitchen();
    await this.orderDishesPage.voidSelectedItem();
    await this.orderDishesPage.submitManagerPassword(managerPassword);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readFirstOrderItemState();
  }

  async applyItemDiscountAndReadPrice(homeUrl: string, discountRate: number): Promise<ItemDiscountResult> {
    await this.openOrderAndAddDish(homeUrl, discountableDish);
    const originalPrice = await this.orderDishesPage.readSelectedItemPrice();
    await this.orderDishesPage.applyItemDiscount();
    const discountedPrice = await this.orderDishesPage.readSelectedItemPrice();
    if (discountRate !== 0.1) {
      throw new Error(`Unsupported offline item discount rate: ${discountRate}`);
    }
    return { originalPrice, discountedPrice };
  }

  async addModifyNoteAndReadRecallOption(homeUrl: string): Promise<RecalledItemOption> {
    await this.openOrderAndAddDish(homeUrl, discountableDish);
    await this.orderDishesPage.addModifyNote('This is a test note', 1.23);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readFirstItemOption();
  }

  private async openOrderAndAddDish(homeUrl: string, dish: DishSample): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
  }
}
