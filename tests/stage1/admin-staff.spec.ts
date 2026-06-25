import { expect, test } from '../../fixtures/base-test.js';
import { StaffPermissionFlow } from '../../flows/pos/staff-permission.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
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
});
