export type OrderType = 'togo' | 'dine-in' | 'delivery' | 'pickup';
export type PaymentType = 'cash' | 'credit' | 'gift-card' | 'rights-card';

export type DishSample = {
  id: string;
  name: string;
  price: number;
  category: string;
  group?: string;
  inventorySku?: string;
  taxRate?: number;
};

export type MenuGroupSample = {
  id: string;
  name: string;
  dishes: readonly DishSample[];
};

export type CustomerSample = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type PaymentSample = {
  type: PaymentType;
  tendered: number;
};
