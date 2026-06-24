import type { StubCrmRewardClient, CrmRewardScenario } from '../../clients/crm/reward.client.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import type { SplitOrderPage } from '../../pages/pos/split-order.page.js';
import {
  crmRewardSettings,
  crmSourceRewardMember,
  crmTargetRewardMember,
} from '../../test-data/crm/members.js';
import { categorySwitchDish, crmRedeemItemDish, groupSwitchDish } from '../../test-data/pos/dishes.js';

export type CrmCombineRewardResult = {
  readonly sourcePointBalance: number;
  readonly sourceMemberName: string;
  readonly targetPointBalance: number;
  readonly targetMemberName: string;
  readonly combinedPointBalance: number;
  readonly combinedMemberName: string;
  readonly paidPointBalance: number;
  readonly paidMemberName: string;
  readonly subtotal: number;
  readonly rewardDiscount: number;
};

export type CrmMoveAvailabilityResult = {
  readonly moveOrderVisible?: boolean;
  readonly moveItemVisible?: boolean;
};

export type CrmRewardDiscountPaymentResult = {
  readonly subtotal: number;
  readonly rewardDiscount: number;
};

export class CrmOrderTransferFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly splitOrderPage: SplitOrderPage,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async combineOrdersWithRewards(
    homeUrl: string,
    scenario: CrmRewardScenario,
  ): Promise<CrmCombineRewardResult> {
    const sourceMember = this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    const targetMember = this.crmRewardClient.findMemberByPhone(crmTargetRewardMember.phone);

    await this.createDineInMemberOrder(homeUrl, sourceMember.phone, groupSwitchDish.name, true);
    const sourcePointBalance = await this.posCrmPage.readHeaderPointBalance();
    const sourceMemberName = await this.posCrmPage.readMemberName();
    await this.orderDishesPage.saveOrder();

    await this.createDineInMemberOrder(homeUrl, targetMember.phone, categorySwitchDish.name, false);
    if (scenario === 'discount-on-target') {
      await this.posCrmPage.openRedeem();
      await this.posCrmPage.applyRedeemDiscount(crmRewardSettings.discountName);
    }
    const targetPointBalance = await this.posCrmPage.readHeaderPointBalance();
    const targetMemberName = await this.posCrmPage.readMemberName();
    await this.orderDishesPage.saveOrder();

    await this.homePage.clickRecall();
    if (scenario === 'discount-on-target') {
      await this.recallPage.openRecentOrder();
      await this.recallPage.combineCrmOrder(2);
    } else {
      await this.recallPage.openPreviousOrder();
      await this.recallPage.combineCrmOrder(1);
    }

    const combinedPointBalance = await this.recallPage.readCrmPointBalance();
    const combinedMemberName = await this.recallPage.readCrmMemberName();
    await this.recallPage.settleAllByCash();
    await this.recallPage.cancelAllCondition();
    await this.recallPage.openRecentOrder();
    const paidPointBalance = await this.recallPage.readCrmPointBalance();
    const paidMemberName = await this.recallPage.readCrmMemberName();
    const priceSummary = await this.recallPage.readOrderPriceSummary();

    return {
      sourcePointBalance,
      sourceMemberName,
      targetPointBalance,
      targetMemberName,
      combinedPointBalance,
      combinedMemberName,
      paidPointBalance,
      paidMemberName,
      subtotal: priceSummary.subtotal,
      rewardDiscount: priceSummary.reward,
    };
  }

  async splitRedeemItemOrderAndReadMoveOrderAvailability(homeUrl: string): Promise<CrmMoveAvailabilityResult> {
    await this.createTogoRedeemItemOrder(homeUrl);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.posCrmPage.openRedeemSplit();
    await this.splitOrderPage.splitEvenly(2);
    await this.splitOrderPage.save();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    return { moveOrderVisible: await this.recallPage.isMoveOrderVisible() };
  }

  async saveRedeemItemOrderAndReadMoveItemAvailability(homeUrl: string): Promise<CrmMoveAvailabilityResult> {
    await this.createTogoRedeemItemOrder(homeUrl);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return { moveItemVisible: await this.recallPage.isMoveItemVisible() };
  }

  async payRecalledOrderWithRedeemDiscount(homeUrl: string): Promise<CrmRewardDiscountPaymentResult> {
    await this.createDineInMemberOrder(homeUrl, crmSourceRewardMember.phone, groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickSettle();
    await this.recallPage.applyRedeemDiscount(crmRewardSettings.discountName);
    await this.recallPage.payCurrentOrderByCash();
    await this.recallPage.openRecentOrder();
    const priceSummary = await this.recallPage.readOrderPriceSummary();
    return { subtotal: priceSummary.subtotal, rewardDiscount: priceSummary.reward };
  }

  private async createDineInMemberOrder(
    homeUrl: string,
    memberPhone: string,
    itemName: string,
    openHome = true,
  ): Promise<void> {
    if (openHome) {
      await this.homePage.open(homeUrl);
    }
    await this.homePage.clickDineIn();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(memberPhone);
    await this.orderDishesPage.addMenuItem(itemName);
  }

  private async createTogoRedeemItemOrder(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemItem(crmRedeemItemDish.name);
    await this.posCrmPage.quitRedeem();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
  }
}
