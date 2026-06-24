import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { languageOptions, type LanguageOption } from '../../test-data/pos/languages.js';
import { validEmployeePassword } from '../../test-data/pos/permissions.js';

export class LanguagePreferenceFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly adminPage: AdminPage,
    private readonly orderDishesPage: OrderDishesPage,
  ) {}

  async switchChineseAndReadWelcome(homeUrl: string): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.switchLanguage(languageOptions.chinese);
    await this.homePage.refresh();
    const welcomeText = await this.homePage.readWelcomeText();
    await this.homePage.switchLanguage(languageOptions.default);
    return welcomeText;
  }

  async enterTogoWithDefaultLanguage(homeUrl: string, language: LanguageOption): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickAdmin();
    await this.adminPage.setUserDefaultLanguage(language);
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
    await this.homePage.inputEmployeePasswordWithoutSave(validEmployeePassword);
    await this.homePage.clickTogo();
    return this.orderDishesPage.readOpenFoodCategoryName();
  }
}
