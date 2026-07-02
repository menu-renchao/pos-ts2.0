import assert from 'node:assert/strict';
import test from 'node:test';

import { messageTypeLabels } from './message-center.page.js';

test('maps self dine in message type to live Chinese label', () => {
  assert.deepEqual(messageTypeLabels('Self-dine-in'), ['Self-dine-in', '自助点餐']);
});
