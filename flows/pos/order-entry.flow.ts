import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { DeliveryPage } from '../../pages/pos/delivery.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecalledItemOption, RecalledOrderItem, RecallPage, RecallPrintState } from '../../pages/pos/recall.page.js';
import type { ReportPage } from '../../pages/pos/report.page.js';
import type { DishSample, OptionOrderSample } from '../../test-data/pos/domain-types.js';
import { combineSameItemModes, menuModes } from '../../test-data/pos/admin-settings.js';
import {
  categoryOptionDish,
  chineseInitialSearchDish,
  comboMaxModifyDish,
  comboNoOptionThenOptionDish,
  discountableDish,
  editableComboDish,
  groupSwitchDish,
  categorySwitchDish,
  menuModeSearchItems,
  numberedNameConflictDish,
  posNameDisplayDish,
  posNameDisplayValue,
  requiredKdsDish,
  splitDiscountDishes,
} from '../../test-data/pos/dishes.js';
import { deliveryOrderInfoSample } from '../../test-data/pos/delivery.js';
import { languageOptions } from '../../test-data/pos/languages.js';
import { staffSamples, validEmployeePassword } from '../../test-data/pos/permissions.js';

export type OrderTaxEditResult = {
  beforeEditTax: number;
  afterEditTax: number;
};

export type CustomerInfoRequirementResult = {
  popupVisibleBeforeInput: boolean;
  popupVisibleAfterEmptySubmit: boolean;
  popupVisibleAfterValidSubmit: boolean;
};

export type ItemDiscountResult = {
  originalPrice: number;
  discountedPrice: number;
};

export type SplitTipResult = {
  firstSubOrderTip: number;
  combinedTip: number;
};

export type PickupGuestNameResult = {
  latestOrderCustomerName: string | null;
  previousOrderCustomerName: string | null;
};

export type OptionOrderRecallResult = {
  orderedItem: RecalledOrderItem;
  recalledItems: RecalledOrderItem[];
};

export type EvenSplitSummary = {
  originalTotal: number;
  splitOrderCount: number;
  splitOrderPrices: number[];
};

export type ItemSplitSummary = {
  splitOrderCount: number;
  splitItemPrices: number[];
  splitOrderPrices: number[];
};

export type CancelSplitSummary = {
  originalTotal: number;
  splitOrderCountBeforeCancel: number;
  totalAfterCancel: number;
};

export type DragSplitPaymentStatusResult = {
  firstSubOrderStatus: string;
  secondSubOrderStatus: string;
  parentOrderBackground: string;
};

export type SeatSplitVoidResult = {
  firstSubOrderTipBeforeVoid: number;
  firstSubOrderTipAfterVoid: number;
  secondSubOrderStatusAfterVoid: string;
};

export type SeatSplitSharedVoidAlertResult = {
  voidAlertText: string;
};

export type SeatSplitModifyTipResult = {
  firstSubOrderTipAfterEdit: number;
  secondSubOrderTipBeforeEdit: number;
  secondSubOrderTipAfterEdit: number;
};

export type SeatSplitUnsplitAlertResult = {
  unsplitAlertText: string;
};

export type AmountSplitUnsplitAlertResult = {
  unsplitAlertText: string;
};

export type AmountSplitUnsplitSuccessResult = {
  unsplitAlertText: string;
  splitOrderCountAfterUnsplit: number;
};

export type AmountSplitFixedTotalsResult = {
  parentTotalBeforeSplit: number;
  parentTotalAfterSplit: number;
  firstSubOrderTotal: number;
  secondSubOrderTotal: number;
};

export type ClearSplitSubOrderChargeResult = {
  firstSubOrderStatus: string;
  firstSubOrderPriceDetail: string;
  secondSubOrderStatus: string;
  secondSubOrderPriceDetail: string;
  thirdSubOrderStatus: string;
  thirdSubOrderPriceDetail: string;
};

export type PartialSettleAddTipResult = {
  originalTotal: number;
  orderStatus: string;
  unpaidAmountAfterTip: number;
};

export type PaidEvenSplitCashTipResult = {
  firstSubOrderTipAfterCashTip: string;
  secondSubOrderStatusAfterCashPay: string;
};

export type NoOptionCopyTotalsResult = {
  recalledCopiedTotal: number;
  totalAfterCopy: number;
  totalAfterNoOption: number;
  totalBeforeNoOption: number;
};

export type CombinedNonTaxableChargeTotalsResult = {
  combinedTotal: number;
  firstOrderTotal: number;
  secondOrderTotal: number;
};

export type RenameManualChargeResult = {
  modifiedChargeSelectedInDialog: boolean;
  recalledChargeAfterReapply: Record<string, string>;
  recalledChargeBeforeReapply: Record<string, string>;
};

export type ManualChargeRateTypeToPercentResult = {
  initialChargeBeforeSave: Record<string, string>;
  recalledChargeAfterReapply: Record<string, string>;
  recalledSubtotal: number;
  selectedChargesAfterRateTypeChange: Record<string, string>;
};

export type ManualChargeRateTypeToAmountResult = {
  initialChargeBeforeSave: Record<string, string>;
  initialSubtotal: number;
  recalledChargeAfterConfirm: Record<string, string>;
  selectedChargesAfterRateTypeChange: Record<string, string>;
};

export type ManualChargeAmountChangeResult = {
  initialChargeBeforeSave: Record<string, string>;
  recalledChargeAfterConfirm: Record<string, string>;
  selectedChargesAfterAmountChange: Record<string, string>;
};

export type ManualChargePercentChangeResult = {
  initialChargeBeforeSave: Record<string, string>;
  initialSubtotal: number;
  recalledChargeAfterConfirm: Record<string, string>;
  recalledSubtotal: number;
  selectedChargesAfterPercentChange: Record<string, string>;
};

export type ManualChargeTaxChangeResult = {
  originTaxBeforeEdit: number;
  taxAfterConfirmCharge: number;
  taxAfterEnteringEdit: number;
};

export type ManualChargeOrderTypeMatchResult = {
  chargeAfterConfirm: Record<string, string>;
  chargeBeforeConfirm: Record<string, string>;
  selectedChargesAfterOrderTypeChange: Record<string, string>;
};

export type ManualChargeOrderTypeMismatchResult = {
  chargeAfterConfirm: Record<string, string>;
  chargeBeforeSave: Record<string, string>;
  selectedChargesAfterOrderTypeChange: Record<string, string>;
};

export type ManualChargeDeletedResult = {
  chargeAfterConfirm: Record<string, string>;
  chargeBeforeConfirm: Record<string, string>;
  selectedChargesAfterDelete: Record<string, string>;
};

export type ManualChargeEditSendKitchenResult = {
  recallChargeAfterEditSendKitchen: Record<string, string>;
};

export type RenameAutoChargeResult = {
  recalledChargeAfterRename: Record<string, string>;
};

export type AutoChargeRateTypeToPercentResult = {
  recalledChargeAfterRateTypeChange: Record<string, string>;
  recalledSubtotal: number;
};

export type AutoChargeRateTypeToAmountResult = {
  recalledChargeAfterRateTypeChange: Record<string, string>;
};

export type AutoChargeAmountChangeResult = {
  recalledChargeAfterAmountChange: Record<string, string>;
};

export type AutoChargePercentChangeResult = {
  recalledChargeAfterPercentChange: Record<string, string>;
  recalledSubtotal: number;
};

export type AutoChargeOrderTypeMismatchResult = {
  recalledChargeAfterOrderTypeChange: Record<string, string>;
};

export type AutoChargeTaxChangeResult = {
  taxAfterEnteringEdit: number;
  taxBeforeSave: number;
};

export type AutoChargeDeletedResult = {
  recalledChargeAfterDelete: Record<string, string>;
};

export type AutoChargeRecallSendKitchenResult = {
  recallChargeAfterSendKitchen: Record<string, string>;
};

export type AutoChargeEditSaveResult = {
  recallChargeAfterEditSave: Record<string, string>;
};

export type AutoChargeRecallSplitResult = {
  firstSubOrderCharge: Record<string, string>;
};

export type AutoChargeEditSplitResult = {
  firstSubOrderCharge: Record<string, string>;
};

export type AutoChargeCopyResult = {
  copiedOrderCharge: Record<string, string>;
  copiedOrderSubtotal: number;
  expectedCopiedCharge: string;
};

export type AutoChargeCopyMinGuestResult = {
  copiedOrderCharge: Record<string, string>;
};

export type ManualChargeEditSplitResult = {
  expectedFirstSubOrderCharge: string;
  firstSubOrderCharge: Record<string, string>;
  firstSubOrderSubtotal: number;
  originalSubtotal: number;
};

export type EvenSplitTipUnsplitResult = {
  combinedTipText: string;
};

export type SeatSplitReduceItemTipResult = {
  firstSubOrderTipBeforeReduce: string;
  firstSubOrderTipAfterReduce: string;
  secondSubOrderTipAfterReduce: string;
};

export type SeatSplitDiscountItemTipResult = {
  firstSubOrderTipBeforeDiscount: string;
  firstSubOrderTipAfterDiscount: string;
  secondSubOrderTipAfterDiscount: string;
};

export type ComboOptionCountResult = {
  beforeCount: number;
  afterCount: number;
};

export type MenuModeSearchResult = {
  posSearchResult: string;
  eMenuSearchResult: string;
};

export type GlobalOptionAddResult = {
  modifyAreaVisibleAfterAdd: boolean;
};

export type GlobalOptionCountResult = {
  modifyAreaVisibleAfterFirstCount: boolean;
  modifyAreaVisibleAfterZeroCount: boolean;
  optionCountAfterZero: number;
};

export type GlobalOptionReduceResult = {
  modifyAreaVisibleAfterInitialCount: boolean;
  modifyAreaVisibleAfterReduce: boolean;
  optionCountAfterReduce: number;
};

export type GuestNameRecallResult = {
  nameOnRecallCard: string | null;
  nameInOrderEdit: string | null;
};

export type SearchMenuToggleResult = {
  searchClassWhenDisabled: string;
  searchClassWhenEnabled: string;
  searchResult: string;
};

export type NumberedNameSearchResult = {
  searchKeyword: string;
  searchResultText: string;
  searchResultCount: number;
};

export type ChineseInitialSearchResult = {
  searchKeyword: string;
  searchResultText: string;
};

export type ItemCountRecallResult = {
  itemCountBeforeSave: string;
  itemCountAfterRecall: string;
};

export type LargeTipResult = {
  tipToast: string;
  expectedTip: string;
  recallTip: string;
};

export type VoidPrintedItemPermissionResult = {
  permissionToast: string;
  itemLineCountAfterDelete: number;
};

export type ComboSubItemNotePermissionResult = {
  permissionToast: string;
  noteText: string;
};

export type RequiredCategorySaveResult = {
  categoryAfterRejectedSave: string;
  urlAfterRejectedSave: string;
  urlAfterCompletedSave: string;
};

export type PercentChargeResult = {
  chargeLabel: string;
  chargePrice: string;
};

export type PosNameDisplayResult = {
  posNameVisible: boolean;
  orderedItemName: string;
};

export type ComboSubItemEditPriceResult = {
  subtotalBeforeEdit: string;
  subtotalAfterAdjustableEdit: string;
  fixedSubItemSupportsEditPrice: boolean;
};

export type ComboSubItemModificationResult = {
  recalledSubItems: string[];
};

export type CustomOrderReportNetSalesResult = {
  orderType: 'CUSTOM_D';
  netSalesBefore: number;
  orderSubtotal: number;
  netSalesAfter: number;
};

export type SameItemCombineResult = {
  itemLineCount: number;
  firstItemQuantity?: string;
  firstItemName?: string;
  firstItemColor?: string;
};

export type ReduceRedirectResult = {
  orderItemOptionListVisible: boolean;
  originalCategoryItemStillVisible: boolean;
};

export type DecimalReduceResult = {
  itemCountAfterReduce: string;
};

export type DecimalDragSplitResult = {
  firstItemTotal: number;
  firstSubOrderDishQuantity: string;
  firstSubOrderTotal: number;
};

export type DecimalCombineResult = {
  firstOrderTotal: number;
  secondOrderTotal: number;
  firstDishQuantity: string;
  secondDishQuantity: string;
  combinedTotal: number;
};

export type DecimalSpecialPriceDishKey = 'groupSwitchDish' | 'categorySwitchDish' | 'categoryOptionDish';

export type DecimalSpecialPriceLine = {
  dish: DecimalSpecialPriceDishKey;
  price: number;
  quantity?: number;
};

export type DecimalCountDisabledResult = {
  dishQuantity: string;
};

export type DecimalCombinedOptionResult = {
  firstDishQuantity: string;
  secondDishQuantity: string;
  secondDishPrice: number;
  optionPrice: number;
  itemUnitPrice: number;
  totalBeforeSave: number;
  recallTotal: number;
};

export class OrderEntryFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly adminPage?: AdminPage,
    private readonly deliveryPage?: DeliveryPage,
    private readonly reportPage?: ReportPage,
  ) {}

  async createTogoOrderAndReadRecall(homeUrl: string, dish: DishSample): Promise<RecalledOrderItem[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readAllOrderItems();
  }

  async readChineseMenuGroups(homeUrl: string): Promise<string[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.switchLanguage(languageOptions.chinese);
    await this.homePage.clickTogo();
    return this.orderDishesPage.readMenuGroups();
  }

  async addItemAfterSendKitchenAndReadTaxes(homeUrl: string): Promise<OrderTaxEditResult> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    const beforeEditTax = await this.orderDishesPage.readTax();
    await this.orderDishesPage.sendAllToKitchen();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const afterEditTax = await this.orderDishesPage.readTax();
    await this.orderDishesPage.saveOrder();
    return { beforeEditTax, afterEditTax };
  }

  async requireCustomerInfoBeforePayment(homeUrl: string): Promise<CustomerInfoRequirementResult> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.clickSettle();
    const popupVisibleBeforeInput = await this.orderDishesPage.isCustomerInfoPopupVisible();
    await this.orderDishesPage.submitCustomerInfo();
    const popupVisibleAfterEmptySubmit = await this.orderDishesPage.isCustomerInfoPopupVisible();
    await this.orderDishesPage.submitCustomerInfo('Test Customer', '1234567890');
    const popupVisibleAfterValidSubmit = await this.orderDishesPage.isCustomerInfoPopupVisible();
    return { popupVisibleBeforeInput, popupVisibleAfterEmptySubmit, popupVisibleAfterValidSubmit };
  }

  async voidItemWithManagerPassword(homeUrl: string, managerPassword: string): Promise<string> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.sendAllToKitchen();
    await this.orderDishesPage.voidSelectedItem();
    await this.orderDishesPage.submitManagerPassword(managerPassword);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readFirstOrderItemState();
  }

  async applyItemDiscountAndReadPrice(homeUrl: string, discountRate: number): Promise<ItemDiscountResult> {
    await this.openOrderAndAddDish(homeUrl, discountableDish);
    const originalPrice = await this.orderDishesPage.readSelectedItemPrice();
    await this.orderDishesPage.applyItemDiscount();
    const discountedPrice = await this.orderDishesPage.readSelectedItemPrice();
    if (discountRate !== 0.1) {
      throw new Error(`Unsupported offline item discount rate: ${discountRate}`);
    }
    return { originalPrice, discountedPrice };
  }

  async addModifyNoteAndReadRecallOption(homeUrl: string): Promise<RecalledItemOption> {
    await this.openOrderAndAddDish(homeUrl, discountableDish);
    await this.orderDishesPage.addModifyNote('This is a test note', 1.23);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readFirstItemOption();
  }

  async splitTipEvenlyAndCombine(homeUrl: string): Promise<SplitTipResult> {
    await this.openDineInOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.addTip(200);
    await this.orderDishesPage.splitEvenly(2);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openFirstSubOrder();
    const firstSubOrderTip = await this.recallPage.readOrderTip();
    await this.recallPage.combineSplitOrders();
    const combinedTip = await this.recallPage.readOrderTip();
    return { firstSubOrderTip, combinedTip };
  }

  async payOpenFoodWithoutTax(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.openFoodWithoutTax('no tax', 100);
    await this.orderDishesPage.settleByCash();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readOrderStatus();
  }

  async editPreviousPickupGuestNameWithoutAffectingLatest(homeUrl: string): Promise<PickupGuestNameResult> {
    await this.homePage.open(homeUrl);
    await this.createPickupOrder();
    await this.createPickupOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openPreviousOrder();
    await this.recallPage.clickEdit();
    await this.recallPage.editGuestName('ren');
    await this.recallPage.saveEdit();
    await this.recallPage.openRecentOrder();
    const latestOrderCustomerName = await this.recallPage.readCustomerName();
    await this.recallPage.openPreviousOrder();
    const previousOrderCustomerName = await this.recallPage.readCustomerName();
    return { latestOrderCustomerName, previousOrderCustomerName };
  }

  async createOptionOrderAndReadRecall(
    homeUrl: string,
    optionOrder: OptionOrderSample,
  ): Promise<OptionOrderRecallResult> {
    await this.homePage.open(homeUrl);
    if (optionOrder.language === 'Chinese') {
      await this.homePage.switchLanguage(languageOptions.chinese);
    }
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(optionOrder.group);
    await this.orderDishesPage.selectMenuCategory(optionOrder.category);
    await this.orderDishesPage.addMenuItem(optionOrder.name);
    await this.orderDishesPage.selectOptions(optionOrder.optionNames);
    await this.orderDishesPage.selectSubOptions(optionOrder.subOptionNames);
    const orderedItem = await this.orderDishesPage.readSelectedOrderItem();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const recalledItems = await this.recallPage.readAllOrderItems();
    return { orderedItem, recalledItems };
  }

  async splitOrderEvenlyAndReadSummary(homeUrl: string, count: number): Promise<EvenSplitSummary> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const originalTotal = await this.recallPage.readOrderTotal();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitEvenly(count);
    await this.recallPage.saveSplit();
    const splitOrderPrices = await this.recallPage.readSplitOrderPrices();
    return { originalTotal, splitOrderCount: splitOrderPrices.length, splitOrderPrices };
  }

  async splitOrderByItemAndReadSummary(homeUrl: string): Promise<ItemSplitSummary> {
    await this.openOrderAndAddTwoDishes(homeUrl, false);
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByItem();
    const splitItemPrices = await this.recallPage.readSplitItemPrices();
    await this.recallPage.saveSplit();
    const splitOrderPrices = await this.recallPage.readSplitOrderPrices();
    return { splitOrderCount: splitOrderPrices.length, splitItemPrices, splitOrderPrices };
  }

  async splitDineInOrderBySeatAndReadSummary(homeUrl: string): Promise<ItemSplitSummary> {
    await this.openOrderAndAddTwoDishes(homeUrl, true);
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    const splitItemPrices = await this.recallPage.readSplitItemPrices();
    await this.recallPage.saveSplit();
    const splitOrderPrices = await this.recallPage.readSplitOrderPrices();
    return { splitOrderCount: splitOrderPrices.length, splitItemPrices, splitOrderPrices };
  }

  async splitDineInOrderByItemAndReadSummary(homeUrl: string): Promise<ItemSplitSummary> {
    await this.openOrderAndAddTwoDishes(homeUrl, true);
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByItem();
    const splitItemPrices = await this.recallPage.readSplitItemPrices();
    await this.recallPage.saveSplit();
    const splitOrderPrices = await this.recallPage.readSplitOrderPrices();
    return { splitOrderCount: splitOrderPrices.length, splitItemPrices, splitOrderPrices };
  }

  async splitOrderByAmountAndReadSummary(homeUrl: string, amounts: readonly number[]): Promise<ItemSplitSummary> {
    await this.openOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByAmounts(amounts);
    const splitItemPrices = await this.recallPage.readSplitItemPrices();
    await this.recallPage.saveSplit();
    await this.recallPage.saveSplitAmountCreate();
    const splitOrderPrices = await this.recallPage.readSplitOrderPrices();
    return { splitOrderCount: splitOrderPrices.length, splitItemPrices, splitOrderPrices };
  }

  async cancelEvenSplitAndReadTotals(homeUrl: string, count: number): Promise<CancelSplitSummary> {
    const splitSummary = await this.splitOrderEvenlyAndReadSummary(homeUrl, count);
    await this.recallPage.openSplitOrder();
    await this.recallPage.unsplit();
    await this.recallPage.saveSplit();
    const totalAfterCancel = await this.recallPage.readOrderTotal();
    return {
      originalTotal: splitSummary.originalTotal,
      splitOrderCountBeforeCancel: splitSummary.splitOrderCount,
      totalAfterCancel,
    };
  }

  async splitOrderByDragPayFirstSubOrderAndReadStatuses(
    homeUrl: string,
  ): Promise<DragSplitPaymentStatusResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByDrag();
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCash();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderStatus = await this.recallPage.readOrderStatus();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderStatus = await this.recallPage.readOrderStatus();
    const parentOrderBackground = await this.recallPage.readParentOrderBackground();
    return { firstSubOrderStatus, secondSubOrderStatus, parentOrderBackground };
  }

  async voidSecondSeatSplitSubOrderAndReadTip(homeUrl: string): Promise<SeatSplitVoidResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCash();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipBeforeVoid = await this.recallPage.readOrderTip();

    await this.recallPage.openSubOrder(2);
    await this.recallPage.voidOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipAfterVoid = await this.recallPage.readOrderTip();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderStatusAfterVoid = await this.recallPage.readOrderStatus();

    return {
      firstSubOrderTipAfterVoid,
      firstSubOrderTipBeforeVoid,
      secondSubOrderStatusAfterVoid,
    };
  }

  async preventVoidSeatSplitSubOrderWithSharedPaidItem(homeUrl: string): Promise<SeatSplitSharedVoidAlertResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);

    await this.orderDishesPage.selectSharedSeat();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);

    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);

    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.selectMenuGroup(posNameDisplayDish.group);
    await this.orderDishesPage.selectMenuCategory(posNameDisplayDish.category);
    await this.orderDishesPage.addMenuItem(posNameDisplayDish.name);

    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCash();
    await this.recallPage.openSubOrder(2);
    const voidAlertText = await this.recallPage.voidOrderAndReadAlert();

    return { voidAlertText };
  }

  async modifyFirstSeatSplitSubOrderTipAndReadTips(homeUrl: string): Promise<SeatSplitModifyTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);

    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);

    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.saveSplit();

    await this.recallPage.openSubOrder(2);
    const secondSubOrderTipBeforeEdit = await this.recallPage.readOrderTip();

    await this.recallPage.openSubOrder(1);
    await this.recallPage.clickEdit();
    await this.orderDishesPage.addTip(600);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipAfterEdit = await this.recallPage.readOrderTip();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderTipAfterEdit = await this.recallPage.readOrderTip();

    return {
      firstSubOrderTipAfterEdit,
      secondSubOrderTipAfterEdit,
      secondSubOrderTipBeforeEdit,
    };
  }

  async preventUnsplitSeatSplitOrderAfterPartialPayment(homeUrl: string): Promise<SeatSplitUnsplitAlertResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);

    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);

    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCash();
    await this.recallPage.openSplitOrder();
    const unsplitAlertText = await this.recallPage.unsplitAndReadAlert();

    return { unsplitAlertText };
  }

  async preventUnsplitAmountSplitOrderAfterPartialPayment(homeUrl: string): Promise<AmountSplitUnsplitAlertResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByAmounts([1, 9.6]);
    await this.recallPage.saveSplit();
    await this.recallPage.saveSplitAmountCreate();
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCashAmount(100);
    await this.recallPage.openSplitOrder();
    const unsplitAlertText = await this.recallPage.unsplitAndReadAlert();

    return { unsplitAlertText };
  }

  async preventUnsplitAmountSplitOrderAfterSemiPayment(homeUrl: string): Promise<AmountSplitUnsplitAlertResult> {
    return this.preventUnsplitAmountSplitOrderAfterPartialPayment(homeUrl);
  }

  async unsplitUnpaidAmountSplitOrder(homeUrl: string): Promise<AmountSplitUnsplitSuccessResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByAmounts([1, 9.6]);
    await this.recallPage.saveSplit();
    await this.recallPage.saveSplitAmountCreate();
    const unsplitAlertText = await this.recallPage.unsplitAndReadAlert();
    const splitOrderCountAfterUnsplit = (await this.recallPage.readSplitOrderPrices()).length;

    return { splitOrderCountAfterUnsplit, unsplitAlertText };
  }

  async splitLargeOrderByMultipleAmountsAndReadTotals(homeUrl: string): Promise<AmountSplitFixedTotalsResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(200);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    const parentTotalBeforeSplit = await this.recallPage.readOrderTotal();
    await this.recallPage.splitByAmounts([20, 20, 20, 20, 20]);
    const parentTotalAfterSplit = await this.recallPage.readOrderTotal();
    await this.recallPage.saveSplit();
    await this.recallPage.saveSplitAmountCreate();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTotal = await this.recallPage.readOrderTotal();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderTotal = await this.recallPage.readOrderTotal();

    return {
      firstSubOrderTotal,
      parentTotalAfterSplit,
      parentTotalBeforeSplit,
      secondSubOrderTotal,
    };
  }

  async openVoidReasonsForSavedOrderAndReadCount(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openVoidReasonChooser();
    return this.recallPage.readVoidReasonCount();
  }

  async clearChargesOnPaidDragSplitSubOrdersAndReadDetails(
    homeUrl: string,
  ): Promise<ClearSplitSubOrderChargeResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();

    const firstDish = splitDiscountDishes[0];
    const secondDish = splitDiscountDishes[1];
    const thirdDish = splitDiscountDishes[2];
    if (!firstDish || !secondDish || !thirdDish) {
      throw new Error('POS-22813 requires three split discount dishes');
    }
    await this.orderDishesPage.selectMenuGroup(firstDish.group);
    await this.orderDishesPage.selectMenuCategory(firstDish.category);
    await this.orderDishesPage.addMenuItem(firstDish.name);
    await this.orderDishesPage.addMenuItem(secondDish.name);
    await this.orderDishesPage.addMenuItem(thirdDish.name);
    await this.orderDishesPage.applyOrderCharge('5%');
    await this.orderDishesPage.sendAllToKitchen();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByDrag();

    await this.clearCurrentSplitSubOrderChargeAndPay(1);
    await this.clearCurrentSplitSubOrderChargeAndPay(2);
    await this.clearCurrentSplitSubOrderChargeAndPay(3);

    await this.recallPage.openSubOrder(1);
    const firstSubOrderStatus = await this.recallPage.readOrderStatus();
    const firstSubOrderPriceDetail = await this.recallPage.readOrderPriceDetail();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderStatus = await this.recallPage.readOrderStatus();
    const secondSubOrderPriceDetail = await this.recallPage.readOrderPriceDetail();
    await this.recallPage.openSubOrder(3);
    const thirdSubOrderStatus = await this.recallPage.readOrderStatus();
    const thirdSubOrderPriceDetail = await this.recallPage.readOrderPriceDetail();

    return {
      firstSubOrderPriceDetail,
      firstSubOrderStatus,
      secondSubOrderPriceDetail,
      secondSubOrderStatus,
      thirdSubOrderPriceDetail,
      thirdSubOrderStatus,
    };
  }

  private async clearCurrentSplitSubOrderChargeAndPay(index: number): Promise<void> {
    await this.recallPage.openSubOrder(index);
    await this.recallPage.clickEdit();
    await this.orderDishesPage.applyOrderCharge('0%');
    await this.orderDishesPage.settleByCash();
  }

  async clearWholeOrderDiscountAndReadPriceDetail(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);

    for (let index = 0; index < 6; index += 1) {
      await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    }

    await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(20);
    await this.orderDishesPage.selectOrderLineItems([1, 2, 3, 4, 5, 6]);
    await this.orderDishesPage.applySelectedItemsDiscountPercent(20);
    await this.orderDishesPage.clearWholeOrderDiscount();
    return this.orderDishesPage.readOrderPriceDetail();
  }

  async clearThirdItemDiscountAndReadItemText(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);

    for (let index = 0; index < 3; index += 1) {
      await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    }

    await this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
    await this.orderDishesPage.applyWholeOrderDiscountPercent(20);
    await this.orderDishesPage.selectOrderLineItems([1, 2, 3]);
    await this.orderDishesPage.applySelectedItemsDiscountPercent(20);
    await this.orderDishesPage.selectOrderLineItem(3);
    await this.orderDishesPage.clearSelectedItemDiscounts();
    return this.orderDishesPage.readOrderLineText(3);
  }

  async partiallyPayTaxExemptOrderAddTipAndReadStatus(homeUrl: string): Promise<PartialSettleAddTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(2000);
    await this.orderDishesPage.voidSelectedItemTax();
    await this.orderDishesPage.clickSettle();
    const originalTotal = await this.orderDishesPage.readSettlementTotal();

    await this.orderDishesPage.modifySettlementPaymentAmount(500);
    await this.orderDishesPage.settleByCash();
    await this.orderDishesPage.addSettlementTip(100);
    const unpaidAmountAfterTip = await this.orderDishesPage.readSettlementUnpaidAmount();
    await this.orderDishesPage.settleByCash();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const orderStatus = await this.recallPage.readOrderStatus();

    return { originalTotal, orderStatus, unpaidAmountAfterTip };
  }

  async addCashTipToFirstPaidEvenSplitSubOrder(homeUrl: string): Promise<PaidEvenSplitCashTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitEvenly(2);
    await this.recallPage.saveSplit();

    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleSubOrder(1);
    await this.recallPage.payCurrentSubOrderByCash();

    await this.recallPage.openSubOrder(2);
    await this.recallPage.settleSubOrder(2);
    await this.recallPage.payCurrentSubOrderByCash();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderStatusAfterCashPay = await this.recallPage.readOrderStatus();

    await this.recallPage.openSubOrder(1);
    await this.recallPage.addTipAfterCreditPayment(100, 'cash');
    const firstSubOrderTipAfterCashTip = await this.recallPage.readOrderTipText();

    return { firstSubOrderTipAfterCashTip, secondSubOrderStatusAfterCashPay };
  }

  async addNoPriceGlobalOptionCopyOrderAndReadTotals(homeUrl: string): Promise<NoOptionCopyTotalsResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const totalBeforeNoOption = await this.orderDishesPage.readSubtotal();

    await this.orderDishesPage.openGlobalOptionModify();
    const totalAfterNoOption = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const totalAfterCopy = await this.recallPage.readOrderTotal();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const recalledCopiedTotal = await this.recallPage.readOrderTotal();

    return {
      recalledCopiedTotal,
      totalAfterCopy,
      totalAfterNoOption,
      totalBeforeNoOption,
    };
  }

  async combineTwoTaxExemptOrdersWithNonTaxableChargeAndReadTotals(
    homeUrl: string,
  ): Promise<CombinedNonTaxableChargeTotalsResult> {
    await this.homePage.open(homeUrl);
    const firstOrderTotal = await this.createTaxExemptOrderWithChargeAndReadTotal({ taxableCharge: false });
    const secondOrderTotal = await this.createTaxExemptOrderWithChargeAndReadTotal({ taxableCharge: false });

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.combineOrder(2);
    const combinedTotal = await this.recallPage.readOrderTotal();

    return {
      combinedTotal,
      firstOrderTotal,
      secondOrderTotal,
    };
  }

  async combineTwoTaxExemptOrdersWithTaxableChargeAndReadTotals(
    homeUrl: string,
  ): Promise<CombinedNonTaxableChargeTotalsResult> {
    await this.homePage.open(homeUrl);
    const firstOrderTotal = await this.createTaxExemptOrderWithChargeAndReadTotal({ taxableCharge: true });
    const secondOrderTotal = await this.createTaxExemptOrderWithChargeAndReadTotal({ taxableCharge: true });

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.combineOrder(2);
    const combinedTotal = await this.recallPage.readOrderTotal();

    return {
      combinedTotal,
      firstOrderTotal,
      secondOrderTotal,
    };
  }

  async renameManualFixedChargeThenReapplyInRecalledOrder(homeUrl: string): Promise<RenameManualChargeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27156 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameManualCharge('manu_test_fixed', 'mod_test1');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeBeforeReapply = await this.orderDishesPage.readOrderChargeItems();

    await this.orderDishesPage.openChargeDialog();
    const selectedCharges = await this.orderDishesPage.readSelectedPresetCharges();
    const modifiedChargeSelectedInDialog = Boolean(selectedCharges.mod_test1);
    await this.orderDishesPage.reapplyPresetCharge('mod_test1');
    const recalledChargeAfterReapply = await this.orderDishesPage.readOrderChargeItems();

    return {
      modifiedChargeSelectedInDialog,
      recalledChargeAfterReapply,
      recalledChargeBeforeReapply,
    };
  }

  async convertManualFixedChargeToPercentThenReapplyInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargeRateTypeToPercentResult> {
    if (!this.adminPage) {
      throw new Error('POS-27157 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    const initialChargeBeforeSave = await this.orderDishesPage.readOrderChargeItems();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeRateType('manu_test_fixed', 'percent');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterRateTypeChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.reapplyPresetCharge('manu_test_fixed');
    const recalledChargeAfterReapply = await this.orderDishesPage.readOrderChargeItems();
    const recalledSubtotal = await this.orderDishesPage.readSubtotal();

    return {
      initialChargeBeforeSave,
      recalledChargeAfterReapply,
      recalledSubtotal,
      selectedChargesAfterRateTypeChange,
    };
  }

  async convertManualPercentChargeToFixedThenConfirmInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargeRateTypeToAmountResult> {
    if (!this.adminPage) {
      throw new Error('POS-27158 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_perc');
    const initialChargeBeforeSave = await this.orderDishesPage.readOrderChargeItems();
    const initialSubtotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeRateType('manu_test_perc', 'amount');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterRateTypeChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const recalledChargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      initialChargeBeforeSave,
      initialSubtotal,
      recalledChargeAfterConfirm,
      selectedChargesAfterRateTypeChange,
    };
  }

  async modifyManualFixedChargeAmountThenConfirmInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargeAmountChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27159 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    const initialChargeBeforeSave = await this.orderDishesPage.readOrderChargeItems();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeAmount('manu_test_fixed', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterAmountChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const recalledChargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      initialChargeBeforeSave,
      recalledChargeAfterConfirm,
      selectedChargesAfterAmountChange,
    };
  }

  async modifyManualPercentChargeValueThenConfirmInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargePercentChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27160 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_perc');
    const initialChargeBeforeSave = await this.orderDishesPage.readOrderChargeItems();
    const initialSubtotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeAmount('manu_test_perc', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterPercentChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const recalledSubtotal = await this.orderDishesPage.readSubtotal();
    const recalledChargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      initialChargeBeforeSave,
      initialSubtotal,
      recalledChargeAfterConfirm,
      recalledSubtotal,
      selectedChargesAfterPercentChange,
    };
  }

  async modifyManualFixedChargeTaxedThenConfirmInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargeTaxChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27163 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(chineseInitialSearchDish.group);
    await this.orderDishesPage.selectMenuCategory(chineseInitialSearchDish.category);
    await this.orderDishesPage.addMenuItem(chineseInitialSearchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeTaxed('manu_test_fixed', true);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const originTaxBeforeEdit = Number(await this.recallPage.readOrderTaxText());

    await this.recallPage.clickEdit();
    const taxAfterEnteringEdit = await this.orderDishesPage.readTax();
    await this.orderDishesPage.openChargeDialog();
    await this.orderDishesPage.confirmChargeDialog();
    const taxAfterConfirmCharge = await this.orderDishesPage.readTax();

    return {
      originTaxBeforeEdit,
      taxAfterConfirmCharge,
      taxAfterEnteringEdit,
    };
  }

  async keepManualFixedChargeWhenOrderTypeStillMatchesAfterEdit(
    homeUrl: string,
  ): Promise<ManualChargeOrderTypeMatchResult> {
    if (!this.adminPage) {
      throw new Error('POS-27164 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeOrderTypes('manu_test_fixed', ['dine-in', 'delivery']);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    const chargeBeforeConfirm = await this.orderDishesPage.readOrderChargeItems();
    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterOrderTypeChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const chargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      chargeAfterConfirm,
      chargeBeforeConfirm,
      selectedChargesAfterOrderTypeChange,
    };
  }

  async keepExistingManualFixedChargeWhenOrderTypeNoLongerMatchesAfterEdit(
    homeUrl: string,
  ): Promise<ManualChargeOrderTypeMismatchResult> {
    if (!this.adminPage) {
      throw new Error('POS-27165 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    const chargeBeforeSave = await this.orderDishesPage.readOrderChargeItems();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeOrderTypes('manu_test_fixed', ['delivery']);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterOrderTypeChange = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const chargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      chargeAfterConfirm,
      chargeBeforeSave,
      selectedChargesAfterOrderTypeChange,
    };
  }

  async deleteAllManualChargesThenKeepLegacySelectionInRecalledOrder(
    homeUrl: string,
  ): Promise<ManualChargeDeletedResult> {
    if (!this.adminPage) {
      throw new Error('POS-27169 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.deleteAllManualCharges();
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();

    const chargeBeforeConfirm = await this.orderDishesPage.readOrderChargeItems();
    await this.orderDishesPage.openChargeDialog();
    const selectedChargesAfterDelete = await this.orderDishesPage.readSelectedPresetCharges();
    await this.orderDishesPage.confirmChargeDialog();
    const chargeAfterConfirm = await this.orderDishesPage.readOrderChargeItems();

    return {
      chargeAfterConfirm,
      chargeBeforeConfirm,
      selectedChargesAfterDelete,
    };
  }

  async sendKitchenFromEditAfterModifyingManualFixedCharge(
    homeUrl: string,
  ): Promise<ManualChargeEditSendKitchenResult> {
    if (!this.adminPage) {
      throw new Error('POS-27191 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeAmount('manu_test_fixed', 20);
    await this.adminPage.renameManualCharge('manu_test_fixed', 'mod_test1');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.orderDishesPage.sendAllToKitchen();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const recallChargeAfterEditSendKitchen = await this.recallPage.readOrderChargeItems();

    return {
      recallChargeAfterEditSendKitchen,
    };
  }

  async renameAutoFixedChargeThenReadRecalledOrderCharge(homeUrl: string): Promise<RenameAutoChargeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27170 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test_fixed', 'auto_test1');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeAfterRename = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterRename,
    };
  }

  async convertAutoFixedChargeToPercentThenReadRecalledOrderCharge(
    homeUrl: string,
  ): Promise<AutoChargeRateTypeToPercentResult> {
    if (!this.adminPage) {
      throw new Error('POS-27171 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeRateType('auto_test_fixed', 'percent');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledSubtotal = await this.orderDishesPage.readSubtotal();
    const recalledChargeAfterRateTypeChange = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterRateTypeChange,
      recalledSubtotal,
    };
  }

  async convertAutoPercentChargeToFixedThenReadRecalledOrderCharge(
    homeUrl: string,
  ): Promise<AutoChargeRateTypeToAmountResult> {
    if (!this.adminPage) {
      throw new Error('POS-27172 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoPercentCharge('auto_test_percentage', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeRateType('auto_test_percentage', 'amount');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeAfterRateTypeChange = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterRateTypeChange,
    };
  }

  async modifyAutoFixedChargeAmountThenReadRecalledOrderCharge(
    homeUrl: string,
  ): Promise<AutoChargeAmountChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27173 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeAmount('auto_test_fixed', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeAfterAmountChange = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterAmountChange,
    };
  }

  async modifyAutoPercentChargeValueThenReadRecalledOrderCharge(
    homeUrl: string,
  ): Promise<AutoChargePercentChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27174 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoPercentCharge('auto_test_percentage', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeAmount('auto_test_percentage', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledSubtotal = await this.orderDishesPage.readSubtotal();
    const recalledChargeAfterPercentChange = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterPercentChange,
      recalledSubtotal,
    };
  }

  async removeAutoChargeWhenOrderTypeNoLongerMatchesAfterEdit(
    homeUrl: string,
  ): Promise<AutoChargeOrderTypeMismatchResult> {
    if (!this.adminPage) {
      throw new Error('POS-27176 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeOrderTypes('auto_test_fixed', ['delivery']);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeAfterOrderTypeChange = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterOrderTypeChange,
    };
  }

  async increaseTaxWhenAutoFixedChargeBecomesTaxedAfterEdit(
    homeUrl: string,
  ): Promise<AutoChargeTaxChangeResult> {
    if (!this.adminPage) {
      throw new Error('POS-27177 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(chineseInitialSearchDish.group);
    await this.orderDishesPage.selectMenuCategory(chineseInitialSearchDish.category);
    await this.orderDishesPage.addMenuItem(chineseInitialSearchDish.name);
    const taxBeforeSave = await this.orderDishesPage.readTax();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeTaxed('auto_test_fixed', true);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const taxAfterEnteringEdit = await this.orderDishesPage.readTax();

    return {
      taxAfterEnteringEdit,
      taxBeforeSave,
    };
  }

  async removeDeletedAutoFixedChargeFromRecalledOrderEdit(
    homeUrl: string,
  ): Promise<AutoChargeDeletedResult> {
    if (!this.adminPage) {
      throw new Error('POS-27182 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.deleteAutoChargeByName('auto_test_fixed');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const recalledChargeAfterDelete = await this.orderDishesPage.readOrderChargeItems();

    return {
      recalledChargeAfterDelete,
    };
  }

  async sendKitchenFromRecallAfterModifyingAutoFixedCharge(
    homeUrl: string,
  ): Promise<AutoChargeRecallSendKitchenResult> {
    if (!this.adminPage) {
      throw new Error('POS-27190 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test_fixed', 'mod_test1');
    await this.adminPage.setAutoChargeAmount('mod_test1', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.sendKitchenFromDetail();
    const recallChargeAfterSendKitchen = await this.recallPage.readOrderChargeItems();

    return {
      recallChargeAfterSendKitchen,
    };
  }

  async saveEditAfterModifyingAutoFixedCharge(homeUrl: string): Promise<AutoChargeEditSaveResult> {
    if (!this.adminPage) {
      throw new Error('POS-27192 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test_fixed', 'mod_test1');
    await this.adminPage.setAutoChargeAmount('mod_test1', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const recallChargeAfterEditSave = await this.recallPage.readOrderChargeItems();

    return {
      recallChargeAfterEditSave,
    };
  }

  async splitRecallOrderAfterModifyingAutoFixedCharge(homeUrl: string): Promise<AutoChargeRecallSplitResult> {
    if (!this.adminPage) {
      throw new Error('POS-27229 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test_fixed', 'mod_test1');
    await this.adminPage.setAutoChargeAmount('mod_test1', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitEvenly(2);
    await this.recallPage.saveSplit();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      firstSubOrderCharge,
    };
  }

  async splitEditOrderAfterModifyingManualFixedCharge(homeUrl: string): Promise<ManualChargeEditSplitResult> {
    if (!this.adminPage) {
      throw new Error('POS-27242 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    const originalSubtotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setManualChargeAmount('manu_test_fixed', 20);
    await this.adminPage.renameManualCharge('manu_test_fixed', 'mod_test1');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByDrag();
    await this.recallPage.saveSplit();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderSubtotal = await this.recallPage.readOrderSubtotal();
    const firstSubOrderCharge = await this.recallPage.readOrderChargeItems();
    const expectedFirstSubOrderCharge = ((firstSubOrderSubtotal / originalSubtotal) * 10).toFixed(2);

    return {
      expectedFirstSubOrderCharge,
      firstSubOrderCharge,
      firstSubOrderSubtotal,
      originalSubtotal,
    };
  }

  async splitEditOrderAfterModifyingAutoFixedCharge(homeUrl: string): Promise<AutoChargeEditSplitResult> {
    if (!this.adminPage) {
      throw new Error('POS-27248 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test1', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test1', 'mod_test1');
    await this.adminPage.setAutoChargeAmount('mod_test1', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitEvenly(2);
    await this.recallPage.saveSplit();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      firstSubOrderCharge,
    };
  }

  async copyOrderAfterModifyingAutoChargeToPercent(homeUrl: string): Promise<AutoChargeCopyResult> {
    if (!this.adminPage) {
      throw new Error('POS-27257 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test1', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.renameAutoCharge('auto_test1', 'mod_test1');
    await this.adminPage.setAutoChargeRateType('mod_test1', 'percent');
    await this.adminPage.setAutoChargeAmount('mod_test1', 20);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const copiedOrderSubtotal = await this.recallPage.readOrderSubtotal();
    const copiedOrderCharge = await this.recallPage.readOrderChargeItems();
    const expectedCopiedCharge = (copiedOrderSubtotal * 0.2).toFixed(2);

    return {
      copiedOrderCharge,
      copiedOrderSubtotal,
      expectedCopiedCharge,
    };
  }

  async copyOrderAfterModifyingAutoChargeMinGuest(homeUrl: string): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage) {
      throw new Error('POS-27258 requires AdminPage');
    }

    return this.copyOrderAfterModifyingAutoChargeMinGuestValue(homeUrl, 1);
  }

  async copyOrderAfterModifyingAutoChargeMinGuestMismatch(homeUrl: string): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage) {
      throw new Error('POS-27259 requires AdminPage');
    }

    return this.copyOrderAfterModifyingAutoChargeMinGuestValue(homeUrl, 2);
  }

  private async copyOrderAfterModifyingAutoChargeMinGuestValue(
    homeUrl: string,
    minGuest: number,
  ): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage) {
      throw new Error('auto charge min guest copy flow requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test1', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeMinGuest('auto_test1', minGuest);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const copiedOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      copiedOrderCharge,
    };
  }

  async copyDeliveryOrderAfterModifyingAutoChargeMinMileMismatch(
    homeUrl: string,
  ): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage || !this.deliveryPage) {
      throw new Error('POS-27271 requires AdminPage and DeliveryPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test1', 10);
    await this.adminPage.setAutoChargeOrderTypes('auto_test1', ['delivery']);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setAutoChargeMinMile('auto_test1', 5);
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const copiedOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      copiedOrderCharge,
    };
  }

  async copyOrderAfterChangingAutoChargeTriggerToManual(
    homeUrl: string,
  ): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage) {
      throw new Error('POS-27286 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setupAutoFixedCharge('auto_test_fixed', 10);
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setChargeTriggerMode('auto_test_fixed', 'manual');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const copiedOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      copiedOrderCharge,
    };
  }

  async copyOrderAfterChangingManualChargeTriggerToAuto(
    homeUrl: string,
  ): Promise<AutoChargeCopyMinGuestResult> {
    if (!this.adminPage) {
      throw new Error('POS-27287 requires AdminPage');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.applyPresetCharge('manu_test_fixed');
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickAdmin();
    await this.adminPage.setChargeTriggerMode('manu_test_fixed', 'auto');
    await this.homePage.open(homeUrl);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.copyCurrentOrder();
    const copiedOrderCharge = await this.recallPage.readOrderChargeItems();

    return {
      copiedOrderCharge,
    };
  }

  private async createTaxExemptOrderWithChargeAndReadTotal(options: { taxableCharge: boolean }): Promise<number> {
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(chineseInitialSearchDish.group);
    await this.orderDishesPage.selectMenuCategory(chineseInitialSearchDish.category);
    await this.orderDishesPage.addMenuItem(chineseInitialSearchDish.name);
    await this.orderDishesPage.voidSelectedItemTax();
    if (options.taxableCharge) {
      await this.orderDishesPage.applyTaxableOrderCharge('10%');
    } else {
      await this.orderDishesPage.applyOrderCharge('10%');
    }
    const total = await this.orderDishesPage.readSettlementTotal();
    await this.orderDishesPage.saveOrder();
    return total;
  }

  async unsplitEvenSplitOrderAfterEditingFirstSubOrderTip(homeUrl: string): Promise<EvenSplitTipUnsplitResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addTip(500);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitEvenly(2);
    await this.recallPage.saveSplit();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.clickEdit();
    await this.orderDishesPage.addTip(600);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.unsplit();
    await this.recallPage.saveSplit();

    const combinedTipText = await this.recallPage.readOrderTipText();
    return { combinedTipText };
  }

  async reduceFirstSeatSplitSubOrderItemAndReadTips(homeUrl: string): Promise<SeatSplitReduceItemTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);

    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);

    await this.orderDishesPage.addTip(600);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.saveSplit();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipBeforeReduce = await this.recallPage.readOrderTipText();
    await this.recallPage.clickEdit();
    await this.orderDishesPage.reduceSelectedItemQuantity();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipAfterReduce = await this.recallPage.readOrderTipText();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderTipAfterReduce = await this.recallPage.readOrderTipText();

    return {
      firstSubOrderTipAfterReduce,
      firstSubOrderTipBeforeReduce,
      secondSubOrderTipAfterReduce,
    };
  }

  async discountFirstSeatSplitSubOrderItemAndReadTips(homeUrl: string): Promise<SeatSplitDiscountItemTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.setGuestCount(2);

    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.selectSeat(1);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);

    await this.orderDishesPage.selectSeat(2);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5);

    await this.orderDishesPage.addTip(600);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitBySeat();
    await this.recallPage.saveSplit();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipBeforeDiscount = await this.recallPage.readOrderTipText();
    await this.recallPage.clickEdit();
    await this.orderDishesPage.selectOrderLineItem(1);
    await this.orderDishesPage.applySelectedItemsDiscountAmount(5);
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderTipAfterDiscount = await this.recallPage.readOrderTipText();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderTipAfterDiscount = await this.recallPage.readOrderTipText();

    return {
      firstSubOrderTipAfterDiscount,
      firstSubOrderTipBeforeDiscount,
      secondSubOrderTipAfterDiscount,
    };
  }

  async readFirstDragSplitSubOrderDiscountWholePrice(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    const firstDish = splitDiscountDishes[0];
    if (!firstDish) {
      throw new Error('splitDiscountDishes must contain at least one source dish');
    }
    const additionalDishes = splitDiscountDishes.slice(1);
    await this.orderDishesPage.selectMenuGroup(firstDish.group);
    await this.orderDishesPage.selectMenuCategory(firstDish.category);
    await this.orderDishesPage.addMenuItem(firstDish.name);
    for (const dish of additionalDishes) {
      await this.orderDishesPage.addMenuItem(dish.name);
    }
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByDrag();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.clickEdit();
    return this.orderDishesPage.openDiscountAndReadWholeOrderPrice();
  }

  async createCustomDeliveryOrderAndReadReportNetSales(homeUrl: string): Promise<CustomOrderReportNetSalesResult> {
    if (!this.deliveryPage || !this.reportPage) {
      throw new Error('DeliveryPage and ReportPage are required for custom order report validation');
    }
    const orderType = 'CUSTOM_D';
    const dish = splitDiscountDishes[0];
    if (!dish) {
      throw new Error('splitDiscountDishes must contain the source custom-order dish');
    }

    await this.homePage.open(homeUrl);
    await this.homePage.clickReport();
    await this.reportPage.inputPasswordInPopup(validEmployeePassword);
    await this.reportPage.selectOrderType(orderType);
    const netSalesBefore = await this.reportPage.readOverviewNetSales();

    await this.homePage.clickCustomDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
    const orderSubtotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickReport();
    await this.reportPage.inputPasswordInPopup(validEmployeePassword);
    await this.reportPage.selectOrderType(orderType);
    const netSalesAfter = await this.reportPage.readOverviewNetSales();

    return {
      orderType,
      netSalesBefore,
      orderSubtotal,
      netSalesAfter,
    };
  }

  async createChineseOpenFoodWithMultiLanguageKeyboard(homeUrl: string): Promise<string> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for default keyboard setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setDefaultKeyboard('support multi language');
    await this.homePage.refresh();
    await this.homePage.clickTogo();
    return this.orderDishesPage.createOpenFoodWithKeyboard('Chinese Simpl. Pinyin', '中文');
  }

  async applySpecialPriceHalfDiscountAndReadRecallSubtotal(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(5.85);
    await this.orderDishesPage.applyHalfDiscount();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readOrderSubtotal();
  }

  async createDeliveryOrderAndReadInfo(homeUrl: string): Promise<string[]> {
    if (!this.deliveryPage) {
      throw new Error('DeliveryPage is required for Delivery order creation');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    return this.orderDishesPage.readDeliveryInfo();
  }

  async exitDeliveryOrderAndReadHomeWelcome(homeUrl: string): Promise<string> {
    if (!this.deliveryPage) {
      throw new Error('DeliveryPage is required for Delivery order creation');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    await this.orderDishesPage.exitOrderPage();
    return this.homePage.readWelcomeText();
  }

  async reduceComboOptionsAndReadCounts(homeUrl: string): Promise<ComboOptionCountResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.addComboWithOptions(4);
    const beforeCount = await this.orderDishesPage.readComboOptionCount();
    await this.orderDishesPage.reduceComboOption();
    await this.orderDishesPage.reduceComboOption();
    await this.orderDishesPage.reduceComboOption();
    const afterCount = await this.orderDishesPage.readComboOptionCount();
    return { beforeCount, afterCount };
  }

  async switchMenuModesAndSearchItems(homeUrl: string): Promise<MenuModeSearchResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for menu mode setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setPosMenuMode(menuModes.pos);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.searchMenuItem(menuModeSearchItems.pos);
    const posSearchResult = await this.orderDishesPage.readSearchResult();
    await this.orderDishesPage.clearSearch();
    await this.orderDishesPage.exitOrderPage();

    await this.homePage.clickAdmin();
    await this.adminPage.setPosMenuMode(menuModes.emenu);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.searchMenuItem(menuModeSearchItems.emenu);
    const eMenuSearchResult = await this.orderDishesPage.readSearchResult();
    await this.orderDishesPage.clearSearch();
    await this.orderDishesPage.exitOrderPage();

    await this.homePage.clickAdmin();
    await this.adminPage.setPosMenuMode(menuModes.pos);
    await this.homePage.refresh();
    return { posSearchResult, eMenuSearchResult };
  }

  async addGlobalOptionAndReadModifyArea(homeUrl: string): Promise<GlobalOptionAddResult> {
    await this.openDineInOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.openGlobalOptionModify();
    await this.orderDishesPage.addGlobalOptionListItem();
    const modifyAreaVisibleAfterAdd = await this.orderDishesPage.isGlobalOptionModifyAreaVisible();
    return { modifyAreaVisibleAfterAdd };
  }

  async changeGlobalOptionCountsAndReadModifyArea(
    homeUrl: string,
    counts: readonly [number, number],
  ): Promise<GlobalOptionCountResult> {
    await this.openDineInOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.openGlobalOptionModify();
    await this.orderDishesPage.setGlobalOptionListCount(counts[0]);
    const modifyAreaVisibleAfterFirstCount = await this.orderDishesPage.isGlobalOptionModifyAreaVisible();
    await this.orderDishesPage.setGlobalOptionListCount(counts[1]);
    const modifyAreaVisibleAfterZeroCount = await this.orderDishesPage.isGlobalOptionModifyAreaVisible();
    const optionCountAfterZero = await this.orderDishesPage.readGlobalOptionListCount();
    return { modifyAreaVisibleAfterFirstCount, modifyAreaVisibleAfterZeroCount, optionCountAfterZero };
  }

  async reduceGlobalOptionToZeroAndReadModifyArea(homeUrl: string): Promise<GlobalOptionReduceResult> {
    await this.openDineInOrderAndAddDish(homeUrl, groupSwitchDish);
    await this.orderDishesPage.openGlobalOptionModify();
    await this.orderDishesPage.setGlobalOptionListCount(2);
    const modifyAreaVisibleAfterInitialCount = await this.orderDishesPage.isGlobalOptionModifyAreaVisible();
    await this.orderDishesPage.reduceGlobalOptionListItem();
    await this.orderDishesPage.reduceGlobalOptionListItem();
    const modifyAreaVisibleAfterReduce = await this.orderDishesPage.isGlobalOptionModifyAreaVisible();
    const optionCountAfterReduce = await this.orderDishesPage.readGlobalOptionListCount();
    return { modifyAreaVisibleAfterInitialCount, modifyAreaVisibleAfterReduce, optionCountAfterReduce };
  }

  async createDineInOrderWithGuestNameAndReadRecall(
    homeUrl: string,
    guestName: string,
  ): Promise<GuestNameRecallResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.fillGuestName(guestName);
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const nameOnRecallCard = await this.recallPage.readCustomerName();
    await this.recallPage.clickEdit();
    const nameInOrderEdit = await this.recallPage.readCustomerName();
    return { nameOnRecallCard, nameInOrderEdit };
  }

  async toggleSearchMenuAndSearchDefaultItem(homeUrl: string): Promise<SearchMenuToggleResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for Search Menu setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setSearchMenu(false);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    const searchClassWhenDisabled = await this.orderDishesPage.readSearchClass();
    await this.orderDishesPage.exitOrderPage();

    await this.homePage.clickAdmin();
    await this.adminPage.setSearchMenu(true);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    const searchClassWhenEnabled = await this.orderDishesPage.readSearchClass();
    await this.orderDishesPage.searchMenuItem(menuModeSearchItems.pos);
    const searchResult = await this.orderDishesPage.readSearchResult();

    return { searchClassWhenDisabled, searchClassWhenEnabled, searchResult };
  }

  async searchDishWithSameNameAndNumberAndReadResult(homeUrl: string): Promise<NumberedNameSearchResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.searchMenuItem(numberedNameConflictDish.name);
    const searchResultText = await this.orderDishesPage.readSearchResult();
    const searchResultCount = await this.orderDishesPage.readSearchResultCount();
    return {
      searchKeyword: numberedNameConflictDish.name,
      searchResultText,
      searchResultCount,
    };
  }

  async configureChineseItemNameAndSearchByInitials(homeUrl: string): Promise<ChineseInitialSearchResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for item Chinese name setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setItemChineseName(
      chineseInitialSearchDish.group,
      chineseInitialSearchDish.category,
      chineseInitialSearchDish.name,
      chineseInitialSearchDish.chineseName,
    );
    await this.homePage.refresh();
    await this.homePage.switchLanguage(languageOptions.chinese);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.searchMenuItem(chineseInitialSearchDish.searchKeyword);
    const searchResultText = await this.orderDishesPage.readSearchResult();
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.switchLanguage(languageOptions.default);
    return {
      searchKeyword: chineseInitialSearchDish.searchKeyword,
      searchResultText,
    };
  }

  async createOrderWithIntegerItemCountAndReadRecall(homeUrl: string): Promise<ItemCountRecallResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(3);
    const itemCountBeforeSave = await this.orderDishesPage.readItemCount();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const itemCountAfterRecall = await this.recallPage.readItemCount();
    return { itemCountBeforeSave, itemCountAfterRecall };
  }

  async addLargeTipBeforeSaveAndReadRecall(homeUrl: string): Promise<LargeTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const orderTotal = await this.orderDishesPage.readSubtotal();
    const customTip = Math.floor((orderTotal * 100) / 2) + 100;
    const tipToast = await this.orderDishesPage.addTipAndReadToast(customTip);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const expectedTip = (customTip / 100).toFixed(2);
    const recallTip = await this.recallPage.readOrderTipText();
    return { tipToast, expectedTip, recallTip };
  }

  async addLargeTipAfterCreditPaymentAndReadRecall(homeUrl: string): Promise<LargeTipResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.settleByCredit();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const orderTotal = await this.recallPage.readOrderTotal();
    const customTip = Math.floor((orderTotal * 100) / 2) + 100;
    const tipToast = await this.recallPage.addTipAfterCreditPaymentAndReadToast(customTip);
    const expectedTip = (customTip / 100).toFixed(2);
    const recallTip = await this.recallPage.readOrderTipText();
    return { tipToast, expectedTip, recallTip };
  }

  async deleteHeldPrintedItemWithManagerPassword(homeUrl: string): Promise<VoidPrintedItemPermissionResult> {
    await this.openDineInOrderAsNoVoidPrintedStaff(homeUrl);
    await this.orderDishesPage.semiSendHoldPrint();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const permissionToast = await this.orderDishesPage.voidSelectedItemAndReadToast();
    await this.orderDishesPage.submitManagerPassword(validEmployeePassword);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const itemLineCountAfterDelete = await this.orderDishesPage.readOrderLineCount();
    return { permissionToast, itemLineCountAfterDelete };
  }

  async deleteDelayedPrintedItemWithManagerPassword(homeUrl: string): Promise<VoidPrintedItemPermissionResult> {
    await this.openDineInOrderAsNoVoidPrintedStaff(homeUrl);
    await this.orderDishesPage.semiSendDelayPrint();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const permissionToast = await this.orderDishesPage.changeSelectedItemQuantityAndReadToast(0);
    await this.orderDishesPage.submitManagerPassword(validEmployeePassword);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    const itemLineCountAfterDelete = await this.orderDishesPage.readOrderLineCount();
    return { permissionToast, itemLineCountAfterDelete };
  }

  async addComboSubItemNoteWithManagerAuthorization(homeUrl: string): Promise<ComboSubItemNotePermissionResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for staff NOTE permission setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setStaffNotePermission(false);
    await this.homePage.refresh();
    await this.homePage.logout();
    await this.homePage.inputEmployeePassword(staffSamples.noNote.password);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.addComboWithOptions(4);
    await this.orderDishesPage.openFirstComboSubItem();
    const permissionToast = await this.orderDishesPage.clickComboSubItemEditNoteAndReadToast();
    await this.orderDishesPage.submitManagerPassword(validEmployeePassword);
    await this.orderDishesPage.inputComboSubItemNote('子菜的备注信息');
    const noteText = await this.orderDishesPage.readComboSubItemNote();
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.clickAdmin();
    await this.adminPage.setStaffNotePermission(true);
    await this.homePage.refresh();
    return { permissionToast, noteText };
  }

  async requireKdsCategoryBeforeSave(homeUrl: string): Promise<RequiredCategorySaveResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for category Required setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsCategoryRequired(true);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    const categoryAfterRejectedSave = await this.orderDishesPage.readCurrentCategoryName();
    const urlAfterRejectedSave = await this.orderDishesPage.readCurrentUrl();
    await this.orderDishesPage.selectMenuGroup(requiredKdsDish.group);
    await this.orderDishesPage.selectMenuCategory(requiredKdsDish.category);
    await this.orderDishesPage.addMenuItem(requiredKdsDish.name);
    await this.orderDishesPage.saveOrder();
    const urlAfterCompletedSave = await this.orderDishesPage.readCurrentUrl();
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsCategoryRequired(false);
    await this.homePage.refresh();
    return { categoryAfterRejectedSave, urlAfterRejectedSave, urlAfterCompletedSave };
  }

  async applyPercentChargeWhenKdsDiscountAllowanceDisabled(homeUrl: string): Promise<PercentChargeResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for category discount allowance setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsCategoryDiscountAllowance(false);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(requiredKdsDish.group);
    await this.orderDishesPage.selectMenuCategory(requiredKdsDish.category);
    await this.orderDishesPage.addMenuItem(requiredKdsDish.name);
    await this.orderDishesPage.applyOrderCharge('20%');
    const chargeLabel = await this.orderDishesPage.readChargeLabel();
    const chargePrice = await this.orderDishesPage.readChargePrice();
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsCategoryDiscountAllowance(true);
    await this.homePage.refresh();
    return { chargeLabel, chargePrice };
  }

  async configureKdsItemPosNameAndReadOrderPageName(homeUrl: string): Promise<PosNameDisplayResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for item POS Name setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsItemPosName(posNameDisplayDish.name, posNameDisplayValue);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(posNameDisplayDish.group);
    await this.orderDishesPage.selectMenuCategory(posNameDisplayDish.category);
    const posNameVisible = await this.orderDishesPage.isMenuItemVisible(posNameDisplayValue);
    await this.orderDishesPage.addMenuItem(posNameDisplayValue);
    const orderedItemName = await this.orderDishesPage.readFirstItemName();
    await this.orderDishesPage.exitOrderPage();
    await this.homePage.clickAdmin();
    await this.adminPage.setKdsItemPosName(posNameDisplayDish.name, '');
    await this.homePage.refresh();
    return { posNameVisible, orderedItemName };
  }

  async editQuickComboSubItemPriceAndReadSubtotal(homeUrl: string): Promise<ComboSubItemEditPriceResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(editableComboDish.group);
    await this.orderDishesPage.selectMenuCategory(editableComboDish.category);
    await this.orderDishesPage.addQuickCombo(editableComboDish.name);
    const subtotalBeforeEdit = await this.orderDishesPage.readSubtotalText();
    await this.orderDishesPage.selectOrderedComboSubItem(editableComboDish.name, editableComboDish.editableSubItem);
    await this.orderDishesPage.editSelectedComboSubItemPrice(editableComboDish.editPriceInput);
    const subtotalAfterAdjustableEdit = await this.orderDishesPage.readSubtotalText();
    await this.orderDishesPage.selectOrderedComboSubItem(editableComboDish.name, editableComboDish.fixedSubItem);
    const fixedSubItemSupportsEditPrice = await this.orderDishesPage.selectedComboSubItemSupportsEditPrice();
    return {
      subtotalBeforeEdit,
      subtotalAfterAdjustableEdit,
      fixedSubItemSupportsEditPrice,
    };
  }

  async modifySavedComboSubItemsAndReadRecall(homeUrl: string): Promise<ComboSubItemModificationResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(comboMaxModifyDish.group);
    await this.orderDishesPage.selectMenuCategory(comboMaxModifyDish.category);
    await this.orderDishesPage.addMenuItem(comboMaxModifyDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.orderDishesPage.replaceComboSubItems(comboMaxModifyDish.name, comboMaxModifyDish.replacementSubItems);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return {
      recalledSubItems: await this.recallPage.readComboSubItemNames(),
    };
  }

  async orderComboSubItemThenReadNormalItemOptions(homeUrl: string): Promise<boolean> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(comboNoOptionThenOptionDish.group);
    await this.orderDishesPage.selectMenuCategory(comboNoOptionThenOptionDish.category);
    await this.orderDishesPage.addMenuItem(comboNoOptionThenOptionDish.comboName);
    await this.orderDishesPage.selectOrderedComboSubItem(
      comboNoOptionThenOptionDish.comboName,
      comboNoOptionThenOptionDish.noOptionSubItem,
    );
    await this.orderDishesPage.addMenuItem(comboNoOptionThenOptionDish.optionDishName);
    return this.orderDishesPage.isOrderItemOptionListVisible();
  }

  async createThreeSameItemsWithoutAutoCombine(homeUrl: string): Promise<SameItemCombineResult> {
    await this.configureSameItemCombine(homeUrl, combineSameItemModes.dontCombine);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.addSameDishTimes(3);
    const itemLineCount = await this.orderDishesPage.readOrderLineCount();
    await this.orderDishesPage.saveOrder();
    await this.restoreSameItemSettings();
    return { itemLineCount };
  }

  async addSameItemAfterKitchenWithSameStatusCombine(homeUrl: string): Promise<SameItemCombineResult> {
    await this.configureSameItemCombine(homeUrl, combineSameItemModes.autoSameStatus);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.addSameDishTimes(1);
    await this.orderDishesPage.sendAllToKitchen();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.addSameDishTimes(1);
    const itemLineCount = await this.orderDishesPage.readOrderLineCount();
    await this.orderDishesPage.saveOrder();
    await this.restoreSameItemSettings();
    return { itemLineCount };
  }

  async addSameItemAfterKitchenWithIncludeKitchenCombine(homeUrl: string): Promise<SameItemCombineResult> {
    await this.configureSameItemCombine(homeUrl, combineSameItemModes.includeKitchen);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.addSameDishTimes(1);
    await this.orderDishesPage.sendAllToKitchen();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickEdit();
    await this.addSameDishTimes(1);
    const itemLineCount = await this.orderDishesPage.readOrderLineCount();
    const firstItemQuantity = await this.orderDishesPage.readFirstItemQuantity();
    const firstItemName = await this.orderDishesPage.readFirstItemName();
    const firstItemColor = await this.orderDishesPage.readFirstItemColor();
    await this.orderDishesPage.saveOrder();
    await this.restoreSameItemSettings();
    return { itemLineCount, firstItemQuantity, firstItemName, firstItemColor };
  }

  async reduceItemWithAutoRedirectDisabled(homeUrl: string): Promise<ReduceRedirectResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for auto redirect setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setAutomaticallyRedirectAfterReduceItems(false);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.reduceSelectedItemQuantity();
    const orderItemOptionListVisible = await this.orderDishesPage.isOrderItemOptionListVisible();
    const originalCategoryItemStillVisible = await this.orderDishesPage.isMenuItemVisible(categorySwitchDish.name);
    await this.homePage.clickAdmin();
    await this.adminPage.setAutomaticallyRedirectAfterReduceItems(true);
    await this.homePage.refresh();
    return { orderItemOptionListVisible, originalCategoryItemStillVisible };
  }

  async reduceDecimalQuantityToZero(homeUrl: string): Promise<DecimalReduceResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for decimal count setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setCountCanBeDecimal(true);
    await this.homePage.refresh();
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(1.25);
    await this.orderDishesPage.reduceSelectedItemQuantity();
    await this.orderDishesPage.reduceSelectedItemQuantity();
    const itemCountAfterReduce = await this.orderDishesPage.readItemCount();
    return { itemCountAfterReduce };
  }

  async splitDecimalQuantityOrderByDrag(homeUrl: string): Promise<DecimalDragSplitResult> {
    await this.enableDecimalCount(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(2.55);
    const firstItemTotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(2);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSplitOrder();
    await this.recallPage.splitByDrag();
    await this.recallPage.openSubOrder(2);
    const subOrderItems = await this.recallPage.readAllOrderItems();
    const firstSubOrderTotal = await this.recallPage.readOrderTotal();
    return {
      firstItemTotal,
      firstSubOrderDishQuantity: subOrderItems[0]?.quantity ?? '',
      firstSubOrderTotal,
    };
  }

  async combineDecimalQuantityOrders(homeUrl: string): Promise<DecimalCombineResult> {
    await this.enableDecimalCount(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(2.55);
    const firstOrderTotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(2.55);
    const secondOrderTotal = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.cancelAllCondition();
    await this.recallPage.combineOrder(2);
    const combinedItems = await this.recallPage.readAllOrderItems();
    const combinedTotal = await this.recallPage.readOrderTotal();
    return {
      firstOrderTotal,
      secondOrderTotal,
      firstDishQuantity: combinedItems[0]?.quantity ?? '',
      secondDishQuantity: combinedItems[1]?.quantity ?? '',
      combinedTotal,
    };
  }

  async createDecimalSpecialPriceOrderAndReadRecallSubtotal(
    homeUrl: string,
    lines: readonly DecimalSpecialPriceLine[],
  ): Promise<number> {
    await this.enableDecimalCount(homeUrl);
    await this.homePage.clickTogo();
    for (const [index, line] of lines.entries()) {
      const dish = this.decimalSpecialPriceDish(line.dish);
      await this.orderDishesPage.selectMenuGroup(dish.group);
      await this.orderDishesPage.selectMenuCategory(dish.category);
      await this.orderDishesPage.addMenuItem(dish.name);
      await this.orderDishesPage.selectOrderLineItem(index + 1);
      await this.orderDishesPage.changeSelectedItemPrice(line.price);
      if (line.quantity !== undefined) {
        await this.orderDishesPage.changeSelectedItemQuantity(line.quantity);
      }
    }
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readOrderSubtotal();
  }

  async enterDecimalQuantityWhenDecimalCountDisabled(homeUrl: string): Promise<DecimalCountDisabledResult> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for decimal count setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setCountCanBeDecimal(false);
    await this.homePage.refresh();
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemQuantity(2.55);
    const dishQuantity = await this.orderDishesPage.readOrderLineQuantity(1);
    return { dishQuantity };
  }

  async addGlobalOptionsToDecimalCombinedItemAndReadTotals(homeUrl: string): Promise<DecimalCombinedOptionResult> {
    await this.enableDecimalCount(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage?.setCombineSameItem(combineSameItemModes.autoSameStatus, false);
    await this.homePage.refresh();
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.changeSelectedItemPrice(7.95);
    const itemUnitPrice = await this.orderDishesPage.readSelectedItemPrice();
    await this.orderDishesPage.changeSelectedItemQuantity(2.3);
    await this.orderDishesPage.openGlobalOptionModify();
    const optionPrice = await this.orderDishesPage.addPricedGlobalOptionListItem();
    const firstDishQuantity = await this.orderDishesPage.readOrderLineQuantity(1);
    const secondDishQuantity = await this.orderDishesPage.readOrderLineQuantity(2);
    const secondDishPrice = await this.orderDishesPage.readOrderLinePrice(2);
    const totalBeforeSave = await this.orderDishesPage.readSubtotal();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const recallTotal = await this.recallPage.readOrderTotal();
    await this.restoreSameItemSettings();
    return {
      firstDishQuantity,
      secondDishQuantity,
      secondDishPrice,
      optionPrice,
      itemUnitPrice,
      totalBeforeSave,
      recallTotal,
    };
  }

  async printCustomDeliveryOrderAndReadPrintState(homeUrl: string): Promise<RecallPrintState> {
    if (!this.deliveryPage) {
      throw new Error('DeliveryPage is required for custom Delivery order creation');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickCustomDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.printOrderAndReadState();
  }

  private async openOrderAndAddDish(homeUrl: string, dish: DishSample): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
  }

  private async openDineInOrderAndAddDish(homeUrl: string, dish: DishSample): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(dish.group);
    await this.orderDishesPage.selectMenuCategory(dish.category);
    await this.orderDishesPage.addMenuItem(dish.name);
  }

  private async enableDecimalCount(homeUrl: string): Promise<void> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for decimal count setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setCountCanBeDecimal(true);
    await this.homePage.refresh();
  }

  private decimalSpecialPriceDish(dish: DecimalSpecialPriceDishKey): DishSample | OptionOrderSample {
    const dishes: Record<DecimalSpecialPriceDishKey, DishSample | OptionOrderSample> = {
      groupSwitchDish,
      categorySwitchDish,
      categoryOptionDish,
    };
    return dishes[dish];
  }

  private async openDineInOrderAsNoVoidPrintedStaff(homeUrl: string): Promise<void> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for staff permission setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setStaffVoidPrintedItemPermission(false);
    await this.homePage.refresh();
    await this.homePage.logout();
    await this.homePage.inputEmployeePassword(staffSamples.noVoidPrintedItem.password);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
  }

  private async configureSameItemCombine(homeUrl: string, mode: (typeof combineSameItemModes)[keyof typeof combineSameItemModes]): Promise<void> {
    if (!this.adminPage) {
      throw new Error('AdminPage is required for same item combine setup');
    }
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setCombineSameItem(mode, false);
  }

  private async restoreSameItemSettings(): Promise<void> {
    if (!this.adminPage) {
      return;
    }
    await this.homePage.clickAdmin();
    await this.adminPage.setCombineSameItem(combineSameItemModes.dontCombine, true);
    await this.homePage.refresh();
  }

  private async addSameDishTimes(times: number): Promise<void> {
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    for (let index = 0; index < times; index += 1) {
      await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    }
  }

  private async openOrderAndAddTwoDishes(homeUrl: string, isDineIn: boolean): Promise<void> {
    await this.homePage.open(homeUrl);
    if (isDineIn) {
      await this.homePage.clickDineIn();
    } else {
      await this.homePage.clickTogo();
    }
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.selectMenuGroup(categorySwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(categorySwitchDish.category);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
  }

  private async createPickupOrder(): Promise<void> {
    await this.homePage.clickPickup();
    await this.orderDishesPage.startPickupOrder();
    await this.orderDishesPage.selectMenuGroup(groupSwitchDish.group);
    await this.orderDishesPage.selectMenuCategory(groupSwitchDish.category);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
  }
}
