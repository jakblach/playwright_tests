import { test, expect } from '../../fixtures/auth-fixture.ts';
import { UsersPage } from '../../resources/userPage.ts';
import { Payment } from '../../resources/Payment';
import { MainPage } from '../../resources/MainPage.ts';

test.describe('Request Transaction', () => {

    test('User creates a Request transaction', async ({ loggedInPage }) => {
        const tansactionPage = new Payment(loggedInPage);
        const userPage = new UsersPage(loggedInPage);
        const mainPage = new MainPage(loggedInPage);
        await mainPage.createNewPayment();
        await userPage.selectContactForTransaction('Darrel Ortiz');
        await tansactionPage.fillAmount(2137);
        await tansactionPage.addNote('1. TEST TRANSACTION WORKFLOW!!!');
        await tansactionPage.clickRequest();
        await tansactionPage.expectSuccessMessage(2137, '1. TEST TRANSACTION WORKFLOW!!!', 'Request');
    });

});