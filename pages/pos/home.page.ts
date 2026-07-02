import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import type { StaffPermissionOverride, StaffRoleDiscountLimit } from '../../clients/pos-api/admin-staff.client.js';
import type { StaffShiftPlan } from '../../clients/pos-api/staff-shift-plan.client.js';
import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';
import { liveHomeSelectors } from './selectors/home.live.js';
import { offlineHomeSelectors } from './selectors/home.offline.js';

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
  private readonly visibleLicenseRow: Locator;
  private readonly liveNumpadPanel: Locator;
  private readonly livePasswordSaveButton: Locator;
  private readonly livePinInput: Locator;
  private readonly liveEmptyTables: Locator;
  private readonly liveEmptyTableCreateOrderTargets: Locator;
  private readonly liveGuestNumberDialog: Locator;
  private readonly liveTablePageRoot: Locator;
  private readonly liveTableLoading: Locator;
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
    this.togoButton = page.getByTestId('home-togo').or(page.locator(liveHomeSelectors.togoButton)).first();
    this.recallButton = page.getByTestId('home-recall').or(page.locator('#recallbt'));
    this.callerButton = page.getByTestId('home-caller');
    this.adminButton = page.getByTestId('home-admin').or(page.locator('#adminsbt')).first();
    this.reservationButton = page.getByTestId('home-reservation').or(page.locator('#rsvtbt'));
    this.customDeliveryButton = page.getByTestId('home-custom-delivery');
    this.deliveryButton = page.getByTestId('home-delivery').or(page.locator(liveHomeSelectors.deliveryButton));
    this.dineInButton = page.getByTestId(offlineHomeSelectors.dineInButton).or(page.locator(liveHomeSelectors.dineInButton));
    this.pickupButton = page.getByTestId('home-pickup').or(page.locator(liveHomeSelectors.pickupButton));
    this.passwordInput = page.getByTestId('employee-password').or(page.locator('#pwipt'));
    this.savePasswordButton = page.getByTestId('employee-password-save').or(page.locator('#ds'));
    this.licenseContainer = page.locator('#skIptBx');
    this.licenseOkButton = page.locator('#skok');
    this.licenseInput = page.locator('#sknm');
    this.licenseRow = page.locator('.skOneRow');
    this.visibleLicenseRow = page.locator('.skOneRow:visible');
    this.liveNumpadPanel = page.locator('#numpanel:visible').or(page.locator('table:visible').filter({ hasText: /1\s*2\s*3[\s\S]*task_alt/ }));
    this.livePasswordSaveButton = page.locator('#ds');
    this.livePinInput = page.locator('#pwipt');
    this.liveEmptyTables = page.locator(liveHomeSelectors.emptyTable);
    this.liveEmptyTableCreateOrderTargets = page.locator(liveHomeSelectors.emptyTableCreateOrderTarget);
    this.liveGuestNumberDialog = page.locator(liveHomeSelectors.guestNumberDialog);
    this.liveTablePageRoot = page.locator(liveHomeSelectors.tablePageRoot);
    this.liveTableLoading = page.locator(liveHomeSelectors.tableLoading);
    this.backToWorkButton = page.getByTestId('clock-back-to-work').or(page.locator('#brk_out').filter({ hasText: 'Back to Work' }));
    this.breakButton = page.getByTestId('clock-break').or(page.locator('#brk_in'));
    this.cashInOutButton = page.getByTestId('home-cash-in-out');
    this.cancelEditButton = page.getByTestId('edit-cancel').or(page.locator('#cancellayoutbx'));
    this.checkInButton = page.getByTestId('home-check-in').or(page.locator('#checkinbt'));
    this.checkoutButton = page.getByTestId('clock-checkout').or(page.locator('#ckin_out'));
    this.clockText = page.getByTestId('clock-text').or(page.locator('#checkInlineTimeBox'));
    this.editButton = page.getByTestId('edit-home-functions').or(page.locator('#editlayoutbx'));
    this.hiddenFunctionList = page
      .getByTestId('hidden-function-cards')
      .or(page.locator('#editsidebx, #editmoreinbx1, #edithidebtbx'));
    this.hiddenFunctionCards = page
      .getByTestId('hidden-function-card')
      .or(page.locator('#editsidebx > div, #editmoreinbx1 > div, #edithidebtbx div'));
    this.homeFunctionList = page.getByTestId('home-function-cards').or(page.locator('#editbodybx'));
    this.homeFunctionCards = page.getByTestId('home-function-card').or(page.locator('#mmidbxhlp .bt6tx'));
    this.mainAddButton = page.getByTestId('edit-main-add').or(page.locator('#editbodybx > div').last());
    this.messageCenterButton = page.getByTestId('home-message-center').or(page.locator('#mainpageMsgCenterIconBx'));
    this.messageCenterRoot = page
      .getByTestId('message-center')
      .or(page.locator('#msgCenter, #messageCenter, #msgLatestBt, .topicTitle, #msgRemoveAll').first());
    this.moreAddButton = page.getByTestId('edit-more-add').or(page.locator('#editmorebtbx > div > div').last());
    this.orderPageRoot = page.getByTestId('order-page').or(page.locator('#orderDishes'));
    this.reportButton = page.getByTestId('home-report').or(page.locator(liveHomeSelectors.reportButton));
    this.reportPasswordPanel = page
      .locator('[data-testid="report-password-panel"]:visible')
      .or(page.locator(`${liveHomeSelectors.reportPasswordPanel}:visible`))
      .or(page.locator('#iptpwtx:visible').filter({ hasText: /^Enter Your Passcode$/ }))
      .first();
    this.saveEditButton = page.getByTestId('edit-save').or(page.locator('#oklayoutbxTxt'));
    this.supportButton = page.getByTestId('home-support').or(page.locator('#support'));
    this.supportPageRoot = page.getByTestId('support-page').or(page.locator('span:text("Version:"), #supportInfo, #supportPage'));
    this.toast = page.getByTestId('home-toast').or(page.locator('#myalerttxt'));
    this.welcomeText = page.getByTestId('welcome-text');
    this.loginToast = page.getByTestId('login-toast');
  }

  async open(homeUrl: string): Promise<void> {
    await step('打开 POS 首页', async () => {
      await this.page.goto(homeUrl);
      await this.completeStartupLogin();
      await this.hideTransientCovers();
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
      if (!(await this.waitForLicenseDialogGone(10_000))) {
        throw new Error('License 选择弹层未稳定关闭');
      }
      await expect(this.livePinInput).toBeVisible({ timeout: 20_000 });
    }
  }

  async chooseAvailableLicense(): Promise<void> {
    await step('选择可用 License', async () => {
      await expect(this.licenseContainer).toBeVisible({ timeout: 20_000 });
      await expect(this.licenseInput).toBeVisible();
      const deadline = Date.now() + 45_000;
      let lastError: Error | undefined;

      while (Date.now() < deadline) {
        if (!(await this.isLicenseContainerVisible())) {
          if (await this.waitForLicenseDialogGone(10_000)) {
            return;
          }
          continue;
        }

        try {
          await this.waitForStableLicenseList();
          const pcLicense = this.availablePcLicense();
          await expect(pcLicense).toBeVisible({ timeout: 5_000 });
          await pcLicense.click();
          await expect(this.licenseOkButton).toBeVisible({ timeout: 5_000 });
          await this.licenseOkButton.click();
          if (await this.waitForLicenseDialogGone(6_000)) {
            return;
          }
        } catch (error) {
          if (this.page.isClosed()) {
            throw error;
          }
          lastError = error instanceof Error ? error : new Error(String(error));
        }
      }

      if (!(await this.waitForLicenseDialogGone(10_000))) {
        const detail = lastError ? `: ${lastError.message}` : '';
        throw new Error(`License 选择弹层未稳定关闭${detail}`);
      }
    });
  }

  async inputLoginPassword(password: string): Promise<void> {
    await step('输入 PIN 密码并提交', async () => {
      if (await this.isHomeReadyWithoutPasscode()) {
        return;
      }
      if (!(await this.waitForLicenseDialogGone(10_000))) {
        throw new Error('License 弹层未关闭，不能输入 PIN 密码');
      }
      if (!(await this.livePinInput.isVisible()) && (await this.togoButton.isVisible())) {
        return;
      }
      await waitUntil(
        async () => (await this.livePinInput.isVisible().catch(() => false)) || (await this.isHomeReadyWithoutPasscode()),
        {
          description: 'PIN 输入框展示或首页已就绪',
          intervalMs: 200,
          timeoutMs: 20_000,
        },
      );
      if (await this.isHomeReadyWithoutPasscode()) {
        return;
      }
      if (!(await this.livePinInput.isVisible().catch(() => false))) {
        return;
      }
      const readonlyPinInput = await this.livePinInput.evaluate((input) => (input as HTMLInputElement).readOnly);
      if (readonlyPinInput) {
        // live 模式：#pwipt 是 readonly，需要通过数字键盘输入
        for (const digit of password) {
          if (await this.isHomeReadyWithoutPasscode()) {
            return;
          }
          await this.clickVisibleNumpadDigit(digit);
          if (await this.isHomeReadyWithoutPasscode()) {
            return;
          }
        }
      } else {
        // 离线模式：直接 fill 输入框
        await this.livePinInput.fill(password, { timeout: 5_000 }).catch(async (error: unknown) => {
          if (await this.isHomeReadyWithoutPasscode()) {
            return;
          }
          throw error;
        });
      }
      if (await this.isHomeReadyWithoutPasscode()) {
        return;
      }
      if (await this.isLicenseContainerVisible()) {
        throw new Error('License 弹层未关闭，不能输入 PIN 密码');
      }
      await this.waitForLivePinValue(password);
      await this.waitForSubmitSettle();
      if (await this.isLicenseContainerVisible()) {
        throw new Error('License 弹层未关闭，不能输入 PIN 密码');
      }
      if (!(await this.livePinInput.isVisible().catch(() => false)) || (await this.isHomeReadyWithoutPasscode())) {
        return;
      }
      const submitted = await this.clickLivePinSubmitButton();
      if (!submitted && !(await this.isHomeReadyWithoutPasscode())) {
        throw new Error('PIN 提交按钮未找到');
      }
    });
  }

  async inputEmployeePassword(password: string): Promise<void> {
    await step('输入员工密码并提交', async () => {
      if (await this.isLivePasscodePromptVisible()) {
        await this.inputLoginPassword(password);
        return;
      }
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
      await this.savePasswordButton.click();
    });
  }

  async logoutAndLogin(password: string): Promise<void> {
    await step(`重新以员工密码 ${password} 登录`, async () => {
      await this.logout();
      await this.inputEmployeePasswordAfterLogout(password);
    });
  }

  async inputEmployeePasswordAfterLogout(password: string): Promise<void> {
    await step('退出后输入员工密码并提交', async () => {
      if (await this.livePinInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        const readonlyPinInput = await this.livePinInput.evaluate((input) => (input as HTMLInputElement).readOnly);
        if (readonlyPinInput) {
          for (const digit of password) {
            const key = this.liveNumpadPanel
              .first()
              .locator('[data-num], td:visible, div:visible, span:visible')
              .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(digit)}\\s*$`) })
              .first();
            await expect(key).toBeVisible({ timeout: 10_000 });
            await key.click({ force: true });
          }
        } else {
          await this.livePinInput.fill(password);
        }
        await this.waitForLivePinValue(password);
        await this.waitForSubmitSettle();
        const submitted = await this.clickLivePinSubmitButton();
        if (!submitted) {
          throw new Error('PIN 提交按钮未找到');
        }
        await waitUntil(
          () => this.isHomeReadyWithoutPasscode(),
          {
            description: '员工密码提交后首页就绪',
            intervalMs: 200,
            timeoutMs: 15_000,
          },
        );
        return;
      }

      await this.inputEmployeePassword(password);
    });
  }

  async inputEmployeePasswordWithoutSave(password: string): Promise<void> {
    await step('输入员工密码但不保存', async () => {
      if (await this.isLivePasscodePromptVisible()) {
        await this.inputLoginPassword(password);
        return;
      }
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
    });
  }

  async submitEmployeePasswordIfPromptVisible(password: string): Promise<void> {
    await step('如首页显示 PIN 面板则提交员工密码', async () => {
      if (await this.isLivePasscodePromptVisible()) {
        await this.inputLoginPassword(password);
        return;
      }
      if (await this.passwordInput.isVisible({ timeout: 500 }).catch(() => false)) {
        await this.inputEmployeePassword(password);
      }
    });
  }

  async loginWithWrongPassword(password: string): Promise<string> {
    return step('输入错误员工密码并读取失败提示', async () => {
      await this.inputEmployeePassword(password);
      if (await this.loginToast.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return (await this.loginToast.textContent()) ?? '';
      }
      return this.readLiveAlertText(5_000);
    });
  }

  async readPasswordValue(): Promise<string> {
    return step('读取员工密码输入框内容', async () => this.passwordInput.inputValue());
  }

  async refresh(): Promise<void> {
    await step('刷新 POS 首页', async () => {
      await this.page.reload();
      await this.completeStartupLogin();
      await this.hideTransientCovers();
      await waitUntil(
        () => this.isHomeReady(),
        {
          description: 'POS 首页刷新后就绪',
          intervalMs: 200,
          timeoutMs: 15_000,
        },
      );
    });
  }

  async refreshAndReadClockText(): Promise<string> {
    return step('刷新 POS 首页并读取员工打卡状态文案', async () => {
      await this.refresh();
      return this.readClockText();
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

  async applyOfflineShiftSchedule(
    enabled: boolean,
    plans: readonly StaffShiftPlan[],
    autoClockOutEnabled = false,
  ): Promise<void> {
    await step('同步离线员工排班配置', async () => {
      await this.page.evaluate(
        ({ shiftScheduleEnabled, shiftPlans, shiftAutoClockOutEnabled }) => {
          localStorage.setItem('offlineShiftScheduleEnabled', String(shiftScheduleEnabled));
          localStorage.setItem('offlineShiftPlans', JSON.stringify(shiftPlans));
          localStorage.setItem('offlineAutoClockOutEnabled', String(shiftAutoClockOutEnabled));
          window.dispatchEvent(
            new CustomEvent('offline-shift-schedule-updated', {
              detail: { shiftScheduleEnabled, shiftPlans, shiftAutoClockOutEnabled },
            }),
          );
        },
        { shiftScheduleEnabled: enabled, shiftPlans: plans, shiftAutoClockOutEnabled: autoClockOutEnabled },
      );
    });
  }

  async switchLanguage(language: string): Promise<void> {
    await step(`切换首页语言为 ${language}`, async () => {
      const offlineLanguageButton = this.page.getByTestId(`switch-language-${language}`);
      if (await offlineLanguageButton.isVisible().catch(() => false)) {
        await offlineLanguageButton.click();
        await expect(this.welcomeText).toBeVisible();
        return;
      }

      const targetLanguage = language === 'Chinese' ? 'chinese' : 'english';
      const liveLanguageButton = this.page.locator(liveHomeSelectors.languageButton).first();
      await expect(liveLanguageButton).toBeVisible({ timeout: 10_000 });
      const option = this.page.locator(
        targetLanguage === 'chinese' ? liveHomeSelectors.languageOptionChinese : liveHomeSelectors.languageOptionEnglish,
      );
      for (let attempt = 0; attempt < 5; attempt += 1) {
        if (await option.isVisible().catch(() => false)) {
          break;
        }
        await this.hideTransientCovers();
        const clicked = await this.clickLiveLanguageButton();
        if (!clicked) {
          await liveLanguageButton.click({ force: true });
        }
        if (await option.isVisible().catch(() => false)) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
      await expect(option).toBeVisible({ timeout: 10_000 });
      await option.click();
      await waitUntil(
        () => this.isLiveLanguageActive(targetLanguage),
        {
          description: 'POS live 语言切换完成',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      ).catch(() => undefined);
    });
  }

  async readWelcomeText(): Promise<string> {
    return step('读取首页欢迎语', async () => {
      if (await this.welcomeText.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return (await this.welcomeText.textContent()) ?? '';
      }
      return (
        (await this.page.locator('#welcome:visible').first().textContent({ timeout: 2_000 }).catch(() => '')) ||
        (await this.page.getByText(/Welcome\s+Boss/).first().textContent({ timeout: 2_000 }).catch(() => '')) ||
        ''
      );
    });
  }

  async clickAdmin(): Promise<void> {
    await step('打开 Admin 页面', async () => {
      await this.submitEmployeePasswordIfPromptVisible('11');
      await this.ensureHomeFunctionMenuVisible();
      await this.adminButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        await this.openMoreHomeFunctions();
        if (await this.adminButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
          await this.adminButton.click();
          return;
        }
        throw error;
      });
      await expect(this.adminPageRoot.or(this.page.locator('#admin.ui-page-active, #Admin.ui-page-active, #innerpage')).first()).toBeVisible();
    });
  }

  async logout(): Promise<void> {
    await step('退出当前员工登录态', async () => {
      if (await this.isLivePasscodePromptVisible()) {
        return;
      }
      if (await this.passwordInput.isVisible({ timeout: 500 }).catch(() => false) && !(await this.isHomeReady())) {
        return;
      }
      const offlineLogout = this.page.getByTestId(offlineHomeSelectors.logoutButton);
      if (await offlineLogout.isVisible({ timeout: 500 }).catch(() => false)) {
        await offlineLogout.click();
        await expect(this.passwordInput).toBeVisible();
        return;
      }
      const liveLogout = this.page
        .locator(liveHomeSelectors.logoutButton)
        .or(this.page.getByText('Log out', { exact: true }))
        .first();
      await expect(liveLogout).toBeVisible({ timeout: 5_000 });
      await liveLogout.click({ force: true });
      await waitUntil(
        () => this.isLivePasscodePromptVisible(),
        {
          description: 'live 退出后 PIN 面板展示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
    });
  }

  async clickTogo(): Promise<void> {
    await step('从首页进入 To Go 点单页', async () => {
      await this.submitEmployeePasswordIfPromptVisible('11');
      if (await this.orderPageRoot.isVisible()) {
        return;
      }
      await this.togoButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        const clicked = await this.page
          .evaluate(() => {
            const togoButton = document.getElementById('m4btbx');
            if (!togoButton) {
              return false;
            }
            const eventInit = { bubbles: true, cancelable: true, view: window };
            togoButton.dispatchEvent(new PointerEvent('pointerdown', eventInit));
            togoButton.dispatchEvent(new MouseEvent('mousedown', eventInit));
            togoButton.dispatchEvent(new PointerEvent('pointerup', eventInit));
            togoButton.dispatchEvent(new MouseEvent('mouseup', eventInit));
            togoButton.click();
            return true;
          })
          .catch(() => false);
        if (!clicked) {
          throw error;
        }
      });
      if (!(await this.orderPageRoot.isVisible().catch(() => false))) {
        await this.page
          .evaluate(() => {
            const maybeWindow = window as typeof window & { $?: { mobile?: { changePage?: (target: string) => void } } };
            maybeWindow.$?.mobile?.changePage?.('#orderDishes');
          })
          .catch(() => undefined);
      }
      await expect(this.orderPageRoot).toBeVisible({ timeout: 10_000 });
    });
  }

  async clickDineIn(): Promise<void> {
    await step('从首页进入 Dine In 点单页', async () => {
      await this.submitEmployeePasswordIfPromptVisible('11');
      await this.dineInButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        const clicked = await this.page
          .evaluate((selector) => {
            const target = document.querySelector<HTMLElement>(selector);
            if (!target) {
              return false;
            }
            const eventInit = { bubbles: true, cancelable: true, view: window };
            target.dispatchEvent(new PointerEvent('pointerdown', eventInit));
            target.dispatchEvent(new MouseEvent('mousedown', eventInit));
            target.dispatchEvent(new PointerEvent('pointerup', eventInit));
            target.dispatchEvent(new MouseEvent('mouseup', eventInit));
            target.click();
            return true;
          }, liveHomeSelectors.dineInButton)
          .catch(() => false);
        if (!clicked) {
          throw error;
        }
      });
      if (await this.orderPageRoot.isVisible().catch(() => false)) {
        return;
      }

      const noTableDineInButton = this.page.locator(liveHomeSelectors.dineInWithoutTableButton);
      const noTableDineInVisible = await noTableDineInButton
        .waitFor({ state: 'visible', timeout: 5_000 })
        .then(() => true)
        .catch(() => false);
      if (noTableDineInVisible) {
        await noTableDineInButton.click({ timeout: 5_000 }).catch(async () => {
          await this.page.evaluate((selector) => document.querySelector<HTMLElement>(selector)?.click(), liveHomeSelectors.dineInWithoutTableButton);
        });
      }

      await expect(this.orderPageRoot).toBeVisible({ timeout: 10_000 });
    });
  }

  async clickDineInWithTable(guestCount = 2): Promise<void> {
    await step(`从首页选择空桌进入 Dine In 点单页并选择 ${guestCount} 人`, async () => {
      await this.dineInButton.click();
      await this.waitForLiveTablePageReady();
      await expect(this.liveEmptyTables.first()).toBeVisible({ timeout: 10_000 });
      await expect(this.liveEmptyTableCreateOrderTargets.first()).toBeVisible({ timeout: 10_000 });
      await this.liveEmptyTableCreateOrderTargets.first().click();
      await expect(this.liveGuestNumberDialog).toBeVisible({ timeout: 10_000 });
      await this.liveGuestNumberDialog.locator(`[data-num="${guestCount}"]`).click();
      await expect(this.orderPageRoot).toBeVisible({ timeout: 10_000 });
    });
  }

  async clickPickup(): Promise<void> {
    await step('从首页进入 Pickup 点单页', async () => {
      await this.pickupButton.click();
      if (!(await this.isOrderEntryVisible())) {
        await this.clickLivePickupOrderButton();
      }
      await waitUntil(() => this.isOrderEntryVisible(), {
        description: 'Pickup 点单页可交互',
        intervalMs: 200,
        timeoutMs: 10_000,
      });
    });
  }

  private async clickLivePickupOrderButton(): Promise<void> {
    if (await this.isOrderEntryVisible()) {
      return;
    }

    const pickupOrderButton = this.page.locator(liveHomeSelectors.pickupOrderButton);
    if (await pickupOrderButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await this.page
        .evaluate((selector) => {
          document.querySelector<HTMLElement>(selector)?.click();
        }, liveHomeSelectors.pickupOrderButton)
        .catch(async () => {
          await pickupOrderButton.click();
        });
      if (await waitUntil(() => this.isOrderEntryVisible(), {
        description: 'Pickup Order 后进入点单页',
        intervalMs: 200,
        timeoutMs: 2_000,
      }).then(() => true).catch(() => false)) {
        return;
      }
    }

    const clicked = await waitUntil(
      async () =>
        this.page.evaluate(() => {
          const visible = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const orderButton = Array.from(document.querySelectorAll<HTMLElement>('div, button, span'))
            .filter(visible)
            .find((element) => element.textContent?.trim() === 'Order');
          if (!orderButton) {
            return false;
          }
          orderButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
          orderButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
          orderButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
          orderButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
          orderButton.click();
          return true;
        }),
      {
        description: 'Pickup 信息页 Order 按钮可点击',
        intervalMs: 200,
        timeoutMs: 5_000,
      },
    )
      .then(() => true)
      .catch(() => false);
    if (!clicked) {
      throw new Error('Pickup 信息页 Order 按钮未找到');
    }
  }

  private async isOrderEntryVisible(): Promise<boolean> {
    return (
      (await this.orderPageRoot.isVisible().catch(() => false)) ||
      (await this.page.locator('#orderDishes.ui-page-active, #openFoodBx:visible, #odSave:visible, #itemdsply:visible').first().isVisible().catch(() => false))
    );
  }

  async clickRecall(): Promise<void> {
    await step('从首页进入 Recall 页面', async () => {
      const orderPageRecallButton = this.page.locator('#orderDishes.ui-page-active #RecallBx');
      const recallRoot = this.recallRootLocator();
      if (await recallRoot.isVisible().catch(() => false)) {
        return;
      }
      await this.hideTransientCovers();
      const clickedLiveHomeRecall = await this.clickLiveHomeRecallButton();
      if (clickedLiveHomeRecall) {
        await waitUntil(
          async () => {
            if (await recallRoot.isVisible().catch(() => false)) {
              return true;
            }
            await this.clickLiveHomeRecallButton();
            await this.activateLiveRecallPageIfPresent();
            return recallRoot.isVisible().catch(() => false);
          },
          {
            description: 'Recall 页面打开',
            intervalMs: 500,
            timeoutMs: 20_000,
          },
        );
        return;
      }
      if (await this.recallButton.isVisible().catch(() => false)) {
        await this.recallButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
          const clicked = await this.clickLiveHomeRecallButton();
          if (!clicked) {
            throw error;
          }
        });
        if (!(await recallRoot.isVisible().catch(() => false))) {
          await this.clickLiveHomeRecallButton();
          await this.activateLiveRecallPageIfPresent();
        }
        await expect(recallRoot).toBeVisible({ timeout: 20_000 });
        return;
      }
      const clickedLiveOrderRecall = await this.clickLiveOrderRecallButton();
      if (clickedLiveOrderRecall) {
        if (!(await recallRoot.isVisible().catch(() => false))) {
          if (await this.recallButton.isVisible().catch(() => false)) {
            await this.clickLiveHomeRecallButton();
          } else {
            await this.clickLiveOrderRecallButton();
          }
        }
        await expect(recallRoot).toBeVisible({ timeout: 20_000 });
        return;
      }
      await this.recallButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        const clicked = await this.clickLiveHomeRecallButton();
        if (!clicked) {
          throw error;
        }
      });
      if (!(await recallRoot.isVisible().catch(() => false))) {
        await this.clickLiveHomeRecallButton();
        await this.activateLiveRecallPageIfPresent();
      }
      await expect(recallRoot).toBeVisible({ timeout: 20_000 });
    });
  }

  async clickRecallFromHome(): Promise<void> {
    await step('从首页 Recall 入口进入 Recall 页面', async () => {
      const recallRoot = this.recallRootLocator();
      if (await recallRoot.isVisible().catch(() => false)) {
        return;
      }

      await this.hideTransientCovers();
      let clicked = await this.clickLiveHomeRecallButton();
      if (!clicked) {
        clicked = await this.recallButton.click({ timeout: 5_000 }).then(() => true).catch(() => false);
      }

      if (!(await recallRoot.isVisible({ timeout: 5_000 }).catch(() => false))) {
        clicked = (await this.clickLiveHomeRecallButton()) || clicked;
      }
      if (!clicked) {
        throw new Error('首页 Recall 入口不可点击');
      }
      await expect(recallRoot).toBeVisible({ timeout: 10_000 });
    });
  }

  async waitForHomeActionsReady(): Promise<void> {
    await step('等待首页功能入口可交互', async () => {
      await waitUntil(
        async () => (await this.recallButton.isVisible().catch(() => false)) || (await this.togoButton.isVisible().catch(() => false)),
        {
          description: '首页功能入口可交互',
          intervalMs: 200,
          timeoutMs: 15_000,
        },
      );
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
      if (!(await this.reservationButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.expandLiveSideMenu();
      }
      if (!(await this.reservationButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openMoreHomeFunctions();
      }
      await this.reservationButton.click();
      await expect(
        this.page
          .getByTestId('reservation-page')
          .or(this.page.locator('#rsnewHL:visible'))
          .or(this.page.getByText('Reservation Calendar', { exact: true }))
          .first(),
      ).toBeVisible();
    });
  }

  async clickDelivery(): Promise<void> {
    await step('从首页进入 Delivery 页面', async () => {
      await this.deliveryButton.click();
      await expect(this.page.getByTestId('delivery-page').or(this.page.locator('#dlvInfoPh'))).toBeVisible();
    });
  }

  async clickCustomDelivery(): Promise<void> {
    await step('从首页进入自定义 Delivery 页面', async () => {
      if (await this.customDeliveryButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.customDeliveryButton.click();
        await expect(this.page.getByTestId('delivery-page')).toBeVisible();
        return;
      }

      await this.hideTransientCovers();
      const customDeliveryButton = this.page.locator('#custom4bt');
      if (!(await customDeliveryButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
        await this.page.locator('#mainmorebt').click();
      }
      await expect(customDeliveryButton).toBeVisible({ timeout: 10_000 });
      await customDeliveryButton.click();
      await expect(this.page.getByTestId('delivery-page').or(this.page.locator('#dlvInfoPh')).or(this.orderPageRoot).first()).toBeVisible({
        timeout: 10_000,
      });
    });
  }

  async openMessageCenter(): Promise<void> {
    await step('打开首页消息中心', async () => {
      await this.messageCenterButton.click({ timeout: 5_000 }).catch(async () => {
        await this.page
          .evaluate(() => {
            const message = document.getElementById('mainpageMsgCenterIconBx');
            message?.click();
            message?.parentElement?.click();
          })
          .catch(() => undefined);
      });
      await expect(this.messageCenterRoot.first()).toBeVisible();
    });
  }

  async clickReport(): Promise<void> {
    await step('从首页打开报表密码弹层', async () => {
      await this.hideTransientCovers();
      await this.reportButton.click();
      await waitUntil(
        async () =>
          (await this.reportPasswordPanel.isVisible().catch(() => false)) ||
          (await this.isLivePasscodePromptVisible()),
        {
          description: '报表密码弹层展示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
    });
  }

  async clickSupport(): Promise<void> {
    await step('从首页打开支持信息', async () => {
      await this.supportButton.click({ timeout: 5_000 }).catch(async () => {
        await this.page
          .evaluate(() => {
            const support = document.getElementById('support');
            support?.click();
            support?.parentElement?.click();
          })
          .catch(() => undefined);
      });
      await expect(this.supportPageRoot).toBeVisible();
    });
  }

  async openCheckIn(): Promise<void> {
    await step('打开员工打卡入口', async () => {
      if (!(await this.checkInButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.expandLiveSideMenu();
      }
      if (!(await this.checkInButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openMoreHomeFunctions();
      }
      await this.checkInButton.click();
      const popupLocator = this.page
        .locator(
          [
            '#checkinpage.ui-page-active #pwd-input',
            '#checkinpage.ui-page-active #ckin_pw-input-submit',
            '#checkinpage.ui-page-active .pwd-input-list',
            '#pwd-input-dialog:visible #pwd-input',
            '#pwd-input-dialog:visible #pwd-input-submit',
            '#pwd-input-dialog:visible .pwd-input-list',
          ].join(', '),
        )
        .first();
      const checkInActions = this.page
        .locator('#checkinpage.ui-page-active #ckin_in, #checkinpage.ui-page-active #brk_in, #checkinpage.ui-page-active #brk_out, #checkinpage.ui-page-active #ckin_out')
        .first();
      await waitUntil(
        async () => {
          return (
            (await popupLocator.isVisible().catch(() => false)) ||
            (await checkInActions.isVisible().catch(() => false)) ||
            (await this.page.locator('#checkinpage.ui-page-active').isVisible().catch(() => false))
          );
        },
        {
          description: '员工打卡密码弹框展示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
      if (await popupLocator.isVisible().catch(() => false)) {
        await this.enterLivePopupPassword('11');
      }
      await expect(checkInActions).toBeVisible();
    });
  }

  async clickBreakButton(): Promise<void> {
    await step('员工开始休息', async () => {
      await this.breakButton.click();
      await expect(this.backToWorkButton).toBeVisible({ timeout: 10_000 });
    });
  }

  async clickBackToWorkButton(): Promise<void> {
    await step('员工返回工作', async () => {
      await this.backToWorkButton.click();
      await expect(this.breakButton).toBeVisible({ timeout: 10_000 });
    });
  }

  async clickCheckoutButton(): Promise<void> {
    await step('员工下班', async () => {
      await this.checkoutButton.click();
      await this.page.locator('#chkinbkbttx').click({ timeout: 5_000 }).catch(() => undefined);
    });
  }

  async readClockText(): Promise<string> {
    return step('读取员工打卡状态文案', async () => {
      if (await this.clockText.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return (await this.clockText.textContent()) ?? '';
      }

      const liveStatus = await this.readLiveClockStatusText();
      if (liveStatus) {
        return liveStatus;
      }

      return '';
    });
  }

  async clickEdit(): Promise<void> {
    await step('进入首页功能卡编辑模式', async () => {
      if (!(await this.editButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.expandLiveSideMenu();
      }
      if (!(await this.editButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openMoreHomeFunctions();
      }
      await this.editButton.click();
      await expect(this.saveEditButton).toBeVisible();
    });
  }

  async selectHomeFunction(functionName: string): Promise<void> {
    await step(`选择主页面功能卡 ${functionName}`, async () => {
      const offlineButton = this.homeFunctionList.getByRole('button', { exact: true, name: functionName });
      if (await offlineButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlineButton.click();
        return;
      }
      await this.clickLiveFunctionLayoutCard('#editbodybx div', functionName);
    });
  }

  async selectHiddenFunction(functionName: string): Promise<void> {
    await step(`选择隐藏区功能卡 ${functionName}`, async () => {
      const offlineButton = this.hiddenFunctionList.getByRole('button', { exact: true, name: functionName });
      if (await offlineButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlineButton.click();
        return;
      }
      await this.clickLiveFunctionLayoutCard('#editsidebx > div, #editmoreinbx1 > div, #edithidebtbx div', functionName);
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
      await this.clickLiveFunctionLayoutSave();
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

  async waitForHomeFunctionCards(expectedFunction: string, removedFunction?: string): Promise<string[]> {
    return step(`等待首页功能卡展示 ${expectedFunction}`, async () => {
      let cardNames: string[] = [];
      await waitUntil(
        async () => {
          cardNames = await this.readHomeFunctionCardNames();
          return cardNames.includes(expectedFunction) && (!removedFunction || !cardNames.includes(removedFunction));
        },
        {
          description: `首页功能卡刷新为 ${expectedFunction}`,
          intervalMs: 500,
          timeoutMs: 15_000,
        },
      );
      return cardNames;
    });
  }

  async readFirstHomeFunctionCardName(): Promise<string> {
    return step('读取第一个主页面功能卡名称', async () => {
      const cardNames = await this.readHomeFunctionCardNames();
      return cardNames[0] ?? '';
    });
  }

  async waitForFirstHomeFunctionCard(expectedFunction: string): Promise<string> {
    return step(`等待首页首个功能卡展示 ${expectedFunction}`, async () => {
      let firstCardName = '';
      await waitUntil(
        async () => {
          firstCardName = await this.readFirstHomeFunctionCardName();
          return firstCardName === expectedFunction;
        },
        {
          description: `首页首个功能卡刷新为 ${expectedFunction}`,
          intervalMs: 500,
          timeoutMs: 15_000,
        },
      );
      return firstCardName;
    });
  }

  async readToastText(): Promise<string> {
    return step('读取首页提示文案', async () => {
      if (await this.toast.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return (await this.toast.textContent()) ?? '';
      }
      return this.readLiveAlertText(5_000);
    });
  }

  private async clickLiveFunctionLayoutCard(selector: string, functionName: string): Promise<void> {
    const target = this.page
      .locator(selector)
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(functionName)}\\s*$`) })
      .first();
    await expect(target).toBeVisible({ timeout: 5_000 });
    const box = await target.boundingBox();
    if (!box) {
      throw new Error(`live 首页功能卡编辑区未找到 ${functionName}`);
    }
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.waitForTimeout(500);
  }

  private async clickLiveFunctionLayoutSave(): Promise<void> {
    if (await this.page.getByTestId('edit-save').isVisible({ timeout: 500 }).catch(() => false)) {
      await this.page.getByTestId('edit-save').click();
      return;
    }
    const clicked = await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const target =
          document.querySelector<HTMLElement>('#oklayoutbxTxt')?.closest<HTMLElement>('#oklayoutbx, button, div') ??
          document.querySelector<HTMLElement>('#oklayoutbxTxt');
        if (!target || !visible(target)) {
          return false;
        }
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        jquery?.(target).trigger('tap');
        jquery?.(target).trigger('click');
        target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        target.click();
        return true;
      })
      .catch(() => false);
    if (!clicked) {
      await this.saveEditButton.click();
    }
  }

  private async readLiveAlertText(timeoutMs: number): Promise<string> {
    let alertText = '';
    await waitUntil(
      async () => {
        alertText = await this.page
          .locator('#myalerttxt:visible, #myalert:visible, [role="alert"]:visible, .ant-message-notice-content:visible')
          .evaluateAll((elements) =>
            elements
              .map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '')
              .find(Boolean) ?? '',
          )
          .catch(() => '');
        return alertText.length > 0;
      },
      {
        description: 'live 公共提示展示',
        intervalMs: 100,
        timeoutMs,
      },
    );
    return alertText;
  }

  private async waitForPasswordValue(password: string): Promise<void> {
    await waitUntil(async () => (await this.passwordInput.inputValue()) === password, {
      description: '员工密码输入稳定',
      intervalMs: 25,
      timeoutMs: 1_000,
    });
  }

  private async completeStartupLogin(): Promise<void> {
    const deadline = Date.now() + 90_000;

    while (Date.now() < deadline) {
      await this.hideTransientCovers();

      if (await this.isLicenseContainerVisible()) {
        await this.chooseAvailableLicense();
        continue;
      }

      if (await this.isOfflineHomeReady()) {
        return;
      }

      if (await this.isHomeReady()) {
        return;
      }

      if (await this.isHomeReadyWithoutPasscode()) {
        return;
      }

      if (await this.isLivePasscodePromptVisible()) {
        try {
          await this.inputLoginPassword('11');
        } catch (error) {
          if (error instanceof Error && error.message.includes('License 弹层未关闭')) {
            continue;
          }
          throw error;
        }
        continue;
      }

      if (await this.livePinInput.isVisible()) {
        try {
          await this.inputLoginPassword('11');
        } catch (error) {
          if (error instanceof Error && error.message.includes('License 弹层未关闭')) {
            continue;
          }
          if (await this.isHomeReady()) {
            return;
          }
          throw error;
        }
        continue;
      }

      await waitUntil(
        async () =>
          (await this.isLicenseContainerVisible()) ||
          (await this.livePinInput.isVisible()) ||
          (await this.isHomeReady()),
        {
          description: 'POS 启动登录状态变化',
          intervalMs: 200,
          timeoutMs: Math.min(5_000, Math.max(200, deadline - Date.now())),
        },
      ).catch(() => undefined);
    }

    throw new Error('POS 首页启动登录未完成');
  }

  private async isHomeReady(): Promise<boolean> {
    const bodyText = (await this.page.locator('body').innerText().catch(() => '')) ?? '';
    return (
      bodyText.includes('Welcome Boss') ||
      bodyText.includes('Dine In') ||
      (await this.togoButton.isVisible().catch(() => false)) ||
      (await this.dineInButton.isVisible().catch(() => false)) ||
      (await this.page.getByText('Welcome Boss', { exact: true }).isVisible().catch(() => false)) ||
      (await this.page.getByText('Dine In', { exact: true }).isVisible().catch(() => false)) ||
      (await this.homeRoot.isVisible().catch(() => false)) ||
      (await this.orderPageRoot.isVisible().catch(() => false))
    );
  }

  private async isLivePasscodePromptVisible(): Promise<boolean> {
    if (await this.page.getByTestId('pos-home').isVisible({ timeout: 200 }).catch(() => false)) {
      return false;
    }
    const activeLoginPage = this.page.locator('#loginPage.ui-page-active').first();
    const activeLoginText = (await activeLoginPage.innerText({ timeout: 500 }).catch(() => '')) ?? '';
    const bodyText = (await this.page.locator('body').innerText().catch(() => '')) ?? '';
    const hasPasscodeText = activeLoginText.includes('Enter Your Passcode');
    if (!hasPasscodeText && /Welcome\s+Boss/.test(bodyText) && /Dine In/.test(bodyText) && /To Go/.test(bodyText)) {
      return false;
    }
    const hasNumpadText = /1\s*2\s*3[\s\S]*4\s*5\s*6[\s\S]*7\s*8\s*9[\s\S]*0/.test(activeLoginText);
    return (
      (hasPasscodeText && hasNumpadText) ||
      (await this.page.locator('#loginPage.ui-page-active #pwipt').isVisible().catch(() => false)) ||
      ((await this.livePinInput.isVisible().catch(() => false)) &&
        (hasPasscodeText ||
          (await this.page.getByText('Enter Your Passcode', { exact: true }).isVisible().catch(() => false))))
    );
  }

  private async isHomeReadyWithoutPasscode(): Promise<boolean> {
    return (await this.isHomeReady()) && !(await this.isLivePasscodePromptVisible());
  }

  private async isLiveLanguageActive(targetLanguage: 'chinese' | 'english'): Promise<boolean> {
    const activePageText =
      (await this.page
        .locator('#loginPage.ui-page-active, #orderDishes.ui-page-active')
        .innerText()
        .catch(() => '')) ?? '';
    return targetLanguage === 'chinese'
      ? /堂吃|菜单组|欢迎您/.test(activePageText)
      : /Dine In|Menu Group|Welcome/.test(activePageText);
  }

  private async clickLiveLanguageButton(): Promise<boolean> {
    return this.page
      .evaluate(() => {
        for (const selector of ['#loginPage.ui-page-active #mlanBtbx', '#orderDishes.ui-page-active #orderLanBt', '#mlanBtbx', '#orderLanBt']) {
          const button = document.querySelector<HTMLElement>(selector);
          if (!button) {
            continue;
          }
          const rect = button.getBoundingClientRect();
          const style = window.getComputedStyle(button);
          if (rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden') {
            button.click();
            return true;
          }
        }
        return false;
      })
      .catch(() => false);
  }

  private recallRootLocator(): Locator {
    return this.page
      .getByTestId('recall-page')
      .or(this.page.locator('#recall.ui-page-active'))
      .or(this.page.locator('#recall .recall'))
      .or(this.page.locator('.recall'))
      .or(this.page.locator('#recallodlist:visible, #recallorderlist:visible, #odlist:visible, #odsmrylst:visible'))
      .or(this.page.locator('#set_UNPAID'))
      .first();
  }

  private async ensureHomeFunctionMenuVisible(): Promise<void> {
    if (await this.adminButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return;
    }

    const backToHomeButton = this.page.locator('#mbtexclhl3, #mbackbt, #back2home, #odBack:visible, #exitBt:visible').first();
    if (await backToHomeButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await backToHomeButton.click().catch(() => undefined);
      if (await this.adminButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
        return;
      }
    }

    await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const candidates = ['#mbtexclhl3', '#mbackbt', '#back2home', '#odBack', '#exitBt'];
        const target = candidates
          .map((selector) => document.querySelector<HTMLElement>(selector))
          .find((element): element is HTMLElement => !!element && visible(element));
        target?.click();
      })
      .catch(() => undefined);
  }

  private async openMoreHomeFunctions(): Promise<void> {
    await this.page
      .locator('#btMainmoretxt, #mainmorebt')
      .first()
      .click({ timeout: 3_000 })
      .catch(async () => {
        await this.page
          .evaluate(() => {
            const visible = (element: HTMLElement) => {
              const rect = element.getBoundingClientRect();
              const style = window.getComputedStyle(element);
              return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
            };
            const target = ['#btMainmoretxt', '#mainmorebt']
              .map((selector) => document.querySelector<HTMLElement>(selector))
              .find((element): element is HTMLElement => !!element && visible(element));
            target?.click();
          })
          .catch(() => undefined);
      });
  }

  private async expandLiveSideMenu(): Promise<void> {
    if (await this.page.locator('#mBxexcl.ab.mBxS, #editlayoutbx:visible').isVisible({ timeout: 500 }).catch(() => false)) {
      return;
    }
    await this.page.locator('#lefticon').click({ timeout: 2_000 }).catch(async () => {
      await this.page
        .evaluate(() => {
          const leftIcon = document.getElementById('lefticon');
          leftIcon?.click();
        })
        .catch(() => undefined);
    });
    await waitUntil(
      async () =>
        (await this.page.locator('#mBxexcl.ab.mBxS, #editlayoutbx:visible').isVisible().catch(() => false)) ||
        (await this.editButton.isVisible().catch(() => false)),
      {
        description: 'live 首页右侧功能菜单展开',
        intervalMs: 100,
        timeoutMs: 3_000,
      },
    ).catch(() => undefined);
  }

  private async clickLiveHomeRecallButton(): Promise<boolean> {
    const triggeredDirectly = await this.page
      .evaluate(() => {
        const button = document.getElementById('recallbt');
        if (!button) {
          return false;
        }
        const rect = button.getBoundingClientRect();
        const style = window.getComputedStyle(button);
        if (rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }

        const jquery = (window as unknown as { $?: (element: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        let current: HTMLElement | null = button;
        for (let depth = 0; current && depth < 3; depth += 1) {
          jquery?.(current).trigger('tap');
          jquery?.(current).trigger('click');
          current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
          current.click();
          current = current.parentElement;
        }
        return true;
      })
      .catch(() => false);
    if (triggeredDirectly) {
      return true;
    }

    const box = await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const directRecallButton = document.getElementById('recallbt');
        if (directRecallButton && visible(directRecallButton)) {
          const rect = directRecallButton.getBoundingClientRect();
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        const candidates = Array.from(document.querySelectorAll<HTMLElement>('div, button'))
          .filter(visible)
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            return /^Recall$/i.test(text) || (/Recall/i.test(text) && rect.width <= 260 && rect.height <= 160);
          })
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            const leftExact = /^Recall$/i.test(left.textContent?.replace(/\s+/g, ' ').trim() ?? '') ? 0 : 1;
            const rightExact = /^Recall$/i.test(right.textContent?.replace(/\s+/g, ' ').trim() ?? '') ? 0 : 1;
            if (leftExact !== rightExact) {
              return leftExact - rightExact;
            }
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const target = candidates[0] ?? document.getElementById('recallbt');
        if (!target || !visible(target)) {
          return null;
        }
        const rect = target.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })
      .catch(() => null);
    if (box) {
      await this.page.mouse.click(box.x, box.y);
      return true;
    }
    return this.page
      .evaluate(() => {
        const recallButton = document.getElementById('recallbt');
        if (!recallButton) {
          return false;
        }
        const rect = recallButton.getBoundingClientRect();
        const style = window.getComputedStyle(recallButton);
        if (rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }
        recallButton.click();
        return true;
      })
      .catch(() => false);
  }

  private async activateLiveRecallPageIfPresent(): Promise<void> {
    await this.page
      .evaluate(() => {
        const recallPage = document.getElementById('recall');
        if (!recallPage) {
          return;
        }
        const maybeWindow = window as typeof window & { $?: { mobile?: { changePage?: (target: string) => void } } };
        maybeWindow.$?.mobile?.changePage?.('#recall');
      })
      .catch(() => undefined);
  }

  private async clickLiveOrderRecallButton(): Promise<boolean> {
    return this.page
      .evaluate(() => {
        const recallButton = document.querySelector<HTMLElement>('#orderDishes.ui-page-active #RecallBx');
        if (!recallButton) {
          return false;
        }
        const rect = recallButton.getBoundingClientRect();
        const style = window.getComputedStyle(recallButton);
        if (rect.width <= 0 || rect.height <= 0 || style.display === 'none' || style.visibility === 'hidden') {
          return false;
        }
        recallButton.click();
        return true;
      })
      .catch(() => false);
  }

  private async isOfflineHomeReady(): Promise<boolean> {
    return (
      (await this.homeRoot.isVisible().catch(() => false)) ||
      (await this.orderPageRoot.isVisible().catch(() => false))
    );
  }

  private availablePcLicense(): Locator {
    return this.visibleLicenseRow.filter({ hasText: 'Not in use' }).filter({ hasText: 'PC' }).first();
  }

  private async isLicenseContainerVisible(): Promise<boolean> {
    return (
      (await this.licenseContainer.isVisible().catch(() => false)) ||
      (await this.licenseInput.isVisible().catch(() => false)) ||
      (await this.visibleLicenseRow.first().isVisible().catch(() => false))
    );
  }

  private async waitForStableLicenseList(): Promise<void> {
    let lastSnapshot = '';
    let stableSince = 0;
    const stableMs = 1_200;

    await waitUntil(
      async () => {
        if (!(await this.isLicenseContainerVisible())) {
          lastSnapshot = '';
          stableSince = 0;
          return false;
        }

        const snapshot = await this.readVisibleLicenseSnapshot();
        const hasAvailablePcLicense = snapshot.includes('PC') && snapshot.includes('Not in use');
        const now = Date.now();
        if (!snapshot || !hasAvailablePcLicense) {
          lastSnapshot = snapshot;
          stableSince = 0;
          return false;
        }

        if (snapshot !== lastSnapshot) {
          lastSnapshot = snapshot;
          stableSince = now;
          return false;
        }

        if (!stableSince) {
          stableSince = now;
          return false;
        }

        return now - stableSince >= stableMs;
      },
      {
        description: 'License 列表稳定',
        intervalMs: 100,
        timeoutMs: 15_000,
      },
    );
  }

  private async waitForLicenseDialogGone(timeoutMs: number): Promise<boolean> {
    let hiddenSince = 0;
    const stableMs = 800;

    return waitUntil(
      async () => {
        const visible = await this.isLicenseContainerVisible();
        const now = Date.now();
        if (visible) {
          hiddenSince = 0;
          return false;
        }

        if (!hiddenSince) {
          hiddenSince = now;
          return false;
        }

        return now - hiddenSince >= stableMs;
      },
      {
        description: 'License 选择弹层稳定关闭',
        intervalMs: 100,
        timeoutMs,
      },
    )
      .then(() => true)
      .catch(() => false);
  }

  private async readVisibleLicenseSnapshot(): Promise<string> {
    return this.licenseRow
      .evaluateAll((rows) =>
        rows
          .filter((row) => {
            const rect = row.getBoundingClientRect();
            const style = window.getComputedStyle(row);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          })
          .map((row) => row.textContent?.replace(/\s+/g, ' ').trim() ?? '')
          .filter(Boolean)
          .join('|'),
      )
      .catch(() => '');
  }

  private async clickVisibleNumpadDigit(digit: string): Promise<void> {
    await this.hideTransientCovers();
    if (await this.isHomeReadyWithoutPasscode()) {
      return;
    }
    const valueBeforeClick = await this.livePinInput.inputValue().catch(() => '');
    const key = this.liveNumpadPanel
      .first()
      .locator('td:visible, div:visible, span:visible')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(digit)}\\s*$`) })
      .first();
    const numpadVisible = await this.liveNumpadPanel.first().isVisible({ timeout: 500 }).catch(() => false);
    if (!numpadVisible && (await this.isHomeReadyWithoutPasscode())) {
      return;
    }
    await waitUntil(
      async () =>
        (await this.liveNumpadPanel.first().isVisible().catch(() => false)) ||
        (await this.isHomeReadyWithoutPasscode()),
      {
        description: 'PIN 数字键盘展示或首页已就绪',
        intervalMs: 100,
        timeoutMs: 10_000,
      },
    );
    if (await this.isHomeReadyWithoutPasscode()) {
      return;
    }
    const keyVisible = await key.isVisible({ timeout: 500 }).catch(() => false);
    if (!keyVisible && (await this.isHomeReadyWithoutPasscode())) {
      return;
    }
    await expect(key).toBeVisible({ timeout: 10_000 });
    await key.click({ force: true, timeout: 1_000 }).catch(() => undefined);
    if (await this.isHomeReadyWithoutPasscode()) {
      return;
    }
    const valueChanged = await waitUntil(async () => (await this.livePinInput.inputValue().catch(() => '')).length > valueBeforeClick.length, {
      description: `PIN 数字 ${digit} 输入完成`,
      intervalMs: 25,
      timeoutMs: 300,
    })
      .then(() => true)
      .catch(() => false);
    if (valueChanged) {
      return;
    }
    if (await this.isHomeReadyWithoutPasscode()) {
      return;
    }
    await this.page
      .evaluate((targetDigit) => {
        const visibleElements = Array.from(document.querySelectorAll<HTMLElement>('#numpanel [data-num], #numpanel td, #numpanel div, #numpanel span, td, div, span'))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          })
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const keyButton = visibleElements.find(
          (element) => element.dataset.num === targetDigit || element.textContent?.trim() === targetDigit,
        );
        keyButton?.click();
      }, digit)
      .catch(() => undefined);
    await waitUntil(
      async () =>
        (await this.isHomeReadyWithoutPasscode()) ||
        (await this.livePinInput.inputValue().catch(() => '')).length > valueBeforeClick.length,
      {
        description: `PIN 数字 ${digit} fallback 输入完成`,
        intervalMs: 25,
        timeoutMs: 500,
      },
    );
  }

  private async clickLivePinSubmitButton(): Promise<boolean> {
    if (await this.isLicenseContainerVisible()) {
      await this.chooseAvailableLicense();
      if (!(await this.waitForLicenseDialogGone(10_000))) {
        throw new Error('License 弹层未关闭，不能提交 PIN 密码');
      }
    }

    const clicked = await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const submitButton =
          document.querySelector<HTMLElement>('#loginPage.ui-page-active #ds') ??
          document.querySelector<HTMLElement>('#ds');
        if (!submitButton || !visible(submitButton)) {
          return false;
        }
        const eventInit = { bubbles: true, cancelable: true, view: window };
        submitButton.dispatchEvent(new PointerEvent('pointerdown', eventInit));
        submitButton.dispatchEvent(new MouseEvent('mousedown', eventInit));
        submitButton.dispatchEvent(new PointerEvent('pointerup', eventInit));
        submitButton.dispatchEvent(new MouseEvent('mouseup', eventInit));
        submitButton.click();
        return true;
      })
      .catch(() => false);
    if (clicked) {
      return true;
    }

    return this.page
      .evaluate(() => {
        const visibleElements = Array.from(document.querySelectorAll<HTMLElement>('#ds, td, div, span'))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          })
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const submitButton = visibleElements.find((element) => element.id === 'ds' || element.textContent?.trim() === 'task_alt');
        if (!submitButton) {
          return false;
        }
        submitButton.click();
        return true;
      })
      .catch(() => false);
  }

  private async enterLivePopupPassword(password: string): Promise<void> {
    for (const digit of password) {
      const digitButton = this.page
        .locator(`.pwd-input-list:visible .pwd-input-item[data-num="${digit}"], .pwd-input-list:visible [data-num="${digit}"], #mykbfl_${digit}:visible`)
        .first();
      await expect(digitButton).toBeVisible({ timeout: 5_000 });
      await digitButton.click({ force: true });
    }
    const submitButton = this.page
      .locator(
        '.pwd-input-list:visible .pwd-input-item[data-num="dsfl"], .pwd-input-list:visible [data-num="dsfl"], #ckin_pw-input-submit:visible, #pwd-input-submit:visible',
      )
      .first();
    await expect(submitButton).toBeVisible({ timeout: 5_000 });
    await submitButton.click({ force: true });
    await waitUntil(
      async () =>
        (await this.page.locator('#checkinpage.ui-page-active #ckin_in:visible, #checkinpage.ui-page-active #brk_in:visible, #checkinpage.ui-page-active #brk_out:visible, #checkinpage.ui-page-active #ckin_out:visible').count().catch(() => 0)) >
          0 ||
        (await this.page
          .locator('#pwd-input-dialog:visible #pwd-input, #pwd-input-dialog:visible #pwd-input-submit, #pwd-input-dialog:visible .pwd-input-list')
          .count()
          .catch(() => 0)) === 0,
      {
        description: 'live 通用密码弹框关闭',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    );
  }

  private async readLiveClockStatusText(): Promise<string> {
    const status = await this.page
      .evaluate(() => {
        const isVisible = (selector: string) => {
          const element = document.querySelector<HTMLElement>(selector);
          if (!element || element.classList.contains('hide')) {
            return false;
          }
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };

        if (isVisible('#checkinpage.ui-page-active #brk_out')) {
          return 'break';
        }
        if (isVisible('#checkinpage.ui-page-active #ckin_out')) {
          return 'clocked-in';
        }
        if (isVisible('#checkinpage.ui-page-active #ckin_in')) {
          return 'clocked-out';
        }
        return '';
      })
      .catch(() => '');

    if (!status) {
      return '';
    }

    const timeText = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
      .format(new Date())
      .replace(/\s+/g, '');

    if (status === 'break') {
      return `On Break from ${timeText}`;
    }
    if (status === 'clocked-in') {
      return `Clocked In at ${timeText}`;
    }
    return 'Clocked Out';
  }

  private async hideTransientCovers(): Promise<void> {
    await this.page
      .evaluate(() => {
        for (const cover of document.querySelectorAll<HTMLElement>('.mycover, [id^="floatcover"]')) {
          cover.style.display = 'none';
        }
      })
      .catch(() => undefined);
  }

  private async waitForLivePinValue(password: string): Promise<void> {
    await waitUntil(async () => (await this.livePinInput.inputValue()) === password, {
      description: 'PIN 密码输入稳定',
      intervalMs: 25,
      timeoutMs: 1_000,
    });
  }

  private async waitForSubmitSettle(): Promise<void> {
    const startedAt = Date.now();
    await waitUntil(() => Date.now() - startedAt >= 200, {
      description: '提交前输入状态稳定',
      intervalMs: 25,
      timeoutMs: 500,
    });
  }

  private async waitForLiveTablePageReady(): Promise<void> {
    await expect(this.liveTablePageRoot).toBeVisible({ timeout: 10_000 });
    let lastSnapshot = '';
    let stableSince = 0;
    const stableMs = 600;

    await waitUntil(
      async () => {
        const loadingVisible = await this.liveTableLoading.isVisible().catch(() => false);
        const snapshot = await this.readLiveTableSnapshot();
        const now = Date.now();
        if (loadingVisible || !snapshot) {
          lastSnapshot = snapshot;
          stableSince = 0;
          return false;
        }

        if (snapshot !== lastSnapshot) {
          lastSnapshot = snapshot;
          stableSince = now;
          return false;
        }

        if (!stableSince) {
          stableSince = now;
          return false;
        }

        return now - stableSince >= stableMs;
      },
      {
        description: 'Live 桌台页加载完成',
        intervalMs: 100,
        timeoutMs: 15_000,
      },
    );
  }

  private async readLiveTableSnapshot(): Promise<string> {
    return this.liveTablePageRoot
      .locator('.tbclasss')
      .evaluateAll((tables) =>
        tables
          .map((table) => `${table.id}:${table.className}:${table.textContent?.replace(/\s+/g, ' ').trim() ?? ''}`)
          .join('|'),
      )
      .catch(() => '');
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
