import { test, expect } from '../fixtures/auth-fixture';
import { TransactionPage } from '../resources/tansactionPage';
import { UsersPage } from '../resources/userPage';

test('user sees transactions after login', async ({ loggedInPage }) => {
  const transactionPage = new TransactionPage(loggedInPage);
  const user = new UsersPage(loggedInPage);
  await transactionPage.expectTransactionListVisible();
  await transactionPage.goToFriendsSubtab();
  await transactionPage.creatTansaction();
  await transactionPage.searchForContct('398-225-9900');
  await user.expectUserVisibleByPhone('398-225-9900');

});
