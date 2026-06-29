import { StubPosDbClient, UnsupportedLivePosDbClient, type PosDbClient } from '../clients/db/pos-db.client.js';
import { LiveAdminStaffClient, StubAdminStaffClient, type AdminStaffClient } from '../clients/pos-api/admin-staff.client.js';
import { StubAdminSettingsClient } from '../clients/pos-api/admin-settings.client.js';
import { LiveMenuClient, StubMenuClient, type MenuClient } from '../clients/pos-api/menu.client.js';
import { StubOrderClient } from '../clients/pos-api/order.client.js';
import { StubRestaurantClient } from '../clients/pos-api/restaurant.client.js';
import { StubStaffShiftPlanClient } from '../clients/pos-api/staff-shift-plan.client.js';

export type StubClientSet = {
  adminStaffClient: AdminStaffClient;
  adminSettingsClient: StubAdminSettingsClient;
  menuClient: MenuClient;
  orderClient: StubOrderClient;
  posDbClient: PosDbClient;
  restaurantClient: StubRestaurantClient;
  staffShiftPlanClient: StubStaffShiftPlanClient;
};

export function createStubClients(): StubClientSet {
  return {
    adminStaffClient: new StubAdminStaffClient(),
    adminSettingsClient: new StubAdminSettingsClient(),
    menuClient: new StubMenuClient(),
    orderClient: new StubOrderClient(),
    posDbClient: new StubPosDbClient(),
    restaurantClient: new StubRestaurantClient(),
    staffShiftPlanClient: new StubStaffShiftPlanClient(),
  };
}

export function createAdminStaffClient(posHomeUrl: string, clientMode: 'stub' | 'live') {
  if (clientMode === 'live') {
    return new LiveAdminStaffClient(new URL(posHomeUrl).origin);
  }
  return new StubAdminStaffClient();
}

export function createMenuClient(posHomeUrl: string, clientMode: 'stub' | 'live') {
  if (clientMode === 'live') {
    return new LiveMenuClient(new URL(posHomeUrl).origin);
  }
  return new StubMenuClient();
}

export function createPosDbClient(testMode: 'offline' | 'live') {
  if (testMode === 'live') {
    return new UnsupportedLivePosDbClient();
  }
  return new StubPosDbClient();
}
