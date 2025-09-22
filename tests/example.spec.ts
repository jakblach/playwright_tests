import { test, expect } from '@playwright/test';
import { LoginPage } from '../resources/loginPage';



test('open login page and fill in data', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.logOn('test_user', 's3cret');

});


