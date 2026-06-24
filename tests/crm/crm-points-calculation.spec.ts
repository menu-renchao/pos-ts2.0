import type { Page } from '@playwright/test';

import { StubCrmMemberClient } from '../../clients/crm/member.client.js';
import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { CrmPointsCalculationFlow } from '../../flows/crm/crm-points-calculation.flow.js';
import { test, expect } from '../../fixtures/base-test.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { crmNewMemberInitialPoints } from '../../test-data/crm/members.js';

test.describe('CRM 积分计算', () => {
  test('POS-29961 已支付会员订单 Void 后应扣除本单新增积分', async ({ environment, page }) => {
    const crmPointsCalculationFlow = createCrmPointsCalculationFlow(page);

    const result = await crmPointsCalculationFlow.voidPaidMemberOrderAndReadPoints(environment.posHomeUrl);

    expect(result.pointsAfterVoid).toBe(result.pointsAfterPayment - result.earnedPoints);
  });

  test('POS-29963 已支付会员订单 Refund 后应保留支付后积分并同步 Admin', async ({ environment, page }) => {
    const crmPointsCalculationFlow = createCrmPointsCalculationFlow(page);

    const result = await crmPointsCalculationFlow.refundPaidMemberOrderAndReadPoints(environment.posHomeUrl);

    expect(result.pointsAfterRefund).toBe(result.pointsAfterPayment);
    expect(result.adminPointsAfterRefund).toBe(result.pointsAfterPayment);
  });

  test('POS-29991 已支付会员订单应按积分规则增加本单积分', async ({ environment, page }) => {
    const crmPointsCalculationFlow = createCrmPointsCalculationFlow(page);

    const result = await crmPointsCalculationFlow.earnPointsForPaidMemberOrderAndReadPoints(environment.posHomeUrl);

    expect(result.pointsAfterPayment).toBe(result.pointsBeforePayment + result.earnedPoints);
  });

  test('POS-29330 Join Member Email 新会员应默认获得 1000 积分', async ({ environment, page }) => {
    const crmPointsCalculationFlow = createCrmPointsCalculationFlow(page);

    const result = await crmPointsCalculationFlow.joinEmailMemberAndReadInitialPoints(environment.posHomeUrl);

    expect(result.registrationVisible).toBe(true);
    expect(result.memberEmail).toBe(result.createdEmail);
    expect(result.memberPoints).toBe(crmNewMemberInitialPoints);
  });
});

function createCrmPointsCalculationFlow(page: Page): CrmPointsCalculationFlow {
  return new CrmPointsCalculationFlow(
    new PosHomePage(page),
    new OrderDishesPage(page),
    new RecallPage(page),
    new PosCrmPage(page),
    new StubCrmRewardClient(),
    new StubCrmMemberClient(),
  );
}
