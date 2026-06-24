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
    this.activeTab = page.getByTestId('reservation-active-tab');
    this.addButton = page.getByTestId('reservation-add');
    this.currentStatus = page.getByTestId('reservation-current-status');
    this.historyButton = page.getByTestId('reservation-history');
    this.historyRows = page.getByTestId('reservation-history-row');
    this.historySearchInput = page.getByTestId('reservation-history-search');
    this.inactiveTab = page.getByTestId('reservation-inactive-tab');
    this.partyNameInput = page.getByTestId('reservation-party-name');
    this.phoneInput = page.getByTestId('reservation-phone');
    this.reservationRoot = page.getByTestId('reservation-page');
    this.saveStatusButton = page.getByTestId('reservation-save-status');
    this.statusPartyInput = page.getByTestId('reservation-status-party');
    this.statusSelect = page.getByTestId('reservation-status-select');
  }

  async addReservation(partyName: string, phone = ''): Promise<void> {
    await step(`新增预约 ${partyName}`, async () => {
      await expect(this.reservationRoot).toBeVisible();
      await this.partyNameInput.fill(partyName);
      await this.phoneInput.fill(phone);
      await this.addButton.click();
    });
  }

  async changeReservationStatus(partyName: string, status: string): Promise<void> {
    await step(`更新预约 ${partyName} 状态为 ${status}`, async () => {
      await this.statusPartyInput.fill(partyName);
      await this.statusSelect.selectOption(status);
      await this.saveStatusButton.click();
    });
  }

  async readCurrentStatus(partyName: string): Promise<string> {
    return step(`读取预约 ${partyName} 当前状态`, async () => {
      await this.statusPartyInput.fill(partyName);
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
      await expect(this.historyRows.first()).toBeVisible();
      return (await this.historyRows.allTextContents()).map((phone) => ({ phone: phone.trim() }));
    });
  }
}
