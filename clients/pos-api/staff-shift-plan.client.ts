import { step } from '../../utils/step.js';

export type StaffShiftPlan = {
  staffId: number;
  workDayOffset: number;
  startOffsetMinutes: number;
  endOffsetMinutes: number;
  earliestClockInOffset: number;
  autoClockOutOffset?: number;
};

export interface StaffShiftPlanClient {
  saveShiftPlan(plan: StaffShiftPlan): Promise<void>;
  readShiftPlans(): Promise<StaffShiftPlan[]>;
  deleteShiftPlan(staffId: number): Promise<void>;
}

export class StubStaffShiftPlanClient implements StaffShiftPlanClient {
  private readonly plans = new Map<number, StaffShiftPlan>();

  async saveShiftPlan(plan: StaffShiftPlan): Promise<void> {
    await step(`保存员工 ${plan.staffId} 排班计划`, async () => {
      this.plans.set(plan.staffId, plan);
    });
  }

  async readShiftPlans(): Promise<StaffShiftPlan[]> {
    return step('读取员工排班计划', async () => [...this.plans.values()]);
  }

  async deleteShiftPlan(staffId: number): Promise<void> {
    await step(`删除员工 ${staffId} 排班计划`, async () => {
      this.plans.delete(staffId);
    });
  }
}
