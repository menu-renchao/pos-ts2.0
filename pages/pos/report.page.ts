import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class ReportPage extends PageObject {
  private readonly reportPasswordInput: Locator;
  private readonly reportPasswordSaveButton: Locator;
  private readonly reportRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.reportPasswordInput = page.getByTestId('report-password');
    this.reportPasswordSaveButton = page.getByTestId('report-password-save');
    this.reportRoot = page.getByTestId('report-page');
  }

  async inputPasswordInPopup(password: string): Promise<void> {
    await step('在报表密码弹层输入员工密码', async () => {
      await this.reportPasswordInput.fill(password);
      await waitUntil(async () => (await this.reportPasswordInput.inputValue()) === password, {
        description: '报表密码输入稳定',
        intervalMs: 25,
        timeoutMs: 1_000,
      });
      await this.reportPasswordSaveButton.click();
    });
  }

  async isInReportPage(): Promise<boolean> {
    return step('判断是否进入报表页面', async () => {
      await expect(this.reportRoot).toBeVisible();
      return this.reportRoot.isVisible();
    });
  }
}
