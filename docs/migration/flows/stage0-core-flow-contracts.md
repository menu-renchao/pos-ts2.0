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
| stage0/test_order_page.py | TestOrderPage | `test_switch_menu_search` POS and EMENU menu modes return their expected search result items | tests/stage0/order-page.spec.ts | `OrderEntryFlow.switchMenuModesAndSearchItems` |
| stage0/test_order_page.py | TestOrderPage | `test_modify_add` global option Add keeps the Modify area visible | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addGlobalOptionAndReadModifyArea` |
| stage0/test_order_page.py | TestOrderPage | `test_modify_count` global option count changes to five and zero keep the Modify area visible | tests/stage0/order-page.spec.ts | `OrderEntryFlow.changeGlobalOptionCountsAndReadModifyArea` |
| stage0/test_order_page.py | TestOrderPage | `test_modify_reduce` global option reduce actions down to zero keep the Modify area visible | tests/stage0/order-page.spec.ts | `OrderEntryFlow.reduceGlobalOptionToZeroAndReadModifyArea` |
| stage0/test_order_page.py | TestOrderPage | `test_order_with_name` guest name appears on Recall card and edit page | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createDineInOrderWithGuestNameAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_search_menu_off` Search Menu hidden/off and enabled/default search result | tests/stage0/order-page.spec.ts | `OrderEntryFlow.toggleSearchMenuAndSearchDefaultItem` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count` integer item count persists after save and Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createOrderWithIntegerItemCountAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_big_tip` pre-save large tip warning and Recall tip persistence | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addLargeTipBeforeSaveAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_order_after_big_tip` post-credit large tip warning and tip persistence | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addLargeTipAfterCreditPaymentAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_staff_without_void_printed_item_void_hold` no-permission staff deletes Hold printed item after manager password | tests/stage0/order-page.spec.ts | `OrderEntryFlow.deleteHeldPrintedItemWithManagerPassword` |
| stage0/test_order_page.py | TestOrderPage | `test_staff_without_void_printed_item_void_delay` no-permission staff reduces Delay printed item to zero after manager password | tests/stage0/order-page.spec.ts | `OrderEntryFlow.deleteDelayedPrintedItemWithManagerPassword` |
| stage0/test_order_page.py | TestOrderPage | `test_combine_same_item_dont_automatically_combine` same dish does not combine when Dont Combine is configured | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createThreeSameItemsWithoutAutoCombine` |
| stage0/test_order_page.py | TestOrderPage | `test_combine_same_item_automatically_combine` same dish with different kitchen status stays on separate lines | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addSameItemAfterKitchenWithSameStatusCombine` |
| stage0/test_order_page.py | TestOrderPage | `test_combine_same_item_combine_include_in_kitchen` same dish combines into sent kitchen line with quantity, In Kitchen marker, and red color | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addSameItemAfterKitchenWithIncludeKitchenCombine` |
| stage0/test_order_page.py | TestOrderPage | `test_automatically_redirect_after_reduce_items_close` reduce-to-zero stays on original category when auto redirect is disabled | tests/stage0/order-page.spec.ts | `OrderEntryFlow.reduceItemWithAutoRedirectDisabled` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_reduce` decimal quantity reduces to zero after repeated Reduce actions | tests/stage0/order-page.spec.ts | `OrderEntryFlow.reduceDecimalQuantityToZero` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_split_by_drag` decimal quantity preserves dish count and price after drag split | tests/stage0/order-page.spec.ts | `OrderEntryFlow.splitDecimalQuantityOrderByDrag` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_combine` decimal quantity preserves both dish counts and combined total after order combine | tests/stage0/order-page.spec.ts | `OrderEntryFlow.combineDecimalQuantityOrders` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_special_price1` three special-price decimal quantity items save with expected Recall subtotal | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_special_price2` two special-price decimal quantity items save with expected Recall subtotal | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_special_price3` three special-price items with partial decimal quantities save with expected Recall subtotal | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createDecimalSpecialPriceOrderAndReadRecallSubtotal` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_close` decimal quantity input is treated as non-decimal digits when decimal count is disabled | tests/stage0/order-page.spec.ts | `OrderEntryFlow.enterDecimalQuantityWhenDecimalCountDisabled` |
| stage0/test_order_page.py | TestOrderPage | `test_item_count_decimal_combine_item_add_option` decimal quantity same-item combine with Global Option splits quantities and preserves total after Recall | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addGlobalOptionsToDecimalCombinedItemAndReadTotals` |
| stage0/test_order_page.py | TestOrderPage | `test_custom_order` custom Delivery order saves and Recall Print exposes Reprint with three print outputs | tests/stage0/order-page.spec.ts | `OrderEntryFlow.printCustomDeliveryOrderAndReadPrintState` |
| stage0/test_order_page.py | TestOrderPage | `test_delivery_order_exit` Delivery customer flow exits the order page directly back to POS home | tests/stage0/order-page.spec.ts | `OrderEntryFlow.exitDeliveryOrderAndReadHomeWelcome` |
| stage0/test_order_page.py | TestOrderPage | `test_item_with_number` menu item whose name and number are the same appears only once in order search results | tests/stage0/order-page.spec.ts | `OrderEntryFlow.searchDishWithSameNameAndNumberAndReadResult` |
| stage0/test_order_page.py | TestOrderPage | `test_display_menu_name_after_modify_language` configured Chinese item name is returned by initial-letter search in Chinese mode | tests/stage0/order-page.spec.ts | `OrderEntryFlow.configureChineseItemNameAndSearchByInitials` |
| stage0/test_order_page.py | TestOrderPage | `test_combo_display_all_one_time_modify_sub_item` saved combo can be edited from Recall and child items can be replaced | tests/stage0/order-page.spec.ts | `OrderEntryFlow.modifySavedComboSubItemsAndReadRecall` |
| stage0/test_order_page.py | TestOrderPage | `test_combo_subitem_no_option_select_option` selecting a no-option combo child does not prevent the next normal item from showing options | tests/stage0/order-page.spec.ts | `OrderEntryFlow.orderComboSubItemThenReadNormalItemOptions` |
| stage0/test_order_page.py | TestOrderPage | `test_staff_without_note_edit_sub_item` staff without NOTE permission must manager-authorize before adding combo sub-item note | tests/stage0/order-page.spec.ts | `OrderEntryFlow.addComboSubItemNoteWithManagerAuthorization` |
| stage0/test_order_page.py | TestOrderPage | `test_category_required` required KDS category blocks save, keeps order page open, and auto-navigates to KDS until a KDS item is added | tests/stage0/order-page.spec.ts | `OrderEntryFlow.requireKdsCategoryBeforeSave` |
| stage0/test_order_page.py | TestOrderPage | `test_category_not_required_percent_charge` KDS category without discount restriction participates in 20% whole-order charge | tests/stage0/order-page.spec.ts | `OrderEntryFlow.applyPercentChargeWhenKdsDiscountAllowanceDisabled` |
| stage0/test_order_page.py | TestOrderPage | `test_order_page_show_name` menu category displays configured POS Name while the ordered item line keeps the original item name | tests/stage0/order-page.spec.ts | `OrderEntryFlow.configureKdsItemPosNameAndReadOrderPageName` |
| stage0/test_order_page.py | TestOrderPage | `test_batch_edit_combo_mode` adjustable combo sub-item supports edit price while fixed sub-item does not | tests/stage0/order-page.spec.ts | `OrderEntryFlow.editQuickComboSubItemPriceAndReadSubtotal` |
| stage0/test_order_page.py | TestOrderPage | `test_split_by_item_subitem_discount` drag-split child order discount panel shows the child whole-order amount | tests/stage0/order-page.spec.ts | `OrderEntryFlow.readFirstDragSplitSubOrderDiscountWholePrice` |
| stage0/test_order_page.py | TestOrderPage | `test_custom_order_type` CUSTOM_D order increases Report Overview Net Sales by the saved order subtotal | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createCustomDeliveryOrderAndReadReportNetSales` |
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
8. For guest-name Dine In, fill the generated customer name, save the order, read the Recall card customer name, click Edit, and read the editable customer name again.
9. For Search Menu setting behavior, set Search Menu off in Admin, refresh, enter Dine In, read the search input class as hidden, restore Search Menu on, refresh, enter Dine In, search the default POS item, and read the search result.
10. For integer item count behavior, add two source-equivalent items, change the latest item quantity to `3`, read the order-page count as `4`, save, open Recall, and read the recalled count as `4`.
11. For pre-save large-tip behavior, add a To Go item, compute the source integer-cent tip as `floor(total * 100 / 2) + 100`, add the tip, read the over-50-percent warning, save, open Recall, and read the persisted tip.
12. For post-credit large-tip behavior, create and credit-pay a To Go order, open Recall, compute the source integer-cent tip from the recalled total, add the tip after payment, read the over-50-percent warning, and read the persisted tip.
13. For no-permission Hold printed item deletion, remove Void Printed Item permission from staff `1`, log in with password `123`, create a Dine In order with two dishes, Hold-print the order, Recall edit it, attempt void, read the permission prompt, submit manager password, save, Recall edit again, and read remaining item line count.
14. For no-permission Delay printed item deletion, use the same staff setup, Delay-print the order, Recall edit it, change the printed item quantity to `0`, read the permission prompt, submit manager password, save, Recall edit again, and read remaining item line count.
15. For Dont Combine same-item behavior, set combine mode to Dont Combine and separate same item off, add the same dish three times, read order line count, save, then restore same-item settings.
16. For Auto Combine same-status behavior, set combine mode to Auto Same Status and separate same item off, send the first same dish to kitchen, Recall edit, add the same dish again, read order line count, save, then restore settings.
17. For Include Kitchen combine behavior, set combine mode to Include Kitchen and separate same item off, send the first same dish to kitchen, Recall edit, add the same dish again, then read line count, first-line quantity, first-line name, and first-line color.
18. For reduce auto-redirect disabled behavior, disable Automatically Redirect After Reduce Items, add two adjacent dishes from different categories, reduce the active item to zero, verify the option/list area is gone, verify the original category dish is still visible, then restore the setting.
19. For decimal reduce behavior, enable Count Can Be Decimal, create a To Go order, set the item quantity to `1.25`, click Reduce twice, and read the item count as `0`.
20. For decimal drag split behavior, enable Count Can Be Decimal, create a To Go order with first item quantity `2.55`, capture its total, add a second item with quantity `2`, save, open Recall split panel, drag split so the decimal item is isolated in suborder 2, open that suborder, and read quantity and total.
21. For decimal combine behavior, enable Count Can Be Decimal, create two saved To Go orders with quantities `2.55`, open the latest Recall order, combine the previous order into it, then read both dish quantities and the combined total.
22. For decimal special-price behavior, enable Count Can Be Decimal, create a To Go order, add each source-equivalent dish, select the added order line, set the requested special price, optionally set the requested decimal quantity, save, open Recall, and read subtotal.
23. For disabled decimal-count behavior, disable Count Can Be Decimal, create a To Go order, enter quantity `2.55`, and read the first order-line quantity as rendered by the order page.
24. For decimal combined-item Global Option behavior, enable Count Can Be Decimal and Auto Same Status combine, create a To Go order, set special price `7.95`, set quantity `2.3`, add a priced Global Option, read both split line quantities and the second-line price, save, open Recall, and compare saved total with Recall total.
25. For custom Delivery print behavior, enter the custom Delivery order type, fill the source customer phone/name/address, add a source-equivalent kitchen item, save, open Recall, print, then read Reprint visibility and print output count.
26. For Delivery exit behavior, enter Delivery, fill the source customer phone/name/address to reach the order page, click Exit, and read POS home welcome text.
27. For name/number search behavior, seed the source-equivalent dish whose name and number are both `AA`, enter To Go, search `AA`, then read the result text and result item count.
28. For combo sub-item NOTE permission behavior, remove NOTE permission from staff `1`, log out, log in with password `123`, enter Dine In, add the source-equivalent combo, open the first sub-item, click Edit Note, read the permission prompt, submit manager password `11`, enter `子菜的备注信息`, read the saved sub-item note, and restore NOTE permission.
29. For required KDS category behavior, set Lunch/KDS Required on in Admin, enter Dine In, add a non-KDS source-equivalent item, attempt Save, read the current category and URL, add `Mongolian Chicken` from KDS, Save again, read URL, and restore KDS Required off.
30. For KDS category percent charge behavior, set Lunch/KDS category discount restriction off in Admin, enter Dine In, add `Mongolian Chicken` from KDS, apply `20%` whole-order charge, read charge label and price, then restore the category setting.
31. For KDS item POS Name display behavior, set the Lunch/KDS item `Pos Name Test` POS Name in Admin, refresh, enter Dine In, switch to Lunch/KDS, verify the menu displays the POS Name, order by that visible POS Name, read the ordered item name, and restore the POS Name setting.
32. For editable combo sub-item price behavior, enter Dine In, switch to `MansuperGroup`/`MansuperCat`, order `EditPriceCombo`, read subtotal, select adjustable sub-item `ITEM1`, edit price with source input `1200`, read subtotal again, select fixed sub-item `ITEM3`, and verify edit price is unavailable.
33. For split child-order discount behavior, enter Dine In, add `superman item1`, `superman item2`, and `superman item3` from `Lunch`/`Chicken Lunch E`, save, open Recall, drag-split into child orders, open child order 1, edit it, open the discount panel, and read the discount panel whole-order amount.
34. For custom order type reporting behavior, open Report Overview, filter order type `CUSTOM_D`, read starting Net Sales, enter Custom Delivery, fill source delivery info, order `superman item1`, capture subtotal, save, reopen Report Overview filtered to `CUSTOM_D`, and read ending Net Sales.
35. For Chinese initial-letter item search, open Admin, configure `hn_normal_item1` in group `Lunch` and category `hn_cate` with Chinese name `普通菜1`, refresh, switch system language to Chinese, enter Dine In, search `ptc`, read the search result, exit the order page, and restore default language.
36. For Display All One Time combo sub-item edit behavior, enter Dine In, select `crm_group` / `crm_cat`, add `combo_max` with initial child items `item` and `item_option`, save, open Recall recent order, edit it, replace child items with `item-1` and `item_option-1`, save again, reopen Recall recent order, and read all combo child items.
37. For no-option combo child then normal-item option behavior, enter Dine In, select `MansuperGroup` / `MansuperCat`, add `ComboOptionTest`, select no-option child item `combo-no-option-item`, then add normal item `combo-option-item` and read whether the order option area is visible.

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
- Menu-mode search flow sets menu mode to `POS`, searches `Broccoli Garlic Sauce`, exits the order page, sets mode to `EMENU`, searches `All you can eat item`, then restores menu mode to `POS`.
- Modify Add flow opens a non-combo Dine In item, opens the Global Option Modify area, clicks Add, and verifies the Modify area remains visible.
- Modify Count flow opens a non-combo Dine In item, opens Global Option Modify, sets option count to `5`, verifies the Modify area, sets count to `0`, verifies the Modify area again, and reads option count `0`.
- Modify Reduce flow opens a non-combo Dine In item, opens Global Option Modify, sets option count to `2`, verifies the Modify area, reduces twice, verifies the Modify area again, and reads option count `0`.
- Guest-name order flow verifies the source generated name appears on the Recall card and again after entering the recalled order edit page.
- Search Menu off/on flow verifies disabled Search Menu renders class `iptgrp hide`, enabled Search Menu renders class `iptgrp`, and searching `Broccoli Garlic Sauce` returns that item.
- Item-count flow verifies the active order count and recalled order count both equal `4` after adding one item plus another item with quantity `3`.
- Pre-save large-tip flow verifies the warning text `The tip is more than 50% of the meal. Confirm to add?` and the recalled tip value computed from the source integer-cent formula.
- Post-credit large-tip flow verifies the same large-tip warning after credit payment and the recalled tip value after adding the tip from Recall.
- Hold printed item deletion verifies the no-permission staff sees `You do not have permission to delete printed dish, please enter the password` and manager authorization leaves one item line after save and Recall edit.
- Delay printed item deletion verifies reducing a printed item to `0` shows the same no-permission prompt and manager authorization leaves one item line after save and Recall edit.
- Dont Combine mode verifies adding the same dish three times creates three visible order lines.
- Auto Same Status mode verifies a sent-kitchen line and a newly added unsent line are not combined, leaving two visible order lines.
- Include Kitchen mode verifies the sent-kitchen and newly added same dish combine into one visible line with quantity `2`, name containing `(1In Kitchen)`, and color `rgba(113, 9, 9, 1)`.
- Auto-redirect disabled reduce flow verifies reducing to zero hides the current option/list area and keeps the source category item visible.
- Decimal reduce flow verifies quantity `1.25` can be reduced twice and the rendered order count becomes `0`.
- Decimal drag split flow verifies the isolated suborder dish quantity contains `2.55` and the suborder total equals the captured first-item total.
- Decimal combine flow verifies both combined order dish quantities are `2.55` and the combined total equals the two source order totals within cents tolerance.
- Decimal special-price flow verifies source POS-33600 subtotal outputs: `64.24` for `6.50 x 2.55 + 5.50 x 3.66 + 7.50 x 3.67`, `23.78` for `6.50 x 1.5 + 5.50 x 2.55`, and `44.27` for `6.50 x 2.55 + 5.50 x 3.67 + 7.50 x 1`.
- Disabled decimal-count flow verifies entering `2.55` renders quantity `255`.
- Decimal combined-item Global Option flow verifies quantities split into `0.3` and `2`, the second-line price equals `optionPrice * 2 + itemUnitPrice * 2`, and the Recall total equals the pre-save order total.
- Custom Delivery print flow verifies Recall Print makes Reprint visible and produces three offline print outputs, matching the source file-count assertion without using the live temp print directory.
- Delivery exit flow verifies clicking Exit from the Delivery-created order page returns to POS home by reading the visible welcome text.
- Name/number search flow verifies searching `AA` returns text `AA` and exactly one visible search result even though both the dish name and dish number match the same keyword.
- Chinese initial-letter search flow verifies source item `hn_normal_item1` is configured with Chinese name `普通菜1`, Chinese mode search keyword `ptc` is used, and the visible search result contains `普通菜1`.
- Display All One Time combo edit flow verifies the saved `combo_max` order can be opened from Recall, edited, saved again, and its recalled child items exactly equal `item-1` and `item_option-1`.
- No-option combo child flow verifies selecting `combo-no-option-item` from `ComboOptionTest` still allows a following normal item `combo-option-item` to expose the option area.
- Combo sub-item NOTE permission flow verifies staff `1` without NOTE permission sees `You do not have permission NOTE, please enter the password!`, manager password authorizes the action, and the sub-item note text becomes `子菜的备注信息`.
- Required KDS category flow verifies the first Save leaves the browser on `orderDishes`, automatically sets current category to `KDS`, and after adding `Mongolian Chicken` a second Save leaves `orderDishes`.
- KDS category percent charge flow verifies the charge line label is `Charge(20%)` and the price is `$2.00` for the source-equivalent `$10` KDS dish when category discount restriction is off.
- KDS item POS Name display flow verifies the configured POS Name is visible in the KDS menu category while the resulting order line displays the source item name `Pos Name Test`.
- Editable combo sub-item price flow verifies `EditPriceCombo` subtotal changes from `$30.20` to `$40.20` after editing adjustable `ITEM1`, and fixed `ITEM3` does not expose edit price.
- Split child-order discount flow verifies the first drag-split child order opens the discount panel with whole-order price `8.00`, matching `superman item1`.
- Custom order type reporting flow verifies `CUSTOM_D` Report Overview Net Sales increases by the saved custom Delivery order subtotal.

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
- `AdminPage` owns POS menu mode selection and save for search-mode behavior.
- `DeliveryPage` owns Delivery order customer/address/note form entry and create-order submission.
- `OrderDishesPage` owns Open Food keyboard input, item special-price input, 50% discount action, Delivery Info reads, combo add/reduce actions, and combo option-count reads.
- `OrderDishesPage` owns order-line selection so special-price and quantity edits can target the source-equivalent first, second, or third dish.
- `OrderDishesPage` owns menu search input, search result text/count reads, search clear, order-page exit, Global Option Modify entry, Add/Count/Reduce actions, Modify-area visibility reads, and Global Option count reads.
- `OrderDishesPage` owns guest-name input, Search Menu class reads, item-count reads, source integer-cent tip entry, large-tip toast reads, and credit-payment action for order-page paths.
- `OrderDishesPage` owns Hold/Delay print actions, printed-item void/reduce permission prompt reads, manager password submission, order line-count reads, first-line quantity/name/color reads, and same-dish add actions.
- `OrderDishesPage` owns Combo sub-item selection, Combo sub-item Edit Note permission prompt reads, sub-item note input, and sub-item note reads.
- `OrderDishesPage` owns combo child-item replacement choices used when editing a saved Display All One Time combo.
- `OrderDishesPage` owns Quick Combo ordering, combo sub-item selection, combo sub-item price editing, combo subtotal text reads, and fixed-sub-item edit-price availability reads.
- `OrderDishesPage` owns opening the whole-order discount panel and reading its whole-order amount for split child-order edit paths.
- `ReportPage` owns Report password entry, order-type filtering, and Overview Net Sales reads for custom order type reporting.
- `OrderDishesPage` owns current category name reads and page URL reads used by required-category save behavior.
- `OrderDishesPage` owns whole-order percent charge application plus charge label and amount reads.
- `OrderDishesPage` owns menu-item visibility checks by displayed POS Name and ordered-line item name reads.
- `OrderDishesPage` owns reduce action, option/list visibility reads, menu-item visibility reads, decimal quantity input, and item-count reads.
- `OrderDishesPage` owns decimal order subtotal reads used as source-equivalent item/order totals before split or combine.
- `OrderDishesPage` owns order-line quantity/price reads for decimal disabled and Global Option split-line assertions.
- `OrderDishesPage` owns Global Option priced Add behavior for the decimal combined-item path.
- `PosHomePage` owns the custom Delivery entry point, and `RecallPage` owns Recall Print/Reprint state and offline print output count reads.
- `OrderDishesPage.exitOrderPage` owns direct order-page exit behavior, and `PosHomePage.readWelcomeText` owns the home-return assertion for Delivery exit.
- `AdminPage` owns generic item Chinese-name configuration by group, category, source item name, and translated display name.
- `AdminPage` owns Search Menu enable/disable persistence, staff Void Printed Item permission, staff NOTE permission, KDS Category Required setting, KDS Category discount restriction setting, KDS item POS Name setting, same-item combine mode, separate-same-item setting behavior, Automatically Redirect After Reduce Items, and Count Can Be Decimal.
- `RecallPage` owns recalled item state, option reads, suborder tip reads, split-order combine action, order status reads, order selection, guest-name edit, customer-name reads, order total reads, split panel entry, even/item/seat/amount/drag split actions, split save/confirm/unsplit actions, suborder settlement/payment actions, suborder status reads, parent-card background reads, and split price reads.
- `RecallPage` owns Recall subtotal reads for source cases that verify post-save subtotal instead of the active order page.
- `RecallPage` owns Recall item-count reads, recalled tip reads, and post-credit large-tip entry/toast reads.
- `RecallPage` owns recalled combo child-item reads after a saved combo order is edited.
- `RecallPage` owns recalled item quantity reads, generic order combine action, suborder opening, and suborder total reads for decimal quantity split/combine paths.

### Client/Data Responsibilities

- `test-data/pos/dishes.ts` owns dish, combo, option, and inventory sample data.
- `test-data/pos/dishes.ts` owns category-level and item-level option order samples, including Chinese category and optional sub-option variants.
- `test-data/pos/dishes.ts` owns POS/EMENU search-item names and the stable non-combo dish used to enter Global Option Modify flows.
- `test-data/pos/dishes.ts` owns `numberedNameConflictDish`, whose source-equivalent name and number are both `AA` for POS-36255 search de-duplication.
- `test-data/pos/dishes.ts` owns `requiredKdsDish` as the source-equivalent KDS `$10` `Mongolian Chicken` required to satisfy POS-42060 and POS-42958.
- `test-data/pos/dishes.ts` owns `posNameDisplayDish` and `posNameDisplayValue` as the source-equivalent KDS item/POS Name pair for POS-42097.
- `test-data/pos/dishes.ts` owns `editableComboDish` as the source-equivalent `EditPriceCombo` setup for POS-42061.
- `test-data/pos/dishes.ts` owns `comboMaxModifyDish` as the source-equivalent `combo_max` setup with initial `item,item_option` children and replacement `item-1,item_option-1` children for POS-43956.
- `test-data/pos/dishes.ts` owns `comboNoOptionThenOptionDish` as the source-equivalent `ComboOptionTest` plus no-option child and following normal option item for POS-43823.
- `test-data/pos/dishes.ts` owns `splitDiscountDishes` as the source-equivalent `superman item1`/`superman item2`/`superman item3` set for POS-36254.
- `test-data/pos/dishes.ts` owns `chineseInitialSearchDish` as the source-equivalent `hn_normal_item1` / `普通菜1` / `ptc` item for POS-43827.
- `test-data/pos/delivery.ts` owns source-equivalent customer phone/name/address data for custom Delivery order reporting.
- `test-data/pos/dishes.ts` owns `groupSwitchDish`, `categorySwitchDish`, and `categoryOptionDish` as the POS-33600 source-equivalent special-price decimal quantity dishes.
- `test-data/pos/dishes.ts` owns `pricedGlobalOption` as the source-equivalent Global Option price used by POS-35660.
- `test-data/pos/dishes.ts` owns the default POS Search Menu item `Broccoli Garlic Sauce`.
- `test-data/pos/admin-settings.ts` owns canonical POS menu mode, Search Menu, same-item combine mode, separate-same-item, and permission setting values.
- `test-data/pos/admin-settings.ts` owns Automatically Redirect After Reduce Items and Count Can Be Decimal setting names.
- `test-data/pos/permissions.ts` owns the source-equivalent staff `1` password `123` and manager password `11`.
- `test-data/pos/permissions.ts` owns the staff `1` no-NOTE permission identity reused by POS-37804.
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
- Stub Admin item Chinese-name setting persists by item name, group, and category; Chinese-mode order search matches configured item initials and renders the configured Chinese display name.
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
- Stub order-line clicks update the selected order item so special-price and quantity edits apply to the source-equivalent dish line rather than always the first or latest dish.
- Stub decimal special-price line totals use explicit half-up cents rounding before subtotal aggregation so `5.50 x 2.55` becomes `14.03` and `7.50 x 3.67` becomes `27.53`, matching the source POS subtotal assertions.
- Stub disabled Count Can Be Decimal removes the decimal point from quantity input so `2.55` renders as `255`.
- Stub Auto Same Status + decimal quantity + Global Option Add splits the source item into a decimal remainder line and an integer option line; the integer line price includes item unit price times quantity plus option price times quantity.
- Stub custom Delivery uses the normal Delivery form but marks the order type as custom-delivery; Recall Print exposes Reprint and a deterministic print output count of `3` instead of touching the filesystem.
- Stub Delivery create-order enters the order page, and order Exit hides the order page and leaves POS home welcome text visible for the direct-exit path.
- Stub Delivery create-order copies the entered phone, name, address, Apt, city, state, zip, and note into the order Info panel after navigating to the order page.
- Stub combo option state starts at four options for the migrated combo sample and decrements by one for each reduce action.
- Stub menu mode is stored in browser-local state so refresh keeps the selected mode inside the current test.
- Stub search returns only the source-expected item for the active menu mode: `Broccoli Garlic Sauce` for `POS`, `All you can eat item` for `EMENU`.
- Stub menu search matches both dish name and dish number but de-duplicates by dish identity, so the `AA` name/number conflict renders one result item instead of two.
- Stub order exit hides the order panel and leaves home controls available for the next Admin entry.
- Stub Global Option Modify area stays visible after Add, Count, and Reduce actions.
- Stub Global Option count can be set directly and reduce never goes below zero.
- Stub guest-name entry is copied into the saved order, rendered on the Recall card, and restored into the order edit field.
- Stub Search Menu setting is stored in browser-local state and drives the order search input class as `iptgrp hide` or `iptgrp`.
- Stub item count sums non-voided item quantities and renders the same count on the active order page and Recall.
- Stub large-tip handling accepts the source integer-cent value, converts it to dollars for persisted tip text, and renders the source warning when the tip exceeds 50% of the meal total.
- Stub credit payment saves the order as paid, after which Recall can add and persist a post-credit tip.
- Stub staff permission state persists in browser-local state; staff password `123` without Void Printed Item permission triggers the source permission prompt for sent/printed items.
- Stub Hold and Delay print actions mark active items as sent-to-kitchen printed items and save the order for Recall editing.
- Stub manager password `11` authorizes the pending printed-item delete and removes the target line, leaving the remaining line visible after save and Recall edit.
- Stub staff NOTE permission state persists in browser-local state; staff password `123` without NOTE permission triggers the source NOTE permission prompt on Combo sub-item Edit Note, and manager password `11` authorizes sub-item note entry.
- Stub KDS Category Required setting persists in browser-local state; when enabled, saving an order without any active KDS item sets the current category to `KDS`, keeps URL on `orderDishes`, and blocks save until a KDS item is added.
- Stub KDS Category discount restriction setting persists in browser-local state; when the setting is off, a KDS item participates in whole-order percent charge calculation, so `Charge(20%)` on `$10` `Mongolian Chicken` renders `$2.00`.
- Stub KDS item POS Name setting persists in browser-local state; menu buttons render the configured POS Name, but clicking that button adds the original dish name to the order line.
- Stub editable combo creates `EditPriceCombo` with adjustable `ITEM1` and `ITEM2`, fixed `ITEM3`, initial subtotal `$30.20`, and editing adjustable `ITEM1` with the source price input updates subtotal to `$40.20` while fixed `ITEM3` disables edit price.
- Stub `combo_max` starts with child items `item` and `item_option`; Recall edit exposes replacement choices and persists selected child items `item-1` and `item_option-1` back to the saved order for Recall verification.
- Stub `ComboOptionTest` starts with no-option child `combo-no-option-item`; after that child is selected, adding normal item `combo-option-item` keeps the order option area visible.
- Stub drag split creates three individual child orders for the source `superman item1`/`superman item2`/`superman item3` path; Recall child-order edit loads only the selected child items, so the discount panel whole-order amount for child order 1 is `8.00`.
- Stub Report Overview computes Net Sales from saved orders in the current browser page, maps custom Delivery orders to `CUSTOM_D`, and applies the selected order-type filter without the source live cloud-report delay.
- Stub same-item combine mode `dont-combine` keeps each repeated dish as its own order line even when separate-same-item is disabled.
- Stub same-item combine mode `auto-same-status` combines only same-status unsent lines, so a sent-kitchen line and a newly added unsent line stay separate.
- Stub same-item combine mode `include-kitchen` combines the newly added same dish into the sent-kitchen line, keeps the source `(1In Kitchen)` marker, quantity `2`, and red color `rgba(113, 9, 9, 1)`.
- Stub auto-redirect-after-reduce disabled hides the order option/list container when a reduced item reaches zero and leaves the menu category item visible.
- Stub decimal count setting allows quantity `1.25`; each Reduce subtracts one until quantity reaches zero, and order count renders `0`.
- Stub recalled item rows expose `data-quantity` so decimal quantities are verified directly rather than inferred from price.
- Stub drag split stores suborder item lists and prices; opening suborder 2 renders the first source item with quantity `2.55` and total equal to its pre-split item total.
- Stub order combine appends source-order items into the selected target order and recomputes subtotal/total from both source totals, preserving each item quantity.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | Order page menu grid and summary selectors must match actual DOM contracts | Confirm stable selectors or request `data-testid` |
| data | Live menu item availability may differ from source fixture assumptions | Align test-data samples with live seeded menu |
| sync | Cloud Report updates asynchronously after POS save in the source, with 180s wait and iframe navigation | Add live smoke with real Cloud Report frame selectors and polling before marking live verified |

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
| stage0/test_inventory.py | TestInventory | `test_set_inventory_no_send_kitchen` | tests/stage0/inventory.spec.ts | `InventoryFlow.saveAndEditUnsentInventoryOrder` |
| stage0/test_inventory.py | TestInventory | `test_set_inventory_send_kitchen` | tests/stage0/inventory.spec.ts | `InventoryFlow.voidSentInventoryOrderWithRestoreOptions` |
| stage0/test_inventory.py | TestInventory | `test_set_inventory_oder_decimal_num` | tests/stage0/inventory.spec.ts | `InventoryFlow.orderDecimalQuantityAndVoid` |
| stage0/test_inventory.py | TestInventory | `test_set_inventory_over_order` | tests/stage0/inventory.spec.ts | `InventoryFlow.readInsufficientStockAlert` |

### Preconditions

- POS home is open through `PosHomePage`.
- Inventory navigation uses the POS order-page Inventory entry point.
- Required stock dish, category, menu group, price, and inventory SKU exist in typed test data as `inventoryTrackedDish`.
- Offline harness can represent limited stock quantity, order saves, send-kitchen, edit, void, restore-inventory, and insufficient-stock alert state without live APIs.

### Steps

1. `InventoryFlow.saveAndEditUnsentInventoryOrder`: set `superman item4` to Limited Stock 20, order 10 and save, read Stock 10, recall/edit the order, add 5 more and save, read Stock 5, recall/edit again, reduce 1 item and save, then read Stock 6.
2. `InventoryFlow.voidSentInventoryOrderWithRestoreOptions`: set Limited Stock 20, order 10 and send to kitchen, read Stock 10, recall and void with Restore Inventory enabled, read Stock 20, order 5 and send to kitchen, read Stock 15, recall and void with Restore Inventory disabled, then read Stock 15.
3. `InventoryFlow.orderDecimalQuantityAndVoid`: set Limited Stock 10, order quantity 3.44 and send to kitchen, read floored Stock 6, recall and void with Restore Inventory enabled, then read Stock 10.
4. `InventoryFlow.readInsufficientStockAlert`: set Limited Stock 2, order quantity 3, save, and read the insufficient stock alert text.

### Expected Assertions

- POS-43898/POS-43890/POS-43889 verify unsent saved-order inventory changes: 20 -> 10 -> 5 -> 6.
- POS-43898/POS-43890/POS-43889 verify sent-order Void behavior honors Restore Inventory: 20 -> 10 -> 20, then 20 -> 15 -> 15 when restore is disabled.
- POS-43891 verifies decimal quantity 3.44 reduces displayed stock from 10 to floored Stock 6 and restores to Stock 10 after Void with restore enabled.
- POS-43892 verifies saving quantity 3 against stock 2 shows `Insufficient stock, please modify the order.\nsuperman item4: 2 remaining.`

### Page Responsibilities

- `InventoryPage.searchInventory`, `InventoryPage.openInventorySetting`, `InventoryPage.setLimitedStockQuantity`, `InventoryPage.saveInventoryConfig`, `InventoryPage.readItemState`, and `InventoryPage.backToOrderPage` own inventory configuration and state reads.
- `OrderDishesPage.openInventoryPage`, `OrderDishesPage.selectMenuGroup`, `OrderDishesPage.selectMenuCategory`, `OrderDishesPage.addMenuItem`, `OrderDishesPage.changeSelectedItemQuantity`, `OrderDishesPage.saveOrder`, `OrderDishesPage.saveOrderAndReadAlert`, `OrderDishesPage.sendAllToKitchen`, `OrderDishesPage.exitOrderPage`, and `OrderDishesPage.reduceSelectedItemQuantity` own order-side inventory interactions.
- `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, and `RecallPage.voidOrder` own recalled-order edit and void inventory paths.

### Client/Data Responsibilities

- `test-data/pos/dishes.ts` owns `inventoryTrackedDish` with source-equivalent name `superman item4`, category `Chicken Lunch E`, group `Lunch`, price `8.00`, and inventory SKU `INV-SUPERMAN-ITEM4`.
- No live client is called in round one; source `MenuAPI`/`TaxAPI` setup is represented by typed dish data and deterministic offline harness stock state.

### Stub Behavior

- Offline harness stores Limited Stock quantity in memory for the current browser page.
- Saving an inventory-tracked order deducts only the delta from the order's previously deducted quantity.
- Editing an unsent saved order and adding quantity deducts the added delta; reducing quantity restores one unit.
- Sending an inventory-tracked order to kitchen saves the order and deducts stock immediately.
- Recall Void with Restore Inventory enabled restores the order's deducted quantity; disabled restore leaves stock unchanged.
- Decimal stock deductions retain exact internal quantity but display `Stock: floor(remaining)`, matching the source expectation for 3.44.
- Saving beyond available stock does not create the order and renders the source-equivalent insufficient-stock alert.

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
