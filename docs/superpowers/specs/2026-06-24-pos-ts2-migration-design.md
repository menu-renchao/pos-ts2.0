# POS TS 2.0 Migration Design

## Context

The source automation suite lives under:

`D:\mansuper\pos py-ts\pos-regression-test\ui_autotest\case_pos\UI\pos_new_ui_case`

The first migration scope is limited to these source groups:

- `crm`
- `stage0`
- `stage1`
- `stage2`
- `stage3`
- `stage4`

The target repository is:

`D:\mansuper\pos py-ts\pos-ts2.0`

The target project must follow `AGENTS.md`: Playwright Test with TypeScript, Chinese test and step titles, clear `pages/` and `flows/` boundaries, stable selectors, no direct POS inner-page deep links, no `waitForTimeout`, and reusable typed test data.

## Goal

Migrate the selected Python Selenium/Pytest POS regression cases into a maintainable Playwright + TypeScript automation project.

The first round is code-level migration only. It must not connect to a real POS, CRM, cloud, database, or other live environment. API, DB, and cross-system dependencies should still be migrated into typed TypeScript client or adapter boundaries so later environment wiring can replace stubs without rewriting tests.

## Non-Goals

- Do not migrate `stage5` or unrelated suites.
- Do not run the migrated tests against a real environment in the first round.
- Do not mechanically copy Selenium base-page behavior into Playwright.
- Do not preserve brittle selector fallback chains, sleeps, XPath-heavy guessing, or test-level parsing when the target page object can expose typed reads.
- Do not make API-assisted setup the default POS navigation strategy.

## Source Findings

The selected groups contain roughly:

- `crm`: 8 Python files, about 1,462 lines.
- `stage0`: 5 Python files, about 2,546 lines.
- `stage1`: 7 Python files, about 2,350 lines.
- `stage2`: 6 Python files, about 5,556 lines.
- `stage3`: 9 Python files, about 6,818 lines.
- `stage4`: 4 Python files, about 609 lines.

The selected cases depend on more than POS page objects. They also depend on:

- POS API helpers such as admin setting, staff, menu, tax, charge, order, restaurant, KDS config, expiration manager, and staff shift plan APIs.
- DB helpers such as `PosDBFunction` and `DBHandler`.
- Domain objects and enums from `common.object_class`.
- Test data from `data.pos_test_data`, `data.case_url`, and several JSON request payload files.
- Page areas outside POS new UI, including CRM, OO, SDI, Emenu, Kiosk, Cloud Report, and expiration manager pages.
- Common helpers such as Jira annotations, date calculation, caller-id execution, amount parsing, and report data utilities.

## Recommended Approach

Use a full-boundary, stub-first migration.

The migration should build the target project layers first, then migrate tests in domain slices. The API, DB, and cross-system dependencies should be represented as typed TypeScript adapters from the beginning, even when their first implementation returns fixture-backed data or throws a clear "not wired to live environment" error.

This avoids two failure modes:

- Moving only UI scripts first, which would leave hidden API/DB assumptions inside tests.
- Translating Python files one-to-one, which would carry Selenium-era structure into the new Playwright codebase.

## Target Structure

```text
pos-ts2.0/
  tests/
    crm/
    stage0/
    stage1/
    stage2/
    stage3/
    stage4/
  pages/
    pos/
    crm/
    oo/
    sdi/
    emenu/
    kiosk/
    cloud-report/
    expiration-manager/
    shared/
  flows/
    pos/
    crm/
    oo/
    reporting/
    inventory/
    settlement/
    recall/
  clients/
    pos-api/
    cloud-report-api/
    expiration-manager-api/
    db/
    shared/
  fixtures/
  test-data/
    pos/
    crm/
    reports/
    payloads/
  utils/
  docs/
```

## Layer Responsibilities

### Tests

Specs express business scenarios and assertions only.

Rules:

- Test and `describe` titles must be Chinese.
- Jira issue keys stay in spec files through Playwright native `annotation`.
- Test bodies should call fixtures, flows, page reads, and test-data factories.
- Tests must not parse currency, locate raw DOM, query DB directly, or decide business fallback strategy.

### Pages

Page objects hold page structure, locators, single-page actions, and focused reads.

Rules:

- Centralize selectors on the owning page object.
- Use `data-testid` first when available.
- Use semantic Playwright locators when no stable test id exists.
- Avoid broad `.or()` chains and selector enumeration.
- Do not place business choices such as "pick first available license" or "select any usable table" in page objects.
- Split large POS areas into focused submodules, especially order entry, recall, settlement, admin, report, CRM, KDS, inventory, paging, and expiration pages.

### Flows

Flows hold business intent and multi-step orchestration.

Examples:

- Enter POS from the configured home URL.
- Select a usable license and enter employee context.
- Create a no-table order.
- Add menu items and save.
- Settle by cash, credit, gift card, loyalty, or split payment.
- Recall the latest visible order and validate business state.
- Prepare CRM member state through client adapters.
- Prepare report data through client adapters.
- Reset admin settings after a scenario.

### Clients

Clients model API and DB dependencies as typed interfaces.

The first implementation should be stub-first:

- `StubPosAdminSettingsClient`
- `StubPosMenuClient`
- `StubPosStaffClient`
- `StubPosOrderClient`
- `StubPosDbClient`
- `StubCloudReportClient`
- `StubExpirationManagerClient`

Each adapter should expose the same intent that Python tests rely on, but not make network or DB calls in the first round.

Where a migrated test cannot be meaningful without live data, the adapter should return deterministic fixture data or throw a typed `LiveEnvironmentRequiredError` behind an opt-in mode. The default test project must remain offline-safe.

### Fixtures

Fixtures wire Playwright `page`, page objects, flows, clients, and environment config.

Expected fixture groups:

- POS pages and flows.
- Cross-system pages and flows.
- Stub API/DB clients.
- Environment config.
- Test data factories.

### Test Data

Reusable business data belongs under `test-data/`.

Examples:

- POS dishes, categories, groups, options, combos, taxes, discounts, payments, customers, staff, permissions, tables, and report samples.
- CRM member and reward samples.
- Payloads currently stored as `combo_request.json`, `combo_price_request.json`, `combo_weight.json`, and `quick_combo_request.json`.

Dynamic samples should be created through small factory functions, not inline timestamps inside tests.

### Utils

Utilities should be pure and framework-light.

Expected utilities:

- `waitUntil()` for quiet retry loops.
- Jira annotation builder.
- Currency and percentage parsing.
- Date and time helpers.
- Random data generation.
- Structured error classes.
- Step decorator/helper for Chinese report steps.

## Migration Mapping

### Source Test Groups

- `crm/*.py` -> `tests/crm/*.spec.ts`
- `stage0/*.py` -> `tests/stage0/*.spec.ts`
- `stage1/*.py` -> `tests/stage1/*.spec.ts`
- `stage2/*.py` -> `tests/stage2/*.spec.ts`
- `stage3/*.py` -> `tests/stage3/*.spec.ts`
- `stage4/*.py` -> `tests/stage4/*.spec.ts`

### Source POS Page Objects

- `pages.pos_new_ui.updated.homepage.Homepage` -> `pages/pos/home.page.ts` plus POS entry flows.
- `order_item_page.OrderItemPage` -> `pages/pos/order-dishes/` modules and `flows/pos/order-entry.flow.ts`.
- `recall_page.RecallPage` -> `pages/pos/recall/` modules and `flows/recall/recall.flow.ts`.
- `settle_page.Settle` -> `pages/pos/settlement/` modules and `flows/settlement/settlement.flow.ts`.
- `admin_page.Admin` and related admin/menu/inventory pages -> `pages/pos/admin/`, `pages/pos/menu/`, `pages/pos/inventory/`, and related flows.
- `crmpage.CrmMember` and loyalty/gift-card pages -> `pages/pos/crm/` and CRM flows.
- KDS, CDS, caller, paging, report, table, split order, SDI, and expiration pages -> focused page modules under `pages/pos/` or cross-system folders depending on actual product surface.

### Source API/DB Helpers

- `api.pos.*` -> `clients/pos-api/*`
- `api.cloud_api.cloud_report.*` -> `clients/cloud-report-api/*`
- `api.cloud_api.expiration_manager.*` -> `clients/expiration-manager-api/*`
- `db_function.pos_db_function.PosDBFunction` and `common.db.DBHandler` -> `clients/db/*`
- `common.object_class.*` -> `test-data/` models and TypeScript enums/types.

## First-Round Implementation Order

1. Scaffold Playwright + TypeScript project files.
2. Add shared utilities: steps, Jira annotation, wait polling, parsing, errors, and deterministic data factories.
3. Add typed domain models and test data converted from Python data and JSON payloads.
4. Add stub API/DB clients and fixtures.
5. Add core POS page objects and flows needed by the earliest migrated cases.
6. Migrate `stage0` as the first vertical slice because it covers POS home, order, settle, inventory, and recall basics.
7. Migrate `crm`, `stage1`, `stage2`, `stage3`, and `stage4` in slices, adding only the pages, flows, clients, and data each slice uses.
8. Run static checks and Playwright discovery without live environment.

## Offline Verification Strategy

Because first-round tests must not connect to real systems, verification should focus on code quality and discovery:

- TypeScript compilation.
- ESLint if configured.
- Playwright test listing/discovery.
- Unit tests for pure utilities and data factories.
- Fixture construction checks using stub clients.

Any spec that requires a live environment to execute end to end should be taggable or skippable through project configuration until live wiring is added.

## Risks And Mitigations

### Selector Accuracy

Risk: The source Selenium locators may be brittle or unavailable in Playwright without inspecting the live DOM.

Mitigation: Preserve selector intent in page APIs, prefer stable selectors required by `AGENTS.md`, and mark uncertain selectors with explicit implementation notes in page objects. Do not broaden selectors with guessing chains.

### Hidden API/DB Coupling

Risk: Source tests often rely on API or DB state that is not obvious from the UI steps.

Mitigation: Move these dependencies into named client methods and setup flows. Tests should call intent-level setup, not raw DB or API methods.

### Oversized Page Objects

Risk: Python pages such as order item and recall carry many independent behaviors.

Mitigation: Split into submodules by page region or capability, with thin facades only when useful for fixture ergonomics.

### First-Round Non-Execution

Risk: Code compiles but may still need live DOM adjustment later.

Mitigation: Keep migration traceability and strict TypeScript boundaries. Later live-environment work can focus on selectors and timing without reworking test design.

## Acceptance Criteria

The migration design is satisfied when:

- The target repository contains a Playwright + TypeScript project scaffold.
- Selected source groups have corresponding TypeScript spec files under `tests/`.
- Only methods, pages, clients, data, and helpers required by `crm/stage0/stage1/stage2/stage3/stage4` are migrated.
- API/DB/cross-system dependencies are represented by typed adapters or stubs.
- Test titles, step titles, and Jira metadata follow `AGENTS.md`.
- Page and flow responsibilities are separated.
- Static verification can run without connecting to real environments.
- Remaining live-environment gaps are explicit and localized.

