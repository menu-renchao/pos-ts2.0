import type { CashInOutPage } from '../../pages/pos/cash/cash-in-out.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import { step } from '../../utils/step.js';

export class CashDrawerFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly cashInOutPage: CashInOutPage,
  ) {}

  async openCashInChinesePage(homeUrl: string): Promise<string> {
    return step('中文模式进入 Cash In/Out 并读取 Cash In 文案', async () => {
      await this.homePage.open(homeUrl);
      await this.homePage.switchLanguage('Chinese');
      await this.homePage.openCashInOut('11');
      return this.cashInOutPage.readPageText();
    });
  }
}
