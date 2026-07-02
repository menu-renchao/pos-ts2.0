import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { waitUntil } from '../../utils/wait.js';
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
  private lastHistorySearch = '';

  constructor(page: Page) {
    super(page);
    this.activeTab = page.getByTestId('reservation-active-tab').or(page.locator('#rslistactiveBt'));
    this.addButton = page.getByTestId('reservation-add').or(page.locator('#rsnewHL'));
    this.currentStatus = page.getByTestId('reservation-current-status').or(page.locator('#rseditStatusBt:visible')).first();
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
    this.statusPartyInput = page.getByTestId('reservation-status-party').or(page.locator('#rseditptynmipt:visible')).first();
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
      if (await this.currentStatus.isVisible({ timeout: 500 }).catch(() => false)) {
        return normalizeReservationStatus((await this.currentStatus.textContent()) ?? '');
      }

      const listStatus = await this.readLiveReservationListStatus(partyName);
      if (listStatus) {
        return listStatus;
      }

      await expect(this.currentStatus).toBeVisible();
      return normalizeReservationStatus((await this.currentStatus.textContent()) ?? '');
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
      this.lastHistorySearch = phone;
      await this.historySearchInput.fill(phone);
      await this.historySearchInput.press('Enter');
    });
  }

  async readHistoryRows(): Promise<ReservationHistoryRow[]> {
    return step('读取预约历史列表', async () => {
      const liveHistoryRows = this.page.locator('div[id*="hstDtContentOuter"] > div:visible');
      if (await liveHistoryRows.first().isVisible({ timeout: 1_000 }).catch(() => false)) {
        return liveHistoryRows.evaluateAll((rows, lastHistorySearch) =>
          rows
            .map((row) => {
              const rowText = row.textContent?.replace(/\s+/g, ' ').trim() ?? '';
              const phone = rowText.match(/(?:\+1\s*)?\d{10}/)?.[0] ?? row.children.item(3)?.textContent?.trim() ?? '';
              return { phone };
            })
            .filter((row) => !lastHistorySearch || row.phone.includes(lastHistorySearch))
            .filter((row) => row.phone.length > 0),
          this.lastHistorySearch,
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
    const visibleName = partyName.slice(0, 15);
    const liveReservation = this.page
      .locator(`xpath=//div[contains(@class,"rslvl2nm") and starts-with(normalize-space(.), "${visibleName}")]`)
      .first();
    await expect(liveReservation).toBeVisible({ timeout: 10_000 });
    await liveReservation.click();
    await expect(this.currentStatus).toBeVisible({ timeout: 10_000 });
  }

  private async readLiveReservationListStatus(partyName: string): Promise<string> {
    const visibleName = partyName.slice(0, 15);
    const row = this.page
      .locator(`xpath=//div[contains(@class,"rslvl2nm") and starts-with(normalize-space(.), "${visibleName}")]/ancestor::div[contains(@class,"rslvl1dtbx")][1]`)
      .first();
    if (!(await row.isVisible({ timeout: 1_000 }).catch(() => false))) {
      return '';
    }
    const text = (await row.textContent().catch(() => '')) ?? '';
    const match = text.match(/(?:Status|状态)\s*:?\s*([A-Za-z]+|[\u4e00-\u9fff]+)/);
    return normalizeReservationStatus(match?.[1] ?? text);
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
    const tablePage = this.page.locator('div[id^="myarea"].ui-page-active');
    if (!(await tablePage.isVisible({ timeout: 10_000 }).catch(() => false))) {
      return;
    }

    await this.clickLiveEmptyTable();
    await this.completeLiveSeatAssignmentIfNeeded();
    await this.saveLiveSeatedReservationOrderIfNeeded();
  }

  private async clickLiveEmptyTable(): Promise<void> {
    const preferredEmptyTableIds = ['tbA1', 'tbA2', 'tbA3', 'tb2', 'tb3', 'tb4', 'tb5', 'tb6', 'tb7', 'tb8', 'tb9'];
    for (const tableId of preferredEmptyTableIds) {
      const table = this.page.locator(`div[id^="myarea"].ui-page-active #${tableId}:not(.ORDERED)`).first();
      if (!(await table.isVisible({ timeout: 300 }).catch(() => false))) {
        continue;
      }
      const tableName = table.locator('.tbname').first();
      if (await tableName.isVisible({ timeout: 300 }).catch(() => false)) {
        await tableName.click({ force: true });
      } else {
        await table.click({ force: true });
      }
      return;
    }

    const clicked = await this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const available = (element: HTMLElement) => {
        const text = element.textContent ?? '';
        return (
          visible(element) &&
          !element.classList.contains('ORDERED') &&
          !element.querySelector('.rdcont, .tbinfoslp, .tbinfoRing, .thisTbtime') &&
          !/hourglass_bottom|receipt_long|priority_high|\d{1,2}:\d{2}/.test(text)
        );
      };
      const activeArea = document.querySelector<HTMLElement>('div[id^="myarea"].ui-page-active');
      const table = Array.from(activeArea?.querySelectorAll<HTMLElement>('.tbclasss') ?? []).find(available);
      if (!table) {
        return false;
      }
      const rect = table.getBoundingClientRect();
      const eventInit = {
        bubbles: true,
        cancelable: true,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        view: window,
      };
      const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
      jquery?.(table).trigger('tap');
      for (const eventType of ['pointerdown', 'mousedown', 'touchstart', 'pointerup', 'mouseup', 'touchend', 'click']) {
        const event =
          eventType.startsWith('touch')
            ? new TouchEvent(eventType, { bubbles: true, cancelable: true })
            : new MouseEvent(eventType, eventInit);
        table.dispatchEvent(event);
      }
      table.click();
      return true;
    });
    if (!clicked) {
      throw new Error('预约入座未找到可选空桌');
    }
  }

  private async completeLiveSeatAssignmentIfNeeded(): Promise<void> {
    await waitUntil(
      async () =>
        (await this.isLiveOrderEntryVisible()) ||
        (await this.page.locator('#choose-guest-num-dialog:visible').isVisible().catch(() => false)) ||
        (await this.page.locator('.chooseLevel:visible').isVisible().catch(() => false)),
      {
        description: '预约入座选桌后页面响应',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    ).catch(() => undefined);

    if (await this.page.locator('#choose-guest-num-dialog:visible').isVisible().catch(() => false)) {
      await this.page.locator('#choose-guest-num-dialog:visible [data-num="1"]').click({ force: true });
    }

    if (!(await this.isLiveOrderEntryVisible()) && (await this.page.locator('.chooseLevel:visible').isVisible().catch(() => false))) {
      const confirmed = await this.page.evaluate(() => {
        const visible = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          const style = window.getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        };
        const icon = Array.from(document.querySelectorAll<HTMLElement>('.chooseLevel *, .chooseLevel')).find(
          (element) => visible(element) && /select_check_box|done|check/i.test(element.textContent ?? ''),
        );
        const target = (icon?.closest('div') as HTMLElement | null) ?? icon;
        if (!target) {
          return false;
        }
        const jquery = (window as unknown as { $?: (target: HTMLElement) => { trigger: (eventName: string) => void } }).$;
        jquery?.(target).trigger('tap');
        target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        target.click();
        return true;
      });
      if (!confirmed) {
        throw new Error('预约入座选桌后未找到确认按钮');
      }
    }

    await waitUntil(
      async () =>
        (await this.isLiveOrderEntryVisible()) ||
        !(await this.page.locator('div[id^="myarea"].ui-page-active').isVisible().catch(() => false)),
      {
        description: '预约入座进入点单页',
        intervalMs: 200,
        timeoutMs: 10_000,
      },
    );

    if (!(await this.isLiveOrderEntryVisible()) && (await this.page.locator('div[id^="myarea"].ui-page-active').isVisible().catch(() => false))) {
      await this.page
        .locator('.chooseLevel:visible')
        .getByText(/select_check_box|done|check/i)
        .first()
        .click({ force: true, timeout: 1_000 })
        .catch(() => undefined);
      await waitUntil(
        async () =>
          (await this.isLiveOrderEntryVisible()) ||
          !(await this.page.locator('div[id^="myarea"].ui-page-active').isVisible().catch(() => false)),
        {
          description: '预约入座二次确认后进入点单页',
          intervalMs: 200,
          timeoutMs: 5_000,
        },
      );
    }
  }

  private async saveLiveSeatedReservationOrderIfNeeded(): Promise<void> {
    if (!(await this.isLiveOrderEntryVisible())) {
      return;
    }
    await this.clickLiveSaveOrderButton();
    await waitUntil(
      async () =>
        (await this.page.locator('#rslistunactiveBt:visible, #rsexitBt:visible').first().isVisible().catch(() => false)) ||
        !(await this.isLiveOrderEntryVisible()),
      {
        description: '预约入座订单保存后回到预约流程',
        intervalMs: 200,
        timeoutMs: 15_000,
      },
    );
    if (await this.page.locator('#rsexitBt:visible').isVisible().catch(() => false)) {
      await this.page.locator('#rsexitBt:visible').click({ force: true });
    }
    await expect(this.inactiveTab).toBeVisible({ timeout: 10_000 });
  }

  private async clickLiveSaveOrderButton(): Promise<void> {
    const saveButton = this.page.locator('#odSave:visible, #odSavetxt:visible').first();
    if (await saveButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await saveButton.click({ force: true });
      return;
    }
    const clicked = await this.page.evaluate(() => {
      const save = document.querySelector<HTMLElement>('#odSave, #odSavetxt');
      if (!save) {
        return false;
      }
      save.click();
      const maybeWindow = window as typeof window & { $?: (selector: string) => { trigger: (eventName: string) => void } };
      maybeWindow.$?.('#odSave')?.trigger('click');
      maybeWindow.$?.('#odSavetxt')?.trigger('click');
      return true;
    });
    if (!clicked) {
      throw new Error('预约入座进入点单页后未找到保存按钮');
    }
  }

  private async isLiveOrderEntryVisible(): Promise<boolean> {
    return (
      (await this.page.locator('#orderDishes.ui-page-active').isVisible().catch(() => false)) ||
      (await this.page.locator('#odSave:visible, #odSavetxt:visible').first().isVisible().catch(() => false))
    );
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeReservationStatus(statusText: string): string {
  const text = statusText.replace(/\s+/g, ' ').trim();
  if (/Arrived|莅临|到店/.test(text)) {
    return 'Arrived';
  }
  if (/Seated|就位|入座/.test(text)) {
    return 'Seated';
  }
  if (/Confirmed|预约/.test(text)) {
    return 'Confirmed';
  }
  if (/No\s*Show|未到/.test(text)) {
    return 'No Show';
  }
  if (/Cancelled|Canceled|取消/.test(text)) {
    return 'Cancelled';
  }
  return text;
}
