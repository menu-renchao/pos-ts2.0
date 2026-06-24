import type { Locator, Page } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class SplitOrderPage extends PageObject {
  private readonly dragSplitButton: Locator;
  private readonly evenSplitButton: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dragSplitButton = page.getByTestId('crm-split-drag');
    this.evenSplitButton = page.getByTestId('crm-split-even');
    this.saveButton = page.getByTestId('crm-split-save');
  }

  async splitByDrag(): Promise<void> {
    await step('拖动方式分单', async () => {
      await this.dragSplitButton.click();
    });
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
