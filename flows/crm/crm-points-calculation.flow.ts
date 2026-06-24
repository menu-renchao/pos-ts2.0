import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { crmSourceRewardMember, crmRewardSettings } from '../../test-data/crm/members.js';
import { groupSwitchDish } from '../../test-data/pos/dishes.js';

export type PaidOrderVoidPointResult = {
  readonly pointsAfterPayment: number;
  readonly pointsAfterVoid: number;
  readonly earnedPoints: number;
};

export type PaidOrderRefundPointResult = {
  readonly pointsAfterPayment: number;
  readonly pointsAfterRefund: number;
  readonly adminPointsAfterRefund: number;
};

export type PaidOrderEarnPointResult = {
  readonly pointsBeforePayment: number;
  readonly pointsAfterPayment: number;
  readonly earnedPoints: number;
};

export class CrmPointsCalculationFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async voidPaidMemberOrderAndReadPoints(homeUrl: string): Promise<PaidOrderVoidPointResult> {
    await this.createPaidDineInMemberOrder(homeUrl);
    const pointsAfterPayment = await this.recallPage.readCrmPointBalance();
    await this.recallPage.voidPaidOrder();
    const pointsAfterVoid = await this.recallPage.readCrmPointBalance();

    return {
      pointsAfterPayment,
      pointsAfterVoid,
      earnedPoints: crmRewardSettings.pointsPerPaidOrder,
    };
  }

  async refundPaidMemberOrderAndReadPoints(homeUrl: string): Promise<PaidOrderRefundPointResult> {
    await this.createPaidDineInMemberOrder(homeUrl);
    const pointsAfterPayment = await this.recallPage.readCrmPointBalance();
    await this.recallPage.refundPaidOrder();
    const pointsAfterRefund = await this.recallPage.readCrmPointBalance();
    const adminPointsAfterRefund = await this.readAdminPoints('+16467337557');

    return {
      pointsAfterPayment,
      pointsAfterRefund,
      adminPointsAfterRefund,
    };
  }

  async earnPointsForPaidMemberOrderAndReadPoints(homeUrl: string): Promise<PaidOrderEarnPointResult> {
    const pointsBeforePayment = await this.createPaidDineInMemberOrder(homeUrl);
    const pointsAfterPayment = await this.recallPage.readCrmPointBalance();

    return {
      pointsBeforePayment,
      pointsAfterPayment,
      earnedPoints: crmRewardSettings.pointsPerPaidOrder,
    };
  }

  private async createPaidDineInMemberOrder(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const pointsBeforePayment = await this.posCrmPage.readHeaderPointBalance();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.settleAllByCash();
    await this.recallPage.openRecentOrder();
    return pointsBeforePayment;
  }

  private async readAdminPoints(member: string): Promise<number> {
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember(member);
    return Number(await this.posCrmPage.readMemberSearchPointResult());
  }
}
