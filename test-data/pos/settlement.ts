export const roundingStrategies = {
  nearest5: 'nearest_5',
  nearest10: 'nearest_10',
  nearest5Or10: 'nearest_5_or_10',
  noRounding: 'no_rounding',
} as const;

export type RoundingStrategy = (typeof roundingStrategies)[keyof typeof roundingStrategies];

export const settlementPaymentTypes = {
  cash: 'cash',
  loyaltyCard: 'loyalty_card',
  giftCard: 'gift_card',
  backupCard: 'backup_card',
  selfCard: 'self_card',
} as const;

export type SettlementPaymentType = (typeof settlementPaymentTypes)[keyof typeof settlementPaymentTypes];

export type RoundingSettlementCase = {
  caseName: string;
  strategy: RoundingStrategy;
  modifyPriceCents: number;
  expectedRecallPrice: string;
  paymentType: SettlementPaymentType;
};

export const roundingSettlementJiraKeys = [
  'POS-16490',
  'POS-16491',
  'POS-16492',
  'POS-16494',
  'POS-16495',
  'POS-16496',
  'POS-16498',
  'POS-16499',
  'POS-16500',
  'POS-16502',
  'POS-16503',
  'POS-16504',
  'POS-16479',
] as const;

export const roundingSettlementCases: readonly RoundingSettlementCase[] = [
  {
    caseName: 'loyalty card nearest 5 keeps 1.15',
    strategy: roundingStrategies.nearest5,
    modifyPriceCents: 115,
    expectedRecallPrice: '1.15',
    paymentType: settlementPaymentTypes.loyaltyCard,
  },
  {
    caseName: 'loyalty card nearest 10 rounds 1.15 to 1.10',
    strategy: roundingStrategies.nearest10,
    modifyPriceCents: 115,
    expectedRecallPrice: '1.10',
    paymentType: settlementPaymentTypes.loyaltyCard,
  },
  {
    caseName: 'loyalty card nearest 5 or 10 keeps 1.15',
    strategy: roundingStrategies.nearest5Or10,
    modifyPriceCents: 115,
    expectedRecallPrice: '1.15',
    paymentType: settlementPaymentTypes.loyaltyCard,
  },
  {
    caseName: 'gift card nearest 5 rounds 0.07 to 0.05',
    strategy: roundingStrategies.nearest5,
    modifyPriceCents: 7,
    expectedRecallPrice: '0.05',
    paymentType: settlementPaymentTypes.giftCard,
  },
  {
    caseName: 'gift card nearest 10 rounds 0.17 to 0.10',
    strategy: roundingStrategies.nearest10,
    modifyPriceCents: 17,
    expectedRecallPrice: '0.10',
    paymentType: settlementPaymentTypes.giftCard,
  },
  {
    caseName: 'gift card nearest 5 or 10 rounds 0.07 to 0.05',
    strategy: roundingStrategies.nearest5Or10,
    modifyPriceCents: 7,
    expectedRecallPrice: '0.05',
    paymentType: settlementPaymentTypes.giftCard,
  },
  {
    caseName: 'backup card nearest 5 rounds 0.09 to 0.05',
    strategy: roundingStrategies.nearest5,
    modifyPriceCents: 9,
    expectedRecallPrice: '0.05',
    paymentType: settlementPaymentTypes.backupCard,
  },
  {
    caseName: 'backup card nearest 10 rounds 0.19 to 0.10',
    strategy: roundingStrategies.nearest10,
    modifyPriceCents: 19,
    expectedRecallPrice: '0.10',
    paymentType: settlementPaymentTypes.backupCard,
  },
  {
    caseName: 'backup card nearest 5 or 10 rounds 0.09 to 0.10',
    strategy: roundingStrategies.nearest5Or10,
    modifyPriceCents: 9,
    expectedRecallPrice: '0.10',
    paymentType: settlementPaymentTypes.backupCard,
  },
  {
    caseName: 'self card nearest 5 rounds 0.08 to 0.05',
    strategy: roundingStrategies.nearest5,
    modifyPriceCents: 8,
    expectedRecallPrice: '0.05',
    paymentType: settlementPaymentTypes.selfCard,
  },
  {
    caseName: 'self card nearest 10 rounds 0.18 to 0.10',
    strategy: roundingStrategies.nearest10,
    modifyPriceCents: 18,
    expectedRecallPrice: '0.10',
    paymentType: settlementPaymentTypes.selfCard,
  },
  {
    caseName: 'self card nearest 5 or 10 rounds 0.08 to 0.10',
    strategy: roundingStrategies.nearest5Or10,
    modifyPriceCents: 8,
    expectedRecallPrice: '0.10',
    paymentType: settlementPaymentTypes.selfCard,
  },
  {
    caseName: 'cash no rounding keeps 0.01',
    strategy: roundingStrategies.noRounding,
    modifyPriceCents: 1,
    expectedRecallPrice: '0.01',
    paymentType: settlementPaymentTypes.cash,
  },
];
