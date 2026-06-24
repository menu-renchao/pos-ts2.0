import assert from 'node:assert/strict';
import { test } from 'node:test';
import { inventoryTrackedDish } from '../../test-data/pos/dishes.js';
import { StubAdminSettingsClient } from './admin-settings.client.js';
import { StubOrderClient } from './order.client.js';

test('StubOrderClient creates orders and calculates totals', async () => {
  const client = new StubOrderClient();

  const order = await client.createOrder({
    orderType: 'togo',
    items: [{ dish: inventoryTrackedDish, quantity: 2 }],
  });

  assert.equal(order.status, 'open');
  assert.equal(order.items[0]?.quantity, 2);
  assert.equal(order.subtotal, 25);
  assert.ok(order.orderNumber.startsWith('OFFLINE-ORDER-'));
});

test('StubOrderClient pays order and records paid status', async () => {
  const client = new StubOrderClient();
  const order = await client.createOrder({
    orderType: 'togo',
    items: [{ dish: inventoryTrackedDish, quantity: 1 }],
  });

  const paid = await client.payOrder(order.id, { type: 'cash', tendered: 20 });

  assert.equal(paid.status, 'paid');
  assert.equal(paid.paidAmount, 20);
});

test('StubAdminSettingsClient persists setting values', async () => {
  const client = new StubAdminSettingsClient();

  await client.setSetting('separateSameDishes', true);

  assert.equal(await client.readSetting('separateSameDishes'), true);
});
