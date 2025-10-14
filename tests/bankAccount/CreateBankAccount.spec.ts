import { test, expect } from '../../fixtures/newUser';
import { LoginUserPage } from '../../pages/LoginPage';
import { WelcomePage } from '../../pages/WelcomePage';
import { BankAccountCreatePage } from '../../pages/BankAccountPage';
import { FinishedPage } from '../../pages/ModalFinishedPage';   
import { LeftMenu } from '../../pages/LeftMenu';

test('@bank @critical User can create a bank account after registration', 
    async ({ page, username, password }) => {
        const loginPage = new LoginUserPage(page);
        const welcomePage = new WelcomePage(page);
        const bankAccountPage = new BankAccountCreatePage(page);
        const finishPage = new FinishedPage(page);
        const leftMenu = new LeftMenu(page);

        await loginPage.fillCredentials(username, password);
        await loginPage.clickSignIn();

        
        await welcomePage.clickNext();
        await bankAccountPage.createBankAccount('TestBank', 123456789, 987654321);

        
        await finishPage.clickDone();
        await welcomePage.expectAppLogoVisible();
    
});