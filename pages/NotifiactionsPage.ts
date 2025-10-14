import { Page, Locator, expect } from '@playwright/test';

export class NotificationsPage {

    private readonly notificationsHeader: Locator;

    constructor(private readonly page: Page) {
        this.notificationsHeader = this.page.getByRole('heading', { name: 'Notifications' });
    }

    async goToNotificationsPage()  {
        await this.page.goto('/notifications');
        await this.page.waitForLoadState('networkidle');
        await expect( this.notificationsHeader).toBeVisible();
    }

    async assertUserReceivedPayment(userName: string) {
        const message = `${userName} received payment.`;
        await expect(this.page.getByText(message).first()).toBeVisible();
    
    }
    

    
};
