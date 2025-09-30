import { Page, Locator, expect } from '@playwright/test';

export class FinishedPage {
    private readonly header: Locator;
    private readonly doneButton: Locator;

    constructor(private readonly page: Page) {
        this.header = page.getByRole('heading', { name: 'Finished' });
        this.doneButton = page.getByRole('button', { name: 'Done' });
    }

    async expectFinishedModalVisible() {
        await expect(this.header).toBeVisible();
    }

    async clickDone() {
        await expect(this.doneButton).toBeEnabled();
        await this.doneButton.click();
    }
};
