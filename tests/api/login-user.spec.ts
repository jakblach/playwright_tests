import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-helper'; 

test.describe('API Login', () => {
  test('should log in successfully with valid credentials', async ({ request }) => {
    const api = new ApiClient(request);

    const { response, user } = await api.loginUser({
      username: 'Dina20',
      password: 's3cret',
    });

    expect(response.status()).toBe(200);
    expect(user.username).toBe('Dina20');
  });

  test('should reject login with invalid password', async ({ request }) => {
    const api = new ApiClient(request);

    const { response } = await api.loginUser({
        username: 'Dina20',
        password: 'wrongpassword',
    });

  expect(response.status()).toBe(401);
  });
});
