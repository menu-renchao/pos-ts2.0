import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class AdminPage extends PageObject {
  private readonly adminRoot: Locator;
  private readonly languageSelect: Locator;
  private readonly saveLanguageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminRoot = page.getByTestId('admin-page');
    this.languageSelect = page.getByTestId('user-default-language');
    this.saveLanguageButton = page.getByTestId('save-user-default-language');
  }

  async setUserDefaultLanguage(language: string): Promise<void> {
    await step(`设置账号默认语言为 ${language}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.languageSelect.selectOption(language);
      await this.saveLanguageButton.click();
    });
  }
}
