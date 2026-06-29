import { takeOutTaxFreeDish } from '../../test-data/pos/dishes.js';

export type PosAuditLog = {
  operateType: string;
  operateItem: string;
  operateCategory: string;
  operatePath: string;
  oldValue: string;
  newValue: string;
  displayName: string;
};

export interface PosDbClient {
  readLatestOrderNumber(): Promise<string>;
  rememberLatestOrderNumber(orderNumber: string): Promise<void>;
  readOrderIdByOrderNumber(orderNumber: string): Promise<number>;
  addCreditCardPaymentFailureRecord(orderId: number): Promise<void>;
  readTaxRateById(taxId: string): Promise<number>;
  recordMenuItemTaxAudit(itemName: string): Promise<void>;
  readLatestAuditLog(): Promise<PosAuditLog>;
}

export class StubPosDbClient implements PosDbClient {
  private latestOrderNumber = 'OFFLINE-ORDER-0001';
  private latestAuditLog: PosAuditLog = {
    operateType: '',
    operateItem: '',
    operateCategory: '',
    operatePath: '',
    oldValue: '',
    newValue: '',
    displayName: '',
  };

  async readLatestOrderNumber(): Promise<string> {
    return this.latestOrderNumber;
  }

  async rememberLatestOrderNumber(orderNumber: string): Promise<void> {
    this.latestOrderNumber = orderNumber;
  }

  async readOrderIdByOrderNumber(orderNumber: string): Promise<number> {
    const numericOrderNumber = Number(orderNumber.replace(/\D+/g, ''));
    return Number.isFinite(numericOrderNumber) ? numericOrderNumber : 1;
  }

  async addCreditCardPaymentFailureRecord(_orderId: number): Promise<void> {
    return undefined;
  }

  async readTaxRateById(taxId: string): Promise<number> {
    if (taxId !== takeOutTaxFreeDish.taxId) {
      throw new Error(`Unknown offline tax id: ${taxId}`);
    }

    return takeOutTaxFreeDish.taxRate ?? 0;
  }

  async recordMenuItemTaxAudit(itemName: string): Promise<void> {
    this.latestAuditLog = {
      operateType: 'Edit',
      operateItem: 'Edit Menu Item Tax',
      operateCategory: 'Tax',
      operatePath: 'Menu-Menu',
      oldValue: `${itemName}: take out orders taxes`,
      newValue: `${itemName}: take out orders tax free`,
      displayName: 'Edit Menu Item Tax',
    };
  }

  async readLatestAuditLog(): Promise<PosAuditLog> {
    return { ...this.latestAuditLog };
  }
}

export class UnsupportedLivePosDbClient implements PosDbClient {
  async readLatestOrderNumber(): Promise<string> {
    throw new Error('Live PosDbClient is not configured. Provide a real DB client before reading live order numbers.');
  }

  async rememberLatestOrderNumber(_orderNumber: string): Promise<void> {
    return undefined;
  }

  async readOrderIdByOrderNumber(orderNumber: string): Promise<number> {
    throw new Error(`Live PosDbClient is not configured. Cannot read order id for order number ${orderNumber}.`);
  }

  async addCreditCardPaymentFailureRecord(orderId: number): Promise<void> {
    throw new Error(`Live PosDbClient is not configured. Cannot insert CREDIT_CARD FAILED payment record for order id ${orderId}.`);
  }

  async readTaxRateById(taxId: string): Promise<number> {
    throw new Error(`Live PosDbClient is not configured. Cannot read tax rate ${taxId}.`);
  }

  async recordMenuItemTaxAudit(_itemName: string): Promise<void> {
    return undefined;
  }

  async readLatestAuditLog(): Promise<PosAuditLog> {
    throw new Error('Live PosDbClient is not configured. Cannot read latest audit log.');
  }
}
