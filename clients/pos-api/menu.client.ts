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

export interface MenuClient {
  getAllMenuGroupInfo(): Promise<MenuGroupInfo>;
  getAllAvailableDishInfosOfCategoryAndGroup(
    groupName: string,
    categoryName: string,
    productLine: string,
  ): Promise<Record<string, MenuDishAvailability>>;
  setDishOutOfStock(productLine: string, groupName: string, categoryName: string, itemName: string): Promise<void>;
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

  private dishKey(productLine: string, groupName: string, categoryName: string, itemName: string): string {
    return [productLine, groupName, categoryName, itemName].join('|');
  }
}
