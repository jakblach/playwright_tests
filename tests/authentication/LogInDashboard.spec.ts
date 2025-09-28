import { test, expect } from '@playwright/test';

test.describe('Authentication and Session Management', () => {
  test('Unauthenticated user is redirected to Sign In', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/signin/i);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  })
  
});
