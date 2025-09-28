// import { test, expect } from '@playwright/test';
import { LoginPage } from '../resources/loginPage';
import { log } from 'console';
import { WelcomePage } from '../resources/welcomPage';
import { BankAccountCreatePage } from '../resources/createAccount';
import { TransactionPage } from '../resources/tansactionPage';
import { test, expect } from '../fixtures/auth-fixture';



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
    await loginPage.fillUsername('test002');
    await loginPage.fillPassword('s3cret1');
    await loginPage.fillConfirmPassword('s3cret1');
    await loginPage.SignIn();
    
});

// test('log in as new user and create bank account', async ({loggedInPage}) => {
//   const loginPage = new LoginPage(loggedInPage);
//   const testWelcome = new WelcomePage(loggedInPage);
//   const testBank = new BankAccountCreatePage(loggedInPage);
//   // await loginPage.LoginPage();
//   // await loginPage.logOn('test4444', 's3cret1');
//   await testWelcome.waitForOpen();
//   await testWelcome.clickNextButtonOnWelcomePage();
//   await testBank.setBankName('JAKUBON SIGMOZA');
//   await testBank.setRoutingNumber('123456789');
//   await testBank.setAccountNumber('123456789');
//   await testBank.clickButtonSave();
//   await testWelcome.clickDoneButtonOnWelcomePage();

// });

// test('log in and check if transaction list is visible', async ({page}) => {
//   const loginPage = new LoginPage(page);
//   const transaction = new TransactionPage(page);

//   await loginPage.LoginPage();
//   await loginPage.logOn('test4444', 's3cret1');
//   await transaction.expectTransactionListVisible();

// });