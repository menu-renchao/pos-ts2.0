import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class EmenuMainPage extends PageObject {
  private readonly emenuMainRoot: Locator;
  private readonly emenuOrderRoot: Locator;
  private readonly confirmLicenseButton: Locator;
  private readonly continueButton: Locator;
  private readonly enterTableButton: Locator;
  private readonly guestNumberButton: Locator;
  private readonly selectLicenseButton: Locator;
  private readonly startButton: Locator;
  private readonly tableButton: Locator;
  private readonly unusedLicenseButton: Locator;
  private readonly posHomeButton: Locator;
  private readonly emenuOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emenuMainRoot = page.getByTestId('emenu-main-page');
    this.emenuOrderRoot = page.getByTestId('emenu-order-page');
    this.confirmLicenseButton = page.getByTestId('emenu-confirm-license');
    this.continueButton = page.getByTestId('emenu-continue');
    this.enterTableButton = page.getByTestId('emenu-enter-table');
    this.guestNumberButton = page.getByTestId('emenu-guest-number');
    this.selectLicenseButton = page.getByTestId('emenu-select-license');
    this.startButton = page.getByTestId('emenu-start');
    this.tableButton = page.getByTestId('emenu-table');
    this.unusedLicenseButton = page.getByTestId('emenu-unused-license');
    this.posHomeButton = page.getByTestId('emenu-switch-pos');
    this.emenuOrderButton = page.getByTestId('pos-switch-emenu-order');
  }

  async openAndStartOrder(emenuUrl: string): Promise<void> {
    await step('打开 Emenu 并进入点单页', async () => {
      await this.page.goto(emenuUrl);
      await expect(this.emenuMainRoot).toBeVisible();
      await this.selectLicenseButton.click();
      await this.unusedLicenseButton.click();
      await this.confirmLicenseButton.click();
      await this.startButton.click();
      await this.tableButton.click();
      await this.enterTableButton.click();
      await this.startButton.click();
      await this.guestNumberButton.click();
      await this.continueButton.click();
      await expect(this.emenuOrderRoot).toBeVisible();
    });
  }

  async switchToPosHome(): Promise<void> {
    await step('从 Emenu 切回 POS 首页', async () => {
      await this.posHomeButton.click();
      await expect(this.page.getByTestId('pos-home')).toBeVisible();
    });
  }

  async switchToEmenuOrder(): Promise<void> {
    await step('从 POS 切回 Emenu 点单页', async () => {
      await this.emenuOrderButton.click();
      await expect(this.emenuOrderRoot).toBeVisible();
    });
  }
}
