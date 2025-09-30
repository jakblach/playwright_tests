import { test } from '@playwright/test';
import { RegisterPage } from '../../../resources/RegisterPage';
import { LoginUserPage } from '../../../resources/loginPage';
import { WelcomePage } from '../../../resources/welcomPage';

test('[@user] [@signup] [@critical] User can register and log in with a new account', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginUserPage(page);
    const welcomePage = new WelcomePage(page);

    const uniqueUser = `user_${Date.now()}`;
    const password = 's3cret1';

    //USER REGISTRATION
    await registerPage.goToSignupPage();
    await registerPage.registerUser('TEST', 'USER', uniqueUser, password);

    //LOGIN WITH A NEWLY REGISTERED USER
    await loginPage.fillCredentials(uniqueUser, password);
    await loginPage.clickSignIn();
    await welcomePage.expectWelcomeHeader();

});