import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { staffDiscountRoleSamples, staffDiscountSamples } from '../../test-data/pos/permissions.js';
import { step } from '../../utils/step.js';

export type WholeOrderDiscountPermissionResult = {
  permissionTip: string;
  failedLoginTip: string;
};

export type CanceledRecallWholeOrderDiscountResult = {
  permissionTip: string;
  originalTotal: number;
  totalAfterCancel: number;
};

export type BossAuthorizedRecallWholeOrderDiscountResult = {
  permissionTip: string;
  managerDeniedTip: string;
  originalTotal: number;
  totalAfterDiscount: number;
};

export type MultiDiscountPermissionResult = {
  wholeOrderPermissionTip: string;
  itemPermissionTip: string;
};

export type AuthorizedWholeOrderDiscountResult = {
  permissionTip: string;
  subtotal: number;
  discount: number;
};

export type BossAuthorizedWholeOrderDiscountResult = AuthorizedWholeOrderDiscountResult & {
  managerDeniedTip: string;
};

export type AuthorizedItemDiscountResult = {
  permissionTip: string;
  originalPrice: number;
  discountedPrice: number;
};

export type BossAuthorizedItemDiscountResult = AuthorizedItemDiscountResult & {
  managerDeniedTip: string;
};

export class StaffPermissionFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage?: RecallPage,
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

  async applyWholeOrderDiscountAboveManagerLimitWithBossPassword(
    homeUrl: string,
  ): Promise<BossAuthorizedWholeOrderDiscountResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.openFoodWithoutTax(staffDiscountSamples.openFoodName, staffDiscountSamples.openFoodPrice);
    await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.bossAuthorizedWholeOrderDiscountPercent);
    const permissionTip = await this.orderDishesPage.readDiscountTip();

    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.manager.password);
    const managerDeniedTip = await this.orderDishesPage.readDiscountTip();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.bossAuthorizedWholeOrderDiscountPercent);
    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.boss.password);
    const { subtotal, discount } = await this.orderDishesPage.readWholeOrderDiscountSummary();

    return { permissionTip, managerDeniedTip, subtotal, discount };
  }

  async applyItemDiscountAboveServerLimitWithManagerPassword(homeUrl: string): Promise<AuthorizedItemDiscountResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickTogo();
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.itemDiscountFirstFoodName,
      staffDiscountSamples.itemDiscountFirstFoodPrice,
    );
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.itemDiscountSecondFoodName,
      staffDiscountSamples.itemDiscountSecondFoodPrice,
    );
    await this.orderDishesPage.selectOrderLineItem(1);
    const originalPrice = await this.orderDishesPage.readSelectedItemPrice();

    await this.orderDishesPage.applyItemDiscountPercent(staffDiscountSamples.managerAuthorizedItemDiscountPercent);
    const permissionTip = await this.orderDishesPage.readDiscountTip();
    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.manager.password);
    const discountedPrice = await this.orderDishesPage.readSelectedItemPrice();

    return { permissionTip, originalPrice, discountedPrice };
  }

  async applyItemDiscountAboveManagerLimitWithBossPassword(
    homeUrl: string,
  ): Promise<BossAuthorizedItemDiscountResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickTogo();
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.itemDiscountFirstFoodName,
      staffDiscountSamples.bossAuthorizedItemDiscountFirstFoodPrice,
    );
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.itemDiscountSecondFoodName,
      staffDiscountSamples.bossAuthorizedItemDiscountSecondFoodPrice,
    );
    await this.orderDishesPage.selectOrderLineItem(1);
    const originalPrice = await this.orderDishesPage.readSelectedItemPrice();

    await this.orderDishesPage.applyItemDiscountPercent(staffDiscountSamples.bossAuthorizedItemDiscountPercent);
    const permissionTip = await this.orderDishesPage.readDiscountTip();
    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.manager.password);
    const managerDeniedTip = await this.orderDishesPage.readDiscountTip();
    await this.orderDishesPage.applyItemDiscountPercent(staffDiscountSamples.bossAuthorizedItemDiscountPercent);
    await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.boss.password);
    const discountedPrice = await this.orderDishesPage.readSelectedItemPrice();

    return { permissionTip, managerDeniedTip, originalPrice, discountedPrice };
  }

  async requirePermissionForItemDiscountAfterBossAuthorizedWholeOrderDiscount(
    homeUrl: string,
  ): Promise<MultiDiscountPermissionResult> {
    return step('整单折扣授权后再次提交单菜折扣仍校验累计权限', async () => {
      await this.homePage.open(homeUrl);
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
      await this.homePage.clickTogo();
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountFirstFoodName,
        staffDiscountSamples.multiDiscountFirstFoodPrice,
      );
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountSecondFoodName,
        staffDiscountSamples.multiDiscountSecondFoodPrice,
      );
      await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
      await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.multiDiscountWholeOrderPercent);
      const wholeOrderPermissionTip = await this.orderDishesPage.readDiscountTip();

      await this.orderDishesPage.submitManagerPassword(staffDiscountRoleSamples.boss.password);
      await this.orderDishesPage.selectOrderLineItem(1);
      await this.orderDishesPage.applyItemDiscountPercent(staffDiscountSamples.multiDiscountItemPercent);
      const itemPermissionTip = await this.orderDishesPage.readDiscountTip();

      return { wholeOrderPermissionTip, itemPermissionTip };
    });
  }

  async rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword(
    homeUrl: string,
  ): Promise<WholeOrderDiscountPermissionResult> {
    const recallPage = this.requireRecallPage();
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickPickup();
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.recallDiscountOpenFoodName,
      staffDiscountSamples.recallDiscountOpenFoodPrice,
    );
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await recallPage.openRecentOrder();
    await recallPage.openDiscountAndReadWholeOrderPrice();
    await recallPage.applyWholeOrderDiscountAmount(staffDiscountSamples.recallExcessiveWholeOrderDiscountAmount);
    const permissionTip = await recallPage.readDiscountTip();

    await recallPage.submitManagerPassword('');
    const failedLoginTip = await recallPage.readDiscountTip();

    return { permissionTip, failedLoginTip };
  }

  async cancelRecallWholeOrderAmountDiscountAboveServerLimit(
    homeUrl: string,
  ): Promise<CanceledRecallWholeOrderDiscountResult> {
    const recallPage = this.requireRecallPage();
    await this.homePage.open(homeUrl);
    await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
    await this.homePage.clickPickup();
    await this.orderDishesPage.openFoodWithoutTax(
      staffDiscountSamples.recallDiscountOpenFoodName,
      staffDiscountSamples.recallDiscountOpenFoodPrice,
    );
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await recallPage.openRecentOrder();
    const originalTotal = await recallPage.readOrderTotal();
    await recallPage.openDiscountAndReadWholeOrderPrice();
    await recallPage.applyWholeOrderDiscountAmount(staffDiscountSamples.recallExcessiveWholeOrderDiscountAmount);
    const permissionTip = await recallPage.readDiscountTip();

    await recallPage.cancelManagerPassword();
    const totalAfterCancel = await recallPage.readOrderTotal();

    return { permissionTip, originalTotal, totalAfterCancel };
  }

  async applyRecallWholeOrderAmountDiscountAboveManagerLimitWithBossPassword(
    homeUrl: string,
  ): Promise<BossAuthorizedRecallWholeOrderDiscountResult> {
    return step('Recall 固定金额整单折扣 Manager 拒绝后由 Boss 授权', async () => {
      const recallPage = this.requireRecallPage();
      await this.homePage.open(homeUrl);
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
      await this.homePage.clickPickup();
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.recallDiscountOpenFoodName,
        staffDiscountSamples.recallDiscountOpenFoodPrice,
      );
      await this.orderDishesPage.saveOrder();
      await this.homePage.clickRecall();
      await recallPage.openRecentOrder();
      const originalTotal = await recallPage.readOrderTotal();
      await recallPage.openDiscountAndReadWholeOrderPrice();
      const discountAmount = originalTotal * staffDiscountSamples.recallBossAuthorizedWholeOrderDiscountRate;
      await recallPage.applyWholeOrderDiscountAmount(discountAmount);
      const permissionTip = await recallPage.readDiscountTip();

      await recallPage.submitManagerPassword(staffDiscountRoleSamples.manager.password);
      const managerDeniedTip = await recallPage.readDiscountTip();
      await recallPage.applyWholeOrderDiscountAmount(discountAmount);
      await recallPage.submitManagerPassword(staffDiscountRoleSamples.boss.password);
      const totalAfterDiscount = await recallPage.readOrderTotal();

      return { permissionTip, managerDeniedTip, originalTotal, totalAfterDiscount };
    });
  }

  private requireRecallPage(): RecallPage {
    if (!this.recallPage) {
      throw new Error('RecallPage is required for recall staff permission flows');
    }
    return this.recallPage;
  }
}
