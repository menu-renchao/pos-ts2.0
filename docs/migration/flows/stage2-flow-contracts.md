# Stage2 Flow Contracts

These contracts gate migration for all active source rows under `stage2/*.py`.

## Advanced Order Operation Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| stage2/test_order_operation.py | TestOrderOperation | seat split including `test_seat_split_void_no_shared_item`, `test_seat_split_void_have_shared_item`, `test_seat_split_modify_tip`, `test_seat_split_close_unsplit`, `test_split_tip_reduce_item`, and `test_split_tip_discount_item`, amount/even split including `test_amount_split_semi_paid_add`, `test_amount_split_split`, `test_amount_split_semi_paid_unsplit`, `test_even_split_tip_unsplit`, `test_even_split_tip`, `test_multi_pay_refund`, and `test_multi_amount_split`, void reason including `test_order_void_reason`, charge clear including `test_order_charge_clear`, discount clear including `test_whole_order_discount_clear`, `test_item_discount_clear`, and `test_order_discount_clear_all`, tips/fee/report including `test_sub_settle_add_tip`, `test_chargefee`, and `test_report_homepage_unpaid`, No global option and copy including `test_no_option`, non-taxable order charge combine including `test_order_charge_not_tax`, taxable order charge combine including `test_order_charge_tax`, charge edit including `test_order_edit_after_modify_charge_name`, `test_order_edit_after_modify_charge_rate_type_to_percent`, `test_order_edit_after_modify_charge_rate_type_to_amount`, `test_order_edit_after_modify_charge_amount_value`, `test_order_edit_after_modify_charge_percent_value`, `test_order_edit_after_modify_charge_tax`, `test_order_edit_after_modify_charge_order_type1`, `test_order_edit_after_delete_charge`, `test_order_edit_after_modify_auto_charge_name`, `test_order_edit_after_modify_auto_charge_rate_type_percent`, `test_order_edit_after_modify_auto_charge_rate_type_amount`, `test_order_edit_after_modify_auto_charge_amount`, `test_order_edit_after_modify_auto_charge_percent`, `test_order_edit_after_modify_auto_charge_type`, `test_order_edit_after_modify_auto_charge_tax`, `test_order_edit_after_delete_auto_charge`, `test_order_send_after_modify_auto_charge`, `test_edit_send_after_modify_manu_charge`, `test_edit_send_after_modify_auto_charge`, `test_order_split_after_modify_auto_charge`, `test_edit_split_after_modify_manu_charge`, `test_edit_split_after_modify_auto_charge`, `test_order_copy_after_modify_auto_charge`, `test_order_copy_after_modify_auto_charge_min_guest`, `test_order_copy_after_modify_auto_charge_min_guest2`, `test_order_copy_after_modify_auto_charge_min_mile`, `test_order_copy_after_modify_auto_charge_trigger`, `test_order_copy_after_modify_manu_charge_trigger1`, `test_order_copy_after_modify_manu_charge_trigger2`, `test_order_combine_after_modify_charge`, `test_item_move_new_after_modify_charge`, `test_item_move_select_after_modify_charge`, `test_order_move_after_modify_charge`, `test_order_move_after_delete_charge`, and `test_order_creditpay_addtips`, order copy/move/combine, split with zero suborder, send combo, option blank-click, language switch | tests/stage2/order-operation.spec.ts | `OrderEntryFlow.voidSecondSeatSplitSubOrderAndReadTip`, `OrderEntryFlow.preventVoidSeatSplitSubOrderWithSharedPaidItem`, `OrderEntryFlow.modifyFirstSeatSplitSubOrderTipAndReadTips`, `OrderEntryFlow.preventUnsplitSeatSplitOrderAfterPartialPayment`, `OrderEntryFlow.preventUnsplitAmountSplitOrderAfterPartialPayment`, `OrderEntryFlow.unsplitUnpaidAmountSplitOrder`, `OrderEntryFlow.preventUnsplitAmountSplitOrderAfterSemiPayment`, `OrderEntryFlow.unsplitEvenSplitOrderAfterEditingFirstSubOrderTip`, `OrderEntryFlow.addCashTipToFirstPaidEvenSplitSubOrder`, `OrderEntryFlow.reduceFirstSeatSplitSubOrderItemAndReadTips`, `OrderEntryFlow.discountFirstSeatSplitSubOrderItemAndReadTips`, `OrderEntryFlow.splitLargeOrderByMultipleAmountsAndReadTotals`, `OrderEntryFlow.openVoidReasonsForSavedOrderAndReadCount`, `OrderEntryFlow.clearChargesOnPaidDragSplitSubOrdersAndReadDetails`, `OrderEntryFlow.clearWholeOrderDiscountAndReadPriceDetail`, `OrderEntryFlow.clearThirdItemDiscountAndReadItemText`, `OrderEntryFlow.clearRecalledItemDiscountsAndReadPrices`, `OrderEntryFlow.createAutoChargeAsTipOrderSplitByAmountAndReadReportFees`, `OrderEntryFlow.refundCreditPaymentAndReadReportHomepageUnpaid`, `OrderEntryFlow.partiallyPayTaxExemptOrderAddTipAndReadStatus`, `OrderEntryFlow.addNoPriceGlobalOptionCopyOrderAndReadTotals`, `OrderEntryFlow.combineTwoTaxExemptOrdersWithNonTaxableChargeAndReadTotals`, `OrderEntryFlow.combineTwoTaxExemptOrdersWithTaxableChargeAndReadTotals`, `OrderEntryFlow.renameManualFixedChargeThenReapplyInRecalledOrder`, `OrderEntryFlow.convertManualFixedChargeToPercentThenReapplyInRecalledOrder`, `OrderEntryFlow.convertManualPercentChargeToFixedThenConfirmInRecalledOrder`, `OrderEntryFlow.modifyManualFixedChargeAmountThenConfirmInRecalledOrder`, `OrderEntryFlow.modifyManualPercentChargeValueThenConfirmInRecalledOrder`, `OrderEntryFlow.modifyManualFixedChargeTaxedThenConfirmInRecalledOrder`, `OrderEntryFlow.keepManualFixedChargeWhenOrderTypeStillMatchesAfterEdit`, `OrderEntryFlow.keepExistingManualFixedChargeWhenOrderTypeNoLongerMatchesAfterEdit`, `OrderEntryFlow.deleteAllManualChargesThenKeepLegacySelectionInRecalledOrder`, `OrderEntryFlow.sendKitchenFromEditAfterModifyingManualFixedCharge`, `OrderEntryFlow.saveEditAfterModifyingAutoFixedCharge`, `OrderEntryFlow.renameAutoFixedChargeThenReadRecalledOrderCharge`, `OrderEntryFlow.convertAutoFixedChargeToPercentThenReadRecalledOrderCharge`, `OrderEntryFlow.convertAutoPercentChargeToFixedThenReadRecalledOrderCharge`, `OrderEntryFlow.modifyAutoFixedChargeAmountThenReadRecalledOrderCharge`, `OrderEntryFlow.modifyAutoPercentChargeValueThenReadRecalledOrderCharge`, `OrderEntryFlow.removeAutoChargeWhenOrderTypeNoLongerMatchesAfterEdit`, `OrderEntryFlow.increaseTaxWhenAutoFixedChargeBecomesTaxedAfterEdit`, `OrderEntryFlow.removeDeletedAutoFixedChargeFromRecalledOrderEdit`, `OrderEntryFlow.sendKitchenFromRecallAfterModifyingAutoFixedCharge`, `OrderEntryFlow.splitRecallOrderAfterModifyingAutoFixedCharge`, `OrderEntryFlow.splitEditOrderAfterModifyingManualFixedCharge`, `OrderEntryFlow.splitEditOrderAfterModifyingAutoFixedCharge`, `OrderEntryFlow.copyOrderAfterModifyingAutoChargeToPercent`, `OrderEntryFlow.copyOrderAfterModifyingAutoChargeMinGuest`, `OrderEntryFlow.copyOrderAfterModifyingAutoChargeMinGuestMismatch`, `OrderEntryFlow.copyDeliveryOrderAfterModifyingAutoChargeMinMileMismatch`, `OrderEntryFlow.copyOrderAfterChangingAutoChargeTriggerToManual`, `OrderEntryFlow.copyOrderAfterChangingManualChargeTriggerToAuto`, `OrderEntryFlow.copyOrderAfterChangingManualChargeTriggerToAutoWithMinAmountMismatch`, `OrderEntryFlow.combineOrdersAfterModifyingManualCharges`, `OrderEntryFlow.moveFirstItemToNewOrderAfterModifyingAutoCharge`, `OrderEntryFlow.moveFirstItemToExistingOrderWithManualCharge`, `OrderEntryFlow.moveSubOrderAfterModifyingAutoCharge`, `OrderEntryFlow.moveSubOrderAfterDeletingAutoCharge`, `OrderEntryFlow.addTipAfterCreditPaymentThenChangeServer`, `SettlementFlow.refundEvenPayCreditAndCashPaymentsAndReadRecords`, `AdvancedOrderFlow.splitBySeat`, `AdvancedOrderFlow.splitByAmount`, `AdvancedOrderFlow.combineOrders`, `AdvancedOrderFlow.copyOrder`, `AdvancedOrderFlow.moveItemsOrOrder`, `AdvancedOrderFlow.refundByItemOrAmount`, `AdvancedOrderFlow.applyAndEditCharges`, `AdvancedOrderFlow.applyDiscountReason` |

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
- POS-25235 creates a To Go order with two non-combo dishes before even splitting into two suborders, paying both suborders by cash, and adding a cash tip to suborder 1.
- POS-19386 creates a Dine In order with guest count 2, two 5.00 dishes on seat 1, one 5.00 dish on seat 2, and a 6.00 order tip before seat splitting and reducing one item on suborder 1.
- POS-19389 creates a Dine In order with guest count 2, two 5.00 dishes on seat 1, one 5.00 dish on seat 2, and a 6.00 order tip before seat splitting and applying a 5.00 fixed item discount to suborder 1.
- POS-19517 creates a Dine In 11.00 tax-exempt one-item order before splitting settlement into two payments.
- POS-21845 creates a Dine In 200.00 one-item order before amount splitting into five fixed 20.00 suborders.
- POS-21855 creates a Dine In saved order with one non-combo dish before opening the Recall void reason chooser.
- POS-22813 creates a Dine In order with three non-combo dishes and a taxable 5% order charge before sending all items to kitchen and drag-splitting into three suborders.
- POS-23204 whole-order discount clear creates a Dine In order with six non-combo dishes before applying a 20% whole-order discount and 20% item discounts to all six dishes.
- POS-23204 item discount clear creates a Dine In order with three non-combo dishes before applying a 20% whole-order discount and 20% item discounts to line items 1, 2, and 3.
- POS-23322 creates a Dine In tax-exempt 20.00 one-item order before partial cash payment and post-payment tip adjustment.
- POS-24394 creates a Dine In one-item order before applying a No global option and copying the saved order.
- POS-23671 creates two Dine In `hn_normal_item1` orders in one POS session; each order applies a 10% manual order charge with charge tax disabled and voids item tax before saving.
- POS-23672 creates two Dine In `hn_normal_item1` orders in one POS session; each order voids item tax, then applies a 10% manual order charge with charge tax enabled before saving.
- POS-27156 creates a Dine In order with one `groupSwitchDish` item and a fixed-amount manual charge `manu_test_fixed` worth 10.00, then changes the charge name to `mod_test1` before editing the recalled order.
- POS-27157 creates a Dine In order with one `groupSwitchDish` item and a fixed-amount manual charge `manu_test_fixed` worth 10.00, then changes the same manual charge rate type from fixed amount to 10% before editing the recalled order.
- POS-27158 creates a Dine In order with one `groupSwitchDish` item and a 10% manual charge `manu_test_perc`, then changes the same manual charge rate type from percentage to fixed 10.00 before editing the recalled order.
- POS-27159 creates a Dine In order with one `groupSwitchDish` item and a fixed-amount manual charge `manu_test_fixed` worth 10.00, then changes that manual charge amount to 20.00 before editing the recalled order.
- POS-27160 creates a Dine In order with one `groupSwitchDish` item and a 10% manual charge `manu_test_perc`, then changes that manual charge percentage value to 20 before editing the recalled order.
- POS-27163 creates a Dine In order with source-equivalent `hn_normal_item1`, applies fixed manual charge `manu_test_fixed` while it is not taxed, then changes that manual charge to taxed before editing the recalled order.
- POS-27164 creates a Dine In order with one `groupSwitchDish` item and a fixed manual charge `manu_test_fixed`, then changes that charge's allowed order types to Dine In and Delivery before editing the recalled Dine In order.
- POS-27165 creates a Dine In order with one `groupSwitchDish` item and a fixed manual charge `manu_test_fixed`, then changes that charge's allowed order types to Delivery only before editing the recalled Dine In order.
- POS-27169 creates a Dine In order with one `groupSwitchDish` item and a fixed manual charge `manu_test_fixed`, then deletes all manual charge configuration before editing the recalled order.
- POS-27170 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed` worth 10.00, then changes that auto charge name to `auto_test1` before editing the recalled order.
- POS-27171 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed` worth 10.00, then changes that auto charge rate type to 10% before editing the recalled order.
- POS-27172 creates a Dine In order with one `groupSwitchDish` item and a 10% auto charge `auto_test_percentage`, then changes that auto charge rate type to fixed 10.00 before editing the recalled order.
- POS-27173 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed` worth 10.00, then changes that auto charge amount to 20.00 before editing the recalled order.
- POS-27174 creates a Dine In order with one `groupSwitchDish` item and a 10% auto charge `auto_test_percentage`, then changes that auto charge percentage value to 20% before editing the recalled order.
- POS-27176 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed`, then changes that auto charge's applicable order type to Delivery only before editing the recalled Dine In order.
- POS-27177 creates a Dine In order with `hn_normal_item1` and an auto fixed charge `auto_test_fixed`, records tax before save while that auto charge is not taxed, then changes the auto charge to taxed before editing the recalled order.
- POS-27182 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed`, saves it, deletes that auto charge definition, and edits the recalled order.
- POS-27190 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed`, saves it, then changes that auto charge name to `mod_test1` and amount to 20 before sending the recalled order from the detail page.
- POS-27191 creates a Dine In order with one `groupSwitchDish` item and manually selected charge `manu_test_fixed`, saves it, then changes that manual charge name to `mod_test1` and amount to 20 before sending from the recalled edit page.
- POS-27192 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed`, saves it, then changes that auto charge name to `mod_test1` and amount to 20 before saving from the recalled edit page.
- POS-27229 creates a Dine In order with one `groupSwitchDish` item and an auto fixed charge `auto_test_fixed` worth 10.00, saves it, changes that auto charge name to `mod_test1` and amount to 20, then opens Recall detail and splits the saved order evenly into two suborders.
- POS-27242 creates a Dine In order with `groupSwitchDish` and `categorySwitchDish`, manually applies fixed charge `manu_test_fixed` worth 10.00, saves it, changes that manual charge name to `mod_test1` and amount to 20, then edits the recalled order and splits it by dragged items.
- POS-27248 creates a Dine In order with `groupSwitchDish` and `categorySwitchDish`, applies auto fixed charge `auto_test1` worth 10.00, saves it, changes that auto charge name to `mod_test1` and amount to 20, then edits the recalled order and splits it evenly.
- POS-27257 creates a Dine In order with one `groupSwitchDish` item and auto fixed charge `auto_test1` worth 10.00, saves it, changes that auto charge name to `mod_test1`, rate type to percent, and amount value to 20, then copies the recalled order.
- POS-27258 creates a Dine In default guest-count order with one `groupSwitchDish` item and auto fixed charge `auto_test1` worth 10.00, saves it, changes that auto charge min guest to 1, then copies the recalled order.
- POS-27259 creates a Dine In default guest-count order with one `groupSwitchDish` item and auto fixed charge `auto_test1` worth 10.00, saves it, changes that auto charge min guest to 2, then copies the recalled order.
- POS-27271 creates a Delivery default 0-mile order with one `groupSwitchDish` item and delivery auto fixed charge `auto_test1` worth 10.00, saves it, changes that auto charge min mile to 5, then copies the recalled order.
- POS-27286 creates a Dine In order with one `groupSwitchDish` item and auto fixed charge `auto_test_fixed` worth 10.00, saves it, changes that charge trigger type from auto to manual, then copies the recalled order.
- POS-27287 creates a Dine In order with one `groupSwitchDish` item and manual fixed charge `manu_test_fixed` worth 10.00, saves it, changes that charge trigger type from manual to auto, then copies the recalled order.
- POS-27288 creates a Dine In order with one `groupSwitchDish` item and manual fixed charge `manu_test_fixed` worth 10.00, saves it, changes that charge trigger type from manual to auto and min amount to 1000, then copies the recalled order.
- POS-27303 creates two current-version Dine In orders with one `groupSwitchDish` item each; order A manually selects fixed charge `auto_test1` 10.00, order B manually selects fixed charge `auto_test2` 10.00, then Admin renames/changes amount for order A's charge and deletes order B's charge before combining the orders.
- POS-27314 creates a current-version Dine In order with two `groupSwitchDish` items and auto fixed charge `auto_test1` 10.00, saves it, changes that auto charge to `mod_test1` amount 20, then moves item 1 to a new order.
- POS-27317 creates target order A with one `groupSwitchDish` item and no charge, then source order B with two `groupSwitchDish` items and manual fixed charge `manu_test_fixed` 10.00, then moves source item 1 into target order A.

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
20. POS-23204 item discount clear path: enter Dine In, add three non-combo dishes, open Discount, apply 20% whole-order discount, apply 20% item discount to line items 1/2/3, select line item 3, clear its item discount, and read the third order line text.
21. POS-23322 path: enter Dine In, add one non-combo dish, change its price to 20.00, void item tax, open settlement, cash-pay 5.00, add 1.00 settlement tip, read unpaid amount, complete remaining cash payment, open Recall recent order, and read order status.
22. POS-24394 path: enter Dine In, add one non-combo dish, read total, open Modify Global Option and choose No option, read total again, save, open Recall recent order, copy the order, read copied order total, reopen Recall recent order, and read copied recent-order total.
23. POS-23671 path: open POS once, create two Dine In orders; for each order add `hn_normal_item1`, apply a 10% non-taxable order charge, void item tax, read the order total, and save; open Recall recent order, combine it with the second recent order, and read the combined total.
24. POS-23672 path: open POS once, create two Dine In orders; for each order add `hn_normal_item1`, void item tax, apply a 10% taxable order charge, read the order total, and save; open Recall recent order, combine it with the second recent order, and read the combined total.
25. POS-27156 path: create a Dine In order, add `groupSwitchDish`, apply preset fixed charge `manu_test_fixed`, save, open Admin, rename that manual charge to `mod_test1`, reload POS, open Recall recent order, edit it, read the existing order charge detail, open the charge dialog, verify `mod_test1` is selected, click `mod_test1` twice, confirm the dialog, and read the order charge detail again.
26. POS-27157 path: create a Dine In order, add `groupSwitchDish`, apply preset fixed charge `manu_test_fixed`, read the initial 10.00 charge detail, save, open Admin, change that manual charge rate type to percent, reload POS, open Recall recent order, edit it, open the charge dialog, verify `manu_test_fixed` is selected as `Add10%`, click `manu_test_fixed` twice, confirm the dialog, and read subtotal plus recalculated charge detail.
27. POS-27158 path: create a Dine In order, add `groupSwitchDish`, apply preset percent charge `manu_test_perc`, read subtotal and initial 10% charge detail, save, open Admin, change that manual charge rate type to amount, reload POS, open Recall recent order, edit it, open the charge dialog, verify `manu_test_perc` is selected as `Add $10.00`, confirm the dialog without reselecting, and read the updated order charge detail.
28. POS-27159 path: create a Dine In order, add `groupSwitchDish`, apply preset fixed charge `manu_test_fixed`, read the initial 10.00 charge detail, save, open Admin, change that manual charge amount to 20.00, reload POS, open Recall recent order, edit it, open the charge dialog, verify `manu_test_fixed` is selected as `Add $20.00`, confirm the dialog, and read the updated order charge detail.
29. POS-25235 path: enter To Go, add two non-combo dishes, save, open Recall recent order, split evenly into two suborders, save the split, cash-pay suborder 1, cash-pay suborder 2, verify suborder 2 is `Paid`, reopen suborder 1, add 100 cents as cash tip, and read suborder 1 tip.
30. POS-27160 path: create a Dine In order, add `groupSwitchDish`, apply preset percent charge `manu_test_perc`, read subtotal and initial 10% charge detail, save, open Admin, change that manual charge percentage value to 20, reload POS, open Recall recent order, edit it, open the charge dialog, verify `manu_test_perc` is selected as `Add20%`, confirm the dialog, and read subtotal plus recalculated charge detail.
31. POS-27163 path: create a Dine In order, add `hn_normal_item1`, apply fixed manual charge `manu_test_fixed`, save, open Admin, set that charge to taxed, reload POS, open Recall recent order, read the saved order tax, edit the order, verify tax is unchanged on entry, open the charge dialog, confirm it, and read increased order tax.
32. POS-27164 path: create a Dine In order, add `groupSwitchDish`, apply fixed manual charge `manu_test_fixed`, save, open Admin, set that charge's order types to Dine In and Delivery, reload POS, open Recall recent order, edit it, verify the order charge detail is still 10.00, open the charge dialog, verify the selected charge still contains `manu_test_fixed`, confirm the dialog, and verify the order charge detail remains 10.00.
33. POS-27165 path: create a Dine In order, add `groupSwitchDish`, apply fixed manual charge `manu_test_fixed`, verify the charge detail is 10.00 before saving, save, open Admin, set that charge's order types to Delivery only, reload POS, open Recall recent order, edit it, open the charge dialog, verify selected charges no longer include `manu_test_fixed`, confirm the dialog, and verify the edited order still retains the original `manu_test_fixed 10.00` detail.
34. POS-27169 path: create a Dine In order, add `groupSwitchDish`, apply fixed manual charge `manu_test_fixed`, save, delete all manual charge configuration, reload POS, open Recall recent order, edit it, verify the order charge detail is still 10.00, open the charge dialog, verify selected charges still show `manu_test_fixed Add $10.00`, confirm the dialog, and verify the order charge detail remains 10.00.
35. POS-27170 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, rename that auto charge to `auto_test1`, reload POS, open Recall recent order, edit it, and read the order charge detail.
36. POS-27171 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge rate type to percent, reload POS, open Recall recent order, edit it, and read subtotal plus order charge detail.
37. POS-27172 path: configure auto percentage charge `auto_test_percentage`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge rate type to amount, reload POS, open Recall recent order, edit it, and read order charge detail.
38. POS-27173 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge amount to 20.00, reload POS, open Recall recent order, edit it, and read order charge detail.
39. POS-27174 path: configure auto percentage charge `auto_test_percentage`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge percentage value to 20, reload POS, open Recall recent order, edit it, and read subtotal plus order charge detail.
40. POS-27176 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge order type to Delivery only, reload POS, open Recall recent order, edit it, and read order charge detail.
41. POS-27177 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `hn_normal_item1` so the auto charge is applied, read tax before save, save, open Admin, set that auto charge to taxed, reload POS, open Recall recent order, edit it, and read tax again.
42. POS-27182 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, delete `auto_test_fixed`, reload POS, open Recall recent order, edit it, and read order charge detail.
43. POS-27190 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge amount to 20 and rename it to `mod_test1`, reload POS, open Recall recent order, send kitchen from the detail page, and read detail charge lines.
44. POS-27191 path: create a Dine In order, add `groupSwitchDish`, manually apply `manu_test_fixed`, save, open Admin, change that manual charge amount to 20 and rename it to `mod_test1`, reload POS, open Recall recent order, edit it, send all to kitchen from the edit page, return to Recall detail, and read detail charge lines.
45. POS-27192 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, rename that auto charge to `mod_test1` and change its amount to 20, reload POS, open Recall recent order, edit it, save from the edit page, return to Recall detail, and read detail charge lines.
46. POS-27229 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, rename that auto charge to `mod_test1` and change its amount to 20, reload POS, open Recall recent order, split the saved order evenly into two suborders from the detail page, save the split, open suborder 1, and read its charge lines.
47. POS-27242 path: create a Dine In order, add `groupSwitchDish` and `categorySwitchDish`, apply preset fixed charge `manu_test_fixed`, record the original subtotal, save, open Admin, rename that manual charge to `mod_test1` and change its amount to 20, reload POS, open Recall recent order, edit it, split by dragged items, save the split, reopen Recall recent order, open suborder 1, and read suborder subtotal plus charge lines.
48. POS-27248 path: configure auto fixed charge `auto_test1`, create a Dine In order, add `groupSwitchDish` and `categorySwitchDish` so the auto charge is applied, save, open Admin, rename that auto charge to `mod_test1` and change its amount to 20, reload POS, open Recall recent order, edit it, split evenly into two suborders from the edit path, save the split, reopen Recall recent order, open suborder 1, and read its charge lines.
49. POS-27257 path: configure auto fixed charge `auto_test1`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, rename that auto charge to `mod_test1`, change its rate type to percent, change amount value to 20, reload POS, open Recall recent order, copy it, and read copied order subtotal plus charge lines.
50. POS-27258 path: configure auto fixed charge `auto_test1`, create a Dine In order with default guest count 1, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge min guest to 1, reload POS, open Recall recent order, copy it, and read copied order charge lines.
51. POS-27259 path: configure auto fixed charge `auto_test1`, create a Dine In order with default guest count 1, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge min guest to 2, reload POS, open Recall recent order, copy it, and read copied order charge lines.
52. POS-27271 path: configure auto fixed charge `auto_test1` and restrict it to Delivery, create a Delivery order with default 0 mile, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that auto charge min mile to 5, reload POS, open Recall recent order, copy it, and read copied order charge lines.
53. POS-27286 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order, add `groupSwitchDish` so the auto charge is applied, save, open Admin, change that charge trigger type to manual, reload POS, open Recall recent order, copy it, and read copied order charge lines.
54. POS-27287 path: create a Dine In order, add `groupSwitchDish`, manually apply `manu_test_fixed`, save, open Admin, change that charge trigger type to auto, reload POS, open Recall recent order, copy it, and read copied order charge lines.
55. POS-27288 path: create a Dine In order, add `groupSwitchDish`, manually apply `manu_test_fixed`, save, open Admin, change that charge trigger type to auto, set its min amount to 1000, reload POS, open Recall recent order, copy it, and read copied order charge lines.
56. POS-27303 path: configure manual fixed charges `auto_test1` and `auto_test2`, create and save order A with `groupSwitchDish` plus `auto_test1`, create and save order B with `groupSwitchDish` plus `auto_test2`, open Admin, rename `auto_test1` to `mod_test1`, change `mod_test1` amount to 20, delete `auto_test2`, reload POS, open Recall recent order, combine with the second recent order, and read combined charge lines.
57. POS-27314 path: configure auto fixed charge `auto_test1`, create a Dine In order with two `groupSwitchDish` items so the auto charge is applied, save, open Admin, rename `auto_test1` to `mod_test1`, change amount to 20, reload POS, open Recall recent order, move item 1 to a new order, read new order charge lines, reopen the previous order, and read original order charge lines.
58. POS-27317 path: create and save target Dine In order A with one `groupSwitchDish` and no charge, create and save source Dine In order B with two `groupSwitchDish` items and manual charge `manu_test_fixed`, open Recall recent order, read source item 1 price, move item 1 to order index 2, read target subtotal and charge lines, reopen recent source order, and read source charge lines.
59. POS-27324 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order with two `groupSwitchDish` items so the auto charge is applied, save, open Recall recent order, drag-split the order and save split state, open suborder 1 and read its charge lines, open Admin, rename `auto_test_fixed` to `mod_test1`, change amount to 20, reload POS, open Recall recent order, open suborder 1, move the current suborder to a new order, and read moved-order charge lines.
60. POS-27325 path: configure auto fixed charge `auto_test_fixed`, create a Dine In order with two `groupSwitchDish` items so the auto charge is applied, save, open Recall recent order, drag-split the order and save split state, open suborder 1 and read its charge lines, delete `auto_test_fixed`, reload POS, open Recall recent order, open suborder 1, move the current suborder to a new order, and read moved-order charge lines.
61. POS-30756 path: set rounding to nearest 5 cents, create a Dine In order with two `groupSwitchDish` items, pay by credit, open Recall recent order, add 1.00 credit tip, read order status, payment record 1 amount, order total, and current server, change the order to a different server, read the server, status, and money fields again, then restore rounding to No Rounding.
62. POS-31301 path: create a Dine In order with one `groupSwitchDish` item, apply a 10% item discount, save the order, open Recall recent order, open the discount panel, Clear All discounts and confirm, reopen the discount panel, and read the first item discount row original/current prices.
63. POS-31081 path: configure automatic fixed charge `other_charge` as share-tip, read Report Fee Amount, create a Dine In order with two `groupSwitchDish` items, save it, read Report Fee Amount again, split the recalled order by amount 5.00, save split state, read Report Fee Amount a third time, then delete `other_charge`.
64. POS-30566 path: read Report homepage Unpaid from Total Report, create a Dine In order with two `superman item1` dishes, pay by credit, open Recall Unpaid and recent order, refund payment record 1 by 100 cents, reopen Total Report, and read Report homepage Unpaid again.

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
- POS-25235 verifies both split suborders can be paid by cash and suborder 1 cash tip becomes `1.00` after adding 100 cents.
- POS-19386 verifies changed-price seat split tip allocation starts at suborder 1 tip `4.00` and, after reducing one item on suborder 1, both suborder tips are `3.00`.
- POS-19389 verifies changed-price seat split tip allocation starts at suborder 1 tip `4.00` and, after applying a 5.00 fixed item discount on suborder 1, both suborder tips are `3.00`.
- POS-19517 verifies payment record 3 equals the negative amount of payment record 1, and payment record 4 equals the negative amount of payment record 2.
- POS-21845 verifies parent order total remains unchanged after entering amount split rows, and the first two saved suborder totals are both `20.00`.
- POS-21855 verifies the Void reason chooser displays exactly 7 reason options.
- POS-22813 verifies suborders 1, 2, and 3 are `Paid`, and each paid suborder price detail no longer contains `Charge`.
- POS-23204 verifies the order price detail no longer contains `Discount` after clearing the whole-order discount.
- POS-23204 item discount clear verifies the third order line text no longer contains `Discount` after clearing only that selected item's discount.
- POS-23322 verifies unpaid amount after adding tip is within 0.01 of `originalTotal - 4.00`, then verifies Recall status is `Paid` after the remaining cash payment.
- POS-24394 verifies total is unchanged after No global option, after copying the order, and after recalling the copied order as the recent order.
- POS-23671 verifies combined Recall total equals the sum of the two saved tax-exempt 10% non-taxable charge order totals.
- POS-23672 verifies combined Recall total equals the sum of the two saved tax-exempt 10% taxable charge order totals.
- POS-27156 verifies the edited recalled order initially still displays `manu_test_fixed 10.00`, the charge dialog exposes selected `mod_test1`, and the order charge detail updates to `mod_test1 10.00` after reselecting the modified charge.
- POS-27157 verifies the order initially displays fixed charge `manu_test_fixed 10.00`, the edited recalled order charge dialog exposes selected `manu_test_fixed Add10%` after Admin changes the rate type, and the order charge detail equals `subtotal * 10%` after reselecting the modified charge.
- POS-27158 verifies the order initially displays percent charge `manu_test_perc` as `subtotal * 10%`, the edited recalled order charge dialog exposes selected `manu_test_perc Add $10.00` after Admin changes the rate type, and the order charge detail updates to fixed `10.00` after confirming the dialog.
- POS-27159 verifies the order initially displays fixed charge `manu_test_fixed 10.00`, the edited recalled order charge dialog exposes selected `manu_test_fixed Add $20.00` after Admin changes the amount, and the order charge detail updates to fixed `20.00` after confirming the dialog.
- POS-27160 verifies the order initially displays percent charge `manu_test_perc` as `subtotal * 10%`, the edited recalled order charge dialog exposes selected `manu_test_perc Add20%` after Admin changes the percentage value, and the order charge detail updates to `subtotal * 20%` after confirming the dialog.
- POS-27163 verifies the saved Recall tax equals the tax shown immediately after entering edit, then verifies tax increases only after confirming the updated taxed manual charge in the charge dialog.
- POS-27164 verifies the edited Dine In order keeps fixed charge `manu_test_fixed 10.00`, the charge dialog selected state still contains `manu_test_fixed` after Admin restricts order types to Dine In and Delivery, and confirming the dialog preserves the same 10.00 charge.
- POS-27165 verifies the saved Dine In order initially has fixed charge `manu_test_fixed 10.00`, the edited order charge dialog no longer lists `manu_test_fixed` as selected after Admin restricts order types to Delivery only, and confirming the dialog preserves the existing order charge detail.
- POS-27169 verifies the recalled order keeps fixed charge `manu_test_fixed 10.00` after all manual charge definitions are deleted, the charge dialog still displays the legacy selected state `manu_test_fixed Add $10.00`, and confirming the dialog preserves the same order charge detail.
- POS-27170 verifies the edited recalled order displays the renamed auto charge `auto_test1 10.00` after Admin changes `auto_test_fixed` to `auto_test1`.
- POS-27171 verifies the edited recalled order displays `auto_test_fixed` amount as `subtotal * 10%` after Admin changes the auto fixed charge rate type to percent.
- POS-27172 verifies the edited recalled order displays `auto_test_percentage` amount as fixed `10.00` after Admin changes the auto percent charge rate type to amount.
- POS-27173 verifies the edited recalled order displays `auto_test_fixed` amount as fixed `20.00` after Admin changes the auto fixed charge amount.
- POS-27174 verifies the edited recalled order displays `auto_test_percentage` amount as `subtotal * 20%` after Admin changes the auto percent charge value.
- POS-27176 verifies the edited recalled Dine In order no longer displays any auto charge after Admin changes `auto_test_fixed` to Delivery only.
- POS-27177 verifies the edited recalled order tax becomes greater than the pre-save tax after Admin changes `auto_test_fixed` to taxed.
- POS-27182 verifies the edited recalled order no longer displays any auto charge after `auto_test_fixed` is deleted.
- POS-27190 verifies the Recall detail page still displays saved-order charge `auto_test_fixed` as `10.00` after the active auto charge definition is renamed and changed to 20 before detail-page send kitchen.
- POS-27191 verifies the Recall detail page still displays saved-order manual charge `manu_test_fixed` as `10.00` after the active manual charge definition is renamed and changed to 20 before edit-page send all.
- POS-27192 verifies the Recall detail page displays the current auto charge `mod_test1` as `20.00` after editing and saving an order whose original auto charge snapshot was `auto_test_fixed` 10.00.
- POS-27229 verifies suborder 1 still displays saved-order auto charge `auto_test_fixed` prorated to `5.00` after the active auto charge definition is renamed to `mod_test1` and changed to 20 before detail-page split.
- POS-27242 verifies suborder 1 still displays saved-order manual charge `manu_test_fixed` prorated by `suborder subtotal / original subtotal * 10.00` after the active manual charge definition is renamed to `mod_test1` and changed to 20 before edit-page split.
- POS-27248 verifies suborder 1 displays current auto charge `mod_test1` prorated to `10.00` after the active auto charge definition is renamed and changed to 20 before edit-page even split.
- POS-27257 verifies the copied order displays current auto charge `mod_test1` calculated as copied subtotal * 20% after the saved order's auto charge definition is renamed and converted to percent before copy.
- POS-27258 verifies the copied order still displays `auto_test1 10.00` because the saved order guest count 1 satisfies the current auto charge min guest value 1 before copy.
- POS-27259 verifies the copied order displays no charge lines because the saved order guest count 1 does not satisfy the current auto charge min guest value 2 before copy.
- POS-27271 verifies the copied Delivery order displays no charge lines because the saved order delivery distance 0 does not satisfy the current auto charge min mile value 5 before copy.
- POS-27286 verifies the copied order displays no charge lines because the saved order's original auto charge no longer exists in the current automatic-trigger charge set after the trigger type is changed to manual.
- POS-27287 verifies the copied order displays `manu_test_fixed 10.00` because the saved manual charge is now present in the current automatic-trigger charge set before copy.
- POS-27288 verifies the copied order displays no charge lines because the saved manual charge is now present in the current automatic-trigger charge set but the copied order subtotal does not satisfy the current min amount 1000.
- POS-27303 verifies the combined order still displays the two saved manual charge snapshots `auto_test1 10.00` and `auto_test2 10.00`, and verifies their charge total is `20.00` after current Admin configuration has renamed/changed one charge and deleted the other.
- POS-27314 verifies the newly moved-item order displays no charge lines, then verifies the original order still displays the saved auto charge snapshot `auto_test1 10.00` after the active auto charge definition is renamed and changed to 20.
- POS-27317 verifies the target order subtotal increases by the moved item price and does not contain `manu_test_fixed`, then verifies the source order still displays saved manual charge `manu_test_fixed 10.00`.
- POS-27324 verifies the moved order charge lines equal the suborder charge lines captured before Admin renames `auto_test_fixed` and changes the active amount to 20.
- POS-27325 verifies the moved order charge lines equal the suborder charge lines captured before `auto_test_fixed` is deleted from the active auto charge configuration.
- POS-30756 verifies adding a 1.00 tip after credit payment updates the visible payment record amount to match the order total, and changing server moves the order to a different server while preserving order status, payment record amount, and order total.
- POS-31301 verifies Recall Clear All restores the item discount row current price to the original item price after the discounted order is saved and reopened.
- POS-31081 verifies the share-tip charge increases Report Fee Amount by 10.00 after order save and remains unchanged after amount split.
- POS-30566 verifies credit-card partial refund does not change Report homepage Unpaid.

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
- POS-25235 also uses `PosHomePage.clickTogo`, `OrderDishesPage.saveOrder`, `RecallPage.splitEvenly`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.settleSubOrder`, `RecallPage.payCurrentSubOrderByCash`, `RecallPage.addTipAfterCreditPayment`, `RecallPage.readOrderTipText`, and `RecallPage.readOrderStatus` to validate paid even-split suborder cash-tip behavior.
- POS-19386 also uses `OrderDishesPage.changeSelectedItemPrice`, `OrderDishesPage.reduceSelectedItemQuantity`, `RecallPage.splitBySeat`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderTipText` to validate seat-split tip redistribution after item reduction.
- POS-19389 also uses `OrderDishesPage.changeSelectedItemPrice`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.applySelectedItemsDiscountAmount`, `RecallPage.splitBySeat`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderTipText` to validate seat-split tip redistribution after item discount.
- POS-19517 also uses `OrderDishesPage.voidSelectedItemTax`, `OrderDishesPage.clickSettle`, `OrderDishesPage.splitPaymentEvenly`, `OrderDishesPage.settleByCredit`, `RecallPage.clickSettle`, `RecallPage.payCurrentOrderByCash`, `RecallPage.readPaymentRecordAmount`, and `RecallPage.refundPaymentRecord` to validate multi-payment refund record values.
- POS-21845 also uses `OrderDishesPage.changeSelectedItemPrice`, `RecallPage.openSplitOrder`, `RecallPage.readOrderTotal`, `RecallPage.splitByAmounts`, `RecallPage.saveSplit`, `RecallPage.saveSplitAmountCreate`, and `RecallPage.openSubOrder` to validate fixed amount split totals.
- POS-21855 also uses `RecallPage.openVoidReasonChooser` and `RecallPage.readVoidReasonCount` to validate the configured Void reason list.
- POS-22813 also uses `OrderDishesPage.applyOrderCharge`, `OrderDishesPage.sendAllToKitchen`, `OrderDishesPage.settleByCash`, `RecallPage.splitByDrag`, `RecallPage.clickEdit`, `RecallPage.openSubOrder`, `RecallPage.readOrderStatus`, and `RecallPage.readOrderPriceDetail` to validate per-suborder charge clearing after payment.
- POS-23204 whole-order discount clear also uses `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.selectOrderLineItems`, `OrderDishesPage.applySelectedItemsDiscountPercent`, `OrderDishesPage.clearWholeOrderDiscount`, and `OrderDishesPage.readOrderPriceDetail` to validate whole-order discount clearing.
- POS-23204 item discount clear also uses `OrderDishesPage.openDiscountAndReadWholeOrderPrice`, `OrderDishesPage.applyWholeOrderDiscountPercent`, `OrderDishesPage.selectOrderLineItems`, `OrderDishesPage.applySelectedItemsDiscountPercent`, `OrderDishesPage.selectOrderLineItem`, `OrderDishesPage.clearSelectedItemDiscounts`, and `OrderDishesPage.readOrderLineText` to validate selected item discount clearing.
- POS-23322 also uses `OrderDishesPage.changeSelectedItemPrice`, `OrderDishesPage.voidSelectedItemTax`, `OrderDishesPage.clickSettle`, `OrderDishesPage.readSettlementTotal`, `OrderDishesPage.modifySettlementPaymentAmount`, `OrderDishesPage.settleByCash`, `OrderDishesPage.addSettlementTip`, `OrderDishesPage.readSettlementUnpaidAmount`, `RecallPage.openRecentOrder`, and `RecallPage.readOrderStatus` to validate post-partial-payment tip recalculation.
- POS-24394 also uses `OrderDishesPage.readSubtotal`, `OrderDishesPage.openGlobalOptionModify`, `OrderDishesPage.saveOrder`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderTotal` to validate No global option and copied order total stability.
- POS-23671 also uses `OrderDishesPage.applyOrderCharge`, `OrderDishesPage.voidSelectedItemTax`, `OrderDishesPage.readSettlementTotal`, `OrderDishesPage.saveOrder`, `RecallPage.combineOrder`, and `RecallPage.readOrderTotal` to validate two non-taxable charge orders combine additively.
- POS-23672 also uses `OrderDishesPage.voidSelectedItemTax`, `OrderDishesPage.applyTaxableOrderCharge`, `OrderDishesPage.readSettlementTotal`, `OrderDishesPage.saveOrder`, `RecallPage.combineOrder`, and `RecallPage.readOrderTotal` to validate two taxable charge orders combine additively.
- POS-27156 also uses `PosHomePage.clickAdmin`, `AdminPage.renameManualCharge`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.reapplyPresetCharge`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge rename and reapply behavior.
- POS-27157 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeRateType`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.reapplyPresetCharge`, `OrderDishesPage.readSubtotal`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge rate-type conversion and reapply behavior.
- POS-27158 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeRateType`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.readSubtotal`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge rate-type conversion to fixed amount and confirm behavior.
- POS-27159 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeAmount`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge amount edit and confirm behavior.
- POS-27160 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeAmount`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.readSubtotal`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual percentage charge value edit and confirm behavior.
- POS-27163 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeTaxed`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readTax`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, `RecallPage.readOrderTaxText`, and `RecallPage.clickEdit` to validate manual charge tax edit and confirm behavior.
- POS-27164 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeOrderTypes`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge order-type matching behavior.
- POS-27165 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeOrderTypes`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate manual charge order-type mismatch behavior.
- POS-27169 also uses `PosHomePage.clickAdmin`, `AdminPage.deleteAllManualCharges`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readOrderChargeItems`, `OrderDishesPage.openChargeDialog`, `OrderDishesPage.readSelectedPresetCharges`, `OrderDishesPage.confirmChargeDialog`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate deleted manual charge legacy selection behavior.
- POS-27170 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto charge rename synchronization in recalled order edit.
- POS-27171 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeRateType`, `OrderDishesPage.readSubtotal`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto charge rate-type recalculation in recalled order edit.
- POS-27172 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoPercentCharge`, `AdminPage.setAutoChargeRateType`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto percent charge conversion to fixed amount in recalled order edit.
- POS-27173 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeAmount`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto fixed charge amount synchronization in recalled order edit.
- POS-27174 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoPercentCharge`, `AdminPage.setAutoChargeAmount`, `OrderDishesPage.readSubtotal`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto percent charge value recalculation in recalled order edit.
- POS-27176 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeOrderTypes`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto charge order-type filtering in recalled order edit.
- POS-27177 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeTaxed`, `OrderDishesPage.readTax`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate auto charge tax recalculation in recalled order edit.
- POS-27182 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.deleteAutoChargeByName`, `OrderDishesPage.readOrderChargeItems`, `RecallPage.openRecentOrder`, and `RecallPage.clickEdit` to validate deleted auto charge filtering in recalled order edit.
- POS-27190 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeAmount`, `AdminPage.renameAutoCharge`, `RecallPage.openRecentOrder`, `RecallPage.sendKitchenFromDetail`, and `RecallPage.readOrderChargeItems` to validate Recall detail send-kitchen preserves the saved charge snapshot.
- POS-27191 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeAmount`, `AdminPage.renameManualCharge`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.sendAllToKitchen`, `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderChargeItems` to validate edit-page send all preserves the saved manual charge snapshot.
- POS-27192 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeAmount`, `OrderDishesPage.saveOrder`, `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, and `RecallPage.readOrderChargeItems` to validate edit-page save syncs to the current auto charge definition.
- POS-27229 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeAmount`, `RecallPage.openRecentOrder`, `RecallPage.openSplitOrder`, `RecallPage.splitEvenly`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, and `RecallPage.readOrderChargeItems` to validate Recall detail split preserves and prorates the saved auto charge snapshot.
- POS-27242 also uses `PosHomePage.clickAdmin`, `AdminPage.setManualChargeAmount`, `AdminPage.renameManualCharge`, `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readSubtotal`, `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, `RecallPage.openSplitOrder`, `RecallPage.splitByDrag`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.readOrderSubtotal`, and `RecallPage.readOrderChargeItems` to validate Recall edit split preserves and prorates the saved manual charge snapshot.
- POS-27248 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeAmount`, `RecallPage.openRecentOrder`, `RecallPage.clickEdit`, `RecallPage.openSplitOrder`, `RecallPage.splitEvenly`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, and `RecallPage.readOrderChargeItems` to validate Recall edit split syncs to the current auto charge definition before prorating.
- POS-27257 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeRateType`, `AdminPage.setAutoChargeAmount`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, `RecallPage.readOrderSubtotal`, and `RecallPage.readOrderChargeItems` to validate copied orders use the current auto charge definition.
- POS-27258 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeMinGuest`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied orders keep an auto charge when the saved order guest count satisfies the current min-guest configuration.
- POS-27259 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeMinGuest`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied orders drop an auto charge when the saved order guest count does not satisfy the current min-guest configuration.
- POS-27271 also uses `PosHomePage.clickAdmin`, `PosHomePage.clickDelivery`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setAutoChargeOrderTypes`, `AdminPage.setAutoChargeMinMile`, `DeliveryPage.createDeliveryOrder`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied Delivery orders drop an auto charge when saved delivery distance does not satisfy the current min-mile configuration.
- POS-27286 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.setChargeTriggerMode`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied orders drop a saved auto charge after the active charge trigger is changed to manual.
- POS-27287 also uses `PosHomePage.clickAdmin`, `AdminPage.setChargeTriggerMode`, `OrderDishesPage.applyPresetCharge`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied orders pick up a saved manual charge after the active charge trigger is changed to auto.
- POS-27288 also uses `PosHomePage.clickAdmin`, `AdminPage.setChargeTriggerMode`, `AdminPage.setChargeMinAmount`, `OrderDishesPage.applyPresetCharge`, `RecallPage.openRecentOrder`, `RecallPage.copyCurrentOrder`, and `RecallPage.readOrderChargeItems` to validate copied orders drop a saved manual charge after the active charge trigger is changed to auto but min amount is not satisfied.
- POS-27303 also uses `PosHomePage.clickAdmin`, `AdminPage.setupManualFixedCharge`, `AdminPage.renameManualCharge`, `AdminPage.setManualChargeAmount`, `AdminPage.deleteChargeByName`, `OrderDishesPage.applyPresetCharge`, `RecallPage.openRecentOrder`, `RecallPage.combineOrder`, and `RecallPage.readOrderChargeItems` to validate combined orders preserve saved manual charge snapshots.
- POS-27314 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeAmount`, `RecallPage.openRecentOrder`, `RecallPage.moveFirstItemToNewOrder`, `RecallPage.openPreviousOrder`, and `RecallPage.readOrderChargeItems` to validate moved-item orders do not inherit the old auto charge while the source order keeps its saved charge snapshot.
- POS-27317 also uses `OrderDishesPage.applyPresetCharge`, `OrderDishesPage.readSubtotal`, `RecallPage.openRecentOrder`, `RecallPage.readAllOrderItems`, `RecallPage.moveFirstItemToExistingOrder`, `RecallPage.readOrderSubtotal`, and `RecallPage.readOrderChargeItems` to validate moving an item to an existing uncharged order does not move the source manual charge.
- POS-27324 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.renameAutoCharge`, `AdminPage.setAutoChargeAmount`, `RecallPage.openSplitOrder`, `RecallPage.splitByDrag`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.moveCurrentSubOrderToNewOrder`, and `RecallPage.readOrderChargeItems` to validate moving a split suborder preserves the saved auto charge snapshot.
- POS-27325 also uses `PosHomePage.clickAdmin`, `AdminPage.setupAutoFixedCharge`, `AdminPage.deleteAutoChargeByName`, `RecallPage.openSplitOrder`, `RecallPage.splitByDrag`, `RecallPage.saveSplit`, `RecallPage.openSubOrder`, `RecallPage.moveCurrentSubOrderToNewOrder`, and `RecallPage.readOrderChargeItems` to validate moving a split suborder preserves the saved auto charge snapshot after active charge deletion.
- POS-30756 also uses `AdminPage.setRoundingStrategy`, `OrderDishesPage.settleByCredit`, `RecallPage.addTipAfterCreditPayment`, `RecallPage.readOrderStatus`, `RecallPage.readPaymentRecordAmount`, `RecallPage.readOrderTotal`, `RecallPage.readServerName`, and `RecallPage.changeServer` to validate server reassignment does not change the paid order state or charged amount after tip.
- POS-31301 also uses `OrderDishesPage.applyItemDiscountPercent`, `RecallPage.openDiscountAndReadWholeOrderPrice`, `RecallPage.clearAllDiscountsAndConfirm`, and `RecallPage.readDiscountItemPrices` to validate the saved Recall discount panel values after Clear All.
- POS-31081 also uses `AdminPage.setupAutoFixedChargeAsTip`, `AdminPage.deleteChargeByName`, `ReportPage.inputPasswordInPopup`, `ReportPage.enterTotalReport`, `ReportPage.readFeeAmount`, `RecallPage.openSplitOrder`, `RecallPage.splitByAmounts`, and `RecallPage.saveSplit` to validate charge-as-tip report behavior across split.
- POS-30566 also uses `ReportPage.inputPasswordInPopup`, `ReportPage.enterTotalReport`, `ReportPage.readHomepageUnpaid`, `RecallPage.openUnpaidOrders`, `RecallPage.openRecentOrder`, and `RecallPage.refundPaymentRecordAmount` to validate homepage Unpaid around a credit-card partial refund.

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
- POS-25235 uses `groupSwitchDish` twice as the two source-equivalent non-combo dishes, with no live client dependency in offline mode.
- POS-19386 uses `groupSwitchDish` three times as the non-combo dishes for two seats, with no live client dependency in offline mode.
- POS-19389 uses `groupSwitchDish` three times as the non-combo dishes for two seats, with no live client dependency in offline mode.
- POS-19517 uses the stable `superman item1` non-combo dish from `test-data/pos/dishes.ts`, with no live client dependency in offline mode.
- POS-21845 uses `groupSwitchDish` as the source non-combo dish, with no live client dependency in offline mode.
- POS-21855 uses `groupSwitchDish` as the source non-combo dish, with no live client dependency in offline mode.
- POS-22813 uses `splitDiscountDishes` as the three source-equivalent non-combo dishes, with no live client dependency in offline mode.
- POS-23204 uses `groupSwitchDish` as the repeated source-equivalent non-combo dish for both whole-order and item discount clear paths, with no live client dependency in offline mode.
- POS-23322 uses `groupSwitchDish` as the source-equivalent non-combo dish, with no live client dependency in offline mode.
- POS-24394 uses `groupSwitchDish` as the source-equivalent non-combo dish, with no live client dependency in offline mode.
- POS-23671 uses `chineseInitialSearchDish` as the source-equivalent `hn_normal_item1` / `hn_cate` dish, with no live client dependency in offline mode.
- POS-23672 uses `chineseInitialSearchDish` as the source-equivalent `hn_normal_item1` / `hn_cate` dish, with no live client dependency in offline mode.
- POS-27156 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27157 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27158 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_perc`, with no live client dependency in offline mode.
- POS-27159 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27160 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_perc`, with no live client dependency in offline mode.
- POS-27163 uses `chineseInitialSearchDish` as the source-equivalent `hn_normal_item1` / `hn_cate` dish and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27164 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27165 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27169 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27170 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27171 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27172 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_percentage`, with no live client dependency in offline mode.
- POS-27173 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27174 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_percentage`, with no live client dependency in offline mode.
- POS-27176 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27177 uses `chineseInitialSearchDish` as the source-equivalent `hn_normal_item1` / `hn_cate` item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27182 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27190 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27191 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27192 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27229 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27242 uses `groupSwitchDish` and `categorySwitchDish` as source-equivalent non-combo items and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27248 uses `groupSwitchDish` and `categorySwitchDish` as source-equivalent non-combo items and offline auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27257 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27258 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27259 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27271 uses `deliveryOrderInfoSample`, `groupSwitchDish`, and offline delivery auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27286 uses `groupSwitchDish` as the source-equivalent non-combo item and offline auto charge fixture `auto_test_fixed`, with no live client dependency in offline mode.
- POS-27287 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27288 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.
- POS-27303 uses `groupSwitchDish` as the source-equivalent non-combo item and creates offline manual fixed charge fixtures `auto_test1` and `auto_test2`, with no live client dependency in offline mode.
- POS-27314 uses `groupSwitchDish` twice as the source-equivalent non-combo item and offline auto charge fixture `auto_test1`, with no live client dependency in offline mode.
- POS-27317 uses `groupSwitchDish` as the source-equivalent non-combo item and offline manual charge fixture `manu_test_fixed`, with no live client dependency in offline mode.

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
- POS-25235 stub behavior preserves the selected suborder index while opening settlement, marks the selected suborder as `Paid` on cash payment, records cash tips on the selected suborder, and refreshes the selected suborder tip display.
- POS-19386 stub behavior tracks changed-price orders, allocates the 6.00 tip by seat subtotal as 4.00/2.00, clones suborder items during edit, and reallocates the tip as 3.00/3.00 after reducing suborder 1 subtotal to match suborder 2.
- POS-19389 stub behavior reuses changed-price seat split tip allocation, applies a 5.00 fixed amount discount to suborder 1's first item, and reallocates tips as 3.00/3.00 when suborder subtotals become equal.
- POS-19517 stub behavior records the first even-pay credit payment as a positive payment record, records the remaining cash payment as a second positive payment record, and appends refund records with the negative amount of the selected original payment record while preserving record ordering.
- POS-21845 stub behavior lets amount split dynamically add amount inputs, keeps the parent total unchanged while entering split rows, persists each fixed split amount as a suborder price, and displays fixed-price suborder totals even when amount split suborders do not own item rows.
- POS-21855 stub behavior keeps existing Void order status behavior and additionally renders a seven-option Void reason chooser after a successful Void action.
- POS-22813 stub behavior persists a 5% order charge on the sent parent order, creates three drag-split suborders from the three source dishes, records charge-cleared state per suborder during edit, marks each cash-paid suborder as `Paid`, and omits `Charge` from the paid suborder price detail when that suborder has been cleared.
- POS-23204 whole-order discount clear stub behavior renders whole-order Discount in order price detail when a 20% whole-order discount is active, applies selected-item percentage discounts to all selected line items, and removes the order-level Discount price detail when the whole-order discount is cleared.
- POS-23204 item discount clear stub behavior renders `Discount` in discounted order line text, clears only the selected line item's item discount, restores that item's original price, and removes `Discount` from the selected order line text.
- POS-23322 stub behavior records the 5.00 cash payment as partial, recalculates settlement unpaid amount after adding a 1.00 tip, completes the remaining cash payment, saves the order, and shows Recall status as `Paid`.
- POS-24394 stub behavior opens the No global option path without changing item price, clones the selected Recall order with a new order number during copy, selects the copied order, and preserves the copied order total as the latest order.
- POS-23671 stub behavior applies a 10% order charge to each tax-exempt order, saves both orders in one offline POS session, combines the latest order with the second recent order, and recalculates the combined total from both item lists plus the retained non-taxable charge rate.
- POS-23672 stub behavior applies a 10% taxable-order-charge path to each tax-exempt order, saves both orders in one offline POS session, combines the latest order with the second recent order, and recalculates the combined total from both item lists plus the retained charge rate.
- POS-27156 stub behavior persists saved orders across POS reload, models `manu_test_fixed` as a 10.00 fixed-amount manual charge, lets Admin rename that charge to `mod_test1`, keeps the existing recalled order detail on the old label until the dialog reapply action, then updates the order detail to the renamed charge while retaining the 10.00 amount.
- POS-27157 stub behavior persists saved orders across POS reload, models `manu_test_fixed` as a 10.00 fixed-amount manual charge, lets Admin change that charge to a 10% percent charge, shows the updated `Add10%` selected state in the recalled order charge dialog, keeps the saved order at 10.00 until reapply, then recalculates the order charge from the current subtotal after reselecting the charge.
- POS-27158 stub behavior persists saved orders across POS reload, models `manu_test_perc` as a 10% manual charge, lets Admin change that charge to a fixed 10.00 amount, shows the updated `Add $10.00` selected state in the recalled order charge dialog, and syncs the fixed amount back to the edited order when the dialog is confirmed.
- POS-27159 stub behavior persists saved orders across POS reload, models `manu_test_fixed` as a 10.00 fixed-amount manual charge, lets Admin change that charge amount to 20.00, shows the updated `Add $20.00` selected state in the recalled order charge dialog, and syncs the changed fixed amount back to the edited order when the dialog is confirmed.
- POS-27160 stub behavior persists saved orders across POS reload, models `manu_test_perc` as a 10% manual charge, lets Admin change that charge percentage value to 20%, shows the updated `Add20%` selected state in the recalled order charge dialog, and recalculates the edited order charge from the current subtotal when the dialog is confirmed.
- POS-27163 stub behavior persists saved order tax text separately from current Admin charge configuration, models `manu_test_fixed` as non-taxed until Admin changes it, preserves the edited order's original tax before charge confirmation, then syncs the updated taxed charge and recalculates tax after dialog OK.
- POS-27164 stub behavior persists the saved order type, lets Admin restrict `manu_test_fixed` to Dine In and Delivery, restores the Dine In order type when entering Recall edit, keeps the existing fixed charge selected because Dine In still matches, and preserves the charge amount after dialog OK.
- POS-27165 stub behavior persists the saved order type, lets Admin restrict `manu_test_fixed` to Delivery only, restores the Dine In order type when entering Recall edit, filters `manu_test_fixed` out of the selected preset charge list because Dine In no longer matches, and preserves the existing charge amount after dialog OK.
- POS-27169 stub behavior persists the saved order's charge label and amount separately from the deleted manual charge configuration, renders that legacy selected state when no manual charge definitions remain, and preserves the existing charge amount after dialog OK.
- POS-27170 stub behavior models auto fixed charge setup separately from manual charges, applies the auto charge when a Dine In item is added, persists the charge trigger mode on the saved order, and syncs the recalled edit charge label from current auto-charge configuration after Admin renames it.
- POS-27171 stub behavior models the saved auto fixed charge separately from manual charges, persists its trigger mode, lets Admin change the auto charge to a 10% percent rate, and recalculates the recalled edit charge amount from the current subtotal.
- POS-27172 stub behavior models the saved auto percent charge separately from manual charges, persists its trigger mode, lets Admin change the auto charge to a fixed 10.00 amount, and syncs the recalled edit charge amount from current auto-charge configuration.
- POS-27173 stub behavior models the saved auto fixed charge separately from manual charges, persists its trigger mode, lets Admin change that auto charge amount to 20.00, and syncs the recalled edit charge amount from current auto-charge configuration.
- POS-27174 stub behavior models the saved auto percent charge separately from manual charges, persists its trigger mode, lets Admin change that auto charge percent value to 20%, and recalculates the recalled edit charge amount from the current subtotal.
- POS-27176 stub behavior models the saved auto fixed charge separately from manual charges, persists its trigger mode, lets Admin restrict that auto charge to Delivery only, and clears the recalled Dine In edit charge because the current order type no longer matches.
- POS-27177 stub behavior models the saved auto fixed charge separately from manual charges, persists its trigger mode, lets Admin mark that auto charge taxed, and recalculates recalled edit tax from item tax plus current auto-charge tax.
- POS-27182 stub behavior models source `delete_charge_by_name(auto_test_fixed)` by deleting the named auto charge from offline charge configuration, then clears the recalled edit charge because its saved auto-charge trigger no longer resolves to an active auto charge.
- POS-27190 stub behavior stores the saved auto charge snapshot on the order detail, lets Admin rename and change the active auto charge definition, and keeps Recall detail send-kitchen from recalculating the saved detail charge.
- POS-27191 stub behavior stores the saved manual charge snapshot on the order detail, lets Admin rename and change the active manual charge definition, and keeps edit-page send all from replacing the saved manual charge snapshot.
- POS-27192 stub behavior stores the saved auto charge snapshot on the order, lets Admin rename and change the active auto charge definition, and when Recall edit is opened it falls back to the current applicable auto charge if the saved auto charge can no longer match by old name or amount.
- POS-27229 stub behavior stores the saved auto charge snapshot on the order detail, lets Admin rename and change the active auto charge definition, and when Recall detail even-splits the order it prorates the saved fixed auto charge across suborders without replacing the label or amount from current Admin configuration.
- POS-27242 stub behavior stores the saved manual charge snapshot on the order detail, lets Admin rename and change the active manual charge definition, and when Recall edit drag-splits the order it prorates the saved fixed manual charge by each suborder subtotal without replacing the label or amount from current Admin configuration.
- POS-27248 stub behavior stores the saved auto charge snapshot on the order detail, lets Admin rename and change the active auto charge definition, syncs current edit state into the Recall split path, and even-splits the current fixed auto charge across suborders.
- POS-27257 stub behavior stores the saved auto charge snapshot on the order detail, lets Admin rename and convert the active auto charge to 20%, and syncs copied auto-charge orders from current auto charge configuration.
- POS-27258 stub behavior persists the saved order guest count, lets Admin set `auto_test1` min guest to 1, and syncs copied auto-charge orders from current auto charge configuration only when the saved order type and guest count satisfy the current charge filters.
- POS-27259 stub behavior persists the saved order guest count, lets Admin set `auto_test1` min guest to 2, and clears copied auto-charge order charge state when the saved Dine In order guest count 1 does not satisfy the current charge filters.
- POS-27271 stub behavior persists the saved delivery distance, models source Delivery order creation with default 0 mile, lets Admin set `auto_test1` min mile to 5, and clears copied auto-charge order charge state when the saved Delivery order distance does not satisfy the current charge filters.
- POS-27286 stub behavior persists the saved order's auto trigger mode, moves `auto_test_fixed` from the automatic charge set to the manual charge set when Admin changes its trigger type, and clears copied order charge state because copied auto-charge orders are resolved only against the current automatic charge configuration.
- POS-27287 stub behavior persists the saved order's manual trigger mode, moves `manu_test_fixed` from the manual charge set to the automatic charge set when Admin changes its trigger type, and syncs copied order charge state from that current automatic charge configuration.
- POS-27288 stub behavior persists the saved order's manual trigger mode, moves `manu_test_fixed` from the manual charge set to the automatic charge set, sets its min amount to 1000, and clears copied order charge state when the copied order subtotal does not satisfy that current automatic charge filter.
- POS-27303 stub behavior stores each saved order's manual charge label and amount as an order snapshot, lets Admin rename/change/delete the active charge definitions, and when Recall combines the orders it renders both saved charge snapshots instead of recalculating from current Admin configuration.
- POS-27314 stub behavior stores the saved order's auto charge label and amount as an order snapshot, lets Admin rename/change the active auto charge definition, and when Recall moves the first item to a new order it clears charge state on the new order while preserving the source order's saved charge snapshot.
- POS-27317 stub behavior moves the first source order item into an existing target order, recalculates both order subtotals, leaves target order charge state unchanged, and preserves the source order's saved manual charge snapshot.
- POS-27324 stub behavior persists saved split suborder state before reload, snapshots the selected suborder's saved auto charge amount, and creates the moved order with that snapshot instead of recalculating from the modified active auto charge definition.
- POS-27325 stub behavior persists saved split suborder state before reload, snapshots the selected suborder's saved auto charge amount, deletes the active auto charge definition, and creates the moved order with the saved snapshot instead of dropping the charge.
- POS-30756 stub behavior stores a server name on saved orders, updates the first credit payment record and settlement total when a paid order receives a tip, and changes only the server name when Recall change-server is invoked.
- POS-31301 stub behavior persists `originalPrice` with discounted order items, renders Recall discount rows with original/current prices, restores all item prices from `originalPrice` when Clear All is invoked, recalculates subtotal, and persists the saved order.
- POS-31081 stub behavior stores `shareTip` on configured auto charges and saved orders, includes saved order charge amounts with `orderChargeShareTip=true` in Report Fee Amount, and leaves the saved order charge amount unchanged when amount split state is saved.
- POS-30566 stub behavior exposes Report homepage Unpaid as the remaining balance of non-paid/non-void saved orders, records a credit payment row for the paid order, supports 100-cent partial refunds against payment record 1, and does not count paid-order credit refunds as Report Unpaid.

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
| POS-25235-live | Order-page even split save=False path, suborder cash payment for both suborders, selected suborder state after settlement, and paid cash-tip input/display are only stub-verified | Run live smoke for POS-25235 and record selector/data gaps before removing live gap |
| POS-19386-live | Changed-price seat split tip allocation, reduce-item save, and suborder tip display are only stub-verified | Run live smoke for POS-19386 and record selector/data gaps before removing live gap |
| POS-19389-live | Changed-price seat split tip allocation, fixed item discount save, and suborder tip display are only stub-verified | Run live smoke for POS-19389 and record selector/data gaps before removing live gap |
| POS-19517-live | Even-pay settlement, credit test-only payment, cash tender, payment record refund action, and payment record ordering are only stub-verified | Run live smoke for POS-19517 and record selector/device/data gaps before removing live gap |
| POS-21845-live | Dynamic amount split rows, parent total display, amount split save confirmation, and fixed suborder total display are only stub-verified | Run live smoke for POS-21845 and record selector/data gaps before removing live gap |
| POS-21855-live | Void reason chooser and reason option count are only stub-verified | Run live smoke for POS-21855 and record selector/configuration gaps before removing live gap |
| POS-22813-live | Taxable 5% order charge selection, send-all state, drag split gesture, suborder edit charge-clear action, cash payment, and paid suborder price detail selector are only stub-verified | Run live smoke for POS-22813 and record selector/data gaps before removing live gap |
| POS-23204-whole-discount-clear-live | Whole-order discount dialog, multi-item discount selection, clear whole-order discount action, and order price detail selector are only stub-verified | Run live smoke for POS-23204 whole-order discount clear and record selector/data gaps before removing live gap |
| POS-23204-item-discount-clear-live | Item discount dialog, multi-item discount selection, clear selected item discount action, and order line item text selector are only stub-verified | Run live smoke for POS-23204 item discount clear and record selector/data gaps before removing live gap |
| POS-23322-live | Settlement partial cash payment, post-partial-payment tip input recalculation, unpaid amount display, and Recall paid status selector are only stub-verified | Run live smoke for POS-23322 and record selector/data gaps before removing live gap |
| POS-24394-live | Global Option No path, order total selector, Recall More/Copy action, copied order save behavior, and copied recent-order selector are only stub-verified | Run live smoke for POS-24394 and record selector/data gaps before removing live gap |
| POS-23671-live | Real 10% manual charge dialog with charge tax unchecked, item tax exempt action, Recall More/Combine action, and combined order total selector are only stub-verified | Run live smoke for POS-23671 and record selector/data gaps before removing live gap |
| POS-23672-live | Real 10% manual charge dialog with charge tax checked, item tax exempt action, Recall More/Combine action, and combined order total selector are only stub-verified | Run live smoke for POS-23672 and record selector/data gaps before removing live gap |
| POS-27156-live | Real Admin charge rename selectors, fixed-amount preset charge selected state, Recall edit price-detail selector, and the source double-click refresh behavior are only stub-verified | Run live smoke for POS-27156 and record selector/data gaps before removing live gap |
| POS-27157-live | Real Admin charge rate-type edit selectors, preset charge selected-state text, Recall edit subtotal/price-detail selectors, and the source double-click refresh behavior are only stub-verified | Run live smoke for POS-27157 and record selector/data gaps before removing live gap |
| POS-27158-live | Real Admin charge rate-type edit selectors, preset percent-to-amount selected-state text, Recall edit subtotal/price-detail selectors, and dialog OK synchronization are only stub-verified | Run live smoke for POS-27158 and record selector/data gaps before removing live gap |
| POS-27159-live | Real Admin charge amount edit selectors, preset fixed-amount selected-state text, Recall edit price-detail selectors, and dialog OK synchronization are only stub-verified | Run live smoke for POS-27159 and record selector/data gaps before removing live gap |
| POS-27160-live | Real Admin charge percent value edit selectors, preset percent selected-state text, Recall edit subtotal/price-detail selectors, and dialog OK synchronization are only stub-verified | Run live smoke for POS-27160 and record selector/data gaps before removing live gap |
| POS-27163-live | Real Admin charge tax edit selectors, Recall tax selector, edit-entry tax preservation, and dialog OK tax recalculation are only stub-verified | Run live smoke for POS-27163 and record selector/data gaps before removing live gap |
| POS-27164-live | Real Admin charge order-type edit selectors, Recall edit order-type restoration, preset selected-state filtering, and dialog OK synchronization are only stub-verified | Run live smoke for POS-27164 and record selector/data gaps before removing live gap |
| POS-27165-live | Real Admin charge order-type edit selectors, Recall edit order-type restoration, preset selected-state filtering for non-matching order types, and dialog OK preservation are only stub-verified | Run live smoke for POS-27165 and record selector/data gaps before removing live gap |
| POS-27169-live | Real charge delete API/Admin selector, deleted charge legacy selected-state behavior, Recall edit price-detail selector, and dialog OK preservation are only stub-verified | Run live smoke for POS-27169 and record selector/data gaps before removing live gap |
| POS-27170-live | Real auto charge setup API/Admin selector, auto-charge trigger timing, Recall edit price-detail selector, and renamed auto-charge synchronization are only stub-verified | Run live smoke for POS-27170 and record selector/data gaps before removing live gap |
| POS-27171-live | Real auto charge setup API/Admin selector, rate-type edit selector, auto-charge recalculation timing, and Recall edit subtotal/price-detail selectors are only stub-verified | Run live smoke for POS-27171 and record selector/data gaps before removing live gap |
| POS-27172-live | Real auto percent charge setup API/Admin selector, rate-type edit selector, auto-charge recalculation timing, and Recall edit price-detail selectors are only stub-verified | Run live smoke for POS-27172 and record selector/data gaps before removing live gap |
| POS-27173-live | Real auto charge setup API/Admin selector, amount edit selector, auto-charge recalculation timing, and Recall edit price-detail selectors are only stub-verified | Run live smoke for POS-27173 and record selector/data gaps before removing live gap |
| POS-27174-live | Real auto percent charge setup API/Admin selector, percent amount edit selector, auto-charge recalculation timing, and Recall edit subtotal/price-detail selectors are only stub-verified | Run live smoke for POS-27174 and record selector/data gaps before removing live gap |
| POS-27176-live | Real auto charge setup API/Admin selector, order-type edit selector, auto-charge applicability filtering, and Recall edit price-detail selectors are only stub-verified | Run live smoke for POS-27176 and record selector/data gaps before removing live gap |
| POS-27177-live | Real auto charge setup API/Admin selector, auto charge tax edit selector, Recall edit tax selector, and auto-charge tax recalculation timing are only stub-verified | Run live smoke for POS-27177 and record selector/data gaps before removing live gap |
| POS-27182-live | Real charge delete API/Admin selector, auto-charge deletion propagation, and Recall edit price-detail selectors are only stub-verified | Run live smoke for POS-27182 and record selector/data gaps before removing live gap |
| POS-27190-live | Real auto charge setup/modify API or Admin selector, Recall detail send-kitchen selector, and detail price-charge selectors are only stub-verified | Run live smoke for POS-27190 and record selector/data gaps before removing live gap |
| POS-27191-live | Real manual charge setup/modify API or Admin selector, Recall edit send-all selector, and detail price-charge selectors are only stub-verified | Run live smoke for POS-27191 and record selector/data gaps before removing live gap |
| POS-27192-live | Real auto charge setup/modify API or Admin selector, Recall edit save selector, and detail price-charge selectors are only stub-verified | Run live smoke for POS-27192 and record selector/data gaps before removing live gap |
| POS-27229-live | Real auto charge setup/modify API or Admin selector, Recall detail even-split selector, suborder selection, and suborder price-charge selectors are only stub-verified | Run live smoke for POS-27229 and record selector/data gaps before removing live gap |
| POS-27242-live | Real manual charge setup/modify API or Admin selector, Recall edit split-by-drag selector, suborder selection, and suborder price-charge selectors are only stub-verified | Run live smoke for POS-27242 and record selector/data gaps before removing live gap |
| POS-27248-live | Real auto charge setup/modify/delete API or Admin selector, Recall edit even-split selector, suborder selection, and suborder price-charge selectors are only stub-verified | Run live smoke for POS-27248 and record selector/data gaps before removing live gap |
| POS-27257-live | Real auto charge setup/modify/delete API or Admin selector, Recall More/Copy selector, copied-order selection, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27257 and record selector/data gaps before removing live gap |
| POS-27258-live | Real auto charge setup/min_guest/delete API or Admin selector, Recall More/Copy selector, copied-order guest-count propagation, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27258 and record selector/data gaps before removing live gap |
| POS-27259-live | Real auto charge setup/min_guest/delete API or Admin selector, Recall More/Copy selector, copied-order guest-count propagation, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27259 and record selector/data gaps before removing live gap |
| POS-27271-live | Real auto delivery charge setup/min_mile/delete API or Admin selector, delivery mileage source, Recall More/Copy selector, copied-order delivery mileage propagation, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27271 and record selector/data gaps before removing live gap |
| POS-27286-live | Real auto charge setup/trigger-mode modify/delete API or Admin selector, Recall More/Copy selector, copied-order trigger-mode synchronization, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27286 and record selector/data gaps before removing live gap |
| POS-27287-live | Real manual charge setup/trigger-mode modify/delete API or Admin selector, Recall More/Copy selector, copied-order manual-to-auto synchronization, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27287 and record selector/data gaps before removing live gap |
| POS-27288-live | Real manual charge setup/trigger-mode/min_amount modify/delete API or Admin selector, Recall More/Copy selector, copied-order manual-to-auto min-amount filtering, and copied-order price-charge selectors are only stub-verified | Run live smoke for POS-27288 and record selector/data gaps before removing live gap |
| POS-27303-live | Real manual charge setup/modify/delete API or Admin selector, Recall More/Combine selector, combined-order multi-charge price detail, and combined charge total selector are only stub-verified | Run live smoke for POS-27303 and record selector/data gaps before removing live gap |
| POS-27314-live | Real auto charge setup/modify/delete API or Admin selector, Recall More/Move Item selector and item selection, post-move record selection, moved-order charge recalculation, and price-charge selectors are only stub-verified | Run live smoke for POS-27314 and record selector/data gaps before removing live gap |
| POS-27317-live | Real manual charge setup fixture, Recall More/Move Item selector and target-order selector, post-move target/source record selection, moved-item subtotal recalculation, and price-charge selectors are only stub-verified | Run live smoke for POS-27317 and record selector/data gaps before removing live gap |
| POS-27324-live | Real auto charge setup/modify API or Admin selector, order-page drag split source behavior, Recall suborder selection, More/Move Order selector, moved-order selection, and suborder price-charge selectors are only stub-verified | Run live smoke for POS-27324 and record selector/data gaps before removing live gap |
| POS-27325-live | Real auto charge setup/delete API or Admin selector, order-page drag split source behavior, Recall suborder selection, More/Move Order selector, moved-order selection, and suborder price-charge selectors are only stub-verified | Run live smoke for POS-27325 and record selector/data gaps before removing live gap |
| POS-30756-live | Real CDS close setup, credit test-only payment device/path, Recall unpaid filter, add-tip dialog, server selector/change-server UI, rounding persistence, and payment-record amount selectors are only stub-verified | Run live smoke for POS-30756 and record selector/device/data gaps before removing live gap |
| POS-31301-live | Real Recall discount panel, Clear All button, Discount OK behavior, and pre/last discount row amount selectors are only stub-verified | Run live smoke for POS-31301 and record selector/data gaps before removing live gap |
| POS-31081-live | Real ChargeAPI add/delete charge with share_tip=True, Report password/Total Report navigation, Fee Amount selector, report sync timing, Recall split-by-amount dialog, cover/exit behavior are only stub-verified | Run live smoke for POS-31081 and record API/selector/report-sync gaps before removing live gap |
| POS-30566-live | Real Report password/Total Report navigation, homepage Unpaid selector, credit payment device/path, Recall Unpaid filter, recent order selection, partial payment-record refund amount dialog, cover/exit behavior, and report sync timing are only stub-verified | Run live smoke for POS-30566 and record selector/device/report-sync gaps before removing live gap |

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
