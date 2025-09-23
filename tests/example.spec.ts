import { test, expect } from '@playwright/test';
import { LoginPage } from '../resources/loginPage';
import { log } from 'console';



test('open login page and fill in data', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.LoginPage();
  await loginPage.logOn('test_user123', 's3cret');

});

test('invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginPage();
    await loginPage.logOn('wrong_user', 'bad_password');
    await loginPage.expectInvalidCredentialsError();

});

test('creating new user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginPage();
    await loginPage.createNewAccount();
    await loginPage.fillFirstName('JAKUBON123');
    await loginPage.fillLastName('SZEFU');
    await loginPage.fillUsername('jakub_szefik333');
    await loginPage.fillPassword('s3cret');
    await loginPage.fillConfirmPassword('s3cret');
    await loginPage.SignIn();
    
});