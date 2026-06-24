import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import {
  crmHighPointRewardMember,
  crmMaxDiscountRewardSetting,
  crmSourceRewardMember,
} from '../../test-data/crm/members.js';
import { groupSwitchDish } from '../../test-data/pos/dishes.js';

export type RedeemDiscountRecallRewardResult = {
  readonly subtotal: number;
  readonly reward: number;
};

export type RedeemDiscountReduceResult = {
  readonly subtotalBeforeReduce: number;
  readonly rewardBeforeReduce: number;
  readonly rewardAfterReduceText: string;
};

export type RedeemPointBalanceResult = {
  readonly pointsBeforeRedeem: number;
  readonly pointsAfterRedeem: number;
  readonly pointsAfterPayment: number;
  readonly adminPointsAfterPayment: number;
};

export class CrmOrderRedeemDiscountFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async applyPercentageDiscountAndReadRecallReward(
    homeUrl: string,
    discountName: string,
  ): Promise<RedeemDiscountRecallRewardResult> {
    await this.openDineInWithSourceMember(homeUrl);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemDiscount(discountName);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readOrderPriceSummary();
  }

  async readAvailablePercentageDiscountsForHighPointMember(homeUrl: string): Promise<string[]> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmHighPointRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmHighPointRewardMember.phone);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.posCrmPage.openRedeem();
    return this.posCrmPage.readRedeemDiscountOptions();
  }

  async applyMaxCappedPercentageDiscountAndReadRecallReward(homeUrl: string): Promise<RedeemDiscountRecallRewardResult> {
    await this.openDineInWithSourceMember(homeUrl);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemDiscount(crmMaxDiscountRewardSetting.discountName);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return this.recallPage.readOrderPriceSummary();
  }

  async applyDiscountThenReduceItemsToZeroAndReadReward(homeUrl: string): Promise<RedeemDiscountReduceResult> {
    await this.openDineInWithSourceMember(homeUrl);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemDiscount('10% Off');
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const subtotalBeforeReduce = await this.orderDishesPage.readSubtotal();
    const rewardBeforeReduce = Number(await this.orderDishesPage.readRewardText());
    await this.orderDishesPage.reduceFirstItemToZero();
    const rewardAfterReduceText = await this.orderDishesPage.readRewardText();
    return {
      subtotalBeforeReduce,
      rewardBeforeReduce,
      rewardAfterReduceText,
    };
  }

  async redeemFixedAmountPayAndReadPointBalance(homeUrl: string): Promise<RedeemPointBalanceResult> {
    return this.redeemPointCostPayAndReadPointBalance(homeUrl, async () => {
      await this.posCrmPage.applyRedeemAmount('$10.00');
    });
  }

  async redeemPercentageDiscountPayAndReadPointBalance(homeUrl: string): Promise<RedeemPointBalanceResult> {
    return this.redeemPointCostPayAndReadPointBalance(homeUrl, async () => {
      await this.posCrmPage.applyRedeemDiscount('10% Off');
    });
  }

  private async openDineInWithSourceMember(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
  }

  private async redeemPointCostPayAndReadPointBalance(
    homeUrl: string,
    applyRedeem: () => Promise<void>,
  ): Promise<RedeemPointBalanceResult> {
    await this.openDineInWithSourceMember(homeUrl);
    const pointsBeforeRedeem = await this.posCrmPage.readHeaderPointBalance();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.posCrmPage.openRedeem();
    await applyRedeem();
    const pointsAfterRedeem = await this.posCrmPage.readHeaderPointBalance();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.settleAllByCash();
    await this.recallPage.openRecentOrder();
    const pointsAfterPayment = Number((await this.recallPage.readCrmOrderHeaderInfo()).orderPoints);
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember('+16467337557');
    const adminPointsAfterPayment = Number(await this.posCrmPage.readMemberSearchPointResult());
    return {
      pointsBeforeRedeem,
      pointsAfterRedeem,
      pointsAfterPayment,
      adminPointsAfterPayment,
    };
  }
}
