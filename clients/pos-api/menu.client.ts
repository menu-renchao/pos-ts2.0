export type MenuProductLineInfo = {
  productLine: string;
  menuItemCount: number;
};

export type MenuGroupInfo = {
  menus: MenuProductLineInfo[];
};

export type MenuDishAvailability = {
  name: string;
  outOfStock: boolean;
};

export type ProductLineInventoryLimit = {
  itemName: string;
  productLine: string;
  quantity: number;
};

export type ComboNoOptionThenOptionFixture = {
  comboName: string;
  group: string;
  category: string;
  noOptionSubItem: string;
  optionDishName: string;
  comboPrice: number;
  optionDishPrice: number;
  createdDishIds: number[];
};

export interface MenuClient {
  getAllMenuGroupInfo(): Promise<MenuGroupInfo>;
  getAllAvailableDishInfosOfCategoryAndGroup(
    groupName: string,
    categoryName: string,
    productLine: string,
  ): Promise<Record<string, MenuDishAvailability>>;
  readProductLineInventoryLimit(productLine: string, itemName: string): Promise<ProductLineInventoryLimit | undefined>;
  setDishOutOfStock(productLine: string, groupName: string, categoryName: string, itemName: string): Promise<void>;
  setProductLineInventoryLimit(productLine: string, itemName: string, quantity: number): Promise<void>;
  createComboNoOptionThenOptionFixture(groupName: string, categoryName: string): Promise<ComboNoOptionThenOptionFixture>;
  deleteDishesByIds(dishIds: readonly number[]): Promise<void>;
}

export class StubMenuClient implements MenuClient {
  private readonly menus: MenuProductLineInfo[] = [
    {
      productLine: 'POS',
      menuItemCount: 24,
    },
  ];
  private readonly kioskDishAvailability = new Map<string, MenuDishAvailability>([
    [this.dishKey('KIOSK', 'Chinese Food', 'Appetizers', 'kiosk_item'), { name: 'kiosk_item', outOfStock: false }],
  ]);
  private readonly productLineInventoryLimits = new Map<string, ProductLineInventoryLimit>();

  async getAllMenuGroupInfo(): Promise<MenuGroupInfo> {
    return {
      menus: this.menus.map((menu) => ({ ...menu })),
    };
  }

  async getAllAvailableDishInfosOfCategoryAndGroup(
    groupName: string,
    categoryName: string,
    productLine: string,
  ): Promise<Record<string, MenuDishAvailability>> {
    return Object.fromEntries(
      [...this.kioskDishAvailability.entries()]
        .filter(([key]) => key.startsWith(this.dishKey(productLine, groupName, categoryName, '')))
        .map(([, dish]) => [dish.name, { ...dish }]),
    );
  }

  async setDishOutOfStock(productLine: string, groupName: string, categoryName: string, itemName: string): Promise<void> {
    this.kioskDishAvailability.set(this.dishKey(productLine, groupName, categoryName, itemName), {
      name: itemName,
      outOfStock: true,
    });
  }

  async readProductLineInventoryLimit(
    productLine: string,
    itemName: string,
  ): Promise<ProductLineInventoryLimit | undefined> {
    const limit = this.productLineInventoryLimits.get(this.productLineInventoryKey(productLine, itemName));
    return limit ? { ...limit } : undefined;
  }

  async setProductLineInventoryLimit(productLine: string, itemName: string, quantity: number): Promise<void> {
    this.productLineInventoryLimits.set(this.productLineInventoryKey(productLine, itemName), {
      itemName,
      productLine,
      quantity,
    });
  }

  async createComboNoOptionThenOptionFixture(groupName: string, categoryName: string): Promise<ComboNoOptionThenOptionFixture> {
    return {
      comboName: 'ComboNoOption',
      group: groupName,
      category: categoryName,
      noOptionSubItem: 'No Option Item',
      optionDishName: 'Option Item',
      comboPrice: 10,
      optionDishPrice: 10,
      createdDishIds: [],
    };
  }

  async deleteDishesByIds(): Promise<void> {}

  private dishKey(productLine: string, groupName: string, categoryName: string, itemName: string): string {
    return [productLine, groupName, categoryName, itemName].join('|');
  }

  private productLineInventoryKey(productLine: string, itemName: string): string {
    return [productLine, itemName].join('|');
  }
}

type LiveMenuResponse = {
  menus: Array<{
    menuGroups: Array<{
      id: number;
      name: string;
      deleted?: boolean;
      menuCategories?: Array<{ id: number; name: string; deleted?: boolean }>;
    }>;
  }>;
};

type LiveMenuSummaryResponse = {
  menus: Array<{
    productLine?: string;
    menuItemCount?: number;
  }>;
};

type LiveCreateDishResponse = {
  item?: { id?: number };
};

export class LiveMenuClient implements MenuClient {
  private readonly headers = {
    accept: 'application/json, text/plain, */*',
    'content-type': 'application/json;charset=UTF-8',
  };

  constructor(private readonly baseUrl: string) {}

  async getAllMenuGroupInfo(): Promise<MenuGroupInfo> {
    const menu = await this.fetchJson<LiveMenuSummaryResponse>('/kpos/webapp/menu/menus');
    return {
      menus: menu.menus.map((item) => ({
        productLine: item.productLine ?? '',
        menuItemCount: item.menuItemCount ?? 0,
      })),
    };
  }

  async getAllAvailableDishInfosOfCategoryAndGroup(
    groupName: string,
    categoryName: string,
    productLine: string,
  ): Promise<Record<string, MenuDishAvailability>> {
    const menu = await this.fetchJson<LiveMenuResponse>(`/kpos/webapp/menu/menu?product=${encodeURIComponent(productLine)}`);
    const category = this.findCategory(menu, groupName, categoryName);
    return Object.fromEntries(
      ((category as { saleItems?: Array<{ name: string; outOfStock?: boolean; deleted?: boolean }> }).saleItems ?? [])
        .filter((item) => !item.deleted)
        .map((item) => [item.name, { name: item.name, outOfStock: Boolean(item.outOfStock) }]),
    );
  }

  async readProductLineInventoryLimit(): Promise<ProductLineInventoryLimit | undefined> {
    return undefined;
  }

  async setDishOutOfStock(): Promise<void> {}

  async setProductLineInventoryLimit(): Promise<void> {}

  async createComboNoOptionThenOptionFixture(groupName: string, categoryName: string): Promise<ComboNoOptionThenOptionFixture> {
    const menu = await this.fetchJson<LiveMenuResponse>('/kpos/webapp/menu/menu?product=SELF_DINE_IN');
    const { group, category } = this.findGroupAndCategory(menu, groupName, categoryName);
    const suffix = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const noOptionSubItem = `ts43823_no_${suffix}`;
    const optionDishName = `ts43823_opt_${suffix}`;
    const comboName = `ComboOptionTest_${suffix}`;
    const sectionName = `Selection_${suffix}`;
    const createdDishIds: number[] = [];

    try {
      const noOptionSubItemId = await this.createDish({
        name: noOptionSubItem,
        categoryId: category.id,
        reportGroupId: group.id,
        price: 10,
      });
      createdDishIds.push(noOptionSubItemId);
      const optionDishId = await this.createDish({
        name: optionDishName,
        categoryId: category.id,
        reportGroupId: group.id,
        price: 10,
      });
      createdDishIds.push(optionDishId);
      const comboId = await this.createCombo({
        name: comboName,
        categoryId: category.id,
        reportGroupId: group.id,
        sectionName,
        noOptionSubItem,
        noOptionSubItemId,
        optionDishName,
        optionDishId,
      });
      createdDishIds.push(comboId);
      return {
        comboName,
        group: groupName,
        category: categoryName,
        noOptionSubItem,
        optionDishName,
        comboPrice: 99.9,
        optionDishPrice: 10,
        createdDishIds,
      };
    } catch (error) {
      await this.deleteDishesByIds(createdDishIds).catch(() => undefined);
      throw error;
    }
  }

  async deleteDishesByIds(dishIds: readonly number[]): Promise<void> {
    if (dishIds.length === 0) {
      return;
    }
    await this.fetchJson('/kpos/webapp/menu/menuSaleItem/batch/delete/', {
      method: 'DELETE',
      body: JSON.stringify({ saleItemIds: dishIds }),
    });
  }

  private async createDish(input: {
    name: string;
    categoryId: number;
    reportGroupId: number;
    price: number;
  }): Promise<number> {
    const response = await this.fetchJson<LiveCreateDishResponse>('/kpos/webapp/menu/menuSaleItem/', {
      method: 'POST',
      body: JSON.stringify({
        id: '',
        name: input.name,
        nameCh: input.name,
        posName: input.name,
        shortName: input.name,
        description: '',
        thumbPath: '',
        displayPriority: '',
        color: 'FFC314',
        price: String(input.price),
        benefitPrice: '',
        outOfStock: false,
        marketPriceItem: false,
        takeoutTaxFree: false,
        sendToKitchenRequired: false,
        hiddenItem: false,
        baseWeight: '',
        ktvItem: false,
        itemNumber: '',
        numOfItemOptionAllowed: '0',
        itemType: 'SALE_ITEM',
        categoryId: input.categoryId,
        reportGroupId: String(input.reportGroupId),
        defaultItemSizeId: -1,
        itemPrices: [],
        options: [],
        comboType: '',
        displayMode: '',
        comboSections: [],
        printerIds: [],
        properties: [{ name: 'ALL_YOU_CAN_EAT', value: true }],
        optionFullScreen: false,
        changeAllCombo: true,
        itemComponentAdded: false,
        itemComponentAssocDTOList: [],
        customTax: true,
        taxIds: [],
      }),
    });
    const id = response.item?.id;
    if (!id) {
      throw new Error(`Live menu item ${input.name} 创建失败`);
    }
    return id;
  }

  private async createCombo(input: {
    name: string;
    categoryId: number;
    reportGroupId: number;
    sectionName: string;
    noOptionSubItem: string;
    noOptionSubItemId: number;
    optionDishName: string;
    optionDishId: number;
  }): Promise<number> {
    const response = await this.fetchJson<LiveCreateDishResponse>('/kpos/webapp/menu/menuSaleItem/', {
      method: 'POST',
      body: JSON.stringify({
        id: '',
        name: input.name,
        nameCh: '',
        posName: input.name,
        shortName: '',
        description: '',
        teaMachineCode: '',
        cloudId: '',
        thumbPath: '',
        displayPriority: '',
        color: '00000000',
        price: '99.9',
        benefitPrice: '',
        outOfStock: false,
        marketPriceItem: false,
        taxFromCategory: true,
        takeoutTaxFree: false,
        sendToKitchenRequired: false,
        hiddenItem: false,
        baseWeight: '',
        ktvItem: false,
        itemNumber: '',
        numOfItemOptionAllowed: '0',
        itemType: 'COMBO_SALE_ITEM',
        categoryId: input.categoryId,
        reportGroupId: String(input.reportGroupId),
        defaultItemSizeId: -1,
        itemPrices: [],
        options: [],
        comboType: 'FLEXIBLE',
        displayMode: 'LITE',
        comboSections: [
          {
            name: input.sectionName,
            minNumOfSelectionAllowed: 1,
            maxNumOfSelectionAllowed: 1,
            itemSelectionRule: 'EQUALS_TO',
            priceRule: 'ADJUSTABLE_PRICE',
            deleted: false,
            allowRepeatedItems: true,
            discountAllowed: true,
            changeAllCombo: true,
            fieldDisplayNameGroups: [
              {
                fieldName: 'name',
                fieldDisplayNames: [{ name: input.sectionName, languageCode: 'en' }],
              },
            ],
            sectionSequence: '',
            isShow: true,
            comboSectionSaleItems: [
              {
                saleItemId: input.noOptionSubItemId,
                dishName: input.noOptionSubItem,
                preSelected: false,
                displayPriority: 0,
                saleItemName: input.noOptionSubItem,
              },
              {
                saleItemId: input.optionDishId,
                dishName: input.optionDishName,
                preSelected: false,
                displayPriority: 0,
                saleItemName: input.optionDishName,
              },
            ],
          },
        ],
        printerIds: [],
        properties: [],
        optionFullScreen: false,
        changeAllCombo: true,
        itemComponentAdded: false,
        itemComponentAssocDTOList: [],
        customTax: false,
        taxIds: [],
      }),
    });
    const id = response.item?.id;
    if (!id) {
      throw new Error(`Live combo ${input.name} 创建失败`);
    }
    return id;
  }

  private findCategory(menu: LiveMenuResponse, groupName: string, categoryName: string) {
    return this.findGroupAndCategory(menu, groupName, categoryName).category;
  }

  private findGroupAndCategory(menu: LiveMenuResponse, groupName: string, categoryName: string) {
    const group = menu.menus[0]?.menuGroups.find((item) => item.name === groupName && !item.deleted);
    if (!group) {
      throw new Error(`Live menu group ${groupName} 未找到`);
    }
    const category = group.menuCategories?.find((item) => item.name === categoryName && !item.deleted);
    if (!category) {
      throw new Error(`Live menu category ${groupName}/${categoryName} 未找到`);
    }
    return { group, category };
  }

  private async fetchJson<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        ...this.headers,
        ...(init.headers ?? {}),
      },
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Live menu API ${path} failed: ${response.status} ${text}`);
    }
    return (text ? JSON.parse(text) : {}) as T;
  }
}
