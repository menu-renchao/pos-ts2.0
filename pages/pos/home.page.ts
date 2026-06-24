import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class PosHomePage extends PageObject {
  readonly togoButton: Locator;
  readonly recallButton: Locator;
  readonly adminButton: Locator;
  readonly reservationButton: Locator;
  readonly deliveryButton: Locator;
  readonly dineInButton: Locator;
  readonly pickupButton: Locator;
  readonly passwordInput: Locator;
  readonly savePasswordButton: Locator;

  private readonly adminPageRoot: Locator;
  private readonly cancelEditButton: Locator;
  private readonly backToWorkButton: Locator;
  private readonly breakButton: Locator;
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
    this.homeRoot = page.getByTestId('pos-home');
    this.adminPageRoot = page.getByTestId('admin-page');
    this.togoButton = page.getByTestId('home-togo');
    this.recallButton = page.getByTestId('home-recall');
    this.adminButton = page.getByTestId('home-admin');
    this.reservationButton = page.getByTestId('home-reservation');
    this.deliveryButton = page.getByTestId('home-delivery');
    this.dineInButton = page.getByTestId('home-dine-in');
    this.pickupButton = page.getByTestId('home-pickup');
    this.passwordInput = page.getByTestId('employee-password');
    this.savePasswordButton = page.getByTestId('employee-password-save');
    this.backToWorkButton = page.getByTestId('clock-back-to-work');
    this.breakButton = page.getByTestId('clock-break');
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
    this.orderPageRoot = page.getByTestId('order-page');
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
      await expect(this.homeRoot).toBeVisible();
    });
  }

  async inputEmployeePassword(password: string): Promise<void> {
    await step('输入员工密码并提交', async () => {
      await this.passwordInput.fill(password);
      await this.waitForPasswordValue(password);
      await this.savePasswordButton.click();
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
      await expect(this.page.getByTestId('recall-page')).toBeVisible();
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
