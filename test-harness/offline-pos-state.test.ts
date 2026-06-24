import assert from 'node:assert/strict';
import { test } from 'node:test';
import { inventoryTrackedDish } from '../test-data/pos/dishes.js';
import { OfflinePosState } from './offline-pos-state.js';

test('createOrder returns stable offline order number', () => {
  const state = new OfflinePosState();

  const order = state.createOrder('togo');

  assert.equal(order.orderNumber, 'OFFLINE-ORDER-0001');
  assert.equal(order.status, 'open');
});

test('addItem changes subtotal and total', () => {
  const state = new OfflinePosState();
  const order = state.createOrder('togo');

  const updated = state.addItem(order.id, inventoryTrackedDish, 2);

  assert.equal(updated.subtotal, 25);
  assert.equal(updated.total, 27.06);
});

test('payOrder changes paid status and records payment', () => {
  const state = new OfflinePosState();
  const order = state.createOrder('togo');
  state.addItem(order.id, inventoryTrackedDish, 1);

  const paid = state.payOrder(order.id, { type: 'cash', tendered: 20 });

  assert.equal(paid.status, 'paid');
  assert.equal(paid.paidAmount, 20);
});

test('inventory mutations change stock quantity', () => {
  const state = new OfflinePosState();

  state.setInventory(inventoryTrackedDish.inventorySku ?? '', 10);
  state.adjustInventory(inventoryTrackedDish.inventorySku ?? '', -2);

  assert.equal(state.readInventory(inventoryTrackedDish.inventorySku ?? ''), 8);
});

test('caller and completion transitions update order status', () => {
  const state = new OfflinePosState();
  const order = state.createOrder('togo');

  assert.equal(state.callOrder(order.id).status, 'called');
  assert.equal(state.completeOrder(order.id).status, 'completed');
});
