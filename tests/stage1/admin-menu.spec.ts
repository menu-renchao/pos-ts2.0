import { expect, test } from '../../fixtures/base-test.js';
import { AdminMenuFlow } from '../../flows/pos/admin-menu.flow.js';
import { AdminPage } from '../../pages/pos/admin.page.js';
import { PosHomePage } from '../../pages/pos/home.page.js';
import { jiraIssue } from '../../utils/jira.js';

test.describe('stage1 admin menu migration', () => {
  test(
    'POS-31467 POS Global Option Group 应能复制到 Emenu Menu',
    {
      annotation: jiraIssue('POS-31467'),
    },
    async ({ environment, page }) => {
      const flow = new AdminMenuFlow(new PosHomePage(page), new AdminPage(page));

      const categoryCount = await flow.copyPosGlobalOptionGroupToEmenuAndReadCount(environment.posHomeUrl);

      expect(categoryCount).toBeGreaterThan(0);
    },
  );
});
