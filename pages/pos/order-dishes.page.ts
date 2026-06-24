import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class OrderDishesPage extends PageObject {
  private readonly openFoodCategory: Locator;
  private readonly orderRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.openFoodCategory = page.getByTestId('open-food-category');
    this.orderRoot = page.getByTestId('order-page');
  }

  async readOpenFoodCategoryName(): Promise<string> {
    return step('读取订单页 Open Food 菜品分类名称', async () => {
      await expect(this.orderRoot).toBeVisible();
      return (await this.openFoodCategory.textContent()) ?? '';
    });
  }
}
