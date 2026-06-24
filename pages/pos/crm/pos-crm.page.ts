import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../../utils/step.js';
import { PageObject } from '../../shared/page-object.js';

export class PosCrmPage extends PageObject {
  private readonly memberName: Locator;
  private readonly memberOption: Locator;
  private readonly memberSearchInput: Locator;
  private readonly pointBalance: Locator;
  private readonly redeemButton: Locator;
  private readonly redeemDiscountButton: Locator;
  private readonly redeemItemButton: Locator;
  private readonly redeemItemOptionButton: Locator;
  private readonly redeemPanel: Locator;
  private readonly redeemQuitButton: Locator;
  private readonly redeemSplitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.memberName = page.getByTestId('crm-member-name');
    this.memberOption = page.getByTestId('crm-member-option');
    this.memberSearchInput = page.getByTestId('crm-member-search');
    this.pointBalance = page.getByTestId('crm-point-balance');
    this.redeemButton = page.getByTestId('crm-redeem');
    this.redeemDiscountButton = page.getByTestId('crm-redeem-discount');
    this.redeemItemButton = page.getByTestId('crm-redeem-item');
    this.redeemItemOptionButton = page.getByTestId('crm-redeem-item-option');
    this.redeemPanel = page.getByTestId('crm-redeem-panel');
    this.redeemQuitButton = page.getByTestId('crm-redeem-quit');
    this.redeemSplitButton = page.getByTestId('crm-redeem-split');
  }

  async openRedeem(): Promise<void> {
    await step('打开 CRM Redeem 面板', async () => {
      await this.redeemButton.click();
      await expect(this.redeemPanel).toBeVisible();
    });
  }

  async selectMemberByPhone(phone: string): Promise<void> {
    await step(`选择 CRM 会员 ${phone}`, async () => {
      await this.memberSearchInput.fill(phone);
      await this.memberOption.click();
      await expect(this.memberName).toBeVisible();
    });
  }

  async applyRedeemDiscount(discountName: string): Promise<void> {
    await step(`兑换 CRM 折扣 ${discountName}`, async () => {
      await this.redeemDiscountButton.click();
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
}
