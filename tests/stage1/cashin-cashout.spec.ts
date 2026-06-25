import { expect, test } from '../../fixtures/base-test.js';
import { CashDrawerFlow } from '../../flows/pos/cash-drawer.flow.js';
import { CashInOutPage } from '../../pages/pos/cash/cash-in-out.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';

test.describe('stage1 cash in/out migration', () => {
  test('中文模式进入 Cash In/Out 应展示现金备款', async ({ environment, page }) => {
    const flow = new CashDrawerFlow(new PosHomePage(page), new CashInOutPage(page));

    const pageText = await flow.openCashInChinesePage(environment.posHomeUrl);

    expect(pageText).toContain('现金备款');
  });

  test('中文模式完成 Cash In 后再次进入应展示现金结算', async ({ environment, page }) => {
    const flow = new CashDrawerFlow(new PosHomePage(page), new CashInOutPage(page));

    const pageText = await flow.completeCashInAndOpenCashOutChinesePage(environment.posHomeUrl, 'test');

    expect(pageText).toContain('现金结算');
  });
});
