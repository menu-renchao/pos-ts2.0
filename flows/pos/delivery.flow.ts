import type {
  DeliveryHistoryOrderInfo,
  DeliveryListState,
  DeliveryPage,
} from '../../pages/pos/delivery.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import { deliveryCustomerSample } from '../../test-data/pos/delivery.js';

export type DeliveryReselectResult = {
  initialOrderListExists: boolean;
  afterPhoneDelete: DeliveryListState;
  afterReselectOrderListExists: boolean;
  afterNameDelete: DeliveryListState;
};

export class DeliveryFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly deliveryPage: DeliveryPage,
  ) {}

  async verifyPhoneAndNameDeletionReselectsCustomerList(homeUrl: string): Promise<DeliveryReselectResult> {
    await this.openDelivery(homeUrl);
    await this.deliveryPage.fillDeliveryCustomer(deliveryCustomerSample.phone, deliveryCustomerSample.name);
    await this.deliveryPage.clickHistoryCustomer();
    const initialState = await this.deliveryPage.readListState();

    await this.deliveryPage.deletePhoneLastDigit();
    const afterPhoneDelete = await this.deliveryPage.readListState();

    await this.deliveryPage.clickHistoryCustomer();
    const afterReselect = await this.deliveryPage.readListState();

    await this.deliveryPage.deleteNameSuffix();
    const afterNameDelete = await this.deliveryPage.readListState();

    return {
      initialOrderListExists: initialState.orderListExists,
      afterPhoneDelete,
      afterReselectOrderListExists: afterReselect.orderListExists,
      afterNameDelete,
    };
  }

  async searchHistoricalOrderByAddress(homeUrl: string, address: string): Promise<DeliveryHistoryOrderInfo> {
    await this.openDelivery(homeUrl);
    await this.deliveryPage.seedHistoricalOrderAddress(address);
    await this.deliveryPage.searchAddress(address.slice(0, 3));
    return this.deliveryPage.readHistoryOrderInfo();
  }

  private async openDelivery(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickDelivery();
  }
}
