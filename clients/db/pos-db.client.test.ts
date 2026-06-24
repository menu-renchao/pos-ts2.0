import assert from 'node:assert/strict';
import { test } from 'node:test';
import { StubPosDbClient } from './pos-db.client.js';

test('StubPosDbClient remembers latest order number', async () => {
  const client = new StubPosDbClient();

  await client.rememberLatestOrderNumber('OFFLINE-ORDER-1000');

  assert.equal(await client.readLatestOrderNumber(), 'OFFLINE-ORDER-1000');
});
