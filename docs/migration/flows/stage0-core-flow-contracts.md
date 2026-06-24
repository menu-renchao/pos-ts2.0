# Stage0 Core Flow Contracts

These contracts gate the first business migration slice: `stage0/test_main_page.py`, `stage0/test_order_page.py`, `stage0/test_order_settle.py`, and `stage0/test_inventory.py`.

## PosEntryFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_input_wrong_password` wrong employee password rejection | tests/stage0/main-page.spec.ts | `PosEntryFlow.rejectWrongPassword`; `PosEntryFlow.enterWithEmployeePassword` |
| stage0/test_main_page.py | all `Test*` classes | POS home entry and employee password cases | tests/stage0/main-page.spec.ts | `PosEntryFlow.enterWithEmployeePassword` |
| stage0/test_order_page.py | all `Test*` classes | cases that start from POS home before ordering | tests/stage0/order-page.spec.ts | `PosEntryFlow.enterWithEmployeePassword` |
| stage0/test_order_settle.py | all `Test*` classes | cases that start from POS home before settlement | tests/stage0/order-settle.spec.ts | `PosEntryFlow.enterWithEmployeePassword` |
| stage0/test_inventory.py | all `Test*` classes | cases that enter Admin/Inventory from POS home | tests/stage0/inventory.spec.ts | `PosEntryFlow.enterWithEmployeePassword` |

### Preconditions

- Browser starts from configured POS home URL only.
- No POS inner page is opened by direct URL, hash, or deep link.
- Employee password is supplied by fixture or test data.
- Stub mode does not authenticate against live POS services.

### Steps

1. Open the configured POS home URL.
2. Enter employee password when the page requires employee context.
3. For rejection paths, read the login failure message and password input value before continuing.
4. Wait for a stable POS home availability signal.
5. Return control to the caller with POS home actions available.

### Expected Assertions

- POS home availability is visible.
- Target entry buttons required by the scenario are actionable.
- Wrong employee password shows `Failed to login` and clears the password field.
- No direct POS inner-page URL is used.

### Page Responsibilities

- `PosHomePage` owns home locators, password input, submit action, and single-page navigation button clicks.
- `PosHomePage` exposes page reads or locators used for final settled assertions.

### Client/Data Responsibilities

- Employee password comes from fixture or typed test data.
- No DB/API client is required for first-round stub entry.

### Stub Behavior

- Stub mode assumes employee password acceptance after UI interaction.
- Authentication result is represented by visible home controls, not by a backend token.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real POS home password and button selectors must be confirmed against the live DOM | Replace provisional locators with stable `data-testid` or documented semantic locators |

## HomeFunctionLayoutFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_move_admin_to_main` saved Admin/Drawer swap | tests/stage0/main-page.spec.ts | `HomeFunctionLayoutFlow.moveFunctionToMainAndSave` |
| stage0/test_main_page.py | TestMainPage | `test_move_dinein_and_togo` Dine In and To Go swap with restore | tests/stage0/main-page.spec.ts | `HomeFunctionLayoutFlow.swapDineInAndTogo` |
| stage0/test_main_page.py | TestMainPage | `test_move_admin_to_main_no_save` unsaved Admin/Drawer swap | tests/stage0/main-page.spec.ts | `HomeFunctionLayoutFlow.previewMoveFunctionWithoutSaving` |
| stage0/test_main_page.py | TestMainPage | `test_move_session_to_main` protected Session cannot move to main | tests/stage0/main-page.spec.ts | `HomeFunctionLayoutFlow.rejectMoveSessionToMain` |
| stage0/test_main_page.py | TestMainPage | `test_move_session_to_more` protected Session cannot move to more | tests/stage0/main-page.spec.ts | `HomeFunctionLayoutFlow.rejectMoveSessionToMore` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Editable home function cards and hidden function cards are available through UI locators.
- Function names come from `test-data/pos/home-functions.ts`.
- Stub mode represents saved layout in the browser page state only; it does not persist layout across tests.

### Steps

1. Enter home function edit mode from the POS home page.
2. Select source-equivalent function cards in the same order used by the Python helper calls.
3. Save or cancel according to the source case.
4. For Session protected moves, click the target movement control and read the visible toast.
5. Restore changed layout after cases that intentionally modify a saved position.

### Expected Assertions

- Saved Admin/Drawer swap shows Admin on the home page and removes Drawer from the home page.
- Saved Dine In/To Go swap changes the first home function to To Go, then restore changes it back to Dine In.
- Unsaved Admin/Drawer swap leaves Admin hidden and Drawer visible on the home page.
- Session movement attempts show `Can't move this button to/from hide area`.

### Page Responsibilities

- `PosHomePage` owns edit mode entry, save/cancel actions, card selection, movement controls, home-card reads, and toast reads.
- `PosHomePage` does not mutate test state directly; it only drives page interactions and reads rendered state.

### Client/Data Responsibilities

- `test-data/pos/home-functions.ts` owns canonical function names and the protected Session movement error text.
- No DB/API client is required for the first-round offline layout-edit behavior.

### Stub Behavior

- Stub home page keeps a committed layout and a draft layout to preserve the source distinction between save and no-save behavior.
- Protected Session moves always return the source toast text and do not change draft or committed layout.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real edit-mode controls and card selectors must be confirmed against live DOM | Replace stub `data-testid` selectors with stable live selectors or request instrumentation |
| persistence | Live layout persistence may be tenant/user scoped | Add live setup/teardown or API reset for layout state before smoke execution |

## LanguagePreferenceFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_chinese_language` manual Chinese language persists after refresh | tests/stage0/main-page.spec.ts | `LanguagePreferenceFlow.switchChineseAndReadWelcome` |
| stage0/test_main_page.py | TestMainPage | `test_user_default_chinese_language` user default Chinese opens To Go in Chinese without password save | tests/stage0/main-page.spec.ts | `LanguagePreferenceFlow.enterTogoWithDefaultLanguage` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Language names come from `test-data/pos/languages.ts`.
- Employee password comes from `test-data/pos/permissions.ts`.
- Stub mode stores current language and user default language in browser-local state for the current test context.

### Steps

1. For manual language switching, open POS home, switch to Chinese, refresh, read welcome text, and restore Default.
2. For user default language, open Admin from POS home and save Chinese as the user default language.
3. Return to POS home, log out, enter employee password without clicking Save, then enter To Go.
4. Read the rendered Open Food category text from the order page.

### Expected Assertions

- Manual Chinese mode still renders welcome text containing `欢迎您` after refresh.
- User default Chinese mode renders To Go order page category text as `自定义菜` after removing the source `auto_fix` suffix.

### Page Responsibilities

- `PosHomePage` owns language switching, refresh, welcome text reads, Admin entry, logout, password entry, and To Go entry.
- `AdminPage` owns user default language selection and save.
- `OrderDishesPage` owns order page category reads.

### Client/Data Responsibilities

- `test-data/pos/languages.ts` owns canonical language option names.
- `test-data/pos/permissions.ts` owns the employee password used for the no-save entry path.
- No DB/API client is required for first-round offline language behavior; the original DB cleanup is represented as test-context-local stub state.

### Stub Behavior

- Stub current language persists across page refresh through browser storage.
- Stub user default language affects To Go rendering even when the employee password is typed but not saved.
- Stub state is isolated by Playwright test context and does not persist across tests.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real language switch, user default language, and order category selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |
| cleanup | Live user default language writes DB-backed config | Add API/DB cleanup contract before live smoke |

## StaffClockFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_clock_in_break` clock in, break, back to work, checkout, and login again | tests/stage0/main-page.spec.ts | `StaffClockFlow.clockInBreakBackToWorkAndCheckout` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Employee is logged out before using the check in/out entry.
- Employee password comes from `test-data/pos/permissions.ts`.
- Stub mode uses browser page state for current clock status.

### Steps

1. Log out from POS home.
2. Open Check In/Out to clock in and read the status text.
3. Open Check In/Out again, click Break, and read the break status text.
4. Open Check In/Out, click Back To Work.
5. Open Check In/Out, click Checkout, then enter the employee password to return to normal POS access.

### Expected Assertions

- Clock-in status includes `Clocked In`, `at`, and a POS-style time.
- Break status includes `On Break`, `from`, and a POS-style time.
- Checkout path allows employee password entry after the clock workflow.

### Page Responsibilities

- `PosHomePage` owns check in/out entry, break/back/checkout actions, clock text reads, logout, and password entry.

### Client/Data Responsibilities

- `test-data/pos/permissions.ts` owns the valid employee password.
- No DB/API client is required for first-round offline staff clock behavior.

### Stub Behavior

- Stub clock state transitions through `off`, `clocked-in`, and `on-break`.
- Stub clock text uses the browser local time format `h:mmAM/PM`.
- Stub checkout returns the state to `off` and leaves password re-entry to the normal login flow.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real check in/out modal controls and status selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |
| time | Live POS may use terminal timezone or display localization | Verify time source and format during live smoke |

## ReservationFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_reserve_and_arrive` create reservation and mark Arrived | tests/stage0/main-page.spec.ts | `ReservationFlow.createReservationAndMarkArrived` |
| stage0/test_main_page.py | TestMainPage | `test_reserve_and_seated` create reservation and mark Seated | tests/stage0/main-page.spec.ts | `ReservationFlow.createReservationAndMarkSeated` |
| stage0/test_main_page.py | TestMainPage | `test_search_reserve_by_phone` search reservation history by phone | tests/stage0/main-page.spec.ts | `ReservationFlow.searchReservationHistoryByPhone` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Reservation is entered through the home page Reservation button.
- Reservation status names come from `test-data/pos/reservations.ts`.
- Generated party names and phone numbers are unique enough for the current test context.

### Steps

1. Open Reservation from POS home.
2. Add a reservation with generated party name and optional phone.
3. For status scenarios, update the reservation status and read current status.
4. For Seated, switch to the inactive tab before reading the status.
5. For history search, open history, search by phone, and read all visible history rows.

### Expected Assertions

- Arrived scenario reads status `Arrived`.
- Seated scenario reads status `Seated` from the inactive list.
- Phone-history scenario returns at least one row and every visible row contains the searched phone.

### Page Responsibilities

- `PosHomePage` owns Reservation entry from the home page.
- `ReservationPage` owns reservation creation, status updates, active/inactive/history navigation, search, and row reads.

### Client/Data Responsibilities

- `test-data/pos/reservations.ts` owns canonical reservation status values.
- No DB/API client is required for first-round offline reservation behavior; cleanup from the Python case is represented by isolated stub state.

### Stub Behavior

- Stub reservations are stored in page-local memory for the current test.
- Status updates mutate the matching reservation by party name.
- History search filters stored reservations by phone substring.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real reservation form, status edit, inactive tab, and history selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |
| cleanup | Live seated reservations may create order records requiring cleanup | Add API/DB cleanup contract before live smoke |

## ReportingFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_input_report_passwd_with_keyboard` enter report with external keyboard password | tests/stage0/main-page.spec.ts | `ReportingFlow.enterReportWithKeyboardPassword` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Report is entered through the home Report button, not by direct URL.
- Employee password comes from `test-data/pos/permissions.ts`.

### Steps

1. Open POS home.
2. Click Report to open the password popup.
3. Fill the employee password and submit it after input settles.
4. Read whether the report page is visible.

### Expected Assertions

- Report page visibility is `true` after the password popup is submitted.

### Page Responsibilities

- `PosHomePage` owns Report button entry and report password popup visibility check.
- `ReportPage` owns password popup input/submit and report page visibility read.

### Client/Data Responsibilities

- `test-data/pos/permissions.ts` owns the employee password.
- No DB/API client is required for first-round offline report entry behavior.

### Stub Behavior

- Stub report entry shows a password panel first.
- Stub report page becomes visible only after the valid employee password is submitted.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real report button, password popup, and report landing selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |

## SupportInfoFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_check_patch_info` support page version and patch info | tests/stage0/main-page.spec.ts | `SupportInfoFlow.readPatchInfo` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Support information is entered through the home Support button.
- Expected version and patch version values come from `test-data/pos/support-info.ts`.

### Steps

1. Open POS home.
2. Click Support.
3. Read version and patch version from the support panel.

### Expected Assertions

- Support version matches the expected offline app version.
- Patch version matches the expected patch metadata.

### Page Responsibilities

- `PosHomePage` owns Support button entry.
- `SupportPage` owns support panel visibility and version/patch-version reads.

### Client/Data Responsibilities

- `test-data/pos/support-info.ts` owns expected patch metadata for first-round offline behavior.
- No DB/API/filesystem client is required in first-round offline mode; the source local patch file setup is represented by deterministic support metadata.

### Stub Behavior

- Stub support panel renders deterministic version and patch version values.
- Stub mode does not read or write the Windows application install directory.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| filesystem | Source Python case creates a local fastversion patch file under the POS install directory | Add live setup/cleanup contract for the Windows install path before live smoke |
| selector | Real support panel version and patch selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |

## DeliveryFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_delivery_delete_phone_reselect` Delivery phone/name deletion toggles history order and customer list | tests/stage0/main-page.spec.ts | `DeliveryFlow.verifyPhoneAndNameDeletionReselectsCustomerList` |
| stage0/test_main_page.py | TestMainPage | `test_delivery_order_asso_with_address` Delivery address keyword finds historical order | tests/stage0/main-page.spec.ts | `DeliveryFlow.searchHistoricalOrderByAddress` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Delivery is entered through the home Delivery button.
- Delivery customer and address samples come from `test-data/pos/delivery.ts`.
- Stub mode stores historical order and customer list state in the current page.

### Steps

1. For phone/name reselection, enter Delivery, fill phone and name, choose a history customer, and read order-list state.
2. Delete the last phone digit and read order-list/customer-list state.
3. Re-select the history customer and read order-list state again.
4. Delete the name suffix and read order-list/customer-list state again.
5. For address association, seed a historical Delivery order address, search by the source keyword, and read order count and order info.

### Expected Assertions

- Selecting a history customer shows the historical order list.
- Deleting phone hides the order list and shows the customer list.
- Re-selecting the history customer restores the order list.
- Deleting name hides the order list and shows the customer list.
- Address keyword search returns at least one historical order and the order info contains the full address.

### Page Responsibilities

- `PosHomePage` owns Delivery entry.
- `DeliveryPage` owns Delivery customer input, history customer selection, phone/name deletion, address search, list state reads, and historical order info reads.

### Client/Data Responsibilities

- `test-data/pos/delivery.ts` owns canonical Delivery phone, name, and address samples.
- No DB/API client is required for first-round offline Delivery behavior; the source order setup is represented by deterministic stub state.

### Stub Behavior

- Stub Delivery history selection toggles visible state between order list and customer list.
- Stub address seeding remembers one historical order address for the current test page.
- Stub address search returns the historical order when the stored address contains the typed keyword.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Real Delivery phone/name/address, history customer, order-list, and customer-list selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |
| data | Live historical Delivery order setup may require API/DB setup | Add setup/cleanup contract for historical Delivery orders before live smoke |

## SdiMessageFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_main_page.py | TestMainPage | `test_sdi_order_message` SDI order triggers POS home message center notification | tests/stage0/main-page.spec.ts | `SdiMessageFlow.createSelfDineInOrderAndReadMessage` |

### Preconditions

- POS home is opened through `PosHomePage.open`.
- Message center is entered through the home message center button.
- Message sample data comes from `test-data/pos/messages.ts`.
- First-round offline mode does not open a real SDI browser, submit a real order, or query the live DB.

### Steps

1. Open POS home.
2. Open the message center.
3. Switch message type to `Self-dine-in`.
4. Clear existing messages.
5. Generate an offline SDI order message using the source-equivalent table name and order number.
6. Open the new-order message by title and read the current message body.

### Expected Assertions

- Message body contains `There's a new order for table`.
- Message body contains the expected table name.
- Message body contains the expected order number.

### Page Responsibilities

- `PosHomePage` owns message center entry.
- `MessageCenterPage` owns message type selection, clear-all action, offline message event insertion, opening a message, and reading message body.

### Client/Data Responsibilities

- `test-data/pos/messages.ts` owns message type, title, table name, and order number samples.
- No DB/API/client is required in first-round offline mode; the source SDI browser action and DB reads are represented by a deterministic message event.

### Stub Behavior

- Stub message center stores messages in browser page memory for the current test.
- Stub SDI order event creates a message title and body matching the source assertions.
- Stub clear-all removes all existing messages before the event is inserted.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| external-system | Source behavior creates a real SDI order through a second browser context | Add live SDI page flow and environment data before live smoke |
| db | Source behavior reads latest order number and table name from DB | Add API/DB adapter setup or deterministic live order lookup before live smoke |
| selector | Real message center selectors must be confirmed against live DOM | Replace stub selectors with stable live selectors or request instrumentation |

## OrderEntryFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_order_page.py | TestOrderPage | `test_order_switch_group` switch menu group, save order, verify Recall item | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createTogoOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_group_chinese` Chinese menu groups visible on order page | tests/stage0/order-page.spec.ts | `OrderEntryFlow.readChineseMenuGroups` |
| stage0/test_order_page.py | TestOrderPage | `test_order_switch_category` switch menu category, save order, verify Recall item | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createTogoOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_edit_item_tax` send kitchen, edit order, add item, and verify tax | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addItemAfterSendKitchenAndReadTaxes` |
| stage0/test_order_page.py | TestOrderPage | `test_order_edit_customer_info` require customer name and phone before payment | tests/stage0/order-page.spec.ts | `OrderEntryFlow.requireCustomerInfoBeforePayment` |
| stage0/test_order_page.py | TestOrderPage | `test_no_permission_void_item` manager password permits void item | tests/stage0/order-page.spec.ts | `OrderEntryFlow.voidItemWithManagerPassword` |
| stage0/test_order_page.py | TestOrderPage | `test_edit_price_support_discount` item edit price supports discount | tests/stage0/order-page.spec.ts | `OrderEntryFlow.applyItemDiscountAndReadPrice` |
| stage0/test_order_page.py | TestOrderPage | `test_add_note_by_modify` Modify note persists to recalled item option | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addModifyNoteAndReadRecallOption` |
| stage0/test_order_page.py | TestOrderPage | `test_split_tip_combine_check` add tip, split evenly, recall suborder, combine split order | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitTipEvenlyAndCombine` |
| stage0/test_order_page.py | TestOrderPage | `test_open_food_no_tax` Open Food without tax can be paid by cash and recalled as Paid | tests/stage0/order-page.spec.ts | `OrderEntryFlow.payOpenFoodWithoutTax` |
| stage0/test_order_page.py | TestOrderPage | `test_pick_up_order_no_repeat_name` two no-name Pickup orders keep guest-name edits isolated | tests/stage0/order-page.spec.ts | `OrderEntryFlow.editPreviousPickupGuestNameWithoutAffectingLatest` |
| stage0/test_order_page.py | TestOrderPage | `test_order_category_option` category-level option selection saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_category_chinese` Chinese category item saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_category_sub_option` category-level option with sub-option saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_category_no_sub_option` category-level option without sub-option saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_item_no_sub_option` item-level option without sub-option saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_item_option` item-level option selection saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_item_no_option` item-level option omitted saves the base item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_item_sub_option` item-level option with sub-option saves the same item to Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOptionOrderAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_even_split_two` even split creates two suborders with half total each | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitOrderEvenlyAndReadSummary` |
| stage0/test_order_page.py | TestOrderPage | `test_add_split_by_item` item split creates suborders matching item prices | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitOrderByItemAndReadSummary` |
| stage0/test_order_page.py | TestOrderPage | `test_add_split_by_seat` seat split creates suborders matching item prices | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitDineInOrderBySeatAndReadSummary` |
| stage0/test_order_page.py | TestOrderPage | `test_add_split_by_amount` amount split creates suborders matching entered amounts | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitOrderByAmountAndReadSummary` |
| stage0/test_order_page.py | TestOrderPage | `test_cancel_split` unsplit restores the original order total | tests/stage0/order-page.spec.ts | `OrderEntryFlow.cancelEvenSplitAndReadTotals` |
| stage0/test_order_page.py | TestOrderPage | `test_even_item` Dine In item split creates suborders matching item prices | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitDineInOrderByItemAndReadSummary` |
| stage0/test_order_page.py | TestOrderPage | `test_order_split_by_drag` drag split paid first child order and preserves remaining child/parent state | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitOrderByDragPayFirstSubOrderAndReadStatuses` |
| stage0/test_order_page.py | TestOrderPage | `test_open_food_keyboard_multi_language` Admin default keyboard supports multi language and Open Food Chinese input creates Chinese item | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createChineseOpenFoodWithMultiLanguageKeyboard` |
| stage0/test_order_page.py | TestOrderPage | `test_special_price_discount` special price item discounted 50% persists expected Recall subtotal | tests/stage0/order-page.spec.ts | `OrderEntryFlow.applySpecialPriceHalfDiscountAndReadRecallSubtotal` |
| stage0/test_order_page.py | TestOrderPage | `test_delivery_order` Delivery order creation carries customer address information into order Info | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createDeliveryOrderAndReadInfo` |
| stage0/test_order_page.py | TestOrderPage | `test_reduce_combo_options` combo child option reduce action decreases option count by three | tests/stage0/order-page.spec.ts | `OrderEntryFlow.reduceComboOptionsAndReadCounts` |
| stage0/test_order_page.py | all `Test*` classes | add dishes, modify items, save orders, validate order totals | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createTogoOrder` |
| stage0/test_order_settle.py | all `Test*` classes | create payable orders before settlement | tests/stage0/order-settle.spec.ts | `OrderEntryFlow.createTogoOrder` |

### Preconditions

- `PosEntryFlow` has reached POS home.
- Order type is selected through UI navigation, not by direct URL.
- Required dish, option, combo, quantity, and price samples exist in `test-data/pos`.
- Stub DB/order clients can remember the generated order number.
- Recall is opened from POS home after save for source cases that verify saved order content.

### Steps

1. Enter the order page from POS home.
2. Select the requested order type, defaulting to no-table Togo when the source case does not require table selection.
3. Add source-equivalent dishes, options, combos, or quantities.
4. Apply item-level operations required by the source case.
5. Read order summary values as numbers.
6. Save or continue to settlement according to the source case.
7. When the source validates Recall, open Recall through POS home and read the latest saved order.

### Expected Assertions

- Added items are visible in the order summary.
- Quantity, subtotal, tax, discount, charge, and total values match the source case expectation.
- Saved orders expose a traceable order number through page read or stub DB client.
- Item operations preserve source behavior such as hold, void, discount, combo, and option pricing where relevant.
- Menu group/category switch cases preserve dish name and price after save and Recall.
- Chinese group case shows `午餐菜单` and `中餐菜单`.
- Edited sent order recalculates tax after adding one more item.
- Customer-info requirement stays visible until both name and phone are supplied.
- Manager password allows void item and Recall shows `Voided`.
- Item discount changes item price to the expected discounted amount.
- Modify note persists note name and price into Recall item options.
- Split-tip flow shows half tip on the first suborder and the original full tip after combining suborders.
- No-tax Open Food flow completes cash payment and Recall shows order status `Paid`.
- Pickup guest-name edit flow leaves the latest no-name order blank while the previous edited order shows `(ren)`.
- Option-order flows preserve source behavior by comparing the order-page returned item name and price with the single recalled item after save.
- Chinese category option flow switches UI language before ordering and still preserves the same recalled item name and price.
- Even split returns two child orders whose amount equals the original total divided by two.
- Item split and seat split return two child orders whose amounts match the selected item amounts.
- Amount split returns child-order amounts equal to the source-entered amounts `2` and `8.6`.
- Cancel split removes split child orders and preserves the original order total.
- Dine In item split returns two child orders whose amounts match the selected item amounts.
- Drag split marks the first suborder paid after cash payment, leaves the second suborder as `New Order`, and keeps the parent order highlighted with `rgba(33, 150, 243, 1)`.
- Multi-language Open Food flow sets the Admin default keyboard to `support multi language`, opens To Go, inputs `中文` through `Chinese Simpl. Pinyin`, and reads the current order item name as `中文`.
- Special-price discount flow changes the current item price to `5.85`, applies a 50% item discount, saves, opens Recall, and reads subtotal `2.92`.
- Delivery order flow enters phone, name, address, Apt, city, state, zip, and note, creates the Delivery order, opens order Info, and reads the same eight fields.
- Combo option flow creates a combo with four options, reduces the option count three times, and verifies the final count is exactly three less than the initial count.

### Page Responsibilities

- `OrderDishesPage` owns page-level order actions and aggregate reads.
- `MenuGridSection` owns menu category/group/dish selection.
- `ItemActionsSection` owns item-level actions.
- `OrderSummarySection` owns numeric summary reads and line-item reads.
- `RecallPage` owns latest saved-order selection and line-item reads for source cases that verify saved orders.
- `OrderDishesPage` owns order tax reads, customer-info popup actions, manager password popup actions, item discount action, and Modify note entry.
- `OrderDishesPage` owns tip input, split-even action, Open Food no-tax entry, cash payment action, and Pickup info submission.
- `OrderDishesPage` owns option and sub-option selection plus current ordered-item name/price reads.
- `AdminPage` owns default keyboard selection for the Open Food multi-language path.
- `DeliveryPage` owns Delivery order customer/address/note form entry and create-order submission.
- `OrderDishesPage` owns Open Food keyboard input, item special-price input, 50% discount action, Delivery Info reads, combo add/reduce actions, and combo option-count reads.
- `RecallPage` owns recalled item state, option reads, suborder tip reads, split-order combine action, order status reads, order selection, guest-name edit, customer-name reads, order total reads, split panel entry, even/item/seat/amount/drag split actions, split save/confirm/unsplit actions, suborder settlement/payment actions, suborder status reads, parent-card background reads, and split price reads.
- `RecallPage` owns Recall subtotal reads for source cases that verify post-save subtotal instead of the active order page.

### Client/Data Responsibilities

- `test-data/pos/dishes.ts` owns dish, combo, option, and inventory sample data.
- `test-data/pos/dishes.ts` owns category-level and item-level option order samples, including Chinese category and optional sub-option variants.
- `test-data/pos/delivery.ts` owns the Delivery customer/address/note sample used by the Delivery order Info assertion.
- `test-data/pos/languages.ts` owns canonical language and keyboard-related values reused by language and Open Food paths.
- `test-data/pos/payments.ts` owns expected payment/tender values reused by settlement.
- `StubPosOrderClient` or `StubPosDbClient` owns generated order identity in stub mode.

### Stub Behavior

- Stub order identity is deterministic and does not require a live DB.
- Stub clients do not validate menu availability against live APIs.
- Stub order page stores the currently selected menu item and makes it available to Recall after save.
- Stub Chinese mode renders Chinese menu group names on the order page.
- Stub tax is derived from active item count and rounded to two decimals.
- Stub customer-info popup closes only when both name and phone are supplied.
- Stub manager password `11` marks the current item as `Voided`.
- Stub item discount applies a 10% reduction to the current item price.
- Stub Modify note persists note name and price to the saved order option.
- Stub tip entry treats the source integer cents value as dollars after dividing by 100, so `200` becomes `2.00`.
- Stub split-even records a first-suborder tip of half the current order tip and combines back to the full original tip.
- Stub cash settlement stores the current order as `Paid` and makes it available in Recall.
- Stub Pickup order creation stores multiple orders in one browser page session so editing the previous order does not mutate the latest order.
- Stub order menu renders category-level and item-level option sample dishes plus Chinese category sample dishes.
- Stub option and sub-option controls are deterministic UI actions; first-round assertions validate the source-observed item name/price preservation rather than live option-pricing internals.
- Stub Recall computes order total from saved item prices plus tip.
- Stub split state records draft and saved split-order prices in the selected recalled order.
- Stub even split divides the source total by two without rounding so it matches the source `float(total) / float(num)` assertion.
- Stub item and seat split use the first two saved item prices as child-order prices.
- Stub amount split reads typed amount inputs and stores them as child-order prices after the source-equivalent save and confirmation path.
- Stub unsplit clears saved child-order prices while keeping the recalled order total unchanged.
- Stub Dine In item split reuses the two saved item prices as child-order prices.
- Stub drag split creates two child orders, cash payment changes the first child to `Paid`, the second child remains `New Order`, and the parent card stores the source highlight color as a stable readable value.
- Stub Admin default keyboard selection is represented by a deterministic select control and does not persist beyond the current browser context.
- Stub Open Food multi-language keyboard creates an order item whose name equals the typed keyboard text.
- Stub special-price update replaces the selected item price, and the 50% discount floors to cents so `5.85` becomes `2.92`, matching the source assertion.
- Stub Delivery create-order copies the entered phone, name, address, Apt, city, state, zip, and note into the order Info panel after navigating to the order page.
- Stub combo option state starts at four options for the migrated combo sample and decrements by one for each reduce action.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Order page menu grid and summary selectors must match actual DOM contracts | Confirm stable selectors or request `data-testid` |
| data | Live menu item availability may differ from source fixture assumptions | Align test-data samples with live seeded menu |

## SettlementFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_order_settle.py | all `Test*` classes | cash, credit, discount, tax, total, and order completion settlement paths | tests/stage0/order-settle.spec.ts | `SettlementFlow.payOrder` |

### Preconditions

- `OrderEntryFlow` has created a payable order.
- Settlement page is reached by UI action from order page or recall page.
- Payment method and expected amounts are defined in typed test data.
- External payment devices are not required in first-round stub mode.

### Steps

1. Open settlement from the current order context.
2. Select the payment method required by the source case.
3. Enter tender, discount, tip, charge, or loyalty data when required.
4. Submit payment.
5. Read final payment state and totals.

### Expected Assertions

- Settlement subtotal, tax, discount, charge, tip, tender, change, and total are numeric reads.
- Payment status matches the source scenario.
- Completed order is visible in recall or final confirmation when required.
- Payment method-specific behavior is preserved or documented as a live gap.

### Page Responsibilities

- `SettlementPage` owns settlement controls and numeric reads.
- `RecallPage` owns post-payment order lookup when the source verifies recall state.

### Client/Data Responsibilities

- `test-data/pos/payments.ts` owns tender samples and expected totals.
- `StubPosOrderClient` or `StubPosDbClient` owns paid-order state in stub mode.

### Stub Behavior

- Stub payment completion marks the order paid deterministically.
- Credit/device flows return deterministic success unless the source case explicitly validates device failure.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| external-device | Credit and print/payment-device behavior cannot be proven offline | Add live smoke coverage or a device simulator contract |
| selector | Settlement controls need actual DOM confirmation | Confirm stable selectors or request `data-testid` |

## InventoryFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_inventory.py | all `Test*` classes | inventory setup, menu stock changes, sold-out state, and order interaction | tests/stage0/inventory.spec.ts | `InventoryFlow.configureInventoryForOrder` |

### Preconditions

- POS home is open through `PosEntryFlow`.
- Admin/inventory navigation uses UI entry points.
- Required stock, dish, category, and admin setting samples exist in typed test data.
- Stub menu/admin clients can represent stock or setting state without live APIs.

### Steps

1. Enter Admin or Inventory through POS UI navigation.
2. Configure stock or item state required by the source case.
3. Return to order entry through UI navigation.
4. Attempt source-equivalent ordering behavior.
5. Read order or inventory state.

### Expected Assertions

- Inventory state changes are visible through page reads or deterministic stub clients.
- Sold-out or limited-stock behavior matches the source case.
- Order totals and item availability reflect inventory state.

### Page Responsibilities

- `InventoryPage` owns inventory controls and reads.
- `AdminPage` and `MenuAdminPage` own admin navigation and menu setting actions.
- `OrderDishesPage` owns order-side visibility and amount reads.

### Client/Data Responsibilities

- `test-data/pos/dishes.ts` owns stock-related menu samples.
- `test-data/pos/admin-settings.ts` owns inventory/admin setting names and values.
- `StubPosMenuClient` and `StubPosAdminSettingsClient` own stub state.

### Stub Behavior

- Stub clients store configured inventory state in memory for the current test.
- Stub mode does not persist inventory state across tests.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| data | Live seeded menu and stock records may not match source assumptions | Define seeded inventory fixture or API setup contract |
| selector | Inventory UI selectors need live confirmation | Confirm stable selectors or request `data-testid` |

## RecallFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_order_page.py | all `Test*` classes | saved order recall checks | tests/stage0/order-page.spec.ts | `RecallFlow.openLatestOrder` |
| stage0/test_order_settle.py | all `Test*` classes | paid or unpaid order recall checks | tests/stage0/order-settle.spec.ts | `RecallFlow.openLatestOrder` |

### Preconditions

- An order has been created or settled through a prior flow.
- Latest order number is available through page read or stub DB client.
- Recall is opened from POS home or valid UI navigation only.

### Steps

1. Open Recall through POS UI.
2. Locate the latest or source-specified order.
3. Open order detail when required.
4. Read order card, line items, status, and totals.

### Expected Assertions

- The expected order is visible.
- Order status, line items, quantities, and totals match the source case.
- Paid/unpaid/void/held states match the source scenario.

### Page Responsibilities

- `RecallPage` owns recall list filters, order card reads, and order selection.
- `RecallOrderDetailSection` owns detail-panel reads.

### Client/Data Responsibilities

- `StubPosDbClient` owns latest order number in stub mode.
- `StubPosOrderClient` owns order state when API-level setup is needed later.

### Stub Behavior

- Stub latest-order lookup returns the most recent order identity from current test state.
- Stub recall state does not query live DB.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Recall list and order-detail selectors need live confirmation | Confirm stable selectors or request `data-testid` |
| state | Live ordering and recall may be eventually consistent | Add deterministic wait/read contract without `waitForTimeout` |
