import { numericPhone, uniqueName } from '../../utils/random.js';
import type { CustomerSample } from './domain-types.js';

export const defaultCustomer: CustomerSample = {
  firstName: 'Migration',
  lastName: 'Customer',
  phone: '5550000001',
  email: 'migration.customer@example.test',
};

export function createUniqueCustomer(prefix = 'Migration'): CustomerSample {
  const name = uniqueName(prefix);
  return {
    firstName: name,
    lastName: 'Customer',
    phone: numericPhone(),
    email: `${name.toLowerCase()}@example.test`,
  };
}
