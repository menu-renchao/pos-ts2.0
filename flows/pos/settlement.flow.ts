import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage, RecallTipMethod } from '../../pages/pos/recall.page.js';
import type { RoundingSettlementCase, SettlementPaymentType } from '../../test-data/pos/settlement.js';

export type RoundedSettlementRecallState = {
  status: string;
  totalText: string;
};

export type PaidOrderTipRecallState = {
  status: string;
  tipText: string;
};

export type PaidOrderTwoTipRecallStates = {
  creditTip: PaidOrderTipRecallState;
  cashTip: PaidOrderTipRecallState;
};

export class SettlementFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
  ) {}

  async payRoundedOrderAndReadRecall(
    homeUrl: string,
    settlementCase: RoundingSettlementCase,
  ): Promise<RoundedSettlementRecallState> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setRoundingStrategy(settlementCase.strategy);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.changeSelectedItemPrice(settlementCase.modifyPriceCents / 100);
    await this.orderDishesPage.voidSelectedItemTax();
    await this.orderDishesPage.applyOrderCharge('0%');
    await this.orderDishesPage.clickSettle();
    await this.payCurrentOrder(settlementCase.paymentType);
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.cancelAllCondition();

    return {
      status: await this.recallPage.readOrderStatus(),
      totalText: await this.recallPage.readOrderTotalText(),
    };
  }

  async voidFullyLoyaltyPaidAutoSentOrderAndReadStatus(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setClickSettleAutoSend(true);
    await this.homePage.refresh();
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.settleByLoyaltyCard();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.voidPaidOrder();
    return this.recallPage.readOrderStatus();
  }

  async voidCompletedSemiPaidLoyaltyOrderAndReadStatus(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.splitPaymentEvenly(2);
    await this.orderDishesPage.settleByLoyaltyCard();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickSettle();
    await this.recallPage.payCurrentOrderByCash();
    await this.recallPage.voidPaidOrder();
    return this.recallPage.readOrderStatus();
  }

  async addTipsAfterCreditPaymentAndReadRecall(homeUrl: string): Promise<PaidOrderTwoTipRecallStates> {
    return {
      creditTip: await this.payByCreditAddTwoTipsAndReadRecall(homeUrl, 'credit'),
      cashTip: await this.payByCreditAddTwoTipsAndReadRecall(homeUrl, 'cash'),
    };
  }

  async addTipAfterPartialCashPaymentAndReadUnpaidAmount(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.changeSelectedItemPrice(10);
    await this.orderDishesPage.voidSelectedItemTax();
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.modifySettlementPaymentAmount(500);
    await this.orderDishesPage.settleByCash();
    await this.orderDishesPage.addSettlementTip(200);
    return this.orderDishesPage.readSettlementUnpaidAmount();
  }

  async readDineInCashPaymentActionOrder(homeUrl: string): Promise<string[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    return this.orderDishesPage.clickCashTenderAndReadPayActionOrder();
  }

  async searchGiftCardWithoutInfoAndReadAlert(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    return this.orderDishesPage.searchGiftCardWithoutInfoAndReadAlert();
  }

  async searchLoyaltyCardWithoutInfoAndReadAlert(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    return this.orderDishesPage.searchLoyaltyCardWithoutInfoAndReadAlert();
  }

  private async payByCreditAddTwoTipsAndReadRecall(
    homeUrl: string,
    secondTipMethod: RecallTipMethod,
  ): Promise<PaidOrderTipRecallState> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.orderDishesPage.selectMenuGroup('Lunch');
    await this.orderDishesPage.selectMenuCategory('Chicken Lunch E');
    await this.orderDishesPage.addMenuItem('superman item1');
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.settleByCredit();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.addTipAfterCreditPayment(100, 'credit');
    await this.recallPage.addTipAfterCreditPayment(200, secondTipMethod);

    return {
      status: await this.recallPage.readOrderStatus(),
      tipText: await this.recallPage.readOrderTipText(),
    };
  }

  private async payCurrentOrder(paymentType: SettlementPaymentType): Promise<void> {
    if (paymentType === 'cash') {
      await this.orderDishesPage.settleByCash();
      return;
    }
    if (paymentType === 'loyalty_card') {
      await this.orderDishesPage.settleByLoyaltyCard();
      return;
    }
    if (paymentType === 'gift_card') {
      await this.orderDishesPage.settleByGiftCard();
      return;
    }
    if (paymentType === 'backup_card') {
      await this.orderDishesPage.settleByBackupCard();
      return;
    }
    await this.orderDishesPage.settleBySelfCard();
  }
}
