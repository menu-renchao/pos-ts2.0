import type { StubCrmMemberClient } from '../../clients/crm/member.client.js';
import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { DeliveryPage } from '../../pages/pos/delivery.page.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallCrmOrderHeader, RecallPage } from '../../pages/pos/recall.page.js';
import { crmSourceRewardMember, crmTargetRewardMember } from '../../test-data/crm/members.js';
import { categorySwitchDish, groupSwitchDish } from '../../test-data/pos/dishes.js';
import { deliveryOrderInfoSample } from '../../test-data/pos/delivery.js';

export type OrderJoinMemberSearchResult = {
  readonly createdPhone: string;
  readonly searchEmailResult: string;
  readonly searchPhoneResult: string;
};

export type DeliveryRedeemHeaderResult = RecallCrmOrderHeader & {
  readonly selectedMember: string;
  readonly selectedPoints: string;
};

export type RemoveReselectHeaderResult = {
  readonly selectedMember: string;
  readonly selectedPoints: string;
  readonly recallMember: string;
  readonly recallPoints: string;
};

export class CrmOrderFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly posCrmPage: PosCrmPage,
    private readonly deliveryPage: DeliveryPage,
    private readonly crmMemberClient: StubCrmMemberClient,
    private readonly crmRewardClient: StubCrmRewardClient,
  ) {}

  async joinMemberByPhoneFromOrderAndSearch(homeUrl: string): Promise<OrderJoinMemberSearchResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.openAddNewLoyaltyFromRedeem();
    const createdPhone = this.crmMemberClient.nextUniquePhone();
    await this.posCrmPage.fillJoinMemberPhone(createdPhone);
    await this.posCrmPage.fillJoinMemberName('test_1', 'test_2');
    await this.posCrmPage.submitJoinMember();
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember(createdPhone);
    const searchEmailResult = await this.posCrmPage.readMemberSearchEmailResult();
    const searchPhoneResult = await this.posCrmPage.readMemberSearchPhoneResult();
    return { createdPhone, searchEmailResult, searchPhoneResult };
  }

  async createDeliveryRedeemOrderAndReadRecallHeader(homeUrl: string): Promise<DeliveryRedeemHeaderResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDelivery();
    await this.deliveryPage.createDeliveryOrder(deliveryOrderInfoSample);
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    const selectedPoints = await this.posCrmPage.readRedeemOrderPoints();
    const selectedMember = await this.posCrmPage.readRedeemOrderMember();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.addMenuItem(categorySwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    return {
      ...(await this.recallPage.readCrmOrderHeaderInfo()),
      selectedMember,
      selectedPoints,
    };
  }

  async removeMemberReselectAndReadRecallHeader(homeUrl: string): Promise<RemoveReselectHeaderResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    this.crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
    this.crmRewardClient.findMemberByPhone(crmTargetRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.removeRedeemMember();
    await this.posCrmPage.openRedeem();
    await this.posCrmPage.selectMemberByPhone(crmTargetRewardMember.phone);
    const selectedMember = await this.posCrmPage.readRedeemOrderMember();
    const selectedPoints = await this.posCrmPage.readRedeemOrderPoints();
    await this.orderDishesPage.addMenuItem(groupSwitchDish.name);
    await this.orderDishesPage.saveOrder();
    await this.homePage.clickRecall();
    await this.recallPage.openRecentOrder();
    const header = await this.recallPage.readCrmOrderHeaderInfo();
    return {
      selectedMember,
      selectedPoints,
      recallMember: header.orderMember,
      recallPoints: header.orderPoints,
    };
  }
}
