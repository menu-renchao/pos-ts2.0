import type { AdminSettingsClient } from '../../clients/pos-api/admin-settings.client.js';
import type { KioskHomePage } from '../../pages/kiosk/home.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { adminSettings } from '../../test-data/pos/admin-settings.js';
import { step } from '../../utils/step.js';

export class KioskInteractionFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly kioskHomePage: KioskHomePage,
    private readonly recallPage: RecallPage,
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
}
