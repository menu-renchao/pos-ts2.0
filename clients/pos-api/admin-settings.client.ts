import type { AdminSettingName, AdminSettingValue } from '../../test-data/pos/admin-settings.js';

export interface AdminSettingsClient {
  setSetting(name: AdminSettingName, value: AdminSettingValue): Promise<void>;
  readSetting(name: AdminSettingName): Promise<AdminSettingValue | undefined>;
}

export class StubAdminSettingsClient implements AdminSettingsClient {
  private readonly settings = new Map<AdminSettingName, AdminSettingValue>();

  async setSetting(name: AdminSettingName, value: AdminSettingValue): Promise<void> {
    this.settings.set(name, value);
  }

  async readSetting(name: AdminSettingName): Promise<AdminSettingValue | undefined> {
    return this.settings.get(name);
  }
}
