import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class OrderDishesPage extends PageObject {
  private readonly menuCategories: Locator;
  private readonly menuGroups: Locator;
  private readonly menuItems: Locator;
  private readonly openFoodCategory: Locator;
  private readonly orderRoot: Locator;
  private readonly saveOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.menuCategories = page.getByTestId('order-menu-category');
    this.menuGroups = page.getByTestId('order-menu-group');
    this.menuItems = page.getByTestId('order-menu-item');
    this.openFoodCategory = page.getByTestId('open-food-category');
    this.orderRoot = page.getByTestId('order-page');
    this.saveOrderButton = page.getByTestId('order-save');
  }

  async readOpenFoodCategoryName(): Promise<string> {
    return step('读取订单页 Open Food 菜品分类名称', async () => {
      await expect(this.orderRoot).toBeVisible();
      return (await this.openFoodCategory.textContent()) ?? '';
    });
  }

  async readMenuGroups(): Promise<string[]> {
    return step('读取点单页面菜单组', async () => {
      await expect(this.orderRoot).toBeVisible();
      return (await this.menuGroups.allTextContents()).map((groupName) => groupName.trim()).filter(Boolean);
    });
  }

  async selectMenuGroup(groupName = ''): Promise<void> {
    await step(`选择点单菜单组 ${groupName}`, async () => {
      if (groupName) {
        await this.menuGroups.filter({ hasText: groupName }).click();
      }
    });
  }

  async selectMenuCategory(categoryName: string): Promise<void> {
    await step(`选择点单菜单类别 ${categoryName}`, async () => {
      await this.menuCategories.filter({ hasText: categoryName }).click();
    });
  }

  async addMenuItem(itemName: string): Promise<void> {
    await step(`添加点单菜品 ${itemName}`, async () => {
      await this.menuItems.filter({ hasText: itemName }).click();
    });
  }

  async saveOrder(): Promise<void> {
    await step('保存当前订单', async () => {
      await this.saveOrderButton.click();
    });
  }
}
