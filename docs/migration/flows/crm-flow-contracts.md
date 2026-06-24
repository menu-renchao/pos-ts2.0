# CRM Flow Contracts

These contracts gate migration for all active source rows under `crm/*.py`.

## CRM Member Enrollment And Lookup Flow

### Source Coverage

| source_file | source_class | source_test_patterns | target_specs | target_flow_methods |
|---|---|---|---|---|
| crm/test_crm_join_member.py | TestJoinMember | `test_join_member_*`, `test_jump_member_*`, `test_search_by_phone_only_finds_cloud_members` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.joinMember`, `CrmMemberFlow.searchMemberByPhone`, `CrmMemberFlow.openMemberProfile` |
| crm/test_crm_order.py | TestCRMOrder | `test_join_member_*`, `test_order_select_phone`, `test_settle_select_member`, `test_settle_switch_member` | tests/crm/crm-order.spec.ts | `CrmMemberFlow.attachMemberToOrder`, `CrmMemberFlow.switchSettlementMember` |
| crm/test_crm_join_member.py | TestJoinMember | `test_join_member_first_name_last_name` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.validateJoinMemberRequiresPhoneOrEmail` |
| crm/test_crm_join_member.py | TestJoinMember | `test_join_member_phone_is_exist` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.validateDuplicatePhoneRejected` |
| crm/test_crm_join_member.py | TestJoinMember | `test_join_member_phone` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.joinMemberByPhoneAndSearchInMemberList` |
| crm/test_crm_join_member.py | TestJoinMember | `test_jump_member_page` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.openMemberListWithPermission` |
| crm/test_crm_join_member.py | TestJoinMember | `test_jump_member_no_permission` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.openMemberListWithManagerOverride` |
| crm/test_crm_join_member.py | TestJoinMember | `test_search_by_phone_only_finds_cloud_members` | tests/crm/crm-join-member.spec.ts | `CrmMemberFlow.searchRedeemPhoneFindsCloudMemberOnly` |
| crm/test_crm_order.py | TestCRMOrder | `test_join_member_phone` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.joinMemberByPhoneFromOrderAndSearch` |
| crm/test_crm_order.py | TestCRMOrder | `test_settle_join_member_phone` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.settleJoinMemberByEmailAndSearch` |
| crm/test_crm_order.py | TestCRMOrder | `test_order_select_phone` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.compareAdminMemberLookupWithRedeemSelection` |
| crm/test_crm_order.py | TestCRMOrder | `test_settle_select_member` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.selectSettlementMemberAndReadAvailableRedeems` |
| crm/test_crm_order.py | TestCRMOrder | `test_settle_switch_member` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.switchSettlementMemberApplyDiscountAndReadPoints` |

### Preconditions

- POS home entry follows `PosEntryFlow`.
- CRM member data is provided by typed factories, not inline timestamps in specs.
- Phone and email uniqueness is represented by CRM client state in stub mode.
- Permission-sensitive member lookup cases use explicit staff/permission fixture state.
- Join Member registration errors are read from POS UI, not inferred in the spec.
- The cloud/local duplicate phone search case uses seeded `existingCrmMember` and `localOnlyMember` with the same phone.

### Steps

1. Enter POS or settlement context through UI navigation.
2. Open member join, member search, or customer selection UI.
3. Create or search for the member using source-equivalent input data.
4. Attach, switch, or open the member profile according to the source case.
5. Read member identity, permission result, and visible member state.
6. `CrmMemberFlow.validateJoinMemberRequiresPhoneOrEmail`: open Join Member, fill first and last name only, save, read validation error.
7. `CrmMemberFlow.validateDuplicatePhoneRejected`: open Join Member, fill seeded duplicate phone and name, save, read duplicate validation error.
8. `CrmMemberFlow.joinMemberByPhoneAndSearchInMemberList`: create a deterministic phone member, open Admin CRM Loyalty, search the member list, read the phone result.
9. `CrmMemberFlow.openMemberListWithPermission`: open Admin CRM Loyalty as a permitted employee and verify Member List display.
10. `CrmMemberFlow.openMemberListWithManagerOverride`: log in as a no-permission employee, open Admin CRM Loyalty, submit manager password, verify Member List display.
11. `CrmMemberFlow.searchRedeemPhoneFindsCloudMemberOnly`: open Dine In, open Redeem, search the shared phone, and assert the cloud member result.
12. `CrmOrderFlow.joinMemberByPhoneFromOrderAndSearch`: enter Dine In, open Redeem, open Add New Loyalty, create a phone-only member, save the order, open Admin CRM Loyalty, search the created phone, and read email/phone search results.
13. `CrmOrderFlow.settleJoinMemberByEmailAndSearch`: attach a member to a Dine In order, enter settlement switch-member flow, create an email-only loyalty member, apply it, pay cash, open Admin CRM Loyalty, and search the created email.
14. `CrmOrderFlow.compareAdminMemberLookupWithRedeemSelection`: search Admin CRM Loyalty by `+16467337557`, read name/points, enter Dine In Redeem, select `(64)673-37557`, and read selected member/points.
15. `CrmOrderFlow.selectSettlementMemberAndReadAvailableRedeems`: create a Dine In order, enter settlement Select Member, choose the source CRM member, read displayed member/points, and count available redeem operations.
16. `CrmOrderFlow.switchSettlementMemberApplyDiscountAndReadPoints`: attach source member, apply `10% Off`, add two dishes, enter settlement, switch to target member, record target points, apply `20% Off`, pay cash, recall the order, and compare Admin CRM Loyalty point balances for both members.

### Expected Assertions

- Member name, phone, and email validation results match the source scenario.
- Existing phone conflicts and cloud-member-only search behavior are preserved.
- Member selection on order or settlement page updates the active order context.
- Permission-denied member navigation produces the expected blocked state.
- First/last-name-only registration returns `At least one phone and email is required`.
- Duplicate phone registration returns `Phone or email already be registered.`.
- Phone-only registration appears in Member List with a `+1` phone prefix.
- CRM Loyalty navigation displays Member List directly for permitted users and after manager override for no-permission users.
- Redeem phone search returns `cloud member` and excludes the local member with the same phone.
- Redeem Add New Loyalty phone-only registration appears in Admin CRM Loyalty with empty email and `+1` phone prefix.
- Settlement Add New Loyalty email-only registration appears in Admin CRM Loyalty with matching email and empty phone.
- Admin CRM Loyalty member name/points match the member and point balance selected from POS order-side Redeem.
- Settlement Select Member displays the selected member/points and exposes discount and credit redemption while hiding free-item redemption.
- Settlement Switch Member recalculates Reward Discount from the new member's 20% discount, keeps the source member points unchanged, and applies target member point deduction plus payment earning.

### Page Responsibilities

- `PosCrmPage` owns POS-side member dialog controls and reads.
- `CrmLoginPage`, `BusinessChoosePage`, and `LoyaltyMemberPage` own CRM web-side login, business selection, and member profile reads.
- `SettlementPage` owns settlement-side member selection controls.
- `PosCrmPage.openJoinMemberRegistration`, `PosCrmPage.isJoinMemberRegistrationVisible`, `PosCrmPage.fillJoinMemberName`, `PosCrmPage.fillJoinMemberPhone`, `PosCrmPage.submitJoinMember`, and `PosCrmPage.readJoinMemberError` own Join Member registration.
- `PosCrmPage.openMemberListFromAdmin`, `PosCrmPage.submitMemberListPermissionPassword`, `PosCrmPage.isMemberListVisible`, `PosCrmPage.searchMember`, and `PosCrmPage.readMemberSearchPhoneResult` own Admin CRM Loyalty member list behavior.
- `PosCrmPage.openRedeem` and `PosCrmPage.searchRedeemMemberByPhone` own POS order-side Redeem member lookup.
- `PosCrmPage.openAddNewLoyaltyFromRedeem`, `PosCrmPage.readMemberSearchEmailResult`, and `PosCrmPage.readMemberSearchPhoneResult` own order-side Add New Loyalty creation and Admin CRM Loyalty lookup assertions.
- `PosCrmPage.fillJoinMemberEmail`, `PosCrmPage.readMemberSearchNameResult`, and `PosCrmPage.readMemberSearchPointResult` own email registration and Admin member identity reads.
- `OrderDishesPage.clickSettle`, `OrderDishesPage.clickSettlementSwitchMember`, `OrderDishesPage.applySettlementMember`, and `OrderDishesPage.settleByCash` own settlement-side member switching and cash payment.
- `OrderDishesPage.clickSettlementSelectMember`, `PosCrmPage.readAvailableRedeemControlCounts`, `PosCrmPage.readRedeemOrderMember`, and `PosCrmPage.readRedeemOrderPoints` own settlement Select Member verification.
- `OrderDishesPage.readSettlementTotal`, `RecallPage.readOrderPriceSummary`, and `RecallPage.readOrderTotal` own settlement-vs-recall amount comparison.
- `PosHomePage.logout`, `PosHomePage.inputEmployeePassword`, `PosHomePage.clickAdmin`, and `PosHomePage.clickDineIn` provide the source-equivalent navigation context.

### Client/Data Responsibilities

- `test-data/crm/members.ts` owns member samples and factories.
- `StubCrmMemberClient` owns member uniqueness, cloud-member source, reward balance, and lookup state.
- `StubPosOrderClient` owns the active order/member association in stub mode.
- `StubCrmMemberClient.duplicatePhoneInput` supplies the duplicate phone used by POS-29341.
- `StubCrmMemberClient.nextUniquePhone` supplies deterministic phone-only registration data.
- `StubCrmMemberClient.nextUniqueEmail` supplies deterministic email-only registration data.
- `StubCrmMemberClient.cloudMemberSearchPhone` and `StubCrmMemberClient.findCloudMemberByPhone` define the cloud-only Redeem lookup behavior.
- `test-data/crm/members.ts` owns `duplicateJoinMemberPhone`, `existingCrmMember`, `localOnlyMember`, and `cloudOnlySearchPhone`.

### Stub Behavior

- Stub member creation stores deterministic member records in memory.
- Stub lookup distinguishes POS-local and cloud member records when a source case requires that distinction.
- Stub mode does not log in to the live CRM web app.
- Offline Join Member validation rejects missing phone/email and duplicate phone before writing member state.
- Offline successful phone registration stores a member that Admin CRM Loyalty search can find with a `+1` prefix.
- Offline Admin CRM Loyalty displays a permission password prompt for employee password `123`, then opens Member List after password `11`.
- Offline Redeem search returns only the cloud member when cloud and local members share the same phone.
- Offline Redeem Add New Loyalty stores a deterministic phone-only member, and Admin CRM Loyalty search exposes empty email plus `+1` phone result.
- Offline settlement Switch Member opens the same Add New Loyalty flow, stores email-only members, and allows Admin CRM Loyalty email search.
- Offline Admin CRM Loyalty prefers seeded CRM reward members for reward phone lookup, so Admin name/points compare with Redeem selection.
- Offline settlement Select Member uses the Redeem panel but hides free-item redemption while leaving discount and credit redemption available.
- Offline settlement Switch Member stores CRM member point state in shared seeded member records; applying `20% Off` deducts 15 points and cash payment earns 20 points for the active member.

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
| crm/test_crm_order.py | TestCRMOrder | `test_delivery_redeem`, `test_remove_redeem_reselect`, `test_order_edit_remove_redeem_item`, `test_order_redeem_item_switch`, `test_order_edit_remove_discount`, `test_settle_redeem_free_item` | tests/crm/crm-order.spec.ts | `CrmOrderFlow.createDeliveryRedeemOrderAndReadRecallHeader`, `CrmOrderFlow.removeMemberReselectAndReadRecallHeader`, `CrmOrderFlow.createRedeemItemOrderAndReadEditDisabledControls`, `CrmOrderFlow.createRedeemItemOrderAndReadSettlementSwitchMemberState`, `CrmOrderFlow.createDiscountOrderEditRemoveDiscountAndReadRecall`, `CrmOrderFlow.redeemFreeItemAndReadPointBalance`, `CrmRewardFlow.applyRedeemItem`, `CrmRewardFlow.removeRedeemItem`, `CrmRewardFlow.switchRedeemItem` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_redeem_discount` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.applyPercentageDiscountAndReadRecallReward` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_redeem_discount_options` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.readAvailablePercentageDiscountsForHighPointMember` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_max_discount` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.applyMaxCappedPercentageDiscountAndReadRecallReward` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_reduce_item0` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.applyDiscountThenReduceItemsToZeroAndReadReward` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_redeem_amount` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.redeemFixedAmountPayAndReadPointBalance` |
| crm/test_crm_order_redeem_discount.py | TestRedeemDiscount | `test_redeem_percentage` | tests/crm/crm-order-redeem-discount.spec.ts | `CrmOrderRedeemDiscountFlow.redeemPercentageDiscountPayAndReadPointBalance` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_redeem_discount` | tests/crm/crm-paypage.spec.ts | `CrmPayPageFlow.applyPayPageDiscountAndReadUnpaidAmount` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_redeem_switch_member` | tests/crm/crm-paypage.spec.ts | `CrmPayPageFlow.switchMemberApplyPayPageDiscountAndReadPoints` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_pay_page_redeem_item` | tests/crm/crm-paypage.spec.ts | `CrmPayPageFlow.payRedeemItemOrderByCashAndReadPoints` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_semipay_page_redeem_item` | tests/crm/crm-paypage.spec.ts | `CrmPayPageFlow.payRedeemItemOrderBySemiPayAndReadPoints` |
| crm/test_crm_paypage.py | TestCrmPayPage | `test_semipay_page_redeem_discount` | tests/crm/crm-paypage.spec.ts | `CrmPayPageFlow.semiPayRedeemDiscountAndReadPoints` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_redeem_void_order` | tests/crm/crm-points-calculation.spec.ts | `CrmPointsCalculationFlow.voidPaidMemberOrderAndReadPoints` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_redeem_refund_order` | tests/crm/crm-points-calculation.spec.ts | `CrmPointsCalculationFlow.refundPaidMemberOrderAndReadPoints` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_earn_points_rules_by_spent_pos_order` | tests/crm/crm-points-calculation.spec.ts | `CrmPointsCalculationFlow.earnPointsForPaidMemberOrderAndReadPoints` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_login_member_redeem_point` | tests/crm/crm-points-calculation.spec.ts | `CrmPointsCalculationFlow.joinEmailMemberAndReadInitialPoints` |
| crm/test_crm_points_calculation.py | TestCrmPointsCalculation | `test_redeem_free_item_modify_global_option` | tests/crm/crm-points-calculation.spec.ts | not-started |

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
6. `CrmOrderFlow.createDeliveryRedeemOrderAndReadRecallHeader`: create a Delivery order with phone/name/address, attach `crmSourceRewardMember`, read selected member and points, add source-equivalent dishes, save, recall the order, and read the CRM order header.
7. `CrmOrderFlow.removeMemberReselectAndReadRecallHeader`: create a Dine In order, attach source member, remove it, attach target member, read target member and points, save, recall, and read the CRM order header.
8. `CrmOrderFlow.createRedeemItemOrderAndReadEditDisabledControls`: create a Delivery order, attach source member, redeem a free item, add regular dishes, save, recall, enter edit mode, reopen Redeem, and read operation control classes.
9. `CrmOrderFlow.createRedeemItemOrderAndReadSettlementSwitchMemberState`: create a Dine In order, attach source member, redeem a free item, add a regular dish, enter settlement, and read Switch Member control class.
10. `CrmOrderFlow.createDiscountOrderEditRemoveDiscountAndReadRecall`: create a Delivery order, attach source member, record points, apply `10% Off`, save, recall, confirm Reward Discount exists, edit the recalled order, delete the redeem discount, save, recall again, and read points plus Reward Discount count.
11. `CrmOrderFlow.redeemFreeItemAndReadPointBalance`: attach source member, record point balance, redeem free item, add a dish, verify header points drop by 10, save, verify Admin CRM Loyalty points, recall the order, and verify Recall header points.
12. `CrmOrderRedeemDiscountFlow.applyPercentageDiscountAndReadRecallReward`: create a Dine In order, attach `crmSourceRewardMember`, add `groupSwitchDish`, apply `10% Off`, save, recall the order, and read subtotal plus Reward Discount.
13. `CrmOrderRedeemDiscountFlow.readAvailablePercentageDiscountsForHighPointMember`: create a Dine In order, attach `crmHighPointRewardMember`, add a dish, reopen Redeem, and read all visible percentage discount options.
14. `CrmOrderRedeemDiscountFlow.applyMaxCappedPercentageDiscountAndReadRecallReward`: create a Dine In order, attach `crmSourceRewardMember`, add `groupSwitchDish`, apply `30% Off` with `crmMaxDiscountRewardSetting.maxDiscountAmount`, save, recall, and read subtotal plus Reward Discount.
15. `CrmOrderRedeemDiscountFlow.applyDiscountThenReduceItemsToZeroAndReadReward`: create a Dine In order, attach `crmSourceRewardMember`, apply `10% Off`, add `groupSwitchDish`, read subtotal and current Reward Discount, reduce the item to zero, and read the Reward Discount display text.
16. `CrmOrderRedeemDiscountFlow.redeemFixedAmountPayAndReadPointBalance`: create a Dine In order, attach `crmSourceRewardMember`, read original points, add `groupSwitchDish`, redeem `$10.00`, read deducted points, save, recall, pay cash, read recalled points, then confirm Admin CRM Loyalty points.
17. `CrmOrderRedeemDiscountFlow.redeemPercentageDiscountPayAndReadPointBalance`: create a Dine In order, attach `crmSourceRewardMember`, read original points, add `groupSwitchDish`, redeem `10% Off`, read deducted points, save, recall, pay cash, read recalled points, then confirm Admin CRM Loyalty points.
18. `CrmPayPageFlow.applyPayPageDiscountAndReadUnpaidAmount`: create a Dine In order, attach `crmSourceRewardMember`, add `groupSwitchDish`, read subtotal and tax, enter payment page, redeem `10% Off`, and read payment-page unpaid amount.
19. `CrmPayPageFlow.switchMemberApplyPayPageDiscountAndReadPoints`: create a Dine In order with `crmSourceRewardMember`, read source points, add `groupSwitchDish`, enter payment page, switch to `crmTargetRewardMember`, read target points, redeem `10% Off`, save the order, then read both members in Admin CRM Loyalty.
20. `CrmPayPageFlow.payRedeemItemOrderByCashAndReadPoints`: create a To Go order with `crmSourceRewardMember`, read original points, redeem free item, add `groupSwitchDish`, enter payment page, pay cash, recall the order, and compare Recall/Admin points with the original balance.
21. `CrmPayPageFlow.payRedeemItemOrderBySemiPayAndReadPoints`: create a To Go order with `crmSourceRewardMember`, read original points, redeem free item, add `groupSwitchDish`, enter payment page, split payment evenly, pay the first part by cash without earning points, recall the order, pay the remaining amount, and read Admin points.
22. `CrmPayPageFlow.semiPayRedeemDiscountAndReadPoints`: create a To Go order with `crmSourceRewardMember`, read original points, apply `10% Off`, add `groupSwitchDish`, enter payment page, split payment evenly, pay one part, exit payment state, and read Admin points.
23. `CrmPointsCalculationFlow.voidPaidMemberOrderAndReadPoints`: create a Dine In order, attach `crmSourceRewardMember`, add `groupSwitchDish`, save, recall, pay all by cash, reopen the recent order, read Recall point balance, void the paid order, and read Recall point balance again.
24. `CrmPointsCalculationFlow.refundPaidMemberOrderAndReadPoints`: create a Dine In order, attach `crmSourceRewardMember`, add `groupSwitchDish`, save, recall, pay all by cash, reopen the recent order, read Recall point balance, refund the paid order, read Recall point balance again, then read the same member in Admin CRM Loyalty.
25. `CrmPointsCalculationFlow.earnPointsForPaidMemberOrderAndReadPoints`: create a Dine In order, attach `crmSourceRewardMember`, read the POS header point balance, add `groupSwitchDish`, save, recall, pay all by cash, reopen the recent order, and read the Recall point balance.
26. `CrmPointsCalculationFlow.joinEmailMemberAndReadInitialPoints`: open the home Join Member registration, create an email-only member with deterministic first and last name, open Admin CRM Loyalty Member List, search by the created email, and read the displayed email plus points.

### Expected Assertions

- Redeem item visibility, removal, reselection, and switching match the source behavior.
- Discounted item price, options price, subtotal, tax, and total are numeric and source-equivalent.
- Point earning, redemption, void, and refund effects match expected balance changes.
- Semi-pay and pay-page redemption update only the intended order/suborder context.
- Delivery redeem Recall header preserves guest name `pos-test`, formatted guest phone `(012) 345-67890`, selected CRM member, selected points, and an address beginning with `menusifu-test`.
- Remove/reselect redeem member persists the newly selected member and points to Recall header.
- Recall edit for an order containing a CRM Redeem Item disables Remove Member, Redeem Item, Redeem Discount, and Redeem Credit operations.
- Settlement Switch Member is disabled after the order uses a CRM Redeem Item.
- Removing a Redeem Discount from a recalled order keeps member points unchanged and removes the Reward Discount row.
- Redeem Free Item deducts 10 points immediately and the reduced balance is visible in the order header, Admin CRM Loyalty, and Recall header.
- POS-29552 verifies recalled Reward Discount equals negative `subtotal * 0.1` rounded to two decimals.
- POS-29547 verifies a high-point member can see at least `10% Off` and `20% Off` discount rules.
- POS-29554 verifies a `30% Off` rule with maximum discount amount caps the recalled Reward Discount at `-1.00`.
- POS-29561 verifies the current order Reward Discount recalculates to the source-equivalent text `-0.00` after the only item is reduced to zero.
- POS-29608 verifies `$10.00` Fixed Amount redeem deducts 10 points immediately, cash payment earns the single-order points back to the original balance, and Admin CRM Loyalty matches the paid balance.
- POS-29578 verifies `10% Off` Percentage Off redeem deducts 10 points immediately, cash payment earns the single-order points back to the original balance, and Admin CRM Loyalty matches the paid balance.
- POS-29638 verifies payment-page unpaid amount is recalculated from discounted subtotal plus tax computed from the original tax rate.
- POS-29668 verifies payment-page Switch Member leaves the original member points unchanged and deducts 10 points from the switched member after applying `10% Off`.
- POS-29703 verifies pay-page Redeem Item deducts 10 points and cash payment earns the single-order points back so Recall and Admin balances equal the original balance.
- POS-29769 verifies pay-page Redeem Item semi-pay does not earn points on the partial payment, but earns them after the remaining payment is completed from Recall.
- POS-29786 verifies pay-page `10% Off` semi-pay keeps the point deduction after a partial payment is made and the payment page is exited.
- POS-29961 verifies paid-order Void removes the single-order earned points from the Recall CRM header balance.
- POS-29963 verifies paid-order Refund keeps the payment-time point balance in Recall and Admin CRM Loyalty.
- POS-29991 verifies paid-order earning adds the deterministic single-order points to the pre-payment POS header balance.
- POS-29330 verifies a newly created email-only Join Member record appears in Admin CRM Loyalty with 1000 initial points.

### Page Responsibilities

- `OrderDishesPage` owns POS order item and summary reads.
- `PosCrmPage` owns reward and member operations inside POS.
- `SettlementPage` owns pay-page and semi-pay redeem controls.
- `RecallPage` owns post-payment, void, and refund state checks.
- `DeliveryPage.createDeliveryOrder` owns Delivery phone/name/address entry.
- `PosCrmPage.openRedeem`, `PosCrmPage.selectMemberByPhone`, `PosCrmPage.removeRedeemMember`, `PosCrmPage.readRedeemOrderMember`, and `PosCrmPage.readRedeemOrderPoints` own order-side member attach, remove, reselect, and header reads.
- `RecallPage.openRecentOrder` and `RecallPage.readCrmOrderHeaderInfo` own recalled CRM guest/member/points assertions.
- `RecallPage.clickEdit` owns entering recalled-order edit context before POS-side Redeem restrictions are read.
- `PosCrmPage.applyRedeemItem`, `PosCrmPage.quitRedeem`, and `PosCrmPage.readRedeemEditDisabledControlClasses` own redeem item application and disabled-state assertions.
- `OrderDishesPage.readSettlementSwitchMemberClass` owns settlement-side Switch Member disabled-state assertions.
- `PosCrmPage.applyRedeemDiscount`, `PosCrmPage.removeRedeemDiscount`, and `RecallPage.readRewardDiscountCount` own discount application/removal and post-recall Reward Discount checks.
- `PosCrmPage.readHeaderPointBalance`, `PosCrmPage.applyRedeemItem`, `PosCrmPage.quitRedeem`, `PosCrmPage.readMemberSearchPointResult`, and `RecallPage.readCrmOrderHeaderInfo` own free-item point-balance assertions.
- `PosCrmPage.readRedeemDiscountOptions` owns the Redeem Discount option list used by POS-29547.
- `OrderDishesPage.readSubtotal`, `OrderDishesPage.readRewardText`, and `OrderDishesPage.reduceFirstItemToZero` own the current-order price recalculation checks used by POS-29561.
- `RecallPage.readOrderPriceSummary` owns recalled-order subtotal and Reward Discount reads for POS-29552 and POS-29554.
- `PosCrmPage.applyRedeemAmount`, `PosCrmPage.readHeaderPointBalance`, `RecallPage.settleAllByCash`, `RecallPage.readCrmOrderHeaderInfo`, and `PosCrmPage.readMemberSearchPointResult` own the point-balance path for POS-29608 and POS-29578.
- `OrderDishesPage.readTax`, `OrderDishesPage.clickSettle`, and `OrderDishesPage.readSettlementUnpaidAmount` own payment-page amount reads for POS-29638.
- `OrderDishesPage.clickSettlementSwitchMember` and `OrderDishesPage.saveOrder` own payment-page member switching and save behavior for POS-29668.
- `OrderDishesPage.splitPaymentEvenly`, `OrderDishesPage.settleByCash`, `RecallPage.clickSettle`, and `RecallPage.payCurrentOrderByCash` own full and semi-pay completion for POS-29703, POS-29769, and POS-29786.
- `RecallPage.voidPaidOrder`, `RecallPage.refundPaidOrder`, and `RecallPage.readCrmPointBalance` own paid-order void/refund point-balance checks for POS-29961 and POS-29963.
- `PosCrmPage.readHeaderPointBalance` and `RecallPage.readCrmPointBalance` own before/after point reads for POS-29991.
- `PosCrmPage.openJoinMemberRegistration`, `PosCrmPage.fillJoinMemberEmail`, `PosCrmPage.submitJoinMember`, and `PosCrmPage.readMemberSearchPointResult` own email-member initial point checks for POS-29330.

### Client/Data Responsibilities

- `test-data/crm/members.ts` owns member, reward, rights, and point samples.
- `test-data/pos/dishes.ts` owns redeemable dishes/options/combos.
- `StubCrmRewardClient` owns reward rules and point balances.
- `StubPosOrderClient` owns order state transitions for payment, void, and refund.
- `StubCrmRewardClient.findMemberByPhone` validates seeded source and target member identities before UI selection.
- `test-data/pos/delivery.ts` owns `deliveryOrderInfoSample`.
- `test-data/crm/members.ts` owns `crmSourceRewardMember` and `crmTargetRewardMember`.
- `test-data/pos/dishes.ts` owns `crmRedeemItemDish`.
- `test-data/crm/members.ts` owns `crmHighPointRewardMember`, `crmRewardSettings`, and `crmMaxDiscountRewardSetting`.
- `test-data/pos/dishes.ts` owns `groupSwitchDish` for percentage discount subtotal calculations.
- `StubCrmRewardClient.calculateDiscount` supports optional maximum discount caps for source CRM loyalty reward rules.
- `test-data/crm/members.ts` owns `crmRewardSettings.pointsPerPaidOrder` for paid-order void expected point deduction.
- `StubCrmMemberClient.nextUniqueEmail` supplies deterministic email-only member input for POS-29330, and `test-data/crm/members.ts` owns `crmNewMemberInitialPoints`.

### Stub Behavior

- Stub rewards apply deterministic pricing deltas.
- Stub point balance is updated only through named flow/client methods.
- Stub mode does not call live CRM reward APIs.
- Offline Delivery order save persists guest phone/address on the order, and Recall formats phone with source-equivalent spacing.
- Offline Redeem member removal clears the active member so the reselected member is the only member saved on the order.
- Offline Recall edit of an order with a redeem item reopens the order context and marks member/redeem controls as disabled.
- Offline settlement disables Switch Member when the current order contains a redeem item.
- Offline recalled-order edit reopens all recalled orders, locks controls only for redeem-item orders, and persists discount deletion back to the selected recalled order.
- Offline Redeem Free Item deducts 10 points from the shared seeded member record so POS header, Admin CRM Loyalty search, and Recall header read the same reduced balance.
- Offline Redeem Discount options expose deterministic `10% Off` and `20% Off` entries for a high-point member.
- Offline `30% Off` stores `crmDiscountMaxAmount = 1` on the order so recalled Reward Discount is capped at `-1.00`.
- Offline current-order Reward Discount is rendered separately from numeric order state so reducing the only item to zero preserves the source UI text `-0.00`.
- Offline `$10.00` Fixed Amount and `10% Off` Percentage Off deduct 10 points from the shared CRM member record.
- Offline deleting a redeem discount, removing a member, or switching to a different member refunds the active redeem point deduction before changing member context.
- Offline cash payment earns deterministic points from order subtotal, so a single `groupSwitchDish` order earns 10 points while existing multi-item and combined orders continue to earn 20 points.
- Offline payment-page unpaid amount is a separate DOM value from settlement total; it uses discounted subtotal plus the source-equivalent tax rate while existing settlement-total assertions remain tax-free.
- Offline payment-page member switching reuses the Redeem member selector and applies the `10% Off` point deduction to the active switched member only.
- Offline pay-page semi-pay marks the order as partially paid and does not earn points until the recalled remaining payment is completed.
- Offline pay-page Redeem Item uses the existing free-item point deduction and the deterministic subtotal earning rule so a single regular dish restores the original member balance only after full payment.
- Offline paid-order Void subtracts `earnPointsForSubtotal(order.subtotal)` from the selected recalled CRM member and refreshes the Recall header.
- Offline paid-order Refund marks the recalled order refunded without changing CRM points, matching the source assertions that Recall and Admin balances remain equal to the payment-time balance.
- Offline paid-order earning uses the same deterministic subtotal rule as the void/refund paths; a single `groupSwitchDish` order earns 10 points.
- Offline Join Member creation seeds new members with 1000 points so Admin CRM Loyalty search reflects the source initial-point rule.

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
