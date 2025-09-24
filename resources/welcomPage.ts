import { Page, Locator, expect } from '@playwright/test';

export class WelcomPage{

    private readonly root: Locator;
    private readonly nextButton: Locator;

    constructor(private readonly page: Page){

    this.root = this.page.getByText( 'Get Started with Real World App' );
    this.nextButton = this.page.getByRole('button', {name: 'Next'});
    }

    async waitForOpen(){
        await expect(this.root).toBeVisible();
    }

    async clickNextButtonOnWelocmPage(){
        await this.nextButton.click();
    }


};