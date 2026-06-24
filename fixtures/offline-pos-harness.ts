import type { Page } from '@playwright/test';
import { renderOfflinePosHome } from '../test-harness/offline-pos-app.js';
import { OfflinePosState } from '../test-harness/offline-pos-state.js';

export type OfflinePosHarness = {
  state: OfflinePosState;
  install(page: Page): Promise<void>;
};

export function createOfflinePosHarness(): OfflinePosHarness {
  const state = new OfflinePosState();
  return {
    state,
    async install(page: Page): Promise<void> {
      await page.route('**/kpos/front2/myhome.html', async (route) => {
        await route.fulfill({
          contentType: 'text/html',
          body: renderOfflinePosHome(state),
        });
      });
    },
  };
}
