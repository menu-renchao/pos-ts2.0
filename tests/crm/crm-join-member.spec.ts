import type { Page } from '@playwright/test';

import { StubCrmMemberClient } from '../../clients/crm/member.client.js';
import { CrmMemberFlow } from '../../flows/crm/crm-member.flow.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { test, expect } from '../../fixtures/base-test.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('CRM Join Member', () => {
  test('Join Member 仅填写 First Name 和 Last Name 时应提示至少需要 Phone 或 Email', async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.validateJoinMemberRequiresPhoneOrEmail(environment.posHomeUrl);

    expect(result.registrationVisible).toBe(true);
    expect(result.errorMessage).toBe('At least one phone and email is required');
  });

  test('Join Member 输入已存在 Phone 时应提示 Phone 或 Email 已注册', async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.validateDuplicatePhoneRejected(environment.posHomeUrl);

    expect(result.registrationVisible).toBe(true);
    expect(result.errorMessage).toBe('Phone or email already be registered.');
  });

  test('Join Member 仅输入 Phone 和姓名保存后应能在 Member List 搜到 +1 电话', async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.joinMemberByPhoneAndSearchInMemberList(environment.posHomeUrl);

    expect(result.registrationVisible).toBe(true);
    expect(result.searchPhoneResult).toBe(`+1${result.createdPhone}`);
  });

  test('有权限用户点击 CRM Loyalty 应正常进入 Member List 页面', async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.openMemberListWithPermission(environment.posHomeUrl);

    expect(result.memberListVisible).toBe(true);
  });

  test('无权限用户输入有权限密码后应正常进入 Member List 页面', async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.openMemberListWithManagerOverride(environment.posHomeUrl, '11');

    expect(result.memberListVisible).toBe(true);
  });

  test('Redeem 按 Phone 搜索应只返回云端会员', {
    annotation: [jiraIssue('POS-37879')],
  }, async ({ environment, page }) => {
    const crmMemberFlow = createCrmMemberFlow(page);

    const result = await crmMemberFlow.searchRedeemPhoneFindsCloudMemberOnly(environment.posHomeUrl);

    expect(result.memberName).toBe('cloud member');
  });
});

function createCrmMemberFlow(page: Page): CrmMemberFlow {
  return new CrmMemberFlow(
    new PosHomePage(page),
    new PosCrmPage(page),
    new OrderDishesPage(page),
    new StubCrmMemberClient(),
  );
}
