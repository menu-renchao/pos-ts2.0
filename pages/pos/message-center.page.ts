import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class MessageCenterPage extends PageObject {
  private readonly clearAllButton: Locator;
  private readonly currentMessageBody: Locator;
  private readonly messageCenterRoot: Locator;
  private readonly messageSearchInput: Locator;
  private readonly messageTypeSelect: Locator;
  private readonly openMessageButton: Locator;
  private readonly seedOrderNumberInput: Locator;
  private readonly seedSdiOrderButton: Locator;
  private readonly seedTableNameInput: Locator;

  constructor(page: Page) {
    super(page);
    this.clearAllButton = page.getByTestId('message-clear-all').or(page.locator('#msgRemoveAll'));
    this.currentMessageBody = page.getByTestId('message-current-body').or(page.locator('.msgContent'));
    this.messageCenterRoot = page
      .getByTestId('message-center')
      .or(page.locator('#msgCenter, #messageCenter, #msgLatestBt, .topicTitle, #msgRemoveAll').first());
    this.messageSearchInput = page.getByTestId('message-search');
    this.messageTypeSelect = page.getByTestId('message-type').or(page.locator('.topicTitle'));
    this.openMessageButton = page.getByTestId('message-open');
    this.seedOrderNumberInput = page.getByTestId('message-seed-order-number');
    this.seedSdiOrderButton = page.getByTestId('message-seed-sdi-order');
    this.seedTableNameInput = page.getByTestId('message-seed-table-name');
  }

  async switchMessageType(type: string): Promise<void> {
    await step(`切换消息中心类型为 ${type}`, async () => {
      await expect(this.messageCenterRoot.first()).toBeVisible();
      const offlineSelect = this.page.getByTestId('message-type');
      if (await offlineSelect.isVisible().catch(() => false)) {
        await offlineSelect.selectOption(type);
        return;
      }
      const labelPattern = messageTypeLabels(type).map(escapeRegExp).join('|');
      await this.page.locator('.topicTitle').filter({ hasText: new RegExp(`^\\s*(${labelPattern})\\s*$`) }).click();
    });
  }

  async clearAll(): Promise<void> {
    await step('清空消息中心所有消息', async () => {
      await this.clearAllButton.click();
    });
  }

  async seedSelfDineInOrderMessage(tableName: string, orderNumber: string): Promise<void> {
    await step('生成离线 SDI 新订单消息', async () => {
      if (!(await this.seedSdiOrderButton.isVisible().catch(() => false))) {
        throw new Error(
          `Live SDI order creation is not configured. Offline seed (${tableName}/${orderNumber}) is intentionally unavailable in live mode.`,
        );
      }
      await this.seedTableNameInput.fill(tableName);
      await this.seedOrderNumberInput.fill(orderNumber);
      await this.seedSdiOrderButton.click();
    });
  }

  async openMessageByTitleAndContent(title: string): Promise<void> {
    await step(`打开消息 ${title}`, async () => {
      if (await this.messageSearchInput.isVisible().catch(() => false)) {
        await this.messageSearchInput.fill(title);
        await this.openMessageButton.click();
      } else {
        await this.page.locator('.msg_title').filter({ hasText: new RegExp(`^\\s*${escapeRegExp(title)}\\s*$`) }).click();
      }
      await expect(this.currentMessageBody.first()).toBeVisible();
    });
  }

  async readCurrentOpenMessageBodyContent(): Promise<string> {
    return step('读取当前打开消息内容', async () => (await this.currentMessageBody.first().textContent()) ?? '');
  }
}

export function messageTypeLabels(type: string): string[] {
  if (type === 'Self-dine-in') {
    return [type, '自助点餐'];
  }
  return [type];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
