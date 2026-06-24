import { test as base } from '@playwright/test';
import { createStubClients, type StubClientSet } from './client-fixtures.js';
import { testEnvironment, type TestEnvironment } from './environment.js';
import { createOfflinePosHarness, type OfflinePosHarness } from './offline-pos-harness.js';

export type PosTestFixtures = StubClientSet & {
  environment: TestEnvironment;
  offlinePosHarness: OfflinePosHarness;
};

export const test = base.extend<PosTestFixtures>({
  environment: async ({}, use) => {
    await use(testEnvironment);
  },
  offlinePosHarness: [
    async ({ page }, use) => {
      const harness = createOfflinePosHarness();
      if (testEnvironment.testMode === 'offline') {
        await harness.install(page);
      }
      await use(harness);
    },
    { auto: true },
  ],
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
