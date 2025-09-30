import { test as base } from '@playwright/test';
import { RegisterPage } from '../resources/RegisterPage';

type NewUserFixture = {
    username: string;
    password: string;
};

export const test = base.extend<NewUserFixture>({
    username: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);

        const uniqueUser = `user_${Date.now()}`;
        const password = 's3cret1';

        await registerPage.goToSignupPage();
        await registerPage.registerUser('Test', 'User', uniqueUser, password);

        await use(uniqueUser);
    },

    password: async ({}, use) => {
        await use('s3cret1');
    }
});

export { expect } from '@playwright/test';
