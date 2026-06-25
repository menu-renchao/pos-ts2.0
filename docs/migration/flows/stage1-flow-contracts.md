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
| stage1/test_admin_staff.py | TestAdminStaff | whole-order max discount, item max discount, recall discount permission, multi-discount, report permission, create staff with selected authority | tests/stage1/admin-staff.spec.ts | `StaffPermissionFlow.rejectWholeOrderDiscountAboveServerLimitWithoutPassword`, `StaffPermissionFlow.applyWholeOrderDiscountAboveServerLimitWithManagerPassword`, `StaffPermissionFlow.applyWholeOrderDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.applyItemDiscountAboveServerLimitWithManagerPassword`, `StaffPermissionFlow.applyItemDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.rejectRecallWholeOrderAmountDiscountAboveServerLimitWithoutPassword`, `StaffPermissionFlow.cancelRecallWholeOrderAmountDiscountAboveServerLimit`, `StaffPermissionFlow.applyRecallWholeOrderAmountDiscountAboveManagerLimitWithBossPassword`, `StaffPermissionFlow.requirePermissionForItemDiscountAfterBossAuthorizedWholeOrderDiscount`, `StaffPermissionFlow.requirePermissionForMultiItemAmountDiscount`, `StaffPermissionFlow.rejectAnyWholeOrderDiscountWhenServerLimitIsZero`, `StaffPermissionFlow.requirePermissionForSecondItemDiscountAfterWholeOrderAndItemDiscounts`, `StaffPermissionFlow.openAnalysisReportWithBossOverrideWhenStaffLacksPermission`, `StaffPermissionFlow.openTodayStaffReportWhenStaffOnlyHasPersonalReport`, `StaffPermissionFlow.createNewStaffWithOnlyExistingAuthority`, `StaffPermissionFlow.configureStaffPermissions`, `StaffPermissionFlow.applyOrderDiscountWithAuthorization`, `StaffPermissionFlow.applyItemDiscountWithAuthorization`, `StaffPermissionFlow.verifyReportPermission` |

### Preconditions

- Staff accounts and roles are represented by typed permission samples.
- Manager/boss/server password or employee context is explicit in fixture/test data.
- Discount limits and permission sets are configured through Admin or stub staff client.
- `test_whole_order_maximum_discount_without_pwd` uses source-equivalent role limits: Server password `007` has max whole-order discount `20%`, Manager password `006` has `50%`, Boss password `11` has `100%`.
- `test_server_maximum_discount_zero` overrides Server to `0%` through `StubAdminStaffClient`, matching source `AdminStaffAPI.edit_role_max_discount('Server', 0)`.
- `test_multi_whole_order_item_maximum_discount` configures Server/Manager/Boss to `20%`/`50%`/`100%` through `StubAdminStaffClient`, then validates cumulative whole-order plus item discount permission.
- `test_staff_visit_without_analysis_authority` removes `ANALYSIS` from staff `1` through `StubAdminStaffClient`, matching source `AdminStaffAPI.edit_staff_remove_functions('1', [PosPermissionNames.ANALYSIS])`.
- `test_staff_visit_without_view_history_authority` removes `VIEW_HISTORY_ORDERS`, `REPORT`, and `TOTAL_REPORT` from staff `1`, adds `PERSONAL_REPORT`, and validates today's Staff Report date range.
- `test_create_new_staff_with_only_existed_authority` removes `DINE_IN` from staff `1`, adds `ADMIN` and `ADMIN_STAFF`, then validates a newly saved staff cannot receive `DINE_IN`.

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

#### StaffPermissionFlow.rejectAnyWholeOrderDiscountWhenServerLimitIsZero

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_server_maximum_discount_zero` |
| jira | POS-31576 |
| preconditions | `StubAdminStaffClient` sets Server maximum discount to `0%` and Manager maximum discount to `50%`; the offline harness receives those role limits through `PosHomePage.applyOfflineStaffDiscountLimits`; current employee logs in with Server password `007`; source Dine In no-table order is represented by no-tax Open Food `item1`/`item2` priced at `6` and `4` in offline mode. |
| actions | Set role maximum discounts, open POS home, synchronize offline staff discount limits, login as Server, enter Dine In without table, add two Open Food no-tax items, open whole-order discount, submit `0.1%`, and read the permission prompt. |
| page methods | `PosHomePage.open`, `PosHomePage.applyOfflineStaffDiscountLimits`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readDiscountTip` |
| assertions | Permission prompt contains `The discount exceeds permission limit，please input password` because any positive whole-order discount, including `0.1%`, exceeds Server's configured `0%` maximum discount. |
| stub behavior | `StubAdminStaffClient.editRoleMaxDiscount` stores the source-equivalent role configuration; `readRoleMaxDiscounts` returns the configured limits; offline harness maps password `007` to Server and reads its current configurable limit instead of the default `20%`. |
| live gaps | Live AdminStaffAPI role setup/teardown, Dine In no-table entry selector, whole-order discount percent selector, permission dialog behavior, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.requirePermissionForSecondItemDiscountAfterWholeOrderAndItemDiscounts

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_multi_whole_order_item_maximum_discount` |
| jira | POS-31687 |
| preconditions | `StubAdminStaffClient` sets Server/Manager/Boss maximum discounts to `20%`/`50%`/`100%`; the offline harness receives those role limits through `PosHomePage.applyOfflineStaffDiscountLimits`; current employee logs in with Server password `007`; source Dine In no-table order is represented by no-tax Open Food `item1`/`item2` priced at `6` and `4` in offline mode. |
| actions | Set role maximum discounts, open POS home, synchronize offline staff discount limits, login as Server, enter Dine In without table, add two Open Food no-tax items, open discount panel, submit `10%` whole-order discount, submit `10%` item discount on the first order line, then submit fixed amount discount `2` on the second order line. |
| page methods | `PosHomePage.open`, `PosHomePage.applyOfflineStaffDiscountLimits`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.readWholeOrderDiscountSummary`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.readSelectedItemPrice`, `OrderDishesPage.applyItemDiscountPercent`, `OrderDishesPage.applySelectedItemsDiscountAmount`, `OrderDishesPage.readDiscountTip` |
| assertions | Whole-order Discount equals negative `Sub-total * 0.1`; first item original price minus discounted price equals `originalPrice * 0.1`; second item fixed amount discount returns `The discount exceeds permission limit，please input password` because cumulative discount exceeds the Server maximum discount. |
| stub behavior | Offline harness accepts the first two discounts because their cumulative amount stays within Server's role limit, then compares existing whole-order discount plus existing item discounts plus requested fixed amount item discount against the current Server role limit and opens the manager password popup without applying the second item discount. |
| live gaps | Live AdminStaffAPI role setup/teardown, Dine In no-table entry selector, whole-order discount percent selector, selected item percent/fixed amount discount selectors, cumulative permission calculation, and Open Food cents/display conversion must be validated in live smoke. |

#### StaffPermissionFlow.openAnalysisReportWithBossOverrideWhenStaffLacksPermission

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_staff_visit_without_analysis_authority` |
| jira | POS-33796 |
| preconditions | `StubAdminStaffClient` removes `ANALYSIS` from staff id `1`; the offline harness receives staff permission overrides through `PosHomePage.applyOfflineStaffPermissionOverrides`; current employee logs in with password `123`; Boss password `11` retains all permissions. |
| actions | Remove Analysis permission, open POS home, synchronize offline staff permission overrides, login as staff `123`, open Admin, click Analysis, read permission alert, enter Boss password `11`, and read Analysis page visibility. |
| page methods | `PosHomePage.open`, `PosHomePage.applyOfflineStaffPermissionOverrides`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickAdmin`, `AdminPage.clickAnalysisAndReadPermissionAlert`, `AdminPage.submitPermissionPassword`, `AdminPage.isInAnalysisPage` |
| assertions | Permission alert contains `do not have permission ANALYSIS`; after entering Boss password `11`, `AdminPage.isInAnalysisPage` returns true. |
| stub behavior | Offline harness maps password `123` to staff id `1`, checks removed permissions before opening Analysis, shows an Admin permission popup with the source-equivalent alert text, and opens the Analysis page when an authorized password is submitted. |
| live gaps | Live AdminStaffAPI setup/teardown, Admin Analysis navigation selector, permission dialog selector/text, Boss override behavior, and source iframe `id=innerpage` must be validated in live smoke. |

#### StaffPermissionFlow.openTodayStaffReportWhenStaffOnlyHasPersonalReport

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_staff_visit_without_view_history_authority` |
| jira | POS-33771 |
| preconditions | `StubAdminStaffClient` removes `VIEW_HISTORY_ORDERS`, `REPORT`, and `TOTAL_REPORT` from staff id `1`, then adds `PERSONAL_REPORT`; the offline harness receives staff permission overrides through `PosHomePage.applyOfflineStaffPermissionOverrides`; current employee logs in with password `123`. |
| actions | Remove and add staff permissions, open POS home, synchronize offline staff permission overrides, login as staff `123`, open Report, enter report popup password `123`, enter Total Report, open Staff Report, and read the Staff Report start/end time range. |
| page methods | `PosHomePage.open`, `PosHomePage.applyOfflineStaffPermissionOverrides`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickReport`, `ReportPage.inputPasswordInPopup`, `ReportPage.enterTotalReport`, `ReportPage.openStaffReport`, `ReportPage.readStaffReportDateRange` |
| assertions | Staff Report start time contains today's local ISO date; Staff Report end time contains tomorrow's local ISO date, matching the source assertions against `datetime.date.today()` and `today + 1 day`. |
| stub behavior | `StubAdminStaffClient.editStaffRemoveFunctions` and `editStaffAddFunctions` store staff permission overrides for staff `1`; offline harness maps password `123` to staff `1`, allows Report access through `PERSONAL_REPORT` even after `REPORT` and `TOTAL_REPORT` are removed, and renders deterministic Staff Report date range values for the local current day. |
| live gaps | Live AdminStaffAPI setup/teardown, Report password dialog selector, Total Report navigation, Staff Report selector, iframe switching, and real date range selectors must be validated in live smoke. |

#### StaffPermissionFlow.createNewStaffWithOnlyExistingAuthority

| field | contract |
|---|---|
| source | `stage1/test_admin_staff.py::TestAdminStaff::test_create_new_staff_with_only_existed_authority` |
| jira | POS-39749 |
| preconditions | `StubAdminStaffClient` removes `DINE_IN` from staff id `1`, then adds `ADMIN` and `ADMIN_STAFF`; the offline harness receives staff permission overrides through `PosHomePage.applyOfflineStaffPermissionOverrides`; current employee logs in with password `123`; new staff sample uses name `pos39749`, code `397`, and role `Manager`. |
| actions | Configure staff permissions, open POS home, synchronize offline permission overrides, refresh, login as staff `123`, open Admin, enter Staff, click Create Staff, input new staff name/code/role, save, reopen that staff by name, and read the `DINE_IN` authority checkbox. |
| page methods | `PosHomePage.open`, `PosHomePage.applyOfflineStaffPermissionOverrides`, `PosHomePage.refresh`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickAdmin`, `AdminPage.enterStaff`, `AdminPage.clickCreateStaff`, `AdminPage.inputNewStaffInfo`, `AdminPage.clickStaffSave`, `AdminPage.clickStaffName`, `AdminPage.isAuthorityEnabled` |
| assertions | The created staff name is present after save; `AdminPage.isAuthorityEnabled('DINE_IN')` returns false, matching the source `is_selected() is False` assertion for `PosPermissionNames.DINE_IN.value`. |
| stub behavior | Offline harness creates staff records from the current employee's available permissions; because staff `123` lacks `DINE_IN`, saving a Manager staff does not check the `DINE_IN` authority checkbox; `StubAdminStaffClient.deleteStaffByName` records the source cleanup boundary without connecting to live APIs. |
| live gaps | Live AdminStaffAPI setup/teardown, Admin Staff iframe navigation, Create Staff form selectors, role permission intersection behavior, save loading behavior, staff list row selector, and `privileges_DINE_IN` selector must be validated in live smoke. |

### Expected Assertions

- Discount without permission is blocked or limited as in the source case.
- Manager/boss authorization applies the expected discount.
- Multi-discount and combined item/order discount calculations are numeric and source-equivalent.
- Report permission restrictions show or hide the correct analysis/history views.
- Created staff contains only intended permissions.

### Page Responsibilities

- `PosHomePage` owns offline staff discount limit synchronization for stub-mode role setup.
- `PosHomePage` owns offline staff permission synchronization for stub-mode staff permission setup.
- `StaffAdminPage` owns staff and permission controls when live Admin UI selectors are introduced.
- `AdminPage` owns Admin Analysis navigation, permission alert, override password submission, Analysis page visibility, Staff navigation, Staff creation form, Staff save, Staff row selection, and Staff authority checkbox reads.
- `OrderDishesPage` owns discount action entry points and amount reads.
- `RecallPage` owns recalled-order discount checks.
- `ReportPage` owns report password submission, Total Report/Staff Report navigation, and Staff Report date range reads.

### Client/Data Responsibilities

- `StubAdminStaffClient` owns role maximum discount setup for migrated AdminStaffAPI-style role changes.
- `StubAdminStaffClient` owns staff permission add/remove setup and source-equivalent staff cleanup boundaries for migrated AdminStaffAPI-style staff permission changes.
- `StubPosStaffClient` owns staff/permission state when staff creation/report permissions are migrated.
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
| stage1/test_caller.py | TestCaller | test_dine_in_caller_with_name_and_table: Dine In order with guest name and table, call order, verify Preparing display, call off, verify removal | tests/stage1/caller.spec.ts | `CallerFlow.callDineInOrderWithGuestNameAndClear` |
| stage1/test_caller.py | TestCaller | test_dine_in_caller_with_table: Dine In order without guest name, use Recall order-card ID, call order, verify Preparing display, call off, verify removal | tests/stage1/caller.spec.ts | `CallerFlow.callDineInOrderWithoutGuestNameAndClear` |
| stage1/test_caller.py | TestCaller | test_emenu_caller_with_table: Emenu table order, call server from Emenu, verify Caller Preparing display by Recall order-card ID, call off from POS, verify removal | tests/stage1/caller.spec.ts | `CallerFlow.callEmenuOrderWithTableAndClear` |
| stage1/test_caller.py | TestCaller | test_emenu_caller_with_name_and_table: Emenu table order, call server from Emenu, edit guest name in POS Recall, verify Caller Preparing display by order number and guest name, call off from POS, verify removal | tests/stage1/caller.spec.ts | `CallerFlow.callEmenuOrderWithEditedGuestNameAndClear` |
| stage1/test_caller.py | TestCaller | remaining Emenu caller refresh path | tests/stage1/caller.spec.ts | not-started |

### Preconditions

- Employee password `11` can enter POS offline mode.
- `openFoodDish` provides the source-equivalent ordered item for the migrated Dine In path.
- Guest name `CallerGuest42` is used so the source caller shortening rule is deterministic as `Cal...42`.
- For the no-guest Dine In path, the offline Recall order-card ID is deterministic as `Area 1 Table 1 {orderNumber}`.
- For the migrated Emenu path, `posEmenuUrl` opens the offline Emenu surface and the Emenu table order-card ID is deterministic as `Area 1 Table 1 {orderNumber}`.
- For the migrated Emenu guest-name path, POS edits the Emenu order guest name to `EmenuGuest42`, so the caller shortening rule is deterministic as `Eme...42`.
- First-round offline mode reads the saved order number or order-card ID from Recall; source `PosDBFunction.get_last_order_num` remains a live DB validation gap.

### Steps

1. Open POS, enter employee password, and enter Dine In.
2. Add source-equivalent Open Food, optionally input guest name, and save the order.
3. Open Recall recent order and read the generated order number or source-equivalent order-card ID.
4. Call the current order from Recall.
5. Open Caller and read the Preparing display list.
6. Return to Recall, call off the same order, reopen Caller, and read Preparing again.
7. For the Emenu path, open Emenu, select license/table/guest count, place the first new-category item order, close the Emenu order card, click Call Server, switch back to POS, open Recall, read the order-card ID, verify Caller Preparing, call off from POS Recall, and verify Caller Preparing removal.
8. For the Emenu guest-name path, after Emenu Call Server, switch back to POS, open Recall, read the order number, edit the order, input `EmenuGuest42`, send all to kitchen, reopen Recall/Caller, verify Caller Preparing by order number and shortened guest name, then call off from POS Recall and verify removal.

### Expected Assertions

- Before call off, Caller Preparing contains the Recall order number.
- Before call off, Caller Preparing contains the source-equivalent shortened guest name `Cal...42`.
- After call off, Caller Preparing no longer contains the order number.
- After call off, Caller Preparing no longer contains the shortened guest name.
- For the no-guest Dine In path, before call off Caller Preparing contains the Recall order-card ID.
- For the no-guest Dine In path, after call off Caller Preparing no longer contains the Recall order-card ID.
- For the Emenu table path, before POS call off Caller Preparing contains the Recall order-card ID.
- For the Emenu table path, after POS call off Caller Preparing no longer contains the Recall order-card ID.
- For the Emenu guest-name path, before POS call off Caller Preparing contains the Recall order number.
- For the Emenu guest-name path, before POS call off Caller Preparing contains the source-equivalent shortened guest name `Eme...42`.
- For the Emenu guest-name path, after POS call off Caller Preparing no longer contains the Recall order number or shortened guest name.

### Page Responsibilities

- `PosHomePage.open`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickDineIn`, `PosHomePage.clickRecall`, and `PosHomePage.openCaller` own POS entry/navigation.
- `OrderDishesPage.openFoodWithoutTax`, `OrderDishesPage.inputGuestName`, and `OrderDishesPage.saveOrder` own Dine In order creation.
- `RecallPage.openRecentOrder`, `RecallPage.readOrderNumber`, `RecallPage.readOrderCardId`, `RecallPage.callCurrentOrder`, and `RecallPage.callOffCurrentOrder` own Recall order selection and caller actions.
- `RecallPage.clickEdit` owns entry into POS order editing from Recall.
- `OrderDishesPage.inputGuestName` and `OrderDishesPage.sendAllToKitchen` own POS-side guest-name edit and send-all persistence for the Emenu order.
- `CallerPage.waitLoaded` and `CallerPage.readInfoList` own caller display reads.
- `EmenuMainPage.openAndStartOrder` owns Emenu URL entry, license selection, table selection, guest count, and navigation to Emenu order.
- `EmenuMainPage.switchToPosHome` owns the first-round offline switch from Emenu back to POS.
- `EmenuOrderPage.placeFirstCategoryItemOrder`, `EmenuOrderPage.closeOrderCard`, and `EmenuOrderPage.callServer` own Emenu order placement and call-server action.

### Client/Data Responsibilities

- No external client is used in this first migrated row.
- `test-data/pos/dishes.ts::openFoodDish` owns the ordered item sample.
- No external client or test-data module is used by the migrated Emenu caller table row.
- The offline POS harness owns saved order number generation, Emenu order creation, and caller display state.

### Stub Behavior

- Saving the Dine In order stores the guest name on the saved order.
- Saving a Dine In order without guest name stores the source-equivalent order-card ID as `Area 1 Table 1 {orderNumber}`.
- Recall `Call Order` marks the selected order as `preparing` for Caller.
- Caller Preparing renders the order number plus the source-equivalent shortened guest name.
- Caller Preparing renders the order-card ID when the selected Dine In order has no guest name.
- Emenu `Place Order` creates a saved table order and exposes the same latest order to POS Recall.
- Emenu `Call Server` marks that table order as `preparing` for Caller before POS Recall opens it.
- POS Recall edit updates the selected Emenu order guest name, keeps the existing order number, and refreshes Caller Preparing from table/order-card display to order number plus shortened guest name.
- Recall `Call Off` clears the selected order from Caller Preparing.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| db | Source reads latest order number via `PosDBFunction.get_last_order_num`; first-round offline migration reads it from Recall UI | Validate real DB adapter or live-equivalent order number read |
| table | Source Dine In helper selects a real table; offline row only enters Dine In and tracks the caller display outcome | Confirm real table selection selectors and table-bound caller payload |
| new-page | Source switches between POS and caller pages/windows | Define live multi-page fixture and stable Caller URL |
| selector | Recall paging/call-off and Caller Preparing selectors are source-environment selectors | Validate real selectors and text format |
| external-process | Python source uses caller-id execution in related areas | Replace with typed client/page boundary or live fixture |
| cross-surface | Emenu, POS, and Caller display surfaces require environment URLs/selectors | Define environment config and stable selectors |
| emenu | Source Emenu flow selects license, table, customer count, closes order card, clicks Call Server, and switches browser tabs; first-round offline mode uses stable harness selectors and a same-page switch button | Validate real Emenu login/license/table/customer/order-card/call-server selectors plus POS/Emenu tab switching |
| edit-order | Source edits the Emenu order through POS Recall and `OrderPage.edit_guest_name`/`send_all`; first-round offline mode updates the selected saved order directly through the POS order page controls | Validate real Recall edit navigation, guest-name input, send-all persistence, and post-refresh message handling |
| display-area | Python source defaults caller verification to Ready area while current TS offline convention verifies Preparing for called orders | Confirm real Caller Ready/Preparing mapping for Emenu Call Server |

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
