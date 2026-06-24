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

  test(
    'POS-19046, POS-19049 信用卡支付后两次追加信用卡或现金 tip 应保持 Paid 并显示正确小费',
    {
      annotation: jiraIssues(['POS-19046', 'POS-19049']),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const recallStates = await flow.addTipsAfterCreditPaymentAndReadRecall(environment.posHomeUrl);

      expect(recallStates.creditTip.status).toBe('Paid');
      expect(recallStates.creditTip.tipText).toBe('2.00');
      expect(recallStates.cashTip.status).toBe('Paid');
      expect(recallStates.cashTip.tipText).toBe('3.00');
    },
  );

  test(
    'POS-23319 分步付款后加小费应按已付金额重算待支付金额',
    {
      annotation: jiraIssue('POS-23319'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const unpaidAmount = await flow.addTipAfterPartialCashPaymentAndReadUnpaidAmount(environment.posHomeUrl);

      expect(unpaidAmount).toBe(7);
    },
  );

  test(
    'POS-31881 Dine In 现金付款条应先显示 Pay & Print 再显示 Pay',
    {
      annotation: jiraIssue('POS-31881'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const payActions = await flow.readDineInCashPaymentActionOrder(environment.posHomeUrl);

      expect(payActions).toEqual(['Pay & Print', 'Pay']);
    },
  );

  test(
    "POS-32910 礼品卡空条件查询应提示 No./Name/Phone No. can't all be empty",
    {
      annotation: jiraIssue('POS-32910'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const alert = await flow.searchGiftCardWithoutInfoAndReadAlert(environment.posHomeUrl);

      expect(alert).toBe("No./Name/Phone No. can't all be empty");
    },
  );

  test(
    "POS-32907 会员卡空条件查询应提示 No./Name/Phone No./Email can't all be empty",
    {
      annotation: jiraIssue('POS-32907'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const alert = await flow.searchLoyaltyCardWithoutInfoAndReadAlert(environment.posHomeUrl);

      expect(alert).toBe("No./Name/Phone No./Email can't all be empty");
    },
  );

  test(
    'POS-44417 信用卡失败订单改用现金支付后 Recall 现金筛选应找到原订单',
    {
      annotation: jiraIssue('POS-44417'),
    },
    async ({ environment, page }) => {
      const flow = new SettlementFlow(
        new PosHomePage(page),
        new AdminPage(page),
        new OrderDishesPage(page),
        new RecallPage(page),
      );

      const result = await flow.paySavedCreditFailureOrderByCashAndReadRecallCashFilter(environment.posHomeUrl);

      expect(result.filteredOrderNumber).toBe(result.savedOrderNumber);
    },
  );
});
