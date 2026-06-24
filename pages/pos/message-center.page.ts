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
    this.clearAllButton = page.getByTestId('message-clear-all');
    this.currentMessageBody = page.getByTestId('message-current-body');
    this.messageCenterRoot = page.getByTestId('message-center');
    this.messageSearchInput = page.getByTestId('message-search');
    this.messageTypeSelect = page.getByTestId('message-type');
    this.openMessageButton = page.getByTestId('message-open');
    this.seedOrderNumberInput = page.getByTestId('message-seed-order-number');
    this.seedSdiOrderButton = page.getByTestId('message-seed-sdi-order');
    this.seedTableNameInput = page.getByTestId('message-seed-table-name');
  }

  async switchMessageType(type: string): Promise<void> {
    await step(`切换消息中心类型为 ${type}`, async () => {
      await expect(this.messageCenterRoot).toBeVisible();
      await this.messageTypeSelect.selectOption(type);
    });
  }

  async clearAll(): Promise<void> {
    await step('清空消息中心所有消息', async () => {
      await this.clearAllButton.click();
    });
  }

  async seedSelfDineInOrderMessage(tableName: string, orderNumber: string): Promise<void> {
    await step('生成离线 SDI 新订单消息', async () => {
      await this.seedTableNameInput.fill(tableName);
      await this.seedOrderNumberInput.fill(orderNumber);
      await this.seedSdiOrderButton.click();
    });
  }

  async openMessageByTitleAndContent(title: string): Promise<void> {
    await step(`打开消息 ${title}`, async () => {
      await this.messageSearchInput.fill(title);
      await this.openMessageButton.click();
      await expect(this.currentMessageBody).toBeVisible();
    });
  }

  async readCurrentOpenMessageBodyContent(): Promise<string> {
    return step('读取当前打开消息内容', async () => (await this.currentMessageBody.textContent()) ?? '');
  }
}
