import { Page, Locator, expect } from '@playwright/test';

export class FieldValidation {
    constructor(private readonly page: Page) {}

    private normalizeFieldId(field: string): string {
        const fieldIdMap: Record<string, string> = {
            firstname: 'firstName',
            lastname: 'lastName',
            username: 'username',
            password: 'password',
            confirmpassword: 'confirmPassword',

            bankname: 'bankaccount-bankName-input',
            routingnumber: 'bankaccount-routingNumber-input',
            accountnumber: 'bankaccount-accountNumber-input',
        };
        return fieldIdMap[field.toLowerCase()] ?? field;
    }

    getHelperText(field: string): Locator {
        const normalized = this.normalizeFieldId(field);
        return this.page.locator(`#${normalized}-helper-text`);
    }

    getLabel(field: string): Locator {
        const normalized = this.normalizeFieldId(field);
        return this.page.locator(`label[for="${normalized}"]`);
    }

    async expectHelperErrorForField(field: string, expectedText: string) {
        await expect(this.getHelperText(field)).toHaveText(expectedText);
        await expect(this.getHelperText(field)).toHaveClass(/Mui-error/);
    }

    
};
