import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

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

export class RecallPage extends PageObject {
  private readonly recentOrderButton: Locator;
  private readonly recalledOptions: Locator;
  private readonly recalledComboSubItems: Locator;
  private readonly recallItems: Locator;
  private readonly recallRoot: Locator;
  private readonly discountAmountInput: Locator;
  private readonly discountAmountSubmitButton: Locator;
  private readonly discountButton: Locator;
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
  private readonly orderTotal: Locator;
  private readonly parentOrderCard: Locator;
  private readonly orderStatus: Locator;
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
  private readonly previousOrderButton: Locator;
  private readonly printButton: Locator;
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
  private readonly subOrderButton: Locator;
  private readonly cashPaymentTypeFilterButton: Locator;
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
    this.recallRoot = page.getByTestId('recall-page').or(page.locator('.recall'));
    this.discountAmountInput = page.getByTestId('recall-order-discount-amount');
    this.discountAmountSubmitButton = page.getByTestId('recall-order-discount-submit');
    this.discountButton = page.getByTestId('recall-order-discount');
    this.discountTip = page.getByTestId('recall-discount-tip');
    this.discountWholeOrderPrice = page.getByTestId('recall-order-discount-whole-order-price');
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
    this.orderTotal = page.getByTestId('recall-order-total');
    this.parentOrderCard = page.getByTestId('recall-parent-order');
    this.orderStatus = page.getByTestId('recall-order-status');
    this.orderSubtotal = page.getByTestId('recall-order-subtotal');
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
    this.previousOrderButton = page.getByTestId('recall-previous-order');
    this.printButton = page.getByTestId('recall-print');
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
    this.voidOrderButton = page.getByTestId('recall-void-order');
    this.voidReasonChooseButton = page.getByTestId('recall-void-reason-choose');
    this.voidReasonOptions = page.getByTestId('recall-void-reason-option');
    this.restoreInventoryCheckbox = page.getByTestId('recall-restore-inventory');
    this.reprintButton = page.getByTestId('recall-reprint');
    this.subOrderButton = page.getByTestId('recall-sub-order');
    this.cashPaymentTypeFilterButton = page.getByTestId('recall-payment-type-cash');
    this.callOffButton = page.getByTestId('recall-call-off');
    this.callOrderButton = page.getByTestId('recall-call-order');
    this.paymentTypeOrderNumber = page.getByTestId('recall-payment-type-order-number');
    this.paymentRecords = page.getByTestId('recall-payment-record');
    this.managerPasswordInput = page.getByTestId('recall-manager-password');
    this.managerPasswordSubmitButton = page.getByTestId('recall-manager-password-submit');
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
      await this.recentOrderButton.click();
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
      return ((await this.discountWholeOrderPrice.textContent()) ?? '').trim();
    });
  }

  async applyWholeOrderDiscountAmount(amount: number): Promise<void> {
    await step(`Recall 应用整单固定金额折扣 ${amount}`, async () => {
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
      await this.managerPasswordInput.fill(password);
      await this.managerPasswordSubmitButton.click();
    });
  }

  async cancelManagerPassword(): Promise<void> {
    await step('取消 Recall 经理密码授权', async () => {
      await this.managerPasswordCancelButton.click();
    });
  }

  async readAllOrderItems(): Promise<RecalledOrderItem[]> {
    return step('读取 Recall 订单菜品列表', async () => {
      await expect(this.recallItems.first()).toBeVisible();
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

  async readComboSubItemNames(): Promise<string[]> {
    return step('读取 Recall Combo 子菜列表', async () => {
      await expect(this.recalledComboSubItems.first()).toBeVisible();
      return (await this.recalledComboSubItems.allTextContents()).map((name) => name.trim()).filter(Boolean);
    });
  }

  async readFirstOrderItemState(): Promise<string> {
    return step('读取 Recall 第一个菜品状态', async () => {
      const item = this.recallItems.first();
      await expect(item).toBeVisible();
      return (await item.getAttribute('data-state')) ?? '';
    });
  }

  async readFirstItemOption(): Promise<RecalledItemOption> {
    return step('读取 Recall 第一个菜品备注', async () => {
      const option = this.recalledOptions.first();
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
      await this.subOrderButton.click();
    });
  }

  async readOrderTip(): Promise<number> {
    return step('读取 Recall 订单小费', async () => Number((await this.orderTip.textContent()) ?? '0'));
  }

  async readOrderTipText(): Promise<string> {
    return step('读取 Recall 订单小费文本', async () => ((await this.orderTip.textContent()) ?? '').trim());
  }

  async printOrderAndReadState(): Promise<RecallPrintState> {
    return step('打印 Recall 订单并读取打印状态', async () => {
      await this.printButton.click();
      return {
        reprintVisible: await this.reprintButton.isVisible(),
        printFileCount: Number((await this.printFileCount.textContent()) ?? '0'),
      };
    });
  }

  async readItemCount(): Promise<string> {
    return step('读取 Recall 菜品总数量', async () => ((await this.itemCount.textContent()) ?? '').trim());
  }

  async addTipAfterCreditPayment(amount: number, method: RecallTipMethod = 'credit'): Promise<void> {
    await step(`Recall 已支付订单追加 ${method} 小费 ${amount}`, async () => {
      await this.orderTipMethod.selectOption(method);
      await this.orderTipInput.fill(String(amount));
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.orderTipSubmitButton.click();
    });
  }

  async addTipAfterCreditPaymentAndReadToast(amount: number, method: RecallTipMethod = 'credit'): Promise<string> {
    return step(`Recall 已支付订单追加 ${method} 小费 ${amount} 并读取提示`, async () => {
      await this.addTipAfterCreditPayment(amount, method);
      return ((await this.orderTipToast.textContent()) ?? '').trim();
    });
  }

  async combineSplitOrders(): Promise<void> {
    await step('从 Recall 合并拆分订单', async () => {
      await this.combinedTipButton.click();
    });
  }

  async readOrderStatus(): Promise<string> {
    return step('读取 Recall 订单状态', async () => (await this.orderStatus.textContent()) ?? '');
  }

  async readOrderPriceDetail(): Promise<string> {
    return step('读取 Recall 订单价格明细', async () => ((await this.orderPriceDetail.textContent()) ?? '').trim());
  }

  async readOrderTaxText(): Promise<string> {
    return step('读取 Recall 订单 Tax 文案', async () => ((await this.orderTax.textContent()) ?? '').trim());
  }

  async readOrderNumber(): Promise<string> {
    return step('读取 Recall 订单号', async () => ((await this.orderNumber.textContent()) ?? '').trim());
  }

  async readOrderCardId(): Promise<string> {
    return step('读取 Recall 订单卡 Order ID', async () => ((await this.orderCardId.textContent()) ?? '').trim());
  }

  async openPreviousOrder(): Promise<void> {
    await step('打开 Recall 前一笔订单', async () => {
      await this.previousOrderButton.click();
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
      await this.recallCrmCombineInput.fill(String(orderIndex));
      await this.recallCrmCombineButton.click();
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
      await this.recallCancelConditionButton.click();
    });
  }

  async clickSettle(): Promise<void> {
    await step('Recall 点击支付', async () => {
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
      await this.cashPaymentTypeFilterButton.click();
      return ((await this.paymentTypeOrderNumber.textContent()) ?? '').trim();
    });
  }

  async voidPaidOrder(): Promise<void> {
    await step('Recall Void 已支付订单', async () => {
      await this.voidPaidOrderButton.click();
    });
  }

  async voidOrder(restoreInventory = true): Promise<void> {
    await step(`Recall Void 订单${restoreInventory ? '并恢复库存' : '且不恢复库存'}`, async () => {
      if (restoreInventory) {
        await this.restoreInventoryCheckbox.check();
      } else {
        await this.restoreInventoryCheckbox.uncheck();
      }
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

  async refundPaymentRecord(index: number): Promise<void> {
    await step(`Recall 退款第 ${index} 条付款记录`, async () => {
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

  async clickEdit(): Promise<void> {
    await step('点击 Recall 编辑订单', async () => {
      await this.editButton.click();
    });
  }

  async editGuestName(name: string): Promise<void> {
    await step(`编辑订单客名为 ${name}`, async () => {
      await this.guestNameInput.fill(name);
    });
  }

  async saveEdit(): Promise<void> {
    await step('保存 Recall 编辑订单', async () => {
      await this.saveEditButton.click();
    });
  }

  async readCustomerName(): Promise<string | null> {
    return step('读取 Recall 客名', async () => {
      const text = ((await this.customerName.textContent()) ?? '').trim();
      return text || null;
    });
  }

  async readOrderTotal(): Promise<number> {
    return step('读取 Recall 订单总额', async () => Number((await this.orderTotal.textContent()) ?? '0'));
  }

  async readOrderTotalText(): Promise<string> {
    return step('读取 Recall 订单总额文本', async () => ((await this.orderTotal.textContent()) ?? '').trim());
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
    return step('读取 Recall 订单小计', async () => Number((await this.orderSubtotal.textContent()) ?? '0'));
  }

  async openSplitOrder(): Promise<void> {
    await step('打开 Recall 分单面板', async () => {
      await this.splitButton.click();
    });
  }

  async splitEvenly(count: number): Promise<void> {
    await step(`在 Recall 平分订单为 ${count} 份`, async () => {
      await this.evenSplitButton.click();
    });
  }

  async splitByItem(): Promise<void> {
    await step('在 Recall 按菜品分单', async () => {
      await this.itemSplitButton.click();
    });
  }

  async splitBySeat(): Promise<void> {
    await step('在 Recall 按座位分单', async () => {
      await this.seatSplitButton.click();
    });
  }

  async splitByAmounts(amounts: readonly number[]): Promise<void> {
    await step(`在 Recall 按金额分单 ${amounts.join(', ')}`, async () => {
      for (const [index, amount] of amounts.entries()) {
        if (index > 0) {
          await this.addSubOrderButton.click();
        }
        await this.amountInputs.nth(index).fill(String(amount));
      }
    });
  }

  async splitByDrag(): Promise<void> {
    await step('在 Recall 通过拖拽方式分单', async () => {
      await this.splitByDragButton.click();
    });
  }

  async settleSubOrder(index: number): Promise<void> {
    await step(`结算第 ${index} 个子单`, async () => {
      await this.subOrderSettleButton.click();
    });
  }

  async payCurrentSubOrderByCash(): Promise<void> {
    await step('现金支付当前子单', async () => {
      await this.page.getByTestId('sub-order-cash-pay').click();
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
      await this.subOrderCards.nth(index - 1).click();
    });
  }

  async readParentOrderBackground(): Promise<string> {
    return step('读取 Recall 母单背景色', async () =>
      (await this.parentOrderCard.getAttribute('data-background')) ??
      (await this.parentOrderCard.evaluate((node) => getComputedStyle(node).backgroundColor)),
    );
  }

  async saveSplit(): Promise<void> {
    await step('保存 Recall 分单', async () => {
      await this.saveSplitButton.click();
    });
  }

  async saveSplitAmountCreate(): Promise<void> {
    await step('确认按金额创建子单', async () => {
      await this.saveSplitAmountButton.click();
    });
  }

  async unsplit(): Promise<void> {
    await step('撤销 Recall 分单', async () => {
      await this.unsplitButton.click();
    });
  }

  async unsplitAndReadAlert(): Promise<string> {
    return step('撤销 Recall 分单并读取提示', async () => {
      await this.unsplitButton.click();
      return ((await this.voidAlert.textContent()) ?? '').trim();
    });
  }

  async readSplitOrderPrices(): Promise<number[]> {
    return step('读取 Recall 子单金额列表', async () =>
      (await this.splitOrderPrices.allTextContents()).map((price) => Number(price)),
    );
  }

  async readSplitItemPrices(): Promise<number[]> {
    return step('读取 Recall 分单菜品金额列表', async () =>
      (await this.splitItemPrices.allTextContents()).map((price) => Number(price)),
    );
  }
}
