import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import type { RoundingSettlementCase, SettlementPaymentType } from '../../test-data/pos/settlement.js';

export type RoundedSettlementRecallState = {
  status: string;
  totalText: string;
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
