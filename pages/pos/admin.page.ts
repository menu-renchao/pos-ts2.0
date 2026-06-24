import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import type { CombineSameItemMode, MenuMode, RoundingStrategyOption } from '../../test-data/pos/admin-settings.js';
import { PageObject } from '../shared/page-object.js';

export class AdminPage extends PageObject {
  private readonly adminRoot: Locator;
  private readonly autoRedirectAfterReduceSelect: Locator;
  private readonly combineSameItemSelect: Locator;
  private readonly clickSettleAutoSendSelect: Locator;
  private readonly countCanBeDecimalSelect: Locator;
  private readonly defaultKeyboardSelect: Locator;
  private readonly kdsCategoryRequiredSelect: Locator;
  private readonly kdsCategoryDiscountAllowanceSelect: Locator;
  private readonly itemChineseNameInput: Locator;
  private readonly itemChineseNameSaveButton: Locator;
  private readonly itemGroupInput: Locator;
  private readonly itemCategoryInput: Locator;
  private readonly itemNameInput: Locator;
  private readonly kdsItemNameInput: Locator;
  private readonly kdsItemPosNameInput: Locator;
  private readonly kdsItemPosNameSaveButton: Locator;
  private readonly languageSelect: Locator;
  private readonly menuSourceProductLineInput: Locator;
  private readonly menuTargetProductLineInput: Locator;
  private readonly menuGroupNameInput: Locator;
  private readonly menuClearGroupButton: Locator;
  private readonly menuCopyGroupButton: Locator;
  private readonly menuEnterGroupButton: Locator;
  private readonly menuGroupCategoryCount: Locator;
  private readonly menuModeSelect: Locator;
  private readonly roundingStrategySelect: Locator;
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
    this.clickSettleAutoSendSelect = page.getByTestId('admin-click-settle-auto-send');
    this.countCanBeDecimalSelect = page.getByTestId('admin-count-can-be-decimal');
    this.defaultKeyboardSelect = page.getByTestId('admin-default-keyboard');
    this.kdsCategoryRequiredSelect = page.getByTestId('admin-kds-category-required');
    this.kdsCategoryDiscountAllowanceSelect = page.getByTestId('admin-kds-category-discount-allowance');
    this.itemGroupInput = page.getByTestId('admin-item-group');
    this.itemCategoryInput = page.getByTestId('admin-item-category');
    this.itemNameInput = page.getByTestId('admin-item-name');
    this.itemChineseNameInput = page.getByTestId('admin-item-chinese-name');
    this.itemChineseNameSaveButton = page.getByTestId('admin-item-chinese-name-save');
    this.kdsItemNameInput = page.getByTestId('admin-kds-item-name');
    this.kdsItemPosNameInput = page.getByTestId('admin-kds-pos-name');
    this.kdsItemPosNameSaveButton = page.getByTestId('admin-kds-pos-name-save');
    this.languageSelect = page.getByTestId('user-default-language');
    this.menuSourceProductLineInput = page.getByTestId('admin-menu-source-product-line');
    this.menuTargetProductLineInput = page.getByTestId('admin-menu-target-product-line');
    this.menuGroupNameInput = page.getByTestId('admin-menu-group-name');
    this.menuClearGroupButton = page.getByTestId('admin-menu-clear-group');
    this.menuCopyGroupButton = page.getByTestId('admin-menu-copy-group');
    this.menuEnterGroupButton = page.getByTestId('admin-menu-enter-group');
    this.menuGroupCategoryCount = page.getByTestId('admin-menu-group-category-count');
    this.menuModeSelect = page.getByTestId('admin-menu-mode');
    this.roundingStrategySelect = page.getByTestId('admin-rounding-strategy');
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

  async setClickSettleAutoSend(enabled: boolean): Promise<void> {
    await step(`设置点击付款自动送厨为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.clickSettleAutoSendSelect.selectOption(enabled ? 'true' : 'false');
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

  async setRoundingStrategy(roundingStrategy: RoundingStrategyOption): Promise<void> {
    await step(`设置订单结算 Rounding Strategy 为 ${roundingStrategy}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.roundingStrategySelect.selectOption(roundingStrategy);
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

  async setKdsCategoryDiscountAllowance(enabled: boolean): Promise<void> {
    await step(`设置 KDS Category 限制折扣为 ${enabled ? '勾选' : '未勾选'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.kdsCategoryDiscountAllowanceSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setKdsItemPosName(itemName: string, posName: string): Promise<void> {
    await step(`设置 KDS 菜品 ${itemName} 的 POS Name`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.kdsItemNameInput.fill(itemName);
      await this.kdsItemPosNameInput.fill(posName);
      await this.kdsItemPosNameSaveButton.click();
    });
  }

  async setItemChineseName(group: string, category: string, itemName: string, chineseName: string): Promise<void> {
    await step(`设置菜品 ${itemName} 的中文名称`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.itemGroupInput.fill(group);
      await this.itemCategoryInput.fill(category);
      await this.itemNameInput.fill(itemName);
      await this.itemChineseNameInput.fill(chineseName);
      await this.itemChineseNameSaveButton.click();
    });
  }

  async clearProductItem(productLine: string, groupName: string): Promise<void> {
    await step(`清空 ${productLine} 的 ${groupName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuClearGroupButton.click();
    });
  }

  async copyGroupToProductLine(sourceProductLine: string, groupName: string, targetProductLine: string): Promise<void> {
    await step(`复制 ${sourceProductLine} 的 ${groupName} 到 ${targetProductLine}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.menuSourceProductLineInput.fill(sourceProductLine);
      await this.menuTargetProductLineInput.fill(targetProductLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuCopyGroupButton.click();
    });
  }

  async readGroupCategoryCount(productLine: string, groupName: string): Promise<number> {
    return step(`读取 ${productLine} 的 ${groupName} 分类数量`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuEnterGroupButton.click();
      return Number((await this.menuGroupCategoryCount.textContent()) ?? '0');
    });
  }
}
