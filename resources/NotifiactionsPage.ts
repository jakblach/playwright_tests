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

    async expectFirstNotificationToBePaymentFrom(senderName: string) {
        const firstNotification = this.page
        .locator('.notifications-list span.MuiTypography-root.MuiTypography-body1.MuiListItemText-primary')
        .first();

    // Pobranie tekstu z elementu
        const text = await firstNotification.textContent();
        console.log('Sprawdzany tekst notyfikacji:', text);
    
    }
    

    
};
