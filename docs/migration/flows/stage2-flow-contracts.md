# Stage2 Flow Contracts

These contracts gate migration for all active source rows under `stage2/*.py`.

## Advanced Order Operation Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_order_operation.py | TestOrderOperation | seat split including `test_seat_split_void_no_shared_item`, `test_seat_split_void_have_shared_item`, `test_seat_split_modify_tip`, `test_seat_split_close_unsplit`, `test_split_tip_reduce_item`, and `test_split_tip_discount_item`, amount/even split including `test_amount_split_semi_paid_add`, `test_amount_split_split`, `test_amount_split_semi_paid_unsplit`, `test_even_split_tip_unsplit`, `test_multi_pay_refund`, and `test_multi_amount_split`, void reason including `test_order_void_reason`, charge clear including `test_order_charge_clear`, discount clear including `test_whole_order_discount_clear`, tips, charge tax, charge edits, order copy/move/combine, split with zero suborder, send combo, option blank-click, language switch | tests/stage2/order-operation.spec.ts | `OrderEntryFlow.voidSecondSeatSplitSubOrderAndReadTip`, `OrderEntryFlow.preventVoidSeatSplitSubOrderWithSharedPaidItem`, `OrderEntryFlow.modifyFirstSeatSplitSubOrderTipAndReadTips`, `OrderEntryFlow.preventUnsplitSeatSplitOrderAfterPartialPayment`, `OrderEntryFlow.preventUnsplitAmountSplitOrderAfterPartialPayment`, `OrderEntryFlow.unsplitUnpaidAmountSplitOrder`, `OrderEntryFlow.preventUnsplitAmountSplitOrderAfterSemiPayment`, `OrderEntryFlow.unsplitEvenSplitOrderAfterEditingFirstSubOrderTip`, `OrderEntryFlow.reduceFirstSeatSplitSubOrderItemAndReadTips`, `OrderEntryFlow.discountFirstSeatSplitSubOrderItemAndReadTips`, `OrderEntryFlow.splitLargeOrderByMultipleAmountsAndReadTotals`, `OrderEntryFlow.openVoidReasonsForSavedOrderAndReadCount`, `OrderEntryFlow.clearChargesOnPaidDragSplitSubOrdersAndReadDetails`, `OrderEntryFlow.clearWholeOrderDiscountAndReadPriceDetail`, `SettlementFlow.refundEvenPayCreditAndCashPaymentsAndReadRecords`, `AdvancedOrderFlow.splitBySeat`, `AdvancedOrderFlow.splitByAmount`, `AdvancedOrderFlow.combineOrders`, `AdvancedOrderFlow.copyOrder`, `AdvancedOrderFlow.moveItemsOrOrder`, `AdvancedOrderFlow.refundByItemOrAmount`, `AdvancedOrderFlow.applyAndEditCharges`, `AdvancedOrderFlow.applyDiscountReason` |

### Preconditions

- POS entry and order creation follow stage0 contracts.
- Split, charge, discount, refund, and tip data are typed.
- Manual and auto charge configuration is represented by typed clients.
- Table/seat context is explicit when a source case uses `open_seat`.
- POS-19362 creates a Dine In order with guest count 2, `groupSwitchDish` assigned to seat 1, `categorySwitchDish` assigned to seat 2, and a 5.00 order tip before split.
- POS-19365 creates a Dine In order with guest count 2, one shared non-combo dish, one seat 1 non-combo dish, one seat 2 non-combo dish, and a 5.00 order tip before split.
- POS-19368 creates a Dine In order with guest count 2, one seat 1 dish, one seat 2 dish, and a 5.00 order tip before saving the seat split.
- POS-19371 creates a Dine In order with guest count 2, one seat 1 dish, one seat 2 dish, and a 5.00 order tip before attempting to cancel a partially paid seat split.
- POS-19374 creates a Dine In order with two non-combo dishes and a 5.00 order tip before amount splitting and partially paying suborder 1.
- POS-19377 creates a Dine In order with two non-combo dishes and a 5.00 order tip before amount splitting and canceling the split without payment.
- POS-19380 creates a Dine In order with two non-combo dishes and a 5.00 order tip before amount splitting and semi-paying suborder 1.
- POS-19383 creates a Dine In order with two non-combo dishes and a 5.00 order tip before even splitting, editing suborder 1 tip, and canceling the split.
- POS-19386 creates a Dine In order with guest count 2, two 5.00 dishes on seat 1, one 5.00 dish on seat 2, and a 6.00 order tip before seat splitting and reducing one item on suborder 1.
- POS-19389 creates a Dine In order with guest count 2, two 5.00 dishes on seat 1, one 5.00 dish on seat 2, and a 6.00 order tip before seat splitting and applying a 5.00 fixed item discount to suborder 1.
- POS-19517 creates a Dine In 11.00 tax-exempt one-item order before splitting settlement into two payments.
- POS-21845 creates a Dine In 200.00 one-item order before amount splitting into five fixed 20.00 suborders.
- POS-21855 creates a Dine In saved order with one non-combo dish before opening the Recall void reason chooser.
- POS-22813 creates a Dine In order with three non-combo dishes and a taxable 5% order charge before sending all items to kitchen and drag-splitting into three suborders.
- POS-23204 creates a Dine In order with six non-combo dishes before applying a 20% whole-order discount and 20% item discounts to all six dishes.

### Steps

1. Create source-equivalent order context with items, table/seat, charges, discounts, or payment state.
2. Execute the operation family: split, combine, copy, move, refund, charge edit, discount clear, send, or language switch.
3. Open affected order/suborder when needed.
4. Read numeric totals, item ownership, payment/refund state, charge/tip state, and visible prompts.
5. POS-19362 path: enter Dine In, set guest count 2, add one non-combo dish to seat 1, add one non-combo dish to seat 2, add tip 500 cents, save, open Recall, split by seat, cash-pay suborder 1, read suborder 1 tip, void suborder 2, reopen both suborders, and read suborder 1 tip plus suborder 2 status.
6. POS-19365 path: enter Dine In, set guest count 2, add one shared dish, add seat 1 and seat 2 dishes, add tip 500 cents, save, open Recall, split by seat, cash-pay suborder 1, open suborder 2, attempt suborder void, and read the blocking alert.
7. POS-19368 path: enter Dine In, set guest count 2, add seat 1 and seat 2 dishes, add tip 500 cents, save, open Recall, split by seat, save split, read suborder 2 tip, edit suborder 1, change tip to 600 cents, save, reopen both suborders, and read their tips.
8. POS-19371 path: enter Dine In, set guest count 2, add seat 1 and seat 2 dishes, add tip 500 cents, save, open Recall, split by seat, cash-pay suborder 1, reopen the split panel from the suborder list, click Unsplit, and read the blocking alert.
9. POS-19374 path: enter Dine In, add two non-combo dishes, add tip 500 cents, save, open Recall, split by custom amounts, confirm amount split, cash-pay 1.00 on suborder 1, reopen the split panel, click Unsplit, and read the blocking alert.
10. POS-19377 path: enter Dine In, add two non-combo dishes, add tip 500 cents, save, open Recall, split by custom amounts, confirm amount split, click Unsplit without payment, and read the split state.
11. POS-19380 path: enter Dine In, add two non-combo dishes, add tip 500 cents, save, open Recall, split by custom amounts, confirm amount split, cash-pay 1.00 on suborder 1 as a semi-payment, reopen the split panel, click Unsplit, and read the blocking alert.
12. POS-19383 path: enter Dine In, add two non-combo dishes, add tip 500 cents, save, open Recall, even split into two suborders, save the split, open suborder 1, edit its tip to 600 cents, save, reopen Recall, click Unsplit from the split panel, save, and read the parent order tip.
13. POS-19386 path: enter Dine In, set guest count 2, add two seat 1 dishes and one seat 2 dish, change all three dish prices to 5.00, add tip 600 cents, save, open Recall, split by seat, save, read suborder 1 tip, edit suborder 1, reduce one item, save, and read both suborder tips.
14. POS-19389 path: enter Dine In, set guest count 2, add two seat 1 dishes and one seat 2 dish, change all three dish prices to 5.00, add tip 600 cents, save, open Recall, split by seat, save, read suborder 1 tip, edit suborder 1, apply a 5.00 fixed amount discount to the first item, save, and read both suborder tips.
15. POS-19517 path: enter Dine In, add one non-combo dish, change its price to 11.00, void item tax, open settlement, split payment evenly into 2 payments, pay the first half by credit, reopen the saved order from Recall, complete the remaining half by cash, read payment records 1 and 2, refund payment records 1 and 2, and read payment records 3 and 4.
16. POS-21845 path: enter Dine In, add one non-combo dish, change its price to 200.00, save, open Recall, read parent total before amount split, input five 20.00 amount split rows, read parent total after split input, save the amount split, and read suborder 1 and 2 totals.
17. POS-21855 path: enter Dine In, add one non-combo dish, save the order, open Recall recent order, click Void, open the void reason chooser, and count displayed reason options.
18. POS-22813 path: enter Dine In, add three non-combo dishes, apply a 5% taxable order charge, send all, open Recall recent order, drag-split into three suborders, edit each suborder, clear its order charge, cash-pay it, then reopen suborders 1/2/3 and read status plus price detail text.
19. POS-23204 whole-order discount clear path: enter Dine In, add six non-combo dishes, open Discount, apply 20% whole-order discount, apply 20% item discount to all six line items, clear the whole-order discount, and read the order price detail text.

### Expected Assertions

- Split, combine, copy, and move operations preserve item ownership and totals.
- Charge and tax recalculations match source cases across manual/auto charge variants.
- Refund by item/amount honors tax, discount, charge, and payment constraints.
- Required/optional discount reasons display and persist correctly.
- Tip suggestions and credit-part-pay behavior match source calculations.
- POS-19362 verifies suborder 1 tip remains 5.00 after voiding suborder 2, and suborder 2 status becomes `Void`.
- POS-19365 verifies voiding suborder 2 is blocked after suborder 1 with a shared paid dish is paid, with alert `The order has paid dishes and cannot be voided!`.
- POS-19368 verifies suborder 1 tip changes to 6.00 and suborder 2 tip remains equal to its value before editing suborder 1.
- POS-19371 verifies canceling a split after one suborder has been paid is blocked with alert `The operation cannot be done due to partial payment! Please revoke the payment before preceeding.`
- POS-19374 verifies canceling an amount split after a 1.00 partial cash payment is blocked with alert `The operation cannot be done due to partial payment! Please revoke the payment before preceeding.`
- POS-19377 verifies canceling an unpaid amount split produces no alert and clears the split order list.
- POS-19380 verifies canceling an amount split after a 1.00 semi-payment is blocked with alert `The operation cannot be done due to partial payment! Please revoke the payment before preceeding.`
- POS-19383 verifies canceling an even split after editing suborder 1 tip merges the suborder tips back to parent order tip `8.50`.
- POS-19386 verifies changed-price seat split tip allocation starts at suborder 1 tip `4.00` and, after reducing one item on suborder 1, both suborder tips are `3.00`.
- POS-19389 verifies changed-price seat split tip allocation starts at suborder 1 tip `4.00` and, after applying a 5.00 fixed item discount on suborder 1, both suborder tips are `3.00`.
- POS-19517 verifies payment record 3 equals the negative amount of payment record 1, and payment record 4 equals the negative amount of payment record 2.
- POS-21845 verifies parent order total remains unchanged after entering amount split rows, and the first two saved suborder totals are both `20.00`.
- POS-21855 verifies the Void reason chooser displays exactly 7 reason options.
- POS-22813 verifies suborders 1, 2, and 3 are `Paid`, and each paid suborder price detail no longer contains `Charge`.
- POS-23204 verifies the order price detail no longer contains `Discount` after clearing the whole-order discount.

### Page Responsibilities

- `OrderDishesPage`, `SplitOrderPage`, `SettlementPage`, and `RecallPage` own UI actions and reads.
- Page objects expose numeric reads for all money fields.
- Page objects do not contain split/combine strategy; strategy stays in flows.
- POS-19362 uses `PosHomePage.open`, `PosHomePage.clickDineIn`, `PosHomePage.clickRecall`, `OrderDishesPage.setGuestCount`, `OrderDishesPage.selectSeat`, `OrderDishesPage.addMenuItem`, `OrderDishesPage.addTip`, `OrderDishesPage.saveOrder`, `RecallPage.openSplitOrder`, `RecallPage.splitBySeat`, `RecallPage.openSubOrder`, `RecallPage.settleSubOrder`, `RecallPage.payCurrentSubOrderByCash`, `RecallPage.readOrderTip`, `RecallPage.voidOrder`, and `RecallPage.readOrderStatus`.
- POS-19365 also uses `OrderDishesPage.selectSharedSeat` and `RecallPage.voidOrderAndReadAlert` for shared-item suborder void validation.
- POS-19368 also uses `RecallPage.saveSplit`, `RecallPage.clickEdit`, and `RecallPage.readOrderTip` to validate per-suborder tip persistence.
- POS-19371 also uses `RecallPage.unsplitAndReadAlert` to validate the blocked cancel-split action after partial payment.
- POS-19374 also uses `RecallPage.splitByAmounts`, `RecallPage.saveSplitAmountCreate`, and `RecallPage.payCurrentSubOrderByCashAmount` to validate custom amount split partial payment.
- POS-19377 also uses `RecallPage.splitByAmounts`, `RecallPage.saveSplitAmountCreate`, `RecallPage.unsplitAndReadAlert`, and `RecallPage.readSplitOrderPrices` to validate successful unpaid amount split cancellation.
- POS-19380 also uses `RecallPage.splitByAmounts`, `RecallPage.saveSplitAmountCreate`, `RecallPage.payCurrentSubOrderByCashAmount`, and `RecallPage.unsplitAndReadAlert` to validate custom amount split semi-payment cancellation guard.
- POS-19383 also uses `RecallPage.splitEvenly`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.clickEdit`, `RecallPage.unsplit`, and `RecallPage.readOrderTipText` to validate even-split tip merge behavior.
- POS-19386 also uses `OrderDishesPage.changeSelectedItemPrice`, `OrderDishesPage.reduceSelectedItemQuantity`, `RecallPage.splitBySeat`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderTipText` to validate seat-split tip redistribution after item reduction.
- POS-19389 also uses `OrderDishesPage.changeSelectedItemPrice`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.applySelectedItemsDiscountAmount`, `RecallPage.splitBySeat`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderTipText` to validate seat-split tip redistribution after item discount.
- POS-19517 also uses `OrderDishesPage.voidSelectedItemTax`, `OrderDishesPage.clickSettle`, `OrderDishesPage.splitPaymentEvenly`, `OrderDishesPage.settleByCredit`, `RecallPage.clickSettle`, `RecallPage.payCurrentOrderByCash`, `RecallPage.readPaymentRecordAmount`, and `RecallPage.refundPaymentRecord` to validate multi-payment refund record values.
- POS-21845 also uses `OrderDishesPage.changeSelectedItemPrice`, `RecallPage.openSplitOrder`, `RecallPage.readOrderTotal`, `RecallPage.splitByAmounts`, `RecallPage.saveSplit`, `RecallPage.saveSplitAmountCreate`, and `RecallPage.openSubOrder` to validate fixed amount split totals.
- POS-21855 also uses `RecallPage.openVoidReasonChooser` and `RecallPage.readVoidReasonCount` to validate the configured Void reason list.
- POS-22813 also uses `OrderDishesPage.applyOrderCharge`, `OrderDishesPage.sendAllToKitchen`, `OrderDishesPage.settleByCash`, `RecallPage.splitByDrag`, `RecallPage.clickEdit`, `RecallPage.openSubOrder`, `RecallPage.readOrderStatus`, and `RecallPage.readOrderPriceDetail` to validate per-suborder charge clearing after payment.
- POS-23204 also uses `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.selectOrderLineItems`, `OrderDishesPage.applySelectedItemsDiscountPercent`, `OrderDishesPage.clearWholeOrderDiscount`, and `OrderDishesPage.readOrderPriceDetail` to validate whole-order discount clearing.

### Client/Data Responsibilities

- `StubPosOrderClient` owns order graph, payment, refund, and charge state.
- `StubChargeClient` owns manual/auto charge setup.
- `test-data/pos/dishes.ts`, `test-data/pos/payments.ts`, and `test-data/pos/admin-settings.ts` own operation samples.
- POS-19362 uses `groupSwitchDish` and `categorySwitchDish` as the two seat-specific non-combo dishes and has no live client dependency in offline mode.
- POS-19365 uses `groupSwitchDish` as the shared dish plus `categorySwitchDish` and `posNameDisplayDish` as seat-specific dishes, with no live client dependency in offline mode.
- POS-19368 uses `groupSwitchDish` and `categorySwitchDish` as the two seat-specific non-combo dishes, with no live client dependency in offline mode.
- POS-19371 uses `groupSwitchDish` and `categorySwitchDish` as the two seat-specific non-combo dishes, with no live client dependency in offline mode.
- POS-19374 uses `groupSwitchDish` twice as the two non-combo dishes, with no live client dependency in offline mode.
- POS-19377 uses `groupSwitchDish` twice as the two non-combo dishes, with no live client dependency in offline mode.
- POS-19380 uses `groupSwitchDish` twice as the two non-combo dishes, with no live client dependency in offline mode.
- POS-19383 uses `groupSwitchDish` twice as the two non-combo dishes, with no live client dependency in offline mode.
- POS-19386 uses `groupSwitchDish` three times as the non-combo dishes for two seats, with no live client dependency in offline mode.
- POS-19389 uses `groupSwitchDish` three times as the non-combo dishes for two seats, with no live client dependency in offline mode.
- POS-19517 uses the stable `superman item1` non-combo dish from `test-data/pos/dishes.ts`, with no live client dependency in offline mode.
- POS-21845 uses `groupSwitchDish` as the source non-combo dish, with no live client dependency in offline mode.
- POS-21855 uses `groupSwitchDish` as the source non-combo dish, with no live client dependency in offline mode.
- POS-22813 uses `splitDiscountDishes` as the three source-equivalent non-combo dishes, with no live client dependency in offline mode.
- POS-23204 uses `groupSwitchDish` as the repeated source-equivalent non-combo dish, with no live client dependency in offline mode.

### Stub Behavior

- Stub mode models order graph operations deterministically.
- Stub refund/payment operations update explicit order state only through flow/client calls.
- POS-19362 stub behavior assigns added order items to the currently selected seat, creates split suborders from item seat ownership, marks cash-paid suborder state separately, and voids only the selected suborder so another suborder's tip remains unchanged.
- POS-19365 stub behavior marks explicitly shared items, includes shared items in each seat split suborder, and blocks voiding another suborder when a shared item already belongs to a paid suborder.
- POS-19368 stub behavior initializes per-suborder tip values from the original order tip, then updates only the selected suborder tip when editing a suborder.
- POS-19371 stub behavior marks the first suborder as paid and blocks Unsplit while any suborder status is `Paid`.
- POS-19374 stub behavior converts saved amount split prices into suborder statuses, records 1.00 cash as `Partially Paid`, and blocks Unsplit while any suborder status is `Paid` or `Partially Paid`.
- POS-19377 stub behavior permits Unsplit when no suborder is paid and clears the draft and saved split price lists.
- POS-19380 stub behavior reuses the amount split partial-payment guard and blocks Unsplit while the first suborder status is `Partially Paid`.
- POS-19383 stub behavior creates two even-split suborders with 2.50 tip each, persists suborder 1 tip as 6.00 after edit, and merges suborder tips to parent order tip 8.50 when the unpaid split is canceled.
- POS-19386 stub behavior tracks changed-price orders, allocates the 6.00 tip by seat subtotal as 4.00/2.00, clones suborder items during edit, and reallocates the tip as 3.00/3.00 after reducing suborder 1 subtotal to match suborder 2.
- POS-19389 stub behavior reuses changed-price seat split tip allocation, applies a 5.00 fixed amount discount to suborder 1's first item, and reallocates tips as 3.00/3.00 when suborder subtotals become equal.
- POS-19517 stub behavior records the first even-pay credit payment as a positive payment record, records the remaining cash payment as a second positive payment record, and appends refund records with the negative amount of the selected original payment record while preserving record ordering.
- POS-21845 stub behavior lets amount split dynamically add amount inputs, keeps the parent total unchanged while entering split rows, persists each fixed split amount as a suborder price, and displays fixed-price suborder totals even when amount split suborders do not own item rows.
- POS-21855 stub behavior keeps existing Void order status behavior and additionally renders a seven-option Void reason chooser after a successful Void action.
- POS-22813 stub behavior persists a 5% order charge on the sent parent order, creates three drag-split suborders from the three source dishes, records charge-cleared state per suborder during edit, marks each cash-paid suborder as `Paid`, and omits `Charge` from the paid suborder price detail when that suborder has been cleared.
- POS-23204 stub behavior renders whole-order Discount in order price detail when a 20% whole-order discount is active, applies selected-item percentage discounts to all selected line items, and removes the order-level Discount price detail when the whole-order discount is cleared.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| state | Live order graph operations can be eventually consistent | Add settled-state polling with `waitUntil` |
| external-device | Credit/tip/refund payment device behavior cannot be proven offline | Add device simulator or live fixture |
| selector | Split/refund/charge dialogs need stable DOM confirmation | Confirm selectors or request `data-testid` |
| POS-19362-live | Show Seat setting, Dine In seat selector, split-by-seat suborder order-number lookup, suborder cash payment, and void confirmation selectors are only stub-verified | Run live smoke for POS-19362 and record selector/data gaps before removing live gap |
| POS-19365-live | Shared item seat assignment, split-by-seat shared item allocation, paid suborder state, and sub_order_void alert selector are only stub-verified | Run live smoke for POS-19365 and record selector/data gaps before removing live gap |
| POS-19368-live | Split save, suborder card reopen, suborder edit, and per-suborder tip persistence selectors are only stub-verified | Run live smoke for POS-19368 and record selector/data gaps before removing live gap |
| POS-19371-live | Suborder list split button, suborder partial-payment state, and Unsplit blocking alert selector are only stub-verified | Run live smoke for POS-19371 and record selector/data gaps before removing live gap |
| POS-19374-live | Amount split keypad, suborder partial cash payment, settlement cancel confirmation, and Unsplit blocking alert selector are only stub-verified | Run live smoke for POS-19374 and record selector/data gaps before removing live gap |
| POS-19377-live | Amount split keypad, suborder list split button, and successful Unsplit state are only stub-verified | Run live smoke for POS-19377 and record selector/data gaps before removing live gap |
| POS-19380-live | Amount split keypad, suborder semi-payment state, settlement cancel confirmation, and Unsplit blocking alert selector are only stub-verified | Run live smoke for POS-19380 and record selector/data gaps before removing live gap |
| POS-19383-live | Even split save, suborder edit tip persistence, suborder-list split button, and combined parent tip display are only stub-verified | Run live smoke for POS-19383 and record selector/data gaps before removing live gap |
| POS-19386-live | Changed-price seat split tip allocation, reduce-item save, and suborder tip display are only stub-verified | Run live smoke for POS-19386 and record selector/data gaps before removing live gap |
| POS-19389-live | Changed-price seat split tip allocation, fixed item discount save, and suborder tip display are only stub-verified | Run live smoke for POS-19389 and record selector/data gaps before removing live gap |
| POS-19517-live | Even-pay settlement, credit test-only payment, cash tender, payment record refund action, and payment record ordering are only stub-verified | Run live smoke for POS-19517 and record selector/device/data gaps before removing live gap |
| POS-21845-live | Dynamic amount split rows, parent total display, amount split save confirmation, and fixed suborder total display are only stub-verified | Run live smoke for POS-21845 and record selector/data gaps before removing live gap |
| POS-21855-live | Void reason chooser and reason option count are only stub-verified | Run live smoke for POS-21855 and record selector/configuration gaps before removing live gap |
| POS-22813-live | Taxable 5% order charge selection, send-all state, drag split gesture, suborder edit charge-clear action, cash payment, and paid suborder price detail selector are only stub-verified | Run live smoke for POS-22813 and record selector/data gaps before removing live gap |
| POS-23204-whole-discount-clear-live | Whole-order discount dialog, multi-item discount selection, clear whole-order discount action, and order price detail selector are only stub-verified | Run live smoke for POS-23204 whole-order discount clear and record selector/data gaps before removing live gap |

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
| stage2/test_operate_item_inventory.py | TestOperateItemInventory | `test_check_invetory_of_kiosk_product_line`, `test_check_inventory_of_emenu_product_line`, auto-recovery inventory, OO preorder inventory | tests/stage2/operate-item-inventory.spec.ts | `ProductLineInventoryFlow.verifyProductLineInventory`, `ProductLineInventoryFlow.verifyEmenuProductLineInventory`, `ProductLineInventoryFlow.configureAutoRecovery`, `ProductLineInventoryFlow.verifyPreorderInventoryDeduction` |
| stage2/test_kiosk_interaction.py | TestKioskInteraction | Admin Kiosk Inventory sold-out sync to Admin Menu | tests/stage2/kiosk-interaction.spec.ts | `ProductLineInventoryFlow.syncKioskInventoryToAdminMenu` |

### Preconditions

- Product line samples exist for POS, Kiosk, Emenu, and OO.
- Inventory state is represented separately per product line.
- POS-43892 uses Kiosk product line item `Crabmeat Salad` with Limited Stock quantity `2`.
- POS-43893 uses Emenu product line item `Item5` with Limited Stock quantity `2`.
- Auto-recovery or preorder cases requiring clock/date control remain `live-gap` until controllable time is available.

### Steps

1. Configure product-line item inventory through Admin or typed client.
2. Open target product-line view: Kiosk, Emenu, OO, or Admin Menu.
3. Read item in-stock/out-of-stock state.
4. Execute source-specific order/preorder or recovery action.
5. Verify inventory sync or deduction.
6. POS-43892 path: enter POS Dine In, open Inventory, search KIOSK Item `Crabmeat Salad`, set Limited Stock `2`, open Kiosk To Go, add `Crabmeat Salad` 3 times, view order, checkout, skip optional info twice, pay cash, and assert the Kiosk sold-out popup is visible.
7. POS-43893 path: enter POS Dine In, open Inventory, search EMENU Item `Item5`, set Limited Stock `2`, open Emenu order page, select new category first item, increment quantity to `4`, add to cart, place order, and assert the Emenu sold-out popup is visible.

### Expected Assertions

- Kiosk and Emenu product lines show correct stock state.
- Admin Kiosk Inventory changes sync to Admin Menu where required.
- Preorder or recovery changes update inventory only when the source scenario requires it.
- POS-43892 must prove the business behavior, not only selectors: configured stock is `2`, requested Kiosk quantity is `3`, and the third add is blocked by a visible insufficient-stock/sold-out popup.
- POS-43893 must prove the business behavior, not only selectors: configured stock is `2`, requested Emenu quantity is `4`, and the fourth add is blocked by a visible insufficient-stock/sold-out popup.

### Page Responsibilities

- `InventoryPage`, `MenuAdminPage`, `KioskHomePage`, `EmenuMainPage`, and OO pages own surface-specific reads.
- POS-43892 uses `PosHomePage.open`, `PosHomePage.clickDineIn`, `OrderDishesPage.openInventoryPage`, `InventoryPage.searchInventory`, `InventoryPage.openInventorySetting`, `InventoryPage.setLimitedStockQuantity`, `InventoryPage.saveInventoryConfig`, `KioskHomePage.createCommonItem`, `KioskHomePage.openFromPosHomeUrl`, `KioskHomePage.selectLicense`, `KioskHomePage.chooseToGoOrderType`, `KioskHomePage.addItem`, `KioskHomePage.viewOrder`, `KioskHomePage.checkout`, `KioskHomePage.skipOptionalInfo`, `KioskHomePage.cashPayment`, and `KioskHomePage.isSoldOutPopupVisible`.
- POS-43893 uses `PosHomePage.open`, `PosHomePage.clickDineIn`, `OrderDishesPage.openInventoryPage`, `InventoryPage.searchInventory`, `InventoryPage.openInventorySetting`, `InventoryPage.setLimitedStockQuantity`, `InventoryPage.saveInventoryConfig`, `EmenuOrderPage.createFirstCategoryItem`, `EmenuMainPage.openAndStartOrder`, `EmenuOrderPage.orderNewCategoryFirstItem`, and `EmenuOrderPage.isSoldOutPopupVisible`.
- Cross-product-line sync rules stay in flows and clients.

### Client/Data Responsibilities

- `StubMenuClient` owns item availability and product-line inventory limits by product line.
- `test-data/pos/dishes.ts` owns inventory-sensitive item samples.
- POS-43892 uses `kioskLimitedStockDish`.
- POS-43893 uses `emenuLimitedStockDish`.
- `test-data/pos/pos-enums.ts` owns product-line enum values.

### Stub Behavior

- Stub product-line inventory is isolated per product line.
- Stub sync must be explicit and traceable from the flow method.
- Offline Kiosk cart rejects the third matching item when `offlineInventoryRecords[Crabmeat Salad].quantity` is `2`.
- Offline Emenu item quantity rejects the fourth matching item when `offlineInventoryRecords[Item5].quantity` is `2`.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| time | Auto-recovery depends on local/system time | Add controllable clock or mark scoped live gap |
| cross-system | OO/Kiosk/Emenu surfaces need environment config | Define URLs and selectors per surface |
| POS-43892-live | Real KIOSK inventory page selectors, `Crabmeat Salad` fixture data, Kiosk sold-out popup selector, and Admin-to-Kiosk inventory sync are not exercised in first-round offline mode | Run live Kiosk product-line inventory smoke for Limited Stock 2 and third-add sold-out popup |
| POS-43893-live | Real EMENU inventory page selectors, `Item5` fixture data, Emenu add-item and sold-out popup selectors, and POS-to-Emenu inventory sync are not exercised in first-round offline mode | Run live Emenu product-line inventory smoke for Limited Stock 2 and fourth-add sold-out popup |

## Kiosk, Emenu, And SDI Interaction Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_kiosk_interaction.py | TestKioskInteraction | `test_global_takeout_tax_exemption`, `test_kiosk_login_and_license_display`, `test_dish_availability_sync_from_admin_kiosk_inventory_to_admin_menu`, `test_kiosk_order_bind_member_and_redeem_gift_dish_in_pos`, service charge/tax | tests/stage2/kiosk-interaction.spec.ts | `KioskInteractionFlow.placeKioskTogoCashOrderAndReadRecallTax`, `KioskInteractionFlow.verifyKioskLicenseList`, `KioskInteractionFlow.markKioskItemSoldOutAndReadMenuApiState`, `KioskInteractionFlow.bindKioskOrderToCrmMemberAndRedeemGiftDish` |
| stage2/test_recall_page.py | TestRecallSearchByTime | `test_clear_sdi_convinience_fee_by_pos`, `test_sdi_order_item_togo_flag_display_in_pos`, `test_emenu_edit_search` | tests/stage2/recall-page.spec.ts | `ExternalOrderFlow.createSdiOrder`, `ExternalOrderFlow.createEmenuOrder`, `ExternalOrderFlow.verifyExternalOrderInRecall` |

### Preconditions

- Kiosk, Emenu, and SDI base URLs are configured separately from POS home URL.
- License list, tax exemption, service charge, convenience fee, and CRM member samples are typed.
- External order IDs are stored through stub order/client state.
- POS-20995 starts with `adminSettings.takeoutTaxExempt=true`, a Kiosk item `kiosk_item` priced at 10, and an empty Recall order list.
- POS-24842 starts with `StubRestaurantClient.getAllLicenseNames(posLicenseTypes.kiosk, false)` returning every Kiosk-type license, including in-use licenses, and excluding PC licenses.
- POS-36267 starts with Kiosk inventory fixture enabled and `kioskInventoryDish` available in `Chinese Food/Appetizers` for product line `KIOSK`.
- POS-36269 starts with `kioskInventoryDish` priced at 10, `crmSourceRewardMember` searchable by phone `(64)673-37557`, and a redeem gift dish represented by `crmRedeemItemDish`.

### Steps

1. Open external surface through its configured entry.
2. Place order or validate license list according to source case.
3. Return to POS/Recall through UI navigation.
4. Bind member, clear fee, validate tax/togo flag, or redeem item.
5. Read POS Recall/order card and external surface state.

For `KioskInteractionFlow.placeKioskTogoCashOrderAndReadRecallTax`:

1. Enable global Takeout tax exemption through `StubAdminSettingsClient.setSetting`.
2. Open POS home and sync the offline Kiosk tax setting and common Kiosk item fixture into the DOM harness.
3. Open Kiosk, select license, choose To Go, add `Chinese Food/Appetizers/kiosk_item`, view order, checkout, skip optional info twice, and pay by cash.
4. Return to POS home, enter Recall, open the most recent synced Kiosk order, and read Recall Tax text.
5. Disable the setting after the assertion path has captured the result.

For `KioskInteractionFlow.verifyKioskLicenseList`:

1. Read all Kiosk-type license names from `StubRestaurantClient.getAllLicenseNames(posLicenseTypes.kiosk, false)`.
2. Open POS home and sync that deterministic license list into the offline Kiosk login surface.
3. Open Kiosk and read every displayed license name from the login list.
4. Sort both lists and return them to the spec for equality assertion.

For `KioskInteractionFlow.markKioskItemSoldOutAndReadMenuApiState`:

1. Open POS home and enter Admin.
2. Enter Admin Kiosk page and mark `kioskInventoryDish.name` as sold out.
3. Persist the same out-of-stock state into `StubMenuClient` for product line `KIOSK`, group `Chinese Food`, and category `Appetizers`.
4. Read Kiosk product-line dish availability through `StubMenuClient.getAllAvailableDishInfosOfCategoryAndGroup`.
5. Return the `kiosk_item` availability record to the spec.

For `KioskInteractionFlow.bindKioskOrderToCrmMemberAndRedeemGiftDish`:

1. Create a Kiosk To Go cash-paid order with `kioskInventoryDish`.
2. Return to POS, open Recall, open the recent synced Kiosk order, and edit it.
3. Open CRM Redeem, bind `crmSourceRewardMember.phone`, and record the pre-redeem point balance.
4. Reopen CRM Redeem, apply `crmRedeemItemDish`, quit Redeem, and save the edited order.
5. Reopen Recall recent order and return the redeemed item price, order subtotal, and post-redeem point balance.

### Expected Assertions

- Kiosk license list contains only Kiosk-type licenses.
- POS-24842 requires the Kiosk login list to match the POS API Kiosk license names exactly after sorting and to exclude non-Kiosk license types.
- POS-36267 requires `kiosk_item.outOfStock` to be `true` in the Kiosk Menu API availability response after Admin Kiosk inventory marks it sold out.
- POS-36269 requires the redeemed gift dish price to be `0`, Recall subtotal to remain `10`, and CRM points after redeem to equal the pre-redeem balance minus `10`.
- Kiosk togo tax exemption and service charge calculations match source behavior.
- POS-20995 requires Recall Tax text to be exactly `--` for the Kiosk To Go cash order when global Takeout tax exemption is enabled.
- Kiosk order can bind CRM member and redeem gift dish in POS.
- SDI convenience fee clear and togo item flag display correctly in POS.
- Emenu edit/search behavior is traceable in POS Recall.

### Page Responsibilities

- `KioskHomePage`, `EmenuMainPage`, `EmenuOrderPage`, `SdiOrderDetailPage`, and `SdiCheckoutPage` own external surface actions.
- `RecallPage`, `OrderDishesPage`, and `PosCrmPage` own POS-side verification.
- POS-20995 uses `KioskHomePage.applyOfflineTakeoutTaxExempt`, `KioskHomePage.createCommonItem`, `KioskHomePage.openFromPosHomeUrl`, `KioskHomePage.selectLicense`, `KioskHomePage.chooseToGoOrderType`, `KioskHomePage.addItem`, `KioskHomePage.viewOrder`, `KioskHomePage.checkout`, `KioskHomePage.skipOptionalInfo`, `KioskHomePage.cashPayment`, `PosHomePage.open`, `PosHomePage.clickRecall`, `RecallPage.openRecentOrder`, and `RecallPage.readOrderTaxText`.
- POS-24842 uses `PosHomePage.open`, `KioskHomePage.applyOfflineKioskLicenseNames`, `KioskHomePage.openFromPosHomeUrl`, and `KioskHomePage.readAllKioskLicenseNames`.
- POS-36267 uses `PosHomePage.open`, `PosHomePage.clickAdmin`, `AdminPage.enterKiosk`, and `AdminPage.setKioskItemSoldOut`.
- POS-36269 uses `PosHomePage.open`, `PosHomePage.clickRecall`, Kiosk order creation methods, `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, `PosCrmPage.openRedeem`, `PosCrmPage.selectMemberByPhone`, `PosCrmPage.readHeaderPointBalance`, `PosCrmPage.applyRedeemItem`, `PosCrmPage.quitRedeem`, `OrderDishesPage.saveOrder`, `RecallPage.readCrmPointBalance`, `RecallPage.readAllOrderItems`, and `RecallPage.readOrderSubtotal`.

### Client/Data Responsibilities

- `StubRestaurantClient` and `StubChargeClient` own tax/charge setup.
- `StubPosOrderClient` owns external order import state.
- `StubCrmRewardClient` owns member/redeem behavior.
- POS-20995 uses `StubAdminSettingsClient.setSetting`, `StubAdminSettingsClient.readSetting`, and `test-data/pos/admin-settings.ts` field `takeoutTaxExempt`.
- POS-24842 uses `StubRestaurantClient.getAllLicenseNames`, `test-data/pos/licenses.ts`, and `posLicenseTypes.kiosk`.
- POS-36267 uses `StubMenuClient.setDishOutOfStock`, `StubMenuClient.getAllAvailableDishInfosOfCategoryAndGroup`, and `test-data/pos/dishes.ts` field `kioskInventoryDish`.
- POS-36269 uses `StubCrmRewardClient.findMemberByPhone`, `test-data/pos/dishes.ts` fields `kioskInventoryDish` and `crmRedeemItemDish`, plus `test-data/crm/members.ts` field `crmSourceRewardMember`.

### Stub Behavior

- Stub external orders are created as POS-visible order records.
- Stub license list is deterministic and product-line filtered.
- POS-20995 persists the Kiosk paid order into offline saved-order state so that a POS page reload can open the synced order from Recall and expose `recall-order-tax`.
- POS-24842 renders the filtered Kiosk license names into `kiosk-license-name` elements and intentionally keeps the PC license out of the Kiosk login list.
- POS-36267 renders an Admin Kiosk sold-out control and mirrors that state into the MenuClient product-line availability model.
- POS-36269 persists the Kiosk cash order into Recall, allows editing it as a POS order, binds the selected CRM member, deducts 10 points when the redeem item is applied, saves the edited order, and exposes the redeemed 0-price item in Recall.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| environment | Kiosk/Emenu/SDI may require separate deploy URLs and auth | Add environment config and fixtures |
| selector | External surfaces need DOM selector confirmation | Confirm selectors or request `data-testid` |
| payment-device | Kiosk card/payment paths may require devices | Add simulator/live fixture |
| POS-20995-live | Real AdminSettingAPI, Kiosk license/order-type/menu/cart/checkout/cash selectors, cross-tab sync timing, and Recall tax selector are not exercised in first-round offline mode | Run live Kiosk To Go smoke and record selector/data/environment gaps before closing live validation |
| POS-24842-live | Real PosAPI license response, Kiosk login URL/auth, license-list selector, and product-line filtering are not exercised in first-round offline mode | Run live Kiosk login smoke and compare UI list with `get_all_license_names(license_type=KIOSK, unused_only=False)` |
| POS-36267-live | Real `food_sold_out_switch`, Admin Kiosk inventory selectors, MenuAPI KIOSK availability response, and admin-menu sync timing are not exercised in first-round offline mode | Run live Admin Kiosk inventory smoke and compare MenuAPI KIOSK item availability |
| POS-36269-live | Real Kiosk order sync timing, Recall edit selector, CRM member search, redeem gift item selector, save behavior, and cross-app order state are not exercised in first-round offline mode | Run live Kiosk paid-order to POS Recall edit smoke and record selector/data/environment gaps |
