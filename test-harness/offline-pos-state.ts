import type { DishSample, OrderType, PaymentSample } from '../test-data/pos/domain-types.js';
import { roundMoney } from '../utils/money.js';

export type OfflineOrderStatus = 'open' | 'sent' | 'paid' | 'voided' | 'refunded' | 'called' | 'completed';

export type OfflineOrderItem = {
  dish: DishSample;
  quantity: number;
};

export type OfflineOrder = {
  id: string;
  orderNumber: string;
  orderType: OrderType;
  items: OfflineOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OfflineOrderStatus;
  paidAmount: number;
};

export class OfflinePosState {
  private nextOrderId = 1;
  private readonly orders = new Map<string, OfflineOrder>();
  private readonly inventory = new Map<string, number>();

  createOrder(orderType: OrderType): OfflineOrder {
    const id = `order-${this.nextOrderId}`;
    const orderNumber = `OFFLINE-ORDER-${String(this.nextOrderId).padStart(4, '0')}`;
    this.nextOrderId += 1;
    const order = this.buildOrder(id, orderNumber, orderType, [], 'open', 0);
    this.orders.set(id, order);
    return order;
  }

  addItem(orderId: string, dish: DishSample, quantity: number): OfflineOrder {
    const order = this.requireOrder(orderId);
    const updated = this.buildOrder(
      order.id,
      order.orderNumber,
      order.orderType,
      [...order.items, { dish, quantity }],
      order.status,
      order.paidAmount,
    );
    this.orders.set(orderId, updated);
    return updated;
  }

  sendKitchen(orderId: string): OfflineOrder {
    return this.updateStatus(orderId, 'sent');
  }

  payOrder(orderId: string, payment: PaymentSample): OfflineOrder {
    const order = this.requireOrder(orderId);
    const paid = { ...order, status: 'paid' as const, paidAmount: payment.tendered };
    this.orders.set(orderId, paid);
    return paid;
  }

  voidItem(orderId: string, dishId: string): OfflineOrder {
    const order = this.requireOrder(orderId);
    const updated = this.buildOrder(
      order.id,
      order.orderNumber,
      order.orderType,
      order.items.filter((item) => item.dish.id !== dishId),
      order.status,
      order.paidAmount,
    );
    this.orders.set(orderId, updated);
    return updated;
  }

  refundOrder(orderId: string): OfflineOrder {
    return this.updateStatus(orderId, 'refunded');
  }

  callOrder(orderId: string): OfflineOrder {
    return this.updateStatus(orderId, 'called');
  }

  completeOrder(orderId: string): OfflineOrder {
    return this.updateStatus(orderId, 'completed');
  }

  readOrder(orderId: string): OfflineOrder | undefined {
    return this.orders.get(orderId);
  }

  setInventory(sku: string, quantity: number): void {
    this.inventory.set(sku, quantity);
  }

  adjustInventory(sku: string, delta: number): number {
    const nextQuantity = this.readInventory(sku) + delta;
    this.inventory.set(sku, nextQuantity);
    return nextQuantity;
  }

  readInventory(sku: string): number {
    return this.inventory.get(sku) ?? 0;
  }

  private updateStatus(orderId: string, status: OfflineOrderStatus): OfflineOrder {
    const order = this.requireOrder(orderId);
    const updated = { ...order, status };
    this.orders.set(orderId, updated);
    return updated;
  }

  private buildOrder(
    id: string,
    orderNumber: string,
    orderType: OrderType,
    items: OfflineOrderItem[],
    status: OfflineOrderStatus,
    paidAmount: number,
  ): OfflineOrder {
    const subtotal = roundMoney(items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0));
    const tax = roundMoney(items.reduce((sum, item) => sum + item.dish.price * item.quantity * (item.dish.taxRate ?? 0), 0));
    return {
      id,
      orderNumber,
      orderType,
      items,
      subtotal,
      tax,
      total: roundMoney(subtotal + tax),
      status,
      paidAmount,
    };
  }

  private requireOrder(orderId: string): OfflineOrder {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Offline order not found: ${orderId}`);
    }
    return order;
  }
}
