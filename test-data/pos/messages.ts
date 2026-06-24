export const sdiOrderMessageSample = {
  messageType: 'Self-dine-in',
  orderNumber: 'S-DI-1001',
  tableName: 'T12',
  title: "There's a new order!",
} as const;

export type SdiOrderMessageSample = typeof sdiOrderMessageSample;
