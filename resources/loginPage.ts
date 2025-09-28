import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;

    constructor (private page : Page) {
        this.usernameField = page.locator('id=username');
        this.passwordField = page.locator('id=password');
        this.signInButton = page.getByRole('button', {name: 'Sign In'});
    };

    async goTo() {                             
        await this.page.goto('/login');
    };

    async fillCredentials(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
    }

    async clickSignIn() {
        await expect(this.signInButton).toBeEnabled();
        await this.signInButton.click();
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


    async clickNextButton() {
        await this.getNextButton().click();
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
