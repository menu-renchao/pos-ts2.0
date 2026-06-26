import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import type { CombineSameItemMode, MenuMode, RoundingStrategyOption } from '../../test-data/pos/admin-settings.js';
import type { StaffPermissionName } from '../../clients/pos-api/admin-staff.client.js';
import { PageObject } from '../shared/page-object.js';

export type ManualChargeOrderType = 'delivery' | 'dine-in' | 'pickup' | 'togo';
export type ChargeTriggerMode = 'auto' | 'manual';

export class AdminPage extends PageObject {
  private readonly analysisButton: Locator;
  private readonly analysisPage: Locator;
  private readonly adminRoot: Locator;
  private readonly permissionAlert: Locator;
  private readonly permissionPasswordInput: Locator;
  private readonly permissionSubmitButton: Locator;
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
  private readonly kioskButton: Locator;
  private readonly kioskItemNameInput: Locator;
  private readonly kioskItemSoldOutButton: Locator;
  private readonly kioskItemStatus: Locator;
  private readonly kioskPage: Locator;
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
  private readonly priceItemGroupInput: Locator;
  private readonly priceItemCategoryInput: Locator;
  private readonly priceItemNamesInput: Locator;
  private readonly priceValuesInput: Locator;
  private readonly priceMemberValuesInput: Locator;
  private readonly priceBatchEditButton: Locator;
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
  private readonly staffCreateButton: Locator;
  private readonly staffCodeInput: Locator;
  private readonly staffNameInput: Locator;
  private readonly staffPage: Locator;
  private readonly staffRoleSelect: Locator;
  private readonly staffSaveButton: Locator;
  private readonly staffSectionButton: Locator;
  private readonly staffWageInput: Locator;
  private readonly staffWageTypeSelect: Locator;
  private readonly attendanceSearchButton: Locator;
  private readonly lastAttendanceRow: Locator;
  private readonly attendanceSaveButton: Locator;
  private readonly attendanceWageValue: Locator;
  private readonly attendanceWageTypeValue: Locator;
  private readonly searchMenuSelect: Locator;
  private readonly separateSameItemSelect: Locator;
  private readonly staffNoteSelect: Locator;
  private readonly staffVoidPrintedItemSelect: Locator;
  private readonly chargeOldNameInput: Locator;
  private readonly chargeNewNameInput: Locator;
  private readonly chargeRenameButton: Locator;
  private readonly autoFixedChargeSetupButton: Locator;
  private readonly autoPercentChargeSetupButton: Locator;
  private readonly chargeRateTypeNameInput: Locator;
  private readonly chargeRateTypeSelect: Locator;
  private readonly chargeRateTypeSaveButton: Locator;
  private readonly chargeAmountNameInput: Locator;
  private readonly chargeAmountInput: Locator;
  private readonly chargeAmountSaveButton: Locator;
  private readonly chargeTaxNameInput: Locator;
  private readonly chargeTaxedSelect: Locator;
  private readonly chargeTaxSaveButton: Locator;
  private readonly chargeOrderTypeNameInput: Locator;
  private readonly chargeOrderTypesSelect: Locator;
  private readonly chargeOrderTypesSaveButton: Locator;
  private readonly chargeMinGuestNameInput: Locator;
  private readonly chargeMinGuestInput: Locator;
  private readonly chargeMinGuestSaveButton: Locator;
  private readonly chargeMinMileNameInput: Locator;
  private readonly chargeMinMileInput: Locator;
  private readonly chargeMinMileSaveButton: Locator;
  private readonly chargeMinAmountNameInput: Locator;
  private readonly chargeMinAmountInput: Locator;
  private readonly chargeMinAmountSaveButton: Locator;
  private readonly chargeTriggerNameInput: Locator;
  private readonly chargeTriggerModeSelect: Locator;
  private readonly chargeTriggerModeSaveButton: Locator;
  private readonly chargeDeleteAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminRoot = page.getByTestId('admin-page');
    this.analysisButton = page.getByTestId('admin-analysis');
    this.analysisPage = page.getByTestId('admin-analysis-page');
    this.permissionAlert = page.getByTestId('admin-permission-alert');
    this.permissionPasswordInput = page.getByTestId('admin-permission-password');
    this.permissionSubmitButton = page.getByTestId('admin-permission-submit');
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
    this.kioskButton = page.getByTestId('admin-kiosk');
    this.kioskPage = page.getByTestId('admin-kiosk-page');
    this.kioskItemNameInput = page.getByTestId('admin-kiosk-item-name');
    this.kioskItemSoldOutButton = page.getByTestId('admin-kiosk-item-sold-out');
    this.kioskItemStatus = page.getByTestId('admin-kiosk-item-status');
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
    this.priceItemGroupInput = page.getByTestId('admin-price-item-group');
    this.priceItemCategoryInput = page.getByTestId('admin-price-item-category');
    this.priceItemNamesInput = page.getByTestId('admin-price-item-names');
    this.priceValuesInput = page.getByTestId('admin-price-values');
    this.priceMemberValuesInput = page.getByTestId('admin-price-member-values');
    this.priceBatchEditButton = page.getByTestId('admin-price-batch-edit');
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
    this.staffCreateButton = page.getByTestId('admin-staff-create');
    this.staffCodeInput = page.getByTestId('admin-staff-code');
    this.staffNameInput = page.getByTestId('admin-staff-name');
    this.staffPage = page.getByTestId('admin-staff-page');
    this.staffRoleSelect = page.getByTestId('admin-staff-role');
    this.staffSaveButton = page.getByTestId('admin-staff-save');
    this.staffSectionButton = page.getByTestId('admin-staff');
    this.staffWageInput = page.getByTestId('admin-staff-wage');
    this.staffWageTypeSelect = page.getByTestId('admin-staff-wage-type');
    this.attendanceSearchButton = page.getByTestId('admin-attendance-search');
    this.lastAttendanceRow = page.getByTestId('admin-attendance-last-row');
    this.attendanceSaveButton = page.getByTestId('admin-attendance-save');
    this.attendanceWageValue = page.getByTestId('admin-attendance-wage');
    this.attendanceWageTypeValue = page.getByTestId('admin-attendance-wage-type');
    this.searchMenuSelect = page.getByTestId('admin-search-menu');
    this.separateSameItemSelect = page.getByTestId('admin-separate-same-item');
    this.staffNoteSelect = page.getByTestId('admin-staff-note');
    this.staffVoidPrintedItemSelect = page.getByTestId('admin-staff-void-printed-item');
    this.chargeOldNameInput = page.getByTestId('admin-charge-old-name');
    this.chargeNewNameInput = page.getByTestId('admin-charge-new-name');
    this.chargeRenameButton = page.getByTestId('admin-charge-rename');
    this.autoFixedChargeSetupButton = page.getByTestId('admin-auto-fixed-charge-setup');
    this.autoPercentChargeSetupButton = page.getByTestId('admin-auto-percent-charge-setup');
    this.chargeRateTypeNameInput = page.getByTestId('admin-charge-rate-type-name');
    this.chargeRateTypeSelect = page.getByTestId('admin-charge-rate-type');
    this.chargeRateTypeSaveButton = page.getByTestId('admin-charge-rate-type-save');
    this.chargeAmountNameInput = page.getByTestId('admin-charge-amount-name');
    this.chargeAmountInput = page.getByTestId('admin-charge-amount');
    this.chargeAmountSaveButton = page.getByTestId('admin-charge-amount-save');
    this.chargeTaxNameInput = page.getByTestId('admin-charge-tax-name');
    this.chargeTaxedSelect = page.getByTestId('admin-charge-taxed');
    this.chargeTaxSaveButton = page.getByTestId('admin-charge-tax-save');
    this.chargeOrderTypeNameInput = page.getByTestId('admin-charge-order-type-name');
    this.chargeOrderTypesSelect = page.getByTestId('admin-charge-order-types');
    this.chargeOrderTypesSaveButton = page.getByTestId('admin-charge-order-types-save');
    this.chargeMinGuestNameInput = page.getByTestId('admin-charge-min-guest-name');
    this.chargeMinGuestInput = page.getByTestId('admin-charge-min-guest');
    this.chargeMinGuestSaveButton = page.getByTestId('admin-charge-min-guest-save');
    this.chargeMinMileNameInput = page.getByTestId('admin-charge-min-mile-name');
    this.chargeMinMileInput = page.getByTestId('admin-charge-min-mile');
    this.chargeMinMileSaveButton = page.getByTestId('admin-charge-min-mile-save');
    this.chargeMinAmountNameInput = page.getByTestId('admin-charge-min-amount-name');
    this.chargeMinAmountInput = page.getByTestId('admin-charge-min-amount');
    this.chargeMinAmountSaveButton = page.getByTestId('admin-charge-min-amount-save');
    this.chargeTriggerNameInput = page.getByTestId('admin-charge-trigger-name');
    this.chargeTriggerModeSelect = page.getByTestId('admin-charge-trigger-mode');
    this.chargeTriggerModeSaveButton = page.getByTestId('admin-charge-trigger-save');
    this.chargeDeleteAllButton = page.getByTestId('admin-charge-delete-all');
  }

  async setUserDefaultLanguage(language: string): Promise<void> {
    await step(`设置账号默认语言为 ${language}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.languageSelect.selectOption(language);
      await this.saveLanguageButton.click();
    });
  }

  async clickAnalysisAndReadPermissionAlert(): Promise<string> {
    return step('点击后台 Analysis 并读取权限提示', async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.analysisButton.click();
      await expect(this.permissionAlert).toBeVisible();
      return ((await this.permissionAlert.textContent()) ?? '').trim();
    });
  }

  async submitPermissionPassword(password: string): Promise<void> {
    await step('输入后台权限密码并确认', async () => {
      await this.permissionPasswordInput.fill(password);
      await this.permissionSubmitButton.click();
    });
  }

  async isInAnalysisPage(): Promise<boolean> {
    return step('判断是否进入后台 Analysis 页面', async () => {
      await expect(this.analysisPage).toBeVisible();
      return this.analysisPage.isVisible();
    });
  }

  async enterStaff(): Promise<void> {
    await step('进入后台 Staff 页面', async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.staffSectionButton.click();
      await expect(this.staffPage).toBeVisible();
    });
  }

  async enterKiosk(): Promise<void> {
    await step('进入后台 Kiosk 页面', async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.kioskButton.click();
      await expect(this.kioskPage).toBeVisible();
    });
  }

  async setKioskItemSoldOut(itemName: string): Promise<void> {
    await step(`后台 Kiosk 设置菜品 ${itemName} 售罄`, async () => {
      await expect(this.kioskPage).toBeVisible();
      await this.kioskItemNameInput.fill(itemName);
      await this.kioskItemSoldOutButton.click();
      await expect(this.kioskItemStatus).toHaveText('out-of-stock');
    });
  }

  async clickCreateStaff(): Promise<void> {
    await step('点击创建 Staff', async () => {
      await this.staffCreateButton.click();
      await expect(this.staffNameInput).toBeVisible();
    });
  }

  async inputNewStaffInfo(name: string, code: string, role: string): Promise<void> {
    await step(`输入新员工 ${name} 信息`, async () => {
      await this.staffNameInput.fill(name);
      await this.staffCodeInput.fill(code);
      await this.staffRoleSelect.selectOption(role);
    });
  }

  async clickStaffSave(): Promise<void> {
    await step('保存 Staff', async () => {
      await this.staffSaveButton.click();
    });
  }

  async clickStaffName(staffName: string): Promise<void> {
    await step(`打开员工 ${staffName}`, async () => {
      await this.page.getByTestId('admin-staff-row').filter({ hasText: staffName }).click();
      await expect(this.staffNameInput).toHaveValue(staffName);
    });
  }

  async inputStaffWage(wage: string): Promise<void> {
    await step(`设置员工工资为 ${wage}`, async () => {
      await this.staffWageInput.fill(wage);
    });
  }

  async selectWageType(wageType: string): Promise<void> {
    await step(`设置员工工资类型为 ${wageType}`, async () => {
      await this.staffWageTypeSelect.selectOption({ label: wageType });
    });
  }

  async clickAttendanceSearch(): Promise<void> {
    await step('打开 Staff Attendance 搜索结果', async () => {
      await this.attendanceSearchButton.click();
      await expect(this.lastAttendanceRow).toBeVisible();
    });
  }

  async clickLastAttendance(): Promise<void> {
    await step('打开最后一条 Staff Attendance 记录', async () => {
      await this.lastAttendanceRow.click();
      await expect(this.attendanceWageValue).toBeVisible();
    });
  }

  async readAttendanceWage(): Promise<string> {
    return step('读取 Staff Attendance wage', async () => this.readInputValueOrText(this.attendanceWageValue));
  }

  async readAttendanceWageType(): Promise<string> {
    return step('读取 Staff Attendance wage type', async () => this.readInputValueOrText(this.attendanceWageTypeValue));
  }

  async inputAttendanceWage(wage: string): Promise<void> {
    await step(`修改 Staff Attendance wage 为 ${wage}`, async () => {
      await this.attendanceWageValue.fill(wage);
    });
  }

  async selectAttendanceWageType(wageType: string): Promise<void> {
    await step(`修改 Staff Attendance wage type 为 ${wageType}`, async () => {
      await this.attendanceWageTypeValue.selectOption({ label: wageType });
    });
  }

  async clickAttendanceSave(): Promise<void> {
    await step('保存 Staff Attendance', async () => {
      await this.attendanceSaveButton.click();
    });
  }

  async isAuthorityEnabled(authority: StaffPermissionName): Promise<boolean> {
    return step(`读取员工权限 ${authority} 是否已勾选`, async () => {
      const authorityCheckbox = this.page.getByTestId(`admin-authority-${authority}`);
      await expect(authorityCheckbox).toBeVisible();
      return authorityCheckbox.isChecked();
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

  async renameManualCharge(oldName: string, newName: string): Promise<void> {
    await step(`修改手动加收名称 ${oldName} -> ${newName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(oldName);
      await this.chargeNewNameInput.fill(newName);
      await this.chargeRenameButton.click();
    });
  }

  async setupAutoFixedCharge(chargeName: string, amount: number): Promise<void> {
    await step(`配置自动固定加收 ${chargeName} 为 ${amount}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(amount));
      await this.autoFixedChargeSetupButton.click();
    });
  }

  async setupAutoPercentCharge(chargeName: string, percent: number): Promise<void> {
    await step(`配置自动百分比加收 ${chargeName} 为 ${percent}%`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(percent));
      await this.autoPercentChargeSetupButton.click();
    });
  }

  async renameAutoCharge(oldName: string, newName: string): Promise<void> {
    await step(`修改自动加收名称 ${oldName} -> ${newName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(oldName);
      await this.chargeNewNameInput.fill(newName);
      await this.chargeRenameButton.click();
    });
  }

  async setManualChargeRateType(chargeName: string, rateType: 'amount' | 'percent'): Promise<void> {
    await step(`修改手动加收 ${chargeName} 比例类型为 ${rateType}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeRateTypeNameInput.fill(chargeName);
      await this.chargeRateTypeSelect.selectOption(rateType);
      await this.chargeRateTypeSaveButton.click();
    });
  }

  async setAutoChargeRateType(chargeName: string, rateType: 'amount' | 'percent'): Promise<void> {
    await step(`修改自动加收 ${chargeName} 比例类型为 ${rateType}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeRateTypeNameInput.fill(chargeName);
      await this.chargeRateTypeSelect.selectOption(rateType);
      await this.chargeRateTypeSaveButton.click();
    });
  }

  async setManualChargeAmount(chargeName: string, amount: number): Promise<void> {
    await step(`修改手动加收 ${chargeName} 金额为 ${amount}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeAmountNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(amount));
      await this.chargeAmountSaveButton.click();
    });
  }

  async setAutoChargeAmount(chargeName: string, amount: number): Promise<void> {
    await step(`修改自动加收 ${chargeName} 金额为 ${amount}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeAmountNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(amount));
      await this.chargeAmountSaveButton.click();
    });
  }

  async setManualChargeTaxed(chargeName: string, taxed: boolean): Promise<void> {
    await step(`修改手动加收 ${chargeName} 计税为 ${taxed ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeTaxNameInput.fill(chargeName);
      await this.chargeTaxedSelect.selectOption(taxed ? 'true' : 'false');
      await this.chargeTaxSaveButton.click();
    });
  }

  async setAutoChargeTaxed(chargeName: string, taxed: boolean): Promise<void> {
    await step(`修改自动加收 ${chargeName} 计税为 ${taxed ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeTaxNameInput.fill(chargeName);
      await this.chargeTaxedSelect.selectOption(taxed ? 'true' : 'false');
      await this.chargeTaxSaveButton.click();
    });
  }

  async setManualChargeOrderTypes(
    chargeName: string,
    orderTypes: readonly ManualChargeOrderType[],
  ): Promise<void> {
    await step(`修改手动加收 ${chargeName} 订单类型为 ${orderTypes.join(', ')}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOrderTypeNameInput.fill(chargeName);
      await this.chargeOrderTypesSelect.selectOption([...orderTypes]);
      await this.chargeOrderTypesSaveButton.click();
    });
  }

  async setAutoChargeOrderTypes(
    chargeName: string,
    orderTypes: readonly ManualChargeOrderType[],
  ): Promise<void> {
    await step(`修改自动加收 ${chargeName} 订单类型为 ${orderTypes.join(', ')}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOrderTypeNameInput.fill(chargeName);
      await this.chargeOrderTypesSelect.selectOption([...orderTypes]);
      await this.chargeOrderTypesSaveButton.click();
    });
  }

  async setAutoChargeMinGuest(chargeName: string, minGuest: number): Promise<void> {
    await step(`修改自动加收 ${chargeName} 最小人数为 ${minGuest}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeMinGuestNameInput.fill(chargeName);
      await this.chargeMinGuestInput.fill(String(minGuest));
      await this.chargeMinGuestSaveButton.click();
    });
  }

  async setAutoChargeMinMile(chargeName: string, minMile: number): Promise<void> {
    await step(`修改自动加收 ${chargeName} 最小里程为 ${minMile}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeMinMileNameInput.fill(chargeName);
      await this.chargeMinMileInput.fill(String(minMile));
      await this.chargeMinMileSaveButton.click();
    });
  }

  async setChargeMinAmount(chargeName: string, minAmount: number): Promise<void> {
    await step(`修改加收 ${chargeName} 最小金额为 ${minAmount}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeMinAmountNameInput.fill(chargeName);
      await this.chargeMinAmountInput.fill(String(minAmount));
      await this.chargeMinAmountSaveButton.click();
    });
  }

  async setChargeTriggerMode(chargeName: string, triggerMode: ChargeTriggerMode): Promise<void> {
    await step(`修改加收 ${chargeName} 触发类型为 ${triggerMode}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeTriggerNameInput.fill(chargeName);
      await this.chargeTriggerModeSelect.selectOption(triggerMode);
      await this.chargeTriggerModeSaveButton.click();
    });
  }

  async deleteAllManualCharges(): Promise<void> {
    await step('删除全部手动加收配置', async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill('');
      await this.chargeDeleteAllButton.click();
    });
  }

  async deleteAutoChargeByName(chargeName: string): Promise<void> {
    await step(`删除自动加收 ${chargeName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeDeleteAllButton.click();
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

  async batchEditItemPrices(
    group: string,
    category: string,
    prices: Readonly<Record<string, number>>,
    memberPrices: Readonly<Record<string, number>>,
  ): Promise<void> {
    await step(`批量编辑 ${Object.keys(prices).join(', ')} 的普通价和会员价`, async () => {
      await expect(this.adminRoot).toBeVisible();
      const itemNames = Array.from(new Set([...Object.keys(prices), ...Object.keys(memberPrices)]));
      await this.priceItemGroupInput.fill(group);
      await this.priceItemCategoryInput.fill(category);
      await this.priceItemNamesInput.fill(itemNames.join(','));
      await this.priceValuesInput.fill(JSON.stringify(prices));
      await this.priceMemberValuesInput.fill(JSON.stringify(memberPrices));
      await this.priceBatchEditButton.click();
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

  private async readInputValueOrText(locator: Locator): Promise<string> {
    const tagName = await locator.evaluate((element) => element.tagName.toLowerCase()).catch(() => '');
    if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
      return (await locator.inputValue()).trim();
    }
    return ((await locator.textContent()) ?? '').trim();
  }
}
