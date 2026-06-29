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
    this.addressInput = page.getByTestId('delivery-address').or(page.locator('#dlvInfoaddr'));
    this.customerList = page.getByTestId('delivery-customer-list').or(page.locator('#dlvpleftpnlInner .dlvponeinfobx, #dlvpleftpnlInner > div'));
    this.deliveryRoot = page.getByTestId('delivery-page').or(page.locator('#dlvInfoPh'));
    this.aptInput = page.getByTestId('delivery-apt').or(page.locator('#dlvInfoaptG'));
    this.cityInput = page.getByTestId('delivery-city').or(page.locator('#dlvInfoCityG'));
    this.createOrderButton = page.getByTestId('delivery-create-order').or(page.locator('#dlvpOdbx'));
    this.historyCustomerButton = page.getByTestId('delivery-history-customer').or(page.locator('#dlvpleftpnlInner > div').first());
    this.nameDeleteButton = page.getByTestId('delivery-name-delete').or(page.locator('[id="myKs_<"]'));
    this.nameInput = page.getByTestId('delivery-name').or(page.locator('#dlvInfoNm'));
    this.orderInfo = page.getByTestId('delivery-order-info').or(page.locator('#dlvpleftpnlInner .dlvponeinfobx.re').first());
    this.orderList = page.getByTestId('delivery-order-list').or(page.locator('#rcordersmy'));
    this.phoneDeleteButton = page.getByTestId('delivery-phone-delete').or(page.locator('#mykbfl_back'));
    this.phoneInput = page.getByTestId('delivery-phone').or(page.locator('#dlvInfoPh'));
    this.seedAddressOrderButton = page.getByTestId('delivery-seed-address-order');
    this.stateInput = page.getByTestId('delivery-state').or(page.locator('#dlvInfostateG'));
    this.zipInput = page.getByTestId('delivery-zip').or(page.locator('#dlvInfozipcodeG'));
    this.noteInput = page.getByTestId('delivery-note').or(page.locator('#dlvInfoNote'));
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
      await this.phoneInput.click();
      await this.phoneDeleteButton.click();
    });
  }

  async deleteNameSuffix(): Promise<void> {
    await step('删除 Delivery 姓名后两位', async () => {
      await this.nameInput.click();
      await this.nameDeleteButton.click();
    });
  }

  async readListState(): Promise<DeliveryListState> {
    return step('读取 Delivery 左侧订单和用户列表状态', async () => {
      const liveCustomerRows = this.page.locator('#dlvpleftpnlInner .dlvponeinfobx, #dlvpleftpnlInner > div');
      return {
        orderListExists: await this.orderList.isVisible().catch(() => false),
        customerListExists:
          (await this.customerList.first().isVisible().catch(() => false)) ||
          (await liveCustomerRows.first().isVisible().catch(() => false)),
      };
    });
  }

  async seedHistoricalOrderAddress(address: string): Promise<void> {
    await step('创建 Delivery 历史订单地址数据', async () => {
      await this.addressInput.fill(address);
      if (!(await this.seedAddressOrderButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        return;
      }
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
      const liveRows = this.page.locator('#dlvpleftpnlInner .dlvponeinfobx');
      if (await liveRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        return {
          orderCount: await liveRows.count(),
          orderInfo: ((await liveRows.first().textContent()) ?? '').trim(),
        };
      }
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
