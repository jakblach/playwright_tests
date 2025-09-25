import { Page, Locator, expect } from '@playwright/test';

export class UsersPage {
  constructor(private readonly page: Page) {}

  async expectUserVisibleByPhone(phone: string) {
    const user = this.page.locator('[data-test^="user-list-item"]', { hasText: phone });
    await expect(user).toBeVisible();
  }
}
