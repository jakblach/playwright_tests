import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../resources/loginPage';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await page.goto('http://localhost:3000');
    await loginPage.logOn('test001', 's3cret1');

    await use(page);

    await page.locator('span:has-text("Logout")').click();
    
  },
});

export { expect };
