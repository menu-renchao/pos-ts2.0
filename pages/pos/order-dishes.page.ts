import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class OrderDishesPage extends PageObject {
  private readonly menuCategories: Locator;
  private readonly menuGroups: Locator;
  private readonly menuItems: Locator;
  private readonly customerInfoPopup: Locator;
  private readonly customerNameInput: Locator;
  private readonly customerPhoneInput: Locator;
  private readonly customerSubmitButton: Locator;
  private readonly openFoodCategory: Locator;
  private readonly orderRoot: Locator;
  private readonly currentCategoryName: Locator;
  private readonly itemDiscountButton: Locator;
  private readonly itemHalfDiscountButton: Locator;
  private readonly itemPrice: Locator;
  private readonly itemPriceInput: Locator;
  private readonly itemPriceSubmitButton: Locator;
  private readonly itemQuantityInput: Locator;
  private readonly itemQuantitySubmitButton: Locator;
  private readonly unitPriceInput: Locator;
  private readonly unitPriceSubmitButton: Locator;
  private readonly itemTax: Locator;
  private readonly comboOptionCount: Locator;
  private readonly globalOptionArea: Locator;
  private readonly globalOptionCountInput: Locator;
  private readonly globalOptionCountSubmitButton: Locator;
  private readonly globalOptionListAddButton: Locator;
  private readonly globalOptionListCount: Locator;
  private readonly globalOptionListCountButton: Locator;
  private readonly globalOptionListReduceButton: Locator;
  private readonly globalOptionNoButton: Locator;
  private readonly deliveryInfoButton: Locator;
  private readonly deliveryInfoRows: Locator;
  private readonly managerPasswordInput: Locator;
  private readonly managerPasswordSubmitButton: Locator;
  private readonly modifyNoteInput: Locator;
  private readonly modifyNotePriceInput: Locator;
  private readonly modifySaveButton: Locator;
  private readonly openFoodNameInput: Locator;
  private readonly openFoodNoTaxButton: Locator;
  private readonly openFoodPriceInput: Locator;
  private readonly openFoodButton: Locator;
  private readonly openFoodKeyboardLanguage: Locator;
  private readonly openFoodKeyboardSubmitButton: Locator;
  private readonly openFoodKeyboardTextInput: Locator;
  private readonly orderInventoryButton: Locator;
  private readonly orderItemName: Locator;
  private readonly orderCurrentQuickCombo: Locator;
  private readonly orderItemCount: Locator;
  private readonly orderLineItems: Locator;
  private readonly orderGuestNameInput: Locator;
  private readonly orderOptions: Locator;
  private readonly orderReward: Locator;
  private readonly orderDiscountButton: Locator;
  private readonly orderDiscountWholeOrderPrice: Locator;
  private readonly orderExitButton: Locator;
  private readonly orderModifyButton: Locator;
  private readonly orderCharge20Button: Locator;
  private readonly orderChargeZeroButton: Locator;
  private readonly orderChargeLabel: Locator;
  private readonly orderChargePrice: Locator;
  private readonly pickupButton: Locator;
  private readonly pickupInfoSubmitButton: Locator;
  private readonly saveOrderButton: Locator;
  private readonly saveOrderAlert: Locator;
  private readonly sendKitchenButton: Locator;
  private readonly settleButton: Locator;
  private readonly settleCashButton: Locator;
  private readonly settleBackupCardButton: Locator;
  private readonly settleCardAlert: Locator;
  private readonly settleCardSearchButton: Locator;
  private readonly settleCreditButton: Locator;
  private readonly settleGiftCardButton: Locator;
  private readonly settleLoyaltyCardButton: Locator;
  private readonly settlePayAmountInput: Locator;
  private readonly settlePayBarActions: Locator;
  private readonly settleSelfCardButton: Locator;
  private readonly settleTipInput: Locator;
  private readonly settleEvenPayButton: Locator;
  private readonly settleTotal: Locator;
  private readonly settleUnpaidAmount: Locator;
  private readonly settleSelectMemberButton: Locator;
  private readonly settleSwitchMemberButton: Locator;
  private readonly settleApplyMemberButton: Locator;
  private readonly splitCombineButton: Locator;
  private readonly splitEvenButton: Locator;
  private readonly subOptions: Locator;
  private readonly subtotal: Locator;
  private readonly searchClearButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchResult: Locator;
  private readonly searchResultItems: Locator;
  private readonly tipInput: Locator;
  private readonly tipToast: Locator;
  private readonly reduceItemButton: Locator;
  private readonly voidItemButton: Locator;
  private readonly comboItemButton: Locator;
  private readonly comboSubItemEditNoteButton: Locator;
  private readonly comboSubItemNoteInput: Locator;
  private readonly comboSubItemNoteText: Locator;
  private readonly comboFirstSubItemButton: Locator;
  private readonly comboOptionReduceButton: Locator;
  private readonly comboSubItems: Locator;
  private readonly comboSubItemPriceInput: Locator;
  private readonly comboSubItemPriceSubmitButton: Locator;
  private readonly comboSubItemEditPriceButton: Locator;
  private readonly comboSubItemChoices: Locator;

  constructor(page: Page) {
    super(page);
    this.menuCategories = page.getByTestId('order-menu-category');
    this.menuGroups = page.getByTestId('order-menu-group');
    this.menuItems = page.getByTestId('order-menu-item');
    this.customerInfoPopup = page.getByTestId('customer-info-popup');
    this.customerNameInput = page.getByTestId('customer-name');
    this.customerPhoneInput = page.getByTestId('customer-phone');
    this.customerSubmitButton = page.getByTestId('customer-submit');
    this.itemDiscountButton = page.getByTestId('item-discount-10');
    this.itemHalfDiscountButton = page.getByTestId('item-discount-50');
    this.itemPrice = page.getByTestId('order-item-price');
    this.itemPriceInput = page.getByTestId('item-price-input');
    this.itemPriceSubmitButton = page.getByTestId('item-price-submit');
    this.itemQuantityInput = page.getByTestId('order-item-quantity');
    this.itemQuantitySubmitButton = page.getByTestId('order-item-quantity-submit');
    this.unitPriceInput = page.getByTestId('order-unit-price-input');
    this.unitPriceSubmitButton = page.getByTestId('order-unit-price-submit');
    this.itemTax = page.getByTestId('order-tax');
    this.comboOptionCount = page.getByTestId('combo-option-count');
    this.globalOptionArea = page.getByTestId('global-option-area');
    this.globalOptionCountInput = page.getByTestId('global-option-count-input');
    this.globalOptionCountSubmitButton = page.getByTestId('global-option-count-submit');
    this.globalOptionListAddButton = page.getByTestId('global-option-list-add');
    this.globalOptionListCount = page.getByTestId('global-option-list-count-value');
    this.globalOptionListCountButton = page.getByTestId('global-option-list-count');
    this.globalOptionListReduceButton = page.getByTestId('global-option-list-reduce');
    this.globalOptionNoButton = page.getByTestId('global-option-no');
    this.deliveryInfoButton = page.getByTestId('order-info');
    this.deliveryInfoRows = page.getByTestId('order-info-row');
    this.managerPasswordInput = page.getByTestId('manager-password');
    this.managerPasswordSubmitButton = page.getByTestId('manager-password-submit');
    this.modifyNoteInput = page.getByTestId('modify-note-name');
    this.modifyNotePriceInput = page.getByTestId('modify-note-price');
    this.modifySaveButton = page.getByTestId('modify-save');
    this.openFoodNameInput = page.getByTestId('open-food-name');
    this.openFoodNoTaxButton = page.getByTestId('open-food-no-tax');
    this.openFoodPriceInput = page.getByTestId('open-food-price');
    this.openFoodButton = page.getByTestId('order-open-food');
    this.openFoodKeyboardLanguage = page.getByTestId('open-food-keyboard-language');
    this.openFoodKeyboardSubmitButton = page.getByTestId('open-food-keyboard-submit');
    this.openFoodKeyboardTextInput = page.getByTestId('open-food-keyboard-text');
    this.orderInventoryButton = page.getByTestId('order-inventory');
    this.orderItemName = page.getByTestId('order-item-name');
    this.orderCurrentQuickCombo = page.getByTestId('order-current-quick-combo');
    this.orderItemCount = page.getByTestId('order-item-count');
    this.orderLineItems = page.getByTestId('order-line-item');
    this.orderGuestNameInput = page.getByTestId('order-guest-name');
    this.orderOptions = page.getByTestId('order-option');
    this.orderReward = page.getByTestId('order-reward');
    this.orderDiscountButton = page.getByTestId('order-discount');
    this.orderDiscountWholeOrderPrice = page.getByTestId('order-discount-whole-order-price');
    this.orderExitButton = page.getByTestId('order-exit');
    this.orderModifyButton = page.getByTestId('order-modify');
    this.orderCharge20Button = page.getByTestId('order-charge-20');
    this.orderChargeZeroButton = page.getByTestId('order-charge-0');
    this.orderChargeLabel = page.getByTestId('order-charge-label');
    this.orderChargePrice = page.getByTestId('order-charge-price');
    this.pickupButton = page.getByTestId('order-pickup');
    this.pickupInfoSubmitButton = page.getByTestId('pickup-info-submit');
    this.openFoodCategory = page.getByTestId('open-food-category');
    this.orderRoot = page.getByTestId('order-page');
    this.currentCategoryName = page.getByTestId('current-category-name');
    this.saveOrderButton = page.getByTestId('order-save');
    this.saveOrderAlert = page.getByTestId('order-save-alert');
    this.sendKitchenButton = page.getByTestId('order-send-kitchen');
    this.settleButton = page.getByTestId('order-settle');
    this.settleCashButton = page.getByTestId('settle-cash');
    this.settleBackupCardButton = page.getByTestId('settle-backup-card');
    this.settleCardAlert = page.getByTestId('settle-card-alert');
    this.settleCardSearchButton = page.getByTestId('settle-card-search');
    this.settleCreditButton = page.getByTestId('settle-credit');
    this.settleGiftCardButton = page.getByTestId('settle-gift-card');
    this.settleLoyaltyCardButton = page.getByTestId('settle-loyalty-card');
    this.settlePayAmountInput = page.getByTestId('settle-pay-amount');
    this.settlePayBarActions = page.getByTestId('settle-pay-bar-action');
    this.settleSelfCardButton = page.getByTestId('settle-self-card');
    this.settleTipInput = page.getByTestId('settle-tip');
    this.settleEvenPayButton = page.getByTestId('settle-even-pay');
    this.settleTotal = page.getByTestId('settle-total');
    this.settleUnpaidAmount = page.getByTestId('settle-unpaid-amount');
    this.settleSelectMemberButton = page.getByTestId('settle-select-member');
    this.settleSwitchMemberButton = page.getByTestId('settle-switch-member');
    this.settleApplyMemberButton = page.getByTestId('settle-apply-member');
    this.splitCombineButton = page.getByTestId('split-combine');
    this.splitEvenButton = page.getByTestId('split-even');
    this.subOptions = page.getByTestId('order-sub-option');
    this.subtotal = page.getByTestId('order-subtotal');
    this.searchClearButton = page.getByTestId('order-search-clear');
    this.searchInput = page.getByTestId('order-search');
    this.searchResult = page.getByTestId('order-search-result');
    this.searchResultItems = page.getByTestId('order-search-result-item');
    this.tipInput = page.getByTestId('order-tip');
    this.tipToast = page.getByTestId('order-tip-toast');
    this.reduceItemButton = page.getByTestId('order-reduce-item');
    this.voidItemButton = page.getByTestId('order-void-item');
    this.comboItemButton = page.getByTestId('order-combo-item');
    this.comboSubItemEditNoteButton = page.getByTestId('combo-edit-note');
    this.comboSubItemNoteInput = page.getByTestId('combo-subitem-note');
    this.comboSubItemNoteText = page.getByTestId('combo-subitem-note-text');
    this.comboFirstSubItemButton = page.getByTestId('combo-first-sub-item');
    this.comboOptionReduceButton = page.getByTestId('combo-option-reduce');
    this.comboSubItems = page.getByTestId('combo-sub-item');
    this.comboSubItemPriceInput = page.getByTestId('combo-subitem-price');
    this.comboSubItemPriceSubmitButton = page.getByTestId('combo-subitem-price-submit');
    this.comboSubItemEditPriceButton = page.getByTestId('combo-subitem-edit-price');
    this.comboSubItemChoices = page.getByTestId('combo-sub-item-choice');
  }

  async readOpenFoodCategoryName(): Promise<string> {
    return step('读取订单页 Open Food 菜品分类名称', async () => {
      await expect(this.orderRoot).toBeVisible();
      return (await this.openFoodCategory.textContent()) ?? '';
    });
  }

  async readCurrentCategoryName(): Promise<string> {
    return step('读取当前点单 Category 名称', async () => {
      await expect(this.orderRoot).toBeVisible();
      return ((await this.currentCategoryName.textContent()) ?? '').trim();
    });
  }

  async readCurrentUrl(): Promise<string> {
    return step('读取当前页面 URL', async () => this.page.url());
  }

  async readMenuGroups(): Promise<string[]> {
    return step('读取点单页面菜单组', async () => {
      await expect(this.orderRoot).toBeVisible();
      return (await this.menuGroups.allTextContents()).map((groupName) => groupName.trim()).filter(Boolean);
    });
  }

  async selectMenuGroup(groupName = ''): Promise<void> {
    await step(`选择点单菜单组 ${groupName}`, async () => {
      if (groupName) {
        await this.menuGroups.filter({ hasText: exactText(groupName) }).click();
      }
    });
  }

  async selectMenuCategory(categoryName: string): Promise<void> {
    await step(`选择点单菜单类别 ${categoryName}`, async () => {
      await this.menuCategories.filter({ hasText: exactText(categoryName) }).click();
    });
  }

  async addMenuItem(itemName: string): Promise<void> {
    await step(`添加点单菜品 ${itemName}`, async () => {
      await this.menuItems.filter({ hasText: exactText(itemName) }).click();
    });
  }

  async isCurrentQuickCombo(): Promise<boolean> {
    return step('判断当前菜品是否为 Quick Combo', async () => {
      return ((await this.orderCurrentQuickCombo.textContent()) ?? '').trim() === 'true';
    });
  }

  async isUnitPriceInputVisible(): Promise<boolean> {
    return step('判断称重菜输入框是否展示', async () => this.unitPriceInput.isVisible());
  }

  async inputUnitPriceAndReadSelectedPrice(unitPriceInput: number): Promise<number> {
    return step(`输入称重菜重量 ${unitPriceInput} 并读取价格`, async () => {
      await this.unitPriceInput.fill(String(unitPriceInput));
      await this.unitPriceSubmitButton.click();
      return this.readSelectedItemPrice();
    });
  }

  async saveOrder(): Promise<void> {
    await step('保存当前订单', async () => {
      await this.saveOrderButton.click();
    });
  }

  async saveOrderAndReadAlert(): Promise<string> {
    return step('保存当前订单并读取提示', async () => {
      await this.saveOrderButton.click();
      return ((await this.saveOrderAlert.textContent()) ?? '').trim();
    });
  }

  async openInventoryPage(): Promise<void> {
    await step('从点单页打开库存页', async () => {
      await this.orderInventoryButton.click();
      await expect(this.page.getByTestId('inventory-page')).toBeVisible();
    });
  }

  async exitOrderPage(): Promise<void> {
    await step('退出当前点单页面', async () => {
      await this.orderExitButton.click();
    });
  }

  async sendAllToKitchen(): Promise<void> {
    await step('发送当前订单到厨房', async () => {
      await this.sendKitchenButton.click();
    });
  }

  async semiSendHoldPrint(): Promise<void> {
    await step('Hold 打印当前订单菜品', async () => {
      await this.page.getByTestId('order-send-hold-print').click();
    });
  }

  async semiSendDelayPrint(): Promise<void> {
    await step('Delay 打印当前订单菜品', async () => {
      await this.page.getByTestId('order-send-delay-print').click();
    });
  }

  async readTax(): Promise<number> {
    return step('读取当前订单税额', async () => Number((await this.itemTax.textContent()) ?? '0'));
  }

  async voidSelectedItemTax(): Promise<void> {
    await step('将当前菜品税额置为 0', async () => {
      await this.page.getByTestId('order-tax-exempt').click();
    });
  }

  async clickSettle(): Promise<void> {
    await step('点击点单页面支付按钮', async () => {
      await this.settleButton.click();
    });
  }

  async clickSettlementSwitchMember(): Promise<void> {
    await step('点击结算页 Switch Member', async () => {
      await this.settleSwitchMemberButton.click();
    });
  }

  async clickSettlementSelectMember(): Promise<void> {
    await step('点击结算页 Select Member', async () => {
      await this.settleSelectMemberButton.click();
    });
  }

  async readSettlementSwitchMemberClass(): Promise<string> {
    return step('读取结算页 Switch Member 状态', async () => (await this.settleSwitchMemberButton.getAttribute('class')) ?? '');
  }

  async readSettlementTotal(): Promise<number> {
    return step('读取结算页订单总额', async () => Number((await this.settleTotal.textContent()) ?? '0'));
  }

  async readSettlementUnpaidAmount(): Promise<number> {
    return step('读取结算页未付金额', async () => Number((await this.settleUnpaidAmount.textContent()) ?? '0'));
  }

  async modifySettlementPaymentAmount(amountInCents: number): Promise<void> {
    await step(`修改结算页本次支付金额为 ${amountInCents}`, async () => {
      await this.settlePayAmountInput.fill(String(amountInCents));
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
  }

  async addSettlementTip(amountInCents: number): Promise<void> {
    await step(`结算页添加小费 ${amountInCents}`, async () => {
      await this.settleTipInput.fill(String(amountInCents));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.settleTipInput.press('Enter');
    });
  }

  async clickCashTenderAndReadPayActionOrder(): Promise<string[]> {
    return step('点击现金全额并读取付款按钮顺序', async () => {
      await this.settleCashButton.click();
      return (await this.settlePayBarActions.allTextContents()).map((text) => text.trim()).filter(Boolean);
    });
  }

  async searchGiftCardWithoutInfoAndReadAlert(): Promise<string> {
    return step('礼品卡空条件查询并读取提示', async () => {
      await this.settleGiftCardButton.click();
      await this.settleCardSearchButton.click();
      return ((await this.settleCardAlert.textContent()) ?? '').trim();
    });
  }

  async searchLoyaltyCardWithoutInfoAndReadAlert(): Promise<string> {
    return step('会员卡空条件查询并读取提示', async () => {
      await this.settleLoyaltyCardButton.click();
      await this.settleCardSearchButton.click();
      return ((await this.settleCardAlert.textContent()) ?? '').trim();
    });
  }

  async applySettlementMember(): Promise<void> {
    await step('确认结算页会员选择', async () => {
      await this.settleApplyMemberButton.click();
    });
  }

  async splitPaymentEvenly(parts: number): Promise<void> {
    await step(`结算页按 ${parts} 份平分支付`, async () => {
      await this.settleEvenPayButton.click();
    });
  }

  async isCustomerInfoPopupVisible(): Promise<boolean> {
    return step('判断客户信息弹框是否展示', async () => this.customerInfoPopup.isVisible());
  }

  async submitCustomerInfo(name = '', phone = ''): Promise<void> {
    await step('提交点单客户信息', async () => {
      await this.customerNameInput.fill(name);
      await this.customerPhoneInput.fill(phone);
      await this.customerSubmitButton.click();
    });
  }

  async voidSelectedItem(): Promise<void> {
    await step('尝试删除当前点单菜品', async () => {
      await this.voidItemButton.click();
    });
  }

  async voidSelectedItemAndReadToast(): Promise<string> {
    return step('尝试删除当前点单菜品并读取权限提示', async () => {
      await this.voidItemButton.click();
      return ((await this.tipToast.textContent()) ?? '').trim();
    });
  }

  async changeSelectedItemQuantityAndReadToast(quantity: number): Promise<string> {
    return step(`修改当前菜品数量为 ${quantity} 并读取权限提示`, async () => {
      await this.itemQuantityInput.fill(String(quantity));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemQuantitySubmitButton.click();
      return ((await this.tipToast.textContent()) ?? '').trim();
    });
  }

  async submitManagerPassword(password: string): Promise<void> {
    await step('输入经理密码并确认权限', async () => {
      await this.managerPasswordInput.fill(password);
      await this.managerPasswordSubmitButton.click();
    });
  }

  async readSelectedItemPrice(): Promise<number> {
    return step('读取当前菜品价格', async () => Number((await this.itemPrice.textContent()) ?? '0'));
  }

  async readSelectedOrderItem(): Promise<{ name: string; price: number }> {
    return step('读取当前已点菜品名称和价格', async () => {
      await expect(this.orderItemName).toBeVisible();
      return {
        name: (await this.orderItemName.textContent()) ?? '',
        price: Number((await this.itemPrice.textContent()) ?? '0'),
      };
    });
  }

  async selectOptions(optionNames: readonly string[] = []): Promise<void> {
    await step(`选择菜品 Option ${optionNames.join(', ') || '无'}`, async () => {
      for (const optionName of optionNames) {
        await this.orderOptions.filter({ hasText: optionName }).click();
      }
    });
  }

  async selectSubOptions(subOptionNames: readonly string[] = []): Promise<void> {
    await step(`选择菜品二级 Option ${subOptionNames.join(', ') || '无'}`, async () => {
      for (const subOptionName of subOptionNames) {
        await this.subOptions.filter({ hasText: subOptionName }).click();
      }
    });
  }

  async applyItemDiscount(): Promise<void> {
    await step('给当前菜品应用单菜折扣', async () => {
      await this.itemDiscountButton.click();
    });
  }

  async applyHalfDiscount(): Promise<void> {
    await step('给当前菜品应用 50% 单菜折扣', async () => {
      await this.itemHalfDiscountButton.click();
    });
  }

  async changeSelectedItemPrice(price: number): Promise<void> {
    await step(`修改当前菜品价格为 ${price}`, async () => {
      await this.itemPriceInput.fill(String(price));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemPriceSubmitButton.click();
    });
  }

  async selectOrderLineItem(index: number): Promise<void> {
    await step(`选择第 ${index} 个订单菜品`, async () => {
      await this.orderLineItems.nth(index - 1).click();
    });
  }

  async changeSelectedItemQuantity(quantity: number): Promise<void> {
    await step(`修改当前菜品数量为 ${quantity}`, async () => {
      await this.itemQuantityInput.fill(String(quantity));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemQuantitySubmitButton.click();
    });
  }

  async readSubtotal(): Promise<number> {
    return step('读取当前订单小计', async () => Number((await this.subtotal.textContent()) ?? '0'));
  }

  async readSubtotalText(): Promise<string> {
    return step('读取当前订单小计文案', async () => ((await this.subtotal.textContent()) ?? '').trim());
  }

  async readRewardText(): Promise<string> {
    return step('读取当前订单 Reward Discount 文案', async () => ((await this.orderReward.textContent()) ?? '').trim());
  }

  async reduceFirstItemToZero(): Promise<void> {
    await step('将当前订单首个菜品数量减少为 0', async () => {
      await this.reduceItemButton.click();
    });
  }

  async reduceSelectedItemQuantity(): Promise<void> {
    await step('减少当前菜品数量', async () => {
      await this.reduceItemButton.click();
    });
  }

  async searchMenuItem(keyword: string): Promise<void> {
    await step(`在点单页搜索菜品 ${keyword}`, async () => {
      await this.searchInput.fill(keyword);
    });
  }

  async readSearchResult(): Promise<string> {
    return step('读取点单页搜索结果', async () => ((await this.searchResult.textContent()) ?? '').trim());
  }

  async readSearchResultCount(): Promise<number> {
    return step('读取点单页搜索结果数量', async () => this.searchResultItems.count());
  }

  async readSearchClass(): Promise<string> {
    return step('读取点单页搜索框状态', async () => (await this.searchInput.getAttribute('class')) ?? '');
  }

  async clearSearch(): Promise<void> {
    await step('清空点单页搜索条件', async () => {
      await this.searchClearButton.click();
    });
  }

  async openGlobalOptionModify(): Promise<void> {
    await step('打开当前菜品的 Global Option Modify 区域', async () => {
      await this.orderItemName.click();
      await this.orderModifyButton.click();
      await this.globalOptionNoButton.click();
    });
  }

  async addGlobalOptionListItem(): Promise<void> {
    await step('点击 Global Option 列表 Add', async () => {
      await this.globalOptionListAddButton.click();
    });
  }

  async addPricedGlobalOptionListItem(): Promise<number> {
    return step('点击带价格的 Global Option 列表 Add 并读取价格', async () => {
      const optionPrice = Number((await this.globalOptionListAddButton.getAttribute('data-price')) ?? '0');
      await this.globalOptionListAddButton.click();
      return optionPrice;
    });
  }

  async setGlobalOptionListCount(count: number): Promise<void> {
    await step(`设置 Global Option 列表数量为 ${count}`, async () => {
      await this.globalOptionListCountButton.click();
      await this.globalOptionCountInput.fill(String(count));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.globalOptionCountSubmitButton.click();
    });
  }

  async reduceGlobalOptionListItem(): Promise<void> {
    await step('点击 Global Option 列表 Reduce', async () => {
      await this.globalOptionListReduceButton.click();
    });
  }

  async isGlobalOptionModifyAreaVisible(): Promise<boolean> {
    return step('判断 Modify Global Option 区域是否展示', async () => this.globalOptionArea.isVisible());
  }

  async readGlobalOptionListCount(): Promise<number> {
    return step('读取 Global Option 列表数量', async () => Number((await this.globalOptionListCount.textContent()) ?? '0'));
  }

  async addModifyNote(name: string, price: number): Promise<void> {
    await step('在 Modify 中添加菜品备注', async () => {
      await this.modifyNoteInput.fill(name);
      await this.modifyNotePriceInput.fill(String(price));
      await this.modifySaveButton.click();
    });
  }

  async addTip(amount: number): Promise<void> {
    await step(`给订单添加小费 ${amount}`, async () => {
      await this.tipInput.fill(String(amount));
      await this.tipInput.press('Enter');
    });
  }

  async addTipAndReadToast(amount: number): Promise<string> {
    return step(`给订单添加小费 ${amount} 并读取提示`, async () => {
      await this.tipInput.fill(String(amount));
      await this.tipInput.press('Enter');
      return ((await this.tipToast.textContent()) ?? '').trim();
    });
  }

  async applyOrderCharge(rate: '0%' | '20%'): Promise<void> {
    await step(`应用整单按比例加收 ${rate}`, async () => {
      if (rate === '0%') {
        await this.orderChargeZeroButton.click();
        return;
      }
      if (rate !== '20%') {
        throw new Error(`Unsupported offline order charge rate: ${rate}`);
      }
      await this.orderCharge20Button.click();
    });
  }

  async openDiscountAndReadWholeOrderPrice(): Promise<string> {
    return step('打开折扣界面并读取整单金额', async () => {
      await this.orderDiscountButton.click();
      return ((await this.orderDiscountWholeOrderPrice.textContent()) ?? '').trim();
    });
  }

  async readChargeLabel(): Promise<string> {
    return step('读取整单加收名称', async () => ((await this.orderChargeLabel.textContent()) ?? '').trim());
  }

  async readChargePrice(): Promise<string> {
    return step('读取整单加收金额', async () => ((await this.orderChargePrice.textContent()) ?? '').trim());
  }

  async readItemCount(): Promise<string> {
    return step('读取点单菜品总数量', async () => ((await this.orderItemCount.textContent()) ?? '').trim());
  }

  async readOrderLineCount(): Promise<number> {
    return step('读取点单菜品行数', async () => this.orderLineItems.count());
  }

  async isOrderItemOptionListVisible(): Promise<boolean> {
    return step('判断当前菜品 option 列表是否展示', async () => this.page.getByTestId('order-options').isVisible());
  }

  async isMenuItemVisible(itemName: string): Promise<boolean> {
    return step(`判断菜单菜品 ${itemName} 是否展示`, async () => this.menuItems.filter({ hasText: exactText(itemName) }).isVisible());
  }

  async readFirstItemQuantity(): Promise<string> {
    return step('读取点单首行菜品数量', async () => (await this.orderLineItems.first().getAttribute('data-quantity')) ?? '');
  }

  async readOrderLineQuantity(index: number): Promise<string> {
    return step(`读取点单第 ${index} 行菜品数量`, async () => (await this.orderLineItems.nth(index - 1).getAttribute('data-quantity')) ?? '');
  }

  async readOrderLinePrice(index: number): Promise<number> {
    return step(`读取点单第 ${index} 行菜品价格`, async () =>
      Number((await this.orderLineItems.nth(index - 1).getAttribute('data-price')) ?? '0'),
    );
  }

  async readFirstItemName(): Promise<string> {
    return step('读取点单首行菜品名称', async () => ((await this.orderLineItems.first().textContent()) ?? '').trim());
  }

  async readFirstItemColor(): Promise<string> {
    return step('读取点单首行菜品颜色', async () => (await this.orderLineItems.first().getAttribute('data-color')) ?? '');
  }

  async fillGuestName(name: string): Promise<void> {
    await step(`填写点单客名 ${name}`, async () => {
      await this.orderGuestNameInput.fill(name);
    });
  }

  async splitEvenly(parts: number): Promise<void> {
    await step(`按 ${parts} 份平分订单`, async () => {
      await this.splitEvenButton.click();
    });
  }

  async combineSplitOrders(): Promise<void> {
    await step('合并已拆分子单', async () => {
      await this.splitCombineButton.click();
    });
  }

  async openFoodWithoutTax(name: string, price: number): Promise<void> {
    await step('创建无税 Open Food 菜品', async () => {
      await this.openFoodNameInput.fill(name);
      await this.openFoodPriceInput.fill(String(price));
      await this.openFoodNoTaxButton.click();
    });
  }

  async createOpenFoodWithKeyboard(language: string, expectedText: string): Promise<string> {
    return step('使用多语言键盘创建 Open Food 菜品', async () => {
      await this.openFoodButton.click();
      await this.openFoodKeyboardLanguage.selectOption(language);
      await this.openFoodKeyboardTextInput.fill(expectedText);
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.openFoodKeyboardSubmitButton.click();
      return (await this.orderItemName.textContent()) ?? '';
    });
  }

  async readDeliveryInfo(): Promise<string[]> {
    return step('读取点单页 Delivery Info 信息', async () => {
      await this.deliveryInfoButton.click();
      return (await this.deliveryInfoRows.allTextContents()).map((value) => value.trim());
    });
  }

  async addComboWithOptions(optionCount: number): Promise<void> {
    await step(`添加包含 ${optionCount} 个 Option 的 Combo`, async () => {
      await this.comboItemButton.click();
    });
  }

  async addQuickCombo(comboName: string): Promise<void> {
    await step(`添加 Quick Combo ${comboName}`, async () => {
      await this.comboItemButton.click();
    });
  }

  async selectOrderedComboSubItem(comboName: string, subItemName: string): Promise<void> {
    await step(`选择套餐 ${comboName} 子菜 ${subItemName}`, async () => {
      await this.comboSubItems.filter({ hasText: exactText(subItemName) }).click();
    });
  }

  async replaceComboSubItems(comboName: string, subItemNames: readonly string[]): Promise<void> {
    await step(`替换套餐 ${comboName} 子菜为 ${subItemNames.join(', ')}`, async () => {
      for (const subItemName of subItemNames) {
        await this.comboSubItemChoices.filter({ hasText: exactText(subItemName) }).click();
      }
    });
  }

  async editSelectedComboSubItemPrice(priceInput: string): Promise<void> {
    await step(`修改已选套餐子菜价格为 ${priceInput}`, async () => {
      await expect(this.comboSubItemEditPriceButton).toBeEnabled();
      await this.comboSubItemPriceInput.fill(priceInput);
      await this.comboSubItemPriceSubmitButton.click();
    });
  }

  async selectedComboSubItemSupportsEditPrice(): Promise<boolean> {
    return step('判断已选套餐子菜是否支持改价', async () => this.comboSubItemEditPriceButton.isEnabled());
  }

  async reduceComboOption(): Promise<void> {
    await step('减少 Combo 子菜 Option', async () => {
      await this.comboOptionReduceButton.click();
    });
  }

  async openFirstComboSubItem(): Promise<void> {
    await step('打开 Combo 第一个子菜', async () => {
      await this.comboFirstSubItemButton.click();
    });
  }

  async clickComboSubItemEditNoteAndReadToast(): Promise<string> {
    return step('点击 Combo 子菜 Edit Note 并读取权限提示', async () => {
      await this.comboSubItemEditNoteButton.click();
      return ((await this.tipToast.textContent()) ?? '').trim();
    });
  }

  async inputComboSubItemNote(note: string): Promise<void> {
    await step('输入 Combo 子菜备注', async () => {
      await this.comboSubItemNoteInput.fill(note);
      await this.comboSubItemNoteInput.press('Enter');
    });
  }

  async readComboSubItemNote(): Promise<string> {
    return step('读取 Combo 子菜备注', async () => ((await this.comboSubItemNoteText.textContent()) ?? '').trim());
  }

  async readComboOptionCount(): Promise<number> {
    return step('读取 Combo Option 数量', async () => Number((await this.comboOptionCount.textContent()) ?? '0'));
  }

  async settleByCash(): Promise<void> {
    await step('现金完成当前订单付款', async () => {
      await this.settleCashButton.click();
    });
  }

  async settleByCredit(): Promise<void> {
    await step('信用卡完成当前订单付款', async () => {
      await this.settleCreditButton.click();
    });
  }

  async settleByLoyaltyCard(): Promise<void> {
    await step('会员卡完成当前订单付款', async () => {
      await this.settleLoyaltyCardButton.click();
    });
  }

  async settleByGiftCard(): Promise<void> {
    await step('礼品卡完成当前订单付款', async () => {
      await this.settleGiftCardButton.click();
    });
  }

  async settleByBackupCard(): Promise<void> {
    await step('备用卡完成当前订单付款', async () => {
      await this.settleBackupCardButton.click();
    });
  }

  async settleBySelfCard(): Promise<void> {
    await step('自助卡完成当前订单付款', async () => {
      await this.settleSelfCardButton.click();
    });
  }

  async startPickupOrder(): Promise<void> {
    await step('进入 Pickup 点单并提交空取餐信息', async () => {
      await this.pickupButton.click();
      await this.pickupInfoSubmitButton.click();
    });
  }
}

function exactText(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}
