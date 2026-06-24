# Stage2 Flow Contracts

These contracts gate migration for all active source rows under `stage2/*.py`.

## Advanced Order Operation Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_order_operation.py | TestOrderOperation | seat split, amount/even split, semi-pay, multi-pay, refund, void reason, charge clear, discount clear, tips, charge tax, charge edits, order copy/move/combine, split with zero suborder, send combo, option blank-click, language switch | tests/stage2/order-operation.spec.ts | `AdvancedOrderFlow.splitBySeat`, `AdvancedOrderFlow.splitByAmount`, `AdvancedOrderFlow.combineOrders`, `AdvancedOrderFlow.copyOrder`, `AdvancedOrderFlow.moveItemsOrOrder`, `AdvancedOrderFlow.refundByItemOrAmount`, `AdvancedOrderFlow.applyAndEditCharges`, `AdvancedOrderFlow.applyDiscountReason` |

### Preconditions

- POS entry and order creation follow stage0 contracts.
- Split, charge, discount, refund, and tip data are typed.
- Manual and auto charge configuration is represented by typed clients.
- Table/seat context is explicit when a source case uses `open_seat`.

### Steps

1. Create source-equivalent order context with items, table/seat, charges, discounts, or payment state.
2. Execute the operation family: split, combine, copy, move, refund, charge edit, discount clear, send, or language switch.
3. Open affected order/suborder when needed.
4. Read numeric totals, item ownership, payment/refund state, charge/tip state, and visible prompts.

### Expected Assertions

- Split, combine, copy, and move operations preserve item ownership and totals.
- Charge and tax recalculations match source cases across manual/auto charge variants.
- Refund by item/amount honors tax, discount, charge, and payment constraints.
- Required/optional discount reasons display and persist correctly.
- Tip suggestions and credit-part-pay behavior match source calculations.

### Page Responsibilities

- `OrderDishesPage`, `SplitOrderPage`, `SettlementPage`, and `RecallPage` own UI actions and reads.
- Page objects expose numeric reads for all money fields.
- Page objects do not contain split/combine strategy; strategy stays in flows.

### Client/Data Responsibilities

- `StubPosOrderClient` owns order graph, payment, refund, and charge state.
- `StubChargeClient` owns manual/auto charge setup.
- `test-data/pos/dishes.ts`, `test-data/pos/payments.ts`, and `test-data/pos/admin-settings.ts` own operation samples.

### Stub Behavior

- Stub mode models order graph operations deterministically.
- Stub refund/payment operations update explicit order state only through flow/client calls.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| state | Live order graph operations can be eventually consistent | Add settled-state polling with `waitUntil` |
| external-device | Credit/tip/refund payment device behavior cannot be proven offline | Add device simulator or live fixture |
| selector | Split/refund/charge dialogs need stable DOM confirmation | Confirm selectors or request `data-testid` |

## Recall Search, Sort, Edit, And Card Detail Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_recall.py | TestRecallSearchByTime | time filters, fixed filters, unpaid/paid/all filters, status sorting | tests/stage2/recall.spec.ts | `RecallSearchFlow.filterByDateRange`, `RecallSearchFlow.filterByStatus`, `RecallSearchFlow.sortOrders` |
| stage2/test_recall_page.py | TestRecallSearchByTime | sort by time/price/type/order/phone/payment/driver, charge modifications reflected in recall, paid/in-kitchen reminders, order-id search, driver switch, keep order sequence, print/auto-send, void unpaid, daily-close columns, merged order retention, phone formatting, tips, SDI/Emenu recall cases | tests/stage2/recall-page.spec.ts | `RecallSearchFlow.searchAndSort`, `RecallEditFlow.editRecalledOrder`, `RecallEditFlow.verifyRecallCard`, `RecallEditFlow.verifyReminder`, `RecallEditFlow.verifyExternalOrderRecall` |

### Preconditions

- Recall state is seeded by POS order flow, SDI/Emenu flow, or stub order client.
- Order date/time, payment status, driver, phone, charge, and receipt samples are typed.
- Caller-id and external order metadata are represented by typed client/page boundaries.

### Steps

1. Open Recall from POS home.
2. Apply source-specified time, fixed, status, sort, or search filters.
3. Select the target order/card.
4. Edit charges, tips, tax, table, phone, driver, item, or order state when required.
5. Read card, detail, receipt, reminder, or external-order metadata.

### Expected Assertions

- Recall filters and sort order match source expectations.
- Card and detail amounts remain consistent after charge/tip/tax/order edits.
- Paid, unpaid, in-kitchen, void, merged, and printed states match source cases.
- Phone, driver, table, receipt, and external SDI/Emenu metadata display correctly.
- Order sequence remains stable where the source requires it.

### Page Responsibilities

- `RecallPage` owns filters, sort controls, order cards, and search controls.
- `RecallOrderDetailSection` owns detail panel, receipt, and line-item reads.
- `OrderDishesPage` and `SettlementPage` own edits reached from Recall.

### Client/Data Responsibilities

- `StubPosOrderClient` owns recall query data and order mutations.
- `StubChargeClient` owns charge setup variants.
- `test-data/pos/reports.ts` owns date/time filter samples.
- `test-data/pos/customers.ts` owns phone/name samples.

### Stub Behavior

- Stub recall query filters deterministic in-memory order records.
- Stub edit operations update recall card/detail data through named client methods.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| data | Recall search/sort requires seeded order history across dates/statuses | Add deterministic order seeding client |
| external-source | SDI/Emenu orders require separate surface setup | Define SDI/Emenu order client/page contracts |
| selector | Recall filters/cards/details need stable DOM selectors | Confirm selectors or request `data-testid` |

## Product-Line Inventory Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_operate_item_inventory.py | TestOperateItemInventory | kiosk product-line inventory, emenu product-line inventory, auto-recovery inventory, OO preorder inventory | tests/stage2/operate-item-inventory.spec.ts | `ProductLineInventoryFlow.verifyProductLineInventory`, `ProductLineInventoryFlow.configureAutoRecovery`, `ProductLineInventoryFlow.verifyPreorderInventoryDeduction` |
| stage2/test_kiosk_interaction.py | TestKioskInteraction | Admin Kiosk Inventory sold-out sync to Admin Menu | tests/stage2/kiosk-interaction.spec.ts | `ProductLineInventoryFlow.syncKioskInventoryToAdminMenu` |

### Preconditions

- Product line samples exist for POS, Kiosk, Emenu, and OO.
- Inventory state is represented separately per product line.
- Auto-recovery or preorder cases requiring clock/date control remain `live-gap` until controllable time is available.

### Steps

1. Configure product-line item inventory through Admin or typed client.
2. Open target product-line view: Kiosk, Emenu, OO, or Admin Menu.
3. Read item in-stock/out-of-stock state.
4. Execute source-specific order/preorder or recovery action.
5. Verify inventory sync or deduction.

### Expected Assertions

- Kiosk and Emenu product lines show correct stock state.
- Admin Kiosk Inventory changes sync to Admin Menu where required.
- Preorder or recovery changes update inventory only when the source scenario requires it.

### Page Responsibilities

- `InventoryPage`, `MenuAdminPage`, `KioskHomePage`, `EmenuMainPage`, and OO pages own surface-specific reads.
- Cross-product-line sync rules stay in flows and clients.

### Client/Data Responsibilities

- `StubPosMenuClient` owns item availability by product line.
- `test-data/pos/dishes.ts` owns inventory-sensitive item samples.
- `test-data/pos/pos-enums.ts` owns product-line enum values.

### Stub Behavior

- Stub product-line inventory is isolated per product line.
- Stub sync must be explicit and traceable from the flow method.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| time | Auto-recovery depends on local/system time | Add controllable clock or mark scoped live gap |
| cross-system | OO/Kiosk/Emenu surfaces need environment config | Define URLs and selectors per surface |

## Kiosk, Emenu, And SDI Interaction Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_kiosk_interaction.py | TestKioskInteraction | kiosk togo tax exemption, kiosk login/license display, service charge/tax, kiosk order bind member and redeem gift dish | tests/stage2/kiosk-interaction.spec.ts | `KioskInteractionFlow.placeKioskOrder`, `KioskInteractionFlow.verifyKioskLicenseList`, `KioskInteractionFlow.bindKioskOrderToCrmMember` |
| stage2/test_recall_page.py | TestRecallSearchByTime | `test_clear_sdi_convinience_fee_by_pos`, `test_sdi_order_item_togo_flag_display_in_pos`, `test_emenu_edit_search` | tests/stage2/recall-page.spec.ts | `ExternalOrderFlow.createSdiOrder`, `ExternalOrderFlow.createEmenuOrder`, `ExternalOrderFlow.verifyExternalOrderInRecall` |

### Preconditions

- Kiosk, Emenu, and SDI base URLs are configured separately from POS home URL.
- License list, tax exemption, service charge, convenience fee, and CRM member samples are typed.
- External order IDs are stored through stub order/client state.

### Steps

1. Open external surface through its configured entry.
2. Place order or validate license list according to source case.
3. Return to POS/Recall through UI navigation.
4. Bind member, clear fee, validate tax/togo flag, or redeem item.
5. Read POS Recall/order card and external surface state.

### Expected Assertions

- Kiosk license list contains only Kiosk-type licenses.
- Kiosk togo tax exemption and service charge calculations match source behavior.
- Kiosk order can bind CRM member and redeem gift dish in POS.
- SDI convenience fee clear and togo item flag display correctly in POS.
- Emenu edit/search behavior is traceable in POS Recall.

### Page Responsibilities

- `KioskHomePage`, `EmenuMainPage`, `EmenuOrderPage`, `SdiOrderDetailPage`, and `SdiCheckoutPage` own external surface actions.
- `RecallPage`, `OrderDishesPage`, and `PosCrmPage` own POS-side verification.

### Client/Data Responsibilities

- `StubRestaurantClient` and `StubChargeClient` own tax/charge setup.
- `StubPosOrderClient` owns external order import state.
- `StubCrmRewardClient` owns member/redeem behavior.

### Stub Behavior

- Stub external orders are created as POS-visible order records.
- Stub license list is deterministic and product-line filtered.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| environment | Kiosk/Emenu/SDI may require separate deploy URLs and auth | Add environment config and fixtures |
| selector | External surfaces need DOM selector confirmation | Confirm selectors or request `data-testid` |
| payment-device | Kiosk card/payment paths may require devices | Add simulator/live fixture |
