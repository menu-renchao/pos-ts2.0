import { expect, test } from '../../fixtures/base-test.js';
import { OrderEntryFlow } from '../../flows/pos/order-entry.flow.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('stage2 order operation migration', () => {
  test('POS-19362 按座位分单支付子单 1 后 Void 子单 2 不应改变子单 1 小费', {
    annotation: [jiraIssue('POS-19362')],
  }, async ({ environment, page }) => {
    const orderEntryFlow = new OrderEntryFlow(
      new PosHomePage(page),
      new OrderDishesPage(page),
      new RecallPage(page),
    );

    const result = await orderEntryFlow.voidSecondSeatSplitSubOrderAndReadTip(environment.posHomeUrl);

    expect(result.firstSubOrderTipBeforeVoid).toBe(5);
    expect(result.firstSubOrderTipAfterVoid).toBe(result.firstSubOrderTipBeforeVoid);
    expect(result.secondSubOrderStatusAfterVoid).toBe('Void');
  });
});
