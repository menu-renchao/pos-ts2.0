# Flow Contract Rules

Flow contracts are mandatory before migrating any spec that uses a business flow.

## Contract Index

- `stage0-core-flow-contracts.md` - POS entry, order entry, settlement, inventory, and recall basics.
- `crm-flow-contracts.md` - CRM member enrollment, lookup, redeem, discount, points, pay-page, copy/move/combine/split rewards.
- `stage1-flow-contracts.md` - Admin menu, staff permissions, attendance, cash drawer, caller, and expiration manager.
- `stage2-flow-contracts.md` - Advanced order operations, recall search/edit/card detail, product-line inventory, Kiosk/Emenu/SDI.
- `stage3-flow-contracts.md` - Reporting, print/receipt, KDS/RDS/caller sync, table order, settings, CDS.
- `stage4-flow-contracts.md` - CRM rights card pricing, paging/calling completion, and cloud wait-list rules.

## Required Fields

Every flow contract must define:

- Source coverage: source file, class, test method, source line, Jira key, target spec, and target flow method.
- Preconditions: environment state, employee context, order/customer/report state, and required client or fixture state.
- Steps: business-level actions only. Do not list raw selectors or click-by-click page internals.
- Expected assertions: observable business outcomes that the target spec must assert.
- Page responsibilities: page objects that own locators, page-level actions, and page-level reads.
- Client/data responsibilities: API, DB, stub, fixture, and test-data dependencies.
- Stub behavior: deterministic first-round behavior when live systems are unavailable.
- Live gaps: selector, data, API, DB, external-device, or environment gaps that block end-to-end live verification.

## Status Rules

- `not-started`: source row exists in `docs/migration/source-to-target-map.md`, but no target implementation is complete.
- `migrated`: target spec, page, flow, and data/client dependencies exist, but live behavior is not fully verified.
- `verified`: target spec has traceable assertions, target flow contract is complete, and static audit plus available execution checks pass.
- `live-gap`: migration is blocked by a documented live-environment, selector, data, API, DB, or external-device dependency.

## Migration Gate

Before starting a slice:

1. Filter `docs/migration/source-to-target-map.md` to the slice source files.
2. Create or update a flow contract for every flow used by those rows.
3. Fill the `flows`, `pages`, `clients`, `test_data`, and `assertions` cells for any row moved to `migrated` or `verified`.
4. Run `node tools/migration-audit.mjs`.
5. Use `node tools/migration-audit.mjs --strict` only when the entire selected scope is expected to be fully verified.
