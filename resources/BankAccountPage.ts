import { Locator, Page, expect } from '@playwright/test';

export class BankAccountCreatePage {

    private readonly header: Locator;
    private readonly bankNameField: Locator;
    private readonly routingNumberField: Locator;
    private readonly accountNumberField: Locator;
    private readonly saveButton: Locator;
    private readonly createBankAccountButton: Locator;
    private readonly deleteBankAccountButton: Locator;

    constructor(private readonly page: Page) {
        this.header = page.locator('[data-test="user-onboarding-dialog-title"]');
        this.bankNameField = page.locator('id=bankaccount-bankName-input');
        this.routingNumberField = page.locator('id=bankaccount-routingNumber-input');
        this.accountNumberField = page.locator('id=bankaccount-accountNumber-input');
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.createBankAccountButton = page.getByRole('link', {name: 'Create'})
        this.deleteBankAccountButton = page.getByRole('button', {name: 'Delete'});

    }

    async expectModalHeader() {
        await expect(this.header).toBeVisible();
        await expect(this.header).toHaveText('Create Bank Account');
    }

    async fillBankAccountForm(bankName: string, routing: string | number, account: string | number) {
        await this.bankNameField.fill(bankName);
        await this.routingNumberField.fill(routing.toString());
        await this.accountNumberField.fill(account.toString());
    }

    async createBankAccount(bankName: string, routing: string | number, account: string | number) {
        await this.fillBankAccountForm(bankName, routing, account);
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    }

    async createNewBankAccount(){
        await this.createBankAccountButton.click();

    }
    

    async deleteBankAccount(bankAccountName: string) {
        const item = this.page.locator('li[data-test^="bankaccount-list-item"]', {
             has: this.page.locator('p', { hasText: bankAccountName })
        });
        await item.getByRole('button', { name: 'Delete' }).click();
        const deletedLabel = item.locator('p', { hasText: `${bankAccountName} (Deleted)` });
        await expect(deletedLabel).toBeVisible();
    
    }

};
