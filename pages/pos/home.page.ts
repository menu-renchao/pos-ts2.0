import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class PosHomePage extends PageObject {
  readonly togoButton: Locator;
  readonly recallButton: Locator;
  readonly adminButton: Locator;
  readonly passwordInput: Locator;
  readonly savePasswordButton: Locator;

  private readonly cancelEditButton: Locator;
  private readonly editButton: Locator;
  private readonly hiddenFunctionCards: Locator;
  private readonly hiddenFunctionList: Locator;
  private readonly homeFunctionCards: Locator;
  private readonly homeFunctionList: Locator;
  private readonly loginToast: Locator;
  private readonly mainAddButton: Locator;
  private readonly moreAddButton: Locator;
  private readonly saveEditButton: Locator;
  private readonly toast: Locator;
  private readonly homeRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.homeRoot = page.getByTestId('pos-home');
    this.togoButton = page.getByTestId('home-togo');
    this.recallButton = page.getByTestId('home-recall');
    this.adminButton = page.getByTestId('home-admin');
    this.passwordInput = page.getByTestId('employee-password');
    this.savePasswordButton = page.getByTestId('employee-password-save');
    this.cancelEditButton = page.getByTestId('edit-cancel');
    this.editButton = page.getByTestId('edit-home-functions');
    this.hiddenFunctionList = page.getByTestId('hidden-function-cards');
    this.hiddenFunctionCards = page.getByTestId('hidden-function-card');
    this.homeFunctionList = page.getByTestId('home-function-cards');
    this.homeFunctionCards = page.getByTestId('home-function-card');
    this.mainAddButton = page.getByTestId('edit-main-add');
    this.moreAddButton = page.getByTestId('edit-more-add');
    this.saveEditButton = page.getByTestId('edit-save');
    this.toast = page.getByTestId('home-toast');
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
      await waitUntil(async () => (await this.passwordInput.inputValue()) === password, {
        description: '员工密码输入稳定',
        intervalMs: 25,
        timeoutMs: 1_000,
      });
      await this.savePasswordButton.click();
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
}
