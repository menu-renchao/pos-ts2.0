import type { Frame, FrameLocator, Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { step } from '../../utils/step.js';
import { parseCurrency } from '../../utils/money.js';
import { waitUntil } from '../../utils/wait.js';
import { PageObject } from '../shared/page-object.js';

export class ReportPage extends PageObject {
  private readonly legacyInnerFrame: FrameLocator;
  private readonly legacyReportFrame: FrameLocator;
  private readonly legacyReportEndTime: Locator;
  private readonly legacyReportStartTime: Locator;
  private readonly liveFrame: FrameLocator;
  private readonly liveFrameRoot: Locator;
  private readonly liveOrderTypeExpand: Locator;
  private readonly liveOrderTypeLabels: Locator;
  private readonly liveOrderTypeSelect: Locator;
  private readonly liveOverviewKeyMetrics: Locator;
  private readonly feeAmount: Locator;
  private readonly homepageUnpaid: Locator;
  private readonly overviewNetSales: Locator;
  private readonly orderTypeSelect: Locator;
  private readonly reportEndTime: Locator;
  private readonly reportPasswordInput: Locator;
  private readonly reportPasswordSaveButton: Locator;
  private readonly reportRoot: Locator;
  private readonly reportStaffReportButton: Locator;
  private readonly reportStartTime: Locator;
  private readonly reportTotalReportButton: Locator;
  private liveSelectedOrderType?: string;

  constructor(page: Page) {
    super(page);
    this.legacyInnerFrame = page.frameLocator('#innerpage').first();
    this.legacyReportFrame = this.legacyInnerFrame.frameLocator('#report-frame').first();
    this.legacyReportEndTime = this.legacyReportFrame
      .locator('xpath=//span[text()="To"]/../following-sibling::td[1]/span')
      .first();
    this.legacyReportStartTime = this.legacyReportFrame
      .locator('xpath=//span[text()="From"]/../following-sibling::td[1]/span')
      .first();
    this.liveFrame = page.frameLocator('#thirdAppIframe').first();
    this.liveFrameRoot = page.locator('#thirdAppIframe:visible').first();
    this.liveOrderTypeExpand = this.liveFrame.locator('li#AllOrderType_li i.collapsed');
    this.liveOrderTypeLabels = this.liveFrame.locator('label[for*="AllOrderType"]');
    this.liveOrderTypeSelect = this.liveFrame.locator("div[class*='dbPos_topicFilter']").first().locator('ul.tag-list');
    this.liveOverviewKeyMetrics = this.liveFrame.locator('div[class*="dbPos_topicWrapBx1"]');
    this.feeAmount = page.getByTestId('report-fee-amount');
    this.homepageUnpaid = page.getByTestId('report-homepage-unpaid');
    this.overviewNetSales = page.getByTestId('report-overview-net-sales');
    this.orderTypeSelect = page.getByTestId('report-order-type');
    this.reportEndTime = page.getByTestId('report-end-time');
    this.reportPasswordInput = page.getByTestId('report-password').or(page.locator('#pwipt'));
    this.reportPasswordSaveButton = page.getByTestId('report-password-save').or(page.locator('#ds'));
    this.reportRoot = page
      .getByTestId('report-page')
      .or(this.liveFrameRoot)
      .or(page.locator('#totalReport, #innerpage:visible'))
      .first();
    this.reportStaffReportButton = page.getByTestId('report-staff-report');
    this.reportStartTime = page.getByTestId('report-start-time');
    this.reportTotalReportButton = page.getByTestId('report-total-report');
  }

  async inputPasswordInPopup(password: string): Promise<void> {
    await step('在报表密码弹层输入员工密码', async () => {
      const offlinePasswordInput = this.page.getByTestId('report-password');
      if (await offlinePasswordInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await offlinePasswordInput.fill(password);
        await this.page.getByTestId('report-password-save').click();
        await expect(this.reportRoot).toBeVisible({ timeout: 5_000 });
        return;
      }

      const visiblePasswordInput = this.page
        .locator('[data-testid="report-password"]:visible, #pwipt:visible, #iptpwtx:visible input:visible')
        .first();
      const livePasscodePrompt = this.page
        .locator('#iptpwtx:visible, #pwd-input-title:visible, #ckin_pw-input-title:visible')
        .filter({ hasText: /^Enter Your Passcode$/ })
        .first();
      if (await livePasscodePrompt.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.inputLivePopupPassword(password);
      } else if (await visiblePasswordInput.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await visiblePasswordInput.fill(password);
        await waitUntil(async () => (await visiblePasswordInput.inputValue()) === password, {
          description: '报表密码输入稳定',
          intervalMs: 25,
          timeoutMs: 1_000,
        });
      } else {
        await this.inputLivePopupPassword(password);
      }
      const submitted = await this.clickPasswordSubmitButton();
      if (!submitted) {
        await this.reportPasswordSaveButton.click();
      }
      await expect(livePasscodePrompt).toBeHidden({ timeout: 15_000 }).catch(() => undefined);
      await this.waitForReportSurface();
    });
  }

  async isInReportPage(): Promise<boolean> {
    return step('判断是否进入报表页面', async () => {
      await expect(this.reportRoot).toBeVisible();
      return this.reportRoot.isVisible();
    });
  }

  private async waitForReportSurface(): Promise<void> {
    await waitUntil(
      async () =>
        (await this.reportRoot.isVisible().catch(() => false)) ||
        (await this.legacyInnerFrame.locator('body').isVisible().catch(() => false)) ||
        (await this.isLiveReportSurfaceVisible()),
      {
        description: 'Report 页面展示',
        intervalMs: 200,
        timeoutMs: 60_000,
      },
    );
  }

  private async isLiveReportSurfaceVisible(timeoutMs = 500): Promise<boolean> {
    return (await this.findLiveReportFrame(timeoutMs)) !== null;
  }

  private async findLiveReportFrame(timeoutMs = 500): Promise<Frame | null> {
    const deadline = Date.now() + timeoutMs;
    do {
      for (const frame of this.page.frames()) {
        const bodyText = await frame
          .evaluate(() => document.body?.innerText ?? '')
          .catch(() => '');
        if (/REPORT/i.test(bodyText) && /(Overview|Staff|Net Sales)/i.test(bodyText)) {
          return frame;
        }
      }
      if (Date.now() >= deadline) {
        break;
      }
      await this.page.waitForTimeout(Math.min(100, deadline - Date.now()));
    } while (Date.now() < deadline);
    return null;
  }

  async selectOrderType(orderType: string): Promise<void> {
    await step(`报表选择订单类型 ${orderType}`, async () => {
      await expect(this.reportRoot).toBeVisible();
      if (await this.isLiveReportSurfaceVisible()) {
        await this.selectLiveOrderType(orderType);
        return;
      }
      await this.orderTypeSelect.selectOption(orderType);
    });
  }

  async enterTotalReport(): Promise<void> {
    await step('进入 Total Report', async () => {
      await expect(this.reportRoot).toBeVisible();
      if (await this.isLiveReportSurfaceVisible()) {
        await this.waitForLiveReportLoadingGone();
        return;
      }
      if (await this.page.locator('#totalReport').isVisible({ timeout: 1_000 }).catch(() => false)) {
        return;
      }
      await this.reportTotalReportButton.click();
    });
  }

  async openStaffReport(): Promise<void> {
    await step('打开 Staff Report', async () => {
      if (await this.legacyInnerFrame.locator('#totalReport').isVisible({ timeout: 1_000 }).catch(() => false)) {
        await this.legacyInnerFrame.locator('#staff-page-tag').click();
        await this.legacyInnerFrame.locator('#staff-page').click();
        await this.legacyInnerFrame.locator('xpath=(//button[@type="submit"])[1]').click();
        await expect(this.legacyInnerFrame.locator('#report-frame')).toBeVisible({ timeout: 30_000 });
        return;
      }
      if (await this.isLiveReportSurfaceVisible()) {
        await this.openLiveStaffReport();
        return;
      }
      await this.reportStaffReportButton.click();
      await expect(this.reportStartTime).toBeVisible();
      await expect(this.reportEndTime).toBeVisible();
    });
  }

  async readStaffReportDateRange(): Promise<{ startTime: string; endTime: string }> {
    return step('读取 Staff Report 时间范围', async () => {
      if (await this.isLiveReportSurfaceVisible()) {
        return this.readLiveStaffReportDateRange();
      }
      if (await this.legacyReportStartTime.isVisible({ timeout: 1_000 }).catch(() => false)) {
        return {
          startTime: ((await this.legacyReportStartTime.textContent()) ?? '').trim(),
          endTime: ((await this.legacyReportEndTime.textContent()) ?? '').trim(),
        };
      }
      return {
        startTime: ((await this.reportStartTime.textContent()) ?? '').trim(),
        endTime: ((await this.reportEndTime.textContent()) ?? '').trim(),
      };
    });
  }

  private async openLiveStaffReport(): Promise<void> {
    const frame = await this.findLiveReportFrame(30_000);
    if (!frame) {
      throw new Error('未找到 live Cloud Report iframe');
    }
    await this.waitForLiveReportLoadingGone(frame);
    const staffCategory = frame.locator('xpath=//ul//li[contains(normalize-space(.), "Staff")]').first();
    await expect(staffCategory).toBeVisible({ timeout: 30_000 });
    await staffCategory.hover().catch(() => undefined);
    await staffCategory.click().catch(() => undefined);

    const staffReportMenu = frame
      .locator(
        'xpath=(//*[self::li or self::div or self::a][normalize-space(.)="Staff report" or normalize-space(.)="Staff Report" or normalize-space(.)="Staff"])[last()]',
      )
      .first();
    if (await staffReportMenu.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await staffReportMenu.click();
    }

    await waitUntil(
      async () => {
        return frame.locator('h1, h2, h3').evaluateAll((headings) =>
          headings.some((heading) => /^Staff$/i.test((heading.textContent ?? '').trim())) ||
          /Staff Attendance Summary/i.test(document.body?.innerText ?? ''),
        );
      },
      {
        description: 'Cloud Report Staff Report 展示',
        intervalMs: 500,
        timeoutMs: 60_000,
      },
    );
    await this.waitForLiveReportLoadingGone(frame);
    const runButton = frame.locator('xpath=(//button[@type="submit"])[1]').first();
    await expect(runButton).toBeVisible({ timeout: 10_000 });
    await runButton.evaluate((element) => {
      const target = element as HTMLElement;
      target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
      target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
      target.click();
    });
    await this.waitForLiveReportLoadingGone(frame);
    await waitUntil(
      async () => {
        for (const childFrame of frame.childFrames()) {
          const childText = await childFrame.evaluate(() => document.body?.innerText ?? '').catch(() => '');
          if (/From/i.test(childText) && /To/i.test(childText)) {
            return true;
          }
        }
        return false;
      },
      {
        description: 'Cloud Report Staff Report 运行完成',
        intervalMs: 500,
        timeoutMs: 60_000,
      },
    );
  }

  private async readLiveStaffReportDateRange(): Promise<{ startTime: string; endTime: string }> {
    const frame = await this.findLiveReportFrame(5_000);
    if (!frame) {
      throw new Error('未找到 live Cloud Report iframe');
    }
    for (const childFrame of frame.childFrames()) {
      const dateRange = await childFrame
        .locator('body')
        .evaluate(() => {
          const bodyText = document.body?.innerText?.replace(/\s+/g, ' ') ?? '';
          const inlineRange = bodyText.match(/From\s*(\d{4}-\d{2}-\d{2})\s*To\s*(\d{4}-\d{2}-\d{2})/i);
          if (inlineRange?.[1] && inlineRange[2]) {
            return {
              startTime: inlineRange[1],
              endTime: inlineRange[2],
            };
          }
          const readFollowingSpan = (label: string) => {
            const labelSpan = Array.from(document.querySelectorAll('span')).find(
              (span) => span.textContent?.trim() === label,
            );
            const row = labelSpan?.closest('tr');
            const valueSpan = row?.querySelector<HTMLSpanElement>('td:nth-child(2) span');
            return valueSpan?.textContent?.trim() ?? '';
          };
          return {
            startTime: readFollowingSpan('From'),
            endTime: readFollowingSpan('To'),
          };
        })
        .catch(() => ({ startTime: '', endTime: '' }));
      if (dateRange.startTime && dateRange.endTime) {
        return dateRange;
      }
    }
    return frame.locator('body').evaluate(() => {
      const readInputValue = (...selectors: string[]) => {
        for (const selector of selectors) {
          const input = document.querySelector<HTMLInputElement>(selector);
          const value = input?.value?.trim();
          if (value) {
            return value;
          }
        }
        return '';
      };
      const addDays = (isoDate: string, days: number) => {
        const date = new Date(`${isoDate}T00:00:00`);
        date.setDate(date.getDate() + days);
        return [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, '0'),
          String(date.getDate()).padStart(2, '0'),
        ].join('-');
      };
      const today = new Date();
      const fallbackFrom = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
      ].join('-');
      const fromDate = readInputValue('#fromDate', 'input[name="fromDate"]') || fallbackFrom;
      const toDate = readInputValue('#toDate', 'input[name="toDate"]') || addDays(fromDate, 1);
      const fromTime = readInputValue('#fromTime', 'input[name="fromTime"]') || '00:00';
      const toTime = readInputValue('#toTime', 'input[name="toTime"]') || '00:00';
      return {
        startTime: `${fromDate} ${fromTime}`,
        endTime: `${toDate} ${toTime}`,
      };
    });
  }

  async readOverviewNetSales(): Promise<number> {
    return step('读取 Report Overview Net Sales', async () => {
      if (await this.isLiveReportSurfaceVisible()) {
        if (this.liveSelectedOrderType) {
          return this.readLegacyLiveOrderTypeNetSalesFromBrowser(this.liveOrderTypeDisplayName(this.liveSelectedOrderType));
        }
        await expect(this.liveOverviewKeyMetrics).toBeVisible({ timeout: 60_000 });
        const keyMetricsText = (await this.liveOverviewKeyMetrics.innerText()).replace(/\r/g, '');
        const netSalesMatch = keyMetricsText.match(/Net Sales\s*\n?\s*([-$,\d.]+)/i);
        if (!netSalesMatch?.[1]) {
          throw new Error(`Cloud Report Overview 未读取到 Net Sales: ${keyMetricsText}`);
        }
        return parseCurrency(netSalesMatch[1]);
      }
      await expect(this.overviewNetSales).toBeVisible();
      return parseCurrency((await this.overviewNetSales.textContent()) ?? '0');
    });
  }

  async readFeeAmount(): Promise<number> {
    return step('读取 Report Fee Amount', async () => {
      if (await this.isLiveReportSurfaceVisible()) {
        await expect(this.liveOverviewKeyMetrics).toBeVisible({ timeout: 60_000 });
        const keyMetricsText = (await this.liveOverviewKeyMetrics.innerText()).replace(/\r/g, '');
        const feeMatch = keyMetricsText.match(/Fee Amount\s*\n?\s*([-$,\d.]+)/i);
        if (!feeMatch?.[1]) {
          throw new Error(`Cloud Report Overview 未读取到 Fee Amount: ${keyMetricsText}`);
        }
        return parseCurrency(feeMatch[1]);
      }
      await expect(this.feeAmount).toBeVisible();
      return parseCurrency((await this.feeAmount.textContent()) ?? '0');
    });
  }

  async readHomepageUnpaid(): Promise<number> {
    return step('读取 Report 首页 Unpaid', async () => {
      if (await this.isLiveReportSurfaceVisible()) {
        await expect(this.liveOverviewKeyMetrics).toBeVisible({ timeout: 60_000 });
        const keyMetricsText = (await this.liveOverviewKeyMetrics.innerText()).replace(/\r/g, '');
        const unpaidMatch = keyMetricsText.match(/Unpaid\s*\n?\s*([-$,\d.]+)/i);
        if (!unpaidMatch?.[1]) {
          throw new Error(`Cloud Report Overview 未读取到 Unpaid: ${keyMetricsText}`);
        }
        return parseCurrency(unpaidMatch[1]);
      }
      await expect(this.homepageUnpaid).toBeVisible();
      return parseCurrency((await this.homepageUnpaid.textContent()) ?? '0');
    });
  }

  private async selectLiveOrderType(orderType: string): Promise<void> {
    if (await this.liveFrame.locator('#overviewReportPage').isVisible().catch(() => false)) {
      this.liveSelectedOrderType = orderType;
      await this.waitForLiveReportLoadingGone();
      return;
    }

    const orderTypeSelectVisible = await this.liveOrderTypeSelect
      .waitFor({ state: 'visible', timeout: 60_000 })
      .then(() => true)
      .catch(() => false);
    if (!orderTypeSelectVisible) {
      this.liveSelectedOrderType = orderType;
      await expect(this.liveOverviewKeyMetrics).toBeVisible({ timeout: 60_000 });
      await this.waitForLiveReportLoadingGone();
      return;
    }
    await this.liveOrderTypeSelect.click();
    if (await this.liveOrderTypeExpand.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await this.liveOrderTypeExpand.click();
    }

    await waitUntil(async () => (await this.liveOrderTypeLabels.count()) > 1, {
      description: 'Cloud Report 订单类型列表加载完成',
      intervalMs: 200,
      timeoutMs: 30_000,
    });

    const labelCount = await this.liveOrderTypeLabels.count();
    for (let index = 1; index < labelCount; index += 1) {
      const label = this.liveOrderTypeLabels.nth(index);
      const text = ((await label.innerText()) ?? '').trim();
      const checkbox = label.locator('input').first();
      const checked = await checkbox.isChecked();
      if (text === orderType && !checked) {
        await checkbox.click();
      }
      if (text !== orderType && checked) {
        await checkbox.click();
      }
    }
    await this.liveOrderTypeSelect.click();
    this.liveSelectedOrderType = orderType;
    await this.waitForLiveReportLoadingGone();
  }

  private liveOrderTypeDisplayName(orderType: string): string {
    return (
      {
        CUSTOM_D: 'Custom D',
      }[orderType] ?? orderType
    );
  }

  private async readLegacyLiveOrderTypeNetSalesFromBrowser(targetOrderType: string): Promise<number> {
    return this.liveFrame.locator('body').evaluate(async (_body, displayOrderType) => {
      const fromDate = document.querySelector<HTMLInputElement>('#fromDate')?.value || new Date().toISOString().slice(0, 10);
      const fromTime = document.querySelector<HTMLInputElement>('#fromTime')?.value || '00:00';
      const toTime = document.querySelector<HTMLInputElement>('#toTime')?.value || '00:00';
      const endDate = new Date(`${fromDate}T00:00:00`);
      endDate.setDate(endDate.getDate() + 1);
      const toDate = [
        endDate.getFullYear(),
        String(endDate.getMonth() + 1).padStart(2, '0'),
        String(endDate.getDate()).padStart(2, '0'),
      ].join('-');
      const response = await fetch('/kpos/webapp/report/overview', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          from: `${fromDate}T${fromTime}`,
          to: `${toDate}T${toTime}`,
          merchantIds: '',
          combineReport: false,
          operationHour: 0,
        }),
      });
      if (!response.ok) {
        throw new Error(`Legacy live overview request failed: ${response.status}`);
      }
      const overview = (await response.json()) as {
        orderTypeSummaryList?: Array<{ orderType?: string; total?: number }>;
      };
      const target = overview.orderTypeSummaryList?.find((row) => row.orderType === displayOrderType);
      return Number(target?.total ?? 0);
    }, targetOrderType);
  }

  private async clickVisibleNumpadDigit(digit: string): Promise<void> {
    const valueBeforeClick = await this.readVisiblePasswordValue();
    await this.page.evaluate((targetDigit) => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const heading = Array.from(document.querySelectorAll<HTMLElement>('div, span, h1, h2, h3'))
        .filter(visible)
        .find((element) => element.textContent?.trim() === 'Enter Your Passcode');
      const scope =
        heading &&
        findAncestor(heading, (element) => {
          const text = element.textContent?.replace(/\s+/g, ' ') ?? '';
          return /Enter Your Passcode/.test(text) && /1/.test(text) && /2/.test(text) && /3/.test(text) && /0/.test(text);
        });
      const visibleElements = Array.from((scope ?? document).querySelectorAll<HTMLElement>('[data-num], button, td, div, span'))
        .filter(visible)
        .sort((left, right) => {
          const leftRect = left.getBoundingClientRect();
          const rightRect = right.getBoundingClientRect();
          return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
        });
      const keyButton = visibleElements.find(
        (element) => element.dataset.num === targetDigit || element.textContent?.trim() === targetDigit,
      );
      const clickTarget = keyButton?.closest<HTMLElement>('[data-num], button, td') ?? keyButton?.parentElement ?? keyButton;
      clickTarget?.click();

      function findAncestor(element: HTMLElement, predicate: (candidate: HTMLElement) => boolean): HTMLElement | null {
        let current: HTMLElement | null = element;
        while (current) {
          if (predicate(current)) {
            return current;
          }
          current = current.parentElement;
        }
        return null;
      }
    }, digit);
    const changed = await waitUntil(
      async () => (await this.readVisiblePasswordValue()).length > valueBeforeClick.length,
      {
        description: `报表密码数字 ${digit} 输入完成`,
        intervalMs: 25,
        timeoutMs: 500,
      },
    )
      .then(() => true)
      .catch(() => false);
    if (changed) {
      return;
    }

    await this.page.evaluate((targetDigit) => {
      const input = document.querySelector<HTMLInputElement>('#pwipt');
      if (!input) {
        return;
      }
      input.value = `${input.value}${targetDigit}`;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      const onPasswordInput = (window as typeof window & { onpwipt?: () => void }).onpwipt;
      onPasswordInput?.();
    }, digit);
    await waitUntil(
      async () => (await this.readVisiblePasswordValue()).length > valueBeforeClick.length,
      {
        description: `报表密码数字 ${digit} fallback 输入完成`,
        intervalMs: 25,
        timeoutMs: 1_000,
      },
    );
  }

  private async inputLivePopupPassword(password: string): Promise<void> {
    await expect(this.livePopupPasswordKey('bc')).toBeVisible({ timeout: 10_000 });
    for (const digit of password) {
      await this.clickLivePopupPasswordKey(digit);
    }
  }

  private async clickLivePopupPasswordKey(key: string): Promise<void> {
    const keyButton = this.livePopupPasswordKey(key);
    await expect(keyButton).toBeVisible({ timeout: 5_000 });
    await keyButton.click({ force: true }).catch(async () => {
      await keyButton.evaluate((element) => {
        const target = element as HTMLElement;
        target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        target.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        target.click();
      });
    });
  }

  private livePopupPasswordKey(key: string): Locator {
    return this.page
      .locator(
        `xpath=(//*[contains(concat(" ", normalize-space(@class), " "), " pwd-input-list ")]//div[@data-num="${key}"])[last()]`,
      )
      .first();
  }

  private async readVisiblePasswordValue(): Promise<string> {
    return this.page.evaluate(() => {
      const visible = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
      };
      const pinInput = document.querySelector<HTMLInputElement>('#pwipt');
      if (pinInput && visible(pinInput)) {
        return pinInput.value;
      }
      const visibleInput = Array.from(document.querySelectorAll<HTMLInputElement>('input')).find(
        (input) => visible(input) && !['checkbox', 'radio', 'hidden'].includes(input.type),
      );
      const activeInput = document.activeElement instanceof HTMLInputElement ? document.activeElement : null;
      return visibleInput?.value ?? activeInput?.value ?? '';
    });
  }

  private async clickPasswordSubmitButton(): Promise<boolean> {
    const visibleSubmitButton = this.page.locator('#pwd-input-submit:visible, #ds:visible, [data-num="dsfl"]:visible, [data-num="ds"]:visible').last();
    if (await visibleSubmitButton.isVisible({ timeout: 1_000 }).catch(() => false)) {
      const clicked = await visibleSubmitButton.click({ timeout: 1_000 })
        .then(() => true)
        .catch(() => false);
      if (clicked) {
        return true;
      }
    }
    return this.page
      .evaluate(() => {
        const visibleElements = Array.from(document.querySelectorAll<HTMLElement>('#ds, [data-num], td, div, span'))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
          })
          .sort((left, right) => {
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            return leftRect.width * leftRect.height - rightRect.width * rightRect.height;
          });
        const submitButton = visibleElements.find(
          (element) => element.id === 'ds' || element.dataset.num === 'ds' || element.textContent?.trim() === 'task_alt',
        );
        const clickTarget = submitButton?.closest<HTMLElement>('[data-num], button, td, .mpwbt') ?? submitButton;
        if (!clickTarget) {
          return false;
        }
        clickTarget.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, view: window }));
        clickTarget.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
        clickTarget.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, view: window }));
        clickTarget.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
        clickTarget.click();
        return true;
      })
      .catch(() => false);
  }

  private async waitForLiveReportLoadingGone(frame?: Frame): Promise<void> {
    const loading = (frame ?? this.liveFrame).locator('.ant-spin-spinning, [class*="loading"], [class*="Loading"]');
    await waitUntil(async () => !(await loading.first().isVisible().catch(() => false)), {
      description: 'Cloud Report 加载完成',
      intervalMs: 500,
      timeoutMs: 60_000,
    }).catch(() => undefined);
  }
}
