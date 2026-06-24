# POS TS 2.0 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a clean Playwright + TypeScript migration of the selected `crm/stage0/stage1/stage2/stage3/stage4` Python POS regression cases, including their required pages, flows, API clients, DB adapters, fixtures, utilities, and test data.

**Architecture:** The migration uses a vertical-slice strategy. Each slice lands only the files needed by the source tests being migrated, while shared contracts live in typed `clients/`, `fixtures/`, `test-data/`, and `utils/` modules. The first round is offline-safe: API and DB dependencies are represented as typed adapters with deterministic stub implementations and do not connect to real environments.

**Tech Stack:** Playwright Test, TypeScript, Node.js, ESLint, tsx, native Playwright fixtures, typed test-data modules, offline stub clients.

---

## Source Scope

Only migrate source files from:

- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\crm`
- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage0`
- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage1`
- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage2`
- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage3`
- `D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage4`

Do not migrate `stage5`, `__pycache__`, pytest cache files, debug outputs, or source files that are not required by these selected groups.

---

## File Structure To Create

### Project Root

- Create: `package.json` - scripts, dependencies, and project metadata.
- Create: `tsconfig.json` - strict TypeScript compiler settings.
- Create: `playwright.config.ts` - offline-safe Playwright config and test discovery.
- Create: `.gitignore` - ignores generated artifacts only.
- Create: `README.md` - repository usage and migration notes.

### Utilities

- Create: `utils/step.ts` - Chinese Playwright report step helper.
- Create: `utils/wait.ts` - quiet polling helper, replacing Python sleeps.
- Create: `utils/jira.ts` - Jira annotation builder.
- Create: `utils/errors.ts` - typed migration and live-environment errors.
- Create: `utils/money.ts` - currency and percent parsing helpers.
- Create: `utils/random.ts` - deterministic random-ish test data factories.
- Create: `utils/index.ts` - explicit utility exports.
- Test: `utils/money.test.ts`
- Test: `utils/wait.test.ts`
- Test: `utils/jira.test.ts`

### Test Data

- Create: `test-data/pos/domain-types.ts` - shared POS domain types.
- Create: `test-data/pos/pos-enums.ts` - enums migrated from Python enum usage.
- Create: `test-data/pos/dishes.ts` - dish, group, category, option, combo samples.
- Create: `test-data/pos/payments.ts` - payment samples and expected values.
- Create: `test-data/pos/customers.ts` - customer/member factories.
- Create: `test-data/pos/admin-settings.ts` - admin setting names and values.
- Create: `test-data/pos/permissions.ts` - staff and permission samples.
- Create: `test-data/pos/reports.ts` - report date and summary samples.
- Create: `test-data/crm/members.ts` - CRM member and reward samples.
- Create: `test-data/payloads/combo-request.ts`
- Create: `test-data/payloads/combo-price-request.ts`
- Create: `test-data/payloads/combo-weight.ts`
- Create: `test-data/payloads/quick-combo-request.ts`
- Create: `test-data/index.ts`
- Test: `test-data/pos/dishes.test.ts`
- Test: `test-data/payloads/payload-shape.test.ts`

### Clients

- Create: `clients/shared/client-mode.ts` - `stub` and `live` mode contracts.
- Create: `clients/shared/client-errors.ts` - adapter errors.
- Create: `clients/pos-api/admin-settings.client.ts`
- Create: `clients/pos-api/admin-staff.client.ts`
- Create: `clients/pos-api/menu.client.ts`
- Create: `clients/pos-api/tax.client.ts`
- Create: `clients/pos-api/charge.client.ts`
- Create: `clients/pos-api/order.client.ts`
- Create: `clients/pos-api/restaurant.client.ts`
- Create: `clients/pos-api/kds-config.client.ts`
- Create: `clients/pos-api/expiration-manager.client.ts`
- Create: `clients/pos-api/staff-shift-plan.client.ts`
- Create: `clients/db/pos-db.client.ts`
- Create: `clients/cloud-report-api/cloud-report.client.ts`
- Create: `clients/expiration-manager-api/expiration-manager.client.ts`
- Create: `clients/index.ts`
- Test: `clients/pos-api/stub-clients.test.ts`
- Test: `clients/db/pos-db.client.test.ts`

### Fixtures

- Create: `fixtures/environment.ts` - offline environment config.
- Create: `fixtures/base-test.ts` - base Playwright test with pages, flows, and clients.
- Create: `fixtures/client-fixtures.ts` - stub client wiring.
- Create: `fixtures/page-fixtures.ts` - page object wiring.
- Create: `fixtures/flow-fixtures.ts` - flow wiring.
- Test: `fixtures/fixture-construction.test.ts`

### Pages

- Create: `pages/shared/page-method-contracts.ts`
- Create: `pages/shared/locator-scope.ts`
- Create: `pages/shared/page-object.ts`
- Create: `pages/pos/home.page.ts`
- Create: `pages/pos/order-dishes/order-dishes.page.ts`
- Create: `pages/pos/order-dishes/order-summary.section.ts`
- Create: `pages/pos/order-dishes/menu-grid.section.ts`
- Create: `pages/pos/order-dishes/item-actions.section.ts`
- Create: `pages/pos/recall/recall.page.ts`
- Create: `pages/pos/recall/order-detail.section.ts`
- Create: `pages/pos/settlement/settlement.page.ts`
- Create: `pages/pos/admin/admin.page.ts`
- Create: `pages/pos/admin/menu-admin.page.ts`
- Create: `pages/pos/admin/staff-admin.page.ts`
- Create: `pages/pos/inventory/inventory.page.ts`
- Create: `pages/pos/cash/cash-in-out.page.ts`
- Create: `pages/pos/caller/caller.page.ts`
- Create: `pages/pos/crm/pos-crm.page.ts`
- Create: `pages/pos/split-order/split-order.page.ts`
- Create: `pages/pos/table/table.page.ts`
- Create: `pages/pos/report/report.page.ts`
- Create: `pages/pos/kds/kds.page.ts`
- Create: `pages/pos/cds/cds.page.ts`
- Create: `pages/pos/paging/paging.page.ts`
- Create: `pages/pos/expiration/expiration.page.ts`
- Create: `pages/crm/crm-login.page.ts`
- Create: `pages/crm/business-choose.page.ts`
- Create: `pages/crm/loyalty-member.page.ts`
- Create: `pages/crm/loyalty-setting.page.ts`
- Create: `pages/oo/login.page.ts`
- Create: `pages/oo/merchant.page.ts`
- Create: `pages/oo/place-order.page.ts`
- Create: `pages/oo/order-history.page.ts`
- Create: `pages/oo/sdi.page.ts`
- Create: `pages/sdi/order-detail.page.ts`
- Create: `pages/sdi/checkout.page.ts`
- Create: `pages/emenu/main.page.ts`
- Create: `pages/emenu/order.page.ts`
- Create: `pages/kiosk/home.page.ts`
- Create: `pages/cloud-report/cloud-report.page.ts`

### Flows

- Create: `flows/pos/pos-entry.flow.ts`
- Create: `flows/pos/order-entry.flow.ts`
- Create: `flows/settlement/settlement.flow.ts`
- Create: `flows/recall/recall.flow.ts`
- Create: `flows/admin/admin-settings.flow.ts`
- Create: `flows/inventory/inventory.flow.ts`
- Create: `flows/crm/crm-member.flow.ts`
- Create: `flows/crm/crm-order.flow.ts`
- Create: `flows/staff/staff-permission.flow.ts`
- Create: `flows/reporting/reporting.flow.ts`
- Create: `flows/kds/kds.flow.ts`
- Create: `flows/caller/caller.flow.ts`
- Create: `flows/paging/paging.flow.ts`
- Create: `flows/expiration/expiration.flow.ts`
- Create: `flows/index.ts`

### Tests

- Create: `tests/stage0/main-page.spec.ts`
- Create: `tests/stage0/order-page.spec.ts`
- Create: `tests/stage0/order-settle.spec.ts`
- Create: `tests/stage0/inventory.spec.ts`
- Create: `tests/crm/crm-order.spec.ts`
- Create: `tests/crm/crm-join-member.spec.ts`
- Create: `tests/crm/crm-copy-move-order.spec.ts`
- Create: `tests/crm/crm-split-order.spec.ts`
- Create: `tests/crm/crm-points-calculation.spec.ts`
- Create: `tests/crm/crm-paypage.spec.ts`
- Create: `tests/crm/crm-order-redeem-discount.spec.ts`
- Create: `tests/stage1/admin-staff.spec.ts`
- Create: `tests/stage1/admin-menu.spec.ts`
- Create: `tests/stage1/checkin-checkout.spec.ts`
- Create: `tests/stage1/cashin-cashout.spec.ts`
- Create: `tests/stage1/caller.spec.ts`
- Create: `tests/stage1/expiration.spec.ts`
- Create: `tests/stage2/order-operation.spec.ts`
- Create: `tests/stage2/operate-item-inventory.spec.ts`
- Create: `tests/stage2/kiosk-interaction.spec.ts`
- Create: `tests/stage2/recall-page.spec.ts`
- Create: `tests/stage2/recall.spec.ts`
- Create: `tests/stage3/report-printpreview.spec.ts`
- Create: `tests/stage3/report.spec.ts`
- Create: `tests/stage3/print.spec.ts`
- Create: `tests/stage3/kds.spec.ts`
- Create: `tests/stage3/cloud-report.spec.ts`
- Create: `tests/stage3/table-order.spec.ts`
- Create: `tests/stage3/setting.spec.ts`
- Create: `tests/stage3/y-cds.spec.ts`
- Create: `tests/stage4/crm-rights-card.spec.ts`
- Create: `tests/stage4/cloud-wait-list.spec.ts`
- Create: `tests/stage4/paging.spec.ts`

---

## Clean Directory Rules

- Do not create `tmp-*`, `scratch-*`, `debug-*`, `playground-*`, `example-*`, `sample-*`, `.bak`, or `.old` files.
- Do not commit generated Playwright reports, screenshots, traces, videos, `node_modules`, `dist`, or coverage output.
- Do not keep empty page, flow, or client shells that no migrated test imports.
- Do not create one-off spec files for experimentation.
- Every committed file must be one of: project config, utility, test data, client, fixture, page, flow, migrated spec, formal unit test, or documentation.

Verification command for cleanliness:

```powershell
rg --files 'D:\mansuper\pos py-ts\pos-ts2.0' |
  rg 'tmp|scratch|debug|playground|example|sample|\.bak|\.old'
```

Expected: no output.

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `playwright.config.ts`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "pos-ts2.0",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "playwright test",
    "test:list": "playwright test --list",
    "unit": "node --test \"**/*.test.ts\"",
    "lint": "eslint . --ext .ts"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "@types/node": "^20.14.0",
    "@typescript-eslint/eslint-plugin": "^7.13.0",
    "@typescript-eslint/parser": "^7.13.0",
    "eslint": "^8.57.0",
    "tsx": "^4.15.0",
    "typescript": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "types": ["node", "@playwright/test"],
    "rootDir": "."
  },
  "include": [
    "clients/**/*.ts",
    "fixtures/**/*.ts",
    "flows/**/*.ts",
    "pages/**/*.ts",
    "test-data/**/*.ts",
    "tests/**/*.ts",
    "utils/**/*.ts",
    "playwright.config.ts"
  ]
}
```

- [ ] **Step 3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.POS_BASE_URL ?? 'http://192.168.0.72:22080',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

- [ ] **Step 4: Create `.gitignore`**

```gitignore
node_modules/
dist/
coverage/
playwright-report/
test-results/
.env
.env.*
*.log
```

- [ ] **Step 5: Create `README.md`**

```md
# POS TS 2.0

Playwright + TypeScript POS regression migration workspace.

## First-Round Migration Rule

The first migration round is code-level only. Tests, fixtures, clients, and flows must be able to typecheck and be discovered without connecting to real POS, CRM, cloud, database, or other live systems.

## Useful Commands

- `npm run typecheck`
- `npm run test:list`
- `npm run unit`
```

- [ ] **Step 6: Verify scaffold**

Run:

```powershell
npm install
npm run typecheck
npm run test:list
```

Expected:

- `npm install` completes.
- `npm run typecheck` exits 0 with the scaffold files included by `tsconfig.json`.
- `npm run test:list` exits 0 and may list no tests until specs are added.

- [ ] **Step 7: Commit scaffold**

```powershell
git add package.json tsconfig.json playwright.config.ts .gitignore README.md
git commit -m "chore: scaffold Playwright TypeScript project"
```

---

## Task 2: Shared Utilities

**Files:**
- Create: `utils/step.ts`
- Create: `utils/wait.ts`
- Create: `utils/jira.ts`
- Create: `utils/errors.ts`
- Create: `utils/money.ts`
- Create: `utils/random.ts`
- Create: `utils/index.ts`
- Test: `utils/money.test.ts`
- Test: `utils/wait.test.ts`
- Test: `utils/jira.test.ts`

- [ ] **Step 1: Create `utils/step.ts`**

```ts
import { test } from '@playwright/test';

export async function step<T>(title: string, body: () => Promise<T>): Promise<T> {
  return test.step(title, body);
}
```

- [ ] **Step 2: Create `utils/wait.ts`**

```ts
export type WaitUntilOptions = {
  timeoutMs?: number;
  intervalMs?: number;
  description?: string;
};

export async function waitUntil(
  predicate: () => Promise<boolean> | boolean,
  options: WaitUntilOptions = {},
): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 10_000;
  const intervalMs = options.intervalMs ?? 100;
  const startedAt = Date.now();

  while (Date.now() - startedAt <= timeoutMs) {
    if (await predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Timed out waiting for ${options.description ?? 'condition'}`);
}
```

- [ ] **Step 3: Create `utils/jira.ts`**

```ts
import type { TestDetails } from '@playwright/test';

export function jiraIssue(issueKey: string): NonNullable<TestDetails['annotation']>[number] {
  return {
    type: 'issue',
    description: `https://devtickets.atlassian.net/browse/${issueKey}`,
  };
}

export function jiraIssues(issueKeys: readonly string[]): NonNullable<TestDetails['annotation']> {
  return issueKeys.map((issueKey) => jiraIssue(issueKey));
}
```

- [ ] **Step 4: Create `utils/errors.ts`**

```ts
export class LiveEnvironmentRequiredError extends Error {
  constructor(operation: string) {
    super(`${operation} requires live environment wiring`);
    this.name = 'LiveEnvironmentRequiredError';
  }
}

export class MigrationDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MigrationDataError';
  }
}
```

- [ ] **Step 5: Create `utils/money.ts`**

```ts
import { MigrationDataError } from './errors.js';

export function parseCurrency(value: string): number {
  const normalized = value.trim().replace(/[$,]/g, '');
  const amount = Number(normalized);
  if (!Number.isFinite(amount)) {
    throw new MigrationDataError(`Invalid currency value: ${value}`);
  }
  return Math.round(amount * 100) / 100;
}

export function parsePercent(value: string): number {
  const normalized = value.trim().replace('%', '');
  const percent = Number(normalized);
  if (!Number.isFinite(percent)) {
    throw new MigrationDataError(`Invalid percent value: ${value}`);
  }
  return percent / 100;
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
```

- [ ] **Step 6: Create `utils/random.ts`**

```ts
export function uniqueName(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`;
}

export function numericPhone(seed: number = Date.now()): string {
  return `555${String(seed).replace(/\D/g, '').slice(-7).padStart(7, '0')}`;
}
```

- [ ] **Step 7: Create `utils/index.ts`**

```ts
export * from './errors.js';
export * from './jira.js';
export * from './money.js';
export * from './random.js';
export * from './step.js';
export * from './wait.js';
```

- [ ] **Step 8: Add utility unit tests**

Create `utils/money.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseCurrency, parsePercent, roundMoney } from './money.js';

test('parseCurrency returns numeric dollar amount', () => {
  assert.equal(parseCurrency('$1,234.50'), 1234.5);
});

test('parsePercent returns decimal rate', () => {
  assert.equal(parsePercent('10%'), 0.1);
});

test('roundMoney rounds to cents', () => {
  assert.equal(roundMoney(1.005), 1.01);
});
```

Create `utils/wait.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { waitUntil } from './wait.js';

test('waitUntil resolves when predicate becomes true', async () => {
  let attempts = 0;
  await waitUntil(() => {
    attempts += 1;
    return attempts === 2;
  }, { timeoutMs: 500, intervalMs: 1, description: 'second attempt' });
  assert.equal(attempts, 2);
});
```

Create `utils/jira.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { jiraIssue, jiraIssues } from './jira.js';

test('jiraIssue builds Playwright annotation', () => {
  assert.deepEqual(jiraIssue('POS-30543'), {
    type: 'issue',
    description: 'https://devtickets.atlassian.net/browse/POS-30543',
  });
});

test('jiraIssues builds multiple annotations', () => {
  assert.equal(jiraIssues(['POS-1', 'POS-2']).length, 2);
});
```

- [ ] **Step 9: Verify utilities**

Run:

```powershell
npm run typecheck
npm run unit
```

Expected:

- TypeScript exits 0.
- Node test reports the utility tests passing.

- [ ] **Step 10: Commit utilities**

```powershell
git add utils
git commit -m "chore: add shared migration utilities"
```

---

## Task 3: Domain Types And Test Data

**Files:**
- Create all files listed in the Test Data section.

- [ ] **Step 1: Create POS domain types**

Create `test-data/pos/domain-types.ts`:

```ts
export type Money = number;

export type PosDishSample = {
  name: string;
  group: string;
  category: string;
  price: Money;
};

export type PosOptionSample = {
  name: string;
  price: Money;
  subOptions?: readonly PosOptionSample[];
};

export type PosCustomerSample = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type PosOrderSummary = {
  orderNumber: string;
  subtotal: Money;
  tax: Money;
  total: Money;
};
```

- [ ] **Step 2: Create POS enums**

Create `test-data/pos/pos-enums.ts`:

```ts
export enum PaymentServiceType {
  Cash = 'Cash',
  Credit = 'Credit',
  GiftCard = 'GiftCard',
  Loyalty = 'Loyalty',
}

export enum PosOrderType {
  DineIn = 'DineIn',
  Togo = 'Togo',
  Pickup = 'Pickup',
  Delivery = 'Delivery',
}

export enum PaymentStatus {
  Unpaid = 'Unpaid',
  Paid = 'Paid',
  Refunded = 'Refunded',
}

export enum ProductLineName {
  Pos = 'POS',
  Kiosk = 'KIOSK',
  OnlineOrder = 'OO',
}

export enum SaveOperate {
  Save = 'Save',
  SaveAndNew = 'SaveAndNew',
}
```

- [ ] **Step 3: Create initial dish data from source usage**

Create `test-data/pos/dishes.ts`:

```ts
import type { PosDishSample, PosOptionSample } from './domain-types.js';

export const posDishes = {
  item: {
    name: 'Auto Test Item',
    group: 'Lunch Menu',
    category: 'Entree',
    price: 10,
  },
  item2: {
    name: 'Auto Test Item 2',
    group: 'Dinner Menu',
    category: 'Main',
    price: 20,
  },
  kitchenItem: {
    name: 'Kitchen Item',
    group: 'Lunch Menu',
    category: 'Kitchen',
    price: 12,
  },
} as const satisfies Record<string, PosDishSample>;

export const posOptions = {
  option2: {
    name: 'Option 2',
    price: 1,
    subOptions: [{ name: 'Sub Option 2', price: 0.5 }],
  },
} as const satisfies Record<string, PosOptionSample>;
```

- [ ] **Step 4: Create payment, customer, setting, permission, report, CRM, and payload modules**

Create each file with typed constants used by migrated specs. Use deterministic values from the Python tests when visible in source; otherwise use stable synthetic values that preserve the scenario intent.

Example `test-data/pos/payments.ts`:

```ts
import { PaymentServiceType } from './pos-enums.js';

export const paymentSamples = {
  cash: { type: PaymentServiceType.Cash, tendered: 20 },
  credit: { type: PaymentServiceType.Credit, tendered: 20 },
  giftCard: { type: PaymentServiceType.GiftCard, cardNumber: '9999000011112222' },
  loyalty: { type: PaymentServiceType.Loyalty, memberPhone: '5550001234' },
} as const;
```

Example `test-data/payloads/combo-request.ts`:

```ts
export const comboRequestPayload = {
  name: 'Auto Combo',
  items: ['Auto Test Item', 'Auto Test Item 2'],
  price: 25,
} as const;
```

- [ ] **Step 5: Verify test data**

Run:

```powershell
npm run typecheck
```

Expected: TypeScript exits 0.

- [ ] **Step 6: Commit test data**

```powershell
git add test-data
git commit -m "chore: add POS migration test data"
```

---

## Task 4: Stub Clients And Fixtures

**Files:**
- Create all files listed in the Clients and Fixtures sections.

- [ ] **Step 1: Create client mode and errors**

Create `clients/shared/client-mode.ts`:

```ts
export type ClientMode = 'stub' | 'live';

export type ClientOptions = {
  mode: ClientMode;
};
```

Create `clients/shared/client-errors.ts`:

```ts
import { LiveEnvironmentRequiredError } from '../../utils/errors.js';

export function liveOnly(operation: string): never {
  throw new LiveEnvironmentRequiredError(operation);
}
```

- [ ] **Step 2: Create core POS API client interfaces with stubs**

Create `clients/pos-api/admin-settings.client.ts`:

```ts
export type AdminSettingValue = boolean | string | number;

export interface PosAdminSettingsClient {
  setSetting(name: string, value: AdminSettingValue): Promise<void>;
  readSetting(name: string): Promise<AdminSettingValue | undefined>;
}

export class StubPosAdminSettingsClient implements PosAdminSettingsClient {
  private readonly settings = new Map<string, AdminSettingValue>();

  async setSetting(name: string, value: AdminSettingValue): Promise<void> {
    this.settings.set(name, value);
  }

  async readSetting(name: string): Promise<AdminSettingValue | undefined> {
    return this.settings.get(name);
  }
}
```

Create `clients/db/pos-db.client.ts`:

```ts
export interface PosDbClient {
  readLatestOrderNumber(): Promise<string>;
  rememberLatestOrderNumber(orderNumber: string): Promise<void>;
}

export class StubPosDbClient implements PosDbClient {
  private latestOrderNumber = 'OFFLINE-ORDER-0001';

  async readLatestOrderNumber(): Promise<string> {
    return this.latestOrderNumber;
  }

  async rememberLatestOrderNumber(orderNumber: string): Promise<void> {
    this.latestOrderNumber = orderNumber;
  }
}
```

Create the remaining client files with narrow interfaces named after the business intent and `Stub*Client` classes that store deterministic in-memory data. Each client file must export both the interface and the stub implementation used by fixtures.

- [ ] **Step 3: Create fixtures**

Create `fixtures/environment.ts`:

```ts
export type TestEnvironment = {
  posHomeUrl: string;
  clientMode: 'stub' | 'live';
};

export const testEnvironment: TestEnvironment = {
  posHomeUrl: process.env.POS_HOME_URL ?? 'http://192.168.0.72:22080/kpos/front2/myhome.html',
  clientMode: (process.env.CLIENT_MODE as 'stub' | 'live' | undefined) ?? 'stub',
};
```

Create `fixtures/base-test.ts`:

```ts
import { test as base } from '@playwright/test';
import { StubPosAdminSettingsClient } from '../clients/pos-api/admin-settings.client.js';
import { StubPosDbClient } from '../clients/db/pos-db.client.js';
import { testEnvironment } from './environment.js';

export type PosTestFixtures = {
  environment: typeof testEnvironment;
  posAdminSettingsClient: StubPosAdminSettingsClient;
  posDbClient: StubPosDbClient;
};

export const test = base.extend<PosTestFixtures>({
  environment: async ({}, use) => {
    await use(testEnvironment);
  },
  posAdminSettingsClient: async ({}, use) => {
    await use(new StubPosAdminSettingsClient());
  },
  posDbClient: async ({}, use) => {
    await use(new StubPosDbClient());
  },
});

export { expect } from '@playwright/test';
```

- [ ] **Step 4: Verify clients and fixtures**

Run:

```powershell
npm run typecheck
npm run unit
```

Expected: both commands exit 0.

- [ ] **Step 5: Commit clients and fixtures**

```powershell
git add clients fixtures
git commit -m "chore: add offline clients and fixtures"
```

---

## Task 5: Core POS Page Objects And Flows

**Files:**
- Create the POS page and flow files needed by `stage0` first.

- [ ] **Step 1: Create shared page object base**

Create `pages/shared/page-object.ts`:

```ts
import type { Page } from '@playwright/test';

export abstract class PageObject {
  protected constructor(protected readonly page: Page) {}
}
```

- [ ] **Step 2: Create POS home page**

Create `pages/pos/home.page.ts`:

```ts
import type { Locator, Page } from '@playwright/test';
import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class PosHomePage extends PageObject {
  readonly togoButton: Locator;
  readonly recallButton: Locator;
  readonly adminButton: Locator;
  readonly passwordInput: Locator;
  readonly savePasswordButton: Locator;

  constructor(page: Page) {
    super(page);
    this.togoButton = page.getByRole('button', { name: 'Togo' });
    this.recallButton = page.getByRole('button', { name: 'Recall' });
    this.adminButton = page.getByRole('button', { name: 'Admin' });
    this.passwordInput = page.locator('input[type="password"]');
    this.savePasswordButton = page.getByRole('button', { name: 'Save' });
  }

  async open(url: string): Promise<void> {
    await step('打开 POS 首页', async () => {
      await this.page.goto(url);
    });
  }

  async inputEmployeePassword(password: string): Promise<void> {
    await step('输入员工口令', async () => {
      await this.passwordInput.fill(password);
      await this.savePasswordButton.click();
    });
  }

  async openTogoOrder(): Promise<void> {
    await step('进入 Togo 点单', async () => {
      await this.togoButton.click();
    });
  }

  async openRecall(): Promise<void> {
    await step('进入 Recall 页面', async () => {
      await this.recallButton.click();
    });
  }

  async openAdmin(): Promise<void> {
    await step('进入 Admin 页面', async () => {
      await this.adminButton.click();
    });
  }
}
```

- [ ] **Step 3: Create POS entry flow**

Create `flows/pos/pos-entry.flow.ts`:

```ts
import { step } from '../../utils/step.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';

export class PosEntryFlow {
  constructor(private readonly homePage: PosHomePage) {}

  async enterWithEmployeePassword(homeUrl: string, password = '11'): Promise<void> {
    await step('通过员工口令进入 POS', async () => {
      await this.homePage.open(homeUrl);
      await this.homePage.inputEmployeePassword(password);
    });
  }
}
```

- [ ] **Step 4: Add order, recall, settlement, admin, and inventory pages and flows**

Create each file listed for `pages/pos/order-dishes`, `pages/pos/recall`, `pages/pos/settlement`, `pages/pos/admin`, `pages/pos/inventory`, and related flows. Follow the same rule as `PosHomePage`: locators are centralized fields or private locator factories, page methods are single-page actions or reads, and cross-page intent belongs in a flow.

- [ ] **Step 5: Wire page and flow fixtures**

Modify `fixtures/base-test.ts` to expose `homePage` and `posEntryFlow` after creating the page and flow classes:

```ts
import { test as base } from '@playwright/test';
import { StubPosAdminSettingsClient } from '../clients/pos-api/admin-settings.client.js';
import { StubPosDbClient } from '../clients/db/pos-db.client.js';
import { PosEntryFlow } from '../flows/pos/pos-entry.flow.js';
import { PosHomePage } from '../pages/pos/home.page.js';
import { testEnvironment } from './environment.js';

export type PosTestFixtures = {
  environment: typeof testEnvironment;
  posAdminSettingsClient: StubPosAdminSettingsClient;
  posDbClient: StubPosDbClient;
  homePage: PosHomePage;
  posEntryFlow: PosEntryFlow;
};

export const test = base.extend<PosTestFixtures>({
  environment: async ({}, use) => {
    await use(testEnvironment);
  },
  posAdminSettingsClient: async ({}, use) => {
    await use(new StubPosAdminSettingsClient());
  },
  posDbClient: async ({}, use) => {
    await use(new StubPosDbClient());
  },
  homePage: async ({ page }, use) => {
    await use(new PosHomePage(page));
  },
  posEntryFlow: async ({ homePage }, use) => {
    await use(new PosEntryFlow(homePage));
  },
});

export { expect } from '@playwright/test';
```

- [ ] **Step 6: Verify POS page and flow compile**

Run:

```powershell
npm run typecheck
npm run test:list
```

Expected: both commands exit 0.

- [ ] **Step 7: Commit core POS pages and flows**

```powershell
git add pages flows fixtures
git commit -m "chore: add core POS page and flow layer"
```

---

## Task 6: Stage0 Vertical Slice

**Files:**
- Create: `tests/stage0/main-page.spec.ts`
- Create: `tests/stage0/order-page.spec.ts`
- Create: `tests/stage0/order-settle.spec.ts`
- Create: `tests/stage0/inventory.spec.ts`
- Modify pages, flows, clients, and test-data only when required by these specs.

- [ ] **Step 1: Migrate `test_main_page.py` first**

Source:

`D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage0\test_main_page.py`

Target:

`tests/stage0/main-page.spec.ts`

The first spec should use `fixtures/base-test.ts`, Chinese titles, and Jira annotations where source methods have `jira_link`.

Example target pattern:

```ts
import { test, expect } from '../../fixtures/base-test.js';

test.describe('POS 首页', () => {
  test(
    '应能通过员工口令进入 POS 首页',
    async ({ environment, posEntryFlow, homePage }) => {
      await posEntryFlow.enterWithEmployeePassword(environment.posHomeUrl, '11');
      await expect(homePage.togoButton).toBeVisible();
    },
  );
});
```

If a source method has a concrete Jira key, add `annotation: jiraIssues(['POS-30543'])` with that source key and keep the key searchable in the spec file. If a source method has no Jira key, omit `annotation`.

- [ ] **Step 2: Migrate `test_order_page.py`**

Source:

`D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage0\test_order_page.py`

Target:

`tests/stage0/order-page.spec.ts`

Move repeated order actions into `flows/pos/order-entry.flow.ts`. Keep dish samples in `test-data/pos/dishes.ts`. Keep order-number reads behind `clients/db/pos-db.client.ts`.

- [ ] **Step 3: Migrate `test_order_settle.py`**

Source:

`D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage0\test_order_settle.py`

Target:

`tests/stage0/order-settle.spec.ts`

Move payment actions into `flows/settlement/settlement.flow.ts`. Page reads for subtotal, tax, discount, and total must return numbers, not strings.

- [ ] **Step 4: Migrate `test_inventory.py`**

Source:

`D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case\stage0\test_inventory.py`

Target:

`tests/stage0/inventory.spec.ts`

Move inventory setup into `flows/inventory/inventory.flow.ts`. Keep menu and stock test data in `test-data/pos/dishes.ts` and `test-data/pos/admin-settings.ts`.

- [ ] **Step 5: Verify stage0**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected:

- TypeScript exits 0.
- Playwright lists the stage0 specs.
- Unit tests pass.

- [ ] **Step 6: Commit stage0**

```powershell
git add tests/stage0 pages/pos flows/pos flows/settlement flows/recall flows/inventory clients test-data fixtures utils
git commit -m "feat: migrate stage0 POS regression slice"
```

---

## Task 7: CRM Slice

**Files:**
- Create CRM test files listed in the Tests section.
- Create or modify only required CRM pages, flows, clients, and test-data.

- [ ] **Step 1: Migrate POS CRM page dependencies**

Use source dependencies from:

- `pages.pos_new_ui.updated.crmpage.CrmMember`
- `pages.pos_new_ui.updated.split_order_page.SplitOrder`
- `pages.pos_new_ui.updated.cashin_cashout_page.CashPage`
- `pages.CRM.crm_b_login_pages.CRMLoginpage`
- `pages.CRM.businss_choose_pages.Choosebusiness_page`
- `pages.CRM.crm_loyalty_member_pages.CRM_Loyalty_Member_page`
- `pages.CRM.crm_loyalty_setting_pages.CRM_Loyalty_Setting_page`

Target files:

- `pages/pos/crm/pos-crm.page.ts`
- `pages/pos/split-order/split-order.page.ts`
- `pages/pos/cash/cash-in-out.page.ts`
- `pages/crm/crm-login.page.ts`
- `pages/crm/business-choose.page.ts`
- `pages/crm/loyalty-member.page.ts`
- `pages/crm/loyalty-setting.page.ts`
- `flows/crm/crm-member.flow.ts`
- `flows/crm/crm-order.flow.ts`

- [ ] **Step 2: Migrate CRM specs**

Sources:

- `crm/test_crm_order.py`
- `crm/test_crm_join_member.py`
- `crm/test_crm_copy_move_order.py`
- `crm/test_crm_split_crm_order.py`
- `crm/test_crm_points_calculation.py`
- `crm/test_crm_paypage.py`
- `crm/test_crm_order_redeem_discount.py`

Targets:

- `tests/crm/crm-order.spec.ts`
- `tests/crm/crm-join-member.spec.ts`
- `tests/crm/crm-copy-move-order.spec.ts`
- `tests/crm/crm-split-order.spec.ts`
- `tests/crm/crm-points-calculation.spec.ts`
- `tests/crm/crm-paypage.spec.ts`
- `tests/crm/crm-order-redeem-discount.spec.ts`

- [ ] **Step 3: Verify CRM slice**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected: all commands exit 0 and Playwright lists CRM specs.

- [ ] **Step 4: Commit CRM slice**

```powershell
git add tests/crm pages/pos pages/crm flows/crm clients test-data fixtures
git commit -m "feat: migrate CRM regression slice"
```

---

## Task 8: Stage1 Slice

**Files:**
- Create stage1 test files listed in the Tests section.
- Add only required admin, staff, menu, cash, caller, check-in, checkout, and expiration support.

- [ ] **Step 1: Migrate admin staff and menu dependencies**

Sources:

- `stage1/test_admin_staff.py`
- `stage1/test_admin_menu.py`

Targets:

- `tests/stage1/admin-staff.spec.ts`
- `tests/stage1/admin-menu.spec.ts`
- `pages/pos/admin/admin.page.ts`
- `pages/pos/admin/menu-admin.page.ts`
- `pages/pos/admin/staff-admin.page.ts`
- `flows/admin/admin-settings.flow.ts`
- `flows/staff/staff-permission.flow.ts`
- `clients/pos-api/admin-settings.client.ts`
- `clients/pos-api/admin-staff.client.ts`
- `clients/pos-api/menu.client.ts`
- `clients/pos-api/tax.client.ts`

- [ ] **Step 2: Migrate cash, caller, check-in, checkout, and expiration specs**

Sources:

- `stage1/test_checkin_checkout.py`
- `stage1/test_cashin_cashout.py`
- `stage1/test_caller.py`
- `stage1/test_expiration.py`

Targets:

- `tests/stage1/checkin-checkout.spec.ts`
- `tests/stage1/cashin-cashout.spec.ts`
- `tests/stage1/caller.spec.ts`
- `tests/stage1/expiration.spec.ts`
- `pages/pos/cash/cash-in-out.page.ts`
- `pages/pos/caller/caller.page.ts`
- `pages/pos/expiration/expiration.page.ts`
- `flows/caller/caller.flow.ts`
- `flows/expiration/expiration.flow.ts`

- [ ] **Step 3: Verify stage1**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected: all commands exit 0 and Playwright lists stage1 specs.

- [ ] **Step 4: Commit stage1**

```powershell
git add tests/stage1 pages flows clients test-data fixtures
git commit -m "feat: migrate stage1 POS regression slice"
```

---

## Task 9: Stage2 Slice

**Files:**
- Create stage2 test files listed in the Tests section.
- Add only required order operation, recall, item inventory, kiosk, SDI, and Emenu support.

- [ ] **Step 1: Migrate order operation and item inventory specs**

Sources:

- `stage2/test_order_operation.py`
- `stage2/test_operate_item_inventory.py`

Targets:

- `tests/stage2/order-operation.spec.ts`
- `tests/stage2/operate-item-inventory.spec.ts`

- [ ] **Step 2: Migrate recall specs**

Sources:

- `stage2/test_recall.py`
- `stage2/test_recall_page.py`

Targets:

- `tests/stage2/recall.spec.ts`
- `tests/stage2/recall-page.spec.ts`
- `pages/pos/recall/recall.page.ts`
- `pages/pos/recall/order-detail.section.ts`
- `flows/recall/recall.flow.ts`

- [ ] **Step 3: Migrate kiosk interaction spec**

Source:

- `stage2/test_kiosk_interaction.py`

Targets:

- `tests/stage2/kiosk-interaction.spec.ts`
- `pages/kiosk/home.page.ts`
- `pages/emenu/main.page.ts`
- `pages/emenu/order.page.ts`
- `clients/pos-api/charge.client.ts`

- [ ] **Step 4: Verify stage2**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected: all commands exit 0 and Playwright lists stage2 specs.

- [ ] **Step 5: Commit stage2**

```powershell
git add tests/stage2 pages flows clients test-data fixtures
git commit -m "feat: migrate stage2 POS regression slice"
```

---

## Task 10: Stage3 Slice

**Files:**
- Create stage3 test files listed in the Tests section.
- Add only required report, print, KDS, CDS, table order, settings, cloud report, OO, and SDI support.

- [ ] **Step 1: Migrate report and cloud report specs**

Sources:

- `stage3/test_report.py`
- `stage3/test_cloud_report.py`
- `stage3/test_report_printpreview.py`

Targets:

- `tests/stage3/report.spec.ts`
- `tests/stage3/cloud-report.spec.ts`
- `tests/stage3/report-printpreview.spec.ts`
- `pages/pos/report/report.page.ts`
- `pages/cloud-report/cloud-report.page.ts`
- `flows/reporting/reporting.flow.ts`
- `clients/cloud-report-api/cloud-report.client.ts`

- [ ] **Step 2: Migrate print, KDS, table order, setting, and CDS specs**

Sources:

- `stage3/test_print.py`
- `stage3/test_kds.py`
- `stage3/test_table_order.py`
- `stage3/test_setting.py`
- `stage3/test_y_cds.py`

Targets:

- `tests/stage3/print.spec.ts`
- `tests/stage3/kds.spec.ts`
- `tests/stage3/table-order.spec.ts`
- `tests/stage3/setting.spec.ts`
- `tests/stage3/y-cds.spec.ts`
- `pages/pos/kds/kds.page.ts`
- `pages/pos/cds/cds.page.ts`
- `pages/pos/table/table.page.ts`
- `flows/kds/kds.flow.ts`
- `pages/oo/login.page.ts`
- `pages/oo/merchant.page.ts`
- `pages/oo/place-order.page.ts`
- `pages/oo/order-history.page.ts`
- `pages/oo/sdi.page.ts`
- `pages/sdi/order-detail.page.ts`
- `pages/sdi/checkout.page.ts`

- [ ] **Step 3: Verify stage3**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected: all commands exit 0 and Playwright lists stage3 specs.

- [ ] **Step 4: Commit stage3**

```powershell
git add tests/stage3 pages flows clients test-data fixtures
git commit -m "feat: migrate stage3 POS regression slice"
```

---

## Task 11: Stage4 Slice

**Files:**
- Create stage4 test files listed in the Tests section.
- Add only required paging, cloud wait list, and CRM rights card support.

- [ ] **Step 1: Migrate stage4 specs**

Sources:

- `stage4/test_crm_rights_card.py`
- `stage4/test_cloud_wait_list.py`
- `stage4/test_paging.py`

Targets:

- `tests/stage4/crm-rights-card.spec.ts`
- `tests/stage4/cloud-wait-list.spec.ts`
- `tests/stage4/paging.spec.ts`
- `pages/pos/paging/paging.page.ts`
- `flows/paging/paging.flow.ts`

- [ ] **Step 2: Verify stage4**

Run:

```powershell
npm run typecheck
npm run test:list
npm run unit
```

Expected: all commands exit 0 and Playwright lists stage4 specs.

- [ ] **Step 3: Commit stage4**

```powershell
git add tests/stage4 pages flows clients test-data fixtures
git commit -m "feat: migrate stage4 POS regression slice"
```

---

## Task 12: Final Cleanliness And Traceability Audit

**Files:**
- Modify only files with audit fixes.
- No new production files unless the audit identifies a missing dependency used by migrated tests.

- [ ] **Step 1: Check no process files remain**

Run:

```powershell
rg --files 'D:\mansuper\pos py-ts\pos-ts2.0' |
  rg 'tmp|scratch|debug|playground|example|sample|\.bak|\.old'
```

Expected: no output.

- [ ] **Step 2: Check source coverage**

Run:

```powershell
rg -n "test_crm_|test_order_|test_inventory|test_admin_|test_recall|test_report|test_print|test_kds|test_paging" 'D:\mansuper\pos py-ts\pos-ts2.0\tests'
```

Expected: output references the migrated spec files for the selected source groups.

- [ ] **Step 3: Run final static verification**

Run:

```powershell
npm run typecheck
npm run unit
npm run test:list
```

Expected: all commands exit 0.

- [ ] **Step 4: Commit audit fixes**

If audit changes were needed:

```powershell
git add .
git commit -m "chore: clean migrated POS TS workspace"
```

If no audit changes were needed:

```powershell
git status -sb
```

Expected: clean working tree.

- [ ] **Step 5: Push completed migration branch**

```powershell
git push
```

Expected: remote `main` or the active migration branch receives all migration commits.

---

## Execution Notes

- Use one fresh implementation pass per task.
- Do not start Task 7 before Task 6 verifies cleanly.
- When a source test requires a new method, add that method to the smallest correct page, flow, client, or test-data file.
- Prefer deleting unused migration scaffolding over keeping speculative files.
- Keep commits aligned with tasks so review can inspect scaffold, utilities, data, clients, fixtures, and each migrated stage separately.
