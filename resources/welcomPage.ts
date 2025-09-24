import { Page, Locator, expect } from '@playwright/test';

export class WelcomPage{

    private readonly root: Locator;
    private readonly nextButton: Locator;
    private readonly doneButton: Locator;
    private readonly onboardingDialog: Locator;

    constructor(private readonly page: Page){

    this.root = page.getByRole('heading', { name: 'Get Started with Real World App' });
    this.onboardingDialog = page.getByRole('heading', { name: 'Finished' });
    this.nextButton = this.page.getByRole('button', {name: 'Next'});
    this.doneButton = this.page.getByRole('button', {name: 'Done'});

    }

    async waitForOpen() {
        await this.root.waitFor({ state: 'visible', timeout: 5000 });
        await expect(this.root).toBeVisible();
    }
    async clickNextButtonOnWelocmPage(){
        await this.nextButton.click();
    }

    async clickDoneButtonOnWelcomePage(){
        await this.onboardingDialog.waitFor({ state: 'visible', timeout: 5000 });
        await this.doneButton.click();
    }


};