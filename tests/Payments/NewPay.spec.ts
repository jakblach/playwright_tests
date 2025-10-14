import { test, expect } from '../../fixtures/auth-fixture.ts';
import { UsersPage } from '../../pages/UserPage';
import { Payment } from '../../pages/Payment';
import { MainPage } from '../../pages/MainPage.ts';
import { LoginUserPage } from '../../pages/LoginPage.ts';
import { NotificationsPage } from '../../pages/NotifiactionsPage.ts';
import { WelcomePage } from '../../pages/WelcomePage.ts';
import { LeftMenu } from '../../pages/LeftMenu.ts';

test.describe('Pay Transaction', () => {

    test('User creates a Pay transaction', async ({ browser, loggedInPage }) => {

        const tansactionPage = new Payment(loggedInPage);
        const userPage = new UsersPage(loggedInPage);
        const testPage = new MainPage(loggedInPage);
        await testPage.createNewPayment();
        await userPage.selectContactForTransaction('Ted Parisian');
        await tansactionPage.fillAmount(2137);
        await tansactionPage.addNote('1. TEST TRANSACTION WORKFLOW!!!');
        await tansactionPage.clickPay();
        await tansactionPage.expectSuccessMessage(2137, '1. TEST TRANSACTION WORKFLOW!!!', 'Pay');


        const receiverContext = await browser.newContext();
        const receiverPage = await receiverContext.newPage();

        const loginPage = new LoginUserPage(receiverPage);
        const notificationPage = new NotificationsPage(receiverPage);
        const mainPage = new WelcomePage(receiverPage);
        await loginPage.goToLoginPage();
        await loginPage.fillCredentials('Dina20', 's3cret');
        await loginPage.clickSignIn();
        await mainPage.expectAppLogoVisible();

        await notificationPage.goToNotificationsPage();
        await notificationPage.assertUserReceivedPayment('Darrel Ortiz');

        
    });

    test('The user balance decreases after a Pay transaction is executed', async ({ loggedInPage }) => {
        const leftMenu = new LeftMenu(loggedInPage);
        const transactionPage = new Payment(loggedInPage);
        const userPage = new UsersPage(loggedInPage);
        const mainPage = new MainPage(loggedInPage);
        const balanceBefore = await leftMenu.getAccountBalanceValue();
    
        await transactionPage.createTransaction('Ted Parisian', 678, 'Saldo update test', 'Pay', mainPage, userPage)
        const balanceAfter = await leftMenu.getAccountBalanceValue();
        expect(balanceBefore - balanceAfter).toBeCloseTo(678, 2);

    });


});