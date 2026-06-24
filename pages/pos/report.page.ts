import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { parseCurrency } from '../../utils/money.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class ReportPage extends PageObject {
  private readonly overviewNetSales: Locator;
  private readonly orderTypeSelect: Locator;
  private readonly reportPasswordInput: Locator;
  private readonly reportPasswordSaveButton: Locator;
  private readonly reportRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.overviewNetSales = page.getByTestId('report-overview-net-sales');
    this.orderTypeSelect = page.getByTestId('report-order-type');
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

  async selectOrderType(orderType: string): Promise<void> {
    await step(`报表选择订单类型 ${orderType}`, async () => {
      await expect(this.reportRoot).toBeVisible();
      await this.orderTypeSelect.selectOption(orderType);
    });
  }

  async readOverviewNetSales(): Promise<number> {
    return step('读取 Report Overview Net Sales', async () => {
      await expect(this.overviewNetSales).toBeVisible();
      return parseCurrency((await this.overviewNetSales.textContent()) ?? '0');
    });
  }
}
