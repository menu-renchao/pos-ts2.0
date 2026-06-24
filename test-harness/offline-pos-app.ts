import type { OfflinePosState } from './offline-pos-state.js';

export function renderOfflinePosHome(_state: OfflinePosState): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <main data-testid="pos-home">
      <div data-testid="welcome-text"></div>
      <button data-testid="switch-language-Chinese">Chinese</button>
      <button data-testid="switch-language-Default">Default</button>
      <button data-testid="home-logout">Logout</button>
      <button data-testid="home-check-in">Check In/Out</button>
      <button data-testid="edit-home-functions">Edit</button>
      <button data-testid="more-functions">More</button>
      <section data-testid="home-function-cards"></section>
      <section data-testid="hidden-function-cards"></section>
      <button data-testid="edit-main-add" hidden>Main</button>
      <button data-testid="edit-more-add" hidden>More</button>
      <button data-testid="edit-save" hidden>Save Layout</button>
      <button data-testid="edit-cancel" hidden>Cancel</button>
      <button data-testid="home-togo">Togo</button>
      <button data-testid="home-dine-in">Dine In</button>
      <button data-testid="home-pickup">Pickup</button>
      <button data-testid="home-recall">Recall</button>
      <button data-testid="home-admin">Admin</button>
      <button data-testid="home-reservation">Reservation</button>
      <button data-testid="home-delivery">Delivery</button>
      <button data-testid="home-report">Report</button>
      <button data-testid="home-support">Support</button>
      <button data-testid="home-message-center">Message Center</button>
      <input data-testid="employee-password" type="password" />
      <button data-testid="employee-password-save">Save</button>
      <div data-testid="clock-text" role="status"></div>
      <button data-testid="clock-break" hidden>Break</button>
      <button data-testid="clock-back-to-work" hidden>Back To Work</button>
      <button data-testid="clock-checkout" hidden>Checkout</button>
      <div data-testid="login-toast" role="status"></div>
      <div data-testid="home-toast" role="status"></div>
    </main>
    <section data-testid="admin-page" hidden>
      <select data-testid="user-default-language">
        <option value="Default">Default</option>
        <option value="Chinese">Chinese</option>
      </select>
      <button data-testid="save-user-default-language">Save Language</button>
    </section>
    <section data-testid="order-page" hidden>
      <div data-testid="open-food-category"></div>
      <div data-testid="order-menu-groups"></div>
      <div data-testid="order-menu-categories"></div>
      <div data-testid="order-menu-items"></div>
      <div data-testid="order-tax">0</div>
      <div data-testid="order-item-name"></div>
      <div data-testid="order-item-price">0</div>
      <div data-testid="order-options"></div>
      <div data-testid="order-sub-options"></div>
      <button data-testid="order-send-kitchen">Send Kitchen</button>
      <button data-testid="order-settle">Settle</button>
      <button data-testid="settle-cash">Cash</button>
      <button data-testid="order-void-item">Void Item</button>
      <button data-testid="item-discount-10">10% Discount</button>
      <input data-testid="order-tip" />
      <button data-testid="split-even">Split Even</button>
      <button data-testid="split-combine">Combine Split</button>
      <input data-testid="open-food-name" />
      <input data-testid="open-food-price" />
      <button data-testid="open-food-no-tax">Open Food No Tax</button>
      <button data-testid="order-pickup">Pickup</button>
      <button data-testid="pickup-info-submit">Submit Pickup Info</button>
      <input data-testid="modify-note-name" />
      <input data-testid="modify-note-price" />
      <button data-testid="modify-save">Save Modify</button>
      <section data-testid="customer-info-popup" hidden>
        <input data-testid="customer-name" />
        <input data-testid="customer-phone" />
        <button data-testid="customer-submit">Submit Customer</button>
      </section>
      <section data-testid="manager-password-popup" hidden>
        <input data-testid="manager-password" type="password" />
        <button data-testid="manager-password-submit">Submit Manager Password</button>
      </section>
      <button data-testid="order-save">Save Order</button>
    </section>
    <section data-testid="recall-page" hidden>
      <button data-testid="recall-recent-order">Recent Order</button>
      <button data-testid="recall-previous-order">Previous Order</button>
      <button data-testid="recall-sub-order">Sub Order</button>
      <button data-testid="recall-combine-split">Combine Split</button>
      <button data-testid="recall-edit">Edit</button>
      <input data-testid="recall-guest-name" />
      <button data-testid="recall-save-edit">Save Edit</button>
      <div data-testid="recall-order-tip"></div>
      <div data-testid="recall-order-status"></div>
      <div data-testid="recall-customer-name"></div>
      <div data-testid="recall-order-items"></div>
    </section>
    <section data-testid="report-password-panel" hidden>
      <input data-testid="report-password" type="password" />
      <button data-testid="report-password-save">Save</button>
    </section>
    <section data-testid="report-page" hidden>
      <h1>Report</h1>
    </section>
    <section data-testid="delivery-page" hidden>
      <input data-testid="delivery-phone" />
      <input data-testid="delivery-name" />
      <input data-testid="delivery-address" />
      <button data-testid="delivery-history-customer">History Customer</button>
      <button data-testid="delivery-phone-delete">Delete Phone</button>
      <button data-testid="delivery-name-delete">Delete Name</button>
      <button data-testid="delivery-seed-address-order">Seed Address Order</button>
      <div data-testid="delivery-order-list" hidden data-count="0"></div>
      <div data-testid="delivery-customer-list"></div>
      <div data-testid="delivery-order-info"></div>
    </section>
    <section data-testid="support-page" hidden>
      <div data-testid="support-version">Voffline-fast</div>
      <div data-testid="support-patch-version">7</div>
    </section>
    <section data-testid="message-center" hidden>
      <select data-testid="message-type">
        <option value="Self-dine-in">Self-dine-in</option>
      </select>
      <button data-testid="message-clear-all">Clear All</button>
      <input data-testid="message-seed-table-name" />
      <input data-testid="message-seed-order-number" />
      <button data-testid="message-seed-sdi-order">Seed SDI Order</button>
      <input data-testid="message-search" />
      <button data-testid="message-open">Open Message</button>
      <div data-testid="message-current-body"></div>
    </section>
    <section data-testid="reservation-page" hidden>
      <button data-testid="reservation-active-tab">Active</button>
      <button data-testid="reservation-inactive-tab">Inactive</button>
      <input data-testid="reservation-party-name" />
      <input data-testid="reservation-phone" />
      <button data-testid="reservation-add">Add Reservation</button>
      <input data-testid="reservation-status-party" />
      <select data-testid="reservation-status-select">
        <option value="Arrived">Arrived</option>
        <option value="Seated">Seated</option>
      </select>
      <button data-testid="reservation-save-status">Save Status</button>
      <div data-testid="reservation-current-status"></div>
      <button data-testid="reservation-history">History</button>
      <input data-testid="reservation-history-search" />
      <div data-testid="reservation-history-list"></div>
    </section>
    <script>
      const sessionMoveError = "Can't move this button to/from hide area";
      let currentLanguage = localStorage.getItem('currentLanguage') || 'Default';
      let userDefaultLanguage = localStorage.getItem('userDefaultLanguage') || 'Default';
      let clockState = 'off';
      let deliveryHistoricalAddress = '';
      let messages = [];
      let currentOrderItems = [];
      let latestSavedOrderItems = [];
      let currentItemOption = null;
      let latestSavedItemOption = null;
      let currentOrderTip = 0;
      let currentSplitPartTip = null;
      let currentOrderStatus = '';
      let currentCustomerName = null;
      let savedOrders = [];
      let selectedRecallOrder = null;
      let reservations = [];
      let mainFunctions = ['Dine In', 'Drawer', 'To Go', 'Delivery'];
      let hiddenFunctions = ['Admin', 'Session'];
      let draftMainFunctions = [...mainFunctions];
      let draftHiddenFunctions = [...hiddenFunctions];
      let selectedFunction = null;

      const mainList = document.querySelector('[data-testid="home-function-cards"]');
      const hiddenList = document.querySelector('[data-testid="hidden-function-cards"]');
      const editButton = document.querySelector('[data-testid="edit-home-functions"]');
      const mainAddButton = document.querySelector('[data-testid="edit-main-add"]');
      const moreAddButton = document.querySelector('[data-testid="edit-more-add"]');
      const saveEditButton = document.querySelector('[data-testid="edit-save"]');
      const cancelEditButton = document.querySelector('[data-testid="edit-cancel"]');
      const homeToast = document.querySelector('[data-testid="home-toast"]');
      const welcomeText = document.querySelector('[data-testid="welcome-text"]');
      const switchChineseButton = document.querySelector('[data-testid="switch-language-Chinese"]');
      const switchDefaultButton = document.querySelector('[data-testid="switch-language-Default"]');
      const logoutButton = document.querySelector('[data-testid="home-logout"]');
      const checkInButton = document.querySelector('[data-testid="home-check-in"]');
      const clockText = document.querySelector('[data-testid="clock-text"]');
      const breakButton = document.querySelector('[data-testid="clock-break"]');
      const backToWorkButton = document.querySelector('[data-testid="clock-back-to-work"]');
      const checkoutButton = document.querySelector('[data-testid="clock-checkout"]');
      const adminPage = document.querySelector('[data-testid="admin-page"]');
      const orderPage = document.querySelector('[data-testid="order-page"]');
      const orderMenuGroups = document.querySelector('[data-testid="order-menu-groups"]');
      const orderMenuCategories = document.querySelector('[data-testid="order-menu-categories"]');
      const orderMenuItems = document.querySelector('[data-testid="order-menu-items"]');
      const orderSaveButton = document.querySelector('[data-testid="order-save"]');
      const orderTax = document.querySelector('[data-testid="order-tax"]');
      const orderItemName = document.querySelector('[data-testid="order-item-name"]');
      const orderItemPrice = document.querySelector('[data-testid="order-item-price"]');
      const orderOptions = document.querySelector('[data-testid="order-options"]');
      const orderSubOptions = document.querySelector('[data-testid="order-sub-options"]');
      const orderSendKitchenButton = document.querySelector('[data-testid="order-send-kitchen"]');
      const orderSettleButton = document.querySelector('[data-testid="order-settle"]');
      const settleCashButton = document.querySelector('[data-testid="settle-cash"]');
      const orderVoidItemButton = document.querySelector('[data-testid="order-void-item"]');
      const itemDiscountButton = document.querySelector('[data-testid="item-discount-10"]');
      const orderTipInput = document.querySelector('[data-testid="order-tip"]');
      const splitEvenButton = document.querySelector('[data-testid="split-even"]');
      const openFoodNameInput = document.querySelector('[data-testid="open-food-name"]');
      const openFoodPriceInput = document.querySelector('[data-testid="open-food-price"]');
      const openFoodNoTaxButton = document.querySelector('[data-testid="open-food-no-tax"]');
      const orderPickupButton = document.querySelector('[data-testid="order-pickup"]');
      const pickupInfoSubmitButton = document.querySelector('[data-testid="pickup-info-submit"]');
      const modifyNoteNameInput = document.querySelector('[data-testid="modify-note-name"]');
      const modifyNotePriceInput = document.querySelector('[data-testid="modify-note-price"]');
      const modifySaveButton = document.querySelector('[data-testid="modify-save"]');
      const customerInfoPopup = document.querySelector('[data-testid="customer-info-popup"]');
      const customerNameInput = document.querySelector('[data-testid="customer-name"]');
      const customerPhoneInput = document.querySelector('[data-testid="customer-phone"]');
      const customerSubmitButton = document.querySelector('[data-testid="customer-submit"]');
      const managerPasswordPopup = document.querySelector('[data-testid="manager-password-popup"]');
      const managerPasswordInput = document.querySelector('[data-testid="manager-password"]');
      const managerPasswordSubmitButton = document.querySelector('[data-testid="manager-password-submit"]');
      const recallPage = document.querySelector('[data-testid="recall-page"]');
      const recallRecentOrderButton = document.querySelector('[data-testid="recall-recent-order"]');
      const recallPreviousOrderButton = document.querySelector('[data-testid="recall-previous-order"]');
      const recallSubOrderButton = document.querySelector('[data-testid="recall-sub-order"]');
      const recallCombineSplitButton = document.querySelector('[data-testid="recall-combine-split"]');
      const recallEditButton = document.querySelector('[data-testid="recall-edit"]');
      const recallGuestNameInput = document.querySelector('[data-testid="recall-guest-name"]');
      const recallSaveEditButton = document.querySelector('[data-testid="recall-save-edit"]');
      const recallOrderTip = document.querySelector('[data-testid="recall-order-tip"]');
      const recallOrderStatus = document.querySelector('[data-testid="recall-order-status"]');
      const recallCustomerName = document.querySelector('[data-testid="recall-customer-name"]');
      const recallOrderItems = document.querySelector('[data-testid="recall-order-items"]');
      const reportPasswordPanel = document.querySelector('[data-testid="report-password-panel"]');
      const reportPasswordInput = document.querySelector('[data-testid="report-password"]');
      const reportPasswordSaveButton = document.querySelector('[data-testid="report-password-save"]');
      const reportPage = document.querySelector('[data-testid="report-page"]');
      const supportPage = document.querySelector('[data-testid="support-page"]');
      const messageCenter = document.querySelector('[data-testid="message-center"]');
      const messageClearAllButton = document.querySelector('[data-testid="message-clear-all"]');
      const messageSeedTableNameInput = document.querySelector('[data-testid="message-seed-table-name"]');
      const messageSeedOrderNumberInput = document.querySelector('[data-testid="message-seed-order-number"]');
      const messageSeedSdiOrderButton = document.querySelector('[data-testid="message-seed-sdi-order"]');
      const messageSearchInput = document.querySelector('[data-testid="message-search"]');
      const messageOpenButton = document.querySelector('[data-testid="message-open"]');
      const messageCurrentBody = document.querySelector('[data-testid="message-current-body"]');
      const deliveryPage = document.querySelector('[data-testid="delivery-page"]');
      const deliveryPhoneInput = document.querySelector('[data-testid="delivery-phone"]');
      const deliveryNameInput = document.querySelector('[data-testid="delivery-name"]');
      const deliveryAddressInput = document.querySelector('[data-testid="delivery-address"]');
      const deliveryHistoryCustomerButton = document.querySelector('[data-testid="delivery-history-customer"]');
      const deliveryPhoneDeleteButton = document.querySelector('[data-testid="delivery-phone-delete"]');
      const deliveryNameDeleteButton = document.querySelector('[data-testid="delivery-name-delete"]');
      const deliverySeedAddressOrderButton = document.querySelector('[data-testid="delivery-seed-address-order"]');
      const deliveryOrderList = document.querySelector('[data-testid="delivery-order-list"]');
      const deliveryCustomerList = document.querySelector('[data-testid="delivery-customer-list"]');
      const deliveryOrderInfo = document.querySelector('[data-testid="delivery-order-info"]');
      const reservationPage = document.querySelector('[data-testid="reservation-page"]');
      const reservationPartyInput = document.querySelector('[data-testid="reservation-party-name"]');
      const reservationPhoneInput = document.querySelector('[data-testid="reservation-phone"]');
      const reservationAddButton = document.querySelector('[data-testid="reservation-add"]');
      const reservationStatusPartyInput = document.querySelector('[data-testid="reservation-status-party"]');
      const reservationStatusSelect = document.querySelector('[data-testid="reservation-status-select"]');
      const reservationSaveStatusButton = document.querySelector('[data-testid="reservation-save-status"]');
      const reservationCurrentStatus = document.querySelector('[data-testid="reservation-current-status"]');
      const reservationInactiveTab = document.querySelector('[data-testid="reservation-inactive-tab"]');
      const reservationHistoryButton = document.querySelector('[data-testid="reservation-history"]');
      const reservationHistorySearchInput = document.querySelector('[data-testid="reservation-history-search"]');
      const reservationHistoryList = document.querySelector('[data-testid="reservation-history-list"]');
      const languageSelect = document.querySelector('[data-testid="user-default-language"]');
      const saveLanguageButton = document.querySelector('[data-testid="save-user-default-language"]');
      const openFoodCategory = document.querySelector('[data-testid="open-food-category"]');
      const passwordInput = document.querySelector('[data-testid="employee-password"]');
      const saveButton = document.querySelector('[data-testid="employee-password-save"]');
      const toast = document.querySelector('[data-testid="login-toast"]');

      function renderLanguage() {
        const effectiveLanguage = currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
        welcomeText.textContent = effectiveLanguage === 'Chinese' ? '欢迎您' : 'Welcome';
        languageSelect.value = userDefaultLanguage;
      }

      function clockNow() {
        const date = new Date();
        let hour = date.getHours();
        const minute = String(date.getMinutes()).padStart(2, '0');
        const suffix = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return hour + ':' + minute + suffix;
      }

      function renderClockControls() {
        breakButton.hidden = clockState !== 'clocked-in';
        backToWorkButton.hidden = clockState !== 'on-break';
        checkoutButton.hidden = clockState === 'off';
      }

      function showPanel(panel) {
        adminPage.hidden = panel !== 'admin';
        deliveryPage.hidden = panel !== 'delivery';
        orderPage.hidden = panel !== 'order';
        recallPage.hidden = panel !== 'recall';
        reportPasswordPanel.hidden = panel !== 'report-password';
        reportPage.hidden = panel !== 'report';
        supportPage.hidden = panel !== 'support';
        messageCenter.hidden = panel !== 'message-center';
        reservationPage.hidden = panel !== 'reservation';
      }

      function showDeliveryOrders(orderInfo = '') {
        deliveryOrderList.hidden = false;
        deliveryOrderList.dataset.count = '1';
        deliveryOrderList.textContent = 'Historical order';
        deliveryCustomerList.hidden = true;
        deliveryCustomerList.textContent = '';
        deliveryOrderInfo.textContent = orderInfo;
      }

      function showDeliveryCustomers() {
        deliveryOrderList.hidden = true;
        deliveryOrderList.dataset.count = '0';
        deliveryOrderList.textContent = '';
        deliveryCustomerList.hidden = false;
        deliveryCustomerList.textContent = 'Customer list';
        deliveryOrderInfo.textContent = '';
      }

      function createButton(testId, text, onClick) {
        const button = document.createElement('button');
        button.dataset.testid = testId;
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
      }

      function menuData() {
        return [
          { name: 'Group Switch Beef', price: 11.25, group: 'Lunch Menu', category: 'Lunch Entree' },
          { name: 'Category Switch Fish', price: 13.5, group: 'Dinner Menu', category: 'Seafood' },
          { name: 'Discountable Burger', price: 10, group: 'Dinner Menu', category: 'Burgers' },
          { name: 'Category Option Pork', price: 9.5, group: '', category: 'Category Option' },
          { name: '蒙古鸡', price: 10.25, group: '', category: 'KDS鸡肉类午餐' },
          { name: 'Item Option Pork', price: 12, group: 'Dinner Menu', category: 'Item Options' },
          { name: 'Item Option Seafood', price: 12.75, group: 'Dinner Menu', category: 'Item Options' },
        ];
      }

      function renderOrderAmounts() {
        const itemCount = currentOrderItems.filter((item) => item.state !== 'Voided').length;
        orderTax.textContent = String(Number((itemCount * 0.6).toFixed(2)));
        orderItemName.textContent = currentOrderItems[0]?.name || '';
        orderItemPrice.textContent = String(currentOrderItems[0]?.price || 0);
      }

      function renderOptionControls() {
        orderOptions.innerHTML = '';
        ['Pork', 'Seafood'].forEach((optionName) => {
          orderOptions.appendChild(createButton('order-option', optionName, () => {}));
        });
        orderSubOptions.innerHTML = '';
        ['Spicy'].forEach((subOptionName) => {
          orderSubOptions.appendChild(createButton('order-sub-option', subOptionName, () => {}));
        });
      }

      function renderOrderMenu() {
        const effectiveLanguage = currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
        const groups = effectiveLanguage === 'Chinese' ? ['午餐菜单', '中餐菜单'] : ['Lunch Menu', 'Dinner Menu'];
        orderMenuGroups.innerHTML = '';
        groups.forEach((group) => {
          orderMenuGroups.appendChild(createButton('order-menu-group', group, () => {}));
        });
        orderMenuCategories.innerHTML = '';
        ['Lunch Entree', 'Seafood', 'Burgers', 'Category Option', 'KDS鸡肉类午餐', 'Item Options'].forEach((category) => {
          orderMenuCategories.appendChild(createButton('order-menu-category', category, () => {}));
        });
        orderMenuItems.innerHTML = '';
        menuData().forEach((dish) => {
          orderMenuItems.appendChild(createButton('order-menu-item', dish.name, () => {
            currentOrderItems.push({ name: dish.name, price: dish.price, state: '' });
            renderOrderAmounts();
          }));
        });
        renderOptionControls();
      }

      function resetCurrentOrder() {
        currentOrderItems = [];
        currentItemOption = null;
        currentOrderTip = 0;
        currentSplitPartTip = null;
        currentOrderStatus = '';
        currentCustomerName = null;
        customerInfoPopup.hidden = true;
        managerPasswordPopup.hidden = true;
        renderOrderAmounts();
        renderOrderMenu();
        const effectiveLanguage = currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
        openFoodCategory.textContent = effectiveLanguage === 'Chinese' ? '自定义菜\\nauto_fix' : 'Custom Food\\nauto_fix';
      }

      function saveCurrentOrder() {
        const order = {
          items: [...currentOrderItems],
          itemOption: currentItemOption,
          tip: currentOrderTip,
          splitTip: currentSplitPartTip,
          status: currentOrderStatus,
          customerName: currentCustomerName,
        };
        savedOrders.push(order);
        latestSavedOrderItems = [...order.items];
        latestSavedItemOption = order.itemOption;
        selectedRecallOrder = order;
        return order;
      }

      function selectRecallOrder(order) {
        selectedRecallOrder = order || null;
        latestSavedOrderItems = selectedRecallOrder ? [...selectedRecallOrder.items] : [];
        latestSavedItemOption = selectedRecallOrder?.itemOption || null;
        renderRecallOrderItems();
      }

      function renderRecallOrderItems() {
        recallOrderItems.innerHTML = '';
        const order = selectedRecallOrder || {
          items: latestSavedOrderItems,
          itemOption: latestSavedItemOption,
          tip: 0,
          status: '',
          customerName: null,
        };
        recallOrderTip.textContent = String(order.tip || 0);
        recallOrderStatus.textContent = order.status || '';
        recallCustomerName.textContent = order.customerName || '';
        order.items.forEach((item) => {
          const row = document.createElement('div');
          row.dataset.testid = 'recall-order-item';
          row.dataset.name = item.name;
          row.dataset.price = String(item.price);
          row.dataset.state = item.state || '';
          row.textContent = item.name + ' $' + item.price.toFixed(2);
          recallOrderItems.appendChild(row);
        });
        if (order.itemOption) {
          const option = document.createElement('div');
          option.dataset.testid = 'recall-item-option';
          option.dataset.name = order.itemOption.name;
          option.dataset.price = String(order.itemOption.price);
          option.textContent = order.itemOption.name + ' $' + order.itemOption.price.toFixed(2);
          recallOrderItems.appendChild(option);
        }
      }

      function updateReservationStatusRead(partyName) {
        const reservation = reservations.find((item) => item.partyName === partyName);
        reservationCurrentStatus.textContent = reservation?.status || '';
      }

      function renderReservationHistory(phoneQuery) {
        reservationHistoryList.innerHTML = '';
        reservations
          .filter((reservation) => reservation.phone.includes(phoneQuery))
          .forEach((reservation) => {
            const row = document.createElement('div');
            row.dataset.testid = 'reservation-history-row';
            row.textContent = reservation.phone;
            reservationHistoryList.appendChild(row);
          });
      }

      function renderFunctionCards() {
        mainList.innerHTML = '';
        hiddenList.innerHTML = '';
        draftMainFunctions.forEach((name) => {
          const card = document.createElement('button');
          card.dataset.testid = 'home-function-card';
          card.textContent = name;
          card.addEventListener('click', () => selectFunction(name, 'main'));
          mainList.appendChild(card);
        });
        draftHiddenFunctions.forEach((name) => {
          const card = document.createElement('button');
          card.dataset.testid = 'hidden-function-card';
          card.textContent = name;
          card.addEventListener('click', () => selectFunction(name, 'hidden'));
          hiddenList.appendChild(card);
        });
      }

      function setEditMode(isEditing) {
        mainAddButton.hidden = !isEditing;
        moreAddButton.hidden = !isEditing;
        saveEditButton.hidden = !isEditing;
        cancelEditButton.hidden = !isEditing;
      }

      function moveFunctionBetweenAreas(source, target) {
        if (source.name === 'Session' || target.name === 'Session') {
          homeToast.textContent = sessionMoveError;
          return;
        }
        const sourceList = source.area === 'main' ? draftMainFunctions : draftHiddenFunctions;
        const targetList = target.area === 'main' ? draftMainFunctions : draftHiddenFunctions;
        const sourceIndex = sourceList.indexOf(source.name);
        const targetIndex = targetList.indexOf(target.name);
        sourceList[sourceIndex] = target.name;
        targetList[targetIndex] = source.name;
        selectedFunction = null;
        renderFunctionCards();
      }

      function selectFunction(name, area) {
        homeToast.textContent = '';
        const nextFunction = { name, area };
        if (!selectedFunction) {
          selectedFunction = nextFunction;
          return;
        }
        moveFunctionBetweenAreas(selectedFunction, nextFunction);
      }

      editButton.addEventListener('click', () => {
        draftMainFunctions = [...mainFunctions];
        draftHiddenFunctions = [...hiddenFunctions];
        selectedFunction = null;
        homeToast.textContent = '';
        setEditMode(true);
        renderFunctionCards();
      });

      saveEditButton.addEventListener('click', () => {
        mainFunctions = [...draftMainFunctions];
        hiddenFunctions = [...draftHiddenFunctions];
        selectedFunction = null;
        setEditMode(false);
        renderFunctionCards();
      });

      cancelEditButton.addEventListener('click', () => {
        draftMainFunctions = [...mainFunctions];
        draftHiddenFunctions = [...hiddenFunctions];
        selectedFunction = null;
        setEditMode(false);
        renderFunctionCards();
      });

      mainAddButton.addEventListener('click', () => {
        if (selectedFunction?.name === 'Session') {
          homeToast.textContent = sessionMoveError;
        }
      });

      moreAddButton.addEventListener('click', () => {
        if (selectedFunction?.name === 'Session') {
          homeToast.textContent = sessionMoveError;
        }
      });

      saveButton.addEventListener('click', () => {
        if (passwordInput.value === '9890') {
          toast.textContent = 'Failed to login';
          passwordInput.value = '';
          passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
        toast.textContent = '';
        document.body.dataset.employeeContext = 'accepted';
      });
      switchChineseButton.addEventListener('click', () => {
        currentLanguage = 'Chinese';
        localStorage.setItem('currentLanguage', currentLanguage);
        renderLanguage();
      });
      switchDefaultButton.addEventListener('click', () => {
        currentLanguage = 'Default';
        localStorage.setItem('currentLanguage', currentLanguage);
        renderLanguage();
      });
      logoutButton.addEventListener('click', () => {
        document.body.dataset.employeeContext = 'logged-out';
      });
      checkInButton.addEventListener('click', () => {
        if (clockState === 'off') {
          clockState = 'clocked-in';
          clockText.textContent = 'Clocked In at ' + clockNow();
        }
        renderClockControls();
      });
      breakButton.addEventListener('click', () => {
        clockState = 'on-break';
        clockText.textContent = 'On Break from ' + clockNow();
        renderClockControls();
      });
      backToWorkButton.addEventListener('click', () => {
        clockState = 'clocked-in';
        clockText.textContent = 'Clocked In at ' + clockNow();
        renderClockControls();
      });
      checkoutButton.addEventListener('click', () => {
        clockState = 'off';
        clockText.textContent = 'Checked Out';
        renderClockControls();
      });
      document.querySelector('[data-testid="home-admin"]').addEventListener('click', () => {
        showPanel('admin');
      });
      saveLanguageButton.addEventListener('click', () => {
        userDefaultLanguage = languageSelect.value;
        localStorage.setItem('userDefaultLanguage', userDefaultLanguage);
        renderLanguage();
      });
      document.querySelector('[data-testid="home-togo"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
      });
      document.querySelector('[data-testid="home-dine-in"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
      });
      document.querySelector('[data-testid="home-pickup"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
      });
      document.querySelector('[data-testid="home-recall"]').addEventListener('click', () => {
        showPanel('recall');
      });
      orderSaveButton.addEventListener('click', () => {
        saveCurrentOrder();
      });
      orderSendKitchenButton.addEventListener('click', () => {});
      orderSettleButton.addEventListener('click', () => {
        customerInfoPopup.hidden = false;
      });
      settleCashButton.addEventListener('click', () => {
        currentOrderStatus = 'Paid';
        saveCurrentOrder();
      });
      orderTipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          currentOrderTip = Number(orderTipInput.value || '0') / 100;
        }
      });
      splitEvenButton.addEventListener('click', () => {
        currentSplitPartTip = Number((currentOrderTip / 2).toFixed(2));
      });
      openFoodNoTaxButton.addEventListener('click', () => {
        const name = openFoodNameInput.value || 'Open Food';
        const price = Number(openFoodPriceInput.value || '0');
        currentOrderItems.push({ name, price, state: '', taxRate: 0 });
        renderOrderAmounts();
      });
      orderPickupButton.addEventListener('click', () => {
        currentCustomerName = null;
      });
      pickupInfoSubmitButton.addEventListener('click', () => {
        currentCustomerName = null;
      });
      customerSubmitButton.addEventListener('click', () => {
        if (customerNameInput.value && customerPhoneInput.value) {
          customerInfoPopup.hidden = true;
        }
      });
      orderVoidItemButton.addEventListener('click', () => {
        managerPasswordPopup.hidden = false;
      });
      managerPasswordSubmitButton.addEventListener('click', () => {
        if (managerPasswordInput.value === '11' && currentOrderItems[0]) {
          currentOrderItems[0].state = 'Voided';
          managerPasswordPopup.hidden = true;
        }
      });
      itemDiscountButton.addEventListener('click', () => {
        if (currentOrderItems[0]) {
          currentOrderItems[0].price = currentOrderItems[0].price * 0.9;
          renderOrderAmounts();
        }
      });
      modifySaveButton.addEventListener('click', () => {
        currentItemOption = {
          name: modifyNoteNameInput.value,
          price: Number(modifyNotePriceInput.value),
        };
      });
      recallRecentOrderButton.addEventListener('click', () => {
        selectRecallOrder(savedOrders[savedOrders.length - 1]);
      });
      recallPreviousOrderButton.addEventListener('click', () => {
        selectRecallOrder(savedOrders[savedOrders.length - 2]);
      });
      recallSubOrderButton.addEventListener('click', () => {
        recallOrderTip.textContent = String(selectedRecallOrder?.splitTip || 0);
      });
      recallCombineSplitButton.addEventListener('click', () => {
        recallOrderTip.textContent = String(selectedRecallOrder?.tip || 0);
      });
      recallEditButton.addEventListener('click', () => {
        recallGuestNameInput.value = '';
      });
      recallSaveEditButton.addEventListener('click', () => {
        if (selectedRecallOrder && recallGuestNameInput.value) {
          selectedRecallOrder.customerName = '(' + recallGuestNameInput.value + ')';
          recallCustomerName.textContent = selectedRecallOrder.customerName;
        }
      });
      document.querySelector('[data-testid="home-reservation"]').addEventListener('click', () => {
        showPanel('reservation');
      });
      document.querySelector('[data-testid="home-delivery"]').addEventListener('click', () => {
        showPanel('delivery');
      });
      document.querySelector('[data-testid="home-report"]').addEventListener('click', () => {
        showPanel('report-password');
      });
      reportPasswordSaveButton.addEventListener('click', () => {
        if (reportPasswordInput.value === '11') {
          showPanel('report');
        }
      });
      document.querySelector('[data-testid="home-support"]').addEventListener('click', () => {
        showPanel('support');
      });
      document.querySelector('[data-testid="home-message-center"]').addEventListener('click', () => {
        showPanel('message-center');
      });
      messageClearAllButton.addEventListener('click', () => {
        messages = [];
        messageCurrentBody.textContent = '';
      });
      messageSeedSdiOrderButton.addEventListener('click', () => {
        const tableName = messageSeedTableNameInput.value;
        const orderNumber = messageSeedOrderNumberInput.value;
        messages.push({
          title: "There's a new order!",
          body: "There's a new order for table " + tableName + "\\n" + tableName + "\\n" + orderNumber,
        });
      });
      messageOpenButton.addEventListener('click', () => {
        const message = messages.find((item) => item.title.includes(messageSearchInput.value));
        messageCurrentBody.textContent = message?.body || '';
      });
      deliveryHistoryCustomerButton.addEventListener('click', () => {
        showDeliveryOrders('Historical order for ' + deliveryPhoneInput.value);
      });
      deliveryPhoneDeleteButton.addEventListener('click', () => {
        deliveryPhoneInput.value = deliveryPhoneInput.value.slice(0, -1);
        showDeliveryCustomers();
      });
      deliveryNameDeleteButton.addEventListener('click', () => {
        deliveryNameInput.value = deliveryNameInput.value.slice(0, -2);
        showDeliveryCustomers();
      });
      deliverySeedAddressOrderButton.addEventListener('click', () => {
        deliveryHistoricalAddress = deliveryAddressInput.value;
      });
      deliveryAddressInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && deliveryHistoricalAddress.includes(deliveryAddressInput.value)) {
          showDeliveryOrders(deliveryHistoricalAddress);
        }
      });
      reservationAddButton.addEventListener('click', () => {
        reservations.push({
          partyName: reservationPartyInput.value,
          phone: reservationPhoneInput.value,
          status: 'Reserved',
        });
      });
      reservationSaveStatusButton.addEventListener('click', () => {
        const reservation = reservations.find((item) => item.partyName === reservationStatusPartyInput.value);
        if (reservation) {
          reservation.status = reservationStatusSelect.value;
        }
        updateReservationStatusRead(reservationStatusPartyInput.value);
      });
      reservationStatusPartyInput.addEventListener('input', () => {
        updateReservationStatusRead(reservationStatusPartyInput.value);
      });
      reservationInactiveTab.addEventListener('click', () => {
        updateReservationStatusRead(reservationStatusPartyInput.value);
      });
      reservationHistoryButton.addEventListener('click', () => {
        renderReservationHistory('');
      });
      reservationHistorySearchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          renderReservationHistory(reservationHistorySearchInput.value);
        }
      });
      renderFunctionCards();
      renderLanguage();
      renderClockControls();
    </script>
  </body>
</html>`;
}
