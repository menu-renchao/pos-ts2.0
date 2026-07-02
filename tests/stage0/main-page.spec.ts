import { test, expect } from '../../fixtures/base-test.js';
import { DeliveryFlow } from '../../flows/pos/delivery.flow.js';
import { HomeFunctionLayoutFlow } from '../../flows/pos/home-function-layout.flow.js';
import { LanguagePreferenceFlow } from '../../flows/pos/language-preference.flow.js';
import { PosEntryFlow } from '../../flows/pos/pos-entry.flow.js';
import { ReservationFlow } from '../../flows/pos/reservation.flow.js';
import { ReportingFlow } from '../../flows/pos/reporting.flow.js';
import { SdiMessageFlow } from '../../flows/pos/sdi-message.flow.js';
import { StaffClockFlow } from '../../flows/pos/staff-clock.flow.js';
import { SupportInfoFlow } from '../../flows/pos/support-info.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { DeliveryPage } from '../../pages/pos/delivery.page.js';
import { MessageCenterPage } from '../../pages/pos/message-center.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { ReportPage } from '../../pages/pos/report.page.js';
import { ReservationPage } from '../../pages/pos/reservation.page.js';
import { SupportPage } from '../../pages/pos/support.page.js';
import { homeFunctions, sessionMoveError } from '../../test-data/pos/home-functions.js';
import { deliveryAddressSample } from '../../test-data/pos/delivery.js';
import { languageOptions } from '../../test-data/pos/languages.js';
import { sdiOrderMessageSample } from '../../test-data/pos/messages.js';
import { supportInfoFor } from '../../test-data/pos/support-info.js';
import { invalidEmployeePassword, validEmployeePassword } from '../../test-data/pos/permissions.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('POS 首页', () => {
  test('输入错误员工密码后应提示失败并清空密码框', async ({ environment, page }) => {
    const homePage = new PosHomePage(page);
    const posEntryFlow = new PosEntryFlow(homePage);

    const result = await posEntryFlow.rejectWrongPassword(environment.posHomeUrl, invalidEmployeePassword);

    expect(result.message).toContain('Failed to login');
    expect(result.passwordValue).toBe('');

    await posEntryFlow.enterWithEmployeePassword(environment.posHomeUrl, validEmployeePassword);
    await expect(homePage.togoButton).toBeVisible();
  });

  test('编辑首页功能卡保存后应将 Admin 移到主页面', {
    annotation: [jiraIssue('POS-15352')],
  }, async ({ environment, page }) => {
    const homeFunctionLayoutFlow = new HomeFunctionLayoutFlow(new PosHomePage(page));

    const cardNames = await homeFunctionLayoutFlow.moveFunctionToMainAndSave(
      environment.posHomeUrl,
      homeFunctions.admin,
      homeFunctions.drawer,
    );

    expect(cardNames).toContain(homeFunctions.admin);
    expect(cardNames).not.toContain(homeFunctions.drawer);
  });

  test('编辑首页功能卡保存后应切换 Dine In 和 To Go 首位顺序', {
    annotation: [jiraIssue('POS-15514')],
  }, async ({ environment, page }) => {
    const homeFunctionLayoutFlow = new HomeFunctionLayoutFlow(new PosHomePage(page));

    const result = await homeFunctionLayoutFlow.swapDineInAndTogo(environment.posHomeUrl);

    expect(result.firstAfterSwap).toBe(homeFunctions.toGo);
    expect(result.firstAfterRestore).toBe(homeFunctions.dineIn);
  });

  test('编辑首页功能卡不保存时 Admin 不应出现在主页面', {
    annotation: [jiraIssue('POS-15514')],
  }, async ({ environment, page }) => {
    const homeFunctionLayoutFlow = new HomeFunctionLayoutFlow(new PosHomePage(page));

    const cardNames = await homeFunctionLayoutFlow.previewMoveFunctionWithoutSaving(
      environment.posHomeUrl,
      homeFunctions.admin,
      homeFunctions.drawer,
    );

    expect(cardNames).not.toContain(homeFunctions.admin);
    expect(cardNames).toContain(homeFunctions.drawer);
  });

  test('营业周期按钮不允许从隐藏区移动到主页面', {
    annotation: [jiraIssue('POS-15521')],
  }, async ({ environment, page }) => {
    const homeFunctionLayoutFlow = new HomeFunctionLayoutFlow(new PosHomePage(page));

    const alertText = await homeFunctionLayoutFlow.rejectMoveSessionToMain(environment.posHomeUrl);

    expect(alertText).toBe(sessionMoveError);
  });

  test('营业周期按钮不允许从隐藏区移动到更多区', {
    annotation: [jiraIssue('POS-15524')],
  }, async ({ environment, page }) => {
    const homeFunctionLayoutFlow = new HomeFunctionLayoutFlow(new PosHomePage(page));

    const alertText = await homeFunctionLayoutFlow.rejectMoveSessionToMore(environment.posHomeUrl);

    expect(alertText).toBe(sessionMoveError);
  });

  test('中文模式刷新后首页仍展示中文欢迎语', {
    annotation: [jiraIssue('POS-36245')],
  }, async ({ environment, page }) => {
    const languagePreferenceFlow = new LanguagePreferenceFlow(
      new PosHomePage(page),
      new AdminPage(page),
      new OrderDishesPage(page),
    );

    const welcomeText = await languagePreferenceFlow.switchChineseAndReadWelcome(environment.posHomeUrl);

    expect(welcomeText).toContain('欢迎您');
  });

  test('账号默认中文时未保存登录密码进入 To Go 应展示中文菜品分类', {
    annotation: [jiraIssue('POS-36304')],
  }, async ({ environment, page }) => {
    const languagePreferenceFlow = new LanguagePreferenceFlow(
      new PosHomePage(page),
      new AdminPage(page),
      new OrderDishesPage(page),
    );

    const openFoodText = await languagePreferenceFlow.enterTogoWithDefaultLanguage(
      environment.posHomeUrl,
      languageOptions.chinese,
    );

    expect(openFoodText.replace('\nauto_fix', '')).toBe('自定义菜');
  });

  test('未登录员工可打卡上班休息返回工作并下班', {
    annotation: [jiraIssue('POS-34070')],
  }, async ({ environment, page }) => {
    const staffClockFlow = new StaffClockFlow(new PosHomePage(page));

    const result = await staffClockFlow.clockInBreakBackToWorkAndCheckout(environment.posHomeUrl);

    expect(result.clockedInText).toContain('Clocked In');
    expect(result.clockedInText).toContain('at');
    expect(result.clockedInText).toMatch(/\d{1,2}:\d{2}(AM|PM)/);
    expect(result.onBreakText).toContain('On Break');
    expect(result.onBreakText).toContain('from');
    expect(result.onBreakText).toMatch(/\d{1,2}:\d{2}(AM|PM)/);
  });

  test('新增预约后可更新状态为 Arrived', {
    annotation: [jiraIssue('POS-15422')],
  }, async ({ environment, page }) => {
    const reservationFlow = new ReservationFlow(new PosHomePage(page), new ReservationPage(page));

    const status = await reservationFlow.createReservationAndMarkArrived(environment.posHomeUrl);

    expect(status).toBe('Arrived');
  });

  test('新增预约后入座应在非活跃列表展示 Seated', {
    annotation: [jiraIssue('POS-15428')],
  }, async ({ environment, page }) => {
    const reservationFlow = new ReservationFlow(new PosHomePage(page), new ReservationPage(page));

    const status = await reservationFlow.createReservationAndMarkSeated(environment.posHomeUrl);

    expect(status).toBe('Seated');
  });

  test('预约历史可按电话号码查询', {
    annotation: [jiraIssue('POS-15432')],
  }, async ({ environment, page }) => {
    const reservationFlow = new ReservationFlow(new PosHomePage(page), new ReservationPage(page));

    const result = await reservationFlow.searchReservationHistoryByPhone(environment.posHomeUrl);

    expect(result.historyRows.length).toBeGreaterThan(0);
    for (const row of result.historyRows) {
      expect(row.phone).toContain(result.phone);
    }
  });

  test('首页点击报表并输入外接键盘密码后应进入报表页面', {
    annotation: [jiraIssue('POS-33792')],
  }, async ({ environment, page }) => {
    const reportingFlow = new ReportingFlow(new PosHomePage(page), new ReportPage(page));

    const isInReportPage = await reportingFlow.enterReportWithKeyboardPassword(
      environment.posHomeUrl,
      validEmployeePassword,
    );

    expect(isInReportPage).toBe(true);
  });

  test('首页支持信息应展示当前版本和补丁版本', {
    annotation: [jiraIssue('POS-33799')],
  }, async ({ environment, page }) => {
    const supportInfoFlow = new SupportInfoFlow(new PosHomePage(page), new SupportPage(page));

    const supportInfo = await supportInfoFlow.readPatchInfo(environment.posHomeUrl);
    const expectedSupportInfo = supportInfoFor(environment.testMode);

    expect(supportInfo.version).toBe(expectedSupportInfo.version);
    if (expectedSupportInfo.patchVersion !== undefined) {
      expect(supportInfo.patchVersion).toBe(expectedSupportInfo.patchVersion);
    }
  });

  test('Delivery 删除电话和姓名后应从历史订单切回用户列表', {
    annotation: [jiraIssue('POS-34018')],
  }, async ({ environment, page }) => {
    const deliveryFlow = new DeliveryFlow(new PosHomePage(page), new DeliveryPage(page));

    const result = await deliveryFlow.verifyPhoneAndNameDeletionReselectsCustomerList(environment.posHomeUrl);

    expect(result.initialOrderListExists).toBe(true);
    expect(result.afterPhoneDelete.orderListExists).toBe(false);
    expect(result.afterPhoneDelete.customerListExists).toBe(true);
    expect(result.afterReselectOrderListExists).toBe(true);
    expect(result.afterNameDelete.orderListExists).toBe(false);
    expect(result.afterNameDelete.customerListExists).toBe(true);
  });

  test('Delivery 输入地址关键字应关联历史订单地址', {
    annotation: [jiraIssue('POS-37847')],
  }, async ({ environment, page }) => {
    const deliveryFlow = new DeliveryFlow(new PosHomePage(page), new DeliveryPage(page));

    const result = await deliveryFlow.searchHistoricalOrderByAddress(environment.posHomeUrl, deliveryAddressSample);

    expect(result.orderCount).toBeGreaterThan(0);
    expect(result.orderInfo).toContain(deliveryAddressSample);
  });

  test('POS 首页消息中心应展示 SDI 新订单消息并包含桌号和单号', {
    annotation: [jiraIssue('POS-44416')],
  }, async ({ environment, page }) => {
    const sdiMessageFlow = new SdiMessageFlow(new PosHomePage(page), new MessageCenterPage(page));

    const messageBody = await sdiMessageFlow.createSelfDineInOrderAndReadMessage(
      environment.posHomeUrl,
      sdiOrderMessageSample,
    );

    expect(messageBody).toContain("There's a new order for table");
    expect(messageBody).toContain(sdiOrderMessageSample.tableName);
    expect(messageBody).toContain(sdiOrderMessageSample.orderNumber);
  });
});
