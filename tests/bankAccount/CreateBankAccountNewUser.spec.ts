import { test, expect } from '../../fixtures/newUser';
import { LoginUserPage } from '../../resources/loginPage';
import { WelcomePage } from '../../resources/welcomPage';
import { BankAccountCreatePage } from '../../resources/BankAccountPage';
import { FinishedPage } from '../../resources/ModalFinishedPage';

test('[@bankaccount] [@critical] User can create a bank account after registration', 
    async ({ page, username, password }) => {
        const loginPage = new LoginUserPage(page);
        const welcomePage = new WelcomePage(page);
        const bankAccountPage = new BankAccountCreatePage(page);
        const finishPage = new FinishedPage(page);

        await loginPage.fillCredentials(username, password);
        await loginPage.clickSignIn();

        
        await welcomePage.clickNext();
        await bankAccountPage.createBankAccount('TestBank', 123456789, 987654321);

        
        await finishPage.clickDone();
        await welcomePage.expectAppLogoVisible();
});
