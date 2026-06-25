import type { EmenuMainPage } from '../../pages/emenu/main.page.js';
import type { EmenuOrderPage } from '../../pages/emenu/order.page.js';
import type { CallerPage } from '../../pages/pos/caller.page.js';
import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { OrderDishesPage } from '../../pages/pos/order-dishes.page.js';
import type { RecallPage } from '../../pages/pos/recall.page.js';
import { openFoodDish } from '../../test-data/pos/dishes.js';
import { step } from '../../utils/step.js';

export type DineInCallerNameResult = {
  orderNumber: string;
  guestName: string;
  shortGuestName: string;
  preparingInfoBeforeCallOff: string[];
  preparingInfoAfterCallOff: string[];
};

export type DineInCallerTableResult = {
  orderCardId: string;
  preparingInfoBeforeCallOff: string[];
  preparingInfoAfterCallOff: string[];
};

export type EmenuCallerTableResult = {
  orderCardId: string;
  preparingInfoBeforeCallOff: string[];
  preparingInfoAfterCallOff: string[];
};

export type EmenuCallerNameResult = {
  orderNumber: string;
  guestName: string;
  shortGuestName: string;
  preparingInfoBeforeCallOff: string[];
  preparingInfoAfterCallOff: string[];
};

export type EmenuCallerRefreshResult = {
  orderNumber: string;
  firstGuestName: string;
  firstShortGuestName: string;
  secondGuestName: string;
  secondShortGuestName: string;
  preparingInfoAfterFirstEdit: string[];
  preparingInfoAfterSecondCall: string[];
};

const callerGuestName = 'CallerGuest42';
const emenuEditedGuestName = 'EmenuGuest42';
const emenuRefreshGuestName = 'RefreshGuest42';

export class CallerFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly orderDishesPage: OrderDishesPage,
    private readonly recallPage: RecallPage,
    private readonly callerPage: CallerPage,
    private readonly emenuMainPage?: EmenuMainPage,
    private readonly emenuOrderPage?: EmenuOrderPage,
  ) {}

  async callDineInOrderWithGuestNameAndClear(homeUrl: string): Promise<DineInCallerNameResult> {
    return step('Dine In 下单带客名后叫号并销号', async () => {
      await this.homePage.open(homeUrl);
      await this.homePage.inputEmployeePassword('11');
      await this.homePage.clickDineIn();
      await this.orderDishesPage.openFoodWithoutTax(openFoodDish.name, openFoodDish.price);
      await this.orderDishesPage.inputGuestName(callerGuestName);
      await this.orderDishesPage.saveOrder();

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const orderNumber = await this.recallPage.readOrderNumber();
      await this.recallPage.callCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoBeforeCallOff = await this.callerPage.readInfoList('preparing');

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.callOffCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoAfterCallOff = await this.callerPage.readInfoList('preparing');

      return {
        orderNumber,
        guestName: callerGuestName,
        shortGuestName: shortenCallerGuestName(callerGuestName),
        preparingInfoBeforeCallOff,
        preparingInfoAfterCallOff,
      };
    });
  }

  async callDineInOrderWithoutGuestNameAndClear(homeUrl: string): Promise<DineInCallerTableResult> {
    return step('Dine In 下单无客名后按桌号叫号并销号', async () => {
      await this.homePage.open(homeUrl);
      await this.homePage.inputEmployeePassword('11');
      await this.homePage.clickDineIn();
      await this.orderDishesPage.openFoodWithoutTax(openFoodDish.name, openFoodDish.price);
      await this.orderDishesPage.saveOrder();

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const orderCardId = await this.recallPage.readOrderCardId();
      await this.recallPage.callCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoBeforeCallOff = await this.callerPage.readInfoList('preparing');

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.callOffCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoAfterCallOff = await this.callerPage.readInfoList('preparing');

      return {
        orderCardId,
        preparingInfoBeforeCallOff,
        preparingInfoAfterCallOff,
      };
    });
  }

  async callEmenuOrderWithTableAndClear(emenuUrl: string, _homeUrl: string): Promise<EmenuCallerTableResult> {
    return step('Emenu 选桌下单叫号并由 POS 销号', async () => {
      if (!this.emenuMainPage || !this.emenuOrderPage) {
        throw new Error('Emenu pages are required for Emenu caller flow.');
      }

      await this.emenuMainPage.openAndStartOrder(emenuUrl);
      await this.emenuOrderPage.placeFirstCategoryItemOrder();
      await this.emenuOrderPage.closeOrderCard();
      await this.emenuOrderPage.callServer();

      await this.emenuMainPage.switchToPosHome();
      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const orderCardId = await this.recallPage.readOrderCardId();
      await this.homePage.openCaller();
      const preparingInfoBeforeCallOff = await this.callerPage.readInfoList('preparing');

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.callOffCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoAfterCallOff = await this.callerPage.readInfoList('preparing');

      return {
        orderCardId,
        preparingInfoBeforeCallOff,
        preparingInfoAfterCallOff,
      };
    });
  }

  async callEmenuOrderWithEditedGuestNameAndClear(
    emenuUrl: string,
    _homeUrl: string,
  ): Promise<EmenuCallerNameResult> {
    return step('Emenu 下单后 POS 修改客名并销号', async () => {
      if (!this.emenuMainPage || !this.emenuOrderPage) {
        throw new Error('Emenu pages are required for Emenu caller flow.');
      }

      await this.emenuMainPage.openAndStartOrder(emenuUrl);
      await this.emenuOrderPage.placeFirstCategoryItemOrder();
      await this.emenuOrderPage.closeOrderCard();
      await this.emenuOrderPage.callServer();

      await this.emenuMainPage.switchToPosHome();
      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const orderNumber = await this.recallPage.readOrderNumber();
      await this.recallPage.clickEdit();
      await this.orderDishesPage.inputGuestName(emenuEditedGuestName);
      await this.orderDishesPage.sendAllToKitchen();

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.homePage.openCaller();
      const preparingInfoBeforeCallOff = await this.callerPage.readInfoList('preparing');

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.callOffCurrentOrder();
      await this.homePage.openCaller();
      const preparingInfoAfterCallOff = await this.callerPage.readInfoList('preparing');

      return {
        orderNumber,
        guestName: emenuEditedGuestName,
        shortGuestName: shortenCallerGuestName(emenuEditedGuestName),
        preparingInfoBeforeCallOff,
        preparingInfoAfterCallOff,
      };
    });
  }

  async callEmenuOrderCallerInfoRefreshAfterGuestNameChange(
    emenuUrl: string,
    _homeUrl: string,
  ): Promise<EmenuCallerRefreshResult> {
    return step('Emenu 叫号后 POS 改名并再次叫号刷新信息', async () => {
      if (!this.emenuMainPage || !this.emenuOrderPage) {
        throw new Error('Emenu pages are required for Emenu caller flow.');
      }

      await this.emenuMainPage.openAndStartOrder(emenuUrl);
      await this.emenuOrderPage.placeFirstCategoryItemOrder();
      await this.emenuOrderPage.closeOrderCard();
      await this.emenuOrderPage.callServer();

      await this.emenuMainPage.switchToPosHome();
      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      const orderNumber = await this.recallPage.readOrderNumber();
      const firstGuestName = `Area 1-Table 1#${orderNumber}`;
      await this.recallPage.clickEdit();
      await this.orderDishesPage.inputGuestName(firstGuestName);
      await this.orderDishesPage.sendAllToKitchen();

      await this.homePage.openCaller();
      await this.callerPage.refresh();
      const preparingInfoAfterFirstEdit = await this.callerPage.readInfoList('preparing');

      await this.homePage.clickRecall();
      await this.recallPage.openRecentOrder();
      await this.recallPage.clickEdit();
      await this.orderDishesPage.inputGuestName(emenuRefreshGuestName);
      await this.orderDishesPage.sendAllToKitchen();

      await this.emenuMainPage.switchToEmenuOrder();
      await this.emenuOrderPage.callServer();
      await this.emenuMainPage.switchToPosHome();
      await this.homePage.openCaller();
      await this.callerPage.refresh();
      const preparingInfoAfterSecondCall = await this.callerPage.readInfoList('preparing');

      return {
        orderNumber,
        firstGuestName,
        firstShortGuestName: shortenCallerGuestName(firstGuestName),
        secondGuestName: emenuRefreshGuestName,
        secondShortGuestName: shortenCallerGuestName(emenuRefreshGuestName),
        preparingInfoAfterFirstEdit,
        preparingInfoAfterSecondCall,
      };
    });
  }
}

function shortenCallerGuestName(guestName: string): string {
  return `${guestName.slice(0, 3)}...${guestName.slice(-2)}`;
}
