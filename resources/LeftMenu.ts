import { Page, Locator } from '@playwright/test';

export class LeftMenu {

    private readonly homePage: Locator;
    private readonly myAccountPage: Locator;
    private readonly notificationsPage: Locator;
    private readonly banckAccountPage: Locator;


    constructor(private readonly page: Page){
        
        this.homePage = page.getByRole('link', {name: 'Home'});    
        this.myAccountPage = page.getByRole('link', {name: 'My Account'});
        this.notificationsPage = page.getByRole('link', {name: 'Notifications'});
        this.banckAccountPage = page.getByRole('link', {name: 'Bank Accounts'});
    
    };

    async goToHomePage() {
        await this.homePage.click();

    };

    async goMyAccountPage() {
        await this.myAccountPage.click();

    };

    async goNotificationsPage() {
        await this.notificationsPage.click();

    };

    async goBankAccountsPage() {
        await this.banckAccountPage.click();

    };
        

};