import { StubPosDbClient } from '../clients/db/pos-db.client.js';
import { StubAdminSettingsClient } from '../clients/pos-api/admin-settings.client.js';
import { StubOrderClient } from '../clients/pos-api/order.client.js';

export type StubClientSet = {
  adminSettingsClient: StubAdminSettingsClient;
  orderClient: StubOrderClient;
  posDbClient: StubPosDbClient;
};

export function createStubClients(): StubClientSet {
  return {
    adminSettingsClient: new StubAdminSettingsClient(),
    orderClient: new StubOrderClient(),
    posDbClient: new StubPosDbClient(),
  };
}
