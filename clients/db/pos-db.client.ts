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
