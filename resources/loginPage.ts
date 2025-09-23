import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    constructor (private page : Page) {}

    async LoginPage() {                             //OPENNING LOGIN PAGE
        await this.page.goto('/login');
    }

    async logOn(username: string , password: string){

        const usernameInput = this.page.locator('#username');
        const passwordInput = this.page.locator('#password');
        const submitButton = this.page.getByRole('button', {name: 'Sign In'});

        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await submitButton.click();
    
    }

    async expectInvalidCredentialsError() {

        const error = this.page.getByRole('alert');
        await expect(error).toContainText('Username or password is invalid'); //TO DO: REMOVE TO SEPARATED RESOURCE

    }

    async createNewAccount() {
        const link = this.page.getByTestId('signup');
        await link.click();
        await link.click();
    }

    getFirstNameField(): Locator {
        return  this.page.locator('#firstName');
    }

    getLastNameField(): Locator {
        return  this.page.locator('#lastName');
    }
    
    getUsernameField(): Locator {
        return  this.page.locator('#username');
    }

    getPasswordField(): Locator {
        return  this.page.locator('#password');
    }

    getConfirmPasswordField(): Locator {
        return  this.page.locator('#confirmPassword');
    }

    getSignInButton(): Locator {
        return  this.page.locator('button[data-test="signup-submit"]');
    }

    async SignIn() {
        await this.getSignInButton().click();
    }
    
    async fillFirstName( value:string ) {
        await this.getFirstNameField().fill(value);
    }

    async fillLastName( value:string ) {
        await this.getLastNameField().fill(value);
    }

    async fillUsername(value: string) {
        await this.getUsernameField().fill(value);
    }

    async fillPassword(value: string) {
        await this.getPasswordField().fill(value);
    }

    async fillConfirmPassword(value: string) {
        await this.getConfirmPasswordField().fill(value);
    }


}
