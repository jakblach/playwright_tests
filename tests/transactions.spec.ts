import { test, expect } from '../fixtures/auth-fixture';
import { LoginPage } from '../resources/loginPage';
import { Payment } from '../resources/Payment';
import { TransactionPage } from '../resources/tansactionPage';
import { UsersPage } from '../resources/userPage';

// test('user sees transactions after login', async ({ loggedInPage }) => {
//   const transactionPage = new TransactionPage(loggedInPage);
//   const user = new UsersPage(loggedInPage);
//   const makeTransaction = new Payment (loggedInPage);
//   await transactionPage.expectTransactionListVisible();
//   await transactionPage.goToFriendsSubtab();
//   await transactionPage.creatTansaction();
//   await transactionPage.searchForContct('398-225-9900');
//   await user.expectUserVisibleByPhone('398-225-9900');
//   await user.selectContactForTransaction('Ted Parisian');
//   await makeTransaction.fillAmount(2137);
//   await makeTransaction.addNote('1. TEST TRANSACTION WORKFLOW!!!');
//   await makeTransaction.clickRequest();
//   await makeTransaction.expectSuccessMessage(2137, '1. TEST TRANSACTION WORKFLOW!!!');



// });

test('should login with correct credentials', async ({ request }) => {
    const response = await request.post('http://localhost:3001/login', {
      data: {
        type: "LOGIN",
        username: "test001",
        password: "s3cret1"
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('user');
    expect(body.user).toHaveProperty('id');
    expect(body.user).toHaveProperty('uuid');
    expect(body.user.username).toBe('test001');
  });