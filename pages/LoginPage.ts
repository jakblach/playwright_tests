import { Locator, Page, expect } from '@playwright/test';

export class LoginUserPage {

    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;

    constructor (private page : Page) {
        this.usernameField = page.locator('id=username');
        this.passwordField = page.locator('id=password');
        this.signInButton = page.getByRole('button', {name: 'Sign In'});
    };

    async goToLoginPage() {                             
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

};
