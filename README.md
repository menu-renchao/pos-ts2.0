# POS TS 2.0

Playwright + TypeScript POS regression migration workspace.

## First-Round Migration Rule

The first migration round is code-level and offline-executable. Tests, fixtures, clients, flows, and the offline harness must typecheck, be discoverable, and run without connecting to real POS, CRM, cloud, database, or device systems.

## Useful Commands

- `npm run typecheck`
- `npm run unit`
- `npm run test:list`
- `npm run test:offline`
- `npm run audit:migration`
