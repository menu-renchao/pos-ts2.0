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
  private readonly combinedTipButton: Locator;
  private readonly customerName: Locator;
  private readonly editButton: Locator;
  private readonly guestNameInput: Locator;
  private readonly orderStatus: Locator;
  private readonly orderTip: Locator;
  private readonly previousOrderButton: Locator;
  private readonly saveEditButton: Locator;
  private readonly subOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.recentOrderButton = page.getByTestId('recall-recent-order');
    this.recalledOptions = page.getByTestId('recall-item-option');
    this.recallItems = page.getByTestId('recall-order-item');
    this.recallRoot = page.getByTestId('recall-page');
    this.combinedTipButton = page.getByTestId('recall-combine-split');
    this.customerName = page.getByTestId('recall-customer-name');
    this.editButton = page.getByTestId('recall-edit');
    this.guestNameInput = page.getByTestId('recall-guest-name');
    this.orderStatus = page.getByTestId('recall-order-status');
    this.orderTip = page.getByTestId('recall-order-tip');
    this.previousOrderButton = page.getByTestId('recall-previous-order');
    this.saveEditButton = page.getByTestId('recall-save-edit');
    this.subOrderButton = page.getByTestId('recall-sub-order');
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

  async openFirstSubOrder(): Promise<void> {
    await step('打开 Recall 第一个子单', async () => {
      await this.subOrderButton.click();
    });
  }

  async readOrderTip(): Promise<number> {
    return step('读取 Recall 订单小费', async () => Number((await this.orderTip.textContent()) ?? '0'));
  }

  async combineSplitOrders(): Promise<void> {
    await step('从 Recall 合并拆分订单', async () => {
      await this.combinedTipButton.click();
    });
  }

  async readOrderStatus(): Promise<string> {
    return step('读取 Recall 订单状态', async () => (await this.orderStatus.textContent()) ?? '');
  }

  async openPreviousOrder(): Promise<void> {
    await step('打开 Recall 前一笔订单', async () => {
      await this.previousOrderButton.click();
    });
  }

  async clickEdit(): Promise<void> {
    await step('点击 Recall 编辑订单', async () => {
      await this.editButton.click();
    });
  }

  async editGuestName(name: string): Promise<void> {
    await step(`编辑订单客名为 ${name}`, async () => {
      await this.guestNameInput.fill(name);
    });
  }

  async saveEdit(): Promise<void> {
    await step('保存 Recall 编辑订单', async () => {
      await this.saveEditButton.click();
    });
  }

  async readCustomerName(): Promise<string | null> {
    return step('读取 Recall 客名', async () => {
      const text = ((await this.customerName.textContent()) ?? '').trim();
      return text || null;
    });
  }
}
