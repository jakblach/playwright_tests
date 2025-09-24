import { test, expect } from '@playwright/test';
import { LoginPage } from '../resources/loginPage';
import { log } from 'console';
import { WelcomPage } from '../resources/welcomPage';
import { BankAccountCreatePage } from '../resources/createAccount';



// test('open login page and fill in data', async ({ page }) => {

//   const loginPage = new LoginPage(page);
//   await loginPage.LoginPage();
//   await loginPage.logOn('test_user123', 's3cret');

// });

// test('invalid login shows error', async ({ page }) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.LoginPage();
//     await loginPage.logOn('wrong_user', 'bad_password');
//     await loginPage.expectInvalidCredentialsError();

// });

test('creating new user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginPage();
    await loginPage.createNewAccount();
    await loginPage.fillFirstName('JAKUBON123');
    await loginPage.fillLastName('SZEFU');
    await loginPage.fillUsername('test008');
    await loginPage.fillPassword('s3cret1');
    await loginPage.fillConfirmPassword('s3cret1');
    await loginPage.SignIn();
    
});

test('log in as new user and create bank account', async ({page}) => {
  const loginPage = new LoginPage(page);
  const testWelcome = new WelcomPage(page);
  const testBank = new BankAccountCreatePage(page);
  await loginPage.LoginPage();
  await loginPage.logOn('test008', 's3cret1');
  await testWelcome.waitForOpen();
  await testWelcome.clickNextButtonOnWelocmPage();
  await testBank.setBankName('JAKUBON SIGMOZA');
  await testBank.setRoutingNumber('123456789');
  await testBank.setAccountNumber('123456789');
  await testBank.clickButtonSave();
  await testWelcome.clickDoneButtonOnWelcomePage();

});
