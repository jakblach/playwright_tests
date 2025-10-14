import { test } from '../../fixtures/newUser';
import { LoginUserPage } from '../../pages/LoginPage';
import { WelcomePage } from '../../pages/WelcomePage';
import { BankAccountCreatePage } from '../../pages/BankAccountPage';
import { FieldValidation } from '../../pages/FieldValidator';

test.describe('[@bankaccount] [@validation] Bank account creation - negative validation scenarios (new user)', () => {
  let loginPage: LoginUserPage;
  let welcomePage: WelcomePage;
  let bankAccountPage: BankAccountCreatePage;
  let validation: FieldValidation;

  test.beforeEach(async ({ page, username, password }) => {
    loginPage = new LoginUserPage(page);
    welcomePage = new WelcomePage(page);
    bankAccountPage = new BankAccountCreatePage(page);
    validation = new FieldValidation(page);

    await loginPage.fillCredentials(username, password);
    await loginPage.clickSignIn();
    await welcomePage.clickNext();
    await bankAccountPage.expectModalHeader();
  });

    test('It should show error when Bank Name is empty', async () => {
        await bankAccountPage.fillBankAccountForm('', '123456789', '987654321');
        await validation.expectHelperErrorForField('bankname', 'Enter a bank name');
    });

    test('It should show error when Bank Name is shorter than 5 characters', async () => {
        await bankAccountPage.fillBankAccountForm('abc', '123456789', '987654321');
        await validation.expectHelperErrorForField('bankname', 'Must contain at least 5 characters');
    });

    test('It should show error when Routing Number is shorter than 9 digits', async () => {
        await bankAccountPage.fillBankAccountForm('Valid Bank', '12345', '987654321');
        await validation.expectHelperErrorForField('routingnumber', 'Must contain a valid routing number');
    });

    test('It should show error when Account Number is too short', async () => {
        await bankAccountPage.fillBankAccountForm('Valid Bank', '123456789', '12');
        await validation.expectHelperErrorForField('accountnumber', 'Must contain at least 9 digits');
    });
});
