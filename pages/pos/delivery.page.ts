import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import type { DeliveryOrderInfoSample } from '../../test-data/pos/delivery.js';
import { PageObject } from '../shared/page-object.js';

export type DeliveryListState = {
  orderListExists: boolean;
  customerListExists: boolean;
};

export type DeliveryHistoryOrderInfo = {
  orderCount: number;
  orderInfo: string;
};

export class DeliveryPage extends PageObject {
  private readonly addressInput: Locator;
  private readonly customerList: Locator;
  private readonly deliveryRoot: Locator;
  private readonly aptInput: Locator;
  private readonly cityInput: Locator;
  private readonly createOrderButton: Locator;
  private readonly historyCustomerButton: Locator;
  private readonly nameDeleteButton: Locator;
  private readonly nameInput: Locator;
  private readonly orderInfo: Locator;
  private readonly orderList: Locator;
  private readonly phoneDeleteButton: Locator;
  private readonly phoneInput: Locator;
  private readonly seedAddressOrderButton: Locator;
  private readonly stateInput: Locator;
  private readonly zipInput: Locator;
  private readonly noteInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addressInput = page.getByTestId('delivery-address');
    this.customerList = page.getByTestId('delivery-customer-list');
    this.deliveryRoot = page.getByTestId('delivery-page');
    this.aptInput = page.getByTestId('delivery-apt');
    this.cityInput = page.getByTestId('delivery-city');
    this.createOrderButton = page.getByTestId('delivery-create-order');
    this.historyCustomerButton = page.getByTestId('delivery-history-customer');
    this.nameDeleteButton = page.getByTestId('delivery-name-delete');
    this.nameInput = page.getByTestId('delivery-name');
    this.orderInfo = page.getByTestId('delivery-order-info');
    this.orderList = page.getByTestId('delivery-order-list');
    this.phoneDeleteButton = page.getByTestId('delivery-phone-delete');
    this.phoneInput = page.getByTestId('delivery-phone');
    this.seedAddressOrderButton = page.getByTestId('delivery-seed-address-order');
    this.stateInput = page.getByTestId('delivery-state');
    this.zipInput = page.getByTestId('delivery-zip');
    this.noteInput = page.getByTestId('delivery-note');
  }

  async fillDeliveryCustomer(phone: string, name: string): Promise<void> {
    await step('填写 Delivery 客户电话和姓名', async () => {
      await expect(this.deliveryRoot).toBeVisible();
      await this.phoneInput.fill(phone);
      await this.nameInput.fill(name);
    });
  }

  async clickHistoryCustomer(): Promise<void> {
    await step('选择 Delivery 历史客户', async () => {
      await this.historyCustomerButton.click();
    });
  }

  async deletePhoneLastDigit(): Promise<void> {
    await step('删除 Delivery 电话最后一位', async () => {
      await this.phoneDeleteButton.click();
    });
  }

  async deleteNameSuffix(): Promise<void> {
    await step('删除 Delivery 姓名后两位', async () => {
      await this.nameDeleteButton.click();
    });
  }

  async readListState(): Promise<DeliveryListState> {
    return step('读取 Delivery 左侧订单和用户列表状态', async () => ({
      orderListExists: await this.orderList.isVisible(),
      customerListExists: await this.customerList.isVisible(),
    }));
  }

  async seedHistoricalOrderAddress(address: string): Promise<void> {
    await step('创建 Delivery 历史订单地址数据', async () => {
      await this.addressInput.fill(address);
      await this.seedAddressOrderButton.click();
    });
  }

  async searchAddress(keyword: string): Promise<void> {
    await step(`按地址关键字搜索 Delivery 历史订单 ${keyword}`, async () => {
      await this.addressInput.fill(keyword);
      await this.addressInput.press('Enter');
    });
  }

  async readHistoryOrderInfo(): Promise<DeliveryHistoryOrderInfo> {
    return step('读取 Delivery 历史订单信息', async () => {
      await expect(this.orderInfo).toBeVisible();
      return {
        orderCount: Number((await this.orderList.getAttribute('data-count')) ?? '0'),
        orderInfo: ((await this.orderInfo.textContent()) ?? '').trim(),
      };
    });
  }

  async createDeliveryOrder(orderInfo: DeliveryOrderInfoSample): Promise<void> {
    await step('填写 Delivery 客户地址信息并创建订单', async () => {
      await expect(this.deliveryRoot).toBeVisible();
      await this.phoneInput.fill(orderInfo.phone);
      await this.nameInput.fill(orderInfo.name);
      await this.addressInput.fill(orderInfo.address);
      await this.aptInput.fill(orderInfo.apt);
      await this.cityInput.fill(orderInfo.city);
      await this.stateInput.fill(orderInfo.state);
      await this.zipInput.fill(orderInfo.zip);
      await this.noteInput.fill(orderInfo.note);
      await new Promise((resolve) => setTimeout(resolve, 200));
      await this.createOrderButton.click();
    });
  }
}
