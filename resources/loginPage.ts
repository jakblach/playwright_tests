import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor (private page : Page) {}

    async openLoginPage() {                             //OPENNING LOGIN PAGE
        await this.page.goto('/login');
    }

    async logOn(username: string , password: string){

        await this.page.getByTestId('signin-username').fill(username);
        await this.page.getByTestId('signin-password').fill(password);
        await this.page.getByTestId('signin-submit').click();

    }

}
