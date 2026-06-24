import { inventoryTrackedDish } from '../test-data/pos/dishes.js';
import { exactCashPayment } from '../test-data/pos/payments.js';
import type { OfflineOrder, OfflinePosState } from './offline-pos-state.js';

export function createTogoOrderWithTrackedDish(state: OfflinePosState): OfflineOrder {
  const order = state.createOrder('togo');
  return state.addItem(order.id, inventoryTrackedDish, 1);
}

export function payOrderByCash(state: OfflinePosState, orderId: string): OfflineOrder {
  return state.payOrder(orderId, exactCashPayment);
}
