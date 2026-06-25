import { expect, test } from '../../fixtures/base-test.js';
import { StubCrmRewardClient } from '../../clients/crm/reward.client.js';
import { KioskInteractionFlow } from '../../flows/pos/kiosk-interaction.flow.js';
import { KioskHomePage } from '../../pages/kiosk/home.page.js';
import { PosCrmPage } from '../../pages/pos/crm/pos-crm.page.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';

test.describe('stage2 kiosk interaction migration', () => {
  test('POS-20995 全局外带免税开启后 Kiosk To Go 订单在 Recall 中应显示免税', {
    annotation: { type: 'issue', description: 'POS-20995' },
  }, async ({ adminSettingsClient, environment, page }) => {
    const flow = new KioskInteractionFlow(new PosHomePage(page), new KioskHomePage(page), new RecallPage(page));

    const taxText = await flow.placeKioskTogoCashOrderAndReadRecallTax(environment.posHomeUrl, adminSettingsClient);

    expect(taxText).toBe('--');
  });

  test('POS-24842 Kiosk 登录列表应只展示 POS API 返回的 Kiosk License', {
    annotation: { type: 'issue', description: 'POS-24842' },
  }, async ({ environment, page, restaurantClient }) => {
    const flow = new KioskInteractionFlow(new PosHomePage(page), new KioskHomePage(page), new RecallPage(page));

    const licenseComparison = await flow.verifyKioskLicenseList(environment.posHomeUrl, restaurantClient);

    expect(licenseComparison.kioskLicenseNames).toEqual(licenseComparison.posApiKioskLicenseNames);
  });

  test('POS-36267 Kiosk 后台设置菜品售罄后 Menu API 应同步 out_of_stock', {
    annotation: { type: 'issue', description: 'POS-36267' },
  }, async ({ environment, menuClient, page }) => {
    const flow = new KioskInteractionFlow(
      new PosHomePage(page),
      new KioskHomePage(page),
      new RecallPage(page),
      new AdminPage(page),
    );

    const itemState = await flow.markKioskItemSoldOutAndReadMenuApiState(environment.posHomeUrl, menuClient);

    expect(itemState.outOfStock).toBe(true);
  });

  test('POS-36269 Kiosk 订单进入 POS 后应可绑定会员并兑换赠菜', {
    annotation: { type: 'issue', description: 'POS-36269' },
  }, async ({ environment, page }) => {
    const flow = new KioskInteractionFlow(
      new PosHomePage(page),
      new KioskHomePage(page),
      new RecallPage(page),
      new AdminPage(page),
      new PosCrmPage(page),
      new OrderDishesPage(page),
    );

    const result = await flow.bindKioskOrderToCrmMemberAndRedeemGiftDish(
      environment.posHomeUrl,
      new StubCrmRewardClient(),
    );

    expect(result.redeemItemPrice).toBe(0);
    expect(result.orderSubtotal).toBe(10);
    expect(result.afterRedeemPointBalance).toBe(result.beforeRedeemPointBalance - 10);
  });
});
