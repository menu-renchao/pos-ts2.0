import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class EmenuOrderPage extends PageObject {
  private readonly addCartButton: Locator;
  private readonly addItemButton: Locator;
  private readonly callServerButton: Locator;
  private readonly cartButton: Locator;
  private readonly closeOrderCardButton: Locator;
  private readonly firstCategoryButton: Locator;
  private readonly firstCategoryItemButton: Locator;
  private readonly orderCard: Locator;
  private readonly orderRoot: Locator;
  private readonly placeOrderButton: Locator;
  private readonly soldOutPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.addCartButton = page.getByTestId('emenu-add-cart');
    this.addItemButton = page.getByTestId('emenu-add-item');
    this.callServerButton = page.getByTestId('emenu-call-server');
    this.cartButton = page.getByTestId('emenu-cart');
    this.closeOrderCardButton = page.getByTestId('emenu-order-card-close');
    this.firstCategoryButton = page.getByTestId('emenu-new-category');
    this.firstCategoryItemButton = page.getByTestId('emenu-new-category-first-item');
    this.orderCard = page.getByTestId('emenu-order-card');
    this.orderRoot = page.getByTestId('emenu-order-page');
    this.placeOrderButton = page.getByTestId('emenu-place-order');
    this.soldOutPopup = page.getByTestId('emenu-sold-out-popup');
  }

  async createFirstCategoryItem(
    itemName: string,
    price: number,
    options: { group?: string; category?: string; inventorySku?: string; taxRate?: number } = {},
  ): Promise<void> {
    await step(`Emenu 创建新分类第一个菜 ${itemName}`, async () => {
      await this.page.evaluate(
        ({ category, group, inventorySku, name, itemPrice, taxRate }) => {
          const item = {
            category,
            group,
            inventorySku,
            name,
            price: itemPrice,
            taxRate,
          };
          localStorage.setItem('offlineEmenuItem', JSON.stringify(item));
          window.dispatchEvent(new CustomEvent('offline-emenu-item-updated', { detail: item }));
        },
        {
          category: options.category ?? 'New Category',
          group: options.group ?? 'Emenu Menu',
          inventorySku: options.inventorySku ?? '',
          name: itemName,
          itemPrice: price,
          taxRate: options.taxRate ?? 0,
        },
      );
    });
  }

  async placeFirstCategoryItemOrder(): Promise<void> {
    await step('Emenu 点新分类第一个菜并下单', async () => {
      await expect(this.orderRoot).toBeVisible();
      await this.firstCategoryButton.click();
      await this.firstCategoryItemButton.click();
      await this.addCartButton.click();
      await this.cartButton.click();
      await this.placeOrderButton.click();
      await expect(this.orderCard).toBeVisible();
    });
  }

  async orderNewCategoryFirstItem(quantity = 1): Promise<void> {
    await step(`Emenu 点新分类第一个菜 ${quantity} 个并下单`, async () => {
      await expect(this.orderRoot).toBeVisible();
      await this.firstCategoryButton.click();
      await this.firstCategoryItemButton.click();
      for (let index = 1; index < quantity; index += 1) {
        await this.addItemButton.click();
      }
      await this.addCartButton.click();
      await this.cartButton.click();
      await this.placeOrderButton.click();
      await expect(this.orderCard).toBeVisible();
    });
  }

  async isSoldOutPopupVisible(): Promise<boolean> {
    return step('判断 Emenu 库存不足弹窗是否展示', async () => this.soldOutPopup.isVisible());
  }

  async closeOrderCard(): Promise<void> {
    await step('关闭 Emenu 订单卡片', async () => {
      await this.closeOrderCardButton.click();
      await expect(this.orderCard).toBeHidden();
    });
  }

  async callServer(): Promise<void> {
    await step('Emenu 点击 Call Server 叫号', async () => {
      await this.callServerButton.click();
    });
  }
}
