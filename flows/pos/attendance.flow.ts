import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
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
      await this.homePage.inputEmployeePassword(staffDiscountRoleSamples.boss.password);

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
}
