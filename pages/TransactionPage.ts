import { Locator, Page, expect } from '@playwright/test';


export class TransactionPage{

    private readonly transactionList: Locator;
    private readonly friendsTab: Locator;
    private readonly createTransactionBtn: Locator;
    private readonly searchPerson: Locator;
    

    constructor(private readonly page: Page){

        this.transactionList = page.locator('[data-test="transaction-list"]');
        this.friendsTab = page.locator('[data-test="nav-contacts-tab"]');
        this.createTransactionBtn = page.locator('[data-test="transaction-list-empty-create-transaction-button"]');
        this.searchPerson = page.locator('id=user-list-search-input');
    }

    async expectTransactionListVisible() {
        await expect(this.transactionList).toBeVisible();
        
   }

   async goToFriendsSubtab(){   
        await this.friendsTab.click();
        await expect(this.page.getByText('Contacts')).toBeVisible();
        
   }

   async creatTansaction(){
        await this.createTransactionBtn.click();
        await expect(this.searchPerson).toBeEnabled();

   }

   async searchForContct(value:string){
    await this.searchPerson.fill(value);

   }

   

};