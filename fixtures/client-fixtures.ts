import { StubPosDbClient } from '../clients/db/pos-db.client.js';
import { StubAdminStaffClient } from '../clients/pos-api/admin-staff.client.js';
import { StubAdminSettingsClient } from '../clients/pos-api/admin-settings.client.js';
import { StubMenuClient } from '../clients/pos-api/menu.client.js';
import { StubOrderClient } from '../clients/pos-api/order.client.js';

export type StubClientSet = {
  adminStaffClient: StubAdminStaffClient;
  adminSettingsClient: StubAdminSettingsClient;
  menuClient: StubMenuClient;
  orderClient: StubOrderClient;
  posDbClient: StubPosDbClient;
};

export function createStubClients(): StubClientSet {
  return {
    adminStaffClient: new StubAdminStaffClient(),
    adminSettingsClient: new StubAdminSettingsClient(),
    menuClient: new StubMenuClient(),
    orderClient: new StubOrderClient(),
    posDbClient: new StubPosDbClient(),
  };
}
