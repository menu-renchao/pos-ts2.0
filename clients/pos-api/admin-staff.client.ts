import { staffDiscountRoleSamples } from '../../test-data/pos/permissions.js';
import { step } from '../../utils/step.js';

export type StaffRoleName = (typeof staffDiscountRoleSamples)[keyof typeof staffDiscountRoleSamples]['role'];
export type StaffPermissionName = 'ANALYSIS' | 'VIEW_HISTORY_ORDERS' | 'REPORT' | 'TOTAL_REPORT' | 'PERSONAL_REPORT';

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
  readRoleMaxDiscounts(): Promise<StaffRoleDiscountLimit[]>;
  editStaffRemoveFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void>;
  editStaffAddFunctions(staffId: string, permissions: readonly StaffPermissionName[]): Promise<void>;
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
      this.permissionOverrides.set(staffId, {
        ...current,
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
