import type { AdminSettingsClient } from '../../clients/pos-api/admin-settings.client.js';
import type { StaffShiftPlanClient } from '../../clients/pos-api/staff-shift-plan.client.js';
import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import { adminSettings } from '../../test-data/pos/admin-settings.js';
import { staffDiscountRoleSamples } from '../../test-data/pos/permissions.js';
import { step } from '../../utils/step.js';

export type AttendanceWageResult = {
  wage: string;
  wageType: string;
};

export class AttendanceFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
  ) {}

  async checkoutBossAndReadAttendanceWage(homeUrl: string): Promise<AttendanceWageResult> {
    return step('Boss Checkout 后读取 Staff Attendance 工资记录', async () => {
      await this.homePage.open(homeUrl);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickStaffName('Boss');
      await this.adminPage.inputStaffWage('20');
      await this.adminPage.selectWageType('Hourly');
      await this.adminPage.clickStaffSave();

      await this.homePage.openCheckIn();
      await this.homePage.openCheckIn();
      await this.homePage.clickCheckoutButton();
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.boss.password);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickAttendanceSearch();
      await this.adminPage.clickLastAttendance();

      return {
        wage: await this.adminPage.readAttendanceWage(),
        wageType: await this.adminPage.readAttendanceWageType(),
      };
    });
  }

  async checkoutBossAfterEditingWageAndReadAttendance(homeUrl: string): Promise<AttendanceWageResult> {
    return step('Boss Check In 后修改工资再 Checkout 并读取 Staff Attendance', async () => {
      await this.homePage.open(homeUrl);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickStaffName('Boss');
      await this.adminPage.inputStaffWage('20');
      await this.adminPage.selectWageType('Hourly');
      await this.adminPage.clickStaffSave();

      await this.homePage.openCheckIn();

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickStaffName('Boss');
      await this.adminPage.inputStaffWage('30');
      await this.adminPage.selectWageType('Weekly');
      await this.adminPage.clickStaffSave();

      await this.homePage.openCheckIn();
      await this.homePage.clickCheckoutButton();
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.boss.password);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickAttendanceSearch();
      await this.adminPage.clickLastAttendance();

      return {
        wage: await this.adminPage.readAttendanceWage(),
        wageType: await this.adminPage.readAttendanceWageType(),
      };
    });
  }

  async checkoutBossThenEditAttendanceWageAndRead(homeUrl: string): Promise<AttendanceWageResult> {
    return step('Boss Checkout 后编辑 Staff Attendance 工资并重新读取', async () => {
      await this.homePage.open(homeUrl);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickStaffName('Boss');
      await this.adminPage.inputStaffWage('20');
      await this.adminPage.selectWageType('Hourly');
      await this.adminPage.clickStaffSave();

      await this.homePage.openCheckIn();
      await this.homePage.openCheckIn();
      await this.homePage.clickCheckoutButton();
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.boss.password);

      await this.homePage.clickAdmin();
      await this.adminPage.enterStaff();
      await this.adminPage.clickAttendanceSearch();
      await this.adminPage.clickLastAttendance();
      await this.adminPage.inputAttendanceWage('40');
      await this.adminPage.selectAttendanceWageType('Monthly');
      await this.adminPage.clickAttendanceSave();

      await this.adminPage.clickAttendanceSearch();
      await this.adminPage.clickLastAttendance();

      return {
        wage: await this.adminPage.readAttendanceWage(),
        wageType: await this.adminPage.readAttendanceWageType(),
      };
    });
  }

  async checkInWithinEarliestAllowedTime(
    homeUrl: string,
    adminSettingsClient: AdminSettingsClient,
    staffShiftPlanClient: StaffShiftPlanClient,
  ): Promise<string> {
    return step('配置最早打卡时间后员工在允许时间内打卡', async () => {
      await adminSettingsClient.setSetting(adminSettings.shiftSchedule, true);
      await staffShiftPlanClient.saveShiftPlan({
        staffId: 55,
        workDayOffset: 0,
        startOffsetMinutes: 5,
        endOffsetMinutes: 5,
        earliestClockInOffset: 5,
      });

      await this.homePage.open(homeUrl);
      await this.homePage.applyOfflineShiftSchedule(
        (await adminSettingsClient.readSetting(adminSettings.shiftSchedule)) === true,
        await staffShiftPlanClient.readShiftPlans(),
      );
      await this.homePage.logoutAndLogin('123');
      await this.homePage.openCheckIn();
      const clockText = await this.homePage.readClockText();

      await this.homePage.openCheckIn();
      await this.homePage.clickCheckoutButton();
      await staffShiftPlanClient.deleteShiftPlan(55);
      await adminSettingsClient.setSetting(adminSettings.shiftSchedule, false);

      return clockText;
    });
  }
}
