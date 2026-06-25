import type { AdminSettingsClient } from '../../clients/pos-api/admin-settings.client.js';
import type { MenuClient, MenuDishAvailability } from '../../clients/pos-api/menu.client.js';
import { posLicenseTypes, type RestaurantClient } from '../../clients/pos-api/restaurant.client.js';
import type { KioskHomePage } from '../../pages/kiosk/home.page.js';
import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { adminSettings } from '../../test-data/pos/admin-settings.js';
import { kioskInventoryDish } from '../../test-data/pos/dishes.js';
import { step } from '../../utils/step.js';

export class KioskInteractionFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly kioskHomePage: KioskHomePage,
    private readonly recallPage: RecallPage,
    private readonly adminPage?: AdminPage,
  ) {}

  async placeKioskTogoCashOrderAndReadRecallTax(
    posHomeUrl: string,
    adminSettingsClient: AdminSettingsClient,
  ): Promise<string> {
    return step('全局外带免税开启后创建 Kiosk To Go 现金订单并读取 Recall Tax', async () => {
      await adminSettingsClient.setSetting(adminSettings.takeoutTaxExempt, true);

      await this.homePage.open(posHomeUrl);
      await this.kioskHomePage.applyOfflineTakeoutTaxExempt(
        (await adminSettingsClient.readSetting(adminSettings.takeoutTaxExempt)) === true,
      );
      await this.kioskHomePage.createCommonItem('kiosk_item', 10);

      await this.kioskHomePage.openFromPosHomeUrl(posHomeUrl);
      await this.kioskHomePage.selectLicense();
      await this.kioskHomePage.chooseToGoOrderType();
      await this.kioskHomePage.addItem('Chinese Food', 'Appetizers', 'kiosk_item');
      await this.kioskHomePage.viewOrder();
      await this.kioskHomePage.checkout();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.cashPayment();

      await this.homePage.open(posHomeUrl);
      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const taxText = await this.recallPage.readOrderTaxText();

      await adminSettingsClient.setSetting(adminSettings.takeoutTaxExempt, false);
      await this.kioskHomePage.applyOfflineTakeoutTaxExempt(false);

      return taxText;
    });
  }

  async verifyKioskLicenseList(
    posHomeUrl: string,
    restaurantClient: RestaurantClient,
  ): Promise<{ posApiKioskLicenseNames: string[]; kioskLicenseNames: string[] }> {
    return step('验证 Kiosk 登录列表只展示 Kiosk License', async () => {
      const posApiKioskLicenseNames = (await restaurantClient.getAllLicenseNames(posLicenseTypes.kiosk, false)).sort();

      await this.homePage.open(posHomeUrl);
      await this.kioskHomePage.applyOfflineKioskLicenseNames(posApiKioskLicenseNames);
      await this.kioskHomePage.openFromPosHomeUrl(posHomeUrl);
      const kioskLicenseNames = (await this.kioskHomePage.readAllKioskLicenseNames()).sort();

      return { posApiKioskLicenseNames, kioskLicenseNames };
    });
  }

  async markKioskItemSoldOutAndReadMenuApiState(
    posHomeUrl: string,
    menuClient: MenuClient,
  ): Promise<MenuDishAvailability> {
    return step('后台 Kiosk 设置菜品售罄并读取 Menu API Kiosk 菜品状态', async () => {
      if (!this.adminPage) {
        throw new Error('AdminPage is required to set Kiosk item sold out.');
      }

      await this.homePage.open(posHomeUrl);
      await this.homePage.clickAdmin();
      await this.adminPage.enterKiosk();
      await this.adminPage.setKioskItemSoldOut(kioskInventoryDish.name);
      await menuClient.setDishOutOfStock('KIOSK', kioskInventoryDish.group, kioskInventoryDish.category, kioskInventoryDish.name);

      const dishes = await menuClient.getAllAvailableDishInfosOfCategoryAndGroup(
        kioskInventoryDish.group,
        kioskInventoryDish.category,
        'KIOSK',
      );
      const itemState = dishes[kioskInventoryDish.name];
      if (!itemState) {
        throw new Error(`Missing Kiosk menu item state for ${kioskInventoryDish.name}`);
      }
      return itemState;
    });
  }
}
