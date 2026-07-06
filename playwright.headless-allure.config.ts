import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: process.env.ALLURE_RESULTS_DIR ?? 'allure-results' }],
  ],
  use: {
    ...baseConfig.use,
    headless: true,
  },
});
