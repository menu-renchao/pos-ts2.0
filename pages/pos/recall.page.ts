import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type RecalledOrderItem = {
  name: string;
  price: number;
  state?: string;
};

export type RecalledItemOption = {
  name: string;
  price: number;
};

export class RecallPage extends PageObject {
  private readonly recentOrderButton: Locator;
  private readonly recalledOptions: Locator;
  private readonly recallItems: Locator;
  private readonly recallRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.recentOrderButton = page.getByTestId('recall-recent-order');
    this.recalledOptions = page.getByTestId('recall-item-option');
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
        const state = await itemElement.getAttribute('data-state');
        const item: RecalledOrderItem = {
          name: (await itemElement.getAttribute('data-name')) ?? '',
          price: Number((await itemElement.getAttribute('data-price')) ?? '0'),
        };
        if (state) {
          item.state = state;
        }
        items.push(item);
      }
      return items;
    });
  }

  async readFirstOrderItemState(): Promise<string> {
    return step('读取 Recall 第一个菜品状态', async () => {
      const item = this.recallItems.first();
      await expect(item).toBeVisible();
      return (await item.getAttribute('data-state')) ?? '';
    });
  }

  async readFirstItemOption(): Promise<RecalledItemOption> {
    return step('读取 Recall 第一个菜品备注', async () => {
      const option = this.recalledOptions.first();
      await expect(option).toBeVisible();
      return {
        name: (await option.getAttribute('data-name')) ?? '',
        price: Number((await option.getAttribute('data-price')) ?? '0'),
      };
    });
  }
}
