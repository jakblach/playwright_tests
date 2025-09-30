import { Page, expect, Locator } from '@playwright/test';

export class ErrorMessage {
  private readonly errorField: Locator;

  constructor(private page: Page) {
    this.errorField = page.getByRole('alert'); 
  }

  async expectErrorMessage(expectedText: string) {
    await expect(this.errorField).toHaveText(expectedText);
  }

};
