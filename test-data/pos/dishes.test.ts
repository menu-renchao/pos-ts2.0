import assert from 'node:assert/strict';
import { test } from 'node:test';
import { defaultMenuGroup, inventoryTrackedDish, openFoodDish } from './dishes.js';

test('inventoryTrackedDish has inventory identity and positive price', () => {
  assert.equal(inventoryTrackedDish.inventorySku, 'INV-BEEF-NOODLE');
  assert.ok(inventoryTrackedDish.price > 0);
});

test('defaultMenuGroup includes migrated dish samples', () => {
  assert.equal(defaultMenuGroup.name, 'Migration Menu');
  assert.ok(defaultMenuGroup.dishes.some((dish) => dish.id === inventoryTrackedDish.id));
  assert.ok(defaultMenuGroup.dishes.some((dish) => dish.id === openFoodDish.id));
});
