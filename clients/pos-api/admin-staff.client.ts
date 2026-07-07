import { staffDiscountRoleSamples } from '../../test-data/pos/permissions.js';
import { step } from '../../utils/step.js';

export type StaffRoleName = (typeof staffDiscountRoleSamples)[keyof typeof staffDiscountRoleSamples]['role'];
export type StaffPermissionName =
  | 'ANALYSIS'
  | 'VIEW_HISTORY_ORDERS'
  | 'REPORT'
  | 'TOTAL_REPORT'
  | 'PERSONAL_REPORT'
  | 'DINE_IN'
  | 'ADMIN'
  | 'ADMIN_STAFF'
  | 'NOTE'
  | 'VOID_PRINTED_ITEM';

export type StaffRoleDiscountLimit = {
  role: StaffRoleName;
  maximumDiscountPercent: number;
};

export type StaffPermissionOverride = {
  staffId: string;
  addedPermissions: StaffPermissionName[];
  removedPermissions: StaffPermissionName[];
};

export interface AdminStaffClient {
  editRoleMaxDiscount(role: StaffRoleName, maximumDiscountPercent: number): Promise<void>;
  editRoleRemoveFunctions(role: StaffRoleName, permissions: readonly StaffPermissionName[]): Promise<void>;
  editRoleAddFunctions(role: StaffRoleName, permissions: readonly StaffPermissionName[]): Promise<void>;
  readRoleMaxDiscounts(): Promise<StaffRoleDiscountLimit[]>;
  editStaffRemoveFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void>;
  editStaffAddFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void>;
  deleteStaffByName(staffName: string): Promise<void>;
  readStaffPermissionOverrides(): Promise<StaffPermissionOverride[]>;
}

export class StubAdminStaffClient implements AdminStaffClient {
  private readonly roleDiscountLimits = new Map<StaffRoleName, number>(
    Object.values(staffDiscountRoleSamples).map((sample) => [sample.role, sample.maxWholeOrderDiscountPercent]),
  );
  private readonly permissionOverrides = new Map<string, StaffPermissionOverride>();

  async editRoleMaxDiscount(role: StaffRoleName, maximumDiscountPercent: number): Promise<void> {
    await step(`设置 ${role} 角色最大折扣为 ${maximumDiscountPercent}%`, async () => {
      this.roleDiscountLimits.set(role, maximumDiscountPercent);
    });
  }

  async editRoleRemoveFunctions(_role: StaffRoleName, _permissions: readonly StaffPermissionName[]): Promise<void> {
    await step('离线模式跳过角色权限移除', async () => {});
  }

  async editRoleAddFunctions(_role: StaffRoleName, _permissions: readonly StaffPermissionName[]): Promise<void> {
    await step('离线模式跳过角色权限恢复', async () => {});
  }

  async readRoleMaxDiscounts(): Promise<StaffRoleDiscountLimit[]> {
    return step('读取员工角色最大折扣配置', async () =>
      [...this.roleDiscountLimits.entries()].map(([role, maximumDiscountPercent]) => ({
        role,
        maximumDiscountPercent,
      })),
    );
  }

  async editStaffRemoveFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`移除员工 ${staffId} 权限 ${permissions.join(', ')}`, async () => {
      const current = this.permissionOverrideFor(staffId);
      const removedPermissions = [...new Set([...current.removedPermissions, ...permissions])];
      const removedPermissionSet = new Set<StaffPermissionName>(permissions);
      const addedPermissions = current.addedPermissions.filter((permission) => !removedPermissionSet.has(permission));
      this.permissionOverrides.set(staffId, {
        ...current,
        addedPermissions,
        removedPermissions,
      });
    });
  }

  async editStaffAddFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`增加员工 ${staffId} 权限 ${permissions.join(', ')}`, async () => {
      const current = this.permissionOverrideFor(staffId);
      const addedPermissions = [...new Set([...current.addedPermissions, ...permissions])];
      const addedPermissionSet = new Set<StaffPermissionName>(permissions);
      const removedPermissions = current.removedPermissions.filter((permission) => !addedPermissionSet.has(permission));
      this.permissionOverrides.set(staffId, {
        ...current,
        addedPermissions,
        removedPermissions,
      });
    });
  }

  async readStaffPermissionOverrides(): Promise<StaffPermissionOverride[]> {
    return step('读取员工权限覆盖配置', async () => [...this.permissionOverrides.values()]);
  }

  async deleteStaffByName(staffName: string): Promise<void> {
    await step(`删除员工 ${staffName}`, async () => {});
  }

  private permissionOverrideFor(staffId: string): StaffPermissionOverride {
    return (
      this.permissionOverrides.get(staffId) ?? {
        staffId,
        addedPermissions: [],
        removedPermissions: [],
      }
    );
  }
}

type LivePrivilege = {
  id: number;
  name: string;
  type?: string;
};

type LiveRole = {
  id: number;
  name: StaffRoleName | string;
  functions: LivePrivilege[];
  discountCapRate: number;
};

type LiveStaff = {
  id: number;
  name: string;
  wage?: number;
  wageType?: number;
  requireClockInOut: boolean;
  requireCashInOut: boolean;
  requireInputCashTips: boolean;
  active?: boolean;
  user: {
    id?: number;
    roles: LiveRole[];
    functions: LivePrivilege[];
  };
};

export class LiveAdminStaffClient implements AdminStaffClient {
  private readonly endpointUrl: string;

  constructor(private readonly baseUrl: string) {
    this.endpointUrl = `${baseUrl}/kpos/ws/kposService`;
  }

  async editRoleMaxDiscount(role: StaffRoleName, maximumDiscountPercent: number): Promise<void> {
    await step(`live 设置 ${role} 角色最大折扣为 ${maximumDiscountPercent}%`, async () => {
      const liveRole = await this.findRole(role);
      await this.saveRole({
        ...liveRole,
        discountCapRate: maximumDiscountPercent,
      });
    });
  }

  async editRoleRemoveFunctions(role: StaffRoleName, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`live 移除 ${role} 角色权限 ${permissions.join(', ')}`, async () => {
      const liveRole = await this.findRole(role);
      const removed = new Set<string>(permissions);
      await this.saveRole({
        ...liveRole,
        functions: liveRole.functions.filter((privilege) => !removed.has(privilege.name)),
      });
    });
  }

  async editRoleAddFunctions(role: StaffRoleName, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`live 增加 ${role} 角色权限 ${permissions.join(', ')}`, async () => {
      const liveRole = await this.findRole(role);
      const privilegeByName = new Map((await this.listPrivileges()).map((privilege) => [privilege.name, privilege]));
      const functionByName = new Map(liveRole.functions.map((privilege) => [privilege.name, privilege]));
      for (const permission of permissions) {
        const privilege = privilegeByName.get(permission);
        if (!privilege) {
          throw new Error(`Live privilege ${permission} 未找到`);
        }
        functionByName.set(permission, privilege);
      }
      await this.saveRole({
        ...liveRole,
        functions: [...functionByName.values()],
      });
    });
  }

  async readRoleMaxDiscounts(): Promise<StaffRoleDiscountLimit[]> {
    return step('live 读取员工角色最大折扣配置', async () =>
      (await this.listRoles())
        .filter((role): role is LiveRole & { name: StaffRoleName } => this.isKnownRoleName(role.name))
        .map((role) => ({
          role: role.name,
          maximumDiscountPercent: role.discountCapRate,
        })),
    );
  }

  async editStaffRemoveFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`live 移除员工 ${staffId} 权限 ${permissions.join(', ')}`, async () => {
      const staff = await this.findStaff(staffId);
      const removed = new Set<string>(permissions);
      await this.saveStaff({
        ...staff,
        user: {
          ...staff.user,
          functions: staff.user.functions.filter((privilege) => !removed.has(privilege.name)),
        },
      });
    });
  }

  async editStaffAddFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void> {
    await step(`live 增加员工 ${staffId} 权限 ${permissions.join(', ')}`, async () => {
      const staff = await this.findStaff(staffId);
      const privilegeByName = new Map((await this.listPrivileges()).map((privilege) => [privilege.name, privilege]));
      const functionByName = new Map(staff.user.functions.map((privilege) => [privilege.name, privilege]));
      for (const permission of permissions) {
        const privilege = privilegeByName.get(permission);
        if (!privilege) {
          throw new Error(`Live privilege ${permission} 未找到`);
        }
        functionByName.set(permission, privilege);
      }
      await this.saveStaff({
        ...staff,
        user: {
          ...staff.user,
          functions: [...functionByName.values()],
        },
      });
    });
  }

  async deleteStaffByName(staffName: string): Promise<void> {
    await step(`live 删除员工 ${staffName}`, async () => {
      const staff = await this.listStaff().then((staffs) => staffs.find((candidate) => candidate.name === staffName));
      if (!staff) {
        return;
      }
      const xml = await this.callSoap('DeleteStaff', `<app:staffId>${staff.id}</app:staffId>`);
      this.assertSuccessful(xml, 'DeleteStaff');
    });
  }

  async readStaffPermissionOverrides(): Promise<StaffPermissionOverride[]> {
    return [];
  }

  private async findRole(roleName: StaffRoleName): Promise<LiveRole> {
    const role = (await this.listRoles()).find((candidate) => candidate.name === roleName);
    if (!role) {
      throw new Error(`Live role ${roleName} 未找到`);
    }
    return role;
  }

  private async findStaff(staffNameOrId: string): Promise<LiveStaff> {
    const staff = (await this.listStaff()).find((candidate) => candidate.name === staffNameOrId || String(candidate.id) === staffNameOrId);
    if (!staff) {
      throw new Error(`Live staff ${staffNameOrId} 未找到`);
    }
    return staff;
  }

  private async listRoles(): Promise<LiveRole[]> {
    const xml = await this.callSoap('ListRoles');
    this.assertSuccessful(xml, 'ListRoles');
    return xmlBlocks(xml, 'roles').map((roleXml) => ({
      id: requiredNumber(roleXml, 'id'),
      name: requiredText(roleXml, 'name'),
      functions: xmlBlocks(roleXml, 'function').map((functionXml) => {
        const privilege: LivePrivilege = {
          id: requiredNumber(functionXml, 'id'),
          name: requiredText(functionXml, 'name'),
        };
        const type = textContent(functionXml, 'type');
        if (type !== undefined) {
          privilege.type = type;
        }
        return privilege;
      }),
      discountCapRate: requiredNumber(roleXml, 'discountCapRate'),
    }));
  }

  private async listStaff(): Promise<LiveStaff[]> {
    const xml = await this.callSoap('ListStaff');
    this.assertSuccessful(xml, 'ListStaff');
    return xmlBlocks(xml, 'staff').map((staffXml) => {
      const userXml = xmlBlocks(staffXml, 'user')[0] ?? '';
      const directUserXml = withoutXmlBlocks(userXml, 'roles');
      const user: LiveStaff['user'] = {
        roles: xmlBlocks(userXml, 'roles').map((roleXml) => ({
          id: requiredNumber(roleXml, 'id'),
          name: requiredText(roleXml, 'name'),
          functions: [],
          discountCapRate: optionalNumber(roleXml, 'discountCapRate') ?? 0,
        })),
        functions: xmlBlocks(directUserXml, 'functions')
          .filter((functionXml) => textContent(functionXml, 'enable') !== 'false')
          .map((functionXml) =>
            compactPrivilege({
              id: requiredNumber(functionXml, 'id'),
              name: requiredText(functionXml, 'name'),
              type: textContent(functionXml, 'type') ?? undefined,
            }),
          ),
      };
      const userId = optionalNumber(userXml, 'id');
      if (userId !== undefined) {
        user.id = userId;
      }
      const staff: LiveStaff = {
        id: requiredNumber(staffXml, 'id'),
        name: requiredText(staffXml, 'name'),
        requireClockInOut: textContent(staffXml, 'requireClockInOut') === 'true',
        requireCashInOut: textContent(staffXml, 'requireCashInOut') === 'true',
        requireInputCashTips: textContent(staffXml, 'requireInputCashTips') === 'true',
        user,
      };
      const wage = optionalNumber(staffXml, 'wage');
      const wageType = optionalNumber(staffXml, 'wageType');
      const active = textContent(staffXml, 'active');
      if (wage !== undefined) {
        staff.wage = wage;
      }
      if (wageType !== undefined) {
        staff.wageType = wageType;
      }
      if (active !== undefined) {
        staff.active = active === 'true';
      }
      return staff;
    });
  }

  private async listPrivileges(): Promise<LivePrivilege[]> {
    const xml = await this.callSoap('ListPrivileges');
    this.assertSuccessful(xml, 'ListPrivileges');
    return xmlBlocks(xml, 'function').map((functionXml) =>
      compactPrivilege({
        id: requiredNumber(functionXml, 'id'),
        name: requiredText(functionXml, 'name'),
        type: textContent(functionXml, 'type') ?? undefined,
      }),
    );
  }

  private async saveRole(role: LiveRole): Promise<void> {
    const roleXml = [
      `<app:id>${role.id}</app:id>`,
      `<app:name>${escapeXml(role.name)}</app:name>`,
      ...role.functions.map(
        (privilege) =>
          `<app:function><app:id>${privilege.id}</app:id><app:name>${escapeXml(privilege.name)}</app:name>${
            privilege.type ? `<app:type>${escapeXml(privilege.type)}</app:type>` : ''
          }</app:function>`,
      ),
      `<app:discountCapRate>${role.discountCapRate}</app:discountCapRate>`,
    ].join('');
    const xml = await this.callSoap('SaveRole', `<app:role>${roleXml}</app:role>`);
    this.assertSuccessful(xml, 'SaveRole');
  }

  private async saveStaff(staff: LiveStaff): Promise<void> {
    const staffXml = [
      `<app:id>${staff.id}</app:id>`,
      `<app:name>${escapeXml(staff.name)}</app:name>`,
      staff.wage === undefined ? '' : `<app:wage>${staff.wage}</app:wage>`,
      staff.wageType === undefined ? '' : `<app:wageType>${staff.wageType}</app:wageType>`,
      `<app:requireClockInOut>${staff.requireClockInOut}</app:requireClockInOut>`,
      `<app:requireCashInOut>${staff.requireCashInOut}</app:requireCashInOut>`,
      `<app:requireInputCashTips>${staff.requireInputCashTips}</app:requireInputCashTips>`,
      '<app:user>',
      staff.user.id === undefined ? '' : `<app:id>${staff.user.id}</app:id>`,
      ...staff.user.roles.map(
        (role) =>
          `<app:roles><app:id>${role.id}</app:id><app:name>${escapeXml(role.name)}</app:name><app:discountCapRate>${role.discountCapRate}</app:discountCapRate></app:roles>`,
      ),
      ...staff.user.functions.map(
        (privilege) =>
          `<app:functions><app:id>${privilege.id}</app:id><app:name>${escapeXml(privilege.name)}</app:name>${
            privilege.type ? `<app:type>${escapeXml(privilege.type)}</app:type>` : ''
          }</app:functions>`,
      ),
      '</app:user>',
      staff.active === undefined ? '' : `<app:active>${staff.active}</app:active>`,
    ].join('');
    const xml = await this.callSoap('SaveStaff', `<app:staff>${staffXml}</app:staff>`);
    this.assertSuccessful(xml, 'SaveStaff');
  }

  private async callSoap(operation: string, bodyXml = ''): Promise<string> {
    const response = await fetch(this.endpointUrl, {
      method: 'POST',
      headers: {
        accept: 'text/xml, application/xml, */*',
        'content-type': 'text/xml;charset=UTF-8',
        SOAPAction: `http://ws.kpos.com/${operation}`,
      },
      body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:app="http://ws.kpos.com/app"><soapenv:Header/><soapenv:Body><app:${operation}Type>${bodyXml}</app:${operation}Type></soapenv:Body></soapenv:Envelope>`,
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Live admin staff SOAP ${operation} failed: ${response.status} ${text}`);
    }
    return text;
  }

  private assertSuccessful(xml: string, operation: string): void {
    const successful = textContent(xml, 'successful');
    if (successful !== 'true') {
      throw new Error(`Live admin staff SOAP ${operation} unsuccessful: ${xml.slice(0, 500)}`);
    }
  }

  private isKnownRoleName(roleName: string): roleName is StaffRoleName {
    return Object.values(staffDiscountRoleSamples).some((sample) => sample.role === roleName);
  }
}

function xmlBlocks(xml: string, tagName: string): string[] {
  const blockPattern = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`, 'g');
  return [...xml.matchAll(blockPattern)].map((match) => match[1] ?? '');
}

function textContent(xml: string, tagName: string): string | undefined {
  const match = new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)</${tagName}>`).exec(xml);
  return match?.[1] === undefined ? undefined : unescapeXml(match[1].trim());
}

function withoutXmlBlocks(xml: string, tagName: string): string {
  return xml.replace(new RegExp(`<${tagName}(?:\\s[^>]*)?>[\\s\\S]*?</${tagName}>`, 'g'), '');
}

function requiredText(xml: string, tagName: string): string {
  const value = textContent(xml, tagName);
  if (value === undefined) {
    throw new Error(`SOAP XML 缺少字段 ${tagName}`);
  }
  return value;
}

function requiredNumber(xml: string, tagName: string): number {
  const value = Number(requiredText(xml, tagName));
  if (!Number.isFinite(value)) {
    throw new Error(`SOAP XML 字段 ${tagName} 不是数字`);
  }
  return value;
}

function optionalNumber(xml: string, tagName: string): number | undefined {
  const text = textContent(xml, tagName);
  if (text === undefined || text === '') {
    return undefined;
  }
  const value = Number(text);
  if (!Number.isFinite(value)) {
    throw new Error(`SOAP XML 字段 ${tagName} 不是数字`);
  }
  return value;
}

function compactPrivilege(input: { id: number; name: string; type?: string | undefined }): LivePrivilege {
  const privilege: LivePrivilege = {
    id: input.id,
    name: input.name,
  };
  if (input.type !== undefined) {
    privilege.type = input.type;
  }
  return privilege;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function unescapeXml(value: string): string {
  return value
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}
