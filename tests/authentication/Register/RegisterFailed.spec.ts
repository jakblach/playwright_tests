yyimport { test } from '@playwright/test';
import { RegisterPage } from '../../../resources/RegisterPage';
import { ErrorMessage } from '../../../resources/ErrorMessages';
import { FieldValidation } from '../../../resources/FieldValidator';

test.describe('User registration validation', () => {
  let registerPage: RegisterPage;
  let fieldValidation: FieldValidation;
  const uniqueUser = () => `user_${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    fieldValidation = new FieldValidation(page);
    await registerPage.goToSignupPage();

  });

  test('Should show error when username is empty', async () => {
    await registerPage.fillForm('Test', 'User', '', 's3cret1');
    await fieldValidation.expectHelperErrorForField('username', 'Username is required');
    await registerPage.expectSignUpDisabled();

  });

  test('Should show error when password is too short', async () => {
    await registerPage.fillForm('Test', 'Test', uniqueUser(), '123');
    await fieldValidation.expectHelperErrorForField('password', 'Password must contain at least 4 characters');
    await registerPage.expectSignUpDisabled();

  });

  test('Should show error when passwords do not match', async () => {
    await registerPage.fillForm('Test', 'User', uniqueUser(), 's3cret1', 'different');
    await fieldValidation.expectHelperErrorForField('confirmpassword', 'Password does not match');
    await registerPage.expectSignUpDisabled();
    
  });

  test('Should show error when first name is empty', async () => {
    await registerPage.fillForm('', 'User', uniqueUser(), 's3cret1');
    await fieldValidation.expectHelperErrorForField('firstname', 'First Name is required');
    await registerPage.expectSignUpDisabled();


  });

  test('Should show error when last name is empty', async () => {
    await registerPage.fillForm('Test', '', uniqueUser(), 's3cret1');
    await fieldValidation.expectHelperErrorForField('lastname', 'Last Name is required');
    await registerPage.expectSignUpDisabled();

  });

});