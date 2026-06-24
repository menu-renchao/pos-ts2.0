import assert from 'node:assert/strict';
import { test } from 'node:test';
import { waitUntil } from './wait.js';

test('waitUntil resolves when predicate eventually returns true', async () => {
  let attempts = 0;

  await waitUntil(
    () => {
      attempts += 1;
      return attempts === 3;
    },
    { timeoutMs: 500, intervalMs: 1, description: 'third attempt' },
  );

  assert.equal(attempts, 3);
});

test('waitUntil throws timeout with description', async () => {
  await assert.rejects(
    () => waitUntil(() => false, { timeoutMs: 5, intervalMs: 1, description: 'never true' }),
    /Timed out waiting for never true/,
  );
});
