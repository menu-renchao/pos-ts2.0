import { expect, test } from '../../fixtures/base-test.js';
import { CallerFlow } from '../../flows/pos/caller.flow.js';
import { EmenuMainPage } from '../../pages/emenu/main.page.js';
import { EmenuOrderPage } from '../../pages/emenu/order.page.js';
import { CallerPage } from '../../pages/pos/caller.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';

test.describe('stage1 caller migration', () => {
  test('POS-31490 dine in选桌下单添加用户名字叫号展示用户名字', async ({ environment, page }) => {
    const flow = new CallerFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new CallerPage(page),
    );

    const result = await flow.callDineInOrderWithGuestNameAndClear(environment.posHomeUrl);

    expect(result.preparingInfoBeforeCallOff).toContain(result.orderNumber);
    expect(result.preparingInfoBeforeCallOff).toContain(result.shortGuestName);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.orderNumber);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.shortGuestName);
  });

  test('POS-31492 dine in选桌下单叫号展示桌子区域加订单号', async ({ environment, page }) => {
    const flow = new CallerFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new CallerPage(page),
    );

    const result = await flow.callDineInOrderWithoutGuestNameAndClear(environment.posHomeUrl);

    expect(result.preparingInfoBeforeCallOff).toContain(result.orderCardId);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.orderCardId);
  });

  test('POS-31495 emenu选桌下单叫号展示桌子区域加订单号', async ({ environment, page }) => {
    const flow = new CallerFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new CallerPage(page),
      new EmenuMainPage(page),
      new EmenuOrderPage(page),
    );

    const result = await flow.callEmenuOrderWithTableAndClear(environment.posEmenuUrl, environment.posHomeUrl);

    expect(result.preparingInfoBeforeCallOff).toContain(result.orderCardId);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.orderCardId);
  });

  test('POS-31496 emenu选桌下单，POS修改名称后emenu叫号展示名称', async ({ environment, page }) => {
    const flow = new CallerFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
      new CallerPage(page),
      new EmenuMainPage(page),
      new EmenuOrderPage(page),
    );

    const result = await flow.callEmenuOrderWithEditedGuestNameAndClear(environment.posEmenuUrl, environment.posHomeUrl);

    expect(result.preparingInfoBeforeCallOff).toContain(result.orderNumber);
    expect(result.preparingInfoBeforeCallOff).toContain(result.shortGuestName);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.orderNumber);
    expect(result.preparingInfoAfterCallOff).not.toContain(result.shortGuestName);
  });
});
