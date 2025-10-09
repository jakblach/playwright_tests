import { test, expect } from '../../fixtures/auth-fixture.ts';
import { BankAccountCreatePage } from '../../resources/BankAccountPage.ts';
import { LeftMenu } from '../../resources/LeftMenu.ts';

test('User should be able remove new created bank account', async ({ loggedInPage }) => {
    const bankAccountPage = new BankAccountCreatePage(loggedInPage);
    const leftMenuPage = new LeftMenu(loggedInPage)
    const accountName = `TestAcc-${Date.now()}`;

    await leftMenuPage.getAccountBalanceValue();
    await leftMenuPage.goBankAccountsPage();
    await bankAccountPage.createNewBankAccount();
    await bankAccountPage.createBankAccount(accountName, '123456789', '987654321');
    await bankAccountPage.deleteBankAccount(accountName);

});