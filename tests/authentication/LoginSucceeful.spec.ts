import { test, expect } from '@playwright/test';
import { LoginPage } from '../../resources/loginPage';
import { WelcomePage } from '../../resources/welcomPage';

test.describe("Login succeeds", () => {
  test("It should be possible to log in with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const mainPage = new WelcomePage(page);

    await loginPage.goTo();
    await loginPage.fillCredentials(process.env.LOGIN_USER!, process.env.LOGIN_PASS!);
    await loginPage.clickSignIn();
    
    await mainPage.isLoaded();
  })

});