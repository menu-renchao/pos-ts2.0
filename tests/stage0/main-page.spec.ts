import { test, expect } from '../../fixtures/base-test.js';
import { PosEntryFlow } from '../../flows/pos/pos-entry.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { invalidEmployeePassword, validEmployeePassword } from '../../test-data/pos/permissions.js';

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
});
