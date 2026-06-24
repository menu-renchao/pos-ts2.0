import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type InventorySearchFilter = {
  readonly channel: 'POS';
  readonly type: 'All';
  readonly itemName: string;
};

export class InventoryPage extends PageObject {
  private readonly inventoryRoot: Locator;
  private readonly channelSelect: Locator;
  private readonly typeSelect: Locator;
  private readonly itemSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly itemState: Locator;
  private readonly settingButton: Locator;
  private readonly settingRoot: Locator;
  private readonly stockStatusSelect: Locator;
  private readonly limitedStockQuantityInput: Locator;
  private readonly saveConfigButton: Locator;
  private readonly backToOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryRoot = page.getByTestId('inventory-page');
    this.channelSelect = page.getByTestId('inventory-channel');
    this.typeSelect = page.getByTestId('inventory-type');
    this.itemSearchInput = page.getByTestId('inventory-item-search');
    this.searchButton = page.getByTestId('inventory-search');
    this.itemState = page.getByTestId('inventory-item-state');
    this.settingButton = page.getByTestId('inventory-setting');
    this.settingRoot = page.getByTestId('inventory-setting-page');
    this.stockStatusSelect = page.getByTestId('inventory-stock-status');
    this.limitedStockQuantityInput = page.getByTestId('inventory-limited-stock-quantity');
    this.saveConfigButton = page.getByTestId('inventory-save-config');
    this.backToOrderButton = page.getByTestId('inventory-back-order');
  }

  async searchInventory(filter: InventorySearchFilter): Promise<void> {
    await step(`搜索库存菜品 ${filter.itemName}`, async () => {
      await expect(this.inventoryRoot).toBeVisible();
      await this.channelSelect.selectOption(filter.channel);
      await this.typeSelect.selectOption(filter.type);
      await this.itemSearchInput.fill(filter.itemName);
      await this.searchButton.click();
    });
  }

  async openInventorySetting(itemName: string): Promise<void> {
    await step(`打开库存设置 ${itemName}`, async () => {
      await this.itemSearchInput.fill(itemName);
      await this.settingButton.click();
      await expect(this.settingRoot).toBeVisible();
    });
  }

  async setLimitedStockQuantity(quantity: number): Promise<void> {
    await step(`设置 Limited Stock 数量 ${quantity}`, async () => {
      await this.stockStatusSelect.selectOption('LIMITED_STOCK');
      await this.limitedStockQuantityInput.fill(String(quantity));
    });
  }

  async saveInventoryConfig(): Promise<void> {
    await step('保存库存配置', async () => {
      await this.saveConfigButton.click();
      await expect(this.settingRoot).toBeHidden();
    });
  }

  async readItemState(itemName: string): Promise<string> {
    return step(`读取库存状态 ${itemName}`, async () => {
      await this.itemSearchInput.fill(itemName);
      await this.searchButton.click();
      return ((await this.itemState.textContent()) ?? '').trim();
    });
  }

  async backToOrderPage(): Promise<void> {
    await step('从库存页返回点单页', async () => {
      await this.backToOrderButton.click();
      await expect(this.page.getByTestId('order-page')).toBeVisible();
    });
  }
}
