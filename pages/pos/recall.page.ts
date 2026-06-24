import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type RecalledOrderItem = {
  name: string;
  price: number;
};

export class RecallPage extends PageObject {
  private readonly recentOrderButton: Locator;
  private readonly recallItems: Locator;
  private readonly recallRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.recentOrderButton = page.getByTestId('recall-recent-order');
    this.recallItems = page.getByTestId('recall-order-item');
    this.recallRoot = page.getByTestId('recall-page');
  }

  async openRecentOrder(): Promise<void> {
    await step('打开 Recall 最近订单', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.recentOrderButton.click();
    });
  }

  async readAllOrderItems(): Promise<RecalledOrderItem[]> {
    return step('读取 Recall 订单菜品列表', async () => {
      await expect(this.recallItems.first()).toBeVisible();
      const itemElements = await this.recallItems.all();
      const items: RecalledOrderItem[] = [];
      for (const itemElement of itemElements) {
        items.push({
          name: (await itemElement.getAttribute('data-name')) ?? '',
          price: Number((await itemElement.getAttribute('data-price')) ?? '0'),
        });
      }
      return items;
    });
  }
}
