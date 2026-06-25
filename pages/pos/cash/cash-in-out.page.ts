import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../../utils/step.js';
import { PageObject } from '../../shared/page-object.js';

export class CashInOutPage extends PageObject {
  private readonly cashRoot: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.cashRoot = page.getByTestId('cash-in-out-page');
    this.title = page.getByTestId('cash-in-out-title');
  }

  async readPageText(): Promise<string> {
    return step('读取 Cash In/Out 页面标题', async () => {
      await expect(this.cashRoot).toBeVisible();
      return ((await this.title.textContent()) ?? '').trim();
    });
  }
}
