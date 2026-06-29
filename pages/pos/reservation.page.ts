import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { PageObject } from '../shared/page-object.js';

export type ReservationHistoryRow = {
  phone: string;
};

export class ReservationPage extends PageObject {
  private readonly activeTab: Locator;
  private readonly addButton: Locator;
  private readonly currentStatus: Locator;
  private readonly historyButton: Locator;
  private readonly historyRows: Locator;
  private readonly historySearchInput: Locator;
  private readonly inactiveTab: Locator;
  private readonly partyNameInput: Locator;
  private readonly phoneInput: Locator;
  private readonly reservationRoot: Locator;
  private readonly saveStatusButton: Locator;
  private readonly statusPartyInput: Locator;
  private readonly statusSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.activeTab = page.getByTestId('reservation-active-tab').or(page.locator('#rslistactiveBt'));
    this.addButton = page.getByTestId('reservation-add').or(page.locator('#rsnewHL'));
    this.currentStatus = page.getByTestId('reservation-current-status').or(page.locator('#rseditStatusBt'));
    this.historyButton = page.getByTestId('reservation-history').or(page.locator('#rshistory'));
    this.historyRows = page.getByTestId('reservation-history-row').or(page.locator('div[id*="hstDtContentOuter"] > div'));
    this.historySearchInput = page.getByTestId('reservation-history-search').or(page.locator('#rsschIpt'));
    this.inactiveTab = page.getByTestId('reservation-inactive-tab').or(page.locator('#rslistunactiveBt'));
    this.partyNameInput = page.getByTestId('reservation-party-name').or(page.locator('#prtynameipt'));
    this.phoneInput = page.getByTestId('reservation-phone').or(page.locator('#rsphipt'));
    this.reservationRoot = page
      .getByTestId('reservation-page')
      .or(page.locator('#rsnewHL:visible'))
      .or(page.getByText('Reservation Calendar', { exact: true }))
      .first();
    this.saveStatusButton = page.getByTestId('reservation-save-status').or(page.locator('#rseditSubmitbt'));
    this.statusPartyInput = page.getByTestId('reservation-status-party').or(page.locator('#rseditptynmipt'));
    this.statusSelect = page.getByTestId('reservation-status-select');
  }

  async addReservation(partyName: string, phone = ''): Promise<void> {
    await step(`新增预约 ${partyName}`, async () => {
      await expect(this.reservationRoot).toBeVisible();
      if (!(await this.partyNameInput.isVisible({ timeout: 500 }).catch(() => false))) {
        await this.addButton.click();
      }
      await this.partyNameInput.fill(partyName);
      await this.phoneInput.fill(phone);
      if (await this.page.locator('#typersbt').isVisible({ timeout: 500 }).catch(() => false)) {
        await this.page.locator('#typersbt').click();
        await this.page.locator('#kbrhide').click({ timeout: 2_000 }).catch(() => undefined);
        await this.page.locator('#rsnwsbbt').click();
        return;
      }
      await this.addButton.click();
    });
  }

  async changeReservationStatus(partyName: string, status: string): Promise<void> {
    await step(`更新预约 ${partyName} 状态为 ${status}`, async () => {
      await this.openLiveReservationIfNeeded(partyName);
      if (await this.statusPartyInput.isVisible({ timeout: 500 }).catch(() => false)) {
        await this.statusPartyInput.fill(partyName);
      }
      const liveStatusButton = this.liveStatusButton(status);
      if (await liveStatusButton.isVisible({ timeout: 500 }).catch(() => false)) {
        await liveStatusButton.click();
        if (status === 'Seated') {
          await this.chooseLiveEmptyTableForSeatedReservation();
        }
        return;
      }
      await this.statusSelect.selectOption(status);
      await this.saveStatusButton.click();
    });
  }

  async readCurrentStatus(partyName: string): Promise<string> {
    return step(`读取预约 ${partyName} 当前状态`, async () => {
      await this.openLiveReservationIfNeeded(partyName);
      if (await this.statusPartyInput.isVisible({ timeout: 500 }).catch(() => false)) {
        await this.statusPartyInput.fill(partyName);
      }
      await expect(this.currentStatus).toBeVisible();
      return (await this.currentStatus.textContent()) ?? '';
    });
  }

  async switchInactiveTab(): Promise<void> {
    await step('切换预约非活跃列表', async () => {
      await this.inactiveTab.click();
    });
  }

  async switchActiveTab(): Promise<void> {
    await step('切换预约活跃列表', async () => {
      await this.activeTab.click();
    });
  }

  async openHistory(): Promise<void> {
    await step('打开预约历史记录', async () => {
      await this.historyButton.click();
    });
  }

  async searchHistory(phone: string): Promise<void> {
    await step(`按电话查询预约历史 ${phone}`, async () => {
      await this.historySearchInput.fill(phone);
      await this.historySearchInput.press('Enter');
    });
  }

  async readHistoryRows(): Promise<ReservationHistoryRow[]> {
    return step('读取预约历史列表', async () => {
      const liveHistoryRows = this.page.locator('div[id*="hstDtContentOuter"] > div:visible');
      if (await liveHistoryRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        return liveHistoryRows.evaluateAll((rows) =>
          rows
            .map((row) => {
              const rowText = row.textContent?.replace(/\s+/g, ' ').trim() ?? '';
              const phone = rowText.match(/(?:\+1\s*)?\d{10}/)?.[0] ?? row.children.item(3)?.textContent?.trim() ?? '';
              return { phone };
            })
            .filter((row) => row.phone.length > 0),
        );
      }
      await expect(this.historyRows.first()).toBeVisible();
      return (await this.historyRows.allTextContents()).map((phone) => ({ phone: phone.trim() }));
    });
  }

  private async openLiveReservationIfNeeded(partyName: string): Promise<void> {
    if (await this.currentStatus.isVisible({ timeout: 500 }).catch(() => false)) {
      return;
    }
    const liveReservation = this.page
      .locator('.rslvl2nm')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(partyName)}\\s*$`) })
      .first()
      .or(
        this.page
          .locator('.rslvl2nm')
          .filter({ hasText: new RegExp(`^\\s*${escapeRegExp(partyName.slice(0, 15))}`) })
          .first(),
      )
      .first();
    if (await liveReservation.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await liveReservation.click();
    }
  }

  private liveStatusButton(status: string): Locator {
    const statusId =
      status === 'Arrived'
        ? '#rsStatus_Arrived'
        : status === 'Seated'
          ? '#rsStatus_AssignSeats'
          : `#rsStatus_${status}`;
    return this.page.locator(statusId);
  }

  private async chooseLiveEmptyTableForSeatedReservation(): Promise<void> {
    const table = this.page.locator('.tbclasss:not(.ORDERED)').first();
    if (!(await table.isVisible({ timeout: 5_000 }).catch(() => false))) {
      return;
    }
    await table.click();
    await expect(this.reservationRoot).toBeVisible({ timeout: 10_000 });
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
