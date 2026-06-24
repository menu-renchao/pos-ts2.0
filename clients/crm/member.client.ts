import {
  cloudOnlySearchPhone,
  duplicateJoinMemberPhone,
  existingCrmMember,
  localOnlyMember,
  type CrmMemberRecord,
} from '../../test-data/crm/members.js';

export class StubCrmMemberClient {
  private nextPhoneSuffix = 9000;

  existingPhone(): string {
    return existingCrmMember.phone;
  }

  duplicatePhoneInput(): string {
    return duplicateJoinMemberPhone;
  }

  nextUniquePhone(): string {
    const phone = `646733${this.nextPhoneSuffix}`;
    this.nextPhoneSuffix += 1;
    return phone;
  }

  cloudMemberSearchPhone(): string {
    return cloudOnlySearchPhone;
  }

  findCloudMemberByPhone(phone: string): CrmMemberRecord {
    if (phone === cloudOnlySearchPhone) {
      return existingCrmMember;
    }
    if (phone === localOnlyMember.phone) {
      throw new Error(`Local-only member should not be returned from redeem search: ${phone}`);
    }
    throw new Error(`Cloud member not found: ${phone}`);
  }
}
