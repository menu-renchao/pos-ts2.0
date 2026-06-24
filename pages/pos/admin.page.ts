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
  private readonly languageSaleItemButton: Locator;
  private readonly languageSearchInput: Locator;
  private readonly languageSearchSubmitButton: Locator;
  private readonly languagePosNameInput: Locator;
  private readonly languageKitchenNameInput: Locator;
  private readonly menuSourceProductLineInput: Locator;
  private readonly menuTargetProductLineInput: Locator;
  private readonly menuGroupNameInput: Locator;
  private readonly menuClearGroupButton: Locator;
  private readonly menuCopyGroupButton: Locator;
  private readonly menuEnterGroupButton: Locator;
  private readonly menuGroupCategoryCount: Locator;
  private readonly menuReadItemCountButton: Locator;
  private readonly menuItemCountValue: Locator;
  private readonly globalOptionGroupInput: Locator;
  private readonly globalOptionCategoryInput: Locator;
  private readonly globalOptionNameInput: Locator;
  private readonly globalOptionPriceInput: Locator;
  private readonly globalOptionCreateButton: Locator;
  private readonly globalOptionSelectedNameInput: Locator;
  private readonly globalOptionSelectButton: Locator;
  private readonly globalOptionPrinterInput: Locator;
  private readonly globalOptionAddPrinterButton: Locator;
  private readonly globalOptionPrinterValue: Locator;
  private readonly globalOptionDeleteButton: Locator;
  private readonly comboItemGroupInput: Locator;
  private readonly comboItemCategoryInput: Locator;
  private readonly comboItemNameInput: Locator;
  private readonly comboDisplayModeSelect: Locator;
  private readonly comboDisplayModeSaveButton: Locator;
  private readonly comboDetailOpenButton: Locator;
  private readonly comboDetailQuickComboValue: Locator;
  private readonly propertyItemGroupInput: Locator;
  private readonly propertyItemCategoryInput: Locator;
  private readonly propertyItemNamesInput: Locator;
  private readonly propertySelectedLabelsInput: Locator;
  private readonly propertyBatchReplaceButton: Locator;
  private readonly propertyDetailItemInput: Locator;
  private readonly propertyDetailOpenButton: Locator;
  private readonly propertyItemLabelsValue: Locator;
  private readonly propertyAllLabelsValue: Locator;
  private readonly taxFreeItemGroupInput: Locator;
  private readonly taxFreeItemCategoryInput: Locator;
  private readonly taxFreeItemNameInput: Locator;
  private readonly taxFreeEnabledSelect: Locator;
  private readonly taxFreeSaveButton: Locator;
  private readonly taxFreeConfirmationMessage: Locator;
  private readonly unitPriceItemGroupInput: Locator;
  private readonly unitPriceItemCategoryInput: Locator;
  private readonly unitPriceItemNameInput: Locator;
  private readonly unitPriceItemPriceInput: Locator;
  private readonly unitPriceItemSaveButton: Locator;
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
    this.languageSaleItemButton = page.getByTestId('admin-language-sale-item');
    this.languageSearchInput = page.getByTestId('admin-language-search');
    this.languageSearchSubmitButton = page.getByTestId('admin-language-search-submit');
    this.languagePosNameInput = page.getByTestId('admin-language-pos-name');
    this.languageKitchenNameInput = page.getByTestId('admin-language-kitchen-name');
    this.menuSourceProductLineInput = page.getByTestId('admin-menu-source-product-line');
    this.menuTargetProductLineInput = page.getByTestId('admin-menu-target-product-line');
    this.menuGroupNameInput = page.getByTestId('admin-menu-group-name');
    this.menuClearGroupButton = page.getByTestId('admin-menu-clear-group');
    this.menuCopyGroupButton = page.getByTestId('admin-menu-copy-group');
    this.menuEnterGroupButton = page.getByTestId('admin-menu-enter-group');
    this.menuGroupCategoryCount = page.getByTestId('admin-menu-group-category-count');
    this.menuReadItemCountButton = page.getByTestId('admin-menu-read-item-count');
    this.menuItemCountValue = page.getByTestId('admin-menu-item-count');
    this.globalOptionGroupInput = page.getByTestId('admin-global-option-group');
    this.globalOptionCategoryInput = page.getByTestId('admin-global-option-category');
    this.globalOptionNameInput = page.getByTestId('admin-global-option-name');
    this.globalOptionPriceInput = page.getByTestId('admin-global-option-price');
    this.globalOptionCreateButton = page.getByTestId('admin-global-option-create');
    this.globalOptionSelectedNameInput = page.getByTestId('admin-global-option-selected-name');
    this.globalOptionSelectButton = page.getByTestId('admin-global-option-select');
    this.globalOptionPrinterInput = page.getByTestId('admin-global-option-printer');
    this.globalOptionAddPrinterButton = page.getByTestId('admin-global-option-add-printer');
    this.globalOptionPrinterValue = page.getByTestId('admin-global-option-printer-value');
    this.globalOptionDeleteButton = page.getByTestId('admin-global-option-delete');
    this.comboItemGroupInput = page.getByTestId('admin-combo-item-group');
    this.comboItemCategoryInput = page.getByTestId('admin-combo-item-category');
    this.comboItemNameInput = page.getByTestId('admin-combo-item-name');
    this.comboDisplayModeSelect = page.getByTestId('admin-combo-display-mode');
    this.comboDisplayModeSaveButton = page.getByTestId('admin-combo-display-mode-save');
    this.comboDetailOpenButton = page.getByTestId('admin-combo-detail-open');
    this.comboDetailQuickComboValue = page.getByTestId('admin-combo-detail-quick-combo');
    this.propertyItemGroupInput = page.getByTestId('admin-property-item-group');
    this.propertyItemCategoryInput = page.getByTestId('admin-property-item-category');
    this.propertyItemNamesInput = page.getByTestId('admin-property-item-names');
    this.propertySelectedLabelsInput = page.getByTestId('admin-property-selected-labels');
    this.propertyBatchReplaceButton = page.getByTestId('admin-property-batch-replace');
    this.propertyDetailItemInput = page.getByTestId('admin-property-detail-item');
    this.propertyDetailOpenButton = page.getByTestId('admin-property-detail-open');
    this.propertyItemLabelsValue = page.getByTestId('admin-property-item-labels');
    this.propertyAllLabelsValue = page.getByTestId('admin-property-all-labels');
    this.taxFreeItemGroupInput = page.getByTestId('admin-tax-free-item-group');
    this.taxFreeItemCategoryInput = page.getByTestId('admin-tax-free-item-category');
    this.taxFreeItemNameInput = page.getByTestId('admin-tax-free-item-name');
    this.taxFreeEnabledSelect = page.getByTestId('admin-tax-free-enabled');
    this.taxFreeSaveButton = page.getByTestId('admin-tax-free-save');
    this.taxFreeConfirmationMessage = page.getByTestId('admin-tax-free-confirmation');
    this.unitPriceItemGroupInput = page.getByTestId('admin-unit-price-item-group');
    this.unitPriceItemCategoryInput = page.getByTestId('admin-unit-price-item-category');
    this.unitPriceItemNameInput = page.getByTestId('admin-unit-price-item-name');
    this.unitPriceItemPriceInput = page.getByTestId('admin-unit-price-item-price');
    this.unitPriceItemSaveButton = page.getByTestId('admin-unit-price-item-save');
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

  async readMenuItemCount(productLine: string): Promise<number> {
    return step(`读取 ${productLine} menu 菜品总数`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuReadItemCountButton.click();
      return Number((await this.menuItemCountValue.textContent()) ?? '0');
    });
  }

  async enterGlobalOptionCategory(group: string, category: string): Promise<void> {
    await step(`进入 ${group} / ${category} 的 Global Option 列表`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionGroupInput.fill(group);
      await this.globalOptionCategoryInput.fill(category);
    });
  }

  async createGlobalOption(optionName: string, optionPrice: number): Promise<string> {
    return step(`创建 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionNameInput.fill(optionName);
      await this.globalOptionPriceInput.fill(String(optionPrice));
      await this.globalOptionCreateButton.click();
      return optionName;
    });
  }

  async selectGlobalOption(optionName: string): Promise<void> {
    await step(`勾选 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionSelectedNameInput.fill(optionName);
      await this.globalOptionSelectButton.click();
    });
  }

  async addPrinterToSelectedGlobalOption(printerName: string): Promise<void> {
    await step(`给已选 Global Option 增加打印机 ${printerName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionPrinterInput.fill(printerName);
      await this.globalOptionAddPrinterButton.click();
    });
  }

  async readGlobalOptionPrinters(optionName: string): Promise<string[]> {
    return step(`读取 Global Option ${optionName} 的打印机`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionSelectedNameInput.fill(optionName);
      await this.globalOptionSelectButton.click();
      const printerText = ((await this.globalOptionPrinterValue.textContent()) ?? '').trim();
      return printerText ? printerText.split(',').map((printer) => printer.trim()) : [];
    });
  }

  async deleteGlobalOption(optionName: string): Promise<void> {
    await step(`删除 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.globalOptionNameInput.fill(optionName);
      await this.globalOptionSelectedNameInput.fill(optionName);
      await this.globalOptionDeleteButton.click();
    });
  }

  async batchEditComboDisplayMode(
    group: string,
    category: string,
    itemName: string,
    quickCombo: boolean,
  ): Promise<void> {
    await step(`批量设置套餐 ${itemName} Quick Combo 为 ${quickCombo}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.comboItemGroupInput.fill(group);
      await this.comboItemCategoryInput.fill(category);
      await this.comboItemNameInput.fill(itemName);
      await this.comboDisplayModeSelect.selectOption(quickCombo ? 'quick' : 'regular');
      await this.comboDisplayModeSaveButton.click();
    });
  }

  async readComboDetailQuickCombo(group: string, category: string, itemName: string): Promise<boolean> {
    return step(`读取套餐 ${itemName} 详情 Quick Combo 状态`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.comboItemGroupInput.fill(group);
      await this.comboItemCategoryInput.fill(category);
      await this.comboItemNameInput.fill(itemName);
      await this.comboDetailOpenButton.click();
      return ((await this.comboDetailQuickComboValue.textContent()) ?? '').trim() === 'true';
    });
  }

  async batchReplaceItemPropertyLabels(
    group: string,
    category: string,
    itemNames: readonly string[],
    labels: readonly string[],
  ): Promise<void> {
    await step(`批量替换 ${itemNames.join(', ')} 的属性标签`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.propertyItemGroupInput.fill(group);
      await this.propertyItemCategoryInput.fill(category);
      await this.propertyItemNamesInput.fill(itemNames.join(','));
      await this.propertySelectedLabelsInput.fill(labels.join(','));
      await this.propertyBatchReplaceButton.click();
    });
  }

  async readItemPropertyDetail(
    group: string,
    category: string,
    itemName: string,
  ): Promise<{ itemProperties: string[]; allProperties: string[] }> {
    return step(`读取菜品 ${itemName} 的属性标签详情`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.propertyItemGroupInput.fill(group);
      await this.propertyItemCategoryInput.fill(category);
      await this.propertyDetailItemInput.fill(itemName);
      await this.propertyDetailOpenButton.click();

      const itemProperties = await this.readCommaSeparatedText(this.propertyItemLabelsValue);
      const allProperties = await this.readCommaSeparatedText(this.propertyAllLabelsValue);

      return { itemProperties, allProperties };
    });
  }

  async saveItemTakeOutTaxFree(group: string, category: string, itemName: string, enabled: boolean): Promise<string> {
    return step(`设置菜品 ${itemName} Take Out Tax Free 为 ${enabled}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.taxFreeItemGroupInput.fill(group);
      await this.taxFreeItemCategoryInput.fill(category);
      await this.taxFreeItemNameInput.fill(itemName);
      await this.taxFreeEnabledSelect.selectOption(enabled ? 'true' : 'false');
      await this.taxFreeSaveButton.click();
      return ((await this.taxFreeConfirmationMessage.textContent()) ?? '').trim();
    });
  }

  async configureUnitPriceItem(group: string, category: string, itemName: string, price: number): Promise<void> {
    await step(`配置称重菜 ${itemName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.unitPriceItemGroupInput.fill(group);
      await this.unitPriceItemCategoryInput.fill(category);
      await this.unitPriceItemNameInput.fill(itemName);
      await this.unitPriceItemPriceInput.fill(String(price));
      await this.unitPriceItemSaveButton.click();
    });
  }

  async searchSaleItemLanguageAndReadNames(query: string): Promise<{ posName: string; kitchenName: string }> {
    return step(`搜索多语言 Sale Item ${query} 并读取 POS/Kitchen 名称`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.languageSaleItemButton.click();
      await this.languageSearchInput.fill(query);
      await this.languageSearchSubmitButton.click();
      return {
        posName: await this.languagePosNameInput.inputValue(),
        kitchenName: await this.languageKitchenNameInput.inputValue(),
      };
    });
  }

  private async readCommaSeparatedText(locator: Locator): Promise<string[]> {
    const text = ((await locator.textContent()) ?? '').trim();
    return text
      ? text
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      : [];
  }
}
