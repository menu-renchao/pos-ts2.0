import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';

const posMenuProductLine = 'POS Menu';
const emenuProductLine = 'Emenu Menu';
const globalOptionGroupName = 'Global Option Group';

export class AdminMenuFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
  ) {}

  async copyPosGlobalOptionGroupToEmenuAndReadCount(homeUrl: string): Promise<number> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.clearProductItem(emenuProductLine, globalOptionGroupName);
    await this.adminPage.copyGroupToProductLine(posMenuProductLine, globalOptionGroupName, emenuProductLine);
    return this.adminPage.readGroupCategoryCount(emenuProductLine, globalOptionGroupName);
  }
}
