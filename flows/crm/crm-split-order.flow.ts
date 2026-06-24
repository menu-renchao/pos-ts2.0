import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import type { SplitOrderPage } from '../../pages/pos/split-order.page.js';
import { crmRewardSettings, crmSourceRewardMember } from '../../test-data/crm/members.js';
import { categorySwitchDish, crmRedeemItemDish, groupSwitchDish } from '../../test-data/pos/dishes.js';

export type SplitRedeemItemPriceResult = {
  readonly redeemItemPrices: readonly number[];
};

export type SplitSuborderPaymentPointResult = {
  readonly pointsBeforePayment: number;
  readonly pointsAfterAllSubordersPaid: number;
  readonly earnedPoints: number;
};

export type DiscountedSplitSuborderPaymentResult = {
  readonly pointsBeforeDiscount: number;
  readonly pointsAfterSuborderPayment: number;
  readonly discountPointDeduction: number;
  readonly memberNameBeforeSplit: string;
  readonly memberNameAfterSuborderPayment: string;
};

export class CrmSplitOrderFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly splitOrderPage: SplitOrderPage,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async splitRedeemItemOrderByDragAndReadRedeemPrices(homeUrl: string): Promise<SplitRedeemItemPriceResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemItem(crmRedeemItemDish.name);
    await this.posCrmPage.quitRedeem();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.posCrmPage.openRedeemSplit();
    await this.splitOrderPage.splitByDrag();
    await this.splitOrderPage.save();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    const firstSubOrderRedeemPrice = await this.recallPage.readRedeemItemPrice();
    await this.recallPage.openSubOrder(2);
    const secondSubOrderRedeemPrice = await this.recallPage.readRedeemItemPrice();

    return {
      redeemItemPrices: [firstSubOrderRedeemPrice, secondSubOrderRedeemPrice],
    };
  }

  async paySplitMemberSubordersAndReadPoints(homeUrl: string): Promise<SplitSuborderPaymentPointResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const pointsBeforePayment = await this.posCrmPage.readHeaderPointBalance();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.posCrmPage.openRedeemSplit();
    await this.splitOrderPage.splitByDrag();
    await this.splitOrderPage.save();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleAllByCash();
    await this.recallPage.openSubOrder(2);
    await this.recallPage.settleAllByCash();
    await this.recallPage.openSubOrder(1);

    return {
      pointsBeforePayment,
      pointsAfterAllSubordersPaid: await this.recallPage.readCrmPointBalance(),
      earnedPoints: 20,
    };
  }

  async payDiscountedDragSplitSuborderAndReadMemberState(
    homeUrl: string,
  ): Promise<DiscountedSplitSuborderPaymentResult> {
    return this.payDiscountedSplitSuborderAndReadMemberState(homeUrl, 'drag');
  }

  async payDiscountedEvenSplitSuborderAndReadMemberState(
    homeUrl: string,
  ): Promise<DiscountedSplitSuborderPaymentResult> {
    return this.payDiscountedSplitSuborderAndReadMemberState(homeUrl, 'even');
  }

  private async payDiscountedSplitSuborderAndReadMemberState(
    homeUrl: string,
    splitMode: 'drag' | 'even',
  ): Promise<DiscountedSplitSuborderPaymentResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const pointsBeforeDiscount = await this.posCrmPage.readHeaderPointBalance();
    const memberNameBeforeSplit = await this.posCrmPage.readMemberName();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemDiscount(crmRewardSettings.discountName);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.posCrmPage.openRedeemSplit();
    if (splitMode === 'drag') {
      await this.splitOrderPage.splitByDrag();
    } else {
      await this.splitOrderPage.splitEvenly(2);
    }
    await this.splitOrderPage.save();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.openSubOrder(1);
    await this.recallPage.settleAllByCash();
    await this.recallPage.openSubOrder(1);

    return {
      pointsBeforeDiscount,
      pointsAfterSuborderPayment: await this.recallPage.readCrmPointBalance(),
      discountPointDeduction: 10,
      memberNameBeforeSplit,
      memberNameAfterSuborderPayment: await this.recallPage.readCrmMemberName(),
    };
  }
}
