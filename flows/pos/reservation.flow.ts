import type { PosHomePage } from '../../pages/pos/home.page.js';
import type { ReservationHistoryRow, ReservationPage } from '../../pages/pos/reservation.page.js';
import { reservationStatuses } from '../../test-data/pos/reservations.js';
import { numericPhone, uniqueName } from '../../utils/random.js';

export type ReservationHistorySearchResult = {
  phone: string;
  historyRows: ReservationHistoryRow[];
};

export class ReservationFlow {
  constructor(
    private readonly homePage: PosHomePage,
    private readonly reservationPage: ReservationPage,
  ) {}

  async createReservationAndMarkArrived(homeUrl: string): Promise<string> {
    const partyName = uniqueName('reservation-arrived');
    await this.openReservation(homeUrl);
    await this.reservationPage.addReservation(partyName);
    await this.reservationPage.changeReservationStatus(partyName, reservationStatuses.arrived);
    return this.reservationPage.readCurrentStatus(partyName);
  }

  async createReservationAndMarkSeated(homeUrl: string): Promise<string> {
    const partyName = uniqueName('reservation-seated');
    await this.openReservation(homeUrl);
    await this.reservationPage.addReservation(partyName);
    await this.reservationPage.changeReservationStatus(partyName, reservationStatuses.seated);
    await this.reservationPage.switchInactiveTab();
    return this.reservationPage.readCurrentStatus(partyName);
  }

  async searchReservationHistoryByPhone(homeUrl: string): Promise<ReservationHistorySearchResult> {
    const partyName = uniqueName('reservation-phone');
    const phone = numericPhone();
    await this.openReservation(homeUrl);
    await this.reservationPage.addReservation(partyName, phone);
    await this.reservationPage.openHistory();
    await this.reservationPage.searchHistory(phone);
    const historyRows = await this.reservationPage.readHistoryRows();
    return { phone, historyRows };
  }

  private async openReservation(homeUrl: string): Promise<void> {
    await this.homePage.open(homeUrl);
    await this.homePage.clickReservation();
  }
}
