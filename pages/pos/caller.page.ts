import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type CallerArea = 'ready' | 'preparing';

export class CallerPage extends PageObject {
  private readonly callerRoot: Locator;
  private readonly preparingInfoItems: Locator;
  private readonly readyInfoItems: Locator;

  constructor(page: Page) {
    super(page);
    this.callerRoot = page.getByTestId('caller-page');
    this.preparingInfoItems = page.getByTestId('caller-preparing-info');
    this.readyInfoItems = page.getByTestId('caller-ready-info');
  }

  async waitLoaded(): Promise<void> {
    await step('等待 Caller 页面加载完成', async () => {
      await expect(this.callerRoot).toBeVisible();
    });
  }

  async readInfoList(area: CallerArea): Promise<string[]> {
    return step(`读取 Caller ${area} 区域订单信息`, async () => {
      await this.waitLoaded();
      const items = area === 'preparing' ? this.preparingInfoItems : this.readyInfoItems;
      return (await items.allTextContents()).map((info) => info.trim()).filter(Boolean);
    });
  }
}
