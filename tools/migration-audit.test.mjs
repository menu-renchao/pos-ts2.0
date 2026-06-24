import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  auditMigrationCoverage,
  parseMigrationMap,
  parsePythonSourceTests,
} from './migration-audit.mjs';

test('parsePythonSourceTests extracts classes, tests, Jira keys, titles, and skips commented tests', () => {
  const source = `
from common.util import jira_link

class TestKds:
    @allure.title("已完成订单有多个菜，依次点击重做")
    @jira_link("POS-43848")
    def test_redo_order(self):
        pass

# class TestDisabled:
#     @jira_link("POS-1")
#     def test_disabled(self):
#         pass

class TestReport:
    def test_check_void_report_date(self):
        pass
`;

  assert.deepEqual(parsePythonSourceTests('stage3/test_kds.py', source), [
    {
      sourceGroup: 'stage3',
      sourceFile: 'stage3/test_kds.py',
      sourceClass: 'TestKds',
      sourceTest: 'test_redo_order',
      sourceLine: 7,
      jiraKey: 'POS-43848',
      allureTitle: '已完成订单有多个菜，依次点击重做',
      skipped: false,
    },
    {
      sourceGroup: 'stage3',
      sourceFile: 'stage3/test_kds.py',
      sourceClass: 'TestReport',
      sourceTest: 'test_check_void_report_date',
      sourceLine: 16,
      jiraKey: '',
      allureTitle: '',
      skipped: false,
    },
  ]);
});

test('parsePythonSourceTests marks pytest skipped classes and tests', () => {
  const source = `
@pytest.mark.skip("16.7之后暂时不跑")
class TestExpiration:
    @jira_link('POS-44422')
    def test_no_permission_user(self):
        pass

class TestPaging:
    @pytest.mark.skip("unstable")
    def test_auto_complete_order(self):
        pass
`;

  const parsed = parsePythonSourceTests('stage1/test_expiration.py', source);
  assert.equal(parsed[0]?.skipped, true);
  assert.equal(parsed[0]?.skipReason, '16.7之后暂时不跑');
  assert.equal(parsed[1]?.skipped, true);
  assert.equal(parsed[1]?.skipReason, 'unstable');
});

test('parseMigrationMap reads coverage rows from markdown table', () => {
  const markdown = `
| source_group | source_file | source_class | source_test | source_line | jira_key | allure_title | target_spec | target_test_title | pages | flows | clients | test_data | assertions | status | gap_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| stage3 | stage3/test_kds.py | TestKds | test_redo_order | 7 | POS-43848 | 已完成订单有多个菜 | tests/stage3/kds.spec.ts | 已完成订单有多个菜 | KdsPage | KdsFlow.redoCompletedOrder | StubPosOrderClient | test-data/pos/dishes.ts | 订单重新出现 | verified | |
`;

  assert.deepEqual(parseMigrationMap(markdown), [
    {
      sourceGroup: 'stage3',
      sourceFile: 'stage3/test_kds.py',
      sourceClass: 'TestKds',
      sourceTest: 'test_redo_order',
      sourceLine: 7,
      jiraKey: 'POS-43848',
      allureTitle: '已完成订单有多个菜',
      targetSpec: 'tests/stage3/kds.spec.ts',
      targetTestTitle: '已完成订单有多个菜',
      pages: 'KdsPage',
      flows: 'KdsFlow.redoCompletedOrder',
      clients: 'StubPosOrderClient',
      testData: 'test-data/pos/dishes.ts',
      assertions: '订单重新出现',
      status: 'verified',
      gapReason: '',
    },
  ]);
});

test('auditMigrationCoverage reports missing source tests and incomplete verified rows', () => {
  const sourceTests = parsePythonSourceTests(
    'stage3/test_kds.py',
    `
class TestKds:
    @jira_link("POS-43848")
    def test_redo_order(self):
        pass

    def test_missing_mapping(self):
        pass
`,
  );
  const mapRows = parseMigrationMap(`
| source_group | source_file | source_class | source_test | source_line | jira_key | allure_title | target_spec | target_test_title | pages | flows | clients | test_data | assertions | status | gap_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| stage3 | stage3/test_kds.py | TestKds | test_redo_order | 4 | POS-43848 |  | tests/stage3/kds.spec.ts |  |  | KdsFlow.redoCompletedOrder |  |  |  | verified | |
`);

  const result = auditMigrationCoverage({
    sourceTests,
    mapRows,
    targetSpecExists: () => true,
    readTargetSpec: () => 'POS-43848',
  });

  assert.equal(result.ok, false);
  assert.match(result.findings.join('\n'), /Missing map row.*test_missing_mapping/);
  assert.match(result.findings.join('\n'), /verified row missing pages/);
  assert.match(result.findings.join('\n'), /verified row missing assertions/);
});

test('auditMigrationCoverage requires migrated rows to have runnable titles and traceability fields', () => {
  const sourceTests = parsePythonSourceTests(
    'stage0/test_order_page.py',
    `
class TestOrderPage:
    @jira_link("POS-30543")
    def test_order_edit_item_tax(self):
        pass
`,
  );
  const mapRows = parseMigrationMap(`
| source_group | source_file | source_class | source_test | source_line | jira_key | allure_title | target_spec | target_test_title | pages | flows | clients | test_data | assertions | status | gap_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| stage0 | stage0/test_order_page.py | TestOrderPage | test_order_edit_item_tax | 4 | POS-30543 |  | tests/stage0/order-page.spec.ts | 编辑送厨菜品后税率正确 |  | OrderEntryFlow.editSentItemTax | StubOrderClient.createOrder | test-data/pos/dishes.ts | 税率正确 | migrated | |
`);

  const result = auditMigrationCoverage({
    sourceTests,
    mapRows,
    targetSpecExists: () => true,
    readTargetSpec: () => `
      import { test, expect } from '../../fixtures/base-test.js';
      test('其他标题', async ({ orderEntryFlow }) => {
        await orderEntryFlow.editSentItemTax();
        expect(1).toBe(1);
      });
    `,
    projectFiles: new Map([
      ['flows/pos/order-entry.flow.ts', 'export class OrderEntryFlow { async editSentItemTax() {} }'],
      ['clients/pos-api/order.client.ts', 'export class StubOrderClient { async createOrder() {} }'],
      ['test-data/pos/dishes.ts', 'export const dishes = [];'],
    ]),
    flowContractText: 'OrderEntryFlow.editSentItemTax',
  });

  assert.equal(result.ok, false);
  assert.match(result.findings.join('\n'), /migrated row missing pages/);
  assert.match(result.findings.join('\n'), /missing runnable test title/);
});

test('auditMigrationCoverage validates page and flow methods, spec flow calls, and contract coverage', () => {
  const sourceTests = parsePythonSourceTests(
    'stage0/test_order_page.py',
    `
class TestOrderPage:
    def test_order_with_name(self):
        pass
`,
  );
  const mapRows = parseMigrationMap(`
| source_group | source_file | source_class | source_test | source_line | jira_key | allure_title | target_spec | target_test_title | pages | flows | clients | test_data | assertions | status | gap_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| stage0 | stage0/test_order_page.py | TestOrderPage | test_order_with_name | 3 |  |  | tests/stage0/order-page.spec.ts | 下单页展示用户信息 | OrderDishesPage.addCustomerName | OrderEntryFlow.createNamedOrder | StubOrderClient.createOrder | test-data/pos/customers.ts | 用户信息展示正确 | verified | |
`);

  const result = auditMigrationCoverage({
    sourceTests,
    mapRows,
    targetSpecExists: () => true,
    readTargetSpec: () => `
      import { test, expect } from '../../fixtures/base-test.js';
      test('下单页展示用户信息', async ({ orderEntryFlow }) => {
        await orderEntryFlow.createAnotherOrder();
        expect('Alice').toContain('A');
      });
    `,
    projectFiles: new Map([
      ['pages/pos/order-dishes/order-dishes.page.ts', 'export class OrderDishesPage { async addDifferentName() {} }'],
      ['flows/pos/order-entry.flow.ts', 'export class OrderEntryFlow { async createAnotherOrder() {} }'],
      ['clients/pos-api/order.client.ts', 'export class StubOrderClient { async createOrder() {} }'],
      ['test-data/pos/customers.ts', 'export const customers = [];'],
    ]),
    flowContractText: '',
  });

  assert.equal(result.ok, false);
  assert.match(result.findings.join('\n'), /pages method does not exist: OrderDishesPage.addCustomerName/);
  assert.match(result.findings.join('\n'), /flows method does not exist: OrderEntryFlow.createNamedOrder/);
  assert.match(result.findings.join('\n'), /does not call flow method OrderEntryFlow.createNamedOrder/);
});

test('auditMigrationCoverage rejects skipped or assertion-free migrated tests', () => {
  const sourceTests = parsePythonSourceTests(
    'stage4/test_paging.py',
    `
class TestPagingPage:
    def test_complete_all_orders(self):
        pass
`,
  );
  const mapRows = parseMigrationMap(`
| source_group | source_file | source_class | source_test | source_line | jira_key | allure_title | target_spec | target_test_title | pages | flows | clients | test_data | assertions | status | gap_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| stage4 | stage4/test_paging.py | TestPagingPage | test_complete_all_orders | 3 |  |  | tests/stage4/paging.spec.ts | 全部完成待取餐订单 | PagingPage.completeAllOrders | PagingFlow.completeAllOrders | StubOrderClient.completeAll | test-data/pos/orders.ts | 订单状态全部完成 | migrated | |
`);

  const result = auditMigrationCoverage({
    sourceTests,
    mapRows,
    targetSpecExists: () => true,
    readTargetSpec: () => `
      import { test, expect } from '../../fixtures/base-test.js';
      test.skip('全部完成待取餐订单', async ({ pagingFlow }) => {
        await pagingFlow.completeAllOrders();
        expect(true).toBe(true);
      });
    `,
    projectFiles: new Map([
      ['pages/pos/paging/paging.page.ts', 'export class PagingPage { async completeAllOrders() {} }'],
      ['flows/paging/paging.flow.ts', 'export class PagingFlow { async completeAllOrders() {} }'],
      ['clients/pos-api/order.client.ts', 'export class StubOrderClient { async completeAll() {} }'],
      ['test-data/pos/orders.ts', 'export const orders = [];'],
    ]),
    flowContractText: 'PagingFlow.completeAllOrders',
  });

  assert.equal(result.ok, false);
  assert.match(result.findings.join('\n'), /missing runnable test title/);
  assert.match(result.findings.join('\n'), /Target test is skipped/);
  assert.match(result.findings.join('\n'), /has no business assertion/);
});
