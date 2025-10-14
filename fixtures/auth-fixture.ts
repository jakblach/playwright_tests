import { test as base, expect, Page } from '@playwright/test';
import { LoginUserPage } from '../pages/LoginPage';

type MyFixtures = {
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginUserPage(page);

    await loginPage.goToLoginPage();
    await loginPage.fillCredentials('Dina20', 's3cret');
    await loginPage.clickSignIn();

    await use(page);
    
  },
});

export { expect };
