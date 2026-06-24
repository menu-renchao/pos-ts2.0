import type { DishSample, OrderType, PaymentSample } from '../../test-data/pos/domain-types.js';
import { roundMoney } from '../../utils/money.js';

export type StubOrderStatus = 'open' | 'sent' | 'paid' | 'voided' | 'refunded' | 'called' | 'completed';

export type StubOrderItem = {
  dish: DishSample;
  quantity: number;
};

export type StubOrder = {
  id: string;
  orderNumber: string;
  orderType: OrderType;
  items: StubOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: StubOrderStatus;
  paidAmount: number;
};

export type CreateOrderInput = {
  orderType: OrderType;
  items: StubOrderItem[];
};

export interface OrderClient {
  createOrder(input: CreateOrderInput): Promise<StubOrder>;
  readOrder(orderId: string): Promise<StubOrder | undefined>;
  payOrder(orderId: string, payment: PaymentSample): Promise<StubOrder>;
  completeAll(): Promise<StubOrder[]>;
}

export class StubOrderClient implements OrderClient {
  private nextId = 1;
  private readonly orders = new Map<string, StubOrder>();

  async createOrder(input: CreateOrderInput): Promise<StubOrder> {
    const id = `order-${this.nextId}`;
    const orderNumber = `OFFLINE-ORDER-${String(this.nextId).padStart(4, '0')}`;
    this.nextId += 1;
    const order = this.buildOrder(id, orderNumber, input.orderType, input.items, 'open', 0);
    this.orders.set(order.id, order);
    return order;
  }

  async readOrder(orderId: string): Promise<StubOrder | undefined> {
    return this.orders.get(orderId);
  }

  async payOrder(orderId: string, payment: PaymentSample): Promise<StubOrder> {
    const order = this.requireOrder(orderId);
    const paid = { ...order, status: 'paid' as const, paidAmount: payment.tendered };
    this.orders.set(orderId, paid);
    return paid;
  }

  async completeAll(): Promise<StubOrder[]> {
    const completed = [...this.orders.values()].map((order) => ({ ...order, status: 'completed' as const }));
    for (const order of completed) {
      this.orders.set(order.id, order);
    }
    return completed;
  }

  private buildOrder(
    id: string,
    orderNumber: string,
    orderType: OrderType,
    items: StubOrderItem[],
    status: StubOrderStatus,
    paidAmount: number,
  ): StubOrder {
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

  private requireOrder(orderId: string): StubOrder {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }
    return order;
  }
}
