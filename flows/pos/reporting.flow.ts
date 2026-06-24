import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { ReportPage } from '../../pages/pos/report.page.js';

export class ReportingFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly reportPage: ReportPage,
  ) {}

  async enterReportWithKeyboardPassword(homeUrl: string, password: string): Promise<boolean> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickReport();
    await this.reportPage.inputPasswordInPopup(password);
    return this.reportPage.isInReportPage();
  }
}
