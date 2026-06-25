import { expect, test } from '../../fixtures/base-test.js';
import { StaffPermissionFlow } from '../../flows/pos/staff-permission.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('stage1 admin staff migration', () => {
  test(
    'POS-31535 Server 超过整单最大折扣权限且空密码确认应提示失败',
    {
      annotation: jiraIssue('POS-31535'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.rejectWholeOrderDiscountAboveServerLimitWithoutPassword(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.failedLoginTip).toContain('Failed to login');
    },
  );

  test(
    'POS-31537 Server 超过整单最大折扣权限后输入 Manager 密码应应用 30% 折扣',
    {
      annotation: jiraIssue('POS-31537'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.applyWholeOrderDiscountAboveServerLimitWithManagerPassword(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.discount).toBeCloseTo(-result.subtotal * 0.3, 2);
    },
  );

  test(
    'POS-31539 Server 提交 60% 整单折扣时 Manager 权限不足且 Boss 密码应授权成功',
    {
      annotation: jiraIssue('POS-31539'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.applyWholeOrderDiscountAboveManagerLimitWithBossPassword(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.managerDeniedTip).toContain('No Permission!');
      expect(result.discount).toBeCloseTo(-result.subtotal * 0.6, 2);
    },
  );

  test(
    'POS-31542 Server 提交 60% 单菜折扣后输入 Manager 密码应授权成功',
    {
      annotation: jiraIssue('POS-31542'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.applyItemDiscountAboveServerLimitWithManagerPassword(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.originalPrice - result.discountedPrice).toBeCloseTo(result.originalPrice * 0.6, 2);
    },
  );

  test(
    'POS-31544 Server 提交 85% 单菜折扣时 Manager 权限不足且 Boss 密码应授权成功',
    {
      annotation: jiraIssue('POS-31544'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.applyItemDiscountAboveManagerLimitWithBossPassword(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.managerDeniedTip).toContain('No Permission!');
      expect(result.originalPrice - result.discountedPrice).toBeCloseTo(result.originalPrice * 0.85, 2);
    },
  );

  test(
    'POS-31549 Recall 提交超出 Server 权限的固定金额整单折扣且空密码确认应提示失败',
    {
      annotation: jiraIssue('POS-31549'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page), new RecallPage(page));

      const result = await flow.rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword(
        environment.posHomeUrl,
      );

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.failedLoginTip).toContain('Failed to login');
    },
  );
});
