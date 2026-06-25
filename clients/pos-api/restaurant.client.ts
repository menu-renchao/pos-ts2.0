import { posLicenseSamples, posLicenseTypes, type PosLicenseType } from '../../test-data/pos/licenses.js';

export interface RestaurantClient {
  getAllLicenseNames(licenseType: PosLicenseType, unusedOnly?: boolean): Promise<string[]>;
}

export class StubRestaurantClient implements RestaurantClient {
  async getAllLicenseNames(licenseType: PosLicenseType, unusedOnly = false): Promise<string[]> {
    return posLicenseSamples
      .filter((license) => license.type === licenseType)
      .filter((license) => !unusedOnly || !license.inUse)
      .map((license) => license.name);
  }
}

export { posLicenseTypes };
