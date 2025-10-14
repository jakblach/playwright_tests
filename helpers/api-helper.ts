import { APIRequestContext } from '@playwright/test';

export interface User {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  balance: number;
  createdAt: string;
  modifiedAt: string;
}

export class ApiClient {
  constructor(private request: APIRequestContext, private baseUrl: string = 'http://localhost:3001') {}

  async registerUser(data: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
  }): Promise<{ response: any; user: User }> {
    const response = await this.request.post(`${this.baseUrl}/users`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });

    const body = await response.json();
    return { response, user: body.user };
  }

  async loginUser(data: { username: string; password: string }): Promise<{ response: any; user: User }> {
    const response = await this.request.post(`${this.baseUrl}/login`, {
      data: { type: 'LOGIN', ...data },
      headers: { 'Content-Type': 'application/json' },
    });

    const body = await response.json();
    return { response, user: body.user };
  }

  async getUserById(id: string): Promise<{ response: any; user: User }> {
    const response = await this.request.get(`${this.baseUrl}/users/${id}`);
    const body = await response.json();
    return { response, user: body.user };
  }

  async getBankAccounts(): Promise<{ response: any; bankAccounts: any[] }> {
    const response = await this.request.get(`${this.baseUrl}/bankAccounts`);
    const body = await response.json();
    return { response, bankAccounts: body.results };
  }

  async createBankAccount(data: { bankName: string; accountNumber: string; routingNumber: string }): Promise<{ response: any; account: any }> {
    const response = await this.request.post(`${this.baseUrl}/bankAccounts`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
    const body = await response.json();
    console.log('Response from createBankAccount:', body);
    return { response, account: body.account };
  }

  async deleteBankAccount(bankAccountId: string): Promise<{ response: any }> {
    const response = await this.request.delete(`${this.baseUrl}/bankAccounts/${bankAccountId}`);
    return { response };
  }
}
