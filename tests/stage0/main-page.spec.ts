import { test, expect } from '../../fixtures/base-test.js';
import { HomeFunctionLayoutFlow } from '../../flows/pos/home-function-layout.flow.js';
import { LanguagePreferenceFlow } from '../../flows/pos/language-preference.flow.js';
import { PosEntryFlow } from '../../flows/pos/pos-entry.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { homeFunctions, sessionMoveError } from '../../test-data/pos/home-functions.js';
import { languageOptions } from '../../test-data/pos/languages.js';
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
});
