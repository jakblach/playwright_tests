import { test, expect } from '@playwright/test';
import { LoginUserPage } from '../../../pages/LoginPage';
import { ErrorMessage } from '../../../pages/ErrorMessages';
import { FieldValidation } from '../../../pages/FieldValidator';

test.describe('Login Failed - negative scenarios', () => {
  
  let loginPage: LoginUserPage;
  let errorMessage: ErrorMessage;
  let fieldValidatior: FieldValidation;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginUserPage(page);
    errorMessage = new ErrorMessage(page);
    fieldValidatior = new FieldValidation(page);

    await loginPage.goToLoginPage(); 
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
    await fieldValidatior.expectHelperErrorForField('username', 'Username is required');
  });  

});
