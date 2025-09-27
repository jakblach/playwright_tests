import { Page, Locator, expect } from '@playwright/test';

export class UsersPage {
  constructor(private readonly page: Page) {}

  ////ul/li[1]- select user by row

  async expectUserVisibleByPhone(phone: string) {
    const user = this.page.locator('[data-test^="user-list-item"]', { hasText: phone });
    await expect(user).toBeVisible();

  }

  async selectContactForTransaction(contact: string){
    const contactLocator = this.page.locator(`//ul/li/div[span[contains(text(), '${contact}')]]`);
    await expect(contactLocator).toBeVisible();
    await contactLocator.click();

  };

};
