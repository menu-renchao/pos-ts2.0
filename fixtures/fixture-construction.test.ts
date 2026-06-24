import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createStubClients } from './client-fixtures.js';
import { testEnvironment } from './environment.js';

test('testEnvironment defaults to offline stub mode', () => {
  assert.equal(testEnvironment.clientMode, 'stub');
  assert.match(testEnvironment.posHomeUrl, /myhome\.html$/);
});

test('createStubClients constructs deterministic client set', async () => {
  const clients = createStubClients();

  await clients.adminSettingsClient.setSetting('separateSameDishes', true);

  assert.equal(await clients.adminSettingsClient.readSetting('separateSameDishes'), true);
  assert.equal(await clients.posDbClient.readLatestOrderNumber(), 'OFFLINE-ORDER-0001');
});
