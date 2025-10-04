import { Locator, Page, expect } from "@playwright/test";

export class Payment {

    private readonly amountField: Locator;
    private readonly addNoteField: Locator;
    private readonly requestButton: Locator;
    private readonly payButton: Locator;
    private readonly successMessage:Locator;

    constructor(private page: Page){
        this.amountField = page.locator('id=amount');
        this.addNoteField = page.locator('id=transaction-create-description-input');
        this.requestButton = page.getByRole( 'button', {name: 'Request'});
        this.payButton = page.getByRole( 'button', {name: 'Pay'});
        this.successMessage = this.page.locator('h2', { hasText: /Paid|Requested/ });
    };

    async fillAmount( amountValue: number) {
        this.amountField.fill(amountValue.toString());
        await this.amountField.waitFor({ state: 'attached' });
        // await this.page.waitForTimeout(500);  
        // const filledValue = await this.amountField.inputValue();
        // const numericValue = filledValue.replace(/[^0-9.-]+/g, "").trim();
        // await expect(amountValue.toString()).toBe(numericValue);
    }

    async addNote( noteContent: string) {
        this.addNoteField.fill(noteContent);
        await this.addNoteField.waitFor({ state: 'attached' });
        // await this.page.waitForTimeout(500);  
        // const noteInputValue = await this.addNoteField.inputValue();
        // await expect(noteContent).toBe(noteInputValue);
        
    }

    async clickRequest(){
        await expect(this.requestButton).toBeEnabled();
        await this.requestButton.click();

    };

        async clickPay(){
        await expect(this.payButton).toBeEnabled();
        await this.payButton.click();

    };
    
    async expectSuccessMessage(amountValue: number, noteContent: string, type: 'Pay' | 'Request') {
        await expect(this.successMessage).toBeVisible();
        const formattedAmount = amountValue.toLocaleString('en-US', { minimumFractionDigits: 2 });

        let expectedText: string;
        if (type === 'Request') {
            expectedText = `Requested $${formattedAmount} for ${noteContent}`;
        } else {
            expectedText = `Paid $${formattedAmount} for ${noteContent}`;
        }

        await expect(this.successMessage).toHaveText(expectedText);
    }


};