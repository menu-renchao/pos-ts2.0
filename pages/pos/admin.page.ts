import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class AdminPage extends PageObject {
  private readonly adminRoot: Locator;
  private readonly defaultKeyboardSelect: Locator;
  private readonly languageSelect: Locator;
  private readonly saveLanguageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminRoot = page.getByTestId('admin-page');
    this.defaultKeyboardSelect = page.getByTestId('admin-default-keyboard');
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

  async setDefaultKeyboard(keyboard: string): Promise<void> {
    await step(`设置默认键盘为 ${keyboard}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.defaultKeyboardSelect.selectOption(keyboard);
    });
  }
}
