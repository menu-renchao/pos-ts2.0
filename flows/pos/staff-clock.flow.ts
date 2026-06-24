import type { PosHomePage } from '../../pages/pos/home.page.js';
import { validEmployeePassword } from '../../test-data/pos/permissions.js';

export type StaffClockResult = {
  clockedInText: string;
  onBreakText: string;
};

export class StaffClockFlow {
  constructor(private readonly homePage: PosHomePage) {}

  async clockInBreakBackToWorkAndCheckout(homeUrl: string): Promise<StaffClockResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.logout();

    await this.homePage.openCheckIn();
    const clockedInText = await this.homePage.readClockText();

    await this.homePage.openCheckIn();
    await this.homePage.clickBreakButton();
    const onBreakText = await this.homePage.readClockText();

    await this.homePage.openCheckIn();
    await this.homePage.clickBackToWorkButton();

    await this.homePage.openCheckIn();
    await this.homePage.clickCheckoutButton();
    await this.homePage.inputEmployeePassword(validEmployeePassword);

    return { clockedInText, onBreakText };
  }
}
