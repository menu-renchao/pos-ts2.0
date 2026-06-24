import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { MessageCenterPage } from '../../pages/pos/message-center.page.js';
import type { SdiOrderMessageSample } from '../../test-data/pos/messages.js';

export class SdiMessageFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly messageCenterPage: MessageCenterPage,
  ) {}

  async createSelfDineInOrderAndReadMessage(
    homeUrl: string,
    messageSample: SdiOrderMessageSample,
  ): Promise<string> {
    await this.homePage.open(homeUrl);
    await this.homePage.openMessageCenter();
    await this.messageCenterPage.switchMessageType(messageSample.messageType);
    await this.messageCenterPage.clearAll();
    await this.messageCenterPage.seedSelfDineInOrderMessage(
      messageSample.tableName,
      messageSample.orderNumber,
    );
    await this.messageCenterPage.openMessageByTitleAndContent(messageSample.title);
    return this.messageCenterPage.readCurrentOpenMessageBodyContent();
  }
}
