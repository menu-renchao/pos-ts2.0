import type { AdminStaffClient } from '../../clients/pos-api/admin-staff.client.js';
import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import type { ReportPage } from '../../pages/pos/report.page.js';
import {
  staffDiscountRoleSamples,
  staffDiscountSamples,
  staffPermissionSamples,
  staffSamples,
} from '../../test-data/pos/permissions.js';
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

export type MultiItemAmountDiscountPermissionResult = {
  permissionTip: string;
};

export type ZeroServerDiscountPermissionResult = {
  permissionTip: string;
};

export type CumulativeOrderItemDiscountPermissionResult = {
  subtotal: number;
  wholeOrderDiscount: number;
  firstItemOriginalPrice: number;
  firstItemDiscountedPrice: number;
  permissionTip: string;
};

export type AdminAnalysisPermissionResult = {
  permissionAlert: string;
  isInAnalysisPage: boolean;
};

export type StaffReportDateRangeResult = {
  startTime: string;
  endTime: string;
  today: string;
  tomorrow: string;
};

export type CreatedStaffAuthorityResult = {
  staffName: string;
  dineInAuthorityEnabled: boolean;
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
    private readonly adminStaffClient?: AdminStaffClient,
    private readonly adminPage?: AdminPage,
    private readonly reportPage?: ReportPage,
  ) {}

  async rejectWholeOrderDiscountAboveServerLimitWithoutPassword(homeUrl: string): Promise<WholeOrderDiscountPermissionResult> {
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
      await this.ensureDefaultRoleDiscountLimits();
      await this.homePage.open(homeUrl);
      await this.homePage.logout();
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
      await this.orderDishesPage.applySelectedItemsDiscountPercent(staffDiscountSamples.multiDiscountItemPercent);
      const itemPermissionTip = await this.orderDishesPage.readDiscountTip();

      return { wholeOrderPermissionTip, itemPermissionTip };
    });
  }

  async requirePermissionForMultiItemAmountDiscount(
    homeUrl: string,
  ): Promise<MultiItemAmountDiscountPermissionResult> {
      return step('多个单菜固定金额折扣超过 Server 权限时提示授权', async () => {
        await this.ensureDefaultRoleDiscountLimits();
        await this.homePage.open(homeUrl);
        await this.homePage.logout();
        await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
        await this.homePage.clickDineIn();
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountFirstFoodName,
        staffDiscountSamples.multiDiscountFirstFoodPrice,
      );
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountSecondFoodName,
        staffDiscountSamples.multiDiscountSecondFoodPrice,
      );
      await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
      await this.orderDishesPage.selectOrderLineItems([1, 2]);
      await this.orderDishesPage.applySelectedItemsDiscountAmount(staffDiscountSamples.multiItemDiscountAmount);
      const permissionTip = await this.orderDishesPage.readDiscountTip();

      return { permissionTip };
    });
  }

  async rejectAnyWholeOrderDiscountWhenServerLimitIsZero(
    homeUrl: string,
  ): Promise<ZeroServerDiscountPermissionResult> {
    return step('Server 最大折扣为 0 时任意整单折扣需要授权', async () => {
      const adminStaffClient = this.requireAdminStaffClient();
      await adminStaffClient.editRoleMaxDiscount('Server', staffDiscountSamples.zeroServerMaximumDiscountPercent);
      await adminStaffClient.editRoleMaxDiscount(
        'Manager',
        staffDiscountRoleSamples.manager.maxWholeOrderDiscountPercent,
      );

      await this.homePage.open(homeUrl);
      await this.homePage.applyOfflineStaffDiscountLimits(await adminStaffClient.readRoleMaxDiscounts());
      await this.homePage.logout();
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
      await this.homePage.clickDineIn();
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountFirstFoodName,
        staffDiscountSamples.multiDiscountFirstFoodPrice,
      );
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountSecondFoodName,
        staffDiscountSamples.multiDiscountSecondFoodPrice,
      );
      await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
      await this.orderDishesPage.applyWholeOrderDiscountPercent(staffDiscountSamples.zeroServerWholeOrderDiscountPercent);
      const permissionTip = await this.orderDishesPage.readDiscountTip();

      return { permissionTip };
    });
  }

  async requirePermissionForSecondItemDiscountAfterWholeOrderAndItemDiscounts(
    homeUrl: string,
  ): Promise<CumulativeOrderItemDiscountPermissionResult> {
    return step('整单折扣和单菜折扣后第二个单菜固定折扣按累计额度校验', async () => {
      const adminStaffClient = this.requireAdminStaffClient();
      await adminStaffClient.editRoleMaxDiscount(
        'Server',
        staffDiscountRoleSamples.server.maxWholeOrderDiscountPercent,
      );
      await adminStaffClient.editRoleMaxDiscount(
        'Manager',
        staffDiscountRoleSamples.manager.maxWholeOrderDiscountPercent,
      );
      await adminStaffClient.editRoleMaxDiscount('Boss', staffDiscountRoleSamples.boss.maxWholeOrderDiscountPercent);

      await this.homePage.open(homeUrl);
      await this.homePage.applyOfflineStaffDiscountLimits(await adminStaffClient.readRoleMaxDiscounts());
      await this.homePage.logout();
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.server.password);
      await this.homePage.clickDineIn();
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountFirstFoodName,
        staffDiscountSamples.multiDiscountFirstFoodPrice,
      );
      await this.orderDishesPage.openFoodWithoutTax(
        staffDiscountSamples.itemDiscountSecondFoodName,
        staffDiscountSamples.multiDiscountSecondFoodPrice,
      );

      await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
      await this.orderDishesPage.applyWholeOrderDiscountPercent(
        staffDiscountSamples.cumulativeWholeOrderDiscountPercent,
      );
      const { subtotal, discount: wholeOrderDiscount } = await this.orderDishesPage.readWholeOrderDiscountSummary();

      await this.orderDishesPage.selectOrderLineItem(1);
      const firstItemOriginalPrice = await this.orderDishesPage.readSelectedItemPrice();
      await this.orderDishesPage.applyItemDiscountPercent(staffDiscountSamples.cumulativeItemDiscountPercent);
      const firstItemDiscountedPrice = await this.orderDishesPage.readSelectedItemPrice();

      await this.orderDishesPage.selectOrderLineItem(2);
      await this.orderDishesPage.applySelectedItemsDiscountAmount(
        staffDiscountSamples.cumulativeSecondItemDiscountAmount,
      );
      const permissionTip = await this.orderDishesPage.readDiscountTip();

      return {
        subtotal,
        wholeOrderDiscount,
        firstItemOriginalPrice,
        firstItemDiscountedPrice,
        permissionTip,
      };
    });
  }

  async openAnalysisReportWithBossOverrideWhenStaffLacksPermission(
    homeUrl: string,
  ): Promise<AdminAnalysisPermissionResult> {
    return step('无 Analysis 权限员工访问后台分析报表后由 Boss 授权进入', async () => {
      const adminStaffClient = this.requireAdminStaffClient();
      const adminPage = this.requireAdminPage();
      await adminStaffClient.editStaffRemoveFunctions(staffSamples.noAnalysis.id, [
        staffPermissionSamples.analysisPermissionName,
      ]);

      await this.homePage.open(homeUrl);
      await this.homePage.applyOfflineStaffPermissionOverrides(await adminStaffClient.readStaffPermissionOverrides());
      await this.homePage.logout();
      await this.homePage.inputEmployeePassword(staffSamples.noAnalysis.password);
      await this.homePage.clickAdmin();
      const permissionAlert = await adminPage.clickAnalysisAndReadPermissionAlert();
      await adminPage.submitPermissionPassword(staffDiscountRoleSamples.boss.password);
      const isInAnalysisPage = await adminPage.isInAnalysisPage();

      return { permissionAlert, isInAnalysisPage };
    });
  }

  async openTodayStaffReportWhenStaffOnlyHasPersonalReport(homeUrl: string): Promise<StaffReportDateRangeResult> {
    return step('无 View History 权限员工查看当天 Staff Report', async () => {
      const adminStaffClient = this.requireAdminStaffClient();
      const reportPage = this.requireReportPage();

      await adminStaffClient.editStaffRemoveFunctions(
        staffSamples.personalReportOnly.id,
        staffSamples.personalReportOnly.removedPermissions,
      );
      await adminStaffClient.editStaffAddFunctions(
        staffSamples.personalReportOnly.id,
        staffSamples.personalReportOnly.addedPermissions,
      );

      await this.homePage.open(homeUrl);
      await this.homePage.applyOfflineStaffPermissionOverrides(await adminStaffClient.readStaffPermissionOverrides());
      await this.homePage.logout();
      await this.homePage.inputEmployeePassword(staffSamples.personalReportOnly.password);
      await this.homePage.clickReport();
      await reportPage.inputPasswordInPopup(staffSamples.personalReportOnly.password);
      await reportPage.enterTotalReport();
      await reportPage.openStaffReport();
      const { startTime, endTime } = await reportPage.readStaffReportDateRange();

      return { startTime, endTime, today: localIsoDate(0), tomorrow: localIsoDate(1) };
    });
  }

  async createNewStaffWithOnlyExistingAuthority(homeUrl: string): Promise<CreatedStaffAuthorityResult> {
    return step('创建新员工时只能赋予当前员工已有权限', async () => {
      const adminStaffClient = this.requireAdminStaffClient();
      const adminPage = this.requireAdminPage();
      const staffSample = staffSamples.createWithOnlyExistingAuthority;
      let staffName = '';

      try {
        await adminStaffClient.editStaffRemoveFunctions(staffSample.id, staffSample.removedPermissions);
        await adminStaffClient.editStaffAddFunctions(staffSample.id, staffSample.addedPermissions);
        await adminStaffClient.editRoleRemoveFunctions(staffSample.role, staffSample.removedPermissions);

        await this.homePage.open(homeUrl);
        await this.homePage.applyOfflineStaffPermissionOverrides(await adminStaffClient.readStaffPermissionOverrides());
        await this.homePage.refresh();
        await this.homePage.logout();
        await this.homePage.inputEmployeePassword(staffSample.password);
        await this.homePage.clickAdmin();
        await adminPage.enterStaff();
        await adminPage.clickCreateStaff();

        const liveStaffSuffix = Date.now().toString().slice(-6);
        staffName = `pos${liveStaffSuffix}`;
        await adminPage.inputNewStaffInfo(staffName, liveStaffSuffix.slice(-4), staffSample.role);
        await adminPage.clickStaffSave();
        await adminPage.clickStaffName(staffName);
        const dineInAuthorityEnabled = await adminPage.isAuthorityEnabled(staffSample.restrictedAuthority);

        return { staffName, dineInAuthorityEnabled };
      } finally {
        await adminStaffClient.editRoleAddFunctions(staffSample.role, staffSample.removedPermissions);
        await adminStaffClient.editStaffAddFunctions(staffSample.id, staffSample.removedPermissions);
        if (staffName) {
          await adminStaffClient.deleteStaffByName(staffName);
        }
      }
    });
  }

  async rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword(
    homeUrl: string,
  ): Promise<WholeOrderDiscountPermissionResult> {
    const recallPage = this.requireRecallPage();
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
    await this.ensureDefaultRoleDiscountLimits();
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
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
      await this.ensureDefaultRoleDiscountLimits();
      await this.homePage.open(homeUrl);
      await this.homePage.logout();
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

  private requireAdminStaffClient(): AdminStaffClient {
    if (!this.adminStaffClient) {
      throw new Error('AdminStaffClient is required for admin staff permission flows');
    }
    return this.adminStaffClient;
  }

  private async ensureDefaultRoleDiscountLimits(): Promise<void> {
    if (!this.adminStaffClient) {
      return;
    }
    await this.adminStaffClient.editRoleMaxDiscount(
      staffDiscountRoleSamples.server.role,
      staffDiscountRoleSamples.server.maxWholeOrderDiscountPercent,
    );
    await this.adminStaffClient.editRoleMaxDiscount(
      staffDiscountRoleSamples.manager.role,
      staffDiscountRoleSamples.manager.maxWholeOrderDiscountPercent,
    );
    await this.adminStaffClient.editRoleMaxDiscount(
      staffDiscountRoleSamples.boss.role,
      staffDiscountRoleSamples.boss.maxWholeOrderDiscountPercent,
    );
  }

  private requireAdminPage(): AdminPage {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for admin staff permission flows');
    }
    return this.adminPage;
  }

  private requireReportPage(): ReportPage {
    if (!this.reportPage) {
      throw new Error('ReportPage is required for staff report permission flows');
    }
    return this.reportPage;
  }
}

function localIsoDate(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
