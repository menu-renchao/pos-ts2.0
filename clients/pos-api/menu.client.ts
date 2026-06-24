export type MenuProductLineInfo = {
  productLine: string;
  menuItemCount: number;
};

export type MenuGroupInfo = {
  menus: MenuProductLineInfo[];
};

export interface MenuClient {
  getAllMenuGroupInfo(): Promise<MenuGroupInfo>;
}

export class StubMenuClient implements MenuClient {
  private readonly menus: MenuProductLineInfo[] = [
    {
      productLine: 'POS',
      menuItemCount: 24,
    },
  ];

  async getAllMenuGroupInfo(): Promise<MenuGroupInfo> {
    return {
      menus: this.menus.map((menu) => ({ ...menu })),
    };
  }
}
