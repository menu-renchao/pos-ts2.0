import { expect, test } from '../../fixtures/base-test.js';
import { AttendanceFlow } from '../../flows/pos/attendance.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';

test.describe('stage1 check-in checkout migration', () => {
  test('Boss Checkout 后 Staff Attendance 应记录 check-in 时工资和 Hourly 类型', async ({ environment, page }) => {
    const flow = new AttendanceFlow(new PosHomePage(page), new AdminPage(page));

    const attendance = await flow.checkoutBossAndReadAttendanceWage(environment.posHomeUrl);

    expect(attendance.wage).toBe('20');
    expect(attendance.wageType).toBe('1');
  });
});
