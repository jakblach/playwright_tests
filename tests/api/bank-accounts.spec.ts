import { test, expect, request } from '@playwright/test';
import { ApiClient } from '../../helpers/api-helper';
import { APIRequestContext } from '@playwright/test';


test.describe('Bank Accounts API', () => {
  let apiClient: ApiClient;
  let userId: string;
  let apiRequestContext: APIRequestContext;
  test.beforeAll(async () => {
    apiRequestContext = await request.newContext();
    apiClient = new ApiClient(apiRequestContext);
    const { user } = await apiClient.loginUser({ username: 'Dina20', password: 's3cret' });
    userId = user.id;
  });

  test.afterAll(async () => {
    await apiRequestContext.dispose();
  });

  test('Gets a list of bank accounts for user', async () => {
    const { bankAccounts, response } = await apiClient.getBankAccounts();
    expect(response.status()).toBe(200);
    expect(bankAccounts.some(acc => acc.userId === userId)).toBeTruthy();
  });

  test('Creates a new bank account', async () => {
    const bankName = 'Test Bank';
    const accountNumber = '1234567890';
    const routingNumber = '987654321';

    const { response, account } = await apiClient.createBankAccount({
      bankName,
      accountNumber,
      routingNumber,
    });

    expect(response.status()).toBe(200);
    expect(typeof account.id).toBe('string');
    expect(account.userId).toBe(userId);
    console.log('Created bank account:', account);
  });

  test('Deletes a bank account', async () => {
    // First, create a bank account to delete
    const { account } = await apiClient.createBankAccount({
      bankName: 'Delete Bank',
      accountNumber: '000111222',
      routingNumber: '333444555',
    });
    const bankAccountId = account.id;

    // Delete the created bank account
    const { response } = await apiClient.deleteBankAccount(bankAccountId);
    expect(response.status()).toBe(200);
  });
});