import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { StaffPermissionOverride, StaffRoleDiscountLimit } from '../../clients/pos-api/admin-staff.client.js';
import type { StaffShiftPlan } from '../../clients/pos-api/staff-shift-plan.client.js';
import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class PosHomePage extends PageObject {
  readonly togoButton: Locator;
  readonly recallButton: Locator;
  readonly callerButton: Locator;
  readonly adminButton: Locator;
  readonly reservationButton: Locator;
  readonly customDeliveryButton: Locator;
  readonly deliveryButton: Locator;
  readonly dineInButton: Locator;
  readonly pickupButton: Locator;
  readonly passwordInput: Locator;
  readonly savePasswordButton: Locator;

  private readonly licenseContainer: Locator;
  private readonly licenseOkButton: Locator;
  private readonly licenseInput: Locator;
  private readonly licenseRow: Locator;
  private readonly adminPageRoot: Locator;
  private readonly cancelEditButton: Locator;
  private readonly backToWorkButton: Locator;
  private readonly breakButton: Locator;
  private readonly cashInOutButton: Locator;
  private readonly checkInButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly clockText: Locator;
  private readonly editButton: Locator;
  private readonly hiddenFunctionCards: Locator;
  private readonly hiddenFunctionList: Locator;
  private readonly homeFunctionCards: Locator;
  private readonly homeFunctionList: Locator;
  private readonly loginToast: Locator;
  private readonly mainAddButton: Locator;
  private readonly messageCenterButton: Locator;
  private readonly messageCenterRoot: Locator;
  private readonly moreAddButton: Locator;
  private readonly orderPageRoot: Locator;
  private readonly reportButton: Locator;
  private readonly reportPasswordPanel: Locator;
  private readonly saveEditButton: Locator;
  private readonly supportButton: Locator;
  private readonly supportPageRoot: Locator;
  private readonly toast: Locator;
  private readonly welcomeText: Locator;
  private readonly homeRoot: Locator;

  constructor(page: Page) {
    super(page);
    // 兼容离线模式（data-testid）和 live 模式（原生 ID / 文本）
    this.homeRoot = page.locator('[data-testid="pos-home"]').or(page.locator('#welcome'));
    this.adminPageRoot = page.getByTestId('admin-page');
    this.togoButton = page.getByTestId('home-togo').or(page.locator('#m4btbx').getByText('To Go', { exact: true }));
    this.recallButton = page.getByTestId('home-recall').or(page.locator('#recallbt'));
    this.callerButton = page.getByTestId('home-caller');
    this.adminButton = page.getByTestId('home-admin');
    this.reservationButton = page.getByTestId('home-reservation');
    this.customDeliveryButton = page.getByTestId('home-custom-delivery');
    this.deliveryButton = page.getByTestId('home-delivery');
    this.dineInButton = page.getByTestId('home-dine-in');
    this.pickupButton = page.getByTestId('home-pickup');
    this.passwordInput = page.getByTestId('employee-password').or(page.locator('#pwipt'));
    this.savePasswordButton = page.getByTestId('employee-password-save').or(page.locator('#ds'));
    this.licenseContainer = page.locator('#skIptBx');
    this.licenseOkButton = page.locator('#skok');
    this.licenseInput = page.locator('#sknm');
    this.licenseRow = page.locator('.skOneRow');
    this.backToWorkButton = page.getByTestId('clock-back-to-work');
    this.breakButton = page.getByTestId('clock-break');
    this.cashInOutButton = page.getByTestId('home-cash-in-out');
    this.cancelEditButton = page.getByTestId('edit-cancel');
    this.checkInButton = page.getByTestId('home-check-in');
    this.checkoutButton = page.getByTestId('clock-checkout');
    this.clockText = page.getByTestId('clock-text');
    this.editButton = page.getByTestId('edit-home-functions');
    this.hiddenFunctionList = page.getByTestId('hidden-function-cards');
    this.hiddenFunctionCards = page.getByTestId('hidden-function-card');
    this.homeFunctionList = page.getByTestId('home-function-cards');
    this.homeFunctionCards = page.getByTestId('home-function-card');
    this.mainAddButton = page.getByTestId('edit-main-add');
    this.messageCenterButton = page.getByTestId('home-message-center');
    this.messageCenterRoot = page.getByTestId('message-center');
    this.moreAddButton = page.getByTestId('edit-more-add');
    this.orderPageRoot = page.getByTestId('order-page').or(page.locator('#orderDishes'));
    this.reportButton = page.getByTestId('home-report');
    this.reportPasswordPanel = page.getByTestId('report-password-panel');
    this.saveEditButton = page.getByTestId('edit-save');
    this.supportButton = page.getByTestId('home-support');
    this.supportPageRoot = page.getByTestId('support-page');
    this.toast = page.getByTestId('home-toast');
    this.welcomeText = page.getByTestId('welcome-text');
    this.loginToast = page.getByTestId('login-toast');
  }

  async open(homeUrl: string): Promise<void> {
    await step('打开 POS 首页', async () => {
      await this.page.goto(homeUrl);
      await this.chooseAvailableLicenseIfVisible(8_000);
      // 移除遮罩层，确保 PIN 输入框可交互
      await this.page.evaluate(() => {
        const cover = document.getElementById('floatcoverblock');
        if (cover) cover.style.display = 'none';
        const kb = document.getElementById('mykbflbx');
        if (kb) kb.style.display = 'none';
      });
      // 如果 PIN 密码输入框可见，则执行密码登录
      const pinInput = this.page.locator('#pwipt');
      if (await pinInput.isVisible()) {
        await this.inputLoginPassword('11');
      }
      await this.chooseAvailableLicenseIfVisible(5_000);
      if (await pinInput.isVisible()) {
        await this.inputLoginPassword('11');
      }
      // 移除可能残留的遮罩层
      await this.page.evaluate(() => {
        const cover = document.getElementById('floatcoverblock');
        if (cover) cover.style.display = 'none';
      });
      // 等待首页就绪：离线模式等 pos-home，live 模式等可点击的 To Go 功能入口
      if (await this.togoButton.isVisible()) {
        await expect(this.togoButton).toBeVisible();
      } else {
        await expect(this.homeRoot).toBeVisible({ timeout: 15_000 });
      }
    });
  }

  private async chooseAvailableLicenseIfVisible(timeout: number): Promise<void> {
    if ((await this.licenseContainer.count()) === 0) {
      return;
    }
    const appeared = await this.licenseContainer
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => this.licenseContainer.isVisible());
    if (appeared) {
      await this.chooseAvailableLicense();
      await expect(this.page.locator('#pwipt')).toBeVisible({ timeout: 20_000 });
    }
  }

  async chooseAvailableLicense(): Promise<void> {
    await step('选择可用 License', async () => {
      await expect(this.licenseContainer).toBeVisible({ timeout: 20_000 });
      await expect(this.licenseInput).toBeVisible();
      // 等待 License 列表加载完成
      await expect(this.licenseRow.first()).toBeVisible({ timeout: 15_000 });
      // 点击第一个 Not in use 的 PC License
      const pcLicense = this.licenseRow.filter({ hasText: 'Not in use' }).filter({ hasText: 'PC' }).first();
      await expect(pcLicense).toBeVisible({ timeout: 10_000 });
      await pcLicense.click();
      // 点击确认按钮
      for (let retryCount = 0; retryCount < 3 && (await this.licenseOkButton.isVisible()); retryCount += 1) {
        await this.licenseOkButton.click();
        await waitUntil(async () => !(await this.licenseContainer.isVisible()), {
          description: 'License 选择弹层关闭',
          intervalMs: 200,
          timeoutMs: 5_000,
        }).catch(() => undefined);
      }
      await expect(this.licenseContainer).toBeHidden({ timeout: 10_000 });
    });
  }

  async inputLoginPassword(password: string): Promise<void> {
    await step('输入 PIN 密码并提交', async () => {
      const pinInput = this.page.locator('#pwipt');
      const hasNumPanel = (await this.page.locator('#numpanel').count()) > 0;
      if (hasNumPanel) {
        // live 模式：#pwipt 是 readonly，需要通过数字键盘输入
        for (const digit of password) {
          await this.page.locator(`#numpanel td:has-text("${digit}")`).first().click();
        }
      } else {
        // 离线模式：直接 fill 输入框
        await pinInput.fill(password);
      }
      await this.page.locator('#ds').click();
    });
  }

  async inputEmployeePassword(password: string): Promise<void> {
    await step('输入员工密码并提交', async () => {
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
      await this.savePasswordButton.click();
    });
  }

  async logoutAndLogin(password: string): Promise<void> {
    await step(`重新以员工密码 ${password} 登录`, async () => {
      await this.logout();
      await this.inputEmployeePassword(password);
    });
  }

  async inputEmployeePasswordWithoutSave(password: string): Promise<void> {
    await step('输入员工密码但不保存', async () => {
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
    });
  }

  async loginWithWrongPassword(password: string): Promise<string> {
    return step('输入错误员工密码并读取失败提示', async () => {
      await this.inputEmployeePassword(password);
      await expect(this.loginToast).toBeVisible();
      return (await this.loginToast.textContent()) ?? '';
    });
  }

  async readPasswordValue(): Promise<string> {
    return step('读取员工密码输入框内容', async () => this.passwordInput.inputValue());
  }

  async refresh(): Promise<void> {
    await step('刷新 POS 首页', async () => {
      await this.page.reload();
      await expect(this.homeRoot).toBeVisible();
    });
  }

  async applyOfflineStaffDiscountLimits(limits: readonly StaffRoleDiscountLimit[]): Promise<void> {
    await step('同步离线员工角色最大折扣配置', async () => {
      await this.page.evaluate((roleLimits) => {
        const limitsByRole = Object.fromEntries(
          roleLimits.map((limit) => [limit.role, Number(limit.maximumDiscountPercent)]),
        );
        localStorage.setItem('offlineStaffDiscountLimits', JSON.stringify(limitsByRole));
        window.dispatchEvent(new CustomEvent('offline-staff-discount-limits-updated', { detail: limitsByRole }));
      }, limits);
    });
  }

  async applyOfflineStaffPermissionOverrides(overrides: readonly StaffPermissionOverride[]): Promise<void> {
    await step('同步离线员工权限覆盖配置', async () => {
      await this.page.evaluate((staffOverrides) => {
        const overridesByStaffId = Object.fromEntries(
          staffOverrides.map((override) => [
            override.staffId,
            {
              addedPermissions: override.addedPermissions,
              removedPermissions: override.removedPermissions,
            },
          ]),
        );
        localStorage.setItem('offlineStaffPermissionOverrides', JSON.stringify(overridesByStaffId));
        window.dispatchEvent(new CustomEvent('offline-staff-permissions-updated', { detail: overridesByStaffId }));
      }, overrides);
    });
  }

  async applyOfflineShiftSchedule(enabled: boolean, plans: readonly StaffShiftPlan[]): Promise<void> {
    await step('同步离线员工排班配置', async () => {
      await this.page.evaluate(
        ({ shiftScheduleEnabled, shiftPlans }) => {
          localStorage.setItem('offlineShiftScheduleEnabled', String(shiftScheduleEnabled));
          localStorage.setItem('offlineShiftPlans', JSON.stringify(shiftPlans));
          window.dispatchEvent(
            new CustomEvent('offline-shift-schedule-updated', {
              detail: { shiftScheduleEnabled, shiftPlans },
            }),
          );
        },
        { shiftScheduleEnabled: enabled, shiftPlans: plans },
      );
    });
  }

  async switchLanguage(language: string): Promise<void> {
    await step(`切换首页语言为 ${language}`, async () => {
      await this.page.getByTestId(`switch-language-${language}`).click();
      await expect(this.welcomeText).toBeVisible();
    });
  }

  async readWelcomeText(): Promise<string> {
    return step('读取首页欢迎语', async () => (await this.welcomeText.textContent()) ?? '');
  }

  async clickAdmin(): Promise<void> {
    await step('打开 Admin 页面', async () => {
      await this.adminButton.click();
      await expect(this.adminPageRoot).toBeVisible();
    });
  }

  async logout(): Promise<void> {
    await step('退出当前员工登录态', async () => {
      await this.page.getByTestId('home-logout').click();
      await expect(this.passwordInput).toBeVisible();
    });
  }

  async clickTogo(): Promise<void> {
    await step('从首页进入 To Go 点单页', async () => {
      await this.togoButton.click();
      await expect(this.orderPageRoot).toBeVisible();
    });
  }

  async clickDineIn(): Promise<void> {
    await step('从首页进入 Dine In 点单页', async () => {
      await this.dineInButton.click();
      await expect(this.orderPageRoot).toBeVisible();
    });
  }

  async clickPickup(): Promise<void> {
    await step('从首页进入 Pickup 点单页', async () => {
      await this.pickupButton.click();
      await expect(this.orderPageRoot).toBeVisible();
    });
  }

  async clickRecall(): Promise<void> {
    await step('从首页进入 Recall 页面', async () => {
      await this.recallButton.click();
      await expect(this.page.getByTestId('recall-page').or(this.page.locator('.recall'))).toBeVisible();
    });
  }

  async openCaller(): Promise<void> {
    await step('从首页进入 Caller 页面', async () => {
      await this.callerButton.click();
      await expect(this.page.getByTestId('caller-page')).toBeVisible();
    });
  }

  async openCashInOut(password = '11'): Promise<void> {
    await step('从首页进入 Cash In/Out 页面', async () => {
      await this.cashInOutButton.click();
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
      await this.savePasswordButton.click();
      await expect(this.page.getByTestId('cash-in-out-page')).toBeVisible();
    });
  }

  async clickReservation(): Promise<void> {
    await step('从首页进入预约页面', async () => {
      await this.reservationButton.click();
      await expect(this.page.getByTestId('reservation-page')).toBeVisible();
    });
  }

  async clickDelivery(): Promise<void> {
    await step('从首页进入 Delivery 页面', async () => {
      await this.deliveryButton.click();
      await expect(this.page.getByTestId('delivery-page')).toBeVisible();
    });
  }

  async clickCustomDelivery(): Promise<void> {
    await step('从首页进入自定义 Delivery 页面', async () => {
      await this.customDeliveryButton.click();
      await expect(this.page.getByTestId('delivery-page')).toBeVisible();
    });
  }

  async openMessageCenter(): Promise<void> {
    await step('打开首页消息中心', async () => {
      await this.messageCenterButton.click();
      await expect(this.messageCenterRoot).toBeVisible();
    });
  }

  async clickReport(): Promise<void> {
    await step('从首页打开报表密码弹层', async () => {
      await this.reportButton.click();
      await expect(this.reportPasswordPanel).toBeVisible();
    });
  }

  async clickSupport(): Promise<void> {
    await step('从首页打开支持信息', async () => {
      await this.supportButton.click();
      await expect(this.supportPageRoot).toBeVisible();
    });
  }

  async openCheckIn(): Promise<void> {
    await step('打开员工打卡入口', async () => {
      await this.checkInButton.click();
      await expect(this.clockText).toBeVisible();
    });
  }

  async clickBreakButton(): Promise<void> {
    await step('员工开始休息', async () => {
      await this.breakButton.click();
    });
  }

  async clickBackToWorkButton(): Promise<void> {
    await step('员工返回工作', async () => {
      await this.backToWorkButton.click();
    });
  }

  async clickCheckoutButton(): Promise<void> {
    await step('员工下班', async () => {
      await this.checkoutButton.click();
    });
  }

  async readClockText(): Promise<string> {
    return step('读取员工打卡状态文案', async () => (await this.clockText.textContent()) ?? '');
  }

  async clickEdit(): Promise<void> {
    await step('进入首页功能卡编辑模式', async () => {
      await this.editButton.click();
      await expect(this.saveEditButton).toBeVisible();
    });
  }

  async selectHomeFunction(functionName: string): Promise<void> {
    await step(`选择主页面功能卡 ${functionName}`, async () => {
      await this.homeFunctionList.getByRole('button', { exact: true, name: functionName }).click();
    });
  }

  async selectHiddenFunction(functionName: string): Promise<void> {
    await step(`选择隐藏区功能卡 ${functionName}`, async () => {
      await this.hiddenFunctionList.getByRole('button', { exact: true, name: functionName }).click();
    });
  }

  async clickMainAdd(): Promise<void> {
    await step('点击移动到主页面按钮', async () => {
      await this.mainAddButton.click();
    });
  }

  async clickMoreAdd(): Promise<void> {
    await step('点击移动到更多区按钮', async () => {
      await this.moreAddButton.click();
    });
  }

  async saveFunctionLayout(): Promise<void> {
    await step('保存首页功能卡布局', async () => {
      await this.saveEditButton.click();
      await expect(this.saveEditButton).toBeHidden();
    });
  }

  async cancelFunctionLayout(): Promise<void> {
    await step('取消首页功能卡布局编辑', async () => {
      await this.cancelEditButton.click();
      await expect(this.saveEditButton).toBeHidden();
    });
  }

  async readHomeFunctionCardNames(): Promise<string[]> {
    return step('读取主页面功能卡名称', async () =>
      (await this.homeFunctionCards.allTextContents()).map((name) => name.trim()).filter(Boolean),
    );
  }

  async readFirstHomeFunctionCardName(): Promise<string> {
    return step('读取第一个主页面功能卡名称', async () => {
      const cardNames = await this.readHomeFunctionCardNames();
      return cardNames[0] ?? '';
    });
  }

  async readToastText(): Promise<string> {
    return step('读取首页提示文案', async () => {
      await expect(this.toast).toBeVisible();
      return (await this.toast.textContent()) ?? '';
    });
  }

  private async waitForPasswordValue(password: string): Promise<void> {
    await waitUntil(async () => (await this.passwordInput.inputValue()) === password, {
      description: '员工密码输入稳定',
      intervalMs: 25,
      timeoutMs: 1_000,
    });
  }
}
