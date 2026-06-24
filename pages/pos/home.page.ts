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

  private readonly loginToast: Locator;
  private readonly homeRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.homeRoot = page.getByTestId('pos-home');
    this.togoButton = page.getByTestId('home-togo');
    this.recallButton = page.getByTestId('home-recall');
    this.adminButton = page.getByTestId('home-admin');
    this.passwordInput = page.getByTestId('employee-password');
    this.savePasswordButton = page.getByTestId('employee-password-save');
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
}
