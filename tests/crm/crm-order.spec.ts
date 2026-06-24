import type { Page } from '@playwright/test';

import { StubCrmMemberClient } from '../../clients/crm/member.client.js';
import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmOrderFlow } from '../../flows/crm/crm-order.flow.js';
import { DeliveryPage } from '../../pages/pos/delivery.page.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { test, expect } from '../../fixtures/base-test.js';

test.describe('CRM 订单会员', () => {
  test('点单页 Redeem 新建 Phone 会员保存订单后应能在 Member List 搜到 +1 电话', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.joinMemberByPhoneFromOrderAndSearch(environment.posHomeUrl);

    expect(result.searchEmailResult).toBe('');
    expect(result.searchPhoneResult).toBe(`+1${result.createdPhone}`);
  });

  test('Delivery 订单绑定会员保存后 Recall Header 应保留客人和会员信息', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.createDeliveryRedeemOrderAndReadRecallHeader(environment.posHomeUrl);

    expect(result.orderGuestName).toBe('pos-test');
    expect(result.orderGuestTel).toBe('(012) 345-67890');
    expect(result.orderMember).toBe(result.selectedMember);
    expect(result.orderPoints).toBe(result.selectedPoints);
    expect(result.orderGuestAddr.startsWith('menusifu-test')).toBe(true);
  });

  test('订单移除会员后重新选择会员保存 Recall Header 应使用新会员', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.removeMemberReselectAndReadRecallHeader(environment.posHomeUrl);

    expect(result.selectedMember).toBe(result.recallMember);
    expect(result.selectedPoints).toBe(result.recallPoints);
  });

  test('带 Redeem Item 的订单 Recall 编辑时会员和兑换操作应被禁用', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const disabledControls = await crmOrderFlow.createRedeemItemOrderAndReadEditDisabledControls(environment.posHomeUrl);

    expect(disabledControls.removeMember).toContain('disabled');
    expect(disabledControls.redeemItem).toContain('disabled');
    expect(disabledControls.redeemDiscount).toContain('disabled');
    expect(disabledControls.redeemCredit).toContain('disabled');
  });

  test('结算页 Add New Loyalty 新建 Email 会员支付后应能在 Member List 搜到 Email', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.settleJoinMemberByEmailAndSearch(environment.posHomeUrl);

    expect(result.searchPhoneResult).toBe('');
    expect(result.searchEmailResult).toBe(result.createdEmail);
  });

  test('Admin Member List 查到的会员名称和积分应与点单页 Redeem 选择结果一致', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.compareAdminMemberLookupWithRedeemSelection(environment.posHomeUrl);

    expect(result.redeemMember).toBe(result.adminMemberName);
    expect(result.redeemPoints).toBe(result.adminPointBalance);
  });

  test('订单使用 Redeem Item 后进入结算页应禁用 Switch Member', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const switchMemberClass = await crmOrderFlow.createRedeemItemOrderAndReadSettlementSwitchMemberState(environment.posHomeUrl);

    expect(switchMemberClass).toContain('disabled');
  });

  test('Recall 编辑删除 Redeem Discount 后应保留会员积分并移除 Reward Discount', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.createDiscountOrderEditRemoveDiscountAndReadRecall(environment.posHomeUrl);

    expect(result.orderPointsAfterEdit).toBe(result.orderPointsBeforeEdit);
    expect(result.rewardDiscountCountBeforeEdit).toBe(1);
    expect(result.rewardDiscountCountAfterEdit).toBe(0);
  });

  test('结算页 Select Member 选中会员后应显示会员信息并只开放折扣和积分兑换', async ({ environment, page }) => {
    const crmOrderFlow = createCrmOrderFlow(page);

    const result = await crmOrderFlow.selectSettlementMemberAndReadAvailableRedeems(environment.posHomeUrl);

    expect(result.selectedMember).toBe(result.settlementMember);
    expect(result.selectedPoints).toBe(result.settlementPoints);
    expect(result.redeemDiscountCount).toBe(1);
    expect(result.redeemCreditCount).toBe(1);
    expect(result.redeemItemCount).toBe(0);
  });
});

function createCrmOrderFlow(page: Page): CrmOrderFlow {
  return new CrmOrderFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new DeliveryPage(page),
    new StubCrmMemberClient(),
    new StubCrmRewardClient(),
  );
}
