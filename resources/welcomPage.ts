import { Page, Locator, expect } from '@playwright/test';

export class WelcomePage {
    private readonly header: Locator;
    private readonly nextButton: Locator;
    private readonly doneButton: Locator;
    private readonly appLogo: Locator;

    constructor(private readonly page: Page) {
        this.header = page.locator('h2');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.appLogo = page.getByTestId('app-name-logo');
    }

    async isLoaded() {
        await expect(this.appLogo).toBeVisible();
    }

    async expectWelcomeHeader() {
        await expect(this.header).toHaveText('Get Started with Real World App');
    }
    
};
