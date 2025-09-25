import { Page, Locator, expect } from '@playwright/test';

export class WelcomePage {
    private readonly root: Locator;
    private readonly nextButton: Locator;
    private readonly doneButton: Locator;

    constructor(private readonly page: Page) {
        this.root = page.locator('[data-test="user-onboarding-dialog-title"]');
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.doneButton = page.getByRole('button', { name: 'Done' });
    }

    // Make a screenshot after each action
    private async takeScreenshot(step: string) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({ path: `screenshot-${step}-${timestamp}.png` });
    }

    // Ensure the onboarding dialog is visible
    async waitForOpen() {
        try {
            console.log('Waiting for the onboarding dialog...');
            await expect(this.root).toBeVisible({ timeout: 10000 });
            await this.takeScreenshot('onboarding-dialog-visible');
        } catch (error) {
            console.warn('Onboarding dialog not present — skipping wait');
            await this.takeScreenshot('onboarding-dialog-not-present');
        }
    }

    // Wait for the 'Next' button to be clickable and then click it
    async clickNextButtonOnWelcomePage() {
        console.log('Checking visibility of the onboarding dialog...');
        await this.waitForOpen();

        // Ensure the Next button is visible and enabled
        console.log('Ensuring Next button is visible and enabled...');
        await expect(this.nextButton).toBeVisible({ timeout: 5000 });
        await expect(this.nextButton).toBeEnabled({ timeout: 5000 });

        await this.takeScreenshot('next-button-ready');
        
        // Attempt to click the button
        console.log('Clicking the Next button...');
        await this.nextButton.click({ timeout: 10000 });

        await this.takeScreenshot('next-button-clicked');
    }

    async clickDoneButtonOnWelcomePage() {
        console.log('Ensuring Done button is visible...');
        await expect(this.doneButton).toBeVisible({ timeout: 5000 });
        await this.doneButton.click();
        await this.takeScreenshot('done-button-clicked');
    }
}
