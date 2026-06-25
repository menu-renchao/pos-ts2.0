import assert from 'node:assert/strict';
import { test } from 'node:test';
import { inventoryTrackedDish } from '../../test-data/pos/dishes.js';
import { StubAdminSettingsClient } from './admin-settings.client.js';
import { StubMenuClient } from './menu.client.js';
import { StubOrderClient } from './order.client.js';
import { posLicenseTypes, StubRestaurantClient } from './restaurant.client.js';

test('StubOrderClient creates orders and calculates totals', async () => {
  const client = new StubOrderClient();

  const order = await client.createOrder({
    orderType: 'togo',
    items: [{ dish: inventoryTrackedDish, quantity: 2 }],
  });

  assert.equal(order.status, 'open');
  assert.equal(order.items[0]?.quantity, 2);
  assert.equal(order.subtotal, inventoryTrackedDish.price * 2);
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

test('StubMenuClient returns POS menu item count in MenuAPI shape', async () => {
  const client = new StubMenuClient();

  const menuInfo = await client.getAllMenuGroupInfo();

  assert.equal(menuInfo.menus[0]?.productLine, 'POS');
  assert.equal(menuInfo.menus[0]?.menuItemCount, 24);
});

test('StubMenuClient stores Kiosk dish sold-out status by product line and category', async () => {
  const client = new StubMenuClient();

  await client.setDishOutOfStock('KIOSK', 'Chinese Food', 'Appetizers', 'kiosk_item');
  const dishes = await client.getAllAvailableDishInfosOfCategoryAndGroup('Chinese Food', 'Appetizers', 'KIOSK');

  assert.equal(dishes.kiosk_item?.outOfStock, true);
});

test('StubMenuClient stores product-line inventory limits independently', async () => {
  const client = new StubMenuClient();

  await client.setProductLineInventoryLimit('KIOSK', 'Crabmeat Salad', 2);

  assert.deepEqual(await client.readProductLineInventoryLimit('KIOSK', 'Crabmeat Salad'), {
    itemName: 'Crabmeat Salad',
    productLine: 'KIOSK',
    quantity: 2,
  });
  assert.equal(await client.readProductLineInventoryLimit('EMENU', 'Crabmeat Salad'), undefined);
});

test('StubRestaurantClient filters Kiosk license names like PosAPI', async () => {
  const client = new StubRestaurantClient();

  assert.deepEqual(await client.getAllLicenseNames(posLicenseTypes.kiosk, false), [
    'Kiosk License A',
    'Kiosk License B',
  ]);
  assert.deepEqual(await client.getAllLicenseNames(posLicenseTypes.kiosk, true), ['Kiosk License A']);
});
