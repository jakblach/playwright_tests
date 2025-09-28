import { test, expect } from '@playwright/test';
import { LoginPage } from '../../resources/loginPage';
import { ErrorMessage } from '../../resources/ErrorMessages';

test.describe('Login Failed - negative scenarios', () => {
  
  let loginPage: LoginPage;
  let errorMessage: ErrorMessage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    errorMessage = new ErrorMessage(page);

    await loginPage.goTo(); 
  });
  
  test('It should not log in with invalid password', async () => {
    await loginPage.fillCredentials(process.env.LOGIN_USER!, 'wrongPassword');
    await loginPage.clickSignIn();

    await errorMessage.expectErrorMessage('Username or password is invalid');
  });

  test('It should not log in with invalid username', async () => {
    await loginPage.fillCredentials('wrongUsername', process.env.LOGIN_PASS!);
    await loginPage.clickSignIn();

    await errorMessage.expectErrorMessage('Username or password is invalid');
  });

  test('Field validation should be displayed when Sign In is pressed and the fields are empty', async () => {
    await loginPage.clickSignIn();
    await errorMessage.expectUsernameRequiredError();
  });  

});
