import { staffDiscountRoleSamples } from '../../test-data/pos/permissions.js';
import { step } from '../../utils/step.js';

export type StaffRoleName = (typeof staffDiscountRoleSamples)[keyof typeof staffDiscountRoleSamples]['role'];

export type StaffRoleDiscountLimit = {
  role: StaffRoleName;
  maximumDiscountPercent: number;
};

export interface AdminStaffClient {
  editRoleMaxDiscount(role: StaffRoleName, maximumDiscountPercent: number): Promise<void>;
  readRoleMaxDiscounts(): Promise<StaffRoleDiscountLimit[]>;
}

export class StubAdminStaffClient implements AdminStaffClient {
  private readonly roleDiscountLimits = new Map<StaffRoleName, number>(
    Object.values(staffDiscountRoleSamples).map((sample) => [sample.role, sample.maxWholeOrderDiscountPercent]),
  );

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
}
