import { Locator, Page } from "@playwright/test";

export class MainPage {

    private readonly newPaymentButton: Locator;

    constructor(private readonly page:Page){
        this.newPaymentButton = page.locator('[data-test="nav-top-new-transaction"]');
    }

    async createNewPayment(){
        await this.newPaymentButton.click();

    }
}