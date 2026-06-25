import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class KioskHomePage extends PageObject {
  private readonly cashPaymentButton: Locator;
  private readonly checkoutButton: Locator;
  private readonly itemButton: Locator;
  private readonly licenseNames: Locator;
  private readonly kioskRoot: Locator;
  private readonly orderTypeToGoButton: Locator;
  private readonly selectLicenseButton: Locator;
  private readonly skipButton: Locator;
  private readonly soldOutPopup: Locator;
  private readonly viewOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.kioskRoot = page.getByTestId('kiosk-page');
    this.cashPaymentButton = page.getByTestId('kiosk-cash-payment');
    this.checkoutButton = page.getByTestId('kiosk-checkout');
    this.itemButton = page.getByTestId('kiosk-item');
    this.licenseNames = page.getByTestId('kiosk-license-name');
    this.orderTypeToGoButton = page.getByTestId('kiosk-order-type-to-go');
    this.selectLicenseButton = page.getByTestId('kiosk-select-license');
    this.skipButton = page.getByTestId('kiosk-skip');
    this.soldOutPopup = page.getByTestId('kiosk-sold-out-popup');
    this.viewOrderButton = page.getByTestId('kiosk-view-order');
  }

  async createCommonItem(
    itemName: string,
    price: number,
    options: { group?: string; category?: string; inventorySku?: string } = {},
  ): Promise<void> {
    await step(`Kiosk 创建普通菜 ${itemName}`, async () => {
      await this.page.evaluate(
        ({ category, group, inventorySku, name, itemPrice }) => {
          const item = {
            category,
            group,
            inventorySku,
            name,
            price: itemPrice,
            taxRate: 0.0825,
          };
          localStorage.setItem('offlineKioskItem', JSON.stringify(item));
          window.dispatchEvent(new CustomEvent('offline-kiosk-item-updated', { detail: item }));
        },
        {
          category: options.category ?? 'Appetizers',
          group: options.group ?? 'Chinese Food',
          inventorySku: options.inventorySku ?? '',
          name: itemName,
          itemPrice: price,
        },
      );
    });
  }

  async applyOfflineTakeoutTaxExempt(enabled: boolean): Promise<void> {
    await step(`同步离线 Kiosk To Go 免税设置为 ${enabled}`, async () => {
      await this.page.evaluate((takeoutTaxExempt) => {
        localStorage.setItem('offlineTakeoutTaxExempt', String(takeoutTaxExempt));
        window.dispatchEvent(new CustomEvent('offline-takeout-tax-exempt-updated', { detail: takeoutTaxExempt }));
      }, enabled);
    });
  }

  async applyOfflineKioskLicenseNames(licenseNames: string[]): Promise<void> {
    await step('同步离线 Kiosk License 列表', async () => {
      await this.page.evaluate((names) => {
        localStorage.setItem('offlineKioskLicenseNames', JSON.stringify(names));
        window.dispatchEvent(new CustomEvent('offline-kiosk-license-names-updated', { detail: names }));
      }, licenseNames);
    });
  }

  async openFromPosHomeUrl(posHomeUrl: string): Promise<void> {
    await step('打开 Kiosk 页面', async () => {
      const posUrl = new URL(posHomeUrl);
      await this.page.goto(`${posUrl.origin}/kpos/kiosklite/`);
      await expect(this.kioskRoot).toBeVisible();
    });
  }

  async selectLicense(): Promise<void> {
    await step('Kiosk 选择 License', async () => {
      await this.selectLicenseButton.click();
    });
  }

  async readAllKioskLicenseNames(): Promise<string[]> {
    return step('读取 Kiosk 登录 License 列表', async () => {
      await expect(this.kioskRoot).toBeVisible();
      const licenseNames = await this.licenseNames.allTextContents();
      return licenseNames.map((licenseName) => licenseName.trim()).filter(Boolean);
    });
  }

  async chooseToGoOrderType(): Promise<void> {
    await step('Kiosk 选择 To Go 订单类型', async () => {
      await this.orderTypeToGoButton.click();
    });
  }

  async addItem(group: string, category: string, itemName: string, quantity = 1): Promise<void> {
    await step(`Kiosk 从 ${group}/${category} 添加菜品 ${itemName}`, async () => {
      await expect(this.itemButton).toHaveText(itemName);
      for (let index = 0; index < quantity; index += 1) {
        await this.itemButton.click();
      }
    });
  }

  async isSoldOutPopupVisible(): Promise<boolean> {
    return step('判断 Kiosk 库存不足弹窗是否展示', async () => this.soldOutPopup.isVisible());
  }

  async viewOrder(): Promise<void> {
    await step('Kiosk 查看购物车订单', async () => {
      await this.viewOrderButton.click();
    });
  }

  async checkout(): Promise<void> {
    await step('Kiosk 进入 Checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  async skipOptionalInfo(): Promise<void> {
    await step('Kiosk 跳过可选信息', async () => {
      await this.skipButton.click();
    });
  }

  async cashPayment(): Promise<void> {
    await step('Kiosk 使用现金支付', async () => {
      await this.cashPaymentButton.click();
    });
  }
}
