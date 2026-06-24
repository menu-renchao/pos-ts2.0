import { test as base } from '@playwright/test';
import { createStubClients, type StubClientSet } from './client-fixtures.js';
import { testEnvironment, type TestEnvironment } from './environment.js';

export type PosTestFixtures = StubClientSet & {
  environment: TestEnvironment;
};

export const test = base.extend<PosTestFixtures>({
  environment: async ({}, use) => {
    await use(testEnvironment);
  },
  adminSettingsClient: async ({}, use) => {
    await use(createStubClients().adminSettingsClient);
  },
  orderClient: async ({}, use) => {
    await use(createStubClients().orderClient);
  },
  posDbClient: async ({}, use) => {
    await use(createStubClients().posDbClient);
  },
});

export { expect } from '@playwright/test';
