export const posLicenseTypes = {
  kiosk: 'KIOSK',
  pc: 'PC',
} as const;

export type PosLicenseType = (typeof posLicenseTypes)[keyof typeof posLicenseTypes];

export type PosLicense = {
  name: string;
  type: PosLicenseType;
  inUse: boolean;
};

export const posLicenseSamples: PosLicense[] = [
  { name: 'Kiosk License A', type: posLicenseTypes.kiosk, inUse: false },
  { name: 'Kiosk License B', type: posLicenseTypes.kiosk, inUse: true },
  { name: 'PC License A', type: posLicenseTypes.pc, inUse: false },
];
