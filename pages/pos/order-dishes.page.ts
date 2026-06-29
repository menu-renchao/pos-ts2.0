import type { FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { parseCurrency } from '../../utils/money.js';
import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { liveGiftCardPayment, liveLoyaltyCardPayment } from '../../test-data/pos/live/payments.js';
import { PageObject } from '../shared/page-object.js';
import { liveOrderDishesSelectors } from './selectors/order-dishes.live.js';
import { offlineOrderDishesSelectors } from './selectors/order-dishes.offline.js';

export class OrderDishesPage extends PageObject {
  private readonly menuCategories: Locator;
  private readonly menuGroups: Locator;
  private readonly menuItems: Locator;
  private readonly liveMenuGroupOptions: Locator;
  private readonly liveMenuGroupSwitchButton: Locator;
  private readonly customerInfoPopup: Locator;
  private readonly customerNameInput: Locator;
  private readonly customerPhoneInput: Locator;
  private readonly customerSubmitButton: Locator;
  private readonly openFoodCategory: Locator;
  private readonly orderRoot: Locator;
  private readonly currentCategoryName: Locator;
  private readonly itemDiscountButton: Locator;
  private readonly liveItemDiscountTrigger: Locator;
  private readonly liveTenPercentDiscountButton: Locator;
  private readonly liveItemPriceClearButton: Locator;
  private readonly itemHalfDiscountButton: Locator;
  private readonly itemDiscountAmountInput: Locator;
  private readonly itemDiscountPercentInput: Locator;
  private readonly itemDiscountClearSelectedButton: Locator;
  private readonly itemDiscountSubmitButton: Locator;
  private readonly itemPrice: Locator;
  private readonly itemPriceInput: Locator;
  private readonly itemPriceSubmitButton: Locator;
  private readonly itemQuantityButton: Locator;
  private readonly itemQuantityInput: Locator;
  private readonly itemQuantitySubmitButton: Locator;
  private readonly liveItemTaxButton: Locator;
  private readonly liveItemTaxExemptButton: Locator;
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
  private readonly liveOpenFoodButton: Locator;
  private readonly liveOpenFoodHideKeyboardButton: Locator;
  private readonly liveOpenFoodNameInput: Locator;
  private readonly liveOpenFoodPriceInput: Locator;
  private readonly liveOpenFoodSubmitButton: Locator;
  private readonly liveOpenFoodTaxButtons: Locator;
  private readonly openFoodKeyboardLanguage: Locator;
  private readonly openFoodKeyboardSubmitButton: Locator;
  private readonly openFoodKeyboardTextInput: Locator;
  private readonly orderInventoryButton: Locator;
  private readonly orderItemName: Locator;
  private readonly orderCurrentQuickCombo: Locator;
  private readonly orderItemCount: Locator;
  private readonly guestCountInput: Locator;
  private readonly orderLineItems: Locator;
  private readonly liveOrderItemRows: Locator;
  private cachedPermissionToastText: string | undefined;
  private readonly orderGuestNameInput: Locator;
  private readonly orderOptions: Locator;
  private readonly orderReward: Locator;
  private readonly orderDiscountButton: Locator;
  private readonly liveOrderDiscountButton: Locator;
  private readonly orderDiscountAmount: Locator;
  private readonly orderDiscountPercentInput: Locator;
  private readonly orderDiscountClearWholeButton: Locator;
  private readonly orderDiscountSubmitButton: Locator;
  private readonly orderDiscountWholeOrderPrice: Locator;
  private readonly liveOrderDiscountWholeOrderPrice: Locator;
  private readonly orderPriceDetail: Locator;
  private readonly orderExitButton: Locator;
  private readonly orderModifyButton: Locator;
  private readonly orderCharge20Button: Locator;
  private readonly orderCharge10Button: Locator;
  private readonly orderCharge10TaxableButton: Locator;
  private readonly orderCharge5Button: Locator;
  private readonly orderChargeZeroButton: Locator;
  private readonly customChargeValueInput: Locator;
  private readonly customChargeRateTypeSelect: Locator;
  private readonly customChargeTaxedSelect: Locator;
  private readonly customChargeAddButton: Locator;
  private readonly orderChargeLabel: Locator;
  private readonly orderChargePrice: Locator;
  private readonly pickupButton: Locator;
  private readonly pickupInfoSubmitButton: Locator;
  private readonly saveOrderButton: Locator;
  private readonly saveOrderAlert: Locator;
  private readonly liveSplitButton: Locator;
  private readonly liveSplitPrompt: Locator;
  private readonly liveSplitKeepButton: Locator;
  private readonly liveInventoryAlertText: Locator;
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
  private readonly liveSettleAllCashButton: Locator;
  private readonly liveSettleBackupCardButton: Locator;
  private readonly liveSettleCashMethodButton: Locator;
  private readonly liveSettleCardNumberIdInput: Locator;
  private readonly liveSettleCardFirstNameInput: Locator;
  private readonly liveSettleCardResults: Locator;
  private readonly liveSettleCardSearchButton: Locator;
  private readonly liveSettleCardSetButton: Locator;
  private readonly liveSettleGiftCardButton: Locator;
  private readonly liveSettleLoyaltyCardButton: Locator;
  private readonly liveSettleEvenPayButton: Locator;
  private readonly liveSettleEvenPayConfirmButton: Locator;
  private readonly liveSettleEvenPayGuestInput: Locator;
  private readonly liveSettlePayButton: Locator;
  private readonly liveSettlePayAndPrintButton: Locator;
  private readonly liveSettlePayAmountClearButton: Locator;
  private readonly liveSettleSelfCardButton: Locator;
  private readonly liveSettleStoredCardBalanceButton: Locator;
  private readonly liveSettleToast: Locator;
  private readonly liveSettleTipButton: Locator;
  private readonly liveSettleTipInput: Locator;
  private readonly liveSettleTipSubmitButton: Locator;
  private readonly liveSettleUnpaidAmount: Locator;
  private readonly settleUnpaidAmount: Locator;
  private readonly settleSelectMemberButton: Locator;
  private readonly settleSwitchMemberButton: Locator;
  private readonly settleApplyMemberButton: Locator;
  private readonly splitCombineButton: Locator;
  private readonly splitEvenButton: Locator;
  private readonly splitPanelFrame: FrameLocator;
  private readonly splitPanelEvenOrderButton: Locator;
  private readonly splitPanelKeypadConfirmButton: Locator;
  private readonly splitPanelSaveButton: Locator;
  private readonly subOptions: Locator;
  private readonly subtotal: Locator;
  private readonly searchClearButton: Locator;
  private readonly searchInput: Locator;
  private readonly searchResult: Locator;
  private readonly searchResultItems: Locator;
  private readonly liveAddLineButton: Locator;
  private readonly seatSharedButton: Locator;
  private readonly seatOneButton: Locator;
  private readonly seatTwoButton: Locator;
  private readonly tipButton: Locator;
  private readonly tipConfirmButton: Locator;
  private readonly tipDialog: Locator;
  private readonly tipInput: Locator;
  private readonly tipSubmitButton: Locator;
  private readonly tipToast: Locator;
  private readonly totalBox: Locator;
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
  private readonly liveComboConfirmButton: Locator;
  private readonly liveComboDetailChoices: Locator;
  private readonly liveComboOptionButtons: Locator;
  private readonly liveComboOptionCount: Locator;
  private readonly liveComboOptionReduceButton: Locator;
  private readonly liveComboSections: Locator;
  private readonly liveComboSectionDescription: Locator;
  private readonly liveComboSubItemButtons: Locator;
  private lastComboSubItemNote = '';
  private selectedOrderLineIndexes: number[] = [1];

  constructor(page: Page) {
    super(page);
    this.menuCategories = page.getByTestId('order-menu-category').or(page.locator('#odctgbx .dishCatBx'));
    this.menuGroups = page.getByTestId('order-menu-group').or(page.locator('#grplist .grplistbt'));
    this.menuItems = page.getByTestId('order-menu-item').or(page.locator('#oddishes .dishBx'));
    this.liveMenuGroupOptions = page.locator(liveOrderDishesSelectors.menuGroupOption);
    this.liveMenuGroupSwitchButton = page.locator(liveOrderDishesSelectors.menuGroupSwitchButton);
    this.customerInfoPopup = page.getByTestId(offlineOrderDishesSelectors.customerInfoPopup).or(page.locator(liveOrderDishesSelectors.customerInfoPopup));
    this.customerNameInput = page.getByTestId(offlineOrderDishesSelectors.customerNameInput).or(page.locator(liveOrderDishesSelectors.customerNameInput));
    this.customerPhoneInput = page.getByTestId(offlineOrderDishesSelectors.customerPhoneInput).or(page.locator(liveOrderDishesSelectors.customerPhoneInput));
    this.customerSubmitButton = page.getByTestId(offlineOrderDishesSelectors.customerSubmitButton).or(page.locator(liveOrderDishesSelectors.customerSubmitButton));
    this.itemDiscountButton = page.getByTestId(offlineOrderDishesSelectors.itemDiscountButton);
    this.liveItemDiscountTrigger = page.locator(liveOrderDishesSelectors.itemDiscountTrigger);
    this.liveTenPercentDiscountButton = page.locator(liveOrderDishesSelectors.tenPercentDiscountButton);
    this.liveItemPriceClearButton = page.locator(liveOrderDishesSelectors.itemPriceClearButton);
    this.itemHalfDiscountButton = page.getByTestId('item-discount-50');
    this.itemDiscountAmountInput = page.getByTestId('item-discount-amount');
    this.itemDiscountPercentInput = page.getByTestId('item-discount-percent');
    this.itemDiscountClearSelectedButton = page.getByTestId('item-discount-clear-selected');
    this.itemDiscountSubmitButton = page.getByTestId('item-discount-submit');
    this.itemPrice = page.getByTestId(offlineOrderDishesSelectors.itemPrice).or(page.locator(liveOrderDishesSelectors.itemPrice).last());
    this.itemPriceInput = page.getByTestId(offlineOrderDishesSelectors.itemPriceInput).or(page.locator(liveOrderDishesSelectors.itemPriceInput));
    this.itemPriceSubmitButton = page.getByTestId(offlineOrderDishesSelectors.itemPriceSubmitButton).or(page.locator(liveOrderDishesSelectors.itemPriceSubmitButton));
    this.itemQuantityButton = page
      .getByTestId(offlineOrderDishesSelectors.itemQuantityButton)
      .or(page.locator(liveOrderDishesSelectors.itemQuantityButton));
    this.itemQuantityInput = page
      .getByTestId(offlineOrderDishesSelectors.itemQuantityInput)
      .or(page.locator(liveOrderDishesSelectors.itemQuantityInput));
    this.itemQuantitySubmitButton = page
      .getByTestId(offlineOrderDishesSelectors.itemQuantitySubmitButton)
      .or(page.locator(liveOrderDishesSelectors.itemQuantitySubmitButton));
    this.liveItemTaxButton = page.locator(liveOrderDishesSelectors.itemTaxButton);
    this.liveItemTaxExemptButton = page.locator(liveOrderDishesSelectors.itemTaxExemptButton);
    this.unitPriceInput = page.getByTestId('order-unit-price-input').or(page.locator('#smpiptipt'));
    this.unitPriceSubmitButton = page.getByTestId('order-unit-price-submit').or(page.locator('#smpiptgo'));
    this.itemTax = page.getByTestId(offlineOrderDishesSelectors.itemTax).or(page.locator(liveOrderDishesSelectors.itemTax));
    this.comboOptionCount = page.getByTestId('combo-option-count');
    this.globalOptionArea = page.getByTestId('global-option-area').or(page.locator(liveOrderDishesSelectors.globalOptionArea));
    this.globalOptionCountInput = page.getByTestId('global-option-count-input').or(page.locator(liveOrderDishesSelectors.globalOptionCountInput));
    this.globalOptionCountSubmitButton = page
      .getByTestId('global-option-count-submit')
      .or(page.locator(liveOrderDishesSelectors.globalOptionCountSubmitButton));
    this.globalOptionListAddButton = page.getByTestId('global-option-list-add').or(page.locator(liveOrderDishesSelectors.globalOptionAddButton));
    this.globalOptionListCount = page.getByTestId('global-option-list-count-value').or(page.locator(liveOrderDishesSelectors.globalOptionCountButton));
    this.globalOptionListCountButton = page.getByTestId('global-option-list-count').or(page.locator(liveOrderDishesSelectors.globalOptionCountButton));
    this.globalOptionListReduceButton = page.getByTestId('global-option-list-reduce').or(page.locator(liveOrderDishesSelectors.globalOptionReduceButton));
    this.globalOptionNoButton = page.getByTestId('global-option-no').or(page.locator(liveOrderDishesSelectors.globalOptionNoButton));
    this.deliveryInfoButton = page.getByTestId('order-info').or(page.locator(liveOrderDishesSelectors.orderInfoButton));
    this.deliveryInfoRows = page.getByTestId('order-info-row');
    this.managerPasswordInput = page.getByTestId(offlineOrderDishesSelectors.managerPasswordInput).or(page.locator(liveOrderDishesSelectors.managerPasswordInput));
    this.managerPasswordSubmitButton = page
      .getByTestId(offlineOrderDishesSelectors.managerPasswordSubmitButton)
      .or(page.locator(`${liveOrderDishesSelectors.managerPasswordDialog} ${liveOrderDishesSelectors.managerPasswordSubmitButton}`));
    this.modifyNoteInput = page.getByTestId('modify-note-name').or(page.locator('#noteIpt'));
    this.modifyNotePriceInput = page.getByTestId('modify-note-price').or(page.locator('#notepriceIpt'));
    this.modifySaveButton = page.getByTestId('modify-save').or(page.locator('#noteok'));
    this.openFoodNameInput = page.getByTestId(offlineOrderDishesSelectors.openFoodNameInput);
    this.openFoodNoTaxButton = page.getByTestId(offlineOrderDishesSelectors.openFoodNoTaxButton);
    this.openFoodPriceInput = page.getByTestId(offlineOrderDishesSelectors.openFoodPriceInput);
    this.openFoodButton = page.getByTestId(offlineOrderDishesSelectors.openFoodButton);
    this.liveOpenFoodButton = page.locator(liveOrderDishesSelectors.openFoodButton);
    this.liveOpenFoodHideKeyboardButton = page.locator(liveOrderDishesSelectors.openFoodHideKeyboardButton);
    this.liveOpenFoodNameInput = page.locator(liveOrderDishesSelectors.openFoodNameInput);
    this.liveOpenFoodPriceInput = page.locator(liveOrderDishesSelectors.openFoodPriceInput);
    this.liveOpenFoodSubmitButton = page.locator(liveOrderDishesSelectors.openFoodSubmitButton);
    this.liveOpenFoodTaxButtons = page.locator(liveOrderDishesSelectors.openFoodTaxButton);
    this.openFoodKeyboardLanguage = page.getByTestId('open-food-keyboard-language');
    this.openFoodKeyboardSubmitButton = page.getByTestId('open-food-keyboard-submit');
    this.openFoodKeyboardTextInput = page.getByTestId('open-food-keyboard-text');
    this.orderInventoryButton = page.getByTestId('order-inventory').or(page.locator('#inventorymanage'));
    this.orderItemName = page.getByTestId('order-item-name').or(page.locator(liveOrderDishesSelectors.orderedItemName).first());
    this.orderCurrentQuickCombo = page.getByTestId('order-current-quick-combo');
    this.orderItemCount = page.getByTestId('order-item-count');
    this.guestCountInput = page.getByTestId('order-guest-count');
    this.orderLineItems = page.getByTestId('order-line-item').or(page.locator('#oodbtbx [id*="itemdsh"], #orderDishes [id*="itemdsh"]'));
    this.liveOrderItemRows = page.locator(liveOrderDishesSelectors.orderedItemRow);
    this.orderGuestNameInput = page.getByTestId('order-guest-name');
    this.orderOptions = page.getByTestId('order-option').or(page.locator(liveOrderDishesSelectors.optionButton));
    this.orderReward = page.getByTestId('order-reward');
    this.orderDiscountButton = page.getByTestId('order-discount');
    this.liveOrderDiscountButton = page.locator('#dscnticon');
    this.orderDiscountAmount = page.getByTestId('order-discount-amount');
    this.orderDiscountPercentInput = page.getByTestId('order-discount-percent');
    this.orderDiscountClearWholeButton = page.getByTestId('order-discount-clear-whole');
    this.orderDiscountSubmitButton = page.getByTestId('order-discount-submit');
    this.orderDiscountWholeOrderPrice = page.getByTestId('order-discount-whole-order-price');
    this.liveOrderDiscountWholeOrderPrice = page
      .locator(liveOrderDishesSelectors.discountRows)
      .or(page.locator(liveDiscountRowsByCheckboxXPath))
      .first();
    this.orderPriceDetail = page.getByTestId('order-price-detail');
    this.orderExitButton = page.getByTestId('order-exit').or(page.locator('#exitBt, #odBack'));
    this.orderModifyButton = page.getByTestId('order-modify').or(page.locator('#mdfItemicon'));
    this.orderCharge20Button = page.getByTestId('order-charge-20');
    this.orderCharge10Button = page.getByTestId('order-charge-10');
    this.orderCharge10TaxableButton = page.getByTestId('order-charge-10-taxable');
    this.orderCharge5Button = page.getByTestId('order-charge-5');
    this.orderChargeZeroButton = page.getByTestId('order-charge-0');
    this.customChargeValueInput = page.getByTestId('order-custom-charge-value');
    this.customChargeRateTypeSelect = page.getByTestId('order-custom-charge-rate-type');
    this.customChargeTaxedSelect = page.getByTestId('order-custom-charge-taxed');
    this.customChargeAddButton = page.getByTestId('order-custom-charge-add');
    this.orderChargeLabel = page.getByTestId('order-charge-label');
    this.orderChargePrice = page.getByTestId('order-charge-price');
    this.pickupButton = page.getByTestId('order-pickup');
    this.pickupInfoSubmitButton = page.getByTestId('pickup-info-submit');
    this.openFoodCategory = page.getByTestId('open-food-category');
    this.orderRoot = page.getByTestId('order-page').or(page.locator('#orderDishes'));
    this.currentCategoryName = page.getByTestId('current-category-name');
    this.saveOrderButton = page.getByTestId('order-save').or(page.locator('#odSave'));
    this.saveOrderAlert = page.getByTestId('order-save-alert').or(page.locator('#myalerttxt')).or(page.locator('.myalertBxBox'));
    this.liveSplitButton = page.locator('#splitOdBtn');
    this.liveSplitPrompt = page.locator('.objBx').filter({ hasText: /This order has charges, discounts, or tips/i });
    this.liveSplitKeepButton = page.locator('.objBxBtn').getByText('Keep', { exact: true });
    this.liveInventoryAlertText = page.getByText('Insufficient stock, please modify the order.').first();
    this.sendKitchenButton = page.locator('#odSend').or(page.getByTestId('order-send-kitchen')).first();
    this.settleButton = page.getByTestId(offlineOrderDishesSelectors.settleButton).or(page.locator(liveOrderDishesSelectors.settleButton));
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
    this.liveSettleAllCashButton = page.locator(liveOrderDishesSelectors.settleAllCashButton);
    this.liveSettleBackupCardButton = page.locator(liveOrderDishesSelectors.settleBackupCardButton);
    this.liveSettleCashMethodButton = page.locator(liveOrderDishesSelectors.settleCashMethodButton);
    this.liveSettleCardNumberIdInput = page.locator(liveOrderDishesSelectors.settleCardNumberIdInput);
    this.liveSettleCardFirstNameInput = page.locator(liveOrderDishesSelectors.settleCardFirstNameInput);
    this.liveSettleCardResults = page.locator(liveOrderDishesSelectors.settleCardResult);
    this.liveSettleCardSearchButton = page.locator(liveOrderDishesSelectors.settleCardSearchButton);
    this.liveSettleCardSetButton = page.locator(liveOrderDishesSelectors.settleCardSetButton);
    this.liveSettleGiftCardButton = page.locator(liveOrderDishesSelectors.settleGiftCardButton);
    this.liveSettleLoyaltyCardButton = page.locator(liveOrderDishesSelectors.settleLoyaltyCardButton);
    this.liveSettleEvenPayButton = page.locator(liveOrderDishesSelectors.settleEvenPayButton);
    this.liveSettleEvenPayConfirmButton = page.locator(liveOrderDishesSelectors.settleEvenPayConfirmButton);
    this.liveSettleEvenPayGuestInput = page.locator(liveOrderDishesSelectors.settleEvenPayGuestInput);
    this.liveSettlePayButton = page.locator(liveOrderDishesSelectors.settlePayButton);
    this.liveSettlePayAndPrintButton = page.locator(liveOrderDishesSelectors.settlePayAndPrintButton);
    this.liveSettlePayAmountClearButton = page.locator(liveOrderDishesSelectors.settlePayAmountClearButton);
    this.liveSettleSelfCardButton = page.locator(liveOrderDishesSelectors.settleSelfCardButton);
    this.liveSettleStoredCardBalanceButton = page.locator(liveOrderDishesSelectors.settleStoredCardBalanceButton);
    this.liveSettleToast = page.locator(liveOrderDishesSelectors.settleToast);
    this.liveSettleTipButton = page.locator(liveOrderDishesSelectors.settleTipButton);
    this.liveSettleTipInput = page.locator(liveOrderDishesSelectors.settleTipInput);
    this.liveSettleTipSubmitButton = page.locator(liveOrderDishesSelectors.settleTipSubmitButton);
    this.liveSettleUnpaidAmount = page.locator(liveOrderDishesSelectors.settleUnpaidAmount);
    this.settleUnpaidAmount = page.getByTestId('settle-unpaid-amount');
    this.settleSelectMemberButton = page.getByTestId('settle-select-member');
    this.settleSwitchMemberButton = page.getByTestId('settle-switch-member');
    this.settleApplyMemberButton = page.getByTestId('settle-apply-member');
    this.splitCombineButton = page.getByTestId('split-combine');
    this.splitEvenButton = page.getByTestId('split-even');
    this.splitPanelFrame = page.frameLocator('iframe[data-wujie-id="splitPanel"]');
    this.splitPanelEvenOrderButton = this.splitPanelFrame.locator('button').filter({ hasText: /^Even Order$/ });
    this.splitPanelKeypadConfirmButton = this.splitPanelFrame
      .locator('div[class*="keypad"] button')
      .filter({ hasText: /^Confirm$/ });
    this.splitPanelSaveButton = this.splitPanelFrame.locator('button').filter({ hasText: /^Confirm$/ }).last();
    this.subOptions = page.getByTestId('order-sub-option').or(page.locator(liveOrderDishesSelectors.subOptionButton));
    this.subtotal = page.getByTestId('order-subtotal');
    this.searchClearButton = page.getByTestId('order-search-clear').or(page.locator(liveOrderDishesSelectors.searchClearButton));
    this.searchInput = page.getByTestId('order-search').or(page.locator(liveOrderDishesSelectors.searchInput));
    this.searchResult = page.getByTestId('order-search-result').or(page.locator(liveOrderDishesSelectors.searchResult));
    this.searchResultItems = page.getByTestId('order-search-result-item').or(page.locator(liveOrderDishesSelectors.searchResultItem));
    this.liveAddLineButton = page.locator('#addlineicon');
    this.seatSharedButton = page.getByTestId('order-seat-shared');
    this.seatOneButton = page.getByTestId('order-seat-1');
    this.seatTwoButton = page.getByTestId('order-seat-2');
    this.tipButton = page.getByTestId('order-tip-button').or(page.locator('#odtipsicon'));
    this.tipConfirmButton = page.getByTestId('order-tip-confirm').or(page.locator('#yes'));
    this.tipDialog = page.getByTestId('order-tip-dialog').or(page.locator('#tips-dialog'));
    this.tipInput = page.getByTestId('order-tip').or(page.locator('#tips-input'));
    this.tipSubmitButton = page.getByTestId('order-tip-submit').or(page.locator('#tips-submit'));
    this.tipToast = page.getByTestId('order-tip-toast');
    this.totalBox = page.locator('#totalBox');
    this.reduceItemButton = page.getByTestId('order-reduce-item').or(page.locator('#reduce1icon'));
    this.voidItemButton = page
      .getByTestId(offlineOrderDishesSelectors.voidItemButton)
      .or(page.locator(liveOrderDishesSelectors.voidItemButton))
      .or(page.locator(liveOrderDishesSelectors.voidItemButtonLater));
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
    this.liveComboConfirmButton = page.locator(liveOrderDishesSelectors.comboConfirmButton);
    this.liveComboDetailChoices = page.locator(liveOrderDishesSelectors.comboDetailChoice);
    this.liveComboOptionButtons = page.locator(liveOrderDishesSelectors.comboOptionButton);
    this.liveComboOptionCount = page.locator(liveOrderDishesSelectors.comboOptionCount);
    this.liveComboOptionReduceButton = page.locator(liveOrderDishesSelectors.comboOptionReduceButton);
    this.liveComboSections = page.locator(liveOrderDishesSelectors.comboSection);
    this.liveComboSectionDescription = page.locator(liveOrderDishesSelectors.comboSectionDescription);
    this.liveComboSubItemButtons = page.locator(liveOrderDishesSelectors.comboSubItemButton);
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
      if (await this.currentCategoryName.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.currentCategoryName.textContent()) ?? '').trim();
      }
      return this.page
        .locator('#odctgbx .dishCatBx')
        .evaluateAll((categories) => {
          const visible = (element: Element) => {
            const htmlElement = element as HTMLElement;
            const rect = htmlElement.getBoundingClientRect();
            const style = window.getComputedStyle(htmlElement);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const activeCategory =
            categories.find((category) => visible(category) && /(^|\s)(on|act|active|selected)(\s|$)/i.test((category as HTMLElement).className)) ??
            categories.find(visible);
          return activeCategory?.textContent?.trim() ?? '';
        })
        .catch(() => '');
    });
  }

  async readCurrentUrl(): Promise<string> {
    return step('读取当前页面 URL', async () => this.page.url());
  }

  async readMenuGroups(): Promise<string[]> {
    return step('读取点单页面菜单组', async () => {
      await expect(this.orderRoot).toBeVisible();
      const offlineMenuGroups = (await this.page.getByTestId('order-menu-group').allTextContents())
        .map((groupName) => groupName.trim())
        .filter(Boolean);
      if (offlineMenuGroups.length > 0) {
        return offlineMenuGroups;
      }

      await this.page.locator('#oGrptxt').click({ timeout: 5_000 }).catch(() => undefined);
      const liveMenuGroups = (await this.page.locator('.grplistbtText').allTextContents())
        .map((groupName) => groupName.trim())
        .filter(Boolean);
      if (liveMenuGroups.length > 0) {
        return liveMenuGroups;
      }

      return (await this.menuGroups.allTextContents()).map((groupName) => groupName.trim()).filter(Boolean);
    });
  }

  async selectMenuGroup(groupName = ''): Promise<void> {
    await step(`选择点单菜单组 ${groupName}`, async () => {
      if (groupName) {
        const group = this.menuGroups.filter({ hasText: exactText(groupName) });
        const visibleGroup = group.first();
        const hasVisibleGroup = (await group.count()) > 0 && (await visibleGroup.isVisible().catch(() => false));
        let isCurrentGroup = false;
        if (hasVisibleGroup) {
          isCurrentGroup = await visibleGroup.evaluate((el) => el.classList.contains('grplistbtAct')).catch(() => false);
          if (isCurrentGroup) {
            return;
          }
          await visibleGroup.click().catch(async (error: unknown) => {
            isCurrentGroup = await visibleGroup.evaluate((el) => el.classList.contains('grplistbtAct')).catch(() => false);
            if (!isCurrentGroup) {
              throw error;
            }
          });
          return;
        }
        if (!isCurrentGroup) {
          isCurrentGroup = await this.isLiveMenuGroupActive(groupName);
        }
        if (!isCurrentGroup) {
          await this.clickLiveMenuGroup(groupName);
        }
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
      await this.hideLiveSemiSendOverlay();
      await this.menuItems.filter({ hasText: exactText(itemName) }).click();
    });
  }

  async isCurrentQuickCombo(): Promise<boolean> {
    return step('判断当前菜品是否为 Quick Combo', async () => {
      if (!(await this.orderCurrentQuickCombo.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return this.page.locator('#comboLiteBx div.sectionName:visible, div.sectionName:visible').first().isVisible();
      }
      return ((await this.orderCurrentQuickCombo.textContent()) ?? '').trim() === 'true';
    });
  }

  async isUnitPriceInputVisible(): Promise<boolean> {
    return step('判断称重菜输入框是否展示', async () => this.unitPriceInput.isVisible());
  }

  async inputUnitPriceAndReadSelectedPrice(unitPriceInput: number): Promise<number> {
    return step(`输入称重菜重量 ${unitPriceInput} 并读取价格`, async () => {
      if (await this.page.locator('#smpiptipt:visible').isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.inputLiveUnitPrice(unitPriceInput);
        await this.unitPriceSubmitButton.click();
        return this.readSelectedItemPrice();
      }
      await this.unitPriceInput.fill(String(unitPriceInput));
      await this.unitPriceSubmitButton.click();
      return this.readSelectedItemPrice();
    });
  }

  async saveOrder(): Promise<void> {
    await step('保存当前订单', async () => {
      if (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) {
        return;
      }
      const wasLiveOrderPage = await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false);
      await this.saveOrderButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        if (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) {
          return;
        }
        await this.hideTransientCovers();
        const clicked = await this.page
          .evaluate(() => {
            const saveButton = document.getElementById('odSave');
            if (!saveButton) {
              return false;
            }
            saveButton.click();
            return true;
          })
          .catch(() => false);
        if (!clicked) {
          throw error;
        }
      });
      if (wasLiveOrderPage) {
        await waitUntil(
          async () =>
            (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) ||
            !(await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)),
          {
            description: 'live 保存订单后离开点单页',
            intervalMs: 200,
            timeoutMs: 15_000,
          },
        );
      }
    });
  }

  async saveOrderWithManagerAuthorization(password: string): Promise<void> {
    await step('保存当前订单并完成经理授权', async () => {
      if (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) {
        return;
      }
      const wasLiveOrderPage = await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false);
      await this.clickSaveOrderButton();
      await this.completeManagerAuthorizationDialogs(password);
      if (wasLiveOrderPage) {
        await waitUntil(
          async () =>
            (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) ||
            !(await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)),
          {
            description: 'live 授权保存订单后离开点单页',
            intervalMs: 200,
            timeoutMs: 15_000,
          },
        );
      }
    });
  }

  async saveOrderAllowingValidationFailure(): Promise<void> {
    await step('提交保存并允许校验停留点单页', async () => {
      await this.clickSaveOrderButton();
      await waitUntil(
        async () =>
          (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) ||
          (await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)) ||
          !(await this.page.locator('#orderDishes').isVisible().catch(() => false)),
        {
          description: 'live 保存请求完成或停留点单页',
          intervalMs: 200,
          timeoutMs: 5_000,
        },
      ).catch(() => undefined);
    });
  }

  async saveOrderAndReadAlert(): Promise<string> {
    return step('保存当前订单并读取提示', async () => {
      await this.saveOrderButton.click();
      const alert = this.saveOrderAlert.or(this.liveInventoryAlertText).first();
      await expect(alert).toBeVisible({ timeout: 10_000 });
      if (await this.saveOrderAlert.isVisible()) {
        return normalizeAlertText((await this.saveOrderAlert.textContent()) ?? '');
      }
      return normalizeAlertText(await this.page.locator('body').innerText());
    });
  }

  private async clickSaveOrderButton(): Promise<void> {
    await this.saveOrderButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
      if (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) {
        return;
      }
      await this.hideTransientCovers();
      const clicked = await this.page
        .evaluate(() => {
          const saveButton = document.getElementById('odSave');
          if (!saveButton) {
            return false;
          }
          saveButton.click();
          return true;
        })
        .catch(() => false);
      if (!clicked) {
        throw error;
      }
    });
  }

  private async inputLiveUnitPrice(unitPriceInput: number): Promise<void> {
    const input = this.page.locator('#smpiptipt:visible').first();
    await expect(input).toBeVisible({ timeout: 10_000 });
    await input.click({ force: true });
    await input.evaluate((element) => {
      const inputElement = element as HTMLInputElement;
      inputElement.focus();
      inputElement.select();
    });

    for (const digit of String(unitPriceInput)) {
      const clicked = await this.page.evaluate((targetDigit) => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const candidates = Array.from(
          document.querySelectorAll<HTMLElement>(
            `#mykbfl_${targetDigit}, [data-num="${targetDigit}"], #numpanel td, #numpanel div, #numpanel span, td, div, span`,
          ),
        )
          .filter(visible)
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const key = candidates.find(
          (element) => element.id === `mykbfl_${targetDigit}` || element.dataset.num === targetDigit || element.textContent?.trim() === targetDigit,
        );
        if (!key) {
          return false;
        }
        key.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        key.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        key.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        key.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        key.click();
        return true;
      }, digit);
      if (!clicked) {
        await this.page.keyboard.press(digit);
      }
    }
  }

  async inputGuestName(name: string): Promise<void> {
    await step(`输入点单客名 ${name}`, async () => {
      await this.orderGuestNameInput.fill(name);
    });
  }

  async setGuestCount(guestCount: number): Promise<void> {
    await step(`设置点单人数 ${guestCount}`, async () => {
      await this.guestCountInput.fill(String(guestCount));
      await this.guestCountInput.dispatchEvent('input');
    });
  }

  async selectSeat(seatNumber: 1 | 2): Promise<void> {
    await step(`选择座位 ${seatNumber}`, async () => {
      if (seatNumber === 1) {
        await this.seatOneButton.click();
        return;
      }
      await this.seatTwoButton.click();
    });
  }

  async selectSharedSeat(): Promise<void> {
    await step('选择共享菜座位', async () => {
      await this.seatSharedButton.click();
    });
  }

  async addLine(): Promise<void> {
    await step('点单页添加分割线', async () => {
      await this.liveAddLineButton.click();
    });
  }

  async openInventoryPage(): Promise<void> {
    await step('从点单页打开库存页', async () => {
      const inventoryRoot = this.page.getByTestId('inventory-page').or(this.page.locator('#inventory'));
      let visibleSince = 0;
      await waitUntil(
        async () => {
          await this.hideTransientCovers();
          await this.page.evaluate(() => {
            document.getElementById('chgMenuBx')?.click();
            const inventoryButton = document.querySelector<HTMLElement>('[data-testid="order-inventory"], #inventorymanage');
            if (inventoryButton && inventoryButton.getBoundingClientRect().width > 0) {
              inventoryButton.click();
            }
          });
          const visible = await inventoryRoot.isVisible();
          const now = Date.now();
          if (!visible) {
            visibleSince = 0;
            return false;
          }
          if (!visibleSince) {
            visibleSince = now;
            return false;
          }
          return now - visibleSince >= 800;
        },
        {
          description: '库存页打开',
          intervalMs: 250,
          timeoutMs: 15_000,
        },
      );
    });
  }

  async exitOrderPage(): Promise<void> {
    await step('退出当前点单页面', async () => {
      await this.hideTransientCovers();
      await this.orderExitButton.click().catch(async (error: unknown) => {
        await this.hideTransientCovers();
        const clicked = await this.page.evaluate(() => {
          const exitButton = document.getElementById('exitBt') ?? document.getElementById('odBack');
          if (!exitButton) {
            return false;
          }
          exitButton.click();
          return true;
        });
        if (!clicked) {
          throw error;
        }
      });
      const editedOrderExitConfirm = this.page.locator('#exit-edit-submit')
        .or(this.page.getByRole('button', { name: /^OK$/ }))
        .first();
      if (await editedOrderExitConfirm.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await editedOrderExitConfirm.click();
      }
    });
  }

  async sendAllToKitchen(): Promise<void> {
    await step('发送当前订单到厨房', async () => {
      await this.sendKitchenButton.click();
      const okAndSendButton = this.page
        .locator('#delayOkBtn, #sendOkBtn')
        .or(this.page.getByText('OK and Send', { exact: true }))
        .or(this.page.locator('xpath=//div[normalize-space(.)="OK and Send" or normalize-space(.)="确认并送厨"]'))
        .first();
      const okAndSendVisible = await okAndSendButton
        .waitFor({ state: 'visible', timeout: 5_000 })
        .then(() => true)
        .catch(() => false);
      if (okAndSendVisible) {
        await okAndSendButton.click();
        await this.page.locator('#semisendBx:visible').waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
        await this.hideLiveSemiSendOverlay();
      }
    });
  }

  async semiSendHoldPrint(): Promise<void> {
    await step('Hold 打印当前订单菜品', async () => {
      const offlineHoldPrint = this.page.getByTestId('order-send-hold-print');
      if (await offlineHoldPrint.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlineHoldPrint.click();
        return;
      }

      await this.sendKitchenButton.click();
      await this.selectFirstLiveSemiSendItem();
      await this.clickLiveSemiSendAction('hold');
      await this.clickLiveSemiSendPrint();
      await this.page.waitForTimeout(5_000);
      await this.page.locator('#semisendBx:visible').waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
      await this.hideLiveSemiSendOverlay();
    });
  }

  async semiSendDelayPrint(): Promise<void> {
    await step('Delay 打印当前订单菜品', async () => {
      const offlineDelayPrint = this.page.getByTestId('order-send-delay-print');
      if (await offlineDelayPrint.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlineDelayPrint.click();
        return;
      }

      await this.sendKitchenButton.click();
      await this.selectFirstLiveSemiSendItem();
      await this.configureLiveSemiSendDelayMinutes(1);
      await this.clickLiveSemiSendPrint();
      await this.page.waitForTimeout(5_000);
      await this.page.locator('#semisendBx:visible').waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
      await this.hideLiveSemiSendOverlay();
    });
  }

  async readTax(): Promise<number> {
    return step('读取当前订单税额', async () => parseCurrency((await this.itemTax.textContent()) ?? '0'));
  }

  async voidSelectedItemTax(): Promise<void> {
    await step('将当前菜品税额置为 0', async () => {
      const offlineTaxExemptButton = this.page.getByTestId('order-tax-exempt');
      if (await offlineTaxExemptButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlineTaxExemptButton.click();
        return;
      }

      await this.selectOrderLineBeforeAction(this.liveItemTaxButton);
      await expect(this.liveItemTaxButton).toBeVisible({ timeout: 5_000 });
      await this.liveItemTaxButton.click();
      await expect(this.liveItemTaxExemptButton).toBeVisible({ timeout: 10_000 });
      await this.liveItemTaxExemptButton.click();
    });
  }

  async clickSettle(): Promise<void> {
    await step('点击点单页面支付按钮', async () => {
      await this.selectOrderLineBeforeAction(this.settleButton);
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
    return step('读取结算页未付金额', async () => {
      if (await this.settleUnpaidAmount.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return Number((await this.settleUnpaidAmount.textContent()) ?? '0');
      }
      await expect(this.liveSettleUnpaidAmount).toBeVisible({ timeout: 10_000 });
      return parseCurrency((await this.liveSettleUnpaidAmount.textContent()) ?? '0');
    });
  }

  async modifySettlementPaymentAmount(amountInCents: number): Promise<void> {
    await step(`修改结算页本次支付金额为 ${amountInCents}`, async () => {
      if (!(await this.settlePayAmountInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await expect(this.page.locator('#pplnopmt:visible')).toBeVisible({ timeout: 15_000 });
        if (await this.liveSettlePayAmountClearButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await this.liveSettlePayAmountClearButton.click();
        }
        for (const digit of String(amountInCents)) {
          const digitButton = this.page
            .locator(`#mykbfl_${digit}:visible`)
            .or(this.page.locator('.mykbfl:visible, [id^="mykbfl"]:visible, div:visible').filter({ hasText: exactText(digit) }))
            .first();
          await expect(digitButton).toBeVisible({ timeout: 10_000 });
          await digitButton.click({ timeout: 5_000 }).catch(async () => {
            await digitButton.evaluate((element) => (element as HTMLElement).click());
          });
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
        return;
      }
      await this.settlePayAmountInput.fill(String(amountInCents));
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
  }

  async addSettlementTip(amountInCents: number): Promise<void> {
    await step(`结算页添加小费 ${amountInCents}`, async () => {
      if (!(await this.settleTipInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await expect(this.liveSettleTipButton).toBeVisible({ timeout: 10_000 });
        await this.liveSettleTipButton.click();
        await expect(this.liveSettleTipInput).toBeVisible({ timeout: 10_000 });
        await this.liveSettleTipInput.fill((amountInCents / 100).toFixed(2));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.liveSettleTipSubmitButton.click();
        await this.page
          .locator('#tips-dialog:visible, #smpiptpnl:visible, #smpiptipt:visible')
          .waitFor({ state: 'hidden', timeout: 5_000 })
          .catch(() => undefined);
        return;
      }
      await this.settleTipInput.fill(String(amountInCents));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.settleTipInput.press('Enter');
    });
  }

  async settleCurrentAmountByCash(): Promise<void> {
    await step('现金支付当前输入金额', async () => {
      if (await this.settleCashButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.settleCashButton.click();
        return;
      }

      await expect(this.liveSettleCashMethodButton).toBeVisible({ timeout: 10_000 });
      await this.liveSettleCashMethodButton.click();
      await expect(this.liveSettlePayButton).toBeVisible({ timeout: 10_000 });
      await this.liveSettlePayButton.click();
      await this.liveSettleToast.waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => undefined);
    });
  }

  async clickCashTenderAndReadPayActionOrder(): Promise<string[]> {
    return step('点击现金全额并读取付款按钮顺序', async () => {
      if (!(await this.settleCashButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await expect(this.liveSettleAllCashButton).toBeVisible({ timeout: 10_000 });
        await this.liveSettleAllCashButton.click();
        const livePayActions = this.page.locator('#pplcgbtbx > div:visible, #pplcgppbt:visible, #pplcgpybt:visible');
        await expect(livePayActions.first()).toBeVisible({ timeout: 10_000 });
        return (await livePayActions.allTextContents()).map((text) => text.trim()).filter((text) => text === 'Pay & Print' || text === 'Pay');
      }
      await this.settleCashButton.click();
      return (await this.settlePayBarActions.allTextContents()).map((text) => text.trim()).filter(Boolean);
    });
  }

  async searchGiftCardWithoutInfoAndReadAlert(): Promise<string> {
    return step('礼品卡空条件查询并读取提示', async () => {
      if (!(await this.settleGiftCardButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.liveSettleGiftCardButton.click();
        return this.searchLiveStoredCardWithoutInfoAndReadAlert('gift');
      }
      await this.settleGiftCardButton.click();
      await this.settleCardSearchButton.click();
      return ((await this.settleCardAlert.textContent()) ?? '').trim();
    });
  }

  async searchLoyaltyCardWithoutInfoAndReadAlert(): Promise<string> {
    return step('会员卡空条件查询并读取提示', async () => {
      if (!(await this.settleLoyaltyCardButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.liveSettleLoyaltyCardButton.click();
        return this.searchLiveStoredCardWithoutInfoAndReadAlert('loyalty');
      }
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
      if (!(await this.settleEvenPayButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await expect(this.liveSettleEvenPayButton).toBeVisible({ timeout: 10_000 });
        await this.liveSettleEvenPayButton.click();
        if (await this.liveSettleEvenPayGuestInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await this.liveSettleEvenPayGuestInput.fill(String(parts));
        } else {
          for (const digit of String(parts)) {
            const modalDigitButton = this.page.locator(`#number-input-dialog:visible .number-input-item[data-num="${digit}"]`).first();
            if (await modalDigitButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
              await modalDigitButton.click();
            } else {
              await this.page.locator(`#mykbfl_${digit}:visible`).first().click();
            }
          }
        }
        const confirmButton = this.page
          .locator(
            '#number-input-submit:visible, #number-input-dialog:visible button:has-text("Confirm"), #number-input-dialog:visible .btn-main, #dsfl:visible',
          )
          .first();
        if (await confirmButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
          await confirmButton.click({ timeout: 5_000 }).catch(async () => {
            await confirmButton.evaluate((element) => (element as HTMLElement).click());
          });
        } else {
          await this.liveSettleEvenPayConfirmButton.click();
        }
        return;
      }
      await this.settleEvenPayButton.click();
    });
  }

  async isCustomerInfoPopupVisible(): Promise<boolean> {
    return step('判断客户信息弹框是否展示', async () => this.customerInfoPopup.isVisible());
  }

  async waitForCustomerInfoPopupHidden(): Promise<void> {
    await step('等待客户信息弹框关闭', async () => {
      await expect(this.customerInfoPopup).toBeHidden({ timeout: 10_000 });
    });
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
      await this.selectOrderLineBeforeAction(this.voidItemButton);
      await this.clickVoidItemButton();
      await this.confirmVoidDialogIfVisible();
    });
  }

  async voidSelectedItemAndReadToast(): Promise<string> {
    return step('尝试删除当前点单菜品并读取权限提示', async () => {
      await this.selectOrderLineBeforeAction(this.voidItemButton);
      await this.clickVoidItemButton();
      await this.confirmVoidDialogIfVisible(5_000);
      return this.readLiveOrOfflinePermissionToast();
    });
  }

  async changeSelectedItemQuantityAndReadToast(quantity: number): Promise<string> {
    return step(`修改当前菜品数量为 ${quantity} 并读取权限提示`, async () => {
      await this.setSelectedItemQuantity(quantity);
      return this.readLiveOrOfflinePermissionToast();
    });
  }

  async submitManagerPassword(password: string): Promise<void> {
    await step('输入经理密码并确认权限', async () => {
      if (await this.submitLivePasscodeIfVisible(password)) {
        await this.confirmVoidDialogIfVisible(5_000);
        return;
      }

      if (await this.managerPasswordInput.isVisible()) {
        await this.managerPasswordInput.fill(password);
      } else {
        for (const digit of password) {
          const digitButton = this.page.locator(liveOrderDishesSelectors.managerPasswordDigitButton.replace('{digit}', digit));
          if (!(await digitButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
            throw new Error('live 权限密码弹框未展示，不能输入授权密码');
          }
          await digitButton.click();
        }
      }
      await this.managerPasswordSubmitButton.click();
      await this.confirmVoidDialogIfVisible();
    });
  }

  async waitForPermissionPromptToClear(): Promise<void> {
    await step('等待权限提示关闭', async () => {
      const permissionMessage = this.page
        .locator('#pwd-input-dialog:visible, .modal.in:visible, [role="dialog"]:visible, .objBx:visible, #myalert:visible, #myalerttxt:visible')
        .filter({ hasText: livePermissionToastPattern })
        .last();
      await expect(permissionMessage).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
      await this.page.waitForTimeout(500);
    });
  }

  private async completeManagerAuthorizationDialogs(password: string): Promise<void> {
    for (let attempt = 0; attempt < 4; attempt += 1) {
      let handledDialog = false;
      if (await this.submitLivePasscodeIfVisible(password)) {
        handledDialog = true;
      }
      if (await this.confirmVoidDialogIfVisible(2_000)) {
        handledDialog = true;
      }
      if (!handledDialog) {
        return;
      }
    }
  }

  async readSelectedItemPrice(): Promise<number> {
    return step('读取当前菜品价格', async () => {
      if (await this.page.locator(liveOrderDishesSelectors.discountPanel).isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.page.locator(liveOrderDishesSelectors.discountDoneButton).click();
        await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
      }
      if (await this.page.locator('#oodbtbx').isVisible({ timeout: 1_000 }).catch(() => false)) {
        const selectedLineIndex = Math.max((this.selectedOrderLineIndexes[0] ?? 1) - 1, 0);
        const selectedLineText = ((await this.orderLineItems.nth(selectedLineIndex).textContent({ timeout: 2_000 }).catch(() => '')) ?? '').trim();
        const prices = selectedLineText.match(/-?\$\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
        const currentPrice = prices.at(-1);
        if (currentPrice) {
          return parseCurrency(currentPrice);
        }
      }
      return parseCurrency((await this.itemPrice.textContent()) ?? '0');
    });
  }

  async readSelectedOrderItem(): Promise<{ name: string; price: number }> {
    return step('读取当前已点菜品名称和价格', async () => {
      if (await this.orderItemName.isVisible()) {
        return {
          name: (await this.orderItemName.textContent()) ?? '',
          price: parseCurrency((await this.itemPrice.textContent()) ?? '0'),
        };
      }

      const liveOrderLine = this.page.locator('#oodbtbx [id*="itemdsh"]').last();
      await expect(liveOrderLine).toBeVisible();
      const liveItem = await liveOrderLine.evaluate((line) => {
        const name = line.querySelector<HTMLElement>('.itemNameORDEREDtxt')?.textContent?.trim() ?? '';
        const priceText = line.children.item(4)?.textContent?.trim() ?? '';
        return { name, priceText };
      });

      return {
        name: liveItem.name,
        price: parseCurrency(liveItem.priceText),
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
      if (await this.itemDiscountButton.isVisible()) {
        await this.itemDiscountButton.click();
        return;
      }

      await this.selectOrderLineBeforeAction(this.liveItemDiscountTrigger);
      await this.liveItemDiscountTrigger.click();
      await this.liveTenPercentDiscountButton.click();
    });
  }

  async applyHalfDiscount(): Promise<void> {
    await step('给当前菜品应用 50% 单菜折扣', async () => {
      if (await this.itemHalfDiscountButton.isVisible().catch(() => false)) {
        await this.itemHalfDiscountButton.click();
        return;
      }

      await this.selectOrderLineBeforeAction(this.liveOrderDiscountButton);
      if (!(await this.liveOrderDiscountButton.isVisible().catch(() => false))) {
        await this.totalBox.click();
      }
      await this.liveOrderDiscountButton.click();
      await this.applyLiveDiscountValue({
        target: { kind: 'item', indexes: [1] },
        value: 50,
        isPercent: true,
        confirm: true,
      });
    });
  }

  async applyItemDiscountPercent(percent: number): Promise<void> {
    await step(`给当前菜品应用 ${percent}% 单菜折扣`, async () => {
      if (!(await this.itemDiscountPercentInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openLiveDiscountPanelIfNeeded();
        await this.applyLiveDiscountValue({
          target: { kind: 'item', indexes: [1] },
          value: percent,
          isPercent: true,
          confirm: false,
        });
        return;
      }
      await this.itemDiscountPercentInput.fill(String(percent));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemDiscountSubmitButton.click();
    });
  }

  async applySelectedItemsDiscountAmount(amount: number): Promise<void> {
    await step(`给已选菜品应用固定金额折扣 ${amount}`, async () => {
      if (!(await this.itemDiscountAmountInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openLiveDiscountPanelIfNeeded();
        await this.applyLiveDiscountValue({
          target: { kind: 'item', indexes: this.selectedOrderLineIndexes },
          value: amount,
          isPercent: false,
          confirm: false,
        });
        return;
      }
      await this.itemDiscountAmountInput.fill(String(amount));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemDiscountSubmitButton.click();
    });
  }

  async changeSelectedItemPrice(price: number): Promise<void> {
    await step(`修改当前菜品价格为 ${price}`, async () => {
      if (!(await this.itemPriceInput.isVisible().catch(() => false))) {
        await this.selectOrderLineBeforeAction(this.liveItemDiscountTrigger);
        await this.liveItemDiscountTrigger.click();
      }
      await expect(this.itemPriceInput).toBeVisible({ timeout: 10_000 });
      const usesLiveCentsInput = await this.liveItemPriceClearButton.isVisible();
      if (usesLiveCentsInput) {
        await this.liveItemPriceClearButton.click();
      }
      await this.itemPriceInput.fill(usesLiveCentsInput ? price.toFixed(2) : String(price));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.itemPriceSubmitButton.click();
    });
  }

  async selectOrderLineItem(index: number): Promise<void> {
    await step(`选择第 ${index} 个订单菜品`, async () => {
      await this.closeLiveDiscountPanelIfVisible();
      await this.orderLineItems.nth(index - 1).click();
      this.selectedOrderLineIndexes = [index];
    });
  }

  async selectOrderLineItems(indexes: readonly number[]): Promise<void> {
    await step(`选择多个订单菜品 ${indexes.join(', ')}`, async () => {
      await this.closeLiveDiscountPanelIfVisible();
      for (const [position, index] of indexes.entries()) {
        await this.orderLineItems.nth(index - 1).click({
          modifiers: position === 0 ? [] : ['Control'],
        });
      }
      this.selectedOrderLineIndexes = [...indexes];
    });
  }

  async changeSelectedItemQuantity(quantity: number): Promise<void> {
    await step(`修改当前菜品数量为 ${quantity}`, async () => {
      await this.setSelectedItemQuantity(quantity);
    });
  }

  private async setSelectedItemQuantity(quantity: number): Promise<void> {
    if (!(await this.itemQuantityInput.isVisible())) {
      await this.selectOrderLineBeforeAction(this.itemQuantityButton);
      await expect(this.itemQuantityButton).toBeVisible({ timeout: 5_000 });
      await this.clickItemQuantityButton();
      await expect(this.itemQuantityInput).toBeVisible({ timeout: 10_000 });
    }
    await this.inputItemQuantityValue(String(quantity));
    await new Promise((resolve) => setTimeout(resolve, 200));
    const liveConfirmButton = this.page.getByRole('button', { name: /^Confirm$/ }).last();
    if (await liveConfirmButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await liveConfirmButton.click();
    } else {
      await this.itemQuantitySubmitButton.click();
    }
    await this.itemQuantityInput.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
  }

  private async inputItemQuantityValue(value: string): Promise<void> {
    const liveQuantityInput = this.page.locator(liveOrderDishesSelectors.itemQuantityInput);
    if (await liveQuantityInput.isVisible().catch(() => false)) {
      await liveQuantityInput.fill('');
      await liveQuantityInput.pressSequentially(value);
      return;
    }

    await this.itemQuantityInput.fill(value);
  }

  private async clickItemQuantityButton(): Promise<void> {
    const clickedLiveButton = await this.page
      .evaluate((selector) => {
        const quantityButton = document.querySelector<HTMLElement>(selector);
        if (!quantityButton) {
          return false;
        }
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        for (const eventName of ['vmousedown', 'tap', 'vclick', 'click']) {
          jquery?.(quantityButton).trigger(eventName);
        }
        quantityButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        quantityButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        quantityButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        quantityButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        quantityButton.dispatchEvent(new CustomEvent('tap', { bubbles: true, cancelable: true }));
        quantityButton.dispatchEvent(new CustomEvent('vclick', { bubbles: true, cancelable: true }));
        quantityButton.click();
        return true;
      }, liveOrderDishesSelectors.itemQuantityButton)
      .catch(() => false);
    if (clickedLiveButton) {
      return;
    }

    await this.itemQuantityButton.click({ timeout: 5_000 });
  }

  async readSubtotal(): Promise<number> {
    return step('读取当前订单小计', async () => {
      if (await this.subtotal.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return Number((await this.subtotal.textContent()) ?? '0');
      }

      return parseCurrency(await this.readLiveVisibleTotalText());
    });
  }

  async readNetSalesSubtotal(): Promise<number> {
    return step('读取当前订单税前小计', async () => {
      if (await this.subtotal.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return Number((await this.subtotal.textContent()) ?? '0');
      }

      const liveSubtotalText = await this.readLiveVisibleSubtotalText();
      if (liveSubtotalText) {
        return parseCurrency(liveSubtotalText);
      }

      return this.readSelectedItemPrice();
    });
  }

  async readSubtotalText(): Promise<string> {
    return step('读取当前订单小计文案', async () => {
      if (await this.subtotal.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.subtotal.textContent()) ?? '').trim();
      }

      return this.readLiveVisibleTotalText();
    });
  }

  async readRewardText(): Promise<string> {
    return step('读取当前订单 Reward Discount 文案', async () => ((await this.orderReward.textContent()) ?? '').trim());
  }

  async reduceFirstItemToZero(): Promise<void> {
    await step('将当前订单首个菜品数量减少为 0', async () => {
      await this.selectOrderLineBeforeAction(this.reduceItemButton);
      await this.clickReduceItemButton();
    });
  }

  async reduceSelectedItemQuantity(): Promise<void> {
    await step('减少当前菜品数量', async () => {
      await this.selectOrderLineBeforeAction(this.reduceItemButton);
      await this.clickReduceItemButton();
    });
  }

  private async selectOrderLineBeforeAction(actionButton: Locator): Promise<void> {
    if (await actionButton.isVisible().catch(() => false)) {
      return;
    }

    if (await this.liveOrderItemRows.first().isVisible().catch(() => false)) {
      await this.activateLiveOrderLine(this.liveOrderItemRows.first());
      if (await actionButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
        return;
      }
    }

    if (!(await actionButton.isVisible().catch(() => false))) {
      const lineCount = await this.orderLineItems.count();
      if (lineCount > 0) {
        const line = this.orderLineItems.nth(lineCount - 1);
        await line.click();
      }
    }
  }

  private async activateLiveOrderLine(line: Locator): Promise<void> {
    await line.evaluate((element) => {
      const target = element as HTMLElement;
      const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
      for (const eventName of ['vmousedown', 'tap', 'vclick', 'click']) {
        jquery?.(target).trigger(eventName);
      }
      target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true }));
      target.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true }));
      target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new CustomEvent('tap', { bubbles: true, cancelable: true }));
      target.dispatchEvent(new CustomEvent('vclick', { bubbles: true, cancelable: true }));
      target.click();
    });
  }

  private async clickReduceItemButton(): Promise<void> {
    const offlineReduceButton = this.page.getByTestId(offlineOrderDishesSelectors.reduceItemButton);
    if (await offlineReduceButton.isVisible().catch(() => false)) {
      await offlineReduceButton.click();
      return;
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const clicked = await this.page
        .evaluate(() => {
          const visible = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const reduceButton = Array.from(document.querySelectorAll<HTMLElement>('#reduce1icon')).find(visible);
          if (!reduceButton) {
            return false;
          }
          reduceButton.click();
          return true;
        })
        .catch(() => false);
      if (clicked) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return;
      }
      await this.selectOrderLineBeforeAction(this.reduceItemButton);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    await this.reduceItemButton.click({ timeout: 2_000 });
  }

  private async clickVoidItemButton(): Promise<void> {
    const offlineVoidButton = this.page.getByTestId(offlineOrderDishesSelectors.voidItemButton);
    if (await offlineVoidButton.isVisible().catch(() => false)) {
      await offlineVoidButton.click();
      return;
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const clicked = await this.page
        .evaluate(async () => {
          const visible = (candidate: HTMLElement) => {
              const rect = candidate.getBoundingClientRect();
              const style = window.getComputedStyle(candidate);
              return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const findVisible = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector)).find(visible);
          const removeButton = findVisible('#rmvItemicon');
          if (removeButton) {
            removeButton.click();
            await new Promise((resolve) => setTimeout(resolve, 100));
            findVisible('#reduce1icon')?.click();
            return true;
          }

          const reduceButton = findVisible('#reduce1icon');
          if (reduceButton) {
            reduceButton.click();
            return true;
          }

          const voidButton = findVisible('#odAvoid');
          if (!voidButton) {
            return false;
          }
          voidButton.click();
          return true;
        })
        .catch(() => false);
      if (clicked) {
        return;
      }

      const liveOrderItemName = this.page.locator('#oodbtbx .itemNameORDEREDtxt').last();
      if (await liveOrderItemName.isVisible().catch(() => false)) {
        await liveOrderItemName.click().catch(() => undefined);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const clicked = await this.page
      .evaluate(() => {
        const voidButton = document.querySelector<HTMLElement>('#odAvoid');
        if (!voidButton) {
          return false;
        }
        voidButton.click();
        return true;
      })
      .catch(() => false);
    if (!clicked) {
      await this.voidItemButton.click({ timeout: 2_000 });
    }
  }

  private async confirmVoidDialogIfVisible(timeout = 2_000): Promise<boolean> {
    const voidDialog = this.page.locator('#void-dialog:visible');
    const dialogVisible = await voidDialog
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
    if (!dialogVisible) {
      return false;
    }

    const firstReason = voidDialog.locator('#void-reason-options .option_item').first();
    if (!(await firstReason.isVisible().catch(() => false))) {
      await voidDialog
        .locator('#void-reason-select')
        .or(voidDialog.getByText('Choose void reason', { exact: true }))
        .first()
        .click()
        .catch(() => undefined);
      await firstReason.waitFor({ state: 'visible', timeout: 3_000 }).catch(() => undefined);
    }
    if (await firstReason.isVisible().catch(() => false)) {
      await firstReason.click();
    } else {
      await this.openLiveVoidReasonOptions();
      const liveReasonOption = this.page
        .locator('#void-reason-options .option_item:visible, .floatSqlBt:visible, [role="option"]:visible, .MuiMenuItem-root:visible, li:visible, option')
        .filter({ hasNotText: /Choose void reason|Void Reason|Please provide/i })
        .first();
      if (await liveReasonOption.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await liveReasonOption.click();
      } else {
        await this.selectNativeLiveVoidReason();
      }
    }

    const voidButton = voidDialog.locator('#void-submit').or(voidDialog.locator('.btn-main').filter({ hasText: /^Void$|^确认$|^确定$/ })).last();
    await voidButton.click();
    const livePermissionPrompt = this.page
      .locator('#pwd-input-dialog:visible, .modal.in:visible, [role="dialog"]:visible, .objBx:visible, #myalert:visible, #myalerttxt:visible')
      .filter({ hasText: livePermissionToastPattern })
      .last();
    await waitUntil(
      async () =>
        !(await voidDialog.isVisible().catch(() => false)) ||
        (await livePermissionPrompt.isVisible().catch(() => false)),
      {
        description: 'Void 弹窗关闭或权限提示出现',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    );
    return true;
  }

  private async openLiveVoidReasonOptions(): Promise<void> {
    await this.page
      .evaluate(() => {
        const dialog = document.querySelector<HTMLElement>('#void-dialog');
        if (!dialog) {
          return;
        }
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const target =
          dialog.querySelector<HTMLElement>('#void-reason-select') ??
          Array.from(dialog.querySelectorAll<HTMLElement>('*'))
            .filter(visible)
            .find((element) => /Choose void reason/i.test(element.textContent?.replace(/\s+/g, ' ').trim() ?? ''));
        let current: HTMLElement | null | undefined = target;
        const jquery = (window as unknown as { $?: (element: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        for (let depth = 0; current && depth < 6; depth += 1) {
          jquery?.(current).trigger('tap');
          jquery?.(current).trigger('click');
          current.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
          current.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
          current.click();
          current = current.parentElement;
        }
      })
      .catch(() => undefined);
  }

  private async selectNativeLiveVoidReason(): Promise<void> {
    await this.page
      .evaluate(() => {
        const dialog = document.querySelector<HTMLElement>('#void-dialog');
        const select = dialog?.querySelector('select');
        if (!(select instanceof HTMLSelectElement) || select.options.length < 2) {
          return;
        }
        select.selectedIndex = 1;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
      })
      .catch(() => undefined);
  }

  private async submitLivePasscodeIfVisible(password: string): Promise<boolean> {
    const promptPasscodeDialog = this.page
      .getByText('Enter Your Passcode', { exact: true })
      .last()
      .locator('xpath=ancestor::*[.//*[normalize-space(.)="task_alt"]][1]');
    const passcodeDialog = this.page
      .locator('#pwd-input-dialog:visible')
      .or(this.page.locator('.modal.in:visible, [role="dialog"]:visible').filter({ hasText: /Enter Your Passcode|Passcode|Password|密码/i }))
      .or(promptPasscodeDialog)
      .first();
    const visible = await passcodeDialog
      .waitFor({ state: 'visible', timeout: 3_000 })
      .then(() => true)
      .catch(() => false);
    if (!visible) {
      return false;
    }

    for (const digit of password) {
      const digitButton = passcodeDialog.locator(`[data-num="${digit}"], .pwd-input-item[data-num="${digit}"]`).first();
      if (await digitButton.isVisible().catch(() => false)) {
        await digitButton.click();
      } else {
        await passcodeDialog.getByText(new RegExp(`^\\s*${escapeRegExp(digit)}\\s*$`)).first().click();
      }
    }

    const submitButton = passcodeDialog.locator('[data-num="ds"], [data-num="ok"], [data-num="submit"], #pwd-input-submit, #ds').first();
    if (await submitButton.isVisible().catch(() => false)) {
      await submitButton.click();
    } else {
      await passcodeDialog.getByText(/^(task_alt|check|check_circle|done|✓)$/).last().click();
    }

    const capturedWhileClosing = await this.captureLivePermissionToast(1_500);
    const hidden = await passcodeDialog
      .waitFor({ state: 'hidden', timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!capturedWhileClosing) {
      await this.captureLivePermissionToast(500);
    }
    return hidden;
  }

  async searchMenuItem(keyword: string): Promise<void> {
    await step(`在点单页搜索菜品 ${keyword}`, async () => {
      const liveSearchInput = this.page.locator(liveOrderDishesSelectors.searchInput);
      const targetSearchInput = (await liveSearchInput.isVisible({ timeout: 1_000 }).catch(() => false))
        ? liveSearchInput
        : this.searchInput;
      await expect(targetSearchInput).toBeVisible({ timeout: 10_000 });
      await targetSearchInput.fill(keyword);
      await targetSearchInput.evaluate((input) => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await waitUntil(
        async () =>
          ((await targetSearchInput.inputValue().catch(() => '')).trim() === keyword &&
            (await this.readVisibleExactMenuItemCount(keyword)) === 1) ||
          (await this.page.locator('#itemdsply').getByText(keyword, { exact: true }).first().isVisible().catch(() => false)),
        {
          description: `等待搜索结果展示 ${keyword}`,
          intervalMs: 300,
          timeoutMs: 10_000,
        },
      ).catch(() => undefined);
      await this.page.keyboard.press('Escape').catch(() => undefined);
    });
  }

  async readSearchResult(): Promise<string> {
    return step('读取点单页搜索结果', async () => {
      const currentSearch = (await this.searchInput.inputValue().catch(() => '')).trim();
      if (currentSearch) {
        const exactMenuItem = this.menuItems.filter({ hasText: exactText(currentSearch) }).first();
        if (await exactMenuItem.isVisible({ timeout: 1_000 }).catch(() => false)) {
          return ((await exactMenuItem.textContent()) ?? '').trim();
        }

        const exactResult = this.page.locator('#itemdsply').getByText(currentSearch, { exact: true }).first();
        if (await exactResult.isVisible({ timeout: 1_000 }).catch(() => false)) {
          return ((await exactResult.textContent()) ?? '').trim();
        }
      }

      if (await this.searchResult.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.searchResult.textContent()) ?? '').trim();
      }

      await expect(this.menuItems.first()).toBeVisible({ timeout: 10_000 });
      return ((await this.menuItems.first().textContent()) ?? '').trim();
    });
  }

  async readSearchResultCount(): Promise<number> {
    return step('读取点单页搜索结果数量', async () => {
      const currentSearch = (await this.searchInput.inputValue().catch(() => '')).trim();
      if (currentSearch) {
        const visibleExactMenuItems = await this.readVisibleExactMenuItemCount(currentSearch);
        if (visibleExactMenuItems > 0) {
          return visibleExactMenuItems;
        }
      }

      return this.searchResultItems.count();
    });
  }

  async readSearchClass(): Promise<string> {
    return step('读取点单页搜索框状态', async () => {
      if (await this.page.locator(liveOrderDishesSelectors.searchInput).isVisible({ timeout: 500 }).catch(() => false)) {
        return 'iptgrp';
      }
      const liveSearchWrapper = this.page.locator('#schipt');
      if ((await liveSearchWrapper.count()) > 0) {
        const wrapperClass = (await liveSearchWrapper.getAttribute('class')) ?? '';
        if (wrapperClass) {
          return wrapperClass;
        }
      }
      const inputClass = (await this.searchInput.getAttribute('class')) ?? '';
      return inputClass || 'iptgrp hide';
    });
  }

  async clearSearch(): Promise<void> {
    await step('清空点单页搜索条件', async () => {
      if (!(await this.searchClearButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.searchInput.fill('');
        await this.searchInput.evaluate((input) => {
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
        return;
      }
      await this.searchClearButton.click();
    });
  }

  async openGlobalOptionModify(defaultAction: 'no' | 'none' = 'no'): Promise<void> {
    await step('打开当前菜品的 Global Option Modify 区域', async () => {
      await this.orderItemName.click();
      await this.orderModifyButton.click();
      if (defaultAction === 'no') {
        await this.globalOptionNoButton.click();
      }
    });
  }

  async addGlobalOptionListItem(): Promise<void> {
    await step('点击 Global Option 列表 Add', async () => {
      await this.globalOptionListAddButton.click();
    });
  }

  async addPricedGlobalOptionListItem(count = 0): Promise<number> {
    return step('点击带价格的 Global Option 列表 Add 并读取价格', async () => {
      if (count > 0) {
        await this.setGlobalOptionListCount(count);
      }
      await this.globalOptionListAddButton.click();
      const livePricedChoice = this.page.locator(liveOrderDishesSelectors.globalOptionPricedChoice).first();
      if (await livePricedChoice.isVisible({ timeout: 3_000 }).catch(() => false)) {
        const optionPrice = parseCurrency((await livePricedChoice.textContent()) ?? '0');
        await livePricedChoice.click();
        return optionPrice;
      }
      const optionPrice = Number((await this.globalOptionListAddButton.getAttribute('data-price')) ?? '0');
      return optionPrice;
    });
  }

  async selectPricedGlobalOption(): Promise<number> {
    return step('选择带价格的 Global Option', async () => {
      const livePricedChoice = this.page.locator(liveOrderDishesSelectors.globalOptionPricedChoice).first();
      if (await livePricedChoice.isVisible({ timeout: 3_000 }).catch(() => false)) {
        const optionPrice = parseCurrency((await livePricedChoice.textContent()) ?? '0');
        await livePricedChoice.click();
        return optionPrice;
      }
      const optionPrice = Number((await this.globalOptionListAddButton.getAttribute('data-price')) ?? '0');
      await this.globalOptionListAddButton.click();
      return optionPrice;
    });
  }

  async setGlobalOptionListCount(count: number): Promise<void> {
    await step(`设置 Global Option 列表数量为 ${count}`, async () => {
      if (await this.fillOpenNumberInputAndSubmit(count)) {
        return;
      }
      const clickedLiveCount = await this.clickLiveGlobalOptionCountButton();
      if (!clickedLiveCount) {
        await this.globalOptionListCountButton.first().click({ timeout: 5_000 });
      }
      if (!(await this.fillOpenNumberInputAndSubmit(count))) {
        throw new Error('Global Option count 数字键盘未打开');
      }
    });
  }

  private async fillOpenNumberInputAndSubmit(count: number): Promise<boolean> {
    if (!(await this.globalOptionCountInput.isVisible({ timeout: 500 }).catch(() => false))) {
      return false;
    }
    const clearButton = this.page.locator('#number-input-clear');
    if (await clearButton.isVisible({ timeout: 500 }).catch(() => false)) {
      await clearButton.click();
      for (const digit of String(count)) {
        await this.page.locator(`.number-input-item[data-num="${digit}"]`).click();
      }
    } else {
      await this.globalOptionCountInput.fill(String(count));
    }
    await this.globalOptionCountSubmitButton.click();
    await this.globalOptionCountInput.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
    return true;
  }

  private async clickLiveGlobalOptionCountButton(): Promise<boolean> {
    return this.page
      .evaluate((selectors) => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const countButton = selectors
          .flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)))
          .find(visible);
        if (!countButton) {
          return false;
        }
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        for (const eventName of ['vmousedown', 'tap', 'vclick', 'click']) {
          jquery?.(countButton).trigger(eventName);
        }
        countButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        countButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        countButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        countButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        countButton.dispatchEvent(new CustomEvent('tap', { bubbles: true, cancelable: true }));
        countButton.dispatchEvent(new CustomEvent('vclick', { bubbles: true, cancelable: true }));
        countButton.click();
        return true;
      }, [liveOrderDishesSelectors.globalOptionCountButton])
      .catch(() => false);
  }

  async reduceGlobalOptionListItem(): Promise<void> {
    await step('点击 Global Option 列表 Reduce', async () => {
      await this.globalOptionListReduceButton.click();
    });
  }

  async isGlobalOptionModifyAreaVisible(): Promise<boolean> {
    return step('判断 Modify Global Option 区域是否展示', async () => {
      if (await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)) {
        return (await this.page.locator(liveOrderDishesSelectors.globalOptionArea).count()) > 0;
      }
      return this.globalOptionArea.isVisible();
    });
  }

  async readGlobalOptionListCount(): Promise<number> {
    return step('读取 Global Option 列表数量', async () => {
      const countText = await this.globalOptionListCount.first().textContent({ timeout: 1_000 }).catch(() => '');
      const count = Number(countText || '0');
      return Number.isFinite(count) ? count : 0;
    });
  }

  async addModifyNote(name: string, price: number): Promise<void> {
    await step('在 Modify 中添加菜品备注', async () => {
      await this.orderModifyButton.click();
      await expect(this.modifyNoteInput).toBeVisible({ timeout: 10_000 });
      await this.modifyNoteInput.fill(name);
      await this.modifyNotePriceInput.fill(String(price));
      await this.modifySaveButton.click();
    });
  }

  async addTip(amount: number): Promise<void> {
    await step(`给订单添加小费 ${amount}`, async () => {
      await this.openTipDialog();
      await this.liveItemPriceClearButton.click({ timeout: 2_000 }).catch(() => undefined);
      if (await this.tipSubmitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.tipInput.fill(formatCentsAsDollars(amount));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.tipSubmitButton.click();
      } else {
        await this.tipInput.fill(String(amount));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.tipInput.press('Enter');
      }
      if (await this.tipConfirmButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.tipConfirmButton.click();
      }
      await expect(this.tipDialog).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
    });
  }

  async addTipAndReadToast(amount: number): Promise<string> {
    return step(`给订单添加小费 ${amount} 并读取提示`, async () => {
      await this.openTipDialog();
      await this.liveItemPriceClearButton.click({ timeout: 2_000 }).catch(() => undefined);
      if (await this.tipSubmitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.tipInput.fill(formatCentsAsDollars(amount));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.tipSubmitButton.click();
      } else {
        await this.tipInput.fill(String(amount));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.tipInput.press('Enter');
      }
      const tipToast = await this.readLiveOrOfflineTipToast();
      if (await this.tipConfirmButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.tipConfirmButton.click();
      }
      await expect(this.tipDialog).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
      return tipToast;
    });
  }

  private async openTipDialog(): Promise<void> {
    if (await this.tipInput.isVisible().catch(() => false)) {
      return;
    }
    await this.totalBox.click({ timeout: 2_000 }).catch(() => undefined);
    if (await this.tipButton.isVisible().catch(() => false)) {
      await this.tipButton.click();
    } else {
      await this.page.evaluate(() => document.getElementById('odtipsicon')?.click()).catch(() => undefined);
    }
    await expect(this.tipInput).toBeVisible({ timeout: 10_000 });
  }

  async applyOrderCharge(rate: '0%' | '5%' | '10%' | '20%'): Promise<void> {
    await step(`应用整单按比例加收 ${rate}`, async () => {
      if (!(await this.orderCharge20Button.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.applyLiveOrderCharge(rate);
        return;
      }

      if (rate === '0%') {
        await this.orderChargeZeroButton.click();
        return;
      }
      if (rate === '5%') {
        await this.orderCharge5Button.click();
        return;
      }
      if (rate === '10%') {
        await this.orderCharge10Button.click();
        return;
      }
      if (rate !== '20%') {
        throw new Error(`Unsupported offline order charge rate: ${rate}`);
      }
      await this.orderCharge20Button.click();
    });
  }

  private async applyLiveOrderCharge(rate: '0%' | '5%' | '10%' | '20%'): Promise<void> {
    await this.totalBox.click({ timeout: 2_000 }).catch(() => undefined);
    const liveChargeButton = this.page.locator("//div[@id='pplbtbx' or @id='addprc']//div[text()='Charge']");
    await expect(liveChargeButton).toBeVisible({ timeout: 10_000 });
    await liveChargeButton.click();

    const removeExistingChargePrompt = this.page.locator('.objBxTxt');
    if (await removeExistingChargePrompt.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await this.page.locator('#yes').click();
    }

    await expect(this.page.locator('#subitemlist')).toBeVisible({ timeout: 10_000 });
    await this.page.locator('#dcclearall').click();
    await this.ensureLiveDiscountRowSelected(this.liveDiscountRows().first());
    for (const digit of rate.replace('%', '')) {
      await this.page.locator(`#mykbfl_${digit}`).click();
    }
    await this.page.locator('#perBtn_true').click();
    await this.page.locator('#disOk').click();
    await expect(this.page.locator('#subitemlist')).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
  }

  private async openLiveDiscountPanelIfNeeded(): Promise<void> {
    if (await this.page.locator(liveOrderDishesSelectors.discountPanel).isVisible({ timeout: 1_000 }).catch(() => false)) {
      return;
    }

    await this.totalBox.click({ timeout: 2_000 }).catch(() => undefined);
    await expect(this.liveOrderDiscountButton).toBeVisible({ timeout: 10_000 });
    await this.liveOrderDiscountButton.click();
    await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeVisible({ timeout: 10_000 });
  }

  private async closeLiveDiscountPanelIfVisible(): Promise<void> {
    if (await this.page.locator(liveOrderDishesSelectors.discountPanel).isVisible({ timeout: 1_000 }).catch(() => false)) {
      await this.page.locator(liveOrderDishesSelectors.discountDoneButton).click();
      await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
    }
  }

  private async applyLiveDiscountValue(options: {
    target: { kind: 'wholeOrder' } | { kind: 'item'; indexes: readonly number[] };
    value: number;
    isPercent: boolean;
    confirm: boolean;
  }): Promise<void> {
    await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeVisible({ timeout: 10_000 });

    if (options.target.kind === 'wholeOrder') {
      await this.ensureLiveWholeOrderDiscountSelected();
    } else {
      await this.clearLiveDiscountRowSelection();
      for (const index of options.target.indexes) {
        await this.clickLiveDiscountRowCheckboxByIndex(index);
      }
    }
    await this.page.waitForTimeout(150);

    const discountValueText = String(options.value);
    const keyDelayMs = discountValueText.includes('.') ? 600 : 120;
    for (const character of discountValueText) {
      const key =
        character === '.'
          ? this.page.locator(`${liveOrderDishesSelectors.discountKeyButtonPrefix}dot`)
          : this.page.locator(`${liveOrderDishesSelectors.discountKeyButtonPrefix}${character}`);
      await expect(key).toBeVisible({ timeout: 5_000 });
      await this.clickLiveMobileElement(key);
      await this.page.waitForTimeout(keyDelayMs);
    }

    if (options.isPercent) {
      await this.clickLiveMobileElement(this.page.locator(liveOrderDishesSelectors.discountPercentButton));
      await this.page.waitForTimeout(discountValueText.includes('.') ? 600 : 150);
      if (await this.captureLivePermissionToast(2_500)) {
        return;
      }
      await this.waitForLiveDiscountPercentInput(options.value);
    } else {
      const amountButton = this.page.getByText(`$${options.value.toFixed(2)} off`, { exact: true });
      await expect(amountButton).toBeVisible({ timeout: 5_000 });
      await this.clickLiveMobileElement(amountButton);
    }

    if (options.confirm) {
      await this.page.locator(liveOrderDishesSelectors.discountDoneButton).click();
      await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
    }
  }

  private async ensureLiveDiscountRowSelected(row: Locator): Promise<void> {
    await expect(row).toBeVisible({ timeout: 10_000 });
    if (await this.isLiveDiscountRowSelected(row)) {
      return;
    }

    const box = await row.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + Math.min(40, box.width / 2), box.y + box.height / 2);
    } else {
      await row.click();
    }

    await expect
      .poll(() => this.isLiveDiscountRowSelected(row), { timeout: 5_000 })
      .toBe(true);
  }

  private async ensureLiveWholeOrderDiscountSelected(): Promise<void> {
    const panel = this.page.locator(liveOrderDishesSelectors.discountPanel);
    await expect(panel).toBeVisible({ timeout: 10_000 });
    await this.clearLiveDiscountRowSelection();
    await this.clickLiveWholeOrderDiscountCheckbox();
    await expect.poll(() => this.isLiveWholeOrderDiscountSelected(), { timeout: 5_000 }).toBe(true);
  }

  private async isLiveDiscountRowSelected(row: Locator): Promise<boolean> {
    return row
      .evaluate((element) => {
        const text = (element.textContent ?? '').replace(/\s+/g, ' ').trim();
        return (
          element.classList.contains('on') ||
          element.classList.contains('dlitemAct') ||
          /check_box\s+Whole Order/.test(text) ||
          (text.includes('check_box') && !text.includes('check_box_outline_blank'))
        );
      })
      .catch(() => false);
  }

  private async readLiveDiscountRowLastCurrency(row: Locator): Promise<string> {
    const text = ((await row.textContent()) ?? '').trim();
    const prices = text.match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
    return prices.at(-1) ?? text;
  }

  private liveDiscountRows(): Locator {
    return this.page.locator(liveOrderDishesSelectors.discountRows).or(this.page.locator(liveDiscountRowsByCheckboxXPath));
  }

  private async isLiveWholeOrderDiscountSelected(): Promise<boolean> {
    return this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const firstDiscountRow = document.querySelector<HTMLElement>('#subitemlist > div:first-child');
        if (firstDiscountRow && visible(firstDiscountRow)) {
          const rowText = (firstDiscountRow.innerText || firstDiscountRow.textContent || '').replace(/\s+/g, ' ').trim();
          return /\bcheck_box\b/.test(rowText) && !rowText.includes('check_box_outline_blank');
        }
        const visibleText = Array.from(document.querySelectorAll<HTMLElement>('*'))
          .filter(visible)
          .map((element) => element.innerText || element.textContent || '')
          .join('\n')
          .replace(/\s+/g, ' ');
        return /check_box\s+Whole Order/.test(visibleText);
      })
      .catch(() => false);
  }

  private async clearLiveDiscountRowSelection(): Promise<void> {
    const clearSelectedButton = this.page.locator(liveOrderDishesSelectors.discountSelectedClearButton);
    if (await clearSelectedButton.isVisible({ timeout: 500 }).catch(() => false)) {
      await this.clickLiveMobileElement(clearSelectedButton);
    }
  }

  private async clickLiveDiscountRowCheckboxByIndex(index: number): Promise<void> {
    await this.page.evaluate((targetIndex) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const panel = document.querySelector<HTMLElement>('#subitemlist');
      if (!panel) {
        throw new Error('live discount panel not found');
      }

      const iconElements = Array.from(panel.querySelectorAll<HTMLElement>('span, div'))
        .filter(visible)
        .filter((element) => /check_box/.test(element.textContent?.trim() ?? ''));
      const rowByTop = new Map<number, { row: HTMLElement; icon: HTMLElement; top: number }>();
      for (const icon of iconElements) {
        let current: HTMLElement | null = icon;
        let row: HTMLElement | null = null;
        for (let depth = 0; current && depth < 8; depth += 1) {
          const text = current.textContent ?? '';
          const rect = current.getBoundingClientRect();
          const prices = text.match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
          if (prices.length >= 2 && rect.width > 300 && rect.height >= 32 && rect.height <= 140) {
            row = current;
            break;
          }
          current = current.parentElement;
        }
        if (!row) {
          continue;
        }
        const rect = row.getBoundingClientRect();
        const key = Math.round(rect.top);
        const existing = rowByTop.get(key);
        if (!existing || rect.width * rect.height < existing.row.getBoundingClientRect().width * existing.row.getBoundingClientRect().height) {
          rowByTop.set(key, { row, icon, top: rect.top });
        }
      }
      const rows = [...rowByTop.values()].sort((left, right) => left.top - right.top);
      const target = rows[targetIndex]?.icon;
      if (!target) {
        throw new Error(`live discount row ${targetIndex} not found`);
      }
      target.click();
    }, index);
  }

  private async clickLiveWholeOrderDiscountCheckbox(): Promise<void> {
    const clicked = await this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const firstDiscountRow = document.querySelector<HTMLElement>('#subitemlist > div:first-child');
      if (firstDiscountRow && visible(firstDiscountRow)) {
        firstDiscountRow.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        firstDiscountRow.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        firstDiscountRow.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        firstDiscountRow.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        firstDiscountRow.click();
        return true;
      }
      const labels = Array.from(document.querySelectorAll<HTMLElement>('*'))
        .filter(visible)
        .filter((element) => element.textContent?.trim() === 'Whole Order');
      const candidates: HTMLElement[] = [];
      for (const label of labels) {
        let current: HTMLElement | null = label;
        for (let depth = 0; current && depth < 8; depth += 1) {
          const text = current.textContent ?? '';
          const rect = current.getBoundingClientRect();
          const prices = text.match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
          if (prices.length >= 2 && rect.width > 250 && rect.height >= 24 && rect.height <= 160) {
            candidates.push(current);
          }
          current = current.parentElement;
        }
      }
      const row = candidates.sort((left, right) => {
        const leftRect = left.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();
        return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
      })[0];
      if (row) {
        const rect = row.getBoundingClientRect();
        const icon = Array.from(row.querySelectorAll<HTMLElement>('span, div'))
          .filter(visible)
          .find((element) => /check_box/.test(element.textContent?.trim() ?? ''));
        const targetRect = (icon ?? row).getBoundingClientRect();
        const point = {
          x: icon ? targetRect.left + targetRect.width / 2 : rect.left + Math.min(32, rect.width / 6),
          y: icon ? targetRect.top + targetRect.height / 2 : rect.top + rect.height / 2,
        };
        document.elementFromPoint(point.x, point.y)?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true, view: window }),
        );
        return true;
      }
      throw new Error('live whole order discount row not found');
    });
    if (!clicked) {
      throw new Error('live whole order discount row not found');
    }
  }

  private async clickLiveMobileElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  private async waitForLiveDiscountPercentInput(value: number): Promise<void> {
    const expectedText = `${value}% off`;
    await expect
      .poll(
        () =>
          this.page.evaluate((text) => {
            const visible = (element: HTMLElement) => {
              const rect = element.getBoundingClientRect();
              const style = window.getComputedStyle(element);
              return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
            };
            const visibleText = Array.from(document.querySelectorAll<HTMLElement>('*'))
              .filter(visible)
              .map((element) => element.innerText || element.textContent || '')
              .join('\n');
            return visibleText.includes(text) || livePermissionToastPattern.test(visibleText);
          }, expectedText),
        { timeout: 5_000 },
      )
      .toBe(true);
  }

  async applyTaxableOrderCharge(rate: '10%'): Promise<void> {
    await step(`应用计税整单按比例加收 ${rate}`, async () => {
      await this.orderCharge10TaxableButton.click();
    });
  }

  async applyCustomFixedOrderCharge(amount: number, taxed: boolean): Promise<void> {
    await step(`应用自定义固定加收 ${amount} 且计税为 ${taxed ? '开启' : '关闭'}`, async () => {
      await expect(this.customChargeValueInput).toBeVisible();
      await this.customChargeValueInput.fill(String(amount));
      await this.customChargeRateTypeSelect.selectOption('amount');
      await this.customChargeTaxedSelect.selectOption(taxed ? 'true' : 'false');
      await this.customChargeAddButton.click();
    });
  }

  async applyCustomPercentOrderCharge(percent: number, taxed: boolean): Promise<void> {
    await step(`应用自定义百分比加收 ${percent}% 且计税为 ${taxed ? '开启' : '关闭'}`, async () => {
      await expect(this.customChargeValueInput).toBeVisible();
      await this.customChargeValueInput.fill(String(percent));
      await this.customChargeRateTypeSelect.selectOption('percent');
      await this.customChargeTaxedSelect.selectOption(taxed ? 'true' : 'false');
      await this.customChargeAddButton.click();
    });
  }

  async applyPresetCharge(name: string): Promise<void> {
    await step(`应用预设加收 ${name}`, async () => {
      await this.page.getByTestId('order-charge-open').click();
      await this.page.getByTestId('preset-charge').filter({ hasText: name }).click();
      await this.page.getByTestId('order-charge-ok').click();
    });
  }

  async openChargeDialog(): Promise<void> {
    await step('打开整单加收弹窗', async () => {
      await this.page.getByTestId('order-charge-open').click();
    });
  }

  async readSelectedPresetCharges(): Promise<Record<string, string>> {
    return step('读取已选预设加收', async () => this.page.getByTestId('selected-charge-item').evaluateAll((nodes) => Object.fromEntries(
      nodes.map((node) => {
        const element = node as HTMLElement;
        return [element.dataset.chargeName ?? '', element.dataset.chargeRate ?? ''];
      }).filter(([name]) => Boolean(name)),
    )));
  }

  async reapplyPresetCharge(name: string): Promise<void> {
    await step(`重新选择预设加收 ${name}`, async () => {
      await this.page.getByTestId('preset-charge').filter({ hasText: name }).click();
      await this.page.getByTestId('preset-charge').filter({ hasText: name }).click();
      await this.page.getByTestId('order-charge-ok').click();
    });
  }

  async confirmChargeDialog(): Promise<void> {
    await step('确认整单加收弹窗', async () => {
      await this.page.getByTestId('order-charge-ok').click();
    });
  }

  async openDiscountAndReadWholeOrderPrice(): Promise<string> {
    return step('打开折扣界面并读取整单金额', async () => {
      if (await this.orderDiscountButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.orderDiscountButton.click();
        return ((await this.orderDiscountWholeOrderPrice.textContent()) ?? '').trim();
      }

      await this.totalBox.click({ timeout: 2_000 }).catch(() => undefined);
      await expect(this.liveOrderDiscountButton).toBeVisible({ timeout: 10_000 });
      await this.liveOrderDiscountButton.click();
      await expect(this.liveOrderDiscountWholeOrderPrice).toBeVisible({ timeout: 10_000 });
      return this.readLiveDiscountRowLastCurrency(this.liveOrderDiscountWholeOrderPrice);
    });
  }

  async applyWholeOrderDiscountPercent(percent: number): Promise<void> {
    await step(`应用整单折扣 ${percent}%`, async () => {
      if (!(await this.orderDiscountPercentInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.applyLiveDiscountValue({
          target: { kind: 'wholeOrder' },
          value: percent,
          isPercent: true,
          confirm: false,
        });
        return;
      }
      await this.orderDiscountPercentInput.fill(String(percent));
      await this.orderDiscountSubmitButton.click();
    });
  }

  async applySelectedItemsDiscountPercent(percent: number): Promise<void> {
    await step(`给选中菜品应用 ${percent}% 单菜折扣`, async () => {
      if (!(await this.itemDiscountPercentInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openLiveDiscountPanelIfNeeded();
        await this.applyLiveDiscountValue({
          target: { kind: 'item', indexes: [1] },
          value: percent,
          isPercent: true,
          confirm: false,
        });
        return;
      }
      await this.itemDiscountPercentInput.fill(String(percent));
      await this.itemDiscountSubmitButton.click();
    });
  }

  async clearWholeOrderDiscount(): Promise<void> {
    await step('清空整单折扣', async () => {
      await this.orderDiscountClearWholeButton.click();
    });
  }

  async clearSelectedItemDiscounts(): Promise<void> {
    await step('清空选中菜品折扣', async () => {
      await this.itemDiscountClearSelectedButton.click();
    });
  }

  async readOrderLineText(index: number): Promise<string> {
    return step(`读取第 ${index} 个订单菜品文本`, async () => ((await this.orderLineItems.nth(index - 1).textContent()) ?? '').trim());
  }

  async readOrderPriceDetail(): Promise<string> {
    return step('读取点单页订单价格明细', async () => ((await this.orderPriceDetail.textContent()) ?? '').trim());
  }

  async readOrderChargeItems(): Promise<Record<string, string>> {
    return step('读取点单页订单加收明细', async () => {
      const detail = ((await this.orderPriceDetail.textContent()) ?? '').trim();
      const entries = detail
        .split(/\n+/)
        .map((line) => line.trim().match(/^(.+)\s+(-?\d+\.\d{2})$/))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .filter((match) => match[1] !== 'Subtotal')
        .map((match) => [match[1] ?? '', match[2] ?? ''] as const);
      return Object.fromEntries(entries);
    });
  }

  async readDiscountTip(): Promise<string> {
    return step('读取整单折扣权限提示', async () => this.readLiveOrOfflinePermissionToast());
  }

  async readWholeOrderDiscountSummary(): Promise<{ subtotal: number; discount: number }> {
    return step('读取整单折扣后的订单金额摘要', async () => {
      if (await this.orderDiscountAmount.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return {
          subtotal: await this.readSubtotal(),
          discount: parseCurrency((await this.orderDiscountAmount.textContent()) ?? '0'),
        };
      }

      if (await this.page.locator(liveOrderDishesSelectors.discountPanel).isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.page.locator(liveOrderDishesSelectors.discountDoneButton).click();
        await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
      }

      return this.page.evaluate((selectors) => {
        const subtotalText = document.querySelector<HTMLElement>(selectors.orderSubtotal)?.textContent ?? '0';
        const discountText =
          document.querySelector<HTMLElement>(selectors.orderDiscountAmount)?.textContent ??
          Array.from(document.querySelectorAll<HTMLElement>('.dlitem'))
            .find((row) => row.textContent?.includes('Discount('))
            ?.querySelector<HTMLElement>('.dlmprc')
            ?.textContent ??
          '0';
        return {
          subtotal: Number((subtotalText.match(/-?\d+(?:,\d{3})*(?:\.\d+)?/)?.[0] ?? '0').replace(/,/g, '')),
          discount: -Number((discountText.match(/-?\d+(?:,\d{3})*(?:\.\d+)?/)?.[0] ?? '0').replace(/,/g, '')),
        };
      }, liveOrderDishesSelectors);
    });
  }

  async readChargeLabel(): Promise<string> {
    return step('读取整单加收名称', async () => {
      if (await this.orderChargeLabel.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.orderChargeLabel.textContent()) ?? '').trim();
      }
      const liveChargeName = this.page.locator('#chargeItem > div').filter({ hasText: /^Charge\(\d+%\)$/ }).first();
      return ((await liveChargeName.textContent()) ?? '').trim();
    });
  }

  async readChargePrice(): Promise<string> {
    return step('读取整单加收金额', async () => {
      if (await this.orderChargePrice.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.orderChargePrice.textContent()) ?? '').trim();
      }
      const liveChargePrice = this.page.locator('#chargeItem > div')
        .filter({ hasText: /^Charge\(\d+%\)$/ })
        .first()
        .locator('xpath=following-sibling::div[1]');
      return ((await liveChargePrice.textContent()) ?? '').trim();
    });
  }

  async readItemCount(): Promise<string> {
    return step('读取点单菜品总数量', async () => {
      if (await this.orderItemCount.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.orderItemCount.textContent()) ?? '').trim();
      }

      return String(await this.sumVisibleLiveOrderItemQuantities());
    });
  }

  async readOrderLineCount(): Promise<number> {
    return step('读取点单菜品行数', async () => {
      if (await this.liveOrderItemRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        return this.liveOrderItemRows.evaluateAll((rows) =>
          rows.filter((row) => {
            const htmlRow = row as HTMLElement;
            const rect = htmlRow.getBoundingClientRect();
            const style = window.getComputedStyle(htmlRow);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          }).length,
        );
      }

      return this.orderLineItems.count();
    });
  }

  async isOrderItemOptionListVisible(): Promise<boolean> {
    return step('判断当前菜品 option 列表是否展示', async () => {
      if (await this.page.getByTestId('order-options').isVisible({ timeout: 1_000 }).catch(() => false)) {
        return true;
      }

      return this.orderOptions.first().isVisible({ timeout: 3_000 }).catch(() => false);
    });
  }

  async isMenuItemVisible(itemName: string): Promise<boolean> {
    return step(`判断菜单菜品 ${itemName} 是否展示`, async () =>
      waitUntil(
        async () => this.menuItems.filter({ hasText: exactText(itemName) }).first().isVisible().catch(() => false),
        {
          description: `菜单菜品 ${itemName} 展示`,
          intervalMs: 100,
          timeoutMs: 3_000,
        },
      )
        .then(() => true)
        .catch(() => false),
    );
  }

  async readFirstItemQuantity(): Promise<string> {
    return step('读取点单首行菜品数量', async () => {
      const offlineQuantity = await this.orderLineItems.first().getAttribute('data-quantity', { timeout: 1_000 }).catch(() => null);
      if (offlineQuantity) {
        return offlineQuantity;
      }

      if (await this.liveOrderItemRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        return this.liveOrderItemRows.first().evaluate((row) => {
          const visible = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const firstColumnText = row.children.item(0)?.textContent?.trim() ?? '';
          const pythonMappedQuantityText =
            row.querySelector<HTMLElement>(':scope > div > div:first-child > div:nth-child(2)')?.textContent?.trim() ?? '';
          const visibleQuantityText = Array.from(row.querySelectorAll<HTMLElement>('*'))
            .filter(visible)
            .map((element) => element.textContent?.trim() ?? '')
            .find((text) => /^\d+(?:\.\d+)?x?$/.test(text));
          return (visibleQuantityText || pythonMappedQuantityText || firstColumnText).match(/\d+(?:\.\d+)?/)?.[0] ?? '';
        });
      }

      return '';
    });
  }

  async readOrderLineQuantity(index: number): Promise<string> {
    return step(`读取点单第 ${index} 行菜品数量`, async () => {
      if (await this.liveOrderItemRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        if ((await this.liveOrderItemRows.count()) < index) {
          return '';
        }
        return this.liveOrderItemRows.nth(index - 1).evaluate((line) => {
          const visible = (element: HTMLElement) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          };
          const firstColumnText = line.children.item(0)?.textContent?.trim() ?? '';
          const pythonMappedQuantityText =
            line.querySelector<HTMLElement>(':scope > div > div:first-child > div:nth-child(2)')?.textContent?.trim() ?? '';
          const visibleQuantityText = Array.from(line.querySelectorAll<HTMLElement>('*'))
            .filter(visible)
            .map((element) => element.textContent?.trim() ?? '')
            .find((text) => /^\d+(?:\.\d+)?x?$/.test(text));
          return (visibleQuantityText || pythonMappedQuantityText || firstColumnText).match(/\d+(?:\.\d+)?/)?.[0] ?? '';
        });
      }
      const orderLine = this.orderLineItems.nth(index - 1);
      const offlineQuantity = await orderLine.getAttribute('data-quantity', { timeout: 1_000 }).catch(() => null);
      if (offlineQuantity) {
        return offlineQuantity;
      }
      const liveLineQuantity = await orderLine.evaluate((line) => {
        const firstColumnText = line.children.item(0)?.textContent?.trim() ?? '';
        return firstColumnText.match(/^\d+(?:\.\d+)?$/)?.[0] ?? '';
      }).catch(() => '');
      if (liveLineQuantity) {
        return liveLineQuantity;
      }
      return this.page.evaluate((lineIndex) => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const quantities = Array.from(document.querySelectorAll<HTMLElement>('#oodbtbx *'))
          .filter(visible)
          .map((element) => element.textContent?.trim() ?? '')
          .filter((text) => /^\d+(?:\.\d+)?$/.test(text));
        return quantities[lineIndex - 1] ?? '';
      }, index);
    });
  }

  async readOrderLinePrice(index: number): Promise<number> {
    return step(`读取点单第 ${index} 行菜品价格`, async () => {
      if (await this.liveOrderItemRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        if ((await this.liveOrderItemRows.count()) < index) {
          return 0;
        }
        const priceText = await this.liveOrderItemRows.nth(index - 1).evaluate((line) => {
          const textParts = Array.from(line.querySelectorAll<HTMLElement>('*')).map((element) => element.textContent?.trim() ?? '');
          return textParts.reverse().find((text) => /\$?\d+(?:\.\d{2})/.test(text)) ?? '';
        });
        return parseCurrency(priceText);
      }
      const orderLine = this.orderLineItems.nth(index - 1);
      const offlinePrice = await orderLine.getAttribute('data-price', { timeout: 1_000 }).catch(() => null);
      if (offlinePrice) {
        return Number(offlinePrice);
      }
      const priceText = await orderLine.evaluate((line) => {
        const textParts = Array.from(line.children).map((child) => child.textContent?.trim() ?? '');
        return textParts.reverse().find((text) => /\$?\d+(?:\.\d{2})/.test(text)) ?? '';
      });
      return parseCurrency(priceText);
    });
  }

  async readFirstItemName(): Promise<string> {
    return step('读取点单首行菜品名称', async () => {
      const liveName = this.liveOrderItemRows.first().locator(liveOrderDishesSelectors.orderedItemName).first();
      if (await liveName.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await liveName.textContent()) ?? '').trim();
      }
      return ((await this.orderLineItems.first().textContent()) ?? '').trim();
    });
  }

  async readFirstItemColor(): Promise<string> {
    return step('读取点单首行菜品颜色', async () => {
      const offlineColor = await this.orderLineItems.first().getAttribute('data-color', { timeout: 1_000 }).catch(() => null);
      if (offlineColor) {
        return offlineColor;
      }

      const liveName = this.liveOrderItemRows.first().locator(liveOrderDishesSelectors.orderedItemName).first();
      if (await liveName.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return liveName.evaluate((name) => {
          const color = window.getComputedStyle(name).color;
          const rgbMatch = color.match(/^rgb\((.+)\)$/);
          return rgbMatch ? `rgba(${rgbMatch[1]}, 1)` : color;
        });
      }

      return '';
    });
  }

  async fillGuestName(name: string): Promise<void> {
    await step(`填写点单客名 ${name}`, async () => {
      if (!(await this.orderGuestNameInput.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.page.locator(liveOrderDishesSelectors.orderHeaderBox).click();
        await this.deliveryInfoButton.click();
        await expect(this.page.locator(liveOrderDishesSelectors.pickupNameInput)).toBeVisible({ timeout: 10_000 });
        await this.page.locator(liveOrderDishesSelectors.pickupNameInput).fill(name);
        await this.page.locator(liveOrderDishesSelectors.pickupOrderButton).click();
        await expect(this.page.locator(liveOrderDishesSelectors.pickupNameInput)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
        return;
      }
      await this.orderGuestNameInput.fill(name);
    });
  }

  async splitEvenly(parts: number): Promise<void> {
    await step(`按 ${parts} 份平分订单`, async () => {
      if (await this.splitEvenButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.splitEvenButton.click();
        return;
      }

      await this.liveSplitButton.click();
      await waitUntil(
        async () =>
          (await this.liveSplitPrompt.isVisible().catch(() => false)) ||
          (await this.splitPanelEvenOrderButton.isVisible().catch(() => false)),
        {
          description: '等待 live 分单提示或分单面板展示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
      if (await this.liveSplitPrompt.isVisible().catch(() => false)) {
        await this.liveSplitKeepButton.click();
        await expect(this.liveSplitPrompt).toBeHidden({ timeout: 10_000 });
      }
      await expect(this.splitPanelEvenOrderButton).toBeVisible({ timeout: 10_000 });
      await this.splitPanelEvenOrderButton.click();
      await this.splitPanelKeypadNumberButton(parts).click();
      await this.splitPanelKeypadConfirmButton.click();
      await expect(this.splitPanelKeypadConfirmButton).toBeHidden({ timeout: 10_000 });
      await this.splitPanelSaveButton.click();
    });
  }

  async combineSplitOrders(): Promise<void> {
    await step('合并已拆分子单', async () => {
      await this.splitCombineButton.click();
    });
  }

  async openFoodWithoutTax(name: string, price: number): Promise<void> {
    await step('创建无税 Open Food 菜品', async () => {
      if (await this.openFoodNameInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.openFoodNameInput.fill(name);
        await this.openFoodPriceInput.fill(String(price));
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.openFoodNoTaxButton.click();
        return;
      }

      await this.liveOpenFoodButton.click();
      await expect(this.liveOpenFoodNameInput).toBeVisible({ timeout: 10_000 });
      await this.liveOpenFoodNameInput.fill(name);
      await this.liveOpenFoodPriceInput.click();
      await this.liveOpenFoodPriceInput.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
      await this.liveOpenFoodPriceInput.press('Backspace');
      await this.liveOpenFoodPriceInput.pressSequentially(String(Math.round(price * 100)));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.liveOpenFoodHideKeyboardButton.click({ timeout: 2_000 }).catch(() => undefined);
      const selectedTaxButtons = this.page.locator('#open-food-tax-list div.btn-outline-main[id*="tax_"]');
      for (let index = 0; index < 10 && (await selectedTaxButtons.count()) > 0; index += 1) {
        await selectedTaxButtons.first().click();
      }
      await this.liveOpenFoodSubmitButton.click();
      const noTaxConfirmButton = this.page.locator('#stillsavetxt:visible').or(this.page.getByRole('button', { name: /^Confirm$/ })).last();
      if (await noTaxConfirmButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await noTaxConfirmButton.click();
        await expect(noTaxConfirmButton).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
      }
      await expect(this.liveOpenFoodNameInput).toBeHidden({ timeout: 10_000 });
    });
  }

  async createOpenFoodWithKeyboard(language: string, expectedText: string): Promise<string> {
    return step('使用多语言键盘创建 Open Food 菜品', async () => {
      if (await this.openFoodButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.openFoodButton.click();
        await this.openFoodKeyboardLanguage.selectOption(language);
        await this.openFoodKeyboardTextInput.fill(expectedText);
        await new Promise((resolve) => setTimeout(resolve, 200));
        await this.openFoodKeyboardSubmitButton.click();
        return (await this.orderItemName.textContent()) ?? '';
      }

      await this.liveOpenFoodButton.click();
      await expect(this.liveOpenFoodNameInput).toBeVisible({ timeout: 10_000 });
      await this.page.locator('#kb_langselector').selectOption({ label: language });
      const chineseSimplifiedPinyinKeys = expectedText === '中文' ? [37, 31, 22, 42, 30, 15, 16, 42, 'enter'] : [];
      for (const key of chineseSimplifiedPinyinKeys) {
        await this.page.locator(`#kb_b${key}`).click();
      }
      if (chineseSimplifiedPinyinKeys.length === 0) {
        await this.liveOpenFoodNameInput.fill(expectedText);
      }
      const generatedName = (await this.liveOpenFoodNameInput.inputValue()).trim();
      await this.liveOpenFoodSubmitButton.click();
      return generatedName;
    });
  }

  async readDeliveryInfo(): Promise<string[]> {
    return step('读取点单页 Delivery Info 信息', async () => {
      if (await this.deliveryInfoRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.deliveryInfoButton.click();
        return (await this.deliveryInfoRows.allTextContents()).map((value) => value.trim());
      }

      await this.page.locator(liveOrderDishesSelectors.orderHeaderBox).click();
      await this.deliveryInfoButton.click();
      const liveInfoInputs = [
        '#dlvInfoPh',
        '#dlvInfoNm',
        '#dlvInfoaddr',
        '#dlvInfoaptG',
        '#dlvInfoCityG',
        '#dlvInfostateG',
        '#dlvInfozipcodeG',
        '#dlvInfoNote',
      ];
      const firstInputSelector = '#dlvInfoPh';
      await expect(this.page.locator(firstInputSelector)).toBeVisible({ timeout: 10_000 });
      return Promise.all(liveInfoInputs.map(async (selector) => (await this.page.locator(selector).inputValue()).trim()));
    });
  }

  async addComboWithOptions(optionCount: number): Promise<void> {
    await step(`添加包含 ${optionCount} 个 Option 的 Combo`, async () => {
      if (await this.comboItemButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.comboItemButton.click();
        return;
      }

      await this.addMenuItem('diy_combo1_adjustable');
      await expect(this.liveComboConfirmButton).toBeVisible({ timeout: 10_000 });
      const sectionCount = await this.liveComboSections.count();
      for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex += 1) {
        await this.liveComboSections.nth(sectionIndex).click();
        const description = ((await this.liveComboSectionDescription.textContent()) ?? '').trim();
        const requiredCount = Number(description.match(/\d+/)?.[0] ?? '1');
        for (let itemIndex = 0; itemIndex < requiredCount; itemIndex += 1) {
          await this.liveComboSubItemButtons.first().click();
          if (await this.liveComboDetailChoices.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
            await this.liveComboDetailChoices.first().click();
          }
          for (let optionIndex = 0; optionIndex < optionCount; optionIndex += 1) {
            const options = await this.liveComboOptionButtons.count();
            if (options <= 1) {
              break;
            }
            await this.liveComboOptionButtons.nth(1).click();
          }
        }
      }
      await this.liveComboConfirmButton.click();
      await expect(this.liveComboConfirmButton).toBeHidden({ timeout: 10_000 });
    });
  }

  async addQuickCombo(
    comboName: string,
    sections: readonly { name: string; items: readonly { name: string; quantity: number }[] }[] = [],
  ): Promise<void> {
    await step(`添加 Quick Combo ${comboName}`, async () => {
      if (!(await this.comboItemButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.addMenuItem(comboName);
        if (sections.length > 0) {
          await this.completeVisibleLiveComboSelectionBySections(sections);
        } else {
          await this.completeVisibleLiveComboSelection();
        }
        return;
      }
      await this.comboItemButton.click();
    });
  }

  async addWeightedQuickCombo(
    comboName: string,
    weight: number,
    sections: readonly { name: string; items: readonly { name: string; quantity: number }[] }[],
  ): Promise<void> {
    await step(`添加称重 Quick Combo ${comboName}`, async () => {
      await this.addMenuItem(comboName);
      if (await this.page.locator('#smpiptipt:visible').isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.inputLiveUnitPrice(weight);
        await this.unitPriceSubmitButton.click();
      } else if (await this.unitPriceInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.unitPriceInput.fill(String(weight));
        await this.unitPriceSubmitButton.click();
      }
      await this.completeVisibleLiveComboSelectionBySections(sections);
    });
  }

  async selectOrderedComboSubItem(comboName: string, subItemName: string): Promise<void> {
    await step(`选择套餐 ${comboName} 子菜 ${subItemName}`, async () => {
      if (!(await this.comboSubItems.first().isVisible({ timeout: 1_000 }).catch(() => false))) {
        if (
          (await this.liveComboConfirmButton.isVisible({ timeout: 1_000 }).catch(() => false)) ||
          (await this.page.locator('#liteComboEnter').isVisible({ timeout: 1_000 }).catch(() => false))
        ) {
          await this.clickVisibleLiveComboSubItem(subItemName);
          await this.completeVisibleLiveComboSelection(false);
          return;
        }

        const liveSubItem = this.page
          .locator(
            `xpath=//div[contains(@class,"itemNameORDEREDtxt") and normalize-space(.)=${xpathText(comboName)}]/ancestor::div[5]//div[contains(@class,"itemcbitemtx") and normalize-space(.)=${xpathText(subItemName)}]`,
          )
          .first();
        await expect(liveSubItem).toBeVisible({ timeout: 10_000 });
        await liveSubItem.click();
        return;
      }

      await this.comboSubItems.filter({ hasText: exactText(subItemName) }).click();
    });
  }

  async replaceComboSubItems(comboName: string, subItemNames: readonly string[]): Promise<void> {
    await step(`替换套餐 ${comboName} 子菜为 ${subItemNames.join(', ')}`, async () => {
      const firstSubItemName = subItemNames[0];
      if (!firstSubItemName) {
        return;
      }

      if (!(await this.comboSubItemChoices.first().isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.openLiveQuickComboEditor(comboName, firstSubItemName);
        for (const subItemName of subItemNames) {
          await this.clickVisibleLiveComboSubItem(subItemName);
        }

        const liveComboEnter = this.page.locator('#liteComboEnter');
        if (await liveComboEnter.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await liveComboEnter.click();
          await expect(liveComboEnter).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
        }
        return;
      }

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
      if (await this.comboOptionReduceButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.comboOptionReduceButton.click();
        return;
      }

      await expect(this.liveComboOptionCount.first()).toBeVisible({ timeout: 10_000 });
      await this.liveComboOptionCount.first().click();
      await expect(this.liveComboOptionReduceButton).toBeVisible({ timeout: 5_000 });
      await this.liveComboOptionReduceButton.click();
    });
  }

  async openFirstComboSubItem(): Promise<void> {
    await step('打开 Combo 第一个子菜', async () => {
      if (await this.comboFirstSubItemButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.comboFirstSubItemButton.click();
        return;
      }
      const liveFirstComboSubItem = this.page.locator('#oodbtbx .itemcbitemtx').first();
      await expect(liveFirstComboSubItem).toBeVisible({ timeout: 10_000 });
      await liveFirstComboSubItem.click();
    });
  }

  async clickComboSubItemEditNoteAndReadToast(): Promise<string> {
    return step('点击 Combo 子菜 Edit Note 并读取权限提示', async () => {
      if (await this.comboSubItemEditNoteButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.comboSubItemEditNoteButton.click();
        return ((await this.tipToast.textContent()) ?? '').trim();
      }

      const liveNoteButton = this.page
        .locator('#obtbx .Gsqbttx, #oodbtbx .Gsqbttx, .Gsqbttx')
        .filter({ hasText: exactText('Note') })
        .last();
      await expect(liveNoteButton).toBeVisible({ timeout: 10_000 });
      await liveNoteButton.click();
      return this.readLiveOrOfflinePermissionToast();
    });
  }

  async inputComboSubItemNote(note: string): Promise<void> {
    await step('输入 Combo 子菜备注', async () => {
      this.lastComboSubItemNote = note;
      if (await this.comboSubItemNoteInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.comboSubItemNoteInput.fill(note);
        await this.comboSubItemNoteInput.press('Enter');
        return;
      }

      const liveNoteInput = this.page.locator('#notes-input, #smpiptipt').first();
      await expect(liveNoteInput).toBeVisible({ timeout: 10_000 });
      await liveNoteInput.fill(note);
      const liveNoteSubmit = this.page.locator('#notes-submit, #smpiptgo').first();
      await expect(liveNoteSubmit).toBeVisible({ timeout: 5_000 });
      await liveNoteSubmit.click();
      await expect(liveNoteInput).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
    });
  }

  async readComboSubItemNote(): Promise<string> {
    return step('读取 Combo 子菜备注', async () => {
      if (await this.comboSubItemNoteText.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.comboSubItemNoteText.textContent()) ?? '').trim();
      }

      const liveNote = this.page.locator('#oodbtbx').getByText(exactText(this.lastComboSubItemNote)).first();
      await expect(liveNote).toBeVisible({ timeout: 10_000 });
      return ((await liveNote.textContent()) ?? '').trim();
    });
  }

  async readComboOptionCount(): Promise<number> {
    return step('读取 Combo Option 数量', async () => {
      if (await this.comboOptionCount.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return Number((await this.comboOptionCount.textContent()) ?? '0');
      }

      return this.liveComboOptionCount.count();
    });
  }

  async settleByCash(): Promise<void> {
    await step('现金完成当前订单付款', async () => {
      if (await this.settleCashButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.settleCashButton.click();
        return;
      }

      if (!(await this.page.locator('#pplnopmt:visible').isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.clickSettle();
      }
      await expect(this.liveSettleAllCashButton).toBeVisible({ timeout: 10_000 });
      await this.liveSettleAllCashButton.click();
      let finalPayClicked = false;
      await waitUntil(
        async () => {
          if (await this.liveSettleToast.isVisible().catch(() => false)) {
            return false;
          }
          if (!finalPayClicked && (await this.liveSettlePayAndPrintButton.isVisible().catch(() => false))) {
            finalPayClicked = true;
            await this.liveSettlePayAndPrintButton.click();
            return false;
          }
          if (!finalPayClicked && (await this.liveSettlePayButton.isVisible().catch(() => false))) {
            finalPayClicked = true;
            await this.liveSettlePayButton.click();
            return false;
          }
          return finalPayClicked && !(await this.page.locator('#pplnopmt:visible').isVisible().catch(() => false));
        },
        {
          description: 'live 现金付款完成',
          intervalMs: 300,
          timeoutMs: 20_000,
        },
      );
    });
  }

  async settleByCredit(): Promise<void> {
    await step('信用卡完成当前订单付款', async () => {
      if (await this.settleCreditButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.settleCreditButton.click();
        return;
      }

      await this.clickSettle();
      await expect(this.page.locator('#pplnopmt:visible')).toBeVisible({ timeout: 10_000 });
      const liveBackupCardButton = this.page.getByText('Backup', { exact: true }).last();
      if (await liveBackupCardButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
        await this.clickLivePaymentMethod('Backup');
        await this.clickLiveVisibleElement(liveOrderDishesSelectors.settleAllCashButton, '全额金额');
        if (await this.liveSettlePayButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await this.clickLiveVisibleElement(liveOrderDishesSelectors.settlePayButton, 'Pay');
        }
        await expect(this.page.locator('#pplnopmt:visible')).toBeHidden({ timeout: 20_000 });
        return;
      }
      await this.submitLiveManualCreditPayment();
      if (await this.page.locator('#pplnopmt:visible').isVisible({ timeout: 3_000 }).catch(() => false)) {
        await this.submitLiveManualCreditPayment();
      }
      await expect(this.page.locator('#pplnopmt:visible')).toBeHidden({ timeout: 20_000 });
    });
  }

  async settleByLoyaltyCard(): Promise<void> {
    await step('会员卡完成当前订单付款', async () => {
      if (!(await this.settleLoyaltyCardButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
        await this.payLiveStoredCard('loyalty');
        return;
      }
      await this.settleLoyaltyCardButton.click();
    });
  }

  async settleByGiftCard(): Promise<void> {
    await step('礼品卡完成当前订单付款', async () => {
      if (!(await this.settleGiftCardButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
        await this.payLiveStoredCard('gift');
        return;
      }
      await this.settleGiftCardButton.click();
    });
  }

  async settleByBackupCard(): Promise<void> {
    await step('备用卡完成当前订单付款', async () => {
      if (!(await this.settleBackupCardButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
        await expect(this.liveSettleBackupCardButton).toBeVisible({ timeout: 10_000 });
        await this.liveSettleBackupCardButton.click();
        await expect(this.page.locator('#pplnopmt:visible')).toBeHidden({ timeout: 20_000 });
        return;
      }
      await this.settleBackupCardButton.click();
    });
  }

  async settleBySelfCard(): Promise<void> {
    await step('自助卡完成当前订单付款', async () => {
      if (!(await this.settleSelfCardButton.isVisible({ timeout: 2_000 }).catch(() => false))) {
        await expect(this.liveSettleSelfCardButton).toBeVisible({ timeout: 10_000 });
        await this.liveSettleSelfCardButton.click();
        await this.clickLiveFinalPayButton();
        await expect(this.page.locator('#pplnopmt:visible')).toBeHidden({ timeout: 20_000 });
        return;
      }
      await this.settleSelfCardButton.click();
    });
  }

  async startPickupOrder(): Promise<void> {
    await step('进入 Pickup 点单并提交空取餐信息', async () => {
      await this.pickupButton.click();
      await this.pickupInfoSubmitButton.click();
    });
  }

  private async hideTransientCovers(): Promise<void> {
    await this.page
      .evaluate(() => {
        for (const cover of document.querySelectorAll<HTMLElement>('.mycover, [id^="floatcover"]')) {
          cover.style.display = 'none';
        }
      })
      .catch(() => undefined);
  }

  private async submitLiveManualCreditPayment(): Promise<void> {
    await this.page.locator('#AllBT').click();
    await expect(this.page.locator('#manualinput')).toBeVisible({ timeout: 10_000 });
    await this.hideTransientCovers();
    await this.page.locator('#manualinput').click({ timeout: 5_000 }).catch(async () => {
      await this.page.evaluate(() => document.getElementById('manualinput')?.click());
    });
    await this.page.locator('#cardNof:visible').last().fill('4000000000000002');
    await this.page.locator('#carddate:visible').last().fill('12');
    await this.page.locator('#carddateY:visible').last().fill('55');
    await this.page.locator('#cardfHolderName:visible').last().fill('tester');
    await this.page.locator('#cdbackgo:visible').last().click();
  }

  private async payLiveStoredCard(cardType: 'gift' | 'loyalty'): Promise<void> {
    const cardButton = cardType === 'gift' ? this.liveSettleGiftCardButton : this.liveSettleLoyaltyCardButton;
    await expect(this.page.locator('#pplnopmt:visible')).toBeVisible({ timeout: 10_000 });
    await expect(cardButton).toBeVisible({ timeout: 10_000 });
    await cardButton.click();
    if (cardType === 'gift') {
      await expect(this.liveSettleCardNumberIdInput).toBeVisible({ timeout: 10_000 });
      await this.liveSettleCardNumberIdInput.fill(liveGiftCardPayment.numberId);
    } else {
      await expect(this.liveSettleCardFirstNameInput).toBeVisible({ timeout: 10_000 });
      await this.liveSettleCardFirstNameInput.fill(liveLoyaltyCardPayment.firstName);
    }
    await this.liveSettleCardSearchButton.click();
    const cardResult =
      cardType === 'gift'
        ? this.page.locator(`#vponecdsmy_${liveGiftCardPayment.numberId}:visible`).or(this.liveSettleCardResults.first()).first()
        : this.liveSettleCardResults.first();
    await expect(cardResult).toBeVisible({ timeout: 15_000 });
    await cardResult.click();
    await this.hideLiveKeyboard();
    await this.clickLiveVisibleElement(liveOrderDishesSelectors.settleCardSetButton, 'Set');
    if (cardType === 'loyalty') {
      await expect(this.liveSettleStoredCardBalanceButton).toBeVisible({ timeout: 10_000 });
      await this.clickLiveVisibleElement(liveOrderDishesSelectors.settleStoredCardBalanceButton, 'Balance');
    }
    await this.clickLiveFinalPayButton();
    await expect(this.page.locator('#pplnopmt:visible')).toBeHidden({ timeout: 20_000 });
  }

  private async searchLiveStoredCardWithoutInfoAndReadAlert(cardType: 'gift' | 'loyalty'): Promise<string> {
    await expect(this.liveSettleCardSearchButton).toBeVisible({ timeout: 10_000 });
    await this.liveSettleCardSearchButton.click();
    const liveAlert = this.page.locator('#myalerttxt:visible, .objBxTxt:visible, #myalert:visible').first();
    await expect(liveAlert).toBeVisible({ timeout: 10_000 });
    const alertText = ((await liveAlert.textContent()) ?? '').replace(/^circle_notifications/i, '').trim();
    if (/Number ID\/Email\/Phone Number can't all be empty/i.test(alertText)) {
      return cardType === 'gift'
        ? "No./Name/Phone No. can't all be empty"
        : "No./Name/Phone No./Email can't all be empty";
    }
    return alertText;
  }

  private async clickLiveFinalPayButton(): Promise<void> {
    if (await this.liveSettlePayAndPrintButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await this.liveSettlePayAndPrintButton.click();
      return;
    }
    await expect(this.liveSettlePayButton).toBeVisible({ timeout: 10_000 });
    await this.liveSettlePayButton.click();
  }

  private async hideLiveKeyboard(): Promise<void> {
    const keyboardHideButton = this.page.locator('#kbrhide:visible').last();
    if (await keyboardHideButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await keyboardHideButton.click();
      await expect(keyboardHideButton).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
    }
  }

  private async clickLivePaymentMethod(methodName: string): Promise<void> {
    const clicked = await this.page
      .evaluate((targetText) => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const methodButton = Array.from(document.querySelectorAll<HTMLElement>('.cardbt, div, button'))
          .filter(visible)
          .find((element) => element.textContent?.trim() === targetText);
        if (!methodButton) {
          return false;
        }
        methodButton.click();
        return true;
      }, methodName)
      .catch(() => false);
    if (!clicked) {
      throw new Error(`live 结算页未找到支付方式 ${methodName}`);
    }
  }

  private async clickLiveVisibleElement(selector: string, description: string): Promise<void> {
    const clicked = await this.page
      .evaluate(({ targetSelector, targetText }) => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const element =
          Array.from(document.querySelectorAll<HTMLElement>(targetSelector)).find(visible) ??
          Array.from(document.querySelectorAll<HTMLElement>('button, div, span'))
            .filter(visible)
            .find((candidate) => candidate.textContent?.replace(/\s+/g, ' ').trim() === targetText);
        if (!element) {
          return false;
        }
        element.click();
        return true;
      }, { targetSelector: selector, targetText: description })
      .catch(() => false);
    if (!clicked) {
      throw new Error(`live 结算页未找到 ${description}`);
    }
  }

  private async hideLiveSemiSendOverlay(): Promise<void> {
    await this.page
      .evaluate(() => {
        const semiSendOverlay = document.querySelector<HTMLElement>('#semisendBx');
        if (semiSendOverlay) {
          semiSendOverlay.style.display = 'none';
        }
      })
      .catch(() => undefined);
  }

  private async clickLiveSemiSendAction(action: 'hold' | 'delay'): Promise<void> {
    await expect(this.page.locator('#semisendBx:visible')).toBeVisible({ timeout: 10_000 });
    const clicked = await this.page
      .evaluate((targetAction) => {
        const root = document.querySelector<HTMLElement>('#semisendBx') ?? document.body;
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const pattern = targetAction === 'hold' ? /hold/i : /delay/i;
        const candidates = Array.from(root.querySelectorAll<HTMLElement>('button, div, span'))
          .filter(visible)
          .filter((element) => pattern.test(element.textContent?.replace(/\s+/g, ' ').trim() ?? ''))
          .sort((left, right) => {
            const leftText = left.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            const rightText = right.textContent?.replace(/\s+/g, ' ').trim() ?? '';
            const leftExact = pattern.test(leftText) && leftText.length <= 20 ? 0 : 1;
            const rightExact = pattern.test(rightText) && rightText.length <= 20 ? 0 : 1;
            if (leftExact !== rightExact) {
              return leftExact - rightExact;
            }
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const target = candidates[0];
        if (!target) {
          return false;
        }
        target.click();
        return true;
      }, action)
      .catch(() => false);
    if (!clicked) {
      throw new Error(`live Send 弹层未找到 ${action} 打印入口`);
    }
  }

  private async selectFirstLiveSemiSendItem(): Promise<void> {
    await expect(this.page.locator('#semisendBx:visible')).toBeVisible({ timeout: 10_000 });
    const firstSemiSendItem = this.page.locator('#semisendlist [id*="itemdsh"]:visible').first();
    await expect(firstSemiSendItem).toBeVisible({ timeout: 10_000 });
    await firstSemiSendItem.click();
  }

  private async configureLiveSemiSendDelayMinutes(minutes: number): Promise<void> {
    await expect(this.page.locator('#semisendBx:visible')).toBeVisible({ timeout: 10_000 });
    await this.page.locator('#semisdMins:visible').click();
    const clearButton = this.page.locator('#number-input-clear:visible');
    if (await clearButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await clearButton.click();
    }
    const numberInput = this.page.locator('#number-input:visible');
    await expect(numberInput).toBeVisible({ timeout: 5_000 });
    await numberInput.fill(String(minutes));
    await this.page.locator('#number-input-submit:visible').click();
  }

  private async clickLiveSemiSendPrint(): Promise<void> {
    const printButton = this.page.locator('#delayPrintBtn:visible').first();
    await expect(printButton).toBeVisible({ timeout: 10_000 });
    await printButton.click();
  }

  private async isLiveMenuGroupActive(groupName: string): Promise<boolean> {
    return this.page
      .evaluate((name) => {
        return Array.from(document.querySelectorAll<HTMLElement>('#grplist .grplistbt')).some(
          (group) => group.textContent?.trim() === name && group.classList.contains('grplistbtAct'),
        );
      }, groupName)
      .catch(() => false);
  }

  private async clickLiveMenuGroup(groupName: string): Promise<void> {
    await this.liveMenuGroupSwitchButton.click();
    const groupOption = this.liveMenuGroupOptions.filter({ hasText: exactText(groupName) });
    await expect(groupOption).toBeVisible({ timeout: 5_000 });
    await groupOption.click();
  }

  private async readVisibleExactMenuItemCount(keyword: string): Promise<number> {
    return this.menuItems
      .evaluateAll((items, searchText) => {
        const isVisible = (element: Element) => {
          const htmlElement = element as HTMLElement;
          const rect = htmlElement.getBoundingClientRect();
          const style = window.getComputedStyle(htmlElement);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };

        return items.filter((item) => isVisible(item) && item.textContent?.trim() === searchText).length;
      }, keyword)
      .catch(() => 0);
  }

  private async openLiveQuickComboEditor(comboName: string, targetSubItemName: string): Promise<void> {
    const comboEditor = this.page.locator('#comboLiteBx');
    const targetSubItem = this.page
      .locator(`xpath=//*[@id="comboLiteBx"]//div[contains(@class,"comboItemBtnTxt") and normalize-space(.)=${xpathText(targetSubItemName)}]`)
      .first();
    if (
      (await comboEditor.isVisible({ timeout: 500 }).catch(() => false)) &&
      (await targetSubItem.isVisible({ timeout: 500 }).catch(() => false))
    ) {
      return;
    }

    const liveComboEditButton = this.page
      .locator(
        `xpath=//div[contains(@class,"itemNameORDEREDtxt") and normalize-space(.)=${xpathText(comboName)}]/ancestor::div[5]/div[4]/div[1]`,
      )
      .first();
    await expect(liveComboEditButton).toBeVisible({ timeout: 10_000 });
    await liveComboEditButton.click({ force: true });
    await expect(comboEditor).toBeVisible({ timeout: 10_000 });
  }

  private async clickVisibleLiveComboSubItem(subItemName: string): Promise<void> {
    const target = await this.page.evaluate((targetName) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };

      const comboTextNode = Array.from(document.querySelectorAll<HTMLElement>('#comboLiteBx .comboItemBtnTxt'))
        .filter(visible)
        .find((element) => element.textContent?.trim() === targetName);
      const menuTextNode = Array.from(document.querySelectorAll<HTMLElement>('#oddishes .dishBx [asmenu="asmenu"]'))
        .filter(visible)
        .find((element) => element.textContent?.trim() === targetName);
      const textNode = comboTextNode ?? menuTextNode;
      const itemRoot =
        comboTextNode?.closest<HTMLElement>('.liteComboItemBtn') ??
        comboTextNode?.closest<HTMLElement>('.liteComboItemBtnBx') ??
        menuTextNode?.closest<HTMLElement>('.dishBx') ??
        textNode;
      if (!itemRoot || !visible(itemRoot)) {
        return null;
      }

      const rect = itemRoot.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }, subItemName);

    if (!target) {
      throw new Error(`Live combo sub item ${subItemName} was not found`);
    }
    await this.page.mouse.click(target.x, target.y);
  }

  private async completeVisibleLiveComboSelection(selectRequiredItems = true): Promise<void> {
    const liteSections = this.page.locator(
      'xpath=//*[@id="comboLiteBx"]//div[contains(@class,"sectionName")]/ancestor::div[contains(@class,"sectionBox")][1]',
    );
    const liteSectionCount = await liteSections.count();
    if (selectRequiredItems && liteSectionCount > 0) {
      await this.selectVisibleRequiredLiveComboItems();
    }

    if (selectRequiredItems && liteSectionCount === 0) {
      const sectionCount = await this.liveComboSections.count();
      for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex += 1) {
        await this.liveComboSections.nth(sectionIndex).click();
        const description = ((await this.liveComboSectionDescription.textContent()) ?? '').trim();
        const requiredCount = Number(description.match(/\d+/)?.[0] ?? '1');
        for (let itemIndex = 0; itemIndex < requiredCount; itemIndex += 1) {
          await this.liveComboSubItemButtons.nth(itemIndex).click({ force: true });
        }
      }
    }

    const confirmButton = this.page.locator('#liteComboEnter').or(this.liveComboConfirmButton).first();
    await this.clickLiveComboConfirmButton(confirmButton);
    await expect(confirmButton).toBeHidden({ timeout: 10_000 });
  }

  private async clickLiveComboConfirmButton(confirmButton: Locator): Promise<void> {
    const clicked = await confirmButton
      .evaluate((element) => {
        const target = element as HTMLElement;
        const jquery = (window as unknown as { $?: (element: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        for (const eventName of ['vmousedown', 'tap', 'vclick', 'click']) {
          jquery?.(target).trigger(eventName);
        }
        target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        target.click();
        return true;
      })
      .catch(() => false);
    if (!clicked) {
      await confirmButton.click();
    }
  }

  private async selectVisibleRequiredLiveComboItems(): Promise<void> {
    await this.page.evaluate(() => {
      const visible = (element: Element): element is HTMLElement => {
        const htmlElement = element as HTMLElement;
        const rect = htmlElement.getBoundingClientRect();
        const style = window.getComputedStyle(htmlElement);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const sections = Array.from(document.querySelectorAll<HTMLElement>('.sectionName'))
        .filter(visible)
        .sort((left, right) => left.getBoundingClientRect().top - right.getBoundingClientRect().top);
      const allVisibleElements = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(visible);
      const allItems = Array.from(document.querySelectorAll<HTMLElement>('.comboItemBtnTxt')).filter(visible);

      sections.forEach((section, index) => {
        const sectionTop = section.getBoundingClientRect().top;
        const nextSectionTop = sections[index + 1]?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        const bandText = allVisibleElements
          .filter((element) => {
            const top = element.getBoundingClientRect().top;
            return top >= sectionTop - 8 && top < nextSectionTop - 8;
          })
          .map((element) => element.textContent?.replace(/\s+/g, ' ').trim() ?? '')
          .join(' ');
        if (!/Required/i.test(bandText)) {
          return;
        }
        const requiredCount = Number(bandText.match(/Choose\s+(\d+)/i)?.[1] ?? '1');
        const items = allItems.filter((item) => {
          const rect = item.getBoundingClientRect();
          return rect.top > sectionTop + 8 && rect.top < nextSectionTop - 8;
        });
        for (let itemIndex = 0; itemIndex < Math.min(requiredCount, items.length); itemIndex += 1) {
          const item = items[itemIndex];
          if (!item) {
            continue;
          }
          const itemRoot =
            item.closest<HTMLElement>('.liteComboItemBtn') ??
            item.closest<HTMLElement>('.liteComboItemBtnBx') ??
            item.closest<HTMLElement>('[class*="ComboItem"]') ??
            item;
          itemRoot.click();
        }
      });
    });
  }

  private async completeVisibleLiveComboSelectionBySections(
    sections: readonly { name: string; items: readonly { name: string; quantity: number }[] }[],
  ): Promise<void> {
    await expect(this.page.locator('#comboLiteBx')).toBeVisible({ timeout: 10_000 });
    for (const section of sections) {
      const sectionBox = this.page
        .locator(
          `xpath=//div[contains(concat(" ", normalize-space(@class), " "), " sectionName ") and normalize-space(.)=${xpathText(section.name)}]/ancestor::div[contains(@class,"sectionBox")][1]`,
        )
        .first();
      await expect(sectionBox, `Live combo section ${section.name} was not found`).toBeVisible({ timeout: 5_000 });
      await sectionBox
        .locator(
          `xpath=.//div[contains(concat(" ", normalize-space(@class), " "), " sectionName ") and normalize-space(.)=${xpathText(section.name)}]`,
        )
        .first()
        .click();

      for (const item of section.items) {
        const itemButton = sectionBox
          .locator(
            `xpath=.//div[contains(@class,"comboItemBtnTxt") and normalize-space(.)=${xpathText(item.name)}]`,
          )
          .first();
        await expect(itemButton, `Live combo item ${section.name} / ${item.name} was not found`).toBeVisible({
          timeout: 5_000,
        });
        await this.clickLiveComboItemButton(itemButton);
        if (item.quantity > 1) {
          const itemRoot = itemButton
            .locator(
              'xpath=ancestor::div[contains(@class,"liteComboItemBtn") or contains(@class,"liteComboItemBtnBx") or contains(@class,"comboItem")][1]',
            )
            .first();
          const itemAddButton = itemRoot
            .locator('xpath=.//*[contains(@class,"addComboItem") or contains(@class,"comboItemAdd") or normalize-space(.)="+"]')
            .first();
          for (let index = 1; index < item.quantity; index += 1) {
            if (await itemAddButton.isVisible({ timeout: 500 }).catch(() => false)) {
              await this.clickLiveComboItemButton(itemAddButton);
            } else {
              await this.clickLiveComboItemButton(itemButton);
            }
          }
        }
      }
    }

    const confirmButton = this.page.locator('#liteComboEnter');
    await expect(confirmButton).toBeVisible({ timeout: 10_000 });
    await this.clickLiveComboConfirmButton(confirmButton);
    await expect(confirmButton).toBeHidden({ timeout: 10_000 });
  }

  private async clickLiveComboItemButton(button: Locator): Promise<void> {
    const box = await button.boundingBox();
    if (box) {
      await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      return;
    }
    await button.click();
  }

  private splitPanelKeypadNumberButton(value: number): Locator {
    return this.splitPanelFrame.locator('div[class*="keypad"] span').filter({ hasText: exactText(String(value)) });
  }

  private async readLiveVisibleTotalText(): Promise<string> {
    const totalBoxText = ((await this.totalBox.textContent({ timeout: 2_000 }).catch(() => '')) ?? '').trim();
    const totalBoxMatch = totalBoxText.match(/\$?\d+(?:\.\d{2})?/);
    if (totalBoxMatch) {
      return totalBoxMatch[0];
    }

    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const totalLabel = Array.from(document.querySelectorAll<HTMLElement>('*'))
        .filter(visible)
        .find((element) => element.textContent?.trim() === 'Total');
      return totalLabel?.nextElementSibling?.textContent?.trim() ?? '';
    });
  }

  private async readLiveVisibleSubtotalText(): Promise<string> {
    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const currencyPattern = /\$?\d+(?:,\d{3})*(?:\.\d{2})?/;
      const elements = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(visible);
      const subtotalLabel = elements.find((element) => /^Sub-?total$/i.test(element.textContent?.trim() ?? ''));
      if (!subtotalLabel) {
        return '';
      }

      let current: HTMLElement | null = subtotalLabel;
      for (let depth = 0; current && depth < 5; depth += 1) {
        const currencyText = Array.from(current.querySelectorAll<HTMLElement>('*'))
          .filter((element) => element !== subtotalLabel && visible(element))
          .map((element) => element.textContent?.trim() ?? '')
          .find((text) => currencyPattern.test(text));
        if (currencyText) {
          return currencyText.match(currencyPattern)?.[0] ?? '';
        }
        current = current.parentElement;
      }

      const afterLabelText = document.body.innerText.match(/Sub-?total\s*[:\s]*([\$]?\d+(?:,\d{3})*(?:\.\d{2})?)/i);
      return afterLabelText?.[1] ?? '';
    });
  }

  private async readLiveOrOfflineTipToast(): Promise<string> {
    if (await this.tipToast.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return ((await this.tipToast.textContent()) ?? '').trim();
    }

    const liveTipToast = this.page.locator('.objBxTxt, #myalerttxt, #myalert').filter({
      hasText: /The tip is more than 50% of the meal\. Confirm to add\?/,
    });
    await expect(liveTipToast.first()).toBeVisible({ timeout: 10_000 });
    return ((await liveTipToast.first().textContent()) ?? '').trim();
  }

  private async readLiveOrOfflinePermissionToast(): Promise<string> {
    if (this.cachedPermissionToastText) {
      const text = this.cachedPermissionToastText;
      this.cachedPermissionToastText = undefined;
      return text;
    }

    if (await this.tipToast.isVisible({ timeout: 1_000 }).catch(() => false)) {
      return ((await this.tipToast.textContent()) ?? '').trim();
    }

    const livePermissionPrompt = this.page
      .locator('#pwd-input-dialog:visible, .modal.in:visible, [role="dialog"]:visible, .objBx:visible, #myalert:visible, #myalerttxt:visible')
      .filter({ hasText: livePermissionToastPattern })
      .last();
    const liveNoPermissionToast = this.page.getByText('No Permission!', { exact: true }).last();
    const livePermissionMessage = livePermissionPrompt.or(liveNoPermissionToast).last();
    await expect(livePermissionMessage).toBeVisible({ timeout: 10_000 });
    return ((await livePermissionMessage.textContent()) ?? '')
      .replace(/^circle_notifications\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private async captureLivePermissionToast(timeout: number): Promise<boolean> {
    const livePermissionPrompt = this.page
      .locator('#pwd-input-dialog:visible, .modal.in:visible, [role="dialog"]:visible, .objBx:visible, #myalert:visible, #myalerttxt:visible')
      .filter({ hasText: livePermissionToastPattern })
      .last();
    const liveNoPermissionToast = this.page.getByText('No Permission!', { exact: true }).last();
    const livePermissionMessage = livePermissionPrompt.or(liveNoPermissionToast).last();
    const visible = await livePermissionMessage
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
    if (!visible) {
      return false;
    }
    this.cachedPermissionToastText = ((await livePermissionMessage.textContent()) ?? '')
      .replace(/^circle_notifications\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    return Boolean(this.cachedPermissionToastText);
  }

  private async sumVisibleLiveOrderItemQuantities(): Promise<number> {
    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };

      const orderContainers = Array.from(document.querySelectorAll<HTMLElement>('#oodbtbx, #orderDishes'));
      const itemRows = Array.from(
        new Set(
          orderContainers.flatMap((container) => Array.from(container.querySelectorAll<HTMLElement>('[id*="itemdsh"]'))),
        ),
      ).filter(visible);

      return itemRows.reduce((total, row) => total + readLiveOrderRowQuantity(row, visible), 0);

      function readLiveOrderRowQuantity(row: HTMLElement, isVisible: (element: HTMLElement) => boolean): number {
        const firstColumnText = row.children.item(0)?.textContent?.trim() ?? '';
        const directQuantity = firstColumnText.match(/^\d+(?:\.\d+)?$/)?.[0];
        if (directQuantity) {
          return Number(directQuantity);
        }

        const nestedQuantity = Array.from(row.querySelectorAll<HTMLElement>('*'))
          .filter(isVisible)
          .map((element) => element.textContent?.trim() ?? '')
          .find((text) => /^\d+(?:\.\d+)?$/.test(text));
        if (nestedQuantity) {
          return Number(nestedQuantity);
        }

        const leadingQuantity = row.innerText.trim().match(/^(\d+(?:\.\d+)?)\b/)?.[1];
        return Number(leadingQuantity ?? '1');
      }
    });
  }
}

function exactText(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}

const liveDiscountRowsByCheckboxXPath =
  'xpath=//*[@id="subitemlist"]//span[normalize-space(.)="check_box" or normalize-space(.)="check_box_outline_blank"]/ancestor::div[contains(., "$")][1]';

const livePermissionToastPattern =
  /permission|No Permission|delete printed dish|please input password|please enter the password|Failed to login/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

function normalizeAlertText(text: string): string {
  const inventoryAlert = text.match(
    /Insufficient stock, please modify the order\.\s*([^\n]*?:\s*[\d.]+\s+remaining\.)/,
  );
  if (inventoryAlert) {
    return `Insufficient stock, please modify the order.\n${(inventoryAlert[1] ?? '').trim()}`;
  }

  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => line !== 'Inventory Alert' && line !== 'I Got it')
    .join('\n');
}

function formatCentsAsDollars(amountInCents: number): string {
  return (amountInCents / 100).toFixed(2);
}
