import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { crmSourceRewardMember, crmTargetRewardMember } from '../../test-data/crm/members.js';
import { crmRedeemItemDish, groupSwitchDish } from '../../test-data/pos/dishes.js';

export type PayPageDiscountAmountResult = {
  readonly subtotal: number;
  readonly taxRate: number;
  readonly unpaidAmount: number;
};

export type PayPageSwitchMemberPointResult = {
  readonly sourcePointsBeforeSwitch: number;
  readonly sourcePointsAfterSave: number;
  readonly targetPointsBeforeDiscount: number;
  readonly targetPointsAfterSave: number;
};

export type PayPageRedeemItemPointResult = {
  readonly pointsBeforeRedeem: number;
  readonly pointsAfterPayment: number;
  readonly adminPointsAfterPayment: number;
};

export type PayPageSemiPayRedeemItemPointResult = {
  readonly pointsBeforeRedeem: number;
  readonly adminPointsAfterPayment: number;
};

export type PayPageSemiPayRedeemDiscountPointResult = {
  readonly pointsBeforeRedeem: number;
  readonly adminPointsAfterPartialPayment: number;
};

export class CrmPayPageFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async applyPayPageDiscountAndReadUnpaidAmount(homeUrl: string): Promise<PayPageDiscountAmountResult> {
    await this.openDineInWithSourceMember(homeUrl);
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    const subtotal = await this.orderDishesPage.readSubtotal();
    const tax = await this.orderDishesPage.readTax();
    await this.orderDishesPage.clickSettle();
    await this.posCrmPage.applyRedeemDiscount('10% Off');
    return {
      subtotal,
      taxRate: tax / subtotal,
      unpaidAmount: await this.orderDishesPage.readSettlementUnpaidAmount(),
    };
  }

  async switchMemberApplyPayPageDiscountAndReadPoints(homeUrl: string): Promise<PayPageSwitchMemberPointResult> {
    await this.openDineInWithSourceMember(homeUrl);
    const sourcePointsBeforeSwitch = await this.posCrmPage.readHeaderPointBalance();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.clickSettlementSwitchMember();
    this.crmRewardClient.findMemberByPhone(crmTargetRewardMember.phone);
    await this.posCrmPage.selectMemberByPhone(crmTargetRewardMember.phone);
    const targetPointsBeforeDiscount = await this.posCrmPage.readHeaderPointBalance();
    await this.posCrmPage.applyRedeemDiscount('10% Off');
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember('+16467337557');
    const sourcePointsAfterSave = Number(await this.posCrmPage.readMemberSearchPointResult());
    await this.posCrmPage.searchMember('+19292369168');
    const targetPointsAfterSave = Number(await this.posCrmPage.readMemberSearchPointResult());
    return {
      sourcePointsBeforeSwitch,
      sourcePointsAfterSave,
      targetPointsBeforeDiscount,
      targetPointsAfterSave,
    };
  }

  async payRedeemItemOrderByCashAndReadPoints(homeUrl: string): Promise<PayPageRedeemItemPointResult> {
    await this.openTogoWithSourceMember(homeUrl);
    const pointsBeforeRedeem = await this.posCrmPage.readHeaderPointBalance();
    await this.redeemFreeItem();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.settleByCash();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const pointsAfterPayment = Number((await this.recallPage.readCrmOrderHeaderInfo()).orderPoints);
    const adminPointsAfterPayment = await this.readAdminPoints('+16467337557');
    return {
      pointsBeforeRedeem,
      pointsAfterPayment,
      adminPointsAfterPayment,
    };
  }

  async payRedeemItemOrderBySemiPayAndReadPoints(homeUrl: string): Promise<PayPageSemiPayRedeemItemPointResult> {
    await this.openTogoWithSourceMember(homeUrl);
    const pointsBeforeRedeem = await this.posCrmPage.readHeaderPointBalance();
    await this.redeemFreeItem();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.splitPaymentEvenly(2);
    await this.orderDishesPage.settleByCash();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    await this.recallPage.clickSettle();
    await this.recallPage.payCurrentOrderByCash();
    const adminPointsAfterPayment = await this.readAdminPoints('+16467337557');
    return {
      pointsBeforeRedeem,
      adminPointsAfterPayment,
    };
  }

  async semiPayRedeemDiscountAndReadPoints(homeUrl: string): Promise<PayPageSemiPayRedeemDiscountPointResult> {
    await this.openTogoWithSourceMember(homeUrl);
    const pointsBeforeRedeem = await this.posCrmPage.readHeaderPointBalance();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemDiscount('10% Off');
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.clickSettle();
    await this.orderDishesPage.splitPaymentEvenly(2);
    await this.orderDishesPage.settleByCash();
    const adminPointsAfterPartialPayment = await this.readAdminPoints('+16467337557');
    return {
      pointsBeforeRedeem,
      adminPointsAfterPartialPayment,
    };
  }

  private async openDineInWithSourceMember(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
  }

  private async openTogoWithSourceMember(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickTogo();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
  }

  private async redeemFreeItem(): Promise<void> {
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.applyRedeemItem(crmRedeemItemDish.name);
    await this.posCrmPage.quitRedeem();
  }

  private async readAdminPoints(member: string): Promise<number> {
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember(member);
    return Number(await this.posCrmPage.readMemberSearchPointResult());
  }
}
