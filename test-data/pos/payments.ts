import type { PaymentSample } from './domain-types.js';

export const exactCashPayment: PaymentSample = {
  type: 'cash',
  tendered: 20,
};

export const creditPayment: PaymentSample = {
  type: 'credit',
  tendered: 20,
};
