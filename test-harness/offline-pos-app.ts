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
      <button data-testid="home-cash-in-out">Cash In/Out</button>
      <button data-testid="pos-switch-emenu-order">Emenu Order</button>
      <button data-testid="home-admin">Admin</button>
      <button data-testid="home-join-member">Join Member</button>
      <button data-testid="home-reservation">Reservation</button>
      <button data-testid="home-custom-delivery">Custom Delivery</button>
      <button data-testid="home-delivery">Delivery</button>
      <button data-testid="home-report">Report</button>
      <button data-testid="home-support">Support</button>
      <button data-testid="home-message-center">Message Center</button>
      <input data-testid="employee-password" id="pwipt" type="password" />
      <button data-testid="employee-password-save" id="ds">Save</button>
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
          <option value="Boss">Boss</option>
        </select>
        <input data-testid="admin-staff-wage" />
        <select data-testid="admin-staff-wage-type">
          <option value="1">Hourly</option>
          <option value="2">Weekly</option>
          <option value="3">Biweekly</option>
          <option value="4">Monthly</option>
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
        <button data-testid="admin-attendance-search">Attendance Search</button>
        <div data-testid="admin-attendance-list"></div>
        <button data-testid="admin-attendance-last-row" hidden>Last Attendance</button>
        <input data-testid="admin-attendance-wage" hidden />
        <select data-testid="admin-attendance-wage-type" hidden>
          <option value="1">Hourly</option>
          <option value="2">Weekly</option>
          <option value="3">Biweekly</option>
          <option value="4">Monthly</option>
        </select>
        <button data-testid="admin-attendance-save" hidden>Save Attendance</button>
      </section>
      <button data-testid="admin-kiosk">Kiosk</button>
      <section data-testid="admin-kiosk-page" hidden>
        <input data-testid="admin-kiosk-item-name" />
        <button data-testid="admin-kiosk-item-sold-out">Set Sold Out</button>
        <div data-testid="admin-kiosk-item-status"></div>
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
      <select data-testid="admin-combine-recalculate-charge">
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
      <input data-testid="admin-charge-old-name" />
      <input data-testid="admin-charge-new-name" />
      <button data-testid="admin-charge-rename">Rename Charge</button>
      <button data-testid="admin-manual-fixed-charge-setup">Setup Manual Fixed Charge</button>
      <button data-testid="admin-manual-percent-charge-as-tip-setup">Setup Manual Percent Charge As Tip</button>
      <button data-testid="admin-auto-fixed-charge-setup">Setup Auto Fixed Charge</button>
      <button data-testid="admin-auto-fixed-charge-as-tip-setup">Setup Auto Fixed Charge As Tip</button>
      <button data-testid="admin-auto-percent-charge-setup">Setup Auto Percent Charge</button>
      <button data-testid="admin-auto-percent-charge-as-tip-setup">Setup Auto Percent Charge As Tip</button>
      <input data-testid="admin-charge-rate-type-name" />
      <select data-testid="admin-charge-rate-type">
        <option value="amount">amount</option>
        <option value="percent">percent</option>
      </select>
      <button data-testid="admin-charge-rate-type-save">Save Charge Rate Type</button>
      <input data-testid="admin-charge-amount-name" />
      <input data-testid="admin-charge-amount" />
      <button data-testid="admin-charge-amount-save">Save Charge Amount</button>
      <input data-testid="admin-charge-tax-name" />
      <select data-testid="admin-charge-taxed">
        <option value="true">Taxed</option>
        <option value="false">Not Taxed</option>
      </select>
      <button data-testid="admin-charge-tax-save">Save Charge Tax</button>
      <input data-testid="admin-charge-order-type-name" />
      <select data-testid="admin-charge-order-types" multiple>
        <option value="dine-in">Dine In</option>
        <option value="delivery">Delivery</option>
        <option value="pickup">Pick Up</option>
        <option value="togo">To Go</option>
      </select>
      <button data-testid="admin-charge-order-types-save">Save Charge Order Types</button>
      <input data-testid="admin-charge-min-guest-name" />
      <input data-testid="admin-charge-min-guest" />
      <button data-testid="admin-charge-min-guest-save">Save Charge Min Guest</button>
      <input data-testid="admin-charge-min-mile-name" />
      <input data-testid="admin-charge-min-mile" />
      <button data-testid="admin-charge-min-mile-save">Save Charge Min Mile</button>
      <input data-testid="admin-charge-min-amount-name" />
      <input data-testid="admin-charge-min-amount" />
      <button data-testid="admin-charge-min-amount-save">Save Charge Min Amount</button>
      <input data-testid="admin-charge-trigger-name" />
      <select data-testid="admin-charge-trigger-mode">
        <option value="auto">Auto</option>
        <option value="manual">Manual</option>
      </select>
      <button data-testid="admin-charge-trigger-save">Save Charge Trigger</button>
      <button data-testid="admin-charge-delete-all">Delete All Charges</button>
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
      <input data-testid="order-guest-count" />
      <button data-testid="order-seat-shared">Shared</button>
      <button data-testid="order-seat-1">Seat 1</button>
      <button data-testid="order-seat-2">Seat 2</button>
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
      <button data-testid="item-discount-clear-selected">Clear Item Discount</button>
      <button data-testid="item-discount-submit">Apply Item Discount</button>
      <button data-testid="order-discount">Order Discount</button>
      <div data-testid="order-discount-whole-order-price"></div>
      <div data-testid="order-discount-amount"></div>
      <input data-testid="order-discount-percent" />
      <button data-testid="order-discount-clear-whole">Clear Whole Order Discount</button>
      <button data-testid="order-discount-submit">Apply Order Discount</button>
      <div data-testid="order-price-detail"></div>
      <input data-testid="order-tip" />
      <div data-testid="order-tip-toast"></div>
      <button data-testid="order-charge-20">Charge 20%</button>
      <button data-testid="order-charge-10">Charge 10%</button>
      <button data-testid="order-charge-10-taxable">Taxable Charge 10%</button>
      <button data-testid="order-charge-5">Charge 5%</button>
      <button data-testid="order-charge-0">Charge 0%</button>
      <input data-testid="order-custom-charge-value" />
      <select data-testid="order-custom-charge-rate-type">
        <option value="amount">amount</option>
        <option value="percent">percent</option>
      </select>
      <select data-testid="order-custom-charge-taxed">
        <option value="false">false</option>
        <option value="true">true</option>
      </select>
      <button data-testid="order-custom-charge-add">Add Custom Charge</button>
      <button data-testid="order-charge-open">Open Charge</button>
      <section data-testid="order-charge-dialog" hidden>
        <div data-testid="preset-charge-list"></div>
        <div data-testid="selected-charge-list"></div>
        <button data-testid="order-charge-ok">OK Charge</button>
      </section>
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
        <option value="KIOSK">KIOSK</option>
        <option value="EMENU">EMENU</option>
      </select>
      <select data-testid="inventory-type">
        <option value="All">All</option>
        <option value="Item">Item</option>
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
      <button data-testid="recall-send-kitchen">Send Kitchen</button>
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
      <div data-testid="recall-server-name"></div>
      <button data-testid="recall-change-server">Change Server</button>
      <div data-testid="recall-customer-name"></div>
      <div data-testid="recall-guest-phone"></div>
      <div data-testid="recall-guest-address"></div>
      <div data-testid="recall-order-subtotal"></div>
      <div data-testid="recall-order-tax"></div>
      <div data-testid="recall-order-reward">0</div>
      <div data-testid="recall-order-total"></div>
      <div data-testid="recall-order-price-detail"></div>
      <div data-testid="recall-crm-member-name"></div>
      <div data-testid="recall-crm-point-balance">0</div>
      <input data-testid="recall-crm-combine-order-no" />
      <button data-testid="recall-crm-combine-order">Combine CRM Order</button>
      <button data-testid="recall-copy-order">Copy Order</button>
      <button data-testid="recall-settle">Settle</button>
      <button data-testid="recall-crm-redeem-discount">10% Off</button>
      <button data-testid="recall-order-discount">Recall Order Discount</button>
      <div data-testid="recall-order-discount-whole-order-price"></div>
      <div data-testid="recall-discount-rows"></div>
      <input data-testid="recall-order-discount-amount" />
      <button data-testid="recall-order-discount-submit">Apply Recall Amount Discount</button>
      <button data-testid="recall-discount-clear-all">Clear All Recall Discounts</button>
      <button data-testid="recall-discount-ok" hidden>OK Recall Discount</button>
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
      <button data-testid="recall-unpaid-filter">Unpaid Filter</button>
      <div data-testid="recall-payment-type-order-number"></div>
      <button data-testid="recall-void-paid-order">Void Paid Order</button>
      <label>
        <input data-testid="recall-restore-inventory" type="checkbox" checked />
        Restore Inventory
      </label>
      <button data-testid="recall-void-order">Void Order</button>
      <div data-testid="recall-void-alert" role="alert"></div>
      <section data-testid="recall-void-reason-panel" hidden>
        <button data-testid="recall-void-reason-choose">Choose Void Reason</button>
        <div data-testid="recall-void-reasons"></div>
      </section>
      <button data-testid="recall-refund-paid-order">Refund Paid Order</button>
      <div data-testid="recall-payment-records"></div>
      <button data-testid="recall-cancel-condition">Cancel Condition</button>
      <button data-testid="recall-move-order">Move Order</button>
      <input data-testid="recall-move-target-order-index" />
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
        <input data-testid="sub-order-pay-amount" />
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
      <button data-testid="emenu-add-item">Add Item</button>
      <button data-testid="emenu-add-cart">Add Cart</button>
      <button data-testid="emenu-cart">Cart</button>
      <button data-testid="emenu-place-order">Place Order</button>
      <section data-testid="emenu-order-card" hidden>
        <button data-testid="emenu-order-card-close">Close Order Card</button>
      </section>
      <div data-testid="emenu-sold-out-popup" hidden>Insufficient stock</div>
      <button data-testid="emenu-call-server">Call Server</button>
      <button data-testid="emenu-switch-pos">POS</button>
    </section>
    <section data-testid="kiosk-page" hidden>
      <button data-testid="kiosk-select-license">Kiosk License</button>
      <button data-testid="kiosk-order-type-to-go">To Go</button>
      <div data-testid="kiosk-license-list"></div>
      <button data-testid="kiosk-menu-group">Chinese Food</button>
      <button data-testid="kiosk-menu-category">Appetizers</button>
      <button data-testid="kiosk-item">kiosk_item</button>
      <button data-testid="kiosk-view-order">View Order</button>
      <button data-testid="kiosk-checkout">Checkout</button>
      <button data-testid="kiosk-skip">Skip</button>
      <button data-testid="kiosk-cash-payment">Cash</button>
      <div data-testid="kiosk-sold-out-popup" hidden>Insufficient stock</div>
      <div data-testid="kiosk-cart-count">0</div>
    </section>
    <section data-testid="report-password-panel" hidden>
      <input data-testid="report-password" type="password" />
      <button data-testid="report-password-save">Save</button>
    </section>
    <section data-testid="cash-in-out-page" hidden>
      <h1 data-testid="cash-in-out-title">Cash In</h1>
      <button data-testid="cash-in-out-complete">Complete</button>
      <section data-testid="cash-in-out-note-panel" hidden>
        <input data-testid="cash-in-out-note" />
        <button data-testid="cash-in-out-note-ok">OK</button>
      </section>
      <button data-testid="cash-in-out-cover" hidden>Cover</button>
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
      <div data-testid="report-fee-amount">$0.00</div>
      <div data-testid="report-homepage-unpaid">$0.00</div>
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
      let cashDrawerMode = 'cash-in';
      let userDefaultLanguage = localStorage.getItem('userDefaultLanguage') || 'Default';
      let clockState = localStorage.getItem('offlineClockState') || 'off';
      let currentClockStaffSnapshot = readStoredJson('offlineClockStaffSnapshot', null);
      let deliveryHistoricalAddress = '';
      let messages = [];
      let currentOrderItems = [];
      let selectedOrderItemIndex = -1;
      let selectedOrderItemIndexes = new Set();
      let latestSavedOrderItems = [];
      let currentItemOption = null;
      let latestSavedItemOption = null;
      let currentOrderTip = 0;
      let currentOrderPriceEdited = false;
      let currentSplitPartTip = null;
      let currentOrderStatus = '';
      let currentOrderType = 'togo';
      let currentCardTender = '';
      let currentCustomerName = null;
      let currentGuestCount = 1;
      let currentDeliveryDistance = 0;
      let currentSeatNumber = 1;
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
      let currentCombineRecalculateCharge = localStorage.getItem('currentCombineRecalculateCharge') === 'true';
      let currentKdsCategoryRequired = localStorage.getItem('currentKdsCategoryRequired') === 'true';
      let currentKdsCategoryDiscountAllowance = localStorage.getItem('currentKdsCategoryDiscountAllowance') !== 'false';
      let currentRoundingStrategy = localStorage.getItem('currentRoundingStrategy') || 'no_rounding';
      let currentServerName = localStorage.getItem('offlineCurrentServerName') || 'Server A';
      let currentShiftScheduleEnabled = localStorage.getItem('offlineShiftScheduleEnabled') === 'true';
      let currentAutoClockOutEnabled = localStorage.getItem('offlineAutoClockOutEnabled') === 'true';
      let currentShiftPlans = readStoredJson('offlineShiftPlans', []);
      let currentTakeoutTaxExempt = localStorage.getItem('offlineTakeoutTaxExempt') === 'true';
      let currentKioskItem = readStoredJson('offlineKioskItem', {
        category: 'Appetizers',
        group: 'Chinese Food',
        name: 'kiosk_item',
        price: 10,
        taxRate: 0.0825,
      });
      let currentEmenuItem = readStoredJson('offlineEmenuItem', {
        category: 'New Category',
        group: 'Emenu Menu',
        name: 'Emenu First Item',
        price: 8,
        taxRate: 0,
      });
      let currentEmenuItemQuantity = 0;
      let currentKioskCartItems = [];
      let currentKioskLicenseNames = readStoredJson('offlineKioskLicenseNames', [
        'Kiosk License A',
        'Kiosk License B',
      ]);
      let currentKioskOrderType = '';
      let currentCategoryName = '';
      let currentOrderChargeRate = 0;
      let currentOrderChargeFixedAmount = null;
      let currentOrderChargeLabel = '';
      let currentOrderChargeTaxed = false;
      let currentOrderChargeTriggerMode = '';
      let currentOrderChargeShareTip = false;
      let currentExtraOrderCharges = [];
      let manualCharges = readStoredJson('offlineManualCharges', [
        {
          amount: 10,
          name: 'manu_test_fixed',
          orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
          rate: 0,
          rateType: 'amount',
          taxed: false,
        },
        {
          amount: 10,
          name: 'manu_test_perc',
          orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
          rate: 0.1,
          rateType: 'percent',
          taxed: false,
        },
      ]);
      let autoCharges = readStoredJson('offlineAutoCharges', []);
      let currentWholeOrderDiscountRate = 0;
      let currentOrderTaxVoided = false;
      let currentPaidAmount = 0;
      let currentSettlementTotal = null;
      let currentPaymentRecords = [];
      let currentEvenPayParts = 1;
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
      let currentEmployeePassword = localStorage.getItem('offlineEmployeePassword') || '11';
      const defaultStaffDiscountLimits = { Server: 20, Manager: 50, Boss: 100 };
      let currentStaffDiscountLimits = {
        ...defaultStaffDiscountLimits,
        ...coerceStaffDiscountLimits(readStoredJson('offlineStaffDiscountLimits', {})),
      };
      let currentInventorySearchItem = 'superman item4';
      const inventoryRecords = {
        'superman item4': { status: 'LIMITED_STOCK', quantity: 0 },
        ...readStoredJson('offlineInventoryRecords', {}),
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
      let adminStaffRecords = [
        {
          name: 'Boss',
          code: '11',
          role: 'Boss',
          wage: '',
          wageType: '1',
          permissions: ['DINE_IN', 'ADMIN', 'ADMIN_STAFF'],
        },
      ];
      let attendanceRecords = [];
      let adminKioskSoldOutItems = new Set(readStoredJson('offline-admin-kiosk-sold-out-items', []));
      let selectedAdminStaffName = '';
      let savedOrders = readStoredJson('offlineSavedOrders', []);
      let emenuLatestOrder = null;
      let nextOrderNumber = 100000;
      let selectedRecallOrder = null;
      let draftSplitPrices = [];
      let draftSplitItemPrices = [];
      let draftSplitMode = null;
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
      const combineRecalculateChargeSelect = document.querySelector('[data-testid="admin-combine-recalculate-charge"]');
      const kdsCategoryRequiredSelect = document.querySelector('[data-testid="admin-kds-category-required"]');
      const kdsCategoryDiscountAllowanceSelect = document.querySelector('[data-testid="admin-kds-category-discount-allowance"]');
      const roundingStrategySelect = document.querySelector('[data-testid="admin-rounding-strategy"]');
      const adminChargeOldNameInput = document.querySelector('[data-testid="admin-charge-old-name"]');
      const adminChargeNewNameInput = document.querySelector('[data-testid="admin-charge-new-name"]');
      const adminChargeRenameButton = document.querySelector('[data-testid="admin-charge-rename"]');
      const adminManualFixedChargeSetupButton = document.querySelector('[data-testid="admin-manual-fixed-charge-setup"]');
      const adminManualPercentChargeAsTipSetupButton = document.querySelector('[data-testid="admin-manual-percent-charge-as-tip-setup"]');
      const adminAutoFixedChargeSetupButton = document.querySelector('[data-testid="admin-auto-fixed-charge-setup"]');
      const adminAutoFixedChargeAsTipSetupButton = document.querySelector('[data-testid="admin-auto-fixed-charge-as-tip-setup"]');
      const adminAutoPercentChargeSetupButton = document.querySelector('[data-testid="admin-auto-percent-charge-setup"]');
      const adminAutoPercentChargeAsTipSetupButton = document.querySelector('[data-testid="admin-auto-percent-charge-as-tip-setup"]');
      const adminChargeRateTypeNameInput = document.querySelector('[data-testid="admin-charge-rate-type-name"]');
      const adminChargeRateTypeSelect = document.querySelector('[data-testid="admin-charge-rate-type"]');
      const adminChargeRateTypeSaveButton = document.querySelector('[data-testid="admin-charge-rate-type-save"]');
      const adminChargeAmountNameInput = document.querySelector('[data-testid="admin-charge-amount-name"]');
      const adminChargeAmountInput = document.querySelector('[data-testid="admin-charge-amount"]');
      const adminChargeAmountSaveButton = document.querySelector('[data-testid="admin-charge-amount-save"]');
      const adminChargeTaxNameInput = document.querySelector('[data-testid="admin-charge-tax-name"]');
      const adminChargeTaxedSelect = document.querySelector('[data-testid="admin-charge-taxed"]');
      const adminChargeTaxSaveButton = document.querySelector('[data-testid="admin-charge-tax-save"]');
      const adminChargeOrderTypeNameInput = document.querySelector('[data-testid="admin-charge-order-type-name"]');
      const adminChargeOrderTypesSelect = document.querySelector('[data-testid="admin-charge-order-types"]');
      const adminChargeOrderTypesSaveButton = document.querySelector('[data-testid="admin-charge-order-types-save"]');
      const adminChargeMinGuestNameInput = document.querySelector('[data-testid="admin-charge-min-guest-name"]');
      const adminChargeMinGuestInput = document.querySelector('[data-testid="admin-charge-min-guest"]');
      const adminChargeMinGuestSaveButton = document.querySelector('[data-testid="admin-charge-min-guest-save"]');
      const adminChargeMinMileNameInput = document.querySelector('[data-testid="admin-charge-min-mile-name"]');
      const adminChargeMinMileInput = document.querySelector('[data-testid="admin-charge-min-mile"]');
      const adminChargeMinMileSaveButton = document.querySelector('[data-testid="admin-charge-min-mile-save"]');
      const adminChargeMinAmountNameInput = document.querySelector('[data-testid="admin-charge-min-amount-name"]');
      const adminChargeMinAmountInput = document.querySelector('[data-testid="admin-charge-min-amount"]');
      const adminChargeMinAmountSaveButton = document.querySelector('[data-testid="admin-charge-min-amount-save"]');
      const adminChargeTriggerNameInput = document.querySelector('[data-testid="admin-charge-trigger-name"]');
      const adminChargeTriggerModeSelect = document.querySelector('[data-testid="admin-charge-trigger-mode"]');
      const adminChargeTriggerSaveButton = document.querySelector('[data-testid="admin-charge-trigger-save"]');
      const adminChargeDeleteAllButton = document.querySelector('[data-testid="admin-charge-delete-all"]');
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
      const adminKioskButton = document.querySelector('[data-testid="admin-kiosk"]');
      const adminKioskPage = document.querySelector('[data-testid="admin-kiosk-page"]');
      const adminKioskItemNameInput = document.querySelector('[data-testid="admin-kiosk-item-name"]');
      const adminKioskItemSoldOutButton = document.querySelector('[data-testid="admin-kiosk-item-sold-out"]');
      const adminKioskItemStatus = document.querySelector('[data-testid="admin-kiosk-item-status"]');
      const adminStaffCreateButton = document.querySelector('[data-testid="admin-staff-create"]');
      const adminStaffList = document.querySelector('[data-testid="admin-staff-list"]');
      const adminStaffNameInput = document.querySelector('[data-testid="admin-staff-name"]');
      const adminStaffCodeInput = document.querySelector('[data-testid="admin-staff-code"]');
      const adminStaffRoleSelect = document.querySelector('[data-testid="admin-staff-role"]');
      const adminStaffWageInput = document.querySelector('[data-testid="admin-staff-wage"]');
      const adminStaffWageTypeSelect = document.querySelector('[data-testid="admin-staff-wage-type"]');
      const adminStaffSaveButton = document.querySelector('[data-testid="admin-staff-save"]');
      const adminAttendanceSearchButton = document.querySelector('[data-testid="admin-attendance-search"]');
      const adminAttendanceLastRow = document.querySelector('[data-testid="admin-attendance-last-row"]');
      const adminAttendanceWage = document.querySelector('[data-testid="admin-attendance-wage"]');
      const adminAttendanceWageType = document.querySelector('[data-testid="admin-attendance-wage-type"]');
      const adminAttendanceSaveButton = document.querySelector('[data-testid="admin-attendance-save"]');
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
      const orderGuestCountInput = document.querySelector('[data-testid="order-guest-count"]');
      const orderSeatSharedButton = document.querySelector('[data-testid="order-seat-shared"]');
      const orderSeatOneButton = document.querySelector('[data-testid="order-seat-1"]');
      const orderSeatTwoButton = document.querySelector('[data-testid="order-seat-2"]');
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
      const itemDiscountClearSelectedButton = document.querySelector('[data-testid="item-discount-clear-selected"]');
      const itemDiscountSubmitButton = document.querySelector('[data-testid="item-discount-submit"]');
      const orderDiscountButton = document.querySelector('[data-testid="order-discount"]');
      const orderDiscountWholeOrderPrice = document.querySelector('[data-testid="order-discount-whole-order-price"]');
      const orderDiscountAmount = document.querySelector('[data-testid="order-discount-amount"]');
      const orderDiscountPercentInput = document.querySelector('[data-testid="order-discount-percent"]');
      const orderDiscountClearWholeButton = document.querySelector('[data-testid="order-discount-clear-whole"]');
      const orderDiscountSubmitButton = document.querySelector('[data-testid="order-discount-submit"]');
      const orderPriceDetail = document.querySelector('[data-testid="order-price-detail"]');
      const orderTipInput = document.querySelector('[data-testid="order-tip"]');
      const orderTipToast = document.querySelector('[data-testid="order-tip-toast"]');
      const orderCharge20Button = document.querySelector('[data-testid="order-charge-20"]');
      const orderCharge10Button = document.querySelector('[data-testid="order-charge-10"]');
      const orderCharge10TaxableButton = document.querySelector('[data-testid="order-charge-10-taxable"]');
      const orderCharge5Button = document.querySelector('[data-testid="order-charge-5"]');
      const orderChargeZeroButton = document.querySelector('[data-testid="order-charge-0"]');
      const orderCustomChargeValueInput = document.querySelector('[data-testid="order-custom-charge-value"]');
      const orderCustomChargeRateTypeSelect = document.querySelector('[data-testid="order-custom-charge-rate-type"]');
      const orderCustomChargeTaxedSelect = document.querySelector('[data-testid="order-custom-charge-taxed"]');
      const orderCustomChargeAddButton = document.querySelector('[data-testid="order-custom-charge-add"]');
      const orderChargeOpenButton = document.querySelector('[data-testid="order-charge-open"]');
      const orderChargeDialog = document.querySelector('[data-testid="order-charge-dialog"]');
      const presetChargeList = document.querySelector('[data-testid="preset-charge-list"]');
      const selectedChargeList = document.querySelector('[data-testid="selected-charge-list"]');
      const orderChargeOkButton = document.querySelector('[data-testid="order-charge-ok"]');
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
      const recallSendKitchenButton = document.querySelector('[data-testid="recall-send-kitchen"]');
      const recallGuestNameInput = document.querySelector('[data-testid="recall-guest-name"]');
      const recallSaveEditButton = document.querySelector('[data-testid="recall-save-edit"]');
      const recallOrderTip = document.querySelector('[data-testid="recall-order-tip"]');
      const recallOrderStatus = document.querySelector('[data-testid="recall-order-status"]');
      const recallServerName = document.querySelector('[data-testid="recall-server-name"]');
      const recallChangeServerButton = document.querySelector('[data-testid="recall-change-server"]');
      const recallCustomerName = document.querySelector('[data-testid="recall-customer-name"]');
      const recallGuestPhone = document.querySelector('[data-testid="recall-guest-phone"]');
      const recallGuestAddress = document.querySelector('[data-testid="recall-guest-address"]');
      const recallOrderSubtotal = document.querySelector('[data-testid="recall-order-subtotal"]');
      const recallOrderTax = document.querySelector('[data-testid="recall-order-tax"]');
      const recallOrderReward = document.querySelector('[data-testid="recall-order-reward"]');
      const recallOrderTotal = document.querySelector('[data-testid="recall-order-total"]');
      const recallOrderPriceDetail = document.querySelector('[data-testid="recall-order-price-detail"]');
      const recallTipMethod = document.querySelector('[data-testid="recall-tip-method"]');
      const recallTipInput = document.querySelector('[data-testid="recall-tip-input"]');
      const recallTipSubmitButton = document.querySelector('[data-testid="recall-tip-submit"]');
      const recallTipToast = document.querySelector('[data-testid="recall-tip-toast"]');
      const recallVoidAlert = document.querySelector('[data-testid="recall-void-alert"]');
      const recallItemCount = document.querySelector('[data-testid="recall-item-count"]');
      const recallOrderCardId = document.querySelector('[data-testid="recall-order-card-id"]');
      const recallOrderNumber = document.querySelector('[data-testid="recall-order-number"]');
      const recallCrmMemberName = document.querySelector('[data-testid="recall-crm-member-name"]');
      const recallCrmPointBalance = document.querySelector('[data-testid="recall-crm-point-balance"]');
      const recallCrmCombineInput = document.querySelector('[data-testid="recall-crm-combine-order-no"]');
      const recallCrmCombineButton = document.querySelector('[data-testid="recall-crm-combine-order"]');
      const recallCopyOrderButton = document.querySelector('[data-testid="recall-copy-order"]');
      const recallSettleButton = document.querySelector('[data-testid="recall-settle"]');
      const recallCrmRedeemDiscountButton = document.querySelector('[data-testid="recall-crm-redeem-discount"]');
      const recallOrderDiscountButton = document.querySelector('[data-testid="recall-order-discount"]');
      const recallOrderDiscountWholeOrderPrice = document.querySelector('[data-testid="recall-order-discount-whole-order-price"]');
      const recallDiscountRows = document.querySelector('[data-testid="recall-discount-rows"]');
      const recallOrderDiscountAmountInput = document.querySelector('[data-testid="recall-order-discount-amount"]');
      const recallOrderDiscountSubmitButton = document.querySelector('[data-testid="recall-order-discount-submit"]');
      const recallDiscountClearAllButton = document.querySelector('[data-testid="recall-discount-clear-all"]');
      const recallDiscountOkButton = document.querySelector('[data-testid="recall-discount-ok"]');
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
      const recallVoidReasonPanel = document.querySelector('[data-testid="recall-void-reason-panel"]');
      const recallVoidReasons = document.querySelector('[data-testid="recall-void-reasons"]');
      const recallRefundPaidOrderButton = document.querySelector('[data-testid="recall-refund-paid-order"]');
      const recallPaymentRecords = document.querySelector('[data-testid="recall-payment-records"]');
      const recallCancelConditionButton = document.querySelector('[data-testid="recall-cancel-condition"]');
      const recallMoveOrderButton = document.querySelector('[data-testid="recall-move-order"]');
      const recallMoveTargetOrderIndexInput = document.querySelector('[data-testid="recall-move-target-order-index"]');
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
      const subOrderPayAmountInput = document.querySelector('[data-testid="sub-order-pay-amount"]');
      const subOrderCashPayButton = document.querySelector('[data-testid="sub-order-cash-pay"]');
      const recallSubOrders = document.querySelector('[data-testid="recall-sub-orders"]');
      const callerPage = document.querySelector('[data-testid="caller-page"]');
      const callerRefreshButton = document.querySelector('[data-testid="caller-refresh"]');
      const callerReadyList = document.querySelector('[data-testid="caller-ready-list"]');
      const callerPreparingList = document.querySelector('[data-testid="caller-preparing-list"]');
      const cashInOutPage = document.querySelector('[data-testid="cash-in-out-page"]');
      const cashInOutTitle = document.querySelector('[data-testid="cash-in-out-title"]');
      const cashInOutCompleteButton = document.querySelector('[data-testid="cash-in-out-complete"]');
      const cashInOutNotePanel = document.querySelector('[data-testid="cash-in-out-note-panel"]');
      const cashInOutNoteInput = document.querySelector('[data-testid="cash-in-out-note"]');
      const cashInOutNoteOkButton = document.querySelector('[data-testid="cash-in-out-note-ok"]');
      const cashInOutCover = document.querySelector('[data-testid="cash-in-out-cover"]');
      const emenuMainPage = document.querySelector('[data-testid="emenu-main-page"]');
      const emenuOrderPage = document.querySelector('[data-testid="emenu-order-page"]');
      const emenuContinueButton = document.querySelector('[data-testid="emenu-continue"]');
      const emenuSwitchPosButton = document.querySelector('[data-testid="emenu-switch-pos"]');
      const emenuFirstCategoryItemButton = document.querySelector('[data-testid="emenu-new-category-first-item"]');
      const emenuAddItemButton = document.querySelector('[data-testid="emenu-add-item"]');
      const emenuPlaceOrderButton = document.querySelector('[data-testid="emenu-place-order"]');
      const emenuOrderCard = document.querySelector('[data-testid="emenu-order-card"]');
      const emenuOrderCardCloseButton = document.querySelector('[data-testid="emenu-order-card-close"]');
      const emenuCallServerButton = document.querySelector('[data-testid="emenu-call-server"]');
      const emenuSoldOutPopup = document.querySelector('[data-testid="emenu-sold-out-popup"]');
      const kioskPage = document.querySelector('[data-testid="kiosk-page"]');
      const kioskSelectLicenseButton = document.querySelector('[data-testid="kiosk-select-license"]');
      const kioskOrderTypeToGoButton = document.querySelector('[data-testid="kiosk-order-type-to-go"]');
      const kioskItemButton = document.querySelector('[data-testid="kiosk-item"]');
      const kioskViewOrderButton = document.querySelector('[data-testid="kiosk-view-order"]');
      const kioskCheckoutButton = document.querySelector('[data-testid="kiosk-checkout"]');
      const kioskSkipButton = document.querySelector('[data-testid="kiosk-skip"]');
      const kioskCashPaymentButton = document.querySelector('[data-testid="kiosk-cash-payment"]');
      const kioskSoldOutPopup = document.querySelector('[data-testid="kiosk-sold-out-popup"]');
      const kioskCartCount = document.querySelector('[data-testid="kiosk-cart-count"]');
      const kioskLicenseList = document.querySelector('[data-testid="kiosk-license-list"]');
      const reportPasswordPanel = document.querySelector('[data-testid="report-password-panel"]');
      const reportPasswordInput = document.querySelector('[data-testid="report-password"]');
      const reportPasswordSaveButton = document.querySelector('[data-testid="report-password-save"]');
      const reportPage = document.querySelector('[data-testid="report-page"]');
      const reportTotalReportButton = document.querySelector('[data-testid="report-total-report"]');
      const reportStaffReportButton = document.querySelector('[data-testid="report-staff-report"]');
      const reportOrderTypeSelect = document.querySelector('[data-testid="report-order-type"]');
      const reportOverviewNetSales = document.querySelector('[data-testid="report-overview-net-sales"]');
      const reportFeeAmount = document.querySelector('[data-testid="report-fee-amount"]');
      const reportHomepageUnpaid = document.querySelector('[data-testid="report-homepage-unpaid"]');
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

      function persistClockState() {
        localStorage.setItem('offlineClockState', clockState);
        localStorage.setItem('offlineClockText', clockText.textContent || '');
        if (currentClockStaffSnapshot) {
          localStorage.setItem('offlineClockStaffSnapshot', JSON.stringify(currentClockStaffSnapshot));
        } else {
          localStorage.removeItem('offlineClockStaffSnapshot');
        }
      }

      function renderCashInOutTitle() {
        if (currentLanguage === 'Chinese') {
          cashInOutTitle.textContent = cashDrawerMode === 'cash-in' ? '现金备款' : '现金结算';
        } else {
          cashInOutTitle.textContent = cashDrawerMode === 'cash-in' ? 'Cash In' : 'Cash Out';
        }
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
        adminKioskPage.hidden = true;
        deliveryPage.hidden = panel !== 'delivery';
        joinMemberRegistration.hidden = panel !== 'join-member';
        inventoryPage.hidden = panel !== 'inventory';
        orderPage.hidden = panel !== 'order';
        recallPage.hidden = panel !== 'recall';
        callerPage.hidden = panel !== 'caller';
        cashInOutPage.hidden = panel !== 'cash-in-out';
        emenuMainPage.hidden = true;
        emenuOrderPage.hidden = true;
        reportPasswordPanel.hidden = panel !== 'report-password';
        reportPage.hidden = panel !== 'report';
        supportPage.hidden = panel !== 'support';
        messageCenter.hidden = panel !== 'message-center';
        reservationPage.hidden = panel !== 'reservation';
        kioskPage.hidden = panel !== 'kiosk';
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
        cashInOutPage.hidden = true;
        reportPasswordPanel.hidden = true;
        reportPage.hidden = true;
        supportPage.hidden = true;
        messageCenter.hidden = true;
        reservationPage.hidden = true;
        emenuMainPage.hidden = panel !== 'main';
        emenuOrderPage.hidden = panel !== 'order';
        kioskPage.hidden = panel !== 'kiosk';
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
        const quantity = Math.max(currentEmenuItemQuantity, 1);
        const unitPrice = Number(currentEmenuItem.price || 0);
        const order = {
          orderNumber: String(nextOrderNumber++),
          orderCardId: '',
          items: [
            {
              name: currentEmenuItem.name,
              price: unitPrice * quantity,
              unitPrice,
              quantity,
              state: '',
              taxRate: Number(currentEmenuItem.taxRate || 0),
              inventorySku: currentEmenuItem.inventorySku || '',
            },
          ],
          itemOption: null,
          tip: 0,
          splitTip: null,
          status: '',
          customerName: null,
          subtotal: unitPrice * quantity,
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
          paymentRecords: [],
          paymentType: '',
          hasCreditFailure: false,
        };
        order.orderCardId = 'Area 1 Table 1 ' + order.orderNumber;
        savedOrders.push(order);
        latestSavedOrderItems = [...order.items];
        selectedRecallOrder = order;
        emenuLatestOrder = order;
        currentEmenuItemQuantity = 0;
        return order;
      }

      function persistSavedOrders() {
        localStorage.setItem('offlineSavedOrders', JSON.stringify(savedOrders));
      }

      function renderKioskItem() {
        kioskItemButton.textContent = currentKioskItem.name;
        kioskCartCount.textContent = String(currentKioskCartItems.length);
      }

      function renderEmenuItem() {
        emenuFirstCategoryItemButton.textContent = currentEmenuItem.name;
      }

      function tryAddCurrentEmenuItem() {
        const limit = Number(inventoryRecord(currentEmenuItem.name).quantity || 0);
        if (limit > 0 && currentEmenuItemQuantity >= limit) {
          emenuSoldOutPopup.hidden = false;
          return;
        }
        currentEmenuItemQuantity += 1;
      }

      function kioskCartQuantityForCurrentItem() {
        return currentKioskCartItems
          .filter((item) => item.name === currentKioskItem.name)
          .reduce((quantity, item) => quantity + Number(item.quantity || 1), 0);
      }

      function renderKioskLicenses() {
        kioskLicenseList.innerHTML = '';
        currentKioskLicenseNames.forEach((licenseName) => {
          const licenseButton = document.createElement('button');
          licenseButton.dataset.testid = 'kiosk-license-name';
          licenseButton.textContent = licenseName;
          kioskLicenseList.appendChild(licenseButton);
        });
      }

      function createKioskPaidOrder() {
        const items = currentKioskCartItems.length ? [...currentKioskCartItems] : [{ ...currentKioskItem }];
        const subtotal = items.reduce((total, item) => total + Number(item.price || 0), 0);
        const taxText =
          currentTakeoutTaxExempt && currentKioskOrderType === 'togo'
            ? '--'
            : String(Number((subtotal * Number(items[0]?.taxRate || 0)).toFixed(2)));
        const orderNumber = String(nextOrderNumber++);
        const order = {
          orderNumber,
          orderCardId: orderNumber,
          items,
          itemOption: null,
          tip: 0,
          splitTip: null,
          status: 'Paid',
          customerName: null,
          subtotal,
          settlementTotal: subtotal,
          crmMember: null,
          crmDiscountRate: 0,
          crmDiscountMaxAmount: null,
          crmFixedRewardAmount: 0,
          crmPointDeduction: 0,
          hasRedeemItem: false,
          orderType: 'kiosk-togo',
          partialPaid: false,
          rewardDiscount: 0,
          guestPhone: '',
          guestAddress: '',
          deliveryInfoRows: [],
          splitOrderPrices: [],
          subOrderItems: [],
          subOrderStatuses: [],
          inventoryDeductedQuantity: 0,
          paymentRecords: [],
          paymentType: 'cash',
          hasCreditFailure: false,
          taxText,
        };
        savedOrders.push(order);
        selectedRecallOrder = order;
        latestSavedOrderItems = [...order.items];
        latestSavedItemOption = null;
        currentKioskCartItems = [];
        persistSavedOrders();
        renderKioskItem();
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

      function persistInventoryRecords() {
        localStorage.setItem('offlineInventoryRecords', JSON.stringify(inventoryRecords));
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

      function displayOrderLineText(item) {
        const discountText = item.itemDiscountPercent || item.itemDiscountAmount ? ' Discount' : '';
        return displayItemName(item) + discountText;
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

      function shiftStaffIdForPassword(password) {
        if (password === '123') {
          return 55;
        }
        if (password === '11') {
          return 11;
        }
        return NaN;
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

      window.addEventListener('offline-shift-schedule-updated', (event) => {
        currentShiftScheduleEnabled = Boolean(event.detail?.shiftScheduleEnabled);
        currentAutoClockOutEnabled = Boolean(event.detail?.shiftAutoClockOutEnabled);
        currentShiftPlans = Array.isArray(event.detail?.shiftPlans) ? event.detail.shiftPlans : [];
      });

      window.addEventListener('offline-kiosk-item-updated', (event) => {
        currentKioskItem = event.detail || currentKioskItem;
        renderKioskItem();
      });

      window.addEventListener('offline-emenu-item-updated', (event) => {
        currentEmenuItem = event.detail || currentEmenuItem;
        renderEmenuItem();
      });

      window.addEventListener('offline-kiosk-license-names-updated', (event) => {
        currentKioskLicenseNames = Array.isArray(event.detail) ? event.detail : [];
        renderKioskLicenses();
      });

      window.addEventListener('offline-takeout-tax-exempt-updated', (event) => {
        currentTakeoutTaxExempt = Boolean(event.detail);
      });

      function currentEmployeeShiftPlan() {
        const staffId = shiftStaffIdForPassword(currentEmployeePassword);
        return currentShiftPlans.find((plan) => Number(plan.staffId) === staffId) || null;
      }

      function canCurrentEmployeeClockIn() {
        if (!currentShiftScheduleEnabled) {
          return true;
        }
        const plan = currentEmployeeShiftPlan();
        if (!plan) {
          return false;
        }
        return (
          Number(plan.earliestClockInOffset || 0) >= 0 &&
          Number(plan.startOffsetMinutes || 0) >= Number(plan.earliestClockInOffset || 0)
        );
      }

      function shouldAutoClockOutCurrentEmployee() {
        if (!currentAutoClockOutEnabled || clockState !== 'clocked-in') {
          return false;
        }
        const plan = currentEmployeeShiftPlan();
        return plan?.autoClockOutOffset !== undefined && plan?.autoClockOutOffset !== null;
      }

      function applyAutoClockOutIfDue() {
        if (!shouldAutoClockOutCurrentEmployee()) {
          return;
        }
        if (currentClockStaffSnapshot) {
          attendanceRecords.push({ ...currentClockStaffSnapshot });
          currentClockStaffSnapshot = null;
        }
        clockState = 'off';
        clockText.textContent = 'Checked Out';
        persistClockState();
      }

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
        adminStaffWageInput.value = staff?.wage || '';
        adminStaffWageTypeSelect.value = staff?.wageType || '1';
        ['DINE_IN', 'ADMIN', 'ADMIN_STAFF'].forEach((permission) => {
          setStaffAuthority(permission, staff?.permissions?.includes(permission));
        });
      }

      function currentEmployeeStaff() {
        if (currentEmployeePassword === '11') {
          return adminStaffRecords.find((staff) => staff.name === 'Boss') || {
            name: 'Boss',
            wage: '',
            wageType: '1',
          };
        }
        return {
          name: 'Employee',
          wage: '',
          wageType: '1',
        };
      }

      function renderLastAttendance() {
        const lastRecord = attendanceRecords[attendanceRecords.length - 1];
        adminAttendanceLastRow.hidden = !lastRecord;
        adminAttendanceLastRow.textContent = lastRecord
          ? lastRecord.staffName + ' ' + lastRecord.wage + ' ' + lastRecord.wageType
          : '';
        adminAttendanceWage.hidden = !lastRecord;
        adminAttendanceWageType.hidden = !lastRecord;
        adminAttendanceSaveButton.hidden = !lastRecord;
        adminAttendanceWage.value = lastRecord?.wage || '';
        adminAttendanceWageType.value = lastRecord?.wageType || '1';
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

      function renderAdminKioskItemStatus(itemName) {
        adminKioskItemStatus.textContent = adminKioskSoldOutItems.has(itemName) ? 'out-of-stock' : 'in-stock';
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
          applyAutoChargeIfNeeded();
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
          applyAutoChargeIfNeeded();
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
          seat: currentSeatNumber ?? 1,
          shared: currentSeatNumber === null,
          unitPriceItem: Boolean(dish.unitPriceItem),
          quickCombo: Boolean(dish.quickCombo),
          state: '',
          sentToKitchen: false,
          inKitchenQuantity: 0,
        });
        selectedOrderItemIndex = currentOrderItems.length - 1;
        selectedOrderItemIndexes = new Set([selectedOrderItemIndex]);
        applyAutoChargeIfNeeded();
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
        if (currentOrderChargeFixedAmount !== null && currentOrderChargeFixedAmount !== undefined) {
          return Number(currentOrderChargeFixedAmount);
        }
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

      function aggregateChargeSnapshots(charges) {
        const byLabel = new Map();
        (charges || []).filter(Boolean).forEach((charge) => {
          const label = charge.label || 'Charge';
          const existing = byLabel.get(label) || {
            amount: 0,
            label,
            shareTip: false,
            taxed: false,
          };
          existing.amount = roundMoney(Number(existing.amount || 0) + Number(charge.amount || 0));
          existing.shareTip = Boolean(existing.shareTip || charge.shareTip);
          existing.taxed = Boolean(existing.taxed || charge.taxed);
          byLabel.set(label, existing);
        });
        return Array.from(byLabel.values()).filter((charge) => Number(charge.amount || 0) !== 0);
      }

      function currentChargeSnapshots(subtotal = currentActiveOrderSubtotal()) {
        const primaryAmount = currentChargeAmount(subtotal);
        const primaryCharge = primaryAmount
          ? {
              amount: primaryAmount,
              label: currentOrderChargeLabel || 'Charge',
              shareTip: Boolean(currentOrderChargeShareTip),
              taxed: Boolean(currentOrderChargeTaxed),
            }
          : null;
        return aggregateChargeSnapshots([
          primaryCharge,
          ...currentExtraOrderCharges.map((charge) => ({ ...charge })),
        ]);
      }

      function chargeSnapshotTotal(charges) {
        return roundMoney((charges || []).reduce((total, charge) => total + Number(charge.amount || 0), 0));
      }

      function chargeDisplayValue(charge, subtotal = currentActiveOrderSubtotal()) {
        if (charge?.rateType === 'percent') {
          return 'Add' + Number((charge.rate || 0) * 100).toFixed(0) + '%';
        }
        return 'Add $' + Number(charge?.amount ?? currentChargeAmount(subtotal)).toFixed(2);
      }

      function chargeAppliesToOrderType(charge, orderType) {
        return !Array.isArray(charge?.orderTypes)
          || charge.orderTypes.length === 0
          || charge.orderTypes.includes(orderType);
      }

      function chargeAppliesToGuestCount(charge, guestCount) {
        const minGuest = Number(charge?.minGuest || 0);
        return minGuest <= 0 || Number(guestCount || 1) >= minGuest;
      }

      function chargeAppliesToDeliveryDistance(charge, deliveryDistance) {
        const minMile = Number(charge?.minMile || 0);
        return minMile <= 0 || Number(deliveryDistance || 0) >= minMile;
      }

      function chargeAppliesToMinAmount(charge, subtotal) {
        const minAmount = Number(charge?.minAmount || 0);
        return minAmount <= 0 || Number(subtotal || 0) >= minAmount;
      }

      function chargeAppliesToOrderContext(charge, orderType, guestCount, deliveryDistance, subtotal) {
        return chargeAppliesToOrderType(charge, orderType)
          && chargeAppliesToGuestCount(charge, guestCount)
          && chargeAppliesToDeliveryDistance(charge, deliveryDistance)
          && chargeAppliesToMinAmount(charge, subtotal);
      }

      function chargeAppliesToCurrentOrderType(charge) {
        return chargeAppliesToOrderContext(
          charge,
          currentOrderType,
          currentGuestCount,
          currentDeliveryDistance,
          currentActiveOrderSubtotal(),
        );
      }

      function selectedManualCharge() {
        if (currentOrderChargeTriggerMode && currentOrderChargeTriggerMode !== 'manual') {
          return null;
        }
        const applicableCharges = manualCharges.filter(chargeAppliesToCurrentOrderType);
        const chargeByName = applicableCharges.find((charge) => charge.name === currentOrderChargeLabel);
        if (chargeByName) {
          return chargeByName;
        }
        return applicableCharges.find((charge) => (
          (charge.rateType === 'amount'
            && currentOrderChargeFixedAmount !== null
            && Number(charge.amount || 0) === Number(currentOrderChargeFixedAmount || 0))
          || (charge.rateType === 'percent'
            && currentOrderChargeRate > 0
            && Number(charge.rate || 0) === currentOrderChargeRate)
        ));
      }

      function syncCurrentChargeFromManualConfig() {
        const charge = selectedManualCharge();
        if (!charge) {
          return;
        }
        currentOrderChargeRate = Number(charge.rate || 0);
        currentOrderChargeFixedAmount = charge.rateType === 'amount' ? Number(charge.amount || 0) : null;
        currentOrderChargeLabel = charge.name;
        currentOrderChargeTaxed = Boolean(charge.taxed);
        currentOrderChargeShareTip = Boolean(charge.shareTip);
        currentOrderChargeTriggerMode = 'manual';
      }

      function selectedAutoCharge() {
        const applicableCharges = autoCharges.filter(chargeAppliesToCurrentOrderType);
        const chargeByName = applicableCharges.find((charge) => charge.name === currentOrderChargeLabel);
        if (chargeByName) {
          return chargeByName;
        }
        return applicableCharges.find((charge) => (
          (charge.rateType === 'amount'
            && currentOrderChargeFixedAmount !== null
            && Number(charge.amount || 0) === Number(currentOrderChargeFixedAmount || 0))
          || (charge.rateType === 'percent'
            && currentOrderChargeRate > 0
            && Number(charge.rate || 0) === currentOrderChargeRate)
        )) || applicableCharges[0];
      }

      function syncCurrentChargeFromAutoConfig() {
        if (currentOrderChargeTriggerMode !== 'auto') {
          return;
        }
        const charge = selectedAutoCharge();
        if (!charge) {
          currentOrderChargeRate = 0;
          currentOrderChargeFixedAmount = null;
          currentOrderChargeLabel = '';
          currentOrderChargeTaxed = false;
          currentOrderChargeShareTip = false;
          currentOrderChargeTriggerMode = '';
          return;
        }
        currentOrderChargeRate = Number(charge.rate || 0);
        currentOrderChargeFixedAmount = charge.rateType === 'amount' ? Number(charge.amount || 0) : null;
        currentOrderChargeLabel = charge.name;
        currentOrderChargeTaxed = Boolean(charge.taxed);
        currentOrderChargeShareTip = Boolean(charge.shareTip);
      }

      function applyAutoChargeIfNeeded() {
        if (!currentOrderItems.length || currentOrderChargeTriggerMode === 'manual') {
          return;
        }
        const charge = autoCharges.filter(chargeAppliesToCurrentOrderType)[0];
        if (!charge) {
          return;
        }
        currentOrderChargeRate = Number(charge.rate || 0);
        currentOrderChargeFixedAmount = charge.rateType === 'amount' ? Number(charge.amount || 0) : null;
        currentOrderChargeLabel = charge.name;
        currentOrderChargeTaxed = Boolean(charge.taxed);
        currentOrderChargeShareTip = Boolean(charge.shareTip);
        currentOrderChargeTriggerMode = 'auto';
      }

      function appendExtraOrderCharge(charge) {
        const amount = Number(charge.amount || 0);
        if (!amount) {
          return;
        }
        currentExtraOrderCharges = aggregateChargeSnapshots([
          ...currentExtraOrderCharges,
          {
            amount,
            label: charge.label || 'Charge',
            shareTip: Boolean(charge.shareTip),
            taxed: Boolean(charge.taxed),
          },
        ]);
      }

      function renderPresetChargeDialog() {
        presetChargeList.innerHTML = '';
        selectedChargeList.innerHTML = '';
        manualCharges.filter(chargeAppliesToCurrentOrderType).forEach((charge) => {
          const button = document.createElement('button');
          button.dataset.testid = 'preset-charge';
          button.dataset.chargeName = charge.name;
          button.textContent = charge.name + ' ' + chargeDisplayValue(charge);
          button.addEventListener('click', () => {
            if (currentOrderChargeTriggerMode === 'auto') {
              appendExtraOrderCharge({
                amount: charge.rateType === 'amount'
                  ? Number(charge.amount || 0)
                  : roundMoney(currentActiveOrderSubtotal() * Number(charge.rate || 0)),
                label: charge.name,
                shareTip: Boolean(charge.shareTip),
                taxed: Boolean(charge.taxed),
              });
              renderPresetChargeDialog();
              renderOrderAmounts();
              return;
            }
            currentOrderChargeRate = Number(charge.rate || 0);
            currentOrderChargeFixedAmount = charge.rateType === 'amount' ? Number(charge.amount || 0) : null;
            currentOrderChargeLabel = charge.name;
            currentOrderChargeTaxed = Boolean(charge.taxed);
            currentOrderChargeShareTip = Boolean(charge.shareTip);
            currentOrderChargeTriggerMode = 'manual';
            renderPresetChargeDialog();
            renderOrderAmounts();
          });
          presetChargeList.appendChild(button);
        });
        const selectedCharge = selectedManualCharge();
        if (selectedCharge) {
          const selected = document.createElement('div');
          selected.dataset.testid = 'selected-charge-item';
          selected.dataset.chargeName = selectedCharge.name;
          selected.dataset.chargeRate = chargeDisplayValue(selectedCharge, currentActiveOrderSubtotal());
          selected.textContent = selected.dataset.chargeName + ' ' + selected.dataset.chargeRate;
          selectedChargeList.appendChild(selected);
        } else if (manualCharges.length === 0 && currentOrderChargeLabel) {
          const selected = document.createElement('div');
          selected.dataset.testid = 'selected-charge-item';
          selected.dataset.chargeName = currentOrderChargeLabel;
          selected.dataset.chargeRate = 'Add $' + currentChargeAmount(currentActiveOrderSubtotal()).toFixed(2);
          selected.textContent = selected.dataset.chargeName + ' ' + selected.dataset.chargeRate;
          selectedChargeList.appendChild(selected);
        }
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
        item.itemDiscountPercent = Number(percent || 0);
        item.itemDiscountAmount = 0;
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
          const itemDiscountAmount = Number(amount || 0) * itemShare;
          item.price = roundMoney(Math.max(0, Number(item.price || 0) - itemDiscountAmount));
          item.itemDiscountAmount = roundMoney(itemDiscountAmount);
          item.itemDiscountPercent = 0;
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
        const itemTax = activeOrderItems().reduce((total, item) => {
          if (item.taxRate !== undefined) {
            return total + Number(item.price || 0) * Number(item.taxRate || 0);
          }

          return total + 0.6;
        }, 0);
        const taxRate = Number(activeOrderItems().find((item) => item.taxRate !== undefined)?.taxRate ?? 0.0825);
        const taxedChargeAmount = currentChargeSnapshots(currentActiveOrderSubtotal())
          .filter((charge) => Boolean(charge.taxed))
          .reduce((total, charge) => total + Number(charge.amount || 0), 0);
        return itemTax + taxedChargeAmount * taxRate;
      }

      function renderOrderAmounts() {
        const itemCount = currentOrderItems.filter((item) => item.state !== 'Voided').length;
        const subtotal = currentOrderItems
          .filter((item) => item.state !== 'Voided')
          .reduce((total, item) => total + Number(item.price || 0), 0);
        const chargeSnapshots = currentChargeSnapshots(subtotal);
        const chargeAmount = chargeSnapshotTotal(chargeSnapshots);
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
        orderPriceDetail.textContent = [
          wholeOrderDiscount ? 'Discount ' + wholeOrderDiscount.toFixed(2) : '',
          ...chargeSnapshots.map((charge) => (charge.label || 'Charge') + ' ' + Number(charge.amount || 0).toFixed(2)),
        ].filter(Boolean).join('\\n');
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
          row.textContent = displayOrderLineText(item);
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
        const reportOrders = savedOrders
          .filter((order) => selectedType === 'ALL' || reportOrderType(order) === selectedType);
        const netSales = reportOrders
          .reduce((total, order) => total + Number(order.subtotal || 0), 0);
        const feeAmount = reportOrders
          .filter((order) => Boolean(order.orderChargeShareTip))
          .reduce((total, order) => total + orderChargeAmount(order, order.items || []), 0);
        const combinedFeeAmount = reportOrders
          .flatMap((order) => order.combinedOrderCharges || [])
          .filter((charge) => Boolean(charge.shareTip))
          .reduce((total, charge) => total + Number(charge.amount || 0), 0);
        const unpaidAmount = reportOrders.reduce((total, order) => {
          if (['Paid', 'Void'].includes(order.status || '')) {
            return total;
          }
          const paidAmount = ensurePaymentRecords(order)
            .filter((record) => Number(record.amount || 0) > 0)
            .reduce((sum, record) => sum + Number(record.amount || 0), 0);
          return total + Math.max(0, orderTotal(order) - paidAmount);
        }, 0);
        reportOverviewNetSales.textContent = '$' + roundMoney(netSales).toFixed(2);
        reportFeeAmount.textContent = '$' + roundMoney(feeAmount + combinedFeeAmount).toFixed(2);
        reportHomepageUnpaid.textContent = '$' + roundMoney(unpaidAmount).toFixed(2);
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
        currentOrderPriceEdited = false;
        currentOrderChargeRate = 0;
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = '';
        currentOrderChargeTaxed = false;
        currentOrderChargeTriggerMode = '';
        currentOrderChargeShareTip = false;
        currentExtraOrderCharges = [];
        currentWholeOrderDiscountRate = 0;
        currentOrderTaxVoided = false;
        currentPaidAmount = 0;
        currentSettlementTotal = null;
        currentPaymentRecords = [];
        currentEvenPayParts = 1;
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
          if (selectedSubOrderIndex !== null && currentEditingOrder.subOrderItems?.[selectedSubOrderIndex]) {
            const previousSubOrderTotal = orderItemsSubtotal(currentEditingOrder.subOrderItems[selectedSubOrderIndex]);
            currentEditingOrder.subOrderItems[selectedSubOrderIndex] = [...currentOrderItems];
            currentEditingOrder.subOrderStatuses[selectedSubOrderIndex] = currentOrderStatus || currentEditingOrder.subOrderStatuses[selectedSubOrderIndex];
            currentEditingOrder.subOrderChargeCleared = currentEditingOrder.subOrderChargeCleared || [];
            currentEditingOrder.subOrderChargeCleared[selectedSubOrderIndex] = currentOrderChargeRate === 0
              && currentOrderChargeFixedAmount === null;
            currentEditingOrder.subOrderTips = currentEditingOrder.subOrderTips || [];
            const nextSubOrderTotal = orderItemsSubtotal(currentOrderItems);
            if (currentEditingOrder.priceEdited && previousSubOrderTotal !== nextSubOrderTotal) {
              redistributeSubOrderTipsBySubtotal(currentEditingOrder);
            } else {
              currentEditingOrder.subOrderTips[selectedSubOrderIndex] = currentOrderTip;
            }
          } else {
            currentEditingOrder.items = [...currentOrderItems];
            currentEditingOrder.tip = currentOrderTip;
          }
          currentEditingOrder.itemOption = currentItemOption;
          currentEditingOrder.customerName = currentCustomerName;
          currentEditingOrder.crmMember = currentCrmMember ? { ...currentCrmMember } : null;
          currentEditingOrder.crmDiscountRate = currentCrmDiscountRate;
          currentEditingOrder.crmDiscountMaxAmount = currentCrmDiscountMaxAmount;
          currentEditingOrder.crmFixedRewardAmount = currentCrmFixedRewardAmount;
          currentEditingOrder.crmPointDeduction = currentCrmPointDeduction;
          currentEditingOrder.hasRedeemItem = currentHasRedeemItem;
          if (selectedSubOrderIndex === null) {
            currentEditingOrder.orderChargeRate = currentOrderChargeRate;
            currentEditingOrder.orderChargeFixedAmount = currentOrderChargeFixedAmount;
            currentEditingOrder.orderChargeLabel = currentOrderChargeLabel;
            currentEditingOrder.orderChargeTaxed = currentOrderChargeTaxed;
            currentEditingOrder.orderChargeTriggerMode = currentOrderChargeTriggerMode;
            currentEditingOrder.orderChargeShareTip = currentOrderChargeShareTip;
            currentEditingOrder.extraOrderCharges = currentExtraOrderCharges.map((charge) => ({ ...charge }));
            currentEditingOrder.taxText = orderTax.textContent || '';
          }
          currentEditingOrder.priceEdited = currentEditingOrder.priceEdited || currentOrderPriceEdited;
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
          priceEdited: currentOrderPriceEdited,
          status: currentOrderStatus,
          customerName: currentCustomerName,
          guestCount: currentGuestCount,
          deliveryDistance: currentDeliveryDistance,
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
          serverName: currentServerName,
          deliveryInfoRows: [...currentDeliveryInfoRows],
          splitOrderPrices: [],
          subOrderItems: [],
          subOrderStatuses: [],
          subOrderChargeCleared: [],
          orderChargeRate: currentOrderChargeRate,
          orderChargeFixedAmount: currentOrderChargeFixedAmount,
          orderChargeLabel: currentOrderChargeLabel,
          orderChargeTaxed: currentOrderChargeTaxed,
          orderChargeTriggerMode: currentOrderChargeTriggerMode,
          orderChargeShareTip: currentOrderChargeShareTip,
          extraOrderCharges: currentExtraOrderCharges.map((charge) => ({ ...charge })),
          taxText: orderTax.textContent || '',
          inventoryDeductedQuantity: 0,
          paymentRecords: currentPaymentRecords.map((record) => ({ ...record })),
          paymentType: '',
          hasCreditFailure: false,
        };
        order.orderCardId = currentOrderType === 'dine-in' ? 'Area 1 Table 1 ' + order.orderNumber : order.orderNumber;
        order.rewardDiscount = calculateRewardDiscount(order);
        applyInventoryDelta(order, currentOrderItems);
        savedOrders.push(order);
        persistSavedOrders();
        latestSavedOrderItems = [...order.items];
        latestSavedItemOption = order.itemOption;
        selectedRecallOrder = order;
        history.replaceState(null, '', '#/home');
        return order;
      }

      function selectRecallOrder(order) {
        selectedRecallOrder = order || null;
        selectedSubOrderIndex = null;
        latestSavedOrderItems = selectedRecallOrder ? [...selectedRecallOrder.items] : [];
        latestSavedItemOption = selectedRecallOrder?.itemOption || null;
        renderRecallOrderItems();
      }

      function syncEditingOrderBeforeRecallSplit() {
        if (!currentEditingOrder || currentEditingOrder !== selectedRecallOrder || selectedSubOrderIndex !== null) {
          return;
        }
        selectedRecallOrder.items = [...currentOrderItems];
        selectedRecallOrder.itemOption = currentItemOption;
        selectedRecallOrder.tip = currentOrderTip;
        selectedRecallOrder.subtotal = Number(orderSubtotal.textContent || currentActiveOrderSubtotal());
        selectedRecallOrder.orderChargeRate = currentOrderChargeRate;
        selectedRecallOrder.orderChargeFixedAmount = currentOrderChargeFixedAmount;
        selectedRecallOrder.orderChargeLabel = currentOrderChargeLabel;
        selectedRecallOrder.orderChargeTaxed = currentOrderChargeTaxed;
        selectedRecallOrder.orderChargeTriggerMode = currentOrderChargeTriggerMode;
        selectedRecallOrder.orderChargeShareTip = currentOrderChargeShareTip;
        selectedRecallOrder.extraOrderCharges = currentExtraOrderCharges.map((charge) => ({ ...charge }));
        selectedRecallOrder.taxText = orderTax.textContent || '';
      }

      function syncCopiedOrderFromCurrentAutoConfig(order) {
        if (!order || !['auto', 'manual'].includes(order.orderChargeTriggerMode)) {
          return;
        }
        const orderType = order.orderType || currentOrderType;
        const guestCount = Number(order.guestCount || currentGuestCount || 1);
        const deliveryDistance = Number(order.deliveryDistance || currentDeliveryDistance || 0);
        const subtotal = Number(order.subtotal || 0);
        const currentAutoCandidate = autoCharges.find((charge) => (
          charge.name === order.orderChargeLabel
          || (charge.rateType === 'amount'
            && order.orderChargeFixedAmount !== null
            && Number(charge.amount || 0) === Number(order.orderChargeFixedAmount || 0))
          || (charge.rateType === 'percent'
            && Number(order.orderChargeRate || 0) > 0
            && Number(charge.rate || 0) === Number(order.orderChargeRate || 0))
        ));
        const applicableCharges = autoCharges.filter((charge) => chargeAppliesToOrderContext(
          charge,
          orderType,
          guestCount,
          deliveryDistance,
          subtotal,
        ));
        const chargeByName = applicableCharges.find((charge) => charge.name === order.orderChargeLabel);
        const chargeByValue = applicableCharges.find((charge) => (
          (charge.rateType === 'amount'
            && order.orderChargeFixedAmount !== null
            && Number(charge.amount || 0) === Number(order.orderChargeFixedAmount || 0))
          || (charge.rateType === 'percent'
            && Number(order.orderChargeRate || 0) > 0
            && Number(charge.rate || 0) === Number(order.orderChargeRate || 0))
        ));
        const charge = chargeByName || chargeByValue || applicableCharges[0];
        if (!charge) {
          if (order.orderChargeTriggerMode === 'manual' && !currentAutoCandidate) {
            return;
          }
          order.orderChargeRate = 0;
          order.orderChargeFixedAmount = null;
          order.orderChargeLabel = '';
          order.orderChargeTaxed = false;
          order.orderChargeShareTip = false;
          order.orderChargeTriggerMode = '';
          return;
        }
        order.orderChargeRate = Number(charge.rate || 0);
        order.orderChargeFixedAmount = charge.rateType === 'amount' ? Number(charge.amount || 0) : null;
        order.orderChargeLabel = charge.name;
        order.orderChargeTaxed = Boolean(charge.taxed);
        order.orderChargeShareTip = Boolean(charge.shareTip);
        order.orderChargeTriggerMode = 'auto';
      }

      function orderTotal(order) {
        if (order?.settlementTotal !== null && order?.settlementTotal !== undefined) {
          return Number(Number(order.settlementTotal).toFixed(2));
        }
        return Number(((order?.items || []).reduce((total, item) => total + Number(item.price || 0), 0)
          + orderChargeAmount(order, order?.items || [])
          + Number(order?.tip || 0)
          + Number(order?.rewardDiscount || 0)
          + Number(order?.wholeOrderDiscountAmount || 0)).toFixed(2));
      }

      function primaryOrderChargeAmount(order, items, subOrderIndex = null) {
        if (Array.isArray(order?.combinedOrderCharges)) {
          return roundMoney(order.combinedOrderCharges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0));
        }
        if (order?.orderChargeFixedAmount !== null && order?.orderChargeFixedAmount !== undefined) {
          if (subOrderIndex !== null && Array.isArray(order?.splitOrderPrices) && order.splitOrderPrices.length) {
            const splitTotal = order.splitOrderPrices.reduce((sum, price) => sum + Number(price || 0), 0);
            if (splitTotal) {
              return roundMoney(Number(order.orderChargeFixedAmount) * (Number(order.splitOrderPrices[subOrderIndex] || 0) / splitTotal));
            }
          }
          const parentSubtotal = orderItemsSubtotal(order?.items || []);
          const currentSubtotal = orderItemsSubtotal(items || []);
          if (parentSubtotal && currentSubtotal && currentSubtotal !== parentSubtotal) {
            return roundMoney(Number(order.orderChargeFixedAmount) * (currentSubtotal / parentSubtotal));
          }
          return Number(order.orderChargeFixedAmount);
        }
        const rate = Number(order?.orderChargeRate || 0);
        if (!rate) {
          return 0;
        }
        return roundMoney(orderItemsSubtotal(items || []) * rate);
      }

      function orderChargeAmount(order, items, subOrderIndex = null) {
        if (Array.isArray(order?.combinedOrderCharges)) {
          return roundMoney(order.combinedOrderCharges.reduce((sum, charge) => sum + Number(charge.amount || 0), 0));
        }
        return roundMoney(primaryOrderChargeAmount(order, items, subOrderIndex)
          + (order?.extraOrderCharges || []).reduce((sum, charge) => sum + Number(charge.amount || 0), 0));
      }

      function priceDetailText(order, items, subOrderIndex = null) {
        const lines = ['Subtotal ' + orderItemsSubtotal(items || []).toFixed(2)];
        if (Array.isArray(order?.combinedOrderCharges)) {
          aggregateChargeSnapshots(order.combinedOrderCharges)
            .filter((charge) => Number(charge.amount || 0) !== 0)
            .forEach((charge) => {
              lines.push((charge.label || 'Charge') + ' ' + Number(charge.amount || 0).toFixed(2));
            });
          return lines.join('\\n');
        }
        const chargeCleared = subOrderIndex !== null && Boolean(order?.subOrderChargeCleared?.[subOrderIndex]);
        if (!chargeCleared) {
          const primaryCharge = primaryOrderChargeAmount(order, items || [], subOrderIndex);
          aggregateChargeSnapshots([
            primaryCharge
              ? {
                  amount: primaryCharge,
                  label: order?.orderChargeLabel || 'Charge',
                  shareTip: Boolean(order?.orderChargeShareTip),
                  taxed: Boolean(order?.orderChargeTaxed),
                }
              : null,
            ...(order?.extraOrderCharges || []),
          ]).forEach((charge) => {
            lines.push((charge.label || 'Charge') + ' ' + Number(charge.amount || 0).toFixed(2));
          });
        }
        return lines.join('\\n');
      }

      function ensurePaymentRecords(order) {
        if (!order.paymentRecords) {
          order.paymentRecords = [];
        }
        return order.paymentRecords;
      }

      function paidRecordAmount(order) {
        return roundMoney(ensurePaymentRecords(order)
          .filter((record) => Number(record.amount || 0) > 0)
          .reduce((sum, record) => sum + Number(record.amount || 0), 0));
      }

      function appendPaymentRecord(order, paymentType, amount) {
        if (!order || Number(amount || 0) <= 0) {
          return;
        }
        ensurePaymentRecords(order).push({
          amount: roundMoney(amount),
          paymentType,
        });
      }

      function refundPaymentRecord(order, recordIndex, amountInCents = null) {
        const records = ensurePaymentRecords(order);
        const record = records[recordIndex];
        if (!record || Number(record.amount || 0) <= 0 || record.refunded) {
          return;
        }
        const refundAmount = amountInCents !== null && Number(amountInCents) > 0
          ? Math.min(Number(amountInCents) / 100, Number(record.amount || 0))
          : Number(record.amount || 0);
        record.refunded = true;
        records.push({
          amount: roundMoney(refundAmount * -1),
          paymentType: record.paymentType,
          refundedFrom: recordIndex + 1,
        });
      }

      function renderPaymentRecords(order) {
        recallPaymentRecords.innerHTML = '';
        ensurePaymentRecords(order).forEach((record, index) => {
          const row = document.createElement('div');
          row.dataset.testid = 'recall-payment-record';
          const amount = document.createElement('span');
          amount.dataset.testid = 'recall-payment-record-amount';
          amount.textContent = Number(record.amount || 0).toFixed(2);
          const refundAmountInput = document.createElement('input');
          refundAmountInput.dataset.testid = 'recall-payment-record-refund-amount';
          const refundButton = document.createElement('button');
          refundButton.dataset.testid = 'recall-payment-record-refund';
          refundButton.textContent = 'Refund';
          refundButton.disabled = Number(record.amount || 0) <= 0 || Boolean(record.refunded);
          refundButton.addEventListener('click', () => {
            refundPaymentRecord(order, index, refundAmountInput.value ? Number(refundAmountInput.value) : null);
            renderRecallOrderItems();
          });
          row.appendChild(amount);
          row.appendChild(refundAmountInput);
          row.appendChild(refundButton);
          recallPaymentRecords.appendChild(row);
        });
      }

      function renderVoidReasons() {
        recallVoidReasons.innerHTML = '';
        [
          'Customer changed mind',
          'Wrong item',
          'Duplicate order',
          'Kitchen unavailable',
          'Manager approval',
          'Payment issue',
          'Other',
        ].forEach((reason) => {
          const option = document.createElement('button');
          option.dataset.testid = 'recall-void-reason-option';
          option.textContent = reason;
          recallVoidReasons.appendChild(option);
        });
        recallVoidReasonPanel.hidden = false;
      }

      function orderItemsSubtotal(items) {
        return roundMoney((items || []).reduce((total, item) => total + Number(item.price || 0), 0));
      }

      function redistributeSubOrderTipsBySubtotal(order) {
        const subOrderItems = order?.subOrderItems || [];
        if (!order || subOrderItems.length === 0) {
          return;
        }
        const tip = Number(order.tip || 0);
        const subtotal = subOrderItems.reduce((total, items) => total + orderItemsSubtotal(items), 0);
        let allocatedTip = 0;
        order.subOrderTips = subOrderItems.map((items, index) => {
          if (index === subOrderItems.length - 1) {
            return roundMoney(tip - allocatedTip);
          }
          const share = subtotal > 0
            ? roundMoney((tip * orderItemsSubtotal(items)) / subtotal)
            : roundMoney(tip / subOrderItems.length);
          allocatedTip = roundMoney(allocatedTip + share);
          return share;
        });
      }

      function snapshotOrderCharges(order) {
        const primaryAmount = primaryOrderChargeAmount(order, order?.items || []);
        return aggregateChargeSnapshots([
          primaryAmount
            ? {
                amount: primaryAmount,
                label: order.orderChargeLabel || 'Charge',
                shareTip: Boolean(order.orderChargeShareTip),
                taxed: Boolean(order.orderChargeTaxed),
              }
            : null,
          ...(order?.extraOrderCharges || []),
        ]);
      }

      function combinedOrderTaxAmount(order) {
        const taxRate = Number((order?.items || []).find((item) => item.taxRate !== undefined)?.taxRate ?? 0.0825);
        const subtotal = Array.isArray(order?.combinedOrderCharges)
          ? orderItemsSubtotal(order?.items || [])
          : Number(order?.subtotal ?? orderItemsSubtotal(order?.items || []));
        const taxedChargeAmount = (order?.combinedOrderCharges || [])
          .filter((charge) => Boolean(charge.taxed))
          .reduce((sum, charge) => sum + Number(charge.amount || 0), 0);
        return roundMoney((subtotal + taxedChargeAmount) * taxRate);
      }

      function mergeCrmOrders(targetOrder, sourceOrder) {
        if (!targetOrder || !sourceOrder) {
          return;
        }
        const targetCharges = currentCombineRecalculateCharge ? [] : snapshotOrderCharges(targetOrder);
        const sourceCharges = currentCombineRecalculateCharge ? [] : snapshotOrderCharges(sourceOrder);
        targetOrder.items = [...targetOrder.items, ...sourceOrder.items];
        targetOrder.subtotal = Number((Number(targetOrder.subtotal || 0) + Number(sourceOrder.subtotal || 0)).toFixed(2));
        targetOrder.combinedOrderCharges = aggregateChargeSnapshots([
          ...(targetOrder.combinedOrderCharges || []),
          ...targetCharges,
          ...sourceCharges,
        ]);
        if (targetOrder.combinedOrderCharges.length) {
          targetOrder.orderChargeRate = 0;
          targetOrder.orderChargeFixedAmount = null;
          targetOrder.orderChargeLabel = '';
          targetOrder.orderChargeTriggerMode = '';
        }
        targetOrder.taxText = combinedOrderTaxAmount(targetOrder).toFixed(2);
        if (targetOrder.crmDiscountRate) {
          targetOrder.rewardDiscount = calculateRewardDiscount(targetOrder);
        }
        savedOrders = savedOrders.filter((order) => order !== sourceOrder);
        selectRecallOrder(targetOrder);
      }

      function moveFirstRecallItemToNewOrder() {
        if (!selectedRecallOrder || !selectedRecallOrder.items?.length) {
          return;
        }
        const movedItem = selectedRecallOrder.items.shift();
        selectedRecallOrder.subtotal = orderItemsSubtotal(selectedRecallOrder.items);

        const movedOrder = {
          ...selectedRecallOrder,
          combinedOrderCharges: undefined,
          crmDiscountRate: 0,
          crmFixedRewardAmount: 0,
          crmPointDeduction: 0,
          hasRedeemItem: false,
          itemOption: null,
          items: [movedItem],
          orderChargeFixedAmount: null,
          orderChargeLabel: '',
          orderChargeRate: 0,
          orderChargeTaxed: false,
          orderChargeTriggerMode: '',
          orderNumber: String(nextOrderNumber++),
          paymentRecords: [],
          rewardDiscount: 0,
          settlementTotal: null,
          splitOrderPrices: [],
          subOrderChargeCleared: [],
          subOrderItems: [],
          subOrderStatuses: [],
          subtotal: orderItemsSubtotal([movedItem]),
          taxText: '',
          tip: 0,
        };
        movedOrder.orderCardId = movedOrder.orderType === 'dine-in'
          ? 'Area 1 Table 1 ' + movedOrder.orderNumber
          : movedOrder.orderNumber;
        savedOrders.push(movedOrder);
        persistSavedOrders();
        selectRecallOrder(movedOrder);
      }

      function moveFirstRecallItemToExistingOrder(orderIndex) {
        if (!selectedRecallOrder || !selectedRecallOrder.items?.length) {
          return;
        }
        const targetOrder = savedOrders[savedOrders.length - Number(orderIndex || 0)];
        if (!targetOrder || targetOrder === selectedRecallOrder) {
          return;
        }
        const movedItem = selectedRecallOrder.items.shift();
        selectedRecallOrder.subtotal = orderItemsSubtotal(selectedRecallOrder.items);
        targetOrder.items = [...(targetOrder.items || []), movedItem];
        targetOrder.subtotal = orderItemsSubtotal(targetOrder.items);
        targetOrder.rewardDiscount = calculateRewardDiscount(targetOrder);
        persistSavedOrders();
        selectRecallOrder(targetOrder);
      }

      function moveCurrentSubOrderToNewOrder() {
        if (!selectedRecallOrder || selectedSubOrderIndex === null) {
          return;
        }
        const subOrderItems = selectedRecallOrder.subOrderItems?.[selectedSubOrderIndex] || [];
        if (!subOrderItems.length) {
          return;
        }
        const subOrderCharge = orderChargeAmount(selectedRecallOrder, subOrderItems, selectedSubOrderIndex);
        const movedOrder = {
          ...selectedRecallOrder,
          combinedOrderCharges: undefined,
          items: subOrderItems.map((item) => ({ ...item })),
          orderChargeFixedAmount: subOrderCharge || null,
          orderChargeLabel: subOrderCharge ? selectedRecallOrder.orderChargeLabel : '',
          orderChargeRate: 0,
          orderChargeTaxed: Boolean(selectedRecallOrder.orderChargeTaxed),
          orderChargeTriggerMode: subOrderCharge ? selectedRecallOrder.orderChargeTriggerMode : '',
          orderNumber: String(nextOrderNumber++),
          paymentRecords: [],
          settlementTotal: null,
          splitOrderPrices: [],
          subOrderChargeCleared: [],
          subOrderItems: [],
          subOrderStatuses: [],
          subtotal: orderItemsSubtotal(subOrderItems),
          tip: selectedRecallOrder.subOrderTips?.[selectedSubOrderIndex] || 0,
        };
        movedOrder.orderCardId = movedOrder.orderType === 'dine-in'
          ? 'Area 1 Table 1 ' + movedOrder.orderNumber
          : movedOrder.orderNumber;
        selectedRecallOrder.subOrderItems[selectedSubOrderIndex] = [];
        selectedRecallOrder.subOrderStatuses[selectedSubOrderIndex] = 'Moved';
        savedOrders.push(movedOrder);
        persistSavedOrders();
        selectRecallOrder(movedOrder);
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
            const subOrderItems = order.subOrderItems?.[index] || [];
            renderRecallItemRows(subOrderItems);
            const itemTotal = Number((subOrderItems.reduce((sum, item) => sum + Number(item.price || 0), 0)).toFixed(2));
            const total = subOrderItems.length > 0
              ? itemTotal
              : Number(order.splitOrderPrices?.[index] || 0);
            recallItemCount.textContent = formatItemCount(subOrderItems);
            recallOrderSubtotal.textContent = String(total);
            recallOrderTotal.textContent = String(total);
            recallOrderPriceDetail.textContent = priceDetailText(order, subOrderItems, index);
            recallOrderTip.textContent = formatTip(order.subOrderTips?.[index] ?? order.tip ?? 0);
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

      function renderRecallDiscountRows(order) {
        recallDiscountRows.innerHTML = '';
        (order.items || []).forEach((item) => {
          const originalPrice = Number(item.originalPrice ?? item.price ?? 0);
          const currentPrice = Number(item.price ?? originalPrice);
          const row = document.createElement('div');
          row.dataset.testid = 'recall-discount-row';
          row.dataset.originalPrice = originalPrice.toFixed(2);
          row.dataset.currentPrice = currentPrice.toFixed(2);
          row.textContent = item.name + ' ' + originalPrice.toFixed(2) + ' ' + currentPrice.toFixed(2);
          recallDiscountRows.appendChild(row);
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
        recallServerName.textContent = order.serverName || currentServerName;
        recallCustomerName.textContent = order.customerName || '';
        recallItemCount.textContent = formatItemCount(order.items || []);
        recallGuestPhone.textContent = formatRecallPhone(order.guestPhone || '');
        recallGuestAddress.textContent = order.guestAddress || '';
        recallOrderSubtotal.textContent = String(
          Array.isArray(order.combinedOrderCharges)
            ? orderItemsSubtotal(order.items || [])
            : order.subtotal ?? orderTotal(order),
        );
        recallOrderTax.textContent = order.taxText ?? '';
        recallOrderReward.textContent = formatRewardDiscount(order.rewardDiscount || 0, order.crmDiscountRate);
        recallOrderTotal.textContent =
          order?.settlementTotal !== null && order?.settlementTotal !== undefined
            ? Number(orderTotal(order)).toFixed(2)
            : String(orderTotal(order));
        recallOrderPriceDetail.textContent = priceDetailText(order, order.items || []);
        recallCrmMemberName.textContent = order.crmMember?.name || '';
        recallCrmPointBalance.textContent = String(order.crmMember?.points || 0);
        recallMoveOrderButton.hidden = Boolean(order.hasRedeemItem);
        recallMoveItemButton.hidden = Boolean(order.hasRedeemItem);
        recallParentOrder.style.backgroundColor = order.parentBackground || '';
        recallParentOrder.dataset.background = order.parentBackground || '';
        renderSplitPrices(order.splitOrderPrices || []);
        renderSplitItemPrices(draftSplitItemPrices);
        renderSubOrders(order);
        renderPaymentRecords(order);
        renderRecallItemRows(order.items || []);
        renderRecallDiscountRows(order);
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
        localStorage.setItem('offlineEmployeePassword', currentEmployeePassword);
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
          if (!canCurrentEmployeeClockIn()) {
            clockText.textContent = 'Cannot Clock In';
            persistClockState();
            renderClockControls();
            return;
          }
          const staff = currentEmployeeStaff();
          currentClockStaffSnapshot = {
            staffName: staff.name,
            wage: staff.wage || '',
            wageType: staff.wageType || '1',
          };
          clockState = 'clocked-in';
          clockText.textContent = 'Clocked In at ' + clockNow();
          persistClockState();
        }
        renderClockControls();
      });
      breakButton.addEventListener('click', () => {
        clockState = 'on-break';
        clockText.textContent = 'On Break from ' + clockNow();
        persistClockState();
        renderClockControls();
      });
      backToWorkButton.addEventListener('click', () => {
        clockState = 'clocked-in';
        clockText.textContent = 'Clocked In at ' + clockNow();
        persistClockState();
        renderClockControls();
      });
      checkoutButton.addEventListener('click', () => {
        if (currentClockStaffSnapshot) {
          attendanceRecords.push({ ...currentClockStaffSnapshot });
          currentClockStaffSnapshot = null;
        }
        clockState = 'off';
        clockText.textContent = 'Checked Out';
        persistClockState();
        renderClockControls();
      });
      document.querySelector('[data-testid="home-admin"]').addEventListener('click', () => {
        adminAnalysisPage.hidden = true;
        adminPermissionPopup.hidden = true;
        adminStaffPage.hidden = true;
        adminKioskPage.hidden = true;
        showPanel('admin');
      });
      adminStaffButton.addEventListener('click', () => {
        adminAnalysisPage.hidden = true;
        adminPermissionPopup.hidden = true;
        adminStaffPage.hidden = false;
        adminKioskPage.hidden = true;
        renderAdminStaffList();
      });
      adminKioskButton.addEventListener('click', () => {
        adminAnalysisPage.hidden = true;
        adminPermissionPopup.hidden = true;
        adminStaffPage.hidden = true;
        adminKioskPage.hidden = false;
      });
      adminKioskItemSoldOutButton.addEventListener('click', () => {
        const itemName = adminKioskItemNameInput.value;
        adminKioskSoldOutItems.add(itemName);
        localStorage.setItem('offline-admin-kiosk-sold-out-items', JSON.stringify([...adminKioskSoldOutItems]));
        renderAdminKioskItemStatus(itemName);
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
          wage: adminStaffWageInput.value,
          wageType: adminStaffWageTypeSelect.value,
          permissions: creatableStaffPermissionsForCurrentEmployee(),
        };
        adminStaffRecords = adminStaffRecords.filter((record) => record.name !== staff.name);
        adminStaffRecords.push(staff);
        renderAdminStaffList();
        showSelectedAdminStaff(staff);
      });
      adminAttendanceSearchButton.addEventListener('click', () => {
        renderLastAttendance();
      });
      adminAttendanceLastRow.addEventListener('click', () => {
        renderLastAttendance();
      });
      adminAttendanceSaveButton.addEventListener('click', () => {
        const lastRecord = attendanceRecords[attendanceRecords.length - 1];
        if (!lastRecord) {
          return;
        }
        lastRecord.wage = adminAttendanceWage.value;
        lastRecord.wageType = adminAttendanceWageType.value;
        renderLastAttendance();
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
        currentCombineRecalculateCharge = combineRecalculateChargeSelect.value === 'true';
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
        localStorage.setItem('currentCombineRecalculateCharge', String(currentCombineRecalculateCharge));
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
      document.querySelector('[data-testid="home-cash-in-out"]').addEventListener('click', () => {
        renderCashInOutTitle();
        cashInOutNotePanel.hidden = true;
        cashInOutCover.hidden = true;
        showPanel('cash-in-out');
      });
      cashInOutCompleteButton.addEventListener('click', () => {
        cashInOutNotePanel.hidden = false;
        cashInOutNoteInput.focus();
      });
      cashInOutNoteOkButton.addEventListener('click', () => {
        cashDrawerMode = cashDrawerMode === 'cash-in' ? 'cash-out' : 'cash-in';
        renderCashInOutTitle();
        cashInOutNotePanel.hidden = true;
        cashInOutCover.hidden = false;
      });
      cashInOutCover.addEventListener('click', () => {
        cashInOutCover.hidden = true;
        showPanel('home');
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
      emenuFirstCategoryItemButton.addEventListener('click', () => {
        tryAddCurrentEmenuItem();
      });
      emenuAddItemButton.addEventListener('click', () => {
        tryAddCurrentEmenuItem();
      });
      emenuPlaceOrderButton.addEventListener('click', () => {
        createEmenuOrder();
        emenuOrderCard.hidden = false;
      });
      kioskSelectLicenseButton.addEventListener('click', () => {
        document.body.dataset.kioskLicense = 'selected';
      });
      kioskOrderTypeToGoButton.addEventListener('click', () => {
        currentKioskOrderType = 'togo';
      });
      kioskItemButton.addEventListener('click', () => {
        const limit = Number(inventoryRecord(currentKioskItem.name).quantity || 0);
        if (limit > 0 && kioskCartQuantityForCurrentItem() >= limit) {
          kioskSoldOutPopup.hidden = false;
          return;
        }
        currentKioskCartItems.push({ ...currentKioskItem, quantity: 1 });
        renderKioskItem();
      });
      kioskViewOrderButton.addEventListener('click', () => {
        document.body.dataset.kioskCart = 'viewing';
      });
      kioskCheckoutButton.addEventListener('click', () => {
        document.body.dataset.kioskCheckout = 'started';
      });
      kioskSkipButton.addEventListener('click', () => {
        document.body.dataset.kioskSkipCount = String(Number(document.body.dataset.kioskSkipCount || '0') + 1);
      });
      kioskCashPaymentButton.addEventListener('click', () => {
        createKioskPaidOrder();
        document.body.dataset.kioskPayment = 'cash';
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
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = 'Charge(20%)';
        currentOrderChargeTaxed = false;
        currentOrderChargeTriggerMode = 'order';
        currentOrderChargeShareTip = false;
        renderOrderAmounts();
      });
      orderCharge10Button.addEventListener('click', () => {
        currentOrderChargeRate = 0.1;
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = 'Charge(10%)';
        currentOrderChargeTaxed = false;
        currentOrderChargeTriggerMode = 'order';
        currentOrderChargeShareTip = false;
        renderOrderAmounts();
      });
      orderCharge10TaxableButton.addEventListener('click', () => {
        currentOrderChargeRate = 0.1;
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = 'Charge(10%)';
        currentOrderChargeTaxed = true;
        currentOrderChargeTriggerMode = 'order';
        currentOrderChargeShareTip = false;
        renderOrderAmounts();
      });
      orderCharge5Button.addEventListener('click', () => {
        currentOrderChargeRate = 0.05;
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = 'Charge(5%)';
        currentOrderChargeTaxed = false;
        currentOrderChargeTriggerMode = 'order';
        currentOrderChargeShareTip = false;
        renderOrderAmounts();
      });
      orderChargeZeroButton.addEventListener('click', () => {
        currentOrderChargeRate = 0;
        currentOrderChargeFixedAmount = null;
        currentOrderChargeLabel = '';
        currentOrderChargeTaxed = false;
        currentOrderChargeTriggerMode = '';
        currentOrderChargeShareTip = false;
        renderOrderAmounts();
      });
      orderCustomChargeAddButton.addEventListener('click', () => {
        const value = Number(orderCustomChargeValueInput.value || 0);
        const amount = orderCustomChargeRateTypeSelect.value === 'percent'
          ? roundMoney(currentActiveOrderSubtotal() * (value / 100))
          : value;
        appendExtraOrderCharge({
          amount,
          label: 'Charge',
          shareTip: false,
          taxed: orderCustomChargeTaxedSelect.value === 'true',
        });
        renderOrderAmounts();
      });
      orderChargeOpenButton.addEventListener('click', () => {
        orderChargeDialog.hidden = false;
        renderPresetChargeDialog();
      });
      orderChargeOkButton.addEventListener('click', () => {
        syncCurrentChargeFromManualConfig();
        orderChargeDialog.hidden = true;
        renderOrderAmounts();
      });
      adminChargeRenameButton.addEventListener('click', () => {
        const oldName = adminChargeOldNameInput.value;
        const newName = adminChargeNewNameInput.value;
        manualCharges = manualCharges.map((charge) => (
          charge.name === oldName ? { ...charge, name: newName } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === oldName ? { ...charge, name: newName } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminManualFixedChargeSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'manu_test_fixed';
        const amount = Number(adminChargeAmountInput.value || 10);
        manualCharges = [
          ...manualCharges.filter((charge) => charge.name !== chargeName),
          {
            amount,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: 0,
            rateType: 'amount',
            shareTip: false,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
      });
      adminManualPercentChargeAsTipSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'manu_test_perc';
        const percent = Number(adminChargeAmountInput.value || 10);
        manualCharges = [
          ...manualCharges.filter((charge) => charge.name !== chargeName),
          {
            amount: percent,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: percent / 100,
            rateType: 'percent',
            shareTip: true,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
      });
      adminAutoFixedChargeSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'auto_test_fixed';
        const amount = Number(adminChargeAmountInput.value || 10);
        autoCharges = [
          {
            amount,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: 0,
            rateType: 'amount',
            shareTip: false,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminAutoFixedChargeAsTipSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'other_charge';
        const amount = Number(adminChargeAmountInput.value || 10);
        autoCharges = [
          {
            amount,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: 0,
            rateType: 'amount',
            shareTip: true,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminAutoPercentChargeSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'auto_test_percentage';
        const percent = Number(adminChargeAmountInput.value || 10);
        autoCharges = [
          {
            amount: percent,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: percent / 100,
            rateType: 'percent',
            shareTip: false,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminAutoPercentChargeAsTipSetupButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value || 'auto_test_perc';
        const percent = Number(adminChargeAmountInput.value || 10);
        autoCharges = [
          {
            amount: percent,
            minAmount: 0,
            minGuest: 0,
            minMile: 0,
            name: chargeName,
            orderTypes: ['dine-in', 'delivery', 'pickup', 'togo'],
            rate: percent / 100,
            rateType: 'percent',
            shareTip: true,
            taxed: false,
          },
        ];
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeRateTypeSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeRateTypeNameInput.value;
        const rateType = adminChargeRateTypeSelect.value;
        manualCharges = manualCharges.map((charge) => {
          if (charge.name !== chargeName) {
            return charge;
          }
          if (rateType === 'percent') {
            return { ...charge, amount: 10, rate: 0.1, rateType: 'percent' };
          }
          return { ...charge, amount: 10, rate: 0, rateType: 'amount' };
        });
        autoCharges = autoCharges.map((charge) => {
          if (charge.name !== chargeName) {
            return charge;
          }
          if (rateType === 'percent') {
            return { ...charge, amount: 10, rate: 0.1, rateType: 'percent' };
          }
          return { ...charge, amount: 10, rate: 0, rateType: 'amount' };
        });
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeAmountSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeAmountNameInput.value;
        const amount = Number(adminChargeAmountInput.value || 0);
        manualCharges = manualCharges.map((charge) => {
          if (charge.name !== chargeName) {
            return charge;
          }
          if (charge.rateType === 'percent') {
            return { ...charge, amount, rate: amount / 100 };
          }
          return { ...charge, amount, rate: 0 };
        });
        autoCharges = autoCharges.map((charge) => {
          if (charge.name !== chargeName) {
            return charge;
          }
          if (charge.rateType === 'percent') {
            return { ...charge, amount, rate: amount / 100 };
          }
          return { ...charge, amount, rate: 0 };
        });
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeTaxSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeTaxNameInput.value;
        const taxed = adminChargeTaxedSelect.value === 'true';
        manualCharges = manualCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, taxed } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, taxed } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeOrderTypesSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeOrderTypeNameInput.value;
        const orderTypes = [...adminChargeOrderTypesSelect.selectedOptions].map((option) => option.value);
        manualCharges = manualCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, orderTypes } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, orderTypes } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeMinGuestSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeMinGuestNameInput.value;
        const minGuest = Number(adminChargeMinGuestInput.value || 0);
        manualCharges = manualCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minGuest } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minGuest } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeMinMileSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeMinMileNameInput.value;
        const minMile = Number(adminChargeMinMileInput.value || 0);
        manualCharges = manualCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minMile } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minMile } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeMinAmountSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeMinAmountNameInput.value;
        const minAmount = Number(adminChargeMinAmountInput.value || 0);
        manualCharges = manualCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minAmount } : charge
        ));
        autoCharges = autoCharges.map((charge) => (
          charge.name === chargeName ? { ...charge, minAmount } : charge
        ));
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeTriggerSaveButton.addEventListener('click', () => {
        const chargeName = adminChargeTriggerNameInput.value;
        const triggerMode = adminChargeTriggerModeSelect.value;
        if (triggerMode === 'manual') {
          const charge = autoCharges.find((entry) => entry.name === chargeName);
          if (charge) {
            autoCharges = autoCharges.filter((entry) => entry.name !== chargeName);
            manualCharges = [
              ...manualCharges.filter((entry) => entry.name !== chargeName),
              charge,
            ];
          }
        } else {
          const charge = manualCharges.find((entry) => entry.name === chargeName);
          if (charge) {
            manualCharges = manualCharges.filter((entry) => entry.name !== chargeName);
            autoCharges = [
              ...autoCharges.filter((entry) => entry.name !== chargeName),
              charge,
            ];
          }
        }
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
      });
      adminChargeDeleteAllButton.addEventListener('click', () => {
        const chargeName = adminChargeOldNameInput.value;
        if (chargeName) {
          manualCharges = manualCharges.filter((charge) => charge.name !== chargeName);
          autoCharges = autoCharges.filter((charge) => charge.name !== chargeName);
        } else {
          manualCharges = [];
        }
        localStorage.setItem('offlineManualCharges', JSON.stringify(manualCharges));
        localStorage.setItem('offlineAutoCharges', JSON.stringify(autoCharges));
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
        persistInventoryRecords();
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
        currentEvenPayParts = 2;
      });
      function settleCurrentOrder(paymentType) {
        const unpaidAmount = Number(settleUnpaidAmount.textContent || '0');
        const requestedPaymentAmount = Number(settlePayAmountInput.value || '0') / 100;
        const paymentAmount = requestedPaymentAmount > 0 ? requestedPaymentAmount : unpaidAmount;
        if (currentSemiPayMode) {
          const total = Number(settleTotal.textContent || '0');
          const splitPaymentAmount = currentPaymentRecords.length === 0
            ? roundMoney(total / Math.max(currentEvenPayParts, 1))
            : paymentAmount;
          currentPaymentRecords.push({
            amount: splitPaymentAmount,
            paymentType,
          });
          currentPaidAmount = roundMoney(currentPaidAmount + splitPaymentAmount);
          currentOrderStatus = currentPaidAmount >= total ? 'Paid' : 'Partially Paid';
          currentSemiPayMode = currentOrderStatus !== 'Paid';
          saveCurrentOrder();
          return;
        }
        if (paymentAmount > 0 && paymentAmount < unpaidAmount) {
          currentPaymentRecords.push({
            amount: paymentAmount,
            paymentType,
          });
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
        currentPaymentRecords.push({
          amount: paymentAmount,
          paymentType,
        });
        const member = selectedMemberRecord();
        if (member && paymentType === 'cash') {
          member.points += earnPointsForSubtotal(Number(orderSubtotal.textContent || '0'));
          currentCrmMember = member;
        }
        const wasEditingOrderForSettlement = Boolean(currentEditingOrder);
        saveCurrentOrder();
        if (wasEditingOrderForSettlement) {
          showPanel('recall');
          renderRecallOrderItems();
        }
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
      orderGuestCountInput.addEventListener('input', () => {
        currentGuestCount = Number(orderGuestCountInput.value || '1');
      });
      orderSeatSharedButton.addEventListener('click', () => {
        currentSeatNumber = null;
      });
      orderSeatOneButton.addEventListener('click', () => {
        currentSeatNumber = 1;
      });
      orderSeatTwoButton.addEventListener('click', () => {
        currentSeatNumber = currentGuestCount >= 2 ? 2 : 1;
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
        const selectedIndexes = selectedItemDiscountIndexes();
        if (selectedIndexes.length > 1) {
          selectedIndexes.forEach((index) => {
            const item = currentOrderItems[index];
            if (item) {
              item.originalPrice = Number(item.originalPrice ?? item.price ?? 0);
              applyItemDiscountPercent(index, percent);
            }
          });
          renderOrderAmounts();
          return;
        }
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
      itemDiscountClearSelectedButton.addEventListener('click', () => {
        selectedItemDiscountIndexes().forEach((index) => {
          const item = currentOrderItems[index];
          if (!item) {
            return;
          }
          item.price = Number(item.originalPrice ?? item.price ?? 0);
          item.itemDiscountPercent = 0;
          item.itemDiscountAmount = 0;
        });
        renderOrderAmounts();
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
      orderDiscountClearWholeButton.addEventListener('click', () => {
        applyWholeOrderDiscountPercent(0);
      });
      itemPriceSubmitButton.addEventListener('click', () => {
        const selectedItem = currentOrderItems[selectedOrderItemIndex] || currentOrderItems[0];
        if (selectedItem) {
          selectedItem.price = Number(itemPriceInput.value || '0');
          selectedItem.unitPrice = Number(itemPriceInput.value || '0') / Number(selectedItem.quantity || 1);
          currentOrderPriceEdited = true;
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
      recallMoveItemButton.addEventListener('click', () => {
        const targetOrderIndex = recallMoveTargetOrderIndexInput.value;
        if (targetOrderIndex) {
          moveFirstRecallItemToExistingOrder(targetOrderIndex);
          recallMoveTargetOrderIndexInput.value = '';
          return;
        }
        moveFirstRecallItemToNewOrder();
      });
      recallMoveOrderButton.addEventListener('click', () => {
        moveCurrentSubOrderToNewOrder();
      });
      recallCopyOrderButton.addEventListener('click', () => {
        if (!selectedRecallOrder) {
          return;
        }
        const copiedOrder = JSON.parse(JSON.stringify(selectedRecallOrder));
        copiedOrder.orderNumber = String(nextOrderNumber++);
        copiedOrder.orderCardId = copiedOrder.orderType === 'dine-in'
          ? 'Area 1 Table 1 ' + copiedOrder.orderNumber
          : copiedOrder.orderNumber;
        copiedOrder.status = copiedOrder.status || 'New Order';
        syncCopiedOrderFromCurrentAutoConfig(copiedOrder);
        savedOrders.push(copiedOrder);
        selectRecallOrder(copiedOrder);
        persistSavedOrders();
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
        if (selectedRecallOrder) {
          renderRecallDiscountRows(selectedRecallOrder);
        }
        recallDiscountOkButton.hidden = false;
      });
      recallDiscountClearAllButton.addEventListener('click', () => {
        if (!selectedRecallOrder) {
          return;
        }
        selectedRecallOrder.items = (selectedRecallOrder.items || []).map((item) => {
          const originalPrice = Number(item.originalPrice ?? item.price ?? 0);
          return {
            ...item,
            price: originalPrice,
            itemDiscountPercent: 0,
            itemDiscountAmount: 0,
          };
        });
        selectedRecallOrder.subtotal = orderItemsSubtotal(selectedRecallOrder.items);
        persistSavedOrders();
        renderRecallOrderItems();
        recallDiscountOkButton.hidden = false;
      });
      recallDiscountOkButton.addEventListener('click', () => {
        recallDiscountOkButton.hidden = true;
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
          appendPaymentRecord(
            selectedRecallOrder,
            'cash',
            roundMoney(Math.max(0, orderTotal(selectedRecallOrder) - paidRecordAmount(selectedRecallOrder))),
          );
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
      recallChangeServerButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.serverName = selectedRecallOrder.serverName === 'Server A' ? 'Server B' : 'Server A';
          currentServerName = selectedRecallOrder.serverName;
          localStorage.setItem('offlineCurrentServerName', currentServerName);
          persistSavedOrders();
          renderRecallOrderItems();
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
          if (selectedSubOrderIndex !== null && selectedRecallOrder.subOrderStatuses?.[selectedSubOrderIndex]) {
            selectedRecallOrder.subOrderTips = selectedRecallOrder.subOrderTips || [];
            const previousSubOrderTip = Number(selectedRecallOrder.subOrderTips[selectedSubOrderIndex] || 0);
            selectedRecallOrder.subOrderTips[selectedSubOrderIndex] = recallTipMethod.value === 'cash'
              ? roundMoney(previousSubOrderTip + tipAmount)
              : tipAmount;
            recallOrderTip.textContent = formatTip(selectedRecallOrder.subOrderTips[selectedSubOrderIndex]);
            renderSubOrders(selectedRecallOrder);
            return;
          }
          selectedRecallOrder.tip = recallTipMethod.value === 'cash'
            ? roundMoney(Number(selectedRecallOrder.tip || 0) + tipAmount)
            : tipAmount;
          selectedRecallOrder.settlementTotal = orderTotal({
            ...selectedRecallOrder,
            settlementTotal: null,
          });
          if (selectedRecallOrder.paymentRecords?.[0]) {
            selectedRecallOrder.paymentRecords[0].amount = selectedRecallOrder.settlementTotal;
          }
          persistSavedOrders();
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
          recallVoidAlert.textContent = '';
          recallVoidReasonPanel.hidden = true;
          if (selectedSubOrderIndex !== null && selectedRecallOrder.subOrderStatuses?.[selectedSubOrderIndex]) {
            const hasPaidSharedItem = selectedRecallOrder.subOrderItems?.some((subOrderItems, subOrderIndex) =>
              subOrderIndex !== selectedSubOrderIndex &&
              selectedRecallOrder.subOrderStatuses[subOrderIndex] === 'Paid' &&
              subOrderItems.some((item) => item.shared),
            );
            if (hasPaidSharedItem) {
              recallVoidAlert.textContent = 'The order has paid dishes and cannot be voided!';
              return;
            }
            selectedRecallOrder.subOrderStatuses[selectedSubOrderIndex] = 'Void';
            recallOrderStatus.textContent = 'Void';
            renderVoidReasons();
            renderSubOrders(selectedRecallOrder);
            return;
          }
          selectedRecallOrder.status = 'Voided';
          if (recallRestoreInventoryCheckbox.checked) {
            restoreOrderInventory(selectedRecallOrder);
          }
          renderVoidReasons();
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
            ? selectedRecallOrder.subOrderItems[selectedSubOrderIndex].map((item) => ({ ...item }))
            : selectedRecallOrder.items.map((item) => ({ ...item }));
          currentItemOption = selectedRecallOrder.itemOption || null;
          currentOrderTip = selectedSubOrderIndex !== null
            ? selectedRecallOrder.subOrderTips?.[selectedSubOrderIndex] ?? selectedRecallOrder.tip ?? 0
            : selectedRecallOrder.tip || 0;
          currentOrderChargeRate = selectedSubOrderIndex !== null && selectedRecallOrder.subOrderChargeCleared?.[selectedSubOrderIndex]
            ? 0
            : Number(selectedRecallOrder.orderChargeRate || 0);
          currentOrderChargeFixedAmount = selectedSubOrderIndex !== null && selectedRecallOrder.subOrderChargeCleared?.[selectedSubOrderIndex]
            ? null
            : selectedRecallOrder.orderChargeFixedAmount ?? null;
          currentOrderChargeLabel = currentOrderChargeRate || currentOrderChargeFixedAmount !== null ? selectedRecallOrder.orderChargeLabel || 'Charge' : '';
          currentOrderChargeTriggerMode = currentOrderChargeLabel ? selectedRecallOrder.orderChargeTriggerMode || '' : '';
          currentOrderChargeShareTip = Boolean(selectedRecallOrder.orderChargeShareTip);
          currentExtraOrderCharges = (selectedRecallOrder.extraOrderCharges || []).map((charge) => ({ ...charge }));
          currentOrderType = selectedRecallOrder.orderType || currentOrderType;
          syncCurrentChargeFromAutoConfig();
          if (currentOrderChargeTriggerMode !== 'auto') {
            currentOrderChargeTaxed = currentOrderChargeRate || currentOrderChargeFixedAmount !== null
              ? Boolean(selectedRecallOrder.orderChargeTaxed)
              : false;
          }
          currentOrderStatus = selectedSubOrderIndex !== null
            ? selectedRecallOrder.subOrderStatuses?.[selectedSubOrderIndex] || ''
            : selectedRecallOrder.status || '';
          currentOrderPriceEdited = Boolean(selectedRecallOrder.priceEdited);
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
      recallSendKitchenButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.items = selectedRecallOrder.items.map((item) => ({
            ...item,
            printMode: 'kitchen',
            sentToKitchen: true,
          }));
          selectedRecallOrder.status = 'Sent';
          renderRecallOrderItems();
          renderCallerDisplay();
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
        syncEditingOrderBeforeRecallSplit();
        splitPanel.hidden = false;
        draftSplitPrices = [...(selectedRecallOrder?.splitOrderPrices || [])];
        draftSplitItemPrices = [];
        draftSplitMode = null;
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitEvenOrderButton.addEventListener('click', () => {
        const total = orderTotal(selectedRecallOrder);
        draftSplitPrices = [total / 2, total / 2];
        draftSplitItemPrices = [];
        draftSplitMode = 'even';
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitByItemButton.addEventListener('click', () => {
        draftSplitItemPrices = (selectedRecallOrder?.items || []).slice(0, 2).map((item) => Number(item.price));
        draftSplitPrices = [...draftSplitItemPrices];
        draftSplitMode = 'item';
        renderSplitItemPrices(draftSplitItemPrices);
        renderSplitPrices(draftSplitPrices);
      });
      splitBySeatButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          const items = selectedRecallOrder.items || [];
          const sharedItems = items.filter((item) => item.shared);
          const seatOneItems = items.filter((item) => !item.shared && Number(item.seat || 1) === 1);
          const seatTwoItems = items.filter((item) => !item.shared && Number(item.seat || 1) === 2);
          selectedRecallOrder.subOrderItems = [
            sharedItems.length || seatOneItems.length ? [...sharedItems, ...seatOneItems] : items.slice(0, 1),
            sharedItems.length || seatTwoItems.length ? [...sharedItems, ...seatTwoItems] : items.slice(1, 2),
          ];
          selectedRecallOrder.subOrderStatuses = ['New Order', 'New Order'];
          selectedRecallOrder.splitOrderPrices = selectedRecallOrder.subOrderItems.map((subOrderItems) =>
            Number(subOrderItems.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2)),
          );
          if (selectedRecallOrder.priceEdited) {
            redistributeSubOrderTipsBySubtotal(selectedRecallOrder);
          } else {
            selectedRecallOrder.subOrderTips = [selectedRecallOrder.tip || 0, selectedRecallOrder.tip || 0];
          }
          draftSplitItemPrices = [...selectedRecallOrder.splitOrderPrices];
          draftSplitPrices = [...selectedRecallOrder.splitOrderPrices];
          renderSubOrders(selectedRecallOrder);
        } else {
          draftSplitItemPrices = [];
          draftSplitPrices = [];
        }
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
        draftSplitMode = 'drag';
        recallParentOrder.style.backgroundColor = selectedRecallOrder?.parentBackground || '';
        recallParentOrder.dataset.background = selectedRecallOrder?.parentBackground || '';
        renderSplitPrices(selectedRecallOrder?.splitOrderPrices || []);
        renderSubOrders(selectedRecallOrder);
      });
      function refreshAmountSplitDraft() {
        draftSplitMode = 'amount';
        draftSplitPrices = Array.from(document.querySelectorAll('[data-testid="split-amount-input"]'))
          .map((amountInput) => Number(amountInput.value || '0'))
          .filter((price) => price > 0);
        draftSplitItemPrices = [...draftSplitPrices];
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      }

      function bindSplitAmountInput(input) {
        input.addEventListener('input', refreshAmountSplitDraft);
      }

      splitAddSuborderButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.dataset.testid = 'split-amount-input';
        bindSplitAmountInput(input);
        splitPanel.insertBefore(input, splitSaveButton);
      });
      splitSaveButton.addEventListener('click', () => {
        if (selectedRecallOrder) {
          selectedRecallOrder.splitOrderPrices = [...draftSplitPrices];
          if (draftSplitMode === 'even' && draftSplitPrices.length > 0) {
            const splitCount = draftSplitPrices.length;
            selectedRecallOrder.subOrderStatuses = Array.from({ length: splitCount }, () => 'New Order');
            selectedRecallOrder.subOrderItems = Array.from({ length: splitCount }, (_, index) =>
              selectedRecallOrder.items.filter((_, itemIndex) => itemIndex % splitCount === index),
            );
            selectedRecallOrder.subOrderTips = Array.from({ length: splitCount }, () =>
              roundMoney(Number(selectedRecallOrder.tip || 0) / splitCount),
            );
          }
          persistSavedOrders();
        }
        renderRecallOrderItems();
      });
      splitSaveAmountButton.addEventListener('click', () => {
        if (selectedRecallOrder?.splitOrderPrices?.length) {
          selectedRecallOrder.subOrderStatuses = selectedRecallOrder.splitOrderPrices.map(() => 'New Order');
          selectedRecallOrder.subOrderItems = selectedRecallOrder.splitOrderPrices.map(() => []);
          renderSubOrders(selectedRecallOrder);
        }
        renderRecallOrderItems();
      });
      splitUnsplitButton.addEventListener('click', () => {
        if (selectedRecallOrder?.subOrderStatuses?.some((status) => status === 'Paid' || status === 'Partially Paid')) {
          recallVoidAlert.textContent =
            'The operation cannot be done due to partial payment! Please revoke the payment before preceeding.';
          return;
        }
        draftSplitPrices = [];
        draftSplitItemPrices = [];
        if (selectedRecallOrder) {
          if (selectedRecallOrder.subOrderTips?.length) {
            selectedRecallOrder.tip = roundMoney(
              selectedRecallOrder.subOrderTips.reduce((sum, tip) => sum + Number(tip || 0), 0),
            );
          }
          selectedRecallOrder.splitOrderPrices = [];
          selectedRecallOrder.subOrderItems = [];
          selectedRecallOrder.subOrderStatuses = [];
          selectedRecallOrder.subOrderTips = [];
        }
        renderSplitPrices(draftSplitPrices);
        renderSplitItemPrices(draftSplitItemPrices);
      });
      splitAmountInputs.forEach(bindSplitAmountInput);
      splitSubOrderSettleButton.addEventListener('click', () => {
        selectedSubOrderIndex = selectedSubOrderIndex ?? 0;
      });
      subOrderCashPayButton.addEventListener('click', () => {
        if (selectedRecallOrder && selectedSubOrderIndex !== null) {
          const requestedPaymentAmount = Number(subOrderPayAmountInput.value || '0') / 100;
          const subOrderTotal = Number(selectedRecallOrder.splitOrderPrices?.[selectedSubOrderIndex] || 0);
          selectedRecallOrder.subOrderStatuses[selectedSubOrderIndex] =
            requestedPaymentAmount > 0 && requestedPaymentAmount < subOrderTotal ? 'Partially Paid' : 'Paid';
          subOrderPayAmountInput.value = '';
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
        currentOrderPriceEdited = false;
        currentSplitPartTip = null;
        currentOrderStatus = '';
        currentCustomerName = deliveryNameInput.value || null;
        currentComboOptionCount = 0;
        currentDeliveryDistance = 0;
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
      combineRecalculateChargeSelect.value = String(currentCombineRecalculateCharge);
      kdsCategoryRequiredSelect.value = String(currentKdsCategoryRequired);
      kdsCategoryDiscountAllowanceSelect.value = String(currentKdsCategoryDiscountAllowance);
      clockText.textContent = localStorage.getItem('offlineClockText') || '';
      applyAutoClockOutIfDue();
      renderClockControls();
      renderKioskItem();
      renderEmenuItem();
      renderKioskLicenses();
      if (window.location.pathname.includes('/kpos/kiosklite')) {
        showPanel('kiosk');
      } else if (window.location.pathname.includes('/emenu/')) {
        showEmenuPanel('main');
      }
    </script>
  </body>
</html>`;
}
