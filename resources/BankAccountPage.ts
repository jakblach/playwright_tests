import { Locator, Page, expect } from '@playwright/test';

export class BankAccountCreatePage {

    private readonly header: Locator;
    private readonly bankNameField: Locator;
    private readonly routingNumberField: Locator;
    private readonly accountNumberField: Locator;
    private readonly saveButton: Locator;

    constructor(private readonly page: Page) {
        this.header = page.locator('[data-test="user-onboarding-dialog-title"]');
        this.bankNameField = page.locator('id=bankaccount-bankName-input');
        this.routingNumberField = page.locator('id=bankaccount-routingNumber-input');
        this.accountNumberField = page.locator('id=bankaccount-accountNumber-input');
        this.saveButton = page.getByRole('button', {name: 'Save'});
    }

    async expectModalHeader() {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText('Create Bank Account');
    }

    async createBankAccount(bankName: string, routing: string | number, account: string | number) {
        await this.expectModalHeader();
        await this.bankNameField.fill(bankName);
        await this.routingNumberField.fill(routing.toString());
        await this.accountNumberField.fill(account.toString());
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    }

};
