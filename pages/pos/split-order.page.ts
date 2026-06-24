import type { Locator, Page } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class SplitOrderPage extends PageObject {
  private readonly evenSplitButton: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.evenSplitButton = page.getByTestId('crm-split-even');
    this.saveButton = page.getByTestId('crm-split-save');
  }

  async splitEvenly(parts: number): Promise<void> {
    await step(`平均分单为 ${parts} 份`, async () => {
      await this.evenSplitButton.click();
    });
  }

  async save(): Promise<void> {
    await step('保存分单结果', async () => {
      await this.saveButton.click();
    });
  }
}
