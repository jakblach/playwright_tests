import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../../../pages/LoginPage';
import { WelcomePage } from '../../../pages/WelcomePage';

test.describe("Login succeeds", () => {
  test("It should be possible to log in with valid credentials", async ({ page }) => {
    const loginPage = new LoginUserPage(page);
    const mainPage = new WelcomePage(page);

    await loginPage.goToLoginPage();
    await loginPage.fillCredentials(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);
    await loginPage.clickSignIn();
    
    await mainPage.expectAppLogoVisible();
  })

});