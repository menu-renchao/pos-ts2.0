import assert from 'node:assert/strict';
import { test } from 'node:test';
import { comboPriceRequest } from './combo-price-request.js';
import { comboRequest } from './combo-request.js';
import { comboWeightRequest } from './combo-weight.js';
import { quickComboRequest } from './quick-combo-request.js';

test('combo payloads keep stable request shape', () => {
  assert.equal(comboRequest.items.length, 2);
  assert.equal(comboPriceRequest.comboId, comboRequest.comboId);
  assert.equal(comboWeightRequest.unit, 'lb');
  assert.equal(quickComboRequest.mode, 'quick');
});
