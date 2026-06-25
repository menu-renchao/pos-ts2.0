import { expect, test } from '../../fixtures/base-test.js';
import { StaffPermissionFlow } from '../../flows/pos/staff-permission.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { ReportPage } from '../../pages/pos/report.page.js';
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

  test(
    'POS-31552 Recall 提交超出 Server 权限的固定金额整单折扣后取消授权应保持原价',
    {
      annotation: jiraIssue('POS-31552'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page), new RecallPage(page));

      const result = await flow.cancelRecallWholeOrderAmountDiscountAboveServerLimit(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.totalAfterCancel).toBeCloseTo(result.originalTotal, 2);
    },
  );

  test(
    'POS-31553 Recall 提交 60% 固定金额整单折扣时 Manager 权限不足且 Boss 密码应授权成功',
    {
      annotation: jiraIssue('POS-31553'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page), new RecallPage(page));

      const result = await flow.applyRecallWholeOrderAmountDiscountAboveManagerLimitWithBossPassword(
        environment.posHomeUrl,
      );

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.managerDeniedTip).toContain('No Permission!');
      expect(result.originalTotal - result.totalAfterDiscount).toBeCloseTo(result.originalTotal * 0.6, 2);
    },
  );

  test(
    'POS-31563 Server 已授权 30% 整单折扣后再提交 10% 单菜折扣应再次提示超权限',
    {
      annotation: jiraIssue('POS-31563'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.requirePermissionForItemDiscountAfterBossAuthorizedWholeOrderDiscount(
        environment.posHomeUrl,
      );

      expect(result.wholeOrderPermissionTip).toContain('The discount exceeds permission limit，please input password');
      expect(result.itemPermissionTip).toContain('The discount exceeds permission limit，please input password');
    },
  );

  test(
    'POS-31569 Server 同时给两个单菜提交固定金额折扣超过整单额度应提示超权限',
    {
      annotation: jiraIssue('POS-31569'),
    },
    async ({ environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page));

      const result = await flow.requirePermissionForMultiItemAmountDiscount(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
    },
  );

  test(
    'POS-31576 Server 最大折扣为 0 时提交 0.1% 整单折扣应提示超权限',
    {
      annotation: jiraIssue('POS-31576'),
    },
    async ({ adminStaffClient, environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page), undefined, adminStaffClient);

      const result = await flow.rejectAnyWholeOrderDiscountWhenServerLimitIsZero(environment.posHomeUrl);

      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
    },
  );

  test(
    'POS-31687 Server 已有整单和单菜折扣后再给第二个单菜固定折扣应按累计额度提示超权限',
    {
      annotation: jiraIssue('POS-31687'),
    },
    async ({ adminStaffClient, environment, page }) => {
      const flow = new StaffPermissionFlow(new PosHomePage(page), new OrderDishesPage(page), undefined, adminStaffClient);

      const result = await flow.requirePermissionForSecondItemDiscountAfterWholeOrderAndItemDiscounts(
        environment.posHomeUrl,
      );

      expect(result.wholeOrderDiscount).toBeCloseTo(-result.subtotal * 0.1, 2);
      expect(result.firstItemOriginalPrice - result.firstItemDiscountedPrice).toBeCloseTo(
        result.firstItemOriginalPrice * 0.1,
        2,
      );
      expect(result.permissionTip).toContain('The discount exceeds permission limit，please input password');
    },
  );

  test(
    'POS-33796 无 Analysis 权限员工打开后台分析报表应提示无权限且 Boss 密码可授权进入',
    {
      annotation: jiraIssue('POS-33796'),
    },
    async ({ adminStaffClient, environment, page }) => {
      const flow = new StaffPermissionFlow(
        new PosHomePage(page),
        new OrderDishesPage(page),
        undefined,
        adminStaffClient,
        new AdminPage(page),
      );

      const result = await flow.openAnalysisReportWithBossOverrideWhenStaffLacksPermission(environment.posHomeUrl);

      expect(result.permissionAlert).toContain('do not have permission ANALYSIS');
      expect(result.isInAnalysisPage).toBe(true);
    },
  );

  test(
    'POS-33771 无 View History 权限员工查看个人报表应展示当天 Staff Report 时间范围',
    {
      annotation: jiraIssue('POS-33771'),
    },
    async ({ adminStaffClient, environment, page }) => {
      const flow = new StaffPermissionFlow(
        new PosHomePage(page),
        new OrderDishesPage(page),
        undefined,
        adminStaffClient,
        undefined,
        new ReportPage(page),
      );

      const result = await flow.openTodayStaffReportWhenStaffOnlyHasPersonalReport(environment.posHomeUrl);

      expect(result.startTime).toContain(result.today);
      expect(result.endTime).toContain(result.tomorrow);
    },
  );
});
