import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type SupportInfo = {
  version: string;
  patchVersion?: string;
};

export class SupportPage extends PageObject {
  private readonly patchVersion: Locator;
  private readonly supportRoot: Locator;
  private readonly version: Locator;

  constructor(page: Page) {
    super(page);
    this.patchVersion = page.getByTestId('support-patch-version').or(page.locator('xpath=//span[text()="Patch No."]/../p'));
    this.supportRoot = page.getByTestId('support-page').or(page.locator('xpath=//span[text()="Version:"]'));
    this.version = page.getByTestId('support-version').or(page.locator('xpath=//span[text()="Version:"]/../p'));
  }

  async readSupportInfo(): Promise<SupportInfo> {
    return step('读取首页支持信息中的版本和补丁版本', async () => {
      await expect(this.supportRoot).toBeVisible();
      const patchVersion = await this.patchVersion
        .textContent({ timeout: 1_000 })
        .then((text) => text?.trim())
        .catch(() => undefined);
      const supportInfo: SupportInfo = {
        version: ((await this.version.textContent()) ?? '').trim(),
      };
      if (patchVersion !== undefined) {
        supportInfo.patchVersion = patchVersion;
      }
      return supportInfo;
    });
  }
}
