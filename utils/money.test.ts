import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseCurrency, parsePercent, roundMoney } from './money.js';

test('parseCurrency returns numeric dollar amount', () => {
  assert.equal(parseCurrency('$1,234.50'), 1234.5);
});

test('parsePercent returns decimal rate', () => {
  assert.equal(parsePercent('10%'), 0.1);
});

test('roundMoney rounds to cents', () => {
  assert.equal(roundMoney(1.005), 1.01);
});
