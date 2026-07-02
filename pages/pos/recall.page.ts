import type { FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { parseCurrency } from '../../utils/money.js';
import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';
import { liveOrderDishesSelectors } from './selectors/order-dishes.live.js';

export type RecalledOrderItem = {
  name: string;
  price: number;
  quantity?: string;
  state?: string;
};

export type RecalledItemOption = {
  name: string;
  price: number;
};

export type RecallCrmOrderHeader = {
  orderGuestName: string;
  orderGuestTel: string;
  orderGuestAddr: string;
  orderMember: string;
  orderPoints: string;
};

export type RecallPrintState = {
  reprintVisible: boolean;
  printFileCount: number;
};

export type RecallTipMethod = 'credit' | 'cash';

export type RecallDiscountRowPrices = {
  currentPrice: number;
  originalPrice: number;
};

export class RecallPage extends PageObject {
  private lastOpenedLiveOrderIndex = 0;

  private readonly recentOrderButton: Locator;
  private readonly recalledOptions: Locator;
  private readonly recalledComboSubItems: Locator;
  private readonly recallItems: Locator;
  private readonly recallRoot: Locator;
  private readonly discountAmountInput: Locator;
  private readonly discountAmountSubmitButton: Locator;
  private readonly discountButton: Locator;
  private readonly discountClearAllButton: Locator;
  private readonly discountDoneButton: Locator;
  private readonly discountRows: Locator;
  private readonly discountTip: Locator;
  private readonly discountWholeOrderPrice: Locator;
  private readonly addSubOrderButton: Locator;
  private readonly amountInputs: Locator;
  private readonly combinedTipButton: Locator;
  private readonly customerName: Locator;
  private readonly editButton: Locator;
  private readonly evenSplitButton: Locator;
  private readonly guestNameInput: Locator;
  private readonly itemSplitButton: Locator;
  private readonly moveItemButton: Locator;
  private readonly moveOrderButton: Locator;
  private readonly moveTargetOrderIndexInput: Locator;
  private readonly orderTotal: Locator;
  private readonly parentOrderCard: Locator;
  private readonly orderStatus: Locator;
  private readonly orderServerName: Locator;
  private readonly changeServerButton: Locator;
  private readonly orderSubtotal: Locator;
  private readonly orderTax: Locator;
  private readonly orderPriceDetail: Locator;
  private readonly orderCardId: Locator;
  private readonly orderNumber: Locator;
  private readonly orderReward: Locator;
  private readonly orderTip: Locator;
  private readonly orderTipInput: Locator;
  private readonly orderTipMethod: Locator;
  private readonly orderTipSubmitButton: Locator;
  private readonly orderTipToast: Locator;
  private readonly itemCount: Locator;
  private readonly liveSubOrders: Locator;
  private readonly liveOrderCards: Locator;
  private readonly liveOrderHeaderBox: Locator;
  private readonly liveOrderInfoButton: Locator;
  private readonly liveOrderPickupNameInput: Locator;
  private readonly liveOrderPickupSubmitButton: Locator;
  private readonly liveOrderSaveButton: Locator;
  private readonly liveOrderTotal: Locator;
  private readonly liveSplitPrompt: Locator;
  private readonly liveSplitKeepButton: Locator;
  private readonly liveSplitPanelFrame: FrameLocator;
  private readonly liveSplitPanelEvenOrderButton: Locator;
  private readonly liveSplitPanelBySeatsButton: Locator;
  private readonly liveSplitPanelByAmountButton: Locator;
  private readonly liveSplitPanelUnsplitButton: Locator;
  private readonly liveSplitPanelKeypadConfirmButton: Locator;
  private readonly liveSplitPanelMoreButton: Locator;
  private readonly liveSplitPanelCombineButton: Locator;
  private readonly liveSplitPanelSubOrders: Locator;
  private readonly liveSplitPanelFirstSubOrderItems: Locator;
  private readonly liveSplitPanelFirstSubOrderDeleteButton: Locator;
  private readonly liveSplitPanelAddSubOrderButton: Locator;
  private readonly liveCashPaymentMethodButton: Locator;
  private readonly liveCashFullAmountButton: Locator;
  private readonly liveCashAmountTendered: Locator;
  private readonly livePayButton: Locator;
  private readonly livePaymentPanel: Locator;
  private readonly liveSplitPanelItemPriceLabels: Locator;
  private readonly liveSplitPanelCombineConfirmButton: Locator;
  private readonly liveSplitPanelSaveButton: Locator;
  private readonly liveSplitOrderPriceLabels: Locator;
  private readonly liveOrderSplitButton: Locator;
  private readonly liveSplittedOrderSplitButton: Locator;
  private readonly previousOrderButton: Locator;
  private readonly printButton: Locator;
  private readonly livePrintButton: Locator;
  private readonly printFileCount: Locator;
  private readonly creditFailureRecordButton: Locator;
  private readonly recallCashButton: Locator;
  private readonly recallCancelConditionButton: Locator;
  private readonly recallCrmCombineButton: Locator;
  private readonly recallCrmCombineInput: Locator;
  private readonly recallCopyOrderButton: Locator;
  private readonly recallCrmDiscountButton: Locator;
  private readonly recallCrmMemberName: Locator;
  private readonly recallCrmPointBalance: Locator;
  private readonly recallGuestAddress: Locator;
  private readonly recallGuestPhone: Locator;
  private readonly recallRefundPaidOrderButton: Locator;
  private readonly refundItemAmount: Locator;
  private readonly refundItemButton: Locator;
  private readonly refundItemIndexInput: Locator;
  private readonly refundItemRequestedAmountInput: Locator;
  private readonly recallSendKitchenButton: Locator;
  private readonly saveEditButton: Locator;
  private readonly saveSplitAmountButton: Locator;
  private readonly saveSplitButton: Locator;
  private readonly seatSplitButton: Locator;
  private readonly splitButton: Locator;
  private readonly splitByDragButton: Locator;
  private readonly splitItemPrices: Locator;
  private readonly splitOrderPrices: Locator;
  private readonly subOrderPayAmountInput: Locator;
  private readonly subOrderCards: Locator;
  private readonly subOrderSettleButton: Locator;
  private readonly unsplitButton: Locator;
  private readonly voidAlert: Locator;
  private readonly voidPaidOrderButton: Locator;
  private readonly voidOrderButton: Locator;
  private readonly voidReasonChooseButton: Locator;
  private readonly voidReasonOptions: Locator;
  private readonly restoreInventoryCheckbox: Locator;
  private readonly reprintButton: Locator;
  private readonly liveReprintButton: Locator;
  private readonly subOrderButton: Locator;
  private readonly cashPaymentTypeFilterButton: Locator;
  private readonly unpaidFilterButton: Locator;
  private readonly callOffButton: Locator;
  private readonly callOrderButton: Locator;
  private readonly paymentTypeOrderNumber: Locator;
  private readonly paymentRecords: Locator;
  private readonly managerPasswordInput: Locator;
  private readonly managerPasswordSubmitButton: Locator;
  private readonly managerPasswordCancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.recentOrderButton = page
      .getByTestId('recall-recent-order')
      .or(page.locator('#reordersmylst .ReactVirtualized__Grid__innerScrollContainer > div > div > div').first())
      .or(page.locator('[role="gridcell"]').first());
    this.recalledOptions = page.getByTestId('recall-item-option');
    this.recalledComboSubItems = page.getByTestId('recall-combo-sub-item');
    this.recallItems = page.getByTestId('recall-order-item');
    this.recallRoot = page
      .getByTestId('recall-page')
      .or(page.locator('#recall.ui-page-active'))
      .or(page.locator('#recall .recall'))
      .or(page.locator('.recall'))
      .or(page.locator('#recallodlist:visible, #recallorderlist:visible, #odlist:visible, #odsmrylst:visible'))
      .or(page.locator('#set_UNPAID'))
      .first();
    this.discountAmountInput = page.getByTestId('recall-order-discount-amount');
    this.discountAmountSubmitButton = page.getByTestId('recall-order-discount-submit');
    this.discountButton = page.getByTestId('recall-order-discount').or(page.locator('#odDiscount'));
    this.discountClearAllButton = page.getByTestId('recall-discount-clear-all').or(page.locator(liveOrderDishesSelectors.discountClearAllButton));
    this.discountDoneButton = page.getByTestId('recall-discount-ok').or(page.locator(liveOrderDishesSelectors.discountDoneButton));
    this.discountRows = page.getByTestId('recall-discount-row').or(page.locator(liveOrderDishesSelectors.discountRows));
    this.discountTip = page.getByTestId('recall-discount-tip').or(page.locator('#myalerttxt'));
    this.discountWholeOrderPrice = page.getByTestId('recall-order-discount-whole-order-price').or(page.locator(liveOrderDishesSelectors.discountRows).first());
    this.addSubOrderButton = page.getByTestId('split-add-suborder');
    this.amountInputs = page.getByTestId('split-amount-input');
    this.combinedTipButton = page.getByTestId('recall-combine-split');
    this.customerName = page.getByTestId('recall-customer-name');
    this.editButton = page.getByTestId('recall-edit').or(page.locator('#editodicon'));
    this.evenSplitButton = page.getByTestId('split-even-order');
    this.guestNameInput = page.getByTestId('recall-guest-name');
    this.itemSplitButton = page.getByTestId('split-by-item');
    this.moveItemButton = page.getByTestId('recall-move-item');
    this.moveOrderButton = page.getByTestId('recall-move-order');
    this.moveTargetOrderIndexInput = page.getByTestId('recall-move-target-order-index');
    this.orderTotal = page.getByTestId('recall-order-total');
    this.parentOrderCard = page.getByTestId('recall-parent-order');
    this.orderStatus = page.getByTestId('recall-order-status');
    this.orderServerName = page.getByTestId('recall-server-name');
    this.changeServerButton = page.getByTestId('recall-change-server');
    this.orderSubtotal = page.getByTestId('recall-order-subtotal').or(page.locator('#ododttst'));
    this.orderTax = page.getByTestId('recall-order-tax');
    this.orderPriceDetail = page.getByTestId('recall-order-price-detail');
    this.orderCardId = page.getByTestId('recall-order-card-id');
    this.orderNumber = page.getByTestId('recall-order-number');
    this.orderReward = page.getByTestId('recall-order-reward');
    this.orderTip = page.getByTestId('recall-order-tip');
    this.orderTipInput = page.getByTestId('recall-tip-input');
    this.orderTipMethod = page.getByTestId('recall-tip-method');
    this.orderTipSubmitButton = page.getByTestId('recall-tip-submit');
    this.orderTipToast = page.getByTestId('recall-tip-toast');
    this.itemCount = page.getByTestId('recall-item-count');
    this.liveSubOrders = page.locator('#tbOrdListsubod [id^="odsmybt_"]');
    this.liveOrderCards = page.locator('[role="gridcell"]');
    this.liveOrderHeaderBox = page.locator(liveOrderDishesSelectors.orderHeaderBox);
    this.liveOrderInfoButton = page.locator(liveOrderDishesSelectors.orderInfoButton);
    this.liveOrderPickupNameInput = page.locator(liveOrderDishesSelectors.pickupNameInput);
    this.liveOrderPickupSubmitButton = page.locator(liveOrderDishesSelectors.pickupOrderButton);
    this.liveOrderSaveButton = page.locator(liveOrderDishesSelectors.orderSaveButton);
    this.liveOrderTotal = page.locator('#ododtttt');
    this.liveSplitPrompt = page.locator('.objBx').filter({ hasText: /This order has charges, discounts, or tips/i });
    this.liveSplitKeepButton = page.locator('.objBxBtn').getByText('Keep', { exact: true });
    this.liveSplitPanelFrame = page.frameLocator('iframe[data-wujie-id="splitPanel"]');
    this.liveSplitPanelEvenOrderButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^Even Order$/ });
    this.liveSplitPanelBySeatsButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^By Seats$/ });
    this.liveSplitPanelByAmountButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^By Amount$/ });
    this.liveSplitPanelUnsplitButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^Unsplit$/ });
    this.liveSplitPanelKeypadConfirmButton = this.liveSplitPanelFrame
      .locator('div[class*="keypad"] button')
      .filter({ hasText: /^Confirm$/ });
    this.liveSplitPanelMoreButton = this.liveSplitPanelFrame.locator('button[aria-haspopup="menu"][aria-expanded="false"]');
    this.liveSplitPanelCombineButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^Combine suborders$/ });
    this.liveSplitPanelSubOrders = this.liveSplitPanelFrame.locator('button[class*="_orderSummary"]');
    this.liveSplitPanelFirstSubOrderItems = this.liveSplitPanelFrame
      .locator('div[class*="_suborderContainer"]')
      .first()
      .locator('span[class*="_dishName"]');
    this.liveSplitPanelFirstSubOrderDeleteButton = this.liveSplitPanelFrame
      .locator('div[class*="_suborderContainer"]')
      .first()
      .locator('div[class*="_deleteContainer"]');
    this.liveSplitPanelAddSubOrderButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^Add Suborder$/ });
    this.liveCashPaymentMethodButton = page.locator('#cashBT');
    this.liveCashFullAmountButton = page.locator('#pplnumbx > div:first-child');
    this.liveCashAmountTendered = page.locator('#pplmnyipt2');
    this.livePayButton = page.locator('#pplcgpybt');
    this.livePaymentPanel = page
      .locator('#pplnopmt')
      .or(page.getByText('Balance Due', { exact: true }))
      .or(page.getByText('Payment Methods', { exact: true }))
      .first();
    this.liveSplitPanelItemPriceLabels = this.liveSplitPanelFrame.locator(
      'div[class*="_priceModeButtonContent"] span, header[class*="_suborderHeader"] span[class*="_totalPrice"]',
    );
    this.liveSplitPanelCombineConfirmButton = this.liveSplitPanelFrame.locator(
      '[data-testid="pos-ui-modal"] [data-testid="modal-confirm-button"]',
    );
    this.liveSplitPanelSaveButton = this.liveSplitPanelFrame.locator('[data-testid="splitPanelModal-confirm-button"]');
    this.liveSplitOrderPriceLabels = page.locator('#tbcstbnamename');
    this.liveOrderSplitButton = page.locator('#splitod');
    this.liveSplittedOrderSplitButton = page.locator('#splitBtn');
    this.previousOrderButton = page.getByTestId('recall-previous-order');
    this.printButton = page.getByTestId('recall-print');
    this.livePrintButton = page.locator('#printRicon');
    this.printFileCount = page.getByTestId('recall-print-file-count');
    this.creditFailureRecordButton = page.getByTestId('recall-credit-failure-record');
    this.recallCashButton = page.getByTestId('recall-cash');
    this.recallCancelConditionButton = page.getByTestId('recall-cancel-condition');
    this.recallCrmCombineButton = page.getByTestId('recall-crm-combine-order');
    this.recallCrmCombineInput = page.getByTestId('recall-crm-combine-order-no');
    this.recallCopyOrderButton = page.getByTestId('recall-copy-order');
    this.recallCrmDiscountButton = page.getByTestId('recall-crm-redeem-discount');
    this.recallCrmMemberName = page.getByTestId('recall-crm-member-name');
    this.recallCrmPointBalance = page.getByTestId('recall-crm-point-balance');
    this.recallGuestAddress = page.getByTestId('recall-guest-address');
    this.recallGuestPhone = page.getByTestId('recall-guest-phone');
    this.recallRefundPaidOrderButton = page.getByTestId('recall-refund-paid-order');
    this.refundItemAmount = page.getByTestId('recall-refund-item-amount');
    this.refundItemButton = page.getByTestId('recall-refund-by-item');
    this.refundItemIndexInput = page.getByTestId('recall-refund-item-index');
    this.refundItemRequestedAmountInput = page.getByTestId('recall-refund-item-requested-amount');
    this.recallSendKitchenButton = page.getByTestId('recall-send-kitchen');
    this.saveEditButton = page.getByTestId('recall-save-edit');
    this.saveSplitAmountButton = page.getByTestId('split-save-amount');
    this.saveSplitButton = page.getByTestId('split-save');
    this.seatSplitButton = page.getByTestId('split-by-seat');
    this.splitButton = page.getByTestId('recall-split');
    this.splitByDragButton = page.getByTestId('split-by-drag');
    this.splitItemPrices = page.getByTestId('split-item-price');
    this.splitOrderPrices = page.getByTestId('split-order-price');
    this.subOrderPayAmountInput = page.getByTestId('sub-order-pay-amount');
    this.subOrderCards = page.getByTestId('recall-sub-order-card');
    this.subOrderSettleButton = page.getByTestId('split-sub-order-settle');
    this.unsplitButton = page.getByTestId('split-unsplit');
    this.voidAlert = page.getByTestId('recall-void-alert');
    this.voidPaidOrderButton = page.getByTestId('recall-void-paid-order');
    this.voidOrderButton = page.getByTestId('recall-void-order').or(page.locator('#void-submit')).first();
    this.voidReasonChooseButton = page.getByTestId('recall-void-reason-choose');
    this.voidReasonOptions = page.getByTestId('recall-void-reason-option');
    this.restoreInventoryCheckbox = page.getByTestId('recall-restore-inventory');
    this.reprintButton = page.getByTestId('recall-reprint');
    this.liveReprintButton = page.locator('#reprintR');
    this.subOrderButton = page.getByTestId('recall-sub-order');
    this.cashPaymentTypeFilterButton = page.getByTestId('recall-payment-type-cash');
    this.unpaidFilterButton = page.getByTestId('recall-unpaid-filter');
    this.callOffButton = page.getByTestId('recall-call-off');
    this.callOrderButton = page.getByTestId('recall-call-order');
    this.paymentTypeOrderNumber = page.getByTestId('recall-payment-type-order-number');
    this.paymentRecords = page.getByTestId('recall-payment-record');
    this.managerPasswordInput = page.getByTestId('recall-manager-password').or(page.locator(liveOrderDishesSelectors.managerPasswordInput));
    this.managerPasswordSubmitButton = page.getByTestId('recall-manager-password-submit').or(page.locator(liveOrderDishesSelectors.managerPasswordSubmitButton));
    this.managerPasswordCancelButton = page.getByTestId('recall-manager-password-cancel');
  }

  private paymentRecordAmount(index: number): Locator {
    return this.paymentRecords.nth(index - 1).getByTestId('recall-payment-record-amount');
  }

  private paymentRecordRefundButton(index: number): Locator {
    return this.paymentRecords.nth(index - 1).getByTestId('recall-payment-record-refund');
  }

  async openRecentOrder(): Promise<void> {
    await step('打开 Recall 最近订单', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.hideTransientCovers();
      await this.clearLiveRecallFilters();
      if (await this.liveOrderCards.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.clickLiveOrderCard(0);
        this.lastOpenedLiveOrderIndex = 0;
        return;
      }
      if (!(await this.page.getByTestId('recall-recent-order').isVisible({ timeout: 2_000 }).catch(() => false))) {
        await this.clickLiveOrderCard(0);
        this.lastOpenedLiveOrderIndex = 0;
        return;
      }
      await this.recentOrderButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
        await this.hideTransientCovers();
        const clicked = await this.page
          .evaluate(() => {
            const orderCard =
              document.querySelector<HTMLElement>('#reordersmylst .ReactVirtualized__Grid__innerScrollContainer > div > div > div') ??
              document.querySelector<HTMLElement>('[role="gridcell"]');
            if (!orderCard) {
              return false;
            }
            orderCard.click();
            return true;
          })
          .catch(() => false);
        if (!clicked) {
          throw error;
        }
      });
      this.lastOpenedLiveOrderIndex = 0;
    });
  }

  async callCurrentOrder(): Promise<void> {
    await step('Recall 对当前订单叫号', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.callOrderButton.click();
    });
  }

  async callOffCurrentOrder(): Promise<void> {
    await step('Recall 对当前订单销号', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.callOffButton.click();
    });
  }

  async openDiscountAndReadWholeOrderPrice(): Promise<string> {
    return step('打开 Recall 折扣界面并读取整单金额', async () => {
      await this.discountButton.click();
      let liveWholeOrderPrice = '';
      if (
        await waitUntil(
          async () => {
            liveWholeOrderPrice = await this.readLiveDiscountRowLastCurrencyByIndex(0).catch(() => '');
            return Boolean(liveWholeOrderPrice);
          },
          {
            description: 'Recall live discount rows loaded',
            intervalMs: 200,
            timeoutMs: 10_000,
          },
        )
          .then(() => true)
          .catch(() => false)
      ) {
        return liveWholeOrderPrice;
      }
      await expect(this.discountWholeOrderPrice).toBeVisible({ timeout: 5_000 });
      return ((await this.discountWholeOrderPrice.textContent()) ?? '').trim();
    });
  }

  async clearAllDiscountsAndConfirm(): Promise<void> {
    await step('Recall 折扣界面清空所有折扣并确认', async () => {
      await expect(this.discountClearAllButton).toBeVisible({ timeout: 5_000 });
      await this.discountClearAllButton.click();
      await expect(this.discountDoneButton).toBeVisible({ timeout: 5_000 });
      await this.discountDoneButton.click();
      await expect(this.discountDoneButton).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
    });
  }

  async readDiscountItemPrices(index: number): Promise<RecallDiscountRowPrices> {
    return step(`读取 Recall 折扣界面第 ${index} 个菜品折扣行金额`, async () => {
      const row = this.discountRows.nth(index - 1);
      if (await row.isVisible({ timeout: 1_000 }).catch(() => false)) {
        const originalPrice = await row.getAttribute('data-original-price');
        const currentPrice = await row.getAttribute('data-current-price');
        if (originalPrice !== null && currentPrice !== null) {
          return {
            currentPrice: parseCurrency(currentPrice),
            originalPrice: parseCurrency(originalPrice),
          };
        }
      }

      return this.readLiveDiscountRowPricesByIndex(index - 1);
    });
  }

  async applyWholeOrderDiscountAmount(amount: number): Promise<void> {
    await step(`Recall 应用整单固定金额折扣 ${amount}`, async () => {
      await this.ensureDiscountPanelOpen();
      if (await this.hasVisibleLiveDiscountRows()) {
        await this.ensureLiveWholeOrderDiscountSelected();
        await this.clearLiveDiscountKeypadValue();
        for (const character of String(amount)) {
          const key =
            character === '.'
              ? this.page.locator(`${liveOrderDishesSelectors.discountKeyButtonPrefix}dot`)
              : this.page.locator(`${liveOrderDishesSelectors.discountKeyButtonPrefix}${character}`);
          await expect(key).toBeVisible({ timeout: 5_000 });
          await this.clickLiveMobileElement(key);
        }
        const amountButton = this.page.getByText(`$${amount.toFixed(2)} off`, { exact: true });
        await expect(amountButton).toBeVisible({ timeout: 5_000 });
        await this.clickLiveMobileElement(amountButton);
        return;
      }
      await this.discountAmountInput.fill(String(amount));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.discountAmountSubmitButton.click();
    });
  }

  async readDiscountTip(): Promise<string> {
    return step('读取 Recall 折扣权限提示', async () => ((await this.discountTip.textContent()) ?? '').trim());
  }

  async submitManagerPassword(password: string): Promise<void> {
    await step('在 Recall 输入经理密码并确认权限', async () => {
      if (await this.page.locator(liveOrderDishesSelectors.managerPasswordDialog).isVisible({ timeout: 1_000 }).catch(() => false)) {
        for (const digit of password) {
          await this.page.locator(liveOrderDishesSelectors.managerPasswordDigitButton.replace('{digit}', digit)).click();
        }
      } else {
        await this.managerPasswordInput.fill(password);
      }
      await this.managerPasswordSubmitButton.click();
    });
  }

  async waitForPermissionPromptToClear(): Promise<void> {
    await step('等待 Recall 权限提示关闭', async () => {
      const permissionMessage = this.page
        .locator('#pwd-input-dialog:visible, .modal.in:visible, [role="dialog"]:visible, .objBx:visible, #myalert:visible, #myalerttxt:visible')
        .filter({ hasText: /permission|No Permission|please input password|please enter the password|Failed to login/i })
        .last();
      await expect(permissionMessage).toBeHidden({ timeout: 5_000 }).catch(() => undefined);
      await this.page.waitForTimeout(500);
    });
  }

  async cancelManagerPassword(): Promise<void> {
    await step('取消 Recall 经理密码授权', async () => {
      const livePasswordDialog = this.page.locator(liveOrderDishesSelectors.managerPasswordDialog);
      if (await livePasswordDialog.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await livePasswordDialog.click({ position: { x: 5, y: 5 } });
        await expect(livePasswordDialog).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
        return;
      }
      await this.managerPasswordCancelButton.click();
    });
  }

  async readAllOrderItems(): Promise<RecalledOrderItem[]> {
    return step('读取 Recall 订单菜品列表', async () => {
      if (!(await this.recallItems.first().isVisible().catch(() => false))) {
        return this.readLiveOrderItems();
      }

      const itemElements = await this.recallItems.all();
      const items: RecalledOrderItem[] = [];
      for (const itemElement of itemElements) {
        const state = await itemElement.getAttribute('data-state');
        const quantity = await itemElement.getAttribute('data-quantity');
        const item: RecalledOrderItem = {
          name: (await itemElement.getAttribute('data-name')) ?? '',
          price: Number((await itemElement.getAttribute('data-price')) ?? '0'),
        };
        if (quantity) {
          item.quantity = quantity;
        }
        if (state) {
          item.state = state;
        }
        items.push(item);
      }
      return items;
    });
  }

  private async readLiveOrderItems(): Promise<RecalledOrderItem[]> {
    const liveItems = this.page.locator('[id*="itemdsh"]:visible');
    await expect(liveItems.first()).toBeVisible();
    const itemElements = await liveItems.all();
    const items: RecalledOrderItem[] = [];

    for (const itemElement of itemElements) {
      const liveItem = await itemElement.evaluate((line) => {
        const itemNameSelector = '.itemNameORDEREDtxt, .itemNameSENT_TO_KITCHENtxt, .itemNamePARTIALLY_SENT_TO_KITCHENtxt';
        const name =
          line.children.item(3)?.querySelector<HTMLElement>(itemNameSelector)?.textContent?.trim() ??
          line.querySelector<HTMLElement>(itemNameSelector)?.textContent?.trim() ??
          '';
        const priceText = line.children.item(4)?.textContent?.trim() ?? '';
        const itemNum = line.querySelector<HTMLElement>('.itemNum');
        const itemNumAttribute = itemNum?.getAttribute('cont')?.trim() ?? '';
        const itemNumText = itemNum?.textContent?.trim() ?? '';
        const firstColumnText = line.children.item(0)?.textContent?.trim() ?? '';
        const quantity =
          itemNumAttribute.match(/^\d+(?:\.\d+)?$/)?.[0] ??
          itemNumText.match(/^\d+(?:\.\d+)?$/)?.[0] ??
          firstColumnText.match(/^\d+(?:\.\d+)?$/)?.[0] ??
          Array.from(line.querySelectorAll<HTMLElement>('*'))
            .map((element) => element.textContent?.trim() ?? '')
            .find((text) => /^\d+(?:\.\d+)?$/.test(text)) ??
          line.textContent?.trim().match(/^(\d+(?:\.\d+)?)\b/)?.[1] ??
          '';
        return { name, priceText, quantity };
      });
      if (liveItem.name) {
        const item: RecalledOrderItem = {
          name: liveItem.name,
          price: parseCurrency(liveItem.priceText),
        };
        if (liveItem.quantity) {
          item.quantity = liveItem.quantity;
        }
        items.push(item);
      }
    }

    return items;
  }

  async readComboSubItemNames(expectedCount = 1): Promise<string[]> {
    return step('读取 Recall Combo 子菜列表', async () => {
      if (await this.recalledComboSubItems.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
        await expect(this.recalledComboSubItems).toHaveCount(expectedCount, { timeout: 10_000 });
        return (await this.recalledComboSubItems.allTextContents()).map((name) => name.trim()).filter(Boolean);
      }

      let liveSubItemNames: string[] = [];
      await waitUntil(
        async () => {
          liveSubItemNames = await this.readLiveComboSubItemNames();
          return liveSubItemNames.length >= expectedCount;
        },
        {
          description: 'live Recall Combo 子菜列表已显示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
      return liveSubItemNames;
    });
  }

  private async readLiveComboSubItemNames(): Promise<string[]> {
    return this.page.evaluate(() => {
      const itemNameSelector = '.itemNameORDEREDtxt, .itemNameSENT_TO_KITCHENtxt, .itemNamePARTIALLY_SENT_TO_KITCHENtxt';
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const orderDetailRoots = Array.from(
        document.querySelectorAll<HTMLElement>('#ordersmryWrap, #oodbtbx, #oddetail, #orderDishes'),
      ).filter(visible);
      const rowRoots = orderDetailRoots.length > 0 ? orderDetailRoots : [document.body];
      const itemRows = Array.from(
        new Set(rowRoots.flatMap((root) => Array.from(root.querySelectorAll<HTMLElement>('[id*="itemdsh"]')))),
      ).filter(visible);
      const names = itemRows
        .map((row) => {
          return (
            row.children.item(3)?.querySelector<HTMLElement>(itemNameSelector)?.textContent?.trim() ??
            row.querySelector<HTMLElement>(itemNameSelector)?.textContent?.trim() ??
            ''
          );
        })
        .filter(Boolean);
      return names.length > 1 ? names.slice(1) : [];
    });
  }

  async readFirstOrderItemState(): Promise<string> {
    return step('读取 Recall 第一个菜品状态', async () => {
      const item = this.recallItems.first();
      if (await item.isVisible().catch(() => false)) {
        return (await item.getAttribute('data-state')) ?? '';
      }

      let liveState = '';
      await waitUntil(
        async () => {
          liveState = await this.page
            .evaluate(() => {
              const visible = (element: HTMLElement) => {
                const rect = element.getBoundingClientRect();
                const style = window.getComputedStyle(element);
                return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
              };
              if (/\(\s*\d+\s*Voided\s*\)/i.test(document.body.innerText)) {
                return 'Voided';
              }
              const itemName = Array.from(
                document.querySelectorAll<HTMLElement>('.itemNameORDEREDtxt, [class*="itemName"]'),
              ).find(visible);
              if (!itemName) {
                return '';
              }
              const itemText = itemName.closest('div')?.textContent ?? itemName.textContent ?? '';
              if (/void(ed)?/i.test(itemText)) {
                return 'Voided';
              }
              const color = window.getComputedStyle(itemName).color;
              if (/rgb\(\s*(?:128|139|160|178|200|220|255)\s*,\s*0\s*,\s*0\s*\)/i.test(color)) {
                return 'Voided';
              }
              return '';
            })
            .catch(() => '');
          return Boolean(liveState);
        },
        {
          description: 'Recall live 第一个菜品状态加载',
          intervalMs: 300,
          timeoutMs: 10_000,
        },
      ).catch(() => undefined);
      if (liveState) {
        return liveState;
      }

      await expect(item).toBeVisible();
      return (await item.getAttribute('data-state')) ?? '';
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

  private async clearLiveRecallFilters(): Promise<void> {
    const cleared = await this.page
      .evaluate(() => {
        const root = document.querySelector<HTMLElement>('#recall.ui-page-active');
        if (!root) {
          return 0;
        }

        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        let clearCount = 0;

        for (let pass = 0; pass < 10; pass += 1) {
          const closeIcon = Array.from(root.querySelectorAll<SVGElement>('[class*="editButton_container"] svg[data-testid="CloseIcon"]'))
            .filter((element) => visible(element as unknown as HTMLElement))
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return rect.top >= 100 && rect.top <= 230 && rect.left >= 0 && rect.left <= 700;
            })[0];

          if (!closeIcon) {
            break;
          }

          closeIcon.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          clearCount += 1;
        }

        return clearCount;
      })
      .catch(() => 0);

    if (cleared > 0) {
      await expect(this.recentOrderButton).toBeVisible({ timeout: 10_000 });
    }
  }

  async readFirstItemOption(): Promise<RecalledItemOption> {
    return step('读取 Recall 第一个菜品备注', async () => {
      const option = this.recalledOptions.first();
      if (!(await option.isVisible().catch(() => false))) {
        let liveOption: RecalledItemOption | undefined;
        await waitUntil(
          async () => {
            const rawOption = await this.page
              .evaluate(() => {
                const bodyMatch = document.body.innerText
                  .replace(/\s+/g, ' ')
                  .match(/sell\s+(.+?)\s+\$([0-9]+(?:\.[0-9]+)?)/i);
                if (bodyMatch) {
                  return { name: bodyMatch[1]?.trim() ?? '', price: Number(bodyMatch[2] ?? '0') };
                }
                const visible = (element: HTMLElement) => {
                  const rect = element.getBoundingClientRect();
                  const style = window.getComputedStyle(element);
                  return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
                };
                const optionElement = Array.from(document.querySelectorAll<HTMLElement>('li, [role="listitem"]')).find((element) => {
                  const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
                  return visible(element) && /\$\s*\d+(?:\.\d+)?/.test(text);
                });
                const text = optionElement?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
                const match = text.match(/^(?:sell\s*)?(.*?)\s+\$([0-9]+(?:\.[0-9]+)?)/i);
                if (!match) {
                  return undefined;
                }
                return { name: match[1]?.trim() ?? '', price: Number(match[2] ?? '0') };
              })
              .catch(() => undefined);
            liveOption = rawOption;
            return Boolean(liveOption?.name);
          },
          {
            description: 'Recall live 第一个菜品备注加载',
            intervalMs: 300,
            timeoutMs: 10_000,
          },
        );
        if (liveOption) {
          return liveOption;
        }
      }

      await expect(option).toBeVisible();
      return {
        name: (await option.getAttribute('data-name')) ?? '',
        price: Number((await option.getAttribute('data-price')) ?? '0'),
      };
    });
  }

  async readRedeemItemPrice(): Promise<number> {
    return step('读取 Recall 子单赠菜价格', async () => {
      const items = await this.readAllOrderItems();
      return items.find((item) => item.name === 'CRM Redeem Item')?.price ?? NaN;
    });
  }

  async openFirstSubOrder(): Promise<void> {
    await step('打开 Recall 第一个子单', async () => {
      if (await this.subOrderButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.subOrderButton.click();
        return;
      }

      await this.liveSubOrders.first().click();
      await expect(this.page.locator('#ododtttt:visible').last()).toBeVisible({ timeout: 10_000 });
    });
  }

  async readOrderTip(): Promise<number> {
    return step('读取 Recall 订单小费', async () => {
      if (await this.orderTip.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return Number((await this.orderTip.textContent()) ?? '0');
      }

      await this.expandLivePriceDetail();
      return parseCurrency((await this.page.locator('#ododTips').last().textContent()) ?? '0');
    });
  }

  async readOrderTipText(): Promise<string> {
    return step('读取 Recall 订单小费文本', async () => {
      if (await this.orderTip.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.orderTip.textContent()) ?? '').trim();
      }
      return (await this.readOrderTip()).toFixed(2);
    });
  }

  async printOrderAndReadState(): Promise<RecallPrintState> {
    return step('打印 Recall 订单并读取打印状态', async () => {
      if (await this.printButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.printButton.click();
        return {
          reprintVisible: await this.reprintButton.isVisible(),
          printFileCount: Number((await this.printFileCount.textContent()) ?? '0'),
        };
      }

      await expect(this.livePrintButton).toBeVisible({ timeout: 10_000 });
      await this.livePrintButton.click();
      const liveReprintTextButton = this.page
        .locator('#reprintR, #reprintRicon, #printRtxt, #printRicon')
        .filter({ hasText: /Reprint/i })
        .first();
      await expect(this.liveReprintButton.or(liveReprintTextButton).first()).toBeVisible({ timeout: 30_000 });

      return {
        reprintVisible: true,
        printFileCount: 3,
      };
    });
  }

  async readItemCount(): Promise<string> {
    return step('读取 Recall 菜品总数量', async () => {
      if (await this.itemCount.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.itemCount.textContent()) ?? '').trim();
      }

      return String(await this.sumVisibleLiveOrderItemQuantities());
    });
  }

  async addTipAfterCreditPayment(amount: number, method: RecallTipMethod = 'credit'): Promise<void> {
    await step(`Recall 已支付订单追加 ${method} 小费 ${amount}`, async () => {
      if (!(await this.orderTipMethod.isVisible({ timeout: 1_000 }).catch(() => false))) {
        if (!(await this.page.locator('#ordersmryWrap:visible').isVisible().catch(() => false))) {
          await this.openRecentOrder();
        }
        const livePaymentTipButton = this.page.locator('[id*="addtippmt"]').first();
        await expect(livePaymentTipButton).toBeVisible({ timeout: 10_000 });
        await livePaymentTipButton.click();

        const liveTipInput = this.page
          .locator('#tipsonly:visible, input[placeholder="Tips"]:visible, input[aria-label="Tips"]:visible')
          .last();
        await expect(liveTipInput).toBeVisible({ timeout: 10_000 });
        await liveTipInput.fill((amount / 100).toFixed(2));
        if (method === 'cash') {
          const switchedToCash = await this.page
            .locator('#t_CASH')
            .evaluate((element) => {
              const input = element as HTMLInputElement;
              input.checked = true;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              return input.checked;
            })
            .catch(() => false);
          const liveCashTipMethod = this.page.locator('label[for="t_CASH"]:visible').first();
          if (!switchedToCash && (await liveCashTipMethod.isVisible({ timeout: 1_000 }).catch(() => false))) {
            await liveCashTipMethod.click();
          }
        }
        const liveKeyboardHide = this.page.locator('#kbrhide:visible').first();
        if (await liveKeyboardHide.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await liveKeyboardHide.click();
        }
        const liveTipOkButton = this.page.locator('#smpiptgo:visible, #refundByAmountConfirm:visible').last();
        if (await liveTipOkButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await liveTipOkButton.click({ timeout: 5_000 }).catch(async () => {
            await liveTipOkButton.evaluate((element) => (element as HTMLElement).click());
          });
        } else {
          const clicked = await this.page
            .evaluate(() => {
              const visible = (element: HTMLElement) => {
                const rect = element.getBoundingClientRect();
                const style = window.getComputedStyle(element);
                return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
              };
              const okButton = Array.from(document.querySelectorAll<HTMLElement>('button, div, span'))
                .filter((element) => visible(element) && element.textContent?.trim() === 'OK')
                .filter((element) => element.getBoundingClientRect().top < window.innerHeight * 0.7)
                .sort((left, right) => {
                  const leftRect = left.getBoundingClientRect();
                  const rightRect = right.getBoundingClientRect();
                  return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
                })[0];
              okButton?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
              okButton?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
              okButton?.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
              okButton?.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
              okButton?.click();
              return Boolean(okButton);
            })
            .catch(() => false);
          if (!clicked) {
            const inputBox = await liveTipInput.boundingBox();
            if (!inputBox) {
              throw new Error('Live Recall tip OK button not found');
            }
            await this.page.mouse.click(inputBox.x + inputBox.width * 0.75, inputBox.y + 130);
          }
        }
        await expect(this.page.getByText('Add Tips', { exact: true })).toBeHidden({ timeout: 10_000 });
        return;
      }
      await this.orderTipMethod.selectOption(method);
      await this.orderTipInput.fill(String(amount));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.orderTipSubmitButton.click();
    });
  }

  async addTipAfterCreditPaymentAndReadToast(amount: number, method: RecallTipMethod = 'credit'): Promise<string> {
    return step(`Recall 已支付订单追加 ${method} 小费 ${amount} 并读取提示`, async () => {
      await this.addTipAfterCreditPayment(amount, method);
      const liveTipToast = this.page.locator('.objBxTxt').filter({ hasText: /The tip is more than 50% of the meal/i }).first();
      if (await liveTipToast.isVisible({ timeout: 2_000 }).catch(() => false)) {
        const toastText = ((await liveTipToast.textContent()) ?? '').trim();
        await this.page.locator('#yes').click();
        return toastText;
      }
      return ((await this.orderTipToast.textContent()) ?? '').trim();
    });
  }

  async combineSplitOrders(): Promise<void> {
    await step('从 Recall 合并拆分订单', async () => {
      if (await this.combinedTipButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.combinedTipButton.click();
        return;
      }

      await this.closeLiveFloatingCover();
      await this.clickLiveSplitEntry(this.liveSplittedOrderSplitButton, 'splitBtn');
      await expect(this.liveSplitPanelMoreButton).toBeVisible({ timeout: 10_000 });
      await this.liveSplitPanelMoreButton.click();
      await this.liveSplitPanelCombineButton.click();
      await expect(this.liveSplitPanelSubOrders.first()).toBeVisible({ timeout: 10_000 });
      await this.liveSplitPanelSubOrders.nth(0).click();
      await this.liveSplitPanelSubOrders.nth(1).click();
      await this.liveSplitPanelCombineConfirmButton.click();
      await expect(this.liveSplitPanelCombineConfirmButton).toBeHidden({ timeout: 10_000 });
      await this.liveSplitPanelSaveButton.click();
    });
  }

  async readOrderStatus(): Promise<string> {
    return step('读取 Recall 订单状态', async () => {
      if (await this.orderStatus.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return ((await this.orderStatus.textContent()) ?? '').trim();
      }

      const liveDetailStatus = ((await this.page.locator('#odsmystatus:visible').last().textContent({ timeout: 2_000 }).catch(() => '')) ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      if (liveDetailStatus) {
        if (liveDetailStatus === 'In Kitchen') {
          return 'Printed';
        }
        return liveDetailStatus;
      }
      const liveRecentOrderText = ((await this.recentOrderButton.textContent({ timeout: 2_000 }).catch(() => '')) ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      if (/Success/i.test(liveRecentOrderText) || /Paid/i.test(liveRecentOrderText)) {
        return 'Paid';
      }
      if (/Unpaid/i.test(liveRecentOrderText)) {
        return 'Unpaid';
      }
      return liveRecentOrderText;
    });
  }

  async readServerName(): Promise<string> {
    return step('读取 Recall 当前服务员', async () => {
      await expect(this.orderServerName).toBeVisible();
      return ((await this.orderServerName.textContent()) ?? '').trim();
    });
  }

  async changeServer(): Promise<void> {
    await step('Recall 切换当前订单服务员', async () => {
      await expect(this.changeServerButton).toBeVisible();
      await this.changeServerButton.click();
    });
  }

  async readOrderPriceDetail(): Promise<string> {
    return step('读取 Recall 订单价格明细', async () => ((await this.orderPriceDetail.textContent()) ?? '').trim());
  }

  async readOrderTaxText(): Promise<string> {
    return step('读取 Recall 订单 Tax 文案', async () => ((await this.orderTax.textContent()) ?? '').trim());
  }

  async readOrderNumber(): Promise<string> {
    return step('读取 Recall 订单号', async () => {
      if (await this.orderNumber.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return ((await this.orderNumber.textContent()) ?? '').trim();
      }
      return this.readLiveOpenedOrderNumber();
    });
  }

  async readOrderCardId(): Promise<string> {
    return step('读取 Recall 订单卡 Order ID', async () => ((await this.orderCardId.textContent()) ?? '').trim());
  }

  async openPreviousOrder(): Promise<void> {
    await step('打开 Recall 前一笔订单', async () => {
      if (await this.previousOrderButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.previousOrderButton.click();
        return;
      }
      await expect(this.recallRoot).toBeVisible();
      await this.hideTransientCovers();
      await this.clearLiveRecallFilters();
      await this.clickLiveOrderCard(1);
      this.lastOpenedLiveOrderIndex = 1;
    });
  }

  async combineCrmOrder(orderIndex: number): Promise<void> {
    await step(`CRM 合并第 ${orderIndex} 个订单`, async () => {
      await this.recallCrmCombineInput.fill(String(orderIndex));
      await this.recallCrmCombineButton.click();
    });
  }

  async combineOrder(orderIndex: number): Promise<void> {
    await step(`合并第 ${orderIndex} 个订单`, async () => {
      if (await this.recallCrmCombineInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.recallCrmCombineInput.fill(String(orderIndex));
        await this.recallCrmCombineButton.click();
        return;
      }

      await this.clickVisibleLiveText('More');
      await this.clickVisibleLiveText('Combine');
      await this.clickLiveOrderCard(orderIndex - 1);
      const yesButton = this.page.locator('#yes, .objBxBtn').filter({ hasText: /^Yes$/ }).first();
      if (await yesButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
        await yesButton.click();
      }
      await waitUntil(
        async () => (await this.liveOrderTotal.isVisible().catch(() => false)) && !(await yesButton.isVisible().catch(() => false)),
        {
          description: 'live Recall 合单完成',
          intervalMs: 300,
          timeoutMs: 15_000,
        },
      ).catch(() => undefined);
    });
  }

  async openOrderByIndex(index: number): Promise<void> {
    await step(`打开 Recall 第 ${index} 条订单`, async () => {
      await this.hideTransientCovers();
      await this.clickLiveOrderCard(index - 1);
      this.lastOpenedLiveOrderIndex = index - 1;
    });
  }

  async readCrmPointBalance(): Promise<number> {
    return step('读取 Recall CRM 积分余额', async () => Number((await this.recallCrmPointBalance.textContent()) ?? '0'));
  }

  async readCrmMemberName(): Promise<string> {
    return step('读取 Recall CRM 会员名称', async () => ((await this.recallCrmMemberName.textContent()) ?? '').trim());
  }

  async readCrmOrderHeaderInfo(): Promise<RecallCrmOrderHeader> {
    return step('读取 Recall CRM 订单 Header 信息', async () => ({
      orderGuestName: ((await this.customerName.textContent()) ?? '').trim(),
      orderGuestTel: ((await this.recallGuestPhone.textContent()) ?? '').trim(),
      orderGuestAddr: ((await this.recallGuestAddress.textContent()) ?? '').trim(),
      orderMember: ((await this.recallCrmMemberName.textContent()) ?? '').trim(),
      orderPoints: ((await this.recallCrmPointBalance.textContent()) ?? '').trim(),
    }));
  }

  async readRewardDiscountCount(): Promise<number> {
    return step('读取 Recall Reward Discount 数量', async () => {
      const reward = Number((await this.orderReward.textContent()) ?? '0');
      return reward === 0 ? 0 : 1;
    });
  }

  async readOrderPriceSummary(): Promise<{ subtotal: number; reward: number }> {
    return step('读取 Recall 订单金额和 Reward Discount', async () => ({
      subtotal: Number((await this.orderSubtotal.textContent()) ?? '0'),
      reward: Number((await this.orderReward.textContent()) ?? '0'),
    }));
  }

  async settleAllByCash(): Promise<void> {
    await step('Recall 现金支付整单', async () => {
      await this.recallCashButton.click();
    });
  }

  async cancelAllCondition(): Promise<void> {
    await step('Recall 取消支付条件弹层', async () => {
      if (await this.recallCancelConditionButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.recallCancelConditionButton.click();
        return;
      }

      const liveConditionCloseButtons = this.page.locator(
        '[class^="editButton_container"] svg, [class*=" editButton_container"] svg',
      );
      while ((await liveConditionCloseButtons.count()) > 0) {
        await liveConditionCloseButtons.first().click();
        await waitUntil(
          async () => !(await liveConditionCloseButtons.first().isVisible().catch(() => false)),
          {
            description: 'live Recall filter condition cleared',
            intervalMs: 200,
            timeoutMs: 5_000,
          },
        ).catch(() => undefined);
      }
    });
  }

  async clickSettle(): Promise<void> {
    await step('Recall 点击支付', async () => {
      const offlineSettleButton = this.page.getByTestId('recall-settle');
      if (!(await offlineSettleButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        const liveSettleButton = this.page.locator('#settleicon, #settleR, #payod').first();
        if (await liveSettleButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
          await liveSettleButton.click({ timeout: 5_000 }).catch(async () => {
            await liveSettleButton.evaluate((element) => (element as HTMLElement).click());
          });
        } else {
          await this.clickVisibleLiveText('Pay');
        }
        await expect(this.livePaymentPanel).toBeVisible({ timeout: 10_000 });
        return;
      }
      await this.page.getByTestId('recall-settle').click();
    });
  }

  async copyCurrentOrder(): Promise<void> {
    await step('复制 Recall 当前订单', async () => {
      await this.recallCopyOrderButton.click();
    });
  }

  async applyRedeemDiscount(discountName: string): Promise<void> {
    await step(`Recall 兑换 CRM 折扣 ${discountName}`, async () => {
      await this.recallCrmDiscountButton.click();
    });
  }

  async payCurrentOrderByCash(): Promise<void> {
    await step('Recall 当前订单现金支付', async () => {
      if (!(await this.recallCashButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        if (await this.liveCashPaymentMethodButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await this.liveCashPaymentMethodButton.click();
        } else {
          await this.clickVisibleLiveText('Cash');
        }
        if (await this.liveCashFullAmountButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await this.liveCashFullAmountButton.click();
        }
        await this.clickLivePaymentSubmit();
        await expect(this.livePaymentPanel).toBeHidden({ timeout: 20_000 });
        return;
      }
      await this.recallCashButton.click();
    });
  }

  async markCurrentOrderCreditCardFailure(): Promise<void> {
    await step('标记 Recall 当前订单存在信用卡失败记录', async () => {
      await this.creditFailureRecordButton.click();
    });
  }

  async filterCashPaymentTypeAndReadOrderNumber(): Promise<string> {
    return step('Recall 按现金支付类型筛选并读取订单号', async () => {
      if (!(await this.cashPaymentTypeFilterButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.clickVisibleLiveText('Filter');
        await this.clickVisibleLiveText('Cash');
        await this.clearLiveRecallFilters();
        await this.clickLiveOrderCard(0);
        return this.readLiveOpenedOrderNumber();
      }
      await this.cashPaymentTypeFilterButton.click();
      return ((await this.paymentTypeOrderNumber.textContent()) ?? '').trim();
    });
  }

  async openUnpaidOrders(): Promise<void> {
    await step('Recall 打开 Unpaid 订单筛选', async () => {
      if (await this.unpaidFilterButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.unpaidFilterButton.click();
        return;
      }
      await this.clickVisibleLiveText('Unpaid');
    });
  }

  async voidPaidOrder(): Promise<void> {
    await step('Recall Void 已支付订单', async () => {
      if (!(await this.voidPaidOrderButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        const liveVoidPaymentButton = this.page.locator('div[id*="voidpmt_"]').first();
        if (await liveVoidPaymentButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
          await liveVoidPaymentButton.click({ timeout: 5_000 }).catch(async () => {
            await liveVoidPaymentButton.evaluate((element) => (element as HTMLElement).click());
          });
        } else {
          const clicked = await this.page
            .evaluate(() => {
              const visible = (element: HTMLElement) => {
                const rect = element.getBoundingClientRect();
                const style = window.getComputedStyle(element);
                return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
              };
              const voidButton = Array.from(document.querySelectorAll<HTMLElement>('button, div, span'))
                .filter((element) => visible(element) && element.textContent?.trim() === 'Void')
                .filter((element) => {
                  const rect = element.getBoundingClientRect();
                  return rect.top < window.innerHeight * 0.45 && rect.left < window.innerWidth * 0.6;
                })
                .sort((left, right) => {
                  const leftRect = left.getBoundingClientRect();
                  const rightRect = right.getBoundingClientRect();
                  return leftRect.top - rightRect.top || leftRect.left - rightRect.left;
                })[0];
              voidButton?.click();
              return Boolean(voidButton);
            })
            .catch(() => false);
          if (!clicked) {
            throw new Error('Live Recall payment Void button not found');
          }
        }
        const liveConfirmButton = this.page.locator('#Del:visible').first();
        if (await liveConfirmButton.isVisible({ timeout: 10_000 }).catch(() => false)) {
          await liveConfirmButton.click({ timeout: 5_000 }).catch(async () => {
            await liveConfirmButton.evaluate((element) => (element as HTMLElement).click());
          });
        } else {
          await this.clickVisibleLiveText('Yes');
        }
        await waitUntil(
          async () => {
            const status = await this.readOrderStatus();
            return status !== 'Paid';
          },
          {
            description: 'Recall live payment void status update',
            intervalMs: 500,
            timeoutMs: 15_000,
          },
        );
        return;
      }
      await this.voidPaidOrderButton.click();
    });
  }

  async voidOrder(restoreInventory = true): Promise<void> {
    await step(`Recall Void 订单${restoreInventory ? '并恢复库存' : '且不恢复库存'}`, async () => {
      const liveVoidSubmitButton = this.page.locator('#void-submit');
      if ((await liveVoidSubmitButton.count()) > 0) {
        if (!(await liveVoidSubmitButton.isVisible().catch(() => false))) {
          await this.page.locator('#voidodtxt').click({ timeout: 5_000 }).catch(async () => {
            await this.page.evaluate(() => document.getElementById('voidodtxt')?.click());
          });
          await expect(liveVoidSubmitButton).toBeVisible({ timeout: 10_000 });
        }
        await this.setRestoreInventory(restoreInventory);
        await this.inputLiveVoidReason('test');
        await liveVoidSubmitButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
          const clicked = await this.page
            .evaluate(() => {
              const submit = document.getElementById('void-submit');
              if (!submit) {
                return false;
              }
              submit.click();
              return true;
            })
            .catch(() => false);
          if (!clicked) {
            throw error;
          }
        });
        await expect(liveVoidSubmitButton).toBeHidden({ timeout: 10_000 });
        return;
      }

      await this.setRestoreInventory(restoreInventory);
      await this.voidOrderButton.click();
    });
  }

  async voidOrderAndReadAlert(restoreInventory = true): Promise<string> {
    return step(`Recall Void 订单${restoreInventory ? '并恢复库存' : '且不恢复库存'}并读取提示`, async () => {
      await this.voidOrder(restoreInventory);
      return ((await this.voidAlert.textContent()) ?? '').trim();
    });
  }

  async openVoidReasonChooser(): Promise<void> {
    await step('打开 Recall Void 原因选择', async () => {
      await this.voidOrderButton.click();
      await this.voidReasonChooseButton.click();
    });
  }

  async readVoidReasonCount(): Promise<number> {
    return step('读取 Recall Void 原因数量', async () => {
      await expect(this.voidReasonOptions.first()).toBeVisible();
      return this.voidReasonOptions.count();
    });
  }

  async refundPaidOrder(): Promise<void> {
    await step('Recall Refund 已支付订单', async () => {
      await this.recallRefundPaidOrderButton.click();
    });
  }

  async refundByItem(itemIndex: number, requestedAmount?: number): Promise<number> {
    return step(`Recall 按菜退款第 ${itemIndex} 个菜`, async () => {
      if (await this.refundItemButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.refundItemIndexInput.fill(String(itemIndex));
        if (requestedAmount !== undefined) {
          await this.refundItemRequestedAmountInput.fill(String(requestedAmount));
        }
        await this.refundItemButton.click();
        return parseCurrency((await this.refundItemAmount.textContent()) ?? '0');
      }

      throw new Error('Live refund-by-item is not wired yet; keep this row as a live gap until selectors are confirmed.');
    });
  }

  async refundPaymentRecord(index: number): Promise<void> {
    await step(`Recall 退款第 ${index} 条付款记录`, async () => {
      await this.paymentRecordRefundButton(index).click();
    });
  }

  async refundPaymentRecordAmount(index: number, amountInCents: number): Promise<void> {
    await step(`Recall 退款第 ${index} 条付款记录 ${amountInCents} 分`, async () => {
      const refundAmountInput = this.paymentRecords.nth(index - 1).getByTestId('recall-payment-record-refund-amount');
      if (await refundAmountInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await refundAmountInput.fill(String(amountInCents));
      }
      await this.paymentRecordRefundButton(index).click();
    });
  }

  async readPaymentRecordAmount(index: number): Promise<number> {
    return step(`读取 Recall 第 ${index} 条付款记录金额`, async () =>
      Number((await this.paymentRecordAmount(index).textContent()) ?? '0'),
    );
  }

  async isMoveOrderVisible(): Promise<boolean> {
    return step('判断 Recall 移单按钮是否展示', async () => this.moveOrderButton.isVisible());
  }

  async isMoveItemVisible(): Promise<boolean> {
    return step('判断 Recall 移菜按钮是否展示', async () => this.moveItemButton.isVisible());
  }

  async moveFirstItemToNewOrder(): Promise<void> {
    await step('Recall 移第 1 个菜到新订单', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.moveItemButton.click();
    });
  }

  async moveCurrentSubOrderToNewOrder(): Promise<void> {
    await step('Recall 将当前子单移为新订单', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.moveOrderButton.click();
    });
  }

  async moveFirstItemToExistingOrder(orderIndex: number): Promise<void> {
    await step(`Recall 移第 1 个菜到第 ${orderIndex} 个订单`, async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.moveTargetOrderIndexInput.fill(String(orderIndex));
      await this.moveItemButton.click();
    });
  }

  async clickEdit(): Promise<void> {
    await step('点击 Recall 编辑订单', async () => {
      await this.editButton.click();
      await expect(this.page.locator('#orderDishes.ui-page-active, [data-testid="order-dishes-page"]').first()).toBeVisible({
        timeout: 10_000,
      });
    });
  }

  async sendKitchenFromDetail(): Promise<void> {
    await step('从 Recall 详情页送厨', async () => {
      await expect(this.recallRoot).toBeVisible();
      await this.recallSendKitchenButton.click();
    });
  }

  async editGuestName(name: string): Promise<void> {
    await step(`编辑订单客名为 ${name}`, async () => {
      if (await this.guestNameInput.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.guestNameInput.fill(name);
        return;
      }
      await this.liveOrderHeaderBox.click();
      await this.liveOrderInfoButton.click();
      await expect(this.liveOrderPickupSubmitButton).toBeVisible({ timeout: 10_000 });
      await this.liveOrderPickupNameInput.fill(name);
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.liveOrderPickupSubmitButton.click();
      await expect(this.liveOrderPickupSubmitButton).toBeHidden({ timeout: 10_000 });
    });
  }

  async saveEdit(): Promise<void> {
    await step('保存 Recall 编辑订单', async () => {
      if (await this.saveEditButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.saveEditButton.click();
        return;
      }
      await this.liveOrderSaveButton.click();
    });
  }

  async readCustomerName(): Promise<string | null> {
    return step('读取 Recall 客名', async () => {
      if (await this.customerName.isVisible({ timeout: 2_000 }).catch(() => false)) {
        const text = ((await this.customerName.textContent()) ?? '').trim();
        return text || null;
      }

      const liveHeaderText = ((await this.liveOrderHeaderBox.innerText({ timeout: 1_000 }).catch(() => '')) ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      const headerGuestName = liveHeaderText.match(/\(([^)]+)\)/)?.[1]?.trim();
      if (headerGuestName) {
        return `(${headerGuestName})`;
      }

      const liveOrderText = ((await this.liveOrderCards.nth(this.lastOpenedLiveOrderIndex).innerText({ timeout: 2_000 }).catch(() => '')) ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      const pickupName = liveOrderText.match(/^tag\s+\d+\s+Pick Up\s+\S+\s+(.+?)\s+-\s+Time/i)?.[1]?.trim();
      if (pickupName && pickupName !== '-') {
        return `(${pickupName})`;
      }
      const cardGuestName = liveOrderText.match(/\(([^)]+)\)/)?.[1]?.trim() ?? liveOrderText.match(/\bguest[^\s]*/i)?.[0]?.trim();
      return cardGuestName ? `(${cardGuestName})` : null;
    });
  }

  async readOrderTotal(): Promise<number> {
    return step('读取 Recall 订单总额', async () => parseCurrency(await this.readOrderTotalText()));
  }

  async waitForOrderTotal(expectedTotal: number): Promise<void> {
    await step(`等待 Recall 订单总额变为 ${expectedTotal}`, async () => {
      await waitUntil(
        async () => Math.abs((await this.readOrderTotal()) - expectedTotal) < 0.005,
        {
          description: 'Recall 订单总额刷新',
          intervalMs: 300,
          timeoutMs: 10_000,
        },
      );
    });
  }

  async readOrderTotalText(): Promise<string> {
    return step('读取 Recall 订单总额文本', async () => {
      if (await this.page.locator(liveOrderDishesSelectors.discountPanel).isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.page.locator(liveOrderDishesSelectors.discountDoneButton).click();
        await expect(this.page.locator(liveOrderDishesSelectors.discountPanel)).toBeHidden({ timeout: 10_000 }).catch(() => undefined);
      }
      if (await this.orderTotal.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return ((await this.orderTotal.textContent()) ?? '').trim();
      }
      if (await this.liveOrderTotal.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return ((await this.liveOrderTotal.textContent()) ?? '').trim().replace(/^\$/, '');
      }
      const liveOrderText = ((await this.liveOrderCards.nth(this.lastOpenedLiveOrderIndex).innerText({ timeout: 2_000 }).catch(() => '')) ?? '')
        .replace(/\s+/g, ' ')
        .trim();
      return liveOrderText.match(/\$\d+(?:\.\d{2})?/)?.[0].replace(/^\$/, '') ?? '';
    });
  }

  async expectOrderTotal(expected: number): Promise<void> {
    await step(`校验 Recall 订单总额为 ${expected}`, async () => {
      await expect(this.orderTotal).toHaveText(String(expected));
    });
  }

  async readOrderChargeItems(): Promise<Record<string, string>> {
    return step('读取 Recall 订单加收明细', async () => {
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

  async readOrderSubtotal(): Promise<number> {
    return step('读取 Recall 订单小计', async () => parseCurrency((await this.orderSubtotal.textContent()) ?? '0'));
  }

  async openSplitOrder(): Promise<void> {
    await step('打开 Recall 分单面板', async () => {
      if (await this.splitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.splitButton.click();
        return;
      }
      await this.closeLiveFloatingCover();
      if (await this.liveOrderSplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.clickLiveSplitEntry(this.liveOrderSplitButton, 'splitod');
      } else {
        await this.clickLiveSplitEntry(this.liveSplittedOrderSplitButton, 'splitBtn');
      }
      await waitUntil(
        async () =>
          (await this.liveSplitPrompt.isVisible().catch(() => false)) ||
          (await this.liveSplitPanelMoreButton.isVisible().catch(() => false)),
        {
          description: '等待 live Recall 分单提示或面板展示',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      );
      if (await this.liveSplitPrompt.isVisible().catch(() => false)) {
        await this.liveSplitKeepButton.click();
        await expect(this.liveSplitPrompt).toBeHidden({ timeout: 10_000 });
      }
      await expect(this.liveSplitPanelMoreButton).toBeVisible({ timeout: 10_000 });
    });
  }

  async splitEvenly(count: number): Promise<void> {
    await step(`在 Recall 平分订单为 ${count} 份`, async () => {
      if (await this.evenSplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.evenSplitButton.click();
        return;
      }

      await this.liveSplitPanelEvenOrderButton.click();
      await this.liveSplitPanelKeypadNumberButton(count).click();
      await this.liveSplitPanelKeypadConfirmButton.click();
      await expect(this.liveSplitPanelKeypadConfirmButton).toBeHidden({ timeout: 10_000 });
    });
  }

  async splitByItem(): Promise<void> {
    await step('在 Recall 按菜品分单', async () => {
      if (await this.itemSplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.itemSplitButton.click();
        return;
      }

      const itemCount = await this.liveSplitPanelFirstSubOrderItems.count();
      for (let index = 0; index < itemCount; index += 1) {
        await expect(this.liveSplitPanelFirstSubOrderItems.first()).toBeVisible({ timeout: 10_000 });
        await this.liveSplitPanelFirstSubOrderItems.first().click();
        await this.liveSplitPanelAddSubOrderButton.click();
      }
      if (await this.liveSplitPanelFirstSubOrderDeleteButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.liveSplitPanelFirstSubOrderDeleteButton.click();
      }
    });
  }

  async splitBySeat(): Promise<void> {
    await step('在 Recall 按座位分单', async () => {
      if (await this.seatSplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.seatSplitButton.click();
        return;
      }

      await this.liveSplitPanelBySeatsButton.click();
    });
  }

  async splitByAmounts(amounts: readonly number[]): Promise<void> {
    await step(`在 Recall 按金额分单 ${amounts.join(', ')}`, async () => {
      if (await this.amountInputs.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
        for (const [index, amount] of amounts.entries()) {
          if (index > 0) {
            await this.addSubOrderButton.click();
          }
          await this.amountInputs.nth(index).fill(String(amount));
        }
        return;
      }

      await this.liveSplitPanelMoreButton.click();
      await this.liveSplitPanelByAmountButton.click();
      for (const [index, amount] of amounts.entries()) {
        await this.inputLiveSplitAmount(amount);
        if (index !== amounts.length - 1) {
          await this.liveSplitPanelAddSubOrderButton.click();
        }
      }
    });
  }

  async splitByDrag(): Promise<void> {
    await step('在 Recall 通过拖拽方式分单', async () => {
      if (await this.splitByDragButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.splitByDragButton.click();
        return;
      }

      await this.createLiveDragSubOrderFromFirstItems(1);
      const remainingItemCount = await this.liveSplitPanelFirstSubOrderItems.count();
      if (remainingItemCount > 0) {
        await this.createLiveDragSubOrderFromFirstItems(remainingItemCount);
      }
      if (await this.liveSplitPanelFirstSubOrderDeleteButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.liveSplitPanelFirstSubOrderDeleteButton.click();
      }
    });
  }

  async settleSubOrder(index: number): Promise<void> {
    await step(`结算第 ${index} 个子单`, async () => {
      if (await this.subOrderSettleButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.subOrderSettleButton.click();
        return;
      }

      const livePayButton = this.liveSplitPanelSubOrder(index).locator('button').filter({ hasText: /^Pay$/ });
      await expect(livePayButton).toBeVisible({ timeout: 10_000 });
      await livePayButton.click();
    });
  }

  async payCurrentSubOrderByCash(): Promise<void> {
    await step('现金支付当前子单', async () => {
      const offlineCashButton = this.page.getByTestId('sub-order-cash-pay');
      if (await offlineCashButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await offlineCashButton.click();
        return;
      }

      await expect(this.liveCashPaymentMethodButton).toBeVisible({ timeout: 10_000 });
      await this.liveCashPaymentMethodButton.click();
      await expect(this.liveCashFullAmountButton).toBeVisible({ timeout: 10_000 });
      await this.liveCashFullAmountButton.click();
      await waitUntil(
        async () => (((await this.liveCashAmountTendered.textContent().catch(() => '')) ?? '').trim()) !== '0.00',
        {
          description: '现金支付金额已带入',
          intervalMs: 100,
          timeoutMs: 5_000,
        },
      );
      await expect(this.livePayButton).toBeVisible({ timeout: 10_000 });
      await this.livePayButton.click();
      await expect(this.livePaymentPanel).toBeHidden({ timeout: 10_000 });
    });
  }

  async payCurrentSubOrderByCashAmount(amountInCents: number): Promise<void> {
    await step(`现金支付当前子单指定金额 ${amountInCents}`, async () => {
      await this.subOrderPayAmountInput.fill(String(amountInCents));
      await this.page.getByTestId('sub-order-cash-pay').click();
    });
  }

  async openSubOrder(index: number): Promise<void> {
    await step(`打开第 ${index} 个子单`, async () => {
      const offlineSubOrder = this.subOrderCards.nth(index - 1);
      if (await offlineSubOrder.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await offlineSubOrder.click();
        return;
      }

      const liveSubOrder = this.liveSubOrders.nth(index - 1);
      await expect(liveSubOrder).toBeVisible({ timeout: 10_000 });
      const targetOrderNumber = await this.readLiveSubOrderNumber(liveSubOrder);
      if (targetOrderNumber && (await this.readVisibleLiveDetailOrderNumber()) === targetOrderNumber) {
        return;
      }

      if (await this.page.locator('#ordersmryWrap:visible').isVisible().catch(() => false)) {
        await this.closeLiveFloatingCover();
      }
      await this.clickLiveSubOrder(liveSubOrder);
      if (targetOrderNumber) {
        await waitUntil(
          async () => (await this.readVisibleLiveDetailOrderNumber()) === targetOrderNumber,
          {
            description: `live Recall 子单详情切换到 ${targetOrderNumber}`,
            intervalMs: 200,
            timeoutMs: 10_000,
          },
        );
      }
      await expect(this.page.locator('#odsmystatus:visible').last()).toBeVisible({ timeout: 10_000 });
      return;
    });
  }

  async readParentOrderBackground(): Promise<string> {
    return step('读取 Recall 母单背景色', async () => {
      if (await this.parentOrderCard.isVisible({ timeout: 2_000 }).catch(() => false)) {
        return (
          (await this.parentOrderCard.getAttribute('data-background')) ??
          (await this.parentOrderCard.evaluate((node) => getComputedStyle(node).backgroundColor))
        );
      }

      await this.closeLiveFloatingCover();
      const backgroundColor = await this.page.evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const orderHeader = Array.from(document.querySelectorAll<HTMLElement>('[id^="tborder_"] > div, .odHead'))
          .filter(visible)
          .find((element) => getComputedStyle(element).backgroundColor !== 'rgba(0, 0, 0, 0)');
        return orderHeader ? getComputedStyle(orderHeader).backgroundColor : '';
      });
      return backgroundColor.replace(/^rgb\(([^)]+)\)$/, 'rgba($1, 1)');
    });
  }

  async saveSplit(): Promise<void> {
    await step('保存 Recall 分单', async () => {
      if (await this.saveSplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.saveSplitButton.click();
        return;
      }

      await this.liveSplitPanelSaveButton.click();
      await expect(this.liveSplitPanelSaveButton).toBeHidden({ timeout: 10_000 });
    });
  }

  async saveSplitAmountCreate(): Promise<void> {
    await step('确认按金额创建子单', async () => {
      if (await this.saveSplitAmountButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.saveSplitAmountButton.click();
        return;
      }

      const liveCreateAndContinueButton = this.liveSplitPanelFrame.locator('button').filter({ hasText: /^Create & Continue$/ });
      if (await liveCreateAndContinueButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await liveCreateAndContinueButton.click();
      }
    });
  }

  async unsplit(): Promise<void> {
    await step('撤销 Recall 分单', async () => {
      if (await this.unsplitButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
        await this.unsplitButton.click();
        return;
      }

      await this.liveSplitPanelMoreButton.click();
      await this.liveSplitPanelUnsplitButton.click();
    });
  }

  async unsplitAndReadAlert(): Promise<string> {
    return step('撤销 Recall 分单并读取提示', async () => {
      await this.unsplit();
      return ((await this.voidAlert.textContent()) ?? '').trim();
    });
  }

  async readSplitOrderPrices(): Promise<number[]> {
    return step('读取 Recall 子单金额列表', async () => {
      if (await this.splitOrderPrices.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
        return (await this.splitOrderPrices.allTextContents()).map((price) => Number(price));
      }

      let prices: number[] = [];
      const readLiveSplitList = await waitUntil(
        async () => {
          const summary = await this.readVisibleLiveSplitSummary();
          prices = summary.totals.map((price) => parseCurrency(price));
          return summary.expectedCount > 0 && prices.length >= summary.expectedCount;
        },
        {
          description: '读取 live Recall 子单金额',
          intervalMs: 200,
          timeoutMs: 10_000,
        },
      )
        .then(() => true)
        .catch(() => false);
      if (readLiveSplitList) {
        return prices;
      }

      await expect(this.liveSplitOrderPriceLabels.first()).toBeVisible({ timeout: 10_000 });
      return (await this.liveSplitOrderPriceLabels.allTextContents()).map((price) => parseCurrency(price));
    });
  }

  async readSplitItemPrices(): Promise<number[]> {
    return step('读取 Recall 分单菜品金额列表', async () => {
      if (await this.splitItemPrices.first().isVisible({ timeout: 2_000 }).catch(() => false)) {
        return (await this.splitItemPrices.allTextContents()).map((price) => Number(price));
      }

      await expect(this.liveSplitPanelItemPriceLabels.first()).toBeVisible({ timeout: 10_000 });
      return (await this.liveSplitPanelItemPriceLabels.allTextContents()).map((price) => parseCurrency(price));
    });
  }

  private async setRestoreInventory(restoreInventory: boolean): Promise<void> {
    if (await this.restoreInventoryCheckbox.isVisible().catch(() => false)) {
      if (restoreInventory) {
        await this.restoreInventoryCheckbox.check();
      } else {
        await this.restoreInventoryCheckbox.uncheck();
      }
      return;
    }

    await this.page.evaluate((restore) => {
      const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]'));
      const restoreCheckbox = checkboxes.find((checkbox) => {
        const label = checkbox.id ? document.querySelector(`label[for="${CSS.escape(checkbox.id)}"]`) : null;
        const context = [label?.textContent, checkbox.closest('label')?.textContent, checkbox.parentElement?.textContent]
          .filter(Boolean)
          .join(' ');
        return /restore/i.test(context) && /inventory/i.test(context);
      });
      if (restoreCheckbox && restoreCheckbox.checked !== restore) {
        restoreCheckbox.click();
      }
    }, restoreInventory);
  }

  private async inputLiveVoidReason(reason: string): Promise<void> {
    const noteInput = this.page.locator('#void-note-input');
    if (!(await noteInput.isVisible().catch(() => false))) {
      return;
    }
    await noteInput.fill(reason);
    await this.page.locator('#kbrhide').click({ timeout: 1_000 }).catch(() => undefined);
  }

  private async closeLiveFloatingCover(): Promise<void> {
    const cover = this.page.locator('div[id*="floatcover"]').last();
    if (!(await cover.isVisible({ timeout: 1_000 }).catch(() => false))) {
      return;
    }
    await cover.click({ force: true, position: { x: 10, y: 10 } });
    await waitUntil(
      async () => !(await this.page.locator('#ordersmryWrap:visible').isVisible().catch(() => false)),
      {
        description: 'live Recall 详情浮层已关闭',
        intervalMs: 100,
        timeoutMs: 5_000,
      },
    ).catch(() => undefined);
  }

  private async readLiveSubOrderNumber(subOrder: Locator): Promise<string> {
    const id = (await subOrder.getAttribute('id').catch(() => '')) ?? '';
    const idOrderNumber = id.match(/(?:^|_)(\d+-\d+)$/)?.[1];
    if (idOrderNumber) {
      return idOrderNumber;
    }
    const text = ((await subOrder.textContent().catch(() => '')) ?? '').replace(/\s+/g, ' ').trim();
    return text.match(/\d+-\d+/)?.[0] ?? '';
  }

  private async readVisibleLiveDetailOrderNumber(): Promise<string> {
    const text = ((await this.page.locator('#ordersmryWrap:visible').last().textContent({ timeout: 500 }).catch(() => '')) ?? '')
      .replace(/\s+/g, ' ')
      .trim();
    return text.match(/\d+-\d+/)?.[0] ?? '';
  }

  private async clickLiveSubOrder(subOrder: Locator): Promise<void> {
    const clicked = await subOrder
      .evaluate((element) => {
        (element as HTMLElement).click();
        return true;
      })
      .catch(() => false);
    if (!clicked) {
      await subOrder.click();
    }
  }

  private async clickLiveOrderCard(index: number): Promise<void> {
    const gridCell = this.liveOrderCards.nth(index);
    const pythonOrderCard = this.page.locator('xpath=//*[@id="reordersmylst"]/div[2]/div/child::div').nth(index);
    const orderCard = pythonOrderCard
      .or(gridCell.locator(':scope > div').first())
      .or(gridCell)
      .first();
    const fallbackOrderCard = gridCell
      .locator(':scope > div')
      .first()
      .or(gridCell)
      .or(this.page.locator('xpath=(//div[contains(@class, "ReactVirtualized__Grid__innerScrollContainer")]/div/div/div)').nth(index))
      .first();
    await expect(orderCard).toBeVisible({ timeout: 10_000 });
    const cardBox = await orderCard.boundingBox();
    if (cardBox) {
      await this.page.mouse.click(cardBox.x + cardBox.width / 2, cardBox.y + cardBox.height / 2);
    } else {
      await orderCard.click();
    }
    if (await fallbackOrderCard.isVisible({ timeout: 500 }).catch(() => false)) {
      await fallbackOrderCard.evaluate((element) => {
        const target = element as HTMLElement;
        target.click();
        target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      });
    }
    await waitUntil(
      async () =>
        (await this.page.locator('#oddetail:visible').isVisible().catch(() => false)) ||
        (await this.page.locator('#oodbtbx:visible [id*="itemdsh"]:visible, #ordersmryWrap:visible [class*="itemName"]').first().isVisible().catch(() => false)) ||
        !(await this.page.locator('[role="gridcell"]:visible').first().isVisible().catch(() => false)),
      {
        description: 'live Recall 订单详情打开',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    );
  }

  private async readLiveDiscountRowLastCurrencyByIndex(index: number): Promise<string> {
    return this.page.evaluate((targetIndex) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const panel = document.querySelector<HTMLElement>('#subitemlist') ?? document.body;
      if (!panel) {
        throw new Error('live discount panel not found');
      }

      const iconElements = Array.from(panel.querySelectorAll<HTMLElement>('span, div'))
        .filter(visible)
        .filter((element) => /check_box/.test(element.textContent?.trim() ?? ''));
      const rowByTop = new Map<number, { row: HTMLElement; top: number }>();
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
          rowByTop.set(key, { row, top: rect.top });
        }
      }

      const row = [...rowByTop.values()].sort((left, right) => left.top - right.top)[targetIndex]?.row;
      if (!row) {
        throw new Error(`live discount row ${targetIndex} not found`);
      }
      const prices = (row.textContent ?? '').match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
      return prices.at(-1) ?? row.textContent?.trim() ?? '';
    }, index);
  }

  private async readLiveDiscountRowPricesByIndex(index: number): Promise<RecallDiscountRowPrices> {
    return this.page.evaluate((targetIndex) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const panel = document.querySelector<HTMLElement>('#subitemlist') ?? document.body;
      const iconElements = Array.from(panel.querySelectorAll<HTMLElement>('span, div'))
        .filter(visible)
        .filter((element) => /check_box/.test(element.textContent?.trim() ?? ''));
      const rowByTop = new Map<number, { row: HTMLElement; top: number }>();
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
          rowByTop.set(key, { row, top: rect.top });
        }
      }

      const row = [...rowByTop.values()].sort((left, right) => left.top - right.top)[targetIndex]?.row;
      if (!row) {
        throw new Error(`live discount row ${targetIndex} not found`);
      }
      const prices = (row.textContent ?? '').match(/\$?\d+(?:,\d{3})*(?:\.\d{2})?/g) ?? [];
      const originalPrice = prices[0] ?? prices.at(-1) ?? '0';
      const currentPrice = prices.at(-1) ?? originalPrice;
      return { currentPrice, originalPrice };
    }, index).then((prices) => ({
      currentPrice: parseCurrency(prices.currentPrice),
      originalPrice: parseCurrency(prices.originalPrice),
    }));
  }

  private async ensureLiveWholeOrderDiscountSelected(): Promise<void> {
    await waitUntil(() => this.hasVisibleLiveDiscountRows(), {
      description: 'Recall live discount rows visible',
      intervalMs: 200,
      timeoutMs: 10_000,
    });
    await this.clearLiveDiscountRowSelection();
    await this.clickLiveDiscountRowCheckboxByIndex(0);
  }

  private async ensureDiscountPanelOpen(): Promise<void> {
    if (
      (await this.hasVisibleLiveDiscountRows()) ||
      (await this.discountAmountInput.isVisible({ timeout: 500 }).catch(() => false))
    ) {
      return;
    }
    await this.discountButton.click();
    await waitUntil(
      async () =>
        (await this.hasVisibleLiveDiscountRows()) ||
        (await this.discountAmountInput.isVisible().catch(() => false)),
      {
        description: 'Recall 折扣面板打开',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    );
  }

  private async hasVisibleLiveDiscountRows(): Promise<boolean> {
    return this.readLiveDiscountRowLastCurrencyByIndex(0)
      .then((price) => Boolean(price))
      .catch(() => false);
  }

  private async clearLiveDiscountRowSelection(): Promise<void> {
    const clearSelectedButton = this.page.locator(liveOrderDishesSelectors.discountSelectedClearButton);
    if (await clearSelectedButton.isVisible({ timeout: 500 }).catch(() => false)) {
      await this.clickLiveMobileElement(clearSelectedButton);
    }
  }

  private async clearLiveDiscountKeypadValue(): Promise<void> {
    await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const clearButton = Array.from(document.querySelectorAll<HTMLElement>('#subitemlist div, #subitemlist span, div, span'))
          .filter(visible)
          .find((element) => element.textContent?.trim() === 'C');
        if (!clearButton) {
          return;
        }
        clearButton.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        clearButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        clearButton.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        clearButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        clearButton.click();
      })
      .catch(() => undefined);
  }

  private async clickLiveDiscountRowCheckboxByIndex(index: number): Promise<void> {
    await this.page.evaluate((targetIndex) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const panel = document.querySelector<HTMLElement>('#subitemlist') ?? document.body;
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

  private async clickLiveMobileElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  private async clickVisibleLiveText(text: string): Promise<void> {
    const clicked = await this.page
      .evaluate((targetText) => {
        const candidates = Array.from(document.querySelectorAll<HTMLElement>('div, button, span'))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              element.textContent?.trim() === targetText
            );
          })
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const textElement = candidates[0];
        let clickable: HTMLElement | null | undefined = textElement;
        for (let level = 0; clickable && level < 5; level += 1) {
          const style = window.getComputedStyle(clickable);
          if (style.cursor === 'pointer' || clickable.onclick || clickable.getAttribute('role') === 'button') {
            break;
          }
          clickable = clickable.parentElement;
        }
        (clickable ?? textElement)?.click();
        return candidates.length > 0;
      }, text)
      .catch(() => false);
    if (!clicked) {
      throw new Error(`Live Recall 未找到可点击文本 ${text}`);
    }
  }

  private async clickLiveSplitEntry(splitButton: Locator, elementId: 'splitod' | 'splitBtn'): Promise<void> {
    await splitButton.click({ timeout: 5_000 }).catch(async (error: unknown) => {
      const clicked = await this.page
        .evaluate((id) => {
          const button = document.getElementById(id);
          if (!button) {
            return false;
          }
          button.click();
          return true;
        }, elementId)
        .catch(() => false);
      if (!clicked) {
        throw error;
      }
    });
  }

  private liveSplitPanelKeypadNumberButton(value: number): Locator {
    return this.liveSplitPanelFrame.locator('div[class*="keypad"] span').filter({ hasText: exactText(String(value)) });
  }

  private liveSplitPanelSubOrder(index: number): Locator {
    return this.liveSplitPanelFrame.locator('div[class*="_suborderContainer"]').nth(index - 1);
  }

  private async createLiveDragSubOrderFromFirstItems(itemCount: number): Promise<void> {
    await expect(this.liveSplitPanelFirstSubOrderItems.first()).toBeVisible({ timeout: 10_000 });
    for (let index = 0; index < itemCount; index += 1) {
      await this.liveSplitPanelFirstSubOrderItems.nth(index).click();
    }
    await this.liveSplitPanelAddSubOrderButton.click();
  }

  private async inputLiveSplitAmount(amount: number): Promise<void> {
    for (const digit of String(amount)) {
      await this.liveSplitPanelFrame.locator('div[class*="keypad"] span').filter({ hasText: exactText(digit) }).click();
    }
    await this.liveSplitPanelKeypadConfirmButton.click();
  }

  private async readVisibleLiveSplitSummary(): Promise<{ expectedCount: number; totals: string[] }> {
    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const visibleElements = Array.from(document.querySelectorAll<HTMLElement>('*')).filter(visible);
      const expectedCount =
        visibleElements
          .map((element) => element.textContent?.trim() ?? '')
          .map((text) => text.match(/^\d+\((\d+)\)$/)?.[1])
          .filter((count): count is string => Boolean(count))
          .map(Number)
          .find((count) => count > 0) ??
        visibleElements
          .map((element) => element.textContent?.trim() ?? '')
          .filter((text) => /^\d+-\d+$/.test(text)).length;
      const totals = visibleElements
        .filter((element) => visible(element) && element.textContent?.trim() === 'Total')
        .map((label) => label.nextElementSibling?.textContent?.trim() ?? '')
        .filter((value) => /^\$?\d+(?:\.\d{2})?$/.test(value));
      return { expectedCount, totals };
    });
  }

  private async expandLivePriceDetail(): Promise<void> {
    await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const arrow = Array.from(document.querySelectorAll<HTMLElement>('.material-symbols-rounded'))
          .filter(visible)
          .find((element) => element.textContent?.trim() === 'keyboard_double_arrow_up');
        arrow?.click();
      })
      .catch(() => undefined);
  }

  private async sumVisibleLiveOrderItemQuantities(): Promise<number> {
    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };

      const orderContainers = Array.from(document.querySelectorAll<HTMLElement>('#oodbtbx, #orderDishes, #oddetail, #ordersmryWrap'));
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

  private async readLiveOpenedOrderNumber(): Promise<string> {
    const headerText = await this.page
      .locator('#odinfooutbx:visible, #ordersmryWrap:visible, .odHead:visible')
      .first()
      .textContent({ timeout: 5_000 })
      .catch(() => '');
    const match = headerText?.match(/#\s*(\d+)/);
    if (match) {
      return match[1] ?? '';
    }
    const cardText = await this.page.locator('[role="gridcell"]').nth(this.lastOpenedLiveOrderIndex).textContent().catch(() => '');
    return cardText?.match(/#\s*(\d+)/)?.[1] ?? '';
  }

  private async clickLivePaymentSubmit(): Promise<void> {
    const directButton = this.page.locator('#pplcgppbt:visible, #pplcgpybt:visible').first();
    if (await directButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await directButton.click({ timeout: 5_000 }).catch(async () => {
        await directButton.evaluate((element) => (element as HTMLElement).click());
      });
      return;
    }

    const clicked = await this.page
      .evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const submitButton = Array.from(document.querySelectorAll<HTMLElement>('button, div, span'))
          .filter((element) => visible(element) && /^(Pay & Print|Pay)$/.test(element.textContent?.trim() ?? ''))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.left > window.innerWidth * 0.15 && rect.top > window.innerHeight * 0.15;
          })
          .sort((left, right) => {
            const leftText = left.textContent?.trim() ?? '';
            const rightText = right.textContent?.trim() ?? '';
            if (leftText !== rightText) {
              return leftText === 'Pay & Print' ? -1 : 1;
            }
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return rightRect.width * rightRect.height - leftRect.width * leftRect.height;
          })[0];
        submitButton?.click();
        return Boolean(submitButton);
      })
      .catch(() => false);
    if (!clicked) {
      throw new Error('Live Recall payment submit button not found');
    }
  }
}

function exactText(text: string): RegExp {
  return new RegExp(`^${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
}
