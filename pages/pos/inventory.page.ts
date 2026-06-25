import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type InventorySearchFilter = {
  readonly channel: 'POS' | 'KIOSK' | 'EMENU';
  readonly type: 'All' | 'Item';
  readonly itemName: string;
};

export class InventoryPage extends PageObject {
  private readonly inventoryRoot: Locator;
  private readonly channelSelect: Locator;
  private readonly typeSelect: Locator;
  private readonly itemSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly itemState: Locator;
  private readonly settingRoot: Locator;
  private readonly limitedStockRadio: Locator;
  private readonly limitedStockQuantityInput: Locator;
  private readonly confirmButton: Locator;
  private readonly cancelButton: Locator;
  private readonly backToOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryRoot = page.getByTestId('inventory-page').or(page.locator('#inventory'));
    this.channelSelect = page.getByTestId('inventory-channel').or(page.locator('#inventory input[type="text"]').first());
    this.typeSelect = page.getByTestId('inventory-type').or(page.locator('#inventory input[type="text"]').nth(1));
    this.itemSearchInput = page.getByTestId('inventory-item-search').or(page.locator('#inventoryIpt'));
    this.searchButton = page.getByTestId('inventory-search').or(page.locator('#inventory').getByText('Search', { exact: true }));
    this.itemState = page.getByTestId('inventory-item-state').or(page.locator('#inventory [class*="card_itemstatus"]').first());
    this.settingRoot = page.getByTestId('inventory-setting-page').or(page.locator('#inventory-dialog, #inventory [class*="modal"]'));
    this.limitedStockRadio = page.locator('#inventory-dialog').getByText('Limited Stock');
    this.limitedStockQuantityInput = page.getByTestId('inventory-limited-stock-quantity').or(page.locator('#gqipt'));
    this.confirmButton = page
      .getByTestId('inventory-save-config')
      .or(page.locator('#inventory-submit'))
      .or(page.locator('#inventory-dialog').getByText('Confirm', { exact: true }));
    this.cancelButton = page.locator('#inventory').getByText('Cancel', { exact: true });
    this.backToOrderButton = page.getByTestId('inventory-back-order').or(page.locator('[class*="header_back"]'));
  }

  async searchInventory(filter: InventorySearchFilter): Promise<void> {
    await step(`搜索库存菜品 ${filter.itemName}`, async () => {
      await expect(this.inventoryRoot).toBeVisible();
      await this.selectOrFill(this.channelSelect, filter.channel);
      await this.selectOrFill(this.typeSelect, filter.type);
      await this.itemSearchInput.fill(filter.itemName);
      await this.searchButton.click();
    });
  }

  async openInventorySetting(itemName: string): Promise<void> {
    await step(`打开库存设置 ${itemName}`, async () => {
      // 离线模式：通过 setting 按钮打开；live 模式：点击菜品卡片
      const settingButton = this.page.getByTestId('inventory-setting');
      if ((await settingButton.count()) > 0) {
        await this.itemSearchInput.fill(itemName);
        await settingButton.click();
      } else {
        const card = this.page.locator('#inventory').getByText(itemName, { exact: true }).first();
        await expect(card).toBeVisible({ timeout: 10_000 });
        await card.click();
      }
      await expect(this.settingRoot).toBeVisible({ timeout: 10_000 });
    });
  }

  async setLimitedStockQuantity(quantity: number): Promise<void> {
    await step(`设置 Limited Stock 数量 ${quantity}`, async () => {
      // 离线模式：通过 select 设置；live 模式：点击 Limited Stock 单选按钮
      const stockStatusSelect = this.page.getByTestId('inventory-stock-status');
      if ((await stockStatusSelect.count()) > 0) {
        await this.selectOrFill(stockStatusSelect, 'LIMITED_STOCK');
        await this.limitedStockQuantityInput.fill(String(quantity));
      } else {
        await this.limitedStockRadio.click();
        // live 模式：用 JS 直接设置输入框值
        await this.limitedStockQuantityInput.evaluate((el, qty) => {
          const input = el as HTMLInputElement;
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          setter?.call(input, qty);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }, String(quantity));
      }
    });
  }

  async saveInventoryConfig(): Promise<void> {
    await step('保存库存配置', async () => {
      // 关闭可能弹出的日期选择器
      const okButton = this.page.locator('#inventory-dialog').getByText('OK', { exact: true });
      if ((await okButton.count()) > 0 && await okButton.isVisible()) {
        await okButton.click();
      }
      // 隐藏所有可能挡路的键盘/遮罩元素
      await this.page.evaluate(() => {
        for (const id of ['mykbflbx', 'floatcoverblock', 'kbmdl', 'glbkbbx']) {
          const el = document.getElementById(id);
          if (el) el.style.display = 'none';
        }
      });
      for (let retryCount = 0; retryCount < 3 && (await this.settingRoot.isVisible()); retryCount += 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        await this.confirmButton.click();
        await this.settingRoot.waitFor({ state: 'hidden', timeout: 2_000 }).catch(() => undefined);
      }
      await expect(this.settingRoot).toBeHidden({ timeout: 10_000 });
    });
  }

  async readItemState(itemName: string): Promise<string> {
    return step(`读取库存状态 ${itemName}`, async () => {
      await this.itemSearchInput.fill(itemName);
      await this.searchButton.click();
      const liveItemState = this.page
        .locator('#inventory [class*="card_cardContainer"]')
        .filter({
          has: this.page.locator('[class*="card_itemname"]').filter({ hasText: itemName }),
        })
        .locator('[class*="card_itemstatus"]')
        .first();
      const state = (await liveItemState.count()) > 0 ? liveItemState : this.itemState;
      await expect(state).toBeVisible();
      return ((await state.textContent()) ?? '').trim();
    });
  }

  async backToOrderPage(): Promise<void> {
    await step('从库存页返回点单页', async () => {
      await this.backToOrderButton.click();
      await expect(this.page.getByTestId('order-page').or(this.page.locator('#orderDishes'))).toBeVisible();
    });
  }

  private async selectOrFill(locator: Locator, value: string): Promise<void> {
    const info = await locator.evaluate((el) => ({
      tag: el.tagName.toLowerCase(),
      readonly: (el as HTMLInputElement).readOnly,
    }));
    if (info.tag === 'select') {
      await locator.selectOption(value);
    } else if (info.readonly) {
      return;
    } else {
      await locator.fill(value);
    }
  }
}
