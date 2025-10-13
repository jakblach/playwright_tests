import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-helper';

test.describe('API Registration', () => {
  test('should register a new user successfully', async ({ request }) => {
    const api = new ApiClient(request);

    const randomId = Date.now();
    const newUser = {
      firstName: 'test',
      lastName: 'userson',
      username: `test_user_${randomId}`,
      password: 's3cret',
      confirmPassword: 's3cret',
    };

    const { response, user } = await api.registerUser(newUser);

    expect(response.status()).toBe(201);
    expect(user).toHaveProperty('id');
    expect(user.username).toBe(newUser.username);
    expect(user.balance).toBe(0);
    expect(typeof user.id).toBe('string');
    expect(user.createdAt).toBeTruthy();
  });

  test('@bug @critical backend currently allows mismatched passwords', async ({ request }) => {
    const api = new ApiClient(request);

    const invalidUser = {
      firstName: 'Mismatch',
      lastName: 'Example',
      username: `user_${Date.now()}`,
      password: 'abc123',
      confirmPassword: 'xyz987',
    };

    const { response, user } = await api.registerUser(invalidUser);

    // console.log('Response when passwords differ:', user);

    // TODO: BUG - TO BE REPORTED 
    expect(response.status()).toBe(201);
  });
});
