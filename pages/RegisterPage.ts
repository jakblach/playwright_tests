import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly signUpButton: Locator;

    constructor(private readonly page: Page) {
        this.firstName = page.locator('id=firstName');
        this.lastName = page.locator('id=lastName');
        this.username = page.locator('id=username');
        this.password = page.locator('id=password');
        this.confirmPassword = page.locator('id=confirmPassword');
        this.signUpButton = page.locator('button[data-test="signup-submit"]');
    }

    async goToSignupPage() {
        await this.page.goto('/signup');
    }
	
	async fillForm(firstName: string, lastName: string, username: string, password: string, confirmPassword: string = password) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.username.fill(username);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
    }

    async registerUser(firstName: string, lastName: string, username: string, password: string, confirmPassword: string = password) {
		await this.fillForm(firstName, lastName, username, password, confirmPassword);
		await this.expectSignUpEnabled();
        await this.clickSignUp();
    }

	async clickSignUp() {
        await this.signUpButton.click();
    }

    async expectSignUpEnabled() {
        await expect(this.signUpButton).toBeEnabled();
    }

    async expectSignUpDisabled() {
        await expect(this.signUpButton).toBeDisabled();
    }
};