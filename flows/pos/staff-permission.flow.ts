import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { staffDiscountRoleSamples, staffDiscountSamples } from '../../test-data/pos/permissions.js';

export type WholeOrderDiscountPermissionResult = {
  permissionTip: string;
  failedLoginTip: string;
};

export type AuthorizedWholeOrderDiscountResult = {
  permissionTip: string;
  subtotal: number;
  discount: number;
};

export class StaffPermissionFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
  ) {}

  async rejectWholeOrderDiscountAboveServerLimitWithoutPassword(homeUrl: string): Promise<WholeOrderDiscountPermissionResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.openFoodWithoutTax(staffDiscountSamples.openFoodName, staffDiscountSamples.openFoodPrice);
    await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.excessiveWholeOrderDiscountPercent);
    const permissionTip = await this.orderDishesPage.readDiscountTip();

    await this.orderDishesPage.submitManagerPassword('');
    const failedLoginTip = await this.orderDishesPage.readDiscountTip();

    return { permissionTip, failedLoginTip };
  }

  async applyWholeOrderDiscountAboveServerLimitWithManagerPassword(homeUrl: string): Promise<AuthorizedWholeOrderDiscountResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.openFoodWithoutTax(staffDiscountSamples.openFoodName, staffDiscountSamples.openFoodPrice);
    await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.managerAuthorizedWholeOrderDiscountPercent);
    const permissionTip = await this.orderDishesPage.readDiscountTip();

    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.manager.password);
    const { subtotal, discount } = await this.orderDishesPage.readWholeOrderDiscountSummary();

    return { permissionTip, subtotal, discount };
  }
}
