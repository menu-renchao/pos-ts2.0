import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import type { CombineSameItemMode, MenuMode } from '../../test-data/pos/admin-settings.js';
import { PageObject } from '../shared/page-object.js';

export class AdminPage extends PageObject {
  private readonly adminRoot: Locator;
  private readonly autoRedirectAfterReduceSelect: Locator;
  private readonly combineSameItemSelect: Locator;
  private readonly countCanBeDecimalSelect: Locator;
  private readonly defaultKeyboardSelect: Locator;
  private readonly kdsCategoryRequiredSelect: Locator;
  private readonly languageSelect: Locator;
  private readonly menuModeSelect: Locator;
  private readonly saveSettingsButton: Locator;
  private readonly saveLanguageButton: Locator;
  private readonly searchMenuSelect: Locator;
  private readonly separateSameItemSelect: Locator;
  private readonly staffNoteSelect: Locator;
  private readonly staffVoidPrintedItemSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.adminRoot = page.getByTestId('admin-page');
    this.autoRedirectAfterReduceSelect = page.getByTestId('admin-auto-redirect-after-reduce');
    this.combineSameItemSelect = page.getByTestId('admin-combine-same-item');
    this.countCanBeDecimalSelect = page.getByTestId('admin-count-can-be-decimal');
    this.defaultKeyboardSelect = page.getByTestId('admin-default-keyboard');
    this.kdsCategoryRequiredSelect = page.getByTestId('admin-kds-category-required');
    this.languageSelect = page.getByTestId('user-default-language');
    this.menuModeSelect = page.getByTestId('admin-menu-mode');
    this.saveSettingsButton = page.getByTestId('admin-save-settings');
    this.saveLanguageButton = page.getByTestId('save-user-default-language');
    this.searchMenuSelect = page.getByTestId('admin-search-menu');
    this.separateSameItemSelect = page.getByTestId('admin-separate-same-item');
    this.staffNoteSelect = page.getByTestId('admin-staff-note');
    this.staffVoidPrintedItemSelect = page.getByTestId('admin-staff-void-printed-item');
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

  async setPosMenuMode(menuMode: MenuMode): Promise<void> {
    await step(`设置 POS 菜单模式为 ${menuMode}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.menuModeSelect.selectOption(menuMode);
      await this.saveSettingsButton.click();
    });
  }

  async setSearchMenu(enabled: boolean): Promise<void> {
    await step(`设置 Search Menu 为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.searchMenuSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setCombineSameItem(mode: CombineSameItemMode, separateSameItem: boolean): Promise<void> {
    await step(`设置相同菜合并模式 ${mode}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.combineSameItemSelect.selectOption(mode);
      await this.separateSameItemSelect.selectOption(separateSameItem ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setStaffVoidPrintedItemPermission(enabled: boolean): Promise<void> {
    await step(`设置 Staff Void Printed Item 权限为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.staffVoidPrintedItemSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setStaffNotePermission(enabled: boolean): Promise<void> {
    await step(`设置 Staff NOTE 权限为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.staffNoteSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setAutomaticallyRedirectAfterReduceItems(enabled: boolean): Promise<void> {
    await step(`设置减菜后自动跳转为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.autoRedirectAfterReduceSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setCountCanBeDecimal(enabled: boolean): Promise<void> {
    await step(`设置菜品数量支持小数为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.countCanBeDecimalSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setKdsCategoryRequired(enabled: boolean): Promise<void> {
    await step(`设置 KDS Category Required 为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.kdsCategoryRequiredSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }
}
