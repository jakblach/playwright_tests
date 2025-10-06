import { test, expect } from '../../fixtures/auth-fixture.ts';
import { UsersPage } from '../../resources/userPage.ts';
import { Payment } from '../../resources/Payment';
import { MainPage } from '../../resources/MainPage.ts';
import { LoginUserPage } from '../../resources/loginPage.ts';
import { NotificationsPage } from '../../resources/NotifiactionsPage.ts';
import { waitForDebugger } from 'inspector';
import { WelcomePage } from '../../resources/welcomPage.ts';

test.describe('Pay Transaction', () => {

    test('User creates a Pay transaction', async ({ browser, loggedInPage }) => {

        // const tansactionPage = new Payment(loggedInPage);
        // const userPage = new UsersPage(loggedInPage);
        // const mainPage = new MainPage(loggedInPage);
        // await mainPage.createNewPayment();
        // await userPage.selectContactForTransaction('Darrel Ortiz');
        // await tansactionPage.fillAmount(2137);
        // await tansactionPage.addNote('1. TEST TRANSACTION WORKFLOW!!!');
        // await tansactionPage.clickPay();
        // await tansactionPage.expectSuccessMessage(2137, '1. TEST TRANSACTION WORKFLOW!!!', 'Pay');


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
        // await notificationPage.expectFirstNotificationToBePaymentFrom('tEST');

        
    });

});