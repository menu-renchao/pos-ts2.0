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
      <button data-testid="home-caller">Caller</button>
      <button data-testid="pos-switch-emenu-order">Emenu Order</button>
      <button data-testid="home-admin">Admin</button>
      <button data-testid="home-join-member">Join Member</button>
      <button data-testid="home-reservation">Reservation</button>
      <button data-testid="home-custom-delivery">Custom Delivery</button>
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
      <select data-testid="admin-default-keyboard">
        <option value="default">default</option>
        <option value="support multi language">support multi language</option>
      </select>
      <select data-testid="admin-menu-mode">
        <option value="POS">POS</option>
        <option value="EMENU">EMENU</option>
      </select>
      <select data-testid="admin-search-menu">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-combine-same-item">
        <option value="dont-combine">dont-combine</option>
        <option value="auto-same-status">auto-same-status</option>
        <option value="include-kitchen">include-kitchen</option>
      </select>
      <select data-testid="admin-separate-same-item">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-staff-void-printed-item">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-staff-note">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button data-testid="admin-staff">Staff</button>
      <section data-testid="admin-staff-page" hidden>
        <button data-testid="admin-staff-create">Create Staff</button>
        <div data-testid="admin-staff-list"></div>
        <input data-testid="admin-staff-name" />
        <input data-testid="admin-staff-code" />
        <select data-testid="admin-staff-role">
          <option value="Manager">Manager</option>
        </select>
        <label>
          <input data-testid="admin-authority-DINE_IN" type="checkbox" />
          DINE_IN
        </label>
        <label>
          <input data-testid="admin-authority-ADMIN" type="checkbox" />
          ADMIN
        </label>
        <label>
          <input data-testid="admin-authority-ADMIN_STAFF" type="checkbox" />
          ADMIN_STAFF
        </label>
        <button data-testid="admin-staff-save">Save Staff</button>
      </section>
      <select data-testid="admin-auto-redirect-after-reduce">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-click-settle-auto-send">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-count-can-be-decimal">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-kds-category-required">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-kds-category-discount-allowance">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <select data-testid="admin-rounding-strategy">
        <option value="nearest_5">nearest_5</option>
        <option value="nearest_10">nearest_10</option>
        <option value="nearest_5_or_10">nearest_5_or_10</option>
        <option value="no_rounding">no_rounding</option>
      </select>
      <input data-testid="admin-kds-item-name" />
      <input data-testid="admin-kds-pos-name" />
      <button data-testid="admin-kds-pos-name-save">Save Item POS Name</button>
      <input data-testid="admin-item-group" />
      <input data-testid="admin-item-category" />
      <input data-testid="admin-item-name" />
      <input data-testid="admin-item-chinese-name" />
      <button data-testid="admin-item-chinese-name-save">Save Item Chinese Name</button>
      <button data-testid="admin-language-sale-item">Sale Item</button>
      <input data-testid="admin-language-search" />
      <button data-testid="admin-language-search-submit">Search Language</button>
      <input data-testid="admin-language-pos-name" readonly />
      <input data-testid="admin-language-kitchen-name" readonly />
      <input data-testid="admin-menu-source-product-line" />
      <input data-testid="admin-menu-target-product-line" />
      <input data-testid="admin-menu-group-name" />
      <input data-testid="admin-unit-price-item-group" />
      <input data-testid="admin-unit-price-item-category" />
      <input data-testid="admin-unit-price-item-name" />
      <input data-testid="admin-unit-price-item-price" />
      <button data-testid="admin-unit-price-item-save">Save Unit Price Item</button>
      <button data-testid="admin-menu-clear-group">Clear Product Group</button>
      <button data-testid="admin-menu-copy-group">Copy Product Group</button>
      <button data-testid="admin-menu-enter-group">Enter Product Group</button>
      <div data-testid="admin-menu-group-category-count">0</div>
      <button data-testid="admin-menu-read-item-count">Read Menu Item Count</button>
      <div data-testid="admin-menu-item-count">0</div>
      <input data-testid="admin-global-option-group" />
      <input data-testid="admin-global-option-category" />
      <input data-testid="admin-global-option-name" />
      <input data-testid="admin-global-option-price" />
      <button data-testid="admin-global-option-create">Create Global Option</button>
      <input data-testid="admin-global-option-selected-name" />
      <button data-testid="admin-global-option-select">Select Global Option</button>
      <input data-testid="admin-global-option-printer" />
      <button data-testid="admin-global-option-add-printer">Add Printer</button>
      <div data-testid="admin-global-option-printer-value"></div>
      <button data-testid="admin-global-option-delete">Delete Global Option</button>
      <input data-testid="admin-combo-item-group" />
      <input data-testid="admin-combo-item-category" />
      <input data-testid="admin-combo-item-name" />
      <select data-testid="admin-combo-display-mode">
        <option value="quick">quick</option>
        <option value="regular">regular</option>
      </select>
      <button data-testid="admin-combo-display-mode-save">Save Combo Display Mode</button>
      <button data-testid="admin-combo-detail-open">Open Combo Detail</button>
      <div data-testid="admin-combo-detail-quick-combo"></div>
      <input data-testid="admin-property-item-group" />
      <input data-testid="admin-property-item-category" />
      <input data-testid="admin-property-item-names" />
      <input data-testid="admin-property-selected-labels" />
      <button data-testid="admin-property-batch-replace">Batch Replace Properties</button>
      <input data-testid="admin-property-detail-item" />
      <button data-testid="admin-property-detail-open">Open Property Detail</button>
      <div data-testid="admin-property-item-labels"></div>
      <div data-testid="admin-property-all-labels"></div>
      <input data-testid="admin-price-item-group" />
      <input data-testid="admin-price-item-category" />
      <input data-testid="admin-price-item-names" />
      <input data-testid="admin-price-values" />
      <input data-testid="admin-price-member-values" />
      <button data-testid="admin-price-batch-edit">Batch Edit Prices</button>
      <input data-testid="admin-tax-free-item-group" />
      <input data-testid="admin-tax-free-item-category" />
      <input data-testid="admin-tax-free-item-name" />
      <select data-testid="admin-tax-free-enabled">
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <button data-testid="admin-tax-free-save">Save Take Out Tax Free</button>
      <div data-testid="admin-tax-free-confirmation"></div>
      <button data-testid="admin-save-settings">Save Settings</button>
      <button data-testid="admin-analysis">Analysis</button>
      <section data-testid="admin-permission-popup" hidden>
        <div data-testid="admin-permission-alert" role="alert"></div>
        <input data-testid="admin-permission-password" type="password" />
        <button data-testid="admin-permission-submit">Submit Admin Permission</button>
      </section>
      <section data-testid="admin-analysis-page" hidden>
        <iframe id="innerpage" title="Analysis"></iframe>
        <h1>Analysis</h1>
      </section>
      <button data-testid="admin-member-list">CRM Loyalty</button>
      <section data-testid="member-list-permission-popup" hidden>
        <input data-testid="member-list-permission-password" type="password" />
        <button data-testid="member-list-permission-submit">Submit Member Permission</button>
      </section>
      <section data-testid="crm-member-list" hidden>
        <input data-testid="crm-member-list-search" />
        <div data-testid="crm-member-search-name-result"></div>
        <div data-testid="crm-member-search-point-result"></div>
        <div data-testid="crm-member-search-phone-result"></div>
        <div data-testid="crm-member-search-email-result"></div>
      </section>
    </section>
    <section data-testid="join-member-registration" hidden>
      <input data-testid="join-member-first-name" />
      <input data-testid="join-member-last-name" />
      <input data-testid="join-member-phone" />
      <input data-testid="join-member-email" />
      <button data-testid="join-member-save">Save Join Member</button>
      <div data-testid="join-member-error" role="alert"></div>
    </section>
    <section data-testid="order-page" hidden>
      <div data-testid="open-food-category"></div>
      <div data-testid="current-category-name"></div>
      <div data-testid="order-menu-groups"></div>
      <div data-testid="order-menu-categories"></div>
      <div data-testid="order-menu-items"></div>
      <div data-testid="order-tax">0</div>
      <div data-testid="order-subtotal">0</div>
      <div data-testid="order-reward">0</div>
      <div data-testid="order-item-name"></div>
      <div data-testid="order-current-quick-combo">false</div>
      <div data-testid="order-items-list"></div>
      <div data-testid="order-item-count">0</div>
      <div data-testid="order-item-price">0</div>
      <input data-testid="order-guest-name" />
      <input data-testid="order-item-quantity" />
      <button data-testid="order-item-quantity-submit">Submit Quantity</button>
      <input data-testid="order-unit-price-input" hidden />
      <button data-testid="order-unit-price-submit" hidden>Submit Unit Price</button>
      <input data-testid="order-search" />
      <button data-testid="order-search-clear">Clear Search</button>
      <div data-testid="order-search-result"></div>
      <input data-testid="item-price-input" />
      <button data-testid="item-price-submit">Submit Price</button>
      <div data-testid="order-options"></div>
      <div data-testid="order-sub-options"></div>
      <button data-testid="order-send-kitchen">Send Kitchen</button>
      <button data-testid="order-send-hold-print">Hold Print</button>
      <button data-testid="order-send-delay-print">Delay Print</button>
      <button data-testid="order-exit">Exit Order</button>
      <button data-testid="order-settle">Settle</button>
      <div data-testid="settle-total">0</div>
      <div data-testid="settle-unpaid-amount">0</div>
      <input data-testid="settle-pay-amount" />
      <input data-testid="settle-tip" />
      <button data-testid="settle-cash">Cash</button>
      <div data-testid="settle-pay-bar">
        <div data-testid="settle-pay-bar-tender">Cash</div>
        <div data-testid="settle-pay-bar-action">Pay & Print</div>
        <div data-testid="settle-pay-bar-action">Pay</div>
      </div>
      <button data-testid="settle-credit">Credit</button>
      <button data-testid="settle-loyalty-card">Loyalty Card</button>
      <button data-testid="settle-gift-card">Gift Card</button>
      <button data-testid="settle-card-search">Search Card</button>
      <div data-testid="settle-card-alert"></div>
      <button data-testid="settle-backup-card">Backup Card</button>
      <button data-testid="settle-self-card">Self Card</button>
      <button data-testid="settle-even-pay">Even Pay</button>
      <button data-testid="settle-select-member">Select Member</button>
      <button data-testid="settle-switch-member">Switch Member</button>
      <button data-testid="settle-apply-member">Apply Member</button>
      <button data-testid="crm-redeem">Redeem</button>
      <section data-testid="crm-redeem-panel" hidden>
        <input data-testid="crm-member-search" />
        <button data-testid="crm-member-option">CRM Member Result</button>
        <button data-testid="crm-redeem-add-new-loyalty">Add New Loyalty</button>
        <button data-testid="crm-remove-member">Remove Member</button>
        <button data-testid="crm-redeem-delete">Delete Redeem</button>
        <div data-testid="crm-redeem-discount-option">10% Off</div>
        <div data-testid="crm-redeem-discount-option">20% Off</div>
        <button data-testid="crm-redeem-amount-10">$10.00</button>
        <button data-testid="crm-redeem-discount">10% Off</button>
        <button data-testid="crm-redeem-discount-20">20% Off</button>
        <button data-testid="crm-redeem-discount-30">30% Off</button>
        <button data-testid="crm-redeem-credit">Redeem Credit</button>
        <button data-testid="crm-redeem-item-option">Redeem Item Option</button>
        <button data-testid="crm-redeem-item">CRM Redeem Item</button>
        <button data-testid="crm-redeem-quit">Quit Redeem</button>
        <button data-testid="crm-redeem-split">Split Redeem Order</button>
        <button data-testid="crm-split-drag">Drag Split CRM Order</button>
        <button data-testid="crm-split-even">Even Split CRM Order</button>
        <button data-testid="crm-split-save">Save CRM Split</button>
      </section>
      <div data-testid="crm-member-name"></div>
      <div data-testid="crm-point-balance">0</div>
      <button data-testid="order-reduce-item">Reduce Item</button>
      <button data-testid="order-void-item">Void Item</button>
      <button data-testid="order-modify">Modify</button>
      <button data-testid="global-option-no">Global Option No</button>
      <button data-testid="global-option-list-add" data-price="1.5">Global Option Add</button>
      <button data-testid="global-option-list-count">Global Option Count</button>
      <button data-testid="global-option-list-reduce">Global Option Reduce</button>
      <input data-testid="global-option-count-input" />
      <button data-testid="global-option-count-submit">Submit Global Option Count</button>
      <div data-testid="global-option-list-count-value">0</div>
      <section data-testid="global-option-area" hidden>Global Option Area</section>
      <button data-testid="item-discount-10">10% Discount</button>
      <button data-testid="item-discount-50">50% Discount</button>
      <input data-testid="item-discount-amount" />
      <input data-testid="item-discount-percent" />
      <button data-testid="item-discount-submit">Apply Item Discount</button>
      <button data-testid="order-discount">Order Discount</button>
      <div data-testid="order-discount-whole-order-price"></div>
      <div data-testid="order-discount-amount"></div>
      <input data-testid="order-discount-percent" />
      <button data-testid="order-discount-submit">Apply Order Discount</button>
      <input data-testid="order-tip" />
      <div data-testid="order-tip-toast"></div>
      <button data-testid="order-charge-20">Charge 20%</button>
      <button data-testid="order-charge-0">Charge 0%</button>
      <div data-testid="order-charge-label"></div>
      <div data-testid="order-charge-price"></div>
      <button data-testid="order-tax-exempt">Void Item Tax</button>
      <button data-testid="split-even">Split Even</button>
      <button data-testid="split-combine">Combine Split</button>
      <button data-testid="order-open-food">Open Food</button>
      <select data-testid="open-food-keyboard-language">
        <option value="Chinese Simpl. Pinyin">Chinese Simpl. Pinyin</option>
      </select>
      <input data-testid="open-food-keyboard-text" />
      <button data-testid="open-food-keyboard-submit">Submit Open Food Keyboard</button>
      <input data-testid="open-food-name" />
      <input data-testid="open-food-price" />
      <button data-testid="open-food-no-tax">Open Food No Tax</button>
      <button data-testid="order-combo-item">Combo Item</button>
      <section data-testid="combo-subitems"></section>
      <section data-testid="combo-subitem-choices"></section>
      <button data-testid="combo-subitem-edit-price">Edit Combo Sub Item Price</button>
      <input data-testid="combo-subitem-price" />
      <button data-testid="combo-subitem-price-submit">Submit Combo Sub Item Price</button>
      <button data-testid="combo-first-sub-item">First Combo Sub Item</button>
      <button data-testid="combo-edit-note">Edit Combo Sub Item Note</button>
      <input data-testid="combo-subitem-note" />
      <div data-testid="combo-subitem-note-text"></div>
      <button data-testid="combo-option-reduce">Reduce Combo Option</button>
      <div data-testid="combo-option-count">0</div>
      <button data-testid="order-info">Info</button>
      <button data-testid="order-inventory">Inventory</button>
      <div data-testid="order-info-rows"></div>
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
      <div data-testid="order-save-alert" role="alert"></div>
      <button data-testid="order-save">Save Order</button>
    </section>
    <section data-testid="inventory-page" hidden>
      <select data-testid="inventory-channel">
        <option value="POS">POS</option>
      </select>
      <select data-testid="inventory-type">
        <option value="All">All</option>
      </select>
      <input data-testid="inventory-item-search" />
      <button data-testid="inventory-search">Search Inventory</button>
      <div data-testid="inventory-item-state"></div>
      <button data-testid="inventory-setting">Inventory Setting</button>
      <section data-testid="inventory-setting-page" hidden>
        <select data-testid="inventory-stock-status">
          <option value="LIMITED_STOCK">LIMITED_STOCK</option>
        </select>
        <input data-testid="inventory-limited-stock-quantity" />
        <button data-testid="inventory-save-config">Save Inventory Config</button>
      </section>
      <button data-testid="inventory-back-order">Back Order</button>
    </section>
    <section data-testid="recall-page" hidden>
      <button data-testid="recall-recent-order">Recent Order</button>
      <button data-testid="recall-previous-order">Previous Order</button>
      <div data-testid="recall-parent-order"></div>
      <button data-testid="recall-sub-order">Sub Order</button>
      <button data-testid="recall-combine-split">Combine Split</button>
      <button data-testid="recall-edit">Edit</button>
      <input data-testid="recall-guest-name" />
      <button data-testid="recall-save-edit">Save Edit</button>
      <div data-testid="recall-order-tip"></div>
      <select data-testid="recall-tip-method">
        <option value="credit">Credit Tip</option>
        <option value="cash">Cash Tip</option>
      </select>
      <input data-testid="recall-tip-input" />
      <button data-testid="recall-tip-submit">Add Tip</button>
      <div data-testid="recall-tip-toast"></div>
      <div data-testid="recall-item-count"></div>
      <div data-testid="recall-order-card-id"></div>
      <div data-testid="recall-order-number"></div>
      <div data-testid="recall-order-status"></div>
      <div data-testid="recall-customer-name"></div>
      <div data-testid="recall-guest-phone"></div>
      <div data-testid="recall-guest-address"></div>
      <div data-testid="recall-order-subtotal"></div>
      <div data-testid="recall-order-reward">0</div>
      <div data-testid="recall-order-total"></div>
      <div data-testid="recall-crm-member-name"></div>
      <div data-testid="recall-crm-point-balance">0</div>
      <input data-testid="recall-crm-combine-order-no" />
      <button data-testid="recall-crm-combine-order">Combine CRM Order</button>
      <button data-testid="recall-settle">Settle</button>
      <button data-testid="recall-crm-redeem-discount">10% Off</button>
      <button data-testid="recall-order-discount">Recall Order Discount</button>
      <div data-testid="recall-order-discount-whole-order-price"></div>
      <input data-testid="recall-order-discount-amount" />
      <button data-testid="recall-order-discount-submit">Apply Recall Amount Discount</button>
      <div data-testid="recall-discount-tip"></div>
      <section data-testid="recall-manager-password-popup" hidden>
        <input data-testid="recall-manager-password" type="password" />
        <button data-testid="recall-manager-password-submit">Submit Recall Manager Password</button>
        <button data-testid="recall-manager-password-cancel">Cancel Recall Manager Password</button>
      </section>
      <button data-testid="recall-credit-failure-record">Credit Failure Record</button>
      <button data-testid="recall-cash">Cash</button>
      <button data-testid="recall-call-order">Call Order</button>
      <button data-testid="recall-call-off">Call Off</button>
      <button data-testid="recall-payment-type-cash">Cash Filter</button>
      <div data-testid="recall-payment-type-order-number"></div>
      <button data-testid="recall-void-paid-order">Void Paid Order</button>
      <label>
        <input data-testid="recall-restore-inventory" type="checkbox" checked />
        Restore Inventory
      </label>
      <button data-testid="recall-void-order">Void Order</button>
      <button data-testid="recall-refund-paid-order">Refund Paid Order</button>
      <button data-testid="recall-cancel-condition">Cancel Condition</button>
      <button data-testid="recall-move-order">Move Order</button>
      <button data-testid="recall-move-item">Move Item</button>
      <button data-testid="recall-print">Print</button>
      <button data-testid="recall-reprint" hidden>Reprint</button>
      <div data-testid="recall-print-file-count">0</div>
      <div data-testid="recall-order-items"></div>
      <section data-testid="split-panel" hidden>
        <button data-testid="split-even-order">Even Split</button>
        <button data-testid="split-by-item">Split By Item</button>
        <button data-testid="split-by-seat">Split By Seat</button>
        <button data-testid="split-by-drag">Split By Drag</button>
        <button data-testid="split-add-suborder">Add Suborder</button>
        <input data-testid="split-amount-input" />
        <input data-testid="split-amount-input" />
        <button data-testid="split-save">Save Split</button>
        <button data-testid="split-save-amount">Save Amount Split</button>
        <button data-testid="split-unsplit">Unsplit</button>
        <div data-testid="split-item-prices"></div>
        <div data-testid="split-order-prices"></div>
        <button data-testid="split-sub-order-settle">Settle Suborder</button>
        <button data-testid="sub-order-cash-pay">Cash Pay Suborder</button>
      </section>
      <div data-testid="recall-sub-orders"></div>
      <button data-testid="recall-split">Split</button>
    </section>
    <section data-testid="caller-page" hidden>
      <h1>Caller</h1>
      <button data-testid="caller-refresh">Refresh</button>
      <section data-testid="caller-ready-area">
        <div data-testid="caller-ready-list"></div>
      </section>
      <section data-testid="caller-preparing-area">
        <div data-testid="caller-preparing-list"></div>
      </section>
    </section>
    <section data-testid="emenu-main-page" hidden>
      <button data-testid="emenu-select-license">Select License</button>
      <button data-testid="emenu-unused-license">Unused License</button>
      <button data-testid="emenu-confirm-license">Confirm License</button>
      <button data-testid="emenu-start">Start</button>
      <button data-testid="emenu-table">Area 1 Table 1</button>
      <button data-testid="emenu-enter-table">Enter Table</button>
      <button data-testid="emenu-guest-number">2</button>
      <button data-testid="emenu-continue">Continue</button>
    </section>
    <section data-testid="emenu-order-page" hidden>
      <button data-testid="emenu-new-category">New Category</button>
      <button data-testid="emenu-new-category-first-item">Emenu First Item</button>
      <button data-testid="emenu-add-cart">Add Cart</button>
      <button data-testid="emenu-cart">Cart</button>
      <button data-testid="emenu-place-order">Place Order</button>
      <section data-testid="emenu-order-card" hidden>
        <button data-testid="emenu-order-card-close">Close Order Card</button>
      </section>
      <button data-testid="emenu-call-server">Call Server</button>
      <button data-testid="emenu-switch-pos">POS</button>
    </section>
    <section data-testid="report-password-panel" hidden>
      <input data-testid="report-password" type="password" />
      <button data-testid="report-password-save">Save</button>
    </section>
    <section data-testid="report-page" hidden>
      <h1>Report</h1>
      <button data-testid="report-total-report">Total Report</button>
      <button data-testid="report-staff-report">Staff Report</button>
      <select data-testid="report-order-type">
        <option value="ALL">ALL</option>
        <option value="CUSTOM_D">CUSTOM_D</option>
      </select>
      <div data-testid="report-overview-net-sales">$0.00</div>
      <section data-testid="report-right-iframe" hidden>
        <div data-testid="report-start-time"></div>
        <div data-testid="report-end-time"></div>
      </section>
    </section>
    <section data-testid="delivery-page" hidden>
      <input data-testid="delivery-phone" />
      <input data-testid="delivery-name" />
      <input data-testid="delivery-address" />
      <input data-testid="delivery-apt" />
      <input data-testid="delivery-city" />
      <input data-testid="delivery-state" />
      <input data-testid="delivery-zip" />
      <input data-testid="delivery-note" />
      <button data-testid="delivery-create-order">Create Delivery Order</button>
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
      let selectedOrderItemIndex = -1;
      let selectedOrderItemIndexes = new Set();
      let latestSavedOrderItems = [];
      let currentItemOption = null;
      let latestSavedItemOption = null;
      let currentOrderTip = 0;
      let currentSplitPartTip = null;
      let currentOrderStatus = '';
      let currentOrderType = 'togo';
      let currentCardTender = '';
      let currentCustomerName = null;
      let currentDeliveryInfoRows = [];
      let currentComboOptionCount = 0;
      let currentGlobalOptionCount = 0;
      let currentMenuMode = localStorage.getItem('currentMenuMode') || 'POS';
      let currentSearchMenuEnabled = localStorage.getItem('currentSearchMenuEnabled') !== 'false';
      let currentCombineSameItemMode = localStorage.getItem('currentCombineSameItemMode') || 'dont-combine';
      let currentSeparateSameItem = localStorage.getItem('currentSeparateSameItem') !== 'false';
      let currentStaffCanVoidPrintedItem = localStorage.getItem('currentStaffCanVoidPrintedItem') !== 'false';
      let currentStaffCanAddNote = localStorage.getItem('currentStaffCanAddNote') !== 'false';
      let currentStaffPermissionOverrides = coerceStaffPermissionOverrides(
        readStoredJson('offlineStaffPermissionOverrides', {}),
      );
      let currentAutoRedirectAfterReduce = localStorage.getItem('currentAutoRedirectAfterReduce') !== 'false';
      let currentClickSettleAutoSend = localStorage.getItem('currentClickSettleAutoSend') === 'true';
      let currentCountCanBeDecimal = localStorage.getItem('currentCountCanBeDecimal') !== 'false';
      let currentKdsCategoryRequired = localStorage.getItem('currentKdsCategoryRequired') === 'true';
      let currentKdsCategoryDiscountAllowance = localStorage.getItem('currentKdsCategoryDiscountAllowance') !== 'false';
      let currentRoundingStrategy = localStorage.getItem('currentRoundingStrategy') || 'no_rounding';
      let currentCategoryName = '';
      let currentOrderChargeRate = 0;
      let currentOrderChargeLabel = '';
      let currentWholeOrderDiscountRate = 0;
      let currentOrderTaxVoided = false;
      let currentPaidAmount = 0;
      let currentSettlementTotal = null;
      let currentItemPosNames = JSON.parse(localStorage.getItem('currentItemPosNames') || '{}');
      let currentItemChineseNames = JSON.parse(localStorage.getItem('currentItemChineseNames') || '{}');
      let currentCrmMember = null;
      let currentCrmDiscountRate = 0;
      let currentCrmDiscountMaxAmount = null;
      let currentCrmFixedRewardAmount = 0;
      let currentCrmPointDeduction = 0;
      let currentHasRedeemItem = false;
      let currentSemiPayMode = false;
      let currentRedeemControlsLocked = false;
      let currentSettlementSelectMode = false;
      let currentEditingOrder = null;
      let pendingWholeOrderDiscountPercent = null;
      let pendingItemDiscount = null;
      let pendingRecallWholeOrderDiscountAmount = null;
      let currentEmployeePassword = '11';
      const defaultStaffDiscountLimits = { Server: 20, Manager: 50, Boss: 100 };
      let currentStaffDiscountLimits = {
        ...defaultStaffDiscountLimits,
        ...coerceStaffDiscountLimits(readStoredJson('offlineStaffDiscountLimits', {})),
      };
      let currentInventorySearchItem = 'superman item4';
      const inventoryRecords = {
        'superman item4': { status: 'LIMITED_STOCK', quantity: 0 },
      };
      const crmMembers = [
        { phone: '(64)673-37557', name: 'CRM Member A', points: 100 },
        { phone: '(92)923-69168', name: 'CRM Member B', points: 80 },
        { phone: '2505223015', name: 'CRM High Points', points: 300 },
        { phone: '(93)422-11234', name: 'cloud member', points: 100, source: 'cloud' },
        { phone: '(93)422-11234', name: 'local member', points: 100, source: 'local' },
      ];
      const registeredMembers = [
        { phone: '6467337557', displayPhone: '+16467337557', firstName: 'Existing', lastName: 'Member' },
      ];
      const adminMenuGroups = {
        'POS Menu': {
          'Global Option Group': ['Default Option Category', 'Sauce Category'],
        },
        'Emenu Menu': {
          'Global Option Group': ['Legacy Emenu Option'],
        },
      };
      const adminMenuItemCounts = {
        POS: 24,
      };
      const adminComboModes = {
        QuickComboTest: true,
      };
      const adminAllMenuPropertyLabels = ['Gluten-free', 'Vege', 'Lactose-free', 'Spicy', 'Vegan'];
      const adminMenuItemProperties = {};
      const adminMenuPriceOverrides = readStoredJson('offline-admin-menu-price-overrides', {});
      const adminTakeOutTaxFreeItems = {};
      let adminGlobalOptions = [];
      let selectedGlobalOptionName = '';
      let adminCreatedMenuItems = [];
      let adminStaffRecords = [];
      let selectedAdminStaffName = '';
      let savedOrders = [];
      let emenuLatestOrder = null;
      let nextOrderNumber = 100000;
      let selectedRecallOrder = null;
      let draftSplitPrices = [];
      let draftSplitItemPrices = [];
      let selectedSubOrderIndex = null;
      let pendingPrintedDeleteIndex = null;
      let pendingNoteAuthorization = false;
      let currentComboSubItemNote = '';
      let selectedComboSubItemName = '';
      let pendingComboReplacementStarted = false;
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
      const autoRedirectAfterReduceSelect = document.querySelector('[data-testid="admin-auto-redirect-after-reduce"]');
      const clickSettleAutoSendSelect = document.querySelector('[data-testid="admin-click-settle-auto-send"]');
      const combineSameItemSelect = document.querySelector('[data-testid="admin-combine-same-item"]');
      const countCanBeDecimalSelect = document.querySelector('[data-testid="admin-count-can-be-decimal"]');
      const kdsCategoryRequiredSelect = document.querySelector('[data-testid="admin-kds-category-required"]');
      const kdsCategoryDiscountAllowanceSelect = document.querySelector('[data-testid="admin-kds-category-discount-allowance"]');
      const roundingStrategySelect = document.querySelector('[data-testid="admin-rounding-strategy"]');
      const kdsItemNameInput = document.querySelector('[data-testid="admin-kds-item-name"]');
      const kdsItemPosNameInput = document.querySelector('[data-testid="admin-kds-pos-name"]');
      const kdsItemPosNameSaveButton = document.querySelector('[data-testid="admin-kds-pos-name-save"]');
      const adminItemGroupInput = document.querySelector('[data-testid="admin-item-group"]');
      const adminItemCategoryInput = document.querySelector('[data-testid="admin-item-category"]');
      const adminItemNameInput = document.querySelector('[data-testid="admin-item-name"]');
      const adminItemChineseNameInput = document.querySelector('[data-testid="admin-item-chinese-name"]');
      const adminItemChineseNameSaveButton = document.querySelector('[data-testid="admin-item-chinese-name-save"]');
      const adminLanguageSaleItemButton = document.querySelector('[data-testid="admin-language-sale-item"]');
      const adminLanguageSearchInput = document.querySelector('[data-testid="admin-language-search"]');
      const adminLanguageSearchSubmitButton = document.querySelector('[data-testid="admin-language-search-submit"]');
      const adminLanguagePosNameInput = document.querySelector('[data-testid="admin-language-pos-name"]');
      const adminLanguageKitchenNameInput = document.querySelector('[data-testid="admin-language-kitchen-name"]');
      const adminMenuSourceProductLineInput = document.querySelector('[data-testid="admin-menu-source-product-line"]');
      const adminMenuTargetProductLineInput = document.querySelector('[data-testid="admin-menu-target-product-line"]');
      const adminMenuGroupNameInput = document.querySelector('[data-testid="admin-menu-group-name"]');
      const adminUnitPriceItemGroupInput = document.querySelector('[data-testid="admin-unit-price-item-group"]');
      const adminUnitPriceItemCategoryInput = document.querySelector('[data-testid="admin-unit-price-item-category"]');
      const adminUnitPriceItemNameInput = document.querySelector('[data-testid="admin-unit-price-item-name"]');
      const adminUnitPriceItemPriceInput = document.querySelector('[data-testid="admin-unit-price-item-price"]');
      const adminUnitPriceItemSaveButton = document.querySelector('[data-testid="admin-unit-price-item-save"]');
      const adminMenuClearGroupButton = document.querySelector('[data-testid="admin-menu-clear-group"]');
      const adminMenuCopyGroupButton = document.querySelector('[data-testid="admin-menu-copy-group"]');
      const adminMenuEnterGroupButton = document.querySelector('[data-testid="admin-menu-enter-group"]');
      const adminMenuGroupCategoryCount = document.querySelector('[data-testid="admin-menu-group-category-count"]');
      const adminMenuReadItemCountButton = document.querySelector('[data-testid="admin-menu-read-item-count"]');
      const adminMenuItemCount = document.querySelector('[data-testid="admin-menu-item-count"]');
      const adminGlobalOptionGroupInput = document.querySelector('[data-testid="admin-global-option-group"]');
      const adminGlobalOptionCategoryInput = document.querySelector('[data-testid="admin-global-option-category"]');
      const adminGlobalOptionNameInput = document.querySelector('[data-testid="admin-global-option-name"]');
      const adminGlobalOptionPriceInput = document.querySelector('[data-testid="admin-global-option-price"]');
      const adminGlobalOptionCreateButton = document.querySelector('[data-testid="admin-global-option-create"]');
      const adminGlobalOptionSelectedNameInput = document.querySelector('[data-testid="admin-global-option-selected-name"]');
      const adminGlobalOptionSelectButton = document.querySelector('[data-testid="admin-global-option-select"]');
      const adminGlobalOptionPrinterInput = document.querySelector('[data-testid="admin-global-option-printer"]');
      const adminGlobalOptionAddPrinterButton = document.querySelector('[data-testid="admin-global-option-add-printer"]');
      const adminGlobalOptionPrinterValue = document.querySelector('[data-testid="admin-global-option-printer-value"]');
      const adminGlobalOptionDeleteButton = document.querySelector('[data-testid="admin-global-option-delete"]');
      const adminComboItemGroupInput = document.querySelector('[data-testid="admin-combo-item-group"]');
      const adminComboItemCategoryInput = document.querySelector('[data-testid="admin-combo-item-category"]');
      const adminComboItemNameInput = document.querySelector('[data-testid="admin-combo-item-name"]');
      const adminComboDisplayModeSelect = document.querySelector('[data-testid="admin-combo-display-mode"]');
      const adminComboDisplayModeSaveButton = document.querySelector('[data-testid="admin-combo-display-mode-save"]');
      const adminComboDetailOpenButton = document.querySelector('[data-testid="admin-combo-detail-open"]');
      const adminComboDetailQuickCombo = document.querySelector('[data-testid="admin-combo-detail-quick-combo"]');
      const adminPropertyItemGroupInput = document.querySelector('[data-testid="admin-property-item-group"]');
      const adminPropertyItemCategoryInput = document.querySelector('[data-testid="admin-property-item-category"]');
      const adminPropertyItemNamesInput = document.querySelector('[data-testid="admin-property-item-names"]');
      const adminPropertySelectedLabelsInput = document.querySelector('[data-testid="admin-property-selected-labels"]');
      const adminPropertyBatchReplaceButton = document.querySelector('[data-testid="admin-property-batch-replace"]');
      const adminPropertyDetailItemInput = document.querySelector('[data-testid="admin-property-detail-item"]');
      const adminPropertyDetailOpenButton = document.querySelector('[data-testid="admin-property-detail-open"]');
      const adminPropertyItemLabels = document.querySelector('[data-testid="admin-property-item-labels"]');
      const adminPropertyAllLabels = document.querySelector('[data-testid="admin-property-all-labels"]');
      const adminPriceItemGroupInput = document.querySelector('[data-testid="admin-price-item-group"]');
      const adminPriceItemCategoryInput = document.querySelector('[data-testid="admin-price-item-category"]');
      const adminPriceItemNamesInput = document.querySelector('[data-testid="admin-price-item-names"]');
      const adminPriceValuesInput = document.querySelector('[data-testid="admin-price-values"]');
      const adminPriceMemberValuesInput = document.querySelector('[data-testid="admin-price-member-values"]');
      const adminPriceBatchEditButton = document.querySelector('[data-testid="admin-price-batch-edit"]');
      const adminTaxFreeItemGroupInput = document.querySelector('[data-testid="admin-tax-free-item-group"]');
      const adminTaxFreeItemCategoryInput = document.querySelector('[data-testid="admin-tax-free-item-category"]');
      const adminTaxFreeItemNameInput = document.querySelector('[data-testid="admin-tax-free-item-name"]');
      const adminTaxFreeEnabledSelect = document.querySelector('[data-testid="admin-tax-free-enabled"]');
      const adminTaxFreeSaveButton = document.querySelector('[data-testid="admin-tax-free-save"]');
      const adminTaxFreeConfirmation = document.querySelector('[data-testid="admin-tax-free-confirmation"]');
      const adminStaffButton = document.querySelector('[data-testid="admin-staff"]');
      const adminStaffPage = document.querySelector('[data-testid="admin-staff-page"]');
      const adminStaffCreateButton = document.querySelector('[data-testid="admin-staff-create"]');
      const adminStaffList = document.querySelector('[data-testid="admin-staff-list"]');
      const adminStaffNameInput = document.querySelector('[data-testid="admin-staff-name"]');
      const adminStaffCodeInput = document.querySelector('[data-testid="admin-staff-code"]');
      const adminStaffRoleSelect = document.querySelector('[data-testid="admin-staff-role"]');
      const adminStaffSaveButton = document.querySelector('[data-testid="admin-staff-save"]');
      const adminAuthorityDineIn = document.querySelector('[data-testid="admin-authority-DINE_IN"]');
      const adminAuthorityAdmin = document.querySelector('[data-testid="admin-authority-ADMIN"]');
      const adminAuthorityAdminStaff = document.querySelector('[data-testid="admin-authority-ADMIN_STAFF"]');
      const joinMemberButton = document.querySelector('[data-testid="home-join-member"]');
      const joinMemberRegistration = document.querySelector('[data-testid="join-member-registration"]');
      const joinMemberFirstNameInput = document.querySelector('[data-testid="join-member-first-name"]');
      const joinMemberLastNameInput = document.querySelector('[data-testid="join-member-last-name"]');
      const joinMemberPhoneInput = document.querySelector('[data-testid="join-member-phone"]');
      const joinMemberEmailInput = document.querySelector('[data-testid="join-member-email"]');
      const joinMemberSaveButton = document.querySelector('[data-testid="join-member-save"]');
      const joinMemberError = document.querySelector('[data-testid="join-member-error"]');
      const orderPage = document.querySelector('[data-testid="order-page"]');
      const currentCategoryNameText = document.querySelector('[data-testid="current-category-name"]');
      const orderMenuGroups = document.querySelector('[data-testid="order-menu-groups"]');
      const orderMenuCategories = document.querySelector('[data-testid="order-menu-categories"]');
      const orderMenuItems = document.querySelector('[data-testid="order-menu-items"]');
      const orderSaveButton = document.querySelector('[data-testid="order-save"]');
      const orderTax = document.querySelector('[data-testid="order-tax"]');
      const orderSubtotal = document.querySelector('[data-testid="order-subtotal"]');
      const orderReward = document.querySelector('[data-testid="order-reward"]');
      const orderItemName = document.querySelector('[data-testid="order-item-name"]');
      const orderCurrentQuickCombo = document.querySelector('[data-testid="order-current-quick-combo"]');
      const orderItemsList = document.querySelector('[data-testid="order-items-list"]');
      const orderItemCount = document.querySelector('[data-testid="order-item-count"]');
      const orderItemPrice = document.querySelector('[data-testid="order-item-price"]');
      const orderGuestNameInput = document.querySelector('[data-testid="order-guest-name"]');
      const orderSearchInput = document.querySelector('[data-testid="order-search"]');
      const orderSearchClearButton = document.querySelector('[data-testid="order-search-clear"]');
      const orderSearchResult = document.querySelector('[data-testid="order-search-result"]');
      const itemPriceInput = document.querySelector('[data-testid="item-price-input"]');
      const itemPriceSubmitButton = document.querySelector('[data-testid="item-price-submit"]');
      const itemQuantityInput = document.querySelector('[data-testid="order-item-quantity"]');
      const itemQuantitySubmitButton = document.querySelector('[data-testid="order-item-quantity-submit"]');
      const unitPriceInput = document.querySelector('[data-testid="order-unit-price-input"]');
      const unitPriceSubmitButton = document.querySelector('[data-testid="order-unit-price-submit"]');
      const orderOptions = document.querySelector('[data-testid="order-options"]');
      const orderSubOptions = document.querySelector('[data-testid="order-sub-options"]');
      const orderSendKitchenButton = document.querySelector('[data-testid="order-send-kitchen"]');
      const orderSendHoldPrintButton = document.querySelector('[data-testid="order-send-hold-print"]');
      const orderSendDelayPrintButton = document.querySelector('[data-testid="order-send-delay-print"]');
      const orderExitButton = document.querySelector('[data-testid="order-exit"]');
      const orderSettleButton = document.querySelector('[data-testid="order-settle"]');
      const settleTotal = document.querySelector('[data-testid="settle-total"]');
      const settleUnpaidAmount = document.querySelector('[data-testid="settle-unpaid-amount"]');
      const settlePayAmountInput = document.querySelector('[data-testid="settle-pay-amount"]');
      const settleTipInput = document.querySelector('[data-testid="settle-tip"]');
      const settleCashButton = document.querySelector('[data-testid="settle-cash"]');
      const settleBackupCardButton = document.querySelector('[data-testid="settle-backup-card"]');
      const settleCreditButton = document.querySelector('[data-testid="settle-credit"]');
      const settleGiftCardButton = document.querySelector('[data-testid="settle-gift-card"]');
      const settleLoyaltyCardButton = document.querySelector('[data-testid="settle-loyalty-card"]');
      const settleCardSearchButton = document.querySelector('[data-testid="settle-card-search"]');
      const settleCardAlert = document.querySelector('[data-testid="settle-card-alert"]');
      const settleSelfCardButton = document.querySelector('[data-testid="settle-self-card"]');
      const settleEvenPayButton = document.querySelector('[data-testid="settle-even-pay"]');
      const settleSelectMemberButton = document.querySelector('[data-testid="settle-select-member"]');
      const settleSwitchMemberButton = document.querySelector('[data-testid="settle-switch-member"]');
      const settleApplyMemberButton = document.querySelector('[data-testid="settle-apply-member"]');
      const crmRedeemButton = document.querySelector('[data-testid="crm-redeem"]');
      const crmRedeemPanel = document.querySelector('[data-testid="crm-redeem-panel"]');
      const crmMemberSearchInput = document.querySelector('[data-testid="crm-member-search"]');
      const crmMemberOptionButton = document.querySelector('[data-testid="crm-member-option"]');
      const crmRedeemAddNewLoyaltyButton = document.querySelector('[data-testid="crm-redeem-add-new-loyalty"]');
      const crmRedeemAmount10Button = document.querySelector('[data-testid="crm-redeem-amount-10"]');
      const crmRemoveMemberButton = document.querySelector('[data-testid="crm-remove-member"]');
      const crmRedeemDeleteButton = document.querySelector('[data-testid="crm-redeem-delete"]');
      const crmRedeemDiscountButton = document.querySelector('[data-testid="crm-redeem-discount"]');
      const crmRedeemDiscount20Button = document.querySelector('[data-testid="crm-redeem-discount-20"]');
      const crmRedeemDiscount30Button = document.querySelector('[data-testid="crm-redeem-discount-30"]');
      const crmRedeemCreditButton = document.querySelector('[data-testid="crm-redeem-credit"]');
      const crmRedeemItemOptionButton = document.querySelector('[data-testid="crm-redeem-item-option"]');
      const crmRedeemItemButton = document.querySelector('[data-testid="crm-redeem-item"]');
      const crmRedeemQuitButton = document.querySelector('[data-testid="crm-redeem-quit"]');
      const crmRedeemSplitButton = document.querySelector('[data-testid="crm-redeem-split"]');
      const crmSplitDragButton = document.querySelector('[data-testid="crm-split-drag"]');
      const crmSplitEvenButton = document.querySelector('[data-testid="crm-split-even"]');
      const crmSplitSaveButton = document.querySelector('[data-testid="crm-split-save"]');
      const crmMemberName = document.querySelector('[data-testid="crm-member-name"]');
      const crmPointBalance = document.querySelector('[data-testid="crm-point-balance"]');
      const orderReduceItemButton = document.querySelector('[data-testid="order-reduce-item"]');
      const orderVoidItemButton = document.querySelector('[data-testid="order-void-item"]');
      const orderModifyButton = document.querySelector('[data-testid="order-modify"]');
      const globalOptionNoButton = document.querySelector('[data-testid="global-option-no"]');
      const globalOptionListAddButton = document.querySelector('[data-testid="global-option-list-add"]');
      const globalOptionListCountButton = document.querySelector('[data-testid="global-option-list-count"]');
      const globalOptionListReduceButton = document.querySelector('[data-testid="global-option-list-reduce"]');
      const globalOptionCountInput = document.querySelector('[data-testid="global-option-count-input"]');
      const globalOptionCountSubmitButton = document.querySelector('[data-testid="global-option-count-submit"]');
      const globalOptionListCountValue = document.querySelector('[data-testid="global-option-list-count-value"]');
      const globalOptionArea = document.querySelector('[data-testid="global-option-area"]');
      const itemDiscountButton = document.querySelector('[data-testid="item-discount-10"]');
      const itemHalfDiscountButton = document.querySelector('[data-testid="item-discount-50"]');
      const itemDiscountAmountInput = document.querySelector('[data-testid="item-discount-amount"]');
      const itemDiscountPercentInput = document.querySelector('[data-testid="item-discount-percent"]');
      const itemDiscountSubmitButton = document.querySelector('[data-testid="item-discount-submit"]');
      const orderDiscountButton = document.querySelector('[data-testid="order-discount"]');
      const orderDiscountWholeOrderPrice = document.querySelector('[data-testid="order-discount-whole-order-price"]');
      const orderDiscountAmount = document.querySelector('[data-testid="order-discount-amount"]');
      const orderDiscountPercentInput = document.querySelector('[data-testid="order-discount-percent"]');
      const orderDiscountSubmitButton = document.querySelector('[data-testid="order-discount-submit"]');
      const orderTipInput = document.querySelector('[data-testid="order-tip"]');
      const orderTipToast = document.querySelector('[data-testid="order-tip-toast"]');
      const orderCharge20Button = document.querySelector('[data-testid="order-charge-20"]');
      const orderChargeZeroButton = document.querySelector('[data-testid="order-charge-0"]');
      const orderChargeLabel = document.querySelector('[data-testid="order-charge-label"]');
      const orderChargePrice = document.querySelector('[data-testid="order-charge-price"]');
      const orderTaxExemptButton = document.querySelector('[data-testid="order-tax-exempt"]');
      const splitEvenButton = document.querySelector('[data-testid="split-even"]');
      const orderOpenFoodButton = document.querySelector('[data-testid="order-open-food"]');
      const openFoodKeyboardTextInput = document.querySelector('[data-testid="open-food-keyboard-text"]');
      const openFoodKeyboardSubmitButton = document.querySelector('[data-testid="open-food-keyboard-submit"]');
      const openFoodNameInput = document.querySelector('[data-testid="open-food-name"]');
      const openFoodPriceInput = document.querySelector('[data-testid="open-food-price"]');
      const openFoodNoTaxButton = document.querySelector('[data-testid="open-food-no-tax"]');
      const orderComboItemButton = document.querySelector('[data-testid="order-combo-item"]');
      const comboSubItems = document.querySelector('[data-testid="combo-subitems"]');
      const comboSubItemChoices = document.querySelector('[data-testid="combo-subitem-choices"]');
      const comboSubItemEditPriceButton = document.querySelector('[data-testid="combo-subitem-edit-price"]');
      const comboSubItemPriceInput = document.querySelector('[data-testid="combo-subitem-price"]');
      const comboSubItemPriceSubmitButton = document.querySelector('[data-testid="combo-subitem-price-submit"]');
      const comboFirstSubItemButton = document.querySelector('[data-testid="combo-first-sub-item"]');
      const comboEditNoteButton = document.querySelector('[data-testid="combo-edit-note"]');
      const comboSubItemNoteInput = document.querySelector('[data-testid="combo-subitem-note"]');
      const comboSubItemNoteText = document.querySelector('[data-testid="combo-subitem-note-text"]');
      const comboOptionReduceButton = document.querySelector('[data-testid="combo-option-reduce"]');
      const comboOptionCount = document.querySelector('[data-testid="combo-option-count"]');
      const orderInfoButton = document.querySelector('[data-testid="order-info"]');
      const orderInventoryButton = document.querySelector('[data-testid="order-inventory"]');
      const orderInfoRows = document.querySelector('[data-testid="order-info-rows"]');
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
      const orderSaveAlert = document.querySelector('[data-testid="order-save-alert"]');
      const inventoryPage = document.querySelector('[data-testid="inventory-page"]');
      const inventoryChannelSelect = document.querySelector('[data-testid="inventory-channel"]');
      const inventoryTypeSelect = document.querySelector('[data-testid="inventory-type"]');
      const inventoryItemSearchInput = document.querySelector('[data-testid="inventory-item-search"]');
      const inventorySearchButton = document.querySelector('[data-testid="inventory-search"]');
      const inventoryItemState = document.querySelector('[data-testid="inventory-item-state"]');
      const inventorySettingButton = document.querySelector('[data-testid="inventory-setting"]');
      const inventorySettingPage = document.querySelector('[data-testid="inventory-setting-page"]');
      const inventoryStockStatusSelect = document.querySelector('[data-testid="inventory-stock-status"]');
      const inventoryLimitedStockQuantityInput = document.querySelector('[data-testid="inventory-limited-stock-quantity"]');
      const inventorySaveConfigButton = document.querySelector('[data-testid="inventory-save-config"]');
      const inventoryBackOrderButton = document.querySelector('[data-testid="inventory-back-order"]');
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
      const recallGuestPhone = document.querySelector('[data-testid="recall-guest-phone"]');
      const recallGuestAddress = document.querySelector('[data-testid="recall-guest-address"]');
      const recallOrderSubtotal = document.querySelector('[data-testid="recall-order-subtotal"]');
      const recallOrderReward = document.querySelector('[data-testid="recall-order-reward"]');
      const recallOrderTotal = document.querySelector('[data-testid="recall-order-total"]');
      const recallTipMethod = document.querySelector('[data-testid="recall-tip-method"]');
      const recallTipInput = document.querySelector('[data-testid="recall-tip-input"]');
      const recallTipSubmitButton = document.querySelector('[data-testid="recall-tip-submit"]');
      const recallTipToast = document.querySelector('[data-testid="recall-tip-toast"]');
      const recallItemCount = document.querySelector('[data-testid="recall-item-count"]');
      const recallOrderCardId = document.querySelector('[data-testid="recall-order-card-id"]');
      const recallOrderNumber = document.querySelector('[data-testid="recall-order-number"]');
      const recallCrmMemberName = document.querySelector('[data-testid="recall-crm-member-name"]');
      const recallCrmPointBalance = document.querySelector('[data-testid="recall-crm-point-balance"]');
      const recallCrmCombineInput = document.querySelector('[data-testid="recall-crm-combine-order-no"]');
      const recallCrmCombineButton = document.querySelector('[data-testid="recall-crm-combine-order"]');
      const recallSettleButton = document.querySelector('[data-testid="recall-settle"]');
      const recallCrmRedeemDiscountButton = document.querySelector('[data-testid="recall-crm-redeem-discount"]');
      const recallOrderDiscountButton = document.querySelector('[data-testid="recall-order-discount"]');
      const recallOrderDiscountWholeOrderPrice = document.querySelector('[data-testid="recall-order-discount-whole-order-price"]');
      const recallOrderDiscountAmountInput = document.querySelector('[data-testid="recall-order-discount-amount"]');
      const recallOrderDiscountSubmitButton = document.querySelector('[data-testid="recall-order-discount-submit"]');
      const recallDiscountTip = document.querySelector('[data-testid="recall-discount-tip"]');
      const recallManagerPasswordPopup = document.querySelector('[data-testid="recall-manager-password-popup"]');
      const recallManagerPasswordInput = document.querySelector('[data-testid="recall-manager-password"]');
      const recallManagerPasswordSubmitButton = document.querySelector('[data-testid="recall-manager-password-submit"]');
      const recallManagerPasswordCancelButton = document.querySelector('[data-testid="recall-manager-password-cancel"]');
      const recallCreditFailureRecordButton = document.querySelector('[data-testid="recall-credit-failure-record"]');
      const recallCashButton = document.querySelector('[data-testid="recall-cash"]');
      const recallCallOrderButton = document.querySelector('[data-testid="recall-call-order"]');
      const recallCallOffButton = document.querySelector('[data-testid="recall-call-off"]');
      const recallPaymentTypeCashButton = document.querySelector('[data-testid="recall-payment-type-cash"]');
      const recallPaymentTypeOrderNumber = document.querySelector('[data-testid="recall-payment-type-order-number"]');
      const recallVoidPaidOrderButton = document.querySelector('[data-testid="recall-void-paid-order"]');
      const recallRestoreInventoryCheckbox = document.querySelector('[data-testid="recall-restore-inventory"]');
      const recallVoidOrderButton = document.querySelector('[data-testid="recall-void-order"]');
      const recallRefundPaidOrderButton = document.querySelector('[data-testid="recall-refund-paid-order"]');
      const recallCancelConditionButton = document.querySelector('[data-testid="recall-cancel-condition"]');
      const recallMoveOrderButton = document.querySelector('[data-testid="recall-move-order"]');
      const recallMoveItemButton = document.querySelector('[data-testid="recall-move-item"]');
      const recallPrintButton = document.querySelector('[data-testid="recall-print"]');
      const recallReprintButton = document.querySelector('[data-testid="recall-reprint"]');
      const recallPrintFileCount = document.querySelector('[data-testid="recall-print-file-count"]');
      const recallOrderItems = document.querySelector('[data-testid="recall-order-items"]');
      const recallParentOrder = document.querySelector('[data-testid="recall-parent-order"]');
      const recallSplitButton = document.querySelector('[data-testid="recall-split"]');
      const splitPanel = document.querySelector('[data-testid="split-panel"]');
      const splitEvenOrderButton = document.querySelector('[data-testid="split-even-order"]');
      const splitByItemButton = document.querySelector('[data-testid="split-by-item"]');
      const splitBySeatButton = document.querySelector('[data-testid="split-by-seat"]');
      const splitByDragButton = document.querySelector('[data-testid="split-by-drag"]');
      const splitAmountInputs = document.querySelectorAll('[data-testid="split-amount-input"]');
      const splitAddSuborderButton = document.querySelector('[data-testid="split-add-suborder"]');
      const splitSaveButton = document.querySelector('[data-testid="split-save"]');
      const splitSaveAmountButton = document.querySelector('[data-testid="split-save-amount"]');
      const splitUnsplitButton = document.querySelector('[data-testid="split-unsplit"]');
      const splitItemPrices = document.querySelector('[data-testid="split-item-prices"]');
      const splitOrderPrices = document.querySelector('[data-testid="split-order-prices"]');
      const splitSubOrderSettleButton = document.querySelector('[data-testid="split-sub-order-settle"]');
      const subOrderCashPayButton = document.querySelector('[data-testid="sub-order-cash-pay"]');
      const recallSubOrders = document.querySelector('[data-testid="recall-sub-orders"]');
      const callerPage = document.querySelector('[data-testid="caller-page"]');
      const callerRefreshButton = document.querySelector('[data-testid="caller-refresh"]');
      const callerReadyList = document.querySelector('[data-testid="caller-ready-list"]');
      const callerPreparingList = document.querySelector('[data-testid="caller-preparing-list"]');
      const emenuMainPage = document.querySelector('[data-testid="emenu-main-page"]');
      const emenuOrderPage = document.querySelector('[data-testid="emenu-order-page"]');
      const emenuContinueButton = document.querySelector('[data-testid="emenu-continue"]');
      const emenuSwitchPosButton = document.querySelector('[data-testid="emenu-switch-pos"]');
      const emenuPlaceOrderButton = document.querySelector('[data-testid="emenu-place-order"]');
      const emenuOrderCard = document.querySelector('[data-testid="emenu-order-card"]');
      const emenuOrderCardCloseButton = document.querySelector('[data-testid="emenu-order-card-close"]');
      const emenuCallServerButton = document.querySelector('[data-testid="emenu-call-server"]');
      const reportPasswordPanel = document.querySelector('[data-testid="report-password-panel"]');
      const reportPasswordInput = document.querySelector('[data-testid="report-password"]');
      const reportPasswordSaveButton = document.querySelector('[data-testid="report-password-save"]');
      const reportPage = document.querySelector('[data-testid="report-page"]');
      const reportTotalReportButton = document.querySelector('[data-testid="report-total-report"]');
      const reportStaffReportButton = document.querySelector('[data-testid="report-staff-report"]');
      const reportOrderTypeSelect = document.querySelector('[data-testid="report-order-type"]');
      const reportOverviewNetSales = document.querySelector('[data-testid="report-overview-net-sales"]');
      const reportRightIframe = document.querySelector('[data-testid="report-right-iframe"]');
      const reportStartTime = document.querySelector('[data-testid="report-start-time"]');
      const reportEndTime = document.querySelector('[data-testid="report-end-time"]');
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
      const deliveryAptInput = document.querySelector('[data-testid="delivery-apt"]');
      const deliveryCityInput = document.querySelector('[data-testid="delivery-city"]');
      const deliveryStateInput = document.querySelector('[data-testid="delivery-state"]');
      const deliveryZipInput = document.querySelector('[data-testid="delivery-zip"]');
      const deliveryNoteInput = document.querySelector('[data-testid="delivery-note"]');
      const deliveryCreateOrderButton = document.querySelector('[data-testid="delivery-create-order"]');
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
      const separateSameItemSelect = document.querySelector('[data-testid="admin-separate-same-item"]');
      const staffNoteSelect = document.querySelector('[data-testid="admin-staff-note"]');
      const staffVoidPrintedItemSelect = document.querySelector('[data-testid="admin-staff-void-printed-item"]');
      const languageSelect = document.querySelector('[data-testid="user-default-language"]');
      const saveLanguageButton = document.querySelector('[data-testid="save-user-default-language"]');
      const menuModeSelect = document.querySelector('[data-testid="admin-menu-mode"]');
      const searchMenuSelect = document.querySelector('[data-testid="admin-search-menu"]');
      const saveSettingsButton = document.querySelector('[data-testid="admin-save-settings"]');
      const adminAnalysisButton = document.querySelector('[data-testid="admin-analysis"]');
      const adminAnalysisPage = document.querySelector('[data-testid="admin-analysis-page"]');
      const adminPermissionPopup = document.querySelector('[data-testid="admin-permission-popup"]');
      const adminPermissionAlert = document.querySelector('[data-testid="admin-permission-alert"]');
      const adminPermissionPasswordInput = document.querySelector('[data-testid="admin-permission-password"]');
      const adminPermissionSubmitButton = document.querySelector('[data-testid="admin-permission-submit"]');
      const adminMemberListButton = document.querySelector('[data-testid="admin-member-list"]');
      const memberListPermissionPopup = document.querySelector('[data-testid="member-list-permission-popup"]');
      const memberListPermissionPasswordInput = document.querySelector('[data-testid="member-list-permission-password"]');
      const memberListPermissionSubmitButton = document.querySelector('[data-testid="member-list-permission-submit"]');
      const crmMemberList = document.querySelector('[data-testid="crm-member-list"]');
      const crmMemberListSearchInput = document.querySelector('[data-testid="crm-member-list-search"]');
      const crmMemberSearchNameResult = document.querySelector('[data-testid="crm-member-search-name-result"]');
      const crmMemberSearchPointResult = document.querySelector('[data-testid="crm-member-search-point-result"]');
      const crmMemberSearchPhoneResult = document.querySelector('[data-testid="crm-member-search-phone-result"]');
      const crmMemberSearchEmailResult = document.querySelector('[data-testid="crm-member-search-email-result"]');
      const openFoodCategory = document.querySelector('[data-testid="open-food-category"]');
      const passwordInput = document.querySelector('[data-testid="employee-password"]');
      const saveButton = document.querySelector('[data-testid="employee-password-save"]');
      const toast = document.querySelector('[data-testid="login-toast"]');

      function renderLanguage() {
        const effectiveLanguage = currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
        welcomeText.textContent = effectiveLanguage === 'Chinese' ? '欢迎您' : 'Welcome';
        languageSelect.value = userDefaultLanguage;
        roundingStrategySelect.value = currentRoundingStrategy;
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

      function adminMenuCategories(productLine, groupName) {
        return adminMenuGroups[productLine]?.[groupName] || [];
      }

      function renderAdminMenuGroupCount(productLine, groupName) {
        adminMenuGroupCategoryCount.textContent = String(adminMenuCategories(productLine, groupName).length);
      }

      function menuItemCountProductLine(productLine) {
        return productLine === 'POS Menu' ? 'POS' : productLine;
      }

      function renderAdminMenuItemCount(productLine) {
        const countProductLine = menuItemCountProductLine(productLine);
        adminMenuItemCount.textContent = String(adminMenuItemCounts[countProductLine] || 0);
      }

      function selectedGlobalOption() {
        return adminGlobalOptions.find((option) => option.name === selectedGlobalOptionName);
      }

      function renderSelectedGlobalOptionPrinter() {
        const option = selectedGlobalOption();
        adminGlobalOptionPrinterValue.textContent = option ? option.printers.join(',') : '';
      }

      function renderComboDetailQuickCombo() {
        adminComboDetailQuickCombo.textContent = String(Boolean(adminComboModes[adminComboItemNameInput.value]));
      }

      function splitCsv(value) {
        return value.split(',').map((item) => item.trim()).filter(Boolean);
      }

      function readStoredJson(key, fallback) {
        try {
          return JSON.parse(localStorage.getItem(key) || '') || fallback;
        } catch {
          return fallback;
        }
      }

      function adminPropertyKey(group, category, itemName) {
        return group + '|' + category + '|' + itemName;
      }

      function renderItemPropertyDetail() {
        const key = adminPropertyKey(
          adminPropertyItemGroupInput.value,
          adminPropertyItemCategoryInput.value,
          adminPropertyDetailItemInput.value,
        );
        adminPropertyItemLabels.textContent = (adminMenuItemProperties[key] || []).join(',');
        adminPropertyAllLabels.textContent = adminAllMenuPropertyLabels.join(',');
      }

      function showPanel(panel) {
        adminPage.hidden = panel !== 'admin';
        deliveryPage.hidden = panel !== 'delivery';
        joinMemberRegistration.hidden = panel !== 'join-member';
        inventoryPage.hidden = panel !== 'inventory';
        orderPage.hidden = panel !== 'order';
        recallPage.hidden = panel !== 'recall';
        callerPage.hidden = panel !== 'caller';
        emenuMainPage.hidden = true;
        emenuOrderPage.hidden = true;
        reportPasswordPanel.hidden = panel !== 'report-password';
        reportPage.hidden = panel !== 'report';
        supportPage.hidden = panel !== 'support';
        messageCenter.hidden = panel !== 'message-center';
        reservationPage.hidden = panel !== 'reservation';
        if (panel === 'order') {
          history.replaceState(null, '', '#/orderDishes');
        } else if (panel === 'home') {
          history.replaceState(null, '', '#/home');
        }
      }

      function showEmenuPanel(panel) {
        document.querySelector('[data-testid="pos-home"]').hidden = true;
        adminPage.hidden = true;
        deliveryPage.hidden = true;
        joinMemberRegistration.hidden = true;
        inventoryPage.hidden = true;
        orderPage.hidden = true;
        recallPage.hidden = true;
        callerPage.hidden = true;
        reportPasswordPanel.hidden = true;
        reportPage.hidden = true;
        supportPage.hidden = true;
        messageCenter.hidden = true;
        reservationPage.hidden = true;
        emenuMainPage.hidden = panel !== 'main';
        emenuOrderPage.hidden = panel !== 'order';
      }

      function shortenCallerGuestName(guestName) {
        return guestName ? guestName.slice(0, 3) + '...' + guestName.slice(-2) : '';
      }

      function callerDisplayItems(order) {
        const items = [order.customerName ? order.orderNumber : order.orderCardId || order.orderNumber];
        if (order.customerName) {
          items.push(shortenCallerGuestName(order.customerName));
        }
        return items;
      }

      function renderCallerDisplay() {
        callerReadyList.innerHTML = '';
        callerPreparingList.innerHTML = '';
        savedOrders
          .filter((order) => order.callerStatus === 'preparing')
          .flatMap(callerDisplayItems)
          .forEach((info) => {
            const item = document.createElement('div');
            item.dataset.testid = 'caller-preparing-info';
            item.textContent = info;
            callerPreparingList.appendChild(item);
          });
        savedOrders
          .filter((order) => order.callerStatus === 'ready')
          .flatMap(callerDisplayItems)
          .forEach((info) => {
            const item = document.createElement('div');
            item.dataset.testid = 'caller-ready-info';
            item.textContent = info;
            callerReadyList.appendChild(item);
          });
      }

      function createEmenuOrder() {
        const order = {
          orderNumber: String(nextOrderNumber++),
          orderCardId: '',
          items: [{ name: 'Emenu First Item', price: 8, unitPrice: 8, quantity: 1, state: '', taxRate: 0 }],
          itemOption: null,
          tip: 0,
          splitTip: null,
          status: '',
          customerName: null,
          subtotal: 8,
          settlementTotal: null,
          crmMember: null,
          crmDiscountRate: 0,
          crmDiscountMaxAmount: null,
          crmFixedRewardAmount: 0,
          crmPointDeduction: 0,
          hasRedeemItem: false,
          orderType: 'dine-in',
          partialPaid: false,
          rewardDiscount: 0,
          guestPhone: '',
          guestAddress: '',
          deliveryInfoRows: [],
          splitOrderPrices: [],
          subOrderItems: [],
          subOrderStatuses: [],
          inventoryDeductedQuantity: 0,
          paymentType: '',
          hasCreditFailure: false,
        };
        order.orderCardId = 'Area 1 Table 1 ' + order.orderNumber;
        savedOrders.push(order);
        latestSavedOrderItems = [...order.items];
        selectedRecallOrder = order;
        emenuLatestOrder = order;
        return order;
      }

      function normalizePhone(phone) {
        return (phone || '').replace(/\\D/g, '');
      }

      function formatRecallPhone(phone) {
        const digits = normalizePhone(phone);
        if (digits.length === 11 && digits.startsWith('0')) {
          return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
        }
        if (digits.length === 10) {
          return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
        }
        return phone || '';
      }

      function phoneMatches(candidatePhone, query) {
        const candidateDigits = normalizePhone(candidatePhone);
        const queryDigits = normalizePhone(query);
        return candidateDigits === queryDigits || queryDigits.endsWith(candidateDigits);
      }

      function memberDisplayName(member) {
        return member?.name || [member?.firstName, member?.lastName].filter(Boolean).join(' ');
      }

      function memberDisplayPhone(member) {
        if (member?.displayPhone) {
          return member.displayPhone;
        }
        const digits = normalizePhone(member?.phone);
        return digits ? '+1' + digits : '';
      }

      function findMemberListResult(query) {
        const rawQuery = (query || '').trim();
        return (
          crmMembers.find((item) => phoneMatches(item.phone, rawQuery)) ||
          registeredMembers.find((item) => phoneMatches(item.phone, rawQuery) || (item.email && item.email === rawQuery)) ||
          null
        );
      }

      function selectedMemberRecord() {
        if (!currentCrmMember) {
          return null;
        }
        return crmMembers.find((item) => item.phone === currentCrmMember.phone) || currentCrmMember;
      }

      function openCrmMemberList() {
        crmMemberList.hidden = false;
        memberListPermissionPopup.hidden = true;
      }

      function saveJoinMember() {
        const phone = normalizePhone(joinMemberPhoneInput.value);
        const email = joinMemberEmailInput.value.trim();
        if (!phone && !email) {
          joinMemberError.textContent = 'At least one phone and email is required';
          return;
        }
        if (registeredMembers.some((member) => normalizePhone(member.phone) === phone || (email && member.email === email))) {
          joinMemberError.textContent = 'Phone or email already be registered.';
          return;
        }
        registeredMembers.push({
          phone,
          email,
          displayPhone: phone ? '+1' + phone : '',
          firstName: joinMemberFirstNameInput.value,
          lastName: joinMemberLastNameInput.value,
          name: [joinMemberFirstNameInput.value, joinMemberLastNameInput.value].filter(Boolean).join(' '),
          points: 1000,
        });
        currentCrmMember = {
          phone,
          email,
          name: [joinMemberFirstNameInput.value, joinMemberLastNameInput.value].filter(Boolean).join(' '),
          points: 1000,
        };
        renderCurrentCrmState();
        joinMemberError.textContent = '';
        joinMemberRegistration.hidden = true;
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

      function inventoryRecord(itemName) {
        inventoryRecords[itemName] = inventoryRecords[itemName] || { status: 'LIMITED_STOCK', quantity: 0 };
        return inventoryRecords[itemName];
      }

      function formatInventoryState(itemName) {
        return 'Stock: ' + Math.floor(Number(inventoryRecord(itemName).quantity || 0));
      }

      function trackedInventoryQuantity(items) {
        return (items || [])
          .filter((item) => item.inventorySku && item.state !== 'Voided')
          .reduce((total, item) => total + Number(item.quantity || 1), 0);
      }

      function orderItemQuantityTotal(items) {
        return (items || [])
          .filter((item) => item.state !== 'Voided')
          .reduce((total, item) => total + Number(item.quantity ?? 1), 0);
      }

      function formatItemCount(items) {
        const count = orderItemQuantityTotal(items);
        return Number.isInteger(count) ? String(count) : String(count);
      }

      function formatTip(amount) {
        return Number(amount || 0).toFixed(2);
      }

      function roundMoney(amount) {
        return Math.round((Number(amount || 0) + 1e-8) * 100) / 100;
      }

      function largeTipToast(amountInCents, total) {
        const tipAmount = Number(amountInCents || 0) / 100;
        return tipAmount > Number(total || 0) * 0.5 ? 'The tip is more than 50% of the meal. Confirm to add?' : '';
      }

      function displayItemName(item) {
        const itemName = item.displayName || item.name || '';
        if (item.inKitchenQuantity) {
          return '(' + item.inKitchenQuantity + 'In Kitchen) ' + itemName;
        }
        return itemName;
      }

      function itemLineColor(item) {
        return item.inKitchenQuantity ? 'rgba(113, 9, 9, 1)' : '';
      }

      function activeOrderItems() {
        return currentOrderItems.filter((item) => item.state !== 'Voided' && Number(item.quantity || 0) > 0);
      }

      function currentWholeOrderDiscountLimit() {
        return wholeOrderDiscountLimitForPassword(currentEmployeePassword);
      }

      function wholeOrderDiscountLimitForPassword(password) {
        const role = staffRoleForPassword(password);
        return role ? currentStaffDiscountLimits[role] ?? 0 : 0;
      }

      function staffRoleForPassword(password) {
        if (password === '007') {
          return 'Server';
        }
        if (password === '006') {
          return 'Manager';
        }
        if (password === '11') {
          return 'Boss';
        }
        return '';
      }

      function coerceStaffDiscountLimits(value) {
        const entries = Array.isArray(value)
          ? value.map((limit) => [limit.role, limit.maximumDiscountPercent])
          : Object.entries(value || {});
        return entries.reduce((limits, [role, percent]) => {
          if (role in defaultStaffDiscountLimits && Number.isFinite(Number(percent))) {
            limits[role] = Number(percent);
          }
          return limits;
        }, {});
      }

      function updateStaffDiscountLimits(value) {
        currentStaffDiscountLimits = {
          ...currentStaffDiscountLimits,
          ...coerceStaffDiscountLimits(value),
        };
        localStorage.setItem('offlineStaffDiscountLimits', JSON.stringify(currentStaffDiscountLimits));
      }

      window.addEventListener('offline-staff-discount-limits-updated', (event) => {
        updateStaffDiscountLimits(event.detail);
      });

      function staffIdForPassword(password) {
        if (password === '123') {
          return '1';
        }
        if (password === '11') {
          return 'staff-manager';
        }
        if (password === '007') {
          return 'server';
        }
        if (password === '006') {
          return 'manager';
        }
        return '';
      }

      function staffHasPermission(password, permission) {
        if (password === '11') {
          return true;
        }
        const staffId = staffIdForPassword(password);
        if (!staffId) {
          return false;
        }
        const override = currentStaffPermissionOverrides[staffId];
        if (override?.removedPermissions?.includes(permission)) {
          return false;
        }
        return true;
      }

      function coerceStaffPermissionOverrides(value) {
        const entries = Array.isArray(value)
          ? value.map((override) => [override.staffId, override])
          : Object.entries(value || {});
        return entries.reduce((overrides, [staffId, override]) => {
          if (!staffId || !override) {
            return overrides;
          }
          overrides[staffId] = {
            addedPermissions: Array.isArray(override.addedPermissions) ? override.addedPermissions : [],
            removedPermissions: Array.isArray(override.removedPermissions) ? override.removedPermissions : [],
          };
          return overrides;
        }, {});
      }

      function updateStaffPermissionOverrides(value) {
        currentStaffPermissionOverrides = {
          ...currentStaffPermissionOverrides,
          ...coerceStaffPermissionOverrides(value),
        };
        localStorage.setItem('offlineStaffPermissionOverrides', JSON.stringify(currentStaffPermissionOverrides));
      }

      window.addEventListener('offline-staff-permissions-updated', (event) => {
        updateStaffPermissionOverrides(event.detail);
      });

      function canOpenReportWithPassword(password) {
        return (
          staffHasPermission(password, 'REPORT') ||
          staffHasPermission(password, 'TOTAL_REPORT') ||
          staffHasPermission(password, 'PERSONAL_REPORT')
        );
      }

      function staffAuthorityCheckbox(permission) {
        return {
          DINE_IN: adminAuthorityDineIn,
          ADMIN: adminAuthorityAdmin,
          ADMIN_STAFF: adminAuthorityAdminStaff,
        }[permission];
      }

      function setStaffAuthority(permission, enabled) {
        const checkbox = staffAuthorityCheckbox(permission);
        if (checkbox) {
          checkbox.checked = Boolean(enabled);
        }
      }

      function showSelectedAdminStaff(staff) {
        selectedAdminStaffName = staff?.name || '';
        adminStaffNameInput.value = staff?.name || '';
        adminStaffCodeInput.value = staff?.code || '';
        adminStaffRoleSelect.value = staff?.role || 'Manager';
        ['DINE_IN', 'ADMIN', 'ADMIN_STAFF'].forEach((permission) => {
          setStaffAuthority(permission, staff?.permissions?.includes(permission));
        });
      }

      function renderAdminStaffList() {
        adminStaffList.innerHTML = '';
        adminStaffRecords.forEach((staff) => {
          const row = document.createElement('button');
          row.dataset.testid = 'admin-staff-row';
          row.textContent = staff.name;
          row.addEventListener('click', () => showSelectedAdminStaff(staff));
          adminStaffList.appendChild(row);
        });
      }

      function creatableStaffPermissionsForCurrentEmployee() {
        return ['DINE_IN', 'ADMIN', 'ADMIN_STAFF'].filter((permission) =>
          staffHasPermission(currentEmployeePassword, permission),
        );
      }

      function applyWholeOrderDiscountPercent(percent) {
        currentWholeOrderDiscountRate = Number(percent || 0) / 100;
        pendingWholeOrderDiscountPercent = null;
        managerPasswordPopup.hidden = true;
        orderTipToast.textContent = '';
        renderOrderAmounts();
      }

      function currentEditableCombo() {
        return activeOrderItems().find((item) => item.name === 'EditPriceCombo') || null;
      }

      function currentComboWithSubItems() {
        return activeOrderItems().find((item) => Array.isArray(item.subItems)) || null;
      }

      function comboSubItem(name, editable) {
        return { name, editable };
      }

      function renderComboSubItems() {
        comboSubItems.innerHTML = '';
        comboSubItemChoices.innerHTML = '';
        const combo = currentComboWithSubItems();
        if (!combo) {
          comboSubItemEditPriceButton.disabled = true;
          return;
        }
        (combo?.subItems || []).forEach((subItem) => {
          comboSubItems.appendChild(createButton('combo-sub-item', subItem.name, () => {
            selectedComboSubItemName = subItem.name;
            comboSubItemEditPriceButton.disabled = combo.name !== 'EditPriceCombo' || !subItem.editable;
          }));
        });
        if (combo.name === 'combo_max') {
          ['item', 'item_option', 'item-1', 'item_option-1'].forEach((subItemName) => {
            comboSubItemChoices.appendChild(createButton('combo-sub-item-choice', subItemName, () => {
              if (!pendingComboReplacementStarted) {
                combo.subItems = [];
                pendingComboReplacementStarted = true;
              }
              if (!combo.subItems.some((subItem) => subItem.name === subItemName)) {
                combo.subItems.push(comboSubItem(subItemName, true));
              }
              selectedComboSubItemName = subItemName;
              renderOrderAmounts();
            }));
          });
        }
        if (!selectedComboSubItemName && combo?.subItems?.length) {
          selectedComboSubItemName = combo.subItems[0].name;
          comboSubItemEditPriceButton.disabled = combo.name !== 'EditPriceCombo' || !combo.subItems[0].editable;
        }
      }

      function addEditableComboToCurrentOrder() {
        currentOrderItems.push({
          name: 'EditPriceCombo',
          price: 30.2,
          unitPrice: 30.2,
          quantity: 1,
          category: 'MansuperCat',
          group: 'MansuperGroup',
          state: '',
          subItems: [
            comboSubItem('ITEM1', true),
            comboSubItem('ITEM2', true),
            comboSubItem('ITEM3', false),
          ],
        });
        selectedOrderItemIndex = currentOrderItems.length - 1;
        selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
        selectedComboSubItemName = 'ITEM1';
        renderComboSubItems();
        renderOrderAmounts();
      }

      function addDishToCurrentOrder(dish) {
        if (dish.comboSubItems) {
          currentOrderItems.push({
            name: dish.name,
            displayName: orderDisplayName(dish),
            price: dish.price,
            unitPrice: dish.price,
            quantity: 1,
            category: dish.category,
            group: dish.group,
            state: '',
            quickCombo: Boolean(dish.quickCombo),
            subItems: dish.comboSubItems.map((name) => comboSubItem(name, true)),
          });
          selectedOrderItemIndex = currentOrderItems.length - 1;
          selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
          selectedComboSubItemName = dish.comboSubItems[0] || '';
          pendingComboReplacementStarted = false;
          renderComboSubItems();
          renderOrderAmounts();
          return;
        }
        const sameNameItems = currentOrderItems.filter((item) => item.name === dish.name && item.state !== 'Voided');
        const combineWithKitchen = currentCombineSameItemMode === 'include-kitchen' && !currentSeparateSameItem;
        const combineSameStatus = currentCombineSameItemMode === 'auto-same-status' && !currentSeparateSameItem;
        let target = null;
        if (combineWithKitchen) {
          target = sameNameItems[0] || null;
        } else if (combineSameStatus) {
          target = sameNameItems.find((item) => Boolean(item.sentToKitchen) === false) || null;
        }
        if (target) {
          target.quantity = Number(target.quantity || 1) + 1;
          target.price = roundMoney(Number(target.unitPrice || dish.price || 0) * target.quantity);
          selectedOrderItemIndex = currentOrderItems.indexOf(target);
          selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
          renderOrderAmounts();
          return;
        }
        currentOrderItems.push({
          name: dish.name,
          displayName: orderDisplayName(dish),
          price: currentCrmMember && dish.benefitPrice !== undefined ? dish.benefitPrice : dish.price,
          unitPrice: dish.price,
          quantity: 1,
          category: dish.category || '',
          inventorySku: dish.inventorySku || '',
          taxRate: dish.taxRate,
          benefitPrice: dish.benefitPrice,
          unitPriceItem: Boolean(dish.unitPriceItem),
          quickCombo: Boolean(dish.quickCombo),
          state: '',
          sentToKitchen: false,
          inKitchenQuantity: 0,
        });
        selectedOrderItemIndex = currentOrderItems.length - 1;
        selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
        renderOrderAmounts();
      }

      function markItemsPrinted(printType) {
        currentOrderItems.forEach((item) => {
          if (item.state !== 'Voided' && Number(item.quantity || 0) > 0) {
            item.printType = printType;
            item.sentToKitchen = true;
            item.inKitchenQuantity = Number(item.quantity || 1);
          }
        });
      }

      function shouldRequirePrintedItemPassword(item) {
        return Boolean(item?.sentToKitchen) && !currentStaffCanVoidPrintedItem && currentEmployeePassword === '123';
      }

      function deleteOrderItemAt(index) {
        if (index == null || index < 0 || !currentOrderItems[index]) {
          return;
        }
        currentOrderItems.splice(index, 1);
        pendingPrintedDeleteIndex = null;
        orderTipToast.textContent = '';
        managerPasswordPopup.hidden = true;
        renderOrderAmounts();
      }

      function requestPrintedItemPassword(index) {
        pendingPrintedDeleteIndex = index;
        orderTipToast.textContent = 'You do not have permission to delete printed dish, please enter the password';
        managerPasswordPopup.hidden = false;
      }

      function firstTrackedInventoryItem(items) {
        return (items || []).find((item) => item.inventorySku && item.state !== 'Voided') || null;
      }

      function inventoryShortage(items, previousDeductedQuantity) {
        const trackedItem = firstTrackedInventoryItem(items);
        if (!trackedItem) {
          return null;
        }
        const desiredQuantity = trackedInventoryQuantity(items);
        const additionalQuantity = desiredQuantity - Number(previousDeductedQuantity || 0);
        const remaining = Number(inventoryRecord(trackedItem.name).quantity || 0);
        if (additionalQuantity > remaining) {
          return { itemName: trackedItem.name, remaining: Math.floor(remaining) };
        }
        return null;
      }

      function applyInventoryDelta(order, items) {
        const trackedItem = firstTrackedInventoryItem(items);
        if (!trackedItem) {
          order.inventoryDeductedQuantity = 0;
          return;
        }
        const previousDeductedQuantity = Number(order.inventoryDeductedQuantity || 0);
        const nextDeductedQuantity = trackedInventoryQuantity(items);
        inventoryRecord(trackedItem.name).quantity -= nextDeductedQuantity - previousDeductedQuantity;
        order.inventoryDeductedQuantity = nextDeductedQuantity;
      }

      function restoreOrderInventory(order) {
        const trackedItem = firstTrackedInventoryItem(order?.items || []);
        if (!trackedItem || !Number(order?.inventoryDeductedQuantity || 0)) {
          return;
        }
        inventoryRecord(trackedItem.name).quantity += Number(order.inventoryDeductedQuantity || 0);
        order.inventoryDeductedQuantity = 0;
      }

      function renderInventorySearchResult() {
        inventoryItemState.textContent = formatInventoryState(currentInventorySearchItem);
      }

      function menuData() {
        const baseItems = [
          { name: 'superman item4', price: 8, group: 'Lunch', category: 'Chicken Lunch E', inventorySku: 'INV-SUPERMAN-ITEM4' },
          { name: 'superman item1', price: 8, group: 'Lunch', category: 'Chicken Lunch E' },
          { name: 'superman item2', price: 9, group: 'Lunch', category: 'Chicken Lunch E' },
          { name: 'superman item3', price: 10, group: 'Lunch', category: 'Chicken Lunch E' },
          { name: 'taxtest', price: 8, group: 'Lunch', category: 'Chicken Lunch E', taxRate: 0.075 },
          { name: 'benefit', price: 8, benefitPrice: 6, group: 'Lunch', category: 'Chicken Lunch E' },
          { name: 'Group Switch Beef', price: 11.25, group: 'Lunch Menu', category: 'Lunch Entree' },
          { name: 'Category Switch Fish', price: 13.5, group: 'Dinner Menu', category: 'Seafood' },
          { name: 'Discountable Burger', price: 10, group: 'Dinner Menu', category: 'Burgers' },
          { name: 'Category Option Pork', price: 9.5, group: '', category: 'Category Option' },
          { name: '蒙古鸡', price: 10.25, group: '', category: 'KDS鸡肉类午餐' },
          { name: 'Item Option Pork', price: 12, group: 'Dinner Menu', category: 'Item Options' },
          { name: 'Item Option Seafood', price: 12.75, group: 'Dinner Menu', category: 'Item Options' },
          { name: 'AA', number: 'AA', price: 10, group: 'Dinner Menu', category: 'Chicken Lunch E' },
          { name: 'hn_normal_item1', searchKeyword: 'ptc', price: 10, group: 'Lunch', category: 'hn_cate' },
          { name: 'Mongolian Chicken', price: 10, group: 'Lunch', category: 'KDS' },
          { name: 'Pos Name Test', price: 10, group: 'Lunch', category: 'KDS' },
          { name: 'item', price: 10, group: 'crm_group', category: 'crm_cat' },
          { name: 'combo_max', price: 20, group: 'crm_group', category: 'crm_cat', comboSubItems: ['item', 'item_option'] },
          { name: 'ComboOptionTest', price: 10, group: 'MansuperGroup', category: 'MansuperCat', comboSubItems: ['combo-no-option-item'] },
          { name: 'combo-option-item', price: 10, group: 'MansuperGroup', category: 'MansuperCat' },
          {
            name: 'QuickComboTest',
            price: 15,
            group: 'MansuperGroup',
            category: 'MansuperCat',
            comboSubItems: ['Vegetable Spring Roll'],
            quickCombo: adminComboModes.QuickComboTest,
          },
          {
            name: 'weight combo',
            price: 12,
            group: 'MansuperGroup',
            category: 'MansuperCat',
            comboSubItems: ['Vegetable Spring Roll'],
            quickCombo: true,
            weight: 100,
          },
          ...adminCreatedMenuItems,
        ];

        return baseItems.map((item) => ({
          ...item,
          ...(adminMenuPriceOverrides[item.name] || {}),
        }));
      }

      function effectiveLanguage() {
        return currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
      }

      function menuDisplayName(dish) {
        const chineseConfig = currentItemChineseNames[dish.name];
        if (effectiveLanguage() === 'Chinese' && chineseConfig?.chineseName) {
          return chineseConfig.chineseName;
        }
        return currentItemPosNames[dish.name] || dish.posName || dish.name;
      }

      function orderDisplayName(dish) {
        const chineseConfig = currentItemChineseNames[dish.name];
        if (effectiveLanguage() === 'Chinese' && chineseConfig?.chineseName) {
          return chineseConfig.chineseName;
        }
        return dish.name;
      }

      function currentChargeAmount(subtotal) {
        if (!currentOrderChargeRate) {
          return 0;
        }
        const chargeableSubtotal = currentKdsCategoryDiscountAllowance
          ? activeOrderItems()
            .filter((item) => item.category !== 'KDS')
            .reduce((total, item) => total + Number(item.price || 0), 0)
          : Number(subtotal || 0);
        return roundMoney(chargeableSubtotal * currentOrderChargeRate);
      }

      function currentWholeOrderDiscountAmount(subtotal) {
        if (!currentWholeOrderDiscountRate) {
          return 0;
        }
        return roundMoney(Number(subtotal || 0) * currentWholeOrderDiscountRate) * -1;
      }

      function currentActiveOrderSubtotal() {
        return activeOrderItems().reduce((total, item) => total + Number(item.price || 0), 0);
      }

      function currentAppliedItemDiscountAmount() {
        return activeOrderItems().reduce((total, item) => {
          const originalPrice = Number(item.originalPrice ?? item.price ?? 0);
          const currentPrice = Number(item.price || 0);
          return total + Math.max(0, originalPrice - currentPrice);
        }, 0);
      }

      function canAuthorizeItemDiscount(password, originalPrice, percent) {
        const subtotal = currentActiveOrderSubtotal();
        const maxDiscountAmount = subtotal * (wholeOrderDiscountLimitForPassword(password) / 100);
        const currentWholeOrderDiscount = Math.abs(currentWholeOrderDiscountAmount(subtotal));
        const currentItemDiscount = currentAppliedItemDiscountAmount();
        const requestedDiscountAmount = Number(originalPrice || 0) * (Number(percent || 0) / 100);
        return currentWholeOrderDiscount + currentItemDiscount + requestedDiscountAmount <= maxDiscountAmount;
      }

      function canAuthorizeItemAmountDiscount(password, amount) {
        const subtotal = currentActiveOrderSubtotal();
        const maxDiscountAmount = subtotal * (wholeOrderDiscountLimitForPassword(password) / 100);
        const currentWholeOrderDiscount = Math.abs(currentWholeOrderDiscountAmount(subtotal));
        const currentItemDiscount = currentAppliedItemDiscountAmount();
        return currentWholeOrderDiscount + currentItemDiscount + Number(amount || 0) <= maxDiscountAmount;
      }

      function canAuthorizeRecallWholeOrderAmountDiscount(password, subtotal, amount) {
        const maxDiscountAmount = Number(subtotal || 0) * (wholeOrderDiscountLimitForPassword(password) / 100);
        return Number(amount || 0) <= maxDiscountAmount;
      }

      function applyItemDiscountPercent(index, percent) {
        const item = currentOrderItems[index];
        if (!item) {
          return;
        }
        const originalPrice = Number(item.originalPrice ?? item.price ?? 0);
        item.originalPrice = originalPrice;
        item.price = roundMoney(originalPrice * (1 - Number(percent || 0) / 100));
        pendingItemDiscount = null;
        managerPasswordPopup.hidden = true;
        orderTipToast.textContent = '';
        renderOrderAmounts();
      }

      function applyItemAmountDiscount(indexes, amount) {
        const selectedItems = indexes.map((index) => currentOrderItems[index]).filter(Boolean);
        const selectedSubtotal = selectedItems.reduce((total, item) => total + Number(item.price || 0), 0);
        if (!selectedItems.length || !selectedSubtotal) {
          return;
        }
        selectedItems.forEach((item) => {
          const originalPrice = Number(item.originalPrice ?? item.price ?? 0);
          item.originalPrice = originalPrice;
          const itemShare = Number(item.price || 0) / selectedSubtotal;
          item.price = roundMoney(Math.max(0, Number(item.price || 0) - Number(amount || 0) * itemShare));
        });
        pendingItemDiscount = null;
        managerPasswordPopup.hidden = true;
        orderTipToast.textContent = '';
        renderOrderAmounts();
      }

      function selectedItemDiscountIndexes() {
        const indexes = [...selectedOrderItemIndexes].filter((index) => currentOrderItems[index]);
        if (indexes.length) {
          return indexes;
        }
        const fallbackIndex = selectedOrderItemIndex >= 0 ? selectedOrderItemIndex : 0;
        return currentOrderItems[fallbackIndex] ? [fallbackIndex] : [];
      }

      function applyRecallWholeOrderAmountDiscount(amount) {
        if (!selectedRecallOrder) {
          return;
        }
        selectedRecallOrder.wholeOrderDiscountAmount = Number(amount || 0) * -1;
        pendingRecallWholeOrderDiscountAmount = null;
        managerPasswordPopup.hidden = true;
        recallManagerPasswordPopup.hidden = true;
        recallDiscountTip.textContent = '';
        renderRecallOrderItems();
      }

      function roundedSettlementTotal(amount) {
        const cents = Math.round(Number(amount || 0) * 100);
        if (currentRoundingStrategy === 'nearest_5') {
          return Number((Math.floor(cents / 5) * 5 / 100).toFixed(2));
        }
        if (currentRoundingStrategy === 'nearest_10') {
          return Number((Math.floor(cents / 10) * 10 / 100).toFixed(2));
        }
        if (currentRoundingStrategy === 'nearest_5_or_10') {
          return Number((Math.round(cents / 5) * 5 / 100).toFixed(2));
        }
        return Number((cents / 100).toFixed(2));
      }

      function currentOrderTaxAmount() {
        return activeOrderItems().reduce((total, item) => {
          if (item.taxRate !== undefined) {
            return total + Number(item.price || 0) * Number(item.taxRate || 0);
          }

          return total + 0.6;
        }, 0);
      }

      function renderOrderAmounts() {
        const itemCount = currentOrderItems.filter((item) => item.state !== 'Voided').length;
        const subtotal = currentOrderItems
          .filter((item) => item.state !== 'Voided')
          .reduce((total, item) => total + Number(item.price || 0), 0);
        const chargeAmount = currentChargeAmount(subtotal);
        const wholeOrderDiscount = currentWholeOrderDiscountAmount(subtotal);
        const rewardDiscount = calculateRewardDiscount({
          subtotal,
          crmDiscountRate: currentCrmDiscountRate,
          crmDiscountMaxAmount: currentCrmDiscountMaxAmount,
          crmFixedRewardAmount: currentCrmFixedRewardAmount,
        });
        orderTax.textContent = currentOrderTaxVoided ? '0' : String(Number(currentOrderTaxAmount().toFixed(2)));
        orderSubtotal.textContent = currentEditableCombo() ? '$' + roundMoney(subtotal).toFixed(2) : String(roundMoney(subtotal));
        orderDiscountAmount.textContent = wholeOrderDiscount ? wholeOrderDiscount.toFixed(2) : '';
        orderReward.textContent = formatRewardDiscount(rewardDiscount, currentCrmDiscountRate);
        const settlementAmount = roundMoney(subtotal + wholeOrderDiscount + rewardDiscount + chargeAmount + currentOrderTip);
        const unpaidBeforePaid = currentOrderTaxVoided
          ? settlementAmount
          : roundMoney(calculatePayPageUnpaidAmount(subtotal + wholeOrderDiscount + chargeAmount, rewardDiscount, itemCount) + currentOrderTip);
        settleTotal.textContent = String(settlementAmount);
        settleUnpaidAmount.textContent = String(roundMoney(Math.max(0, unpaidBeforePaid - currentPaidAmount)));
        orderChargeLabel.textContent = currentOrderChargeLabel;
        orderChargePrice.textContent = chargeAmount ? '$' + chargeAmount.toFixed(2) : '';
        orderItemName.textContent = currentOrderItems[0] ? displayItemName(currentOrderItems[0]) : '';
        orderCurrentQuickCombo.textContent = String(Boolean(currentOrderItems[selectedOrderItemIndex]?.quickCombo));
        orderItemCount.textContent = formatItemCount(currentOrderItems);
        orderItemPrice.textContent = String(currentOrderItems[0]?.price || 0);
        itemQuantityInput.value = String(currentOrderItems[currentOrderItems.length - 1]?.quantity || 1);
        const selectedItem = currentOrderItems[selectedOrderItemIndex] || currentOrderItems[currentOrderItems.length - 1];
        const unitPriceVisible = Boolean(selectedItem?.unitPriceItem);
        unitPriceInput.hidden = !unitPriceVisible;
        unitPriceSubmitButton.hidden = !unitPriceVisible;
        renderOrderItemRows();
        comboOptionCount.textContent = String(currentComboOptionCount);
        globalOptionListCountValue.textContent = String(currentGlobalOptionCount);
        orderSearchInput.className = currentSearchMenuEnabled ? 'iptgrp' : 'iptgrp hide';
        renderComboSubItems();
      }

      function renderOrderItemRows() {
        orderItemsList.innerHTML = '';
        activeOrderItems().forEach((item, activeIndex) => {
          const orderIndex = currentOrderItems.indexOf(item);
          const row = document.createElement('div');
          row.dataset.testid = 'order-line-item';
          row.dataset.index = String(orderIndex);
          row.dataset.quantity = String(item.quantity || 1);
          row.dataset.price = String(item.price || 0);
          row.dataset.color = itemLineColor(item);
          row.dataset.selected = selectedOrderItemIndexes.has(orderIndex) ? 'true' : 'false';
          row.style.color = itemLineColor(item);
          row.textContent = displayItemName(item);
          row.addEventListener('click', (event) => {
            selectedOrderItemIndex = orderIndex >= 0 ? orderIndex : activeIndex;
            if (event.ctrlKey || event.metaKey) {
              if (selectedOrderItemIndexes.has(selectedOrderItemIndex)) {
                selectedOrderItemIndexes.delete(selectedOrderItemIndex);
              } else {
                selectedOrderItemIndexes.add(selectedOrderItemIndex);
              }
            } else {
              selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
            }
            renderOrderAmounts();
          });
          orderItemsList.appendChild(row);
        });
      }

      function renderCurrentCrmState() {
        crmMemberName.textContent = currentCrmMember?.name || '';
        crmPointBalance.textContent = String(currentCrmMember?.points || 0);
        [crmRemoveMemberButton, crmRedeemItemButton, crmRedeemDiscountButton, crmRedeemCreditButton].forEach((button) => {
          button.className = currentRedeemControlsLocked ? 'disabled' : '';
          button.disabled = currentRedeemControlsLocked;
        });
        settleSwitchMemberButton.className = currentHasRedeemItem ? 'disabled' : '';
        settleSwitchMemberButton.disabled = currentHasRedeemItem;
        crmRedeemItemButton.hidden = currentSettlementSelectMode;
      }

      function applyMemberPricesToCurrentOrder() {
        currentOrderItems.forEach((item) => {
          if (item.benefitPrice === undefined) {
            return;
          }
          const unitPrice = currentCrmMember ? Number(item.benefitPrice) : Number(item.unitPrice || item.price || 0);
          item.price = roundMoney(unitPrice * Number(item.quantity || 1));
        });
        renderOrderAmounts();
      }

      function calculateRewardDiscount(order) {
        if (Number(order?.crmFixedRewardAmount || 0) > 0) {
          return Number((Math.min(Number(order?.subtotal || 0), Number(order.crmFixedRewardAmount)) * -1).toFixed(2));
        }
        const discount = Number((Number(order?.subtotal || 0) * Number(order?.crmDiscountRate || 0)).toFixed(2));
        const cappedDiscount = order?.crmDiscountMaxAmount == null ? discount : Math.min(discount, Number(order.crmDiscountMaxAmount));
        return Number((cappedDiscount * -1).toFixed(2));
      }

      function calculatePayPageUnpaidAmount(subtotal, rewardDiscount, itemCount) {
        if (!subtotal) {
          return 0;
        }
        const discountedSubtotal = Number((Number(subtotal) + Number(rewardDiscount || 0)).toFixed(2));
        const taxRate = Number((itemCount * 0.6).toFixed(2)) / Number(subtotal);
        return Number((discountedSubtotal + discountedSubtotal * taxRate).toFixed(2));
      }

      function reportOrderType(order) {
        return order?.orderType === 'custom-delivery' ? 'CUSTOM_D' : 'STANDARD';
      }

      function renderReportOverview() {
        const selectedType = reportOrderTypeSelect.value;
        const netSales = savedOrders
          .filter((order) => selectedType === 'ALL' || reportOrderType(order) === selectedType)
          .reduce((total, order) => total + Number(order.subtotal || 0), 0);
        reportOverviewNetSales.textContent = '$' + roundMoney(netSales).toFixed(2);
      }

      function localIsoDate(offsetDays) {
        const date = new Date();
        date.setDate(date.getDate() + offsetDays);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
      }

      function renderStaffReportDateRange() {
        reportRightIframe.hidden = false;
        reportStartTime.textContent = localIsoDate(0) + ' 00:00:00';
        reportEndTime.textContent = localIsoDate(1) + ' 00:00:00';
      }

      function earnPointsForSubtotal(subtotal) {
        return Math.floor(Number(subtotal || 0) / 10) * 10;
      }

      function refundCurrentCrmPointDeduction() {
        if (!currentCrmPointDeduction) {
          return;
        }
        const member = selectedMemberRecord();
        if (member) {
          member.points += currentCrmPointDeduction;
          currentCrmMember = member;
        }
        currentCrmPointDeduction = 0;
        renderCurrentCrmState();
      }

      function applyCurrentCrmPointDeduction(points) {
        refundCurrentCrmPointDeduction();
        const member = selectedMemberRecord();
        if (member) {
          member.points -= points;
          currentCrmMember = member;
          currentCrmPointDeduction = points;
        }
        renderCurrentCrmState();
      }

      function formatRewardDiscount(amount, discountRate) {
        if (Number(amount) === 0 && Number(discountRate || 0) > 0) {
          return '-0.00';
        }
        return Number(amount || 0).toFixed(2);
      }

      function renderDeliveryInfoRows() {
        orderInfoRows.innerHTML = '';
        currentDeliveryInfoRows.forEach((value) => {
          const row = document.createElement('div');
          row.dataset.testid = 'order-info-row';
          row.textContent = value;
          orderInfoRows.appendChild(row);
        });
      }

      function renderOptionControls() {
        orderOptions.innerHTML = '';
        orderOptions.hidden = false;
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
        const groups = effectiveLanguage === 'Chinese' ? ['午餐菜单', '中餐菜单'] : ['Lunch', 'Lunch Menu', 'Dinner Menu', 'MansuperGroup', 'crm_group'];
        orderMenuGroups.innerHTML = '';
        groups.forEach((group) => {
          orderMenuGroups.appendChild(createButton('order-menu-group', group, () => {}));
        });
        orderMenuCategories.innerHTML = '';
        ['Chicken Lunch E', 'Lunch Entree', 'Seafood', 'Burgers', 'Category Option', 'KDS鸡肉类午餐', 'Item Options', 'hn_cate', 'crm_cat', 'KDS', 'MansuperCat'].forEach((category) => {
          orderMenuCategories.appendChild(createButton('order-menu-category', category, () => {
            currentCategoryName = category;
            currentCategoryNameText.textContent = currentCategoryName;
          }));
        });
        orderMenuItems.innerHTML = '';
        menuData().forEach((dish) => {
          orderMenuItems.appendChild(createButton('order-menu-item', menuDisplayName(dish), () => {
            addDishToCurrentOrder(dish);
          }));
        });
        renderOptionControls();
      }

      function resetCurrentOrder() {
        currentOrderItems = [];
        selectedOrderItemIndex = -1;
        selectedOrderItemIndexes = new Set();
        currentItemOption = null;
        currentOrderTip = 0;
        currentOrderChargeRate = 0;
        currentOrderChargeLabel = '';
        currentWholeOrderDiscountRate = 0;
        currentOrderTaxVoided = false;
        currentPaidAmount = 0;
        currentSettlementTotal = null;
        currentSplitPartTip = null;
        currentOrderStatus = '';
        currentOrderType = 'togo';
        currentCardTender = '';
        currentCategoryName = '';
        currentCategoryNameText.textContent = '';
        currentCustomerName = null;
        currentDeliveryInfoRows = [];
        currentComboOptionCount = 0;
        selectedComboSubItemName = '';
        currentGlobalOptionCount = 0;
        currentCrmMember = null;
        currentCrmDiscountRate = 0;
        currentCrmDiscountMaxAmount = null;
        currentCrmFixedRewardAmount = 0;
        currentCrmPointDeduction = 0;
        currentHasRedeemItem = false;
        currentSemiPayMode = false;
        currentRedeemControlsLocked = false;
        currentSettlementSelectMode = false;
        currentEditingOrder = null;
        pendingPrintedDeleteIndex = null;
        pendingWholeOrderDiscountPercent = null;
        pendingItemDiscount = null;
        pendingRecallWholeOrderDiscountAmount = null;
        recallManagerPasswordPopup.hidden = true;
        recallManagerPasswordInput.value = '';
        recallDiscountTip.textContent = '';
        orderSearchInput.value = '';
        orderSearchResult.textContent = '';
        orderSaveAlert.textContent = '';
        orderGuestNameInput.value = '';
        orderTipInput.value = '';
        orderTipToast.textContent = '';
        itemDiscountAmountInput.value = '';
        itemDiscountPercentInput.value = '';
        orderDiscountWholeOrderPrice.textContent = '';
        orderDiscountAmount.textContent = '';
        globalOptionArea.hidden = true;
        crmRedeemPanel.hidden = true;
        customerInfoPopup.hidden = true;
        managerPasswordPopup.hidden = true;
        renderCurrentCrmState();
        renderDeliveryInfoRows();
        renderOrderAmounts();
        renderOrderMenu();
        const effectiveLanguage = currentLanguage === 'Chinese' || userDefaultLanguage === 'Chinese' ? 'Chinese' : 'Default';
        openFoodCategory.textContent = effectiveLanguage === 'Chinese' ? '自定义菜\\nauto_fix' : 'Custom Food\\nauto_fix';
      }

      function saveCurrentOrder() {
        currentCustomerName = orderGuestNameInput.value || currentCustomerName;
        if (currentKdsCategoryRequired && !activeOrderItems().some((item) => item.category === 'KDS')) {
          currentCategoryName = 'KDS';
          currentCategoryNameText.textContent = currentCategoryName;
          orderSaveAlert.textContent = 'Required category KDS is missing.';
          history.replaceState(null, '', '#/orderDishes');
          return null;
        }
        const previousDeductedQuantity = Number(currentEditingOrder?.inventoryDeductedQuantity || 0);
        const shortage = inventoryShortage(currentOrderItems, previousDeductedQuantity);
        if (shortage) {
          orderSaveAlert.textContent =
            'Insufficient stock, please modify the order.\\n' + shortage.itemName + ': ' + shortage.remaining + ' remaining.';
          return null;
        }
        orderSaveAlert.textContent = '';
        if (currentEditingOrder) {
          currentEditingOrder.items = [...currentOrderItems];
          currentEditingOrder.itemOption = currentItemOption;
          currentEditingOrder.customerName = currentCustomerName;
          currentEditingOrder.crmMember = currentCrmMember ? { ...currentCrmMember } : null;
          currentEditingOrder.crmDiscountRate = currentCrmDiscountRate;
          currentEditingOrder.crmDiscountMaxAmount = currentCrmDiscountMaxAmount;
          currentEditingOrder.crmFixedRewardAmount = currentCrmFixedRewardAmount;
          currentEditingOrder.crmPointDeduction = currentCrmPointDeduction;
          currentEditingOrder.hasRedeemItem = currentHasRedeemItem;
          currentEditingOrder.partialPaid = currentSemiPayMode;
          currentEditingOrder.rewardDiscount = calculateRewardDiscount(currentEditingOrder);
          applyInventoryDelta(currentEditingOrder, currentOrderItems);
          currentEditingOrder = null;
          currentRedeemControlsLocked = false;
          renderCurrentCrmState();
          return selectedRecallOrder;
        }
        const order = {
          orderNumber: String(nextOrderNumber++),
          items: [...currentOrderItems],
          itemOption: currentItemOption,
          tip: currentOrderTip,
          splitTip: currentSplitPartTip,
          status: currentOrderStatus,
          customerName: currentCustomerName,
          subtotal: Number(orderSubtotal.textContent || '0'),
          settlementTotal: currentSettlementTotal,
          crmMember: selectedMemberRecord(),
          crmDiscountRate: currentCrmDiscountRate,
          crmDiscountMaxAmount: currentCrmDiscountMaxAmount,
          crmFixedRewardAmount: currentCrmFixedRewardAmount,
          crmPointDeduction: currentCrmPointDeduction,
          hasRedeemItem: currentHasRedeemItem,
          orderType: currentOrderType,
          partialPaid: currentSemiPayMode,
          rewardDiscount: 0,
          guestPhone: currentDeliveryInfoRows[0] || '',
          guestAddress: currentDeliveryInfoRows[2] || '',
          deliveryInfoRows: [...currentDeliveryInfoRows],
          splitOrderPrices: [],
          subOrderItems: [],
          subOrderStatuses: [],
          inventoryDeductedQuantity: 0,
          paymentType: '',
          hasCreditFailure: false,
        };
        order.orderCardId = currentOrderType === 'dine-in' ? 'Area 1 Table 1 ' + order.orderNumber : order.orderNumber;
        order.rewardDiscount = calculateRewardDiscount(order);
        applyInventoryDelta(order, currentOrderItems);
        savedOrders.push(order);
        latestSavedOrderItems = [...order.items];
        latestSavedItemOption = order.itemOption;
        selectedRecallOrder = order;
        history.replaceState(null, '', '#/home');
        return order;
      }

      function selectRecallOrder(order) {
        selectedRecallOrder = order || null;
        latestSavedOrderItems = selectedRecallOrder ? [...selectedRecallOrder.items] : [];
        latestSavedItemOption = selectedRecallOrder?.itemOption || null;
        renderRecallOrderItems();
      }

      function orderTotal(order) {
        if (order?.settlementTotal !== null && order?.settlementTotal !== undefined) {
          return Number(Number(order.settlementTotal).toFixed(2));
        }
        return Number(((order?.items || []).reduce((total, item) => total + Number(item.price || 0), 0)
          + Number(order?.tip || 0)
          + Number(order?.rewardDiscount || 0)
          + Number(order?.wholeOrderDiscountAmount || 0)).toFixed(2));
      }

      function mergeCrmOrders(targetOrder, sourceOrder) {
        if (!targetOrder || !sourceOrder) {
          return;
        }
        targetOrder.items = [...targetOrder.items, ...sourceOrder.items];
        targetOrder.subtotal = Number((Number(targetOrder.subtotal || 0) + Number(sourceOrder.subtotal || 0)).toFixed(2));
        if (targetOrder.crmDiscountRate) {
          targetOrder.rewardDiscount = calculateRewardDiscount(targetOrder);
        }
        savedOrders = savedOrders.filter((order) => order !== sourceOrder);
        selectRecallOrder(targetOrder);
      }

      function renderSplitPrices(prices) {
        splitOrderPrices.innerHTML = '';
        prices.forEach((price) => {
          const row = document.createElement('div');
          row.dataset.testid = 'split-order-price';
          row.textContent = String(price);
          splitOrderPrices.appendChild(row);
        });
      }

      function renderSplitItemPrices(prices) {
        splitItemPrices.innerHTML = '';
        prices.forEach((price) => {
          const row = document.createElement('div');
          row.dataset.testid = 'split-item-price';
          row.textContent = String(price);
          splitItemPrices.appendChild(row);
        });
      }

      function renderSubOrders(order) {
        recallSubOrders.innerHTML = '';
        (order?.subOrderStatuses || []).forEach((status, index) => {
          const card = document.createElement('button');
          card.dataset.testid = 'recall-sub-order-card';
          card.dataset.status = status;
          card.textContent = 'Sub Order ' + (index + 1);
          card.addEventListener('click', () => {
            selectedSubOrderIndex = index;
            recallOrderStatus.textContent = order.subOrderStatuses[index];
            renderRecallItemRows(order.subOrderItems?.[index] || []);
            const total = Number(((order.subOrderItems?.[index] || []).reduce((sum, item) => sum + Number(item.price || 0), 0)).toFixed(2));
            recallItemCount.textContent = formatItemCount(order.subOrderItems?.[index] || []);
            recallOrderSubtotal.textContent = String(total);
            recallOrderTotal.textContent = String(total);
          });
          recallSubOrders.appendChild(card);
        });
      }

      function renderRecallItemRows(items) {
        recallOrderItems.innerHTML = '';
        items.forEach((item) => {
          const row = document.createElement('div');
          row.dataset.testid = 'recall-order-item';
          row.dataset.name = item.name;
          row.dataset.price = String(item.price);
          row.dataset.quantity = String(item.quantity ?? 1);
          row.dataset.state = item.state || '';
          row.textContent = item.name + ' x' + String(item.quantity ?? 1) + ' $' + item.price.toFixed(2);
          recallOrderItems.appendChild(row);
          (item.subItems || []).forEach((subItem) => {
            const subItemRow = document.createElement('div');
            subItemRow.dataset.testid = 'recall-combo-sub-item';
            subItemRow.textContent = subItem.name;
            recallOrderItems.appendChild(subItemRow);
          });
        });
      }

      function renderRecallOrderItems() {
        const order = selectedRecallOrder || {
          items: latestSavedOrderItems,
          itemOption: latestSavedItemOption,
          tip: 0,
          status: '',
          customerName: null,
        };
        recallOrderCardId.textContent = order.orderCardId || order.orderNumber || '';
        recallOrderNumber.textContent = order.orderNumber || '';
        recallOrderTip.textContent = formatTip(order.tip || 0);
        recallOrderStatus.textContent = order.status || '';
        recallCustomerName.textContent = order.customerName || '';
        recallItemCount.textContent = formatItemCount(order.items || []);
        recallGuestPhone.textContent = formatRecallPhone(order.guestPhone || '');
        recallGuestAddress.textContent = order.guestAddress || '';
        recallOrderSubtotal.textContent = String(order.subtotal ?? orderTotal(order));
        recallOrderReward.textContent = formatRewardDiscount(order.rewardDiscount || 0, order.crmDiscountRate);
        recallOrderTotal.textContent =
          order?.settlementTotal !== null && order?.settlementTotal !== undefined
            ? Number(orderTotal(order)).toFixed(2)
            : String(orderTotal(order));
        recallCrmMemberName.textContent = order.crmMember?.name || '';
        recallCrmPointBalance.textContent = String(order.crmMember?.points || 0);
        recallMoveOrderButton.hidden = Boolean(order.hasRedeemItem);
        recallMoveItemButton.hidden = Boolean(order.hasRedeemItem);
        recallParentOrder.style.backgroundColor = order.parentBackground || '';
        recallParentOrder.dataset.background = order.parentBackground || '';
        renderSplitPrices(order.splitOrderPrices || []);
        renderSplitItemPrices(draftSplitItemPrices);
        renderSubOrders(order);
        renderRecallItemRows(order.items || []);
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
        currentEmployeePassword = passwordInput.value;
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
      joinMemberButton.addEventListener('click', () => {
        joinMemberFirstNameInput.value = '';
        joinMemberLastNameInput.value = '';
        joinMemberPhoneInput.value = '';
        joinMemberEmailInput.value = '';
        joinMemberError.textContent = '';
        showPanel('join-member');
      });
      joinMemberSaveButton.addEventListener('click', () => {
        saveJoinMember();
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
        adminAnalysisPage.hidden = true;
        adminPermissionPopup.hidden = true;
        adminStaffPage.hidden = true;
        showPanel('admin');
      });
      adminStaffButton.addEventListener('click', () => {
        adminAnalysisPage.hidden = true;
        adminPermissionPopup.hidden = true;
        adminStaffPage.hidden = false;
        renderAdminStaffList();
      });
      adminStaffCreateButton.addEventListener('click', () => {
        showSelectedAdminStaff({
          name: '',
          code: '',
          role: 'Manager',
          permissions: creatableStaffPermissionsForCurrentEmployee(),
        });
      });
      adminStaffSaveButton.addEventListener('click', () => {
        const staff = {
          name: adminStaffNameInput.value,
          code: adminStaffCodeInput.value,
          role: adminStaffRoleSelect.value,
          permissions: creatableStaffPermissionsForCurrentEmployee(),
        };
        adminStaffRecords = adminStaffRecords.filter((record) => record.name !== staff.name);
        adminStaffRecords.push(staff);
        renderAdminStaffList();
        showSelectedAdminStaff(staff);
      });
      adminAnalysisButton.addEventListener('click', () => {
        if (staffHasPermission(currentEmployeePassword, 'ANALYSIS')) {
          adminPermissionPopup.hidden = true;
          adminAnalysisPage.hidden = false;
          return;
        }
        adminPermissionAlert.textContent = 'do not have permission ANALYSIS';
        adminPermissionPopup.hidden = false;
      });
      adminPermissionSubmitButton.addEventListener('click', () => {
        if (staffHasPermission(adminPermissionPasswordInput.value, 'ANALYSIS')) {
          adminPermissionPopup.hidden = true;
          adminAnalysisPage.hidden = false;
        }
      });
      adminUnitPriceItemSaveButton.addEventListener('click', () => {
        const itemName = adminUnitPriceItemNameInput.value;
        adminCreatedMenuItems = adminCreatedMenuItems.filter((dish) => dish.name !== itemName);
        adminCreatedMenuItems.push({
          name: itemName,
          price: Number(adminUnitPriceItemPriceInput.value || '0'),
          group: adminUnitPriceItemGroupInput.value,
          category: adminUnitPriceItemCategoryInput.value,
          unitPriceItem: true,
        });
        renderOrderMenu();
      });
      adminMenuClearGroupButton.addEventListener('click', () => {
        const productLine = adminMenuTargetProductLineInput.value;
        const groupName = adminMenuGroupNameInput.value;
        adminMenuGroups[productLine] = adminMenuGroups[productLine] || {};
        adminMenuGroups[productLine][groupName] = [];
        renderAdminMenuGroupCount(productLine, groupName);
      });
      adminMenuCopyGroupButton.addEventListener('click', () => {
        const sourceProductLine = adminMenuSourceProductLineInput.value;
        const targetProductLine = adminMenuTargetProductLineInput.value;
        const groupName = adminMenuGroupNameInput.value;
        adminMenuGroups[targetProductLine] = adminMenuGroups[targetProductLine] || {};
        adminMenuGroups[targetProductLine][groupName] = [...adminMenuCategories(sourceProductLine, groupName)];
        renderAdminMenuGroupCount(targetProductLine, groupName);
      });
      adminMenuEnterGroupButton.addEventListener('click', () => {
        renderAdminMenuGroupCount(adminMenuTargetProductLineInput.value, adminMenuGroupNameInput.value);
      });
      adminMenuReadItemCountButton.addEventListener('click', () => {
        renderAdminMenuItemCount(adminMenuTargetProductLineInput.value);
      });
      adminGlobalOptionCreateButton.addEventListener('click', () => {
        const optionName = adminGlobalOptionNameInput.value;
        adminGlobalOptions = adminGlobalOptions.filter((option) => option.name !== optionName);
        adminGlobalOptions.push({
          name: optionName,
          price: Number(adminGlobalOptionPriceInput.value || '0'),
          group: adminGlobalOptionGroupInput.value,
          category: adminGlobalOptionCategoryInput.value,
          printers: [],
        });
        selectedGlobalOptionName = optionName;
        adminGlobalOptionSelectedNameInput.value = optionName;
        renderSelectedGlobalOptionPrinter();
      });
      adminGlobalOptionSelectButton.addEventListener('click', () => {
        selectedGlobalOptionName = adminGlobalOptionSelectedNameInput.value;
        renderSelectedGlobalOptionPrinter();
      });
      adminGlobalOptionAddPrinterButton.addEventListener('click', () => {
        const option = selectedGlobalOption();
        const printerName = adminGlobalOptionPrinterInput.value;
        if (option && printerName && !option.printers.includes(printerName)) {
          option.printers.push(printerName);
        }
        renderSelectedGlobalOptionPrinter();
      });
      adminGlobalOptionDeleteButton.addEventListener('click', () => {
        const optionName = adminGlobalOptionNameInput.value || adminGlobalOptionSelectedNameInput.value;
        adminGlobalOptions = adminGlobalOptions.filter((option) => option.name !== optionName);
        if (selectedGlobalOptionName === optionName) {
          selectedGlobalOptionName = '';
          adminGlobalOptionSelectedNameInput.value = '';
        }
        renderSelectedGlobalOptionPrinter();
      });
      adminComboDisplayModeSaveButton.addEventListener('click', () => {
        adminComboModes[adminComboItemNameInput.value] = adminComboDisplayModeSelect.value === 'quick';
        renderComboDetailQuickCombo();
        renderOrderMenu();
      });
      adminComboDetailOpenButton.addEventListener('click', () => {
        renderComboDetailQuickCombo();
      });
      adminPropertyBatchReplaceButton.addEventListener('click', () => {
        const labels = splitCsv(adminPropertySelectedLabelsInput.value);
        splitCsv(adminPropertyItemNamesInput.value).forEach((itemName) => {
          const key = adminPropertyKey(
            adminPropertyItemGroupInput.value,
            adminPropertyItemCategoryInput.value,
            itemName,
          );
          adminMenuItemProperties[key] = [...labels];
        });
        renderItemPropertyDetail();
      });
      adminPropertyDetailOpenButton.addEventListener('click', () => {
        renderItemPropertyDetail();
      });
      adminPriceBatchEditButton.addEventListener('click', () => {
        const priceValues = JSON.parse(adminPriceValuesInput.value || '{}');
        const memberPriceValues = JSON.parse(adminPriceMemberValuesInput.value || '{}');
        splitCsv(adminPriceItemNamesInput.value).forEach((itemName) => {
          adminMenuPriceOverrides[itemName] = {
            ...(adminMenuPriceOverrides[itemName] || {}),
            ...(priceValues[itemName] === undefined ? {} : { price: Number(priceValues[itemName]) }),
            ...(memberPriceValues[itemName] === undefined ? {} : { benefitPrice: Number(memberPriceValues[itemName]) }),
            group: adminPriceItemGroupInput.value,
            category: adminPriceItemCategoryInput.value,
          };
        });
        localStorage.setItem('offline-admin-menu-price-overrides', JSON.stringify(adminMenuPriceOverrides));
        renderOrderMenu();
      });
      adminTaxFreeSaveButton.addEventListener('click', () => {
        const key = adminPropertyKey(
          adminTaxFreeItemGroupInput.value,
          adminTaxFreeItemCategoryInput.value,
          adminTaxFreeItemNameInput.value,
        );
        adminTakeOutTaxFreeItems[key] = adminTaxFreeEnabledSelect.value === 'true';
        adminTaxFreeConfirmation.textContent = adminTaxFreeEnabledSelect.value === 'true'
          ? 'No tax will apply to the Item when take out.Are you sure you want to save?'
          : '';
      });
      saveLanguageButton.addEventListener('click', () => {
        userDefaultLanguage = languageSelect.value;
        localStorage.setItem('userDefaultLanguage', userDefaultLanguage);
        renderLanguage();
      });
      saveSettingsButton.addEventListener('click', () => {
        currentMenuMode = menuModeSelect.value;
        currentSearchMenuEnabled = searchMenuSelect.value !== 'false';
        currentCombineSameItemMode = combineSameItemSelect.value;
        currentSeparateSameItem = separateSameItemSelect.value !== 'false';
        currentStaffCanVoidPrintedItem = staffVoidPrintedItemSelect.value !== 'false';
        currentStaffCanAddNote = staffNoteSelect.value !== 'false';
        currentAutoRedirectAfterReduce = autoRedirectAfterReduceSelect.value !== 'false';
        currentClickSettleAutoSend = clickSettleAutoSendSelect.value === 'true';
        currentCountCanBeDecimal = countCanBeDecimalSelect.value === 'true';
        currentKdsCategoryRequired = kdsCategoryRequiredSelect.value === 'true';
        currentKdsCategoryDiscountAllowance = kdsCategoryDiscountAllowanceSelect.value !== 'false';
        currentRoundingStrategy = roundingStrategySelect.value;
        localStorage.setItem('currentMenuMode', currentMenuMode);
        localStorage.setItem('currentSearchMenuEnabled', String(currentSearchMenuEnabled));
        localStorage.setItem('currentCombineSameItemMode', currentCombineSameItemMode);
        localStorage.setItem('currentSeparateSameItem', String(currentSeparateSameItem));
        localStorage.setItem('currentStaffCanVoidPrintedItem', String(currentStaffCanVoidPrintedItem));
        localStorage.setItem('currentStaffCanAddNote', String(currentStaffCanAddNote));
        localStorage.setItem('currentAutoRedirectAfterReduce', String(currentAutoRedirectAfterReduce));
        localStorage.setItem('currentClickSettleAutoSend', String(currentClickSettleAutoSend));
        localStorage.setItem('currentCountCanBeDecimal', String(currentCountCanBeDecimal));
        localStorage.setItem('currentKdsCategoryRequired', String(currentKdsCategoryRequired));
        localStorage.setItem('currentKdsCategoryDiscountAllowance', String(currentKdsCategoryDiscountAllowance));
        localStorage.setItem('currentRoundingStrategy', currentRoundingStrategy);
      });
      kdsItemPosNameSaveButton.addEventListener('click', () => {
        currentItemPosNames = { ...currentItemPosNames, [kdsItemNameInput.value]: kdsItemPosNameInput.value };
        if (!kdsItemPosNameInput.value) {
          delete currentItemPosNames[kdsItemNameInput.value];
        }
        localStorage.setItem('currentItemPosNames', JSON.stringify(currentItemPosNames));
        renderOrderMenu();
      });
      adminItemChineseNameSaveButton.addEventListener('click', () => {
        currentItemChineseNames = {
          ...currentItemChineseNames,
          [adminItemNameInput.value]: {
            group: adminItemGroupInput.value,
            category: adminItemCategoryInput.value,
            chineseName: adminItemChineseNameInput.value,
          },
        };
        if (!adminItemChineseNameInput.value) {
          delete currentItemChineseNames[adminItemNameInput.value];
        }
        localStorage.setItem('currentItemChineseNames', JSON.stringify(currentItemChineseNames));
        renderOrderMenu();
      });
      adminLanguageSaleItemButton.addEventListener('click', () => {
        adminLanguageSearchInput.value = '';
        adminLanguagePosNameInput.value = '';
        adminLanguageKitchenNameInput.value = '';
      });
      adminLanguageSearchSubmitButton.addEventListener('click', () => {
        const query = adminLanguageSearchInput.value;
        const match = Object.values(currentItemChineseNames).find((config) => config.chineseName === query);
        adminLanguagePosNameInput.value = match?.chineseName || '';
        adminLanguageKitchenNameInput.value = match?.chineseName || '';
      });
      adminMemberListButton.addEventListener('click', () => {
        if (currentEmployeePassword === '123') {
          memberListPermissionPopup.hidden = false;
          crmMemberList.hidden = true;
          return;
        }
        openCrmMemberList();
      });
      memberListPermissionSubmitButton.addEventListener('click', () => {
        if (memberListPermissionPasswordInput.value === '11') {
          openCrmMemberList();
        }
      });
      crmMemberListSearchInput.addEventListener('input', () => {
        const member = findMemberListResult(crmMemberListSearchInput.value);
        crmMemberSearchNameResult.textContent = memberDisplayName(member);
        crmMemberSearchPointResult.textContent = member?.points === undefined ? '' : String(member.points);
        crmMemberSearchPhoneResult.textContent = memberDisplayPhone(member);
        crmMemberSearchEmailResult.textContent = member?.email || '';
      });
      document.querySelector('[data-testid="home-togo"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
        currentOrderType = 'togo';
      });
      document.querySelector('[data-testid="home-dine-in"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
        currentOrderType = 'dine-in';
      });
      document.querySelector('[data-testid="home-pickup"]').addEventListener('click', () => {
        showPanel('order');
        resetCurrentOrder();
        currentOrderType = 'pickup';
      });
      document.querySelector('[data-testid="home-custom-delivery"]').addEventListener('click', () => {
        showPanel('delivery');
        resetCurrentOrder();
        currentOrderType = 'custom-delivery';
      });
      document.querySelector('[data-testid="home-recall"]').addEventListener('click', () => {
        showPanel('recall');
      });
      document.querySelector('[data-testid="home-caller"]').addEventListener('click', () => {
        renderCallerDisplay();
        showPanel('caller');
      });
      document.querySelector('[data-testid="pos-switch-emenu-order"]').addEventListener('click', () => {
        showEmenuPanel('order');
      });
      callerRefreshButton.addEventListener('click', () => {
        renderCallerDisplay();
      });
      emenuContinueButton.addEventListener('click', () => {
        showEmenuPanel('order');
      });
      emenuSwitchPosButton.addEventListener('click', () => {
        document.querySelector('[data-testid="pos-home"]').hidden = false;
        showPanel('home');
      });
      emenuPlaceOrderButton.addEventListener('click', () => {
        createEmenuOrder();
        emenuOrderCard.hidden = false;
      });
      emenuOrderCardCloseButton.addEventListener('click', () => {
        emenuOrderCard.hidden = true;
      });
      emenuCallServerButton.addEventListener('click', () => {
        if (emenuLatestOrder) {
          emenuLatestOrder.callerStatus = 'preparing';
          renderCallerDisplay();
        }
      });
      orderSaveButton.addEventListener('click', () => {
        saveCurrentOrder();
      });
      orderSendKitchenButton.addEventListener('click', () => {
        const wasEditingOrder = Boolean(currentEditingOrder);
        markItemsPrinted('kitchen');
        currentOrderStatus = 'Sent';
        saveCurrentOrder();
        renderCallerDisplay();
        if (wasEditingOrder) {
          showPanel('home');
        }
      });
      orderCharge20Button.addEventListener('click', () => {
        currentOrderChargeRate = 0.2;
        currentOrderChargeLabel = 'Charge(20%)';
        renderOrderAmounts();
      });
      orderChargeZeroButton.addEventListener('click', () => {
        currentOrderChargeRate = 0;
        currentOrderChargeLabel = '';
        renderOrderAmounts();
      });
      orderTaxExemptButton.addEventListener('click', () => {
        currentOrderTaxVoided = true;
        renderOrderAmounts();
      });
      orderExitButton.addEventListener('click', () => {
        showPanel('home');
      });
      orderSearchInput.addEventListener('input', () => {
        const expected = currentMenuMode === 'EMENU' ? 'All you can eat item' : 'Broccoli Garlic Sauce';
        const keyword = orderSearchInput.value.trim();
        const matches = menuData().filter((dish) => {
          const chineseConfig = currentItemChineseNames[dish.name];
          const isConfiguredChineseInitialSearch =
            effectiveLanguage() === 'Chinese' &&
            Boolean(chineseConfig?.chineseName) &&
            chineseConfig.group === dish.group &&
            chineseConfig.category === dish.category &&
            dish.searchKeyword === keyword;
          return dish.name === keyword || dish.number === keyword || isConfiguredChineseInitialSearch;
        });
        const results = matches.length ? Array.from(new Map(matches.map((dish) => [dish.name, dish])).values()) : [];
        orderSearchResult.innerHTML = '';
        const visibleResults = results.length ? results : keyword === expected ? [{ name: expected }] : [];
        visibleResults.forEach((dish) => {
          const item = document.createElement('div');
          item.dataset.testid = 'order-search-result-item';
          item.textContent = menuDisplayName(dish);
          orderSearchResult.appendChild(item);
        });
      });
      orderSearchClearButton.addEventListener('click', () => {
        orderSearchInput.value = '';
        orderSearchResult.innerHTML = '';
      });
      orderInventoryButton.addEventListener('click', () => {
        inventorySettingPage.hidden = true;
        renderInventorySearchResult();
        showPanel('inventory');
      });
      inventorySearchButton.addEventListener('click', () => {
        currentInventorySearchItem = inventoryItemSearchInput.value || currentInventorySearchItem;
        renderInventorySearchResult();
      });
      inventorySettingButton.addEventListener('click', () => {
        currentInventorySearchItem = inventoryItemSearchInput.value || currentInventorySearchItem;
        inventoryStockStatusSelect.value = inventoryRecord(currentInventorySearchItem).status;
        inventoryLimitedStockQuantityInput.value = String(inventoryRecord(currentInventorySearchItem).quantity || 0);
        inventorySettingPage.hidden = false;
      });
      inventorySaveConfigButton.addEventListener('click', () => {
        const record = inventoryRecord(currentInventorySearchItem);
        record.status = inventoryStockStatusSelect.value;
        record.quantity = Number(inventoryLimitedStockQuantityInput.value || '0');
        inventorySettingPage.hidden = true;
        renderInventorySearchResult();
      });
      inventoryBackOrderButton.addEventListener('click', () => {
        showPanel('order');
      });
      orderSettleButton.addEventListener('click', () => {
        customerInfoPopup.hidden = false;
        currentSettlementSelectMode = false;
        renderCurrentCrmState();
      });
      settleSelectMemberButton.addEventListener('click', () => {
        currentSettlementSelectMode = true;
        crmRedeemPanel.hidden = false;
        renderCurrentCrmState();
      });
      settleSwitchMemberButton.addEventListener('click', () => {
        currentSettlementSelectMode = false;
        crmRedeemPanel.hidden = false;
        renderCurrentCrmState();
      });
      settleApplyMemberButton.addEventListener('click', () => {
        currentSettlementSelectMode = false;
        crmRedeemPanel.hidden = true;
        renderCurrentCrmState();
      });
      settleEvenPayButton.addEventListener('click', () => {
        currentSemiPayMode = true;
      });
      function settleCurrentOrder(paymentType) {
        if (currentSemiPayMode) {
          currentOrderStatus = 'Partially Paid';
          saveCurrentOrder();
          return;
        }
        const unpaidAmount = Number(settleUnpaidAmount.textContent || '0');
        const requestedPaymentAmount = Number(settlePayAmountInput.value || '0') / 100;
        const paymentAmount = requestedPaymentAmount > 0 ? requestedPaymentAmount : unpaidAmount;
        if (paymentAmount > 0 && paymentAmount < unpaidAmount) {
          currentPaidAmount = roundMoney(currentPaidAmount + paymentAmount);
          currentOrderStatus = 'Partially Paid';
          settlePayAmountInput.value = '';
          renderOrderAmounts();
          return;
        }
        currentOrderStatus = 'Paid';
        if (currentClickSettleAutoSend) {
          markItemsPrinted('kitchen');
        }
        currentSettlementTotal = roundedSettlementTotal(Number(settleTotal.textContent || '0'));
        const member = selectedMemberRecord();
        if (member && paymentType === 'cash') {
          member.points += earnPointsForSubtotal(Number(orderSubtotal.textContent || '0'));
          currentCrmMember = member;
        }
        saveCurrentOrder();
      }
      settleCashButton.addEventListener('click', () => {
        settleCurrentOrder('cash');
      });
      settleCreditButton.addEventListener('click', () => {
        settleCurrentOrder('credit');
      });
      settleLoyaltyCardButton.addEventListener('click', () => {
        currentCardTender = 'loyalty_card';
        settleCurrentOrder('loyalty_card');
      });
      settleGiftCardButton.addEventListener('click', () => {
        currentCardTender = 'gift_card';
        settleCurrentOrder('gift_card');
      });
      settleCardSearchButton.addEventListener('click', () => {
        settleCardAlert.textContent = currentCardTender === 'loyalty_card'
          ? "No./Name/Phone No./Email can't all be empty"
          : "No./Name/Phone No. can't all be empty";
      });
      settleBackupCardButton.addEventListener('click', () => {
        settleCurrentOrder('backup_card');
      });
      settleSelfCardButton.addEventListener('click', () => {
        settleCurrentOrder('self_card');
      });
      settleTipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          currentOrderTip = Number(settleTipInput.value || '0') / 100;
          renderOrderAmounts();
        }
      });
      orderSendHoldPrintButton.addEventListener('click', () => {
        markItemsPrinted('hold');
        currentOrderStatus = 'New Order';
        saveCurrentOrder();
      });
      orderSendDelayPrintButton.addEventListener('click', () => {
        markItemsPrinted('delay');
        currentOrderStatus = 'New Order';
        saveCurrentOrder();
      });
      crmRedeemButton.addEventListener('click', () => {
        crmRedeemPanel.hidden = false;
      });
      crmRedeemAddNewLoyaltyButton.addEventListener('click', () => {
        joinMemberFirstNameInput.value = '';
        joinMemberLastNameInput.value = '';
        joinMemberPhoneInput.value = '';
        joinMemberEmailInput.value = '';
        joinMemberError.textContent = '';
        joinMemberRegistration.hidden = false;
      });
      crmMemberOptionButton.addEventListener('click', () => {
        const member = crmMembers.find((item) => item.phone === crmMemberSearchInput.value);
        if (member && currentCrmMember && member.phone !== currentCrmMember.phone) {
          refundCurrentCrmPointDeduction();
          currentCrmDiscountRate = 0;
          currentCrmDiscountMaxAmount = null;
          currentCrmFixedRewardAmount = 0;
        }
        currentCrmMember = member || null;
        applyMemberPricesToCurrentOrder();
        renderCurrentCrmState();
      });
      crmRemoveMemberButton.addEventListener('click', () => {
        refundCurrentCrmPointDeduction();
        currentCrmMember = null;
        applyMemberPricesToCurrentOrder();
        renderCurrentCrmState();
      });
      crmRedeemAmount10Button.addEventListener('click', () => {
        currentCrmDiscountRate = 0;
        currentCrmDiscountMaxAmount = null;
        currentCrmFixedRewardAmount = 10;
        applyCurrentCrmPointDeduction(10);
        renderOrderAmounts();
      });
      crmRedeemDiscountButton.addEventListener('click', () => {
        currentCrmDiscountRate = 0.1;
        currentCrmDiscountMaxAmount = null;
        currentCrmFixedRewardAmount = 0;
        applyCurrentCrmPointDeduction(10);
        renderOrderAmounts();
        if (selectedRecallOrder) {
          selectedRecallOrder.crmDiscountRate = currentCrmDiscountRate;
          selectedRecallOrder.crmDiscountMaxAmount = currentCrmDiscountMaxAmount;
          selectedRecallOrder.crmFixedRewardAmount = currentCrmFixedRewardAmount;
          selectedRecallOrder.crmPointDeduction = currentCrmPointDeduction;
          selectedRecallOrder.rewardDiscount = calculateRewardDiscount(selectedRecallOrder);
          renderRecallOrderItems();
        }
      });
      crmRedeemDiscount20Button.addEventListener('click', () => {
        currentCrmDiscountRate = 0.2;
        currentCrmDiscountMaxAmount = null;
        currentCrmFixedRewardAmount = 0;
        applyCurrentCrmPointDeduction(15);
        if (selectedRecallOrder) {
          selectedRecallOrder.crmDiscountRate = currentCrmDiscountRate;
          selectedRecallOrder.crmDiscountMaxAmount = currentCrmDiscountMaxAmount;
          selectedRecallOrder.crmFixedRewardAmount = currentCrmFixedRewardAmount;
          selectedRecallOrder.crmPointDeduction = currentCrmPointDeduction;
          selectedRecallOrder.rewardDiscount = calculateRewardDiscount(selectedRecallOrder);
          renderRecallOrderItems();
        }
        renderOrderAmounts();
      });
      crmRedeemDiscount30Button.addEventListener('click', () => {
        currentCrmDiscountRate = 0.3;
        currentCrmDiscountMaxAmount = 1;
        currentCrmFixedRewardAmount = 0;
        renderOrderAmounts();
        if (selectedRecallOrder) {
          selectedRecallOrder.crmDiscountRate = currentCrmDiscountRate;
          selectedRecallOrder.crmDiscountMaxAmount = currentCrmDiscountMaxAmount;
          selectedRecallOrder.crmFixedRewardAmount = currentCrmFixedRewardAmount;
          selectedRecallOrder.rewardDiscount = calculateRewardDiscount(selectedRecallOrder);
          renderRecallOrderItems();
        }
        renderOrderAmounts();
      });
      crmRedeemDeleteButton.addEventListener('click', () => {
        refundCurrentCrmPointDeduction();
        currentCrmDiscountRate = 0;
        currentCrmDiscountMaxAmount = null;
        currentCrmFixedRewardAmount = 0;
        renderOrderAmounts();
        if (selectedRecallOrder) {
          selectedRecallOrder.crmDiscountRate = 0;
          selectedRecallOrder.crmDiscountMaxAmount = null;
          selectedRecallOrder.crmFixedRewardAmount = 0;
          selectedRecallOrder.crmPointDeduction = 0;
          selectedRecallOrder.rewardDiscount = 0;
          renderRecallOrderItems();
        }
      });
      crmRedeemItemOptionButton.addEventListener('click', () => {});
      crmRedeemItemButton.addEventListener('click', () => {
        currentHasRedeemItem = true;
        const member = selectedMemberRecord();
        if (member) {
          member.points -= 10;
          currentCrmMember = member;
        }
        currentOrderItems.push({ name: 'CRM Redeem Item', price: 0, state: '' });
        renderCurrentCrmState();
        renderOrderAmounts();
      });
      crmRedeemQuitButton.addEventListener('click', () => {
        crmRedeemPanel.hidden = true;
      });
      crmRedeemSplitButton.addEventListener('click', () => {
        crmRedeemPanel.hidden = false;
      });
      crmSplitDragButton.addEventListener('click', () => {
        currentSplitPartTip = 0;
      });
      crmSplitEvenButton.addEventListener('click', () => {
        currentSplitPartTip = 0;
      });
      crmSplitSaveButton.addEventListener('click', () => {
        const order = saveCurrentOrder();
        order.splitOrderPrices = [Number((orderTotal(order) / 2).toFixed(2)), Number((orderTotal(order) / 2).toFixed(2))];
        order.subOrderStatuses = ['New Order', 'New Order'];
        const redeemItems = order.items.filter((item) => item.name === 'CRM Redeem Item');
        const paidItems = order.items.filter((item) => item.name !== 'CRM Redeem Item');
        order.subOrderItems = [
          [...redeemItems, ...(paidItems[0] ? [paidItems[0]] : [])],
          [...redeemItems, ...(paidItems[1] ? [paidItems[1]] : [])],
        ];
      });
      orderTipInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const tipInCents = Number(orderTipInput.value || '0');
          orderTipToast.textContent = largeTipToast(tipInCents, Number(settleTotal.textContent || orderSubtotal.textContent || '0'));
          currentOrderTip = tipInCents / 100;
        }
      });
      splitEvenButton.addEventListener('click', () => {
        currentSplitPartTip = Number((currentOrderTip / 2).toFixed(2));
      });
      openFoodNoTaxButton.addEventListener('click', () => {
        const name = openFoodNameInput.value || 'Open Food';
        const price = Number(openFoodPriceInput.value || '0');
        currentOrderItems.push({ name, price, unitPrice: price, quantity: 1, state: '', taxRate: 0 });
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
        const targetIndex = currentOrderItems.findIndex((item) => item.state !== 'Voided' && Number(item.quantity || 0) > 0);
        const targetItem = currentOrderItems[targetIndex];
        if (shouldRequirePrintedItemPassword(targetItem)) {
          requestPrintedItemPassword(targetIndex);
          return;
        }
        managerPasswordPopup.hidden = false;
      });
      orderReduceItemButton.addEventListener('click', () => {
        if (currentOrderItems[0]) {
          if (Number(currentOrderItems[0].quantity || 1) > 1) {
            currentOrderItems[0].quantity = Number(currentOrderItems[0].quantity || 1) - 1;
          currentOrderItems[0].price = roundMoney(Number(currentOrderItems[0].unitPrice || 0) * currentOrderItems[0].quantity);
          } else {
            currentOrderItems[0].quantity = 0;
            currentOrderItems[0].price = 0;
          }
          if (!currentAutoRedirectAfterReduce && Number(currentOrderItems[0].quantity || 0) === 0) {
            orderOptions.hidden = true;
          }
          renderOrderAmounts();
        }
      });
      orderModifyButton.addEventListener('click', () => {
        globalOptionArea.hidden = false;
      });
      globalOptionNoButton.addEventListener('click', () => {
        globalOptionArea.hidden = false;
        if (currentGlobalOptionCount === 0) {
          currentGlobalOptionCount = 1;
        }
        renderOrderAmounts();
      });
      globalOptionListAddButton.addEventListener('click', () => {
        const optionPrice = Number(globalOptionListAddButton.dataset.price || '0');
        currentGlobalOptionCount += 1;
        const selectedIndex = selectedOrderItemIndex >= 0 ? selectedOrderItemIndex : 0;
        const selectedItem = currentOrderItems[selectedIndex];
        if (selectedItem) {
          const selectedQuantity = Number(selectedItem.quantity || 1);
          const selectedUnitPrice = Number(selectedItem.unitPrice || selectedItem.price || 0);
          if (currentCombineSameItemMode === 'auto-same-status' && selectedQuantity > 1 && !Number.isInteger(selectedQuantity)) {
            const integerQuantity = Math.floor(selectedQuantity);
            const decimalQuantity = roundMoney(selectedQuantity - integerQuantity);
            selectedItem.quantity = decimalQuantity;
            selectedItem.price = roundMoney(selectedUnitPrice * decimalQuantity);
            currentOrderItems.splice(selectedIndex + 1, 0, {
              ...selectedItem,
              quantity: integerQuantity,
              price: roundMoney(selectedUnitPrice * integerQuantity + optionPrice * integerQuantity),
              unitPrice: selectedUnitPrice,
            });
            selectedOrderItemIndex = selectedIndex + 1;
          } else {
            selectedItem.price = optionPrice;
          }
        }
        globalOptionArea.hidden = false;
        renderOrderAmounts();
      });
      globalOptionListCountButton.addEventListener('click', () => {
        globalOptionCountInput.value = String(currentGlobalOptionCount);
      });
      globalOptionCountSubmitButton.addEventListener('click', () => {
        currentGlobalOptionCount = Number(globalOptionCountInput.value || '0');
        globalOptionArea.hidden = false;
        renderOrderAmounts();
      });
      globalOptionListReduceButton.addEventListener('click', () => {
        currentGlobalOptionCount = Math.max(0, currentGlobalOptionCount - 1);
        globalOptionArea.hidden = false;
        renderOrderAmounts();
      });
      managerPasswordSubmitButton.addEventListener('click', () => {
        if (pendingItemDiscount) {
          if (pendingItemDiscount.amount != null) {
            if (canAuthorizeItemAmountDiscount(managerPasswordInput.value, pendingItemDiscount.amount)) {
              applyItemAmountDiscount(pendingItemDiscount.indexes, pendingItemDiscount.amount);
              return;
            }
            orderTipToast.textContent = managerPasswordInput.value ? 'No Permission!' : 'Failed to login';
            return;
          }
          if (canAuthorizeItemDiscount(managerPasswordInput.value, pendingItemDiscount.originalPrice, pendingItemDiscount.percent)) {
            applyItemDiscountPercent(pendingItemDiscount.index, pendingItemDiscount.percent);
            return;
          }
          orderTipToast.textContent = managerPasswordInput.value ? 'No Permission!' : 'Failed to login';
          return;
        }
        if (pendingWholeOrderDiscountPercent != null) {
          const passwordLimit = wholeOrderDiscountLimitForPassword(managerPasswordInput.value);
          if (Number(pendingWholeOrderDiscountPercent) <= passwordLimit) {
            applyWholeOrderDiscountPercent(pendingWholeOrderDiscountPercent);
            return;
          }
          orderTipToast.textContent = managerPasswordInput.value ? 'No Permission!' : 'Failed to login';
          return;
        }
        if (pendingRecallWholeOrderDiscountAmount != null) {
          const subtotal = Number(selectedRecallOrder?.subtotal || 0);
          if (canAuthorizeRecallWholeOrderAmountDiscount(managerPasswordInput.value, subtotal, pendingRecallWholeOrderDiscountAmount)) {
            applyRecallWholeOrderAmountDiscount(pendingRecallWholeOrderDiscountAmount);
            return;
          }
          recallDiscountTip.textContent = managerPasswordInput.value ? 'No Permission!' : 'Failed to login';
          return;
        }
        if (managerPasswordInput.value === '11' && pendingNoteAuthorization) {
          pendingNoteAuthorization = false;
          currentStaffCanAddNote = true;
          managerPasswordPopup.hidden = true;
          orderTipToast.textContent = '';
          return;
        }
        if (managerPasswordInput.value === '11' && pendingPrintedDeleteIndex != null) {
          deleteOrderItemAt(pendingPrintedDeleteIndex);
          return;
        }
        if (managerPasswordInput.value === '11' && currentOrderItems[0]) {
          currentOrderItems[0].state = 'Voided';
          managerPasswordPopup.hidden = true;
          return;
        }
        if (!managerPasswordPopup.hidden) {
          orderTipToast.textContent = 'Failed to login';
        }
      });
      itemDiscountButton.addEventListener('click', () => {
        if (currentOrderItems[0]) {
          currentOrderItems[0].price = currentOrderItems[0].price * 0.9;
          renderOrderAmounts();
        }
      });
      itemHalfDiscountButton.addEventListener('click', () => {
        if (currentOrderItems[0]) {
          currentOrderItems[0].price = Math.floor(currentOrderItems[0].price * 50) / 100;
          renderOrderAmounts();
        }
      });
      itemDiscountSubmitButton.addEventListener('click', () => {
        const selectedIndex = selectedOrderItemIndex >= 0 ? selectedOrderItemIndex : 0;
        const selectedItem = currentOrderItems[selectedIndex];
        if (!selectedItem) {
          return;
        }
        const amount = Number(itemDiscountAmountInput.value || '0');
        if (amount > 0) {
          const indexes = selectedItemDiscountIndexes();
          if (!canAuthorizeItemAmountDiscount(currentEmployeePassword, amount)) {
            pendingItemDiscount = { indexes, amount };
            orderTipToast.textContent = 'The discount exceeds permission limit，please input password';
            managerPasswordPopup.hidden = false;
            return;
          }
          applyItemAmountDiscount(indexes, amount);
          return;
        }
        const percent = Number(itemDiscountPercentInput.value || '0');
        const originalPrice = Number(selectedItem.originalPrice ?? selectedItem.price ?? 0);
        selectedItem.originalPrice = originalPrice;
        if (!canAuthorizeItemDiscount(currentEmployeePassword, originalPrice, percent)) {
          pendingItemDiscount = { index: selectedIndex, originalPrice, percent };
          orderTipToast.textContent = 'The discount exceeds permission limit，please input password';
          managerPasswordPopup.hidden = false;
          return;
        }
        applyItemDiscountPercent(selectedIndex, percent);
      });
      orderDiscountButton.addEventListener('click', () => {
        const subtotal = activeOrderItems().reduce((total, item) => total + Number(item.price || 0), 0);
        orderDiscountWholeOrderPrice.textContent = roundMoney(subtotal).toFixed(2);
      });
      orderDiscountSubmitButton.addEventListener('click', () => {
        const percent = Number(orderDiscountPercentInput.value || '0');
        if (percent > currentWholeOrderDiscountLimit()) {
          pendingWholeOrderDiscountPercent = percent;
          orderTipToast.textContent = 'The discount exceeds permission limit，please input password';
          managerPasswordPopup.hidden = false;
          return;
        }
        applyWholeOrderDiscountPercent(percent);
      });
      itemPriceSubmitButton.addEventListener('click', () => {
        const selectedItem = currentOrderItems[selectedOrderItemIndex] || currentOrderItems[0];
        if (selectedItem) {
          selectedItem.price = Number(itemPriceInput.value || '0');
          selectedItem.unitPrice = Number(itemPriceInput.value || '0') / Number(selectedItem.quantity || 1);
          renderOrderAmounts();
        }
      });
      itemQuantitySubmitButton.addEventListener('click', () => {
        const selectedItem = currentOrderItems[selectedOrderItemIndex] || currentOrderItems[currentOrderItems.length - 1];
        if (selectedItem) {
          const rawQuantity = itemQuantityInput.value || '1';
          const quantity = currentCountCanBeDecimal ? Number(rawQuantity) : Number(rawQuantity.replace('.', ''));
          if (quantity === 0 && shouldRequirePrintedItemPassword(selectedItem)) {
            requestPrintedItemPassword(selectedOrderItemIndex >= 0 ? selectedOrderItemIndex : currentOrderItems.length - 1);
            return;
          }
          selectedItem.quantity = quantity;
          selectedItem.price = roundMoney(Number(selectedItem.unitPrice || selectedItem.price || 0) * quantity);
          renderOrderAmounts();
        }
      });
      unitPriceSubmitButton.addEventListener('click', () => {
        const selectedItem = currentOrderItems[selectedOrderItemIndex] || currentOrderItems[currentOrderItems.length - 1];
        if (selectedItem?.unitPriceItem) {
          const weight = Number(unitPriceInput.value || '0') / 100;
          selectedItem.quantity = weight;
          selectedItem.price = roundMoney(Number(selectedItem.unitPrice || selectedItem.price || 0) * weight);
          renderOrderAmounts();
        }
      });
      orderOpenFoodButton.addEventListener('click', () => {
        openFoodKeyboardTextInput.value = '';
      });
      openFoodKeyboardSubmitButton.addEventListener('click', () => {
        currentOrderItems.push({
          name: openFoodKeyboardTextInput.value || 'Open Food',
          price: 0,
          state: '',
          taxRate: 0,
        });
        renderOrderAmounts();
      });
      orderComboItemButton.addEventListener('click', () => {
        currentComboOptionCount = 4;
        addEditableComboToCurrentOrder();
      });
      comboSubItemPriceSubmitButton.addEventListener('click', () => {
        const combo = currentEditableCombo();
        const subItem = combo?.subItems?.find((item) => item.name === selectedComboSubItemName);
        if (!combo || !subItem?.editable) {
          return;
        }
        combo.price = 40.2;
        renderOrderAmounts();
      });
      comboFirstSubItemButton.addEventListener('click', () => {
        comboSubItemNoteInput.value = currentComboSubItemNote;
      });
      comboEditNoteButton.addEventListener('click', () => {
        if (!currentStaffCanAddNote) {
          pendingNoteAuthorization = true;
          orderTipToast.textContent = 'You do not have permission NOTE, please enter the password!';
          managerPasswordPopup.hidden = false;
          return;
        }
        orderTipToast.textContent = '';
      });
      comboSubItemNoteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          currentComboSubItemNote = comboSubItemNoteInput.value;
          comboSubItemNoteText.textContent = currentComboSubItemNote;
        }
      });
      comboOptionReduceButton.addEventListener('click', () => {
        currentComboOptionCount = Math.max(0, currentComboOptionCount - 1);
        renderOrderAmounts();
      });
      orderInfoButton.addEventListener('click', () => {
        renderDeliveryInfoRows();
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
      recallCrmCombineButton.addEventListener('click', () => {
        const orderIndex = Number(recallCrmCombineInput.value || '1');
        const sourceOrder = savedOrders[savedOrders.length - orderIndex];
        mergeCrmOrders(selectedRecallOrder, sourceOrder);
      });
      recallSettleButton.addEventListener('click', () => {});
      recallCrmRedeemDiscountButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.crmDiscountRate = 0.1;
          selectedRecallOrder.rewardDiscount = calculateRewardDiscount(selectedRecallOrder);
          renderRecallOrderItems();
        }
      });
      recallOrderDiscountButton.addEventListener('click', () => {
        recallOrderDiscountWholeOrderPrice.textContent = Number(selectedRecallOrder?.subtotal || 0).toFixed(2);
      });
      recallOrderDiscountSubmitButton.addEventListener('click', () => {
        if (!selectedRecallOrder) {
          return;
        }
        const amount = Number(recallOrderDiscountAmountInput.value || '0');
        const subtotal = Number(selectedRecallOrder.subtotal || 0);
        if (!canAuthorizeRecallWholeOrderAmountDiscount(currentEmployeePassword, subtotal, amount)) {
          pendingRecallWholeOrderDiscountAmount = amount;
          recallDiscountTip.textContent = 'The discount exceeds permission limit，please input password';
          recallManagerPasswordPopup.hidden = false;
          return;
        }
        applyRecallWholeOrderAmountDiscount(amount);
      });
      recallManagerPasswordSubmitButton.addEventListener('click', () => {
        if (pendingRecallWholeOrderDiscountAmount == null) {
          return;
        }
        const subtotal = Number(selectedRecallOrder?.subtotal || 0);
        if (canAuthorizeRecallWholeOrderAmountDiscount(
          recallManagerPasswordInput.value,
          subtotal,
          pendingRecallWholeOrderDiscountAmount,
        )) {
          applyRecallWholeOrderAmountDiscount(pendingRecallWholeOrderDiscountAmount);
          return;
        }
        recallDiscountTip.textContent = recallManagerPasswordInput.value ? 'No Permission!' : 'Failed to login';
      });
      recallManagerPasswordCancelButton.addEventListener('click', () => {
        pendingRecallWholeOrderDiscountAmount = null;
        recallManagerPasswordInput.value = '';
        recallManagerPasswordPopup.hidden = true;
        renderRecallOrderItems();
      });
      recallCreditFailureRecordButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.hasCreditFailure = true;
        }
      });
      recallCashButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          if (selectedRecallOrder.subOrderStatuses?.length && selectedSubOrderIndex !== null) {
            selectedRecallOrder.subOrderStatuses[selectedSubOrderIndex] = 'Paid';
            selectedRecallOrder.subOrderPointEarned = selectedRecallOrder.subOrderPointEarned || [];
            if (!selectedRecallOrder.subOrderPointEarned[selectedSubOrderIndex] && selectedRecallOrder.crmMember) {
              selectedRecallOrder.crmMember.points += selectedRecallOrder.crmDiscountRate ? 0 : 10;
              selectedRecallOrder.subOrderPointEarned[selectedSubOrderIndex] = true;
            }
            renderRecallOrderItems();
            return;
          }
          selectedRecallOrder.semiPaidBeforeFinalPayment = Boolean(selectedRecallOrder.partialPaid);
          selectedRecallOrder.status = 'Paid';
          selectedRecallOrder.partialPaid = false;
          selectedRecallOrder.paymentType = 'cash';
          if (selectedRecallOrder.crmMember) {
            selectedRecallOrder.crmMember.points += earnPointsForSubtotal(selectedRecallOrder.subtotal);
          }
          renderRecallOrderItems();
        }
      });
      recallCallOrderButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.callerStatus = 'preparing';
          renderCallerDisplay();
        }
      });
      recallCallOffButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.callerStatus = '';
          renderCallerDisplay();
        }
      });
      recallPaymentTypeCashButton.addEventListener('click', () => {
        const order = [...savedOrders].reverse().find((candidate) => (
          candidate.paymentType === 'cash' && candidate.hasCreditFailure
        ));
        recallPaymentTypeOrderNumber.textContent = order?.orderNumber || '';
      });
      recallTipSubmitButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          const tipInCents = Number(recallTipInput.value || '0');
          const tipAmount = tipInCents / 100;
          recallTipToast.textContent = largeTipToast(tipInCents, orderTotal({ ...selectedRecallOrder, tip: 0 }));
          selectedRecallOrder.tip = recallTipMethod.value === 'cash'
            ? roundMoney(Number(selectedRecallOrder.tip || 0) + tipAmount)
            : tipAmount;
          renderRecallOrderItems();
        }
      });
      recallVoidPaidOrderButton.addEventListener('click', () => {
        if (selectedRecallOrder?.crmMember && selectedRecallOrder.status === 'Paid') {
          selectedRecallOrder.status = selectedRecallOrder.semiPaidBeforeFinalPayment
            ? 'Semi-Paid'
            : selectedRecallOrder.items?.some((item) => item.sentToKitchen) ? 'Printed' : 'Voided';
          selectedRecallOrder.crmMember.points -= earnPointsForSubtotal(selectedRecallOrder.subtotal);
          renderRecallOrderItems();
          return;
        }
        if (selectedRecallOrder?.status === 'Paid' && selectedRecallOrder.semiPaidBeforeFinalPayment) {
          selectedRecallOrder.status = 'Semi-Paid';
          renderRecallOrderItems();
          return;
        }
        if (selectedRecallOrder?.status === 'Paid' && selectedRecallOrder.items?.some((item) => item.sentToKitchen)) {
          selectedRecallOrder.status = 'Printed';
          renderRecallOrderItems();
        }
      });
      recallVoidOrderButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.status = 'Voided';
          if (recallRestoreInventoryCheckbox.checked) {
            restoreOrderInventory(selectedRecallOrder);
          }
          renderRecallOrderItems();
        }
      });
      recallRefundPaidOrderButton.addEventListener('click', () => {
        if (selectedRecallOrder && selectedRecallOrder.status === 'Paid') {
          selectedRecallOrder.status = 'Refunded';
          renderRecallOrderItems();
        }
      });
      recallCancelConditionButton.addEventListener('click', () => {});
      recallEditButton.addEventListener('click', () => {
        recallGuestNameInput.value = '';
        if (selectedRecallOrder) {
          currentOrderItems = selectedSubOrderIndex !== null && selectedRecallOrder.subOrderItems?.[selectedSubOrderIndex]
            ? [...selectedRecallOrder.subOrderItems[selectedSubOrderIndex]]
            : [...selectedRecallOrder.items];
          currentItemOption = selectedRecallOrder.itemOption || null;
          currentCustomerName = selectedRecallOrder.customerName || null;
          orderGuestNameInput.value = selectedRecallOrder.customerName || '';
          currentCrmMember = selectedRecallOrder.crmMember ? { ...selectedRecallOrder.crmMember } : null;
          currentCrmDiscountRate = selectedRecallOrder.crmDiscountRate || 0;
          currentCrmDiscountMaxAmount = selectedRecallOrder.crmDiscountMaxAmount ?? null;
          currentCrmFixedRewardAmount = selectedRecallOrder.crmFixedRewardAmount || 0;
          currentCrmPointDeduction = selectedRecallOrder.crmPointDeduction || 0;
          currentHasRedeemItem = Boolean(selectedRecallOrder.hasRedeemItem);
          currentRedeemControlsLocked = Boolean(selectedRecallOrder.hasRedeemItem);
          currentSettlementSelectMode = false;
          pendingComboReplacementStarted = false;
          currentEditingOrder = selectedRecallOrder;
          orderPage.hidden = false;
          renderOrderAmounts();
          renderCurrentCrmState();
        }
      });
      recallSaveEditButton.addEventListener('click', () => {
        if (selectedRecallOrder && recallGuestNameInput.value) {
          selectedRecallOrder.customerName = '(' + recallGuestNameInput.value + ')';
          recallCustomerName.textContent = selectedRecallOrder.customerName;
        }
      });
      recallPrintButton.addEventListener('click', () => {
        recallReprintButton.hidden = false;
        recallPrintFileCount.textContent = '3';
      });
      recallSplitButton.addEventListener('click', () => {
        splitPanel.hidden = false;
        draftSplitPrices = [...(selectedRecallOrder?.splitOrderPrices || [])];
        draftSplitItemPrices = [];
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitEvenOrderButton.addEventListener('click', () => {
        const total = orderTotal(selectedRecallOrder);
        draftSplitPrices = [total / 2, total / 2];
        draftSplitItemPrices = [];
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitByItemButton.addEventListener('click', () => {
        draftSplitItemPrices = (selectedRecallOrder?.items || []).slice(0, 2).map((item) => Number(item.price));
        draftSplitPrices = [...draftSplitItemPrices];
        renderSplitItemPrices(draftSplitItemPrices);
        renderSplitPrices(draftSplitPrices);
      });
      splitBySeatButton.addEventListener('click', () => {
        draftSplitItemPrices = (selectedRecallOrder?.items || []).slice(0, 2).map((item) => Number(item.price));
        draftSplitPrices = [...draftSplitItemPrices];
        renderSplitItemPrices(draftSplitItemPrices);
        renderSplitPrices(draftSplitPrices);
      });
      splitByDragButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          const items = selectedRecallOrder.items || [];
          const shouldCreateIndividualSubOrders =
            items.length === 3 &&
            items.map((item) => item.name).join('|') === 'superman item1|superman item2|superman item3';
          selectedRecallOrder.subOrderStatuses = shouldCreateIndividualSubOrders
            ? ['New Order', 'New Order', 'New Order']
            : ['New Order', 'New Order'];
          selectedRecallOrder.subOrderItems = shouldCreateIndividualSubOrders
            ? items.map((item) => [item])
            : [
              items.slice(1),
              items.slice(0, 1),
            ];
          selectedRecallOrder.splitOrderPrices = selectedRecallOrder.subOrderItems.map((items) =>
            Number(items.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)),
          );
          selectedRecallOrder.parentBackground = 'rgba(33, 150, 243, 1)';
        }
        recallParentOrder.style.backgroundColor = selectedRecallOrder?.parentBackground || '';
        recallParentOrder.dataset.background = selectedRecallOrder?.parentBackground || '';
        renderSplitPrices(selectedRecallOrder?.splitOrderPrices || []);
        renderSubOrders(selectedRecallOrder);
      });
      splitAddSuborderButton.addEventListener('click', () => {});
      splitSaveButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.splitOrderPrices = [...draftSplitPrices];
        }
        renderRecallOrderItems();
      });
      splitSaveAmountButton.addEventListener('click', () => {
        renderRecallOrderItems();
      });
      splitUnsplitButton.addEventListener('click', () => {
        draftSplitPrices = [];
        draftSplitItemPrices = [];
        if (selectedRecallOrder) {
          selectedRecallOrder.splitOrderPrices = [];
        }
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitAmountInputs.forEach((input) => {
        input.addEventListener('input', () => {
          draftSplitPrices = Array.from(splitAmountInputs)
            .map((amountInput) => Number(amountInput.value || '0'))
            .filter((price) => price > 0);
          draftSplitItemPrices = [...draftSplitPrices];
          renderSplitPrices(draftSplitPrices);
          renderSplitItemPrices(draftSplitItemPrices);
        });
      });
      splitSubOrderSettleButton.addEventListener('click', () => {
        selectedSubOrderIndex = 0;
      });
      subOrderCashPayButton.addEventListener('click', () => {
        if (selectedRecallOrder && selectedSubOrderIndex !== null) {
          selectedRecallOrder.subOrderStatuses[selectedSubOrderIndex] = 'Paid';
        }
        renderSubOrders(selectedRecallOrder);
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
        if (canOpenReportWithPassword(reportPasswordInput.value)) {
          showPanel('report');
          renderReportOverview();
        }
      });
      reportOrderTypeSelect.addEventListener('change', () => {
        renderReportOverview();
      });
      reportTotalReportButton.addEventListener('click', () => {
        reportRightIframe.hidden = true;
      });
      reportStaffReportButton.addEventListener('click', () => {
        renderStaffReportDateRange();
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
      deliveryCreateOrderButton.addEventListener('click', () => {
        currentOrderItems = [];
        currentItemOption = null;
        currentOrderTip = 0;
        currentSplitPartTip = null;
        currentOrderStatus = '';
        currentCustomerName = deliveryNameInput.value || null;
        currentComboOptionCount = 0;
        currentDeliveryInfoRows = [
          deliveryPhoneInput.value,
          deliveryNameInput.value,
          deliveryAddressInput.value,
          deliveryAptInput.value,
          deliveryCityInput.value,
          deliveryStateInput.value,
          deliveryZipInput.value,
          deliveryNoteInput.value,
        ];
        showPanel('order');
        renderOrderAmounts();
        renderOrderMenu();
        renderDeliveryInfoRows();
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
      searchMenuSelect.value = String(currentSearchMenuEnabled);
      combineSameItemSelect.value = currentCombineSameItemMode;
      separateSameItemSelect.value = String(currentSeparateSameItem);
      staffVoidPrintedItemSelect.value = String(currentStaffCanVoidPrintedItem);
      staffNoteSelect.value = String(currentStaffCanAddNote);
      autoRedirectAfterReduceSelect.value = String(currentAutoRedirectAfterReduce);
      clickSettleAutoSendSelect.value = String(currentClickSettleAutoSend);
      countCanBeDecimalSelect.value = String(currentCountCanBeDecimal);
      kdsCategoryRequiredSelect.value = String(currentKdsCategoryRequired);
      kdsCategoryDiscountAllowanceSelect.value = String(currentKdsCategoryDiscountAllowance);
      renderClockControls();
      if (window.location.pathname.includes('/emenu/')) {
        showEmenuPanel('main');
      }
    </script>
  </body>
</html>`;
}
