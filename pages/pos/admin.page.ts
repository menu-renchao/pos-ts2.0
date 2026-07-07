import type { Frame, FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import {
  combineSameItemModes,
  roundingStrategyOptions,
  type CombineSameItemMode,
  type MenuMode,
  type RoundingStrategyOption,
} from '../../test-data/pos/admin-settings.js';
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
  private readonly combineRecalculateChargeSelect: Locator;
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
  private readonly liveAdminBackButton: Locator;
  private readonly liveConfirmCloseButton: Locator;
  private readonly liveDefaultKeyboardSelect: Locator;
  private readonly liveGlobalSaveButton: Locator;
  private readonly liveInnerFrame: FrameLocator;
  private readonly liveMenuModeSelect: Locator;
  private readonly liveOrderSettingsTab: Locator;
  private readonly liveOtherSettingsTab: Locator;
  private readonly liveRoundingStrategySelect: Locator;
  private readonly liveSearchMenuToggle: Locator;
  private readonly liveCombineSameItemSelect: Locator;
  private readonly liveSeparateSameItemToggle: Locator;
  private readonly liveAutoRedirectAfterReduceToggle: Locator;
  private readonly liveClickSettleAutoSendToggle: Locator;
  private readonly liveCountCanBeDecimalToggle: Locator;
  private readonly liveSettingsCloseButton: Locator;
  private readonly liveSettingsButton: Locator;
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
  private readonly manualFixedChargeSetupButton: Locator;
  private readonly manualPercentChargeAsTipSetupButton: Locator;
  private readonly autoFixedChargeSetupButton: Locator;
  private readonly autoFixedChargeAsTipSetupButton: Locator;
  private readonly autoPercentChargeSetupButton: Locator;
  private readonly autoPercentChargeAsTipSetupButton: Locator;
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
    this.adminRoot = page.getByTestId('admin-page').or(page.locator('#admin.ui-page-active, #Admin.ui-page-active')).first();
    this.analysisButton = page.getByTestId('admin-analysis').or(page.locator('#admstAnalysis'));
    this.analysisPage = page.getByTestId('admin-analysis-page').or(page.locator('#divReport'));
    this.permissionAlert = page.getByTestId('admin-permission-alert').or(page.locator('#myalerttxt'));
    this.permissionPasswordInput = page.getByTestId('admin-permission-password').or(page.locator('#pwd-input'));
    this.permissionSubmitButton = page.getByTestId('admin-permission-submit').or(page.locator('#pwd-input-submit'));
    this.autoRedirectAfterReduceSelect = page.getByTestId('admin-auto-redirect-after-reduce');
    this.combineRecalculateChargeSelect = page.getByTestId('admin-combine-recalculate-charge');
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
    this.liveAdminBackButton = page.locator('#adExitbt');
    this.liveConfirmCloseButton = page.locator('#innerpgclsyes');
    this.liveInnerFrame = page.locator('#innerpage').last().contentFrame();
    this.liveOrderSettingsTab = this.liveInnerFrame.locator('#category_Order');
    this.liveDefaultKeyboardSelect = this.liveInnerFrame.locator(
      'xpath=//h3[contains(text(),"Default keyboard type")]/..//select',
    );
    this.liveGlobalSaveButton = this.liveInnerFrame
      .locator(
        'xpath=//button[(normalize-space()="Save" or normalize-space()="保存") and not(ancestor::*[contains(@style,"display: none") or contains(@style,"display:none")])]',
      )
      .last();
    this.liveMenuModeSelect = this.liveInnerFrame.locator('xpath=//h3[contains(text(),"Menu Mode")]/..//select');
    this.liveRoundingStrategySelect = this.liveInnerFrame.locator(
      'xpath=//h3[contains(text(),"Order total price rounding down option")]/..//select',
    );
    this.liveSettingsCloseButton = page.locator('#pageclsbt');
    this.liveSettingsButton = page.locator('#admstSettings');
    this.liveOtherSettingsTab = this.liveInnerFrame.locator('#category_Other');
    this.liveSearchMenuToggle = this.liveInnerFrame.locator(
      'xpath=//h3[contains(normalize-space(.),"Search Menu") or contains(normalize-space(.),"搜索菜单")]/../div/label',
    );
    this.liveCombineSameItemSelect = this.liveInnerFrame.locator('xpath=//h3[contains(text(),"Combine the same dishes")]/..//select');
    this.liveSeparateSameItemToggle = this.liveInnerFrame.locator('xpath=//h3[contains(text(),"Seperate the same dishes")]/../div/input');
    this.liveAutoRedirectAfterReduceToggle = this.liveInnerFrame.locator(
      'xpath=//h3[contains(normalize-space(.),"Automatically redirect after reduce items") or contains(normalize-space(.),"减菜后自动重定向")]/../div/input',
    );
    this.liveClickSettleAutoSendToggle = this.liveInnerFrame.locator(
      'xpath=//h3[contains(text(),\'Send to kitchen when click "Settle"\')]/../div/input',
    );
    this.liveCountCanBeDecimalToggle = this.liveInnerFrame.locator(
      'xpath=//h3[contains(normalize-space(.),"Order Count Can be Decimal") or contains(normalize-space(.),"订单数量支持小数")]/../div/input',
    );
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
    this.manualFixedChargeSetupButton = page.getByTestId('admin-manual-fixed-charge-setup');
    this.manualPercentChargeAsTipSetupButton = page.getByTestId('admin-manual-percent-charge-as-tip-setup');
    this.autoFixedChargeSetupButton = page.getByTestId('admin-auto-fixed-charge-setup');
    this.autoFixedChargeAsTipSetupButton = page.getByTestId('admin-auto-fixed-charge-as-tip-setup');
    this.autoPercentChargeSetupButton = page.getByTestId('admin-auto-percent-charge-setup');
    this.autoPercentChargeAsTipSetupButton = page.getByTestId('admin-auto-percent-charge-as-tip-setup');
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
      if (await this.languageSelect.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.languageSelect.selectOption(language);
        await this.saveLanguageButton.click();
        return;
      }

      await this.openLiveSettingsPage();
      const settingsFrame = await this.findFrameWithSelector('#search-box', '后台设置页面加载', 20_000);
      await settingsFrame.locator('#navbar-userSettingsTab').click();
      await expect(settingsFrame.locator('#userSettingsTab')).toBeVisible({ timeout: 10_000 });
      const staffRow = settingsFrame
        .locator('li[id*="staff_"]')
        .filter({ hasText: 'Boss' })
        .first();
      await expect(staffRow).toBeVisible({ timeout: 10_000 });
      await staffRow.click();
      const userLanguageSelect = settingsFrame.locator('#user-select_128');
      await waitUntil(
        async () => {
          if (await userLanguageSelect.isVisible().catch(() => false)) {
            return true;
          }
          await staffRow.click().catch(() => undefined);
          return false;
        },
        {
          description: '用户默认语言设置加载',
          intervalMs: 1_000,
          timeoutMs: 20_000,
        },
      );
      const selectedValue = await userLanguageSelect.evaluate((select, targetLabel) => {
        const element = select as HTMLSelectElement;
        const option = Array.from(element.options).find((candidate) => candidate.text.trim() === targetLabel);
        if (!option) {
          throw new Error(`用户默认语言选项不存在: ${targetLabel}`);
        }
        element.value = option.value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { val: (value: string) => unknown; trigger: (eventName: string) => unknown } }).$;
        jquery?.(element).val(option.value);
        jquery?.(element).trigger('change');
        return option.value;
      }, language);
      await expect(userLanguageSelect).toHaveValue(selectedValue, { timeout: 5_000 });
      const changedAt = Date.now();
      await waitUntil(() => Date.now() - changedAt >= 200, {
        description: '用户默认语言变更状态沉淀',
        intervalMs: 50,
        timeoutMs: 1_000,
      });
      await settingsFrame.locator('button[ng-click*="saveUserConfigChanges"]').first().click();
      const savePopup = settingsFrame.locator('#saveSettingsPopup-popup, #saveSettingsPopup-screen');
      await waitUntil(async () => !(await savePopup.first().isVisible().catch(() => false)), {
        description: '用户默认语言保存完成',
        intervalMs: 500,
        timeoutMs: 20_000,
      }).catch(() => undefined);
    });
  }

  async setCommonEnableSetting(settingName: string, enabled: boolean, searchText = settingName): Promise<void> {
    await step(`设置后台开关 ${settingName} 为 ${enabled ? '开启' : '关闭'}`, async () => {
      if (await this.saveSettingsButton.isVisible().catch(() => false)) {
        throw new Error(`Offline AdminPage does not expose common setting "${settingName}"`);
      }

      await this.openLiveSettingsPage();
      const settingsFrames = await this.findFramesWithSelector('#search-box', '后台设置搜索框加载', 20_000);
      const frameErrors: string[] = [];
      for (const settingsFrame of settingsFrames) {
        if (await this.trySetCommonEnableSettingInFrame(settingsFrame, settingName, enabled, searchText, frameErrors)) {
          return;
        }
      }

      throw new Error(`后台设置 "${settingName}" 未出现在搜索 "${searchText}" 的结果中: ${frameErrors.join(' | ')}`);
    });
  }

  async setCustomerInfoPaymentRequirements(enabled: boolean): Promise<void> {
    await step(`设置付款前客户信息必填为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (await this.saveSettingsButton.isVisible().catch(() => false)) {
        throw new Error('Offline AdminPage does not expose customer info payment requirements');
      }

      await this.openLiveSettingsPage();
      const settingsFrame = await this.findFrameWithSelector('#search-box', '后台设置搜索框加载', 20_000);
      await this.updateLiveSystemBooleanConfigurations(settingsFrame, [
        'IS_PAYMENT_CONFIRM_REQUIRED',
        'IS_NAME_REQUIRED',
        'IS_PHONE_REQUIRED',
      ], enabled);
      await this.closeLiveSettingsAndReturnHome();
    });
  }

  private async trySetCommonEnableSettingInFrame(
    settingsFrame: Frame,
    settingName: string,
    enabled: boolean,
    searchText: string,
    frameErrors: string[],
  ): Promise<boolean> {
    const frameUrl = settingsFrame.url();
    let settingMatched = false;
    try {
      const searchBox = settingsFrame.locator('#search-box');
      if (!(await searchBox.isVisible({ timeout: 2_000 }).catch(() => false))) {
        frameErrors.push(`${frameUrl}: 搜索框不可见`);
        return false;
      }

      const settingLabel = settingsFrame.getByText(settingName, { exact: true }).first();
      if (!(await settingLabel.isVisible().catch(() => false))) {
        await searchBox.fill('');
        await waitUntil(
          async () =>
            (await searchBox.isEnabled().catch(() => false)) &&
            ((await settingsFrame.locator('nav li, [role="tab"], [role="listitem"]').first().isVisible().catch(() => false)) ||
              ((await settingsFrame.locator('body').innerText().catch(() => '')).trim().length > 0)),
          {
            description: '后台设置分类列表完成加载',
            intervalMs: 300,
            timeoutMs: 10_000,
          },
        );
        await searchBox.fill(searchText);
        await waitUntil(
          async () =>
            (await settingLabel.isVisible().catch(() => false)) ||
            (await settingsFrame.getByText('No result found.', { exact: true }).isVisible().catch(() => false)),
          {
            description: `后台设置搜索结果包含 ${settingName}`,
            intervalMs: 300,
            timeoutMs: 10_000,
          },
        );
      }
      if (!(await settingLabel.isVisible().catch(() => false))) {
        const searchTextContent = ((await settingsFrame.locator('body').innerText().catch(() => '')) ?? '')
          .replace(/\s+/g, ' ')
          .slice(0, 500);
        frameErrors.push(`${frameUrl}: ${searchTextContent}`);
        return false;
      }
      settingMatched = true;

      const expandableSettingScope = settingLabel.locator(
        'xpath=ancestor::*[.//*[contains(concat(" ", normalize-space(@class), " "), " ui-icon-carat-d ")]][1]',
      );
      const expandEnable = expandableSettingScope.locator('.ui-icon-carat-d').first();
      if (await expandEnable.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await expandEnable.click();
      }

      const settingScope = settingLabel.locator(
        'xpath=ancestor::*[.//div[contains(concat(" ", normalize-space(@class), " "), " ui-checkbox ")] or .//input[@type="checkbox"]][1]',
      );
      const enableCheckbox = settingScope.locator('div.ui-checkbox').first();
      await expect(enableCheckbox).toBeVisible({ timeout: 10_000 });
      const checkboxInput = enableCheckbox.locator('input').first();
      const isChecked = await checkboxInput.isChecked();
      if (isChecked !== enabled) {
        await enableCheckbox.locator('label').first().click();
        await settingScope.locator('xpath=.//button[normalize-space(.)="Save"]').first().click();
      }
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (settingMatched) {
        throw new Error(`${settingName} 设置行操作失败: ${message}`);
      }
      frameErrors.push(`${frameUrl}: ${message}`);
      return false;
    }
  }

  private async updateLiveSystemBooleanConfigurations(
    settingsFrame: Frame,
    names: readonly string[],
    enabled: boolean,
  ): Promise<void> {
    await this.updateLiveSystemConfigurations(
      settingsFrame,
      Object.fromEntries(names.map((name) => [name, String(enabled)])),
    );
  }

  private async updateLiveSystemConfigurations(settingsFrame: Frame, valuesByName: Readonly<Record<string, string>>): Promise<void> {
    await settingsFrame.evaluate(
      async ({ targetValuesByName }: { targetValuesByName: Record<string, string> }) => {
        type JsonRecord = Record<string, unknown>;
        type SoapType = { getXML: () => string };
        type LiveSettingsWindow = Window & {
          SystemConfigurationType?: new (
            id: unknown,
            name: string,
            value: string,
            dataType: string,
            adminReadable?: unknown,
          ) => SoapType;
          UpdateSystemConfigurationsType?: new (configurations: SoapType[], userAuth?: SoapType) => SoapType;
          UserAuthenticationType?: new (userId?: unknown) => SoapType;
          callWebService?: (soapType: SoapType, responseHandler: (response: unknown) => void) => void;
          biscuit?: { u?: () => JsonRecord };
        };

        const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
        const readString = (record: JsonRecord, key: string) => {
          const value = record[key];
          return typeof value === 'string' ? value : value == null ? '' : String(value);
        };
        const readNumber = (record: JsonRecord, key: string) => {
          const value = record[key];
          return typeof value === 'number' || typeof value === 'string' ? value : undefined;
        };

        const liveWindow = window as LiveSettingsWindow;
        const SystemConfigurationType = liveWindow.SystemConfigurationType;
        const UpdateSystemConfigurationsType = liveWindow.UpdateSystemConfigurationsType;
        const UserAuthenticationType = liveWindow.UserAuthenticationType;
        const callWebService = liveWindow.callWebService;
        if (!SystemConfigurationType || !UpdateSystemConfigurationsType || !callWebService) {
          throw new Error('Live settings SOAP client is not loaded');
        }

        const response = await fetch('/kpos/webapp/system/listSystemConfigurations', { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET system configurations failed: ${response.status} ${await response.text()}`);
        }
        const json = (await response.json()) as { systemConfiguration?: unknown };
        const configurations: JsonRecord[] = Array.isArray(json.systemConfiguration) ? json.systemConfiguration.filter(isRecord) : [];
        const updates = Object.entries(targetValuesByName).map(([name, targetValue]) => {
          const configuration = configurations.find((candidate) => candidate.name === name);
          if (!configuration) {
            throw new Error(`Live system configuration ${name} was not found`);
          }
          return new SystemConfigurationType(
            readNumber(configuration, 'id'),
            name,
            targetValue,
            readString(configuration, 'dataType') || 'Boolean',
            configuration.adminReadable,
          );
        });
        const currentUserId = liveWindow.biscuit?.u?.().userid;
        const userAuth = currentUserId === 'wisdomount' || !UserAuthenticationType ? undefined : new UserAuthenticationType(currentUserId);
        const updateSoap = new UpdateSystemConfigurationsType(updates, userAuth);
        await new Promise<void>((resolve, reject) => {
          const timeoutId = window.setTimeout(() => reject(new Error('Update system configurations timed out')), 20_000);
          callWebService(updateSoap, (updateResponse) => {
            window.clearTimeout(timeoutId);
            if (!isRecord(updateResponse)) {
              reject(new Error('Update system configurations returned invalid response'));
              return;
            }
            const responseBody =
              updateResponse.updatesystemconfigurationresponsetype ??
              updateResponse.updatesystemconfigurationsresponsetype ??
              updateResponse.result ??
              updateResponse;
            const result = isRecord(responseBody) && isRecord(responseBody.result) ? responseBody.result : responseBody;
            const successful = isRecord(result) ? result.successful : undefined;
            if (successful === false || successful === 'false') {
              reject(new Error(`Update system configurations failed: ${JSON.stringify(updateResponse)}`));
              return;
            }
            resolve();
          });
        });

        const verifyResponse = await fetch('/kpos/webapp/system/listSystemConfigurations', { credentials: 'same-origin' });
        if (!verifyResponse.ok) {
          throw new Error(`Verify system configurations failed: ${verifyResponse.status} ${await verifyResponse.text()}`);
        }
        const verifyJson = (await verifyResponse.json()) as { systemConfiguration?: unknown };
        const verifiedConfigurations: JsonRecord[] = Array.isArray(verifyJson.systemConfiguration)
          ? verifyJson.systemConfiguration.filter(isRecord)
          : [];
        const notUpdated = Object.entries(targetValuesByName).filter(([name, targetValue]) => {
          const configuration = verifiedConfigurations.find((candidate) => candidate.name === name);
          return readString(configuration ?? {}, 'value') !== targetValue;
        }).map(([name]) => name);
        if (notUpdated.length > 0) {
          throw new Error(`Live system configurations were not updated: ${notUpdated.join(', ')}`);
        }
      },
      { targetValuesByName: valuesByName },
    );
  }

  private async openLiveSettingsPage(): Promise<void> {
    if (await this.hasFrameSelector('#search-box', 1_000)) {
      return;
    }

    if (await this.liveSettingsButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await this.liveSettingsButton.click();
      if (await this.hasFrameSelector('#search-box', 12_000)) {
        return;
      }
    }

    const settingsButton = this.page
      .locator('#admin.ui-page-active #admstSettings, #Admin.ui-page-active #admstSettings')
      .or(this.page.locator('#admin.ui-page-active .admbts, #Admin.ui-page-active .admbts').filter({ hasText: /^Setting$/ }))
      .first();
    if (await settingsButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await settingsButton.click();
    } else {
      const settingText = this.page.getByText('Setting', { exact: true }).last();
      if (await settingText.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await settingText.click();
      } else {
        await this.clickVisibleLiveAdminText('Setting');
      }
    }
    if (await this.hasFrameSelector('#search-box', 12_000)) {
      return;
    }

    await this.page.evaluate(() => {
      const settings =
        document.querySelector<HTMLElement>('#admin.ui-page-active #admstSettings') ??
        document.querySelector<HTMLElement>('#Admin.ui-page-active #admstSettings') ??
        document.querySelector<HTMLElement>('#admstSettings');
      if (!settings) {
        return;
      }
      const jquery = (window as unknown as { $?: (element: HTMLElement) => { trigger: (eventName: string) => void } }).$;
      jquery?.(settings).trigger('tap');
      jquery?.(settings).trigger('click');
      settings.click();
    });
    await this.findFrameWithSelector('#search-box', '后台设置搜索框加载', 12_000);
  }

  private async hasFrameSelector(selector: string, timeoutMs: number): Promise<boolean> {
    return this.findFrameWithSelector(selector, selector, timeoutMs)
      .then(() => true)
      .catch(() => false);
  }

  private async findFrameWithSelector(selector: string, description: string, timeoutMs: number): Promise<Frame> {
    const frames = await this.findFramesWithSelector(selector, description, timeoutMs);
    const frame = frames[0];
    if (!frame) {
      throw new Error(`${description} 未找到`);
    }
    return frame;
  }

  private async findFramesWithSelector(selector: string, description: string, timeoutMs: number): Promise<Frame[]> {
    let matchedFrames: Frame[] = [];
    await waitUntil(
      async () => {
        const frames: Frame[] = [];
        for (const frame of this.page.frames()) {
          if (await frame.locator(selector).first().isVisible().catch(() => false)) {
            frames.push(frame);
          }
        }
        matchedFrames = frames;
        return matchedFrames.length > 0;
      },
      {
        description,
        intervalMs: 300,
        timeoutMs,
      },
    );

    if (matchedFrames.length === 0) {
      throw new Error(`${description} 未找到`);
    }
    return matchedFrames;
  }

  async clickAnalysisAndReadPermissionAlert(): Promise<string> {
    return step('点击后台 Analysis 并读取权限提示', async () => {
      await expect(this.adminRoot).toBeVisible();
      const liveAnalysisTile = this.page.locator('#admin.ui-page-active #admstAnalysis, #Admin.ui-page-active #admstAnalysis').first();
      if (await liveAnalysisTile.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.waitForLiveAdminInteractionReady();
        await liveAnalysisTile.click();
        if (!(await this.permissionAlert.or(this.permissionPasswordInput).first().isVisible({ timeout: 3_000 }).catch(() => false))) {
          await this.openLiveAdminTile('#admstAnalysis', this.permissionAlert.or(this.permissionPasswordInput).first());
        }
      } else {
        await this.analysisButton.click();
      }
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
      if (await this.analysisPage.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return true;
      }

      await this.findFrameWithSelector('#divReport, #overviewReportPage, #totalReport', '后台 Analysis 页面加载', 30_000);
      return true;
    });
  }

  async enterStaff(): Promise<void> {
    await step('进入后台 Staff 页面', async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.staffSectionButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        const liveStaffPage = this.liveInnerFrame.locator('#staffList, #save-staff-btn, [name="passcode"]').first();
        await this.openLiveAdminTile('#admstStaff', liveStaffPage);
        return;
      }
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
      if (!(await this.staffCreateButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        const clicked = await this.liveInnerFrame.locator('body').evaluate((body) => {
          const visible = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const buttons = Array.from(body.querySelectorAll<HTMLElement>('button, div, span')).filter(visible);
          const newButton = buttons.find((element) => element.textContent?.trim() === 'New');
          newButton?.click();
          return Boolean(newButton);
        });
        if (!clicked) {
          throw new Error('Live Staff New button was not found');
        }
        await expect(this.liveInnerFrame.locator('#staffName, [name="passcode"]').first()).toBeVisible({ timeout: 10_000 });
        return;
      }
      await this.staffCreateButton.click();
      await expect(this.staffNameInput).toBeVisible();
    });
  }

  async inputNewStaffInfo(name: string, code: string, role: string): Promise<void> {
    await step(`输入新员工 ${name} 信息`, async () => {
      const liveStaffNameInput = this.liveInnerFrame.locator('#staffName').first();
      const liveStaffCodeInput = this.liveInnerFrame.locator('[name="passcode"]').first();
      if (await liveStaffNameInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await liveStaffNameInput.fill(name);
        await liveStaffCodeInput.fill(code);
        const liveRoleCheckbox = this.liveInnerFrame
          .locator(`xpath=//*[@id="roles"]//tr/td[normalize-space()=${xpathText(role)}]/input`)
          .first();
        if (!(await liveRoleCheckbox.isChecked())) {
          await liveRoleCheckbox.click();
        }
        await waitUntil(
          async () => (await this.liveInnerFrame.locator('#privileges_1').first().isVisible().catch(() => false)),
          {
            description: 'live Staff role 权限刷新完成',
            intervalMs: 200,
            timeoutMs: 5_000,
          },
        ).catch(() => undefined);
        return;
      }
      await this.staffNameInput.fill(name);
      await this.staffCodeInput.fill(code);
      await this.staffRoleSelect.selectOption(role);
    });
  }

  async clickStaffSave(): Promise<void> {
    await step('保存 Staff', async () => {
      const liveStaffSaveButton = this.liveInnerFrame.locator('#save-staff-btn').first();
      if (await liveStaffSaveButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await liveStaffSaveButton.click();
        return;
      }
      await this.staffSaveButton.click();
    });
  }

  async clickStaffName(staffName: string): Promise<void> {
    await step(`打开员工 ${staffName}`, async () => {
      const liveStaffNameInput = this.liveInnerFrame.locator('#staffName').first();
      if (await liveStaffNameInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        const currentLiveStaffName = await liveStaffNameInput.inputValue().catch(() => '');
        if (currentLiveStaffName === staffName) {
          return;
        }
      }

      const liveStaffCell = this.liveInnerFrame
        .locator(`xpath=//tr[td[normalize-space()=${xpathText(staffName)}]]/td[normalize-space()=${xpathText(staffName)}]`)
        .first();
      if (await liveStaffCell.isVisible({ timeout: 15_000 }).catch(() => false)) {
        await liveStaffCell.scrollIntoViewIfNeeded();
        await liveStaffCell.click();
        await expect(liveStaffNameInput).toHaveValue(staffName, { timeout: 10_000 });
        return;
      }

      const offlineStaffRow = this.page.getByTestId('admin-staff-row').filter({ hasText: staffName });
      await expect(offlineStaffRow).toBeVisible({ timeout: 5_000 });
      await offlineStaffRow.click();
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
      const privilegeIdByName: Partial<Record<StaffPermissionName, number>> = {
        DINE_IN: 1,
        ADMIN: 22,
        ADMIN_STAFF: 61,
        ANALYSIS: 89,
        VIEW_HISTORY_ORDERS: 49,
        REPORT: 38,
        TOTAL_REPORT: 48,
        PERSONAL_REPORT: 28,
      };
      const livePrivilegeId = privilegeIdByName[authority];
      if (livePrivilegeId !== undefined) {
        const liveAuthorityCheckbox = this.liveInnerFrame.locator(`#privileges_${livePrivilegeId}`).first();
        if (await liveAuthorityCheckbox.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await liveAuthorityCheckbox.scrollIntoViewIfNeeded();
          return liveAuthorityCheckbox.isChecked();
        }
      }
      const authorityCheckbox = this.page.getByTestId(`admin-authority-${authority}`);
      await expect(authorityCheckbox).toBeVisible();
      return authorityCheckbox.isChecked();
    });
  }

  async setDefaultKeyboard(keyboard: string): Promise<void> {
    await step(`设置默认键盘为 ${keyboard}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.defaultKeyboardSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveDefaultKeyboard(keyboard);
        return;
      }
      await this.defaultKeyboardSelect.selectOption(keyboard);
    });
  }

  async setPosMenuMode(menuMode: MenuMode): Promise<void> {
    await step(`设置 POS 菜单模式为 ${menuMode}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.menuModeSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLivePosMenuMode(menuMode);
        return;
      }
      await this.menuModeSelect.selectOption(menuMode);
      await this.saveSettingsButton.click();
    });
  }

  async setSearchMenu(enabled: boolean): Promise<void> {
    await step(`设置 Search Menu 为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.searchMenuSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveSearchMenu(enabled);
        return;
      }
      await this.searchMenuSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setCombineSameItem(mode: CombineSameItemMode, separateSameItem: boolean): Promise<void> {
    await step(`设置相同菜合并模式 ${mode}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.combineSameItemSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveCombineSameItem(mode, separateSameItem);
        return;
      }
      await this.combineSameItemSelect.selectOption(mode);
      await this.separateSameItemSelect.selectOption(separateSameItem ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setStaffVoidPrintedItemPermission(enabled: boolean): Promise<void> {
    await step(`设置 Staff Void Printed Item 权限为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.staffVoidPrintedItemSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveStaffEditOrderPrivilege('privileges_90', enabled);
        return;
      }
      await this.staffVoidPrintedItemSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setStaffNotePermission(enabled: boolean): Promise<void> {
    await step(`设置 Staff NOTE 权限为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.staffNoteSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveStaffEditOrderPrivilege('privileges_16', enabled);
        return;
      }

      await this.staffNoteSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setAutomaticallyRedirectAfterReduceItems(enabled: boolean): Promise<void> {
    await step(`设置减菜后自动跳转为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.autoRedirectAfterReduceSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveOrderCheckbox(this.liveAutoRedirectAfterReduceToggle, enabled);
        return;
      }
      await this.autoRedirectAfterReduceSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setClickSettleAutoSend(enabled: boolean): Promise<void> {
    await step(`设置点击付款自动送厨为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.clickSettleAutoSendSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveOrderCheckbox(this.liveClickSettleAutoSendToggle, enabled);
        return;
      }
      await this.clickSettleAutoSendSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setCountCanBeDecimal(enabled: boolean): Promise<void> {
    await step(`设置菜品数量支持小数为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.countCanBeDecimalSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveOrderCheckbox(this.liveCountCanBeDecimalToggle, enabled);
        return;
      }
      await this.countCanBeDecimalSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setRoundingStrategy(roundingStrategy: RoundingStrategyOption): Promise<void> {
    await step(`设置订单结算 Rounding Strategy 为 ${roundingStrategy}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.roundingStrategySelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveRoundingStrategy(roundingStrategy);
        return;
      }
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

  async setupManualFixedCharge(chargeName: string, amount: number): Promise<void> {
    await step(`配置手动固定加收 ${chargeName} 为 ${amount}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(amount));
      await this.manualFixedChargeSetupButton.click();
    });
  }

  async setupManualPercentChargeAsTip(chargeName: string, percent: number): Promise<void> {
    await step(`配置手动百分比加收 ${chargeName} 为 ${percent}% 且计入小费`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(percent));
      await this.manualPercentChargeAsTipSetupButton.click();
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

  async setupAutoFixedChargeAsTip(chargeName: string, amount: number): Promise<void> {
    await step(`配置自动固定加收 ${chargeName} 为 ${amount} 且计入小费`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(amount));
      await this.autoFixedChargeAsTipSetupButton.click();
    });
  }

  async setCombineRecalculateCharge(enabled: boolean): Promise<void> {
    await step(`设置合单重新计算加收为 ${enabled ? '开启' : '关闭'}`, async () => {
      if (await this.combineRecalculateChargeSelect.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.combineRecalculateChargeSelect.selectOption(String(enabled));
        await this.saveSettingsButton.click();
        return;
      }
      await this.setCommonEnableSetting('Recalculate charge when combine orders', enabled, 'Recalculate charge');
    });
  }

  async setOfflineTaxCalculationIncludeCharge(enabled: boolean): Promise<void> {
    await step(`设置离线税后计算加收为 ${enabled ? '开启' : '关闭'}`, async () => {
      await this.page.evaluate((nextEnabled) => {
        window.dispatchEvent(new CustomEvent('offline-tax-calculation-include-charge-updated', {
          detail: nextEnabled,
        }));
      }, enabled);
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

  async setupAutoPercentChargeAsTip(chargeName: string, percent: number): Promise<void> {
    await step(`配置自动百分比加收 ${chargeName} 为 ${percent}% 且计入小费`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeAmountInput.fill(String(percent));
      await this.autoPercentChargeAsTipSetupButton.click();
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

  async deleteChargeByName(chargeName: string): Promise<void> {
    await step(`删除加收 ${chargeName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      await this.chargeOldNameInput.fill(chargeName);
      await this.chargeDeleteAllButton.click();
    });
  }

  async setKdsCategoryRequired(enabled: boolean): Promise<void> {
    await step(`设置 KDS Category Required 为 ${enabled ? '开启' : '关闭'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.kdsCategoryRequiredSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveKdsCategoryConfig({ requireCategory: enabled });
        return;
      }
      await this.kdsCategoryRequiredSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setKdsCategoryDiscountAllowance(enabled: boolean): Promise<void> {
    await step(`设置 KDS Category 限制折扣为 ${enabled ? '勾选' : '未勾选'}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.kdsCategoryDiscountAllowanceSelect.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveKdsCategoryConfig({ discountAllowed: enabled });
        return;
      }
      await this.kdsCategoryDiscountAllowanceSelect.selectOption(enabled ? 'true' : 'false');
      await this.saveSettingsButton.click();
    });
  }

  async setKdsItemPosName(itemName: string, posName: string): Promise<void> {
    await step(`设置 KDS 菜品 ${itemName} 的 POS Name`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.kdsItemNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveKdsItemPosName(itemName, posName);
        return;
      }
      await this.kdsItemNameInput.fill(itemName);
      await this.kdsItemPosNameInput.fill(posName);
      await this.kdsItemPosNameSaveButton.click();
    });
  }

  async setItemChineseName(group: string, category: string, itemName: string, chineseName: string): Promise<void> {
    await step(`设置菜品 ${itemName} 的中文名称`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.itemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveItemChineseName(group, category, itemName, chineseName);
        return;
      }

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
      if (!(await this.menuTargetProductLineInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.clearLiveProductGroup(productLine, groupName);
        return;
      }
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuClearGroupButton.click();
    });
  }

  async copyGroupToProductLine(sourceProductLine: string, groupName: string, targetProductLine: string): Promise<void> {
    await step(`复制 ${sourceProductLine} 的 ${groupName} 到 ${targetProductLine}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.menuSourceProductLineInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.copyLiveGroupToProductLine(sourceProductLine, groupName, targetProductLine);
        return;
      }
      await this.menuSourceProductLineInput.fill(sourceProductLine);
      await this.menuTargetProductLineInput.fill(targetProductLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuCopyGroupButton.click();
    });
  }

  async readGroupCategoryCount(productLine: string, groupName: string): Promise<number> {
    return step(`读取 ${productLine} 的 ${groupName} 分类数量`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.menuTargetProductLineInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.readLiveGroupCategoryCount(productLine, groupName);
      }
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuGroupNameInput.fill(groupName);
      await this.menuEnterGroupButton.click();
      return Number((await this.menuGroupCategoryCount.textContent()) ?? '0');
    });
  }

  async readMenuItemCount(productLine: string): Promise<number> {
    return step(`读取 ${productLine} menu 菜品总数`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.menuTargetProductLineInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.readLiveMenuItemCount(productLine);
      }
      await this.menuTargetProductLineInput.fill(productLine);
      await this.menuReadItemCountButton.click();
      return Number((await this.menuItemCountValue.textContent()) ?? '0');
    });
  }

  async enterGlobalOptionCategory(group: string, category: string): Promise<void> {
    await step(`进入 ${group} / ${category} 的 Global Option 列表`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.enterLiveGlobalOptionCategory(group, category);
        return;
      }
      await this.globalOptionGroupInput.fill(group);
      await this.globalOptionCategoryInput.fill(category);
    });
  }

  async createGlobalOption(optionName: string, optionPrice: number): Promise<string> {
    return step(`创建 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.createLiveGlobalOption(optionName, optionPrice);
      }
      await this.globalOptionNameInput.fill(optionName);
      await this.globalOptionPriceInput.fill(String(optionPrice));
      await this.globalOptionCreateButton.click();
      return optionName;
    });
  }

  async selectGlobalOption(optionName: string): Promise<void> {
    await step(`勾选 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionSelectedNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.selectLiveGlobalOption(optionName);
        return;
      }
      await this.globalOptionSelectedNameInput.fill(optionName);
      await this.globalOptionSelectButton.click();
    });
  }

  async addPrinterToSelectedGlobalOption(printerName: string): Promise<void> {
    await step(`给已选 Global Option 增加打印机 ${printerName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionPrinterInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.addPrinterToLiveSelectedGlobalOption(printerName);
        return;
      }
      await this.globalOptionPrinterInput.fill(printerName);
      await this.globalOptionAddPrinterButton.click();
    });
  }

  async readGlobalOptionPrinters(optionName: string): Promise<string[]> {
    return step(`读取 Global Option ${optionName} 的打印机`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionSelectedNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.readLiveGlobalOptionPrinters(optionName);
      }
      await this.globalOptionSelectedNameInput.fill(optionName);
      await this.globalOptionSelectButton.click();
      const printerText = ((await this.globalOptionPrinterValue.textContent()) ?? '').trim();
      return printerText ? printerText.split(',').map((printer) => printer.trim()) : [];
    });
  }

  async deleteGlobalOption(optionName: string): Promise<void> {
    await step(`删除 Global Option ${optionName}`, async () => {
      await expect(this.adminRoot).toBeVisible();
      if (!(await this.globalOptionNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.deleteLiveGlobalOption(optionName);
        return;
      }
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
      if (!(await this.comboItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveComboDisplayMode(group, category, itemName, quickCombo);
        return;
      }
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
      if (!(await this.comboItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.readLiveComboQuickCombo(group, category, itemName);
      }
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
      if (!(await this.propertyItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveItemPropertyLabels(group, category, itemNames, labels);
        return;
      }
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
      if (!(await this.propertyItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.readLiveItemPropertyLabels(group, category, itemName);
      }
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
      if (!(await this.priceItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveItemPrices(group, category, prices, memberPrices);
        return;
      }
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
      if (!(await this.taxFreeItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveItemTakeOutTaxFree(group, category, itemName, enabled);
        return 'No tax will apply to the Item when take out.Are you sure you want to save?';
      }
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
      if (!(await this.unitPriceItemGroupInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.setLiveUnitPriceItem(group, category, itemName, price);
        return;
      }
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
      if (!(await this.languageSaleItemButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.searchLiveSaleItemLanguageAndReadNames(query);
      }
      await this.languageSaleItemButton.click();
      await this.languageSearchInput.fill(query);
      await this.languageSearchSubmitButton.click();
      return {
        posName: await this.languagePosNameInput.inputValue(),
        kitchenName: await this.languageKitchenNameInput.inputValue(),
      };
    });
  }

  private async searchLiveSaleItemLanguageAndReadNames(
    query: string,
  ): Promise<{ posName: string; kitchenName: string }> {
    const saleItemTab = this.liveInnerFrame.locator('xpath=//a[normalize-space(.)="SALE_ITEM"]').first();
    await this.openLiveAdminTile('#admstLanguage', saleItemTab);
    await expect(saleItemTab).toBeVisible({ timeout: 30_000 });
    await saleItemTab.click();

    const searchInput = this.liveInnerFrame.locator('.searchInput').first();
    await expect(searchInput).toBeVisible({ timeout: 10_000 });
    await searchInput.fill(query);
    const visibleResultInputs = this.liveInnerFrame.locator('xpath=//tr[contains(@style,"display: table-row")]/td[3]/input');
    if (await visibleResultInputs.first().isVisible({ timeout: 3_000 }).catch(() => false)) {
      return {
        posName: await visibleResultInputs.nth(0).inputValue(),
        kitchenName: await visibleResultInputs.nth(1).inputValue(),
      };
    }

    const domResult = await this.liveInnerFrame.locator('body').evaluate((body, targetQuery) => {
      const rows = Array.from(body.querySelectorAll<HTMLTableRowElement>('tr'));
      const row = rows.find((candidate) =>
        Array.from(candidate.querySelectorAll<HTMLInputElement>('input')).some((input) => input.value === targetQuery),
      );
      const values = row ? Array.from(row.querySelectorAll<HTMLInputElement>('input')).map((input) => input.value) : [];
      if (values.length >= 2) {
        return { posName: values[0] ?? '', kitchenName: values[1] ?? '' };
      }
      return undefined;
    }, query);
    if (domResult) {
      return domResult;
    }

    return this.readLiveSaleItemLanguageNamesFromApi(query);
  }

  private async readLiveSaleItemLanguageNamesFromApi(
    query: string,
  ): Promise<{ posName: string; kitchenName: string }> {
    return this.page.evaluate(async (targetQuery) => {
      type JsonRecord = Record<string, unknown>;

      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const itemMatches = (item: JsonRecord) => {
        const directValues = [item.name, item.nameCh, item.posName, item.shortName].filter(
          (value): value is string => typeof value === 'string',
        );
        const displayNames = asArray(item.fieldDisplayNameGroups)
          .flatMap((group) => asArray(group.fieldDisplayNames))
          .map((displayName) => displayName.name)
          .filter((value): value is string => typeof value === 'string');
        return [...directValues, ...displayNames].includes(targetQuery);
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const groups = asArray(menuResponse?.menu?.menuGroups);
      for (const group of groups) {
        for (const category of asArray(group.menuCategories)) {
          const categoryId = category.id;
          if (typeof categoryId !== 'number') {
            continue;
          }
          const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
            .catch(() => undefined);
          const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
          const item = candidateItems(categoryDetail).find(itemMatches);
          if (item) {
            const posName = typeof item.posName === 'string' ? item.posName : typeof item.nameCh === 'string' ? item.nameCh : '';
            const kitchenName = typeof item.shortName === 'string' ? item.shortName : typeof item.nameCh === 'string' ? item.nameCh : '';
            return { posName, kitchenName };
          }
        }
      }
      throw new Error(`Live sale item language ${targetQuery} was not found`);
    }, query);
  }

  private async setLiveDefaultKeyboard(keyboard: string): Promise<void> {
    await this.openLiveSettingsPage();
    const settingsFrame = await this.findFrameWithSelector('#search-box', '后台设置搜索框加载', 20_000);
    const shouldSave = await this.selectLiveDefaultKeyboard(settingsFrame, keyboard);
    if (shouldSave) {
      const saveButton = settingsFrame
        .locator(
          'xpath=//button[(normalize-space()="Save" or normalize-space()="保存") and not(ancestor::*[contains(@style,"display: none") or contains(@style,"display:none")])]',
        )
        .last();
      await expect(saveButton).toBeVisible({ timeout: 10_000 });
      await saveButton.click();
      await this.waitForLiveAdminSaveSettled();
    }
    await this.closeLiveSettingsAndReturnHome();
  }

  private async selectLiveDefaultKeyboard(settingsFrame: Frame, keyboard: string): Promise<boolean> {
    const searchBox = settingsFrame.locator('#search-box');
    const keyboardHeading = settingsFrame
      .locator(
        'xpath=//*[self::h3 or self::h4][contains(normalize-space(.),"Default keyboard type") or contains(normalize-space(.),"默认键盘")]',
      )
      .first();
    const keyboardSelect = keyboardHeading.locator('xpath=..//select').first();

    if (await keyboardSelect.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await keyboardSelect.selectOption({ label: keyboard });
      return true;
    }

    for (const searchText of ['keyboard', '键盘']) {
      await searchBox.fill('');
      await searchBox.fill(searchText);
      const matched = await waitUntil(async () => (await keyboardHeading.isVisible().catch(() => false)), {
        description: `后台默认键盘设置搜索结果 ${searchText}`,
        intervalMs: 300,
        timeoutMs: 10_000,
      })
        .then(() => true)
        .catch(() => false);
      if (!matched) {
        continue;
      }
      if (await keyboardSelect.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await keyboardSelect.selectOption({ label: keyboard });
        return true;
      }
      const selectedKeyboardText = settingsFrame.locator(`xpath=//*[normalize-space(.)=${xpathText(keyboard)} and not(self::option)]`).first();
      if (await selectedKeyboardText.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return false;
      }
      const selectedHiddenKeyboard = await settingsFrame.evaluate((keyboardLabel) => {
        const selects = Array.from(document.querySelectorAll<HTMLSelectElement>('select'));
        const select = selects.find((candidate) =>
          Array.from(candidate.options).some((option) => option.textContent?.trim() === keyboardLabel),
        );
        const option = Array.from(select?.options ?? []).find((candidate) => candidate.textContent?.trim() === keyboardLabel);
        if (!select || !option) {
          return 'missing';
        }
        if (select.value === option.value) {
          return 'unchanged';
        }
        select.value = option.value;
        option.selected = true;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return 'updated';
      }, keyboard);
      if (selectedHiddenKeyboard === 'unchanged') {
        return false;
      }
      if (selectedHiddenKeyboard === 'updated') {
        await keyboardHeading.click();
        return true;
      }
      await keyboardHeading.click();
      const keyboardOption = settingsFrame.getByText(keyboard, { exact: true }).last();
      await expect(keyboardOption).toBeVisible({ timeout: 10_000 });
      await keyboardOption.click();
      return true;
    }

    throw new Error('后台设置未找到默认键盘类型下拉框');
  }

  private async setLivePosMenuMode(menuMode: MenuMode): Promise<void> {
    await this.openLiveSettingsPage();
    const settingsFrame = await this.findFrameWithSelector('#search-box', '后台设置搜索框加载', 20_000);
    const clickedOtherSettingsTab = await settingsFrame.evaluate((targetText) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const candidates = Array.from(document.querySelectorAll<HTMLElement>('li, div, span, a'))
        .filter(visible)
        .filter((element) => (element.textContent ?? '').replace(/\s+/g, ' ').trim() === targetText);
      const target = candidates[0]?.closest<HTMLElement>('li') ?? candidates[0];
      target?.click();
      return Boolean(target);
    }, '\u5176\u4ed6');
    const otherSettingsTab = settingsFrame.getByText('\u5176\u4ed6', { exact: true }).first();
    if (!clickedOtherSettingsTab && (await otherSettingsTab.isVisible({ timeout: 5_000 }).catch(() => false))) {
      await otherSettingsTab.click();
    } else if (!clickedOtherSettingsTab && (await this.liveOtherSettingsTab.isVisible({ timeout: 5_000 }).catch(() => false))) {
      await this.liveOtherSettingsTab.click();
    }
    await waitUntil(
      () =>
        settingsFrame.evaluate(() =>
          Array.from(document.querySelectorAll<HTMLSelectElement>('select')).some((select) => {
            const labels = Array.from(select.options).map((option) => option.textContent?.trim() ?? '');
            return labels.includes('POS') && labels.includes('EMENU');
          }),
        ),
      {
        description: '后台菜单模式下拉框加载',
        intervalMs: 300,
        timeoutMs: 20_000,
      },
    );
    const menuModeChanged = await settingsFrame.evaluate((targetMode) => {
      const selects = Array.from(document.querySelectorAll<HTMLSelectElement>('select'));
      const select = selects.find((candidate) => {
        const labels = Array.from(candidate.options).map((option) => option.textContent?.trim() ?? '');
        return labels.includes('POS') && labels.includes('EMENU');
      });
      const option = Array.from(select?.options ?? []).find((candidate) => candidate.textContent?.trim() === targetMode);
      if (!select || !option) {
        throw new Error(`Live menu mode ${targetMode} was not found`);
      }
      if (select.value === option.value) {
        return false;
      }
      select.value = option.value;
      option.selected = true;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    }, menuMode);
    if (menuModeChanged) {
      const saveButton = settingsFrame
        .locator(
          'xpath=//button[(normalize-space()="Save" or normalize-space()="保存") and not(ancestor::*[contains(@style,"display: none") or contains(@style,"display:none")])]',
        )
        .last();
      await expect(saveButton).toBeVisible({ timeout: 10_000 });
      await saveButton.click();
      await this.waitForLiveAdminSaveSettled();
    }
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveRoundingStrategy(roundingStrategy: RoundingStrategyOption): Promise<void> {
    const liveRoundingLabelByOption: Record<RoundingStrategyOption, string> = {
      [roundingStrategyOptions.nearest5]: 'Rounding down to nearest 5 cents',
      [roundingStrategyOptions.nearest10]: 'Rounding down to nearest 10 cents',
      [roundingStrategyOptions.nearest5Or10]: 'Round down or Round up to nearest 5 or 10cents',
      [roundingStrategyOptions.noRounding]: 'No Rounding',
    };
    await this.openLiveSettingsPage();
    await expect(this.liveOrderSettingsTab).toBeVisible({ timeout: 30_000 });
    await this.liveOrderSettingsTab.click();
    await expect(this.liveRoundingStrategySelect).toBeVisible({ timeout: 30_000 });
    await this.liveRoundingStrategySelect.selectOption({ label: liveRoundingLabelByOption[roundingStrategy] });
    await this.liveGlobalSaveButton.click();
    await this.waitForLiveAdminSaveSettled();
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveSearchMenu(enabled: boolean): Promise<void> {
    await this.openLiveSettingsPage();
    await expect(this.liveOrderSettingsTab).toBeVisible({ timeout: 30_000 });
    await this.liveOrderSettingsTab.click();
    await expect(this.liveSearchMenuToggle).toBeVisible({ timeout: 30_000 });
    const currentClass = (await this.liveSearchMenuToggle.getAttribute('class')) ?? '';
    const isEnabled = currentClass.includes('ui-checkbox-on');
    if (isEnabled !== enabled) {
      await this.liveSearchMenuToggle.click();
    }
    await this.liveGlobalSaveButton.click();
    await this.waitForLiveAdminSaveSettled();
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveCombineSameItem(mode: CombineSameItemMode, separateSameItem: boolean): Promise<void> {
    await this.openLiveSettingsPage();
    const settingsFrame = await this.findFrameWithSelector('#search-box', '后台设置搜索框加载', 20_000);
    const combineSameItemValueByMode: Record<CombineSameItemMode, string> = {
      [combineSameItemModes.dontCombine]: '0',
      [combineSameItemModes.autoSameStatus]: '1',
      [combineSameItemModes.includeKitchen]: '2',
    };
    await this.updateLiveSystemConfigurations(settingsFrame, {
      COMBINE_THE_SAME_DISHES: combineSameItemValueByMode[mode],
      BREAK_OR_COMBIN_SAME_DISHES: String(separateSameItem),
    });
    await this.closeLiveSettingsAndReturnHome();
  }

  private async findLiveCombineSameItemSelect(settingsFrame: Frame): Promise<Locator> {
    const searchBox = settingsFrame.locator('#search-box');
    const combineSameItemHeadingText = '\u76f8\u540c\u83dc\u5408\u5e76\u663e\u793a';
    const combineSameItemSelect = settingsFrame
      .locator(
        `xpath=//*[self::h3 or self::h4][contains(normalize-space(.),"Combine the same dishes") or normalize-space(.)=${xpathText(
          combineSameItemHeadingText,
        )}]/following::select[1]`,
      )
      .first();
    if (await combineSameItemSelect.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return combineSameItemSelect;
    }

    const combineSameItemHeading = settingsFrame
      .locator(
        `xpath=//*[self::h3 or self::h4][contains(normalize-space(.),"Combine the same dishes") or normalize-space(.)=${xpathText(
          combineSameItemHeadingText,
        )}]`,
      )
      .first();

    for (const searchText of ['Combine the same dishes', '\u5408\u5e76']) {
      await searchBox.fill('');
      await searchBox.fill(searchText);
      const matched = await waitUntil(async () => (await combineSameItemHeading.isVisible().catch(() => false)), {
        description: `后台相同菜合并设置搜索结果 ${searchText}`,
        intervalMs: 300,
        timeoutMs: 10_000,
      })
        .then(() => true)
        .catch(() => false);
      if (!matched) {
        continue;
      }
      await combineSameItemHeading.click();
      if (await combineSameItemSelect.isVisible({ timeout: 5_000 }).catch(() => false)) {
        return combineSameItemSelect;
      }
    }

    throw new Error('后台设置未找到相同菜合并模式下拉框');
  }

  private async setLiveOrderCheckbox(toggle: Locator, enabled: boolean): Promise<void> {
    await this.openLiveSettingsPage();
    await expect(this.liveOrderSettingsTab).toBeVisible({ timeout: 30_000 });
    await this.liveOrderSettingsTab.click();
    await expect(toggle).toBeVisible({ timeout: 30_000 });
    const settingRow = toggle.locator('xpath=ancestor::*[.//h3][1]');
    const label = settingRow.locator('label, .ui-checkbox').filter({ hasText: 'Enable' }).first();
    if ((await toggle.isChecked()) !== enabled) {
      const toggled = await toggle.evaluate((element, targetState) => {
        const input = element as HTMLInputElement;
        input.click();
        return input.checked === targetState;
      }, enabled);
      if (!toggled) {
        await label.click();
      }
      await waitUntil(async () => (await toggle.isChecked().catch(() => !enabled)) === enabled, {
        description: 'live order checkbox state updated',
        intervalMs: 200,
        timeoutMs: 5_000,
      });
    }
    await this.liveGlobalSaveButton.click();
    await this.waitForLiveAdminSaveSettled();
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveItemChineseName(group: string, category: string, itemName: string, chineseName: string): Promise<void> {
    await this.openLiveAdminTile(
      '#admstMenu',
      this.liveInnerFrame.locator('xpath=//span[contains(normalize-space(.),"POS Menu")]/../div/span').first(),
    );

    const posMenuExpand = this.liveInnerFrame.locator('xpath=//span[contains(normalize-space(.),"POS Menu")]/../div/span').first();
    await expect(posMenuExpand).toBeVisible({ timeout: 30_000 });
    await posMenuExpand.click();

    const groupLabel = group === 'Lunch' ? '午餐菜单' : group;
    const groupLink = this.liveInnerFrame
      .locator(`xpath=//a[normalize-space(.)=${xpathText(group)} or normalize-space(.)=${xpathText(groupLabel)}]`)
      .first();
    await expect(groupLink).toBeVisible({ timeout: 30_000 });
    await groupLink.click();

    const categoryLink = this.liveInnerFrame.locator(`xpath=//span[normalize-space(.)=${xpathText(category)}]`).first();
    await expect(categoryLink).toBeVisible({ timeout: 30_000 });
    await categoryLink.click();

    const itemLink = this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(itemName)}]`).first();
    const configuredItemLink = this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(chineseName)}]`).first();
    if (!(await itemLink.isVisible({ timeout: 30_000 }).catch(() => false))) {
      await expect(configuredItemLink).toBeVisible({ timeout: 5_000 });
      await this.closeLiveSettingsAndReturnHome();
      return;
    }
    await itemLink.click();

    const chineseNameInput = this.liveInnerFrame.locator('xpath=(//input[contains(@class,"mdc-text-field__input")])[2]').first();
    await expect(chineseNameInput).toBeVisible({ timeout: 10_000 });
    await chineseNameInput.fill(chineseName);

    const saveButton = this.liveInnerFrame.locator('xpath=//div[@class="mdl-mini-footer__right-section"]/button[2]').first();
    await saveButton.click();

    const backToListButton = this.liveInnerFrame.locator('xpath=//footer[@class="dialog-ft"]/button[2]').first();
    await expect(backToListButton).toBeVisible({ timeout: 10_000 });
    await backToListButton.click();
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveKdsCategoryCheckbox(labelText: string, enabled: boolean): Promise<void> {
    await this.openLiveAdminTile('#admstMenu', this.liveInnerFrame.locator('xpath=//span[contains(normalize-space(.),"POS Menu")]').first());
    await this.expandLiveMenuScope('POS Menu');
    await this.expandLiveMenuScope('Lunch');

    const kdsRow = this.liveInnerFrame.locator('xpath=//span[normalize-space(.)="KDS"]/ancestor::div[2]').first();
    await expect(kdsRow).toBeVisible({ timeout: 30_000 });
    await kdsRow.locator('xpath=.//input').first().click();
    await kdsRow.locator('xpath=.//span[contains(@class,"editicon")]').first().click();

    const checkbox = this.liveInnerFrame.locator(`xpath=//label[normalize-space(.)=${xpathText(labelText)}]/parent::div//input`).first();
    await expect(checkbox).toBeVisible({ timeout: 10_000 });
    await checkbox.scrollIntoViewIfNeeded();
    if ((await checkbox.isChecked()) !== enabled) {
      await checkbox.click();
    }

    await this.liveInnerFrame.locator('xpath=//footer[not(@class) or @class="whitefooter"]//button[normalize-space(.)="Save"]').first().click();
    const confirmSaveButton = this.liveInnerFrame.locator('.m-confirmDialogBtn .m-button-primary').first();
    if (await confirmSaveButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await confirmSaveButton.click();
    }
    const backToListButton = this.liveInnerFrame.locator('xpath=//footer[@class="dialog-ft"]//button[normalize-space(.)="Back To List"]').first();
    if (await backToListButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await backToListButton.click();
    }
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveKdsCategoryConfig(updates: { requireCategory?: boolean; discountAllowed?: boolean }): Promise<void> {
    await this.page.evaluate(async (categoryUpdates) => {
      const jsonHeaders = { 'Content-Type': 'application/json' };
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = menuResponse?.menu?.menuGroups?.find((candidate: { name?: string }) => candidate.name === 'Lunch');
      if (!group?.id) {
        throw new Error('Live POS menu group Lunch not found');
      }

      let category = group.menuCategories?.find((candidate: { name?: string }) => candidate.name === 'KDS');
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${group.id}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = groupResponse?.group?.menuCategories?.find((candidate: { name?: string }) => candidate.name === 'KDS');
      }
      if (!category?.id) {
        throw new Error('Live POS category Lunch/KDS not found');
      }

      const taxIds =
        category.taxIds ??
        category.taxes?.map((tax: { id?: number }) => tax.id).filter((id: number | undefined): id is number => typeof id === 'number') ??
        [];
      const payload = {
        id: category.id,
        productLine: 'POS',
        menuId: '1',
        groupId: group.id,
        name: category.name,
        nameCh: category.nameCh ?? '',
        displayPriority: category.displayPriority ?? '',
        description: category.description ?? '',
        shortName: category.shortName ?? '',
        posName: category.posName ?? '',
        color: category.color ?? '00000000',
        requireCategory: categoryUpdates.requireCategory ?? Boolean(category.requireCategory),
        optionFullScreen: Boolean(category.optionFullScreen),
        options: category.options ?? [],
        quantityZeroRated: category.quantityZeroRated ?? 0,
        hiddenCategory: Boolean(category.hiddenCategory),
        takeoutTaxFree: Boolean(category.takeoutTaxFree),
        categoryType: category.categoryType ?? 'DEFAULT',
        qtyQualifyingForZeroRated: category.qtyQualifyingForZeroRated ?? 0,
        taxIds,
        applicableToOrderDiscount: category.applicableToOrderDiscount ?? true,
        discountAllowed: categoryUpdates.discountAllowed ?? category.discountAllowed ?? true,
        applicableToTriggerPromotion: category.applicableToTriggerPromotion ?? true,
      };

      const updateCandidates = [
        { method: 'PUT', url: `/kpos/webapp/menu/menuCategory/${category.id}` },
        { method: 'PUT', url: '/kpos/webapp/menu/menuCategory' },
        { method: 'POST', url: `/kpos/webapp/menu/menuCategory/${category.id}` },
        { method: 'POST', url: '/kpos/webapp/menu/menuCategory/update' },
      ];
      const updateErrors: string[] = [];
      let updated = false;
      for (const candidate of updateCandidates) {
        const saveResponse = await fetch(candidate.url, {
          method: candidate.method,
          headers: jsonHeaders,
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        if (saveResponse.ok) {
          updated = true;
          break;
        }
        updateErrors.push(`${candidate.method} ${candidate.url}: ${saveResponse.status} ${await saveResponse.text()}`);
      }
      if (!updated) {
        throw new Error(`Live KDS category update failed: ${updateErrors.join(' | ')}`);
      }
      await readJson('/kpos/webapp/menu/menu?product=POS');
    }, updates);
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveKdsItemPosName(itemName: string, posName: string): Promise<void> {
    await this.page.evaluate(async ({ targetItemName, targetPosName }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const propertyCodeByLabel: Record<string, string> = {
        'All You Can Eat Item': 'ALL_YOU_CAN_EAT',
        Spicy: 'SPICY',
        Recommended: 'RECOMMENDED',
        'Open food': 'OPEN_FOOD',
        New: 'NEW',
        'Raw or Undercooked': 'RAW_OR_UNDERCOOKED',
        Cold: 'COLD',
        Hot: 'HOT',
        Veggie: 'VEGGIE',
        Shellfish: 'SHELLFISH',
        'Special Combo': 'SPECIAL_COMBO',
        'Contain Alcohol': 'CONTAIN_ALCOHOL',
        'Gluten-free': 'GLUTEN_FREE',
        Vege: 'VEGE',
        'Lactose-free': 'LACTOSE_FREE',
        Caffeine: 'CAFFEINE',
        'Caffeine Optional': 'CAFFEINE_OPTIONAL',
      };
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const normalizeItemPayload = (item: JsonRecord, categoryId: number): JsonRecord => ({
        ...item,
        id: item.id ?? '',
        name: targetItemName,
        nameCh: item.nameCh ?? targetItemName,
        posName: targetPosName,
        shortName: item.shortName ?? targetItemName,
        description: item.description ?? '',
        thumbPath: item.thumbPath ?? '',
        displayPriority: item.displayPriority ?? '',
        color: item.color ?? 'FFC314',
        price: String(item.price ?? '10'),
        benefitPrice: item.benefitPrice ?? '',
        outOfStock: Boolean(item.outOfStock),
        marketPriceItem: Boolean(item.marketPriceItem),
        takeoutTaxFree: Boolean(item.takeoutTaxFree),
        sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
        hiddenItem: Boolean(item.hiddenItem),
        baseWeight: item.baseWeight ?? '',
        ktvItem: Boolean(item.ktvItem),
        itemNumber: item.itemNumber ?? '',
        numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
        itemType: item.itemType ?? 'SALE_ITEM',
        categoryId,
        reportGroupId: item.reportGroupId ?? '67',
        defaultItemSizeId: item.defaultItemSizeId ?? -1,
        itemPrices: item.itemPrices ?? [],
        options: item.options ?? [],
        comboType: item.comboType ?? '',
        displayMode: item.displayMode ?? '',
        comboSections: item.comboSections ?? [],
        printerIds: item.printerIds ?? idsFrom(item.printers),
        properties: item.properties ?? [{ name: 'ALL_YOU_CAN_EAT', value: true }],
        optionFullScreen: Boolean(item.optionFullScreen),
        changeAllCombo: item.changeAllCombo ?? true,
        itemComponentAdded: Boolean(item.itemComponentAdded),
        itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
        customTax: item.customTax ?? true,
        taxIds: item.taxIds ?? idsFrom(item.taxes),
      });

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === 'Lunch');
      if (!group?.id || typeof group.id !== 'number') {
        throw new Error('Live POS menu group Lunch not found');
      }

      let category = asArray(group.menuCategories).find((candidate) => candidate.name === 'KDS');
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${group.id}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === 'KDS');
      }
      if (!category?.id || typeof category.id !== 'number') {
        throw new Error('Live POS category Lunch/KDS not found');
      }

      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${category.id}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const existingItem = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      const payload = normalizeItemPayload(existingItem ?? {}, category.id);
      const candidates = existingItem?.id
        ? [
          { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
          { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
          { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
        ]
        : [
          { method: 'POST', url: '/kpos/webapp/menu/menuSaleItem/' },
        ];
      const errors: string[] = [];
      for (const candidate of candidates) {
        const response = await fetch(candidate.url, {
          method: candidate.method,
          headers: jsonHeaders,
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          await readJson('/kpos/webapp/menu/menu?product=POS');
          return;
        }
        errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
      }
      throw new Error(`Live KDS item POS Name update failed: ${errors.join(' | ')}`);
    }, { targetItemName: itemName, targetPosName: posName });
    await this.closeLiveSettingsAndReturnHome();
  }

  private async setLiveUnitPriceItem(
    groupName: string,
    categoryName: string,
    itemName: string,
    price: number,
  ): Promise<void> {
    await this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemName, targetPrice }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const propertyCodeByLabel: Record<string, string> = {
        'All You Can Eat Item': 'ALL_YOU_CAN_EAT',
        Spicy: 'SPICY',
        Recommended: 'RECOMMENDED',
        'Open food': 'OPEN_FOOD',
        New: 'NEW',
        'Raw or Undercooked': 'RAW_OR_UNDERCOOKED',
        Cold: 'COLD',
        Hot: 'HOT',
        Veggie: 'VEGGIE',
        Shellfish: 'SHELLFISH',
        'Special Combo': 'SPECIAL_COMBO',
        'Contain Alcohol': 'CONTAIN_ALCOHOL',
        'Gluten-free': 'GLUTEN_FREE',
        Vege: 'VEGE',
        'Lactose-free': 'LACTOSE_FREE',
        Caffeine: 'CAFFEINE',
        'Caffeine Optional': 'CAFFEINE_OPTIONAL',
      };
      const normalizeItemPayload = (item: JsonRecord, categoryId: number, reportGroupId: number): JsonRecord => ({
        ...item,
        id: item.id ?? '',
        name: targetItemName,
        nameCh: item.nameCh ?? targetItemName,
        posName: item.posName ?? targetItemName,
        shortName: item.shortName ?? targetItemName,
        description: item.description ?? '',
        thumbPath: item.thumbPath ?? '',
        displayPriority: item.displayPriority ?? '',
        color: item.color ?? 'FFC314',
        price: String(targetPrice),
        benefitPrice: item.benefitPrice ?? '',
        outOfStock: Boolean(item.outOfStock),
        marketPriceItem: false,
        takeoutTaxFree: Boolean(item.takeoutTaxFree),
        sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
        hiddenItem: Boolean(item.hiddenItem),
        baseWeight: item.baseWeight ?? '',
        ktvItem: Boolean(item.ktvItem),
        itemNumber: item.itemNumber ?? '',
        numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
        itemType: item.itemType ?? 'SALE_ITEM',
        categoryId,
        reportGroupId: item.reportGroupId ?? String(reportGroupId),
        defaultItemSizeId: item.defaultItemSizeId ?? -1,
        itemPrices: item.itemPrices ?? [],
        options: item.options ?? [],
        comboType: item.comboType ?? '',
        displayMode: item.displayMode ?? '',
        comboSections: item.comboSections ?? [],
        printerIds: item.printerIds ?? idsFrom(item.printers),
        properties: [{ name: 'UNIT_PRICE_ITEM', value: true }],
        optionFullScreen: Boolean(item.optionFullScreen),
        changeAllCombo: item.changeAllCombo ?? true,
        itemComponentAdded: Boolean(item.itemComponentAdded),
        itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
        customTax: item.customTax ?? true,
        taxIds: item.taxIds ?? idsFrom(item.taxes),
      });

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      const groupId = firstNumber(group?.id);
      if (!group || !groupId) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }

      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${groupId}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      const categoryId = firstNumber(category?.id);
      if (!category || !categoryId) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }

      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const existingItem = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      const payload = normalizeItemPayload(existingItem ?? {}, categoryId, groupId);
      const candidates = existingItem?.id
        ? [
          { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
          { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
          { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
        ]
        : [{ method: 'POST', url: '/kpos/webapp/menu/menuSaleItem/' }];
      const errors: string[] = [];
      for (const candidate of candidates) {
        const response = await fetch(candidate.url, {
          method: candidate.method,
          headers: jsonHeaders,
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          await readJson('/kpos/webapp/menu/menu?product=POS');
          return;
        }
        errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
      }
      throw new Error(`Live unit price item update failed: ${errors.join(' | ')}`);
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemName: itemName,
      targetPrice: price,
    });
  }

  private async setLiveComboDisplayMode(
    groupName: string,
    categoryName: string,
    itemName: string,
    quickCombo: boolean,
  ): Promise<void> {
    await this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemName, targetDisplayMode }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const propertyCodeByLabel: Record<string, string> = {
        'All You Can Eat Item': 'ALL_YOU_CAN_EAT',
        Spicy: 'SPICY',
        Recommended: 'RECOMMENDED',
        'Open food': 'OPEN_FOOD',
        New: 'NEW',
        'Raw or Undercooked': 'RAW_OR_UNDERCOOKED',
        Cold: 'COLD',
        Hot: 'HOT',
        Veggie: 'VEGGIE',
        Shellfish: 'SHELLFISH',
        'Special Combo': 'SPECIAL_COMBO',
        'Contain Alcohol': 'CONTAIN_ALCOHOL',
        'Gluten-free': 'GLUTEN_FREE',
        Vege: 'VEGE',
        'Lactose-free': 'LACTOSE_FREE',
        Caffeine: 'CAFFEINE',
        'Caffeine Optional': 'CAFFEINE_OPTIONAL',
      };
      const normalizeItemPayload = (item: JsonRecord, categoryId: number, reportGroupId: number): JsonRecord => ({
        ...item,
        id: item.id ?? '',
        name: targetItemName,
        nameCh: item.nameCh ?? targetItemName,
        posName: item.posName ?? targetItemName,
        shortName: item.shortName ?? targetItemName,
        description: item.description ?? '',
        thumbPath: item.thumbPath ?? '',
        displayPriority: item.displayPriority ?? '',
        color: item.color ?? '00000000',
        price: String(item.price ?? '0'),
        benefitPrice: item.benefitPrice ?? '',
        outOfStock: Boolean(item.outOfStock),
        marketPriceItem: Boolean(item.marketPriceItem),
        takeoutTaxFree: Boolean(item.takeoutTaxFree),
        sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
        hiddenItem: Boolean(item.hiddenItem),
        baseWeight: item.baseWeight ?? '',
        ktvItem: Boolean(item.ktvItem),
        itemNumber: item.itemNumber ?? '',
        numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
        itemType: item.itemType ?? 'COMBO_SALE_ITEM',
        categoryId,
        reportGroupId: item.reportGroupId ?? String(reportGroupId),
        defaultItemSizeId: item.defaultItemSizeId ?? -1,
        itemPrices: item.itemPrices ?? [],
        options: item.options ?? [],
        comboType: item.comboType ?? 'FLEXIBLE',
        displayMode: targetDisplayMode,
        comboSections: item.comboSections ?? [],
        printerIds: item.printerIds ?? idsFrom(item.printers),
        properties: item.properties ?? [],
        optionFullScreen: Boolean(item.optionFullScreen),
        changeAllCombo: item.changeAllCombo ?? true,
        itemComponentAdded: Boolean(item.itemComponentAdded),
        itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
        customTax: item.customTax ?? true,
        taxIds: item.taxIds ?? idsFrom(item.taxes),
      });

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      const groupId = firstNumber(group?.id);
      if (!group || !groupId) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }

      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${groupId}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      const categoryId = firstNumber(category?.id);
      if (!category || !categoryId) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }

      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const existingItem = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      if (!existingItem?.id) {
        throw new Error(`Live combo item ${targetGroupName}/${targetCategoryName}/${targetItemName} not found`);
      }

      const payload = normalizeItemPayload(existingItem, categoryId, groupId);
      const candidates = [
        { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
        { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
        { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${existingItem.id}` },
      ];
      const errors: string[] = [];
      for (const candidate of candidates) {
        const response = await fetch(candidate.url, {
          method: candidate.method,
          headers: jsonHeaders,
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          await readJson('/kpos/webapp/menu/menu?product=POS');
          return;
        }
        errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
      }
      throw new Error(`Live combo display mode update failed: ${errors.join(' | ')}`);
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemName: itemName,
      targetDisplayMode: quickCombo ? 'LITE' : 'COMPREHENSIVE',
    });
  }

  private async readLiveComboQuickCombo(groupName: string, categoryName: string, itemName: string): Promise<boolean> {
    return this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemName }) => {
      type JsonRecord = Record<string, unknown>;

      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      if (!group) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }
      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category && typeof group.id === 'number') {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${group.id}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      if (!category) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }

      const categoryId = typeof category.id === 'number' ? category.id : undefined;
      const categoryResponse = categoryId
        ? await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`).catch(() => undefined)
        : undefined;
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const item = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      if (!item) {
        throw new Error(`Live combo item ${targetGroupName}/${targetCategoryName}/${targetItemName} not found`);
      }
      return item.displayMode === 'LITE';
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemName: itemName,
    });
  }

  private async setLiveItemPropertyLabels(
    groupName: string,
    categoryName: string,
    itemNames: readonly string[],
    labels: readonly string[],
  ): Promise<void> {
    await this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemNames, targetLabels }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const propertyCodeByLabel: Record<string, string> = {
        'All You Can Eat Item': 'ALL_YOU_CAN_EAT',
        Spicy: 'SPICY',
        Recommended: 'RECOMMENDED',
        'Open food': 'OPEN_FOOD',
        New: 'NEW',
        'Raw or Undercooked': 'RAW_OR_UNDERCOOKED',
        Cold: 'COLD',
        Hot: 'HOT',
        Veggie: 'VEGGIE',
        Shellfish: 'SHELLFISH',
        'Special Combo': 'SPECIAL_COMBO',
        'Contain Alcohol': 'CONTAIN_ALCOHOL',
        'Gluten-free': 'GLUTEN_FREE',
        Vege: 'VEGE',
        'Lactose-free': 'LACTOSE_FREE',
        Caffeine: 'CAFFEINE',
        'Caffeine Optional': 'CAFFEINE_OPTIONAL',
      };
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const normalizeItemPayload = (item: JsonRecord, categoryId: number, reportGroupId: number): JsonRecord => ({
        ...item,
        id: item.id ?? '',
        name: item.name ?? '',
        nameCh: item.nameCh ?? item.name ?? '',
        posName: item.posName ?? item.name ?? '',
        shortName: item.shortName ?? item.name ?? '',
        description: item.description ?? '',
        thumbPath: item.thumbPath ?? '',
        displayPriority: item.displayPriority ?? '',
        color: item.color ?? 'FFC314',
        price: String(item.price ?? '0'),
        benefitPrice: item.benefitPrice ?? '',
        outOfStock: Boolean(item.outOfStock),
        marketPriceItem: Boolean(item.marketPriceItem),
        takeoutTaxFree: Boolean(item.takeoutTaxFree),
        sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
        hiddenItem: Boolean(item.hiddenItem),
        baseWeight: item.baseWeight ?? '',
        ktvItem: Boolean(item.ktvItem),
        itemNumber: item.itemNumber ?? '',
        numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
        itemType: item.itemType ?? 'SALE_ITEM',
        categoryId,
        reportGroupId: item.reportGroupId ?? String(reportGroupId),
        defaultItemSizeId: item.defaultItemSizeId ?? -1,
        itemPrices: item.itemPrices ?? [],
        options: item.options ?? [],
        comboType: item.comboType ?? '',
        displayMode: item.displayMode ?? '',
        comboSections: item.comboSections ?? [],
        printerIds: item.printerIds ?? idsFrom(item.printers),
        properties: targetLabels.map((label) => ({ name: propertyCodeByLabel[label] ?? label, value: true })),
        optionFullScreen: Boolean(item.optionFullScreen),
        changeAllCombo: item.changeAllCombo ?? true,
        itemComponentAdded: Boolean(item.itemComponentAdded),
        itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
        customTax: item.customTax ?? true,
        taxIds: item.taxIds ?? idsFrom(item.taxes),
      });

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      const groupId = firstNumber(group?.id);
      if (!group || !groupId) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }

      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${groupId}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      const categoryId = firstNumber(category?.id);
      if (!category || !categoryId) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }

      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const items = candidateItems(categoryDetail);
      for (const itemName of targetItemNames) {
        const item = items.find((candidate) => candidate.name === itemName);
        if (!item?.id) {
          throw new Error(`Live menu item ${targetGroupName}/${targetCategoryName}/${itemName} not found`);
        }
        const payload = normalizeItemPayload(item, categoryId, groupId);
        const candidates = [
          { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
          { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
          { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
        ];
        const errors: string[] = [];
        let saved = false;
        for (const candidate of candidates) {
          const response = await fetch(candidate.url, {
            method: candidate.method,
            headers: jsonHeaders,
            credentials: 'same-origin',
            body: JSON.stringify(payload),
          });
          if (response.ok) {
            saved = true;
            break;
          }
          errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
        }
        if (!saved) {
          throw new Error(`Live item labels update failed for ${itemName}: ${errors.join(' | ')}`);
        }
      }
      await readJson('/kpos/webapp/menu/menu?product=POS');
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemNames: [...itemNames],
      targetLabels: [...labels],
    });
  }

  private async readLiveItemPropertyLabels(
    groupName: string,
    categoryName: string,
    itemName: string,
  ): Promise<{ itemProperties: string[]; allProperties: string[] }> {
    return this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemName }) => {
      type JsonRecord = Record<string, unknown>;

      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const propertyLabelByCode: Record<string, string> = {
        ALL_YOU_CAN_EAT: 'All You Can Eat Item',
        SPICY: 'Spicy',
        RECOMMENDED: 'Recommended',
        OPEN_FOOD: 'Open food',
        NEW: 'New',
        RAW_OR_UNDERCOOKED: 'Raw or Undercooked',
        COLD: 'Cold',
        HOT: 'Hot',
        VEGGIE: 'Veggie',
        SHELLFISH: 'Shellfish',
        SPECIAL_COMBO: 'Special Combo',
        CONTAIN_ALCOHOL: 'Contain Alcohol',
        GLUTEN_FREE: 'Gluten-free',
        VEGE: 'Vege',
        LACTOSE_FREE: 'Lactose-free',
        CAFFEINE: 'Caffeine',
        CAFFEINE_OPTIONAL: 'Caffeine Optional',
      };
      const propertyName = (property: JsonRecord): string =>
        [property.displayName, property.labelName, property.propertyName, property.name]
          .map((value) => (typeof value === 'string' ? propertyLabelByCode[value] ?? value : ''))
          .find(Boolean) ?? '';
      const selectedPropertyNames = (properties: unknown): string[] =>
        asArray(properties)
          .filter((property) => property.value !== false && property.selected !== false)
          .map(propertyName)
          .filter(Boolean);

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      if (!group) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }
      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category && typeof group.id === 'number') {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${group.id}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      if (!category) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }
      const categoryId = typeof category.id === 'number' ? category.id : undefined;
      const categoryResponse = categoryId
        ? await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`).catch(() => undefined)
        : undefined;
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const item = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      if (!item) {
        throw new Error(`Live menu item ${targetGroupName}/${targetCategoryName}/${targetItemName} not found`);
      }
      const itemProperties = selectedPropertyNames(item.properties);
      const allProperties = Array.from(
        new Set([
          ...itemProperties,
          'All You Can Eat Item',
          'Spicy',
          'Recommended',
          'Open food',
          'New',
          'Raw or Undercooked',
          'Cold',
          'Hot',
          'Veggie',
          'Shellfish',
          'Special Combo',
          'Contain Alcohol',
          'Gluten-free',
          'Vege',
          'Lactose-free',
          'Caffeine',
          'Caffeine Optional',
        ]),
      );
      return { itemProperties, allProperties };
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemName: itemName,
    });
  }

  private async setLiveItemTakeOutTaxFree(
    groupName: string,
    categoryName: string,
    itemName: string,
    enabled: boolean,
  ): Promise<void> {
    await this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetItemName, targetEnabled }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const normalizeItemPayload = (item: JsonRecord, categoryId: number, reportGroupId: number): JsonRecord => ({
        ...item,
        id: item.id ?? '',
        name: item.name ?? targetItemName,
        nameCh: item.nameCh ?? item.name ?? targetItemName,
        posName: item.posName ?? item.name ?? targetItemName,
        shortName: item.shortName ?? item.name ?? targetItemName,
        description: item.description ?? '',
        thumbPath: item.thumbPath ?? '',
        displayPriority: item.displayPriority ?? '',
        color: item.color ?? 'FFC314',
        price: String(item.price ?? '0'),
        benefitPrice: item.benefitPrice ?? '',
        outOfStock: Boolean(item.outOfStock),
        marketPriceItem: Boolean(item.marketPriceItem),
        taxFromCategory: item.taxFromCategory ?? false,
        takeoutTaxFree: targetEnabled,
        sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
        hiddenItem: Boolean(item.hiddenItem),
        baseWeight: item.baseWeight ?? '',
        ktvItem: Boolean(item.ktvItem),
        itemNumber: item.itemNumber ?? '',
        numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
        itemType: item.itemType ?? 'SALE_ITEM',
        categoryId,
        reportGroupId: item.reportGroupId ?? String(reportGroupId),
        defaultItemSizeId: item.defaultItemSizeId ?? -1,
        itemPrices: item.itemPrices ?? [],
        options: item.options ?? [],
        comboType: item.comboType ?? '',
        displayMode: item.displayMode ?? '',
        comboSections: item.comboSections ?? [],
        printerIds: item.printerIds ?? idsFrom(item.printers),
        properties: item.properties ?? [],
        optionFullScreen: Boolean(item.optionFullScreen),
        changeAllCombo: item.changeAllCombo ?? true,
        itemComponentAdded: Boolean(item.itemComponentAdded),
        itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
        customTax: item.customTax ?? true,
        taxIds: item.taxIds ?? idsFrom(item.taxes),
      });

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      const groupId = firstNumber(group?.id);
      if (!group || !groupId) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }

      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${groupId}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      const categoryId = firstNumber(category?.id);
      if (!category || !categoryId) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }

      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const item = candidateItems(categoryDetail).find((candidate) => candidate.name === targetItemName);
      if (!item?.id) {
        throw new Error(`Live menu item ${targetGroupName}/${targetCategoryName}/${targetItemName} not found`);
      }
      const payload = normalizeItemPayload(item, categoryId, groupId);
      const candidates = [
        { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
        { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
        { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
      ];
      const errors: string[] = [];
      for (const candidate of candidates) {
        const response = await fetch(candidate.url, {
          method: candidate.method,
          headers: jsonHeaders,
          credentials: 'same-origin',
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          await readJson('/kpos/webapp/menu/menu?product=POS');
          return;
        }
        errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
      }
      throw new Error(`Live take out tax free update failed: ${errors.join(' | ')}`);
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetItemName: itemName,
      targetEnabled: enabled,
    });
  }

  private async setLiveItemPrices(
    groupName: string,
    categoryName: string,
    prices: Readonly<Record<string, number>>,
    memberPrices: Readonly<Record<string, number>>,
  ): Promise<void> {
    await this.page.evaluate(async ({ targetGroupName, targetCategoryName, targetPrices, targetMemberPrices }) => {
      type JsonRecord = Record<string, unknown>;

      const jsonHeaders = { 'Content-Type': 'application/json' };
      const isRecord = (value: unknown): value is JsonRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      const asArray = (value: unknown): JsonRecord[] => (Array.isArray(value) ? value.filter(isRecord) : []);
      const firstNumber = (...values: unknown[]) => values.find((value): value is number => typeof value === 'number');
      const idsFrom = (values: unknown): number[] => asArray(values)
        .map((value) => firstNumber(value.id))
        .filter((value): value is number => typeof value === 'number');
      const readJson = async (url: string) => {
        const response = await fetch(url, { credentials: 'same-origin' });
        if (!response.ok) {
          throw new Error(`GET ${url} failed: ${response.status} ${await response.text()}`);
        }
        return response.json();
      };
      const candidateItems = (category: JsonRecord): JsonRecord[] => [
        ...asArray(category.menuItems),
        ...asArray(category.menuSaleItems),
        ...asArray(category.saleItems),
        ...asArray(category.items),
        ...asArray(category.dishes),
      ];
      const normalizeItemPayload = (item: JsonRecord, categoryId: number, reportGroupId: number): JsonRecord => {
        const itemName = typeof item.name === 'string' ? item.name : '';
        return {
          ...item,
          id: item.id ?? '',
          name: itemName,
          nameCh: item.nameCh ?? itemName,
          posName: item.posName ?? itemName,
          shortName: item.shortName ?? itemName,
          description: item.description ?? '',
          thumbPath: item.thumbPath ?? '',
          displayPriority: item.displayPriority ?? '',
          color: item.color ?? 'FFC314',
          price: String(targetPrices[itemName] ?? item.price ?? '0'),
          benefitPrice: String(targetMemberPrices[itemName] ?? item.benefitPrice ?? ''),
          outOfStock: Boolean(item.outOfStock),
          marketPriceItem: Boolean(item.marketPriceItem),
          takeoutTaxFree: Boolean(item.takeoutTaxFree),
          sendToKitchenRequired: Boolean(item.sendToKitchenRequired),
          hiddenItem: Boolean(item.hiddenItem),
          baseWeight: item.baseWeight ?? '',
          ktvItem: Boolean(item.ktvItem),
          itemNumber: item.itemNumber ?? '',
          numOfItemOptionAllowed: item.numOfItemOptionAllowed ?? '0',
          itemType: item.itemType ?? 'SALE_ITEM',
          categoryId,
          reportGroupId: item.reportGroupId ?? String(reportGroupId),
          defaultItemSizeId: item.defaultItemSizeId ?? -1,
          itemPrices: item.itemPrices ?? [],
          options: item.options ?? [],
          comboType: item.comboType ?? '',
          displayMode: item.displayMode ?? '',
          comboSections: item.comboSections ?? [],
          printerIds: item.printerIds ?? idsFrom(item.printers),
          properties: item.properties ?? [],
          optionFullScreen: Boolean(item.optionFullScreen),
          changeAllCombo: item.changeAllCombo ?? true,
          itemComponentAdded: Boolean(item.itemComponentAdded),
          itemComponentAssocDTOList: item.itemComponentAssocDTOList ?? [],
          customTax: item.customTax ?? true,
          taxIds: item.taxIds ?? idsFrom(item.taxes),
        };
      };

      const menuResponse = await readJson('/kpos/webapp/menu/menu/1?expandMenuLevel=1&showInactive=true&showOption=false');
      const group = asArray(menuResponse?.menu?.menuGroups).find((candidate) => candidate.name === targetGroupName);
      const groupId = firstNumber(group?.id);
      if (!group || !groupId) {
        throw new Error(`Live POS menu group ${targetGroupName} not found`);
      }
      let category = asArray(group.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      if (!category) {
        const groupResponse = await readJson(`/kpos/webapp/menu/menuGroup/${groupId}?expandMenuLevel=1&showInactive=true&showOption=false`);
        category = asArray(groupResponse?.group?.menuCategories).find((candidate) => candidate.name === targetCategoryName);
      }
      const categoryId = firstNumber(category?.id);
      if (!category || !categoryId) {
        throw new Error(`Live POS category ${targetGroupName}/${targetCategoryName} not found`);
      }
      const categoryResponse = await readJson(`/kpos/webapp/menu/menuCategory/${categoryId}?expandMenuLevel=1&showInactive=true&showOption=false`)
        .catch(() => undefined);
      const categoryDetail = isRecord(categoryResponse?.menuCategory) ? categoryResponse.menuCategory : category;
      const items = candidateItems(categoryDetail);
      const targetItemNames = Array.from(new Set([...Object.keys(targetPrices), ...Object.keys(targetMemberPrices)]));
      for (const itemName of targetItemNames) {
        const item = items.find((candidate) => candidate.name === itemName);
        if (!item?.id) {
          throw new Error(`Live menu item ${targetGroupName}/${targetCategoryName}/${itemName} not found`);
        }
        const payload = normalizeItemPayload(item, categoryId, groupId);
        const candidates = [
          { method: 'PUT', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
          { method: 'PUT', url: '/kpos/webapp/menu/menuSaleItem/' },
          { method: 'POST', url: `/kpos/webapp/menu/menuSaleItem/${item.id}` },
        ];
        const errors: string[] = [];
        let saved = false;
        for (const candidate of candidates) {
          const response = await fetch(candidate.url, {
            method: candidate.method,
            headers: jsonHeaders,
            credentials: 'same-origin',
            body: JSON.stringify(payload),
          });
          if (response.ok) {
            saved = true;
            break;
          }
          errors.push(`${candidate.method} ${candidate.url}: ${response.status} ${await response.text()}`);
        }
        if (!saved) {
          throw new Error(`Live item price update failed for ${itemName}: ${errors.join(' | ')}`);
        }
      }
      await readJson('/kpos/webapp/menu/menu?product=POS');
    }, {
      targetGroupName: groupName,
      targetCategoryName: categoryName,
      targetPrices: { ...prices },
      targetMemberPrices: { ...memberPrices },
    });
  }

  private async clearLiveProductGroup(productLine: string, groupName: string): Promise<void> {
    await this.openLiveProductLine(productLine);
    const groupLink = this.liveMenuGroupLink(groupName);
    if (!(await groupLink.isVisible({ timeout: 5_000 }).catch(() => false))) {
      return;
    }
    await groupLink.click();
    await this.liveMenuGroupCheckbox(groupName).click();
    await this.clickLiveInnerVisibleText('delete');
    const confirmDeleteButton = this.liveInnerFrame.locator('xpath=//footer//button[normalize-space(.)="Delete"]').first();
    if (await confirmDeleteButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
      await confirmDeleteButton.click();
    }
    const okButton = this.liveInnerFrame.locator('xpath=//button[normalize-space(.)="OK"]').first();
    if (await okButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
      await okButton.click();
    }
    await waitUntil(
      async () => !(await this.liveMenuGroupCheckbox(groupName).isVisible().catch(() => false)),
      {
        description: `live ${productLine} ${groupName} 清理完成`,
        intervalMs: 500,
        timeoutMs: 60_000,
      },
    ).catch(() => undefined);
  }

  private async copyLiveGroupToProductLine(
    sourceProductLine: string,
    groupName: string,
    targetProductLine: string,
  ): Promise<void> {
    await this.openLiveProductLine(sourceProductLine);
    await this.liveMenuGroupCheckbox(groupName).click();
    await this.clickLiveInnerVisibleText('copy');
    await this.clickLiveInnerVisibleText('Copy To Specific Menu');
    await this.liveInnerFrame.locator('xpath=//*[contains(normalize-space(.),"They would be copied to")]/../../section/div').first().click();
    await this.liveInnerFrame
      .locator(`xpath=//*[contains(normalize-space(.),"They would be copied to")]/../../descendant::li[normalize-space(.)=${xpathText(targetProductLine)}]`)
      .first()
      .click();
    await this.page.locator('[role="alertdialog"] button', { hasText: 'Save' }).click();
    await expect(this.liveInnerFrame.locator('.mdc-snackbar__text').first()).toBeVisible({ timeout: 30_000 });
  }

  private async readLiveGroupCategoryCount(productLine: string, groupName: string): Promise<number> {
    await this.openLiveProductLine(productLine);
    const groupLink = this.liveMenuGroupLink(groupName);
    await expect(groupLink).toBeVisible({ timeout: 30_000 });
    await groupLink.click();
    await expect(this.liveInnerFrame.locator(`xpath=//span[normalize-space(.)=${xpathText(groupName)}]`).first()).toBeVisible({
      timeout: 30_000,
    });
    return this.liveInnerFrame
      .locator(`xpath=//span[normalize-space(.)=${xpathText(groupName)}]/../../../../div[2]/div`)
      .count();
  }

  private async readLiveMenuItemCount(productLine: string): Promise<number> {
    const productLineLabel = productLine.endsWith('Menu') ? productLine : `${productLine} Menu`;
    const productLineText = this.liveInnerFrame
      .locator(`xpath=//*[contains(normalize-space(.),${xpathText(productLineLabel)}) and contains(normalize-space(.),"item")]`)
      .first();
    await this.openLiveAdminTile('#admstMenu', productLineText);
    await expect(productLineText).toBeVisible({ timeout: 30_000 });
    const text = ((await productLineText.textContent()) ?? '').trim();
    const count = Number(text.match(/\((\d+)\s+items?\)/i)?.[1] ?? text.match(/\d+/)?.[0] ?? '0');
    if (!count) {
      throw new Error(`Live ${productLineLabel} item count was not found in "${text}"`);
    }
    return count;
  }

  private async enterLiveGlobalOptionCategory(group: string, category: string): Promise<void> {
    await this.openLiveProductLine('POS Menu');
    const groupLink = this.liveMenuGroupLink(group);
    await expect(groupLink).toBeVisible({ timeout: 30_000 });
    await groupLink.click();
    const categoryLink = this.liveInnerFrame.locator(`xpath=//span[normalize-space(.)=${xpathText(category)}]`).first();
    await expect(categoryLink).toBeVisible({ timeout: 30_000 });
    await categoryLink.click();
    await expect(this.liveInnerFrame.getByRole('button', { name: /\+ Create New/i })).toBeVisible({ timeout: 30_000 });
  }

  private async createLiveGlobalOption(optionName: string, optionPrice: number): Promise<string> {
    const existingRow = this.liveGlobalOptionRow(optionName);
    if (await existingRow.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return optionName;
    }

    await this.liveInnerFrame.locator('xpath=//div[contains(@class,"category")]/button[1]').first().click();
    const itemNameInput = this.liveInnerFrame.locator('xpath=//div[contains(@class,"mdc-textfield")]/input').first();
    await expect(itemNameInput).toBeVisible({ timeout: 10_000 });
    await itemNameInput.fill(optionName);
    const priceInput = this.liveInnerFrame.locator('xpath=//label[normalize-space(.)="Default Price"]/../input').first();
    await expect(priceInput).toBeVisible({ timeout: 10_000 });
    await priceInput.fill(String(optionPrice));
    await this.liveInnerFrame.locator('xpath=//div[@class="mdl-mini-footer__right-section"]/button[2]').first().click();
    const confirmSaveButton = this.page.locator('[role="alertdialog"] button', { hasText: 'Save' }).first();
    if (await confirmSaveButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await confirmSaveButton.click();
    }
    const backToListButton = this.liveInnerFrame.locator('xpath=//footer[@class="dialog-ft"]/button[2]').first();
    if (await backToListButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
      await backToListButton.click();
    }
    await expect(this.liveGlobalOptionRow(optionName)).toBeVisible({ timeout: 30_000 });
    return optionName;
  }

  private async selectLiveGlobalOption(optionName: string): Promise<void> {
    const checkbox = this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(optionName)}]/../../div[1]`).first();
    await expect(checkbox).toBeVisible({ timeout: 30_000 });
    await checkbox.click();
  }

  private async addPrinterToLiveSelectedGlobalOption(printerName: string): Promise<void> {
    await this.liveInnerFrame.locator('xpath=//button[contains(normalize-space(.),"+ Edit")]').first().click();
    const addPrinterOption = this.liveInnerFrame.locator('xpath=//li[normalize-space(.)="Add Printer"]').first();
    await expect(addPrinterOption).toBeVisible({ timeout: 10_000 });
    await addPrinterOption.click();
    const printerOption = this.liveInnerFrame
      .locator(`xpath=//div[@class="printers"]//label[contains(normalize-space(.),${xpathText(printerName)})]`)
      .first();
    await expect(printerOption).toBeVisible({ timeout: 10_000 });
    await printerOption.click();
    await this.liveInnerFrame.locator('xpath=//button[normalize-space(.)="Save"]').last().click();
    await expect(addPrinterOption).toBeHidden({ timeout: 30_000 }).catch(() => undefined);
  }

  private async readLiveGlobalOptionPrinters(optionName: string): Promise<string[]> {
    const printerSpans = this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(optionName)}]/../../div[6]//span`);
    await expect(this.liveGlobalOptionRow(optionName)).toBeVisible({ timeout: 30_000 });
    return (await printerSpans.allTextContents()).map((printer) => printer.trim()).filter(Boolean);
  }

  private async deleteLiveGlobalOption(optionName: string): Promise<void> {
    if (!(await this.liveGlobalOptionRow(optionName).isVisible({ timeout: 2_000 }).catch(() => false))) {
      return;
    }
    await this.selectLiveGlobalOption(optionName);
    await this.liveInnerFrame.locator('xpath=//div[contains(@class,"category")]/button[normalize-space(.)="Delete"]').first().click();
    const confirmDeleteButton = this.liveInnerFrame.locator('xpath=//footer/button[normalize-space(.)="Delete"]').first();
    if (await confirmDeleteButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
      await confirmDeleteButton.click();
    }
    await expect(this.liveGlobalOptionRow(optionName)).toBeHidden({ timeout: 30_000 }).catch(() => undefined);
  }

  private liveGlobalOptionRow(optionName: string): Locator {
    return this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(optionName)}]/../..`).first();
  }

  private async openLiveProductLine(productLine: string): Promise<void> {
    await this.openLiveAdminTile('#admstMenu', this.liveInnerFrame.locator(`xpath=//span[contains(normalize-space(.),${xpathText(productLine)})]`).first());
    const productExpand = this.liveInnerFrame.locator(`xpath=//span[contains(normalize-space(.),${xpathText(productLine)})]/../div/span`).first();
    await expect(productExpand).toBeVisible({ timeout: 30_000 });
    await productExpand.click();
    await waitUntil(
      async () => (await this.liveInnerFrame.locator(`xpath=//span[contains(normalize-space(.),${xpathText(productLine)})]/../../../following-sibling::*`).first().isVisible().catch(() => false)),
      {
        description: `live ${productLine} 菜单展开`,
        intervalMs: 500,
        timeoutMs: 30_000,
      },
    ).catch(() => undefined);
  }

  private liveMenuGroupLink(groupName: string): Locator {
    return this.liveInnerFrame.locator(`xpath=//a[normalize-space(.)=${xpathText(groupName)}]`).first();
  }

  private liveMenuGroupCheckbox(groupName: string): Locator {
    return this.liveInnerFrame
      .locator(`xpath=//*[normalize-space(.)=${xpathText(groupName)}]/../preceding-sibling::div[@class="checkColumn"]`)
      .first();
  }

  private async clickLiveInnerVisibleText(targetText: string): Promise<void> {
    const clicked = await this.liveInnerFrame.locator('body').evaluate((body, text) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const normalizedTargetText = text.toLowerCase();
      const target = Array.from(body.querySelectorAll<HTMLElement>('button, div, span, a'))
        .filter(visible)
        .find((element) => (element.textContent ?? '').replace(/\s+/g, ' ').trim().toLowerCase().includes(normalizedTargetText));
      if (!target) {
        return false;
      }
      target.click();
      return true;
    }, targetText);
    if (!clicked) {
      throw new Error(`Live admin visible text not found: ${targetText}`);
    }
  }

  private async expandLiveMenuScope(labelText: string): Promise<void> {
    const scope = this.liveInnerFrame.locator(`xpath=//*[normalize-space(.)=${xpathText(labelText)}]/ancestor::div[4]`).first();
    await expect(scope).toBeVisible({ timeout: 30_000 });
    await scope.scrollIntoViewIfNeeded();
    const toggle = scope.locator('xpath=.//div[@class="toggleIcon"]').first();
    if (await toggle.isVisible({ timeout: 3_000 }).catch(() => false)) {
      const toggleText = ((await toggle.textContent()) ?? '').trim();
      if (toggleText.includes('add')) {
        await toggle.click();
      }
    }
  }

  private async waitForLiveAdminSaveSettled(): Promise<void> {
    const alertSaveButton = this.page.locator('[role="alertdialog"] button', { hasText: 'Save' });
    if (await alertSaveButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await alertSaveButton.click();
    }
    await waitUntil(async () => !(await alertSaveButton.isVisible().catch(() => false)), {
      description: 'Admin 设置保存完成',
      intervalMs: 200,
      timeoutMs: 10_000,
    }).catch(() => undefined);
  }

  private async setLiveStaffEditOrderPrivilege(privilegeId: string, enabled: boolean): Promise<void> {
    const staffRow = this.liveInnerFrame
      .locator('xpath=//li[contains(@id,"staff_") and normalize-space(.)="1"] | //*[@id="staffList"]//tr[td[1][normalize-space(.)="1"]]')
      .first();
    await this.openLiveAdminTile('#admstStaff', staffRow);
    await expect(staffRow).toBeVisible({ timeout: 15_000 });
    await staffRow.click();

    const passcodeInput = this.liveInnerFrame.locator('xpath=//*[@name="passcode"]');
    await expect(passcodeInput).toBeVisible({ timeout: 10_000 });
    await passcodeInput.fill('123');

    await this.liveInnerFrame.locator('body').evaluate(
      (_body, { id, checked }: { id: string; checked: boolean }) => {
        const input = document.getElementById(id);
        if (!(input instanceof HTMLInputElement)) {
          throw new Error(`Live staff privilege ${id} not found`);
        }
        const checkbox = input as HTMLInputElement;
        checkbox.checked = checked;
        checkbox.dispatchEvent(new Event('input', { bubbles: true }));
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
      },
      { id: privilegeId, checked: enabled },
    );

    await this.liveInnerFrame.locator('#save-staff-btn').click();
    await this.waitForLiveAdminSaveSettled();
  }

  private async openLiveAdminTile(tileSelector: string, loadedLocator: Locator): Promise<void> {
    if (await loadedLocator.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return;
    }
    await this.waitForLiveAdminInteractionReady();

    const activeTileSelector = `#admin.ui-page-active ${tileSelector}, #Admin.ui-page-active ${tileSelector}`;
    const tile = this.page.locator(activeTileSelector).first();
    await expect(tile).toBeVisible({ timeout: 10_000 });
    await tile.click();
    if (await loadedLocator.isVisible({ timeout: 5_000 }).catch(() => false)) {
      return;
    }

    await this.page.evaluate((selector) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const tileElement = Array.from(document.querySelectorAll<HTMLElement>(selector)).find(visible) ?? null;
      if (!tileElement) {
        return;
      }
      const activate = (element: HTMLElement) => {
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        jquery?.(element).trigger('vmousedown');
        jquery?.(element).trigger('tap');
        jquery?.(element).trigger('vclick');
        jquery?.(element).trigger('click');
        element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));
        element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true }));
        element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        element.dispatchEvent(new CustomEvent('tap', { bubbles: true, cancelable: true }));
        element.dispatchEvent(new CustomEvent('vclick', { bubbles: true, cancelable: true }));
        element.click();
      };
      for (const child of Array.from(tileElement.querySelectorAll<HTMLElement>('*')).filter(visible)) {
        activate(child);
      }
      for (let target: HTMLElement | null = tileElement; target; target = target.parentElement) {
        if (visible(target)) {
          activate(target);
        }
        if (target.matches('#admin, #Admin, body')) {
          break;
        }
      }
    }, activeTileSelector);
    const fallbackLabel = liveAdminTileFallbackLabel(tileSelector);
    if (fallbackLabel && !(await loadedLocator.isVisible({ timeout: 3_000 }).catch(() => false))) {
      await this.clickVisibleLiveAdminText(fallbackLabel);
    }
    if (tileSelector === '#admstMenu' && !(await loadedLocator.isVisible({ timeout: 3_000 }).catch(() => false))) {
      await this.openLiveMenuAdminRoute();
    }
    await expect(loadedLocator).toBeVisible({ timeout: 20_000 });
  }

  private async waitForLiveAdminInteractionReady(): Promise<void> {
    await waitUntil(
      async () =>
        this.page.evaluate(() => {
          const liveWindow = window as unknown as { fp?: { hideTime?: number } };
          const hideTime = Number(liveWindow.fp?.hideTime ?? 0);
          return !hideTime || Date.now() - hideTime >= 250;
        }).catch(() => true),
      {
        description: 'Admin 卡片点击防抖结束',
        intervalMs: 50,
        timeoutMs: 3_000,
      },
    ).catch(() => undefined);
  }

  private async openLiveMenuAdminRoute(): Promise<void> {
    await this.page.evaluate(() => {
      type LiveWindow = Window & {
        data?: { companyProfile?: { merchantid?: string; merchantgroupid?: string } };
        passPwiptInfo?: () => void;
        innerpage?: { add?: (url: string, mode: number) => void };
      };
      const liveWindow = window as LiveWindow;
      const rawState = sessionStorage.getItem('pwipt') || '{}';
      const state = JSON.parse(rawState) as { thisuser?: { merchant?: { merchantid?: string } } };
      const merchantId = liveWindow.data?.companyProfile?.merchantid ?? liveWindow.data?.companyProfile?.merchantgroupid;
      if (merchantId) {
        state.thisuser = state.thisuser ?? {};
        state.thisuser.merchant = { merchantid: merchantId };
        sessionStorage.setItem('pwipt', JSON.stringify(state));
      }
      liveWindow.passPwiptInfo?.();
      liveWindow.innerpage?.add?.('menu/index.html', 1);
    });
  }

  private async closeLiveSettingsAndReturnHome(): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (await this.liveSettingsCloseButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.liveSettingsCloseButton.click({ timeout: 2_000 }).catch(async () => {
          await this.liveSettingsCloseButton.evaluate((element) => (element as HTMLElement).click());
        });
      }
      const confirmCloseButton = this.liveConfirmCloseButton
        .or(this.page.locator('.objBxBtn, #innerpgclsyes, div, span').filter({ hasText: /^Close$/ }).last())
        .first();
      if (await confirmCloseButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await confirmCloseButton.click();
      }
      if (!(await this.liveSettingsCloseButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        break;
      }
    }
    if (await this.liveAdminBackButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await this.liveAdminBackButton.click();
    }
  }

  private async clickVisibleLiveAdminText(text: string): Promise<void> {
    const aliases: Record<string, string[]> = {
      Language: ['Language', '多语言'],
      Menu: ['Menu', '菜单编辑'],
      Staff: ['Staff', '员工'],
    };
    for (const candidate of aliases[text] ?? [text]) {
      const frameText = this.liveInnerFrame.getByText(candidate, { exact: true }).first();
      if (await frameText.isVisible({ timeout: 500 }).catch(() => false)) {
        await frameText.click();
        return;
      }
    }

    const clicked = await this.page
      .evaluate((targetText) => {
        const aliases: Record<string, string[]> = {
          Language: ['Language', '多语言'],
          Menu: ['Menu', '菜单编辑'],
          Staff: ['Staff', '员工'],
        };
        const targetTexts = aliases[targetText] ?? [targetText];
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const candidates = Array.from(document.querySelectorAll<HTMLElement>('*'))
          .filter((element) => {
            const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            return visible(element) && targetTexts.some((candidate) => text === candidate || text.endsWith(` ${candidate}`));
          })
          .sort((left, right) => {
            const leftText = left.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            const rightText = right.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            if (leftText === targetText && rightText !== targetText) {
              return -1;
            }
            if (leftText !== targetText && rightText === targetText) {
              return 1;
            }
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const textElement = candidates[0] ?? null;
        if (!textElement) {
          return false;
        }
        const jquery = (window as unknown as { $?: (element: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        let clickable: HTMLElement | null = textElement;
        for (let level = 0; clickable && level < 8; level += 1) {
          if (visible(clickable)) {
            jquery?.(clickable).trigger('tap');
            jquery?.(clickable).trigger('click');
            clickable.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
            clickable.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
            clickable.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
            clickable.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
            clickable.click();
          }
          clickable = clickable.parentElement;
        }
        return candidates.length > 0;
      }, text)
      .catch(() => false);
    if (!clicked) {
      throw new Error(`Live Admin 未找到可点击文本 ${text}`);
    }
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

function xpathText(text: string): string {
  if (!text.includes('"')) {
    return `"${text}"`;
  }
  if (!text.includes("'")) {
    return `'${text}'`;
  }
  return `concat(${text.split('"').map((part) => `"${part}"`).join(', \'"\', ')})`;
}

function liveAdminTileFallbackLabel(tileSelector: string): string {
  if (tileSelector === '#admstMenu') {
    return 'Menu';
  }
  if (tileSelector === '#admstStaff') {
    return 'Staff';
  }
  if (tileSelector === '#admstLanguage') {
    return 'Language';
  }
  return '';
}
