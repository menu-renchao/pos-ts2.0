import type { StubCrmMemberClient } from '../../clients/crm/member.client.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';

export type JoinMemberValidationResult = {
  readonly registrationVisible: boolean;
  readonly errorMessage: string;
};

export type JoinMemberSearchResult = {
  readonly registrationVisible: boolean;
  readonly createdPhone: string;
  readonly searchPhoneResult: string;
};

export type MemberListOpenResult = {
  readonly memberListVisible: boolean;
};

export type RedeemCloudSearchResult = {
  readonly memberName: string;
};

export class CrmMemberFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly posCrmPage: PosCrmPage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly crmMemberClient: StubCrmMemberClient,
  ) {}

  async validateJoinMemberRequiresPhoneOrEmail(homeUrl: string): Promise<JoinMemberValidationResult> {
    await this.openJoinMemberRegistration(homeUrl);
    const registrationVisible = await this.posCrmPage.isJoinMemberRegistrationVisible();
    await this.posCrmPage.fillJoinMemberName('test_name', 'test_name');
    await this.posCrmPage.submitJoinMember();
    const errorMessage = await this.posCrmPage.readJoinMemberError();
    return { registrationVisible, errorMessage };
  }

  async validateDuplicatePhoneRejected(homeUrl: string): Promise<JoinMemberValidationResult> {
    await this.openJoinMemberRegistration(homeUrl);
    const registrationVisible = await this.posCrmPage.isJoinMemberRegistrationVisible();
    await this.posCrmPage.fillJoinMemberPhone(this.crmMemberClient.duplicatePhoneInput());
    await this.posCrmPage.fillJoinMemberName('test_nameshfdsjfh', 'test_namesfdgdfg');
    await this.posCrmPage.submitJoinMember();
    const errorMessage = await this.posCrmPage.readJoinMemberError();
    return { registrationVisible, errorMessage };
  }

  async joinMemberByPhoneAndSearchInMemberList(homeUrl: string): Promise<JoinMemberSearchResult> {
    await this.openJoinMemberRegistration(homeUrl);
    const registrationVisible = await this.posCrmPage.isJoinMemberRegistrationVisible();
    const createdPhone = this.crmMemberClient.nextUniquePhone();
    await this.posCrmPage.fillJoinMemberPhone(createdPhone);
    await this.posCrmPage.fillJoinMemberName('test_1', 'test_1');
    await this.posCrmPage.submitJoinMember();
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.searchMember(createdPhone);
    const searchPhoneResult = await this.posCrmPage.readMemberSearchPhoneResult();
    return { registrationVisible, createdPhone, searchPhoneResult };
  }

  async openMemberListWithPermission(homeUrl: string): Promise<MemberListOpenResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.switchLanguage('Default');
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    return { memberListVisible: await this.posCrmPage.isMemberListVisible() };
  }

  async openMemberListWithManagerOverride(homeUrl: string, managerPassword: string): Promise<MemberListOpenResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
    await this.homePage.inputEmployeePassword('123');
    await this.homePage.clickAdmin();
    await this.posCrmPage.openMemberListFromAdmin();
    await this.posCrmPage.submitMemberListPermissionPassword(managerPassword);
    return { memberListVisible: await this.posCrmPage.isMemberListVisible() };
  }

  async searchRedeemPhoneFindsCloudMemberOnly(homeUrl: string): Promise<RedeemCloudSearchResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDineIn();
    await this.posCrmPage.openRedeem();
    const expectedCloudMember = this.crmMemberClient.findCloudMemberByPhone(this.crmMemberClient.cloudMemberSearchPhone());
    const memberName = await this.posCrmPage.searchRedeemMemberByPhone(this.crmMemberClient.cloudMemberSearchPhone());
    await this.orderDishesPage.exitOrderPage();
    if (memberName !== expectedCloudMember.displayName) {
      throw new Error(`Expected cloud member ${expectedCloudMember.displayName}, got ${memberName}`);
    }
    return { memberName };
  }

  private async openJoinMemberRegistration(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.switchLanguage('Default');
    await this.posCrmPage.openJoinMemberRegistration();
  }
}
