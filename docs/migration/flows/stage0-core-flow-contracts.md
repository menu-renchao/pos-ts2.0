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

## OrderEntryFlow

### Source Coverage

| source_file | source_class | source_test_pattern | target_spec | target_flow_method |
|---|---|---|---|---|
| stage0/test_order_page.py | all `Test*` classes | add dishes, modify items, save orders, validate order totals | tests/stage0/order-page.spec.ts | `OrderEntryFlow.createTogoOrder` |
| stage0/test_order_settle.py | all `Test*` classes | create payable orders before settlement | tests/stage0/order-settle.spec.ts | `OrderEntryFlow.createTogoOrder` |

### Preconditions

- `PosEntryFlow` has reached POS home.
- Order type is selected through UI navigation, not by direct URL.
- Required dish, option, combo, quantity, and price samples exist in `test-data/pos`.
- Stub DB/order clients can remember the generated order number.

### Steps

1. Enter the order page from POS home.
2. Select the requested order type, defaulting to no-table Togo when the source case does not require table selection.
3. Add source-equivalent dishes, options, combos, or quantities.
4. Apply item-level operations required by the source case.
5. Read order summary values as numbers.
6. Save or continue to settlement according to the source case.

### Expected Assertions

- Added items are visible in the order summary.
- Quantity, subtotal, tax, discount, charge, and total values match the source case expectation.
- Saved orders expose a traceable order number through page read or stub DB client.
- Item operations preserve source behavior such as hold, void, discount, combo, and option pricing where relevant.

### Page Responsibilities

- `OrderDishesPage` owns page-level order actions and aggregate reads.
- `MenuGridSection` owns menu category/group/dish selection.
- `ItemActionsSection` owns item-level actions.
- `OrderSummarySection` owns numeric summary reads and line-item reads.

### Client/Data Responsibilities

- `test-data/pos/dishes.ts` owns dish, combo, option, and inventory sample data.
- `test-data/pos/payments.ts` owns expected payment/tender values reused by settlement.
- `StubPosOrderClient` or `StubPosDbClient` owns generated order identity in stub mode.

### Stub Behavior

- Stub order identity is deterministic and does not require a live DB.
- Stub clients do not validate menu availability against live APIs.

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
