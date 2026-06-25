import type { PosHomePage } from '../../pages/pos/home.page.js';

export type WrongPasswordResult = {
  message: string;
  passwordValue: string;
};

export class PosEntryFlow {
  constructor(private readonly homePage: PosHomePage) {}

  async enterWithEmployeePassword(homeUrl: string, password: string): Promise<void> {
    await this.homePage.open(homeUrl);
    if (password !== '11') {
      await this.homePage.logout();
      await this.homePage.inputEmployeePassword(password);
    }
  }

  async rejectWrongPassword(homeUrl: string, password: string): Promise<WrongPasswordResult> {
    await this.homePage.open(homeUrl);
    await this.homePage.logout();
    const message = await this.homePage.loginWithWrongPassword(password);
    const passwordValue = await this.homePage.readPasswordValue();
    return { message, passwordValue };
  }
}
