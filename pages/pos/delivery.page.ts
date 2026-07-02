import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { deliveryOrderInfoSample, type DeliveryOrderInfoSample } from '../../test-data/pos/delivery.js';
import { waitUntil } from '../../utils/wait.js';
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
  private lastAddressSearchKeyword = '';
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
    this.customerList = page.getByTestId('delivery-customer-list').or(page.locator('#dlvpleftpnlInner .dlvponeinfobx'));
    this.deliveryRoot = page.getByTestId('delivery-page').or(page.locator('#dlvInfoPh'));
    this.aptInput = page.getByTestId('delivery-apt').or(page.locator('#dlvInfoaptG'));
    this.cityInput = page.getByTestId('delivery-city').or(page.locator('#dlvInfoCityG'));
    this.createOrderButton = page.getByTestId('delivery-create-order').or(page.locator('#dlvpOdbx'));
    this.historyCustomerButton = page.getByTestId('delivery-history-customer').or(page.locator('#dlvpleftpnlInner .dlvponeinfobx').first());
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
      await expect(this.historyCustomerButton).toBeVisible({ timeout: 10_000 });
      await this.historyCustomerButton.click();
    });
  }

  async deletePhoneLastDigit(): Promise<void> {
    await step('删除 Delivery 电话最后一位', async () => {
      await this.focusInputEnd(this.phoneInput, 'dlvInfoPh');
      await this.phoneDeleteButton.click();
      if (!(await this.waitForLiveCustomerListMode().then(() => true).catch(() => false))) {
        await this.phoneDeleteButton.click();
        await this.waitForLiveCustomerListMode();
      }
    });
  }

  async deleteNameSuffix(): Promise<void> {
    await step('删除 Delivery 姓名后两位', async () => {
      await this.focusInputEnd(this.nameInput, 'dlvInfoNm');
      await this.nameDeleteButton.click().catch(() => undefined);
      if (await this.waitForLiveCustomerListMode().then(() => true).catch(() => false)) {
        return;
      }
      await this.trimLiveInput('dlvInfoNm', 2);
      if (await this.waitForLiveCustomerListMode().then(() => true).catch(() => false)) {
        return;
      }
      await this.clearLiveInput('dlvInfoNm');
      await this.waitForLiveCustomerListMode();
    });
  }

  async readListState(): Promise<DeliveryListState> {
    return step('读取 Delivery 左侧订单和用户列表状态', async () => {
      const liveCustomerRows = this.page.locator('#dlvpleftpnlInner .dlvponeinfobx');
      const liveOrderHeader = this.page.locator('#rcordersmy');
      const liveOrderSummary = this.page.getByText(/^Orders:\s*\d+/);
      const liveOrderListExists =
        ((await liveOrderHeader.count()) > 0 && (await liveOrderHeader.first().isVisible().catch(() => false))) ||
        (await liveOrderSummary.first().isVisible().catch(() => false));
      return {
        orderListExists:
          (await this.orderList.isVisible().catch(() => false)) ||
          liveOrderListExists,
        customerListExists:
          (await this.customerList.first().isVisible().catch(() => false)) ||
          (await liveCustomerRows.first().isVisible().catch(() => false)),
      };
    });
  }

  async seedHistoricalOrderAddress(address: string): Promise<void> {
    await step('创建 Delivery 历史订单地址数据', async () => {
      if (!(await this.seedAddressOrderButton.isVisible({ timeout: 1_000 }).catch(() => false))) {
        await this.createLiveHistoricalAddressOrder(address);
        return;
      }
      await this.addressInput.fill(address);
      await this.seedAddressOrderButton.click();
    });
  }

  async searchAddress(keyword: string): Promise<void> {
    await step(`按地址关键字搜索 Delivery 历史订单 ${keyword}`, async () => {
      this.lastAddressSearchKeyword = keyword;
      await this.addressInput.fill(keyword);
      await this.addressInput.press('Enter');
    });
  }

  async readHistoryOrderInfo(): Promise<DeliveryHistoryOrderInfo> {
    return step('读取 Delivery 历史订单信息', async () => {
      const liveList = this.page.locator('#dlvpleftpnlInner');
      if (await liveList.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await waitUntil(
          async () => (await this.page.locator('#dlvpleftpnlInner .dlvponeinfobx').count()) > 0,
          { timeoutMs: 10_000, intervalMs: 200, description: 'Delivery live history rows loaded' },
        );
        const rowTexts = await liveList.evaluate((element) =>
          Array.from(element.querySelectorAll('.dlvponeinfobx'))
            .map((child) => child.textContent?.trim() ?? '')
            .filter(Boolean),
        );
        const keyword = this.lastAddressSearchKeyword.toLowerCase();
        const matchingRow = rowTexts.find((text) => text.toLowerCase().includes(keyword)) ?? rowTexts[0] ?? '';
        return {
          orderCount: rowTexts.length,
          orderInfo: matchingRow,
        };
      }
      await expect(this.orderInfo).toBeVisible();
      return {
        orderCount: Number((await this.orderList.getAttribute('data-count', { timeout: 1_000 }).catch(() => '0')) ?? '0'),
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

  private async focusInputEnd(input: Locator, liveInputId: string): Promise<void> {
    await input.click();
    await input.evaluate((element) => {
      const htmlInput = element as HTMLInputElement;
      htmlInput.focus();
      htmlInput.setSelectionRange(htmlInput.value.length, htmlInput.value.length);
    });
    await waitUntil(
      () => this.page.evaluate((id) => document.activeElement?.id === id, liveInputId),
      { timeoutMs: 2_000, intervalMs: 100, description: `${liveInputId} focused` },
    );
  }

  private async waitForLiveCustomerListMode(): Promise<void> {
    const liveOrderHeader = this.page.locator('#rcordersmy');
    const liveOrderSummary = this.page.getByText(/^Orders:\s*\d+/);
    const liveFirstCustomer = this.page.locator('#dlvpleftpnlInner .dlvponeinfobx').first();
    await waitUntil(
      async () =>
        !(await liveOrderHeader.first().isVisible().catch(() => false)) &&
        !(await liveOrderSummary.first().isVisible().catch(() => false)) &&
        (await liveFirstCustomer.isVisible().catch(() => false)),
      { timeoutMs: 5_000, intervalMs: 200, description: 'Delivery live customer list mode' },
    );
  }

  private async trimLiveInput(inputId: string, count: number): Promise<void> {
    await this.page.evaluate(
      ({ inputId, count }) => {
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        if (!input) {
          return;
        }
        input.focus();
        input.value = input.value.slice(0, Math.max(0, input.value.length - count));
        for (const eventName of ['input', 'change', 'keyup']) {
          input.dispatchEvent(new Event(eventName, { bubbles: true, cancelable: true }));
        }
      },
      { inputId, count },
    );
  }

  private async clearLiveInput(inputId: string): Promise<void> {
    await this.page.evaluate((inputId) => {
      const input = document.getElementById(inputId) as HTMLInputElement | null;
      if (!input) {
        return;
      }
      input.focus();
      input.value = '';
      for (const eventName of ['input', 'change', 'keyup']) {
        input.dispatchEvent(new Event(eventName, { bubbles: true, cancelable: true }));
      }
    }, inputId);
  }

  private async createLiveHistoricalAddressOrder(address: string): Promise<void> {
    await this.createDeliveryOrder({
      ...deliveryOrderInfoSample,
      address,
    });
    const firstMenuItem = this.page
      .getByText('test', { exact: true })
      .or(this.page.getByText('Spi Thai Gn Curry Chk', { exact: true }))
      .first();
    await expect(firstMenuItem).toBeVisible({ timeout: 15_000 });
    await firstMenuItem.click();
    await waitUntil(
      async () => (await this.page.locator('#oodbtbx [id*="itemdsh"]').count()) > 0,
      { timeoutMs: 10_000, intervalMs: 200, description: 'Delivery seed order has item' },
    );
    await this.page.locator('#odSave').click();
    await waitUntil(
      async () =>
        (await this.page.locator('#loginPage.ui-page-active').isVisible().catch(() => false)) ||
        !(await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)),
      { timeoutMs: 15_000, intervalMs: 200, description: 'Delivery seed order saved' },
    );
  }
}
