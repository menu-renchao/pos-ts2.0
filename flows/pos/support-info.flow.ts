import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { SupportInfo, SupportPage } from '../../pages/pos/support.page.js';

export class SupportInfoFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly supportPage: SupportPage,
  ) {}

  async readPatchInfo(homeUrl: string): Promise<SupportInfo> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickSupport();
    return this.supportPage.readSupportInfo();
  }
}
