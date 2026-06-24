export const reservationStatuses = {
  arrived: 'Arrived',
  seated: 'Seated',
} as const;

export type ReservationStatus = (typeof reservationStatuses)[keyof typeof reservationStatuses];
