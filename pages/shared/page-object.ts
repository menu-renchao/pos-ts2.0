import type { Page } from '@playwright/test';

export abstract class PageObject {
  protected constructor(protected readonly page: Page) {}
}
