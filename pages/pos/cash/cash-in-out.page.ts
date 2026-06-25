import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../../utils/step.js';
import { PageObject } from '../../shared/page-object.js';

export class CashInOutPage extends PageObject {
  private readonly cashRoot: Locator;
  private readonly completeButton: Locator;
  private readonly cover: Locator;
  private readonly noteInput: Locator;
  private readonly noteOkButton: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.cashRoot = page.getByTestId('cash-in-out-page');
    this.completeButton = page.getByTestId('cash-in-out-complete');
    this.cover = page.getByTestId('cash-in-out-cover');
    this.noteInput = page.getByTestId('cash-in-out-note');
    this.noteOkButton = page.getByTestId('cash-in-out-note-ok');
    this.title = page.getByTestId('cash-in-out-title');
  }

  async readPageText(): Promise<string> {
    return step('读取 Cash In/Out 页面标题', async () => {
      await expect(this.cashRoot).toBeVisible();
      return ((await this.title.textContent()) ?? '').trim();
    });
  }

  async completeCashInOut(note: string): Promise<void> {
    await step('完成 Cash In/Out 并录入备注', async () => {
      await this.completeButton.click();
      await this.noteInput.fill(note);
      await this.noteOkButton.click();
    });
  }

  async closeCover(): Promise<void> {
    await step('关闭 Cash In/Out 遮罩返回首页', async () => {
      await this.cover.click();
      await expect(this.cashRoot).toBeHidden();
    });
  }
}
