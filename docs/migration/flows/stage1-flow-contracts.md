# Stage1 Flow Contracts

These contracts gate migration for all active source rows under `stage1/*.py`.

## Admin Menu Configuration Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage1/test_admin_menu.py | TestAdminMenu | global options, item language/name, item count, combo mode, weighted combo, batch item properties, tax-free, member price, batch price, multilingual display | tests/stage1/admin-menu.spec.ts | `AdminMenuFlow.copyPosGlobalOptionGroupToEmenuAndReadCount`, `AdminMenuFlow.orderUnitPriceItemAndReadPrice`, `AdminMenuFlow.modifyItemChineseNameAndReadLanguageNames`, `AdminMenuFlow.addPrintersToGlobalOptionAndReadPrinters`, `AdminMenuFlow.readPosMenuItemCountFromPageAndApi`, `AdminMenuFlow.batchEditQuickComboModeAndReadStates`, `AdminMenuFlow.orderWeightedQuickComboAndReadRecallItems`, `AdminMenuFlow.batchReplaceItemPropertiesAndReadDetail`, `AdminMenuFlow.enableTakeOutTaxFreeAndReadOrderTaxAudit`, `AdminMenuFlow.orderBenefitPriceItemAndReadPrices`, `AdminMenuFlow.batchEditRegularAndMemberPriceThenReadOrderPrices`, `AdminMenuFlow.batchReduceBenefitMemberPriceThenReadOrderPrices`, `AdminMenuFlow.configureChineseLanguageAndReadOrderedItemName` |

### Preconditions

- Admin navigation starts from POS home through UI.
- Menu item, combo, option, category, tax, product-line, and member-price samples exist in typed test data.
- JSON payloads from `combo_request.json`, `combo_price_request.json`, `combo_weight.json`, and `quick_combo_request.json` are migrated to typed payload modules.
- Stub menu/tax clients can create and update item state in memory.

### Steps

1. Enter Admin Menu from POS home.
2. Create or locate the required item/option/combo.
3. Apply source-specific edit: language, printer, combo mode, batch property, tax-free, member price, or price update.
4. Save and return to POS order or Admin list when required.
5. Read menu item state from Admin and/or order page.

### Expected Assertions

- Admin item state matches the configured name, language, combo mode, property, tax, member price, or printer state.
- Order page item behavior reflects Admin menu changes.
- Batch operations update only the intended items.
- Repeated source method names are distinguished by `source_line` and Jira key in the matrix.

### Page Responsibilities

- `AdminPage` owns Admin shell navigation.
- `MenuAdminPage` owns item, option, combo, and batch edit controls.
- `OrderDishesPage` owns order-side item display and pricing reads.

### Client/Data Responsibilities

- `StubPosMenuClient` owns menu item and combo state.
- `StubPosTaxClient` owns tax-free and rate state.
- `test-data/payloads/*` owns converted combo payloads.
- `test-data/pos/dishes.ts` owns reusable item/combo samples.

### Stub Behavior

- Stub menu updates persist only for the current test.
- Stub batch edit returns deterministic affected item counts.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Admin Menu grids and edit dialogs require actual DOM selectors | Confirm stable selectors or request `data-testid` |
| API | Menu creation/update response fields must be mapped | Add typed client contract tests |

## Staff Permission And Discount Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage1/test_admin_staff.py | TestAdminStaff | whole-order max discount, item max discount, recall discount permission, multi-discount, report permission, create staff with selected authority | tests/stage1/admin-staff.spec.ts | `StaffPermissionFlow.rejectWholeOrderDiscountAboveServerLimitWithoutPassword`, `StaffPermissionFlow.applyWholeOrderDiscountAboveServerLimitWithManagerPassword`, `StaffPermissionFlow.applyWholeOrderDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.applyItemDiscountAboveServerLimitWithManagerPassword`, `StaffPermissionFlow.applyItemDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword`, `StaffPermissionFlow.cancelRecallWholeOrderAmountDiscountAboveServerLimit`, `StaffPermissionFlow.applyRecallWholeOrderAmountDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.requirePermissionForItemDiscountAfterBossAuthorizedWholeOrderDiscount`, `StaffPermissionFlow.requirePermissionForMultiItemAmountDiscount`, `StaffPermissionFlow.configureStaffPermissions`, `StaffPermissionFlow.applyOrderDiscountWithAuthorization`, `StaffPermissionFlow.applyItemDiscountWithAuthorization`, `StaffPermissionFlow.verifyReportPermission` |

### Preconditions

- Staff accounts and roles are represented by typed permission samples.
- Manager/boss/server password or employee context is explicit in fixture/test data.
- Discount limits and permission sets are configured through Admin or stub staff client.
- `test_whole_order_maximum_discount_without_pwd` uses source-equivalent role limits: Server password `007` has max whole-order discount `20%`, Manager password `006` has `50%`, Boss password `11` has `100%`.

### Steps

1. Configure staff permission or discount limit.
2. Create an order or recall an existing order.
3. Attempt whole-order or item discount with the specified staff context.
4. Enter manager/boss password where the source requires authorization.
5. Read discount application, blocked prompt, or report access state.

### Migrated Behavior Contracts

#### StaffPermissionFlow.rejectWholeOrderDiscountAboveServerLimitWithoutPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_whole_order_maximum_discount_without_pwd` |
| jira | POS-31535 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; source Open Food `item1` is represented by no-tax price `10` in offline mode. |
| actions | Open POS home, login as Server, enter Dine In without table, add Open Food no tax, open whole-order discount, submit `20.01%`, confirm manager password dialog with empty password. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; empty password confirmation then contains `Failed to login`. |
| stub behavior | Offline harness maps password `007` to a `20%` whole-order discount limit, password `006` to `50%`, and password `11` to `100%`; exceeding the limit opens the manager password popup and invalid or empty password returns `Failed to login`. |
| live gaps | Live AdminStaffAPI role setup, real whole-order discount input selectors, manager password dialog selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.applyWholeOrderDiscountAboveServerLimitWithManagerPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_whole_order_maximum_discount_with_manager_pwd` |
| jira | POS-31537 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; source Open Food `item1` is represented by no-tax price `10` in offline mode; Manager password `006` can authorize discounts up to `50%`. |
| actions | Open POS home, login as Server, enter Dine In without table, add Open Food no tax, open whole-order discount, submit `30%`, read permission prompt, enter Manager password `006`, read Sub-total and Discount from the order amount summary. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword`, `OrderDishesPage.readWholeOrderDiscountSummary` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; after Manager authorization, Discount equals negative `Sub-total * 0.3`. |
| stub behavior | Offline harness records the pending whole-order discount when Server exceeds `20%`; password `006` authorizes `30%`, clears the popup, keeps Sub-total unchanged, and renders Discount as an independent negative amount. |
| live gaps | Live AdminStaffAPI role setup, real whole-order discount input selectors, manager password dialog selectors, order price summary Discount/Sub-total selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.applyWholeOrderDiscountAboveManagerLimitWithBossPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_whole_order_maximum_discount_with_boss_pwd` |
| jira | POS-31539 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; Manager password `006` can authorize up to `50%`; Boss password `11` can authorize up to `100%`; source Open Food `item1` is represented by no-tax price `10` in offline mode. |
| actions | Open POS home, login as Server, enter Dine In without table, add Open Food no tax, open whole-order discount, submit `60%`, read permission prompt, enter Manager password `006`, read denied prompt, submit `60%` again, enter Boss password `11`, read Sub-total and Discount from the order amount summary. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword`, `OrderDishesPage.readWholeOrderDiscountSummary` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; Manager password `006` leaves the operation blocked with `No Permission!`; Boss password `11` authorizes the discount and Discount equals negative `Sub-total * 0.6`. |
| stub behavior | Offline harness keeps the pending `60%` whole-order discount blocked for Manager because it exceeds `50%`; a non-empty insufficient password shows `No Permission!`; resubmitting `60%` and entering Boss password `11` clears the popup and renders the independent negative Discount amount. |
| live gaps | Live AdminStaffAPI role setup, real whole-order discount input selectors, manager/boss password dialog behavior, order price summary Discount/Sub-total selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.applyItemDiscountAboveServerLimitWithManagerPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_item_maximum_discount_with_manager_pwd` |
| jira | POS-31542 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; Manager password `006` can authorize item discount amounts within the Manager whole-order limit; source Open Food `item1`/`item2` are represented by no-tax prices `4` and `6` in offline mode. |
| actions | Open POS home, login as Server, enter To Go, add two Open Food no-tax items, select the first order line, read its original price, submit `60%` item discount, read permission prompt, enter Manager password `006`, read the first item discounted price. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickTogo`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.readSelectedItemPrice`, `OrderDishesPage.applyItemDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; after Manager authorization, first item original price minus discounted price equals `originalPrice * 0.6`. |
| stub behavior | Offline harness renders Open Food rows with quantity `1`; item discount authorization compares requested item discount amount against the employee role's whole-order discount amount limit; Server `007` blocks first item `60%`, Manager `006` authorizes it and updates only the selected order line price. |
| live gaps | Live AdminStaffAPI role setup, selected-line item discount selector, manager password dialog behavior, pre/last discount item price selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.applyItemDiscountAboveManagerLimitWithBossPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_item_maximum_discount_with_boss_pwd` |
| jira | POS-31544 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; Manager password `006` can authorize item discount amounts only within the Manager whole-order limit; Boss password `11` can authorize up to `100%`; source Open Food `item1`/`item2` are represented by no-tax prices `6` and `4` in offline mode. |
| actions | Open POS home, login as Server, enter To Go, add two Open Food no-tax items, select the first order line, read its original price, submit `85%` item discount, read permission prompt, enter Manager password `006`, read denied prompt, submit `85%` again, enter Boss password `11`, read the first item discounted price. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickTogo`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.readSelectedItemPrice`, `OrderDishesPage.applyItemDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; Manager password `006` leaves the operation blocked with `No Permission!`; Boss password `11` authorizes the discount and first item original price minus discounted price equals `originalPrice * 0.85`. |
| stub behavior | Offline harness renders Open Food rows with quantity `1`; item discount authorization compares requested item discount amount against the employee role's whole-order discount amount limit; Server `007` blocks first item `85%`, Manager `006` remains blocked because `6 * 0.85` exceeds the `10 * 0.5` manager limit, and Boss `11` updates only the selected order line price. |
| live gaps | Live AdminStaffAPI role setup, selected-line item discount selector, manager/boss password dialog behavior, pre/last discount item price selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_recall_whole_order_maximum_discount_without_pwd` |
| jira | POS-31549 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; source Pickup order is represented by a saved no-tax Open Food `item1` priced at `10`; fixed amount discount `3` exceeds the Server whole-order discount amount limit `10 * 0.2`. |
| actions | Open POS home, login as Server, enter Pickup, add Open Food no tax, save the order, open Recall, select the recent order, open Recall discount, submit fixed amount whole-order discount `3`, read permission prompt, confirm the Recall manager password dialog with an empty password. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickPickup`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.saveOrder`, `PosHomePage.clickRecall`, `RecallPage.openRecentOrder`, `RecallPage.openDiscountAndReadWholeOrderPrice`, `RecallPage.applyWholeOrderDiscountAmount`, `RecallPage.readDiscountTip`, `RecallPage.submitManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; empty password confirmation then contains `Failed to login`. |
| stub behavior | Offline harness saves the Pickup order to in-memory Recall state, renders the recent order subtotal, compares Recall fixed amount discount against the current employee role's whole-order discount amount limit, opens a Recall-owned manager password popup when Server `007` exceeds the limit, and returns `Failed to login` for empty password. |
| live gaps | Live AdminStaffAPI role setup, Pickup customer-info selectors, Recall fixed-amount discount selectors, Recall permission dialog behavior, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.cancelRecallWholeOrderAmountDiscountAboveServerLimit

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_recall_whole_order_maximum_discount_cancel` |
| jira | POS-31552 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; source Pickup order is represented by a saved no-tax Open Food `item1` priced at `10`; fixed amount discount `3` exceeds the Server whole-order discount amount limit `10 * 0.2`. |
| actions | Open POS home, login as Server, enter Pickup, add Open Food no tax, save the order, open Recall, select the recent order, read original order total, open Recall discount, submit fixed amount whole-order discount `3`, read permission prompt, cancel the Recall manager password dialog, read order total again. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickPickup`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.saveOrder`, `PosHomePage.clickRecall`, `RecallPage.openRecentOrder`, `RecallPage.readOrderTotal`, `RecallPage.openDiscountAndReadWholeOrderPrice`, `RecallPage.applyWholeOrderDiscountAmount`, `RecallPage.readDiscountTip`, `RecallPage.cancelManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; after canceling the authorization dialog, Recall order total equals the original total, matching the source pre-discount/last-discount equality check. |
| stub behavior | Offline harness saves the Pickup order to in-memory Recall state, opens a Recall-owned manager password popup for the blocked discount, and the cancel action clears the pending fixed discount without mutating `selectedRecallOrder.wholeOrderDiscountAmount` or order total. |
| live gaps | Live AdminStaffAPI role setup, Pickup customer-info selectors, Recall fixed-amount discount selectors, Recall permission dialog cancel behavior, pre/last discount price selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.applyRecallWholeOrderAmountDiscountAboveManagerLimitWithBossPassword

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_recall_whole_order_maximum_discount_with_boss_pwd` |
| jira | POS-31553 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; Manager password `006` can authorize up to `50%`; Boss password `11` can authorize up to `100%`; source Pickup order is represented by a saved no-tax Open Food `item1` priced at `10`; fixed amount discount uses `originalTotal * 0.6`, matching source fixed amount `6`. |
| actions | Open POS home, login as Server, enter Pickup, add Open Food no tax, save the order, open Recall, select the recent order, read original order total, open Recall discount, submit fixed amount whole-order discount `originalTotal * 0.6`, read permission prompt, enter Manager password `006`, read denied prompt, submit the same fixed amount again, enter Boss password `11`, read final order total. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickPickup`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.saveOrder`, `PosHomePage.clickRecall`, `RecallPage.openRecentOrder`, `RecallPage.readOrderTotal`, `RecallPage.openDiscountAndReadWholeOrderPrice`, `RecallPage.applyWholeOrderDiscountAmount`, `RecallPage.readDiscountTip`, `RecallPage.submitManagerPassword` |
| assertions | First prompt contains `The discount exceeds permission limit，please input password`; Manager password `006` leaves the operation blocked with `No Permission!`; Boss password `11` authorizes the discount and original total minus final total equals `originalTotal * 0.6`, matching the source `last_price == pre_price - 6` assertion. |
| stub behavior | Offline harness saves the Pickup order to in-memory Recall state, compares the fixed discount amount against the current employee role's whole-order discount amount limit, leaves `6` blocked for Manager because it exceeds `10 * 0.5`, shows `No Permission!`, then applies the same pending fixed discount when Boss password `11` is submitted. |
| live gaps | Live AdminStaffAPI role setup, Pickup customer-info selectors, Recall fixed-amount discount selectors, Recall manager/boss permission dialog behavior, pre/last discount price selectors, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.requirePermissionForItemDiscountAfterBossAuthorizedWholeOrderDiscount

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_multi_maximum_discount` |
| jira | POS-31563 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; Boss password `11` can authorize the first `30%` whole-order discount; source To Go Open Food `item1`/`item2` are represented by no-tax prices `6` and `4` in offline mode. |
| actions | Open POS home, login as Server, enter To Go, add two Open Food no-tax items, open whole-order discount, submit `30%`, read permission prompt, enter Boss password `11`, select the first order line, submit `10%` item discount, read the second permission prompt. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickTogo`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readDiscountTip`, `OrderDishesPage.submitManagerPassword`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.applyItemDiscountPercent` |
| assertions | First whole-order discount attempt contains `The discount exceeds permission limit，please input password`; after Boss authorizes the `30%` whole-order discount, the first item `10%` discount attempt also contains `The discount exceeds permission limit，please input password` because cumulative discount amount `3 + 0.6` exceeds the Server limit `10 * 0.2`. |
| stub behavior | Offline harness keeps role limits deterministic, records the authorized whole-order discount rate, and item discount authorization compares existing whole-order discount amount plus existing item discounts plus the requested item discount against the current employee role's maximum discount amount. |
| live gaps | Live AdminStaffAPI role setup, whole-order discount percent selector, selected-line item discount selector, manager/boss permission dialog behavior, cumulative discount permission calculation, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.requirePermissionForMultiItemAmountDiscount

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_multi_item_maximum_discount` |
| jira | POS-31569 |
| preconditions | Server/Manager/Boss discount limits are represented by `staffDiscountRoleSamples`; current employee logs in with Server password `007`; source Dine In no-table order is represented by two no-tax Open Food items `item1`/`item2` priced at `6` and `4` in offline mode. |
| actions | Open POS home, login as Server, enter Dine In without table, add two Open Food no-tax items, open discount panel, select order lines 1 and 2, submit fixed amount item discount `3`, read permission prompt. |
| page methods | `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.selectOrderLineItems`, `OrderDishesPage.applySelectedItemsDiscountAmount`, `OrderDishesPage.readDiscountTip` |
| assertions | Permission prompt contains `The discount exceeds permission limit，please input password` because fixed item discount amount `3` across selected items exceeds Server's maximum discount amount `10 * 0.2 = 2`. |
| stub behavior | Offline harness supports multi-select order rows through modified-click selection, accepts fixed amount item discount input, compares fixed amount plus existing order/item discounts against the current employee role limit, and opens the manager password popup without applying the discount when the Server limit is exceeded. |
| live gaps | Live AdminStaffAPI role setup, Dine In no-table entry selector, multi-select item discount selector, fixed-amount item discount selector, permission dialog behavior, and Open Food cents/display conversion must be validated in live smoke. |

### Expected Assertions

- Discount without permission is blocked or limited as in the source case.
- Manager/boss authorization applies the expected discount.
- Multi-discount and combined item/order discount calculations are numeric and source-equivalent.
- Report permission restrictions show or hide the correct analysis/history views.
- Created staff contains only intended permissions.

### Page Responsibilities

- `StaffAdminPage` owns staff and permission controls.
- `OrderDishesPage` owns discount action entry points and amount reads.
- `RecallPage` owns recalled-order discount checks.
- `ReportPage` owns report availability reads when introduced.

### Client/Data Responsibilities

- `StubPosStaffClient` owns staff/permission state.
- `test-data/pos/permissions.ts` owns roles and authority samples.
- `test-data/pos/payments.ts` owns discount and expected total samples.

### Stub Behavior

- Stub permission checks are deterministic and tied to explicit employee context.
- Stub mode does not share permission state across tests.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| permission | Live staff permission setup needs API or Admin UI contract | Add setup/teardown through typed staff client |
| selector | Authorization dialogs need stable DOM selectors | Confirm or request `data-testid` |

## Attendance, Shift, And Cash Drawer Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage1/test_checkin_checkout.py | TestCheckInCheckOut | check-in/out attendance, edit attendance, earliest check-in time, auto checkout | tests/stage1/checkin-checkout.spec.ts | `AttendanceFlow.checkIn`, `AttendanceFlow.checkOut`, `AttendanceFlow.editAttendance`, `AttendanceFlow.verifyScheduledAttendanceRule` |
| stage1/test_cashin_cashout.py | TestCashInCashOut | cash in and cash out Chinese-mode cases | tests/stage1/cashin-cashout.spec.ts | `CashDrawerFlow.cashIn`, `CashDrawerFlow.cashOut` |

### Preconditions

- Staff shift plan and attendance samples are typed.
- Store time and schedule assumptions are explicit, not hidden in sleeps.
- Cash drawer reason, amount, and note samples are typed.

### Steps

1. Configure attendance or cash drawer preconditions.
2. Enter POS employee context.
3. Perform check-in/check-out or cash-in/cash-out action.
4. Edit attendance when required.
5. Read attendance, shift, drawer, or report state.

### Expected Assertions

- Attendance status and edited attendance values match source expectations.
- Earliest check-in and auto-checkout scenarios use deterministic time setup or are marked `live-gap`.
- Cash-in/cash-out amounts, reasons, and visible records match source expectations.

### Page Responsibilities

- `CashInOutPage` owns cash drawer controls and record reads.
- `AdminPage` or future attendance pages own shift/attendance setting controls.
- `ReportPage` owns attendance/cash report reads when introduced.

### Client/Data Responsibilities

- `StubStaffShiftPlanClient` owns shift and attendance schedule state.
- `test-data/pos/reports.ts` owns report date/time samples.
- `test-data/pos/payments.ts` owns cash amount samples.

### Stub Behavior

- Stub attendance stores records by employee and test-local date.
- Stub cash drawer stores deterministic cash-in/cash-out records.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| time | Time-based auto-checkout requires controllable clock or environment setup | Add time control strategy or mark scoped live gap |
| selector | Attendance and cash drawer controls need DOM confirmation | Confirm stable selectors |

## Caller And Cross-Surface Calling Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage1/test_caller.py | TestCaller | dine-in caller with name/table, emenu caller with table/name, POS name update and refresh | tests/stage1/caller.spec.ts | `CallerFlow.createCallableOrder`, `CallerFlow.verifyCallingDisplay`, `CallerFlow.refreshCallingInfo` |

### Preconditions

- Table, guest name, order number, and caller display samples are typed.
- Dine-in and Emenu order creation paths are explicit.
- Caller display refresh must be represented by a page or client boundary, not shell-only side effects.

### Steps

1. Create a dine-in or Emenu order with table/name data.
2. Send or mark order ready according to source behavior.
3. Open or refresh caller display.
4. Modify name/table data when required.
5. Read caller display state.

### Expected Assertions

- Caller display shows expected table area, table number, guest name, and order number.
- Refresh reflects updated POS order information.
- Dine-in and Emenu paths produce the same source-equivalent caller format where required.

### Page Responsibilities

- `CallerPage` owns caller display and refresh controls.
- `TablePage` owns table selection reads.
- `EmenuOrderPage` owns Emenu order submission when introduced.
- `OrderDishesPage` owns POS name/table modifications.

### Client/Data Responsibilities

- `StubPosOrderClient` owns order status and caller payload.
- `test-data/pos/reports.ts` or dedicated caller data owns table/name/order samples.

### Stub Behavior

- Stub caller display reads from current test order state.
- Stub mode does not execute external caller-id binaries.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| external-process | Python source uses caller-id execution in related areas | Replace with typed client/page boundary or live fixture |
| cross-surface | Emenu and caller display surfaces require environment URLs/selectors | Define environment config and stable selectors |

## Expiration Manager Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage1/test_expiration.py | TestExpiration | no-permission, rule display, open rules, valid/expired records, same-day/next-day expiration, multilingual labels, use-up, reminders, batch open/loss, staged rules | tests/stage1/expiration.spec.ts | `ExpirationFlow.openExpirationManager`, `ExpirationFlow.printExpirationLabel`, `ExpirationFlow.useUpMaterial`, `ExpirationFlow.verifyExpirationReminder`, `ExpirationFlow.batchOpenMaterials` |

### Preconditions

- Source class is currently pytest-skipped; matrix rows remain `live-gap` until a product owner confirms migration intent.
- Expiration rules, material records, staged storage rules, and reminder samples are typed.
- Restaurant business date and close time are provided by typed restaurant client.
- Printer behavior is represented as a print job record in stub mode.

### Steps

1. Configure or load expiration rules through client adapters.
2. Enter Expiration Manager through Admin/Inventory UI.
3. Open, print, use up, batch open, batch loss, or validate rule display.
4. Read rule card, record status, warning/reminder message, and printed label data.
5. Validate time calculation against restaurant close-time rules.

### Expected Assertions

- Enabled/disabled rule visibility matches source expectations.
- Expiration date/time calculation matches same-day, next-day, and staged-rule cases.
- Valid/expired record behavior blocks or permits actions correctly.
- Reminder counts and suppression after use-up match source behavior.
- Batch operations enforce limits and partial failure/success messaging.

### Page Responsibilities

- `ExpirationPage` owns expiration rule cards, record dialogs, batch controls, and message reads.
- `AdminPage` owns navigation to inventory/expiration.

### Client/Data Responsibilities

- `StubExpirationManagerClient` owns rules, material records, and reminder state.
- `StubRestaurantClient` owns business date and close time.
- `test-data/pos/admin-settings.ts` or dedicated expiration data owns rule samples.

### Stub Behavior

- Stub expiration date calculations are deterministic.
- Stub printed labels are stored as structured records, not physical output.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| source-skip | Entire source class is skipped for current product version | Confirm whether to migrate, keep skipped, or replace with updated source |
| time | Expiration timing depends on store business date and clock | Add controllable clock/business-date contract |
| printer | Label printing cannot be verified offline | Add print job adapter or live printer fixture |
