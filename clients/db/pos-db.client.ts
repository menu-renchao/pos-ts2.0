export interface PosDbClient {
  readLatestOrderNumber(): Promise<string>;
  rememberLatestOrderNumber(orderNumber: string): Promise<void>;
}

export class StubPosDbClient implements PosDbClient {
  private latestOrderNumber = 'OFFLINE-ORDER-0001';

  async readLatestOrderNumber(): Promise<string> {
    return this.latestOrderNumber;
  }

  async rememberLatestOrderNumber(orderNumber: string): Promise<void> {
    this.latestOrderNumber = orderNumber;
  }
}
