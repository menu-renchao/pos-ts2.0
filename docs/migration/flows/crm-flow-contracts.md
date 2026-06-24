# CRM Flow Contracts

These contracts gate migration for all active source rows under `crm/*.py`.

## CRM Member Enrollment And Lookup Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| crm/test_crm_join_member.py | TestJoinMember | `test_join_member_*`, `test_jump_member_*`, `test_search_by_phone_only_finds_cloud_members` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.joinMember`, `CrmMemberFlow.searchMemberByPhone`, `CrmMemberFlow.openMemberProfile` |
| crm/test_crm_order.py | TestCRMOrder | `test_join_member_*`, `test_order_select_phone`, `test_settle_select_member`, `test_settle_switch_member` | tests/crm/crm-order.spec.ts | `CrmMemberFlow.attachMemberToOrder`, `CrmMemberFlow.switchSettlementMember` |

### Preconditions

- POS home entry follows `PosEntryFlow`.
- CRM member data is provided by typed factories, not inline timestamps in specs.
- Phone and email uniqueness is represented by CRM client state in stub mode.
- Permission-sensitive member lookup cases use explicit staff/permission fixture state.

### Steps

1. Enter POS or settlement context through UI navigation.
2. Open member join, member search, or customer selection UI.
3. Create or search for the member using source-equivalent input data.
4. Attach, switch, or open the member profile according to the source case.
5. Read member identity, permission result, and visible member state.

### Expected Assertions

- Member name, phone, and email validation results match the source scenario.
- Existing phone conflicts and cloud-member-only search behavior are preserved.
- Member selection on order or settlement page updates the active order context.
- Permission-denied member navigation produces the expected blocked state.

### Page Responsibilities

- `PosCrmPage` owns POS-side member dialog controls and reads.
- `CrmLoginPage`, `BusinessChoosePage`, and `LoyaltyMemberPage` own CRM web-side login, business selection, and member profile reads.
- `SettlementPage` owns settlement-side member selection controls.

### Client/Data Responsibilities

- `test-data/crm/members.ts` owns member samples and factories.
- `StubCrmMemberClient` owns member uniqueness, cloud-member source, reward balance, and lookup state.
- `StubPosOrderClient` owns the active order/member association in stub mode.

### Stub Behavior

- Stub member creation stores deterministic member records in memory.
- Stub lookup distinguishes POS-local and cloud member records when a source case requires that distinction.
- Stub mode does not log in to the live CRM web app.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| selector | POS member dialogs and CRM web pages need actual DOM contracts | Confirm stable selectors or request `data-testid` |
| data | Live CRM member uniqueness depends on environment state | Define seeded member cleanup/setup through client adapters |
| permission | Staff permission state may require API setup | Add typed staff/permission client methods before live verification |

## CRM Redeem, Discount, Rights, And Loyalty Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| crm/test_crm_order.py | TestCRMOrder | `test_delivery_redeem`, `test_remove_redeem_reselect`, `test_order_redeem_item_switch`, `test_settle_redeem_free_item` | tests/crm/crm-order.spec.ts | `CrmRewardFlow.applyRedeemItem`, `CrmRewardFlow.removeRedeemItem`, `CrmRewardFlow.switchRedeemItem` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_redeem_*`, `test_max_discount`, `test_reduce_item0` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmRewardFlow.applyRedeemDiscount`, `CrmRewardFlow.validateRedeemPricing` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_redeem_*`, `test_pay_page_redeem_item`, `test_semipay_page_redeem_*` | tests/crm/crm-paypage.spec.ts | `CrmSettlementFlow.applyPayPageRedeem`, `CrmSettlementFlow.applySemiPayRedeem` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_login_member_redeem_point`, `test_earn_points_rules_by_spent_pos_order`, `test_redeem_free_item_modify_global_option` | tests/crm/crm-points-calculation.spec.ts | `CrmPointsFlow.redeemPoints`, `CrmPointsFlow.earnPointsForOrder` |

### Preconditions

- An active member is attached to the order or settlement context.
- Reward, discount, point, and benefit-card samples exist in typed CRM test data.
- Order item, option, combo, tax, and charge samples exist in POS test data.
- Stub CRM rewards client can represent redeem balance, point balance, and benefit rules.

### Steps

1. Create or recall an order through POS order flows.
2. Attach a CRM member.
3. Apply redeem item, redeem amount, redeem percentage, member price, rights, or point operation.
4. Modify source-specified items/options/discounts when required.
5. Read order summary and reward/point state before and after payment or void/refund.

### Expected Assertions

- Redeem item visibility, removal, reselection, and switching match the source behavior.
- Discounted item price, options price, subtotal, tax, and total are numeric and source-equivalent.
- Point earning, redemption, void, and refund effects match expected balance changes.
- Semi-pay and pay-page redemption update only the intended order/suborder context.

### Page Responsibilities

- `OrderDishesPage` owns POS order item and summary reads.
- `PosCrmPage` owns reward and member operations inside POS.
- `SettlementPage` owns pay-page and semi-pay redeem controls.
- `RecallPage` owns post-payment, void, and refund state checks.

### Client/Data Responsibilities

- `test-data/crm/members.ts` owns member, reward, rights, and point samples.
- `test-data/pos/dishes.ts` owns redeemable dishes/options/combos.
- `StubCrmRewardClient` owns reward rules and point balances.
- `StubPosOrderClient` owns order state transitions for payment, void, and refund.

### Stub Behavior

- Stub rewards apply deterministic pricing deltas.
- Stub point balance is updated only through named flow/client methods.
- Stub mode does not call live CRM reward APIs.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| API | Reward and point rules require real CRM/cloud response contracts | Add typed response-field mapping and contract tests |
| data | Live reward eligibility depends on configured loyalty programs | Define seeded loyalty program and cleanup strategy |
| selector | Reward dialogs and pay-page CRM controls need DOM confirmation | Confirm stable selectors or request `data-testid` |

## CRM Copy, Move, Combine, Split, And Suborder Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| crm/test_crm_copy_move_order.py | TestCRMCopyItem | `test_combine_*`, `test_remove_split_order_*`, `test_remove_item_*`, `test_recall_pay_order_*` | tests/crm/crm-copy-move-order.spec.ts | `CrmOrderTransferFlow.combineOrdersWithRewards`, `CrmOrderTransferFlow.removeRewardFromMovedItem` |
| crm/test_crm_split_crm_order.py | TestSplitCrmOrder | `test_split_order_*` | tests/crm/crm-split-order.spec.ts | `CrmOrderTransferFlow.splitOrderWithRewards`, `CrmSettlementFlow.payRewardSuborder` |
| crm/test_crm_copy_move_order.py | TestCRMCopyItem | `test_combine_order_redeem`, `test_combine_order_redeem_discount` | tests/crm/crm-copy-move-order.spec.ts | `CrmOrderTransferFlow.combineOrdersWithRewards` |
| crm/test_crm_copy_move_order.py | TestCRMCopyItem | `test_remove_split_order_redeem_item` | tests/crm/crm-copy-move-order.spec.ts | `CrmOrderTransferFlow.splitRedeemItemOrderAndReadMoveOrderAvailability` |
| crm/test_crm_copy_move_order.py | TestCRMCopyItem | `test_remove_item_redeem_item` | tests/crm/crm-copy-move-order.spec.ts | `CrmOrderTransferFlow.saveRedeemItemOrderAndReadMoveItemAvailability` |
| crm/test_crm_copy_move_order.py | TestCRMCopyItem | `test_recall_pay_order_redeem_discount` | tests/crm/crm-copy-move-order.spec.ts | `CrmOrderTransferFlow.payRecalledOrderWithRedeemDiscount` |

### Preconditions

- Source order contains CRM member context and at least one redeem/discount item.
- Split/combine/copy/move operations use POS UI flows, not direct DB manipulation.
- Stub order client can represent parent order, suborders, moved items, merged orders, and reward ownership.
- CRM copy/move source rows use seeded members `crmSourceRewardMember` and `crmTargetRewardMember`.
- CRM reward settings use deterministic `crmRewardSettings.discountRate = 0.1` and `pointsPerPaidOrder = 10`.

### Steps

1. Create one or more CRM member orders.
2. Apply source-equivalent redeem or discount state.
3. Execute split, combine, copy, move, or remove operation.
4. Open affected order or suborder.
5. Read reward state, item ownership, totals, and payment state.
6. For `CrmOrderTransferFlow.combineOrdersWithRewards`, create two Dine In orders with different members; optionally apply `10% Off` to the target order; combine the other order into the selected owner order; pay by cash.
7. For `CrmOrderTransferFlow.splitRedeemItemOrderAndReadMoveOrderAvailability`, create a To Go order with CRM redeem item, split evenly, save, open suborder, and read move-order availability.
8. For `CrmOrderTransferFlow.saveRedeemItemOrderAndReadMoveItemAvailability`, create and save a CRM redeem item order, recall it, and read move-item availability.
9. For `CrmOrderTransferFlow.payRecalledOrderWithRedeemDiscount`, save a member order, recall it, enter payment, apply percentage redeem discount, pay cash, and read price summary.

### Expected Assertions

- Reward pricing remains attached to the correct item/order/suborder after transfer.
- Removed reward items do not leave stale discounts.
- Combined orders recalculate totals and reward discounts according to source behavior.
- Paying a reward suborder affects only the intended suborder and parent order state.
- `test_combine_order_redeem`: combined order keeps source member name and point balance; cash payment increases points by 20; member remains unchanged.
- `test_combine_order_redeem_discount`: combined order keeps target member and point balance; Reward Discount equals negative 10% of combined subtotal; cash payment increases points by 20.
- `test_remove_split_order_redeem_item`: redeem-item suborder does not expose Move Order.
- `test_remove_item_redeem_item`: redeem-item recalled order does not expose Move Item.
- `test_recall_pay_order_redeem_discount`: Recall payment discount recalculates Reward as negative 10% of subtotal.

### Page Responsibilities

- `SplitOrderPage` owns split, combine, move, and copy UI controls.
- `OrderDishesPage` owns line-item and amount reads.
- `RecallPage` owns recalled order/suborder detail reads.
- `SettlementPage` owns suborder payment controls.
- `PosCrmPage.openRedeem`, `PosCrmPage.selectMemberByPhone`, `PosCrmPage.applyRedeemDiscount`, `PosCrmPage.applyRedeemItem`, `PosCrmPage.quitRedeem`, `PosCrmPage.openRedeemSplit`, `PosCrmPage.readHeaderPointBalance`, and `PosCrmPage.readMemberName` own POS-side CRM reward/member interactions.
- `SplitOrderPage.splitEvenly` and `SplitOrderPage.save` own the CRM redeem split save path used by POS-29869.
- `RecallPage.combineCrmOrder`, `RecallPage.readCrmPointBalance`, `RecallPage.readCrmMemberName`, `RecallPage.readOrderPriceSummary`, `RecallPage.settleAllByCash`, `RecallPage.cancelAllCondition`, `RecallPage.clickSettle`, `RecallPage.applyRedeemDiscount`, `RecallPage.payCurrentOrderByCash`, `RecallPage.isMoveOrderVisible`, and `RecallPage.isMoveItemVisible` own Recall-side CRM transfer and payment reads.

### Client/Data Responsibilities

- `StubPosOrderClient` owns order graph state for split/combine/move/copy.
- `StubCrmRewardClient` owns reward ownership and recalculation rules.
- `test-data/pos/dishes.ts` and `test-data/crm/members.ts` own scenario samples.
- `StubCrmRewardClient.findMemberByPhone` resolves seeded CRM member identities.
- `StubCrmRewardClient.calculateDiscount` defines the deterministic 10% Reward Discount rule used by POS-29862 and POS-29910.
- `StubCrmRewardClient.canMoveOrder` and `StubCrmRewardClient.canMoveItem` define the redeem-item transfer restriction.
- `test-data/crm/members.ts` owns `crmSourceRewardMember`, `crmTargetRewardMember`, and `crmRewardSettings`.
- `test-data/pos/dishes.ts` owns `groupSwitchDish`, `categorySwitchDish`, and `crmRedeemItemDish`.

### Stub Behavior

- Stub mode represents order graph changes deterministically in memory.
- Reward recalculation is explicit in the flow/client method rather than hidden in page objects.
- Offline POS stores CRM member, point balance, redeem discount rate, redeem item flag, and reward amount on the saved order.
- Offline combine merges source order items into the selected owner order without changing the owner member.
- Offline cash payment adds 20 points to the selected combined or recalled member order.
- Offline redeem-item orders hide Move Order and Move Item controls after split/recall.

### Live Gaps

| gap | reason | required before verified |
|---|---|---|
| state | Live split/combine behavior may be eventually consistent | Add settled-state wait contract using `waitUntil` |
| data | Reward ownership and suborder identity need stable seeded data | Define order setup and cleanup client contracts |
| selector | Split/combine dialogs need DOM confirmation | Confirm stable selectors or request `data-testid` |
