import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class EmenuOrderPage extends PageObject {
  private readonly addCartButton: Locator;
  private readonly callServerButton: Locator;
  private readonly cartButton: Locator;
  private readonly closeOrderCardButton: Locator;
  private readonly firstCategoryButton: Locator;
  private readonly firstCategoryItemButton: Locator;
  private readonly orderCard: Locator;
  private readonly orderRoot: Locator;
  private readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addCartButton = page.getByTestId('emenu-add-cart');
    this.callServerButton = page.getByTestId('emenu-call-server');
    this.cartButton = page.getByTestId('emenu-cart');
    this.closeOrderCardButton = page.getByTestId('emenu-order-card-close');
    this.firstCategoryButton = page.getByTestId('emenu-new-category');
    this.firstCategoryItemButton = page.getByTestId('emenu-new-category-first-item');
    this.orderCard = page.getByTestId('emenu-order-card');
    this.orderRoot = page.getByTestId('emenu-order-page');
    this.placeOrderButton = page.getByTestId('emenu-place-order');
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
