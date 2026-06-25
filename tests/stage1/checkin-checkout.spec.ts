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

  test('Boss Check In 后修改工资再 Checkout 时 Attendance 应保留 check-in 工资', async ({ environment, page }) => {
    const flow = new AttendanceFlow(new PosHomePage(page), new AdminPage(page));

    const attendance = await flow.checkoutBossAfterEditingWageAndReadAttendance(environment.posHomeUrl);

    expect(attendance.wage).toBe('20');
    expect(attendance.wageType).toBe('1');
  });

  test('Staff Attendance 中修改 wage 和 wage type 后保存应保留修改值', async ({ environment, page }) => {
    const flow = new AttendanceFlow(new PosHomePage(page), new AdminPage(page));

    const attendance = await flow.checkoutBossThenEditAttendanceWageAndRead(environment.posHomeUrl);

    expect(attendance.wage).toBe('40');
    expect(attendance.wageType).toBe('4');
  });

  test('POS-43835 配置最早打卡时间后员工在允许时间内应打卡成功', {
    annotation: { type: 'issue', description: 'POS-43835' },
  }, async ({ adminSettingsClient, environment, page, staffShiftPlanClient }) => {
    const flow = new AttendanceFlow(new PosHomePage(page), new AdminPage(page));

    const clockText = await flow.checkInWithinEarliestAllowedTime(
      environment.posHomeUrl,
      adminSettingsClient,
      staffShiftPlanClient,
    );

    expect(clockText).toContain('Clocked In');
  });
});
