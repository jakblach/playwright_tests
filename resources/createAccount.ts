import { Locator, Page, expect, test } from '@playwright/test';

export class BankAccountCreatePage {

    private readonly bankNameField: Locator;
    private readonly routingNumberField: Locator;
    private readonly accountNumberField: Locator;

    constructor(private readonly page: Page) {
        this.bankNameField = this.page.locator('id=bankaccount-bankName-input');
        this.routingNumberField = this.page.locator('id=bankaccount-routingNumber-input');
        this.accountNumberField = this.page.locator('id=bankaccount-accountNumber-input');
    }

    async setBankName(bankName: string){
        await this.bankNameField.fill(bankName);
    };

    async setRoutingNumber(routingNumber: string){
        await this.routingNumberField.fill(routingNumber);
    };

    async setAccountNumber(accountNumber: string){
        await this.accountNumberField.fill(accountNumber);
    };

    async clickButtonSave(){
        await this.page.getByRole('button', {name: 'Save'});
    };



};