export const deliveryCustomerSample = {
  phone: '0123456789',
  name: 'auto_tester',
} as const;

export const deliveryAddressSample = 'menusifu test in nanjing';

export type DeliveryOrderInfoSample = {
  phone: string;
  name: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  note: string;
};

export const deliveryOrderInfoSample: DeliveryOrderInfoSample = {
  phone: '(012)345-67890',
  name: 'pos-test',
  address: 'menusifu-test',
  apt: '55',
  city: 'New York',
  state: 'NY',
  zip: '10016',
  note: '我的备注',
} as const;
