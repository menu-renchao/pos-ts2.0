import { expect, test } from '../../fixtures/base-test.js';
import { SettlementFlow } from '../../flows/pos/settlement.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import { RecallPage } from '../../pages/pos/recall.page.js';
import { roundingSettlementCases, roundingSettlementJiraKeys } from '../../test-data/pos/settlement.js';
import { jiraIssue, jiraIssues } from '../../utils/jira.js';

test.describe('stage0 order settlement migration', () => {
  test(
    'POS-16490, POS-16491, POS-16492, POS-16494, POS-16495, POS-16496, POS-16498, POS-16499, POS-16500, POS-16502, POS-16503, POS-16504, POS-16479 不同支付方式按 rounding 策略保存 Paid 金额',
    {
      annotation: jiraIssues(roundingSettlementJiraKeys),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      for (const settlementCase of roundingSettlementCases) {
        const recallState = await flow.payRoundedOrderAndReadRecall(environment.posHomeUrl, settlementCase);

        expect(recallState.totalText, settlementCase.caseName).toBe(settlementCase.expectedRecallPrice);
        expect(recallState.status, settlementCase.caseName).toBe('Paid');
      }
    },
  );

  test(
    'POS-16539 loyalty card 全额支付订单 void 支付记录后应回到 Printed',
    {
      annotation: jiraIssue('POS-16539'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const status = await flow.voidFullyLoyaltyPaidAutoSentOrderAndReadStatus(environment.posHomeUrl);

      expect(status).toBe('Printed');
    },
  );

  test(
    'POS-16540 loyalty card 半支付订单完成现金支付后 void 支付记录应回到 Semi-Paid',
    {
      annotation: jiraIssue('POS-16540'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const status = await flow.voidCompletedSemiPaidLoyaltyOrderAndReadStatus(environment.posHomeUrl);

      expect(status).toBe('Semi-Paid');
    },
  );
});
