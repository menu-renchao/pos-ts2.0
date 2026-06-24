import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../../utils/step.js';
import { PageObject } from '../../shared/page-object.js';

export class PosCrmPage extends PageObject {
  private readonly adminMemberListButton: Locator;
  private readonly joinFirstNameInput: Locator;
  private readonly joinLastNameInput: Locator;
  private readonly joinMemberButton: Locator;
  private readonly joinMemberEmailInput: Locator;
  private readonly joinMemberError: Locator;
  private readonly joinMemberPhoneInput: Locator;
  private readonly joinMemberRegistrationBox: Locator;
  private readonly joinMemberSaveButton: Locator;
  private readonly memberList: Locator;
  private readonly memberListPermissionInput: Locator;
  private readonly memberListPermissionSubmitButton: Locator;
  private readonly memberListSearchInput: Locator;
  private readonly memberSearchNameResult: Locator;
  private readonly memberSearchPointResult: Locator;
  private readonly memberSearchPhoneResult: Locator;
  private readonly memberName: Locator;
  private readonly memberOption: Locator;
  private readonly redeemMemberSearchInput: Locator;
  private readonly pointBalance: Locator;
  private readonly redeemButton: Locator;
  private readonly redeemAmount10Button: Locator;
  private readonly redeemDiscount20Button: Locator;
  private readonly redeemDiscount30Button: Locator;
  private readonly redeemDiscountButton: Locator;
  private readonly redeemDiscountOptions: Locator;
  private readonly redeemCreditButton: Locator;
  private readonly redeemDeleteButton: Locator;
  private readonly redeemItemButton: Locator;
  private readonly redeemItemOptionButton: Locator;
  private readonly redeemPanel: Locator;
  private readonly redeemQuitButton: Locator;
  private readonly redeemRemoveMemberButton: Locator;
  private readonly redeemAddNewLoyaltyButton: Locator;
  private readonly redeemSplitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.adminMemberListButton = page.getByTestId('admin-member-list');
    this.joinFirstNameInput = page.getByTestId('join-member-first-name');
    this.joinLastNameInput = page.getByTestId('join-member-last-name');
    this.joinMemberButton = page.getByTestId('home-join-member');
    this.joinMemberEmailInput = page.getByTestId('join-member-email');
    this.joinMemberError = page.getByTestId('join-member-error');
    this.joinMemberPhoneInput = page.getByTestId('join-member-phone');
    this.joinMemberRegistrationBox = page.getByTestId('join-member-registration');
    this.joinMemberSaveButton = page.getByTestId('join-member-save');
    this.memberList = page.getByTestId('crm-member-list');
    this.memberListPermissionInput = page.getByTestId('member-list-permission-password');
    this.memberListPermissionSubmitButton = page.getByTestId('member-list-permission-submit');
    this.memberListSearchInput = page.getByTestId('crm-member-list-search');
    this.memberSearchNameResult = page.getByTestId('crm-member-search-name-result');
    this.memberSearchPointResult = page.getByTestId('crm-member-search-point-result');
    this.memberSearchPhoneResult = page.getByTestId('crm-member-search-phone-result');
    this.memberName = page.getByTestId('crm-member-name');
    this.memberOption = page.getByTestId('crm-member-option');
    this.redeemMemberSearchInput = page.getByTestId('crm-member-search');
    this.pointBalance = page.getByTestId('crm-point-balance');
    this.redeemButton = page.getByTestId('crm-redeem');
    this.redeemAmount10Button = page.getByTestId('crm-redeem-amount-10');
    this.redeemCreditButton = page.getByTestId('crm-redeem-credit');
    this.redeemDeleteButton = page.getByTestId('crm-redeem-delete');
    this.redeemDiscount20Button = page.getByTestId('crm-redeem-discount-20');
    this.redeemDiscount30Button = page.getByTestId('crm-redeem-discount-30');
    this.redeemDiscountButton = page.getByTestId('crm-redeem-discount');
    this.redeemDiscountOptions = page.getByTestId('crm-redeem-discount-option');
    this.redeemItemButton = page.getByTestId('crm-redeem-item');
    this.redeemItemOptionButton = page.getByTestId('crm-redeem-item-option');
    this.redeemPanel = page.getByTestId('crm-redeem-panel');
    this.redeemQuitButton = page.getByTestId('crm-redeem-quit');
    this.redeemRemoveMemberButton = page.getByTestId('crm-remove-member');
    this.redeemAddNewLoyaltyButton = page.getByTestId('crm-redeem-add-new-loyalty');
    this.redeemSplitButton = page.getByTestId('crm-redeem-split');
  }

  async openRedeem(): Promise<void> {
    await step('打开 CRM Redeem 面板', async () => {
      await this.redeemButton.click();
      await expect(this.redeemPanel).toBeVisible();
    });
  }

  async openJoinMemberRegistration(): Promise<void> {
    await step('打开 Join Member 注册弹框', async () => {
      await this.joinMemberButton.click();
      await expect(this.joinMemberRegistrationBox).toBeVisible();
    });
  }

  async isJoinMemberRegistrationVisible(): Promise<boolean> {
    return step('判断 Join Member 注册弹框是否展示', async () => this.joinMemberRegistrationBox.isVisible());
  }

  async fillJoinMemberName(firstName: string, lastName: string): Promise<void> {
    await step('填写 Join Member 姓名', async () => {
      await this.joinFirstNameInput.fill(firstName);
      await this.joinLastNameInput.fill(lastName);
    });
  }

  async fillJoinMemberPhone(phone: string): Promise<void> {
    await step(`填写 Join Member 电话 ${phone}`, async () => {
      await this.joinMemberPhoneInput.fill(phone);
    });
  }

  async fillJoinMemberEmail(email: string): Promise<void> {
    await step(`填写 Join Member Email ${email}`, async () => {
      await this.joinMemberEmailInput.fill(email);
    });
  }

  async submitJoinMember(): Promise<void> {
    await step('保存 Join Member 注册信息', async () => {
      await this.joinMemberSaveButton.click();
    });
  }

  async readJoinMemberError(): Promise<string> {
    return step('读取 Join Member 注册失败原因', async () => ((await this.joinMemberError.textContent()) ?? '').trim());
  }

  async selectMemberByPhone(phone: string): Promise<void> {
    await step(`选择 CRM 会员 ${phone}`, async () => {
      await this.redeemMemberSearchInput.fill(phone);
      await this.memberOption.click();
      await expect(this.memberName).toBeVisible();
    });
  }

  async openAddNewLoyaltyFromRedeem(): Promise<void> {
    await step('从 Redeem 面板打开新增会员', async () => {
      await this.redeemAddNewLoyaltyButton.click();
      await expect(this.joinMemberRegistrationBox).toBeVisible();
    });
  }

  async removeRedeemMember(): Promise<void> {
    await step('移除当前 Redeem 会员', async () => {
      await this.redeemRemoveMemberButton.click();
    });
  }

  async readRedeemOrderPoints(): Promise<string> {
    return step('读取订单 Redeem 积分', async () => ((await this.pointBalance.textContent()) ?? '').trim());
  }

  async readRedeemOrderMember(): Promise<string> {
    return this.readMemberName();
  }

  async readMemberSearchEmailResult(): Promise<string> {
    return step('读取 CRM Member List Email 搜索结果', async () =>
      ((await this.page.getByTestId('crm-member-search-email-result').textContent()) ?? '').trim(),
    );
  }

  async readMemberSearchNameResult(): Promise<string> {
    return step('读取 CRM Member List 姓名搜索结果', async () =>
      ((await this.memberSearchNameResult.textContent()) ?? '').trim(),
    );
  }

  async readMemberSearchPointResult(): Promise<string> {
    return step('读取 CRM Member List 积分搜索结果', async () =>
      ((await this.memberSearchPointResult.textContent()) ?? '').trim(),
    );
  }

  async readRedeemEditDisabledControlClasses(): Promise<{
    removeMember: string;
    redeemItem: string;
    redeemDiscount: string;
    redeemCredit: string;
  }> {
    return step('读取 Redeem 编辑限制控件 class', async () => ({
      removeMember: (await this.redeemRemoveMemberButton.getAttribute('class')) ?? '',
      redeemItem: (await this.redeemItemButton.getAttribute('class')) ?? '',
      redeemDiscount: (await this.redeemDiscountButton.getAttribute('class')) ?? '',
      redeemCredit: (await this.redeemCreditButton.getAttribute('class')) ?? '',
    }));
  }

  async removeRedeemDiscount(): Promise<void> {
    await step('删除当前 Redeem Discount', async () => {
      await this.redeemDeleteButton.click();
    });
  }

  async readAvailableRedeemControlCounts(): Promise<{
    redeemDiscountCount: number;
    redeemCreditCount: number;
    redeemItemCount: number;
  }> {
    return step('读取可用 Redeem 操作数量', async () => ({
      redeemDiscountCount: await this.countAvailableControl(this.redeemDiscountButton),
      redeemCreditCount: await this.countAvailableControl(this.redeemCreditButton),
      redeemItemCount: await this.countAvailableControl(this.redeemItemButton),
    }));
  }

  async searchRedeemMemberByPhone(phone: string): Promise<string> {
    return step(`Redeem 按电话搜索会员 ${phone}`, async () => {
      await this.redeemMemberSearchInput.fill(phone);
      await this.memberOption.click();
      return this.readMemberName();
    });
  }

  async applyRedeemDiscount(discountName: string): Promise<void> {
    await step(`兑换 CRM 折扣 ${discountName}`, async () => {
      if (discountName === '20% Off') {
        await this.redeemDiscount20Button.click();
        return;
      }
      if (discountName === '30% Off') {
        await this.redeemDiscount30Button.click();
        return;
      }
      await this.redeemDiscountButton.click();
    });
  }

  async readRedeemDiscountOptions(): Promise<string[]> {
    return step('读取 Redeem Discount 可选规则', async () =>
      (await this.redeemDiscountOptions.allTextContents()).map((option) => option.trim()).filter(Boolean),
    );
  }

  async applyRedeemAmount(redeemAmount: string): Promise<void> {
    await step(`兑换 CRM 固定金额 ${redeemAmount}`, async () => {
      await this.redeemAmount10Button.click();
    });
  }

  async applyRedeemItem(itemName: string): Promise<void> {
    await step(`兑换 CRM 赠菜 ${itemName}`, async () => {
      await this.redeemItemOptionButton.click();
      await this.redeemItemButton.click();
    });
  }

  async quitRedeem(): Promise<void> {
    await step('退出 CRM Redeem 面板', async () => {
      await this.redeemQuitButton.click();
    });
  }

  async openRedeemSplit(): Promise<void> {
    await step('从 CRM Redeem 订单打开分单', async () => {
      await this.redeemButton.click();
      await expect(this.redeemPanel).toBeVisible();
      await this.redeemSplitButton.click();
    });
  }

  async readHeaderPointBalance(): Promise<number> {
    return step('读取 CRM Header 积分余额', async () => Number((await this.pointBalance.textContent()) ?? '0'));
  }

  async readMemberName(): Promise<string> {
    return step('读取 CRM 会员名称', async () => ((await this.memberName.textContent()) ?? '').trim());
  }

  async openMemberListFromAdmin(): Promise<void> {
    await step('从 Admin 打开 CRM Loyalty Member List', async () => {
      await this.adminMemberListButton.click();
    });
  }

  async submitMemberListPermissionPassword(password: string): Promise<void> {
    await step('输入 Member List 权限密码', async () => {
      await this.memberListPermissionInput.fill(password);
      await this.memberListPermissionSubmitButton.click();
      await expect(this.memberList).toBeVisible();
    });
  }

  async isMemberListVisible(): Promise<boolean> {
    return step('判断 CRM Member List 是否展示', async () => this.memberList.isVisible());
  }

  async searchMember(member: string): Promise<void> {
    await step(`在 CRM Member List 搜索 ${member}`, async () => {
      await this.memberListSearchInput.fill(member);
    });
  }

  async readMemberSearchPhoneResult(): Promise<string> {
    return step('读取 CRM Member List 电话搜索结果', async () => ((await this.memberSearchPhoneResult.textContent()) ?? '').trim());
  }

  private async countAvailableControl(locator: Locator): Promise<number> {
    if (!(await locator.isVisible())) {
      return 0;
    }
    if (await locator.isDisabled()) {
      return 0;
    }
    return 1;
  }
}
