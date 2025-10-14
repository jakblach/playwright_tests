import { test, expect } from '../../fixtures/auth-fixture.ts';
import { Payment } from '../../pages/Payment';
import { MainPage } from '../../pages/MainPage';
import { UsersPage } from '../../pages/UserPage.ts';

test.describe('Request Transaction', () => {

    test('User creates a Request transaction', async ({ loggedInPage }) => {
        const tansactionPage = new Payment(loggedInPage);
        const userPage = new UsersPage(loggedInPage);
        const mainPage = new MainPage(loggedInPage);
        await mainPage.createNewPayment();
        await userPage.selectContactForTransaction('Ted Parisian');
        await tansactionPage.fillAmount(2137);
        await tansactionPage.addNote('1. TEST TRANSACTION WORKFLOW!!!');
        await tansactionPage.clickRequest();
        await tansactionPage.expectSuccessMessage(2137, '1. TEST TRANSACTION WORKFLOW!!!', 'Request');
    });

});