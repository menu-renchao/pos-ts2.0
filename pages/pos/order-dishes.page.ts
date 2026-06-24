import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export class OrderDishesPage extends PageObject {
  private readonly menuCategories: Locator;
  private readonly menuGroups: Locator;
  private readonly menuItems: Locator;
  private readonly customerInfoPopup: Locator;
  private readonly customerNameInput: Locator;
  private readonly customerPhoneInput: Locator;
  private readonly customerSubmitButton: Locator;
  private readonly openFoodCategory: Locator;
  private readonly orderRoot: Locator;
  private readonly itemDiscountButton: Locator;
  private readonly itemPrice: Locator;
  private readonly itemTax: Locator;
  private readonly managerPasswordInput: Locator;
  private readonly managerPasswordSubmitButton: Locator;
  private readonly modifyNoteInput: Locator;
  private readonly modifyNotePriceInput: Locator;
  private readonly modifySaveButton: Locator;
  private readonly openFoodNameInput: Locator;
  private readonly openFoodNoTaxButton: Locator;
  private readonly openFoodPriceInput: Locator;
  private readonly orderItemName: Locator;
  private readonly orderOptions: Locator;
  private readonly pickupButton: Locator;
  private readonly pickupInfoSubmitButton: Locator;
  private readonly saveOrderButton: Locator;
  private readonly sendKitchenButton: Locator;
  private readonly settleButton: Locator;
  private readonly splitCombineButton: Locator;
  private readonly splitEvenButton: Locator;
  private readonly subOptions: Locator;
  private readonly tipInput: Locator;
  private readonly voidItemButton: Locator;

  constructor(page: Page) {
    super(page);
    this.menuCategories = page.getByTestId('order-menu-category');
    this.menuGroups = page.getByTestId('order-menu-group');
    this.menuItems = page.getByTestId('order-menu-item');
    this.customerInfoPopup = page.getByTestId('customer-info-popup');
    this.customerNameInput = page.getByTestId('customer-name');
    this.customerPhoneInput = page.getByTestId('customer-phone');
    this.customerSubmitButton = page.getByTestId('customer-submit');
    this.itemDiscountButton = page.getByTestId('item-discount-10');
    this.itemPrice = page.getByTestId('order-item-price');
    this.itemTax = page.getByTestId('order-tax');
    this.managerPasswordInput = page.getByTestId('manager-password');
    this.managerPasswordSubmitButton = page.getByTestId('manager-password-submit');
    this.modifyNoteInput = page.getByTestId('modify-note-name');
    this.modifyNotePriceInput = page.getByTestId('modify-note-price');
    this.modifySaveButton = page.getByTestId('modify-save');
    this.openFoodNameInput = page.getByTestId('open-food-name');
    this.openFoodNoTaxButton = page.getByTestId('open-food-no-tax');
    this.openFoodPriceInput = page.getByTestId('open-food-price');
    this.orderItemName = page.getByTestId('order-item-name');
    this.orderOptions = page.getByTestId('order-option');
    this.pickupButton = page.getByTestId('order-pickup');
    this.pickupInfoSubmitButton = page.getByTestId('pickup-info-submit');
    this.openFoodCategory = page.getByTestId('open-food-category');
    this.orderRoot = page.getByTestId('order-page');
    this.saveOrderButton = page.getByTestId('order-save');
    this.sendKitchenButton = page.getByTestId('order-send-kitchen');
    this.settleButton = page.getByTestId('order-settle');
    this.splitCombineButton = page.getByTestId('split-combine');
    this.splitEvenButton = page.getByTestId('split-even');
    this.subOptions = page.getByTestId('order-sub-option');
    this.tipInput = page.getByTestId('order-tip');
    this.voidItemButton = page.getByTestId('order-void-item');
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

  async sendAllToKitchen(): Promise<void> {
    await step('发送当前订单到厨房', async () => {
      await this.sendKitchenButton.click();
    });
  }

  async readTax(): Promise<number> {
    return step('读取当前订单税额', async () => Number((await this.itemTax.textContent()) ?? '0'));
  }

  async clickSettle(): Promise<void> {
    await step('点击点单页面支付按钮', async () => {
      await this.settleButton.click();
    });
  }

  async isCustomerInfoPopupVisible(): Promise<boolean> {
    return step('判断客户信息弹框是否展示', async () => this.customerInfoPopup.isVisible());
  }

  async submitCustomerInfo(name = '', phone = ''): Promise<void> {
    await step('提交点单客户信息', async () => {
      await this.customerNameInput.fill(name);
      await this.customerPhoneInput.fill(phone);
      await this.customerSubmitButton.click();
    });
  }

  async voidSelectedItem(): Promise<void> {
    await step('尝试删除当前点单菜品', async () => {
      await this.voidItemButton.click();
    });
  }

  async submitManagerPassword(password: string): Promise<void> {
    await step('输入经理密码并确认权限', async () => {
      await this.managerPasswordInput.fill(password);
      await this.managerPasswordSubmitButton.click();
    });
  }

  async readSelectedItemPrice(): Promise<number> {
    return step('读取当前菜品价格', async () => Number((await this.itemPrice.textContent()) ?? '0'));
  }

  async readSelectedOrderItem(): Promise<{ name: string; price: number }> {
    return step('读取当前已点菜品名称和价格', async () => {
      await expect(this.orderItemName).toBeVisible();
      return {
        name: (await this.orderItemName.textContent()) ?? '',
        price: Number((await this.itemPrice.textContent()) ?? '0'),
      };
    });
  }

  async selectOptions(optionNames: readonly string[] = []): Promise<void> {
    await step(`选择菜品 Option ${optionNames.join(', ') || '无'}`, async () => {
      for (const optionName of optionNames) {
        await this.orderOptions.filter({ hasText: optionName }).click();
      }
    });
  }

  async selectSubOptions(subOptionNames: readonly string[] = []): Promise<void> {
    await step(`选择菜品二级 Option ${subOptionNames.join(', ') || '无'}`, async () => {
      for (const subOptionName of subOptionNames) {
        await this.subOptions.filter({ hasText: subOptionName }).click();
      }
    });
  }

  async applyItemDiscount(): Promise<void> {
    await step('给当前菜品应用单菜折扣', async () => {
      await this.itemDiscountButton.click();
    });
  }

  async addModifyNote(name: string, price: number): Promise<void> {
    await step('在 Modify 中添加菜品备注', async () => {
      await this.modifyNoteInput.fill(name);
      await this.modifyNotePriceInput.fill(String(price));
      await this.modifySaveButton.click();
    });
  }

  async addTip(amount: number): Promise<void> {
    await step(`给订单添加小费 ${amount}`, async () => {
      await this.tipInput.fill(String(amount));
      await this.tipInput.press('Enter');
    });
  }

  async splitEvenly(parts: number): Promise<void> {
    await step(`按 ${parts} 份平分订单`, async () => {
      await this.splitEvenButton.click();
    });
  }

  async combineSplitOrders(): Promise<void> {
    await step('合并已拆分子单', async () => {
      await this.splitCombineButton.click();
    });
  }

  async openFoodWithoutTax(name: string, price: number): Promise<void> {
    await step('创建无税 Open Food 菜品', async () => {
      await this.openFoodNameInput.fill(name);
      await this.openFoodPriceInput.fill(String(price));
      await this.openFoodNoTaxButton.click();
    });
  }

  async settleByCash(): Promise<void> {
    await step('现金完成当前订单付款', async () => {
      await this.page.getByTestId('settle-cash').click();
    });
  }

  async startPickupOrder(): Promise<void> {
    await step('进入 Pickup 点单并提交空取餐信息', async () => {
      await this.pickupButton.click();
      await this.pickupInfoSubmitButton.click();
    });
  }
}
