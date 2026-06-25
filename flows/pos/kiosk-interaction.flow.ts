import type { AdminSettingsClient } from '../../clients/pos-api/admin-settings.client.js';
import type { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import type { MenuClient, MenuDishAvailability } from '../../clients/pos-api/menu.client.js';
import { posLicenseTypes, type RestaurantClient } from '../../clients/pos-api/restaurant.client.js';
import type { KioskHomePage } from '../../pages/kiosk/home.page.js';
import type { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import type { AdminPage } from '../../pages/pos/admin.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { crmSourceRewardMember } from '../../test-data/crm/members.js';
import { adminSettings } from '../../test-data/pos/admin-settings.js';
import { crmRedeemItemDish, kioskInventoryDish } from '../../test-data/pos/dishes.js';
import { step } from '../../utils/step.js';

export type KioskCrmRedeemResult = {
  beforeRedeemPointBalance: number;
  afterRedeemPointBalance: number;
  orderSubtotal: number;
  redeemItemPrice: number;
};

export class KioskInteractionFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly kioskHomePage: KioskHomePage,
    private readonly recallPage: RecallPage,
    private readonly adminPage?: AdminPage,
    private readonly posCrmPage?: PosCrmPage,
    private readonly orderDishesPage?: OrderDishesPage,
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

  async bindKioskOrderToCrmMemberAndRedeemGiftDish(
    posHomeUrl: string,
    crmRewardClient: StubCrmRewardClient,
  ): Promise<KioskCrmRedeemResult> {
    return step('Kiosk 订单进入 POS 后绑定 CRM 会员并兑换赠菜', async () => {
      if (!this.posCrmPage || !this.orderDishesPage) {
        throw new Error('PosCrmPage and OrderDishesPage are required to redeem a CRM item on a Kiosk order.');
      }

      await this.homePage.open(posHomeUrl);
      await this.kioskHomePage.createCommonItem(kioskInventoryDish.name, kioskInventoryDish.price);
      await this.kioskHomePage.openFromPosHomeUrl(posHomeUrl);
      await this.kioskHomePage.selectLicense();
      await this.kioskHomePage.chooseToGoOrderType();
      await this.kioskHomePage.addItem(kioskInventoryDish.group, kioskInventoryDish.category, kioskInventoryDish.name);
      await this.kioskHomePage.viewOrder();
      await this.kioskHomePage.checkout();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.skipOptionalInfo();
      await this.kioskHomePage.cashPayment();

      await this.homePage.open(posHomeUrl);
      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.clickEdit();
      crmRewardClient.findMemberByPhone(crmSourceRewardMember.phone);
      await this.posCrmPage.openRedeem();
      await this.posCrmPage.selectMemberByPhone(crmSourceRewardMember.phone);
      const beforeRedeemPointBalance = await this.posCrmPage.readHeaderPointBalance();
      await this.posCrmPage.openRedeem();
      await this.posCrmPage.applyRedeemItem(crmRedeemItemDish.name);
      await this.posCrmPage.quitRedeem();
      await this.orderDishesPage.saveOrder();

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const afterRedeemPointBalance = await this.recallPage.readCrmPointBalance();
      const items = await this.recallPage.readAllOrderItems();
      const orderSubtotal = await this.recallPage.readOrderSubtotal();
      const redeemItem = items.find((item) => item.price === 0 && item.name === crmRedeemItemDish.name);
      if (!redeemItem) {
        throw new Error(`Missing redeemed item ${crmRedeemItemDish.name} in recalled Kiosk order.`);
      }

      return {
        beforeRedeemPointBalance,
        afterRedeemPointBalance,
        orderSubtotal,
        redeemItemPrice: redeemItem.price,
      };
    });
  }
}
